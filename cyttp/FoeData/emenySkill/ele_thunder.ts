
import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"

import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 
 */
export default class ele_thunder {
    static config: {
        [id: string]: {
            time?: number,
            effectString?: string
        }
    } = {
            'A01J': {
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
        for (let v in ele_thunder.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
           

        }
    }
}