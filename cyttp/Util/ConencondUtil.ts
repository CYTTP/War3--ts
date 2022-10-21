/**
 * 获取物编   只能读取物编信息
 */
export default class ConencondUtil {
    /**
     * 获取物编数据（字符串）
     */
    static GetObjectPropertyString(stype: string, otid: number, property: string): string {
        if (GetObjectName(otid) == null) { return; }
        let ret = EXExecuteScript("(require'jass.slk')." + stype + "[" + I2S(otid) + "]." + property)
        return ret
    }
    /**
     * 获取物编数据（整数）
     */
    static GetObjectPropertyInteger(stype: string, otid: number, property: string): number {
        if (GetObjectName(otid) == null) { return 0; }
        let ret = S2I(EXExecuteScript("(require'jass.slk')." + stype + "[" + I2S(otid) + "]." + property))
        return ret
    }

    /**
   * 返回攻击种类
   */
    static GetTheAttackTypeOfTheUnit(utid: number): string {
        let txt = ConencondUtil.GetObjectPropertyString("unit", utid, "atkType1")
        let entry: string = ""
        if (txt == null || txt == "" || txt == "unknown") { entry = "没有" }
        if (txt == "normal") { entry = "普通" }
        if (txt == "pierce") { entry = "穿刺" }
        if (txt == "siege") { entry = "攻城" }
        if (txt == "spells") { entry = "法术" }
        if (txt == "chaos") { entry = "混乱" }
        if (txt == "magic") { entry = "魔法" }
        if (txt == "hero") { entry = "英雄" }
        return entry
    }
    /**
     * 返回护甲种类
     */
    static GetTheArmorTypeOfTheUnit(utid: number): string {
        let txt = ConencondUtil.GetObjectPropertyString("unit", utid, "defType")
        let entry: string = ""
        if (txt == "normal") { entry = "普通" }
        if (txt == "small") { entry = "小型" }
        if (txt == "medium") { entry = "中型" }
        if (txt == "large") { entry = "大型" }
        if (txt == "fort") { entry = "城墙" }
        if (txt == "hero") { entry = "英雄" }
        if (txt == "divine") { entry = "神圣" }
        if (txt == "none") { entry = "无装甲" }
        return entry
    }
    /**
     *英雄主属性是什么
     */
    static GetHeroAttributeString(utid: number): string {
        let txt = ConencondUtil.GetObjectPropertyString("unit", utid, "Primary")
        let entry: string = ""
        if (txt == "STR") { entry = "力量" }
        if (txt == "AGI") { entry = "敏捷" }
        if (txt == "INT") { entry = "智力" }
        return entry
    }
    
}
