


// ps：此系统模拟属性，只支持“永久”类型的物品



import DataBase from "solar/common/DataBase";
import BaseEntity from "solar/ecs/BaseEntity";
import BaseUtil from "solar/util/BaseUtil";
import ForceUtil from "solar/util/ForceUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";
import Item_UI_Initialization from "./Item_UI_Initialization";
// import ItemNewDataHope from "./ItemNewDataHope";

// 物品模拟属性  
export default class ItemSimulationAttributeHope {
    //  第一次存，要判断下  
    // if(!DataBase.getItemSolarData(item).模拟随机属性UI){
    //         DataBase.getItemSolarData(item).模拟随机属性UI = {}
    // }
    // 再存属性 整数系列： DataBase.getItemSolarData(item).模拟随机属性UI['攻击+'] = 100

    // 物品被删除前 记得清空：  DataBase.setData("Item",item, null)   或者    DataBase.clearItemSolarData(item)

    // 属性具备  参数
    static config: { [id: string]: string } = {
        '攻击+': '固定绿字攻击-整数',
        '攻击加成+': '百分比绿字攻击--整数',
        '护甲+': '护甲-整数',
        '护甲加成+': '百分比护甲--整数',
        '生命+': '生命-整数',
        '生命加成+': '百分比生命--整数',
        '攻速+': '攻速--整数',
        '力量+': '力量-整数',
        '力量加成+': '百分比力量--整数',
        '敏捷+': '敏捷-整数',
        '敏捷加成+': '百分比敏捷--整数',
        '智力+': '智力-整数',
        '智力加成+': '百分比智力--整数',
        '物理暴击+': '物理暴击--整数',
        '物理爆伤+': '物理爆伤--整数',
        '物理吸血+': '物理百分比吸血--整数',
        '法术暴击+': '法术暴击--整数',
        '法术爆伤+': '法术爆伤--整数',
        '法术吸血+': '法术吸血--整数',
        '生命恢复+': '生命恢复-整数',
        '魔法恢复+': '魔法恢复-整数',
        //----------------------------------
        '雷元素伤害+': '雷元素伤害-整数',
        '火元素伤害+': '火元素伤害-整数',
        '木元素伤害+': '木元素伤害-整数',
        '金元素伤害+': '金元素伤害-整数',
        '土元素伤害+': '土元素伤害-整数',
        '冰元素伤害+': '冰元素伤害-整数',
        '水元素伤害+': '水元素伤害-整数',
        '雷元素伤害加成+': '雷元素伤害加成-整数',
        '火元素伤害加成+': '火元素伤害加成-整数',
        '木元素伤害加成+': '木元素伤害加成-整数',
        '金元素伤害加成+': '金元素伤害加成-整数',
        '土元素伤害加成+': '土元素伤害加成-整数',
        '冰元素伤害加成+': '冰元素伤害加成-整数',
        '水元素伤害加成+': '水元素伤害加成-整数',
        '雷元素暴击伤害加成+': '雷元素暴击伤害加成-整数',
        '火元素暴击伤害加成+': '火元素暴击伤害加成-整数',
        '木元素暴击伤害加成+': '木元素暴击伤害加成-整数',
        '金元素暴击伤害加成+': '金元素暴击伤害加成-整数',
        '土元素暴击伤害加成+': '土元素暴击伤害加成-整数',
        '冰元素暴击伤害加成+': '冰元素暴击伤害加成-整数',
        '水元素暴击伤害加成+': '水元素暴击伤害加成-整数',


        '攻击增加攻击+': '攻击增加攻击',
        '攻击增加敏捷+': '攻击增加敏捷',
        '攻击增加智力+': '攻击增加智力',
        '攻击增加力量+': '攻击增加力量',
        '攻击增加生命+': '攻击增加生命',
        '攻击增加木材+': '攻击增加木材',
        '攻击增加金币+': '攻击增加金币',

        '召唤物属性加成+': '召唤物属性加成',
        '召唤物继承属性加成+': '召唤物继承属性加成',
        '召唤物攻击速度+': '召唤物攻击速度',
        '召唤物护甲穿透+': '召唤物护甲穿透',
        '召唤物数量+': '召唤物数量',
        '召唤物伤害减免+': '召唤物伤害减免',
        '召唤物减伤+': '召唤物减伤',
        '召唤物附加伤害+': '召唤物附加伤害',
        '召唤物真实伤害+': '召唤物真实伤害',

        '每秒增加攻击+': '每秒增加攻击',
        '每秒增加敏捷+': '每秒增加敏捷',
        '每秒增加智力+': '每秒增加智力',
        '每秒增加力量+': '每秒增加力量',
        '每秒增加生命+': '每秒增加生命',
        '每秒增加金币+': '每秒增加金币',
        '每秒增加木材+': '每秒增加木材',
        '每秒增加杀敌+': '每秒增加杀敌',

        '真实伤害+': '真实伤害',
        '附加伤害+': '附加伤害',
        '技能附加伤害+': '技能附加伤害',
        '技能CD-': '技能CD',
        '护甲穿透+': '护甲穿透',
        '魔抗穿透+': '魔抗穿透',  //没做
        '致命一击+': '致命一击',
        '幸运值+': '幸运值',
        '固定值吸血+': '固定值吸血',
        '百分比吸血+': '百分比吸血',
        '充能技能伤害+': '充能技能伤害',

    };


    constructor() {
        // 获得 - 丢失物品
        let trigger1 = new Trigger();
        trigger1.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM)
        trigger1.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DROP_ITEM)
        trigger1.addAction(() => {
            let unit = GetTriggerUnit()
            let wp = GetManipulatedItem()
            DataBase.getPlayerSolarData(GetOwningPlayer(unit)).获得物品的单位 = unit
            UnitAddAbility(unit, FourCC('Lz09'));
            UnitAddAbility(DataBase.getPlayerSolarData(GetOwningPlayer(unit)).召唤物, FourCC('Lz09'));
            //DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(unit));
            // 没有模拟属性的魔法书，直接退出
            if (GetUnitAbilityLevel(unit, FourCC('Lz09')) < 1) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发获得装备');
                return
            }
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发获得装备');
            BaseUtil.runLater(0.1, () => {
                ItemSimulationAttributeHope.AttributeRefresh(unit,)
            });
            //移除召唤商店的升星后的物品
            RemoveItem(DataBase.getItemSolarData(wp).多余)
            /**测试用 
             * 在创建物品的地方使用
            */
            // // 绑定随机属性
            Item_UI_Initialization.ItemStartRandomData(wp, id2string(GetItemTypeId(wp)), GetOwningPlayer(unit))

        })

        // 每10秒刷新一下百分比加成的属性
        let trigger2 = new Trigger();
        trigger2.registerTimerEvent(10, true)
        trigger2.addAction(() => {
            for (let i = 0; i < 4; i++) {
                let player = Player(i)
                if (DataBase.getPlayerSolarData(player).创建英雄单位) {
                    let hero = DataBase.getPlayerSolarData(player).创建英雄单位
                    ItemSimulationAttributeHope.AttributeRefresh(hero,)

                }
            }
        })
    };
    /*** 属性计算
     ** 
    */
    static AttributeRefresh(uu: unit,) {
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '触发=');
        let total_data: { [id: number]: any } = {}
        // 获取物品栏物品的所有属性数据
        for (let i = 0; i < 6; i++) {
            // 物品不是空   // 只有‘永久类型’才具有属性 setData
            let item = UnitItemInSlot(uu, i);
            if (!item || GetItemType(item) != ITEM_TYPE_PERMANENT) {
                continue
            }

            // 模拟属性为真，那就默认全部物品使用随机属性
            if (DataBase.getItemSolarData(item).模拟随机属性UI) {
                let data = DataBase.getItemSolarData(item).模拟随机属性UI
                let config = ItemSimulationAttributeHope.config
                total_data = ItemSimulationAttributeHope.AttributeSum(data, total_data, config)

            }
            // else {
            //     // // 使用表格物品数据，开启这个
            //     // let item_str_id = id2string(GetItemTypeId(GetSoldItem()))
            //     // let data = ItemNewDataHope.ItemNewData[item_str_id]
            //     // total_data = ItemSimulationAttributeHope.AttributeSum(data, undefined, undefined, total_data)
            // }

        }
        ItemSimulationAttributeHope.AttributeAdditional(total_data, uu)
        if (DataBase.getPlayerSolarData(GetOwningPlayer(uu)).召唤物 == null) { return }
        ItemSimulationAttributeHope.summonAttributeAdditional(total_data, DataBase.getPlayerSolarData(GetOwningPlayer(uu)).召唤物)
    }
    /*** 属性统计总和
    **
    */
    static AttributeSum(data: {}, total_data: {}, config: any): any {
        for (let k in config) {
            let total_v = total_data[k] ? total_data[k] : 0
            let data_v = data[k] ? data[k] : 0
            total_data[k] = data_v + total_v
        }
        return total_data
    }
    static summonAttributeAdditional(data: {}, uu: unit) {
        //=====================================================召唤物类型==========================================
        let sum_a_p_num = data['召唤物属性加成+'] ? data['召唤物属性加成+'] : 0
        let item_sum_a_p_num = DataBase.getUnitSolarData(uu).item_sum_a_p_num ? DataBase.getUnitSolarData(uu).item_sum_a_p_num : 0
        let Summon_state_add = DataBase.getUnitSolarData(uu).Summon_state_add ? DataBase.getUnitSolarData(uu).Summon_state_add : 0
        Summon_state_add = Summon_state_add - item_sum_a_p_num + sum_a_p_num
        DataBase.getUnitSolarData(uu).Summon_state_add = Summon_state_add
        DataBase.getUnitSolarData(uu).item_sum_a_p_num = sum_a_p_num

        let sum_in_a_p_num = (data['召唤物继承属性加成+'] ? data['召唤物继承属性加成+'] : 0) / 100
        let item_sum_in_a_p_num = DataBase.getUnitSolarData(uu).item_sum_in_a_p_num ? DataBase.getUnitSolarData(uu).item_sum_in_a_p_num : 0
        let Summon_quantity_state_add = DataBase.getUnitSolarData(uu).Summon_quantity_state_add ? DataBase.getUnitSolarData(uu).Summon_quantity_state_add : 0
        Summon_quantity_state_add = Summon_quantity_state_add - item_sum_in_a_p_num + sum_in_a_p_num
        DataBase.getUnitSolarData(uu).Summon_quantity_state_add = Summon_quantity_state_add
        DataBase.getUnitSolarData(uu).item_sum_in_a_p_num = sum_in_a_p_num

        let speed = (data['召唤物攻击速度+'] ? data['召唤物攻击速度+'] : 0) / 100
        // let item_sum_speed = DataBase.getUnitSolarData(uu).item_sum_speed ? DataBase.getUnitSolarData(uu).item_sum_speed : 0
        // let Summon_Attack_speed = DataBase.getUnitSolarData(uu).Summon_Attack_speed ? DataBase.getUnitSolarData(uu).Summon_Attack_speed : 0
        // // Summon_Attack_speed = Summon_Attack_speed + speed
        // // DataBase.getUnitSolarData(uu).Summon_Attack_speed = Summon_Attack_speed
        // // DataBase.getUnitSolarData(uu).item_sum_speed = speed
        // let before_speed = GetUnitState(uu, ConvertUnitState(0x51))
        // let new_speed = before_speed - Summon_Attack_speed + speed
        // SetUnitState(uu, ConvertUnitState(0x51), new_speed)
        // DataBase.getUnitSolarData(uu).Summon_Attack_speed = Summon_Attack_speed
        IncUnitAbilityLevel(uu, FourCC('Lz03'))
        EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz03')), 1, 108, speed)
        DecUnitAbilityLevel(uu, FourCC('Lz03'))


        let sum_armor_p_num = data['召唤物护甲穿透+'] ? data['召唤物护甲穿透+'] : 0
        let item_sum_armor_p_num = DataBase.getUnitSolarData(uu).item_sum_armor_p_num ? DataBase.getUnitSolarData(uu).item_sum_armor_p_num : 0
        let Summon_Armor_penetrate = DataBase.getUnitSolarData(uu).Summon_Armor_penetrate ? DataBase.getUnitSolarData(uu).Summon_Armor_penetrate : 0
        Summon_Armor_penetrate = Summon_Armor_penetrate - item_sum_armor_p_num + sum_armor_p_num
        DataBase.getUnitSolarData(uu).Summon_Armor_penetrate = Summon_Armor_penetrate
        DataBase.getUnitSolarData(uu).item_sum_armor_p_num = sum_armor_p_num

        let sum_num = data['召唤物数量+'] ? data['召唤物数量+'] : 0
        let item_sum_num = DataBase.getUnitSolarData(uu).item_sum_num ? DataBase.getUnitSolarData(uu).item_sum_num : 0
        let Summon_quantity = DataBase.getUnitSolarData(uu).Summon_quantity ? DataBase.getUnitSolarData(uu).Summon_quantity : 0
        Summon_quantity = Summon_quantity - item_sum_num + sum_num
        DataBase.getUnitSolarData(uu).Summon_quantity = Summon_quantity
        DataBase.getUnitSolarData(uu).item_sum_num = sum_num

        let sum_dr = (data['召唤物伤害减免+'] ? data['召唤物伤害减免+'] : 0) / 100
        let item_sum_dr = DataBase.getUnitSolarData(uu).item_sum_dr ? DataBase.getUnitSolarData(uu).item_sum_dr : 0
        let Summon_damage_reduction = DataBase.getUnitSolarData(uu).Summon_damage_reduction ? DataBase.getUnitSolarData(uu).Summon_damage_reduction : 0
        Summon_damage_reduction = Summon_damage_reduction - item_sum_dr + sum_dr
        DataBase.getUnitSolarData(uu).Summon_damage_reduction = Summon_damage_reduction
        DataBase.getUnitSolarData(uu).item_sum_dr = sum_dr

        let sum_ir = data['召唤物减伤+'] ? data['召唤物减伤+'] : 0
        let item_sum_ir = DataBase.getUnitSolarData(uu).item_sum_ir ? DataBase.getUnitSolarData(uu).item_sum_ir : 0
        let Summon_injury_reduction = DataBase.getUnitSolarData(uu).Summon_injury_reduction ? DataBase.getUnitSolarData(uu).Summon_injury_reduction : 0
        Summon_injury_reduction = Summon_injury_reduction - item_sum_ir + sum_ir
        DataBase.getUnitSolarData(uu).Summon_injury_reduction = Summon_injury_reduction
        DataBase.getUnitSolarData(uu).item_sum_ir = sum_ir

        let sum_ad = data['召唤物附加伤害+'] ? data['召唤物附加伤害+'] : 0
        let item_sum_ad = DataBase.getUnitSolarData(uu).item_sum_ad ? DataBase.getUnitSolarData(uu).item_sum_ad : 0
        let Summon_add_damage = DataBase.getUnitSolarData(uu).Summon_add_damage ? DataBase.getUnitSolarData(uu).Summon_add_damage : 0
        Summon_add_damage = Summon_add_damage - item_sum_ad + sum_ad
        DataBase.getUnitSolarData(uu).Summon_add_damage = Summon_add_damage
        DataBase.getUnitSolarData(uu).item_sum_ad = sum_ad

        let sum_rd = data['召唤物真实伤害+'] ? data['召唤物真实伤害+'] : 0
        let item_sum_rd = DataBase.getUnitSolarData(uu).item_sum_rd ? DataBase.getUnitSolarData(uu).item_sum_rd : 0
        let Summon_real_damage = DataBase.getUnitSolarData(uu).Summon_real_damage ? DataBase.getUnitSolarData(uu).Summon_real_damage : 0
        Summon_real_damage = Summon_real_damage - item_sum_rd + sum_rd
        DataBase.getUnitSolarData(uu).Summon_real_damage = Summon_real_damage
        DataBase.getUnitSolarData(uu).item_sum_rd = sum_rd


    }
    /*** 属性统计- 附加
    **
    */
    static AttributeAdditional(data: {}, uu: unit) {
        //=====================================================通用类型==========================================deathdamage
        if (true) {
            //

            // 刷新攻击动作-01-02   -----------------------------------------------------------
            // 添加属性
            let attack_num = data['攻击+'] ? data['攻击+'] : 0
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'attack_num=' + attack_num);
            // 计算攻击百分比动作02
            let attack_p_num = (data['攻击加成+'] ? data['攻击加成+'] : 0) / 100
            attack_p_num += DataBase.getUnitSolarData(uu).attack_p ? DataBase.getUnitSolarData(uu).attack_p : 0
            attack_p_num = R2I(GetUnitState(uu, ConvertUnitState(0x12)) * attack_p_num)
            IncUnitAbilityLevel(uu, FourCC('Lz01'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz01')), 1, 108, attack_num + attack_p_num)
            DecUnitAbilityLevel(uu, FourCC('Lz01'))
            // DataBase.getUnitSolarData(uu).item_attack = attack_num
            // 刷新护甲动作-03-04   -----------------------------------------------------------
            let armors_num = data['护甲+'] ? data['护甲+'] : 0
            // 计算护甲百分比动作04
            let armor_p_num = (data['护甲加成+'] ? data['护甲加成+'] : 0) / 100
            let item_armors = DataBase.getUnitSolarData(uu).item_armors ? DataBase.getUnitSolarData(uu).item_armors : 0
            let item_armors_p = DataBase.getUnitSolarData(uu).item_armors_p ? DataBase.getUnitSolarData(uu).item_armors_p : 0
            armor_p_num += DataBase.getUnitSolarData(uu).armor_p ? DataBase.getUnitSolarData(uu).armor_p : 0
            item_armors_p = R2I((GetUnitState(uu, ConvertUnitState(0x20)) - item_armors - item_armors_p) * armor_p_num)
            IncUnitAbilityLevel(uu, FourCC('Lz02'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz02')), 1, 108, math.abs(armors_num + item_armors_p))
            DecUnitAbilityLevel(uu, FourCC('Lz02'))
            DataBase.getUnitSolarData(uu).item_armors = armors_num
            DataBase.getUnitSolarData(uu).item_armors_p = item_armors_p
            // 因为护甲只能获取最大值，记录装备加的 - “固定绿字护甲” - 为了 护甲百分比

            // 刷新生命动作-05-06   -----------------------------------------------------------
            let life = data['生命+'] ? data['生命+'] : 0
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'life=' + life);
            let Item_life_p = (data['生命加成+'] ? data['生命加成+'] : 0) / 100
            let item_life = DataBase.getUnitSolarData(uu).item_life ? DataBase.getUnitSolarData(uu).item_life : 0
            let item_life_p = DataBase.getUnitSolarData(uu).item_life_p ? DataBase.getUnitSolarData(uu).item_life_p : 0
            Item_life_p += DataBase.getUnitSolarData(uu).life_p ? DataBase.getUnitSolarData(uu).life_p : 0
            // // 获取最大生命值
            let max_life = GetUnitState(uu, UNIT_STATE_MAX_LIFE)
            // 必须在改变生命最大值之前，先获取当前占比率
            let life_proportion = GetUnitState(uu, UNIT_STATE_LIFE) / max_life
            // 计算真实的生命
            let real_life = max_life - item_life - item_life_p
            // 计算百分比加成
            Item_life_p = real_life * Item_life_p
            // 计算固定加成 再+百分比
            max_life = real_life + life + Item_life_p
            // // 设置单位最大生命值
            SetUnitState(uu, UNIT_STATE_MAX_LIFE, max_life)
            // //  获取新的最大生命值，按之前的占比，设置单位当前生命值
            SetUnitState(uu, UNIT_STATE_LIFE, R2I(max_life * life_proportion))
            DataBase.getUnitSolarData(uu).item_life = life
            DataBase.getUnitSolarData(uu).item_life_p = Item_life_p
            // 刷新生命百分比动作-05-06   -----------------------------------------------------------

            //   *************-----------------------------------------------------------
            // // 刷新攻速动作-07       攻速本身就是百分比值，魔兽上限是4，英雄出身自带1的攻速
            let speed = (data['攻速+'] ? data['攻速+'] : 0) / 100
            let attackSpd_p = DataBase.getUnitSolarData(uu).attackSpd_p ? DataBase.getUnitSolarData(uu).attackSpd_p : 0
            // let before_speed = GetUnitState(uu, ConvertUnitState(0x51))
            // let new_speed = before_speed - attackSpd_p + speed
            // // // 设置单位攻击速度
            // SetUnitState(uu, ConvertUnitState(0x51), new_speed)
            // DataBase.getUnitSolarData(uu).attackSpd_p = attackSpd_p
            IncUnitAbilityLevel(uu, FourCC('Lz03'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz03')), 1, 108, speed + attackSpd_p)
            DecUnitAbilityLevel(uu, FourCC('Lz03'))

            //  // 刷新力量动作-08 - 09  -----------------------------------------------------------
            let str = data['力量+'] ? data['力量+'] : 0
            let str_p = (data['力量加成+'] ? data['力量加成+'] : 0) / 100
            str_p += DataBase.getUnitSolarData(uu).strength_p ? DataBase.getUnitSolarData(uu).strength_p : 0
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'str_p=' + str_p);
            let attribute_str = R2I((GetHeroStr(uu, false) * str_p))
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'attribute_str=' + attribute_str);
            // str_p = attribute_str * str_p
            IncUnitAbilityLevel(uu, FourCC('Lz08'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz08')), 1, 110, str + attribute_str)
            DecUnitAbilityLevel(uu, FourCC('Lz08'))

            //  // 刷新敏捷动作-10 -   -----------------------------------------------------------
            let agi = data['敏捷+'] ? data['敏捷+'] : 0
            let agi_p = (data['敏捷加成+'] ? data['敏捷加成+'] : 0) / 100
            agi_p += DataBase.getUnitSolarData(uu).agility_p ? DataBase.getUnitSolarData(uu).agility_p : 0
            // 计算新的百分比加成攻击值
            let attribute_agi = R2I((GetHeroAgi(uu, false) * agi_p))
            // agi_p = attribute_agi * agi_p
            // 108敏捷，109智力，110力量
            IncUnitAbilityLevel(uu, FourCC('Lz08'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz08')), 1, 108, agi + attribute_agi)
            DecUnitAbilityLevel(uu, FourCC('Lz08'))
            //  // 刷新智力动作-12 -   -----------------------------------------------------------
            let int = data['智力+'] ? data['智力+'] : 0
            let int_p = (data['智力加成+'] ? data['智力加成+'] : 0) / 100
            int_p += DataBase.getUnitSolarData(uu).intelligence_p ? DataBase.getUnitSolarData(uu).intelligence_p : 0
            // 计算新的百分比加成
            let attribute = R2I(GetHeroInt(uu, false) * int_p)
            // int_p = attribute * int_p
            // 108敏捷，109智力，110力量
            IncUnitAbilityLevel(uu, FourCC('Lz08'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz08')), 1, 109, int + attribute)
            DecUnitAbilityLevel(uu, FourCC('Lz08'))
            //  // 刷新物理暴击加成动作-14  ------------************ 特殊属性   ***********-----------
            let ad_b = (data['物理暴击+'] ? data['物理暴击+'] : 0) / 100
            let item_ad_b = DataBase.getUnitSolarData(uu).item_ad_b ? DataBase.getUnitSolarData(uu).item_ad_b : 0
            let physical_critical_chance = DataBase.getUnitSolarData(uu).physical_critical_chance ? DataBase.getUnitSolarData(uu).physical_critical_chance : 0
            physical_critical_chance = physical_critical_chance - item_ad_b + ad_b
            // 伤害系统的 暴击
            DataBase.getUnitSolarData(uu).physical_critical_chance = physical_critical_chance
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ad_b = ad_b
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);
            //   // 刷新物理爆伤加成动作-15 -----------------------------------------------------------
            let ad_p = (data['物理爆伤+'] ? data['物理爆伤+'] : 0) / 100
            let item_ad_p = DataBase.getUnitSolarData(uu).item_ad_p ? DataBase.getUnitSolarData(uu).item_ad_p : 0
            let physical_critical_damage = DataBase.getUnitSolarData(uu).physical_critical_damage ? DataBase.getUnitSolarData(uu).physical_critical_damage : 0
            physical_critical_damage = physical_critical_damage - item_ad_p + ad_p
            // 伤害系统的 暴伤
            DataBase.getUnitSolarData(uu).physical_critical_damage = physical_critical_damage
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ad_p = ad_p
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);

            //   // 刷新物理百分比吸血动作-16     -----------------------------------------------------------
            let ad_blood = data['物理吸血+'] ? data['物理吸血+'] : 0
            let item_ad_blood_sucking = DataBase.getUnitSolarData(uu).item_ad_blood_sucking ? DataBase.getUnitSolarData(uu).item_ad_blood_sucking : 0
            let ad_blood_sucking = DataBase.getUnitSolarData(uu).ad_blood_sucking ? DataBase.getUnitSolarData(uu).ad_blood_sucking : 0
            ad_blood_sucking = ad_blood_sucking - item_ad_blood_sucking + ad_blood
            // 伤害系统的 暴伤
            DataBase.getUnitSolarData(uu).ad_blood_sucking = ad_blood_sucking
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ad_blood_sucking = ad_blood
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);
            //  // 刷新法术暴击加成动作-17  -----------------------------------------------------------
            let ap_b = (data['法术暴击+'] ? data['法术暴击+'] : 0) / 100
            let item_ap_b = DataBase.getUnitSolarData(uu).item_ap_b ? DataBase.getUnitSolarData(uu).item_ap_b : 0
            let magic_critical_chance = DataBase.getUnitSolarData(uu).magic_critical_chance ? DataBase.getUnitSolarData(uu).magic_critical_chance : 0
            magic_critical_chance = magic_critical_chance - item_ap_b + ap_b
            // 伤害系统的 暴击
            DataBase.getUnitSolarData(uu).magic_critical_chance = magic_critical_chance
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ap_b = ap_b
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);

            //   // 刷新 - 法术 - 爆伤加成动作-18 -----------------------------------------------------------
            let ap_p = (data['法术爆伤+'] ? data['法术爆伤+'] : 0) / 100
            let item_ap_p = DataBase.getUnitSolarData(uu).item_ap_p ? DataBase.getUnitSolarData(uu).item_ap_p : 0
            let magic_critical_damage = DataBase.getUnitSolarData(uu).magic_critical_damage ? DataBase.getUnitSolarData(uu).magic_critical_damage : 0
            magic_critical_damage = magic_critical_damage - item_ap_p + ap_p
            // 伤害系统的 暴伤
            DataBase.getUnitSolarData(uu).magic_critical_damage = magic_critical_damage
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ap_p = ap_p
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '法术暴击：' + ad_b);
            //   // 刷新 - 法术 - 百分比吸血动作-19     -----------------------------------------------------------
            let ap_blood = data['法术吸血+'] ? data['法术吸血+'] : 0
            let item_ap_blood = DataBase.getUnitSolarData(uu).item_ap_blood ? DataBase.getUnitSolarData(uu).item_ap_blood : 0
            let ap_blood_sucking = DataBase.getUnitSolarData(uu).ap_blood_sucking ? DataBase.getUnitSolarData(uu).ap_blood_sucking : 0
            ap_blood_sucking = ap_blood_sucking - item_ap_blood + ap_blood
            // 伤害系统的 暴伤
            DataBase.getUnitSolarData(uu).ap_blood_sucking = ap_blood_sucking
            // 物品增加的 暴击
            DataBase.getUnitSolarData(uu).item_ap_blood = ap_blood
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);
            //   // 刷新生命恢复动作-20     -----------------------------------------------------------
            let life_r = data['生命恢复+'] ? data['生命恢复+'] : 0
            life_r += DataBase.getUnitSolarData(uu).life_r ? DataBase.getUnitSolarData(uu).life_r : 0
            IncUnitAbilityLevel(uu, FourCC('Lz04'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz04')), 1, 108, life_r)
            DecUnitAbilityLevel(uu, FourCC('Lz04'))
            UnitAddAbility(uu, FourCC('Lz05'))
            UnitRemoveAbility(uu, FourCC('Lz05'))
            //   // 刷新魔法恢复动作-21     -----------------------------------------------------------
            let mana_r = data['魔法恢复+'] ? data['魔法恢复+'] : 0
            mana_r += DataBase.getUnitSolarData(uu).mana_r ? DataBase.getUnitSolarData(uu).mana_r : 0
            IncUnitAbilityLevel(uu, FourCC('Lz06'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz06')), 1, 108, mana_r)
            DecUnitAbilityLevel(uu, FourCC('Lz06'))
            UnitAddAbility(uu, FourCC('Lz07'))
            UnitRemoveAbility(uu, FourCC('Lz07'))
        }
        //=====================================================其他类型==========================================
        if (true) {

            let real = data['真实伤害+'] ? data['真实伤害+'] : 0
            let item_real = DataBase.getUnitSolarData(uu).item_real ? DataBase.getUnitSolarData(uu).item_real : 0
            let real_damage = DataBase.getUnitSolarData(uu).real_damage ? DataBase.getUnitSolarData(uu).real_damage : 0
            real_damage = real_damage - item_real + real
            DataBase.getUnitSolarData(uu).thunder_damage = real_damage
            DataBase.getUnitSolarData(uu).item_real = real

            let add_da = data['附加伤害+'] ? data['附加伤害+'] : 0
            let item_add_da = DataBase.getUnitSolarData(uu).item_add_da ? DataBase.getUnitSolarData(uu).item_add_da : 0
            let Add_damage = DataBase.getUnitSolarData(uu).Add_damage ? DataBase.getUnitSolarData(uu).Add_damage : 0
            Add_damage = Add_damage - item_add_da + add_da
            DataBase.getUnitSolarData(uu).Add_damage = Add_damage
            DataBase.getUnitSolarData(uu).item_add_da = add_da


            let abi_add_da = data['技能附加伤害+'] ? data['技能附加伤害+'] : 0
            let item_abi_add_da = DataBase.getUnitSolarData(uu).item_abi_add_da ? DataBase.getUnitSolarData(uu).item_abi_add_da : 0
            let ability_type = DataBase.getUnitSolarData(uu).ability_type ? DataBase.getUnitSolarData(uu).ability_type : 0
            ability_type = ability_type - item_abi_add_da + abi_add_da
            DataBase.getUnitSolarData(uu).ability_type = ability_type
            DataBase.getUnitSolarData(uu).item_abi_add_da = abi_add_da

            let abi_CD = data['技能CD-'] ? data['技能CD-'] : 0
            let item_abi_CD = DataBase.getUnitSolarData(uu).item_abi_CD ? DataBase.getUnitSolarData(uu).item_abi_CD : 0
            let ability_CD = DataBase.getUnitSolarData(uu).ability_CD ? DataBase.getUnitSolarData(uu).ability_CD : 0
            ability_CD = ability_CD - item_abi_CD + abi_CD
            DataBase.getUnitSolarData(uu).ability_CD = ability_CD
            DataBase.getUnitSolarData(uu).item_abi_CD = abi_CD

            let armor_ct = data['护甲穿透+'] ? data['护甲穿透+'] : 0
            let item_armor_ct = DataBase.getUnitSolarData(uu).item_armor_ct ? DataBase.getUnitSolarData(uu).item_armor_ct : 0
            let Armor_penetrate = DataBase.getUnitSolarData(uu).Armor_penetrate ? DataBase.getUnitSolarData(uu).Armor_penetrate : 0
            Armor_penetrate = Armor_penetrate - item_armor_ct + armor_ct
            DataBase.getUnitSolarData(uu).ability_CD = ability_CD
            DataBase.getUnitSolarData(uu).item_armor_ct = armor_ct

            let zmyiji = data['致命一击+'] ? data['致命一击+'] : 0
            let deathdamage = DataBase.getUnitSolarData(uu).deathdamage ? DataBase.getUnitSolarData(uu).deathdamage : 0
            IncUnitAbilityLevel(uu, FourCC('Zmyj'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Zmyj')), 1, 109, zmyiji + deathdamage)
            DecUnitAbilityLevel(uu, FourCC('Zmyj'))

            let lucky_ = data['幸运值+'] ? data['幸运值+'] : 0
            let item_lucky_values = DataBase.getUnitSolarData(uu).item_lucky_values ? DataBase.getUnitSolarData(uu).item_lucky_values : 0
            let lucky_values = DataBase.getUnitSolarData(uu).lucky_values ? DataBase.getUnitSolarData(uu).lucky_values : 0
            lucky_values = lucky_values - item_lucky_values + lucky_
            DataBase.getUnitSolarData(uu).lucky_values = lucky_values
            DataBase.getUnitSolarData(uu).item_lucky_values = lucky_

            let Charging_s_d = data['充能技能伤害+'] ? data['充能技能伤害+'] : 0
            let item_Charging_skill_damage = DataBase.getUnitSolarData(uu).item_Charging_skill_damage ? DataBase.getUnitSolarData(uu).item_Charging_skill_damage : 0
            let Charging_skill_damage = DataBase.getUnitSolarData(uu).Charging_skill_damage ? DataBase.getUnitSolarData(uu).Charging_skill_damage : 0
            Charging_skill_damage = Charging_skill_damage - item_Charging_skill_damage + Charging_s_d
            DataBase.getUnitSolarData(uu).Charging_skill_damage = Charging_skill_damage
            DataBase.getUnitSolarData(uu).item_Charging_skill_damage = Charging_s_d

            let blood_s_p = data['百分比吸血+'] ? data['百分比吸血+'] : 0
            let item_blood_sucking_p = DataBase.getUnitSolarData(uu).item_blood_sucking_p ? DataBase.getUnitSolarData(uu).item_blood_sucking_p : 0
            let blood_sucking_p = DataBase.getUnitSolarData(uu).blood_sucking_p ? DataBase.getUnitSolarData(uu).blood_sucking_p : 0
            blood_sucking_p = blood_sucking_p - item_blood_sucking_p + blood_s_p
            DataBase.getUnitSolarData(uu).blood_sucking_p = blood_sucking_p
            DataBase.getUnitSolarData(uu).item_blood_sucking_p = blood_s_p

            let blood_s = data['固定值吸血+'] ? data['固定值吸血+'] : 0
            let item_blood_sucking = DataBase.getUnitSolarData(uu).item_blood_sucking ? DataBase.getUnitSolarData(uu).item_blood_sucking : 0
            let blood_sucking = DataBase.getUnitSolarData(uu).blood_sucking ? DataBase.getUnitSolarData(uu).blood_sucking : 0
            blood_sucking = blood_sucking - item_blood_sucking + blood_s
            DataBase.getUnitSolarData(uu).blood_sucking = blood_sucking
            DataBase.getUnitSolarData(uu).item_blood_sucking = blood_s


            let magic_p_p = data['魔抗穿透+'] ? data['魔抗穿透+'] : 0
            let item_magic_penetrate_p = DataBase.getUnitSolarData(uu).item_magic_penetrate_p ? DataBase.getUnitSolarData(uu).item_magic_penetrate_p : 0
            let magic_penetrate_p = DataBase.getUnitSolarData(uu).magic_penetrate_p ? DataBase.getUnitSolarData(uu).magic_penetrate_p : 0
            magic_penetrate_p = magic_penetrate_p - item_magic_penetrate_p + magic_p_p
            DataBase.getUnitSolarData(uu).magic_penetrate_p = magic_penetrate_p
            DataBase.getUnitSolarData(uu).item_magic_penetrate_p = magic_p_p
        }

        //===================================================每秒/攻击类型=======================================
        if (true) {
            let timer_a = data['每秒增加攻击+'] ? data['每秒增加攻击+'] : 0
            let item_timer_a = DataBase.getUnitSolarData(uu).item_timer_a ? DataBase.getUnitSolarData(uu).item_timer_a : 0
            let timer_add_attack = DataBase.getUnitSolarData(uu).timer_add_attack ? DataBase.getUnitSolarData(uu).timer_add_attack : 0
            timer_add_attack = timer_add_attack - item_timer_a + timer_a
            DataBase.getUnitSolarData(uu).timer_add_attack = timer_add_attack
            DataBase.getUnitSolarData(uu).item_timer_a = timer_a

            let timer_l = data['每秒增加生命+'] ? data['每秒增加生命+'] : 0
            let item_timer_l = DataBase.getUnitSolarData(uu).item_timer_l ? DataBase.getUnitSolarData(uu).item_timer_l : 0
            let timer_add_life = DataBase.getUnitSolarData(uu).timer_add_life ? DataBase.getUnitSolarData(uu).timer_add_life : 0
            timer_add_life = timer_add_life - item_timer_l + timer_l
            DataBase.getUnitSolarData(uu).timer_add_life = timer_add_life
            DataBase.getUnitSolarData(uu).item_timer_l = timer_l

            let timer_agi = data['每秒增加敏捷+'] ? data['每秒增加敏捷+'] : 0
            let item_timer_agi = DataBase.getUnitSolarData(uu).item_timer_agi ? DataBase.getUnitSolarData(uu).item_timer_agi : 0
            let timer_add_agi = DataBase.getUnitSolarData(uu).timer_add_agi ? DataBase.getUnitSolarData(uu).timer_add_agi : 0
            timer_add_agi = timer_add_agi - item_timer_agi + timer_agi
            DataBase.getUnitSolarData(uu).timer_add_agi = timer_add_agi
            DataBase.getUnitSolarData(uu).item_timer_agi = timer_agi

            let timer_int = data['每秒增加智力+'] ? data['每秒增加智力+'] : 0
            let item_timer_int = DataBase.getUnitSolarData(uu).item_timer_int ? DataBase.getUnitSolarData(uu).item_timer_int : 0
            let timer_add_int = DataBase.getUnitSolarData(uu).timer_add_int ? DataBase.getUnitSolarData(uu).timer_add_int : 0
            timer_add_int = timer_add_int - item_timer_int + timer_int
            DataBase.getUnitSolarData(uu).timer_add_int = timer_add_int
            DataBase.getUnitSolarData(uu).item_timer_int = timer_int

            let timer_str = data['每秒增加力量+'] ? data['每秒增加智力+'] : 0
            let item_timer_str = DataBase.getUnitSolarData(uu).item_timer_str ? DataBase.getUnitSolarData(uu).item_timer_str : 0
            let timer_add_str = DataBase.getUnitSolarData(uu).timer_add_str ? DataBase.getUnitSolarData(uu).timer_add_str : 0
            timer_add_str = timer_add_str - item_timer_str + timer_str
            DataBase.getUnitSolarData(uu).timer_add_str = timer_add_str
            DataBase.getUnitSolarData(uu).item_timer_str = timer_str

            let timer_g = data['每秒增加金币+'] ? data['每秒增加金币+'] : 0
            let item_timer_g = DataBase.getUnitSolarData(uu).item_timer_g ? DataBase.getUnitSolarData(uu).item_timer_g : 0
            let timer_add_gold = DataBase.getUnitSolarData(uu).timer_add_gold ? DataBase.getUnitSolarData(uu).timer_add_gold : 0
            timer_add_gold = timer_add_gold - item_timer_g + timer_g
            DataBase.getUnitSolarData(uu).timer_add_gold = timer_add_gold
            DataBase.getUnitSolarData(uu).item_timer_g = timer_g


            let timer_w = data['每秒增加木材+'] ? data['每秒增加木材+'] : 0
            let item_timer_w = DataBase.getUnitSolarData(uu).item_timer_w ? DataBase.getUnitSolarData(uu).item_timer_w : 0
            let timer_add_lumber = DataBase.getUnitSolarData(uu).timer_add_lumber ? DataBase.getUnitSolarData(uu).timer_add_lumber : 0
            timer_add_lumber = timer_add_lumber - item_timer_w + timer_w
            DataBase.getUnitSolarData(uu).timer_add_lumber = timer_add_lumber
            DataBase.getUnitSolarData(uu).item_timer_w = timer_w

            let timer_k = data['每秒增加杀敌+'] ? data['每秒增加杀敌+'] : 0
            let item_timer_k = DataBase.getUnitSolarData(uu).item_timer_k ? DataBase.getUnitSolarData(uu).item_timer_k : 0
            let timer_add_killNum = DataBase.getUnitSolarData(uu).timer_add_killNum ? DataBase.getUnitSolarData(uu).timer_add_killNum : 0
            timer_add_killNum = timer_add_killNum - item_timer_k + timer_k
            DataBase.getUnitSolarData(uu).timer_add_killNum = timer_add_killNum
            DataBase.getUnitSolarData(uu).item_timer_k = timer_k

            // ==========attack======
            let a_a_attack = data['攻击增加攻击+'] ? data['攻击增加攻击+'] : 0
            let item_a_a_attack = DataBase.getUnitSolarData(uu).item_a_a_attack ? DataBase.getUnitSolarData(uu).item_a_a_attack : 0
            let attack_add_attack = DataBase.getUnitSolarData(uu).attack_add_attack ? DataBase.getUnitSolarData(uu).attack_add_attack : 0
            attack_add_attack = attack_add_attack - item_a_a_attack + a_a_attack
            DataBase.getUnitSolarData(uu).attack_add_attack = attack_add_attack
            DataBase.getUnitSolarData(uu).item_a_a_attack = a_a_attack

            let a_a_life = data['攻击增加生命+'] ? data['攻击增加生命+'] : 0
            let item_a_a_life = DataBase.getUnitSolarData(uu).item_a_a_life ? DataBase.getUnitSolarData(uu).item_a_a_life : 0
            let attack_add_life = DataBase.getUnitSolarData(uu).attack_add_life ? DataBase.getUnitSolarData(uu).attack_add_life : 0
            attack_add_life = attack_add_life - item_a_a_life + a_a_life
            DataBase.getUnitSolarData(uu).attack_add_life = attack_add_life
            DataBase.getUnitSolarData(uu).item_a_a_life = a_a_life

            let a_a_str = data['攻击增加力量+'] ? data['攻击增加力量+'] : 0
            let item_a_a_str = DataBase.getUnitSolarData(uu).item_a_a_str ? DataBase.getUnitSolarData(uu).item_a_a_str : 0
            let attack_add_str = DataBase.getUnitSolarData(uu).attack_add_str ? DataBase.getUnitSolarData(uu).attack_add_str : 0
            attack_add_str = attack_add_str - item_a_a_str + a_a_str
            DataBase.getUnitSolarData(uu).attack_add_str = attack_add_str
            DataBase.getUnitSolarData(uu).item_a_a_str = a_a_str

            let a_a_agi = data['攻击增加敏捷+'] ? data['攻击增加敏捷+'] : 0
            let item_a_a_agi = DataBase.getUnitSolarData(uu).item_a_a_agi ? DataBase.getUnitSolarData(uu).item_a_a_agi : 0
            let attack_add_agi = DataBase.getUnitSolarData(uu).attack_add_agi ? DataBase.getUnitSolarData(uu).attack_add_agi : 0
            attack_add_agi = attack_add_agi - item_a_a_agi + a_a_agi
            DataBase.getUnitSolarData(uu).attack_add_agi = attack_add_agi
            DataBase.getUnitSolarData(uu).item_a_a_agi = a_a_agi

            let a_a_int = data['攻击增加智力+'] ? data['攻击增加智力+'] : 0
            let item_a_a_int = DataBase.getUnitSolarData(uu).item_a_a_int ? DataBase.getUnitSolarData(uu).item_a_a_int : 0
            let attack_add_int = DataBase.getUnitSolarData(uu).attack_add_int ? DataBase.getUnitSolarData(uu).attack_add_int : 0
            attack_add_int = attack_add_int - item_a_a_int + a_a_int
            DataBase.getUnitSolarData(uu).attack_add_int = attack_add_int
            DataBase.getUnitSolarData(uu).item_a_a_int = a_a_int

            let a_a_gold = data['攻击增加金币+'] ? data['攻击增加金币+'] : 0
            let item_a_a_gold = DataBase.getUnitSolarData(uu).item_a_a_gold ? DataBase.getUnitSolarData(uu).item_a_a_gold : 0
            let attack_add_gold = DataBase.getUnitSolarData(uu).attack_add_gold ? DataBase.getUnitSolarData(uu).attack_add_gold : 0
            attack_add_gold = attack_add_gold - item_a_a_gold + a_a_gold
            DataBase.getUnitSolarData(uu).attack_add_gold = attack_add_gold
            DataBase.getUnitSolarData(uu).item_a_a_gold = a_a_gold

            let a_a_lumber = data['攻击增加木材+'] ? data['攻击增加木材+'] : 0
            let item_a_a_lumber = DataBase.getUnitSolarData(uu).item_a_a_lumber ? DataBase.getUnitSolarData(uu).item_a_a_lumber : 0
            let attack_add_lumber = DataBase.getUnitSolarData(uu).attack_add_lumber ? DataBase.getUnitSolarData(uu).attack_add_lumber : 0
            attack_add_lumber = attack_add_lumber - item_a_a_lumber + a_a_lumber
            DataBase.getUnitSolarData(uu).attack_add_lumber = attack_add_lumber
            DataBase.getUnitSolarData(uu).item_a_a_lumber = a_a_lumber

        }
        // ==============================================召唤物===========================
        if (true) {
            let sum_a_p_num = data['召唤物属性加成+'] ? data['召唤物属性加成+'] : 0
            let item_sum_a_p_num = DataBase.getUnitSolarData(uu).item_sum_a_p_num ? DataBase.getUnitSolarData(uu).item_sum_a_p_num : 0
            let Summon_state_add = DataBase.getUnitSolarData(uu).Summon_state_add ? DataBase.getUnitSolarData(uu).Summon_state_add : 0
            Summon_state_add = Summon_state_add - item_sum_a_p_num + sum_a_p_num
            DataBase.getUnitSolarData(uu).Summon_state_add = Summon_state_add
            DataBase.getUnitSolarData(uu).item_sum_a_p_num = sum_a_p_num

            let sum_in_a_p_num = (data['召唤物继承属性加成+'] ? data['召唤物继承属性加成+'] : 0) / 100
            let item_sum_in_a_p_num = DataBase.getUnitSolarData(uu).item_sum_in_a_p_num ? DataBase.getUnitSolarData(uu).item_sum_in_a_p_num : 0
            let Summon_quantity_state_add = DataBase.getUnitSolarData(uu).Summon_quantity_state_add ? DataBase.getUnitSolarData(uu).Summon_quantity_state_add : 0
            Summon_quantity_state_add = Summon_quantity_state_add - item_sum_in_a_p_num + sum_in_a_p_num
            DataBase.getUnitSolarData(uu).Summon_quantity_state_add = Summon_quantity_state_add
            DataBase.getUnitSolarData(uu).item_sum_in_a_p_num = sum_in_a_p_num

            let speed = (data['召唤物攻击速度+'] ? data['召唤物攻击速度+'] : 0) / 100
            // let item_sum_speed = DataBase.getUnitSolarData(uu).item_sum_speed ? DataBase.getUnitSolarData(uu).item_sum_speed : 0
            // let Summon_Attack_speed = DataBase.getUnitSolarData(uu).Summon_Attack_speed ? DataBase.getUnitSolarData(uu).Summon_Attack_speed : 0
            // // Summon_Attack_speed = Summon_Attack_speed + speed
            // // DataBase.getUnitSolarData(uu).Summon_Attack_speed = Summon_Attack_speed
            // // DataBase.getUnitSolarData(uu).item_sum_speed = speed
            // let before_speed = GetUnitState(uu, ConvertUnitState(0x51))
            // let new_speed = before_speed - Summon_Attack_speed + speed
            // SetUnitState(uu, ConvertUnitState(0x51), new_speed)
            // DataBase.getUnitSolarData(uu).Summon_Attack_speed = Summon_Attack_speed
            IncUnitAbilityLevel(uu, FourCC('Lz03'))
            EXSetAbilityDataReal(EXGetUnitAbility(uu, FourCC('Lz03')), 1, 108, speed)
            DecUnitAbilityLevel(uu, FourCC('Lz03'))


            let sum_armor_p_num = data['召唤物护甲穿透+'] ? data['召唤物护甲穿透+'] : 0
            let item_sum_armor_p_num = DataBase.getUnitSolarData(uu).item_sum_armor_p_num ? DataBase.getUnitSolarData(uu).item_sum_armor_p_num : 0
            let Summon_Armor_penetrate = DataBase.getUnitSolarData(uu).Summon_Armor_penetrate ? DataBase.getUnitSolarData(uu).Summon_Armor_penetrate : 0
            Summon_Armor_penetrate = Summon_Armor_penetrate - item_sum_armor_p_num + sum_armor_p_num
            DataBase.getUnitSolarData(uu).Summon_Armor_penetrate = Summon_Armor_penetrate
            DataBase.getUnitSolarData(uu).item_sum_armor_p_num = sum_armor_p_num

            let sum_num = data['召唤物数量+'] ? data['召唤物数量+'] : 0
            let item_sum_num = DataBase.getUnitSolarData(uu).item_sum_num ? DataBase.getUnitSolarData(uu).item_sum_num : 0
            let Summon_quantity = DataBase.getUnitSolarData(uu).Summon_quantity ? DataBase.getUnitSolarData(uu).Summon_quantity : 0
            Summon_quantity = Summon_quantity - item_sum_num + sum_num
            DataBase.getUnitSolarData(uu).Summon_quantity = Summon_quantity
            DataBase.getUnitSolarData(uu).item_sum_num = sum_num

            let sum_dr = (data['召唤物伤害减免+'] ? data['召唤物伤害减免+'] : 0) / 100
            let item_sum_dr = DataBase.getUnitSolarData(uu).item_sum_dr ? DataBase.getUnitSolarData(uu).item_sum_dr : 0
            let Summon_damage_reduction = DataBase.getUnitSolarData(uu).Summon_damage_reduction ? DataBase.getUnitSolarData(uu).Summon_damage_reduction : 0
            Summon_damage_reduction = Summon_damage_reduction - item_sum_dr + sum_dr
            DataBase.getUnitSolarData(uu).Summon_damage_reduction = Summon_damage_reduction
            DataBase.getUnitSolarData(uu).item_sum_dr = sum_dr

            let sum_ir = data['召唤物减伤+'] ? data['召唤物减伤+'] : 0
            let item_sum_ir = DataBase.getUnitSolarData(uu).item_sum_ir ? DataBase.getUnitSolarData(uu).item_sum_ir : 0
            let Summon_injury_reduction = DataBase.getUnitSolarData(uu).Summon_injury_reduction ? DataBase.getUnitSolarData(uu).Summon_injury_reduction : 0
            Summon_injury_reduction = Summon_injury_reduction - item_sum_ir + sum_ir
            DataBase.getUnitSolarData(uu).Summon_injury_reduction = Summon_injury_reduction
            DataBase.getUnitSolarData(uu).item_sum_ir = sum_ir

            let sum_ad = data['召唤物附加伤害+'] ? data['召唤物附加伤害+'] : 0
            let item_sum_ad = DataBase.getUnitSolarData(uu).item_sum_ad ? DataBase.getUnitSolarData(uu).item_sum_ad : 0
            let Summon_add_damage = DataBase.getUnitSolarData(uu).Summon_add_damage ? DataBase.getUnitSolarData(uu).Summon_add_damage : 0
            Summon_add_damage = Summon_add_damage - item_sum_ad + sum_ad
            DataBase.getUnitSolarData(uu).Summon_add_damage = Summon_add_damage
            DataBase.getUnitSolarData(uu).item_sum_ad = sum_ad

            let sum_rd = data['召唤物真实伤害+'] ? data['召唤物真实伤害+'] : 0
            let item_sum_rd = DataBase.getUnitSolarData(uu).item_sum_rd ? DataBase.getUnitSolarData(uu).item_sum_rd : 0
            let Summon_real_damage = DataBase.getUnitSolarData(uu).Summon_real_damage ? DataBase.getUnitSolarData(uu).Summon_real_damage : 0
            Summon_real_damage = Summon_real_damage - item_sum_rd + sum_rd
            DataBase.getUnitSolarData(uu).Summon_real_damage = Summon_real_damage
            DataBase.getUnitSolarData(uu).item_sum_rd = sum_rd

        }



        //--------------------------------------------------------------------------元素伤害---------------
        let ele_t = data['雷元素伤害+'] ? data['雷元素伤害+'] : 0
        let item_ele_t = DataBase.getUnitSolarData(uu).item_ele_t ? DataBase.getUnitSolarData(uu).item_ele_t : 0
        let thunder_damage = DataBase.getUnitSolarData(uu).thunder_damage ? DataBase.getUnitSolarData(uu).thunder_damage : 0
        thunder_damage = thunder_damage - item_ele_t + ele_t
        DataBase.getUnitSolarData(uu).thunder_damage = thunder_damage
        DataBase.getUnitSolarData(uu).item_ele_t = ele_t
        //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害' + DataBase.getUnitSolarData(uu).thunder_damage );

        let ele_t_p_num = (data['雷元素伤害加成+'] ? data['雷元素伤害加成+'] : 0) / 100
        let item_ele_t_p_num = DataBase.getUnitSolarData(uu).ele_t_p_num ? DataBase.getUnitSolarData(uu).ele_t_p_num : 0
        let thunder_damage_increased = DataBase.getUnitSolarData(uu).thunder_damage_increased ? DataBase.getUnitSolarData(uu).thunder_damage_increased : 0
        thunder_damage_increased = thunder_damage_increased - item_ele_t_p_num + ele_t_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).thunder_damage_increased = thunder_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_t_p_num = ele_t_p_num

        let ele_t_p_num_b = (data['雷元素暴击伤害加成+'] ? data['雷元素暴击伤害加成+'] : 0) / 100
        let item_ele_t_p_num_b = DataBase.getUnitSolarData(uu).item_ele_t_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_t_p_num_b : 0
        let thunder_critical_damage = DataBase.getUnitSolarData(uu).thunder_critical_damage ? DataBase.getUnitSolarData(uu).thunder_critical_damage : 0
        thunder_critical_damage = thunder_critical_damage - item_ele_t_p_num_b + ele_t_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).thunder_critical_damage = thunder_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_t_p_num_b = ele_t_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素暴击伤害加成' + DataBase.getUnitSolarData(uu).thunder_critical_damage );
        //===========火==========
        let ele_f = data['火元素伤害+'] ? data['火元素伤害+'] : 0
        let item_ele_f = DataBase.getUnitSolarData(uu).item_ele_f ? DataBase.getUnitSolarData(uu).item_ele_f : 0
        let fire_damage = DataBase.getUnitSolarData(uu).fire_damage ? DataBase.getUnitSolarData(uu).fire_damage : 0
        fire_damage = fire_damage - item_ele_f + ele_f
        DataBase.getUnitSolarData(uu).fire_damage = fire_damage
        DataBase.getUnitSolarData(uu).item_ele_f = ele_f

        let ele_f_p_num = (data['火元素伤害加成+'] ? data['火元素伤害加成+'] : 0) / 100
        let item_ele_f_p_num = DataBase.getUnitSolarData(uu).item_ele_f_p_num ? DataBase.getUnitSolarData(uu).item_ele_f_p_num : 0
        let fire_damage_increased = DataBase.getUnitSolarData(uu).fire_damage_increased ? DataBase.getUnitSolarData(uu).fire_damage_increased : 0
        fire_damage_increased = fire_damage_increased - item_ele_f_p_num + ele_f_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).fire_damage_increased = fire_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_f_p_num = ele_f_p_num

        let ele_f_p_num_b = (data['火元素暴击伤害加成+'] ? data['火元素暴击伤害加成+'] : 0) / 100
        let item_ele_f_p_num_b = DataBase.getUnitSolarData(uu).item_ele_f_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_f_p_num_b : 0
        let fire_critical_damage = DataBase.getUnitSolarData(uu).fire_critical_damage ? DataBase.getUnitSolarData(uu).fire_critical_damage : 0
        fire_critical_damage = fire_critical_damage - item_ele_f_p_num_b + ele_f_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).fire_critical_damage = fire_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_f_p_num_b = ele_f_p_num_b

        //=========木 =================
        let ele_w = data['木元素伤害+'] ? data['木元素伤害+'] : 0
        let item_ele_w = DataBase.getUnitSolarData(uu).item_ele_w ? DataBase.getUnitSolarData(uu).item_ele_w : 0
        let wood_damage = DataBase.getUnitSolarData(uu).wood_damage ? DataBase.getUnitSolarData(uu).wood_damage : 0
        wood_damage = wood_damage - item_ele_w + ele_w
        DataBase.getUnitSolarData(uu).wood_damage = wood_damage
        DataBase.getUnitSolarData(uu).item_ele_w = ele_w

        let ele_w_p_num = (data['木元素伤害加成+'] ? data['木元素伤害加成+'] : 0) / 100
        let item_ele_w_p_num = DataBase.getUnitSolarData(uu).item_ele_w_p_num ? DataBase.getUnitSolarData(uu).item_ele_w_p_num : 0
        let wood_damage_increased = DataBase.getUnitSolarData(uu).wood_damage_increased ? DataBase.getUnitSolarData(uu).wood_damage_increased : 0
        wood_damage_increased = wood_damage_increased - item_ele_w_p_num + ele_w_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).wood_damage_increased = wood_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_w_p_num = ele_w_p_num

        let ele_w_p_num_b = (data['木元素暴击伤害加成+'] ? data['木元素暴击伤害加成+'] : 0) / 100
        let item_ele_w_p_num_b = DataBase.getUnitSolarData(uu).item_ele_w_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_w_p_num_b : 0
        let wood_critical_damage = DataBase.getUnitSolarData(uu).wood_critical_damage ? DataBase.getUnitSolarData(uu).wood_critical_damage : 0
        wood_critical_damage = wood_critical_damage - item_ele_w_p_num_b + ele_w_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).wood_critical_damage = wood_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_w_p_num_b = ele_w_p_num_b

        //============金============
        let ele_g = data['金元素伤害+'] ? data['金元素伤害+'] : 0
        let item_ele_g = DataBase.getUnitSolarData(uu).item_ele_g ? DataBase.getUnitSolarData(uu).item_ele_g : 0
        let gold_damage = DataBase.getUnitSolarData(uu).gold_damage ? DataBase.getUnitSolarData(uu).gold_damage : 0
        gold_damage = gold_damage - item_ele_g + ele_g
        DataBase.getUnitSolarData(uu).gold_damage = gold_damage
        DataBase.getUnitSolarData(uu).item_ele_g = ele_g

        let ele_g_p_num = (data['金元素伤害加成+'] ? data['金元素伤害加成+'] : 0) / 100
        let item_ele_g_p_num = DataBase.getUnitSolarData(uu).item_ele_g_p_num ? DataBase.getUnitSolarData(uu).item_ele_g_p_num : 0
        let gold_damage_increased = DataBase.getUnitSolarData(uu).gold_damage_increased ? DataBase.getUnitSolarData(uu).gold_damage_increased : 0
        gold_damage_increased = gold_damage_increased - item_ele_g_p_num + ele_g_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).gold_damage_increased = gold_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_g_p_num = ele_g_p_num

        let ele_g_p_num_b = (data['金元素暴击伤害加成+'] ? data['金元素暴击伤害加成+'] : 0) / 100
        let item_ele_g_p_num_b = DataBase.getUnitSolarData(uu).item_ele_g_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_g_p_num_b : 0
        let gold_critical_damage = DataBase.getUnitSolarData(uu).gold_critical_damage ? DataBase.getUnitSolarData(uu).gold_critical_damage : 0
        gold_critical_damage = gold_critical_damage - item_ele_g_p_num_b + ele_g_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).gold_critical_damage = gold_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_g_p_num_b = ele_g_p_num_b

        //==========土===============
        let ele_s = data['土元素伤害+'] ? data['土元素伤害+'] : 0
        let item_ele_s = DataBase.getUnitSolarData(uu).item_ele_s ? DataBase.getUnitSolarData(uu).item_ele_s : 0
        let Soil_damage = DataBase.getUnitSolarData(uu).Soil_damage ? DataBase.getUnitSolarData(uu).Soil_damage : 0
        Soil_damage = Soil_damage - item_ele_s + ele_s
        DataBase.getUnitSolarData(uu).Soil_damage = Soil_damage
        DataBase.getUnitSolarData(uu).item_ele_s = ele_s

        let ele_s_p_num = (data['土元素伤害加成+'] ? data['土元素伤害加成+'] : 0) / 100
        let item_ele_s_p_num = DataBase.getUnitSolarData(uu).item_ele_s_p_num ? DataBase.getUnitSolarData(uu).item_ele_s_p_num : 0
        let Soil_damage_increased = DataBase.getUnitSolarData(uu).Soil_damage_increased ? DataBase.getUnitSolarData(uu).Soil_damage_increased : 0
        Soil_damage_increased = Soil_damage_increased - item_ele_s_p_num + ele_s_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).Soil_damage_increased = Soil_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_s_p_num = ele_s_p_num

        let ele_s_p_num_b = (data['土元素暴击伤害加成+'] ? data['土元素暴击伤害加成+'] : 0) / 100
        let item_ele_s_p_num_b = DataBase.getUnitSolarData(uu).item_ele_s_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_s_p_num_b : 0
        let Soil_critical_damage = DataBase.getUnitSolarData(uu).Soil_critical_damage ? DataBase.getUnitSolarData(uu).Soil_critical_damage : 0
        Soil_critical_damage = Soil_critical_damage - item_ele_s_p_num_b + ele_s_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).Soil_critical_damage = Soil_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_s_p_num_b = ele_s_p_num_b

        //========冰===========
        let ele_i = data['冰元素伤害+'] ? data['冰元素伤害+'] : 0
        let item_ele_i = DataBase.getUnitSolarData(uu).item_ele_i ? DataBase.getUnitSolarData(uu).item_ele_i : 0
        let ice_damage = DataBase.getUnitSolarData(uu).ice_damage ? DataBase.getUnitSolarData(uu).ice_damage : 0
        ice_damage = ice_damage - item_ele_i + ele_i
        DataBase.getUnitSolarData(uu).ice_damage = ice_damage
        DataBase.getUnitSolarData(uu).item_ele_i = ele_i

        let ele_i_p_num = (data['冰元素伤害加成+'] ? data['冰元素伤害加成+'] : 0) / 100
        let item_ele_i_p_num = DataBase.getUnitSolarData(uu).item_ele_i_p_num ? DataBase.getUnitSolarData(uu).item_ele_i_p_num : 0
        let ice_damage_increased = DataBase.getUnitSolarData(uu).ice_damage_increased ? DataBase.getUnitSolarData(uu).ice_damage_increased : 0
        ice_damage_increased = ice_damage_increased - item_ele_i_p_num + ele_i_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).ice_damage_increased = ice_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_i_p_num = ele_i_p_num

        let ele_i_p_num_b = (data['冰元素暴击伤害加成+'] ? data['冰元素暴击伤害加成+'] : 0) / 100
        let item_ele_i_p_num_b = DataBase.getUnitSolarData(uu).item_ele_i_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_i_p_num_b : 0
        let ice_critical_damage = DataBase.getUnitSolarData(uu).ice_critical_damage ? DataBase.getUnitSolarData(uu).ice_critical_damage : 0
        ice_critical_damage = ice_critical_damage - item_ele_i_p_num_b + ele_i_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).ice_critical_damage = ice_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_i_p_num_b = ele_i_p_num_b

        //========水============
        let ele_wa = data['水元素伤害+'] ? data['水元素伤害+'] : 0
        let item_ele_wa = DataBase.getUnitSolarData(uu).item_ele_wa ? DataBase.getUnitSolarData(uu).item_ele_wa : 0
        let water_damage = DataBase.getUnitSolarData(uu).water_damage ? DataBase.getUnitSolarData(uu).water_damage : 0
        water_damage = water_damage - item_ele_wa + ele_wa
        DataBase.getUnitSolarData(uu).water_damage = water_damage
        DataBase.getUnitSolarData(uu).item_ele_wa = ele_wa

        let ele_wa_p_num = (data['水元素伤害加成+'] ? data['水元素伤害加成+'] : 0) / 100
        let item_ele_wa_p_num = DataBase.getUnitSolarData(uu).item_ele_wa_p_num ? DataBase.getUnitSolarData(uu).item_ele_wa_p_num : 0
        let water_damage_increased = DataBase.getUnitSolarData(uu).water_damage_increased ? DataBase.getUnitSolarData(uu).water_damage_increased : 0
        water_damage_increased = water_damage_increased - item_ele_wa_p_num + ele_wa_p_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).water_damage_increased = water_damage_increased
        DataBase.getUnitSolarData(uu).item_ele_wa_p_num = ele_wa_p_num

        let ele_wa_p_num_b = (data['水元素暴击伤害加成+'] ? data['水元素暴击伤害加成+'] : 0) / 100
        let item_ele_wa_p_num_b = DataBase.getUnitSolarData(uu).item_ele_wa_p_num_b ? DataBase.getUnitSolarData(uu).item_ele_wa_p_num_b : 0
        let water_critical_damage = DataBase.getUnitSolarData(uu).water_critical_damage ? DataBase.getUnitSolarData(uu).water_critical_damage : 0
        water_critical_damage = water_critical_damage - item_ele_wa_p_num_b + ele_wa_p_num_b
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雷元素伤害加成' + ele_t_p_num);
        DataBase.getUnitSolarData(uu).water_critical_damage = water_critical_damage
        DataBase.getUnitSolarData(uu).item_ele_wa_p_num_b = ele_wa_p_num_b
    }


}






    // //   // 刷新物理吸血动作-16     -----------------------------------------------------------
    // if (data['ad_blood']) {
    //     if (flag) {
    //         let ad_blood = data['ad_blood']
    //         let item_ad_p = DataBase.getUnitSolarData(uu).item_ad_blood ? DataBase.getUnitSolarData(uu).item_ad_blood : 0
    //         let ad_blood_sucking = DataBase.getUnitSolarData(uu).ad_blood_sucking ? DataBase.getUnitSolarData(uu).ad_blood_sucking : 0
    //         ad_blood_sucking = ad_blood_sucking - item_ad_p + ad_blood
    //         // 伤害系统的 暴伤
    //         DataBase.getUnitSolarData(uu).ad_blood_sucking = ad_blood_sucking
    //         // 物品增加的 暴击
    //         DataBase.getUnitSolarData(uu).item_ad_blood = ad_blood
    //         // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '物理暴击：' + ad_b);
    //     } else {
    //         let ad_blood = total_data['ad_blood'] ? total_data['ad_blood'] : 0
    //         total_data['ad_blood'] = data['ad_blood'] + ad_blood
    //     }

    // }



