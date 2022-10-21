
import Item_UI_Initialization from "cyttp/ItemData/Item_UI_Initialization";
import HopeNonRepeatingRandom from "cyttp/Util/HopeNonRepeatingRandom";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import SelectUtil from "solar/util/SelectUtil";
import TextTagUtil from "solar/util/TextTagUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";
import RisingStarDataConfig1 from "./RisingStarDataConfig1";


/**
 *      刷新辅助塔   *不重复刷新*
 */
export default class AuxiliaryTowerShop {
    //刷新按钮 
    static refreshBtnId: string = 'I009'

    static config: { [num: number]: { [num: number]: string[] }[] }[] = [
        {
            5: [

                {
                    5: [
                        'q152', 'q153', 'q154', 'q155', 'q156', 'q162',
                        'q157', 'q158', 'q159', 'q15a', 'q15b',
                        'q15c', 'q15d', 'q15e', 'q15f', 'q15g',
                        'q15c', 'q1ag', 'q15d', 'q1ah', 'q15e',
                    ],
                },
                {
                    25: [
                        'q152', 'q160', 'q153', 'q161', 'q154', 'q162',
                        'q155', 'q163', 'q156', 'q164', 'q157', 'q1ab',
                        'q158', 'q1ac', 'q159', 'q1ad', 'q15a', 'q1ae',
                        'q15b', 'q1af', 'q15c', 'q1ag', 'q15d', 'q1ah',
                        'q15e', 'q1ai', 'q15f', 'q1aj', 'q15g', 'q1ak',
                    ],
                },
                {
                    100: [
                        'q152', 'q153', 'q154', 'q155', 'q15b', 'q1af',
                        'q15c', 'q1ag', 'q15d', 'q1ah', 'q15e', 'q1ai',
                        'q15f', 'q1aj', 'q15g', 'q1ak', 'q156', 'q157',
                        'q158', 'q159', 'q15a', 'q15b', 'q15c', 'q15d',

                    ],
                },
            ]
        },

        //  2级随机池   15 +5   20
        {
            50: [
                {
                    15: [
                        'q152', 'q153', 'q15c', 'q1ag', 'q15g', 'q164',
                        'q154', 'q155', 'q156', 'q157', 'q15f', 'q15k',
                        'q158', 'q15e', 'q15f', 'q15g', 'q15e', 'q1ai',
                        'q15f', 'q1aj', 'q15g', 'q1ak', 'q156', 'q157',
                        'q158', 'q159', 'q15a', 'q15b', 'q15c', 'q15d',

                    ],
                },
                {
                    50: [

                        'q159', 'q15a', 'q15b', 'q15c', 'q15d', 'q15s',
                        'q15e', 'q15f', 'q15g', 'q152', 'q15h', 'q163',
                        'q153', 'q15i', 'q154', 'q15j', 'q155', 'q15k',
                        'q156', 'q15l', 'q157', 'q15m', 'q158', 'q15n',

                    ],
                },
                {
                    100: [

                        'q152', 'q153', 'q15c', 'q1ag', 'q15d', 'q162',
                        'q154', 'q15e', 'q1ai', 'q15f', 'q1aj',
                        'q155', 'q15f', 'q1aj', 'q15b', 'q1ah',
                        'q156', 'q157', 'q158', 'q159', 'q15a',
                        'q15c', 'q15d', 'q15e', 'q15f', 'q15g',


                    ],
                },
            ]
        },
        //  1级随机池-百分之5的几率
        {
            100: [
                {
                    15: [
                        'q152', 'q160', 'q153', 'q161', 'q154', 'q162', 'q155',
                        'q156', 'q164', 'q157', 'q1ab', 'q158', 'q1ac', 'q159',
                        'q15a', 'q1ae', 'q15b', 'q1af', 'q15c', 'q1ag', 'q15d',
                        'q15e', 'q1ai', 'q15f', 'q1aj', 'q15g', 'q1ak', 'q1ad',
                    ],
                },
                {
                    50: [
                        'q152', 'q15h', 'q153', 'q15i', 'q154', 'q15j', 'q155',
                        'q156', 'q15l', 'q157', 'q15m', 'q158', 'q15n', 'q159',
                        'q15a', 'q15p', 'q15b', 'q15q', 'q15c', 'q15r', 'q15d',
                        'q15e', 'q15t', 'q15f', 'q15u', 'q15g', 'q15v', 'q15o',
                    ],
                },
                // 权重池
                {
                    100: [
                        'q152', 'q153', 'q154', 'q155', 'q156', 'q162',
                        'q157', 'q158', 'q159', 'q15a', 'q15b',
                        'q15c', 'q15d', 'q15e', 'q15f', 'q15g',
                        'q15f', 'q1aj', 'q15f', 'q1aj', 'q1ah', 'q162',
                    ],
                },
            ]
        },
    ];
    //境界 暗部上忍
    static absr = [0, 0, 0, 0]
    //境界 上忍
    static sr = [0, 0, 0, 0]
    //境界 六道之忍
    static ldsr = [0, 0, 0, 0]
    // 用来记录 刷新的物品id    -4个
    static item_array: string[] = []

    constructor() {
        // 黑市出售物品  刷新
        let trigger = new Trigger();
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SELL_ITEM)
        trigger.addAction(this.action);

    };

    // 出售物品-动作
    action(this: void) {
        let u = GetTriggerUnit()
        let name = GetUnitName(u)
        let p = GetOwningPlayer(u)
        let index = GetPlayerId(p)
        let buyUnit = GetBuyingUnit()
        // 判断是否是 -- 
        if (SubString(name, 0, 6) == '召唤') {
            let wp = GetSoldItem()
            if (GetItemTypeId(wp) == FourCC(AuxiliaryTowerShop.refreshBtnId)) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, "刷新 ***  ")
                // 先清空物品
                AuxiliaryTowerShop.remove_item(u)
                let data_array: { [num: number]: { [num: number]: string[] }[] }[] = AuxiliaryTowerShop.config
                // 记录id
                let id_item = AuxiliaryTowerShop.random_item(data_array)
                for (let i = 0; i < 4; i++) {
                    AuxiliaryTowerShop.item_array.push(id_item[i])
                    AddItemToStock(u, id_item[i], 1, 0)
                }
            } else {
                // 购买之后就清空物品
                // AuxiliaryTowerShop.remove_item(u)
                // if (GetItemType(wp) == ITEM_TYPE_PERMANENT) {
                //     RemoveItemFromStock(u, GetItemTypeId(wp))
                //     //     let id = id2string(GetItemTypeId(wp))
                //     //    // 绑定随机属性
                //     //     Item_UI_Initialization.ItemStartRandomData(wp, id)
                // }

                for (let v in RisingStarDataConfig1.config) {
                    let table = RisingStarDataConfig1.config[v].item_ID
                    let id = RisingStarDataConfig1.config[v].unitID
                    for (let k in table) {
                        let data = table[k]
                        if (GetItemTypeId(wp) == FourCC(k) && GetItemType(wp) == ITEM_TYPE_PERMANENT) {
                            //从商店删除
                            RemoveItemFromStock(u, GetItemTypeId(wp))
                            SelectUtil.forPlayerUnits((unit) => {
                                let solarData = Unit.fromHandle(unit).solarData
                                ///名字相同
                                if (GetItemName(wp) == GetUnitName(unit)) {
                                    //记录当前多余的物品
                                    DataBase.getItemSolarData(wp).多余 = wp
                                    //星级记录
                                    if (IsHandle(unit)) {
                                        data.startLevel[index] += 1
                                    }
                                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(unit) + '的星级：' + data.startLevel[index]);
                                    if (data.startLevel[index] == 2) {
                                        DestroyEffect(solarData.星数量)
                                        AuxiliaryTowerShop.add_Attribute(unit, data.str[0], data.agi[0], data.int[0])
                                        let TX = AddSpecialEffectTarget('e5c7b2fb4da0a2a6.mdx', unit, 'overhead')
                                        solarData.星数量1 = TX
                                    } else if (data.startLevel[index] == 3) {
                                        DestroyEffect(solarData.星数量1)
                                        AuxiliaryTowerShop.add_Attribute(unit, data.str[1], data.agi[1], data.int[1])
                                        let TX = AddSpecialEffectTarget('2ed657d036272de3.mdx', unit, 'overhead')
                                        solarData.星数量2 = TX
                                        //境界 暗部上忍
                                        AuxiliaryTowerShop.absr[index] += 1
                                        // DisplayTimedTextToPlayer(p, 0, 0, 5, '境界暗部上忍达成个数：' + AuxiliaryTowerShop.absr[index]);
                                        if (AuxiliaryTowerShop.absr[index] == 5 && !DataBase.getPlayerSolarData(p).境界_暗部上忍) {
                                            let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                                            if (lq >= 1300) {
                                                lq -= 1300
                                                MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                                                AddPlayerTechResearched(p, 'R005', 1)
                                                //全属性奖励
                                                SelectUtil.forPlayerUnits(unit => {
                                                    ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 200);
                                                    ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 200);
                                                    ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 200);
                                                }, index)
                                                DataBase.getPlayerSolarData(p).境界_暗部上忍 = true
                                            }
                                        }

                                    } else if (data.startLevel[index] == 4) {
                                        DestroyEffect(solarData.星数量2)
                                        AuxiliaryTowerShop.add_Attribute(unit, data.str[2], data.agi[2], data.int[2])
                                        let TX = AddSpecialEffectTarget('71268782063145ed.mdx', unit, 'overhead')
                                        solarData.星数量3 = TX
                                    } else if (data.startLevel[index] == 5) {
                                        DestroyEffect(solarData.星数量3)
                                        AuxiliaryTowerShop.add_Attribute(unit, data.str[3], data.agi[3], data.int[3])
                                        let TX = AddSpecialEffectTarget('e20a168fa1027de2.mdx', unit, 'overhead')
                                        solarData.星数量4 = TX

                                        //境界 暗部上忍
                                        AuxiliaryTowerShop.sr[index] += 1
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '境界上忍达成个数：' + AuxiliaryTowerShop.sr[index]);
                                        if (AuxiliaryTowerShop.sr[index] == 3 && !DataBase.getPlayerSolarData(p).境界_上忍) {
                                            let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                                            if (lq >= 2200) {
                                                lq -= 2200
                                                MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                                                AddPlayerTechResearched(p, 'R006', 1)
                                                //全属性奖励
                                                SelectUtil.forPlayerUnits(unit => {
                                                    ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 400);
                                                    ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 400);
                                                    ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 400);
                                                }, index)
                                                DataBase.getPlayerSolarData(p).境界_上忍 = true
                                            }
                                        }
                                    } else if (data.startLevel[index] == 6) {
                                        DestroyEffect(solarData.星数量4)
                                        AuxiliaryTowerShop.add_Attribute(unit, data.str[4], data.agi[4], data.int[4])
                                        let TX = AddSpecialEffectTarget('0308e9098e1475fe.mdx', unit, 'overhead')
                                        solarData.星数量5 = TX
                                        //境界 六道之忍
                                        AuxiliaryTowerShop.ldsr[index] += 1
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '境界=六道之忍达成个数：' + AuxiliaryTowerShop.ldsr[index]);
                                        if (AuxiliaryTowerShop.ldsr[index] == 7 && !DataBase.getPlayerSolarData(p).境界_六道之忍) {
                                            let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                                            if (lq >= 10000) {
                                                lq -= 10000
                                                MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                                                AddPlayerTechResearched(p, 'R001', 1)
                                                //全属性奖励
                                                SelectUtil.forPlayerUnits(unit => {
                                                    ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 12800);
                                                    ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 12800);
                                                    ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 12800);
                                                }, index)
                                                DataBase.getPlayerSolarData(p).境界_六道之忍 = true
                                            }
                                        }
                                    } else if (data.startLevel[index] >= 6) {
                                        data.startLevel[index] = 7
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff54b454该英雄以达到最高星级|r');
                                        return
                                    }

                                    //记录星级  技能接口   技能那边用三元表达式 以免为null
                                    Unit.fromHandle(unit).solarData.星级 = data.startLevel[index]
                                    DestroyEffect(AddSpecialEffectTarget('99ef3e7de6ac7e8d.mdx', unit, 'overhead'))
                                }
                            }, index, id)

                        }
                    }
                }

            }


        }
    }

    static random_item(data_array: { [num: number]: { [num: number]: string[] }[] }[]): string[] {
        for (let ii = 0; ii < data_array.length; ii++) {
            // 拿到4个随机池-表 5-15-20-60
            let data: { [num: number]: { [num: number]: string[] }[] } = data_array[ii]
            let random1 = GetRandomInt(0, 99)
            for (let k1 in data) {
                if (random1 < S2I(k1)) {
                    // 拿到其中一个随机池-表 
                    let data_array2 = data[k1]
                    for (let iii = 0; iii < data_array2.length; iii++) {
                        // 拿到权重-表 15-25-35-35  15-40-70-100
                        let data2: { [num: number]: string[] } = data_array2[iii]
                        for (let k2 in data2) {
                            let random2 = GetRandomInt(0, 99)
                            if (random2 < S2I(k2)) {
                                let arr: string[] = []
                                // 拿到其中物品id数组
                                let id_array: string[] = data2[k2]
                                // let random3 = GetRandomInt(0, id_array.length - 1)
                                let random3 = HopeNonRepeatingRandom(0, id_array.length - 1, 4)
                                for (let j = 0; j < 4; j++) {
                                    arr.push(id_array[random3[j]])
                                }
                                return arr
                            }
                        }
                    }
                }
            }
        }
    }
    static remove_item(u: unit) {
        for (let i = 0; i < AuxiliaryTowerShop.item_array.length; i++) {
            RemoveItemFromStock(u, AuxiliaryTowerShop.item_array[i])
        }
    }
    /**
   * 增加属性
   * @param unit 
   * @param value 
   */
    static add_Attribute(unit: unit, value1: number, value2: number, value3: number) {
        ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, value1)
        ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, value2)
        ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, value3)
    }
}


