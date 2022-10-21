import EQ_Three_In_One from "cyttp/Equipment/EQ_Three_In_One"
import Hope_Item from "cyttp/Equipment/Hope_Item"
import CreeperAttackWaveState from "cyttp/FoeData/enemy/CreeperAttackWaveState"
import Item_UI_Initialization from "cyttp/ItemData/Item_UI_Initialization"
import AnimationUtil from "cyttp/Util/AnimationUtil"
import HoepColorText from "cyttp/Util/HoepColorText"
import UiButtonUtil from "cyttp/Util/UiButtonUtil"
import DataBase from "solar/common/DataBase"
import { Easing, Tween } from "solar/tween"
import BaseUtil from "solar/util/BaseUtil"
import SelectUtil from "solar/util/SelectUtil"
import { Frame } from "solar/w3ts/handles/frame"
import { MapPlayer } from "solar/w3ts/handles/player"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"


DzLoadToc('UI\\path.toc')
/**
 * 挑战BOSS
 */
export default class ChallengeBoss {

    static rectArr = [gg_rct_p1_equip_zb, gg_rct_p2_equip_zb, gg_rct_p3_equip_zb, gg_rct_p4_equip_zb]
    //金币
    static level: number[] = [0, 0, 0, 0]
    //木材
    static level2: number[] = [0, 0, 0, 0]
    //经验
    static level3: number[] = [0, 0, 0, 0]
    //装备
    static level4: number[] = [0, 0, 0, 0]
    //升星
    static level5: number[] = [0, 0, 0, 0]
    //境界
    static jj_num: number[] = [0, 0, 0, 0]
    //图片----
    static bg: string[] = [
        //底部背景图片
        "UI_Icon\\tzbossbg.tga",
        //切换图片左
        "UI_Icon\\fj_left.tga",
        //切换图片右
        "UI_Icon\\fj_right.tga",
        //金币
        "cstp.tga",
        //木材
        "cstp.tga",
        //装备
        "cstp.tga",
        //经验
        "cstp.tga",
        //升星
        "cstp.tga",
        //倒计时蒙版
        "nothing.tga"
    ]

    static config: { [name: string]: string[] } = {
        '金币怪': [
            'q0nb',
            'q0nc',
            'q0nd',
            'q0ne',
            'q0nf',
            'q0ng',
            'q0nh',
            'q0ni',
            'q0nj',
        ],
        '木材怪': [
            'q1da',
            'q1db',
            'q1dc',
            'q1dd',
            'q1de',
            'q1df',
            'q1dg',
            'q1dh',
            'q1di',
        ],
        '经验怪': [
            'q1dj',
            'q1dk',
            'q1dl',
            'q1dm',
            'q1dn',
            'q1do',
            'q1dp',
            'q1dq',
            'q1dr',
        ],
        '装备怪': [
            'q1ds',
            'q1dt',
            'q1du',
            'q1dv',
            'q1e0',
            'q1e1',
            'q1e2',
            'q1e3',
            'q1e4',

        ],
        '升星怪': [ //重新换
            'Hpal',
            'Hpal',
            'Hpal',
            'Hpal',
            'q1e2',
        ]
    }
    //奖励
    static reward: { [name: number]: number[] } = {
        //金币
        0: [1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 7800,],
        //木材
        1: [10, 15, 20, 25, 30, 35, 40, 45, 50,],
        //经验
        2: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,],
    }



    //刷新区域
    static bossRect: rect[] = [gg_rct_p1_sb_chukou, gg_rct_p2_sb_chukou, gg_rct_p3_sb_chukou, gg_rct_p4_sb_chukou]

    // 记录ui大小
    static panel_UI: { [ui_KEY: string]: number } = {}
    // 记录ui 名字序号
    UIname: number = 0

    static isShow = false

    constructor() {
        // // 注册事件同步数据
        let triggerHandle = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle, "点击金币Boss", false)
        TriggerAddAction(triggerHandle, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)
            let jbg = config['金币怪']
            let gold = reward[0]
            if (!DataBase.getPlayerSolarData(player).开关1) {
                DataBase.getPlayerSolarData(player).开关1 = true
                if (player == GetLocalPlayer()) {
                    DzFrameShow(panel_UI['金币倒计时'], true)
                }
                let x = GetRectCenterX(ChallengeBoss.bossRect[index])
                let y = GetRectCenterY(ChallengeBoss.bossRect[index])
                let boss = CreateUnit(Player(5 + index), FourCC(jbg[ChallengeBoss.level[index]]), x, y, 0)
                //添加元素抗性
                let num = GetRandomInt(0, 6)
                CreeperAttackWaveState.addElementResistance(boss, jbg[ChallengeBoss.level[index]], num)
                handle_ref(boss)
                BaseUtil.onTimer(1, (count) => {
                    if (player == GetLocalPlayer()) {
                        DzFrameSetText(panel_UI['金币倒计时文本'], HoepColorText('red') + (60 - count))
                        if ((60 - count) < 10) {
                            DzFrameSetPoint(panel_UI['金币倒计时文本'], 4, panel_UI['金币倒计时'], 4, 0.0125, -0.01)
                        }
                    }
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + count);
                    if (count == 60 && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                        handle_unref(boss)
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['金币倒计时'], false)
                        }
                        DataBase.getPlayerSolarData(player).开关1 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时挑战失败！');
                        RemoveUnit(boss)
                        return false
                    }  //单位生命值小于0.4 为死亡
                    if (count != 60 && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['金币倒计时'], false)
                        }

                        let pp = ChallengeBoss.jj_num[index] ? ChallengeBoss.jj_num[index] : 0
                        pp += 1
                        ChallengeBoss.jj_num[index] = pp

                        //给予奖励
                        AdjustPlayerStateBJ(gold[ChallengeBoss.level[index]], player, PLAYER_STATE_RESOURCE_GOLD)
                        DataBase.getPlayerSolarData(player).开关1 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '挑战成功');
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '奖励' + gold[ChallengeBoss.level[index]] + '金币');
                        //判断是否大于九
                        if (ChallengeBoss.level[index] < jbg.length - 1) {
                            ChallengeBoss.level[index] += 1

                            DisplayTimedTextToPlayer(player, 0, 0, 60, '' + ChallengeBoss.level[index]);
                        } else {
                            ChallengeBoss.level[index] = jbg.length - 1
                        }
                        return false
                    }
                    return true
                })
            } else {
                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '正在挑战当前BOSS!');
            }
        });
        // // 注册事件同步数据
        let triggerHandle1 = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle1, "点击木材Boss", false)
        TriggerAddAction(triggerHandle1, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)
            let mcg = config['木材怪']
            let lumber = reward[1]
            if (!DataBase.getPlayerSolarData(player).开关2) {
                DataBase.getPlayerSolarData(player).开关2 = true
                if (player == GetLocalPlayer()) {
                    DzFrameShow(panel_UI['木材倒计时'], true)
                }
                let x = GetRectCenterX(ChallengeBoss.bossRect[index])
                let y = GetRectCenterY(ChallengeBoss.bossRect[index])
                let boss = CreateUnit(Player(5 + index), FourCC(mcg[ChallengeBoss.level2[index]]), x, y, 0)
                //添加元素抗性
                let num = GetRandomInt(0, 6)
                CreeperAttackWaveState.addElementResistance(boss, mcg[ChallengeBoss.level2[index]], num)
                handle_ref(boss)
                BaseUtil.onTimer(1, (count) => {
                    if (player == GetLocalPlayer()) {
                        DzFrameSetText(panel_UI['木材倒计时文本'], HoepColorText('red') + (60 - count))
                        if ((60 - count) < 10) {
                            DzFrameSetPoint(panel_UI['木材倒计时文本'], 4, panel_UI['木材倒计时'], 4, 0.0125, -0.01)
                        }
                    }
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + count);
                    if (count == 60 && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                        handle_unref(boss)
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['木材倒计时'], false)
                        }
                        DataBase.getPlayerSolarData(player).开关2 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时挑战失败！');
                        RemoveUnit(boss)
                        return false
                    }  //单位生命值小于0.4 为死亡
                    if (count != 60 && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['木材倒计时'], false)
                        }
                        let pp = ChallengeBoss.jj_num[index] ? ChallengeBoss.jj_num[index] : 0
                        pp += 1
                        ChallengeBoss.jj_num[index] = pp

                        //给予奖励
                        AdjustPlayerStateBJ(lumber[ChallengeBoss.level2[index]], player, PLAYER_STATE_RESOURCE_LUMBER)
                        DataBase.getPlayerSolarData(player).开关2 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '挑战成功');
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + lumber[ChallengeBoss.level2[index]] + '木材');
                        if (ChallengeBoss.level2[index] < mcg.length - 1) {
                            ChallengeBoss.level2[index] += 1
                            DisplayTimedTextToPlayer(player, 0, 0, 60, '' + ChallengeBoss.level2[index]);
                        } else {
                            ChallengeBoss.level2[index] = mcg.length - 1
                        }
                        return false
                    }
                    return true
                })
            } else {
                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '正在挑战当前BOSS!');
            }
        });
        // // 注册事件同步数据
        let triggerHandle2 = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle2, "点击经验Boss", false)
        TriggerAddAction(triggerHandle2, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)
            let jyg = config['经验怪']
            let experience = reward[2]
            if (!DataBase.getPlayerSolarData(player).开关3) {
                DataBase.getPlayerSolarData(player).开关3 = true
                if (player == GetLocalPlayer()) {
                    DzFrameShow(panel_UI['经验倒计时'], true)
                }
                let x = GetRectCenterX(ChallengeBoss.bossRect[index])
                let y = GetRectCenterY(ChallengeBoss.bossRect[index])
                let boss = CreateUnit(Player(5 + index), FourCC(jyg[ChallengeBoss.level3[index]]), x, y, 0)
                //添加元素抗性
                let num = GetRandomInt(0, 6)
                CreeperAttackWaveState.addElementResistance(boss, jyg[ChallengeBoss.level3[index]], num)
                handle_ref(boss)
                BaseUtil.onTimer(1, (count) => {
                    if (player == GetLocalPlayer()) {
                        DzFrameSetText(panel_UI['经验倒计时文本'], HoepColorText('red') + (60 - count))
                        if ((60 - count) < 10) {
                            DzFrameSetPoint(panel_UI['经验倒计时文本'], 4, panel_UI['经验倒计时'], 4, 0.0125, -0.01)
                        }
                    }
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + count);
                    if (count == 60 && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                        handle_unref(boss)
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['经验倒计时'], false)
                        }
                        DataBase.getPlayerSolarData(player).开关3 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时挑战失败！');
                        RemoveUnit(boss)
                        return false
                    }  //单位生命值小于0.4 为死亡
                    if (count != 60 && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['经验倒计时'], false)
                        }
                        let pp = ChallengeBoss.jj_num[index] ? ChallengeBoss.jj_num[index] : 0
                        pp += 1
                        ChallengeBoss.jj_num[index] = pp
                        //给予奖励
                        AddHeroXP(DataBase.getPlayerSolarData(player).创建英雄单位, experience[ChallengeBoss.level3[index]], true)
                        DataBase.getPlayerSolarData(player).开关3 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '挑战成功');
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + experience[ChallengeBoss.level3[index]] + '经验');
                        DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + ChallengeBoss.level3[index]);
                        if (ChallengeBoss.level3[index] < jyg.length - 1) {
                            ChallengeBoss.level3[index] += 1
                            DisplayTimedTextToPlayer(player, 0, 0, 60, '' + ChallengeBoss.level3[index]);
                        } else {
                            ChallengeBoss.level3[index] = jyg.length - 1
                        }
                        return false
                    }
                    return true
                })
            } else {
                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '正在挑战当前BOSS!');
            }
        });
        // // 注册事件同步数据
        let triggerHandle3 = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle3, "点击装备Boss", false)
        TriggerAddAction(triggerHandle3, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)
            let zbg = config['装备怪']
            if (!DataBase.getPlayerSolarData(player).开关4) {
                DataBase.getPlayerSolarData(player).开关4 = true
                if (player == GetLocalPlayer()) {
                    DzFrameShow(panel_UI['装备倒计时'], true)
                }
                let x = GetRectCenterX(ChallengeBoss.bossRect[index])
                let y = GetRectCenterY(ChallengeBoss.bossRect[index])
                let boss = CreateUnit(Player(5 + index), FourCC(zbg[ChallengeBoss.level4[index]]), x, y, 0)
                //添加元素抗性
                let num = GetRandomInt(0, 6)
                CreeperAttackWaveState.addElementResistance(boss, zbg[ChallengeBoss.level4[index]], num)
                handle_ref(boss)
                BaseUtil.onTimer(1, (count) => {
                    if (player == GetLocalPlayer()) {
                        DzFrameSetText(panel_UI['装备倒计时文本'], HoepColorText('red') + (60 - count))
                        if ((60 - count) < 10) {
                            DzFrameSetPoint(panel_UI['装备倒计时文本'], 4, panel_UI['装备倒计时'], 4, 0.0125, -0.01)
                        }
                    }
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + count);
                    if (count == 60 && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['装备倒计时'], false)
                        }
                        handle_unref(boss)
                        DataBase.getPlayerSolarData(player).开关4 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时挑战失败！');
                        RemoveUnit(boss)
                        return false
                    }  //单位生命值小于0.4 为死亡
                    if (count != 60 && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['装备倒计时'], false)
                        }
                        let pp = ChallengeBoss.jj_num[index] ? ChallengeBoss.jj_num[index] : 0
                        pp += 1
                        ChallengeBoss.jj_num[index] = pp
                        //给予奖励
                        let x = GetRandomReal(GetRectMinX(ChallengeBoss.rectArr[index]), GetRectMaxX(ChallengeBoss.rectArr[index]))
                        let y = GetRandomReal(GetRectMinY(ChallengeBoss.rectArr[index]), GetRectMaxY(ChallengeBoss.rectArr[index]))
                        DataBase.getPlayerSolarData(player).开关4 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '挑战成功');
                        if (ChallengeBoss.level4[index] < zbg.length - 1) {
                            ChallengeBoss.level4[index] += 1
                            if (ChallengeBoss.level4[index] == 1) {
                                for (let i = 0; i < 2; i++) { // D级装备2件
                                    let rr = GetRandomInt(0, EQ_Three_In_One.level1.length - 1)
                                    Hope_Item.Create_Item(EQ_Three_In_One.level1[rr], x, y, index)
                                }
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '1★装备二件');
                            } else if (ChallengeBoss.level4[index] == 2) {// C级装备1件
                                let rr = GetRandomInt(0, EQ_Three_In_One.level2.length - 1)
                                Hope_Item.Create_Item(EQ_Three_In_One.level2[rr], x, y, index)
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '2★装备一件');
                            } else if (ChallengeBoss.level4[index] == 3) {// C级装备2件
                                for (let i = 0; i < 2; i++) {
                                    let rr = GetRandomInt(0, EQ_Three_In_One.level2.length - 1)
                                    Hope_Item.Create_Item(EQ_Three_In_One.level2[rr], x, y, index)
                                }
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '2★装备二件');
                            } else if (ChallengeBoss.level4[index] == 4) {//B级装备1件
                                let rr = GetRandomInt(0, EQ_Three_In_One.level3.length - 1)
                                Hope_Item.Create_Item(EQ_Three_In_One.level3[rr], x, y, index)
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '3★装备一件');
                            } else if (ChallengeBoss.level4[index] == 5) {//B级装备2件i++
                                for (let i = 0; i < 2; i++) {
                                    let rr = GetRandomInt(0, EQ_Three_In_One.level3.length - 1)
                                    Hope_Item.Create_Item(EQ_Three_In_One.level3[rr], x, y, index)
                                }
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '3★装备二件');
                            } else if (ChallengeBoss.level4[index] == 6) {//a级装备1件
                                let rr = GetRandomInt(0, EQ_Three_In_One.level4.length - 1)
                                Hope_Item.Create_Item(EQ_Three_In_One.level4[rr], x, y, index)
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '4★装备一件');
                            } else if (ChallengeBoss.level4[index] == 7) {//a级装备2件i++
                                for (let i = 0; i < 2; i++) {
                                    let rr = GetRandomInt(0, EQ_Three_In_One.level4.length - 1)
                                    Hope_Item.Create_Item(EQ_Three_In_One.level4[rr], x, y, index)
                                }
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '4★装备二件');
                            } else if (ChallengeBoss.level4[index] == 8) {//s级装备1件
                                let rr = GetRandomInt(0, EQ_Three_In_One.level5.length - 1)
                                Hope_Item.Create_Item(EQ_Three_In_One.level5[rr], x, y, index)
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '5★装备一件');
                            } else if (ChallengeBoss.level4[index] == 9) {//s级装备2件i++
                                for (let i = 0; i < 2; i++) {
                                    let rr = GetRandomInt(0, EQ_Three_In_One.level5.length - 1)
                                    Hope_Item.Create_Item(EQ_Three_In_One.level5[rr], x, y, index)
                                }
                                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '奖励' + '5★装备二件');
                            }

                            // DisplayTimedTextToPlayer(player, 0, 0, 60, '' + ChallengeBoss.level4[index]);
                        } else {
                            ChallengeBoss.level4[index] = zbg.length - 1
                        }
                        return false
                    }
                    return true
                })
            } else {
                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '挑战BOSS进行中!');
            }
        });
        // // 注册事件同步数据
        let triggerHandle4 = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle4, "点击升星Boss", false)
        TriggerAddAction(triggerHandle4, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)
            let zbg = config['升星怪']
            if (!DataBase.getPlayerSolarData(player).开关5) {
                DataBase.getPlayerSolarData(player).开关5 = true
                if (player == GetLocalPlayer()) {
                    DzFrameShow(panel_UI['升星倒计时'], true)
                }
                let x = GetRectCenterX(ChallengeBoss.bossRect[index])
                let y = GetRectCenterY(ChallengeBoss.bossRect[index])
                let boss = CreateUnit(Player(5 + index), FourCC(zbg[ChallengeBoss.level5[index]]), x, y, 0)
                //添加元素抗性
                let num = GetRandomInt(0, 6)
                CreeperAttackWaveState.addElementResistance(boss, zbg[ChallengeBoss.level5[index]], num)
                handle_ref(boss)
                BaseUtil.onTimer(1, (count) => {
                    if (player == GetLocalPlayer()) {
                        DzFrameSetText(panel_UI['升星倒计时文本'], HoepColorText('red') + (60 - count))
                        if ((60 - count) < 10) {
                            DzFrameSetPoint(panel_UI['升星倒计时文本'], 4, panel_UI['升星倒计时'], 4, 0.0125, -0.01)
                        }
                    }
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + count);
                    if (count == 60 && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['升星倒计时'], false)
                        }
                        handle_unref(boss)
                        DataBase.getPlayerSolarData(player).开关5 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时挑战失败！');
                        RemoveUnit(boss)
                        return false
                    }  //单位生命值小于0.4 为死亡
                    if (count != 60 && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                        if (player == GetLocalPlayer()) {
                            DzFrameShow(panel_UI['升星倒计时'], false)
                        }
                        DataBase.getPlayerSolarData(player).开关5 = null
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '挑战成功获得1★升星石自动星级提升');
                        if (ChallengeBoss.level5[index] < zbg.length - 1) {
                            ChallengeBoss.level5[index] += 1
                            //英雄单位
                            let solarData = DataBase.getPlayerSolarData(player).创建英雄单位
                            //记录
                            let solarUnitData = Unit.fromHandle(solarData).solarData
                            if (ChallengeBoss.level5[index] == 1) {
                                DestroyEffect(solarUnitData.英雄星数量)
                                let TX = AddSpecialEffectTarget('e5c7b2fb4da0a2a6.mdx', solarData, 'overhead')
                                solarUnitData.英雄星数量1 = TX
                            } else if (ChallengeBoss.level5[index] == 2) {
                                DestroyEffect(solarUnitData.英雄星数量1)
                                let TX = AddSpecialEffectTarget('2ed657d036272de3.mdx', solarData, 'overhead')
                                solarUnitData.英雄星数量2 = TX
                            } else if (ChallengeBoss.level5[index] == 3) {
                                DestroyEffect(solarUnitData.英雄星数量2)
                                let TX = AddSpecialEffectTarget('71268782063145ed.mdx', solarData, 'overhead')
                                solarUnitData.英雄星数量2 = TX
                            } else if (ChallengeBoss.level5[index] == 4) {
                                DestroyEffect(solarUnitData.英雄星数量3)
                                let TX = AddSpecialEffectTarget('e20a168fa1027de2.mdx', solarData, 'overhead')
                                solarUnitData.英雄星数量4 = TX
                            }

                            // DisplayTimedTextToPlayer(player, 0, 0, 60, '' + ChallengeBoss.level4[index]);
                        } else {
                            ChallengeBoss.level5[index] = zbg.length - 1
                        }
                        return false
                    }
                    return true
                })
            } else {
                DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '挑战BOSS进行中!');
            }
        });
        // 记录UI
        let panel_UI = ChallengeBoss.panel_UI
        // 获取配置
        let config = ChallengeBoss.config
        //获取奖励
        let reward = ChallengeBoss.reward
        //
        let isShow = ChallengeBoss.isShow
        // 背景图   -------------------------
        panel_UI['背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['背景图'], 0.25, 0.05)
        DzFrameSetTexture(panel_UI['背景图'], ChallengeBoss.bg[0], 0)
        DzFrameShow(panel_UI['背景图'], true)
        // DzFrameSetPoint(panel_UI['背景图'], 3, DzGetGameUI(), 3, 0, -0.15)

        panel_UI['收缩左'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['收缩左'], 0.05, 0.05)
        DzFrameSetTexture(panel_UI['收缩左'], ChallengeBoss.bg[1], 0)
        DzFrameShow(panel_UI['收缩左'], true)
        // DzFrameSetPoint(panel_UI['收缩左'], 3, DzGetGameUI(), 3, -0.01, -0.11)

        // panel_UI['收缩右'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetSize(panel_UI['收缩右'], 0.05, 0.05)
        // DzFrameSetTexture(panel_UI['收缩右'], ChallengeBoss.bg[2], 0)
        // DzFrameShow(panel_UI['收缩右'], false)
        // DzFrameSetPoint(panel_UI['收缩右'], 3, DzGetGameUI(), 3, -0.009, -0.11)

        let sst_z = UiButtonUtil.Button_Backdrop(0.05, 0.05, panel_UI['收缩左'], this.Suit_Ui_Name())
        // let sst_l = UiButtonUtil.Button_Backdrop(0.05, 0.05, panel_UI['收缩右'], this.Suit_Ui_Name())

        let wide = 0.023
        let high = 0.023
        //------------金币挑战怪------------
        panel_UI['金币'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['金币'], wide, high)
        DzFrameSetTexture(panel_UI['金币'], ChallengeBoss.bg[3], 0)
        DzFrameShow(panel_UI['金币'], true)
        DzFrameSetPoint(panel_UI['金币'], 3, panel_UI['背景图'], 3, 0.04, 0)
        //BUTTO按钮
        let JB = UiButtonUtil.Button_Backdrop(wide, high, panel_UI['金币'], this.Suit_Ui_Name())
        //------------木材挑战怪------------
        panel_UI['木材'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['木材'], wide, high)
        DzFrameSetTexture(panel_UI['木材'], ChallengeBoss.bg[4], 0)
        DzFrameShow(panel_UI['木材'], true)
        DzFrameSetPoint(panel_UI['木材'], 3, panel_UI['背景图'], 3, 0.07, 0)
        // //BUTTO按钮
        let MC = UiButtonUtil.Button_Backdrop(wide, high, panel_UI['木材'], this.Suit_Ui_Name())
        //------------装备挑战怪------------
        panel_UI['装备'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['装备'], wide, high)
        DzFrameSetTexture(panel_UI['装备'], ChallengeBoss.bg[5], 0)
        DzFrameShow(panel_UI['装备'], true)
        DzFrameSetPoint(panel_UI['装备'], 3, panel_UI['背景图'], 3, 0.10, 0)
        // //BUTTO按钮
        let ZB = UiButtonUtil.Button_Backdrop(wide, high, panel_UI['装备'], this.Suit_Ui_Name())
        //------------经验挑战怪------------
        panel_UI['经验'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['经验'], wide, high)
        DzFrameSetTexture(panel_UI['经验'], ChallengeBoss.bg[6], 0)
        DzFrameShow(panel_UI['经验'], true)
        DzFrameSetPoint(panel_UI['经验'], 3, panel_UI['背景图'], 3, 0.13, 0)
        // //BUTTO按钮
        let JY = UiButtonUtil.Button_Backdrop(wide, high, panel_UI['经验'], this.Suit_Ui_Name())

        //------------升星挑战怪------------
        panel_UI['升星'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['升星'], wide, high)
        DzFrameSetTexture(panel_UI['升星'], ChallengeBoss.bg[7], 0)
        DzFrameShow(panel_UI['升星'], true)
        DzFrameSetPoint(panel_UI['升星'], 3, panel_UI['背景图'], 3, 0.16, 0)
        // //BUTTO按钮
        let SX = UiButtonUtil.Button_Backdrop(wide, high, panel_UI['升星'], this.Suit_Ui_Name())

        // -----------------------------------------------------------------
        // 点击事件  切换显示 挑战boss条
        DzFrameSetScriptByCode(sst_z, FRAMEEVENT_CONTROL_CLICK, () => {
            isShow = !isShow
            if (isShow == true) {
                AnimationUtil.telekineticMovement(panel_UI['背景图'], 500, -0.3, 0.15, 0.15, 0.15)
            } else {
                AnimationUtil.instantReturn(panel_UI['背景图'], 500, 0.15, 0.15, -0.3, 0.15)
            }
        }, false)
        //------------------------------------------------------------------------------
        //**********************点击金币怪****************************
        DzFrameSetScriptByCode(JB, FRAMEEVENT_CONTROL_CLICK, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            //同步数据
            let str = index + '_'
            DzSyncData("点击金币Boss", str)

        }, false)
        //**********************点击木材怪****************************
        DzFrameSetScriptByCode(MC, FRAMEEVENT_CONTROL_CLICK, () => {

            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            //同步数据
            let str = index + '_'
            DzSyncData("点击木材Boss", str)

        }, false)
        //**********************点击经验怪****************************
        DzFrameSetScriptByCode(JY, FRAMEEVENT_CONTROL_CLICK, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            //同步数据
            let str = index + '_'
            DzSyncData("点击经验Boss", str)

        }, false)
        //**********************点击装备怪****************************
        DzFrameSetScriptByCode(ZB, FRAMEEVENT_CONTROL_CLICK, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            //同步数据
            let str = index + '_'
            DzSyncData("点击装备Boss", str)
        }, false)
        //**********************点击升星怪****************************
        DzFrameSetScriptByCode(SX, FRAMEEVENT_CONTROL_CLICK, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            //同步数据
            let str = index + '_'
            DzSyncData("点击升星Boss", str)
        }, false)

        //===================================================鼠标hover小火锅 ===========================
        // 边框 --------------------------------
        let jamb = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "Demo_BorderBack", 0)
        DzFrameShow(jamb, false)
        // 边框图片 --------------------------------
        let jam_BG = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), jamb, "template", 0)
        // DzFrameSetPoint(butt_bg, 4, all_frame['back_map'], 2, -0.01, -0.01)
        DzFrameSetSize(jam_BG, 0.03, 0.03)
        // 边框名字 --------------------------------
        let jamb_name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_name, 0.06, 0.016)
        DzFrameSetFont(jamb_name, 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameSetPoint(jamb_name, 3, jam_BG, 5, 0.005, 0)
        DzFrameSetText(jamb_name, '套装部件名字')
        DzFrameSetTextAlignment(jamb_name, TEXTALIGN_CENTER)
        // 边框提示 --------------------------------
        let jamb_tip = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_tip, 0.13, 0.016)
        DzFrameSetFont(jamb_tip, 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameSetPoint(jamb_tip, 0, jam_BG, 6, 0, -0.008)
        DzFrameSetText(jamb_tip, '套装部件获取提示')
        DzFrameSetTextAlignment(jamb_tip, TEXTALIGN_LEFT)
        // 边框说明 --------------------------------
        let jamb_txt = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_txt, 0.13, 0.05)
        DzFrameSetFont(jamb_txt, 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameSetPoint(jamb_txt, 0, jamb_tip, 6, 0, 0)
        DzFrameSetText(jamb_txt, '套装部件文本')
        DzFrameSetTextAlignment(jamb_txt, TEXTALIGN_LEFT)


        this.button_into_Tip(JB, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, 1)
        this.button_into_Tip(MC, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, 2)
        this.button_into_Tip(JY, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, 3)
        this.button_into_Tip(ZB, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, 4)
        this.button_into_Tip(SX, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, 5)





        /**
         * 动画frame
         * 
         */
        let bg_djs = ChallengeBoss.bg[7]

        panel_UI['金币倒计时'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['金币倒计时'], wide, high)
        DzFrameSetTexture(panel_UI['金币倒计时'], bg_djs, 0)
        DzFrameShow(panel_UI['金币倒计时'], false)
        DzFrameSetPoint(panel_UI['金币倒计时'], 3, panel_UI['背景图'], 3, 0.04, 0)

        panel_UI['金币倒计时文本'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['金币倒计时'], "template", 0)
        DzFrameSetSize(panel_UI['金币倒计时文本'], 0.03, 0.03)
        DzFrameSetFont(panel_UI['金币倒计时文本'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['金币倒计时文本'], true)
        DzFrameSetPoint(panel_UI['金币倒计时文本'], 4, panel_UI['金币倒计时'], 4, 0.01, -0.01)
        DzFrameSetText(panel_UI['金币倒计时文本'], HoepColorText('red') + '60')

        //-----------------
        panel_UI['木材倒计时'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['木材倒计时'], wide, high)
        DzFrameSetTexture(panel_UI['木材倒计时'], bg_djs, 0)
        DzFrameShow(panel_UI['木材倒计时'], false)
        DzFrameSetPoint(panel_UI['木材倒计时'], 3, panel_UI['背景图'], 3, 0.07, 0)

        panel_UI['木材倒计时文本'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['木材倒计时'], "template", 0)
        DzFrameSetSize(panel_UI['木材倒计时文本'], 0.03, 0.03)
        DzFrameSetFont(panel_UI['木材倒计时文本'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['木材倒计时文本'], true)
        DzFrameSetPoint(panel_UI['木材倒计时文本'], 4, panel_UI['木材倒计时'], 4, 0.01, -0.01)
        DzFrameSetText(panel_UI['木材倒计时文本'], HoepColorText('red') + '60')

        //-------------------
        panel_UI['装备倒计时'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['装备倒计时'], wide, high)
        DzFrameSetTexture(panel_UI['装备倒计时'], bg_djs, 0)
        DzFrameShow(panel_UI['装备倒计时'], false)
        DzFrameSetPoint(panel_UI['装备倒计时'], 3, panel_UI['背景图'], 3, 0.10, 0)

        panel_UI['装备倒计时文本'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['装备倒计时'], "template", 0)
        DzFrameSetSize(panel_UI['装备倒计时文本'], 0.03, 0.03)
        DzFrameSetFont(panel_UI['装备倒计时文本'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['装备倒计时文本'], true)
        DzFrameSetPoint(panel_UI['装备倒计时文本'], 4, panel_UI['装备倒计时'], 4, 0.01, -0.01)
        DzFrameSetText(panel_UI['装备倒计时文本'], HoepColorText('red') + '60')

        //-------------
        panel_UI['经验倒计时'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['经验倒计时'], wide, high)
        DzFrameSetTexture(panel_UI['经验倒计时'], bg_djs, 0)
        DzFrameShow(panel_UI['经验倒计时'], false)
        DzFrameSetPoint(panel_UI['经验倒计时'], 3, panel_UI['背景图'], 3, 0.13, 0)

        panel_UI['经验倒计时文本'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['经验倒计时'], "template", 0)
        DzFrameSetSize(panel_UI['经验倒计时文本'], 0.03, 0.03)
        DzFrameSetFont(panel_UI['经验倒计时文本'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['经验倒计时文本'], true)
        DzFrameSetPoint(panel_UI['经验倒计时文本'], 4, panel_UI['经验倒计时'], 4, 0.01, -0.01)
        DzFrameSetText(panel_UI['经验倒计时文本'], HoepColorText('red') + '60')

        //-------------
        panel_UI['升星倒计时'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['升星倒计时'], wide, high)
        DzFrameSetTexture(panel_UI['升星倒计时'], bg_djs, 0)
        DzFrameShow(panel_UI['升星倒计时'], false)
        DzFrameSetPoint(panel_UI['升星倒计时'], 3, panel_UI['背景图'], 3, 0.16, 0)

        panel_UI['升星倒计时文本'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['升星倒计时'], "template", 0)
        DzFrameSetSize(panel_UI['升星倒计时文本'], 0.03, 0.03)
        DzFrameSetFont(panel_UI['升星倒计时文本'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['升星倒计时文本'], true)
        DzFrameSetPoint(panel_UI['升星倒计时文本'], 4, panel_UI['升星倒计时'], 4, 0.01, -0.01)
        DzFrameSetText(panel_UI['升星倒计时文本'], HoepColorText('red') + '60')

        //境界下忍
        let trigger = new Trigger()
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
        trigger.addAction(() => {
            let p = GetOwningPlayer(GetKillingUnit())
            let index = GetPlayerId(p)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, ChallengeBoss.jj_num[index] + '境界下忍');
            if (ChallengeBoss.jj_num[index] == 5 && !DataBase.getPlayerSolarData(p).境界_下忍) {
                let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                if (lq >= 350) {
                    lq -= 350
                    MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                    AddPlayerTechResearched(p, 'R003', 1)
                    //全属性奖励
                    SelectUtil.forPlayerUnits(unit => {
                        ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 50);
                        ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 50);
                        ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 50);
                    }, index)
                    DataBase.getPlayerSolarData(p).境界_下忍 = true
                }
            }
        })



    }

    /**
      * 
      * @returns //生成UI名字
      */
    Suit_Ui_Name(): string {
        this.UIname++
        return "name" + I2S(this.UIname)
    }


    /**
  * 进入按钮 显示提示框
  * @param frame_ui 按钮UI
  * @param frame_bg 按钮UI的图片
  */
    button_into_Tip(butt: number, jamb: number, jam_BG: number, jamb_name: number, jamb_tip: number, jamb_txt: number, type?: number,) {
        // 进入事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_ENTER, () => {
            let p = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(p)
            DzFrameClearAllPoints(jam_BG)
            DzFrameSetPoint(jam_BG, 0, butt, 8, 0.025, -0.025)
            // 边框自适应
            DzFrameSetPoint(jamb, 0, jam_BG, 0, -0.01, 0.01)
            DzFrameSetPoint(jamb, 8, jamb_txt, 8, 0.01, 0 - 0.01)
            if (type == 1) {
                //金币
                let num = (ChallengeBoss.level[index] + 1)  //5 6 7 8 9 10 11
                // 更新图片 文本
                DzFrameSetTexture(jam_BG, ChallengeBoss.bg[3], 0)
                DzFrameSetText(jamb_name, '|cff7ebff1金币BOSSLv' + num + '|r')
                DzFrameSetText(jamb_tip, '|cffe55bb0击杀BOSS后，会自动提升BOSS等级(共九级)')
                DzFrameSetText(jamb_txt, '|cffdefa41奖励【 800 x 等级 + 200 】金币')
            } else if (type == 2) {
                //木材
                let num = (ChallengeBoss.level2[index] + 1)
                // 更新图片 文本
                DzFrameSetTexture(jam_BG, ChallengeBoss.bg[4], 0)
                DzFrameSetText(jamb_name, '|cff7ebff1木材BOSSLv' + num + '|r')
                DzFrameSetText(jamb_tip, '|cffe55bb0击杀BOSS后，会自动提升BOSS等级(共九级)')
                DzFrameSetText(jamb_txt, '|cffdefa41奖励【 5 x 等级 + 5 】木材')
            } else if (type == 3) {
                //经验
                let num = (ChallengeBoss.level3[index] + 1)
                // 更新图片 文本
                DzFrameSetTexture(jam_BG, ChallengeBoss.bg[5], 0)
                DzFrameSetText(jamb_name, '|cff7ebff1经验BOSSLv' + num + '|r')
                DzFrameSetText(jamb_tip, '|cffe55bb0击杀BOSS后，会自动提升BOSS等级(共九级)')
                DzFrameSetText(jamb_txt, '|cffdefa41奖励【 1000 x 等级 】经验')
            } else if (type == 4) {
                //装备
                let num = (ChallengeBoss.level4[index] + 1)
                // 更新图片 文本
                DzFrameSetTexture(jam_BG, ChallengeBoss.bg[6], 0)
                DzFrameSetText(jamb_name, '|cff7ebff1装备BOSSLv' + num + '|r')
                DzFrameSetText(jamb_tip, '|cffe55bb0击杀BOSS后，会自动提升BOSS等级(共九级)')
                DzFrameSetText(jamb_txt, '|cffdefa41奖励【 1~3 星 】装备')
            } else if (type == 5) {
                //升星
                let num = (ChallengeBoss.level5[index] + 1)
                // 更新图片 文本
                DzFrameSetTexture(jam_BG, ChallengeBoss.bg[7], 0)
                DzFrameSetText(jamb_name, '|cff7ebff1升星BOSSLv' + num + '|r')
                DzFrameSetText(jamb_tip, '|cffe55bb0击杀BOSS后，会自动提升BOSS等级(共五级)')
                DzFrameSetText(jamb_txt, '|cffdefa41奖励升星石【 1~5 星 】')
            }
            DzFrameShow(jamb, true)
            // butt注册 离开事件
        }, false)

        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            DzFrameShow(jamb, false)
        }, false)
    }

}


