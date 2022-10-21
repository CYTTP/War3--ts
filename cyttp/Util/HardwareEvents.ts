

/**
 * 硬件事件   
 */
export default class HardwareEvents {
    static IsHLbd: boolean = false//滑轮变动
    static plCameraHeiNum: number = 1000
    static ShiYejuliMin: number = 3800//最低视野距离
    static ShiYejuliMax: number = 4000//最高视野距离
    static noMouseWheel: boolean[] = []//是否禁止鼠标滚轮功能
    constructor() {
        //每帧绘制
        DzFrameSetUpdateCallbackByCode(HardwareEvents.InitTrig_FramebackByCode)
        //鼠标轮滑事件
        DzTriggerRegisterMouseWheelEventByCode(null, false, HardwareEvents.MouseRollercoasterEventTrigger)

    }
    static InitTrig_FramebackByCode(this: void) {//每帧绘制
        if (HardwareEvents.IsHLbd == true) {
            SetCameraField(CAMERA_FIELD_ANGLE_OF_ATTACK, 300, 0.00)
            SetCameraField(CAMERA_FIELD_TARGET_DISTANCE, HardwareEvents.plCameraHeiNum, 0.10)
            HardwareEvents.IsHLbd = false
        }
    }
    static MouseRollercoasterEventTrigger(this: void) {//鼠标轮滑事件
        let pid = GetPlayerId(GetLocalPlayer())
        let juli = GetCameraField(CAMERA_FIELD_TARGET_DISTANCE)
        //禁止
        if (DzIsMouseOverUI() == false) { return; }//鼠标是否在游戏内
        if (HardwareEvents.noMouseWheel[pid] == true) { return; }//是否禁用轮滑
        HardwareEvents.IsHLbd = true
        if (DzGetWheelDelta() > 0) {
            juli = juli - 100
        } else {
            juli = juli + 100
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'Tjuli' + juli);
        }
        if (juli < HardwareEvents.ShiYejuliMin) {
            juli = HardwareEvents.ShiYejuliMin
        }
        if (juli > HardwareEvents.ShiYejuliMax) {
            juli = HardwareEvents.ShiYejuliMax
        }
        HardwareEvents.plCameraHeiNum = juli
    }



}


