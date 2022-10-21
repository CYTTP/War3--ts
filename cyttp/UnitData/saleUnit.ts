import TextTagUtil from "solar/util/TextTagUtil"
import { Trigger } from "solar/w3ts/handles/trigger"

export default class saleUnit {
    static config: {
        [ids: string]: { sale_gold?: number }
    } = {
            'q0n8': { sale_gold: 0.5 }
        }

    constructor() {
        this.trigger()
    }
    trigger() {
        let sale_trigger = new Trigger()
        sale_trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        sale_trigger.addAction(this.action)
    }
    action(this: void) {
        for (let v in saleUnit.config) {
            let data = saleUnit.config[v]
            let u = GetTriggerUnit()//获取触发单位
            let player = GetOwningPlayer(u)//获取触发单位所属玩家
            if (GetSpellAbilityId() == FourCC(v)) {
                let goldcost = S2I(unit[id2string(GetUnitTypeId(u))].goldcost)
                AdjustPlayerStateBJ(data.sale_gold * goldcost, player, PLAYER_STATE_RESOURCE_GOLD)
                TextTagUtil.text(data.sale_gold * goldcost + "", u, 15, 0.5, 255, 255, 0)
                RemoveUnit(u)
            }

        }
    }
}