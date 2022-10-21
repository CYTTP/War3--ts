
import BaseUtil from "solar/util/BaseUtil";
import { Timer } from "solar/w3ts/handles/timer";
import { TimerDialog } from "solar/w3ts/handles/timerdialog";
import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";
import { playerColors } from "solar/w3ts/utils/color";



// -- “可充”类型物品叠加
// 物品叠加事件 
export default class ItemSynthesisTriggerEventState {

    constructor() {

        this.Passive_trigger();

    };
    Passive_trigger() {

        // 物品叠加事件 --- 可充类型才可以叠加
        // 获得物品
        let trigger2 = new Trigger();
        trigger2.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM)
        trigger2.addAction(this.action);

    };
    action(this: void) {
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 1, '获得');
        //  可充类型才可以叠加
        let item = GetManipulatedItem()
        if (GetItemType(item) == ITEM_TYPE_CHARGED) {
            let unit = GetTriggerUnit()
            for (let i = 0; i < 6; i++) {
                let hold_item = UnitItemInSlot(unit, i)
                if (GetItemTypeId(item) == GetItemTypeId(hold_item)
                    && item != hold_item) {
                    SetItemCharges(hold_item, GetItemCharges(hold_item) + GetItemCharges(item))
                    RemoveItem(item)
                    return 

                };
            };

        }

    };
};