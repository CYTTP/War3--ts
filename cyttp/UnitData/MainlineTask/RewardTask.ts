
import Hope_Item from "cyttp/Equipment/Hope_Item";
import CreeperAttackWaveState from "cyttp/FoeData/enemy/CreeperAttackWaveState";
import HoepColorText from "cyttp/Util/HoepColorText";
import NumerivalUtil from "cyttp/Util/NumerivalUtil";
import DataBase from "solar/common/DataBase";
import Easing from "solar/tween/Easing";
import Tween from "solar/tween/Tween";
import BaseUtil from "solar/util/BaseUtil";
import ObjectDataUtil from "solar/util/ObjectDataUtil";
import SelectUtil from "solar/util/SelectUtil";
import TextTagUtil from "solar/util/TextTagUtil";
import TweenUtil from "solar/util/TweenUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";
/**
 * 主线任务
 */
export default class RewardTask {
    static rect = [gg_rct_p1_equip_dj, gg_rct_p2_equip_dj, gg_rct_p3_equip_dj, gg_rct_p4_equip_dj]
    static _djsstr: any[][] = []
    static ui_tips: number[] = []
    //记录是否进行下一页
    static flip: number[] = [0, 0, 0, 0]
    //刷新区域
    static bossRect: rect[] = [
        gg_rct_p1_sb_chukou,
        gg_rct_p2_sb_chukou,
        gg_rct_p3_sb_chukou,
        gg_rct_p4_sb_chukou
    ]
    static config: {
        [id: string]: {
            dwId?: string,
            time?: number,
            item?: string,
            type?: string,
            count?: number,
            TechResearch?: string
        }
    } = {
            'q178': { dwId: 'q0nl', time: 50, item: 'q1c2', type: 'small', count: 30, TechResearch: '' },
            'q179': { dwId: 'q0nm', time: 50, item: 'q1c7', type: 'small', count: 30, TechResearch: 'R00A' },
            'q17a': { dwId: 'q0nn', time: 50, item: 'q1cc', type: 'small', count: 30, TechResearch: 'R00B' },
            'q17b': { dwId: 'q0no', time: 50, item: 'q1ch', type: 'small', count: 30, TechResearch: 'R00C' },
            'q17c': { dwId: 'q0np', time: 50, item: 'I00B', type: 'BOSS', count: 1, TechResearch: 'R00D' },
            'q17d': { dwId: 'q0nq', time: 50, item: 'q1cm', type: 'small', count: 30, TechResearch: 'R00E' },
            'q17e': { dwId: 'q0nr', time: 50, item: 'q1cr', type: 'small', count: 30, TechResearch: 'R00F' },
            'q17f': { dwId: 'q0ns', time: 50, item: 'q1d0', type: 'small', count: 30, TechResearch: 'R00G' },
            'q17g': { dwId: 'q0nt', time: 50, item: 'q1d5', type: 'small', count: 30, TechResearch: 'R00H' },
            'q17h': { dwId: 'q0nu', time: 50, item: 'I00B', type: 'BOSS', count: 1, TechResearch: 'R00I' },
            'q17i': { dwId: 'q0nv', time: 50, item: 'q1c3', type: 'small', count: 30, TechResearch: 'R00J' },
            'q17j': { dwId: 'q0o0', time: 50, item: 'q1c8', type: 'small', count: 30, TechResearch: 'R00K' },
            'q17k': { dwId: 'q0o1', time: 50, item: 'q1cd', type: 'small', count: 30, TechResearch: 'R00L' },
            'q17l': { dwId: 'q0o2', time: 50, item: 'q1ci', type: 'small', count: 30, TechResearch: 'R00M' },
            'q17m': { dwId: 'q0o3', time: 50, item: 'I00A', type: 'BOSS', count: 1, TechResearch: 'R00N' },
            'q17n': { dwId: 'q0o4', time: 50, item: 'q1cn', type: 'small', count: 30, TechResearch: 'R00O' },
            'q17o': { dwId: 'q0o5', time: 50, item: 'q1cs', type: 'small', count: 30, TechResearch: 'R00P' },
            'q17p': { dwId: 'q0o6', time: 50, item: 'q1d1', type: 'small', count: 30, TechResearch: 'R00Q' },
            'q17q': { dwId: 'q0o7', time: 50, item: 'q1d6', type: 'small', count: 30, TechResearch: 'R00R' },
            'q17r': { dwId: 'q0o8', time: 50, item: 'I00A', type: 'BOSS', count: 1, TechResearch: 'R00S' },
            'q17s': { dwId: 'q0o9', time: 50, item: 'q1c4', type: 'small', count: 30, TechResearch: 'R00T' },
            'q17t': { dwId: 'q0oa', time: 50, item: 'q1c9', type: 'small', count: 30, TechResearch: 'R00U' },
            'q17u': { dwId: 'q0ob', time: 50, item: 'q1ce', type: 'small', count: 30, TechResearch: 'R00V' },
            'q17v': { dwId: 'q0oc', time: 50, item: 'q1cj', type: 'small', count: 30, TechResearch: 'R00W' },
            'q180': { dwId: 'q0od', time: 50, item: 'I00D', type: 'BOSS', count: 1, TechResearch: 'R00X' },
            'q181': { dwId: 'q0oe', time: 50, item: 'q1co', type: 'small', count: 30, TechResearch: 'R00Y' },
            'q182': { dwId: 'q0of', time: 50, item: 'q1ct', type: 'small', count: 30, TechResearch: 'R00Z' },
            'q183': { dwId: 'q0og', time: 50, item: 'q1d2', type: 'small', count: 30, TechResearch: 'R010' },
            'q184': { dwId: 'q0oh', time: 50, item: 'q1d7', type: 'small', count: 30, TechResearch: 'R011' },
            'q185': { dwId: 'q0oi', time: 50, item: 'I00D', type: 'BOSS', count: 1, TechResearch: 'R012' },
            'q186': { dwId: 'q0oj', time: 50, item: 'q1c5', type: 'small', count: 30, TechResearch: 'R013' },
            'q187': { dwId: 'q0ok', time: 50, item: 'q1ca', type: 'small', count: 30, TechResearch: 'R014' },
            'q188': { dwId: 'q0ol', time: 50, item: 'q1cf', type: 'small', count: 30, TechResearch: 'R015' },
            'q189': { dwId: 'q0om', time: 50, item: 'q1ck', type: 'small', count: 30, TechResearch: 'R016' },
            'q18a': { dwId: 'q0on', time: 50, item: 'I00C', type: 'BOSS', count: 1, TechResearch: 'R017' },
            'q18b': { dwId: 'q0oo', time: 50, item: 'q1cp', type: 'small', count: 30, TechResearch: 'R018' },
            'q18c': { dwId: 'q0op', time: 50, item: 'q1cu', type: 'small', count: 30, TechResearch: 'R019' },
            'q18d': { dwId: 'q0oq', time: 50, item: 'q1d3', type: 'small', count: 30, TechResearch: 'R01A' },
            'q18e': { dwId: 'q0or', time: 50, item: 'q1d8', type: 'small', count: 30, TechResearch: 'R01B' },
            'q18f': { dwId: 'q0os', time: 50, item: 'I00E', type: 'BOSS', count: 1, TechResearch: 'R01C' },

        }

    constructor() {
        let trigger = new Trigger()
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        trigger.addAction(this.action)
    }

    action(this: void) {
        for (let v in RewardTask.config) {
            let data = RewardTask.config[v]
            if (GetSpellAbilityId() == FourCC(v)) {
                let unit = GetTriggerUnit()
                let p = GetOwningPlayer(unit)
                let index = GetPlayerId(p)
                if (p == Player(index)) {
                    if (!DataBase.getPlayerSolarData(p).开关) {
                        DataBase.getPlayerSolarData(p).开关 = true
                        // DisplayTimedTextToPlayer(Player(0), 0, 0, 0, ' 进sws 来')
                        //调用
                        if (p == GetLocalPlayer()) {
                            RewardTask.UI_To_Count_Down()
                        }
                        let x = GetRectCenterX(RewardTask.bossRect[index])
                        let y = GetRectCenterY(RewardTask.bossRect[index])
                        // //获取当前技能的物遍
                        let EditorSuffix = ObjectDataUtil.getAbilityDataString(v, 'EditorSuffix')
                        let btn_x = S2I(SubString(EditorSuffix, 0, 1))
                        let btn_y = S2I(SubString(EditorSuffix, 1, 2))
                        // 创建看物品的区域
                        let x1 = GetRandomReal(GetRectMinX(RewardTask.rect[index]), GetRectMaxX(RewardTask.rect[index]))
                        let y1 = GetRandomReal(GetRectMinY(RewardTask.rect[index]), GetRectMaxY(RewardTask.rect[index]))
                        //创建飞行特效
                        let length = NumerivalUtil.GetLocDistance(GetUnitX(unit), GetUnitY(unit), x, y)
                        NumerivalUtil.HoepAbility_ChargeTemplate(unit, x, y, 0, 100, '[TX] (928).mdx', undefined, length, 60, 0.03, undefined)
                        //拼接字符
                        let str: string = 'pre_zxrw\\_000'
                        for (let i = 1; i < 11; i++) {
                            RewardTask._djsstr[i] = []
                            for (let j = 9; j >= 0; j--) {
                                RewardTask._djsstr[i][j] = str + i + '_' + j + '.tga'
                            }
                        }
                        let g = CreateGroup()
                        let dw: unit[] = []
                        if (data.type == 'small') {
                            BaseUtil.onTimer(1, (count) => {
                                //创建30个悬赏怪物
                                if (count <= data.count) {
                                    dw[count] = CreateUnit(Player(5 + index), FourCC(data.dwId), x, y, GetUnitFacing(unit))
                                    //添加元素抗性
                                    let num = GetRandomInt(0, 6)
                                    CreeperAttackWaveState.addElementResistance(dw[count], data.dwId, num)
                                    GroupAddUnitSimple(dw[count], g)
                                    handle_ref(dw[count])
                                }
                                //--------------------------动态修改倒计时---------------------
                                if (p == GetLocalPlayer()) {
                                    for (let k = 49; k >= 0; k--) {
                                        if ((data.time - count) == k) { //49  
                                            let i = k / 10
                                            let s = Math.floor(i) //4
                                            let g = S2I(SubString(R2S(i), 2, 3))
                                            DzFrameSetTexture(RewardTask.ui_tips[1], RewardTask._djsstr[(10 - s)][s], 0)
                                            DzFrameSetTexture(RewardTask.ui_tips[2], RewardTask._djsstr[(10 - g)][g], 0)
                                            if ((data.time - count) < 10) {
                                                DzFrameShow(RewardTask.ui_tips[1], false)
                                                DzFrameSetPoint(RewardTask.ui_tips[2], 4, RewardTask.ui_tips[0], 4, 0.004, 0)
                                            }
                                        }
                                    }
                                }
                                // DisplayTimedTextToPlayer(p, 0, 0, 0, 'count' + count)
                                // DisplayTimedTextToPlayer(p, 0, 0, 0, '单位组数量' + CountUnitsInGroup(g))
                                if (count == data.time && CountUnitsInGroup(g) >= 0) {
                                    if (p == GetLocalPlayer()) {
                                        RewardTask.tween_aim_2()
                                    }
                                    DataBase.getPlayerSolarData(p).开关 = null
                                    for (let x = 1; x <= data.count; x++) {
                                        // DisplayTimedTextToPlayer(Player(0), 0, 0, 0, GetUnitName(dw[x]))
                                        handle_unref(dw[x])
                                        RemoveUnit(dw[x])
                                    }
                                    GroupClear(g)
                                    DestroyGroup(g)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时任务失败！');
                                    return false
                                }
                                if (count != data.time && CountUnitsInGroup(g) == 0) {
                                    if (GetLocalPlayer() == p) {
                                        DzFrameShow(RewardTask.ui_tips[1], false)
                                        DzFrameShow(RewardTask.ui_tips[2], false)
                                        DzFrameSetTexture(RewardTask.ui_tips[0], 'UI_Icon\\wcrw.tga', 0)
                                        RewardTask.tween_aim_2()
                                    }

                                    //奖励
                                    Hope_Item.Create_Item(data.dwId, x1, y1, index)
                                    DataBase.getPlayerSolarData(p).开关 = null
                                    RewardTask.GetAbilityXY(unit, v, btn_x, btn_y, index)
                                    AddPlayerTechResearched(p, data.TechResearch, 1)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '限时任务完成！');
                                    DestroyGroup(g)
                                    return false
                                }
                                return true
                            })
                            //---------------------------BOSS------------------
                        } else if (data.type == 'BOSS') {
                            let boss = CreateUnit(Player(5 + index), FourCC(data.dwId), x, y, GetUnitFacing(unit))
                            //添加元素抗性
                            let num = GetRandomInt(0, 6)
                            CreeperAttackWaveState.addElementResistance(boss, data.dwId, num)
                            // UI_FloatingWord.Create_Count_Down_Timer_Frame(50, boss)
                            handle_ref(boss)
                            BaseUtil.onTimer(1, (count) => {
                                //--------------------------动态修改倒计时---------------------
                                if (p == GetLocalPlayer()) {
                                    for (let k = 49; k >= 0; k--) {
                                        if ((data.time - count) == k) { //49  
                                            let i = k / 10
                                            let s = Math.floor(i) //4
                                            let g = S2I(SubString(R2S(i), 2, 3))
                                            DzFrameSetTexture(RewardTask.ui_tips[1], RewardTask._djsstr[(10 - s)][s], 0)
                                            DzFrameSetTexture(RewardTask.ui_tips[2], RewardTask._djsstr[(10 - g)][g], 0)
                                            if ((data.time - count) < 10) {
                                                DzFrameShow(RewardTask.ui_tips[1], false)
                                                DzFrameSetPoint(RewardTask.ui_tips[2], 4, RewardTask.ui_tips[0], 4, 0.004, 0)
                                            }
                                        }
                                    }
                                }
                                if (count == data.time && GetUnitState(boss, UNIT_STATE_LIFE) > 0) {
                                    handle_unref(boss)
                                    if (p == GetLocalPlayer()) {
                                        RewardTask.tween_aim_2()
                                    }
                                    DataBase.getPlayerSolarData(p).开关 = null
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('red') + '限时任务失败！');
                                    RemoveUnit(boss)
                                    return false
                                }  //单位生命值小于0.4 为死亡
                                if (count != data.time && GetUnitState(boss, UNIT_STATE_LIFE) < 0.40) {
                                    if (p == GetLocalPlayer()) {
                                        DzFrameShow(RewardTask.ui_tips[1], false)
                                        DzFrameShow(RewardTask.ui_tips[2], false)
                                        DzFrameSetTexture(RewardTask.ui_tips[0], 'UI_Icon\\wcrw.tga', 0)
                                        RewardTask.tween_aim_2()
                                    }
                                    //奖励
                                    Hope_Item.Create_Item(data.dwId, x1, y1, index)
                                    AdjustPlayerStateBJ(5, p, PLAYER_STATE_RESOURCE_FOOD_CAP)
                                    //替换完成任务图标
                                    RewardTask.GetAbilityXY(unit, v, btn_x, btn_y, index)
                                    AddPlayerTechResearched(p, data.TechResearch, 1)
                                    DataBase.getPlayerSolarData(p).开关 = null
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('yellow') + '限时任务完成！');
                                    return false
                                }
                                return true
                            })
                        }
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('green') + '任务正在进行中!');
                    }
                }
            }


        }
    }



    static UI_To_Count_Down() {

        //计时框
        RewardTask.ui_tips[0] = DzCreateFrameByTagName("BACKDROP", "name", DzGetGameUI(), "template", 0)
        DzFrameSetTexture(RewardTask.ui_tips[0], 'pre_zxrw\\djsbeij.tga', 0)
        DzFrameSetSize(RewardTask.ui_tips[0], 0.15, 0.05)
        DzFrameShow(RewardTask.ui_tips[0], true)
        //数字十位
        RewardTask.ui_tips[1] = DzCreateFrameByTagName("BACKDROP", "number", RewardTask.ui_tips[0], "template", 0)
        //DzFrameSetFont(ui_tips[ii], "Fonts\\ChaoCuZiTi.TTF", 0.017, 0)
        DzFrameSetPoint(RewardTask.ui_tips[1], 4, RewardTask.ui_tips[0], 4, -0.01, 0)
        DzFrameSetTexture(RewardTask.ui_tips[1], 'pre_zxrw\\_0005_5.tga', 0)
        DzFrameSetSize(RewardTask.ui_tips[1], 0.06, 0.04)
        DzFrameShow(RewardTask.ui_tips[1], true)
        //数字个位
        RewardTask.ui_tips[2] = DzCreateFrameByTagName("BACKDROP", "number", RewardTask.ui_tips[0], "template", 0)
        //DzFrameSetFont(ui_tips[2], "Fonts\\ChaoCuZiTi.TTF", 0.017, 0)
        DzFrameSetPoint(RewardTask.ui_tips[2], 4, RewardTask.ui_tips[0], 4, 0.015, 0)
        DzFrameSetTexture(RewardTask.ui_tips[2], 'pre_zxrw\\_00010_0.tga', 0)
        DzFrameSetSize(RewardTask.ui_tips[2], 0.06, 0.04)
        DzFrameShow(RewardTask.ui_tips[2], true)
        //文字提示
        RewardTask.ui_tips[3] = DzCreateFrameByTagName("TEXT", "name", DzGetGameUI(), "template", 0)
        DzFrameSetFont(RewardTask.ui_tips[3], "Fonts\\ChaoCuZiTi.TTF", 0.015, 0)
        DzFrameSetPoint(RewardTask.ui_tips[3], 4, RewardTask.ui_tips[0], 4, 0.00, 0.035)
        // DzFrameSetTexture(ui_tips[w], 'pre_zxrw\\_0010_0.tga', 0)
        DzFrameSetText(RewardTask.ui_tips[3], "悬赏任务倒计时")
        DzFrameShow(RewardTask.ui_tips[3], true)
        //调用动画
        RewardTask.tween_aim_1()

    }

    static tween_aim_1() {
        let x = 0
        let y = 0.48
        let yy = 0.48
        let timer = 1000
        const tween = new Tween({ x: x, y: y, a: 255 })
            .to({ x: 0.4, y: yy, a: 255 }, timer)
            .easing(Easing.Quadratic.In)
            .onUpdate((temp) => {
                DzFrameSetAlpha(RewardTask.ui_tips[0], temp.a)
                DzFrameSetPoint(RewardTask.ui_tips[0], FRAMEPOINT_CENTER, DzGetGameUI(), FRAMEPOINT_BOTTOMLEFT, temp.x, temp.y)
            })
        tween.start()
    }

    static tween_aim_2() {
        let yy = 0.48
        let timer = 1000
        const tween2 = new Tween({ x: 0.4, y: yy, a: 255 })
            .to({ x: 0.8, y: yy, a: 255 }, timer)
            .easing(Easing.Back.In)
            .onUpdate((temp) => {
                DzFrameSetAlpha(RewardTask.ui_tips[0], temp.a)
                DzFrameSetPoint(RewardTask.ui_tips[0], FRAMEPOINT_CENTER, DzGetGameUI(), FRAMEPOINT_BOTTOMLEFT, temp.x, temp.y)
            })
        tween2.start()
        // // 隐藏ui
        BaseUtil.runLater(timer / 1000, () => {
            DzFrameShow(RewardTask.ui_tips[0], false)
            DzFrameShow(RewardTask.ui_tips[3], false)
        })
    }
    /**
     * 添加完成任务技能
     * @param u 
     * @param ability 
     * @param x 
     * @param y 
     */
    static GetAbilityXY(u: unit, ability: string, x: number, y: number, index: number) {
        if (x == 0 && y == 0) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00K')
        } else if (x == 1 && y == 0) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00P')
        } else if (x == 2 && y == 0) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00Q')
        } else if (x == 3 && y == 0) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00T')
        } else if (x == 0 && y == 1) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00L')
        } else if (x == 1 && y == 1) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00O')
        } else if (x == 2 && y == 1) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00R')
        } else if (x == 3 && y == 1) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00U')
        } else if (x == 0 && y == 2) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00M')
        } else if (x == 1 && y == 2) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00N')
        } else if (x == 2 && y == 2) {
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00S')
        } else if (x == 3 && y == 2) {
            RewardTask.flip[index] = RewardTask.flip[index] + 1
            DisplayTimedTextToPlayer(Player(0), 0, 0, 0, 's=' + RewardTask.flip[index])
            UnitRemoveAbility(u, ability)
            UnitAddAbility(u, 'A00V')
            RewardTask.Replace_The_Skills(u, RewardTask.flip[index])
            //境界===========
            if (!DataBase.getPlayerSolarData(GetOwningPlayer(u)).境界_中忍) {
                let lq = MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 ? MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 : 0
                if (lq >= 700) {
                    lq -= 700
                    MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 = lq
                    AddPlayerTechResearched(GetOwningPlayer(u), 'R004', 1)
                    //全属性奖励
                    SelectUtil.forPlayerUnits(unit => {
                        ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 100);
                        ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 100);
                        ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 100);
                    }, index)
                    DataBase.getPlayerSolarData(GetOwningPlayer(u)).境界_中忍 = true
                }
            }
            //境界===========境界_传送之忍 第三阶段
            if (RewardTask.flip[index] == 2) {
                if (!DataBase.getPlayerSolarData(GetOwningPlayer(u)).境界_传送之忍) {
                    let lq = MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 ? MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 : 0
                    if (lq >= 7900) {
                        lq -= 7900
                        MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.灵气总量 = lq
                        AddPlayerTechResearched(GetOwningPlayer(u), 'R000', 1)
                        //全属性奖励
                        SelectUtil.forPlayerUnits(unit => {
                            ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 6400);
                            ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 6400);
                            ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 6400);
                        }, index)
                        DataBase.getPlayerSolarData(GetOwningPlayer(u)).境界_传送之忍 = true
                    }
                }
            }
        }
    }
    /**
     * 
     *  在最后一个调用  每12个
     */
    static Replace_The_Skills(u: unit, s: number) {
        let ren_wu_wan_cheng = ['A00K', 'A00P', 'A00Q', 'A00T', 'A00L', 'A00O', 'A00R', 'A00U', 'A00M', 'A00N', 'A00S', 'A00V'] // 'A00T', 'A00L', 'A00O', 'A00R', 'A00U', 'A00M', 'A00N', 'A00S', 'A00V'
        let ren_wu = ['q17k', 'q17l', 'q17m', 'q17n', 'q17o', 'q17p', 'q17q', 'q17r', 'q17s', 'q17t', 'q17u', 'q17v']
        let ren_wu1 = ['q180', 'q181', 'q182', 'q183', 'q184', 'q185', 'q186', 'q187', 'q188', 'q189', 'q18a', 'q18b']
        let ren_wu2 = ['q18c', 'q18d', 'q18e', 'q18f']
        for (let i = 0; i < 12; i++) {
            UnitRemoveAbility(u, FourCC(ren_wu_wan_cheng[i]))
            if (s == 1) {
                UnitAddAbility(u, FourCC(ren_wu[i]))
            } else if (s == 2) {
                UnitAddAbility(u, FourCC(ren_wu1[i]))
            } else if (s == 3) {
                UnitAddAbility(u, FourCC(ren_wu2[i]))
            }

        }
    }

}