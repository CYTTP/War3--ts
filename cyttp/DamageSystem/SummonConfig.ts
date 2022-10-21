import DataBase from "solar/common/DataBase";
import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";
import CyttpDamageSystem from "./CyttpDamageSystem";

export type SummonSimulationAttributeType = {

    //------------------召唤类---------------------
    //召唤物数量
    Summon_quantity?: number
    //召唤物属性加成  
    Summon_state_add?: number
    //召唤物继承属性加成  
    Summon_inheritance_state_add?: number
    //召唤物攻击速度
    Summon_Attack_speed?: number
    //召唤物暴击几率
    Summon_physical_critical_chance?: number
    //召唤物暴击伤害加成
    Summon_physical_critical_damage?: number
    //召唤物护甲穿透
    Summon_Armor_penetrate?: number
    //召唤物护甲穿透百分比
    Summon_Armor_penetrate_p?: number
    //召唤物伤害减免
    Summon_damage_reduction?: number
    //召唤物减伤
    Summon_injury_reduction?: number
    //召唤物附加伤害
    Summon_add_damage?: number
    //召唤物真实伤害
    Summon_real_damage?: number
    //召唤物附加伤害加成
    Summon_add_damage_p?: number
    //召唤物真实伤害加成
    Summon_real_damage_p?: number
    //召唤物全额增伤
    Summon_damage_increased?: number
}
// 要给   召唤物添加 A010 技能
export default class SummonConfig {

    //填单位id
    constructor() {
        let trigger = new Trigger();
        trigger.registerAnyUnitDamagedEvent()
        trigger.addCondition(Condition(() => {
            return ((IsUnitAlly(GetTriggerUnit(), GetOwningPlayer(GetEventDamageSource())) == false)
                && (GetEventDamage() > 0)
                && (GetUnitAbilityLevel(GetEventDamageSource(), 'A010') > 0)
            )
        }))
        trigger.addAction(this.action)
    }
    action(this: void) {
        //召唤类型
        let sum_unit0 = GetTriggerUnit()
        let sum_unit1 = GetEventDamageSource()
        let p = GetOwningPlayer(sum_unit1)
        if (!IsHandle(sum_unit0) || !IsHandle(sum_unit1)) {
            return
        }
        DataBase.getPlayerSolarData(p).召唤物 = sum_unit1
        // if (GetUnitAbilityLevel(sum_unit1, 'A010') > 0) {
        // DisplayTextToPlayer(Player(0), 0, 2, '召唤物：' + GetUnitName(sum_unit1))
        // ////设置变量
        let sum_unit0Data: SummonSimulationAttributeType = Unit.fromHandle(sum_unit0).solarData;
        let sum_unit1Data: SummonSimulationAttributeType = Unit.fromHandle(sum_unit1).solarData
        let Summon_new_dmg = GetEventDamage()

        // //召唤物攻击速度
        // let Summon_As = sum_unit1Data.Summon_Attack_speed ? sum_unit1Data.Summon_Attack_speed : 0
        // let osp = GetUnitState(sum_unit1, ConvertUnitState(0x51))
        // let speed = osp * (1 + Summon_As)
        // SetUnitState(sum_unit1, ConvertUnitState(0x51), speed)
        // DisplayTextToPlayer(Player(0), 0, 2, 'osp' + osp)
        //物理暴击
        if (EXGetEventDamageData(2) == 1 ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_NORMAL ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_ENHANCED ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_POISON ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_DISEASE ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_ACID ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_DEMOLITION ||
            ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_SLOW_POISON) {
            // DisplayTextToPlayer(Player(0), 0, 0, '物理触发')
            // ////物理增伤
            // let dmg_pdi = sum_unit1Data.physical_damage_increased ? sum_unit1Data.physical_damage_increased : 0
            // Summon_new_dmg = Summon_new_dmg * (dmg_pdi + 1)
            // 特殊伤害加成
            Summon_new_dmg = CyttpDamageSystem.SpecialDamageBonus(sum_unit1, sum_unit1Data, Summon_new_dmg)
            //召唤物暴击几率
            let Summon_pcc = sum_unit1Data.Summon_physical_critical_chance ? sum_unit1Data.Summon_physical_critical_chance : 0
            if ((GetRandomReal(0, 1) < (Summon_pcc))) {
                // DisplayTextToPlayer(Player(0), 0, 0, '物理爆伤触发')
                // ////Critical damage 暴击伤害
                let Summon_acd = sum_unit1Data.Summon_physical_critical_damage ? sum_unit1Data.Summon_physical_critical_damage : 0
                Summon_new_dmg *= (1 + Summon_acd);
                // ////漂浮文字
                CyttpDamageSystem.FloatingDamageEffect(sum_unit0, sum_unit1, Summon_new_dmg, 2, 34, 1.4, 90)
            } else {
                // DisplayTextToPlayer(Player(0), 0, 0, '物理触发1111')
                CyttpDamageSystem.FloatingDamageEffect(sum_unit0, sum_unit1, Summon_new_dmg, 5)
            }
        }
        //召唤物护甲穿透
        // let suap = sum_unit1Data.Summon_Armor_penetrate ? sum_unit1Data.Summon_Armor_penetrate : 0
        // let unit = GetUnitState(sum_unit0, ConvertUnitState(0x20))
        // SetUnitState(sum_unit0, ConvertUnitState(0x20), unit - suap)
        // //召唤物护甲穿透百分比
        // let app = sum_unit1Data.Summon_Armor_penetrate_p ? sum_unit1Data.Summon_Armor_penetrate_p : 0
        // let un = GetUnitState(sum_unit0, ConvertUnitState(0x20))
        // let newVal1 = un * (1 - app)
        // SetUnitState(sum_unit0, ConvertUnitState(0x20), R2I(newVal1))
        //全额增伤
        let dmg_di = sum_unit1Data.Summon_damage_increased ? sum_unit1Data.Summon_damage_increased : 0
        Summon_new_dmg = Summon_new_dmg * (dmg_di + 1)
        //召唤物伤害减免
        let s_dr = sum_unit0Data.Summon_damage_reduction ? sum_unit0Data.Summon_damage_reduction : 0
        Summon_new_dmg = Summon_new_dmg * (1 - Math.min(s_dr, 1))
        //召唤物减伤 
        let s_ir = sum_unit0Data.Summon_injury_reduction ? sum_unit0Data.Summon_injury_reduction : 0
        Summon_new_dmg -= s_ir
        // //召唤物附加伤害
        let fjsh = sum_unit1Data.Summon_add_damage ? sum_unit1Data.Summon_add_damage : 0
        Summon_new_dmg += fjsh
        //召唤物附加伤害加成
        let fjsh_p = sum_unit1Data.Summon_add_damage_p ? sum_unit1Data.Summon_add_damage_p : 0
        Summon_new_dmg = Summon_new_dmg + (fjsh_p + 1) * fjsh
        //召唤物真实伤害
        if (sum_unit1Data.Summon_real_damage) {
            let zssh = sum_unit1Data.Summon_real_damage ? sum_unit1Data.Summon_real_damage : 0
            SetUnitState(sum_unit0, ConvertUnitState(0x20), 0)
            Summon_new_dmg = zssh
        }
        //召唤物真实伤害百分比
        let zssh_p = sum_unit1Data.Summon_real_damage_p ? sum_unit1Data.Summon_real_damage_p : 0
        // }


        ////设置最终伤害值
        EXSetEventDamage(Summon_new_dmg);

    }
}