import BaseUtil from "solar/util/BaseUtil";
import { Trigger } from "solar/w3ts/handles/trigger";
import { data as data_config } from "./Suit_Ui_Show_config"
// import { arrData as data_arr } from "./Suit_Ui_Show_config"
DzLoadToc('UI\\path.toc')

/**
 * 套装UI显示   Suit_Ui_Show_config
 */
export default class Suit_Equip_Ui_Show {
    // 文本配置
    static config: { [id: string]: number[] }[] = [
        // 用来记录4个玩家 套装部件的数量   一共50个
        { '神器套装一': [0, 0, 0, 0] },
        { '神器套装二': [0, 0, 0, 0] },
        { '神器套装三': [0, 0, 0, 0] },
        { '神器套装四': [0, 0, 0, 0] },
        { '神器套装五': [0, 0, 0, 0] },
        { '神器套装六': [0, 0, 0, 0] },
        { '神器套装七': [0, 0, 0, 0] },
        { '神器套装八': [0, 0, 0, 0] },
        { '神器套装九': [0, 0, 0, 0] },
        { '神器套装十': [0, 0, 0, 0] },
        { '神器套装十一': [0, 0, 0, 0] },
        { '神器套装十二': [0, 0, 0, 0] },
        { '神器套装十三': [0, 0, 0, 0] },
        { '神器套装十四': [0, 0, 0, 0] },
        { '神器套装十五': [0, 0, 0, 0] },
        { '神器套装十六': [0, 0, 0, 0] },
    ];
    // 所有UI
    static All_Frame: { [id: string]: any } = {
        // F4按键图标
        'F5_BG': 0,
        //背景大图
        'Show': false,
        //背景大图
        'back_map': 0,
        // 关闭按钮
        'kai_guan': 0,
        //套装显示图片,
        'suit_map': [],
        //套装图片
        'suit_map_black': [],
        //套装名字
        'suit_name_ui': [],
        //套装数量文本
        'suit_nun_text': [],
        // 套装图片 butt
        'suit_butt': [],
        // 是否点亮
        'light': { 0: [], 1: [], 2: [], 3: [], },
        //页码
        'page': 1,
        // 最大的页码
        'max_page': 1
    }
    // ui的名字
    UIname: number = 0
    // 记录ui大小
    UISize: { [ui_id: number]: { width: number, height: number } } = {}
    // 用物品名字 记录ui 序号 
    static ui_index: { [name: string]: number } = {}
    // 套装名字 记录ui数量  //套装名字数量
    static suit_nunber: { [name: string]: number } = {}
    static BG = [
        //主背景图
        "UI_Icon\\TZUI\\bg.tga",
        //右上角关闭图
        "UI_Icon\\TZUI\\xxxx.tga",
        //左翻页
        "UI_Icon\\TZUI\\zuo.tga",
        //右翻页
        "UI_Icon\\TZUI\\you.tga",
        //f5 
        "UI_Icon\\cstp.tga"

    ]

    constructor() {

        // //按 F3 显示/隐藏-套装界面 -----------------------------------------------
        DzTriggerRegisterKeyEventByCode(null, 114, 1, false, () => {
            all_frame['Show'] = !all_frame['Show']
            DzFrameShow(all_frame['back_map'], all_frame['Show']);
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())
            Suit_Equip_Ui_Show.refresh_page_ui(id)
        })

        let all_frame = Suit_Equip_Ui_Show.All_Frame
        // F3按键图标
        all_frame['F5_BG'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetAbsolutePoint(all_frame['F5_BG'], 4, 0.1, 0.55)
        DzFrameSetSize(all_frame['F5_BG'], 0.03, 0.03)
        // 记录ui大小
        this.Record_UI_Size(all_frame['F5_BG'], 0.03, 0.03)
        DzFrameSetTexture(all_frame['F5_BG'], Suit_Equip_Ui_Show.BG[4], 0)
        // DzFrameShow(all_frame['F5_BG'], false)
        // 按钮点击-----------
        let F5_BG_butt = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), all_frame['F5_BG'], "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(F5_BG_butt, 0, all_frame['F5_BG'], 0, 0, 0)
        DzFrameSetPoint(F5_BG_butt, 8, all_frame['F5_BG'], 8, 0, 0)
        // 悬停放大反馈
        this.button_register_into_enlarge(F5_BG_butt, all_frame['F5_BG'])
        // 注册点击事件 -----------------------------------------------
        DzFrameSetScriptByCode(F5_BG_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            all_frame['Show'] = !all_frame['Show']
            DzFrameShow(all_frame['back_map'], all_frame['Show']);
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())
            Suit_Equip_Ui_Show.refresh_page_ui(id)
        }, false)

        // 背景图   ---------------------------------------
        all_frame['back_map'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetAbsolutePoint(all_frame['back_map'], 4, 0.4, 0.35)
        DzFrameSetSize(all_frame['back_map'], 0.35, 0.35)  //0.4
        DzFrameSetTexture(all_frame['back_map'], Suit_Equip_Ui_Show.BG[0], 0)
        DzFrameShow(all_frame['back_map'], false)

        // 边框 --------------------------------
        let jamb = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "Demo_BorderBack", 0)
        DzFrameShow(jamb, false)
        // 边框图片 --------------------------------
        let jam_BG = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), jamb, "template", 0)
        // DzFrameSetPoint(butt_bg, 4, all_frame['back_map'], 2, -0.01, -0.01)
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
        DzFrameSetSize(jamb_txt, 0.15, 0.05)
        DzFrameSetFont(jamb_txt, 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameSetPoint(jamb_txt, 0, jamb_tip, 6, 0, 0)
        DzFrameSetText(jamb_txt, '套装部件文本')
        DzFrameSetTextAlignment(jamb_txt, TEXTALIGN_LEFT)

        // 关闭按钮图片 ----------------------
        let butt_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
        DzFrameSetPoint(butt_bg, 4, all_frame['back_map'], 2, -0.01, -0.08)
        DzFrameSetSize(butt_bg, 0.03, 0.06)
        DzFrameSetTexture(butt_bg, Suit_Equip_Ui_Show.BG[1], 0)

        // 记录ui大小
        this.Record_UI_Size(butt_bg, 0.03, 0.06)
        // 关闭按钮
        all_frame['kai_guan'] = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), all_frame['back_map'], "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(all_frame['kai_guan'], 4, butt_bg, 4, 0, -0.01)
        DzFrameSetSize(all_frame['kai_guan'], 0.03, 0.06)
        // 注册按钮图片放大反馈
        // this.button_register_into_enlarge(all_frame['kai_guan'], butt_bg)
        // 注册点击事件 -----------------------------------------------
        DzFrameSetScriptByCode(all_frame['kai_guan'], FRAMEEVENT_CONTROL_CLICK, () => {
            all_frame['Show'] = !all_frame['Show']
            DzFrameShow(all_frame['back_map'], all_frame['Show']);
        }, false)


        // 翻页左图片 ----------------------------------
        let left_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
        DzFrameSetPoint(left_bg, 4, all_frame['back_map'], 7, -0.04, 0.02)
        DzFrameSetSize(left_bg, 0.02, 0.02)
        DzFrameSetTexture(left_bg, Suit_Equip_Ui_Show.BG[2], 0)
        // 左翻页按钮
        let left_butt = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), all_frame['back_map'], "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(left_butt, 0, left_bg, 0, 0, 0)
        DzFrameSetPoint(left_butt, 8, left_bg, 8, 0, 0)
        // 记录ui大小
        this.Record_UI_Size(left_bg, 0.02, 0.02)
        // 注册按钮图片放大反馈
        this.button_register_into_enlarge(left_butt, left_bg)
        // 翻页右图片 ----------------------
        let right_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
        DzFrameSetPoint(right_bg, 4, all_frame['back_map'], 7, 0.04, 0.02)
        DzFrameSetSize(right_bg, 0.02, 0.02)
        DzFrameSetTexture(right_bg, Suit_Equip_Ui_Show.BG[3], 0) // 
        // 右翻页按钮
        let right_butt = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), all_frame['back_map'], "ScoreScreenTabButtonTemplate", 0)
        DzFrameSetPoint(right_butt, 0, right_bg, 0, 0, 0)
        DzFrameSetPoint(right_butt, 8, right_bg, 8, 0, 0)
        // 记录ui大小
        this.Record_UI_Size(right_bg, 0.02, 0.02)
        // 注册按钮图片放大反馈
        this.button_register_into_enlarge(right_butt, right_bg)
        // 翻页文本 ----------------------
        let page_txt = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
        DzFrameSetSize(page_txt, 0.05, 0.016)
        DzFrameSetFont(page_txt, 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
        DzFrameSetPoint(page_txt, 4, all_frame['back_map'], 7, 0.0025, 0.02)
        DzFrameSetText(page_txt, all_frame['page'] + '/' + all_frame['max_page'])
        DzFrameSetTextAlignment(page_txt, TEXTALIGN_CENTER)
        // 左点击事件
        DzFrameSetScriptByCode(left_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            DzFrameSetEnable(left_butt, false)
            let width = this.UISize[left_bg].width
            let height = this.UISize[left_bg].height
            let size = 0.015
            // let step = width / 10
            BaseUtil.onTimer(0.02, (count) => {
                size = size - 0.004
                DzFrameSetSize(left_bg, width + size, height + size)
                if (count >= 8) {
                    DzFrameSetSize(left_bg, width, height)
                    DzFrameSetEnable(left_butt, true)
                    return false
                }
                return true
            })
            // 翻页 
            if (all_frame['page'] > 1) {
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '1');
                all_frame['page']--
                DzFrameSetText(page_txt, all_frame['page'] + '/' + all_frame['max_page'])
                let id = GetPlayerId(DzGetTriggerUIEventPlayer())
                Suit_Equip_Ui_Show.refresh_page_ui(id)
            }

        }, false)
        // 右点击事件-------------------
        DzFrameSetScriptByCode(right_butt, FRAMEEVENT_CONTROL_CLICK, () => {
            DzFrameSetEnable(right_butt, false)
            let width = this.UISize[right_bg].width
            let height = this.UISize[right_bg].height
            let size = 0.015
            // let step = width / 10
            BaseUtil.onTimer(0.02, (count) => {
                size = size - 0.004
                DzFrameSetSize(right_bg, width + size, height + size)
                if (count >= 8) {
                    DzFrameSetSize(right_bg, width, height)
                    DzFrameSetEnable(right_butt, true)
                    return false
                }
                return true
            })
            // 右翻页 
            if (all_frame['page'] < all_frame['max_page']) {
                all_frame['page']++
                //刷新翻页文本
                DzFrameSetText(page_txt, all_frame['page'] + '/' + all_frame['max_page'])
                let id = GetPlayerId(DzGetTriggerUIEventPlayer())
                Suit_Equip_Ui_Show.refresh_page_ui(id)
                // Suit_Equip_Ui_Show.refresh_page_ui(id:id)

            }

        }, false)


        // 创建套装图片 -----------------------------------------------
        let width = 5
        all_frame['max_page'] = math.floor(data_config.length / 20) + all_frame['max_page']
        DzFrameSetText(page_txt, all_frame['page'] + '/' + all_frame['max_page'])
        // 存序号
        for (let i = 0; i < data_config.length; i++) {
            let index = i
            let cfgData = data_config[index]
            Suit_Equip_Ui_Show.ui_index[cfgData['name']] = index
            // 预设都是不点亮
            for (let j = 0; j < 4; j++) {
                let light_array: boolean[] = Suit_Equip_Ui_Show.All_Frame['light'][j]
                light_array[index] = false
            }
            // 预设套装都是0，记录套装数量 -----------------------------
            if (i % width == 0) {
                let mold: string = data_config[index]['mold']
                // //  套装名字
                Suit_Equip_Ui_Show.suit_nunber[mold] = 0
            }
        }
        for (let i = 0; i < 20; i++) {
            let index = i
            // 拿到
            let cfgData = data_config[index]

            // // 图片
            let art = ''
            if (cfgData) {
                art = cfgData['Art']
            }
            // let x = -0.15 + 0.05 * (i % width)
            let x = - 0.10 + 0.05 * (i % width)
            // let y = 0.085 - Math.floor(i / width) * 0.06
            let y = 0.07 - Math.floor(i / width) * 0.06
            // 套装文本----------------------------

            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'i % width=' + i % width);

            if (i % width == 0) {
                let suit_name_ui_array: number[] = all_frame['suit_name_ui']
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'i=' + i);
                let suit_name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
                suit_name_ui_array.push(suit_name)
                DzFrameSetSize(suit_name, 0.08, 0.016)
                DzFrameSetFont(suit_name, 'Fonts\\ChaoCuZiTi.ttf', 0.014, 0)
                DzFrameSetPoint(suit_name, 4, all_frame['back_map'], 4, x, 0.03 + y)
                DzFrameSetText(suit_name, '套装名字')
                DzFrameSetTextAlignment(suit_name, TEXTALIGN_CENTER)

                // 套装文本 数量UI ------------------------------------
                let suit_num = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), suit_name, "template", 0)
                let suit_nun_text_array: number[] = all_frame['suit_nun_text']
                suit_nun_text_array.push(suit_num)
                DzFrameSetSize(suit_num, 0.08, 0.016)
                DzFrameSetFont(suit_num, 'Fonts\\ChaoCuZiTi.ttf', 0.013, 0)
                DzFrameSetPoint(suit_num, 4, suit_name, 4, 0.22, 0)
                DzFrameSetText(suit_num, '集齐效果')
                DzFrameSetTextAlignment(suit_name, TEXTALIGN_CENTER)
            }
            // // 创建套装 图片 -------------------
            let suit_BG = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), all_frame['back_map'], "template", 0)
            let suit_map_array: number[] = all_frame['suit_map']
            suit_map_array.push(suit_BG)
            DzFrameSetSize(suit_BG, 0.04, 0.04)
            // 记录ui大小
            this.Record_UI_Size(suit_BG, 0.04, 0.04)
            DzFrameSetPoint(suit_BG, 4, all_frame['back_map'], 4, x, y)
            // DzFrameSetAbsolutePoint(suit_butt, 4, x, y)
            DzFrameSetTexture(suit_BG, art, 0)
            // // 创建套装 图片 ---------------------------
            let suit_map_black = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), suit_BG, "template", 0)
            let suit_map_black_array: number[] = all_frame['suit_map_black']
            suit_map_black_array.push(suit_map_black)
            DzFrameSetPoint(suit_map_black, 0, suit_BG, 0, 0, 0)
            DzFrameSetPoint(suit_map_black, 8, suit_BG, 8, 0, 0)
            // textures\\black32.blp
            DzFrameSetTexture(suit_map_black, 'textures\\black32.blp', 0)
            DzFrameSetAlpha(suit_map_black, 200)
            // 创建套装 butt    -------------
            let suit_butt = DzCreateFrameByTagName("BUTTON", this.Suit_Ui_Name(), suit_BG, "ScoreScreenTabButtonTemplate", 0)
            DzFrameSetSize(suit_butt, 0.04, 0.04)
            DzFrameSetPoint(suit_butt, 4, suit_BG, 4, 0, 0)
            // 注册按钮图片放大反馈
            // 注册显示提示边框

            this.button_into_Tip(suit_butt, suit_BG, jamb, jam_BG, jamb_name, jamb_tip, jamb_txt, index, all_frame['page'])


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
     * 记录UI大小
     */
    Record_UI_Size(frame_ui: number, width: number, height: number) {
        if (!this.UISize[frame_ui]) {
            let table: { width: number, height: number } = { width: width, height: height }
            this.UISize[frame_ui] = table
        }

    }


    /**
     * 进入按钮 改变按钮图片大小
     * @param frame_ui 按钮UI
     * @param frame_bg 按钮UI的图片
     */
    button_register_into_enlarge(butt: number, frame_bg: number) {
        let width = this.UISize[frame_bg].width
        let height = this.UISize[frame_bg].height
        // 进入事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_ENTER, () => {
            DzFrameSetSize(frame_bg, width + 0.01, height + 0.01)
        }, false)

        // butt注册 离开事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_LEAVE, () => {
            DzFrameSetSize(frame_bg, width, height)
        }, false)

    }

    /**
    * 进入按钮 显示提示框
    * @param frame_ui 按钮UI
    * @param frame_bg 按钮UI的图片
    */
    button_into_Tip(butt: number, suit_BG: number, jamb: number, jam_BG: number, jamb_name: number, jamb_tip: number, jamb_txt: number, index: number, page: number) {
        let width = this.UISize[suit_BG].width
        let height = this.UISize[suit_BG].height
        // 进入事件
        DzFrameSetScriptByCode(butt, FRAMEEVENT_MOUSE_ENTER, () => {
            // 反馈大小
            DzFrameSetSize(suit_BG, width + 0.01, height + 0.01)


            let index_max = index + (Suit_Equip_Ui_Show.All_Frame['page'] - 1) * 20
            let arr = data_config[index_max];
            //每一页
            // let arr = data_arr[Suit_Equip_Ui_Show.All_Frame['page'] - 1][index]
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'page=' + Suit_Equip_Ui_Show.All_Frame['page']);
            // // 图片
            let art = arr['Art']
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'art=' + art);
            let name = arr['name']
            let tip = ''
            // 获取途径文本
            let id = GetPlayerId(DzGetTriggerUIEventPlayer())
            let light_array: boolean[] = Suit_Equip_Ui_Show.All_Frame['light'][id]
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'light_array[index]=' + light_array[index]);
            // 获取
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index_max=' + index_max);
            if (light_array[index_max]) {
                tip = '|cff00ff00已激活！'
            } else if ((index_max + 1) % 5 == 0) {
                tip = '|cffff0000激活条件：4件套装部件全部激活'
                // 未激活文本
            } else {
                tip = '|cffffff00获取途径：通关获得神器!'
            }
            let Ubertip = arr['Ubertip']
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'Ubertip=' + Ubertip);
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
            DzFrameSetSize(suit_BG, width, height)
            DzFrameShow(jamb, false)
        }, false)

    }

    // 刷新页面ui
    static refresh_page_ui(id: number) {
        // 更新ui
        let all_frame = Suit_Equip_Ui_Show.All_Frame
        let page_num = (all_frame['page'] - 1) * 20
        let width = 5
        for (let i = 0; i < 20; i++) {
            let index_max = i + page_num
            let cfgData = data_config[index_max]
            let temp = math.floor(i / width)
            // 套装名字
            let suit_name_ui: number[] = all_frame['suit_name_ui']
            /// 套装图片
            let suit_map_array: number[] = all_frame['suit_map']
            if (!cfgData) {
                DzFrameShow(suit_name_ui[temp], false)
                DzFrameShow(suit_map_array[i], false)
                continue
            } else {
                DzFrameShow(suit_name_ui[temp], true)
                DzFrameShow(suit_map_array[i], true)
            }
            let index = i
            // 更新 套装名字 -- 套装数量
            if (i % width == 0) {
                // 更新套装名字
                let mold: string = cfgData['mold']
                DzFrameSetText(suit_name_ui[temp], mold)
                // 修改 -- 套装数量
                // let mold_num = Suit_Equip_Ui_Show.suit_nunber[mold]
                // let suit_nun_text_array: number[] = all_frame['suit_nun_text']
                // DzFrameSetText(suit_nun_text_array[temp], mold_num + '/5')
            }
            // 更新套装图片
            let art: string = cfgData['Art']
            // DzFrameSetAbsolutePoint(suit_butt, 4, x, y)
            DzFrameSetTexture(suit_map_array[index], art, 0)
            // // 套装 暗图片 ---------------------------
            let suit_map_black_array: number[] = all_frame['suit_map_black']
            // // 是否 -- 点亮图片
            let light_array: boolean[] = Suit_Equip_Ui_Show.All_Frame['light'][id]
            // let light_array: boolean[] = all_frame['light']
            if (light_array[index_max]) {
                // 记录这个ui被点亮
                DzFrameSetAlpha(suit_map_black_array[index], 0)
            } else {
                DzFrameSetAlpha(suit_map_black_array[index], 200)
            }

        }


    }

    // // 使用物品动作
    // action(this: void) {
    //     let name = GetItemName(GetManipulatedItem())
    //     // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'name=' + name);)
    //     if (Suit_Equip_Ui_Show.ui_index[name]) {
    //         let player = GetOwningPlayer(GetManipulatingUnit())
    //         let id = GetPlayerId(player)
    //         // 获取wu对应的ui序号
    //         let index = Suit_Equip_Ui_Show.ui_index[name]
    //         // 是否被点亮？
    //         let light_array: boolean[] = Suit_Equip_Ui_Show.All_Frame['light'][id]
    //         if (!light_array[index]) {
    //             // 记录这个ui被点亮
    //             light_array[index] = true
    //         } else {
    //             // 重复使用 转换成木头  通关获得神器，获得同样神器分解为符石经验值
    //             AdjustPlayerStateBJ(10, player, PLAYER_STATE_RESOURCE_LUMBER)
    //             DisplayTimedTextToPlayer(player, 0, 0, 60, '重复激活，奖励10木头！');
    //             return
    //         }
    //         if (GetLocalPlayer() == player) {
    //             // 点亮图标
    //             Suit_Equip_Ui_Show.dot_light(index, id)
    //         }

    //     }
    // }
    /**
     * 点亮图片
     * @param index ui的索引
     */
    static dot_light(index: number, id: number) {
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
        let all_frame = Suit_Equip_Ui_Show.All_Frame
        let suit_map_black_array: number[] = all_frame['suit_map_black']
        DzFrameSetAlpha(suit_map_black_array[index], 0)
        // 修改 -- 点亮图片
        let light_array: boolean[] = Suit_Equip_Ui_Show.All_Frame['light'][id]
        // let light_array: boolean[] = all_frame['light']
        // 记录套装数量 -----------------------------
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'math.floor(index/7)=' + math.floor(index/7));
        let mold: string = data_config[math.floor(index / 7)]['mold']
        let mold_num = Suit_Equip_Ui_Show.suit_nunber[mold]
        mold_num++
        Suit_Equip_Ui_Show.suit_nunber[mold] = mold_num
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'mold_num=' + mold_num);
        // 修改 -- 套装数量
        let index1 = math.floor(index / 7)

        let suit_nun_text_array: number[] = all_frame['suit_nun_text']
        // DzFrameSetText(suit_nun_text_array[index1], mold_num + '/5')

        if (mold_num >= 5 && !light_array[index1 + 6]) {
            let temp6 = index1 + 6
            DzFrameSetAlpha(suit_map_black_array[temp6], 0)
            light_array[temp6] = true
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'temp6=' + temp6);
        }
        if (mold_num >= 2 && !light_array[index1 + 5]) {
            let temp5 = index1 + 5
            DzFrameSetAlpha(suit_map_black_array[temp5], 0)
            light_array[temp5] = true
        }
    }





}
