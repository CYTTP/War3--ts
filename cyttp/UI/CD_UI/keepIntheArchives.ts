import UiButtonUtil from "cyttp/Util/UiButtonUtil"
import { Frame } from "solar/w3ts/handles/frame"
import { arrData as data_config } from "./archivesConfig"

DzLoadToc('UI\\path.toc')
export default class keepIntheArchives {

    static BG = [
        //F4
        "UI_Icon\\cstp.tga",
        //背景
        'cundang\\cd_bg.tga'
    ]
    static listBg = [
        'cundang\\cd_scdj_db.tga',
        'cundang\\cd_ndjl_db.tga',
        'cundang\\cd_jfdj_db.tga',
        'cundang\\cd_cj_db.tga',
        'cundang\\cd_ygsq_db.tga',
        'cundang\\cd_sssq_db.tga',
        'cundang\\cd_cssq_db.tga',
        'cundang\\cd_jlsq_db.tga',
    ]
    static listBg_hover = [
        'cundang\\cd_scdj.tga',
        'cundang\\cd_ndjl.tga',
        'cundang\\cd_jfdj.tga',
        'cundang\\cd_cj.tga',
        'cundang\\cd_ygsq.tga',
        'cundang\\cd_sssq.tga',
        'cundang\\cd_cssq.tga',
        'cundang\\cd_jlsq.tga',
    ]
    //左侧导航栏按钮
    static btn: number[] = []
    //底部导航栏按钮
    static btn_bottom: number[] = []
    //记录ui显示
    static isShow = false
    // 记录ui 名字序号
    UIname: number = 0
    // 记录ui大小
    static archive_UI: { [ui_KEY: string | number]: number } = {}
    //记录导航栏数组
    static list_bar_arr = []
    ////页码
    static page: number[] = [1, 1, 1, 1, 1, 1, 1, 1]
    //最大页码
    static max_page: number[] = [1, 1, 1, 1, 1, 1, 1, 1]
    //图片名字
    static suit_name_ui_array: number[][] = [[], [], [], [], [], [], [], []]
    //图片
    static suit_map_array: number[][] = [[], [], [], [], [], [], [], []]
    // // 套装 暗图片 ---------------------------
    static suit_map_black_array: number[][] = [[], [], [], [], [], [], [], []]
    constructor() {

        let archive_UI = keepIntheArchives.archive_UI
        let isShow = keepIntheArchives.isShow
        let count = data_config.length
        //按键f4
        DzTriggerRegisterKeyEventByCode(null, 115, 1, false, () => {
            isShow = !isShow
            DzFrameShow(archive_UI['背景图'], isShow);
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())
        })
        // F4按键图标
        archive_UI['F4_BG'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetAbsolutePoint(archive_UI['F4_BG'], 4, 0.15, 0.55)
        DzFrameSetSize(archive_UI['F4_BG'], 0.03, 0.03)
        DzFrameSetTexture(archive_UI['F4_BG'], keepIntheArchives.BG[0], 0)
        // 按钮点击-----------
        let F4_BG_butt = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), archive_UI['F4_BG'], "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(F4_BG_butt, 0, archive_UI['F4_BG'], 0, 0, 0)
        DzFrameSetPoint(F4_BG_butt, 8, archive_UI['F4_BG'], 8, 0, 0)

        // 注册点击事件 -----------------------------------------------
        DzFrameSetScriptByCode(F4_BG_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            isShow = !isShow
            DzFrameShow(archive_UI['背景图'], isShow);
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())

        }, false)
        // 背景图   ---------------------------------------
        archive_UI['背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetAbsolutePoint(archive_UI['背景图'], 4, 0.4, 0.35)
        DzFrameSetSize(archive_UI['背景图'], 0.35, 0.35)  //0.4
        DzFrameSetTexture(archive_UI['背景图'], keepIntheArchives.BG[1], 0)
        DzFrameShow(archive_UI['背景图'], false)

        //右上角x
        archive_UI['关闭'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
        DzFrameSetSize(archive_UI['关闭'], 0.027, 0.06)
        DzFrameSetTexture(archive_UI['关闭'], 'UI_Icon\\TZUI\\xxxx.tga', 0)
        DzFrameSetPoint(archive_UI['关闭'], 4, archive_UI['背景图'], 4, 0.16, 0.1)
        DzFrameShow(archive_UI['关闭'], true)
        //创建BTn
        let xx = UiButtonUtil.Button_Backdrop(0.027, 0.06, archive_UI['关闭'], this.Suit_Ui_Name())

        DzFrameSetScriptByCode(xx, FRAMEEVENT_CONTROL_CLICK, () => {
            DzFrameShow(archive_UI['背景图'], false);
        }, false)
        //========hover=============
        // 边框 --------------------------------
        let jamb = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "Demo_BorderBack", 0)
        DzFrameShow(jamb, false)
        // 边框图片 --------------------------------
        let jam_BG = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jam_BG, 0.04, 0.04)
        // 边框名字 --------------------------------
        let jamb_name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_name, 0.08, 0.016)
        DzFrameSetFont(jamb_name, 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
        DzFrameSetPoint(jamb_name, 3, jam_BG, 5, 0.005, 0)
        DzFrameSetText(jamb_name, '套装部件名字')
        DzFrameSetTextAlignment(jamb_name, TEXTALIGN_CENTER)
        // 边框提示 --------------------------------
        let jamb_tip = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_tip, 0.1, 0.016)
        DzFrameSetFont(jamb_tip, 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameSetPoint(jamb_tip, 0, jam_BG, 6, 0, -0.008)
        DzFrameSetText(jamb_tip, '套装部件获取提示')
        DzFrameSetTextAlignment(jamb_tip, TEXTALIGN_LEFT)
        // 边框说明 --------------------------------
        let jamb_txt = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), jamb, "template", 0)
        DzFrameSetSize(jamb_txt, 0.15, 0)
        DzFrameSetFont(jamb_txt, 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameSetPoint(jamb_txt, 0, jamb_tip, 6, 0, 0)
        DzFrameSetText(jamb_txt, '套装部件文本')
        DzFrameSetTextAlignment(jamb_txt, TEXTALIGN_LEFT)

        //界面排版
        for (let i = 0; i < count; i++) {
            let index = i
            print_r(index)
            let k = i
            archive_UI[i] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
            DzFrameSetSize(archive_UI[i], 0.07, 0.03)
            DzFrameSetTexture(archive_UI[i], keepIntheArchives.listBg[i], 0)
            DzFrameSetPoint(archive_UI[i], 6, archive_UI['背景图'], 6, 0.028, 0.03 * i + 0.04)
            DzFrameShow(archive_UI[i], true)

            archive_UI[i + 10] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
            DzFrameSetSize(archive_UI[i + 10], 0.07, 0.03)
            DzFrameSetTexture(archive_UI[i + 10], keepIntheArchives.listBg_hover[i], 0)
            DzFrameSetPoint(archive_UI[i + 10], 6, archive_UI['背景图'], 6, 0.028, 0.03 * i + 0.04)
            DzFrameShow(archive_UI[i + 10], false)
            //创建BTn
            keepIntheArchives.btn[index] = UiButtonUtil.Button_Backdrop(0.07, 0.03, archive_UI[i], this.Suit_Ui_Name())

            archive_UI[i + 20] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
            DzFrameSetSize(archive_UI[i + 20], 0.21, 0.242)
            DzFrameSetTexture(archive_UI[i + 20], 'nothing.tga', 0)
            DzFrameSetPoint(archive_UI[i + 20], 4, archive_UI['背景图'], 4, 0.0355, -0.018)
            DzFrameShow(archive_UI[i + 20], false)


            // 翻页左图片 ----------------------------------
            archive_UI[i + 80] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI[i + 20], "template", 0)
            DzFrameSetPoint(archive_UI[i + 80], 4, archive_UI[i + 20], 7, -0.04, 0.02)
            DzFrameSetSize(archive_UI[i + 80], 0.02, 0.02)
            DzFrameSetTexture(archive_UI[i + 80], 'UI_Icon\\TZUI\\zuo.tga', 0)
            //创建BTn
            archive_UI[i + 90] = UiButtonUtil.Button_Backdrop(0.02, 0.02, archive_UI[i + 80], this.Suit_Ui_Name())

            // 翻页右图片 ----------------------
            archive_UI[i + 100] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI[i + 20], "template", 0)
            DzFrameSetPoint(archive_UI[i + 100], 4, archive_UI[i + 20], 7, 0.04, 0.02)
            DzFrameSetSize(archive_UI[i + 100], 0.02, 0.02)
            DzFrameSetTexture(archive_UI[i + 100], "UI_Icon\\TZUI\\you.tga", 0)

            //创建BTn
            archive_UI[i + 110] = UiButtonUtil.Button_Backdrop(0.02, 0.02, archive_UI[i + 100], this.Suit_Ui_Name())

            // 翻页文本 ----------------------
            let fywb = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), archive_UI[i + 20], "template", 0)
            DzFrameSetSize(fywb, 0.05, 0.016)
            DzFrameSetFont(fywb, 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
            DzFrameSetPoint(fywb, 4, archive_UI[i + 20], 7, 0.0025, 0.02)
            DzFrameSetText(fywb, keepIntheArchives.page[k] + '/' + keepIntheArchives.max_page[k])
            DzFrameSetTextAlignment(fywb, TEXTALIGN_CENTER)

            // 左点击事件
            DzFrameSetScriptByCode(archive_UI[i + 90], FRAMEEVENT_CONTROL_CLICK, () => {

                // 翻页 
                if (keepIntheArchives.page[k] > 1) {
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '1');
                    keepIntheArchives.page[k]--
                    DzFrameSetText(fywb, keepIntheArchives.page[k] + '/' + keepIntheArchives.max_page[k])
                    let id = GetPlayerId(DzGetTriggerUIEventPlayer())
                    keepIntheArchives.refresh_page_ui(id, k)
                }
            }, false)
            // 右点击事件-------------------
            DzFrameSetScriptByCode(archive_UI[i + 110], FRAMEEVENT_CONTROL_CLICK, () => {
                // 右翻页 
                if (keepIntheArchives.page[k] < keepIntheArchives.max_page[k]) {
                    keepIntheArchives.page[k]++
                    //刷新翻页文本
                    DzFrameSetText(fywb, keepIntheArchives.page[k] + '/' + keepIntheArchives.max_page[k])
                    let id = GetPlayerId(DzGetTriggerUIEventPlayer())
                    keepIntheArchives.refresh_page_ui(id, k)
                }
            }, false)


            let width = 5
            keepIntheArchives.max_page[k] = math.floor(data_config[index].length / 20) + keepIntheArchives.max_page[k]
            print_r(keepIntheArchives.max_page[k])
            DzFrameSetText(fywb, keepIntheArchives.page[k] + '/' + keepIntheArchives.max_page[k])
            for (let m = 0; m < 20; m++) {
                let z = m
                let cfgData = data_config[index][z]
                // 图片
                let art = ''
                let name = ''
                let isIlluminate: boolean
                if (cfgData) {
                    art = cfgData['Art']
                    name = cfgData['name']
                    isIlluminate = cfgData['isIlluminate']
                }
                let x = - 0.085 + 0.043 * (m % width)
                let y = 0.11 - Math.floor(m / width) * 0.055
                // 套装文本----------------------------
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'i=' + i);
                archive_UI[i + 120] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), archive_UI[i + 20], "template", 0)
                keepIntheArchives.suit_name_ui_array[index].push(archive_UI[i + 120])
                DzFrameSetSize(archive_UI[i + 120], 0.08, 0.016)
                DzFrameSetFont(archive_UI[i + 120], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
                DzFrameSetPoint(archive_UI[i + 120], 4, archive_UI[i + 20], 4, x, -0.028 + y)
                DzFrameSetText(archive_UI[i + 120], name)
                DzFrameSetTextAlignment(archive_UI[i + 120], TEXTALIGN_CENTER)
                // // 创建套装 图片 -------------------
                archive_UI[i + 50] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI[i + 20], "template", 0)
                keepIntheArchives.suit_map_array[index].push(archive_UI[i + 50])
                DzFrameSetSize(archive_UI[i + 50], 0.035, 0.035)
                DzFrameSetPoint(archive_UI[i + 50], 4, archive_UI[i + 20], 4, x, y)
                DzFrameSetTexture(archive_UI[i + 50], art, 0)
                // // 创建套装 图片 ---------------------------
                archive_UI[i + 60] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI[i + 50], "template", 0)
                keepIntheArchives.suit_map_black_array[index].push(archive_UI[i + 60])
                DzFrameSetPoint(archive_UI[i + 60], 0, archive_UI[i + 50], 0, 0, 0)
                DzFrameSetPoint(archive_UI[i + 60], 8, archive_UI[i + 50], 8, 0, 0)
                DzFrameSetTexture(archive_UI[i + 60], 'textures\\black32.blp', 0)
                if (isIlluminate == true) {
                    DzFrameSetAlpha(archive_UI[i + 60], 0)
                } else {
                    DzFrameSetAlpha(archive_UI[i + 60], 180)
                }
                // 创建套装 butt    -------------
                archive_UI[i + 70] = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), archive_UI[i + 50], "ScoreScreenTabButtonTemplate", 0)
                DzFrameSetSize(archive_UI[i + 70], 0.035, 0.035)
                DzFrameSetPoint(archive_UI[i + 70], 4, archive_UI[i + 50], 4, 0, 0)
                ///hover 
                this.button_into_Tip(archive_UI[i + 70], archive_UI[i + 50], jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, z, index)

            }


        }



        //底部界面排版
        for (let i = 0; i < 6; i++) {
            let index = i
            archive_UI[i + 30] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
            DzFrameSetSize(archive_UI[i + 30], 0.03, 0.03)
            DzFrameSetTexture(archive_UI[i + 30], 'cundang\\cd_shitou_db.tga', 0)
            DzFrameSetPoint(archive_UI[i + 30], 4, archive_UI['背景图'], 4, -0.051 + 0.035 * i, -0.153)
            DzFrameShow(archive_UI[i + 30], true)

            //创建BTn
            keepIntheArchives.btn_bottom[index] = UiButtonUtil.Button_Backdrop(0.03, 0.03, archive_UI[i + 30], this.Suit_Ui_Name())

            archive_UI[i + 40] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), archive_UI['背景图'], "template", 0)
            DzFrameSetSize(archive_UI[i + 40], 0.11, 0.3)
            DzFrameSetTexture(archive_UI[i + 40], 'cundang\\cd_shitou_hover.tga', 0)
            DzFrameSetPoint(archive_UI[i + 40], 4, archive_UI['背景图'], 4, 0.23, -0.025)
            DzFrameShow(archive_UI[i + 40], false)

            let suit_num = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), archive_UI[i + 40], "template", 0)
            DzFrameSetSize(suit_num, 0.3, 0.016)
            DzFrameSetFont(suit_num, 'Fonts\\ChaoCuZiTi.ttf', 0.013, 0)
            DzFrameSetPoint(suit_num, 4, archive_UI[i + 40], 4, 0, 0)
            DzFrameSetText(suit_num, keepIntheArchives.listBg_hover[i])
            DzFrameSetTextAlignment(archive_UI[i + 40], TEXTALIGN_CENTER)
        }






        //刷新界面
        this.refresh_interface()
    }

    // 刷新页面ui
    static refresh_page_ui(id: number, list_index: number) {
        // 更新ui
        // let all_frame = Suit_Equip_Ui_Show.All_Frame
        let page_num = (keepIntheArchives.page[list_index] - 1) * 20
        let width = 5
        for (let i = 0; i < 20; i++) {
            let index_max = i + page_num
            //获取表格数据
            let cfgData = data_config[list_index][index_max]
            // 套装名字
            let suit_name_ui: number[] = keepIntheArchives.suit_name_ui_array[list_index]
            /// 套装图片
            let suit_map_array: number[] = keepIntheArchives.suit_map_array[list_index]
            if (!cfgData) {
                DzFrameShow(suit_name_ui[i], false)
                DzFrameShow(suit_map_array[i], false)
                continue
            } else {
                DzFrameShow(suit_name_ui[i], true)
                DzFrameShow(suit_map_array[i], true)
            }

            let index = i
            // 更新套装图片
            let art: string = cfgData['Art']
            let name: string = cfgData['name']
            DzFrameSetTexture(suit_map_array[index], art, 0)
            DzFrameSetText(suit_name_ui[index], name)

            // 套装 暗图片 ---------------------------
            let suit_map_black_array: number[] = keepIntheArchives.suit_map_black_array[list_index]
            let isIlluminate: boolean = cfgData['isIlluminate']
            if (isIlluminate == true) {
                DzFrameSetAlpha(suit_map_black_array[index], 0)
            } else {
                DzFrameSetAlpha(suit_map_black_array[index], 180)
            }

        }


    }




    /**
     * 刷新界面
     */
    refresh_interface() {
        for (let index = 0; index < keepIntheArchives.btn.length; index++) {
            let t = index
            let li = keepIntheArchives.btn[index];
            let TS_UI_butt = Frame.fromHandle(li);
            //预设显示
            DzFrameShow(keepIntheArchives.archive_UI[17], true)
            DzFrameShow(keepIntheArchives.archive_UI[27], true)
            //鼠标点击
            TS_UI_butt.setOnClick(() => {
                let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                DzFrameShow(keepIntheArchives.archive_UI[t + 10], true)
                for (let k = 0; k < keepIntheArchives.btn.length; k++) {
                    if (t == k) {
                        DzFrameShow(keepIntheArchives.archive_UI[k + 20], true)
                        DzFrameShow(keepIntheArchives.archive_UI[k + 10], true)
                    } else {
                        DzFrameShow(keepIntheArchives.archive_UI[k + 20], false)
                        DzFrameShow(keepIntheArchives.archive_UI[k + 10], false)
                    }
                }
            });
        }

        for (let x = 0; x < keepIntheArchives.btn_bottom.length; x++) {
            let n = x
            let li = keepIntheArchives.btn_bottom[x];
            let buttom = Frame.fromHandle(li);
            buttom.setOnMouseEnter(() => {
                for (let k = 0; k < keepIntheArchives.btn_bottom.length; k++) {
                    if (n == k) {
                        DzFrameShow(keepIntheArchives.archive_UI[k + 40], true)
                    }
                }
            })
            buttom.setOnMouseLeave(() => {
                for (let k = 0; k < keepIntheArchives.btn_bottom.length; k++) {
                    if (n == k) {
                        DzFrameShow(keepIntheArchives.archive_UI[k + 40], false)
                    }
                }
            })
        }
    }

    /**
     * 
     * @returns //生成UI名字
     */
    Suit_Ui_Name(): string {
        this.UIname++
        return "name" + I2S(this.UIname)
    }

    /**
* 进入按钮 显示提示框
* @param frame_ui 按钮UI
* @param frame_bg 按钮UI的图片
*/
    button_into_Tip(butt: number, suit_BG: number, jamb: number, jam_BG: number, jamb_name: number, jamb_tip: number, jamb_txt: number, index: number, pageNum: number) {
        // let width = this.UISize[suit_BG].width
        // let height = this.UISize[suit_BG].height
        // 进入事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_ENTER, () => {
            // 反馈大小
            // DzFrameSetSize(suit_BG, width + 0.01, height + 0.01)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
            let index_max = index + (keepIntheArchives.page[pageNum] - 1) * 20
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index_max=' + index_max);
            let arr = data_config[pageNum][index_max]
            if (arr == null) { return }
            // // 图片
            let art = arr['Art']
            let name = arr['name']
            let Ubertip = arr['Ubertip']
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'name=' + name);
            let tip = ''
            // 获取途径文本
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())
            if (arr['isIlluminate']) {
                tip = '|cff00ff00已激活！'
            } else {
                tip = '|cffffff00未激活!'
            }
            DzFrameClearAllPoints(jam_BG)
            DzFrameSetPoint(jam_BG, 0, butt, 8, 0.015, -0.015)
            // 边框自适应
            DzFrameSetPoint(jamb, 0, jam_BG, 0, -0.01, 0.01)
            DzFrameSetPoint(jamb, 8, jamb_txt, 8, 0.01, 0 - 0.01)
            // 更新图片 文本
            DzFrameSetTexture(jam_BG, art, 0)
            DzFrameSetText(jamb_name, name)
            DzFrameSetText(jamb_tip, tip)
            DzFrameSetText(jamb_txt, Ubertip)
            DzFrameShow(jamb, true)
        }, false)

        // butt注册 离开事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            // DzFrameSetSize(suit_BG, width, height)
            DzFrameShow(jamb, false)
        }, false)

    }
}