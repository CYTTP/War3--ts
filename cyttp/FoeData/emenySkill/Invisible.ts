
import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"

import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 隐身：能够隐匿身形5秒 20
 */
export default class Invisible {
    static config: {
        [id: string]: {
            armour?: number,
            time?: number,
        }
    } = {
            'q0q1': {
                armour: 20,
                time: 5,
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
        for (let v in Invisible.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = Invisible.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                ShowUnit(u, false)
                handle_ref(u)
                BaseUtil.runLater(data.time, () => {
                    handle_unref(u)
                    ShowUnit(u, true)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '结束。。。');
                })
            }

        }
    }
}