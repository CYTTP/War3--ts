export default class UiButtonUtil {


    /**
    * 创建 butt 带图片 -- ps:背景需要自己设置图片，设置位置
    * @param wide 背景宽
    * @param high 背景高
    * @param BG 父节点
    * @returns  返回ui--背景 
    */
    static Button_Backdrop(wide: number, high: number, BG: number, name: string): number {
        // 创建 按钮----------------
        let butt = DzCreateFrameByTagName("BUTTON", name, BG, "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetSize(butt, wide, high)
        DzFrameSetPoint(butt, 0, BG, 0, 0, 0)
        DzFrameSetPoint(butt, 8, BG, 8, 0, 0)
        // 进入事件
        // DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_ENTER, () => {
        //     // 反馈大小
        //     DzFrameSetSize(BG, wide + 0.01, high + 0.01)
        // }, false)
        // // butt注册 离开事件
        // DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_LEAVE, () => {
        //     DzFrameSetSize(BG, wide, high)
        // }, false)
        return butt
    };

}