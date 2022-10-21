
import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"

import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 无敌：能够无敌3秒 20
 */
export default class Invincible {
    static config: {
        [id: string]: {
            time?: number,
            effectString?: string
        }
    } = {
            'q0q1': {
                time: 3,
                effectString: 'sem_te_xiao_1_7_1.mdx'
            }
        }
    constructor() {
        this.fun()
    }
    fun() {
        let tri = new Trigger()
        tri.registerTimerEvent(20, true)
        tri.addAction(this.action)
    }
    action(this: void) {
        for (let v in Invincible.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = Invincible.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                let effect = AddSpecialEffectTarget(data.effectString, u, 'head')
                EXSetEffectSize(effect, 1)
                SetUnitInvulnerable(u, true)
                handle_ref(u)
                BaseUtil.runLater(data.time, () => {
                    handle_unref(u)
                    SetUnitInvulnerable(u, false)
                    DestroyEffect(effect)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '结束。。。');
                })
            }

        }
    }
}