import ItemUtil from "solar/util/ItemUtil";
import {Trigger} from "solar/w3ts/handles/trigger";
import {Unit} from "solar/w3ts/handles/unit";

/**
 *太阳 物品合成 系统 ItemSynthesisUtil
 */
export default class ItemSynthesisUtil {
    /**
     * 物品合成config
     */
    static config: {
        [id: string]: {
            materials?: string[],//ids
            material?: { [id: string]: number },//材料带数量
        }
    } = {}

    constructor() {
        //触发
        let trigger = new Trigger()
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM)
        trigger.addAction(this.action)
    }

    action(this: void) {
        let item = GetManipulatedItem()
        let triggerUnit = Unit.fromEvent();
        // 可充叠加
        let unit = GetTriggerUnit()
        if(IsUnitIllusion(unit)){
            return
        }
        //one case   太阳开始
        let config = ItemSynthesisUtil.config;
        for (let id in config) {
            let configData = config[id];
            let flag = ItemSynthesisUtil.NewItemsFormulaByMaterial(triggerUnit, id, configData.material);
            if (flag) {//如果合成了就退出
                return
            }
        };
    }

    static NewItemsFormulaByMaterial(unit: Unit, id: string, material: { [id: string]: number }): boolean {
        //检查是否满足材料  -- 返回物品id，物品可用数量，以“表”的形式返回值
        let itemAndCharges = ItemUtil.getItemAndChargesFromUnit(unit.handle);
        // 遍历材料
        for (const materialId in material) {
            let Charges = itemAndCharges[materialId]
            // Charges存在就往下走，否则就退出
            if (!Charges) {
                return false;
            }
            let materialCount = material[materialId];
            // 物品栏的数量   小于   合成需求数量，退出
            if (Charges < materialCount) {
                return false;
            }
        }
        //ok
        for (const materialId in material) {
            ItemUtil.costItemChargesFromUnit(unit.handle, FourCC(materialId), material[materialId])
        }
        //create item
        unit.addItemById(FourCC(id))
        return true;
    }

}