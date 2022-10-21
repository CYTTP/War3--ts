import CreeperAttackWaveState from "cyttp/FoeData/enemy/CreeperAttackWaveState";
import UnitUtil from "cyttp/Util/UnitUtil";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import { Trigger } from "solar/w3ts/handles/trigger";
import One_Click_Breakthrough from "./One_Click_Breakthrough";
import TechnologyData from "./TechnologyData";
import UpgradeTechnologyDataConfig from "./UpgradeTechnologyDataConfig";

/**
 * 科技
 */
export default class UpgradeTechnology {
    //  一件突破0   突破1   
    static id = ['A00A', 'A00B']
    //科技boss id
    static boss = [
        'q0tg', 'q0th', 'q0ti', 'q0tj',
        'q0tk', 'q0tl', 'q0tm', 'q0tn',
    ]
    //出怪点 == 
    static rectArray = [gg_rct_p1_sb_chukou, gg_rct_p2_sb_chukou, gg_rct_p3_sb_chukou, gg_rct_p4_sb_chukou]
    constructor() {
        let tri = new Trigger()
        tri.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT)
        tri.addAction(this.action)

        let triiger = new Trigger()
        triiger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
        triiger.addAction(this.action1)

    }

    action(this: void) {
        let u = GetTriggerUnit()
        let p = GetOwningPlayer(u)
        let i = GetPlayerId(p)
        DataBase.getPlayerSolarData(p).科技商店单位 = u
        let resources = [200, 500, 3, 6, 45, 60, 9, 15, 90]
        for (let v in UpgradeTechnologyDataConfig.dataConfig) {
            let data = UpgradeTechnologyDataConfig.dataConfig[v]
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, v);
            if (GetSpellAbilityId() == FourCC(v)) {
                //接受数据
                TechnologyData.Technology_data(p, u, data.name, data.prop)

                if (DataBase.getPlayerSolarData(p).激活科技) {
                    UnitRemoveAbility(u, v)
                    DataBase.getPlayerSolarData(p).激活科技 = false
                }

            }
        }

        //一件激活    9 个等级   //先开放前面6个等级 
        if (GetSpellAbilityId() == FourCC(UpgradeTechnology.id[0])) {

            if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 1) {
                One_Click_Breakthrough.Breakthrough(p, u, 1, resources[0])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 2) {
                One_Click_Breakthrough.Breakthrough(p, u, 1, resources[1])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 3) {
                One_Click_Breakthrough.Breakthrough(p, u, 2, resources[2])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 4) {
                One_Click_Breakthrough.Breakthrough(p, u, 2, resources[3])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 5) {
                One_Click_Breakthrough.Breakthrough(p, u, 3, resources[4])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 6) {
                One_Click_Breakthrough.Breakthrough(p, u, 3, resources[5])
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 2)
            }

        }


        //突破
        if (GetSpellAbilityId() == FourCC(UpgradeTechnology.id[1])) {
            if (GetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1])) == 2) {

                let x = GetRectCenterX(UpgradeTechnology.rectArray[i])
                let y = GetRectCenterY(UpgradeTechnology.rectArray[i])

                if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 1) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[0]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[0], num)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第一层 ');
                } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 2) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[1]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[1], num)
                    //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第二层 ');
                } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 3) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[2]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[2], num)
                    //   DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第三层 ');
                } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 4) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[3]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[3], num)
                    //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第四层 ');
                } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 5) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[4]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[4], num)
                    //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第五层 ');
                } else if (GetUnitAbilityLevel(u, UpgradeTechnology.id[0]) == 6) {
                    let u = CreateUnit(Player(i + 5), FourCC(UpgradeTechnology.boss[5]), x, y, 0)
                    //添加元素抗性
                    let num = GetRandomInt(0, 6)
                    CreeperAttackWaveState.addElementResistance(u, UpgradeTechnology.boss[5], num)
                    //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第六层 ');
                }
                //创建一个特效奥 （看起来逼格高一点） 这个的出怪点的特效
                DestroyEffect(AddSpecialEffect('2500b341e38e4904.mdx', x, y))
                TechnologyData.addTX(u)
                //设置技能等级
                SetUnitAbilityLevel(u, FourCC(UpgradeTechnology.id[1]), 1)
            }
        }
    }
    //死亡事件
    action1(this: void) {
        let u = GetKillingUnit()
        if (!IsHandle(u)) { return }
        let dying = GetUnitTypeId(GetTriggerUnit())
        let p = GetOwningPlayer(u)
        let u2u = DataBase.getPlayerSolarData(p).科技商店单位
        if (dying == FourCC(UpgradeTechnology.boss[0])) {
            SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 2)
            UpgradeTechnology.addAbility(p, 1)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '第二层进来 ');
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '一件突破等级' + GetUnitAbilityLevel(DataBase.getPlayerSolarData(p).科技商店单位, FourCC(UpgradeTechnology.id[0])))
        }
        if (dying == FourCC(UpgradeTechnology.boss[1])) {
            SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 3)
            //DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生进来 ');
            UpgradeTechnology.addAbility(p, 2)

        }
        if (dying == FourCC(UpgradeTechnology.boss[2])) {
            SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 4)
            UpgradeTechnology.addAbility(p, 3)

        }
        if (dying == FourCC(UpgradeTechnology.boss[3])) {
            SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 5)
            UpgradeTechnology.addAbility(p, 4)

        }
        // if (dying == FourCC(UpgradeTechnology.boss[4])) {
        //     SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 6)
        //     UpgradeTechnology.addAbility(p, 5)
        // }

        // if (dying == FourCC(UpgradeTechnology.boss[5])) {
        //     SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 7)
        // }
        // if (dying == FourCC(UpgradeTechnology.boss[6])) {
        //     SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 8)
        // }
        // if (dying == FourCC(UpgradeTechnology.boss[7])) {
        //     SetUnitAbilityLevel(u2u, FourCC(UpgradeTechnology.id[0]), 9)
        // }

    }

    /**
     * 
     * @param p 
     * @param type  等级哦 
     */
    static addAbility(p: player, type: number) {
        let uuu = DataBase.getPlayerSolarData(p).科技商店单位
        if (type == 1) {
            let bai_tu = ['q13l', 'q13m', 'q13n', 'q13o', 'q13p', 'q13q', 'q13r', 'q13s', 'q13t']
            for (let i = 0; i < 9; i++) {
                UnitAddAbility(uuu, FourCC(bai_tu[i]))
            }
        }
        if (type == 2) {
            let tu_sheng = ['q13u', 'q13v', 'q140', 'q141', 'q142', 'q143', 'q144', 'q145', 'q146',]
            for (let i = 0; i < 9; i++) {
                UnitAddAbility(uuu, FourCC(tu_sheng[i]))
            }
        }
        if (type == 3) {
            let sheng_yuan = ['q147', 'q148', 'q149', 'q14a', 'q14b', 'q14c', 'q14d', 'q14e', 'q14f',]
            for (let i = 0; i < 9; i++) {
                UnitAddAbility(uuu, FourCC(sheng_yuan[i]))
            }
        }
        if (type == 4) {
            let zhong_yuan = ['q14g', 'q14h', 'q14i', 'q14j', 'q14k', 'q14l', 'q14m', 'q14n', 'q14o',]
            for (let i = 0; i < 9; i++) {
                UnitAddAbility(uuu, FourCC(zhong_yuan[i]))
            }
        }
        if (type == 5) {
            let jin_sheng = ['q14p', 'q14q', 'q14r', 'q14s', 'q14t', 'q14u', 'q14v', 'q150', 'q151',]
            for (let i = 0; i < 9; i++) {
                UnitAddAbility(uuu, FourCC(jin_sheng[i]))
            }
        }
    }


}