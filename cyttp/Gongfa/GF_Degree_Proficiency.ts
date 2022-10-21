import ConencondUtil from "cyttp/Util/ConencondUtil";
import DataBase from "solar/common/DataBase"
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger"
import { Unit } from "solar/w3ts/handles/unit";
import GFDegreeProficiencyDataConfig from "./GFDegreeProficiencyDataConfig";
/**
 * 功法熟练度
 */
export default class GF_Degree_Proficiency {
    //熟练度
    static k: number = 0
    //灵气
    static L: number = 0
    static Attribute: number[] = [100, 200, 400, 800, 1600, 3200, 6400, 12800,]
    // 熟练度加成表
    static shu_lian_du_table: { [level: number]: number } = {
        1: 0.09,
        2: 0.16,
        3: 0.25,
        4: 0.36,
        5: 0.49,
        6: 0.64,
        7: 0.81,
        8: 1
    }
    // lingqi
    static ling_qi_table: { [level: number]: number } = {
        1: 0.09,
        2: 0.16,
        3: 0.25,
        4: 0.36,
        5: 0.49,
        6: 0.64,
        7: 0.81,
        8: 1
    }

    static pinz: { [level: string]: number } = {
        '绿': 3,
        '蓝': 7,
        '红': 13,
        '橙': 19,
    }

    // 攻击增加熟练度
    static attackUp(u: unit, p: player) {
        let solarData = MapPlayer.fromHandle(p).solarData;
        let all = solarData.功法熟练度总量;
        if (all) {
            all = all + GF_Degree_Proficiency.Proficiency_Add(DataBase.getUnitSolarData(u).功法熟练度等级, 5)
        } else {
            all = 0;
        }
        solarData.功法熟练度总量 = all
        GF_Degree_Proficiency.GF_Proficiency(u, 1, p)
        DisplayTimedTextToPlayer(p, 0, 0, 60, '攻击增加熟练度' + MapPlayer.fromHandle(p).solarData.功法熟练度总量);
        let lingqi = MapPlayer.fromHandle(p).solarData;
        let lq = lingqi.灵气总量;
        if (lq) {
            lq = lq + GF_Degree_Proficiency.Reiki_Acquisition_Rate(DataBase.getUnitSolarData(u).功法熟练度等级, MapPlayer.fromHandle(p).solarData.灵气值)
        } else {
            lq = 0;
        }
        solarData.灵气总量 = lq
        DisplayTimedTextToPlayer(p, 0, 0, 60, '攻击增加灵气' + MapPlayer.fromHandle(p).solarData.灵气总量);
    }

    //杀敌增加熟练度
    static killUp(u: unit, p: player) {
        let solarData = MapPlayer.fromHandle(p).solarData;
        let all = solarData.功法熟练度总量;
        if (all) {
            all = all + GF_Degree_Proficiency.Proficiency_Add(DataBase.getUnitSolarData(u).功法熟练度等级, 4)
        } else {
            all = 0;
        }
        solarData.功法熟练度总量 = all
        GF_Degree_Proficiency.GF_Proficiency(u, 2, p)
        //  DisplayTimedTextToPlayer(p, 0, 0, 60, '杀敌增加熟练度' + MapPlayer.fromHandle(p).solarData.功法熟练度总量);
        let lingqi = MapPlayer.fromHandle(p).solarData;
        let lq = lingqi.灵气总量;
        if (lq) {
            lq = lq + GF_Degree_Proficiency.Reiki_Acquisition_Rate(DataBase.getUnitSolarData(u).功法熟练度等级, MapPlayer.fromHandle(p).solarData.灵气值)
        } else {
            lq = 0;
        }
        solarData.灵气总量 = lq
        // DisplayTimedTextToPlayer(p, 0, 0, 60, '攻击增加灵气' + MapPlayer.fromHandle(p).solarData.灵气总量);
    }

    //施放技能增加熟练度
    static spellAbUp(u: unit, p: player) {
        let solarData = MapPlayer.fromHandle(p).solarData;
        let all = solarData.功法熟练度总量;
        if (all) {
            all = all + GF_Degree_Proficiency.Proficiency_Add(DataBase.getUnitSolarData(u).功法熟练度等级, 4)
        } else {
            all = 0;
        }
        solarData.功法熟练度总量 = all
        GF_Degree_Proficiency.GF_Proficiency(u, 3, p)
        let lingqi = MapPlayer.fromHandle(p).solarData;
        let lq = lingqi.灵气总量;
        if (lq) {
            lq = lq + GF_Degree_Proficiency.Reiki_Acquisition_Rate(DataBase.getUnitSolarData(u).功法熟练度等级, MapPlayer.fromHandle(p).solarData.灵气值)
        } else {
            lq = 0;
        }
        solarData.灵气总量 = lq
    }
    //技能造成伤害增加熟练度
    static abDamgeUp(u: unit, p: player) {
        let solarData = MapPlayer.fromHandle(p).solarData;
        let all = solarData.功法熟练度总量;
        if (all) {
            all = all + GF_Degree_Proficiency.Proficiency_Add(DataBase.getUnitSolarData(u).功法熟练度等级, 4)
        } else {
            all = 0;
        }
        solarData.功法熟练度总量 = all
        GF_Degree_Proficiency.GF_Proficiency(u, 4, p)
        let lingqi = MapPlayer.fromHandle(p).solarData;
        let lq = lingqi.灵气总量;
        if (lq) {
            lq = lq + GF_Degree_Proficiency.Reiki_Acquisition_Rate(DataBase.getUnitSolarData(u).功法熟练度等级, MapPlayer.fromHandle(p).solarData.灵气值)
        } else {
            lq = 0;
        }
        solarData.灵气总量 = lq
    }
    //造成任意伤害增加熟练度
    static DamgeUp(u: unit, p: player) {
        let solarData = MapPlayer.fromHandle(p).solarData;
        let all = solarData.功法熟练度总量;
        if (all) {
            all = all + GF_Degree_Proficiency.Proficiency_Add(DataBase.getUnitSolarData(u).功法熟练度等级, 4)
        } else {
            all = 0;
        }
        solarData.功法熟练度总量 = all
        GF_Degree_Proficiency.GF_Proficiency(u, 5, p)
        let lingqi = MapPlayer.fromHandle(p).solarData;
        let lq = lingqi.灵气总量;
        if (lq) {
            lq = lq + GF_Degree_Proficiency.Reiki_Acquisition_Rate(DataBase.getUnitSolarData(u).功法熟练度等级, MapPlayer.fromHandle(p).solarData.灵气值)
        } else {
            lq = 0;
        }
        solarData.灵气总量 = lq
    }

    //属性加成
    static AttributeAdd(u: unit, value: number,) {
        ModifyHeroStat(bj_HEROSTAT_STR, u, bj_MODIFYMETHOD_ADD, GF_Degree_Proficiency.Attribute[value]);
        ModifyHeroStat(bj_HEROSTAT_AGI, u, bj_MODIFYMETHOD_ADD, GF_Degree_Proficiency.Attribute[value]);
        ModifyHeroStat(bj_HEROSTAT_INT, u, bj_MODIFYMETHOD_ADD, GF_Degree_Proficiency.Attribute[value]);
    }
    /**
     * 
     * @param u 单位
     * @param type 功法获取类型
     */
    static GF_Proficiency(u: unit, type: number, p: player) {
        let data = GFDegreeProficiencyDataConfig.config
        // let skill_level = DataBase.getUnitSolarData(u).功法熟练度等级 ? DataBase.getUnitSolarData(u).功法熟练度等级 : 1
        //let flg = DataBase.getUnitSolarData(u).功法熟练度等级
        if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][8]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 10
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '主宰'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][7]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 9
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '规则'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][6]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 8
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '神话'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][5]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 7
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '传说'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][4]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 6
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '资深'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][3]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 5
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '专业'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][2]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 4
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '精通'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][1]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 3
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '熟悉'
        }
        else if (MapPlayer.fromHandle(p).solarData.功法熟练度总量 >= data.gong_fa_inAll[type][0]) {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 2
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '入门'
        } else {
            DataBase.getUnitSolarData(u).功法熟练度等级 = 1
            MapPlayer.fromHandle(p).solarData.功法熟练度等级名称 = '初始'
        }

        // 条件下添加属性
        if (DataBase.getUnitSolarData(u).功法熟练度等级 == 2) {
            if (!Unit.fromHandle(u).solarData.属性加成一次1) {
                GF_Degree_Proficiency.AttributeAdd(u, 0)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'fg********');
                Unit.fromHandle(u).solarData.属性加成一次1 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 3) {
            if (!Unit.fromHandle(u).solarData.属性加成一次2) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次2 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 4) {
            if (!Unit.fromHandle(u).solarData.属性加成一次3) {
                GF_Degree_Proficiency.AttributeAdd(u, 2)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次3 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 5) {
            if (!Unit.fromHandle(u).solarData.属性加成一次4) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次4 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 6) {
            if (!Unit.fromHandle(u).solarData.属性加成一次5) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次5 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 7) {
            if (!Unit.fromHandle(u).solarData.属性加成一次6) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次6 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 8) {
            if (!Unit.fromHandle(u).solarData.属性加成一次7) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次7 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 9) {
            if (!Unit.fromHandle(u).solarData.属性加成一次8) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次8 = true
            }
        } else if (DataBase.getUnitSolarData(u).功法熟练度等级 == 10) {
            if (!Unit.fromHandle(u).solarData.属性加成一次9) {
                GF_Degree_Proficiency.AttributeAdd(u, 1)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'f++3333++');
                Unit.fromHandle(u).solarData.属性加成一次9 = true
            }
        }
    }

    /**
     * 熟练度加成
     * @param level 
     * @returns 
     */
    static Proficiency_Add(level: number, value: number): number {
        let add = GF_Degree_Proficiency.shu_lian_du_table[level - 1] || 0
        let add_num = value * (1 + add)
        return add_num
    }
    /**
     * 灵气获取率
     * level  等级
     * value  灵气数量  根据品质增长
     */
    static Reiki_Acquisition_Rate(level: number, value: number): number {
        let lq = GF_Degree_Proficiency.ling_qi_table[level] || 0
        let lq_num = value * (1 + lq)
        return lq_num
    }
    /**
     * 继承熟练度
     */
    static inherit_Proficiency(num: number): number {
        if (num == null) { return }
        let value = num * 0.5
        return value

    }
}
