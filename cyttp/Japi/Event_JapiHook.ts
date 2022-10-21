import SelectUtil from "solar/util/SelectUtil";
import SyncUtil from "solar/util/SyncUtil";

/**
 *内置hook改变调用
 */
export default class Event_JapiHook {
    /**
     *内置hook改变调用
     */
    constructor() {
        // 测试 选择单位 ---
        se.unitSelected((triggerUnit, triggerPlayer) => {
            // 选择单位 强制按键 为了刷新：技能button坐标---
            ForceUIKeyBJ(triggerPlayer, null)
        })

        let message: NoSelf = require('jass.message');
        //按键与鼠标Hook
        message.hook = function (msg) {//1命令，2技能，3点目标
            // print(2)
            let abil_id: any
            let order_id: any
            let state: any//为3则对
            [abil_id, order_id, state] = message.common_selector();

            let code = msg.code
            print('code=' + code)



            // 按键"QWER"释放  技能 -----
            Event_JapiHook.Hero_QWER_Key(msg,)

            return true;
        }

    }


    /**
     * message库hook
     * @param msg 
     */
    static Hero_QWER_Key(msg: any,) {
        // 内置 本地获取 -- 当前选择单位
        let udw = GetRealSelectUnit()
        // 获取 玩家 的第一个英雄
        let index = GetPlayerId(GetOwningPlayer(udw))
        let hreo = SelectUtil.getAnHero(index)
        //  获取 按键   原本的	键控代码 -----
        let code = msg.code
        //  获取对应玩家的 按键   更改表
        let code_table: {
            [key_code: number]: { key_value: number, x: number, y: number }
        } = Event_JapiHook.key_code_table[index]
        //  获取 按键   更改的	键控代码 -----
        let key_value = code_table[code].key_value

        // 判断 选择英雄 是否等于 玩家的第一个英雄单位 ---- 
        if (udw == hreo) {
            // 调用 改变 QWER技能的butt 坐标 ---
            Event_JapiHook.Refresh_QWER_XY(index,)
            // 按键 Q ---  81 ----- 
            if (code == 81) {
                msg.code = key_value
                // 按键 W ---   	87
            } else if (code == 87) {
                msg.code = key_value
                // 按键 E ---   	69
            } else if (code == 69) {
                msg.code = key_value
                // 按键 R ---   	82
            } else if (code == 82) {
                msg.code = key_value
            }
        } else {
            // 不是英雄 把技能button坐标 恢复成原生的  ----
            Event_JapiHook.Refresh_QWER_XY()
        }
    }

    /**
     * 改变 QWER的键值
     * @param index 玩家ID
     * @param old_code 原本的按键值
     * @param new_code 想改成的按键值
     ** 比如：玩家1的Q换成E  -->  Change_QWER_code(0,81,69)
     ** Q:81 -- W:87 --  E:69 -- R:82 
     */
    static Change_QWER_code(index: number, old_code: number, new_code: number) {
        let code_table: {
            [key_code: number]: { key_value: number, x: number, y: number }
        } = Event_JapiHook.key_code_table[index]
        // 先记录 x y 
        let old_x = code_table[old_code].x
        let old_y = code_table[old_code].y
        let new_x = code_table[new_code].x
        let new_y = code_table[new_code].y
        //   把原本的默认按键代码  更改的	新的按键代码 -----
        code_table[old_code].key_value = new_code
        code_table[new_code].key_value = old_code
        // 改变X坐标
        code_table[old_code].x = new_x
        // 改变Y坐标
        code_table[old_code].y = new_y
        // 改变X坐标
        code_table[new_code].x = old_x
        // 改变Y坐标
        code_table[new_code].y = old_y


    }

    /*** 刷新button的坐标
     * @param index 玩家id,不是玩家第一个英雄默认100,刷新成原生butt坐标
     */
    static Refresh_QWER_XY(index: number = 100) {
        let code_table: {
            [key_code: number]: { key_value: number, x: number, y: number }
        } = Event_JapiHook.key_code_table[index]
        // 更改Q坐标 ----
        let Q_x = code_table[81].x
        let Q_y = code_table[81].y
        let skill_Q = DzFrameGetCommandBarButton(2, 0)
        DzFrameClearAllPoints(skill_Q)
        DzFrameSetAbsolutePoint(skill_Q, 4, Q_x, Q_y)
        // 更改W坐标 ----
        let W_x = code_table[87].x
        let W_y = code_table[87].y
        let skill_W = DzFrameGetCommandBarButton(2, 1)
        DzFrameClearAllPoints(skill_W)
        DzFrameSetAbsolutePoint(skill_W, 4, W_x, W_y)
        // 更改E坐标 ----
        let E_x = code_table[69].x
        let E_y = code_table[69].y
        let skill_E = DzFrameGetCommandBarButton(2, 2)
        DzFrameClearAllPoints(skill_E)
        DzFrameSetAbsolutePoint(skill_E, 4, E_x, E_y)
        // 更改E坐标 ----
        let R_x = code_table[69].x
        let R_y = code_table[69].y
        let skill_R = DzFrameGetCommandBarButton(2, 3)
        DzFrameClearAllPoints(skill_R)
        DzFrameSetAbsolutePoint(skill_R, 4, R_x, R_y)
    }


    /**
     * QWER按键配置表--默认
     */
    static key_code_table: {
        [index: number]: {
            [key_code: number]: { key_value: number, x: number, y: number }
        }
    } = {
            // 玩家1的QWER按键默认--code：按键值，x:button坐标，y:button坐标，
            0: {
                81: { key_value: 81, x: 0.6365, y: 0.0265 },
                87: { key_value: 87, x: 0.6800, y: 0.0265 },
                69: { key_value: 69, x: 0.7235, y: 0.0265 },
                82: { key_value: 82, x: 0.7670, y: 0.0265 },
            },
            1: {
                81: { key_value: 81, x: 0.6365, y: 0.0265 },
                87: { key_value: 87, x: 0.6800, y: 0.0265 },
                69: { key_value: 69, x: 0.7235, y: 0.0265 },
                82: { key_value: 82, x: 0.7670, y: 0.0265 },
            },
            2: {
                81: { key_value: 81, x: 0.6365, y: 0.0265 },
                87: { key_value: 87, x: 0.6800, y: 0.0265 },
                69: { key_value: 69, x: 0.7235, y: 0.0265 },
                82: { key_value: 82, x: 0.7670, y: 0.0265 },
            },
            3: {
                81: { key_value: 81, x: 0.6365, y: 0.0265 },
                87: { key_value: 87, x: 0.6800, y: 0.0265 },
                69: { key_value: 69, x: 0.7235, y: 0.0265 },
                82: { key_value: 82, x: 0.7670, y: 0.0265 },
            },
            // 为了 记录原本的初始值 -- 
            100: {
                81: { key_value: 81, x: 0.6365, y: 0.0265 },
                87: { key_value: 87, x: 0.6800, y: 0.0265 },
                69: { key_value: 69, x: 0.7235, y: 0.0265 },
                82: { key_value: 82, x: 0.7670, y: 0.0265 },
            },
        }
}







