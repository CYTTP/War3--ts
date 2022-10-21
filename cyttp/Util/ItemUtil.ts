import Hope_Item from "cyttp/Equipment/Hope_Item"
import BaseUtil from "solar/util/BaseUtil"
import { Item } from "solar/w3ts/handles/item"
// import FunPropObj from "TsframeSF/FunObj/FunPropObj"
// import SFglobals from "TsframeSF/Globals/SFglobals"
import Funjapi from "./ConencondUtil"


/**
 * 物品操作工具
 */
export default class ItemUtil {

    /**
     *创建受保护物品
    */
    static CreateItemOverFun(itemid: number, x: number, y: number, pid: number, islimt: boolean): item {
        if (itemid == null || itemid == 0) { return }
        let wp = Hope_Item.Create_Item(id2string(itemid), x, y, pid)
        // let wp = CreateItem(itemid, x, y)

        if (islimt) {
            Item.fromHandle(wp).solarData.pid = pid//记录物品归属ID
            Item.fromHandle(wp).solarData.CreateTime = BaseUtil.time//记录该物品当前时间
        }
        return wp
    }
    /**
     *创建受保护物品给予单位
    */
    static GiveUnitItem(itemid: number, udw: unit, islimt: boolean) {
        if (itemid == null || itemid == 0) { return }
        let pid = GetPlayerId(GetOwningPlayer(udw))
        let x = GetUnitX(udw)
        let y = GetUnitY(udw)
        UnitAddItem(udw, ItemUtil.CreateItemOverFun(itemid, x, y, pid, islimt))
    }
    /**
     *判断物品是否受玩家保护
    */
    static CanGetLimtItem(pid: number, wp: item, ISsm: boolean): boolean {
        let mitm = Item.fromHandle(wp).solarData
        let itpid = mitm.pid
        let is1: boolean = itpid >= 0
        let is2: boolean = itpid != pid
        if (is1 && is2) {
            if (ISsm == true) {
                DisplayTimedTextToPlayer(Player(pid), 0, 0, 5, "该物品属于玩家:|cfffa3816" + GetPlayerName(Player(itpid)) + "|r")
            }
            return false
        }
        return true
    }
    /**
     *获取同类型物品
    */
    static GetItemUyx(udw: unit, wpid: number, wp: item): item {
        for (let index = 0; index < 5; index++) {
            let wp1 = UnitItemInSlot(udw, index)
            if (wp1 && GetItemTypeId(wp1) == wpid && wp != wp1) { return wp1 }
        }
        return null
    }
    /**
     *物品可叠加
    */
    // static ItemOverlay(udw: unit, wp: item) {
    //     let wpid = GetItemTypeId(wp)
    //     let mo = FunPropObj.GetPrpObj(wpid)
    //     if (mo.isKDJ) {
    //         let hqwp = FunItem.GetItemUyx(udw, wpid, wp)
    //         if (IsHandle(hqwp)) {
    //             let num1 = GetItemCharges(hqwp)
    //             let num2 = GetItemCharges(wp)
    //             if (num1 == 0) { num1 = 1 }
    //             if (num2 == 0) { num2 = 1 }
    //             SetItemCharges(hqwp, num1 + num2)//叠加数量
    //             RemoveItem(wp)//删除物品
    //         }
    //     }
    // }
    /**
     *重复创建多个相同物品
    */
    // static CreateItemsToUnit(udw: unit, wpid: number, num: number, pid: number, isJY: boolean, isSbh: boolean) {
    //     let mo = FunPropObj.GetPrpObj(wpid)
    //     let wbsy = Funjapi.GetObjectPropertyInteger("item", wpid, "uses")
    //     if (num == 0 && wbsy > 0) { num = wbsy }
    //     if (mo && !mo.isKDJ && num == 0 && wbsy == 0) { num = 1 }
    //     if (mo && mo.isKDJ) {
    //         let wp = FunItem.CreateItemOverFun(wpid, GetUnitX(udw), GetUnitY(udw), pid, isSbh)
    //         SetItemCharges(wp, num)
    //         if (isJY == true) {
    //             UnitAddItem(udw, wp)
    //         }
    //     } else {
    //         for (let index = 0; index < num; index++) {
    //             let wp = FunItem.CreateItemOverFun(wpid, GetUnitX(udw), GetUnitY(udw), pid, isSbh)
    //             if (isJY == true) {
    //                 UnitAddItem(udw, wp)
    //             }
    //         }
    //     }
    // }
    /**
     *重复创建多个相同物品指定坐标
    */
    static CreateItemsXY(pid: number, wpid: number, num: number, x: number, y: number, isSbh: boolean) {
        for (let index = 0; index < num; index++) {
            let wp = ItemUtil.CreateItemOverFun(wpid, x, y, pid, isSbh)
        }
    }
}
