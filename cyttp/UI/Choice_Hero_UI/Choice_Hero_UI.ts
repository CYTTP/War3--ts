

import UnitFetterEffect from "cyttp/Fetter/UnitFetterEffect";
import AnimationUtil from "cyttp/Util/AnimationUtil";
import DataBase from "solar/common/DataBase";
import CameraUtil from "solar/util/CameraUtil";
import { Frame } from "solar/w3ts/handles/frame";
import { Unit } from "solar/w3ts/handles/unit";
import HopeNonRepeatingRandom from "../../Util/HopeNonRepeatingRandom";
import Attribute_Panel1 from "../Attribute_Panel_UI/Attribute_Panel1";
import Suit_Equip_Ui_Show from "../CD_Suit_UI/Suit_Equip_Ui_Show";
import keepIntheArchives from "../CD_UI/keepIntheArchives";
import ChallengeBoss from "../Challenge_Boss_UI/ChallengeBoss";
import FirstChargeGiftPack from "../FirstChargeGiftPack/FirstChargeGiftPack";


DzLoadToc('UI\\UIsf.toc')
// Choice_Hero_UI
export default class Choice_Hero_UI {//选择难度界面
    static config: {
        // 英雄ID池
        Hero_Id: string[],
        //英雄技能技能id
        Hero_ab_Id: {
            [id: string]: string[]
        },

        // 刷新次数
        Refresh_count: number[],
        //英雄单位创建的坐标
        rect_hero: rect[],
        // 记录英雄单位
        Hero_unit: unit[];
        // 贴图汇总
        bg_str_sum: string[];
    } = {
            // 注意，请在物遍，填好三项：头像-Tip,名字-Name,文本扩展-Ubertip
            Hero_Id: [
                'Q0ou', 'Q0ov', 'Q0p0', 'Q0p1', 'Q0p2', 'Q0p3', 'Q0p4', 'Q0p5',
                'Q0p6', 'Q0p7', 'Q0p8', 'Q0p9', 'Q0pa', 'Q0pb', 'Q0pc', 'Q0pd',
                'Q0pe', 'Q0pf', 'Q0pg', 'Q0ph', 'Q0pi', 'Q0pj', 'Q0pk', 'Q0pl',
                'Q0pm', 'Q0pn', 'Q0po', 'Q0pp', 'Q0pq', 'Q0pr', 'Q0ps', 'Q0pt',
                'Q0pu', 'Q0pv', 'Q0q0',
            ],
            Hero_ab_Id: {      //前面是5个技能      最后一项是英雄对应的物品
                'Q0ou': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q152'],
                'Q0ov': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q153'],
                'Q0p0': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q154'],
                'Q0p1': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q155'],
                'Q0p2': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q156'],
                'Q0p3': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q157'],
                'Q0p4': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q158'],
                'Q0p5': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q159'],
                'Q0p6': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15a'],
                'Q0p7': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15b'],
                'Q0p8': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15c'],
                'Q0p9': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15d'],
                'Q0pa': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15e'],
                'Q0pb': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15f'],
                'Q0pc': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15g'],
                'Q0pd': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15h'],
                'Q0pe': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15i'],
                'Q0pf': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15j'],
                'Q0pg': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15k'],
                'Q0ph': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15l'],
                'Q0pi': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15m'],
                'Q0pj': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15n'],
                'Q0pk': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15o'],
                'Q0pl': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15p'],
                'Q0pm': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15q'],
                'Q0pn': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15r'],
                'Q0po': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15s'],
                'Q0pp': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15t'],
                'Q0pq': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15u'],
                'Q0pr': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q15v'],
                'Q0ps': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q160'],
                'Q0pt': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q161'],
                'Q0pu': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q162'],
                'Q0pv': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q163'],
                'Q0q0': ['A000', 'A001', 'A002', 'A003', 'A00E', 'q164'],
            },
            //四个玩家的第一个区域
            rect_hero: [gg_rct_p1_zbq_r1, gg_rct_p2_zbq_r1, gg_rct_p3_zbq_r1, gg_rct_p4_zbq_r1],
            // 记录，通过ui选择英雄，创建的英雄单位
            Hero_unit: [],
            // 设置每个玩家默认刷新次数,注意：初始的第一次也会算一次
            Refresh_count: [4, 4, 4, 4],
            // 贴图路径
            bg_str_sum: [
                // 主背景图路径
                'xuan_ze_ying_xiong_tga\\nothing.tga',
                // 选择英雄-背景框
                'UI_Icon\\xuanyxbg.tga',
                // 选择英雄-背景框-发光边框
                'xuan_ze_ying_xiong_tga\\ka_pai_bian_kuang_-faguang.tga',
                // 选择英雄-双击确定-图标
                'UI_Icon\\UIxznd\\ui-xznd-moshixuanze.tga',
                // 选择英雄-刷新-图标
                'UI_Icon\\UIxznd\\ui-xznd-xzms-ptms-jy.tga',
                // 选择英雄-刷新按钮-发光边框
                'xuan_ze_ying_xiong_tga\\shuaxfaguang.tga',
                //技能描述框
                'UI_Icon\\jnwbms.tga',
                //星图标
                'UI_Icon\\xingbiao01.tga'
            ],
        };

    // ui的名称
    public static UI_msndName: number = 0
    // ui的选择英雄大背景图
    static UI_xz_ying_xiong: number;
    // ui的三个背景图
    static UI_bg: number[] = []
    // ui的三个按钮
    static UI_butt: number[] = []
    // ui技能的5个按钮
    static UI_abbutt: number[] = []
    //技能说明框
    static UI_abdec: number[] = []
    // ui的英雄图标，名字，说明
    static UI_Hero_config: number[] = []
    // 3个随机英雄id
    static UI_Hero_Random_id: string[] = []

    // 初始化
    constructor() {
        //英雄选择主界面 ---  ---------------------
        Choice_Hero_UI.UI_xz_ying_xiong = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), DzGetGameUI(), "template", 0)
        DzFrameSetPoint(Choice_Hero_UI.UI_xz_ying_xiong, 0, DzGetGameUI(), 0, 0, 0)
        DzFrameSetTexture(Choice_Hero_UI.UI_xz_ying_xiong, Choice_Hero_UI.config.bg_str_sum[0], 0)
        DzFrameSetSize(Choice_Hero_UI.UI_xz_ying_xiong, 0.8, 0.8)
        DzFrameShow(Choice_Hero_UI.UI_xz_ying_xiong, false)
        // 创建 选择英雄的ui按钮
        Choice_Hero_UI.Create_Frame()
        // 随机  3个选择英雄的信息
        let Hero_Id: string[] = Choice_Hero_UI.config.Hero_Id
        let leng = Hero_Id.length
        let index_array: number[] = HopeNonRepeatingRandom(0, leng - 1, 3)
        for (let j = 0; j < 4; j++) {
            let player = Player(j)
            if (GetLocalPlayer() == player) {
                Choice_Hero_UI.Refresh(j, index_array)
            }
        }

        // // 注册事件同步数据
        let triggerHandle = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle, "UI双击选择英雄", false)
        TriggerAddAction(triggerHandle, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let p: player = Player(index)
            let ID: string = SubString(str, 2, length)
            let x = GetRectCenterX(Choice_Hero_UI.config.rect_hero[index])
            let y = GetRectCenterY(Choice_Hero_UI.config.rect_hero[index])
            let unit = CreateUnit(p, ID, x, y, 0)
            let TX1 = AddSpecialEffectTarget('8061a5b90c1a7ec6.mdx', unit, 'overhead')
            Unit.fromHandle(unit).solarData.英雄星数量 = TX1
            //记录英雄单位 -----------------------------------
            DataBase.getPlayerSolarData(p).创建英雄单位 = unit

            if (GetLocalPlayer() == p) {
                //刷新羁绊效果
                UnitFetterEffect.refesh_effect(ID, index)
                //动画效果
                AnimationUtil.telekineticMovement(UnitFetterEffect.panel_UI['阵营按钮'], 800, 0.4, 0.33, 0.023, 0.5)
                AnimationUtil.telekineticMovement(UnitFetterEffect.panel_UI['定位按钮'], 900, 0.4, 0.33, 0.023, 0.46)
                AnimationUtil.telekineticMovement(UnitFetterEffect.panel_UI['个人按钮'], 1000, 0.4, 0.33, 0.023, 0.42)
                AnimationUtil.telekineticMovement(ChallengeBoss.panel_UI['收缩左'], 1000, 0.4, 0.33, 0.023, 0.15)
                AnimationUtil.telekineticMovement(Suit_Equip_Ui_Show.All_Frame['F5_BG'], 800, 0.4, 0.33, 0.1, 0.55)
                AnimationUtil.telekineticMovement(keepIntheArchives.archive_UI['F4_BG'], 900, 0.4, 0.33, 0.15, 0.55)
                AnimationUtil.telekineticMovement(FirstChargeGiftPack.panel_UI[1], 1000, 0.4, 0.33, 0.20, 0.55)
                //平移镜头
                PanCameraToTimed(x, y, 0)
                // 玩家 -- 选择单位
                ClearSelection()
                SelectUnit(unit, true)
            }
        });
    }
    public static NewUIName(): string {//UI名字生成
        Choice_Hero_UI.UI_msndName++
        return "Choice_Hero_UI" + I2S(Choice_Hero_UI.UI_msndName)
    }
    static Create_Frame() {
        let father_UI = Choice_Hero_UI.UI_xz_ying_xiong ? Choice_Hero_UI.UI_xz_ying_xiong : DzGetGameUI()
        let x = 0.165
        let h = 0.25
        let w = 0.17
        // 创建 三个 英雄选择 贴图---------------
        let UI_bg = Choice_Hero_UI.UI_bg
        for (let i = 0; i < 3; i++) {
            UI_bg[i] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
            DzFrameSetTexture(UI_bg[i], Choice_Hero_UI.config.bg_str_sum[1], 0)
            DzFrameSetSize(UI_bg[i], w, h)
            DzFrameSetAbsolutePoint(UI_bg[i], 4, x, 0.35)
            x = x + 0.24
        }
        // // 创建 边框发亮 贴图------------------------
        UI_bg[3] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
        DzFrameSetTexture(UI_bg[3], Choice_Hero_UI.config.bg_str_sum[2], 0)
        DzFrameSetSize(UI_bg[3], w, h)
        DzFrameSetPoint(UI_bg[3], 4, UI_bg[0], 4, 0, 0)
        DzFrameShow(UI_bg[3], false)
        //星的高宽h
        let xingw = 0.07
        let xingh = 0.023

        // 创建英雄图标 -- 英雄名字 -- 英雄简介说明
        let UI_Hero_config = Choice_Hero_UI.UI_Hero_config
        for (let i = 0; i < 3; i++) {
            UI_Hero_config[i] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetTexture(UI_Hero_config[i], Choice_Hero_UI.config.bg_str_sum[2], 0)
            DzFrameSetSize(UI_Hero_config[i], 0.04, 0.04)
            DzFrameSetPoint(UI_Hero_config[i], 4, UI_bg[i], 0, 0.04, -0.05)

            UI_Hero_config[i + 3] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 3], 0.1, 0.02)
            DzFrameSetPoint(UI_Hero_config[i + 3], 3, UI_Hero_config[i], 5, 0.02, 0.01)
            DzFrameSetFont(UI_Hero_config[i + 3], "fonts\\ChaoCuZiTi.ttf", 0.016, 0)
            DzFrameSetText(UI_Hero_config[i + 3], "英雄名字")
            DzFrameSetTextAlignment(UI_Hero_config[i + 3], TEXTALIGN_LEFT)
            //
            UI_Hero_config[i + 33] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 33], 0.1, 0.02)
            DzFrameSetPoint(UI_Hero_config[i + 33], 3, UI_Hero_config[i], 5, 0.02, -0.013)
            DzFrameSetFont(UI_Hero_config[i + 33], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_Hero_config[i + 33], "英雄品阶")
            DzFrameSetTextAlignment(UI_Hero_config[i + 33], TEXTALIGN_LEFT)


            UI_Hero_config[i + 6] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 6], 0.2, 0.3)
            DzFrameSetPoint(UI_Hero_config[i + 6], 0, UI_Hero_config[i], 6, 0.0, -0.04)
            DzFrameSetFont(UI_Hero_config[i + 6], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_Hero_config[i + 6], "英雄定位：")
            DzFrameSetTextAlignment(UI_Hero_config[i + 6], TEXTALIGN_TOPLEFT)
            //-------------------------------星----------------------------//
            //xing 1
            UI_Hero_config[i + 12] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 12], xingw, xingh)
            DzFrameSetPoint(UI_Hero_config[i + 12], 0, UI_Hero_config[i], 8, -0.065, -0.01)
            DzFrameSetTexture(UI_Hero_config[i + 12], Choice_Hero_UI.config.bg_str_sum[7], 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 12], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_Hero_config[i + 12], false)
            //2
            UI_Hero_config[i + 15] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 15], xingw, xingh)
            DzFrameSetPoint(UI_Hero_config[i + 15], 0, UI_Hero_config[i], 8, -0.039, -0.01)
            DzFrameSetTexture(UI_Hero_config[i + 15], Choice_Hero_UI.config.bg_str_sum[7], 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 15], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_Hero_config[i + 15], false)
            //3
            UI_Hero_config[i + 18] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 18], xingw, xingh)
            DzFrameSetPoint(UI_Hero_config[i + 18], 0, UI_Hero_config[i], 8, - 0.013, -0.01)
            DzFrameSetTexture(UI_Hero_config[i + 18], Choice_Hero_UI.config.bg_str_sum[7], 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 18], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_Hero_config[i + 18], false)
            //4
            UI_Hero_config[i + 21] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 21], xingw, xingh)
            DzFrameSetPoint(UI_Hero_config[i + 21], 0, UI_Hero_config[i], 8, 0.013, -0.01)
            DzFrameSetTexture(UI_Hero_config[i + 21], Choice_Hero_UI.config.bg_str_sum[7], 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 21], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_Hero_config[i + 21], false)
            //5
            UI_Hero_config[i + 24] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 24], xingw, xingh)
            DzFrameSetPoint(UI_Hero_config[i + 24], 0, UI_Hero_config[i], 8, 0.039, -0.01)
            DzFrameSetTexture(UI_Hero_config[i + 24], Choice_Hero_UI.config.bg_str_sum[7], 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 24], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_Hero_config[i + 24], false)

            //-------------------------------*-----------------------------------------
            //英雄介绍
            UI_Hero_config[i + 27] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 27], 0.1, 0.3)
            DzFrameSetPoint(UI_Hero_config[i + 27], 0, UI_Hero_config[i], 6, 0.0, -0.06)
            DzFrameSetFont(UI_Hero_config[i + 27], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_Hero_config[i + 27], "英雄介绍：")
            DzFrameSetTextAlignment(UI_Hero_config[i + 27], TEXTALIGN_TOPLEFT)

            //内容   -动态获取英雄介绍
            UI_Hero_config[i + 30] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 30], 0.14, 0.3)
            DzFrameSetPoint(UI_Hero_config[i + 30], 0, UI_Hero_config[i], 6, 0.0, -0.08)
            DzFrameSetFont(UI_Hero_config[i + 30], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 30], TEXTALIGN_TOPLEFT)



            //--------------------------------------英雄技能显示--------------------------------//
            let abw = 0.022
            let abh = 0.023
            let abBarh = -0.11
            // 1

            UI_Hero_config[i + 36] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 36], abw, abh)
            DzFrameSetPoint(UI_Hero_config[i + 36], 0, UI_Hero_config[i], 8, -0.04, abBarh)
            DzFrameSetTexture(UI_Hero_config[i + 36], 'UI_Icon\\cstp.tga', 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 36], TEXTALIGN_TOPLEFT)
            DzFrameSetPriority(UI_Hero_config[i + 36], UI_bg[3])
            //2
            UI_Hero_config[i + 39] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 39], abw, abh)
            DzFrameSetPoint(UI_Hero_config[i + 39], 0, UI_Hero_config[i], 8, -0.017, abBarh)
            DzFrameSetTexture(UI_Hero_config[i + 39], 'UI_Icon\\cstp.tga', 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 39], TEXTALIGN_TOPLEFT)
            DzFrameSetPriority(UI_Hero_config[i + 39], UI_bg[3])
            //3
            UI_Hero_config[i + 42] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 42], abw, abh)
            DzFrameSetPoint(UI_Hero_config[i + 42], 0, UI_Hero_config[i], 8, 0.006, abBarh)
            DzFrameSetTexture(UI_Hero_config[i + 42], 'UI_Icon\\cstp.tga', 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 42], TEXTALIGN_TOPLEFT)
            DzFrameSetPriority(UI_Hero_config[i + 42], UI_bg[3])
            //4
            UI_Hero_config[i + 45] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 45], abw, abh)
            DzFrameSetPoint(UI_Hero_config[i + 45], 0, UI_Hero_config[i], 8, 0.029, abBarh)
            DzFrameSetTexture(UI_Hero_config[i + 45], 'UI_Icon\\cstp.tga', 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 45], TEXTALIGN_TOPLEFT)
            DzFrameSetPriority(UI_Hero_config[i + 45], UI_bg[3])
            //5
            UI_Hero_config[i + 48] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_Hero_config[i + 48], abw, abh)
            DzFrameSetPoint(UI_Hero_config[i + 48], 0, UI_Hero_config[i], 8, 0.052, abBarh)
            DzFrameSetTexture(UI_Hero_config[i + 48], 'UI_Icon\\cstp.tga', 0)
            DzFrameSetTextAlignment(UI_Hero_config[i + 48], TEXTALIGN_TOPLEFT)
            DzFrameSetPriority(UI_Hero_config[i + 48], UI_bg[3])


        }

        // // 创建 技能边框发亮 贴图------------------------
        UI_bg[4] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
        DzFrameSetTexture(UI_bg[4], Choice_Hero_UI.config.bg_str_sum[2], 0)
        DzFrameSetSize(UI_bg[4], 0.02, 0.02)
        DzFrameSetPoint(UI_bg[4], 4, UI_bg[0], 4, 0, 0)
        DzFrameShow(UI_bg[4], false)
        //jienng
        let UI_abbutt = Choice_Hero_UI.UI_abbutt
        let UI_abdec = Choice_Hero_UI.UI_abdec
        //技能文本框宽
        let textW = 0.16
        //技能文本框高
        let texth = 0.10
        //技能名字
        let abnw = 0.01
        let abnh = -0.02
        //技能描述
        let abdec1 = 0.01
        let abdec2 = -0.038
        //--------------------------------------------1-------------------------------
        for (let i = 0; i < 3; i++) {
            UI_abbutt[i] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_Hero_config[i + 36], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_abbutt[i], 0.02, 0.02)
            DzFrameSetPoint(UI_abbutt[i], 4, UI_Hero_config[i + 36], 4, 0, 0)
            DzFrameShow(UI_abbutt[i], true)
            //文本描述
            UI_abdec[i] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i], textW, texth)
            DzFrameSetPoint(UI_abdec[i], 0, UI_Hero_config[i + 36], 6, -0.015, 0.0)
            DzFrameSetFont(UI_abdec[i], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTexture(UI_abdec[i], Choice_Hero_UI.config.bg_str_sum[6], 0)
            DzFrameSetTextAlignment(UI_abdec[i], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_abdec[i], false)

            UI_abdec[i + 3] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 3], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 3], 0, UI_abdec[i], 0, abnw, abnh)
            DzFrameSetFont(UI_abdec[i + 3], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 3], "技能名称")
            DzFrameSetTextAlignment(UI_abdec[i + 3], TEXTALIGN_TOPLEFT)

            UI_abdec[i + 6] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 6], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 6], 0, UI_abdec[i], 0, abdec1, abdec2)
            DzFrameSetFont(UI_abdec[i + 6], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 6], "技能描述")
            DzFrameSetTextAlignment(UI_abdec[i + 6], TEXTALIGN_TOPLEFT)

            let ii = i
            let TS_UI_butt = Frame.fromHandle(UI_abbutt[ii]);
            //鼠标进入
            TS_UI_butt.setOnMouseEnter(() => {
                //let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                // DzFrameSetPoint(UI_abdec[ii], 4, uiid, 4, 0, 0)
                DzFrameShow(UI_abdec[ii], true)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            });
            //鼠标离开
            TS_UI_butt.setOnMouseLeave(() => {
                DzFrameShow(UI_abdec[ii], false)
            });
        }
        //--------------------------------------------2-------------------------------
        for (let i = 0; i < 3; i++) {
            UI_abbutt[i + 3] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_Hero_config[i + 39], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_abbutt[i + 3], 0.02, 0.02)
            DzFrameSetPoint(UI_abbutt[i + 3], 4, UI_Hero_config[i + 39], 4, 0, 0)
            DzFrameShow(UI_abbutt[i + 3], true)
            //文本描述
            UI_abdec[i + 9] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 9], textW, texth)
            DzFrameSetPoint(UI_abdec[i + 9], 0, UI_Hero_config[i + 39], 6, -0.041, 0.0)
            DzFrameSetFont(UI_abdec[i + 9], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTexture(UI_abdec[i + 9], Choice_Hero_UI.config.bg_str_sum[6], 0)
            DzFrameSetTextAlignment(UI_abdec[i + 9], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_abdec[i + 9], false)

            UI_abdec[i + 12] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 9], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 12], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 12], 0, UI_abdec[i], 0, abnw, abnh)
            DzFrameSetFont(UI_abdec[i + 12], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 12], "技能名称")
            DzFrameSetTextAlignment(UI_abdec[i + 12], TEXTALIGN_TOPLEFT)

            UI_abdec[i + 15] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 9], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 15], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 15], 0, UI_abdec[i], 0, abdec1, abdec2)
            DzFrameSetFont(UI_abdec[i + 15], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 15], "技能描述")
            DzFrameSetTextAlignment(UI_abdec[i + 15], TEXTALIGN_TOPLEFT)

            let ii = i + 3
            let iii = i + 9
            let TS_UI_butt = Frame.fromHandle(UI_abbutt[ii]);
            //鼠标进入
            TS_UI_butt.setOnMouseEnter(() => {
                //let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                // DzFrameSetPoint(UI_abdec[ii], 4, uiid, 4, 0, 0)
                DzFrameShow(UI_abdec[iii], true)
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            });
            //鼠标离开
            TS_UI_butt.setOnMouseLeave(() => {
                DzFrameShow(UI_abdec[iii], false)
            });
        }
        //--------------------------------------------3-------------------------------
        for (let i = 0; i < 3; i++) {
            UI_abbutt[i + 6] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_Hero_config[i + 42], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_abbutt[i + 6], 0.02, 0.02)
            DzFrameSetPoint(UI_abbutt[i + 6], 4, UI_Hero_config[i + 42], 4, 0, 0)
            DzFrameShow(UI_abbutt[i + 6], true)
            //文本描述框
            UI_abdec[i + 18] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 18], textW, texth)
            DzFrameSetPoint(UI_abdec[i + 18], 0, UI_Hero_config[i + 42], 6, -0.068, 0.0)
            DzFrameSetFont(UI_abdec[i + 18], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTexture(UI_abdec[i + 18], Choice_Hero_UI.config.bg_str_sum[6], 0)
            DzFrameSetTextAlignment(UI_abdec[i + 18], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_abdec[i + 18], false)

            UI_abdec[i + 21] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 18], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 21], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 21], 0, UI_abdec[i], 0, abnw, abnh)
            DzFrameSetFont(UI_abdec[i + 21], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 21], "技能名称")
            DzFrameSetTextAlignment(UI_abdec[i + 21], TEXTALIGN_TOPLEFT)

            UI_abdec[i + 24] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 18], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 24], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 24], 0, UI_abdec[i], 0, abdec1, abdec2)
            DzFrameSetFont(UI_abdec[i + 24], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 24], "技能描述")
            DzFrameSetTextAlignment(UI_abdec[i + 24], TEXTALIGN_TOPLEFT)

            let ii = i + 6
            let iii = i + 18
            let TS_UI_butt = Frame.fromHandle(UI_abbutt[ii]);
            //鼠标进入
            TS_UI_butt.setOnMouseEnter(() => {
                //let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                // DzFrameSetPoint(UI_abdec[ii], 4, uiid, 4, 0, 0)
                DzFrameShow(UI_abdec[iii], true)
                ///  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            });
            //鼠标离开
            TS_UI_butt.setOnMouseLeave(() => {
                DzFrameShow(UI_abdec[iii], false)
            });
        }
        //--------------------------------------------4-------------------------------
        for (let i = 0; i < 3; i++) {
            UI_abbutt[i + 9] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_Hero_config[i + 45], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_abbutt[i + 9], 0.02, 0.02)
            DzFrameSetPoint(UI_abbutt[i + 9], 4, UI_Hero_config[i + 45], 4, 0, 0)
            DzFrameShow(UI_abbutt[i + 9], true)
            //文本描述框
            UI_abdec[i + 27] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 27], textW, texth)
            DzFrameSetPoint(UI_abdec[i + 27], 0, UI_Hero_config[i + 45], 6, -0.095, 0.0)
            DzFrameSetFont(UI_abdec[i + 27], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTexture(UI_abdec[i + 27], Choice_Hero_UI.config.bg_str_sum[6], 0)
            DzFrameSetTextAlignment(UI_abdec[i + 27], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_abdec[i + 27], false)

            UI_abdec[i + 30] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 27], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 30], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 30], 0, UI_abdec[i], 0, abnw, abnh)
            DzFrameSetFont(UI_abdec[i + 30], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 30], "技能名称")
            DzFrameSetTextAlignment(UI_abdec[i + 30], TEXTALIGN_TOPLEFT)

            UI_abdec[i + 33] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 27], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 33], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 33], 0, UI_abdec[i], 0, abdec1, abdec2)
            DzFrameSetFont(UI_abdec[i + 33], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 33], "技能描述")
            DzFrameSetTextAlignment(UI_abdec[i + 33], TEXTALIGN_TOPLEFT)

            let ii = i + 9
            let iii = i + 27
            let TS_UI_butt = Frame.fromHandle(UI_abbutt[ii]);
            //鼠标进入
            TS_UI_butt.setOnMouseEnter(() => {
                //let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                // DzFrameSetPoint(UI_abdec[ii], 4, uiid, 4, 0, 0)
                DzFrameShow(UI_abdec[iii], true)
                //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            });
            //鼠标离开
            TS_UI_butt.setOnMouseLeave(() => {
                DzFrameShow(UI_abdec[iii], false)
            });
        }
        //--------------------------------------------5-------------------------------
        for (let i = 0; i < 3; i++) {
            UI_abbutt[i + 12] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_Hero_config[i + 48], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_abbutt[i + 12], 0.02, 0.02)
            DzFrameSetPoint(UI_abbutt[i + 12], 4, UI_Hero_config[i + 48], 4, 0, 0)
            DzFrameShow(UI_abbutt[i + 12], true)
            //文本描述框
            UI_abdec[i + 36] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), UI_bg[i], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 36], textW, texth)
            DzFrameSetPoint(UI_abdec[i + 36], 0, UI_Hero_config[i + 48], 6, -0.12, 0.0)
            DzFrameSetFont(UI_abdec[i + 36], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetTexture(UI_abdec[i + 36], Choice_Hero_UI.config.bg_str_sum[6], 0)
            DzFrameSetTextAlignment(UI_abdec[i + 36], TEXTALIGN_TOPLEFT)
            DzFrameShow(UI_abdec[i + 36], false)

            UI_abdec[i + 39] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 36], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 39], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 39], 0, UI_abdec[i], 0, abnw, abnh)
            DzFrameSetFont(UI_abdec[i + 39], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 39], "技能名称")
            DzFrameSetTextAlignment(UI_abdec[i + 39], TEXTALIGN_TOPLEFT)

            UI_abdec[i + 42] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_abdec[i + 36], 'template', 0)
            DzFrameSetSize(UI_abdec[i + 42], 0.14, 0.3)
            DzFrameSetPoint(UI_abdec[i + 42], 0, UI_abdec[i], 0, abdec1, abdec2)
            DzFrameSetFont(UI_abdec[i + 42], "fonts\\ChaoCuZiTi.ttf", 0.012, 0)
            DzFrameSetText(UI_abdec[i + 42], "技能描述")
            DzFrameSetTextAlignment(UI_abdec[i + 42], TEXTALIGN_TOPLEFT)

            let ii = i + 12
            let iii = i + 36
            let TS_UI_butt = Frame.fromHandle(UI_abbutt[ii]);
            //鼠标进入
            TS_UI_butt.setOnMouseEnter(() => {
                //let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
                // DzFrameSetPoint(UI_abdec[ii], 4, uiid, 4, 0, 0)
                DzFrameShow(UI_abdec[iii], true)
                ///  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            });
            //鼠标离开
            TS_UI_butt.setOnMouseLeave(() => {
                DzFrameShow(UI_abdec[iii], false)
            });
        }

        //// ------------***********************主界面hover效果*****************
        // 创建 butt ------------------------------
        let UI_butt = Choice_Hero_UI.UI_butt
        for (let i = 0; i < 3; i++) {
            UI_butt[i] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_bg[i], 'ScoreScreenTabButtonTemplate', 0)
            DzFrameSetSize(UI_butt[i], 0.18, h)
            DzFrameSetPoint(UI_butt[i], 4, UI_bg[i], 4, 0, 0)
            DzFrameShow(UI_butt[i], true)
            let ii = i
            let TS_UI_butt = Frame.fromHandle(UI_butt[ii]);
            //鼠标进入
            // TS_UI_butt.setOnMouseEnter(() => {
            //     let uiid = DzGetTriggerUIEventFrame()//鼠标进入的frame
            //     // DzFrameSetSize(UI_bg[3], 0.18, h)
            //     DzFrameSetPoint(UI_bg[3], 4, uiid, 4, 0, 0)
            //     DzFrameShow(UI_bg[3], true)
            //     //DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '鼠标移入***');
            // });
            // //鼠标离开
            // TS_UI_butt.setOnMouseLeave(() => {
            //     DzFrameShow(UI_bg[3], false)
            // });

            //鼠标点击模式按钮
            DzFrameSetScriptByCode(UI_butt[ii], FRAMEEVENT_MOUSE_DOUBLECLICK, () => {
                // 点击的ui玩家
                let player = DzGetTriggerUIEventPlayer()
                let index = GetPlayerId(player)
                // DisplayTimedTextToPlayer(Player(0), 0, 0, 300, 'index=' + index);

                DzFrameShow(Choice_Hero_UI.UI_xz_ying_xiong, false)
                let ID = Choice_Hero_UI.UI_Hero_Random_id[(ii + (index * 3))]
                // let item_Id = Choice_Hero_UI.config.Hero_ab_Id[ID][5]
                let str = index + '_' + ID
                DzSyncData("UI双击选择英雄", str)


            }, false);
        }


        // // 创建 双击选择英雄 提示图标
        // let shuang_ji_xuan_ze = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
        // DzFrameSetTexture(shuang_ji_xuan_ze, Choice_Hero_UI.config.bg_str_sum[3], 0)
        // DzFrameSetSize(shuang_ji_xuan_ze, 0.06, 0.02)
        // DzFrameSetPoint(shuang_ji_xuan_ze, 1, UI_bg[1], 7, -0.005, -0.12)


        // 创建 刷新 图标
        UI_bg[9] = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
        DzFrameSetTexture(UI_bg[9], Choice_Hero_UI.config.bg_str_sum[4], 0)
        DzFrameSetSize(UI_bg[9], 0.06, 0.02)
        DzFrameSetPoint(UI_bg[9], 1, UI_bg[1], 7, -0.005, -0.04)
        // 创建 刷新 次数文本
        UI_bg[10] = DzCreateFrameByTagName("TEXT", Choice_Hero_UI.NewUIName(), UI_bg[9], 'template', 0)
        DzFrameSetSize(UI_bg[10], 0.04, 0.02)
        DzFrameSetPoint(UI_bg[10], 3, UI_bg[9], 5, 0.008, 0)
        DzFrameSetFont(UI_bg[10], "fonts\\ChaoCuZiTi.ttf", 0.016, 0)
        DzFrameSetText(UI_bg[10], '|cff00ff00' + "10")
        DzFrameSetTextAlignment(UI_bg[10], TEXTALIGN_LEFT)
        // 创建 刷新 按钮
        UI_bg[11] = DzCreateFrameByTagName("BUTTON", Choice_Hero_UI.NewUIName(), UI_bg[9], 'ScoreScreenTabButtonTemplate', 0)
        DzFrameSetSize(UI_bg[11], 0.06, 0.02)
        DzFrameSetPoint(UI_bg[11], 4, UI_bg[9], 4, 0, 0)
        let TS_UI_bg_ten = Frame.fromHandle(UI_bg[11]);
        // 创建 刷新 边框发亮 贴图------------------------
        let light_bg = DzCreateFrameByTagName("BACKDROP", Choice_Hero_UI.NewUIName(), father_UI, 'template', 0)
        DzFrameSetTexture(light_bg, Choice_Hero_UI.config.bg_str_sum[5], 0)
        // DzFrameSetSize(light_bg, 0.06, 0.04)
        // DzFrameSetPoint(light_bg, 4, UI_bg[9], 4, 0, 0)
        let light_bg_size = 0.004
        DzFrameSetPoint(light_bg, 0, UI_bg[9], 0, -light_bg_size, light_bg_size)
        DzFrameSetPoint(light_bg, 8, UI_bg[9], 8, light_bg_size, -light_bg_size)
        DzFrameShow(light_bg, false)
        //鼠标进入
        TS_UI_bg_ten.setOnMouseEnter(() => {
            DzFrameShow(light_bg, true)
        });
        //鼠标离开
        TS_UI_bg_ten.setOnMouseLeave(() => {
            DzFrameShow(light_bg, false)
        });
        // 刷新被点击
        let Hero_Id: string[] = Choice_Hero_UI.config.Hero_Id
        let leng = Hero_Id.length
        let index_array: number[] = HopeNonRepeatingRandom(0, leng - 1, 3)
        TS_UI_bg_ten.setOnClick(() => {
            // print('000000000000')
            Choice_Hero_UI.Refresh(GetPlayerId(DzGetTriggerUIEventPlayer()), index_array)
        });


    }

    // 刷新英雄 - - 
    static Refresh(index: number, index_array: number[]) {

        let Hero_Id: string[] = Choice_Hero_UI.config.Hero_Id

        // let index_array: number[];
        // if (leng > 3) {
        //     index_array = HopeNonRepeatingRandom(0, leng - 1, 3)
        // } else {
        //     DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '英雄ID数组异常，数量少于3个！');
        // }
        // 玩家点击-刷新按钮，修改刷新的次数
        let count: number[] = Choice_Hero_UI.config.Refresh_count
        if (count[index] - 1 <= 0) {
            DzFrameShow(Choice_Hero_UI.UI_bg[9], false)
        } else {
            count[index]--
            let count_str = '|cff00ffff' + count[index]
            DzFrameSetText(Choice_Hero_UI.UI_bg[10], count_str)
        }
        // 给ui换头像，名字，说明 
        let UI_Hero_config = Choice_Hero_UI.UI_Hero_config
        let UI_abdec = Choice_Hero_UI.UI_abdec
        // let player = Player(index)
        // if (player == GetLocalPlayer()) {
        for (let i = 0; i < 3; i++) {
            let ID = Hero_Id[index_array[i]]
            //获取对应英雄的技能
            let Hero_ab_Id = Choice_Hero_UI.config.Hero_ab_Id[ID]
            // 记录随机的
            Choice_Hero_UI.UI_Hero_Random_id[(i + (index * 3))] = ID
            // 获取头像
            let photo = unit[ID].Art
            DzFrameSetTexture(UI_Hero_config[i], photo, 0)
            // 获取名字
            let name = unit[ID].Name
            DzFrameSetText(UI_Hero_config[i + 3], name)
            // 获取基础拓展说明
            let explain = unit[ID].Ubertip
            DzFrameSetText(UI_Hero_config[i + 30], explain)
            //获取说明 英雄品阶
            let dec = unit[ID].EditorSuffix
            let length: number = StringLength(dec)
            let pp = SubString(dec, 6, length)
            DzFrameSetText(UI_Hero_config[i + 33], pp)
            //英雄定位获取
            let dingw = unit[ID].Description
            DzFrameSetText(UI_Hero_config[i + 6], '英雄定位：     ' + dingw)
            //获取技能
            let abArt1 = ability[Hero_ab_Id[0]].Art
            let abArt2 = ability[Hero_ab_Id[1]].Art
            let abArt3 = ability[Hero_ab_Id[2]].Art
            let abArt4 = ability[Hero_ab_Id[3]].Art
            let abArt5 = ability[Hero_ab_Id[4]].Art
            DzFrameSetTexture(UI_Hero_config[i + 36], abArt1, 0)
            DzFrameSetTexture(UI_Hero_config[i + 39], abArt2, 0)
            DzFrameSetTexture(UI_Hero_config[i + 42], abArt3, 0)
            DzFrameSetTexture(UI_Hero_config[i + 45], abArt4, 0)
            DzFrameSetTexture(UI_Hero_config[i + 48], abArt5, 0)
            //技能名称
            let abname1 = ability[Hero_ab_Id[0]].Name
            let abname2 = ability[Hero_ab_Id[1]].Name
            let abname3 = ability[Hero_ab_Id[2]].Name
            let abname4 = ability[Hero_ab_Id[3]].Name
            let abname5 = ability[Hero_ab_Id[4]].Name
            DzFrameSetText(UI_abdec[i + 3], abname1)
            DzFrameSetText(UI_abdec[i + 12], abname2)
            DzFrameSetText(UI_abdec[i + 21], abname3)
            DzFrameSetText(UI_abdec[i + 30], abname4)
            DzFrameSetText(UI_abdec[i + 39], abname5)
            //技能描述
            let abexplain1 = ability[Hero_ab_Id[0]].Ubertip
            let abexplain2 = ability[Hero_ab_Id[1]].Ubertip
            let abexplain3 = ability[Hero_ab_Id[2]].Ubertip
            let abexplain4 = ability[Hero_ab_Id[3]].Ubertip
            let abexplain5 = ability[Hero_ab_Id[4]].Ubertip
            DzFrameSetText(UI_abdec[i + 6], abexplain1)
            DzFrameSetText(UI_abdec[i + 15], abexplain2)
            DzFrameSetText(UI_abdec[i + 24], abexplain3)
            DzFrameSetText(UI_abdec[i + 33], abexplain4)
            DzFrameSetText(UI_abdec[i + 42], abexplain5)
            //星级判定
            let xing = S2I(unit[ID].points)
            if (xing == 1) {
                DzFrameShow(UI_Hero_config[i + 12], true)
                DzFrameShow(UI_Hero_config[i + 15], false)
                DzFrameShow(UI_Hero_config[i + 18], false)
                DzFrameShow(UI_Hero_config[i + 21], false)
                DzFrameShow(UI_Hero_config[i + 24], false)
            } else if (xing == 2) {
                DzFrameShow(UI_Hero_config[i + 12], true)
                DzFrameShow(UI_Hero_config[i + 15], true)
                DzFrameShow(UI_Hero_config[i + 18], false)
                DzFrameShow(UI_Hero_config[i + 21], false)
                DzFrameShow(UI_Hero_config[i + 24], false)
            } else if (xing == 3) {
                DzFrameShow(UI_Hero_config[i + 12], true)
                DzFrameShow(UI_Hero_config[i + 15], true)
                DzFrameShow(UI_Hero_config[i + 18], true)
                DzFrameShow(UI_Hero_config[i + 21], false)
                DzFrameShow(UI_Hero_config[i + 24], false)
            } else if (xing == 4) {
                DzFrameShow(UI_Hero_config[i + 12], true)
                DzFrameShow(UI_Hero_config[i + 15], true)
                DzFrameShow(UI_Hero_config[i + 18], true)
                DzFrameShow(UI_Hero_config[i + 21], true)
                DzFrameShow(UI_Hero_config[i + 24], false)
            } else if (xing == 5) {
                DzFrameShow(UI_Hero_config[i + 12], true)
                DzFrameShow(UI_Hero_config[i + 15], true)
                DzFrameShow(UI_Hero_config[i + 18], true)
                DzFrameShow(UI_Hero_config[i + 21], true)
                DzFrameShow(UI_Hero_config[i + 24], true)
            }
        }
        //     }


    }
}


