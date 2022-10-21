import BaseUtil from "solar/util/BaseUtil";
import { MapPlayer } from "solar/w3ts/handles/player";
import TechnologyData from "./TechnologyData";

/**
 * 一键激活
 */
export default class One_Click_Breakthrough {
    /**
     * This is the command string, which must be the same as the command of the material series and in the same order
     */
    static idOrder = [
        'darkconversion',
        'doom',
        'darkritual',
        'darksummoning',
        'deathanddecay',
        'deathcoil',
        'deathpact',
        'decouple',
        'defend'
    ]
    /**
     * 
     * @param p 
     * @param u 
     * @param type  1 为金币 2为木材 3为杀敌数
     * @param value 
     * @returns 
     */
    static Breakthrough(p: player, u: unit, type: number, value: number) {
        //金币
        if (type == 1) {
            if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[0])
            } else {
                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                return
            }
        } else if (type == 2) {
            if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[0])
            } else {
                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                return
            }
        } else if (type == 3) {   /// 杀敌数
            if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[0])
            } else {
                DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                return
            }
        }

        BaseUtil.onTimer(0.4, (count) => {
            if (count == 1) {
                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[1])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[1])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[1])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
            }
            if (count == 2) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[2])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[2])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[2])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }
            if (count == 3) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[3])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[3])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[3])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }
            if (count == 4) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[4])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[4])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[4])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }
            if (count == 5) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[5])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[5])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[5])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }
            if (count == 6) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[6])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[6])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[6])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }
            if (count == 7) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[7])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[7])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[7])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false
            }
            if (count == 8) {

                if (type == 1) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_GOLD) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[8])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00金币不足|r');
                        return
                    }
                } else if (type == 2) {
                    if (GetPlayerState(p, PLAYER_STATE_RESOURCE_LUMBER) > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[8])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00木材不足|r');
                        return
                    }
                } else if (type == 3) {   /// 杀敌数
                    if (MapPlayer.fromHandle(p).solarData.kill_count > value) {

                        IssueImmediateOrder(u, One_Click_Breakthrough.idOrder[8])
                    } else {
                        DisplayTimedTextToPlayer(p, 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00杀敌数不足|r');
                        return
                    }
                }
                // return false

            }

            return true
        })

    }
}