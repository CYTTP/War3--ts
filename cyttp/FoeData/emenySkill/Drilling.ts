
import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"

import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 钻地：血量低于30%时，钻入地下，每秒恢复3%的生命值，持续时间5秒 20   lv24
 */
export default class Drilling {
    static config: {
        [id: string]: {
            time?: number,
            life?: number,
            effectString?: string
        }
    } = {
            'q0q1': {
                time: 5,
                life: 0.3,
                effectString: 'sem_EarthHigh.mdx'
            }
        }
    constructor() {
        this.fun()
    }
    fun() {
        let tri = new Trigger()
        tri.registerTimerEvent(2, true)
        tri.addAction(this.action)
    }
    action(this: void) {
        for (let v in Drilling.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = Drilling.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                Unit.fromHandle(u).solarData.生命恢复 = GetUnitState(u, UNIT_STATE_MAX_LIFE) * 0.03
                let life_p = GetUnitState(u, UNIT_STATE_MAX_LIFE) * data.life
                if (GetUnitState(u, UNIT_STATE_LIFE) <= life_p) {
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
                    IssueImmediateOrder(u, 'burrow') //打开
                    handle_ref(u)
                    BaseUtil.runLater(1, () => {
                        DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
                        handle_unref(u)
                        let effect = AddSpecialEffectTarget(data.effectString, u, 'head')
                        EXSetEffectSize(effect, 1)
                        DestroyEffect(effect)
                        SetUnitState(u, UNIT_STATE_LIFE, GetUnitState(u, UNIT_STATE_LIFE) + Unit.fromHandle(u).solarData.生命恢复)
                    }, data.time)
                }
            }

        }
    }
}