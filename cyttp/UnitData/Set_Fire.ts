import SelectUtil from "solar/util/SelectUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
/**
 * 集火--移动
 */
export default class Set_Fire {
    //集火
    static config: {
        [ids: string]: {}
    } = {
            'q0ld': {}
        }

    constructor() {
        let fire_trigger = new Trigger()
        fire_trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        fire_trigger.addAction(this.action)
    }
    action(this: void) {

        for (let ids in Set_Fire.config) {
            let data = Set_Fire.config[ids]
            let fire_id = id2string(GetSpellAbilityId())//获取使用的技能
            if (fire_id == ids) {
                let u = GetTriggerUnit()
                let player = GetOwningPlayer(u)
                let xdw = GetSpellTargetUnit()
                if (IsUnitEnemy(xdw, player) == true && GetUnitState(xdw, UNIT_STATE_LIFE) > 0.4) {
                    SelectUtil.forPlayerUnits((unit) => {
                        IssueTargetOrder(unit, 'attack', xdw)
                    }, GetPlayerId(player))
                }
            }
        }

    }
}