import UnitFetterEffect from "cyttp/Fetter/UnitFetterEffect"
import CompletionOfConstruction from "cyttp/UnitData/CompletionOfConstruction"
import HoepColorText from "cyttp/Util/HoepColorText"
import HopeNonRepeatingRandom from "cyttp/Util/HopeNonRepeatingRandom"
import NumerivalUtil from "cyttp/Util/NumerivalUtil"
import DataBase from "solar/common/DataBase"
import BaseUtil from "solar/util/BaseUtil"
import { MapPlayer } from "solar/w3ts/handles/player"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"
import RisingStarDataConfig1 from "./RisingStarDataConfig1"



export default class AuxiliaryTowerCreation {
    //占用人口
    static occpop = 5

    static dwConfig: string[] = [
        'Q18g', 'Q18h', 'Q18i', 'Q18j', 'Q18k', 'Q18l', 'Q18m', 'Q0pu',
        'Q18n', 'Q18o', 'Q18p', 'Q18q', 'Q18r', 'Q18s', 'Q18t', 'Q18u',
        'Q18v', 'Q190', 'Q191', 'Q192', 'Q193', 'Q194', 'Q195', 'Q196',
        'Q197', 'Q198', 'Q199', 'Q19a', 'Q19b', 'Q19c', 'Q0pv', 'Q0q0',
        'Q19d', 'Q19e', 'Q19f', 'Q19g', 'Q19h', 'Q19i', 'Q19j', 'Q19k',
        'Q19l', 'Q19m', 'Q19n', 'Q19o', 'Q19p', 'Q19q', 'Q19r', 'Q19s',
        'Q0ou', 'Q0ov', 'Q0p0', 'Q0p1', 'Q0p2', 'Q0p3', 'Q0p4', 'Q0p5',
        'Q0p6', 'Q0p7', 'Q0p8', 'Q0p9', 'Q0pa', 'Q0pb', 'Q0pc', 'Q0pd',
        'Q0pe', 'Q0pf', 'Q0pg', 'Q0ph', 'Q0pi', 'Q0pj', 'Q0pk', 'Q0pl',
        'Q0pm', 'Q0pn', 'Q0po', 'Q0pp', 'Q0pq', 'Q0pr', 'Q0ps', 'Q0pt',
    ]
    //记录玩家的八个区域是否有单位 
    static isRectInUnit: number[][] = [
        //玩家1
        [0, 0, 0, 0, 0, 0, 0, 0,],
        //玩家2
        [0, 0, 0, 0, 0, 0, 0, 0,],
        //玩家3
        [0, 0, 0, 0, 0, 0, 0, 0,],
        //玩家4
        [0, 0, 0, 0, 0, 0, 0, 0,],
    ]
    //记录玩家备战区的八个区域  
    static _rect_p: string[][] = [
        //玩家1
        ['gg_rct_p1_zbq_r1', 'gg_rct_p1_zbq_r2', 'gg_rct_p1_zbq_r3', 'gg_rct_p1_zbq_r4', 'gg_rct_p1_zbq_r5', 'gg_rct_p1_zbq_r6', 'gg_rct_p1_zbq_r7', 'gg_rct_p1_zbq_r8'],
        // // 玩家2
        ['gg_rct_p2_zbq_r1', 'gg_rct_p2_zbq_r2', 'gg_rct_p2_zbq_r3', 'gg_rct_p2_zbq_r4', 'gg_rct_p2_zbq_r5', 'gg_rct_p2_zbq_r6', 'gg_rct_p2_zbq_r7', 'gg_rct_p2_zbq_r8'],
        //玩家3
        ['gg_rct_p3_zbq_r1', 'gg_rct_p3_zbq_r2', 'gg_rct_p3_zbq_r3', 'gg_rct_p3_zbq_r4', 'gg_rct_p3_zbq_r5', 'gg_rct_p3_zbq_r6', 'gg_rct_p3_zbq_r7', 'gg_rct_p3_zbq_r8'],
        //玩家4
        ['gg_rct_p4_zbq_r1', 'gg_rct_p4_zbq_r2', 'gg_rct_p4_zbq_r3', 'gg_rct_p4_zbq_r4', 'gg_rct_p4_zbq_r5', 'gg_rct_p4_zbq_r6', 'gg_rct_p4_zbq_r7', 'gg_rct_p4_zbq_r8'],
    ]
    //战斗区
    static _rect_blttle = [
        //玩家1
        ['gg_rct_p1_zdq_r1', 'gg_rct_p1_zdq_r2', 'gg_rct_p1_zdq_r3', 'gg_rct_p1_zdq_r4', 'gg_rct_p1_zdq_r5', 'gg_rct_p1_zdq_r6', 'gg_rct_p1_zdq_r7', 'gg_rct_p1_zdq_r8'],
        ['gg_rct_p2_zdq_r1', 'gg_rct_p2_zdq_r2', 'gg_rct_p2_zdq_r3', 'gg_rct_p2_zdq_r4', 'gg_rct_p2_zdq_r5', 'gg_rct_p2_zdq_r6', 'gg_rct_p2_zdq_r7', 'gg_rct_p2_zdq_r8'],
        ['gg_rct_p3_zdq_r1', 'gg_rct_p3_zdq_r2', 'gg_rct_p3_zdq_r3', 'gg_rct_p3_zdq_r4', 'gg_rct_p3_zdq_r5', 'gg_rct_p3_zdq_r6', 'gg_rct_p3_zdq_r7', 'gg_rct_p3_zdq_r8'],
        ['gg_rct_p4_zdq_r1', 'gg_rct_p4_zdq_r2', 'gg_rct_p4_zdq_r3', 'gg_rct_p4_zdq_r4', 'gg_rct_p4_zdq_r5', 'gg_rct_p4_zdq_r6', 'gg_rct_p4_zdq_r7', 'gg_rct_p4_zdq_r8'],
    ]

    constructor() {

        //进入战斗区域
        for (let i = 0; i < 4; i++) {
            for (let rectValName of AuxiliaryTowerCreation._rect_blttle[i]) {
                let trigger1 = new Trigger()
                let rectRegion: region = CreateRegion()
                RegionAddRect(rectRegion, (_G as any)[rectValName])
                trigger1.registerEnterRegion(rectRegion, null);
                trigger1.addAction(() => {
                    let u = GetTriggerUnit();
                    let p = GetOwningPlayer(u)
                    let index = GetPlayerId(p)
                    for (let v of AuxiliaryTowerCreation.dwConfig) {
                        if (GetUnitTypeId(u) == FourCC(v)) {
                            //调整位置
                            SetUnitPosition(u, GetRectCenterX((_G as any)[rectValName]), GetRectCenterY((_G as any)[rectValName]))
                            //发动攻击命令
                            IssueImmediateOrder(u, 'attack')
                            //取消暂停单位
                            PauseUnit(u, false)
                        }
                    }
                })
            }
        }
        //进入备战区域
        for (let i = 0; i < 4; i++) {
            for (let rectValName of AuxiliaryTowerCreation._rect_p[i]) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'rectValName=' + rectValName);
                let trigger2 = new Trigger()
                let rectRegion: region = CreateRegion()
                RegionAddRect(rectRegion, (_G as any)[rectValName])
                trigger2.registerEnterRegion(rectRegion, null);
                trigger2.addAction(() => {
                    let u = GetTriggerUnit();
                    let p = GetOwningPlayer(u)
                    let index = GetPlayerId(p)
                    for (let v of AuxiliaryTowerCreation.dwConfig) {
                        if (GetUnitTypeId(u) == FourCC(v)) {
                            //调整位置
                            SetUnitPosition(u, GetRectCenterX((_G as any)[rectValName]), GetRectCenterY((_G as any)[rectValName]))
                            // IssueImmediateOrder(u, 'unattked')
                            let pp = AuxiliaryTowerCreation._rect_p[index]
                            // DisplayTimedTextToPlayer(p, 0, 0, 50, HoepColorText('yellow') + '【系统】进入的区域' + rectValName)
                            let _index = NumerivalUtil.getSpecialIndexArr(pp, rectValName)
                            //记录位置已展位
                            AuxiliaryTowerCreation.isRectInUnit[index][_index[0]] = 1
                            //暂停单位
                            PauseUnit(u, true)
                        }
                    }
                })
            }
        }
        //离开备战区域
        for (let i = 0; i < 4; i++) {
            for (let rectValName of AuxiliaryTowerCreation._rect_p[i]) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'rectValName=' + rectValName);
                let trigger3 = new Trigger()
                let rectRegion: region = CreateRegion()
                RegionAddRect(rectRegion, (_G as any)[rectValName])
                trigger3.registerLeaveRegion(rectRegion, null);
                trigger3.addAction(() => {
                    let u = GetTriggerUnit();
                    let p = GetOwningPlayer(u)
                    let index = GetPlayerId(p)
                    for (let v of AuxiliaryTowerCreation.dwConfig) {
                        if (GetUnitTypeId(u) == FourCC(v)) {
                            let pp = AuxiliaryTowerCreation._rect_p[index]
                            // DisplayTimedTextToPlayer(p, 0, 0, 50, HoepColorText('yellow') + '【系统】离开的区域' + rectValName)
                            let _index = NumerivalUtil.getSpecialIndexArr(pp, rectValName)
                            // print_r(_index)
                            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '_index=' + _index[0]);
                            AuxiliaryTowerCreation.isRectInUnit[index][_index[0]] = 0
                        }
                    }
                })
            }
        }
        //模拟建筑
        let trigger = new Trigger()
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        trigger.addAction(() => {
            for (let k in RisingStarDataConfig1.config) {
                let dataConfig = RisingStarDataConfig1.config[k];
                if (GetSpellAbilityId() == FourCC(k)) {
                    let table = RisingStarDataConfig1.config[k].item_ID
                    let u = GetTriggerUnit()
                    let player = GetOwningPlayer(u)
                    let index = GetPlayerId(player)
                    ///记录玩家的八个区域是否有单位 数组
                    let boo_arr = AuxiliaryTowerCreation.isRectInUnit[index]
                    //记录玩家的八个区域数组
                    let p_rect_arr = AuxiliaryTowerCreation._rect_p[index]
                    ////用于记录占位  新数组
                    let arrpp = []
                    //获取值为1的索引数组
                    let indexArr = NumerivalUtil.getSpecialIndexArr(boo_arr, 1)
                    // print_r(indexArr)
                    for (let i = 0; i < indexArr.length; i++) {
                        //将值为1的索引对应p_rect_arr数组的元素添加到新数组
                        arrpp.push(p_rect_arr[indexArr[i]])
                    }
                    // print_r(_arr)
                    // print_r(arrpp)
                    //去除两个数组中相同的元素，返回新数组 ---- (没有占位的)5
                    let list = NumerivalUtil.arr2Remove(arrpp, p_rect_arr)
                    // print_r(list)
                    //获取所占位的索引值
                    // let _index = NumerivalUtil.getSpecialIndexArr(p_rect_arr, list[0])
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '_index=' + _index);
                    //将字符串转换成区域类型
                    let region: rect = (_G as any)[list[0]];
                    let x = GetRectCenterX(region)
                    let y = GetRectCenterY(region)
                    if (list[0] != null) {
                        // //判断当前人口是否足够
                        if (GetPlayerState(player, PLAYER_STATE_RESOURCE_FOOD_CAP) - GetPlayerState(player, PLAYER_STATE_RESOURCE_FOOD_USED) >= 5) {
                            let uu = CreateUnit(player, FourCC(dataConfig.unitID), x, y, 0)
                            //特效
                            DestroyEffect(AddSpecialEffect('fd544f5819d7be9c.mdx', x, y))
                            //羁绊效果
                            UnitFetterEffect.refesh_unit_count(index, uu)
                            //星级添加
                            let TX1 = AddSpecialEffectTarget('8061a5b90c1a7ec6.mdx', uu, 'overhead')
                            Unit.fromHandle(uu).solarData.星数量 = TX1
                            //  占用人口
                            AdjustPlayerStateBJ(AuxiliaryTowerCreation.occpop, player, PLAYER_STATE_RESOURCE_FOOD_USED)
                        } else {
                            DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('cyan') + '可用人口不足。');
                            for (let v in table) {
                                UnitAddItemById(u, v)
                            }
                        }
                    } else {
                        for (let v in table) {
                            UnitAddItemById(u, v)
                        }
                        DisplayTimedTextToPlayer(player, 0, 0, 5, HoepColorText('yellow') + '【系统】' + HoepColorText('cyan') + '备战区人数已满，请先上阵！');
                    }
                }
            }
        })


    }







}