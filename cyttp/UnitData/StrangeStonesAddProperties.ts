import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { Trigger } from "solar/w3ts/handles/trigger";
/**
 * 石头**
 */
export default class StrangeStonesAddProperties {

    static config: {
        [id: string]: {
            value?: number,
            type?: string

        }
    } = {
            'q1c2': { value: 1000, type: '攻击' },
            'q1c3': { value: 2000, type: '攻击' },
            'q1c4': { value: 4000, type: '攻击' },
            'q1c5': { value: 8000, type: '攻击' },
            'q1c6': { value: 16000, type: '攻击' },
            'q1c7': { value: 10, type: '攻速' },
            'q1c8': { value: 15, type: '攻速' },
            'q1c9': { value: 20, type: '攻速' },
            'q1ca': { value: 25, type: '攻速' },
            'q1cb': { value: 30, type: '攻速' },
            'q1cc': { value: 400, type: '力量' },
            'q1cd': { value: 800, type: '力量' },
            'q1ce': { value: 1600, type: '力量' },
            'q1cf': { value: 3200, type: '力量' },
            'q1cg': { value: 6400, type: '力量' },
            'q1ch': { value: 400, type: '敏捷' },
            'q1ci': { value: 800, type: '敏捷' },
            'q1cj': { value: 1600, type: '敏捷' },
            'q1ck': { value: 3200, type: '敏捷' },
            'q1cl': { value: 6400, type: '敏捷' },
            'q1cm': { value: 400, type: '智力' },
            'q1cn': { value: 800, type: '智力' },
            'q1co': { value: 1600, type: '智力' },
            'q1cp': { value: 3200, type: '智力' },
            'q1cq': { value: 6400, type: '智力' },
            'q1cr': { value: 2000, type: '生命' },
            'q1cs': { value: 4000, type: '生命' },
            'q1ct': { value: 8000, type: '生命' },
            'q1cu': { value: 16000, type: '生命' },
            'q1cv': { value: 32000, type: '生命' },
            'q1d0': { value: 10, type: '爆伤' },
            'q1d1': { value: 15, type: '爆伤' },
            'q1d2': { value: 20, type: '爆伤' },
            'q1d3': { value: 25, type: '爆伤' },
            'q1d4': { value: 30, type: '爆伤' },
            'q1d5': { value: 15, type: '魔爆' },
            'q1d6': { value: 20, type: '魔爆' },
            'q1d7': { value: 25, type: '魔爆' },
            'q1d8': { value: 30, type: '魔爆' },
            'q1d9': { value: 60, type: '魔爆' },

        }

    constructor() {
        let trigger1 = new Trigger();
        trigger1.registerAnyUnitEvent(EVENT_PLAYER_UNIT_USE_ITEM)
        trigger1.addAction(() => {
            let wp = GetManipulatedItem()
            let u = GetTriggerUnit()
            let index = GetPlayerId(GetOwningPlayer(u))
            for (let v in StrangeStonesAddProperties.config) {
                let data = StrangeStonesAddProperties.config[v]
                if (GetItemTypeId(wp) == FourCC(v)) {
                    if (data.type == '攻击') {

                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                SetUnitState(unit, ConvertUnitState(0x12), GetUnitState(unit, ConvertUnitState(0x12)) + data.value)
                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00攻击石加成，全体单位增加|r' + data.value + '|cff00ff00点攻击|r');

                    } else if (data.type == '攻速') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                SetUnitState(unit, ConvertUnitState(0x51), GetUnitState(unit, ConvertUnitState(0x51)) + (data.value / 100))

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00攻速石加成，全体单位增加|r' + data.value + '%' + '|cff00ff00点攻速|r');

                    } else if (data.type == '力量') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, data.value);
                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00力量石加成，全体单位增加|r' + data.value + '|cff00ff00点力量|r');
                    } else if (data.type == '敏捷') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, data.value);

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00敏捷石加成，全体单位增加|r' + data.value + '|cff00ff00点敏捷|r');
                    } else if (data.type == '智力') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, data.value);

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00智力石加成，全体单位增加|r' + data.value + '|cff00ff00点智力|r');
                    } else if (data.type == '生命') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                SetUnitState(unit, UNIT_STATE_LIFE, GetUnitState(unit, UNIT_STATE_LIFE) + data.value)
                                SetUnitState(unit, UNIT_STATE_MAX_LIFE, GetUnitState(unit, UNIT_STATE_MAX_LIFE) + data.value)

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00生命石加成，全体单位增加|r' + data.value + '|cff00ff00点生命|r');
                    } else if (data.type == '爆伤') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                let physical_critical_damage = DataBase.getUnitSolarData(unit).physical_critical_damage ? DataBase.getUnitSolarData(unit).physical_critical_damage : 0
                                physical_critical_damage += (data.value / 100)
                                // 伤害系统的 暴伤
                                DataBase.getUnitSolarData(unit).physical_critical_damage = physical_critical_damage

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00爆伤石加成，全体单位增加|r' + data.value + '%' + '|cff00ff00点物理爆伤|r');
                    } else if (data.type == '魔爆') {
                        SelectUtil.forPlayerUnits(unit => {
                            if (IsUnitType(unit, UNIT_TYPE_HERO)) {
                                let magic_critical_damage = DataBase.getUnitSolarData(unit).magic_critical_damage ? DataBase.getUnitSolarData(unit).magic_critical_damage : 0
                                magic_critical_damage += (data.value / 100)
                                // 伤害系统的 暴伤
                                DataBase.getUnitSolarData(unit).magic_critical_damage = magic_critical_damage

                            }
                        }, index)
                        DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00魔爆石加成，全体单位增加|r' + data.value + '%' + '|cff00ff00点法术爆伤|r');
                    }

                }
            }
        })

    }
}