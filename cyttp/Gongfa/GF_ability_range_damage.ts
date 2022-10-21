

import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";
import GFabilityDataConfig from "./GFabilityDataConfig";
import GF_Degree_Proficiency from "./GF_Degree_Proficiency";

/**
 * 功法技能
 */
export default class GF_ability_range_damage {
    constructor() {
        //  // 任意攻击事件 
        let trigger = new Trigger();
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);
        trigger.addAction(this.action);
        //杀敌事件
        let tri = new Trigger();
        tri.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH);
        tri.addAction(this.action1);
        //施放技能
        let trig = new Trigger();
        trig.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST);
        trig.addAction(this.action2);
        //发动技能效果或
        let trigg = new Trigger();
        trigg.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);
        trigg.addAction(this.action3);
        //  伤害事件
        let trigge = new Trigger();
        trigge.registerAnyUnitDamagedEvent()
        trigge.addAction(this.action4);

    };
    action(this: void) {
        for (let v in GFabilityDataConfig.config) {
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发');
            let u = GetAttacker()
            let p = GetOwningPlayer(u)
            let config = GFabilityDataConfig.config[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) < 0) {
                return
            }
            // 拥有的功法id，等级大于1
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                //一定是有这个技能才触发
                GF_Degree_Proficiency.attackUp(u, p)
                if (GetRandomInt(1, 100) <= 5) {
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进来');
                    let level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
                    let n = GetTriggerUnit()
                    let x = GetUnitX(n)
                    let y = GetUnitY(n)
                    // 智力系
                    if (config.type == 'int') {
                        let damage = config.damage * GetHeroInt(u, true) * level
                        let tx = 'greenbloodex.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 力量系  
                    } else if (config.type == 'str') {
                        let damage = config.damage * GetHeroStr(u, true) * level
                        let tx = '[dz.spell]002.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 敏捷系
                    } else if (config.type == 'agi') {
                        let damage = config.damage * GetHeroAgi(u, true) * level
                        let tx = 'Flamestrike Dark Void I.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 攻击系
                    } else if (config.type == 'attack') {
                        let damage = config.damage * GetUnitState(u, ConvertUnitState(0x15)) * level
                        let tx = 'tx04.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 生命系
                    } else if (config.type == 'life') {
                        let damage = GetUnitState(u, UNIT_STATE_MAX_LIFE) * config.damage * level
                        let tx = 'az_jsbz.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                    }
                }
            }
        }
    }
    action1(this: void) {
        for (let v in GFabilityDataConfig.config1) {
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发');
            let u = GetKillingUnit()
            let p = GetOwningPlayer(u)
            let config = GFabilityDataConfig.config1[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) < 0) {
                return
            }
            // 拥有的功法id，等级大于1
            if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                //一定是有这个功法才触发
                GF_Degree_Proficiency.killUp(u, p)
                if (GetRandomInt(1, 100) <= 20) {
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进来');
                    let level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
                    DisplayTimedTextToPlayer(p, 0, 0, 60, 'level' + level);
                    let n = GetTriggerUnit()
                    let x = GetUnitX(n)
                    let y = GetUnitY(n)
                    // 智力系
                    if (config.type == 'int') {
                        let damage = config.damage * GetHeroInt(u, true) * level
                        let tx = 'greenbloodex.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 力量系  
                    } else if (config.type == 'str') {
                        let damage = config.damage * GetHeroStr(u, true) * level
                        let tx = '[dz.spell]002.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 敏捷系
                    } else if (config.type == 'agi') {
                        let damage = config.damage * GetHeroAgi(u, true) * level
                        let tx = 'Flamestrike Dark Void I.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 攻击系
                    } else if (config.type == 'attack') {
                        let damage = config.damage * GetUnitState(u, ConvertUnitState(0x15)) * level
                        let tx = 'tx04.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 生命系
                    } else if (config.type == 'life') {
                        let damage = GetUnitState(u, UNIT_STATE_MAX_LIFE) * config.damage * level
                        let tx = 'az_jsbz.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                    }
                }
            }
        }
    }
    action2(this: void) {
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发');
        for (let v in GFabilityDataConfig.config2) {
            let u = GetTriggerUnit()
            let p = GetOwningPlayer(u)
            let config = GFabilityDataConfig.config2[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) < 0) {
                return
            }
            // 拥有的功法id，等级大于1
            if (GetSpellAbilityId() == FourCC(v)) {
                if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                    GF_Degree_Proficiency.spellAbUp(u, p)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进来');
                    let level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
                    let n = GetSpellTargetUnit()
                    let x = GetUnitX(n)
                    let y = GetUnitY(n)
                    // 智力系
                    if (config.type == 'int') {
                        let damage = config.damage * GetHeroInt(u, true) * level
                        let tx = 'greenbloodex.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 力量系  
                    } else if (config.type == 'str') {
                        let damage = config.damage * GetHeroStr(u, true) * level
                        let tx = '[dz.spell]002.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 敏捷系
                    } else if (config.type == 'agi') {
                        let damage = config.damage * GetHeroAgi(u, true) * level
                        let tx = 'Flamestrike Dark Void I.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 攻击系
                    } else if (config.type == 'attack') {
                        let damage = config.damage * GetUnitState(u, ConvertUnitState(0x15)) * level
                        let tx = 'tx04.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        // 生命系
                    } else if (config.type == 'life') {
                        let damage = GetUnitState(u, UNIT_STATE_MAX_LIFE) * config.damage * level
                        let tx = 'az_jsbz.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                    }
                }
            }
        }
    }
    action3(this: void) {
        for (let v in GFabilityDataConfig.config3) {
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发');
            let u = GetTriggerUnit()
            let p = GetOwningPlayer(u)
            let config = GFabilityDataConfig.config3[v]
            if (GetUnitAbilityLevel(u, FourCC(v)) < 0) {
                return
            }
            // 拥有的功法id，等级大于1
            if (GetSpellAbilityId() == FourCC(v)) {
                if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                    GF_Degree_Proficiency.abDamgeUp(u, p)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进来');
                    let level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
                    let n = GetSpellTargetUnit()
                    let x = GetUnitX(n)
                    let y = GetUnitY(n)
                    // 智力系
                    if (config.type == 'int') {
                        let damage = config.damage * GetHeroInt(u, true) * level
                        let tx = 'greenbloodex.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        UnitDamageTarget(u, n, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
                        // 力量系  
                    } else if (config.type == 'str') {
                        let damage = config.damage * GetHeroStr(u, true) * level
                        let tx = '[dz.spell]002.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        UnitDamageTarget(u, n, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
                        // 敏捷系
                    } else if (config.type == 'agi') {
                        let damage = config.damage * GetHeroAgi(u, true) * level
                        let tx = 'Flamestrike Dark Void I.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        UnitDamageTarget(u, n, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
                        // 攻击系
                    } else if (config.type == 'attack') {
                        let damage = config.damage * GetUnitState(u, ConvertUnitState(0x15)) * level
                        let tx = 'tx04.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        UnitDamageTarget(u, n, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
                        // 生命系
                    } else if (config.type == 'life') {
                        let damage = GetUnitState(u, UNIT_STATE_MAX_LIFE) * config.damage * level
                        let tx = 'az_jsbz.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage, tx, level)
                        UnitDamageTarget(u, n, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
                    }
                }
            }
        }
    }
    action4(this: void) {
        let u = GetEventDamageSource()
        let p = GetOwningPlayer(u)
        if (!IsHandle(u)) { return }
        if (EXGetEventDamageData(2) != 1 &&
            ConvertDamageType(EXGetEventDamageData(4)) != DAMAGE_TYPE_FIRE ||
            ConvertDamageType(EXGetEventDamageData(4)) != DAMAGE_TYPE_POISON
            && IsUnitEnemy(GetTriggerUnit(), GetOwningPlayer(u)) == true) {
            DisableTrigger(GetTriggeringTrigger())
            for (let v in GFabilityDataConfig.config4) {
                let config = GFabilityDataConfig.config4[v]
                if (GetUnitAbilityLevel(u, FourCC(v)) < 0) {
                    return
                }
                if (GetUnitAbilityLevel(u, FourCC(v)) >= 1) {
                    GF_Degree_Proficiency.DamgeUp(u, p)
                    let level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
                    let n = GetSpellTargetUnit()
                    let x = GetUnitX(n)
                    let y = GetUnitY(n)
                    // 智力系
                    if (config.type == 'int') {
                        let damage = config.damage * GetHeroInt(u, true) * level
                        let tx = 'greenbloodex.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage * 2, tx, level)
                        // 力量系  
                    } else if (config.type == 'str') {
                        let damage = config.damage * GetHeroStr(u, true) * level
                        let tx = '[dz.spell]002.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage * 2, tx, level)
                        // 敏捷系
                    } else if (config.type == 'agi') {
                        let damage = config.damage * GetHeroAgi(u, true) * level
                        let tx = 'Flamestrike Dark Void I.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage * 2, tx, level)
                        // 攻击系
                    } else if (config.type == 'attack') {
                        let damage = config.damage * GetUnitState(u, ConvertUnitState(0x15)) * level
                        let tx = 'tx04.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage * 2, tx, level)
                        // 生命系
                    } else if (config.type == 'life') {
                        let damage = GetUnitState(u, UNIT_STATE_MAX_LIFE) * config.damage * level
                        let tx = 'az_jsbz.mdx'
                        GF_ability_range_damage.range_damage(u, x, y, damage * 2, tx, level)
                    }
                }
            }
            EnableTrigger(GetTriggeringTrigger())
        }
    }

    // 造成范围伤害
    static range_damage(u: unit, x: number, y: number, damage: number, tx: string, range: number = 300) {
        let dwz = CreateGroup()
        GroupEnumUnitsInRange(dwz, x, y, range, null)
        DestroyEffect(AddSpecialEffect(tx, x, y))
        BaseUtil.SForGroup(dwz, xdw => {
            if (IsUnitEnemy(xdw, GetOwningPlayer(u)) && GetUnitState(xdw, UNIT_STATE_LIFE) > 0) {
                UnitDamageTarget(u, xdw, damage, false, false, null, DAMAGE_TYPE_NORMAL, null)
            }
        })
        DestroyGroup(dwz)
    }


}







