import ItemUtil from "cyttp/Util/ItemUtil"
import NumerivalUtil from "cyttp/Util/NumerivalUtil"
import { MapPlayer } from "solar/w3ts/handles/player"
import { Trigger } from "solar/w3ts/handles/trigger"
import InitString from "./Init_String"
import { data } from "zhuang_bei"
import Hope_Item from "./Hope_Item"



export default class EQ_Three_In_One {

    static level1 = [
        'q0r5', 'q0r6', 'q0r7', 'q0r8', 'q0r9', 'q0ra', 'q0rb', 'q0rc',
        'q0rd', 'q0re', 'q0rf', 'q0rg', 'q0rh', 'q0ri', 'q0rj',
    ]
    static level2 = [
        'q0rk', 'q0rl', 'q0rm', 'q0rn', 'q0ro', 'q0rp', 'q0rq',
        'q0rr', 'q0rs', 'q0rt', 'q0ru', 'q0rv', 'q0s0', 'q0s1', 'q0s2',

    ]

    static level3 = [
        'q0s3', 'q0s4', 'q0s5', 'q0s6', 'q0s7', 'q0s8', 'q0s9',
        'q0sa', 'q0sb', 'q0sc', 'q0sd', 'q0se', 'q0sf', 'q0sg', 'q0sh',

    ]

    static level4 = [
        'q0si', 'q0sj', 'q0sk', 'q0sl', 'q0sm', 'q0sn', 'q0so',
        'q0sp', 'q0sq', 'q0sr', 'q0ss', 'q0st', 'q0su', 'q0sv', 'q0t0',
    ]

    static level5 = [
        'q0t1', 'q0t2', 'q0t3', 'q0t4', 'q0t5', 'q0t6', 'q0t7', 'q0t8',
        'q0t9', 'q0ta', 'q0tb', 'q0tc', 'q0td', 'q0te', 'q0tf',
    ]

    static config: {
        [id: string]: {
            Grade?: string,
        }
    } = {
            'q0r5': { Grade: 'C', },
            'q0r6': { Grade: 'C', }, 'q0r7': { Grade: 'C', }, 'q0r8': { Grade: 'C', }, 'q0r9': { Grade: 'C', }, 'q0ra': { Grade: 'C', }, 'q0rb': { Grade: 'C', }, 'q0rc': { Grade: 'C', },
            'q0rd': { Grade: 'C', }, 'q0re': { Grade: 'C', }, 'q0rf': { Grade: 'C', }, 'q0rg': { Grade: 'C', }, 'q0rh': { Grade: 'C', }, 'q0ri': { Grade: 'C', }, 'q0rj': { Grade: 'C', },
            'q0rk': { Grade: 'B', }, 'q0rl': { Grade: 'B', }, 'q0rm': { Grade: 'B', }, 'q0rn': { Grade: 'B', }, 'q0ro': { Grade: 'B', }, 'q0rp': { Grade: 'B', }, 'q0rq': { Grade: 'B', },
            'q0rr': { Grade: 'B', }, 'q0rs': { Grade: 'B', }, 'q0rt': { Grade: 'B', }, 'q0ru': { Grade: 'B', }, 'q0rv': { Grade: 'B', }, 'q0s0': { Grade: 'B', }, 'q0s1': { Grade: 'B', }, 'q0s2': { Grade: 'B', },
            'q0s3': { Grade: 'A', }, 'q0s4': { Grade: 'A', }, 'q0s5': { Grade: 'A', }, 'q0s6': { Grade: 'A', }, 'q0s7': { Grade: 'A', }, 'q0s8': { Grade: 'A', }, 'q0s9': { Grade: 'A', },
            'q0sa': { Grade: 'A', }, 'q0sb': { Grade: 'A', }, 'q0sc': { Grade: 'A', }, 'q0sd': { Grade: 'A', }, 'q0se': { Grade: 'A', }, 'q0sf': { Grade: 'A', }, 'q0sg': { Grade: 'A', }, 'q0sh': { Grade: 'A', },
            'q0si': { Grade: 'S', }, 'q0sj': { Grade: 'S', }, 'q0sk': { Grade: 'S', }, 'q0sl': { Grade: 'S', }, 'q0sm': { Grade: 'S', }, 'q0sn': { Grade: 'S', }, 'q0so': { Grade: 'S', },
            'q0sp': { Grade: 'S', }, 'q0sq': { Grade: 'S', }, 'q0sr': { Grade: 'S', }, 'q0ss': { Grade: 'S', }, 'q0st': { Grade: 'S', }, 'q0su': { Grade: 'S', }, 'q0sv': { Grade: 'S', }, 'q0t0': { Grade: 'S', },
            'q0t1': { Grade: 'SS', }, 'q0t2': { Grade: 'SS', }, 'q0t3': { Grade: 'SS', }, 'q0t4': { Grade: 'SS', }, 'q0t5': { Grade: 'SS', }, 'q0t6': { Grade: 'SS', }, 'q0t7': { Grade: 'SS', }, 'q0t8': { Grade: 'SS', },
            'q0t9': { Grade: 'SS', }, 'q0ta': { Grade: 'SS', }, 'q0tb': { Grade: 'SS', }, 'q0tc': { Grade: 'SS', }, 'q0td': { Grade: 'SS', }, 'q0te': { Grade: 'SS', }, 'q0tf': { Grade: 'SS', },
        }
    constructor() {
        let tri = new Trigger()
        tri.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        tri.addAction(this.action)
    }
    static ItemHCbl: any[] = []//装备合成数组变量 
    action(this: void) {
        let u: unit = GetTriggerUnit()
        let index: number = GetPlayerId(GetOwningPlayer(u))
        let mpl = MapPlayer.fromIndex(index)
        let skid: number = GetSpellAbilityId()
        let x: number = GetSpellTargetX()
        let y: number = GetSpellTargetY()
        if (GetSpellAbilityId() == FourCC('A006')) {  //R物品合成
            EQ_Three_In_One.PetsSpellHCItem(index, x, y, 300)
        } else if (GetSpellAbilityId() == FourCC('A01W')) { //w物品范围拾取
            Hope_Item.One_key_Pickup(u, x, y, 300)
        } else if (GetSpellAbilityId() == FourCC('A00D')) { //E指定地点丢弃物品
            EQ_Three_In_One.PetsSpellZDDQItem(u, x, y)
        }
    }
    static PetsSpellHCItem_Selection(this: void) {//选取物品
        let wp = GetEnumItem()
        let mo = GetItemTypeId(wp)
        if (mo != null) {
            for (let v in EQ_Three_In_One.config) {
                let data = EQ_Three_In_One.config[v]
                if (mo == FourCC(v)) {
                    if (!EQ_Three_In_One.ItemHCbl["品阶" + data.Grade + "数"]) {
                        EQ_Three_In_One.ItemHCbl["品阶" + data.Grade + "数"] = 0
                    }
                    EQ_Three_In_One.ItemHCbl["品阶" + data.Grade + "数"]++
                    EQ_Three_In_One.ItemHCbl["品阶" + data.Grade + "系列" + EQ_Three_In_One.ItemHCbl["品阶" + data.Grade + "数"]] = wp
                }
            }
        }
    }
    static PetsSpellHCItem(pid: number, x: number, y: number, fw: number) {//合成物品技能
        let qy: rect = NumerivalUtil.NewRect(x, y, fw * 2, fw * 2)
        EnumItemsInRect(qy, null, EQ_Three_In_One.PetsSpellHCItem_Selection)
        RemoveRect(qy)
        let wps: number = 0
        for (let index = 1; index < 6; index++) {//合成操作
            let pj = InitString.InitStringBl["品级" + (index - 1)]//当前品级是
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '当前品级是' + pj);
            let ews = R2I(wps / Pow(3, index - 1))//额外的物品数
            if (EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"] && ews + EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"] >= 3) {
                let js = R2I((ews + EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"]) / 3)
                wps -= ews * Pow(3, index - 1)
                wps += Pow(3, index) * js
                for (let scw = 1; scw <= js * 3 - ews; scw++) {//合成操作
                    if (EQ_Three_In_One.ItemHCbl["品阶" + pj + "系列" + scw]) {
                        Hope_Item.Remove_Item(EQ_Three_In_One.ItemHCbl["品阶" + pj + "系列" + scw])//删除物品
                    }
                }
            }
        }
        if (wps > 0) {
            for (let index = 4; index > 0; index--) {//创建物品
                let pjxqs = Pow(3, index)
                if (wps >= pjxqs) {
                    let qcs = R2I(wps / pjxqs)
                    wps -= qcs * pjxqs
                    if (InitString.InitStringBl["品级" + index] == 'B') {
                        let rand = GetRandomInt(0, EQ_Three_In_One.level2.length - 1)
                        ItemUtil.CreateItemsXY(pid, FourCC(EQ_Three_In_One.level2[rand]), qcs, x, y, true)
                    } else if (InitString.InitStringBl["品级" + index] == 'A') {
                        let rand = GetRandomInt(0, EQ_Three_In_One.level3.length - 1)
                        ItemUtil.CreateItemsXY(pid, FourCC(EQ_Three_In_One.level3[rand]), qcs, x, y, true)
                    } else if (InitString.InitStringBl["品级" + index] == 'S') {
                        let rand = GetRandomInt(0, EQ_Three_In_One.level4.length - 1)
                        ItemUtil.CreateItemsXY(pid, FourCC(EQ_Three_In_One.level4[rand]), qcs, x, y, true)
                    } else if (InitString.InitStringBl["品级" + index] == 'SS') {
                        let rand = GetRandomInt(0, EQ_Three_In_One.level5.length - 1)
                        ItemUtil.CreateItemsXY(pid, FourCC(EQ_Three_In_One.level5[rand]), qcs, x, y, true)
                    }
                }
            }
        }
        for (let index = 0; index < 5; index++) {//清空数组数据
            let pj = InitString.InitStringBl["品级" + index]
            for (let index1 = 1; EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"] && index1 <= EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"]; index1++) {
                EQ_Three_In_One.ItemHCbl["品阶" + pj + "系列" + index1] = null
            }
            EQ_Three_In_One.ItemHCbl["品阶" + pj + "数"] = null
        }
    }
    // static PetsSpellFWSQItem(pid: number, x: number, y: number, fw: number) {//范围拾取物品
    //     let qy: rect = NumerivalUtil.NewRect(x, y, fw * 2, fw * 2)
    //     EnumItemsInRect(qy, null, EQ_Three_In_One.PetsSpellFWSQItem_Selection)
    //     RemoveRect(qy)
    // }

    static PetsSpellZDDQItem(udw: unit, x: number, y: number) {//指定丢弃物品
        for (let index = 0; index < 6; index++) {
            let wp = UnitItemInSlot(udw, index)
            if (wp) {
                UnitRemoveItem(udw, wp)
                SetItemPosition(wp, x, y)
            }
        }
    }

    // static PetsSpellFWSQItem_Selection(this: void) {//选取物品
    //     let wp = GetEnumItem()
    //     let cfdw = GetTriggerUnit()
    //     //物品保护
    //     let id = GetPlayerId(GetOwningPlayer(cfdw))
    //     // if (ItemUtil.CanGetLimtItem(pid, wp, false) == false) {
    //     //     UnitRemoveItem(cfdw, wp);
    //     //     return;
    //     // }//物品保护出现就丢下物品
    //     //
    //     UnitAddItem(cfdw, wp)
    // }


}
