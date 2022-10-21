import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { MapPlayer } from "solar/w3ts/handles/player";

export default class TechnologyData {

    /**
     * 
     * @param p 
     * @param str 
     * @param num 
     * 
     * 配置属性在这个文件里配置
     */

    static Technology_data(p: player, u: unit, str: string, num: number) {
        let resources = [200, 500, 3, 6, 45, 60, 9, 15, 90]
        switch (str) {
            // ------------消耗金币200-----------u:unit,-------------------------------------------
            case '学徒1层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒1层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒2层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒2层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒3层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒3层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒4层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒4层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒5层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒5层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒6层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒6层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒7层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒7层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒8层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒8层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '学徒9层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 200) {
                    DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00学徒9层激活成功！|r');
                    DataBase.getPlayerSolarData(p).激活科技 = true
                    DataBase.getPlayerSolarData(p).激活第9科技 = true
                    TechnologyData.addTX(u)
                    AdjustPlayerStateBJ(-resources[0], p, PLAYER_STATE_RESOURCE_GOLD)
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            //白土-------------消耗金币500----------------------------------------------------------------------
            case '白士1层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白土1层 ');
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士1层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士2层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白土2层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士2层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士3层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士3层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士3层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士4层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士4层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士4层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士5层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士5层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士5层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士6层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士6层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士6层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士7层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士7层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士7层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士8层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士8层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士8层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;
            case '白士9层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '白士9层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > 500) {
                    AdjustPlayerStateBJ(-resources[1], p, PLAYER_STATE_RESOURCE_GOLD)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00白士9层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                }
                break;

            //徒生1层-------------消耗m木材3----------------------------------------------------------------------
            case '徒生1层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生1层 ');
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生1层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生2层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生2层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生2层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生3层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生3层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生3层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生4层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生4层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生4层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }

                break;
            case '徒生5层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生5层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生5层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生6层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生6层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生6层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生7层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生7层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生7层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生8层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生8层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生8层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '徒生9层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '徒生9层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 3) {
                    AdjustPlayerStateBJ(-resources[2], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00徒生9层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            //生员1层-------------消耗m木材6----------------------------------------------------------------------
            case '生员1层':
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员1层 ');
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员1层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员2层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员2层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员2层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员3层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员3层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员3层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员4层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员4层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员4层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员5层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员5层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员5层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员6层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员6层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员6层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员7层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员7层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员7层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员8层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员8层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员8层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            case '生员9层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '生员9层 ');
                if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > 6) {
                    AdjustPlayerStateBJ(-resources[3], p, PLAYER_STATE_RESOURCE_LUMBER)
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00生员9层激活成功！|r');
                        //境界 == 精英上忍
                        if (!DataBase.getPlayerSolarData(p).境界_精英上忍) {
                            let lq = MapPlayer.fromHandle(p).solarData.灵气总量 ? MapPlayer.fromHandle(p).solarData.灵气总量 : 0
                            if (lq >= 3200) {
                                lq -= 3200
                                MapPlayer.fromHandle(p).solarData.灵气总量 = lq
                                AddPlayerTechResearched(p, 'R007', 1)
                                //全属性奖励
                                SelectUtil.forPlayerUnits(unit => {
                                    ModifyHeroStat(bj_HEROSTAT_AGI, unit, bj_MODIFYMETHOD_ADD, 800);
                                    ModifyHeroStat(bj_HEROSTAT_STR, unit, bj_MODIFYMETHOD_ADD, 800);
                                    ModifyHeroStat(bj_HEROSTAT_INT, unit, bj_MODIFYMETHOD_ADD, 800);
                                }, GetPlayerId(p))
                                DataBase.getPlayerSolarData(p).境界_精英上忍 = true
                            }
                        }

                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                }
                break;
            //中员1层-------------消耗杀敌数45----------------------------------------------------------------------
            case '中员1层':
                //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员1层 ' +MapPlayer.fromHandle(p).solarData.kill_count);
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员1层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员2层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员2层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员2层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员3层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员3层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员3层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员4层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员4层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员4层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员5层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员5层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员5层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员6层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员6层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员6层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员7层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员7层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员7层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员8层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员8层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员8层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '中员9层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '中员9层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 45) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 45
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00中员9层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            //进生1层-------------消耗杀敌数60----------------------------------------------------------------------
            case '进生1层':

                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生1层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生1层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生2层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生2层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生2层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生3层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生3层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生3层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生4层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生4层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生4层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生5层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生5层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生5层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生6层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生6层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生6层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生7层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生7层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生7层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生8层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生8层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生8层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
            case '进生9层':
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进生9层 ');
                if (MapPlayer.fromHandle(p).solarData.kill_count > 60) {
                    MapPlayer.fromHandle(p).solarData.kill_count -= 60
                    if (GetRandomInt(1, 100) < num) {
                        DataBase.getPlayerSolarData(p).激活科技 = true
                        TechnologyData.addTX(u)
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '|cff00ff00进生9层激活成功！|r');
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 4, '|cffffff00【系统】|r' + '激活失败');
                    }
                } else {
                    DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                }
                break;
        }
    }

    /**
     * 添加特效 看起来牛逼其实没什么卵用
     * @param u 添加的单位
     */
    static addTX(u: unit) {  //  f0f6c2a62e0c97ad.mdx
        DestroyEffect(AddSpecialEffect('875a8ca69030ea84.mdx', GetUnitX(u), GetUnitY(u)))
    }
}