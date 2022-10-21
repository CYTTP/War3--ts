import TextTagUtil from "solar/util/TextTagUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
/**
 * 木材+1
 */
export default class ChanceWoodReward {
    static config: {
        [id: string]: {
            prop: number,
            value: number
        }
    } = {
            'A00F': { prop: 20, value: 1 }
        }
    constructor() {
        this.fun()
    }
    fun() {
        let tri = new Trigger()
        tri.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
        tri.addAction(this.action)
    }
    action(this: void) {
        for (let v in ChanceWoodReward.config) {
            let data = ChanceWoodReward.config[v]
            let u = GetKillingUnit()
            if (IsHeroUnitId(GetUnitTypeId(u))) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitAbilityLevel(u, FourCC(v)) + '');
                if (GetUnitAbilityLevel(u, FourCC(v)) >= 0 && GetRandomInt(1, 100) <= data.prop) {
                    AdjustPlayerStateBJ(data.value, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_LUMBER)
                    SetTextTagVelocity(TextTagUtil.text("木材+" + data.value, GetTriggerUnit(), 20, 2, 0, 255, 0), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                }
            }

        }
    }
}