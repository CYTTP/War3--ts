import UiButtonUtil from "cyttp/Util/UiButtonUtil"
import DataBase from "solar/common/DataBase"
import BaseUtil from "solar/util/BaseUtil"

export default class FirstChargeGiftPack {
    //记录ui
    static panel_UI: number[] = []
    // 记录ui 名字序号
    UIname: number = 0
    constructor() {
        let panel_UI = FirstChargeGiftPack.panel_UI

        //主界面
        panel_UI[0] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI[0], 0.25, 0.25)
        DzFrameShow(panel_UI[0], false)
        DzFrameSetPoint(panel_UI[0], 4, DzGetGameUI(), 4, 0, 0.05)
        DzFrameSetTexture(panel_UI[0], "shou_chong_li_bao\\shou_chong_li_bao.tga", 0)

        //左上角按钮
        panel_UI[1] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI[1], 0.04, 0.04)
        DzFrameShow(panel_UI[1], true)
        // DzFrameSetPoint(panel_UI[1], 0, DzGetGameUI(), 0, 0.2, -0.03)
        DzFrameSetTexture(panel_UI[1], "shou_chong_li_bao\\shou_chong_li_bao_an_niu.tga", 0)

        panel_UI[99] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI[99], 0.04, 0.04)
        DzFrameShow(panel_UI[99], false)
        DzFrameSetPoint(panel_UI[99], 0, DzGetGameUI(), 0, 0.2, -0.03)
        DzFrameSetTexture(panel_UI[99], "shou_chong_li_bao\\shou_chong_li_bao_an_niu.tga", 0)

        //chaungjann
        let btn = UiButtonUtil.Button_Backdrop(0.04, 0.04, panel_UI[1], this.Suit_Ui_Name())
        let btn1 = UiButtonUtil.Button_Backdrop(0.04, 0.04, panel_UI[99], this.Suit_Ui_Name())
        DzFrameSetScriptByCode(btn, FRAMEEVENT_CONTROL_CLICK, () => {
            //显示
            DzFrameShow(panel_UI[0], true)
            DzFrameShow(panel_UI[1], false)
            DzFrameShow(panel_UI[99], true)
        }, false)
        DzFrameSetScriptByCode(btn1, FRAMEEVENT_CONTROL_CLICK, () => {
            //显示
            DzFrameShow(panel_UI[0], false)
            DzFrameShow(panel_UI[1], true)
            DzFrameShow(panel_UI[99], false)
        }, false)
        //文本框背景
        panel_UI[2] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI[0], "template", 0)
        DzFrameSetSize(panel_UI[2], 0.1, 0.05)
        DzFrameShow(panel_UI[2], true)
        DzFrameSetPoint(panel_UI[2], 4, panel_UI[0], 4, 0, 0.0)
        DzFrameSetTexture(panel_UI[2], "cstp.tga", 0)

        panel_UI[100] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI[0], "template", 0)
        DzFrameSetSize(panel_UI[100], 0.05, 0.05)
        DzFrameShow(panel_UI[100], true)
        DzFrameSetPoint(panel_UI[100], 0, panel_UI[0], 0, 0.01, -0.05)
        DzFrameSetTexture(panel_UI[100], "shou_chong_li_bao\\6.tga", 0)

        panel_UI[3] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI[2], "template", 0)
        DzFrameSetSize(panel_UI[3], 0.3, 0.2)
        DzFrameShow(panel_UI[3], true)
        DzFrameSetPoint(panel_UI[3], 0, panel_UI[2], 0, 0, 0.00)
        DzFrameSetFont(panel_UI[3], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameSetText(panel_UI[3], '效果')


        //马上充值按钮
        panel_UI[4] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI[0], "template", 0)
        DzFrameSetSize(panel_UI[4], 0.07, 0.04)
        DzFrameShow(panel_UI[4], true)
        DzFrameSetPoint(panel_UI[4], 4, panel_UI[0], 4, 0, -0.05)
        DzFrameSetTexture(panel_UI[4], "shou_chong_li_bao\\ma_shang_chong_zhi_an_niu.tga", 0)
        //chaungjann
        let btn_mas = UiButtonUtil.Button_Backdrop(0.07, 0.04, panel_UI[4], this.Suit_Ui_Name())
        DzFrameSetScriptByCode(btn_mas, FRAMEEVENT_CONTROL_CLICK, () => {
            // 点击的ui玩家
            let p = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(p)
            //同步数据
            let str = index + '_'
            DzSyncData("首充礼包", str)

            // 弹出首冲礼包充值窗口
            let SC_str: string = "SC01"
            DzAPI_Map_OpenMall(p, SC_str)
            // 计时器判断是否购买这个商品
            BaseUtil.onTimer(1, () => {
                if (DzAPI_Map_HasMallItem(p, SC_str)) {
                    // 首充礼包
                    // Mall_Props.shou_chong_li_bao(p)
                    // 加攻击
                    // let attack = Mall_Props.mall_data.attack
                    // SelectUtil.forAllUnits(unit => {
                    //     // 是购买玩家的单位，是建筑，攻击范围大于1000   == 攻击塔
                    //     if (IsUnitOwnedByPlayer(unit, p)
                    //         && IsUnitType(unit, UNIT_TYPE_STRUCTURE)
                    //         && GetUnitState(unit, ConvertUnitState(0x16)) >= 1000) {
                    //         SetUnitState(unit, ConvertUnitState(0x12), GetUnitState(unit, ConvertUnitState(0x12)) + attack)
                    //     }
                    // })
                    // 充值成功，不在显示ui
                    if (GetLocalPlayer() == p) {
                        // // 隐藏 背景
                        DzFrameShow(panel_UI[0], false);
                        // // 隐藏 左上角ui点击的图标
                        DzFrameShow(panel_UI[1], false);
                    }
                    return false
                    // ui页面关闭，结束计时器
                } else if (!DataBase.getPlayerSolarData(p).商城_首冲礼包UI开启) {
                    return false
                }
                return true
            })
        }, false)


    }

    /**
       * 
       * @returns //生成UI名字
       */
    Suit_Ui_Name(): string {
        this.UIname++
        return "name" + I2S(this.UIname)
    }
}