import BaseUtil from "solar/util/BaseUtil"
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit"
import SelectEmenyUtil from "./SelectEmenyUtil"
/**
 * 使用技能后，能够分化2个继承单位属性80%的分身，存活5秒   20
 */
export default class Separation {
    static config: {
        [id: string]: {
            attribute?: number,
            time?: number,
            vestId?: string,
            model?: string,
            effectString?: string
        }
    } = {
            'q0q1': {
                attribute: 0.8,
                time: 5,
                vestId: 'Hmkg',
                model: '',
                effectString: 'sem_te_xiao_2_2_4.mdx'
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
        for (let v in Separation.config) {
            let u = SelectEmenyUtil.getAnEmeneyUnit(11, v)
            if (!IsHandle(u)) { return }
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u));
            let data = Separation.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                let r: number = 30
                let x: number = GetUnitX(u)
                let y: number = GetUnitY(u)
                let unitId: number = FourCC(data.vestId)
                let effect = AddSpecialEffectTarget(data.effectString, u, 'chest')
                EXSetEffectSize(effect, 0.5)
                BaseUtil.runLater(1, () => {
                    DestroyEffect(effect)
                })
                for (let i = 0; i < 2; i++) {
                    let vest: unit = CreateUnit(GetOwningPlayer(u), unitId, (x + r * CosBJ(30)), (y + r * CosBJ(30)), GetUnitFacing(u))
                    DzSetUnitModel(vest, data.model)
                    SetUnitState(vest, UNIT_STATE_MAX_LIFE, GetUnitState(u, UNIT_STATE_MAX_LIFE) * data.attribute)
                    // 设置单位当前生命值
                    SetUnitState(vest, UNIT_STATE_LIFE, GetUnitState(u, UNIT_STATE_LIFE) * data.attribute)
                    // 设置单位最大魔法值
                    SetUnitState(vest, UNIT_STATE_MAX_MANA, GetUnitState(u, UNIT_STATE_MAX_MANA) * data.attribute)
                    // 设置单位当前魔法值
                    SetUnitState(vest, UNIT_STATE_MANA, GetUnitState(u, UNIT_STATE_MANA) * data.attribute)
                    // 设置单位基础攻击值
                    SetUnitState(vest, ConvertUnitState(0x12), GetUnitState(u, ConvertUnitState(0x15)) * data.attribute);
                    // 设置单位攻击距离
                    SetUnitState(vest, ConvertUnitState(0x16), GetUnitState(u, ConvertUnitState(0x16)) * data.attribute);
                    // 设置单位攻击间隔
                    SetUnitState(vest, ConvertUnitState(0x25), GetUnitState(u, ConvertUnitState(0x25)) * data.attribute);
                    // 设置单位攻击速度
                    SetUnitState(vest, ConvertUnitState(0x51), GetUnitState(u, ConvertUnitState(0x51)) * data.attribute);
                    // 设置单位护甲
                    SetUnitState(vest, ConvertUnitState(0x20), GetUnitState(u, ConvertUnitState(0x20)) * data.attribute);
                    //设置周期
                    UnitApplyTimedLife(vest, unitId, data.time);
                }
            }

        }
    }
}