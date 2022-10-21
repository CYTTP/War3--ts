import BaseUtil from "solar/util/BaseUtil"
import SelectUtil from "solar/util/SelectUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"
import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 急行军  ： 速度增加2000，持续5秒
 */
export default class RapidMarch {
    static config: {
        [id: string]: {
            SpeedValue?: number,
            time?: number,
            effectString?: string
        }
    } = {
            'q0q1': {
                SpeedValue: 200,
                time: 5,
                effectString: 'sem_fa_li_ji_zeng.mdx'
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
        for (let v in RapidMarch.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = RapidMarch.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                Unit.fromHandle(u).solarData.初始速度 = GetUnitMoveSpeed(u)
                SetUnitMoveSpeed(u, GetUnitMoveSpeed(u) + data.SpeedValue)
                let effect = AddSpecialEffectTarget(data.effectString, u, 'origin')
                EXSetEffectSize(effect, 1)
                handle_ref(u)
                BaseUtil.runLater(data.time, () => {
                    handle_unref(u)
                    DestroyEffect(effect)
                    SetUnitMoveSpeed(u, Unit.fromHandle(u).solarData.初始速度)
                    //    DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '结束。。。');
                })
            }

        }
    }
}