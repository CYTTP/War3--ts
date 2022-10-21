/**
 * 选择某一个玩家的敌对单位
 */
export default class SelectEmenyUtil {
    static cache: { [id: string]: any } = {}

    static getAnEmeneyUnit(playerIndex: number, abilityId: string): unit {

        let cacheUnitHandle = SelectEmenyUtil.cache["getAnEmeneyUnit:" + playerIndex];
        //todo 如果删除单位后  此handle可能是另一个新单位
        if (IsHandle(cacheUnitHandle)) {
            return cacheUnitHandle;
        }

        GroupClear(tempGroup);
        GroupEnumUnitsOfPlayer(tempGroup, Player(playerIndex), null)
        for (let i = 0; i <= 1000000; i++) {
            let unitHandle = FirstOfGroup(tempGroup)
            if (!IsHandle(unitHandle)) {
                break
            }
            if (IsUnitType(unitHandle, UNIT_TYPE_UNDEAD)
                && !IsUnitType(unitHandle, UNIT_TYPE_PEON)
                && !IsUnitType(unitHandle, UNIT_TYPE_SUMMONED)
                && !IsUnitIllusion(unitHandle)
                && !IsUnitHidden(unitHandle)
                && GetUnitAbilityLevel(unitHandle, FourCC(abilityId)) > 0
            ) {

                //
                SelectEmenyUtil.cache["getAnEmeneyUnit:" + playerIndex] = unitHandle;
                return unitHandle;
            }
            GroupRemoveUnit(tempGroup, unitHandle)
        }
        return null;
    }
}