
import CreeperAttackWaveState from "cyttp/FoeData/enemy/CreeperAttackWaveState";
import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";

/** 动态修改多面板数据 -查看下面的方法
 * B_007_wan_jia_duo_mian_ban.yan_shi(0)
 * 方法 -- 在本页末尾
 */

// 游戏-- 多面板显示       额外附带 调整镜头函数
export default class MorePanelDisplay {
    // 数据配置 
    static config: {
        title: string,
        field_name: string[],
        field_colour: string[],
        field_blp: string[],

    } = {
            // 多面板显示的 - 标题
            title: '东方游侠录',
            // 多面板显示的 - 标题  (标题名称 最好对应-下面动态表：dmb_dynamic_data里面的key)
            field_name: ['玩家名称', "灵气值", "杀敌数", "战斗力", "功法等级"],
            // 标题的颜色   黄-青-橙-红-紫-绿 基本不动
            field_colour: ['|cffffff00', '|cff00ffff', '|cffff6600', '|cffff0000', '|cffff00ff', '|cff00ff00',],
            // 字段的图片
            field_blp: [
                "ReplaceableTextures\\CommandButtons\\BTNArthas.blp",
                "ReplaceableTextures\\CommandButtons\\BTNManaShield.blp",
                "ReplaceableTextures\\CommandButtons\\BTNClawsOfAttack.blp",
                "ReplaceableTextures\\CommandButtons\\BTNBerserk.blp",
                "ReplaceableTextures\\PassiveButtons\\PASBTNElunesBlessing.blp",
                "ReplaceableTextures\\CommandButtons\\BTNTome.blp",
            ],

        };
    // 更改多面板数据 看这里--------------------
    //  游戏内,作者动态修改这个数据，即可刷新多面板上的数据
    static dmb_dynamic_data: {
        [player_index: number]: [
            { "灵气值": number, },
            { "杀敌数": number, },
            { "战斗力": number, },
            { "功法等级": string, },
        ]
    } = {
            // 玩家1 多面板数据初始化     
            0: [{ "灵气值": 0 }, { "杀敌数": 0 }, { "战斗力": 0 }, { "功法等级": '初始', },],
            // 玩家2 多面板数据初始化
            1: [{ "灵气值": 0 }, { "杀敌数": 0 }, { "战斗力": 0 }, { "功法等级": '初始', },],
            // 玩家3 多面板数据初始化
            2: [{ "灵气值": 0 }, { "杀敌数": 0 }, { "战斗力": 0 }, { "功法等级": '初始', },],
            // 玩家4 多面板数据初始化
            3: [{ "灵气值": 0 }, { "杀敌数": 0 }, { "战斗力": 0 }, { "功法等级": '初始', },],
        };

    // 当前游戏的难度,默认难度1     ps:选择难度后，把这个值重新赋值一下
    static game_difficulty: number = 1

    // 正常情况下，只需要手动更改上面的数据 ----------------------------------------------

    // 以下数据非特殊需求 不要更改 ----------------------------------------------
    // 记录正在游戏的玩家序号
    static playing_player_index: number[] = []
    // 多面板
    static dmb = CreateMultiboard()
    // 游戏时间-秒
    static game_s: number = 0


    constructor() {
        // 显示多面板
        MorePanelDisplay.DisplayMultiPanel()
        // 计时器刷新   多面板
        let trigger3 = new Trigger()
        trigger3.registerTimerEvent(1, true)
        trigger3.addAction(this.action3);

        let trigger = new Trigger()
        trigger.registerAnyUnitDeathEvent()
        trigger.addAction(() => {
            let p = GetOwningPlayer(GetKillingUnit());
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'qqq' + GetPlayerId(player));
            let kill_num_p = DataBase.getPlayerSolarData(p).kill_num_p ? DataBase.getPlayerSolarData(p).kill_num_p : 0

            if (IsHandle(p) && GetOwningPlayer(GetTriggerUnit()) != p) {
                let solarData = MapPlayer.fromHandle(p).solarData;
                let kill_count = solarData.kill_count

                if (kill_count && kill_count > 0) {
                    kill_count += Math.floor(1 + (1 * kill_num_p))
                    //境界_忍士 ================
                    if (kill_count >= 5 && !DataBase.getPlayerSolarData(p).境界_忍士) {
                        let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                        if (lq >= 200) {
                            lq -= 200
                            MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                            AddPlayerTechResearched(p, 'R002', 1)
                            //全属性奖励
                            SelectUtil.forPlayerUnits(unit => {
                                ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 25);
                                ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 25);
                                ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 25);
                            }, GetPlayerId(p))
                            DataBase.getPlayerSolarData(p).境界_忍士 = true
                        }
                    }
                } else {
                    kill_count = 1;
                }
                solarData.kill_count = kill_count

            }
        })
    }


    /**
     * 多面板刷新动作
     * @param this 无参数
     */
    action3(this: void) {
        // 获取多面板
        let dmb = MorePanelDisplay.dmb
        // 计算时间
        let p = Player(0)
        if (DataBase.getPlayerSolarData(p).游戏开始) {
            let str = MorePanelDisplay.count_timer()
            MultiboardSetTitleText(dmb, str)

            MultiboardSuppressDisplay(false)
        }
        // 刷新游戏 -- 时间
        // 刷新多面板数据
        for (let i = 0; i < 4; i++) {
            let player = Player(i)
            if (GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING
                && GetPlayerController(player) == MAP_CONTROL_USER) {
                //获取多面板动态数据表
                let dmb_dynamic_data: {}[] = MorePanelDisplay.dmb_dynamic_data[i]
                // 循环取数组里面的表
                for (let ii = 0; ii < dmb_dynamic_data.length; ii++) {
                    // 迭代表，拿到键值对
                    for (let kk in dmb_dynamic_data[ii]) {
                        let str = '' + dmb_dynamic_data[ii][kk]
                        // 更新多面板数据
                        MultiboardSetItemValueBJ(dmb, ii + 2, (i + 2), str)

                        //显示玩家的参数
                        MorePanelDisplay.yan_shi(i)
                    }
                }
            }
        }
    }

    /***   
     * 创建，显示多面板
    **/
    static DisplayMultiPanel() {
        MultiboardSuppressDisplay(true)
        // 计算开局在线的用户为玩家数量
        let player_num = 0
        for (let i = 0; i < 4; i++) {
            let player = Player(i)
            if (GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING
                && GetPlayerController(player) == MAP_CONTROL_USER) {
                // 用数组记录在线玩家，避免只有玩家1，玩家3，玩家4，缺少玩家2这种无序情况发生
                MorePanelDisplay.playing_player_index.push(i)
                player_num++
            }
        }
        // 获取多面板
        let dmb = MorePanelDisplay.dmb
        // 多面板显示的数据
        let config = MorePanelDisplay.config
        // 设置行
        MultiboardSetRowCount(dmb, player_num + 1)
        // 列
        let column_length = config.field_name.length
        MultiboardSetColumnCount(dmb, column_length)
        // 设置标题
        MultiboardSetTitleText(dmb, config.title)
        MultiboardDisplay(dmb, true)
        // 设置字段
        for (let i = 1; i <= column_length; i++) {
            let field_name = config.field_colour[i - 1] + config.field_name[i - 1] + "|r"
            // 字段名字
            MultiboardSetItemValueBJ(dmb, i, 1, field_name)
            // 隐藏字段的图标
            MultiboardSetItemStyle(MultiboardGetItem(dmb, 0, i - 1,), true, false)
        }

        // 设置多面板宽度
        let width = column_length * 0.9
        MultiboardSetItemWidthBJ(dmb, 0, 0, width)

        // 增加图标， 预设数据0，
        for (let i = 1; i <= player_num; i++) {
            for (let column = 0; column < column_length; column++) {
                // 行在前，列在后   -- 增加第1列的 图标--可观性
                MultiboardSetItemIcon(MultiboardGetItem(dmb, i, column), config.field_blp[column])
                // 字段文本
                MultiboardSetItemValueBJ(dmb, column + 2, (i + 1), "0")
            }
            // 第1列文本 -- 玩家名字
            MultiboardSetItemValueBJ(dmb, 1, (i + 1), GetPlayerName(Player(i - 1)))
        }
        // // 显示多面板
        // MultiboardDisplayBJ(true, dmb)
        MultiboardMinimizeBJ(false, dmb)
    }

    /**
     * 计算时间
     * @param this 
     */
    static count_timer(): string {
        MorePanelDisplay.game_s++
        let game_t = MorePanelDisplay.game_s
        // 求秒
        let s = game_t % 60
        let s_str = s > 9 ? (':' + s) : (":0" + s)
        // 求分钟
        let m = math.floor(game_t / 60)
        let add_m = m % 60
        let m_str = add_m > 9 ? (':' + add_m) : (":0" + add_m)
        // 求小时
        let h = math.floor(m / 60)
        let h_str = h > 9 ? ("" + h) : ("0" + h)
        // 获取本局难度
        let game_difficulty = MorePanelDisplay.game_difficulty

        // 多面板显示的数据
        let config = MorePanelDisplay.config
        let str = config.title + " |cffff00ff" + 'N' + game_difficulty + '|r  '
        str = str + h_str + m_str + s_str + '    ' + '第' + CreeperAttackWaveState.wave_level + '波'
        return str
    }

    /**
     * 演示修改多面板数据
     * player_index:玩家的索引
     */
    static yan_shi(player_index: number) {
        let p = Player(player_index)
        // 拿到对应玩家的数据表
        let dmb_dynamic_data = MorePanelDisplay.dmb_dynamic_data[player_index]
        dmb_dynamic_data[0].灵气值 = R2I(MapPlayer.fromHandle(p).solarData.灵气总量)
        dmb_dynamic_data[1].杀敌数 = MapPlayer.fromHandle(p).solarData.kill_count
        dmb_dynamic_data[2].战斗力 = 20000
        dmb_dynamic_data[3].功法等级 = MapPlayer.fromHandle(p).solarData.功法熟练度等级名称

    }
}