import UnitUtil from "cyttp/Util/UnitUtil";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import SelectUtil from "solar/util/SelectUtil";
import { Trigger } from "solar/w3ts/handles/trigger";



//code
export default class itemTransfer {

    constructor() {
        // 双击移动物品
        let trigger99 = new Trigger()
        trigger99.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER)
        trigger99.addAction(() => {
            if (GetIssuedOrderId() >= 852002 && GetIssuedOrderId() <= 852007) {

                DisableTrigger(GetTriggeringTrigger())
                // DataBase.getPlayerSolarData(p).英雄单位 就是玩家英雄单位
                // DataBase.getPlayerSolarData(p).宝宝单位 就是玩家宝宝单位
                let u = GetTriggerUnit()
                let p = GetOwningPlayer(u)
                if (GetUnitState(DataBase.getPlayerSolarData(p).建造师, UNIT_STATE_LIFE) <= 0) {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '死亡');
                    EnableTrigger(GetTriggeringTrigger())
                    return
                }
                // 判断是宝宝，还是英雄
                let collect_item_unit: unit
                if (u == DataBase.getPlayerSolarData(p).创建英雄单位) {
                    collect_item_unit = DataBase.getPlayerSolarData(p).建造师
                    DisplayTimedTextToPlayer(p, 0, 0, 5, GetUnitName(collect_item_unit));
                } else if (u == DataBase.getPlayerSolarData(p).建造师) {
                    collect_item_unit = DataBase.getPlayerSolarData(p).创建英雄单位
                } else {
                    EnableTrigger(GetTriggeringTrigger())
                    return
                };
                let target_item = GetOrderTargetItem();
                let old_coordinate = 7
                let new_coordinate = 8
                for (let i = 0; i < 6; i++) {
                    let item = UnitItemInSlot(u, i)
                    if (target_item == item) {
                        old_coordinate = i
                        break
                    };
                };
                // 延迟判断
                handle_ref(u)
                BaseUtil.runLater(0.03, () => {
                    handle_unref(u)
                    for (let i = 0; i < 6; i++) {
                        let item = UnitItemInSlot(u, i)
                        if (target_item == item) {
                            new_coordinate = i
                            break
                        };
                    };
                    if (old_coordinate == new_coordinate) {
                        UnitAddItem(collect_item_unit, target_item)
                        // 提示背包爆满！
                        let item = UnitItemInSlot(u, new_coordinate)
                        if (target_item == item) {
                            DisplayTimedTextToPlayer(p, 0, 0, 5, '|cff00ffff传送对象的背包已满！|r');
                        };
                    };
                });
                EnableTrigger(GetTriggeringTrigger())
            };
        });
    }
}