import AuxiliaryTowerCreation from "cyttp/shop/SummonStore/AuxiliaryTowerCreation";
import HoepColorText from "cyttp/Util/HoepColorText";
import NumerivalUtil from "cyttp/Util/NumerivalUtil";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import SelectUtil from "solar/util/SelectUtil";
import { Trigger } from "solar/w3ts/handles/trigger";



/**
 * 选择单位
 */

export default class CompletionOfConstruction {


    constructor() {
        //  玩家选择一个单位
        // for (let i = 0; i < 4; i++) {
        //     let p = Player(i)
        //     if (GetPlayerSlotState(p) == PLAYER_SLOT_STATE_PLAYING &&
        //         GetPlayerController(p) == MAP_CONTROL_USER) {
        let trigger = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(trigger, EVENT_PLAYER_UNIT_SELECTED)
        TriggerAddAction(trigger, () => {
            let u = GetTriggerUnit()
            let p = GetOwningPlayer(u)
            if (NumerivalUtil.IsOnlineUser(GetPlayerId(p)) == true) {

                if (GetUnitTypeId(u) == FourCC('h002')) {
                    DestroyEffect(DataBase.getPlayerSolarData(p).提示特效)
                } else if (GetUnitTypeId(u) == FourCC('h003')) {
                    DestroyEffect(DataBase.getPlayerSolarData(p).提示特效1)
                }
                //记录单位
                DataBase.getPlayerSolarData(p).选择的单位 = u
                // 给防御塔 创建 攻击距离显示特效
                if (GetUnitPointValue(u) == 1 ||
                    GetUnitPointValue(u) == 2 ||
                    GetUnitPointValue(u) == 3 ||
                    GetUnitPointValue(u) == 4 ||
                    GetUnitPointValue(u) == 5
                ) {

                    let jl = 0
                    // let x = GetUnitX(u)
                    // let y = GetUnitY(u)
                    let tx_str = ''
                    if (GetLocalPlayer() == p) {
                        tx_str = '19e4c99da46cc2e4.mdx'
                        jl = GetUnitState(u, ConvertUnitState(0x16)) / 1000
                    }
                    let tx = AddSpecialEffectTarget(tx_str, u, 'origin')
                    handle_ref(tx)
                    EXEffectMatScale(tx, jl, jl, jl)
                    BaseUtil.runLater(1, () => {
                        handle_unref(tx)
                        DestroyEffect(tx)
                    })
                }

            }
        })
        //     }

        // }
        DzTriggerRegisterMouseEventByCode(trigger, 2, 1, false, () => {
            let player = DzGetTriggerKeyPlayer()
            let index = GetPlayerId(player)
            let x = DzGetMouseTerrainX()
            let y = DzGetMouseTerrainY()
            let str = index + '_' + x + '_' + y
            DzSyncData("右击移动单位", str)

        })

        let triggerHandle = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle, "右击移动单位", false)
        TriggerAddAction(triggerHandle, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let player: player = Player(index)

            let indexs: number = null;
            let half: number = null;
            // 截取玩家索引，x坐标，y坐标
            for (let i = 0; i < length; i++) {
                if (SubString(str, i, i + 1) == '_') {
                    if (!indexs) {
                        indexs = i - 1
                    } else if (!half) {
                        half = i + 1
                    }
                }
            }
            //移动后的位置
            let x = S2R(SubString(str, indexs + 2, half))
            let y = S2R(SubString(str, half, length))
            //-- // 获取数据
            let solarData = DataBase.getPlayerSolarData(player)
            //被选择的单位的位置
            let xx = GetUnitX(solarData.选择的单位)
            let yy = GetUnitY(solarData.选择的单位)
            let data = AuxiliaryTowerCreation.dwConfig
            for (let v in data) {
                if (GetUnitTypeId(solarData.选择的单位) == FourCC(data[v])) {
                    if (IsTerrainPathable(x, y, PATHING_TYPE_BUILDABILITY) == false) {
                        if (NumerivalUtil.GetLocDistance(xx, yy, x, y) <= 4000) {
                            //创建一个区域
                            let rect = NumerivalUtil.NewRect(x, y, 200, 200)
                            // 在这个区域的单位
                            let group = GetUnitsInRectOfPlayer(rect, player)
                            let unit = FirstOfGroup(group)
                            // let unit = DzGetUnitUnderMouse()
                            if (RectContainsUnit(rect, unit)) {
                                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '数量=' + NumerivalUtil.GetLocDistance(xx, yy, x, y));
                                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '在这个区域的单位=' + GetUnitName(unit));
                                if (!IsHandle(unit)) { return }
                                let xxx = GetUnitX(unit)
                                let yyy = GetUnitY(unit)
                                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '在这个区域的单位=' + GetUnitName(unit));
                                if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                    //创建遗留特效
                                    DestroyEffect(AddSpecialEffect('2500b341e38e4904.mdx', xx, yy))
                                    //移动单位
                                    NumerivalUtil.ChuanSongToXY(solarData.选择的单位, xxx, yyy, false, '2500b341e38e4904.mdx')
                                    NumerivalUtil.ChuanSongToXY(unit, xx, yy, false, null)
                                    RemoveRect(rect)
                                }
                            } else {

                                //创建遗留特效
                                DestroyEffect(AddSpecialEffect('2500b341e38e4904.mdx', xx, yy))
                                //移动单位
                                NumerivalUtil.ChuanSongToXY(solarData.选择的单位, x, y, false, '2500b341e38e4904.mdx')

                            }


                        }


                    }
                }
            }
        })

        // // // 注册事件同步数据
        // let triggerHandle = CreateTrigger();
        // DzTriggerRegisterSyncData(triggerHandle, "右击移动单位", false)
        // TriggerAddAction(triggerHandle, () => {
        //     let str = DzGetTriggerSyncData()
        //     let length: number = StringLength(str)
        //     let index = S2I(SubString(str, 0, 1))
        //     let player: player = Player(index)

        //     let indexs: number = null;
        //     let half: number = null;
        //     // 截取玩家索引，x坐标，y坐标
        //     for (let i = 0; i < length; i++) {
        //         if (SubString(str, i, i + 1) == '_') {
        //             if (!indexs) {
        //                 indexs = i - 1
        //             } else if (!half) {
        //                 half = i + 1
        //             }
        //         }
        //     }
        //     //移动后的位置
        //     let x = S2R(SubString(str, indexs + 2, half))
        //     let y = S2R(SubString(str, half, length))
        //     //-- // 获取数据
        //     let solarData = DataBase.getPlayerSolarData(player)
        //     //被选择的单位的位置
        //     let xx = GetUnitX(solarData.选择的单位)
        //     let yy = GetUnitY(solarData.选择的单位)
        //     let data = AuxiliaryTowerCreation.dwConfig
        //     for (let v in data) {
        //         if (GetUnitTypeId(solarData.选择的单位) == FourCC(data[v])) {
        //             if (IsTerrainPathable(x, y, PATHING_TYPE_BUILDABILITY) == false) {

        //                 if (NumerivalUtil.GetLocDistance(xx, yy, x, y) <= 4000) {


        //                     //创建一个区域
        //                     let rect = NumerivalUtil.NewRect(x, y, 150, 150)
        //                     // 在这个区域的单位
        //                     let group = GetUnitsInRectOfPlayer(rect, player)
        //                     // let unit = FirstOfGroup(group)
        //                     let unit = DzGetUnitUnderMouse()
        //                     if (RectContainsUnit(rect, unit)) {
        //                         // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '数量=' + NumerivalUtil.GetLocDistance(xx, yy, x, y));
        //                         // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '在这个区域的单位=' + GetUnitName(unit));

        //                         let xxx = GetUnitX(unit)
        //                         let yyy = GetUnitY(unit)
        //                         if (!IsHandle(unit)) { return }
        //                         // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '在这个区域的单位=' + GetUnitName(unit));
        //                         if (IsUnitType(unit, UNIT_TYPE_HERO)) {
        //                             //创建遗留特效
        //                             DestroyEffect(AddSpecialEffect('2500b341e38e4904.mdx', xx, yy))
        //                             //移动单位
        //                             NumerivalUtil.ChuanSongToXY(solarData.选择的单位, xxx, yyy, false, '2500b341e38e4904.mdx')
        //                             NumerivalUtil.ChuanSongToXY(unit, xx, yy, false, null)
        //                             // SetUnitX(unit, xx)
        //                             // SetUnitY(unit, yy)
        //                             RemoveRect(rect)
        //                         }
        //                     } else {
        //                         // if (RectContainsCoords(rect, x, y) ) {
        //                         //     return

        //                         // }
        //                         //创建遗留特效
        //                         DestroyEffect(AddSpecialEffect('2500b341e38e4904.mdx', xx, yy))
        //                         //移动单位
        //                         NumerivalUtil.ChuanSongToXY(solarData.选择的单位, x, y, false, '2500b341e38e4904.mdx')
        //                     }


        //                 }


        //             }
        //         }
        //     }
        // })



        // let tri = new Trigger()
        // tri.registerTimerEvent(3, false)
        // tri.addAction(() => {
        //     for (let i = 0; i < 4; i++) {
        //         SelectUtil.forPlayerUnits(unit => {
        //             if (GetUnitTypeId(unit) == FourCC('h002')) {
        //                 let tx = AddSpecialEffectTarget('80aa3af0b8e54104.mdx', unit, 'origin')
        //             }
        //             if (GetUnitTypeId(unit) == FourCC('h003')) {
        //                 let tx = AddSpecialEffectTarget('80aa3af0b8e54104.mdx', unit, 'origin')
        //             }
        //             if (GetUnitTypeId(unit) == FourCC('n001')) {
        //                 let tx = AddSpecialEffectTarget('80aa3af0b8e54104.mdx', unit, 'origin')
        //             }
        //         }, i)
        //     }
        // })
    }

}


