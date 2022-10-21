import HoepColorText from "cyttp/Util/HoepColorText";
import UiButtonUtil from "cyttp/Util/UiButtonUtil";
import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { useForceUpdate } from "solar/w3ts/tsx";


DzLoadToc('UI\\path.toc')
/**
 * 属性面板
 */
export default class Attribute_Panel1 {
    //文本配置
    static config: { [type: string]: { [name: string]: string[] }[] } = {
        '伤害': [
            { '物爆几率': ['0%'] },
            { '物理爆伤': ['0'] },
            { '物伤加成': ['0%'] },
            { '物理吸血': ['0%'] },

            { '法爆几率': ['0%'] },
            { '法术爆伤': ['0'] },
            { '法伤加成': ['0%'] },
            { '法术吸血': ['0%'] },

            { '伤害增幅': ['0%'] },
            { '伤害减免': ['0%'] },
            { '附加伤害': ['0'] },
            { '附伤百分比': ['0%'] },
            { '真实伤害': ['0'] },
            { '真伤百分比': ['0%'] },
            { '攻击速度': ['0'] },
            { '冷却缩减': ['0'] }, // cd
            { '技伤附加': ['0'] },

            { '百分比吸血': ['0%'] },
            { '护甲穿透': ['0'] },
            { '护穿百分比': ['0%'] },

            { '生命恢复': ['0'] },
            { '法吸百分比': ['0%'] },

            { '致命一击': ['0'] },

            { '魔抗穿透': ['0%'] },
            { '魔法恢复': ['0'] },
            { '魔穿百分比': ['0%'] },

            { '生命恢复百分比': ['0%'] },
            { '攻击百分比加成': ['0%'] },

        ],
        '元素伤害': [
            { '雷元伤害': ['0'] },
            { '雷伤加成': ['0%'] },
            { '雷暴几率': ['0%'] },
            { '雷暴伤加成': ['0%'] },
            { '火元伤害': ['0'] },
            { '火伤加成': ['0%'] },
            { '火暴几率': ['0%'] },
            { '火暴伤加成': ['0%'] },
            { '木元伤害': ['0'] },
            { '木伤加成': ['0%'] },
            { '木暴几率': ['0%'] },
            { '木暴伤加成': ['0%'] },
            { '金元伤害': ['0'] },
            { '金伤加成': ['0%'] },
            { '金暴几率': ['0%'] },
            { '金暴伤加成': ['0%'] },
            { '土元伤害': ['0'] },
            { '土伤加成': ['0%'] },
            { '土暴几率': ['0%'] },
            { '土暴伤加成': ['0%'] },
            { '冰元伤害': ['0'] },
            { '冰伤加成': ['0%'] },
            { '冰暴几率': ['0%'] },
            { '冰暴伤加成': ['0%'] },
            { '水元伤害': ['0'] },
            { '水伤加成': ['0%'] },
            { '水暴几率': ['0%'] },
            { '水暴伤加成': ['0%'] },
        ],
        '属性资源': [
            { '每秒加攻击': ['0'] },
            { '每秒加生命': ['0'] },
            { '每秒加力量': ['0'] },
            { '每秒加智力': ['0'] },
            { '每秒加敏捷': ['0'] },
            { '每秒加金币': ['0'] },
            { '每秒加木头': ['0'] },
            { '每秒加杀敌': ['0'] },

            { '攻击加攻击': ['0'] },
            { '攻击加生命': ['0'] },
            { '攻击加力量': ['0'] },
            { '攻击加敏捷': ['0'] },
            { '攻击加智力': ['0'] },
            { '攻击加金币': ['0'] },
            { '攻击加木材': ['0'] },

            { '杀敌加攻击': ['0'] },
            { '杀敌加生命': ['0'] },
            { '杀敌加力量': ['0'] },
            { '杀敌加敏捷': ['0'] },
            { '杀敌加智力': ['0'] },
            { '杀敌加金币': ['0'] },
            { '杀敌加木材': ['0'] },

            { '力量百分比': ['0%'] },
            { '敏捷百分比': ['0%'] },
            { '智力百分比': ['0%'] },

            { '幸运值': ['0'] },

            { '杀敌数加成': ['0%'] },
            { '固定值吸血': ['0'] },

        ],
        '召唤物': [
            { '数量': ['0'] },
            { '属性加成': ['0%'] },
            { '继承属性加成': ['0%'] },
            { '攻击速度加成': ['0%'] },
            { '暴击几率': ['0%'] },
            { '暴击伤害加成': ['0%'] },
            { '护甲穿透': ['0'] },
            { '护甲穿透百分比': ['0%'] },
            { '伤害减免': ['0%'] },
            { '减伤': ['0'] },
            { '附加伤害': ['0'] },
            { '真实伤害': ['0'] },
            { '附加伤害加成': ['0%'] },
            { '真实伤害加成': ['0%'] },
            { '全额增伤': ['0'] },

            { '充能次数': ['0'] },
            { '充能技伤': ['0%'] },
            { '充能技伤附加': ['0'] },
            { '充能技能CD': ['0'] },
            { '充能次数加成': ['0%'] },
            { '充能技伤范围': ['0'] },
        ]


    }


    // 记录ui大小
    static panel_UI: { [ui_KEY: string]: number } = {}
    // 记录ui 名字序号
    UIname: number = 0
    constructor() {
        // 记录UI
        let panel_UI = Attribute_Panel1.panel_UI
        // //按 tab  显示/隐藏-套装界面 -----------------------------------------------
        DzTriggerRegisterKeyEventByCode(null, 9, 1, false, () => {
            let p = DzGetTriggerKeyPlayer()

            DzFrameShow(panel_UI['背景图'], true);
            // 刷新词条
            Attribute_Panel1.Refresh_Entry(p)

        })
        DzTriggerRegisterKeyEventByCode(null, 9, 0, false, () => {
            DzFrameShow(panel_UI['背景图'], false);
        })

        // 获取配置
        let config = Attribute_Panel1.config

        // 背景图   -------------------------
        panel_UI['背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetAbsolutePoint(panel_UI['背景图'], 4, 0.4, 0.35)
        DzFrameSetSize(panel_UI['背景图'], 0.41, 0.3)
        DzFrameSetTexture(panel_UI['背景图'], "UI_Icon\\suxing.tga", 0)
        DzFrameShow(panel_UI['背景图'], false)
        DzFrameSetPoint(panel_UI['背景图'], 1, DzGetGameUI(), 1, 0, -0.1)
        //左上角标识  ---属性一览
        panel_UI['属性一览'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['属性一览'], 0.01, 0.1)
        DzFrameShow(panel_UI['属性一览'], true)
        DzFrameSetPoint(panel_UI['属性一览'], 0, panel_UI['背景图'], 0, 0.012, -0.05)
        DzFrameSetFont(panel_UI['属性一览'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameSetText(panel_UI['属性一览'], '属性一览')

        //中间翻页按钮
        panel_UI['翻页按钮'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
        DzFrameSetSize(panel_UI['翻页按钮'], 0.02, 0.02)
        DzFrameSetTexture(panel_UI['翻页按钮'], "UI_Icon\\daojstctzboss.tga", 0)
        DzFrameShow(panel_UI['翻页按钮'], true)
        DzFrameSetPoint(panel_UI['翻页按钮'], 4, panel_UI['背景图'], 4, 0.001, -0.111)

        let button = UiButtonUtil.Button_Backdrop(0.02, 0.02, panel_UI['翻页按钮'], this.Suit_Ui_Name())

        DzFrameSetScriptByCode(button, FRAMEEVENT_MOUSE_ENTER, () => {
            //刷新隐藏词条
            Attribute_Panel1.Refresh_Entry_YC(DzGetTriggerKeyPlayer())
            Attribute_Panel1.summon_refresh(DzGetTriggerKeyPlayer())
            //左边
            DzFrameShow(panel_UI['左边属性'], false)
            DzFrameShow(panel_UI['左边隐藏属性'], true)
            //右边
            DzFrameShow(panel_UI['右边属性'], false)
            DzFrameShow(panel_UI['右边隐藏属性'], true)
        }, false)
        DzFrameSetScriptByCode(button, FRAMEEVENT_MOUSE_LEAVE, () => {
            //左边
            DzFrameShow(panel_UI['左边隐藏属性'], false)
            DzFrameShow(panel_UI['左边属性'], true)
            //右边
            DzFrameShow(panel_UI['右边隐藏属性'], false)
            DzFrameShow(panel_UI['右边属性'], true)
        }, false)



        let index = 0
        // 创建   左边属性 -------------------------- ui  --------
        if (true) {
            let shu_chu: { [name: string]: string[] }[] = config['伤害']
            panel_UI['左边属性'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
            DzFrameSetSize(panel_UI['左边属性'], 0.16, 0.24)
            DzFrameSetFont(panel_UI['左边属性'], 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
            DzFrameSetPoint(panel_UI['左边属性'], 1, panel_UI['背景图'], 1, -0.09, -0.033)
            DzFrameSetTexture(panel_UI['左边属性'], "UI_Icon\\feileisux.tga", 0)
            DzFrameShow(panel_UI['左边属性'], true)
            // DzFrameSetTexture(panel_UI['左边属性'], "xuan_ze_ying_xiong_tga\\nothing.tga", 0)
            //----------------------
            panel_UI['左属性类型'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边属性'], "template", 0)
            DzFrameSetSize(panel_UI['左属性类型'], 0.08, 0.1)
            DzFrameShow(panel_UI['左属性类型'], true)
            DzFrameSetPoint(panel_UI['左属性类型'], 0, panel_UI['左边属性'], 0, 0.055, -0.002)
            DzFrameSetFont(panel_UI['左属性类型'], 'Fonts\\ChaoCuZiTi.ttf', 0.014, 0)
            DzFrameSetText(panel_UI['左属性类型'], HoepColorText('grey') + '伤害属性')

            for (let i = 0; i < shu_chu.length; i++) {
                let table: { [name: string]: string[] } = shu_chu[i]
                for (let k in table) {
                    let x = 0.01 + 0.08 * (index % 2)
                    let y = -0.022 - Math.floor(index / 2) * 0.015
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'y=' + y);
                    index++
                    // 创建 词条名字
                    let name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边属性'], "template", 0)
                    DzFrameSetSize(name, 0.07, 0.016)
                    DzFrameSetFont(name, 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
                    DzFrameSetPoint(name, 0, panel_UI['左边属性'], 0, x, y)
                    DzFrameSetText(name, k)
                    DzFrameSetTextAlignment(name, TEXTALIGN_LEFT)
                    //词条背景
                    let name_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['左边属性'], "template", 0)
                    DzFrameSetSize(name_bg, 0.07, 0.016)
                    DzFrameSetPoint(name_bg, 5, name, 3, 0.0675, 0)
                    DzFrameSetTexture(name_bg, 'UI_Icon\\shuzhibg.tga', 0)
                    DzFrameSetTextAlignment(name_bg, TEXTALIGN_CENTER)
                    DzFrameSetAlpha(name_bg, 80)

                    // 创建 词条数值
                    let value: string[] = table[k]
                    panel_UI[k] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边属性'], "template", 0)
                    DzFrameSetSize(panel_UI[k], 0.06, 0.016)
                    DzFrameSetFont(panel_UI[k], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
                    DzFrameSetPoint(panel_UI[k], 3, name, 5, -0.065, 0)
                    DzFrameSetText(panel_UI[k], value[0])
                    DzFrameSetTextAlignment(panel_UI[k], TEXTALIGN_RIGHT)


                }
            }
        }

        // 创建   右边属性 -------------------------- ui  --------
        let index2 = 0
        if (true) {
            let shu_chu: { [name: string]: string[] }[] = config['元素伤害']
            panel_UI['右边属性'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
            DzFrameSetSize(panel_UI['右边属性'], 0.16, 0.24)
            DzFrameSetFont(panel_UI['右边属性'], 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
            DzFrameSetPoint(panel_UI['右边属性'], 1, panel_UI['背景图'], 1, 0.092, -0.033)
            DzFrameSetTexture(panel_UI['右边属性'], "UI_Icon\\feileisux.tga", 0)
            // DzFrameSetTexture(panel_UI['右边属性'], "xuan_ze_ying_xiong_tga\\nothing.tga", 0)

            panel_UI['右属性类型'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边属性'], "template", 0)
            DzFrameSetSize(panel_UI['右属性类型'], 0.08, 0.1)
            DzFrameShow(panel_UI['右属性类型'], true)
            DzFrameSetPoint(panel_UI['右属性类型'], 0, panel_UI['右边属性'], 0, 0.06, -0.002)
            DzFrameSetFont(panel_UI['右属性类型'], 'Fonts\\ChaoCuZiTi.ttf', 0.014, 0)
            DzFrameSetText(panel_UI['右属性类型'], HoepColorText('grey') + '元素伤害')

            for (let i = 0; i < shu_chu.length; i++) {
                let table: { [name: string]: string[] } = shu_chu[i]
                for (let k in table) {
                    let x = 0.01 + 0.08 * (index2 % 2)
                    let y = -0.022 - Math.floor(index2 / 2) * 0.015
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'y=' + y);
                    index2++
                    // 创建 词条名字
                    let name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边属性'], "template", 0)
                    DzFrameSetSize(name, 0.07, 0.016)
                    DzFrameSetFont(name, 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
                    DzFrameSetPoint(name, 0, panel_UI['右边属性'], 0, x, y)
                    DzFrameSetText(name, k)
                    DzFrameSetTextAlignment(name, TEXTALIGN_LEFT)
                    //词条背景
                    let name_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['右边属性'], "template", 0)
                    DzFrameSetSize(name_bg, 0.07, 0.016)
                    DzFrameSetPoint(name_bg, 5, name, 3, 0.0675, 0)
                    DzFrameSetTexture(name_bg, 'UI_Icon\\shuzhibg.tga', 0)
                    DzFrameSetTextAlignment(name_bg, TEXTALIGN_CENTER)
                    DzFrameSetAlpha(name_bg, 80)
                    // 创建 词条数值
                    let value: string[] = table[k]
                    panel_UI[k] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边属性'], "template", 0)
                    DzFrameSetSize(panel_UI[k], 0.06, 0.016)
                    DzFrameSetFont(panel_UI[k], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
                    DzFrameSetPoint(panel_UI[k], 3, name, 5, -0.065, 0)
                    DzFrameSetText(panel_UI[k], value[0])
                    DzFrameSetTextAlignment(panel_UI[k], TEXTALIGN_RIGHT)

                }
            }
        }

        let index3 = 0
        // 创建   左边属性隐藏 -------------------------- ui  --------
        if (true) {
            let suxing: { [name: string]: string[] }[] = config['属性资源']
            panel_UI['左边隐藏属性'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
            DzFrameSetSize(panel_UI['左边隐藏属性'], 0.16, 0.24)
            DzFrameSetFont(panel_UI['左边隐藏属性'], 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
            DzFrameSetPoint(panel_UI['左边隐藏属性'], 1, panel_UI['背景图'], 1, -0.09, -0.033)
            DzFrameSetTexture(panel_UI['左边隐藏属性'], "UI_Icon\\feileisux.tga", 0)
            DzFrameShow(panel_UI['左边隐藏属性'], false)
            // DzFrameSetTexture(panel_UI['左边隐藏属性'], "xuan_ze_ying_xiong_tga\\nothing.tga", 0)
            //----------------------
            panel_UI['左隐藏属性类型'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边隐藏属性'], "template", 0)
            DzFrameSetSize(panel_UI['左隐藏属性类型'], 0.08, 0.1)
            DzFrameShow(panel_UI['左隐藏属性类型'], true)
            DzFrameSetPoint(panel_UI['左隐藏属性类型'], 0, panel_UI['左边隐藏属性'], 0, 0.055, -0.002)
            DzFrameSetFont(panel_UI['左隐藏属性类型'], 'Fonts\\ChaoCuZiTi.ttf', 0.014, 0)
            DzFrameSetText(panel_UI['左隐藏属性类型'], HoepColorText('turquoise') + '属性资源')

            for (let i = 0; i < suxing.length; i++) {
                let table: { [name: string]: string[] } = suxing[i]
                for (let k in table) {
                    let x = 0.01 + 0.08 * (index3 % 2)
                    let y = -0.022 - Math.floor(index3 / 2) * 0.015
                    index3++
                    // 创建 词条名字
                    let name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边隐藏属性'], "template", 0)
                    DzFrameSetSize(name, 0.07, 0.016)
                    DzFrameSetFont(name, 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
                    DzFrameSetPoint(name, 0, panel_UI['左边隐藏属性'], 0, x, y)
                    DzFrameSetText(name, k)
                    DzFrameSetTextAlignment(name, TEXTALIGN_LEFT)
                    //词条背景
                    let name_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['左边隐藏属性'], "template", 0)
                    DzFrameSetSize(name_bg, 0.07, 0.016)
                    DzFrameSetPoint(name_bg, 5, name, 3, 0.0675, 0)
                    DzFrameSetTexture(name_bg, 'UI_Icon\\shuzhibg.tga', 0)
                    DzFrameSetTextAlignment(name_bg, TEXTALIGN_CENTER)
                    DzFrameSetAlpha(name_bg, 80)

                    // 创建 词条数值
                    let value: string[] = table[k]
                    panel_UI[k] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['左边隐藏属性'], "template", 0)
                    DzFrameSetSize(panel_UI[k], 0.06, 0.016)
                    DzFrameSetFont(panel_UI[k], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
                    DzFrameSetPoint(panel_UI[k], 3, name, 5, -0.065, 0)
                    DzFrameSetText(panel_UI[k], value[0])
                    DzFrameSetTextAlignment(panel_UI[k], TEXTALIGN_RIGHT)


                }
            }
        }

        // 创建   右边属性隐藏 -------------------------- ui  --------
        let index4 = 0
        if (true) {
            let ppp: { [name: string]: string[] }[] = config['召唤物']
            panel_UI['右边隐藏属性'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['背景图'], "template", 0)
            DzFrameSetSize(panel_UI['右边隐藏属性'], 0.16, 0.24)
            DzFrameSetFont(panel_UI['右边隐藏属性'], 'Fonts\\ChaoCuZiTi.ttf', 0.016, 0)
            DzFrameSetPoint(panel_UI['右边隐藏属性'], 1, panel_UI['背景图'], 1, 0.092, -0.033)
            DzFrameSetTexture(panel_UI['右边隐藏属性'], "UI_Icon\\feileisux.tga", 0)
            DzFrameShow(panel_UI['右边隐藏属性'], false)
            // DzFrameSetTexture(panel_UI['右边右边隐藏属性属性'], "xuan_ze_ying_xiong_tga\\nothing.tga", 0)

            panel_UI['右隐藏属性类型'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边隐藏属性'], "template", 0)
            DzFrameSetSize(panel_UI['右隐藏属性类型'], 0.08, 0.1)
            DzFrameShow(panel_UI['右隐藏属性类型'], true)
            DzFrameSetPoint(panel_UI['右隐藏属性类型'], 0, panel_UI['右边隐藏属性'], 0, 0.06, -0.002)
            DzFrameSetFont(panel_UI['右隐藏属性类型'], 'Fonts\\ChaoCuZiTi.ttf', 0.014, 0)
            DzFrameSetText(panel_UI['右隐藏属性类型'], HoepColorText('grey') + '召唤物属性')

            for (let i = 0; i < ppp.length; i++) {
                let table: { [name: string]: string[] } = ppp[i]
                for (let k in table) {
                    let x = 0.01 + 0.08 * (index4 % 2)
                    let y = -0.022 - Math.floor(index4 / 2) * 0.015
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'index=' + index);
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'y=' + y);
                    index4++
                    // 创建 词条名字
                    let name = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边隐藏属性'], "template", 0)
                    DzFrameSetSize(name, 0.07, 0.016)
                    DzFrameSetFont(name, 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
                    DzFrameSetPoint(name, 0, panel_UI['右边隐藏属性'], 0, x, y)
                    DzFrameSetText(name, k)
                    DzFrameSetTextAlignment(name, TEXTALIGN_LEFT)
                    //词条背景
                    let name_bg = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), panel_UI['右边隐藏属性'], "template", 0)
                    DzFrameSetSize(name_bg, 0.07, 0.016)
                    DzFrameSetPoint(name_bg, 5, name, 3, 0.0675, 0)
                    DzFrameSetTexture(name_bg, 'UI_Icon\\shuzhibg.tga', 0)
                    DzFrameSetTextAlignment(name_bg, TEXTALIGN_CENTER)
                    DzFrameSetAlpha(name_bg, 80)
                    // 创建 词条数值
                    let value: string[] = table[k]
                    panel_UI[k] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['右边隐藏属性'], "template", 0)
                    DzFrameSetSize(panel_UI[k], 0.06, 0.016)
                    DzFrameSetFont(panel_UI[k], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
                    DzFrameSetPoint(panel_UI[k], 3, name, 5, -0.065, 0)
                    DzFrameSetText(panel_UI[k], value[0])
                    DzFrameSetTextAlignment(panel_UI[k], TEXTALIGN_RIGHT)

                }
            }
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
     * 刷新词条
     */
    static Refresh_Entry(p: player) {
        let u = SelectUtil.getAnHero(GetPlayerId(p))
        let panel_UI = Attribute_Panel1.panel_UI
        let solarData = DataBase.getUnitSolarData(u)
        // 输出 -- 分类  刷新--------------------------------------------
        if (true) {
            if (GetLocalPlayer() == p) {
                let physical_critical_chance = solarData.physical_critical_chance ? solarData.physical_critical_chance : 0
                DzFrameSetText(panel_UI['物爆几率'], physical_critical_chance * 100 + '%')
                let physical_critical_damage = solarData.physical_critical_damage ? solarData.physical_critical_damage : 0
                DzFrameSetText(panel_UI['物理爆伤'], physical_critical_damage + '')
                let physical_damage_increased = solarData.physical_damage_increased ? solarData.physical_damage_increased : 0
                DzFrameSetText(panel_UI['物伤加成'], physical_damage_increased * 100 + '%')
                let ad_blood_sucking = solarData.ad_blood_sucking ? solarData.ad_blood_sucking : 0
                DzFrameSetText(panel_UI['物理吸血'], ad_blood_sucking + '')

                let magic_critical_chance = solarData.magic_critical_chance ? solarData.magic_critical_chance : 0
                DzFrameSetText(panel_UI['法爆几率'], magic_critical_chance * 100 + '%')
                let magic_critical_damage = solarData.magic_critical_damage ? solarData.magic_critical_damage : 0
                DzFrameSetText(panel_UI['法术爆伤'], magic_critical_damage + '')
                let magic_damage_increased = solarData.magic_damage_increased ? solarData.magic_damage_increased : 0
                DzFrameSetText(panel_UI['法伤加成'], magic_damage_increased * 100 + '%')
                let ap_blood_sucking = solarData.ap_blood_sucking ? solarData.ap_blood_sucking : 0
                DzFrameSetText(panel_UI['法术吸血'], ap_blood_sucking + '')

                let damage_increased = solarData.damage_increased ? solarData.damage_increased : 0
                DzFrameSetText(panel_UI['伤害增幅'], damage_increased * 100 + '%')
                let damage_reduction = solarData.damage_reduction ? solarData.damage_reduction : 0
                DzFrameSetText(panel_UI['伤害减免'], damage_reduction * 100 + '%')
                let Add_damage = solarData.Add_damage ? solarData.Add_damage : 0
                DzFrameSetText(panel_UI['附加伤害'], Add_damage + '')
                let Add_damage_p = solarData.Add_damage_p ? solarData.Add_damage_p : 0
                DzFrameSetText(panel_UI['附伤百分比'], Add_damage_p * 100 + '%')
                let real_damage = solarData.real_damage ? solarData.real_damage : 0
                DzFrameSetText(panel_UI['真实伤害'], real_damage + '')
                let real_damage_p = solarData.real_damage_p ? solarData.real_damage_p : 0
                DzFrameSetText(panel_UI['真伤百分比'], real_damage_p * 100 + '%')
                let attackSpd_p = solarData.attackSpd_p ? solarData.attackSpd_p : 0
                DzFrameSetText(panel_UI['攻击速度'], attackSpd_p * 100 + '%')

                let ability_CD = solarData.ability_CD ? solarData.ability_CD : 0
                DzFrameSetText(panel_UI['冷却缩减'], ability_CD + '')
                let blood_sucking_p = solarData.blood_sucking_p ? solarData.blood_sucking_p : 0
                DzFrameSetText(panel_UI['百分比吸血'], blood_sucking_p * 100 + '%')
                let Armor_penetrate = solarData.Armor_penetrate ? solarData.Armor_penetrate : 0
                DzFrameSetText(panel_UI['护甲穿透'], Armor_penetrate + '')
                let Armor_penetrate_p = solarData.Armor_penetrate_p ? solarData.Armor_penetrate_p : 0
                DzFrameSetText(panel_UI['护穿百分比'], Armor_penetrate_p * 100 + '%')
                let life = solarData.life ? solarData.life : 0
                DzFrameSetText(panel_UI['生命恢复'], life + '')
                let ap_blood_sucking_p = solarData.ap_blood_sucking_p ? solarData.ap_blood_sucking_p : 0
                DzFrameSetText(panel_UI['法吸百分比'], ap_blood_sucking_p * 100 + '%')
                let deathdamage = solarData.deathdamage ? solarData.deathdamage : 0
                DzFrameSetText(panel_UI['致命一击'], deathdamage + '')
                let magic_penetrate_p = solarData.magic_penetrate_p ? solarData.magic_penetrate_p : 0
                DzFrameSetText(panel_UI['魔抗穿透'], magic_penetrate_p + '')
                let magic_damage_add = solarData.magic_damage_add ? solarData.magic_damage_add : 0
                DzFrameSetText(panel_UI['魔穿百分比'], magic_damage_add * 100 + '%')
                let mana_r = solarData.mana_r ? solarData.mana_r : 0
                DzFrameSetText(panel_UI['魔法恢复'], mana_r + '')
                let life_p = solarData.life_p ? solarData.life_p : 0
                DzFrameSetText(panel_UI['生命恢复百分比'], life_p * 100 + '%')
                let attack_p = solarData.attack_p ? solarData.attack_p : 0
                DzFrameSetText(panel_UI['攻击百分比加成'], attack_p * 100 + '%')
            }
        }
        // 元素 -- 分类  刷新--------------------------------------------
        if (true) {

            let thunder_damage = solarData.thunder_damage ? solarData.thunder_damage : 0
            DzFrameSetText(panel_UI['雷元伤害'], thunder_damage + '')

            let thunder_damage_increased = solarData.thunder_damage_increased ? solarData.thunder_damage_increased : 0
            DzFrameSetText(panel_UI['雷伤加成'], thunder_damage_increased * 100 + '%')

            let thunder_critical_chance = solarData.thunder_critical_chance ? solarData.thunder_critical_chance : 0
            DzFrameSetText(panel_UI['雷暴几率'], thunder_critical_chance * 100 + '%')

            let thunder_critical_damage = solarData.thunder_critical_damage ? solarData.thunder_critical_damage : 0
            DzFrameSetText(panel_UI['雷暴伤加成'], thunder_critical_damage * 100 + '%')

            let fire_damage = solarData.fire_damage ? solarData.fire_damage : 0
            DzFrameSetText(panel_UI['火元伤害'], fire_damage + '')

            let fire_damage_increased = solarData.fire_damage_increased ? solarData.fire_damage_increased : 0
            DzFrameSetText(panel_UI['火伤加成'], fire_damage_increased * 100 + '%')

            let fire_critical_chance = solarData.fire_critical_chance ? solarData.fire_critical_chance : 0
            DzFrameSetText(panel_UI['火暴几率'], fire_critical_chance * 100 + '%')

            let fire_critical_damage = solarData.fire_critical_damage ? solarData.fire_critical_damage : 0
            DzFrameSetText(panel_UI['火暴伤加成'], fire_critical_damage * 100 + '%')

            let wood_damage = solarData.wood_damage ? solarData.wood_damage : 0
            DzFrameSetText(panel_UI['木元伤害'], wood_damage + '')

            let wood_damage_increased = solarData.wood_damage_increased ? solarData.wood_damage_increased : 0
            DzFrameSetText(panel_UI['木伤加成'], wood_damage_increased * 100 + '%')

            let wood_critical_chance = solarData.wood_critical_chance ? solarData.wood_critical_chance : 0
            DzFrameSetText(panel_UI['木暴几率'], wood_critical_chance * 100 + '%')

            let wood_critical_damage = solarData.wood_critical_damage ? solarData.wood_critical_damage : 0
            DzFrameSetText(panel_UI['木暴伤加成'], wood_critical_damage * 100 + '%')

            let gold_damage = solarData.gold_damage ? solarData.gold_damage : 0
            DzFrameSetText(panel_UI['金元伤害'], gold_damage + '')

            let gold_damage_increased = solarData.gold_damage_increased ? solarData.gold_damage_increased : 0
            DzFrameSetText(panel_UI['金伤加成'], gold_damage_increased * 100 + '%')

            let gold_critical_chance = solarData.gold_critical_chance ? solarData.gold_critical_chance : 0
            DzFrameSetText(panel_UI['金暴几率'], gold_critical_chance * 100 + '%')

            let gold_critical_damage = solarData.gold_critical_damage ? solarData.gold_critical_damage : 0
            DzFrameSetText(panel_UI['金暴伤加成'], gold_critical_damage * 100 + '%')

            let Soil_damage = solarData.Soil_damage ? solarData.Soil_damage : 0
            DzFrameSetText(panel_UI['土元伤害'], Soil_damage + '')

            let Soil_damage_increased = solarData.Soil_damage_increased ? solarData.Soil_damage_increased : 0
            DzFrameSetText(panel_UI['土伤加成'], Soil_damage_increased * 100 + '%')

            let Soil_critical_chance = solarData.Soil_critical_chance ? solarData.Soil_critical_chance : 0
            DzFrameSetText(panel_UI['土暴几率'], Soil_critical_chance * 100 + '%')

            let Soil_critical_damage = solarData.Soil_critical_damage ? solarData.Soil_critical_damage : 0
            DzFrameSetText(panel_UI['土暴伤加成'], Soil_critical_damage * 100 + '%')

            let ice_damage = solarData.ice_damage ? solarData.ice_damage : 0
            DzFrameSetText(panel_UI['冰元伤害'], ice_damage + '')

            let ice_damage_increased = solarData.ice_damage_increased ? solarData.ice_damage_increased : 0
            DzFrameSetText(panel_UI['冰伤加成'], ice_damage_increased * 100 + '&')

            let ice_critical_chance = solarData.ice_critical_chance ? solarData.ice_critical_chance : 0
            DzFrameSetText(panel_UI['冰暴几率'], ice_critical_chance * 100 + '%')

            let ice_critical_damage = solarData.ice_critical_damage ? solarData.ice_critical_damage : 0
            DzFrameSetText(panel_UI['冰暴伤加成'], ice_critical_damage * 100 + '%')

            let water_damage = solarData.water_damage ? solarData.water_damage : 0
            DzFrameSetText(panel_UI['水元伤害'], water_damage + '')

            let water_damage_increased = solarData.water_damage_increased ? solarData.water_damage_increased : 0
            DzFrameSetText(panel_UI['水伤加成'], water_damage_increased * 100 + '%')

            let water_critical_chance = solarData.water_critical_chance ? solarData.water_critical_chance : 0
            DzFrameSetText(panel_UI['水暴几率'], water_critical_chance * 100 + '%')

            let water_critical_damage = solarData.water_critical_damage ? solarData.water_critical_damage : 0
            DzFrameSetText(panel_UI['水暴伤加成'], water_critical_damage * 100 + '%')

        }

    }

    static Refresh_Entry_YC(p: player) {
        let u = SelectUtil.getAnHero(GetPlayerId(p))
        let panel_UI = Attribute_Panel1.panel_UI
        let solarData = DataBase.getUnitSolarData(u)
        // 属性资源 -- 分类  刷新--------------------------------------------
        if (true) {
            if (GetLocalPlayer() == p) {
                let timer_add_attack = solarData.timer_add_attack ? solarData.timer_add_attack : 0
                DzFrameSetText(panel_UI['每秒加攻击'], timer_add_attack + '')
                let timer_add_life = solarData.timer_add_life ? solarData.timer_add_life : 0
                DzFrameSetText(panel_UI['每秒加生命'], timer_add_life + '')
                let timer_add_str = solarData.timer_add_str ? solarData.timer_add_str : 0
                DzFrameSetText(panel_UI['每秒加力量'], timer_add_str + '')
                let timer_add_int = solarData.timer_add_int ? solarData.timer_add_int : 0
                DzFrameSetText(panel_UI['每秒加智力'], timer_add_int + '')
                let timer_add_agi = solarData.timer_add_agi ? solarData.timer_add_agi : 0
                DzFrameSetText(panel_UI['每秒加敏捷'], timer_add_agi + '')
                let timer_add_gold = solarData.timer_add_gold ? solarData.timer_add_gold : 0
                DzFrameSetText(panel_UI['每秒加金币'], timer_add_gold + '')
                let timer_add_lumber = solarData.timer_add_lumber ? solarData.timer_add_lumber : 0
                DzFrameSetText(panel_UI['每秒加木头'], timer_add_lumber + '')
                let timer_add_killNum = solarData.timer_add_killNum ? solarData.timer_add_killNum : 0
                DzFrameSetText(panel_UI['每秒加杀敌'], timer_add_killNum + '')

                let attack_add_attack = solarData.attack_add_attack ? solarData.attack_add_attack : 0
                DzFrameSetText(panel_UI['攻击加攻击'], attack_add_attack + '')
                let attack_add_life = solarData.attack_add_life ? solarData.attack_add_life : 0
                DzFrameSetText(panel_UI['攻击加生命'], attack_add_life + '')
                let attack_add_str = solarData.attack_add_str ? solarData.attack_add_str : 0
                DzFrameSetText(panel_UI['攻击加力量'], attack_add_str + '')
                let attack_add_int = solarData.attack_add_int ? solarData.attack_add_int : 0
                DzFrameSetText(panel_UI['攻击加智力'], attack_add_int + '')
                let attack_add_agi = solarData.attack_add_agi ? solarData.attack_add_agi : 0
                DzFrameSetText(panel_UI['攻击加敏捷'], attack_add_agi + '')
                let attack_add_gold = solarData.attack_add_gold ? solarData.attack_add_gold : 0
                DzFrameSetText(panel_UI['攻击加金币'], attack_add_gold + '')
                let attack_add_lumber = solarData.attack_add_lumber ? solarData.attack_add_lumber : 0
                DzFrameSetText(panel_UI['攻击加木材'], attack_add_lumber + '')

                let kill_add_attack = solarData.kill_add_attack ? solarData.kill_add_attack : 0
                DzFrameSetText(panel_UI['杀敌加攻击'], kill_add_attack + '')
                let kill_add_life = solarData.kill_add_life ? solarData.kill_add_life : 0
                DzFrameSetText(panel_UI['杀敌加生命'], kill_add_life + '')
                let kill_add_str = solarData.kill_add_str ? solarData.kill_add_str : 0
                DzFrameSetText(panel_UI['杀敌加力量'], kill_add_str + '')
                let kill_add_int = solarData.kill_add_int ? solarData.kill_add_int : 0
                DzFrameSetText(panel_UI['杀敌加智力'], kill_add_int + '')
                let kill_add_agi = solarData.kill_add_agi ? solarData.kill_add_agi : 0
                DzFrameSetText(panel_UI['杀敌加敏捷'], kill_add_agi + '')
                let kill_add_lumber = solarData.kill_add_lumber ? solarData.kill_add_lumber : 0
                DzFrameSetText(panel_UI['杀敌加木材'], kill_add_lumber + '')
                let kill_add_gold = solarData.kill_add_gold ? solarData.kill_add_gold : 0
                DzFrameSetText(panel_UI['杀敌加金币'], kill_add_gold + '')

                let strength_p = solarData.strength_p ? solarData.strength_p : 0
                DzFrameSetText(panel_UI['力量百分比'], strength_p * 100 + '%')
                let agility_p = solarData.agility_p ? solarData.agility_p : 0
                DzFrameSetText(panel_UI['敏捷百分比'], agility_p * 100 + '%')
                let intelligence_p = solarData.intelligence_p ? solarData.intelligence_p : 0
                DzFrameSetText(panel_UI['智力百分比'], intelligence_p * 100 + '%')

                let lucky_values = solarData.lucky_values ? solarData.lucky_values : 0
                DzFrameSetText(panel_UI['幸运值'], lucky_values + '')

                let kill_num_p = solarData.kill_num_p ? solarData.kill_num_p : 0
                DzFrameSetText(panel_UI['杀敌数加成'], kill_num_p * 100 + '%')
                let blood_sucking = solarData.blood_sucking ? solarData.blood_sucking : 0
                DzFrameSetText(panel_UI['固定值吸血'], blood_sucking + '')
            }
        }

    }

    static summon_refresh(p: player) {
        let panel_UI = Attribute_Panel1.panel_UI
        let u = SelectUtil.getAnHero(GetPlayerId(p))
        let solarData = DataBase.getUnitSolarData(u)
        // 召唤物-- 分类  刷新--------------------------------------------
        if (true) {
            let Summon_quantity = solarData.Summon_quantity ? solarData.Summon_quantity : 0
            DzFrameSetText(panel_UI['数量'], Summon_quantity + '')
            let Summon_state_add = solarData.Summon_state_add ? solarData.Summon_state_add : 0
            DzFrameSetText(panel_UI['属性加成'], Summon_state_add * 100 + '%')
            let Summon_inheritance_state_add = solarData.Summon_inheritance_state_add ? solarData.Summon_inheritance_state_add : 0
            DzFrameSetText(panel_UI['继承属性加成'], Summon_inheritance_state_add * 100 + '%')
            let Summon_Attack_speed = solarData.Summon_Attack_speed ? solarData.Summon_Attack_speed : 0
            DzFrameSetText(panel_UI['攻击速度加成'], Summon_Attack_speed * 100 + '%')
            let Summon_physical_critical_chance = solarData.Summon_physical_critical_chance ? solarData.Summon_physical_critical_chance : 0
            DzFrameSetText(panel_UI['暴击几率'], Summon_physical_critical_chance * 100 + '%')
            let Summon_physical_critical_damage = solarData.Summon_physical_critical_damage ? solarData.Summon_physical_critical_damage : 0
            DzFrameSetText(panel_UI['暴击伤害加成'], Summon_physical_critical_damage * 100 + '%')
            let Summon_Armor_penetrate = solarData.Summon_Armor_penetrate ? solarData.Summon_Armor_penetrate : 0
            DzFrameSetText(panel_UI['护甲穿透'], Summon_Armor_penetrate + '')
            let Summon_Armor_penetrate_p = solarData.Summon_Armor_penetrate_p ? solarData.Summon_Armor_penetrate_p : 0
            DzFrameSetText(panel_UI['护甲穿透百分比'], Summon_Armor_penetrate_p * 100 + '%')
            let Summon_damage_reduction = solarData.Summon_damage_reduction ? solarData.Summon_damage_reduction : 0
            DzFrameSetText(panel_UI['伤害减免'], Summon_damage_reduction * 100 + '%')
            let Summon_injury_reduction = solarData.Summon_injury_reduction ? solarData.Summon_injury_reduction : 0
            DzFrameSetText(panel_UI['减伤'], Summon_injury_reduction + '')
            let Summon_add_damage = solarData.Summon_add_damage ? solarData.Summon_add_damage : 0
            DzFrameSetText(panel_UI['附加伤害'], Summon_add_damage + '')
            let Summon_real_damage = solarData.Summon_real_damage ? solarData.Summon_real_damage : 0
            DzFrameSetText(panel_UI['真实伤害'], Summon_real_damage + '')
            let Summon_add_damage_p = solarData.Summon_add_damage_p ? solarData.Summon_add_damage_p : 0
            DzFrameSetText(panel_UI['附加伤害加成'], Summon_add_damage_p * 100 + '%')
            let Summon_real_damage_p = solarData.Summon_real_damage_p ? solarData.Summon_real_damage_p : 0
            DzFrameSetText(panel_UI['真实伤害加成'], Summon_real_damage_p * 100 + '%')
            let Summon_damage_increased = solarData.Summon_damage_increased ? solarData.Summon_damage_increased : 0
            DzFrameSetText(panel_UI['全额增伤'], Summon_damage_increased + '')

            let Upper_limit_charging_times = solarData.Upper_limit_charging_times ? solarData.Upper_limit_charging_times : 0
            DzFrameSetText(panel_UI['充能次数'], Upper_limit_charging_times + '')
            let Charging_skill_damage = solarData.Charging_skill_damage ? solarData.Charging_skill_damage : 0
            DzFrameSetText(panel_UI['充能技伤'], Charging_skill_damage * 100 + '%')
            let Additional_damage_charging_skill = solarData.Additional_damage_charging_skill ? solarData.Additional_damage_charging_skill : 0
            DzFrameSetText(panel_UI['充能技伤附加'], Additional_damage_charging_skill + '')
            let Charging_skill_CD = solarData.Charging_skill_CD ? solarData.Charging_skill_CD : 0
            DzFrameSetText(panel_UI['充能技能CD'], Charging_skill_CD + '')
            let Charge_times_bonus_p = solarData.Charge_times_bonus_p ? solarData.Charge_times_bonus_p : 0
            DzFrameSetText(panel_UI['充能次数加成'], Charge_times_bonus_p * 100 + '%')
            let Damage_range_charging_skill = solarData.Damage_range_charging_skill ? solarData.Damage_range_charging_skill : 0
            DzFrameSetText(panel_UI['充能技伤范围'], Damage_range_charging_skill + '')


        }
    }
}
