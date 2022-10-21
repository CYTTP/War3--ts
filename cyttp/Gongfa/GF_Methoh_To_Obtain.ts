import Hope_Item from "cyttp/Equipment/Hope_Item";
import HoepColorText from "cyttp/Util/HoepColorText";
import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { Trigger } from "solar/w3ts/handles/trigger";

export default class GF_Methoh_To_Obtain {
    static rect = [gg_rct_p1_equip_gf, gg_rct_p2_equip_gf, gg_rct_p3_equip_gf, gg_rct_p4_equip_gf]
    static config: {
        // 功法配置表
        ability_table: { [type: string]: string[] }
    } = {
            // 功法配置表   前面的是触发几率
            ability_table: {
                '绿': [
                    'q0to', 'q0tp', 'q0tq', 'q0tr', 'q0ts',
                    'q0tt', 'q0tu', 'q0tv', 'q0u0', 'q0u1',
                    'q0u2', 'q0u3', 'q0u4', 'q0u5', 'q0u6',
                    'q0u7', 'q0u8', 'q0u9', 'q0ua', 'q0ub',
                    'q0uc', 'q0ud', 'q0ue', 'q0uf', 'q0ug',
                ],
                '蓝': [
                    'q0uh', 'q0ui', 'q0uj', 'q0ul', 'q0um',
                    'q0un', 'q0uo', 'q0up', 'q0uq', 'q0ur',
                    'q0us', 'q0ut', 'q0uu', 'q0uv', 'q0v0',
                    'q0v1', 'q0v2', 'q0v3', 'q0v4', 'q0v5',
                    'q0v6', 'q0v7', 'q0v8', 'q0v9', 'q0uk'
                ],
                '红': [
                    'q0va', 'q0vb', 'q0vc', 'q0vd', 'q0ve',
                    'q0vf', 'q0vg', 'q0vh', 'q0vi', 'q0vj',
                    'q0vk', 'q0vl', 'q0vm', 'q0vn', 'q0vo',
                    'q0vp', 'q0vq', 'q0vr', 'q0vs', 'q0vt',
                    'q0vu', 'q0vv', 'q100', 'q101', 'q102',
                ],
                '橙': [
                    'q103', 'q104', 'q105', 'q106', 'q107',
                    'q108', 'q109', 'q10a', 'q10b', 'q10c',
                    'q10d', 'q10e', 'q10f', 'q10g', 'q10h',
                    'q10i', 'q10j', 'q10k', 'q10l', 'q10m',
                    'q10n', 'q10o', 'q10p', 'q10q', 'q10r',
                ],
            },
        };
    constructor() {
        let trigger = new Trigger();
        trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
        trigger.addCondition(Condition(() => {
            return DataBase.getPlayerSolarData(Player(0)).游戏开始 == true
        }))
        trigger.addAction(this.action);
    };
    action(this: void) {
        let uu = GetKillingUnit()
        if (!IsHandle(uu)) { return }
        let player = GetOwningPlayer(uu)
        let index = GetPlayerId(player)
        SelectUtil.forPlayerUnits(u => {
            if (IsUnitType(uu, UNIT_TYPE_HERO) == true && u == uu) {
                let rand = GetRandomInt(1, 1000)
                let data = GF_Methoh_To_Obtain.config.ability_table['绿']
                let data1 = GF_Methoh_To_Obtain.config.ability_table['蓝']
                let data2 = GF_Methoh_To_Obtain.config.ability_table['红']
                let data3 = GF_Methoh_To_Obtain.config.ability_table['橙']
                // DisplayTimedTextToPlayer(player, 0, 0, 60, '这个是不是同时触发，是bug');
                let x = GetRandomReal(GetRectMinX(GF_Methoh_To_Obtain.rect[index]), GetRectMaxX(GF_Methoh_To_Obtain.rect[index]))
                let y = GetRandomReal(GetRectMinY(GF_Methoh_To_Obtain.rect[index]), GetRectMaxY(GF_Methoh_To_Obtain.rect[index]))
                //橙
                if (rand < 5) {
                    let randInt = GetRandomInt(0, data3.length - 1)
                    Hope_Item.Create_Item(data3[randInt], x, y, index)
                    // DisplayTimedTextToPlayer(player, 0, 0, 5, '获得橙品质功法');
                    DisplayTimedTextToPlayer(player, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + '橙' + '|cff00ff00品质功法|r');
                } else if (5 < rand && rand < 15) {
                    let randInt = GetRandomInt(0, data2.length - 1)
                    Hope_Item.Create_Item(data2[randInt], x, y, index)
                    // DisplayTimedTextToPlayer(player, 0, 0, 5, '获得红品质功法');
                    DisplayTimedTextToPlayer(player, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + '红' + '|cff00ff00品质功法|r');
                } else if (15 < rand && rand <= 45) {
                    let randInt = GetRandomInt(0, data1.length - 1)
                    Hope_Item.Create_Item(data1[randInt], x, y, index)
                    // DisplayTimedTextToPlayer(player, 0, 0, 5, '获得蓝品质功法');
                    DisplayTimedTextToPlayer(player, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + '蓝' + '|cff00ff00品质功法|r');
                } else if (45 < rand && rand <= 95) {
                    let randInt = GetRandomInt(0, data.length - 1)
                    Hope_Item.Create_Item(data[randInt], x, y, index)
                    // DisplayTimedTextToPlayer(player, 0, 0, 5, '获得绿品质功法');
                    DisplayTimedTextToPlayer(player, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + '绿' + '|cff00ff00品质功法|r');
                }
            }
        }, index)

    }
}