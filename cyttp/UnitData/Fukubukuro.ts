import DataBase from "solar/common/DataBase";
import { Item } from "solar/w3ts/handles/item";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";

/**
 * 福袋效果  ：任意单位携带福袋，累计击杀200个怪物|n获得{gold}的随机金币奖励
 */
export default class Fukubukuro {


  static killNum = [
    //玩家1  // 分别记录五个不同品质的福袋
    [0, 0, 0, 0, 0,],
    //玩家2
    [0, 0, 0, 0, 0,],
    //玩家3
    [0, 0, 0, 0, 0,],
    //玩家4
    [0, 0, 0, 0, 0],
  ]
  constructor() {
    let trigger = new Trigger()
    trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH)
    trigger.addCondition(Condition(() => {
      return ((DataBase.getPlayerSolarData(GetOwningPlayer(GetKillingUnit())).获得福袋 ? DataBase.getPlayerSolarData(GetOwningPlayer(GetKillingUnit())).获得福袋 : false) == true)
        && (IsUnitEnemy(GetTriggerUnit(), GetOwningPlayer(GetKillingUnit())))
    }))
    trigger.addAction(this.action)

    let trigger1 = new Trigger();
    trigger1.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM)
    trigger1.addAction(() => {
      let wp = GetManipulatedItem()
      let unit = GetTriggerUnit()
      let solarData = DataBase.getPlayerSolarData(GetOwningPlayer(unit))
      //获得福袋
      if (GetItemTypeId(wp) == FourCC('I00A')
        || GetItemTypeId(wp) == FourCC('I00B')
        || GetItemTypeId(wp) == FourCC('I00C')
        || GetItemTypeId(wp) == FourCC('I00D')
        || GetItemTypeId(wp) == FourCC('I00E')
      ) {
        solarData.获得福袋 = true
      }
    })
    let trigger2 = new Trigger();
    trigger2.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DROP_ITEM)
    trigger2.addAction(() => {
      let wp = GetManipulatedItem()
      let unit = GetTriggerUnit()
      let solarData = DataBase.getPlayerSolarData(GetOwningPlayer(unit))
      //丢弃
      if (GetItemTypeId(wp) == FourCC('I00A')
        || GetItemTypeId(wp) == FourCC('I00B')
        || GetItemTypeId(wp) == FourCC('I00C')
        || GetItemTypeId(wp) == FourCC('I00D')
        || GetItemTypeId(wp) == FourCC('I00E')
      ) {

        for (let i = 0; i < 6; i++) {
          let item = UnitItemInSlot(unit, i);
          if (GetItemTypeId(item) == FourCC('I00A')
            || GetItemTypeId(item) == FourCC('I00B')
            || GetItemTypeId(item) == FourCC('I00C')
            || GetItemTypeId(item) == FourCC('I00D')
            || GetItemTypeId(item) == FourCC('I00E')
          ) {
            solarData.获得福袋 = true
          } else {
            solarData.获得福袋 = false
          }
        }
      }
    })
  }


  action(this: void) {
    let u = GetKillingUnit()
    let index = GetPlayerId(GetOwningPlayer(u))
    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '击杀' + Fukubukuro.killNum[index]);
    for (let i = 0; i < 6; i++) {
      let item = UnitItemInSlot(u, i);
      if (GetItemTypeId(item) == FourCC('I00B')) {

        Fukubukuro.killNum[index][0] += 1
        EXSetItemDataString('I00B', 3, '任意单位携带福袋，累计击杀(' + Fukubukuro.killNum[index][0] + '/200)个怪物获得1000-2500的随机金币奖励')

        if (Fukubukuro.killNum[index][0] >= 20) {
          let gold = GetRandomInt(1000, 2500)
          AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
          DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00开启福袋，获得|r' + gold + '|cff00ff00点金币|r');
          RemoveItem(item)
          DataBase.getPlayerSolarData(GetOwningPlayer(u)).获得福袋 = false
          Fukubukuro.killNum[index][0] = 0
        }

      } else if (GetItemTypeId(item) == FourCC('I00A')) {
        Fukubukuro.killNum[index][1] += 1
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '击杀2' + Fukubukuro.killNum[index][1]);
        EXSetItemDataString('I00A', 3, '任意单位携带福袋，累计击杀(' + Fukubukuro.killNum[index][1] + '/200)个怪物获得2000-4000的随机金币奖励')
        if (Fukubukuro.killNum[index][1] >= 200) {
          let gold = GetRandomInt(2000, 4000)
          AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
          DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00开启福袋，获得|r' + gold + '|cff00ff00点金币|r');
          RemoveItem(item)
          DataBase.getPlayerSolarData(GetOwningPlayer(u)).获得福袋 = false
          Fukubukuro.killNum[index][1] = 0
        }

      } else if (GetItemTypeId(item) == FourCC('I00C')) {
        Fukubukuro.killNum[index][2] += 1
        EXSetItemDataString('I00C', 3, '任意单位携带福袋，累计击杀(' + Fukubukuro.killNum[index][2] + '/200)个怪物获得4000-8000的随机金币奖励')
        if (Fukubukuro.killNum[index][2] >= 200) {
          let gold = GetRandomInt(4000, 8000)
          AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
          DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00开启福袋，获得|r' + gold + '|cff00ff00点金币|r');
          RemoveItem(item)
          DataBase.getPlayerSolarData(GetOwningPlayer(u)).获得福袋 = false
          Fukubukuro.killNum[index][2] = 0
        }
      } else if (GetItemTypeId(item) == FourCC('I00D')) {
        Fukubukuro.killNum[index][3] += 1
        EXSetItemDataString('I00D', 3, '任意单位携带福袋，累计击杀(' + Fukubukuro.killNum[index][3] + '/200)个怪物获得8000-16000的随机金币奖励')
        if (Fukubukuro.killNum[index][3] >= 200) {
          let gold = GetRandomInt(8000, 16000)
          AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
          DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00开启福袋，获得|r' + gold + '|cff00ff00点金币|r');
          RemoveItem(item)
          DataBase.getPlayerSolarData(GetOwningPlayer(u)).获得福袋 = false
          Fukubukuro.killNum[index][3] = 0
        }
      } else if (GetItemTypeId(item) == FourCC('I00E')) {
        Fukubukuro.killNum[index][4] += 1
        EXSetItemDataString('I00E', 3, '任意单位携带福袋，累计击杀(' + Fukubukuro.killNum[index][4] + '/200)个怪物获得16000-32000的随机金币奖励')
        if (Fukubukuro.killNum[index][4] >= 200) {
          let gold = GetRandomInt(16000, 32000)
          AdjustPlayerStateBJ(gold, GetOwningPlayer(u), PLAYER_STATE_RESOURCE_GOLD)
          DisplayTimedTextToPlayer(GetOwningPlayer(u), 0, 0, 5, '|cffffff00【系统】|r' + '|cff00ff00开启福袋，获得|r' + gold + '|cff00ff00点金币|r');
          RemoveItem(item)
          DataBase.getPlayerSolarData(GetOwningPlayer(u)).获得福袋 = false
          Fukubukuro.killNum[index][4] = 0
        }
      }
    }

  }



}