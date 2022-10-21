import DataBase from "solar/common/DataBase"

/****   注意： 需要手动设置 难度系数
**      单位属性 随 ->  难度附加
**     unit：单位， percentage：属性增加的系数  
**/
export default function HoepUnitAttributeDifficultyAdditional(unit: unit, percentage: number[],difficulty) {
    if (!IsHandle(unit)) { return }
    // 需要 获取难度
    
    //     //     percentage[i] = 1 + percentage[i] * difficulty
  
    // 获取新的属性 并且向上取整   攻击 - 生命 - 护甲 
    let attack = Math.ceil(GetUnitState(unit, ConvertUnitState(0x12)) * percentage[0]) * difficulty
    let life = Math.ceil(GetUnitState(unit, UNIT_STATE_MAX_LIFE) * percentage[1]) * difficulty
    let armors = Math.ceil(GetUnitState(unit, ConvertUnitState(0x20)) * percentage[2]) * difficulty
    // 赋予新的属性
    SetUnitState(unit, ConvertUnitState(0x12), attack)
    SetUnitState(unit, UNIT_STATE_MAX_LIFE, life)
    SetUnitState(unit, UNIT_STATE_LIFE, life)
    SetUnitState(unit, ConvertUnitState(0x20), armors)




}
