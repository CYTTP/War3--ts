
import UnitUtil from "cyttp/Util/UnitUtil";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import SelectUtil from "solar/util/SelectUtil";
import TextTagUtil from "solar/util/TextTagUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";
import SummonConfig from "./SummonConfig";


// 最终伤害系统 CyttpDamageSystem
// 玩家1关闭漂浮模型，调用：MapPlayer.fromHandle(GetOwningPlayer(unit1)).solarData.特效开关 = true
/**
三种伤害类型
2：物理伤害 -- 伤害目标函数--参数--  伤害类型为：普通，强化，毒药，疾病，酸性，破坏，慢性毒药（与魔兽原生同值）
3：法术伤害 -- 伤害目标函数--参数--  伤害类型为：火焰，冰冻，闪电，神圣，魔法，音速，力量，死亡，精神，植物，防御，灵魂链接，暗影突袭
4：通用伤害 -- 伤害目标函数--参数--  伤害类型为：通用
 */

// 百分比的数值用实数表示：0.01代表百分之1,  0.10代表百分之10， 1代表百分之百
// 攻击，护甲，三维加成均为绿字加成
export type ItemSimulationAttributeType = {


    //固定值
    attack?: number,//攻击固定值加成
    life?: number,  // 生命固定值加成
    strength?: number,// 力量固定值
    agility?: number,// 敏捷固定值
    intelligence?: number,// 智力固定值

    attack_p?: number,// 攻击百分比加成
    life_p?: number,   // 生命百分比加成
    strength_p?: number,// 力量百分比
    agility_p?: number,// 敏捷百分比
    intelligence_p?: number,//智力百分比


    white_attack?: number//固定白字攻击力
    white_str?: number //固定白字力量
    white_agi?: number //固定白字敏捷
    white_int?: number //固定白字智力


    timer_add_attack?: number //每秒加攻击
    timer_add_life?: number //每秒加生命值
    timer_add_str?: number //每秒加力量
    timer_add_int?: number //每秒加智力
    timer_add_agi?: number //每秒加敏捷
    timer_add_gold?: number //每秒加金币
    timer_add_lumber?: number//每秒加木头
    timer_add_killNum?: number // 每秒加杀敌


    attack_add_attack?: number  //攻击加攻击
    attack_add_life?: number  //攻击加生命值
    attack_add_str?: number  //攻击加力量
    attack_add_agi?: number  //攻击加敏捷
    attack_add_int?: number  //攻击加智力
    attack_add_gold?: number   //攻击加金币
    attack_add_lumber?: number//攻击加木材

    kill_add_attack?: number    //杀敌加攻击
    kill_add_life?: number    //杀敌加生命值
    kill_add_str?: number    //杀敌加力量
    kill_add_agi?: number    //杀敌加敏捷
    kill_add_int?: number    //杀敌加智力
    kill_add_lumber?: number//杀敌加木头
    kill_add_gold?: number   //攻击加金币

    //魔法类
    mana?: number,// 魔法值固定值
    mana_p?: number,// 魔法百分比加成
    mana_r?: number,// 魔法恢复
    magic_penetrate_p?: number,//魔抗穿透	 ????
    magic_damage_add?: number,//魔抗穿透百分比 ???

    ability_type?: number,// 技能伤害加成   
    ability_CD?: number,// 技能CD 

    //护甲  ==  本图没有（忽略）
    armors?: number,// 护甲固定值
    armor_p?: number,// 护甲百分比
    Armor_penetrate?: number//护甲穿透
    Armor_penetrate_p?: number // 护甲穿透百分比


    attackSpd_p?: number,// 攻击速度(属于百分比值，魔兽上限是4，)

    attack_critical_chance?: number,// 攻击伤害暴击几率
    attack_critical_damage?: number,// 攻击伤害暴击伤害
    attack_damage_increased?: number,// 攻击伤害加成


    physical_critical_chance?: number,// 物理暴击几率
    physical_critical_damage?: number,//  物理暴击伤害
    physical_damage_increased?: number,// 物理伤害加成

    magic_critical_chance?: number,// 法术暴击几率
    magic_critical_damage?: number,// 法术暴击伤害
    magic_damage_increased?: number,// 法术伤害加成

    damage_increased?: number,//  全伤害增幅
    damage_reduction?: number,//  全伤害减免
    ad_blood_sucking?: number,// 物理伤害吸血 固定值
    ad_blood_sucking_p?: number,// 物理伤害吸血 百分比    固定值*(1+%)
    ap_blood_sucking?: number,// 法术伤害吸血 固定值
    ap_blood_sucking_p?: number,// 法术伤害吸血 百分比    固定值*(1+%)
    boss_add_damage?: number//  对boss的额外伤害

    Add_damage?: number,// 附加伤害
    Add_damage_p?: number,// 附加伤百分比
    Reduce_damage?: number,// 格挡伤害
    real_damage?: number   // 真实伤害
    real_damage_p?: number  // 真实伤害百分比
    deathdamage?: number    // 致命一击

    blood_sucking?: number  //固定值吸血
    blood_sucking_p?: number //百分比吸血

    lucky_values?: number  //幸运值

    //---------------------------元素类-------------------------
    //雷元素
    thunder_damage?: number  //元素伤害
    thunder_damage_increased?: number //元素伤害加成
    thunder_critical_chance?: number  //元素暴击几率
    thunder_critical_damage?: number  //元素暴击伤害加成
    thunder_resistance?: number  //元素抗性
    //火元素
    fire_damage?: number  //元素伤害
    fire_damage_increased?: number //元素伤害加成
    fire_critical_chance?: number  //元素暴击几率
    fire_critical_damage?: number  //元素暴击伤害加成
    fire_resistance?: number  //元素抗性
    //木元素
    wood_damage?: number  //元素伤害
    wood_damage_increased?: number //元素伤害加成
    wood_critical_chance?: number  //元素暴击几率
    wood_critical_damage?: number  //元素暴击伤害加成
    wood_resistance?: number //元素抗性
    //金元素
    gold_damage?: number  //元素伤害
    gold_damage_increased?: number //元素伤害加成
    gold_critical_chance?: number  //元素暴击几率
    gold_critical_damage?: number  //元素暴击伤害加成
    gold_resistance?: number  //元素抗性
    //土元素
    Soil_damage?: number  //元素伤害
    Soil_damage_increased?: number //元素伤害加成
    Soil_critical_chance?: number  //元素暴击几率
    Soil_critical_damage?: number  //元素暴击伤害加成
    Soil_resistance?: number  //元素抗性
    //冰元素
    ice_damage?: number  //元素伤害
    ice_damage_increased?: number //元素伤害加成
    ice_critical_chance?: number  //元素暴击几率
    ice_critical_damage?: number  //元素暴击伤害加成
    ice_resistance?: number  //元素抗性
    //水元素
    water_damage?: number  //元素伤害
    water_damage_increased?: number //元素伤害加成
    water_critical_chance?: number  //元素暴击几率
    water_critical_damage?: number  //元素暴击伤害加成
    water_resistance?: number  //元素抗性

    //充能        ----------------- 充能类型技能使用-----------------
    Upper_limit_charging_times?: number  //充能次数
    Charging_skill_damage?: number  //充能技能伤害 百分比
    Additional_damage_charging_skill?: number  //充能技能附加伤害
    Charging_skill_CD?: number  //充能技能CD
    Charge_times_bonus_p?: number  //充能次数加成  
    Damage_range_charging_skill?: number //充能技能伤害范围
    Additional_times_charging_skills?: number //充能技能额外次数


    //-----------------其他--------------------------------------------
    dodge?: number,                              // 闪避率
    hit?: number,                               // 命中率
    Injury?: number,                            // 反伤值
    Injury_p?: number,                            // 反伤百分比
    // ----------------经济属性 ----------------------------------------
    gold?: number,                              // 金币值
    gold_p?: number,                              //金币获取率
    wood?: number,                              // 木材值
    wood_p?: number,                              // 木材获取率
    kill_num?: number,                             // 杀敌数固定值
    kill_num_p?: number,                             // 杀敌数获取率 //杀敌数加成

    // --------------- 特殊伤害 ---------------通用物理，法术 ------------------
    //特殊伤害类型加成：比如神圣伤害 闪电伤害 火焰伤害 冰冻伤害 等等 在计算过物理加成，法术加成，最终加成，在计算特殊加成
    //key为 "DT_"+damageType:Number
    special_damage_type_increaseds?: { [damageTypeStr: string]: number },
    // [key: string]: any,
}
export default class CyttpDamageSystem {
    static ColourFloatingEffect: any[][] = []
    // static ColourFloatingEffect: string[1][0] = 'FloatingFontModel\\zf00.mdx'
    constructor() {
        // 保存 漂浮特效 
        let route: string = 'FloatingFontModel\\zf'
        for (let i = 0; i < 9; i++) {
            CyttpDamageSystem.ColourFloatingEffect[i] = []
            for (let v = 0; v < 10; v++) {
                CyttpDamageSystem.ColourFloatingEffect[i][v] = route + i + v + '.mdx';
            }
        }

        // 保证“最终伤害触发”在所有‘伤害事件’末尾
        BaseUtil.runLater(0.5, () => {
            let trigger = new Trigger();
            trigger.registerAnyUnitDamagedEvent()
            trigger.addCondition(Condition(() => {
                return ((IsUnitAlly(GetTriggerUnit(), GetOwningPlayer(GetEventDamageSource())) == false)
                    && (GetEventDamage() > 0)
                    && (IsUnitType(GetEventDamageSource(), UNIT_TYPE_HERO) == true)
                )
            }))
            trigger.addAction(this.action)
        })
        //每秒加属性
        let tri = new Trigger()
        tri.registerTimerEvent(1, true)
        tri.addAction(this.action1)

        //攻击事件 == 
        let tri1 = new Trigger()
        tri1.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED)
        tri1.addCondition(Condition(() => {
            return ((IsUnitAlly(GetTriggerUnit(), GetOwningPlayer(GetAttacker())) == false) && IsUnitType(GetAttacker(), UNIT_TYPE_HERO) == true)
        }))
        tri1.addAction(this.action2)

        //杀敌事件 == 
        let tri2 = new Trigger()
        tri2.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
        tri2.addCondition(Condition(() => {
            return ((IsUnitAlly(GetTriggerUnit(), GetOwningPlayer(GetKillingUnit())) == false) && IsUnitType(GetKillingUnit(), UNIT_TYPE_HERO) == true)
        }))
        tri2.addAction(this.action3)
    };


    action(this: void) {
        let unit0 = GetTriggerUnit()
        let unit1 = GetEventDamageSource()
        // DisplayTextToPlayer(Player(0), 0, 0, '触发')
        //不存在就推出
        if (!IsHandle(unit0) || !IsHandle(unit1)) {
            return
        }
        // 需要单位用户数据（全部为实数类型 1  = 100%）
        // ////设置变量
        let unit0Data: ItemSimulationAttributeType = Unit.fromHandle(unit0).solarData;
        let unit1Data: ItemSimulationAttributeType = Unit.fromHandle(unit1).solarData
        let new_dmg: number = 0;
        let sb = (unit0Data.dodge ? unit0Data.dodge : 0) - (unit1Data.hit ? unit1Data.hit : 0)
        //通用 ----  ------
        if (true) {
            // 攻击者的命中率减去受害者的闪避率，大于当前随机值
            if (GetRandomReal(0, 1) > sb) {
                new_dmg = GetEventDamage()
                // ////最终增伤
                let dmg_di = unit1Data.damage_increased ? unit1Data.damage_increased : 0
                new_dmg = new_dmg * (dmg_di + 1)
                // ////伤害减免Damage Reduction
                let dmg_dr = unit0Data.damage_reduction ? unit1Data.damage_reduction : 0
                new_dmg = new_dmg * (1 - Math.min(dmg_dr, 1))


                //*******************   地图需要额外属性，临时添加
                // 攻击类型伤害加成，技能伤害加成
                if (unit1Data.attack_damage_increased && EXGetEventDamageData(2) == 1) {
                    new_dmg *= (1 + unit1Data.attack_damage_increased)
                } else if (unit1Data.ability_type) {
                    // 不是攻击伤害，就是技能伤害，技能伤害加成
                    new_dmg *= (1 + unit1Data.ability_type)

                }
                //******************************-----------------------------------------------------------------------  
                // // 判定是否是攻击伤害类型，再额外判断是否开启攻击伤害加成，
                if (EXGetEventDamageData(2) == 1 && unit1Data.attack_damage_increased) {
                    // DisplayTextToPlayer(Player(0), 0, 0, '攻击触发')
                    let dmg_attack = unit1Data.attack_damage_increased ? unit1Data.attack_damage_increased : 0
                    new_dmg = new_dmg * (dmg_attack + 1)
                    // 特殊伤害加成
                    new_dmg = CyttpDamageSystem.SpecialDamageBonus(unit1, unit1Data, new_dmg)
                    // ////攻击暴击
                    let dmg_acc = unit1Data.attack_critical_chance ? unit1Data.attack_critical_chance : 0
                    if ((GetRandomReal(0, 1) < (dmg_acc))) {
                        // DisplayTextToPlayer(Player(0), 0, 0, '攻击爆伤触发')
                        // ////Critical damage 暴击伤害
                        let dmg_pcd = unit1Data.attack_critical_damage ? unit1Data.attack_critical_damage : 0
                        new_dmg *= (1 + dmg_pcd);
                        // ////漂浮文字
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 1, 34, 3, 90)
                    } else {
                        // DisplayTextToPlayer(Player(0), 0, 0, '触发攻击')
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 0)
                    }
                }
                //******************************-----------------------------------------------------------------------
                //魔兽物理伤害分别是：普通，强化，毒药，疾病，酸性，破坏，慢性毒药(一般物理伤害技能，用强化伤害：DAMAGE_TYPE_ENHANCED)
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
                    let dmg_pdi = unit1Data.physical_damage_increased ? unit1Data.physical_damage_increased : 0
                    new_dmg = new_dmg * (dmg_pdi + 1)
                    // 特殊伤害加成
                    new_dmg = CyttpDamageSystem.SpecialDamageBonus(unit1, unit1Data, new_dmg)
                    // ////物理暴击
                    let dmg_pcc = unit1Data.physical_critical_chance ? unit1Data.physical_critical_chance : 0
                    if ((GetRandomReal(0, 1) < (dmg_pcc))) {
                        // DisplayTextToPlayer(Player(0), 0, 0, '物理爆伤触发')
                        // ////Critical damage 暴击伤害
                        let dmg_acd = unit1Data.physical_critical_damage ? unit1Data.physical_critical_damage : 0
                        new_dmg *= (1 + dmg_acd);
                        // ////漂浮文字
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 2, 34, 3, 90)
                    } else {
                        // DisplayTextToPlayer(Player(0), 0, 0, '物理触发1111')
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 5)
                    }
                    // ConvertDamageType(EXGetEventDamageData(4)) != DAMAGE_TYPE_UNIVERSAL

                    //******************************-----------------------------------------------------------------------  
                    //  判断伤害 属于魔法伤害  
                } else if (EXGetEventDamageData(1) != 1 && ConvertDamageType(EXGetEventDamageData(4)) != DAMAGE_TYPE_UNIVERSAL) {
                    // DisplayTextToPlayer(Player(0), 0, 0, '法术触发')
                    // ////法术增伤
                    let dmg_mdi = unit1Data.magic_damage_increased ? unit1Data.magic_damage_increased : 0
                    new_dmg *= (dmg_mdi + 1)
                    // 特殊伤害加成
                    new_dmg = CyttpDamageSystem.SpecialDamageBonus(unit1, unit1Data, new_dmg)
                    // ////判断暴击
                    let dmg_mcc = unit1Data.magic_critical_chance ? unit1Data.magic_critical_chance : 0
                    if ((GetRandomReal(0, 1) < dmg_mcc)) {
                        // DisplayTextToPlayer(Player(0), 0, 0, '法术暴击触发')
                        // ////Critical damage 暴击伤害
                        let dmg_mcd = unit1Data.magic_critical_damage ? unit1Data.magic_critical_damage : 0
                        new_dmg *= (1 + dmg_mcd)
                        // ////漂浮文字
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 7, 34, 3, 90)
                    } else {
                        CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 6)
                    }

                    //  通用伤害   创建   漂浮特效
                } else if (ConvertDamageType(EXGetEventDamageData(4)) == DAMAGE_TYPE_UNIVERSAL) {
                    CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 8, 34, 2, 100)
                }

                //// 攻击吸血
                let dmg_abs = 0;
                let dmg_abs_p = 0;
                if (EXGetEventDamageData(1) == 1) {
                    // 物理固定 吸血
                    dmg_abs = unit1Data.ad_blood_sucking ? unit1Data.ad_blood_sucking : 0
                    // //// 物理吸血 百分比
                    dmg_abs_p = unit1Data.ad_blood_sucking_p ? unit1Data.ad_blood_sucking_p : 0

                } else {
                    // 法术固定吸血
                    dmg_abs = unit1Data.ap_blood_sucking ? unit1Data.ap_blood_sucking : 0
                    // //// 法术吸血  通用伤害 算在法术吸血
                    dmg_abs_p = unit1Data.ap_blood_sucking_p ? unit1Data.ap_blood_sucking_p : 0
                }
                // 固定值吸血
                if (dmg_abs != 0) {
                    SetUnitState(unit1, UNIT_STATE_LIFE, Math.max(0, GetUnitState(unit1, UNIT_STATE_LIFE) + dmg_abs))
                }
                // 百分比吸血
                if (dmg_abs_p > 0) {
                    let add_hp = new_dmg * dmg_abs_p
                    SetUnitState(unit1, UNIT_STATE_LIFE, Math.max(0, GetUnitState(unit1, UNIT_STATE_LIFE) + add_hp))
                }
                //元素伤害---
                if (true) {  // 元素伤害*（1+元素伤害加成）*（1+元素暴击伤害加成）*（1-元素抗性/（元素抗性+20））*（1+元素克制加成）												
                    //------------------------元素伤害---------------------------------
                    //雷元素                            元素伤害*（1+元素伤害加成）*（1-元素抗性/（元素抗性+20））*（1+元素克制加成）												
                    let thunder_d = unit1Data.thunder_damage ? unit1Data.thunder_damage : 0  //元素伤害
                    let thunder_di = unit1Data.thunder_damage_increased ? unit1Data.thunder_damage_increased : 0  //雷元素伤害加成
                    let thunder_cc = unit1Data.thunder_critical_chance ? unit1Data.thunder_critical_chance : 0  //雷元素暴击几率
                    let thunder_cd = unit1Data.thunder_critical_damage ? unit1Data.thunder_critical_damage : 0  //雷元素暴击伤害加成 
                    let thunder_r = unit0Data.thunder_resistance ? unit0Data.thunder_resistance : 0  //雷元素抗性
                    //火元素
                    let fire_d = unit1Data.fire_damage ? unit1Data.fire_damage : 0  //元素伤害
                    let fire_di = unit1Data.fire_damage_increased ? unit1Data.fire_damage_increased : 0  //火元素伤害加成
                    let fire_cc = unit1Data.fire_critical_chance ? unit1Data.fire_critical_chance : 0  //火元素暴击几率
                    let fire_cd = unit1Data.fire_critical_damage ? unit1Data.fire_critical_damage : 0  //火元素暴击伤害加成 
                    let fire_r = unit0Data.fire_resistance ? unit0Data.fire_resistance : 0  //火元素抗性
                    //木元素
                    let wood_d = unit1Data.wood_damage ? unit1Data.wood_damage : 0  //元素伤害
                    let wood_di = unit1Data.wood_damage_increased ? unit1Data.wood_damage_increased : 0  //木元素伤害加成
                    let wood_cc = unit1Data.wood_critical_chance ? unit1Data.wood_critical_chance : 0  //木元素暴击几率
                    let wood_cd = unit1Data.wood_critical_damage ? unit1Data.wood_critical_damage : 0  //木元素暴击伤害加成 
                    let wood_r = unit0Data.wood_resistance ? unit0Data.wood_resistance : 0  //木元素抗性
                    //金元素
                    let gold_d = unit1Data.gold_damage ? unit1Data.gold_damage : 0  //元素伤害
                    let gold_di = unit1Data.gold_damage_increased ? unit1Data.gold_damage_increased : 0  //金元素伤害加成
                    let gold_cc = unit1Data.gold_critical_chance ? unit1Data.gold_critical_chance : 0  //金元素暴击几率
                    let gold_cd = unit1Data.gold_critical_damage ? unit1Data.gold_critical_damage : 0  //金元素暴击伤害加成 
                    let gold_r = unit0Data.gold_resistance ? unit0Data.gold_resistance : 0  //金元素抗性
                    //土元素
                    let Soil_d = unit1Data.Soil_damage ? unit1Data.Soil_damage : 0  //元素伤害
                    let Soil_di = unit1Data.Soil_damage_increased ? unit1Data.Soil_damage_increased : 0  //土元素伤害加成
                    let Soil_cc = unit1Data.Soil_critical_chance ? unit1Data.Soil_critical_chance : 0  //土元素暴击几率
                    let Soil_cd = unit1Data.Soil_critical_damage ? unit1Data.Soil_critical_damage : 0  //土元素暴击伤害加成 
                    let Soil_r = unit0Data.Soil_resistance ? unit0Data.Soil_resistance : 0  //土元素抗性
                    //冰元素
                    let ice_d = unit1Data.ice_damage ? unit1Data.ice_damage : 0  //元素伤害
                    let ice_di = unit1Data.ice_damage_increased ? unit1Data.ice_damage_increased : 0  //冰元素伤害加成
                    let ice_cc = unit1Data.ice_critical_chance ? unit1Data.ice_critical_chance : 0  //冰元素暴击几率
                    let ice_cd = unit1Data.ice_critical_damage ? unit1Data.ice_critical_damage : 0  //冰元素暴击伤害加成 
                    let ice_r = unit0Data.ice_resistance ? unit0Data.ice_resistance : 0  //冰元素抗性
                    //水元素
                    let water_d = unit1Data.water_damage ? unit1Data.water_damage : 0  //元素伤害
                    let water_di = unit1Data.water_damage_increased ? unit1Data.water_damage_increased : 0  //元水素伤害加成
                    let water_cc = unit1Data.water_critical_chance ? unit1Data.water_critical_chance : 0  //元水素暴击几率
                    let water_cd = unit1Data.water_critical_damage ? unit1Data.water_critical_damage : 0  //元水素暴击伤害加成 
                    let water_r = unit0Data.water_resistance ? unit0Data.water_resistance : 0  //元水素抗性
                    //unit0有雷元素抗性
                    if (thunder_r > 0) {
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            //元素暴击伤害
                            if (GetRandomReal(0, 1) < thunder_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.5)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.2)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.3)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.5)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.5)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.3)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.5)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.2)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.3)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.5)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.5)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.3)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                // DisplayTextToPlayer(Player(0), 0, 0, '元素伤害' + ele_t_damge)
                                // DisplayTextToPlayer(Player(0), 0, 0, 'thunder_r' + thunder_r)
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (fire_d > 0) {//unit0有火元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < fire_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.3)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.5)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.5)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.3)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.3)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 - 0.2)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.3)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.5)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.5)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.3)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.3)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 - 0.2)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (wood_d > 0) {//unit0有木元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < wood_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.3)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.3)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.5)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.3)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.3)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.5)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.3)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.3)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.5)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.3)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.3)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.5)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (gold_d > 0) {//unit0有金元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < gold_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.2)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.2)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.3)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.2)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.2)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.2)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.2)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 + 0.2)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 - 0.3)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 - 0.2)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.2)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.2)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (Soil_d > 0) {//unit0有土元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < Soil_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.2)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.3)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.3)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.2)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.2)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.5)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.2)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.3)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.3)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 - 0.2)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0.2)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0.5)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (ice_d > 0) {//unit0有冰元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < ice_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.5)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.5)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.2)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.3)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.5)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 - 0.3)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 + 0.5)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.5)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.2)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.3)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.5)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 + 0)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 - 0.3)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    } else if (water_d > 0) {//unit0有水元素抗性
                        if (thunder_d > 0 || fire_d > 0 || wood_d > 0 || gold_d > 0 || Soil_d > 0 || ice_d > 0 || water_d > 0) {
                            if (GetRandomReal(0, 1) < water_cc) {
                                let ele_t_damge_b = (1 + thunder_cd) * thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.5)
                                let ele_f_damge_b = (1 + fire_cd) * fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.2)
                                let ele_w_damge_b = (1 + wood_cd) * wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.5)
                                let ele_g_damge_b = (1 + gold_cd) * gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.2)
                                let ele_s_damge_b = (1 + Soil_cd) * Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.2)
                                let ele_i_damge_b = (1 + ice_cd) * ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.3)
                                let ele_wa_damge_b = (1 + water_cd) * water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0)
                                let damge_all = ele_t_damge_b + ele_f_damge_b + ele_w_damge_b + ele_g_damge_b + ele_s_damge_b + ele_i_damge_b + ele_wa_damge_b
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素暴击" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            } else {
                                let ele_t_damge = thunder_d * (1 + thunder_di) * (1 - (thunder_r / (thunder_r + 20))) * (1 - 0.5)
                                let ele_f_damge = fire_d * (1 + fire_di) * (1 - (fire_r / (fire_r + 20))) * (1 - 0.2)
                                let ele_w_damge = wood_d * (1 + wood_di) * (1 - (wood_r / (wood_r + 20))) * (1 + 0.5)
                                let ele_g_damge = gold_d * (1 + gold_di) * (1 - (gold_r / (gold_r + 20))) * (1 + 0.2)
                                let ele_s_damge = Soil_d * (1 + Soil_di) * (1 - (Soil_r / (Soil_r + 20))) * (1 + 0.2)
                                let ele_i_damge = ice_d * (1 + ice_di) * (1 - (ice_r / (ice_r + 20))) * (1 - 0.3)
                                let ele_wa_damge = water_d * (1 + water_di) * (1 - (water_r / (water_r + 20))) * (1 + 0)
                                let damge_all = ele_t_damge + ele_f_damge + ele_w_damge + ele_g_damge + ele_s_damge + ele_i_damge + ele_wa_damge
                                new_dmg += R2I(damge_all)
                                SetTextTagVelocity(TextTagUtil.text("元素伤害" + R2I(damge_all), unit0, 15, 2, 178, 34, 34), GetRandomReal(-0.10, 0.10), GetRandomReal(-0.10, 0.10));
                            }
                        }
                    }
                }

            } else {
                // ////漂浮文字
                TextTagUtil.textOnUnit(unit0, "闪避", 200, 20, 200)
            }
        }

        //其他类型
        if (true) {
            // 对boss额外伤害
            if (IsUnitType(unit0, UNIT_TYPE_HERO)) {
                let boss_add_damage = unit1Data.boss_add_damage ? unit1Data.boss_add_damage : 0
                new_dmg = new_dmg + (new_dmg * boss_add_damage)
            }
            //攻击速度
            // let speeds = unit1Data.attackSpd_p ? unit1Data.attackSpd_p : 0
            // let osp = GetUnitState(unit1, ConvertUnitState(0x51))
            // let speed = osp * (1 + speeds)
            // SetUnitState(unit1, ConvertUnitState(0x51), speed)

            //真实伤害
            if (unit1Data.real_damage) {
                let real_damage = unit1Data.real_damage ? unit1Data.real_damage : 0
                SetUnitState(unit0, ConvertUnitState(0x20), 0)
                new_dmg = real_damage
                CyttpDamageSystem.FloatingDamageEffect(unit0, unit1, new_dmg, 8, 34, 3, 90)
                DisplayTextToPlayer(Player(0), 0, 0, '真实伤害 ' + new_dmg)
            }

            // 附加伤害 
            let Add_damage = unit1Data.Add_damage ? unit1Data.Add_damage : 0
            new_dmg = new_dmg + Add_damage

            // 附加伤害百分比
            let Add_damage_p = unit1Data.Add_damage_p ? unit1Data.Add_damage_p : 0
            new_dmg = new_dmg + (Add_damage_p + 1)
            //护甲穿透
            if (unit0Data.Armor_penetrate != null) {
                let suap = unit0Data.Armor_penetrate ? unit0Data.Armor_penetrate : 0
                let unit = GetUnitState(unit0, ConvertUnitState(0x20))
                SetUnitState(unit0, ConvertUnitState(0x20), unit - suap)

                // //护甲穿透百分比
                let app = unit0Data.Armor_penetrate_p ? unit0Data.Armor_penetrate_p : 0
                let un = GetUnitState(unit0, ConvertUnitState(0x20))
                let newVal1 = un * (1 - app)
                SetUnitState(unit0, ConvertUnitState(0x20), R2I(newVal1))
            }
            // 格挡伤害
            let Reduce_damage: number = unit0Data.Reduce_damage ? unit0Data.Reduce_damage : 0
            new_dmg = new_dmg - Reduce_damage
            new_dmg = new_dmg > 1 ? new_dmg : 1


        }

        ////设置最终伤害值
        EXSetEventDamage(new_dmg);
    }
    action1(this: void) {
        for (let i = 0; i < 4; i++) {
            //这里是暂时用驴子魔法书   后面重新添加一个技能
            let u = UnitUtil.getAbilityHero(i, 'Lz09')
            if (!IsHandle(u)) { return }
            let unit1Data: ItemSimulationAttributeType = Unit.fromHandle(u).solarData
            //每秒加攻击
            let attack = unit1Data.timer_add_attack ? unit1Data.timer_add_attack : 0
            SetUnitState(u, ConvertUnitState(0x12), (GetUnitState(u, ConvertUnitState(0x12)) + attack));
            //  DisplayTextToPlayer(Player(0), 0, 0, 'attack ' + attack)
            //每秒加生命
            let life = unit1Data.timer_add_life ? unit1Data.timer_add_life : 0
            SetUnitState(u, UNIT_STATE_LIFE, (GetUnitState(u, UNIT_STATE_LIFE) + life));
            // DisplayTextToPlayer(Player(0), 0, 0, 'life ' + life)
            //每秒加力量
            let str = unit1Data.timer_add_str ? unit1Data.timer_add_str : 0
            ModifyHeroStat(bj_HEROSTAT_STR, u, bj_MODIFYMETHOD_ADD, str);
            // DisplayTextToPlayer(Player(0), 0, 0, 'str ' + str)
            //每秒加敏捷
            let agi = unit1Data.timer_add_agi ? unit1Data.timer_add_agi : 0
            ModifyHeroStat(bj_HEROSTAT_AGI, u, bj_MODIFYMETHOD_ADD, agi);
            // DisplayTextToPlayer(Player(0), 0, 0, 'agi ' + agi)
            //每秒加智力
            let int = unit1Data.timer_add_int ? unit1Data.timer_add_int : 0
            ModifyHeroStat(bj_HEROSTAT_INT, u, bj_MODIFYMETHOD_ADD, int);
            // DisplayTextToPlayer(Player(0), 0, 0, 'int ' + int)
            //加金币
            let gold = unit1Data.timer_add_gold ? unit1Data.timer_add_gold : 0
            AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
            //每秒加木材
            let lumber = unit1Data.timer_add_lumber ? unit1Data.timer_add_lumber : 0
            AdjustPlayerStateBJ(lumber, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_LUMBER)
            //每秒伽沙底
            let kill_num = unit1Data.timer_add_killNum ? unit1Data.timer_add_killNum : 0
            let kill_num_all = MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.kill_count ? MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.kill_count : 0
            MapPlayer.fromHandle(GetOwningPlayer(u)).solarData.kill_count = kill_num_all + kill_num

        }


    }
    action2(this: void) {
        let uu = GetTriggerUnit()
        let u = GetAttacker()
        // DisplayTextToPlayer(Player(0), 0, 0, '触发' + GetUnitName(u))
        if (!IsHandle(u) || !IsHandle(uu)) {
            return
        }
        // let unit0Data: ItemSimulationAttributeType = Unit.fromHandle(u).solarData;
        let unit1Data: ItemSimulationAttributeType = Unit.fromHandle(u).solarData

        //攻击加攻击
        let a_a_attack = unit1Data.attack_add_attack ? unit1Data.attack_add_attack : 0
        SetUnitState(u, ConvertUnitState(0x12), (GetUnitState(u, ConvertUnitState(0x12)) + a_a_attack));

        let a_a_life = unit1Data.attack_add_life ? unit1Data.attack_add_life : 0
        SetUnitState(u, UNIT_STATE_MAX_LIFE, (GetUnitState(u, UNIT_STATE_MAX_LIFE) + a_a_life));
        SetUnitState(u, UNIT_STATE_LIFE, (GetUnitState(u, UNIT_STATE_LIFE) + a_a_life));
        // DisplayTextToPlayer(Player(0), 0, 0, 'life ' + life)

        let a_a_str = unit1Data.attack_add_str ? unit1Data.attack_add_str : 0
        ModifyHeroStat(bj_HEROSTAT_STR, u, bj_MODIFYMETHOD_ADD, a_a_str);
        // DisplayTextToPlayer(Player(0), 0, 0, 'str ' + str)

        let a_a_agi = unit1Data.attack_add_agi ? unit1Data.attack_add_agi : 0
        ModifyHeroStat(bj_HEROSTAT_AGI, u, bj_MODIFYMETHOD_ADD, a_a_agi);
        // DisplayTextToPlayer(Player(0), 0, 0, 'agi ' + agi)

        let a_a_int = unit1Data.attack_add_int ? unit1Data.attack_add_int : 0
        ModifyHeroStat(bj_HEROSTAT_INT, u, bj_MODIFYMETHOD_ADD, a_a_int);
        // DisplayTextToPlayer(Player(0), 0, 0, 'int ' + int)

        let a_a_gold = unit1Data.attack_add_gold ? unit1Data.attack_add_gold : 0
        AdjustPlayerStateBJ(a_a_gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)

        let a_a_lumber = unit1Data.attack_add_lumber ? unit1Data.attack_add_lumber : 0
        AdjustPlayerStateBJ(a_a_lumber, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_LUMBER)
        // DisplayTextToPlayer(Player(0), 0, 0, 'a_a_lumber =' + a_a_lumber)

        //固定值吸血
        let g_a_life = unit1Data.blood_sucking ? unit1Data.blood_sucking : 0
        SetUnitState(u, UNIT_STATE_LIFE, (GetUnitState(u, UNIT_STATE_LIFE) + g_a_life));
        //百分比吸血
        let b_a_life = unit1Data.blood_sucking_p ? unit1Data.blood_sucking_p : 0
        SetUnitState(u, UNIT_STATE_LIFE, (GetUnitState(u, UNIT_STATE_LIFE) * (1 + b_a_life)));

    }
    action3(this: void) {
        let uu = GetTriggerUnit()
        let u = GetKillingUnit()
        if (!IsHandle(u) || !IsHandle(uu)) {
            return
        }
        let unit1Data: ItemSimulationAttributeType = Unit.fromHandle(u).solarData

        //杀敌加攻击
        let k_a_attack = unit1Data.kill_add_attack ? unit1Data.kill_add_attack : 0
        SetUnitState(u, ConvertUnitState(0x12), (GetUnitState(u, ConvertUnitState(0x12)) + k_a_attack));

        let k_a_life = unit1Data.kill_add_life ? unit1Data.kill_add_life : 0
        SetUnitState(u, UNIT_STATE_MAX_LIFE, (GetUnitState(u, UNIT_STATE_MAX_LIFE) + k_a_life));
        SetUnitState(u, UNIT_STATE_LIFE, (GetUnitState(u, UNIT_STATE_LIFE) + k_a_life));
        // DisplayTextToPlayer(Player(0), 0, 0, 'life ' + life)

        let k_a_str = unit1Data.kill_add_str ? unit1Data.kill_add_str : 0
        ModifyHeroStat(bj_HEROSTAT_STR, u, bj_MODIFYMETHOD_ADD, k_a_str);
        // DisplayTextToPlayer(Player(0), 0, 0, 'str ' + str)

        let k_a_agi = unit1Data.kill_add_agi ? unit1Data.kill_add_agi : 0
        ModifyHeroStat(bj_HEROSTAT_AGI, u, bj_MODIFYMETHOD_ADD, k_a_agi);
        // DisplayTextToPlayer(Player(0), 0, 0, 'agi ' + agi)

        let k_a_int = unit1Data.kill_add_int ? unit1Data.kill_add_int : 0
        ModifyHeroStat(bj_HEROSTAT_INT, u, bj_MODIFYMETHOD_ADD, k_a_int);
        // DisplayTextToPlayer(Player(0), 0, 0, 'int ' + int)


        let k_a_gold = unit1Data.kill_add_gold ? unit1Data.kill_add_gold : 0
        AdjustPlayerStateBJ(k_a_gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)

        let k_a_lumber = unit1Data.kill_add_lumber ? unit1Data.kill_add_lumber : 0
        AdjustPlayerStateBJ(k_a_lumber, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_LUMBER)
    }

    // 特殊伤害加成
    static SpecialDamageBonus(unit1: unit, unit1Data: any, new_dmg: number): number {
        // 伤害来源不是英雄，直接跳过，因为普通单位不存在“特殊伤害属性”
        if (!IsUnitType(unit1, UNIT_TYPE_HERO)) {
            return new_dmg
        }
        // 特殊伤害加成
        if (unit1Data.special_damage_type_increaseds) {
            let DT = 0
            // 获取特殊伤害类型的 键
            for (let i in unit1Data.special_damage_type_increaseds) {
                // 得到值
                let damage_type_increased = unit1Data.special_damage_type_increaseds[i];
                // 值不等于空，就计算加成
                if (damage_type_increased) {
                    DT = DT + damage_type_increased
                    // DisplayTextToPlayer(Player(0), 0, 0, 'DT------:' + DT)
                }
            }
            new_dmg *= (1 + DT)
        }
        return new_dmg
    }
    /***    创建漂浮伤害值特效：白红橙黄绿青蓝紫灰：0-8,    
   **     攻击类型：0白色代表攻击伤害, 1红色表示攻击暴击伤害，
   **     物理类型：5青色色表示物理伤害，2橙色表示物理暴击伤害， 
   **     法术类型：6蓝色表示法术伤害，7紫色表示法术暴击伤害，
   **     通用类型：8灰色表示通用伤害，没有暴击属性
  */
    static FloatingDamageEffect(unit0: unit, unit1: unit, new_dmg: number, colour: number, length: number = 45, size: number = 2, high: number = 60) {
        //不是玩家 没在游戏中 就不需要显示漂浮特效
        if (GetPlayerSlotState(GetOwningPlayer(unit1)) != PLAYER_SLOT_STATE_PLAYING
            && GetPlayerController(GetOwningPlayer(unit1)) != MAP_CONTROL_USER) {
            return
        }
        // 玩家特效开关为true 就代表关闭了特效显示，就跳国，不显示特效。
        let tj: boolean = MapPlayer.fromHandle(GetOwningPlayer(unit1)).solarData.特效开关 ? MapPlayer.fromHandle(GetOwningPlayer(unit1)).solarData.特效开关 : false;
        if (tj == true) {
            return
        }
        // DisplayTextToPlayer(Player(0), 0, 0, 'unit0:' + GetUnitName(unit0))
        // DisplayTextToPlayer(Player(0), 0, 0, 'unit0:' + new_dmg)
        let x: number = GetUnitX(unit0);
        let y: number = GetUnitY(unit0);
        let new_dmg_zf: string = I2S(new_dmg);
        let leng = new_dmg_zf.length;
        // DisplayTextToPlayer(Player(0), 0, 0, 'new_dmg_zf:' + new_dmg_zf)
        for (let i = 1; i <= leng; i++) {
            let z: number = S2I(SubString(new_dmg_zf, i - 1, i));
            let x1 = x + Cos(0 * 0.01745) * length * i;
            let y1 = y + Sin(0 * 0.01745) * length * i;
            let dian: location = GetUnitLoc(unit0);
            let gao: number = GetLocationZ(dian) + high;
            RemoveLocation(dian);
            // 异步特效,判断玩家特效开关
            let zf: string = ""
            if (GetOwningPlayer(unit1) == GetLocalPlayer()) {
                zf = CyttpDamageSystem.ColourFloatingEffect[colour][z];
            }
            let tx = AddSpecialEffect(zf, x1, y1);
            EXSetEffectZ(tx, gao);
            EXSetEffectSize(tx, size);
            DestroyEffect(tx);
        }
    }

}

// 物品技能模拟：绿字攻击，绿字护甲，绿字三维，攻速，生命恢复，魔法恢复，魔法书隐藏
// japi模拟：生命值，魔法值，吸血
// 玩家选择英雄，给单位添加技能：“Lz09”
// 生命恢复刷新，添加删除：“Lz04”
// 魔法恢复刷新：添加删除：“Lz06”
/*
**      创建物品技能 预处理
*/
export const PretreatObjectTable = [
    {
        PretreatType: "ability",
        id: "Lz01",
        _parent: "AItg",
        DataA: 0,
        Name: "Hope绿字攻击",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz02",
        _parent: "AId2",
        DataA: 0,
        Name: "Hope绿字护甲",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz03",
        _parent: "AIsx",
        DataA: 0,
        Name: "Hope绿字攻速",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz04",
        _parent: "Arel",
        DataA: 0,
        Name: "Hope生命恢复",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz05",
        _parent: "AIlf",
        DataA: 1,
        Name: "Hope生命恢复刷新",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
        Buttonpos_1: 0,
        Buttonpos_2: -11,
    },
    {
        PretreatType: "ability",
        id: "Lz06",
        _parent: "AIrm",
        DataA: 0,
        Name: "Hope魔法恢复",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz07",
        _parent: "AImv",
        DataA: 1,
        Name: "Hope魔法恢复刷新",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
        Buttonpos_1: 0,
        Buttonpos_2: -11,
    },
    {
        PretreatType: "ability",
        id: "Lz08",
        _parent: "Aamk",
        DataC: 0,
        DataA: 0,
        DataB: 0,
        Name: "Hope绿字三维",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz09",
        _parent: "Aspb",
        DataA: 'Lz01,Lz02,Lz03,Lz04,Lz06,Lz08',
        Name: "Hope绿字魔法书",
        hero: 0,
        item: 0,
        race: 'human',
        levels: 1,
        Buttonpos_1: 0,
        Buttonpos_2: -11,
        DataE: 'spellbook',
        DataD: 11,
        DataC: 0,
        EditorSuffix: " ",
    },
    {
        PretreatType: "ability",
        id: "Lz10",
        _parent: "AHtb",
        DataA: 0,
        Name: "Hope无模型晕锤",
        Missileart: "",
        Missilespeed: 10000000,
        Animnames: " ",
        hero: 0,
        levels: 1,
        Cool: 0.00,
        targs: "alive,ground,enemies,air,player,neutral",
        Dur: 0.5,
        HeroDur: 0.5,
        Cost: 0,
        Rng: 1000000000,
    },
    {
        PretreatType: "ability",
        id: "Lz11",
        _parent: "AHtb",
        DataA: 0,
        Name: "Hope风暴之锤",
        Missilespeed: 2000,
        Animnames: " ",
        hero: 0,
        levels: 1,
        Cool: 0.00,
        targs: "alive,ground,enemies,air,player,neutral",
        Dur: 0,
        HeroDur: 0,
        Cost: 0,
        Rng: 1000000000,
    },
    {
        PretreatType: "unit",
        id: "lz99",
        _parent: "hrdh",
        Name: "Hope技能马甲",
        abilList: "Aloc",
        collision: 0,
        unitSound: " ",
        file: " ",
        unitShadow: " ",
        castbsw: 0,
        blend: 0,
        movetp: " ",
        spd: 0,
        turnRate: 3,
        manaN: 99999,
        regenMana: 99999,
        mana0: 99999,
        hideOnMinimap: 1,
        canFlee: 0,
    },
];

/*  {
    PretreatType: "buff",
    id: "p004",
    _parent: "BHbd",
    Bufftip: "预处理生成]的魔法效果哦",
},
*/