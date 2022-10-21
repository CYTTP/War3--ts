

import Hope_Item from "cyttp/Equipment/Hope_Item"
import Item_UI_Initialization from "cyttp/ItemData/Item_UI_Initialization"
import HoepColorText from "cyttp/Util/HoepColorText"
import HopeNonRepeatingRandom from "cyttp/Util/HopeNonRepeatingRandom"
import NumerivalUtil from "cyttp/Util/NumerivalUtil"
import DataBase from "solar/common/DataBase"
import BaseUtil from "solar/util/BaseUtil"
import TextTagUtil from "solar/util/TextTagUtil"
import { MapPlayer } from "solar/w3ts/handles/player"
import { Trigger } from "solar/w3ts/handles/trigger"


/**
 * 商点十连抽
 */
export default class TenDrawlotteryRaffle {
    static rectArr: rect[] = [gg_rct_p1_equip_zb, gg_rct_p2_equip_zb, gg_rct_p3_equip_zb, gg_rct_p4_equip_zb]
    static switch: Boolean = false
    //一级装备 
    static equipLevel1: string[] = ['q0r5', 'q0r6', 'q0r7', 'q0r8', 'q0r9', 'q0ra', 'q0rb', 'q0rc',
        'q0rd', 'q0re', 'q0rf', 'q0rg', 'q0rh', 'q0ri', 'q0rj',]
    //二级装备
    static equipLevel2: string[] = ['q0rk', 'q0rl', 'q0rm', 'q0rn', 'q0ro', 'q0rp', 'q0rq',
        'q0rr', 'q0rs', 'q0rt', 'q0ru', 'q0rv', 'q0s0', 'q0s1', 'q0s2',]
    //三星装备
    static equipLevel3: string[] = ['q0s3', 'q0s4', 'q0s5', 'q0s6', 'q0s7', 'q0s8', 'q0s9',
        'q0sa', 'q0sb', 'q0sc', 'q0sd', 'q0se', 'q0sf', 'q0sg', 'q0sh',]
    static TX: string = '[TX] (928).mdx'
    static config: {
        [id: string]: {
            name?: string
            limber?: number[],
            str?: number[],
            agi?: number[],
            int?: number[],
            killcount?: number[],
            killAddAttack?: number,
            killAddAgi?: number,
            killAddInt?: number,
            killAddStr?: number,
            gold?: number,
            eq?: number
        }
    } = {
            'I002': {
                name: '初级',
                limber: [5, 20],//5--20
                str: [50, 200], //50-200
                agi: [50, 200],//50-200
                int: [50, 200],//50-200
                killcount: [10, 30],//10-30
                killAddAttack: 2,
                killAddAgi: 1,
                killAddInt: 1,
                killAddStr: 1,
                gold: 1000
            },
            'I001': {
                name: '中级',
                limber: [50, 200],//50--200
                str: [300, 1200], //50-1200
                agi: [300, 1200],//50-1200
                int: [300, 1200],//50-1200
                killcount: [60, 180],//60-180
                killAddAttack: 4,
                killAddAgi: 2,
                killAddInt: 2,
                killAddStr: 2,
                gold: 10000,
                eq: 2,   //二星装备个数
            },
            'I003': {
                name: '高级',
                limber: [50, 200],//50--200
                str: [300, 1200], //50-1200
                agi: [300, 1200],//50-1200
                int: [300, 1200],//50-1200
                killcount: [60, 180],//60-180
                killAddAttack: 6,
                killAddAgi: 3,
                killAddInt: 3,
                killAddStr: 3,
                gold: 10000,
                eq: 3
            },
            'I004': {
                name: '超级',
                limber: [50, 200],//50--200
                str: [300, 1200], //50-1200
                agi: [300, 1200],//50-1200
                int: [300, 1200],//50-1200
                killcount: [60, 180],//60-180
                killAddAttack: 6,
                killAddAgi: 3,
                killAddInt: 3,
                killAddStr: 3,
                gold: 10000,
                eq: 3
            }
        }
    constructor() {
        let tri = new Trigger()
        tri.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SELL_ITEM)
        tri.addAction(this.action)
    }
    static ChargeTemplate(u: unit, x: number, y: number, length: number) {
        NumerivalUtil.HoepAbility_ChargeTemplate(u, x, y, 0, 100, TenDrawlotteryRaffle.TX, undefined, length, 90, 0.03, undefined)
    }
    action(this: void) {
        let soldItem: item = GetSoldItem()
        for (let v in TenDrawlotteryRaffle.config) {
            let data = TenDrawlotteryRaffle.config[v]
            if (GetItemTypeId(soldItem) == FourCC(v)) {
                let u: unit = GetBuyingUnit()
                let uu = GetSellingUnit()
                let p: player = GetOwningPlayer(u)
                let j = GetPlayerId(p)
                let hero: unit = DataBase.getPlayerSolarData(p).创建英雄单位
                if (!IsHandle(u)) { return }
                for (let i = 0; i < 10; i++) {
                    let jilv = GetRandomInt(1, 100)
                    if (true) {
                        if (1 <= jilv && jilv <= 6) {
                            switch (data.name) {
                                case '初级':
                                    let limberR = GetRandomInt(data.limber[0], data.limber[1])
                                    AdjustPlayerStateBJ(limberR, p, PLAYER_STATE_RESOURCE_LUMBER)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + limberR + '|cff00ff00点木材|r');
                                    break;
                                case '中级':
                                    let limberR1 = GetRandomInt(data.limber[0], data.limber[1])
                                    AdjustPlayerStateBJ(limberR1, p, PLAYER_STATE_RESOURCE_LUMBER)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + limberR1 + '|cff00ff00点木材|r');
                                    break;
                                case '高级':
                                    let limberR2 = GetRandomInt(data.limber[0], data.limber[1])
                                    AdjustPlayerStateBJ(limberR2, p, PLAYER_STATE_RESOURCE_LUMBER)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + limberR2 + '|cff00ff00点木材|r');
                                    break;

                            }
                        } else if (6 < jilv && jilv <= 12) {
                            switch (data.name) {
                                case '初级':
                                    let addstr = GetRandomInt(data.str[0], data.str[1])
                                    ModifyHeroStat(bj_HEROSTAT_STR, hero, bj_MODIFYMETHOD_ADD, addstr);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addstr + '|cff00ff00点力量|r');
                                    break;
                                case '中级':
                                    let addstr1 = GetRandomInt(data.str[0], data.str[1])
                                    ModifyHeroStat(bj_HEROSTAT_STR, hero, bj_MODIFYMETHOD_ADD, addstr1);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addstr1 + '|cff00ff00点力量|r');
                                    break;
                                case '高级':
                                    let addstr2 = GetRandomInt(data.str[0], data.str[1])
                                    ModifyHeroStat(bj_HEROSTAT_STR, hero, bj_MODIFYMETHOD_ADD, addstr2);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addstr2 + '|cff00ff00点力量|r');
                                    break;

                            }
                        } else if (12 < jilv && jilv <= 18) {
                            switch (data.name) {
                                case '初级':
                                    let addagi = GetRandomInt(data.agi[0], data.agi[1])
                                    ModifyHeroStat(bj_HEROSTAT_AGI, hero, bj_MODIFYMETHOD_ADD, addagi);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addagi + '|cff00ff00点敏捷|r');
                                    break;
                                case '中级':
                                    let addagi1 = GetRandomInt(data.agi[0], data.agi[1])
                                    ModifyHeroStat(bj_HEROSTAT_AGI, hero, bj_MODIFYMETHOD_ADD, addagi1);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addagi1 + '|cff00ff00点敏捷|r');
                                    break;
                                case '高级':
                                    let addagi2 = GetRandomInt(data.agi[0], data.agi[1])
                                    ModifyHeroStat(bj_HEROSTAT_AGI, hero, bj_MODIFYMETHOD_ADD, addagi2);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addagi2 + '|cff00ff00点敏捷|r');
                                    break;

                            }
                        } else if (18 < jilv && jilv <= 24) {
                            switch (data.name) {
                                case '初级':
                                    let addint = GetRandomInt(data.int[0], data.int[1])
                                    ModifyHeroStat(bj_HEROSTAT_INT, hero, bj_MODIFYMETHOD_ADD, addint);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addint + '|cff00ff00点智力|r');
                                    break;
                                case '中级':
                                    let addint1 = GetRandomInt(data.int[0], data.int[1])
                                    ModifyHeroStat(bj_HEROSTAT_INT, hero, bj_MODIFYMETHOD_ADD, addint1);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addint1 + '|cff00ff00点智力|r');
                                    break;
                                case '高级':
                                    let addint2 = GetRandomInt(data.int[0], data.int[1])
                                    ModifyHeroStat(bj_HEROSTAT_INT, hero, bj_MODIFYMETHOD_ADD, addint2);
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addint2 + '|cff00ff00点智力|r');
                                    break;

                            }
                        } else if (24 < jilv && jilv <= 30) {
                            switch (data.name) {
                                case '初级':
                                    let killcount = GetRandomInt(data.killcount[0], data.killcount[1])
                                    let killNum = MapPlayer.fromHandle(p).solarData.kill_count ? MapPlayer.fromHandle(p).solarData.kill_count : 0
                                    killNum += killcount
                                    MapPlayer.fromHandle(p).solarData.kill_count = killNum
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + killcount + '|cff00ff00杀敌数|r');
                                    break;
                                case '中级':
                                    let killcount1 = GetRandomInt(data.killcount[0], data.killcount[1])
                                    let killNum1 = MapPlayer.fromHandle(p).solarData.kill_count ? MapPlayer.fromHandle(p).solarData.kill_count : 0
                                    killNum1 += killcount1
                                    MapPlayer.fromHandle(p).solarData.kill_count = killNum1
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + killcount1 + '|cff00ff00杀敌数|r');
                                    break;
                                case '高级':
                                    let killcount2 = GetRandomInt(data.killcount[0], data.killcount[1])
                                    let killNum2 = MapPlayer.fromHandle(p).solarData.kill_count ? MapPlayer.fromHandle(p).solarData.kill_count : 0
                                    killNum2 += killcount2
                                    MapPlayer.fromHandle(p).solarData.kill_count = killNum2
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + killcount2 + '|cff00ff00杀敌数|r');
                                    break;

                            }
                        } else if (30 < jilv && jilv <= 36) {
                            switch (data.name) {
                                case '初级':
                                    let agi = DataBase.getUnitSolarData(hero).kill_add_agi ? DataBase.getUnitSolarData(hero).kill_add_agi : 0
                                    agi += data.killAddAgi
                                    DataBase.getUnitSolarData(hero).kill_add_agi = agi
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAgi + '|cff00ff00敏捷|r');
                                    break;
                                case '中级':
                                    let agi1 = DataBase.getUnitSolarData(hero).kill_add_agi ? DataBase.getUnitSolarData(hero).kill_add_agi : 0
                                    agi1 += data.killAddAgi
                                    DataBase.getUnitSolarData(hero).kill_add_agi = agi1
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAgi + '|cff00ff00敏捷|r');
                                    break;
                                case '高级':
                                    let agi2 = DataBase.getUnitSolarData(hero).kill_add_agi ? DataBase.getUnitSolarData(hero).kill_add_agi : 0
                                    agi2 += data.killAddAgi
                                    DataBase.getUnitSolarData(hero).kill_add_agi = agi2
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAgi + '|cff00ff00敏捷|r');
                                    break;

                            }
                        } else if (36 < jilv && jilv <= 41) {
                            switch (data.name) {
                                case '初级':
                                    let str = DataBase.getUnitSolarData(hero).kill_add_str ? DataBase.getUnitSolarData(hero).kill_add_str : 0
                                    str += data.killAddStr
                                    DataBase.getUnitSolarData(hero).kill_add_str = str
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddStr + '|cff00ff00力量|r');
                                    break;
                                case '中级':
                                    let str1 = DataBase.getUnitSolarData(hero).kill_add_str ? DataBase.getUnitSolarData(hero).kill_add_str : 0
                                    str1 += data.killAddStr
                                    DataBase.getUnitSolarData(hero).kill_add_str = str1
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddStr + '|cff00ff00力量|r');
                                    break;
                                case '高级':
                                    let str2 = DataBase.getUnitSolarData(hero).kill_add_str ? DataBase.getUnitSolarData(hero).kill_add_str : 0
                                    str2 += data.killAddStr
                                    DataBase.getUnitSolarData(hero).kill_add_str = str2
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddStr + '|cff00ff00力量|r');
                                    break;

                            }
                        } else if (41 < jilv && jilv <= 46) {
                            switch (data.name) {
                                case '初级':
                                    let int = DataBase.getUnitSolarData(hero).kill_add_int ? DataBase.getUnitSolarData(hero).kill_add_int : 0
                                    int += data.killAddInt
                                    DataBase.getUnitSolarData(hero).kill_add_int = int
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddInt + '|cff00ff00智力|r');
                                    break;
                                case '中级':
                                    let int1 = DataBase.getUnitSolarData(hero).kill_add_int ? DataBase.getUnitSolarData(hero).kill_add_int : 0
                                    int1 += data.killAddInt
                                    DataBase.getUnitSolarData(hero).kill_add_int = int1
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddInt + '|cff00ff00智力|r');
                                    break;
                                case '高级':
                                    let int2 = DataBase.getUnitSolarData(hero).kill_add_int ? DataBase.getUnitSolarData(hero).kill_add_int : 0
                                    int2 += data.killAddInt
                                    DataBase.getUnitSolarData(hero).kill_add_int = int2
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddInt + '|cff00ff00智力|r');
                                    break;

                            }

                        } else if (46 < jilv && jilv <= 51) {
                            switch (data.name) {
                                case '初级':
                                    let attack = DataBase.getUnitSolarData(hero).kill_add_attack ? DataBase.getUnitSolarData(hero).kill_add_attack : 0
                                    attack += data.killAddAttack
                                    DataBase.getUnitSolarData(hero).kill_add_attack = attack
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAttack + '|cff00ff00攻击力|r');
                                    break;
                                case '中级':
                                    let attack1 = DataBase.getUnitSolarData(hero).kill_add_attack ? DataBase.getUnitSolarData(hero).kill_add_attack : 0
                                    attack1 += data.killAddAttack
                                    DataBase.getUnitSolarData(hero).kill_add_attack = attack1
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAttack + '|cff00ff00攻击力|r');
                                    break;
                                case '高级':
                                    let attack2 = DataBase.getUnitSolarData(hero).kill_add_attack ? DataBase.getUnitSolarData(hero).kill_add_attack : 0
                                    attack2 += data.killAddAttack
                                    DataBase.getUnitSolarData(hero).kill_add_attack = attack2
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAttack + '|cff00ff00攻击力|r');
                                    break;

                            }
                        } else if (51 < jilv && jilv <= 61) {
                            switch (data.name) {
                                case '初级':
                                    AdjustPlayerStateBJ(data.gold, p, PLAYER_STATE_RESOURCE_GOLD)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + data.gold + '|cff00ff00点金币|r');
                                    break;
                                case '中级':
                                    AdjustPlayerStateBJ(data.gold, p, PLAYER_STATE_RESOURCE_GOLD)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + data.gold + '|cff00ff00点金币|r');
                                    break;
                                case '高级':
                                    AdjustPlayerStateBJ(data.gold, p, PLAYER_STATE_RESOURCE_GOLD)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + data.gold + '|cff00ff00点金币|r');
                                    break;

                            }
                        } else if (61 < jilv && jilv <= 67) {
                            switch (data.name) {
                                case '初级':

                                    let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                    let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                    let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))
                                    let wps = GetRandomInt(0, TenDrawlotteryRaffle.equipLevel1.length - 1)
                                    TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                    let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel1[wps], x, y, j)
                                    SetItemPlayer(item, p, false)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得1件|r' + HoepColorText('red') + '一' + '|cff00ff00星装备|r');

                                    break;
                                case '中级':
                                    if (true) {
                                        let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                        let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                        let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))
                                        let wps = HopeNonRepeatingRandom(0, TenDrawlotteryRaffle.equipLevel2.length - 1, data.eq)
                                        TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                        for (let k = 0; k < data.eq; k++) {
                                            let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel2[wps[k]], x, y, j)
                                            SetItemPlayer(item, p, false)
                                        }
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得2件|r' + HoepColorText('red') + '二' + '|cff00ff00星装备|r');
                                    }
                                    break;
                                case '高级':
                                    if (true) {
                                        let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                        let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                        let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))

                                        let wps = HopeNonRepeatingRandom(0, TenDrawlotteryRaffle.equipLevel2.length - 1, data.eq)
                                        TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                        for (let k = 0; k < data.eq; k++) {
                                            let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel2[wps[k]], x, y, j)

                                            SetItemPlayer(item, p, false)
                                        }
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得3件|r' + HoepColorText('red') + '二' + '|cff00ff00星装备|r');

                                    }
                                    break;

                            }
                        } else if (67 < jilv && jilv <= 70) {
                            switch (data.name) {
                                case '初级':
                                    if (true) {
                                        let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                        let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                        let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))

                                        let wps = GetRandomInt(0, TenDrawlotteryRaffle.equipLevel2.length - 1)
                                        TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                        let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel2[wps], x, y, j)

                                        SetItemPlayer(item, p, false)
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得1件|r' + HoepColorText('red') + '二' + '|cff00ff00星装备|r');

                                    }
                                    break;
                                case '中级':
                                    if (true) {
                                        let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                        let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                        let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))

                                        let wps = GetRandomInt(0, TenDrawlotteryRaffle.equipLevel3.length - 1)
                                        TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                        let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel3[wps], x, y, j)

                                        SetItemPlayer(item, p, false)
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得1件|r' + HoepColorText('red') + '三' + '|cff00ff00星装备|r');
                                    }

                                    break;
                                case '高级':
                                    if (true) {
                                        let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                        let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                        let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))
                                        let wps = GetRandomInt(0, TenDrawlotteryRaffle.equipLevel3.length - 1)
                                        TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                        let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel3[wps], x, y, j)
                                        SetItemPlayer(item, p, false)
                                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得1件|r' + HoepColorText('red') + '三' + '|cff00ff00星装备|r');

                                    }
                                    break;


                            }
                        } else {
                            switch (data.name) {
                                case '初级':
                                    (AddSpecialEffectTarget('771200f4ac7d9fe4.mdx', u, 'overhead'))

                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cffa9e9a9很遗憾，什么都没抽到！|r');
                                    break;
                                case '中级':
                                    DestroyEffect(AddSpecialEffectTarget('771200f4ac7d9fe4.mdx', u, 'overhead'))
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cffa9e9a9很遗憾，什么都没抽到！|r');
                                    break;
                                case '高级':
                                    DestroyEffect(AddSpecialEffectTarget('771200f4ac7d9fe4.mdx', u, 'overhead'))
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cffa9e9a9很遗憾，什么都没抽到！|r');
                                    break;

                            }
                        }
                    }
                }

            }
        }

        if (GetItemTypeId(soldItem) == FourCC('I004')) {
            let data = TenDrawlotteryRaffle.config['I004']
            let u: unit = GetBuyingUnit()
            let p: player = GetOwningPlayer(u)
            let uu = GetSellingUnit()
            let j = GetPlayerId(p)
            let hero: unit = DataBase.getPlayerSolarData(p).创建英雄单位
            if (!IsHandle(u)) { return }
            let kill_count = MapPlayer.fromHandle(p).solarData.kill_count ? MapPlayer.fromHandle(p).solarData.kill_count : 0
            if (kill_count >= 688) {
                kill_count -= 688
                MapPlayer.fromHandle(p).solarData.kill_count = kill_count
                for (let i = 0; i < 10; i++) {
                    let jilv = GetRandomInt(1, 100)
                    if (1 <= jilv && jilv <= 6) {
                        switch (data.name) {
                            case '超级':
                                let limberR3 = GetRandomInt(data.limber[0], data.limber[1])
                                AdjustPlayerStateBJ(limberR3, p, PLAYER_STATE_RESOURCE_LUMBER)
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + limberR3 + '|cff00ff00点木材|r');

                                break;
                        }
                    } else if (6 < jilv && jilv <= 12) {
                        switch (data.name) {
                            case '超级':
                                let addstr3 = GetRandomInt(data.str[0], data.str[1])
                                ModifyHeroStat(bj_HEROSTAT_STR, hero, bj_MODIFYMETHOD_ADD, addstr3);
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addstr3 + '|cff00ff00点力量|r');
                                break;
                        }
                    } else if (12 < jilv && jilv <= 18) {
                        switch (data.name) {
                            case '超级':
                                let addagi3 = GetRandomInt(data.agi[0], data.agi[1])
                                ModifyHeroStat(bj_HEROSTAT_AGI, hero, bj_MODIFYMETHOD_ADD, addagi3);
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addagi3 + '|cff00ff00点敏捷|r');

                                break;
                        }
                    } else if (18 < jilv && jilv <= 24) {
                        switch (data.name) {
                            case '超级':
                                let addint3 = GetRandomInt(data.int[0], data.int[1])
                                ModifyHeroStat(bj_HEROSTAT_INT, hero, bj_MODIFYMETHOD_ADD, addint3);
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + addint3 + '|cff00ff00点智力|r');
                                break;
                        }
                    } else if (24 < jilv && jilv <= 30) {
                        switch (data.name) {
                            case '超级':
                                let killcount3 = GetRandomInt(data.killcount[0], data.killcount[1])
                                let killNum3 = MapPlayer.fromHandle(p).solarData.kill_count ? MapPlayer.fromHandle(p).solarData.kill_count : 0
                                killNum3 += killcount3
                                MapPlayer.fromHandle(p).solarData.kill_count = killNum3
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + killcount3 + '|cff00ff00杀敌数|r');
                                break;
                        }
                    } else if (30 < jilv && jilv <= 36) {
                        switch (data.name) {
                            case '超级':
                                let agi3 = DataBase.getUnitSolarData(hero).kill_add_agi ? DataBase.getUnitSolarData(hero).kill_add_agi : 0
                                agi3 += data.killAddAgi
                                DataBase.getUnitSolarData(hero).kill_add_agi = agi3
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAgi + '|cff00ff00敏捷|r');

                                break;
                        }
                    } else if (36 < jilv && jilv <= 41) {
                        switch (data.name) {
                            case '超级':
                                let str3 = DataBase.getUnitSolarData(hero).kill_add_str ? DataBase.getUnitSolarData(hero).kill_add_str : 0
                                str3 += data.killAddStr
                                DataBase.getUnitSolarData(hero).kill_add_str = str3
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddStr + '|cff00ff00力量|r');
                                break;
                        }
                    } else if (41 < jilv && jilv <= 46) {
                        switch (data.name) {
                            case '超级':
                                let int3 = DataBase.getUnitSolarData(hero).kill_add_int ? DataBase.getUnitSolarData(hero).kill_add_int : 0
                                int3 += data.killAddInt
                                DataBase.getUnitSolarData(hero).kill_add_int = int3
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddInt + '|cff00ff00智力|r');

                                break;
                        }

                    } else if (46 < jilv && jilv <= 51) {
                        switch (data.name) {
                            case '超级':
                                let attack3 = DataBase.getUnitSolarData(hero).kill_add_attack ? DataBase.getUnitSolarData(hero).kill_add_attack : 0
                                attack3 += data.killAddAttack
                                DataBase.getUnitSolarData(hero).kill_add_attack = attack3
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌获得|r' + HoepColorText('red') + data.killAddAttack + '|cff00ff00攻击力|r');
                                break;
                        }
                    } else if (51 < jilv && jilv <= 61) {
                        switch (data.name) {
                            case '超级':
                                AdjustPlayerStateBJ(data.gold, p, PLAYER_STATE_RESOURCE_GOLD)
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得|r' + HoepColorText('red') + data.gold + '|cff00ff00点金币|r');
                                break;
                        }
                    } else if (61 < jilv && jilv <= 67) {
                        switch (data.name) {
                            case '超级':
                                if (true) {

                                    let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                    let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                    let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))
                                    let wps = HopeNonRepeatingRandom(0, TenDrawlotteryRaffle.equipLevel2.length - 1, data.eq)
                                    TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                    for (let k = 0; k < data.eq; k++) {
                                        let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel2[wps[k]], x, y, j)
                                        SetItemPlayer(item, p, false)
                                    }
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得3件|r' + HoepColorText('red') + '二' + '|cff00ff00星装备|r');
                                }
                                break;
                        }
                    } else if (67 < jilv && jilv <= 70) {
                        switch (data.name) {
                            case '超级':
                                if (true) {
                                    let x = GetRandomReal(GetRectMinX(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxX(TenDrawlotteryRaffle.rectArr[j]))
                                    let y = GetRandomReal(GetRectMinY(TenDrawlotteryRaffle.rectArr[j]), GetRectMaxY(TenDrawlotteryRaffle.rectArr[j]))
                                    let dis = R2I(NumerivalUtil.GetLocDistance(GetUnitX(uu), GetUnitY(uu), x, y))
                                    let wps = GetRandomInt(0, TenDrawlotteryRaffle.equipLevel3.length - 1)
                                    TenDrawlotteryRaffle.ChargeTemplate(uu, x, y, dis)
                                    let item = Hope_Item.Create_Item(TenDrawlotteryRaffle.equipLevel3[wps], x, y, j)
                                    SetItemPlayer(item, p, false)
                                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00获得1件|r' + HoepColorText('red') + '三' + '|cff00ff00星装备|r');
                                }
                                break;
                        }
                    } else {
                        switch (data.name) {
                            case '超级':
                                DestroyEffect(AddSpecialEffectTarget('771200f4ac7d9fe4.mdx', u, 'overhead'))
                                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cffa9e9a9很遗憾，什么都没抽到！|r');
                                break;
                        }
                    }
                }
            } else {
                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cffa9e9a9杀敌数不足！|r');

            }

        }

    }
}