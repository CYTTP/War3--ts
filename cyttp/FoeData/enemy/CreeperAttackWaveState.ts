import { ItemSimulationAttributeType } from "cyttp/DamageSystem/CyttpDamageSystem";
import NumerivalUtil from "cyttp/Util/NumerivalUtil";
import DataBase from "solar/common/DataBase";
import Easing from "solar/tween/Easing";
import Tween from "solar/tween/Tween";
import BaseUtil from "solar/util/BaseUtil"
import CameraUtil from "solar/util/CameraUtil";
import { Trigger } from "solar/w3ts/handles/trigger"



/**
 * creeper可以理解为怪物或敌人
 * 刷攻击怪物
 */
export default class CreeperAttackWaveState {
    //科技商店
    static KEJI_XY = [[-1430, 1305], [2455.8, 631.6], [1023.6, -2218], [-1324, -2173]]
    //抽奖商店
    static CHOUJIANG_XY = [[-1143, 1093], [2111, 507.5], [882, -1787.5], [-958.5, -1786]]
    //主线任务
    static ZHUXIAN_XY = [[-2113, 753], [1944.8, 1495.8], [1982.6, -1924], [1927, 1351]]
    //攻击时间ui
    static attack_timer_ui: number[] = []
    // 记录时间
    static enemy_attack_timer: number = 0
    // 记录暂停怪物     CreeperAttackWaveState.suspend
    static suspend: number = 0;
    //  // 记录刷怪开启
    static open: boolean = true
    static txte_tips_ui: number[] = []
    static config: {

        // 游戏开始-准备时间
        preparation_time: number,
        //每波间隔
        wave_interval: number,
        //多少秒刷一个兵
        wave_creeper_interval: number,
        // 普通怪物每波次数
        monster_count: number,
        // 普通怪物的ID
        monster_ID: string[],
        // 普通怪物每波次数数量
        monster_count_num: number,
        // 精英怪物怪物的ID
        eliter_ID: string[],
        // 精英怪物每几波刷一次
        eliter_wave: number,
        //精英怪物是否刷新
        eliter_is: boolean,
        // 精英怪物每波的次数
        eliter_count: number,
        // 精英怪物每波每次数量
        eliter_count_num: number,
        // boss怪物怪物的ID
        Boss_ID: string[],
        // boss每几波刷一次
        boss_wave: number,
        // boss刷的波次次数
        Boss_count: number,
        // boss刷的每波每次数量
        Boss_count_num: number,

        // 创建怪物的所属玩家
        monster_palyer: player[],
        // 创建怪物的区域-可能是4个玩家对应4个区域
        create_monster_rect: rect[],
        // 怪物跳跃的区域
        monster_jump_rect: rect[],
        // 怪物的攻击区域
        monster_attack_rect: rect[],
        //刷兵最大波数
        wave_level_max: number,

    } = {

            // 游戏开始-准备时间
            preparation_time: 20,
            //每波间隔              --每波间隔
            wave_interval: 15,
            //多少秒刷一个兵 --PS:这里的秒刷兵*普通怪次数＝需要时间，一定要大于每波间隔
            wave_creeper_interval: 1,
            // 普通怪物每波多少次     --普通怪次数
            monster_count: 10,
            // 普通怪物的ID
            monster_ID: [
                'q04d', 'q04e', 'q04f', 'q04g', 'e000', 'q04i', 'q04j', 'q04k', 'q04l', 'e000',
                'q04n', 'q04o', 'q04p', 'q04q', 'e000', 'q04s', 'q04t', 'q04u', 'q04v', 'e000',
                'q0d8', 'q0d9', 'q0da', 'q0db', 'e000', 'q0dd', 'q0de', 'q0df', 'q0dg', 'e000'
            ],
            // 普通怪物每波每次的数量
            monster_count_num: 1,
            // 精英怪物怪物的ID
            eliter_ID: [],
            // 精英怪物每几波刷一次
            eliter_wave: 0,
            //精英怪物是否刷新
            eliter_is: false,
            // 精英怪物每波数量
            eliter_count: 0,
            // 精英怪物每波每次数量
            eliter_count_num: 0,
            // boss怪物怪物的ID
            Boss_ID: ['q04h', 'q04m', 'q04r', 'q050', 'q0dc', 'q0dh',],
            // boss每几波刷一次
            boss_wave: 4,
            // boss刷的波次次数
            Boss_count: 1,
            // boss刷的每波每次数量
            Boss_count_num: 1,

            // 创建怪物的所属玩家
            monster_palyer: [Player(5), Player(6), Player(7), Player(8),],
            // 创建怪物的区域-可能是4个玩家对应4个区域
            create_monster_rect: [gg_rct_p1_sb_chukou, gg_rct_p2_sb_chukou, gg_rct_p3_sb_chukou, gg_rct_p4_sb_chukou],
            // 怪物跳跃的区域
            monster_jump_rect: [gg_rct_p1_sb_center, gg_rct_p2_sb_center, gg_rct_p3_sb_center, gg_rct_p4_sb_center],
            // 怪物的攻击区域 // 现在是条约后的移动目标区域
            monster_attack_rect: [gg_rct_sb_1, gg_rct_sb_6, gg_rct_sb_11, gg_rct_sb_16],
            //刷兵最大波数
            wave_level_max: 30,
        }

    //记录波次
    static wave_level: number = 0;
    //记录时间
    static game_time: number = 0

    constructor() {
        // 计时器刷新事件
        let trigger = new Trigger()
        trigger.registerTimerEvent(1, true)
        BaseUtil.runLater(0.01, () => {
            CreeperAttackWaveState.enemy_attack_timer = CreeperAttackWaveState.config.wave_interval + CreeperAttackWaveState.config.preparation_time
            CreeperAttackWaveState.attack_timer_ui[0] = DzCreateFrameByTagName("BACKDROP", "name", DzGetGameUI(), "template", 0)
            // CreeperAttackWaveState.attack_timer_ui[1] = DzCreateFrameByTagName("TEXT", "name", DzGetGameUI(), "template", 0)
            CreeperAttackWaveState.attack_timer_ui[2] = DzCreateFrameByTagName("TEXT", "name", DzGetGameUI(), "template", 0)
            // CreeperAttackWaveState.attack_timer_ui[3] = DzCreateFrameByTagName("BACKDROP", "name", DzGetGameUI(), "template", 0)
            DzFrameSetTexture(CreeperAttackWaveState.attack_timer_ui[0], "UI_Icon\\daojishiUI.tga", 0) //99999.blp
            //  DzFrameSetTexture(CreeperAttackWaveState.attack_timer_ui[3], "icon\\di_ren_lai_xi_ui.tga", 0)
            DzFrameSetSize(CreeperAttackWaveState.attack_timer_ui[0], 0.16, 0.071)
            DzFrameSetPoint(CreeperAttackWaveState.attack_timer_ui[0], 4, DzFrameGetTopMessage(), 4, 0, 0.02)
            // DzFrameSetSize(CreeperAttackWaveState.attack_timer_ui[0], 0.1, 0.065)
            // 显示敌人来袭图标
            DzFrameSetSize(CreeperAttackWaveState.attack_timer_ui[3], 0.16, 0.06)
            DzFrameSetPoint(CreeperAttackWaveState.attack_timer_ui[3], 1, CreeperAttackWaveState.attack_timer_ui[0], 7, 0, 0.015)
            DzFrameShow(CreeperAttackWaveState.attack_timer_ui[3], false)
            // DzFrameShow(CreeperAttackWaveState.attack_timer_ui[1], true)
            // DzFrameShow(CreeperAttackWaveState.attack_timer_ui[2], true)     xiu_xian\\di_ren_lai_xi_ui.tga
            // DzFrameSetFont(CreeperAttackWaveState.attack_timer_ui[1], "Fonts\\ChaoCuZiTi.TTF", 0.06, 0)
            DzFrameSetFont(CreeperAttackWaveState.attack_timer_ui[2], "Fonts\\ChaoCuZiTi.TTF", 0.06, 0)
            // DzFrameSetPoint(CreeperAttackWaveState.attack_timer_ui[1], 4, CreeperAttackWaveState.attack_timer_ui[0], 4, -0.02, 0.012)
            DzFrameSetPoint(CreeperAttackWaveState.attack_timer_ui[2], 4, CreeperAttackWaveState.attack_timer_ui[0], 4, 0.0, 0.012)
            let str1: string = I2S(CreeperAttackWaveState.wave_level + 1)
            str1 = '|cffff00ff' + str1 + "|r"
            // DzFrameSetText(CreeperAttackWaveState.attack_timer_ui[1], "第" + str1 + "波")
            DzFrameSetText(CreeperAttackWaveState.attack_timer_ui[2], CreeperAttackWaveState.enemy_attack_timer + '')
            DzFrameShow(CreeperAttackWaveState.attack_timer_ui[0], false)
            //时间
            DzFrameShow(CreeperAttackWaveState.attack_timer_ui[2], false)

            trigger.addAction(this.action);
        })


    }

    // 计时器动作
    action(this: void) {
        if (DataBase.getPlayerSolarData(Player(0)).游戏开始 == true) {
            DzFrameShow(CreeperAttackWaveState.attack_timer_ui[0], true)
            DzFrameShow(CreeperAttackWaveState.attack_timer_ui[2], true)
            CreeperAttackWaveState.game_time++;
            CreeperAttackWaveState.enemy_attack_timer--
            for (let i = 0; i < 4; i++) {
                let player = Player(i)
                let num = CreeperAttackWaveState.enemy_attack_timer + CreeperAttackWaveState.suspend
                // DisplayTimedTextToPlayer(Player(0), 0, 0, 0, 'num数量:' + num)
                if (CreeperAttackWaveState.suspend > 0) { CreeperAttackWaveState.suspend = 0 }
                if (num >= 30) {
                    let str: string = '|cff00ff00' + num + "|r"
                    DzFrameSetText(CreeperAttackWaveState.attack_timer_ui[2], str + "")
                } else {
                    let str: string = '|cffff0000' + num + "|r"
                    DzFrameSetText(CreeperAttackWaveState.attack_timer_ui[2], str + "")
                }
                //CreeperAttackWaveState.enemy_attack_timer = num
                if (num <= 0) {
                    // if (CreeperAttackWaveState.open) {
                    if (CreeperAttackWaveState.wave_level < 31) {
                        CreeperAttackWaveState.onWave()
                        // return DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '刷兵结束');
                    }
                    //根据波数开放建筑
                    if (CreeperAttackWaveState.wave_level == 2) {
                        //科技商店
                        CreateUnit(player, 'h002', CreeperAttackWaveState.KEJI_XY[i][0], CreeperAttackWaveState.KEJI_XY[i][1], 0)
                        let tx = AddSpecialEffect('9972832f6bb18157.mdx', CreeperAttackWaveState.KEJI_XY[i][0], CreeperAttackWaveState.KEJI_XY[i][1])
                        DataBase.getPlayerSolarData(player).提示特效 = tx
                        // EXEffectMatScale(tx, 3)

                    } else if (CreeperAttackWaveState.wave_level == 3) {
                        //悬赏任务
                        CreateUnit(player, 'h003', CreeperAttackWaveState.ZHUXIAN_XY[i][0], CreeperAttackWaveState.ZHUXIAN_XY[i][1], 0)
                        let tx = AddSpecialEffect('9972832f6bb18157.mdx', CreeperAttackWaveState.ZHUXIAN_XY[i][0], CreeperAttackWaveState.ZHUXIAN_XY[i][1])
                        // EXEffectMatScale(tx, 3)
                        DataBase.getPlayerSolarData(player).提示特效1 = tx
                    }
                    // else if (CreeperAttackWaveState.wave_level == 3) {
                    //     //抽奖商店
                    //     CreateUnit(player, 'n000', CreeperAttackWaveState.CHOUJIANG_XY[i][0], CreeperAttackWaveState.CHOUJIANG_XY[i][1], bj_UNIT_FACING)
                    //     AddSpecialEffect('80aa3af0b8e54104.mdx', CreeperAttackWaveState.CHOUJIANG_XY[i][0], CreeperAttackWaveState.CHOUJIANG_XY[i][1])
                    //   //  CreateDestructable('', CreeperAttackWaveState.CHOUJIANG_XY[i][0], CreeperAttackWaveState.CHOUJIANG_XY[i][1], 0, 1, 0)
                    // }

                    DzFrameShow(CreeperAttackWaveState.attack_timer_ui[3], true)
                    BaseUtil.runLater(10, () => {
                        DzFrameShow(CreeperAttackWaveState.attack_timer_ui[3], false)
                    })
                    //     CreeperAttackWaveState.open = false
                    // }
                    let str1: string = I2S(CreeperAttackWaveState.wave_level + 1)
                    str1 = '|cffff00ff' + str1 + "|r"
                    // DzFrameSetText(CreeperAttackWaveState.attack_timer_ui[1], "距第" + str1 + "波")
                    CreeperAttackWaveState.enemy_attack_timer = CreeperAttackWaveState.config.wave_interval
                }

            }
        }

        // // 提示最后1波，弹幕提示
        // if (CreeperAttackWaveState.wave_level > 30
        //     && CreeperAttackWaveState.wave_level <= 31
        //     && !DataBase.getPlayerSolarData(Player(0)).UI通关弹幕提示) {
        //     DataBase.getPlayerSolarData(Player(0)).UI通关弹幕提示 = true
        //     //  DisplayTimedTextToPlayer(Player(0), 0, 0, 0, ' 进来')
        //     let level = 1
        //     // let level = 1
        //     let count = 8
        //     let array_color = ['|cffff0000', '|cffff6600', '|cff00ff00', '|cff00ff00', '|cff0000ff', '|cffff00ff']
        //     //  DisplayTimedTextToPlayer(Player(0), 0, 0, 0, 'count=' + count)
        //     let i = 0
        //     BaseUtil.runLater(0.3, () => {
        //         if (!CreeperAttackWaveState.txte_tips_ui[i]) {
        //             CreeperAttackWaveState.txte_tips_ui[i] = DzCreateFrameByTagName("TEXT", "name", DzGetGameUI(), "template", 0)
        //             DzFrameSetFont(CreeperAttackWaveState.txte_tips_ui[i], "Fonts\\ChaoCuZiTi.TTF", 0.017, 0)
        //             DzFrameSetAbsolutePoint(CreeperAttackWaveState.txte_tips_ui[i], 4, 0.05, 0.4)
        //             DzFrameShow(CreeperAttackWaveState.txte_tips_ui[i], true)
        //         }
        //         let color = GetRandomInt(0, array_color.length - 1)
        //         let srt = array_color[color] + '击杀最终BOSS,即将通关!'
        //         //  let srt = array_color[color] + '这只是一个弹幕'
        //         DzFrameSetText(CreeperAttackWaveState.txte_tips_ui[i], srt)
        //         let txte_tips_ui = CreeperAttackWaveState.txte_tips_ui[i]
        //         DzFrameShow(txte_tips_ui, true)
        //         let x = 0
        //         let y = GetRandomReal(0.2, 0.55)
        //         let yy = GetRandomReal(0.2, 0.55)
        //         let timer = 7000
        //         const tween = new Tween({ x: x, y: y, a: 150 })
        //             .to({ x: 0.8, y: yy, a: 255 }, timer) //在500毫秒内移动到（300,200）。
        //             .easing(Easing.Quadratic.In) // 使用缓和功能使动画平滑。
        //             .onUpdate((temp) => {
        //                 DzFrameSetAlpha(txte_tips_ui, temp.a)
        //                 DzFrameSetPoint(txte_tips_ui, FRAMEPOINT_CENTER, DzGetGameUI(), FRAMEPOINT_BOTTOMLEFT, temp.x, temp.y)
        //             })
        //         tween.start()
        //         // 隐藏ui
        //         BaseUtil.runLater(timer / 1000, () => {
        //             DzFrameShow(txte_tips_ui, false)
        //         })
        //         i++
        //     }, count)
        // }
    }

    //  刷怪函数
    static onWave(this: void) {

        CreeperAttackWaveState.wave_level++;
        DisplayTimedTextToPlayer(Player(0), 0, 0, 0, 'level触发:' + CreeperAttackWaveState.wave_level)

        let config = CreeperAttackWaveState.config;
        // 获取普通怪物id
        let unit_Id = config.monster_ID[(CreeperAttackWaveState.wave_level - 1) % config.monster_ID.length]

        // 获取精英怪怪物id // 多少波刷一次
        let eliter_ID: string
        if (CreeperAttackWaveState.config.eliter_is) {
            if (CreeperAttackWaveState.wave_level % config.eliter_wave == 0) {
                eliter_ID = config.eliter_ID[(CreeperAttackWaveState.wave_level - 1) % config.eliter_ID.length]
            }
        }
        // // 跳跃尾翼  //Butterfly Barrage.mdx
        // let effect_str = 'Abilities\\Weapons\\IllidanMissile\\IllidanMissile.mdl' 
        let effect_str = 'Butterfly Barrage.mdx'
        // 跳跃位移的速率
        let rate = 50
        //精英怪次数
        let eliter_count = 0
        let temp = R2I(config.monster_count / config.eliter_count)
        // boss次数
        let Boss_count = 0
        // 创建普通怪物        ------------------------
        BaseUtil.onTimer(config.wave_creeper_interval, (count) => {
            //给四个玩家创建敌人
            for (let i = 0; i < 4; i++) {
                let player = Player(i)
                let t = i
                if (GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING
                    && GetPlayerController(player) == MAP_CONTROL_USER) {

                    // 创建普通怪物    ----------------------------------------------
                    // 获取创建的区域坐标
                    let create_x = GetRectCenterX(config.create_monster_rect[i]);
                    let create_y = GetRectCenterY(config.create_monster_rect[i]);
                    // 获取创建的玩家
                    let monster_palyer = config.monster_palyer[i]
                    // 获取跳跃的区域
                    let jump_rect = config.monster_jump_rect[i]
                    // 攻击坐标
                    let attack_x = GetRectCenterX(config.monster_attack_rect[i]);
                    let attack_y = GetRectCenterY(config.monster_attack_rect[i]);
                    // 一次刷多少个 普通怪物---
                    CreeperAttackWaveState.createCreeper(monster_palyer, unit_Id, create_x, create_y, attack_x, attack_y, jump_rect, rate, effect_str)

                    // 刷精英怪物   在当前波次种，第x个刷精英怪 ----------------------------------------------
                    if (CreeperAttackWaveState.config.eliter_is) {
                        if (eliter_count < config.eliter_count && eliter_ID
                            && count == temp * (eliter_count + 1)) {
                            eliter_count++
                            // 一次刷多少个 普通怪物---
                            BaseUtil.runLater(1, () => {
                                CreeperAttackWaveState.createCreeper(monster_palyer, eliter_ID, create_x, create_y, attack_x, attack_y, jump_rect, rate, effect_str)
                            }, config.eliter_count_num)
                        }
                    }
                }
                // 最后刷BOSS单位       ------------------------------------------------------------
                if (CreeperAttackWaveState.wave_level % (config.boss_wave + 1) == 0) {
                    let Boss_ID: string = config.Boss_ID[Math.floor((CreeperAttackWaveState.wave_level) / config.Boss_ID.length)]
                    DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'Boss_ID===' + Math.floor((CreeperAttackWaveState.wave_level) / config.Boss_ID.length))
                    // 攻击坐标
                    let create_x = GetRectCenterX(config.monster_jump_rect[t]);
                    let create_y = GetRectCenterY(config.monster_jump_rect[t]);
                    // 镜头
                    if (GetLocalPlayer() == player) {
                        PanCameraToTimed(create_x, create_y, 0) //Units\\Demon\\Infernal\\InfernalBirth.mdl
                    }
                    let tx = AddSpecialEffect("huoyun.mdx ", create_x, create_y)
                    EXSetEffectSize(tx, 2)
                    DestroyEffect(tx)
                    // BaseUtil.runLater(1, () => {
                    let tx1 = AddSpecialEffect("Abilities\\Spells\\NightElf\\BattleRoar\\RoarCaster.mdl", create_x, create_y)
                    EXSetEffectSize(tx1, 3)
                    DestroyEffect(tx1)
                    // 创建的单位 
                    let u = CreateUnit(config.monster_palyer[t], Boss_ID, create_x, create_y, 0)
                    AddSpecialEffectTarget('2d60d2513e535bfb.mdx', u, 'origin')
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, Boss_ID, num)
                    //主动攻击范围
                    // SetUnitAcquireRange(u, 6000)
                    //忽视单位警戒点
                    RemoveGuardPosition(u)
                    // })
                    return false
                }
                // // 刷的次数不超过普通怪物的次数
                if (count >= config.monster_count) {

                    return false
                }
            }

            return true
        })



    }

    // // 刷兵到攻击移动到指定坐标
    static createCreeper(monster_palyer: player, unit_Id: string, create_x: number, create_y: number,
        attack_x: number, attack_y: number, jump_rect: rect, rate: number, effect_str: string,) {
        // 创建的单位
        let u = CreateUnit(monster_palyer, unit_Id, create_x, create_y, 0)
        if (GetUnitTypeId(u) == FourCC('e000')) {
            RemoveUnit(u)
        }
        //添加元素抗性
        let num = GetRandomInt(0, 6)
        CreeperAttackWaveState.addElementResistance(u, unit_Id, num)
        //主动攻击范围
        // SetUnitAcquireRange(u, 6000)
        //忽视单位警戒点
        RemoveGuardPosition(u)
        // 攻击u
        IssuePointOrder(u, "move", attack_x, attack_y)
        // 跳跃的坐标
        let jump_x = GetRandomReal(GetRectMinX(jump_rect), GetRectMaxX(jump_rect))
        let jump_y = GetRandomReal(GetRectMinY(jump_rect), GetRectMaxY(jump_rect))
        // // 跳跃
        NumerivalUtil.Unit_Jump_Formula(u, create_x, create_y, jump_x, jump_y, rate, effect_str)

    }
    /**
     * 
     * @param unit 
     * @param unitId 
     * @param num   0=雷  1=金  2=木 3=水 4=火  5=土  6=冰
     */
    static addElementResistance(unit: unit, unitId: string, num: number) {
        for (let k in CreeperAttackWaveState.resistanceConfig) {
            let data = CreeperAttackWaveState.resistanceConfig[k]
            if (unitId == k) {
                if (unitId == null) return
                if (num == 0) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\Orc\\FeralSpirit\\feralspiritdone.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).thunder_resistance = data.ele
                } else if (num == 1) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\NightElf\\FaerieFire\\FaerieFireTarget.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).gold_resistance = data.ele
                } else if (num == 2) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\Human\\Banish\\BanishTarget.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).wood_resistance = data.ele
                } else if (num == 3) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\Undead\\FreezingBreath\\FreezingBreathMissile.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).water_resistance = data.ele
                } else if (num == 4) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\NightElf\\Immolation\\ImmolationTarget.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).fire_resistance = data.ele
                } else if (num == 5) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\Items\\StaffOfSanctuary\\Staff_Sanctuary_Target.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).Soil_resistance = data.ele
                } else if (num == 6) {
                    let effect = AddSpecialEffectTarget('Abilities\\Spells\\Undead\\FrostArmor\\FrostArmorTarget.mdl', unit, 'origin')
                    EXSetEffectSize(effect, 2)
                    DataBase.getUnitSolarData(unit).ice_resistance = data.ele
                }
            }
        }
    }
    //元素抗性
    static resistanceConfig: {
        [id: string]: {
            ele?: number,
            type?: string
        }
    } = {
            'q04d': { ele: 0 },
            'q04e': { ele: 5 },
            'q04f': { ele: 11 },
            'q04g': { ele: 17 },
            'q04h': { ele: 52 },
            'q04i': { ele: 29 },
            'q04j': { ele: 35 },
            'q04k': { ele: 41 },
            'q04l': { ele: 47 },
            'q04m': { ele: 60 },
            'q04n': { ele: 59 },
            'q04o': { ele: 65 },
            'q04p': { ele: 71 },
            'q04q': { ele: 77 },
            'q04r': { ele: 84 },
            'q04s': { ele: 89 },
            'q04t': { ele: 95 },
            'q04u': { ele: 101 },
            'q04v': { ele: 107 },
            'q050': { ele: 124 },
            'q0d8': { ele: 119 },
            'q0d9': { ele: 125 },
            'q0da': { ele: 131 },
            'q0db': { ele: 137 },
            'q0dc': { ele: 180 },
            'q0dd': { ele: 149 },
            'q0de': { ele: 155 },
            'q0df': { ele: 161 },
            'q0dg': { ele: 167 },
            'q0dh': { ele: 252 },

        }



}

