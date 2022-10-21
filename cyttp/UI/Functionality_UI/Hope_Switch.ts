import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import { Frame } from "solar/w3ts/handles/frame";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger";





/**
 * 玩家 功能 开关 -- 5
 */
export default class Hope_Switch {
    static config: {
        // 物品共享  --
        Item_share: {
            // 背景 图片的路径 --
            BG_route: string,
            // 选择勾勾 -- 图片的路径 --
            route: string,
            // 显示状态 --
            visible: boolean,
        },
        // 特效显示--
        Effect_show: {
            BG_route: string,
            route: string,
            visible: boolean,
        },
        // 伤害显示--
        Damage_show: {
            BG_route: string,
            route: string,
            visible: boolean,
        },
        // 智能施法--
        Ability_open: {
            BG_route: string,
            route: string,
            visible: boolean,
        },

    } = {
            Item_share: {
                BG_route: 'UI_Icon\\kjj_bg.tga',
                route: 'UI_Icon\\Item_Tick.tga',
                // 默认 不开启共享 
                visible: false,
            },
            Effect_show: {
                BG_route: 'UI_Icon\\kjj_bg.tga',
                route: 'UI_Icon\\Item_Tick.tga',
                // 默认 显示特效 --
                visible: true,
            },
            // 伤害显示--
            Damage_show: {
                BG_route: 'UI_Icon\\kjj_bg.tga',
                route: 'UI_Icon\\Item_Tick.tga',
                // 默认 显示 --
                visible: true,
            },
            // 智能施法--
            Ability_open: {
                BG_route: 'Hoep_UI_Resource\\Switch\\Item_BG.tga',
                route: 'Hoep_UI_Resource\\Switch\\Item_Tick.tga',
                // 默认 开启 --
                visible: true,
            },


        }


    static UIname: number = 0


    constructor() {
        let config = Hope_Switch.config

        const BG = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetTexture(BG, "UI_Icon\\TZUI\\bg2.tga", 0)
        DzFrameSetSize(BG, 0.05, 0.135)
        DzFrameSetAbsolutePoint(BG, 4, 0.19, 0.06)


        // 第一个ui 绝对位置 x y 坐标 --
        const x = 0.19
        const y = 0.06
        // 默认UI宽 -- 
        const size_W = 0.052
        // 默认UI高 -- 
        const size_H = 0.013
        // 默认选择勾 的ui 大小  -
        const size = 0.01
        // 创建 物品共享 -------------------------------------------------------------------
        const item_BG = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetTexture(item_BG, config.Item_share.BG_route, 0)
        DzFrameSetSize(item_BG, size_W, size_H)
        DzFrameSetAbsolutePoint(item_BG, 4, x, y)
        // DzFrameSetPoint(item_BG, 3, DzFrameGetPortrait(), 6, -0.0025, -0.0065)
        const item_tick = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), item_BG, "template", 0)
        DzFrameSetTexture(item_tick, config.Item_share.route, 0)
        DzFrameSetSize(item_tick, size, size)
        DzFrameSetPoint(item_tick, 3, item_BG, 3, 0.005, 0)
        DzFrameShow(item_tick, config.Item_share.visible)
        const item_butt = DzCreateFrameByTagName("BUTTON", Hope_Switch.Ui_Name(), item_BG, "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(item_butt, 0, item_BG, 0, 0, 0)
        DzFrameSetPoint(item_butt, 8, item_BG, 8, 0, 0)
        let item_flg: boolean = true
        // 进入事件
        DzFrameSetScriptByCode(item_butt, FRAMEEVENT_MOUSE_ENTER, () => {
            // 反馈大小
            if (item_flg) {
                DzFrameSetSize(item_BG, size_W + 0.005, size_H + 0.005)
            }
        }, false)
        // butt注册 离开事件
        DzFrameSetScriptByCode(item_butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            if (item_flg) {
                DzFrameSetSize(item_BG, size_W, size_H)
            }
        }, false)
        // 点击事件 --
        DzFrameSetScriptByCode(item_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            config.Item_share.visible = !config.Item_share.visible
            DzFrameShow(item_tick, config.Item_share.visible)
            item_flg = false
            let temp_w = 0.005
            let temp_h = 0.005
            BaseUtil.runLater(0.03, () => {
                temp_w = temp_w - 0.001
                temp_h = temp_h - 0.001
                DzFrameSetSize(item_BG, size_W - temp_w, size_H - temp_h)
                if (temp_w <= 0) {
                    item_flg = true
                }
            }, 5)
        }, false)

        // 创建 隐藏特效 -------------------------------------------------------------------------------
        const effect_BG = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetTexture(effect_BG, config.Effect_show.BG_route, 0)
        DzFrameSetSize(effect_BG, size_W, size_H)
        DzFrameSetPoint(effect_BG, 4, item_BG, 4, 0, -0.023)
        // DzFrameSetAbsolutePoint(effect_BG, 4, 0.523, 0.092)
        const effect_tick = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), effect_BG, "template", 0)
        DzFrameSetTexture(effect_tick, config.Effect_show.route, 0)
        DzFrameSetSize(effect_tick, size, size)
        DzFrameSetPoint(effect_tick, 3, effect_BG, 3, 0.005, 0)
        // DzFrameSetAbsolutePoint(effect_tick, 4, 0.55, 0.15)
        DzFrameShow(effect_tick, config.Effect_show.visible)
        const effect_butt = DzCreateFrameByTagName("BUTTON", Hope_Switch.Ui_Name(), effect_BG, "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(effect_butt, 0, effect_BG, 0, 0, 0)
        DzFrameSetPoint(effect_butt, 8, effect_BG, 8, 0, 0)
        let effect_flg: boolean = true
        // 进入事件
        DzFrameSetScriptByCode(effect_butt, FRAMEEVENT_MOUSE_ENTER, () => {
            // 反馈大小
            if (effect_flg) {
                DzFrameSetSize(effect_BG, size_W + 0.005, size_H + 0.005)
            }
        }, false)
        // butt注册 离开事件
        DzFrameSetScriptByCode(effect_butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            if (effect_flg) {
                DzFrameSetSize(effect_BG, size_W, size_H)
            }
        }, false)
        // 点击事件 --
        DzFrameSetScriptByCode(effect_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            config.Effect_show.visible = !config.Effect_show.visible
            DzFrameShow(effect_tick, config.Effect_show.visible)
            effect_flg = false
            let temp_w = 0.005
            let temp_h = 0.005
            BaseUtil.runLater(0.03, () => {
                temp_w = temp_w - 0.001
                temp_h = temp_h - 0.001
                DzFrameSetSize(effect_BG, size_W - temp_w, size_H - temp_h)
                if (temp_w <= 0) {
                    effect_flg = true
                }
            }, 5)
        }, false)


        // 创建 伤害显示 -------------------------------------------------------------------------------
        const damage_BG = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetTexture(damage_BG, config.Damage_show.BG_route, 0)
        DzFrameSetSize(damage_BG, size_W, size_H)
        DzFrameSetPoint(damage_BG, 4, effect_BG, 4, 0, -0.023)
        // DzFrameSetAbsolutePoint(effect_BG, 4, 0.523, 0.092)
        const damage_tick = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), damage_BG, "template", 0)
        DzFrameSetTexture(damage_tick, config.Damage_show.route, 0)
        DzFrameSetSize(damage_tick, size, size)
        DzFrameSetPoint(damage_tick, 3, damage_BG, 3, 0.005, 0)
        // DzFrameSetAbsolutePoint(effect_tick, 4, 0.55, 0.15)
        DzFrameShow(effect_tick, config.Damage_show.visible)
        const damage_butt = DzCreateFrameByTagName("BUTTON", Hope_Switch.Ui_Name(), damage_BG, "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(damage_butt, 0, damage_BG, 0, 0, 0)
        DzFrameSetPoint(damage_butt, 8, damage_BG, 8, 0, 0)
        let damage_flg: boolean = true
        // 进入事件
        DzFrameSetScriptByCode(damage_butt, FRAMEEVENT_MOUSE_ENTER, () => {
            // 反馈大小
            if (damage_flg) {
                DzFrameSetSize(damage_BG, size_W + 0.005, size_H + 0.005)
            }
        }, false)
        // butt注册 离开事件
        DzFrameSetScriptByCode(damage_butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            if (damage_flg) {
                DzFrameSetSize(damage_BG, size_W, size_H)
            }
        }, false)
        // 点击事件 --
        DzFrameSetScriptByCode(damage_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            config.Damage_show.visible = !config.Damage_show.visible
            DzFrameShow(damage_tick, config.Damage_show.visible)
            damage_flg = false
            let temp_w = 0.005
            let temp_h = 0.005
            BaseUtil.runLater(0.03, () => {
                temp_w = temp_w - 0.001
                temp_h = temp_h - 0.001
                DzFrameSetSize(damage_BG, size_W - temp_w, size_H - temp_h)
                if (temp_w <= 0) {
                    damage_flg = true
                }
            }, 5)
        }, false)


        // // 创建 智能施法 -------------------------------------------------------------------------------
        // const ability_BG = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetTexture(ability_BG, config.Ability_open.BG_route, 0)
        // DzFrameSetSize(ability_BG, size_W, size_H)
        // DzFrameSetPoint(ability_BG, 4, damage_BG, 4, 0, -0.023)
        // // DzFrameSetAbsolutePoint(effect_BG, 4, 0.523, 0.092)
        // const ability_tick = DzCreateFrameByTagName("BACKDROP", Hope_Switch.Ui_Name(), ability_BG, "template", 0)
        // DzFrameSetTexture(ability_tick, config.Ability_open.route, 0)
        // DzFrameSetSize(ability_tick, size, size)
        // DzFrameSetPoint(ability_tick, 3, ability_BG, 3, 0.005, 0)
        // DzFrameShow(ability_tick, config.Ability_open.visible)
        // const ability_butt = DzCreateFrameByTagName("BUTTON", Hope_Switch.Ui_Name(), ability_BG, "ScoreScreenTabButtonTemplate", 0)
        // DzFrameSetPoint(ability_butt, 0, ability_BG, 0, 0, 0)
        // DzFrameSetPoint(ability_butt, 8, ability_BG, 8, 0, 0)
        // let ability_flg: boolean = true
        // // 进入事件
        // DzFrameSetScriptByCode(ability_butt, FRAMEEVENT_MOUSE_ENTER, () => {
        //     // 反馈大小
        //     if (ability_flg) {
        //         DzFrameSetSize(ability_BG, size_W + 0.005, size_H + 0.005)
        //     }
        // }, false)
        // // butt注册 离开事件
        // DzFrameSetScriptByCode(ability_butt, FRAMEEVENT_MOUSE_LEAVE, () => {
        //     if (ability_flg) {
        //         DzFrameSetSize(ability_BG, size_W, size_H)
        //     }
        // }, false)
        // // 点击事件 --
        // DzFrameSetScriptByCode(ability_butt, FRAMEEVENT_CONTROL_CLICK, () => {
        //     config.Ability_open.visible = !config.Ability_open.visible
        //     DzFrameShow(ability_tick, config.Ability_open.visible)
        //     ability_flg = false
        //     let temp_w = 0.005
        //     let temp_h = 0.005
        //     BaseUtil.runLater(0.03, () => {
        //         temp_w = temp_w - 0.001
        //         temp_h = temp_h - 0.001
        //         DzFrameSetSize(ability_BG, size_W - temp_w, size_H - temp_h)
        //         if (temp_w <= 0) {
        //             ability_flg = true
        //         }
        //     }, 5)
        // }, false)


    }

    /**
     * 
     * @returns //生成UI名字
     */
    private static Ui_Name(): string {
        Hope_Switch.UIname++
        return "name" + I2S(Hope_Switch.UIname)
    }


    /**
     * 玩家的 -- 物品共享 -- 开关
     * @param p 玩家
     * @returns ture 为开启
     */
    public static Item_Share(p: player): boolean {
        if (GetLocalPlayer() == p) {
            return Hope_Switch.config.Item_share.visible
        }
        return false
    }

    /**
     * 玩家的 -- 特效显示 --开关
     * @param p 玩家
     * @returns ture 为开启
     */
    public static Effect_Show(p: player): boolean {
        if (GetLocalPlayer() == p) {
            return Hope_Switch.config.Effect_show.visible
        }
        return false
    }

    /**
     * 玩家的 -- 伤害显示 --开关
     * @param p 玩家
     * @returns ture 为开启
     */
    public static Damage_Show(p: player): boolean {
        if (GetLocalPlayer() == p) {
            return Hope_Switch.config.Damage_show.visible
        }
        return false
    }

    /**
     * 玩家的 -- 智能施法 --开关
     * @param p 玩家
     * @returns ture 为开启
     */
    public static Ability_Open(p: player): boolean {
        if (GetLocalPlayer() == p) {
            return Hope_Switch.config.Ability_open.visible
        }
        return false
    }



}