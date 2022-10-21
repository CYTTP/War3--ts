
import DataBase from "solar/common/DataBase";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";
import ObjectDataUtil from "solar/util/ObjectDataUtil";
import GF_Degree_Proficiency from "./GF_Degree_Proficiency";
import Hope_Item from "cyttp/Equipment/Hope_Item";


/**
 * 功法被使用
 */
export default class GF_Is_Used {


    static config: {
        gong_fa?: { [level: number]: string[] },
        gong_fa_ability?: { [level: number]: string[] },
    } = {
            // 功法id
            gong_fa: {
                1: [
                    'q0to', 'q0tp', 'q0tq', 'q0tr', 'q0ts',
                    'q0tt', 'q0tu', 'q0tv', 'q0u0', 'q0u1',
                    'q0u2', 'q0u3', 'q0u4', 'q0u5', 'q0u6',
                    'q0u7', 'q0u8', 'q0u9', 'q0ua', 'q0ub',
                    'q0uc', 'q0ud', 'q0ue', 'q0uf', 'q0ug',
                ],
                2: [
                    'q0uh', 'q0ui', 'q0uj', 'q0uk', 'q0ul',
                    'q0um', 'q0un', 'q0uo', 'q0up', 'q0uq',
                    'q0ur', 'q0us', 'q0ut', 'q0uu', 'q0uv',
                    'q0v0', 'q0v1', 'q0v2', 'q0v3', 'q0v4',
                    'q0v5', 'q0v6', 'q0v7', 'q0v8', 'q0v9',
                ],
                3: [
                    'q0va', 'q0vb', 'q0vc', 'q0vd', 'q0ve',
                    'q0vf', 'q0vg', 'q0vh', 'q0vi', 'q0vj',
                    'q0vk', 'q0vl', 'q0vm', 'q0vn', 'q0vo',
                    'q0vp', 'q0vq', 'q0vr', 'q0vs', 'q0vt',
                    'q0vu', 'q0vv', 'q100', 'q101', 'q102',
                ],
                4: [
                    'q103', 'q104', 'q105', 'q106', 'q107',
                    'q108', 'q109', 'q10a', 'q10b', 'q10c',
                    'q10d', 'q10e', 'q10f', 'q10g', 'q10h',
                    'q10i', 'q10j', 'q10k', 'q10l', 'q10m',
                    'q10n', 'q10o', 'q10p', 'q10q', 'q10r',
                ],
            },
            gong_fa_ability: {
                1: [
                    'q01u', 'q01v', 'q020', 'q021', 'q022',
                    'q023', 'q024', 'q025', 'q026', 'q027',
                    'q124', 'q125', 'q126', 'q127', 'q128',
                    'q129', 'q12a', 'q12b', 'q12c', 'q12d',
                    'q028', 'q029', 'q02a', 'q02b', 'q02c',
                ],
                2: [
                    'q02d', 'q02e', 'q02f', 'q02g', 'q02h',
                    'q02i', 'q02j', 'q02k', 'q02l', 'q110',
                    'q12e', 'q12f', 'q12g', 'q12h', 'q12i',
                    'q12j', 'q12k', 'q12l', 'q12m', 'q12n',
                    'q111', 'q112', 'q113', 'q114', 'q115',
                ],
                3: [
                    'q116', 'q117', 'q118', 'q119', 'q11a',
                    'q11b', 'q11c', 'q11d', 'q11e', 'q11f',
                    'q12o', 'q12p', 'q12q', 'q12r', 'q12s',
                    'q12t', 'q12u', 'q12v', 'q130', 'q131',
                    'q11g', 'q11h', 'q11i', 'q11j', 'q11k',
                ],
                4: [
                    'q11l', 'q11m', 'q11n', 'q11o', 'q11p',
                    'q11q', 'q11r', 'q11s', 'q11t', 'q11u',
                    'q132', 'q133', 'q134', 'q135', 'q136',
                    'q137', 'q138', 'q139', 'q13a', 'q13b',
                    'q11v', 'q120', 'q121', 'q122', 'q123',
                ],
            }
        };

    constructor() {
        let trigger = new Trigger()
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_USE_ITEM)
        trigger.addAction(this.action)
    }

    action(this: void) {
        let u = GetTriggerUnit()
        let p = GetOwningPlayer(u)
        if (IsUnitType(u, UNIT_TYPE_HERO)) {
            // DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 10, '进来*****');
            let hero = DataBase.getPlayerSolarData(p).创建英雄单位
            if (hero == null) { return }
            let item_id = id2string(GetItemTypeId(GetManipulatedItem()))
            let name = GetItemName(GetManipulatedItem())
            // DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 10, item_id);
            let data = GF_Is_Used.config
            let flg = false
            for (let K in data.gong_fa) {
                if (flg) { break }
                let array = data.gong_fa[K]
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == item_id) {
                        let level = DataBase.getUnitSolarData(hero).功法等级 ? DataBase.getUnitSolarData(hero).功法等级 : 0
                        //  DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 10, 'level' + level);
                        // let ling_qi = DataBase.getUnitSolarData(u).修仙灵气值 ? DataBase.getUnitSolarData(u).修仙灵气值 : 0
                        let kk = S2I(K)
                        // 判断 是否 覆盖 技能
                        if (level < kk) {
                            DataBase.getUnitSolarData(hero).功法等级 = kk
                            // DataBase.getUnitSolarData(hero).功法名字 = name
                            // DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 10, '功法等级kk22=' + kk);
                            //  删除 之前的 低级技能
                            let ability_id = DataBase.getUnitSolarData(hero).功法技能ID ? DataBase.getUnitSolarData(hero).功法技能ID : false
                            if (ability_id) {
                                let Untips_id = ObjectDataUtil.getAbilityDataString(ability_id, 'Untip')
                                let EditorSuffix = ObjectDataUtil.getAbilityDataString(ability_id, 'EditorSuffix')
                                UnitRemoveAbility(hero, FourCC(ability_id))
                                MapPlayer.fromHandle(p).solarData.被删除功法 = Untips_id
                                MapPlayer.fromHandle(p).solarData.功法品阶 = EditorSuffix
                            }
                            // 功法等级小于使用的功法- 添加功法技能
                            let ability = data.gong_fa_ability[kk][i]
                            // let ab_name = GetAbilityName(FourCC(ability))
                            //获取当前技能的物遍
                            let Untips = ObjectDataUtil.getAbilityDataString(ability, 'Untip')
                            let EditorSuffix = ObjectDataUtil.getAbilityDataString(ability, 'EditorSuffix')
                            if (Untips != MapPlayer.fromHandle(p).solarData.被删除功法) {
                                MapPlayer.fromHandle(p).solarData.功法继承 = true
                                MapPlayer.fromHandle(p).solarData.功法熟练度总量 = GF_Degree_Proficiency.inherit_Proficiency(MapPlayer.fromHandle(p).solarData.功法熟练度总量)
                            }
                            if (EditorSuffix != MapPlayer.fromHandle(p).solarData.功法品阶) {
                                for (let v in GF_Degree_Proficiency.pinz) {
                                    let data = GF_Degree_Proficiency.pinz[v]
                                    if (EditorSuffix == v) {
                                        MapPlayer.fromHandle(p).solarData.灵气值 = data
                                        //DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 10, '苏州=' + MapPlayer.fromHandle(p).solarData.灵气值);
                                    }
                                }
                            }
                            Hope_Item.Remove_Item(GetManipulatedItem())
                            UnitAddAbility(hero, FourCC(ability))
                            DataBase.getUnitSolarData(hero).功法技能ID = ability
                            flg = true
                            break
                        } else {
                            DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00你已学习高品质功法|r');
                        }
                    }
                }
            }
        }
    }
}