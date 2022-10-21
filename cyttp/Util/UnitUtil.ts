import { Unit } from "solar/w3ts/handles/unit";


export default class UnitUtil {//单位相关调用
    static cache = []
    /**
     * 单位是否存活
     * @param udw 
     * @returns 
     */
    static IsUnitLive(udw: unit): boolean {
        let IsCH: boolean = true
        let dw = Unit.fromHandle(udw)
        if (dw.getState(UNIT_STATE_LIFE) < 1.0) {//单位生命值低于1就判断死亡
            IsCH = false
        }
        if (dw.isUnitType(UNIT_TYPE_DEAD) == true) {//判断单位是否死亡
            IsCH = false
        }
        return IsCH
    }
    /**
     *创建单位
     */
    public static CreateUnitg(palyer: number, utid: number | string, dwz: group, x: number, y: number, fact: number): unit {
        if (utid == 0) { return; }
        let dw = CreateUnit(Player(palyer), utid, x, y, fact)
        if (dwz != null) { GroupAddUnit(dwz, dw) }//添加单位进入单位组
        return dw
    }
    /**
     *创建多个单位
     */
    public static CreateUnitgs(pid: number, utid: number, dwz: group, x: number, y: number, mxjd: number, num: number) {
        for (let index = 0; index < num; index++) {
            UnitUtil.CreateUnitg(pid, utid, dwz, x, y, mxjd)
        }
    }
    /**
     *单位可飞行
     */
    static UnitFlyEnable(u: unit) {
        UnitAddAbility(u, 'Amrf')
        UnitRemoveAbility(u, 'Amrf')
    }
    /**
     *单位无敌状态
     */
    static IsUnitWD(udw: unit): boolean {
        let is1 = GetUnitAbilityLevel(udw, FourCC('Avul'))
        let is2 = GetUnitAbilityLevel(udw, FourCC('Bvul'))
        return is1 >= 1 || is2 >= 1
    }
    /**
     * 
     * @param u 
     * @param life 
     * @param attack 
     * @param aomor 
     */
    static UnitState(u: unit, life: number, attack: number, armour: number) {
        SetUnitState(u, UNIT_STATE_LIFE, life)
        SetUnitState(u, UNIT_STATE_MAX_LIFE, life)
        SetUnitState(u, ConvertUnitState(0x12), attack)
        SetUnitState(u, ConvertUnitState(0x20), armour)
    }


    /**
       * 适用于做每隔xx秒，触发技能
      * @param playerIndex 玩家索引
      * @param ability_id 技能ID
      * @returns 玩家拥有 天赋技能 的英雄
      */
    static getAbilityHero(playerIndex: number, ability_id: string): unit {
        let cacheUnitHandle = UnitUtil.cache[ability_id + playerIndex];
        //todo 如果删除单位后  此handle可能是另一个新单位
        if (IsHandle(cacheUnitHandle)) {
            return cacheUnitHandle;
        }
        //获取玩家一个英雄
        GroupClear(tempGroup);
        GroupEnumUnitsOfPlayer(tempGroup, Player(playerIndex), null)
        for (let i = 0; i <= 1000000; i++) {
            let unitHandle = FirstOfGroup(tempGroup)
            if (!IsHandle(unitHandle)) {
                break
            }
            if (IsUnitType(unitHandle, UNIT_TYPE_HERO)
                && GetHeroStr(unitHandle, false) > 1
                && !IsUnitType(unitHandle, UNIT_TYPE_PEON)
                && !IsUnitType(unitHandle, UNIT_TYPE_SUMMONED)
                && !IsUnitIllusion(unitHandle)
                && !IsUnitHidden(unitHandle)
                && GetUnitAbilityLevel(unitHandle, FourCC(ability_id)) > 0) {

                //
                UnitUtil.cache[ability_id + playerIndex] = unitHandle;
                return unitHandle;
            }
            GroupRemoveUnit(tempGroup, unitHandle)
        }
        return null;
    }
}
