import { Unit } from "solar/w3ts/handles/unit"


/**
 * 生命值魔法值的操作工具
 * 血量与魔法相关调用
 */
export default class HpMpUtil {
    private static UnitHPtx: string = ""//恢复生命值特效路径
    private static UnitMPtx: string = ""//恢复魔法值特效路径

    /**
     * 
     * @param u 
     * @returns 获取单位魔法值百分比
     */
    public static GetUnitMPBfb(u: unit) {
        let value = GetUnitState(u, UNIT_STATE_MANA)
        let maxValue = GetUnitState(u, UNIT_STATE_MAX_MANA)
        if (u == null || maxValue <= 0) {
            return 1.0
        }
        return value / maxValue
    }
    /**
     * 
     * @param u 
     *  获取单位生命值百分比
     */
    public static GetUnitHPBfb(u: unit) {
        let value = GetUnitState(u, UNIT_STATE_LIFE)
        let maxValue = GetUnitState(u, UNIT_STATE_MAX_LIFE)
        if (u == null || maxValue <= 0) {
            return 1.0
        }
        return value / maxValue
    }
    /**
     * 
     * @param u 
     * @param mpcoe 系数
     * @returns 设置单位魔法值百分比
     */
    public static SetUnitMPBfb(u: unit, mpcoe: number) {//
        if (mpcoe > 0) {
            SetUnitState(u, UNIT_STATE_MANA, GetUnitState(u, UNIT_STATE_MAX_MANA) * mpcoe)
        }
    }
    /**
     * 
     * @param u 
     * @param hpcoe 
     * @returns 设置单位生命值百分比
     */
    public static SetUnitHPBfb(u: unit, hpcoe: number) {
        if (hpcoe > 0) {
            SetUnitState(u, UNIT_STATE_LIFE, GetUnitState(u, UNIT_STATE_MAX_LIFE) * hpcoe)
        }
    }
    /**
     * 
     * @param u 
     * @param mpMax 
     * @returns  设置单位最大魔法值
     */
    public static SetUnitMPMax(u: unit, mpMax: number) {//
        if (mpMax <= 0) { return; }
        let hpblz = HpMpUtil.GetUnitMPBfb(u)//获得单位魔法百分比
        SetUnitState(u, UNIT_STATE_MAX_MANA, mpMax)
        HpMpUtil.SetUnitMPBfb(u, hpblz)
    }
    /**
     * 
     * @param u 
     * @param hpMax 
     * @returns 设置单位最大生命值
     */
    public static SetUnitHPMax(u: unit, hpMax: number) {
        if (hpMax <= 0) { return; }
        let hpblz = HpMpUtil.GetUnitHPBfb(u)//获得单位血量百分比
        SetUnitState(u, UNIT_STATE_MAX_LIFE, hpMax)
        HpMpUtil.SetUnitHPBfb(u, hpblz)
    }
    /**
     * 
     * @param u 
     * @param hp 
     * @param isEffect 
     * @param attachPoint   
     * @returns 固定血量更改
     */
    public static AddUnitHP_SZ(u: unit, hp: number, isEffect: boolean, attachPoint: string) {
        let uHp = 0
        let utdx = Unit.fromHandle(u)
        uHp = utdx.getState(UNIT_STATE_LIFE) + hp
        if (uHp > 0) {
            utdx.setState(UNIT_STATE_LIFE, uHp)
        }
        if (isEffect == true) {
            DestroyEffect(AddSpecialEffectTarget(this.UnitHPtx, u, attachPoint))
        }
    }
    /**
     * 
     * @param u 
     * @param hp 
     * @param isEffect 
     * @param attachPoint 
     * @returns 固定魔法更改
     */
    public static AddUnitMP_SZ(u: unit, hp: number, isEffect: boolean, attachPoint: string) {
        let uMp = 0
        let utdx = Unit.fromHandle(u)
        uMp = utdx.getState(UNIT_STATE_MANA) + hp
        if (uMp > 0) {
            utdx.setState(UNIT_STATE_MANA, uMp)
        }
        if (isEffect == true) {
            DestroyEffect(AddSpecialEffectTarget(this.UnitMPtx, u, attachPoint))
        }
    }
}

