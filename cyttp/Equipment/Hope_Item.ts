import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";

/**
 * 声明一个 对象池子类型
 */
export type ObjItem = {
    /** 拥有者 index */
    Owner?: number,
    /** 物品可叠加 */
    Stackable?: boolean,
    /** 物品可丢弃 */
    Discard?: boolean,


};



/**
 * 物品函数 --
 */
export default class Hope_Item {
    // 用来记录，拥有技能的英雄单位
    private static item_data: {
        [item_hanlde: number]: ObjItem
    } = {};

    /**
     * 玩家物品是否共享 -- 
     */
    private static player_item_share: boolean[] = [false, false, false, false,]


    /**
     * 关于 物品 相关 事件 -- 
     */
    constructor() {
        for (let i = 0; i < 4; i++) {
            let index = i
            // 玩家拾取物品，判断所属玩家，禁止拾取 ----------------------
            let tig = new Trigger()
            tig.registerPlayerUnitEvent(MapPlayer.fromHandle(Player(index)), EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER, null)
            tig.addAction(() => {
                let item_hanlde = GetHandleId(GetOrderTargetItem())
                if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
                    let p_index = GetPlayerId(GetTriggerPlayer())
                    let Owner_index = Hope_Item.item_data[item_hanlde].Owner
                    // 判断 命令是否是“拾取物品ID”  
                    if (GetUnitCurrentOrder(GetTriggerUnit()) == 851971) {
                        // 物品共享是否为假-- 物品所属玩家 不等于 拾取物品的玩家 --
                        if ((p_index != Owner_index && !Hope_Item.Get_Share(Owner_index))) {
                            // 停止拾取物品 --
                            IssuePointOrder(GetTriggerUnit(), "move", GetUnitX(GetTriggerUnit()), GetUnitY(GetTriggerUnit()))
                            DisplayTimedTextToPlayer(GetTriggerPlayer(), 0, 0, 3, '|cffffff00【系统】|r' + '|cfff90303不能拾取别人的物品！');
                        }

                    }
                }
            });

            // // 使用物品  次数小于1 就删除物品 --------------------------------------------- 
            // let tig1 = new Trigger()
            // tig1.registerPlayerUnitEvent(MapPlayer.fromHandle(Player(index)), EVENT_PLAYER_UNIT_USE_ITEM, null)
            // tig1.addAction(() => {
            //     let _item = GetManipulatedItem()
            //     // 使用次数小于0 删除物品 --
            //     if (GetItemCharges(_item) <= 0) {
            //         Hope_Item.Remove_Item(_item)
            //     }
            // });


            // 获得物品  物品叠加 (可充类型 或者 手动设置了物品.Stackable属性 ) --------------------------------------------- 
            let tig2 = new Trigger()
            tig2.registerPlayerUnitEvent(MapPlayer.fromHandle(Player(index)), EVENT_PLAYER_UNIT_PICKUP_ITEM, null)
            tig2.addAction(() => {
                let item = GetManipulatedItem()
                // 只有可充类型 才可以叠加 --
                if (GetItemType(item) == ITEM_TYPE_CHARGED || Hope_Item.Get_Stackable(item)) {
                    let unit = GetTriggerUnit()
                    for (let ii = 0; ii < 6; ii++) {
                        let hold_inem = UnitItemInSlot(unit, ii)
                        if (GetItemTypeId(item) == GetItemTypeId(hold_inem)
                            && item != hold_inem) {
                            SetItemCharges(hold_inem, GetItemCharges(hold_inem) + GetItemCharges(item))
                            Hope_Item.Remove_Item(item)
                            break

                        };
                    };

                }
            });
        }
    }

    /**
     * 设置玩家 物品共享 是否打开  --
     * @param index 玩家索引
     * @param logic true 为共享，原先默认为：false
     */
    public static Set_Share(index: number, logic: boolean = true) {
        Hope_Item.player_item_share[index] = logic
    }

    /**
     * 获取玩家 物品共享 状态--
     * @param index 玩家索引
     ** true 为共享 false 为不共享 
     */
    public static Get_Share(index: number,): boolean {
        return Hope_Item.player_item_share[index] || false
    }


    /**
     * 新建物品 并且绑定所属玩家
     * PS:通过此方法创建的wup,必须通过：Hope_Item.RemoveItem 删除-- 
     * @param item_id 物品ID
     * @param x 物品坐标
     * @param y 物品坐标
     * @param index 物品所属玩家索引
     * @returns 返回物品
     */
    public static Create_Item(item_id: string, x: number, y: number, index: number): item {
        let temp: item = CreateItem(FourCC(item_id), x, y)
        let item_hanlde = GetHandleId(temp)
        Hope_Item.item_data[item_hanlde] = { Owner: index }
        return temp
    }

    /**
     * 删除物品，并且清空物品的所属
     * @param _item 要删除的物品 --
     */
    public static Remove_Item(_item: item) {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            Hope_Item.item_data[item_hanlde] = null
        }
        RemoveItem(_item)
    }

    /**
     * 获取物品的所属玩家 索引 -- 
     * @param item 物品
     * @returns 返回玩家索引 没有返回-1
     */
    public static Get_Owner(_item: item,): number {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            return Hope_Item.item_data[item_hanlde].Owner
        } else {
            return -1
        }
    }

    /**
     * 设置物品可叠加 PS:需要-- Create_Item方法创建的物品
     * @param _item 物品
     * @param logic 默认ture 可叠加
     */
    public static Set_Stackable(_item: item, logic: boolean = true,) {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            Hope_Item.item_data[item_hanlde].Stackable = logic
        } else {
            DisplayTimedTextToPlayer(GetTriggerPlayer(), 0, 0, 30, '|cfff90303设置-- 叠加 --属性--异常！该物品不是通过：Create_Item方法创建的物品！');
        }
    }

    /**
     * 获取物品是否可叠加
     * @param _item 物品
     * @returns 可叠加 返回ture
     */
    public static Get_Stackable(_item: item,): boolean {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            return Hope_Item.item_data[item_hanlde].Stackable || false
        }
        return false
    }


    /**
     * 设置物品可丢弃
     * @param _item 物品
     * @param logic 默认false 不可丢弃
     */
    public static Set_Discard(_item: item, logic: boolean = false,) {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            Hope_Item.item_data[item_hanlde].Discard = logic
        } else {
            DisplayTimedTextToPlayer(GetTriggerPlayer(), 0, 0, 30, '|cfff90303设置-- 丢弃 --属性--异常！该物品不是通过：Create_Item方法创建的物品！');
        }
    }


    /**
     * 获取物品是否可丢弃
     * @param _item 物品
     */
    public static Get_Discard(_item: item,): boolean {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            return Hope_Item.item_data[item_hanlde].Discard || true
        }
        return true
    }




    /**
     *  一键拾取 物品
     ** 满足 满背包 拾取 --可充 可叠加 -- 的物品
     * @param u 丢弃物品的单位
     * @param x 拾取的x坐标
     * @param y 拾取的y坐标
     * @param range 拾取的范围
     */
    public static One_key_Pickup(u: unit, x: number, y: number, range: number = 400) {
        // 这里是 半径 --
        range = range / 2
        let r = Rect(x - range, y - range, x + range, y + range)
        EnumItemsInRect(r, null, () => {
            let _item = GetEnumItem()
            if (GetWidgetLife(_item) > 0) {
                let item_hanlde = GetHandleId(_item)
                if (Hope_Item.item_data[item_hanlde]) {
                    let p_index = GetPlayerId(GetOwningPlayer(u))
                    let Owner_index = Hope_Item.item_data[item_hanlde].Owner
                    // 判断 物品共享是否开启 -- 物品所属 -- 
                    if (p_index == Owner_index || Hope_Item.Get_Share(Owner_index)) {
                        if (GetItemType(_item) == ITEM_TYPE_CHARGED || Hope_Item.Get_Stackable(_item)) {
                            for (let i = 0; i < 6; i++) {
                                let hold_inem = UnitItemInSlot(u, i)
                                if (GetItemTypeId(_item) == GetItemTypeId(hold_inem)) {
                                    SetItemCharges(hold_inem, GetItemCharges(hold_inem) + GetItemCharges(_item))
                                    Hope_Item.Remove_Item(_item)
                                    break
                                } else if (i >= 5) {
                                    UnitAddItem(u, _item)
                                }
                            };
                        } else {
                            UnitAddItem(u, _item)
                        };
                    } else {
                        DisplayTimedTextToPlayer(GetTriggerPlayer(), 0, 0, 5, '|cffffff00【系统】|r' + '|cfff90303不能拾取别人的物品！');
                    }
                } else {
                    UnitAddItem(u, _item)
                };
            };
        });
        RemoveRect(r)
    };


    /**
     * 一键丢弃物品
     * @param u 丢弃物品的单位
     */
    public static One_key_Discard(u: unit,) {
        for (let i = 0; i < 6; i++) {
            let hold_inem = UnitItemInSlot(u, i)
            if (IsHandle(hold_inem) && Hope_Item.Get_Discard(hold_inem)) {
                UnitRemoveItem(u, hold_inem)
            }
        };
    };


    /**
     * 获取物品的 Hope_Item 对象里的属性
     * @param _item 物品
     * @returns 返回 物品的 ObjItem 属性
     */
    public static Get_Data(_item: item,): ObjItem {
        let item_hanlde = GetHandleId(_item)
        if (item_hanlde != 0 && Hope_Item.item_data[item_hanlde]) {
            let data: ObjItem = Hope_Item.item_data[item_hanlde]
            return data
        } else {
            DisplayTimedTextToPlayer(GetTriggerPlayer(), 0, 0, 30, '|cfff90303获取失败！该物品不是：Create_Item方法创建出来的物品！');
        }
    };





}