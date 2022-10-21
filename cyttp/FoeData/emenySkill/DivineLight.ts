
import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"
import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 神圣之光：恢复自身20%的生命值   20
 */
export default class DivineLight {
    static config: {
        [id: string]: {
            lifeValue?: number,
            effectString?: string
        }
    } = {
            'q0q1': {
                lifeValue: 0.2,
                effectString: 'sem_te_xiao_3_4_9.mdx'
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
        for (let v in DivineLight.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = DivineLight.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                let effect = AddSpecialEffectTarget(data.effectString, u, 'origin')
                EXSetEffectSize(effect, 1)
                Unit.fromHandle(u).solarData.初始生命 = GetUnitState(u, UNIT_STATE_LIFE)
                let lifeadd = GetUnitState(u, UNIT_STATE_LIFE) * data.lifeValue
                SetUnitState(u, UNIT_STATE_LIFE, Unit.fromHandle(u).solarData.初始生命 + lifeadd)
                handle_ref(effect)
                BaseUtil.runLater(1, () => {
                    handle_unref(effect)
                    DestroyEffect(effect)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '结束。。。');
                })
            }

        }
    }
}