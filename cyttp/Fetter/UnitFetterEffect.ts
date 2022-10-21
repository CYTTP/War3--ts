
import HoepColorText from "cyttp/Util/HoepColorText"
import NumerivalUtil from "cyttp/Util/NumerivalUtil"
import UiButtonUtil from "cyttp/Util/UiButtonUtil"
import DataBase from "solar/common/DataBase"
import { Easing, Tween } from "solar/tween"
import BaseUtil from "solar/util/BaseUtil"
import SelectUtil from "solar/util/SelectUtil"
import { Frame } from "solar/w3ts/handles/frame"
import UnitFetterEffectSimple from "./UnitFetterEffectSimple"

DzLoadToc('UI\\path.toc')
/**
 * 羁绊效果
 */
export default class UnitFetterEffect {

    // 记录ui大小
    static panel_UI: { [ui_KEY: string]: number } = {}
    //记录阵营
    static campg: group[] = [CreateGroup(), CreateGroup(), CreateGroup(), CreateGroup()]
    //记录定位
    static locationg: group[] = [CreateGroup(), CreateGroup(), CreateGroup(), CreateGroup()]
    //个人羁绊记录
    static num: number[] = [0, 0, 0, 0]

    static background = [
        //类型背景
        'UI_Icon\\cstp.tga',
        //hover背景
        "cundang\\cd_shitou_hover.tga"


    ]
    // 记录ui 名字序号
    UIname: number = 0
    //配置表
    static config: {
        [key: string]: { name?: string[], effect?: string[] }
    } = {
            '神木': { name: ['三才阵', '六合阵', '九宫阵'], effect: ['英雄木元素伤害+5000', '英雄木元素暴伤加成+50%', '英雄木元素伤害加成+30%'], },
            '白玲': { name: ['三截阵', '六爻阵', '九诡阵'], effect: ['英雄水元素伤害+5000', '英雄水元素暴伤加成+50%', '英雄水元素伤害加成+30%'], },
            '圣神': { name: ['三星阵', '六芒阵', '九天阵'], effect: ['英雄金元素伤害+5000', '英雄金元素暴伤加成+50%', '英雄金元素伤害加成+30%'], },
            '天龙': { name: ['三合阵', '六魂阵', '九阳阵'], effect: ['英雄火元素伤害+5000', '英雄火元素暴伤加成+50%', '英雄火元素伤害加成+30%'], },
            '御兽': { name: ['三裂阵', '六滔阵', '九魄阵'], effect: ['英雄土元素伤害+5000', '英雄土元素暴伤加成+50%', '英雄土元素伤害加成+30%'], },
        }
    static typeConfig: {
        [key: string]: { name?: string[], effect?: string[] }
    } = {
            '肉盾近战': { name: ['肉盾一星', '肉盾二星', '肉盾三星'], effect: ['英雄最大生命值+2000', '英雄生命值恢复+200', '英雄生命百分比+30%'], },
            '力量近战': { name: ['力战一星', '力战二星', '力战三星'], effect: ['英雄绿字力量+500', '英雄白字力量+1500', '英雄力量加成+50%'], },
            '敏捷近战': { name: ['敏战一星', '敏战二星', '敏战三星'], effect: ['英雄绿字敏捷+500', '英雄白字敏捷+1500', '英雄敏捷加成+50%'], },
            '敏捷远程': { name: ['远程一星', '远程二星', '远程三星'], effect: ['英雄绿字攻击力+800', '英雄白字攻击力+2000', '英雄攻击力加成+50%'], },
            '敏捷刺客': { name: ['刺客一星', '刺客二星', '刺客三星'], effect: ['英雄攻速+20%', '英雄攻速+50%', '英雄附加伤害+10000'], },
            '元素法师': { name: ['元素一星', '元素二星', '元素三星'], effect: ['英雄绿字智力+500', '英雄白字智力1500', '英雄智力加成+50%'], },
            '魔力法师': { name: ['魔力一星', '魔力二星', '魔力三星'], effect: ['英雄绿字智力+1000', '英雄魔法暴伤加成+50%', '英雄魔法伤害加成+50%'], },
        }
    constructor() {

        // 记录UI
        let panel_UI = UnitFetterEffect.panel_UI

        //--------------------------------------------阵营---------------------------------------
        //按钮大小
        let btn = 0.03
        panel_UI['阵营按钮'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['阵营按钮'], btn, btn)
        DzFrameSetTexture(panel_UI['阵营按钮'], UnitFetterEffect.background[0], 0)
        DzFrameShow(panel_UI['阵营按钮'], true)
        // DzFrameSetPoint(panel_UI['阵营按钮'], 0, DzGetGameUI(), 0, 0.0093, -0.095)

        panel_UI['阵营按钮模型'] = DzCreateFrameByTagName("SPRITE", this.Suit_Ui_Name(), panel_UI['阵营按钮'], "template", 0)
        DzFrameSetSize(panel_UI['阵营按钮模型'], btn, btn)
        DzFrameShow(panel_UI['阵营按钮模型'], true)
        DzFrameSetPoint(panel_UI['阵营按钮模型'], 4, panel_UI['阵营按钮'], 4, -0.005, -0.003)
        DzFrameSetModel(panel_UI['阵营按钮模型'], "purple.mdx", 0, 0)


        let sst_z = UiButtonUtil.Button_Backdrop(btn, btn, panel_UI['阵营按钮'], this.Suit_Ui_Name())


        panel_UI['阵营背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['阵营背景图'], 0.13, 0.15) //nothing.tga
        // DzFrameSetTexture(panel_UI['阵营背景图'], "shuaxfaguang.tga", 0)
        DzFrameSetTexture(panel_UI['阵营背景图'], UnitFetterEffect.background[1], 0)
        DzFrameShow(panel_UI['阵营背景图'], false)
        DzFrameSetPoint(panel_UI['阵营背景图'], 0, DzGetGameUI(), 0, 0.04, -0.12)


        panel_UI['阵营'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营'], 0.2, 0.05)
        DzFrameSetFont(panel_UI['阵营'], 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameShow(panel_UI['阵营'], true)
        DzFrameSetPoint(panel_UI['阵营'], 0, panel_UI['阵营背景图'], 0, 0.007, -0.007)
        DzFrameSetText(panel_UI['阵营'], HoepColorText('sheepblue') + '英雄阵营')

        panel_UI['阵营数量'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营数量'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['阵营数量'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['阵营数量'], true)
        DzFrameSetPoint(panel_UI['阵营数量'], 0, panel_UI['阵营背景图'], 0, 0.07, -0.007)
        DzFrameSetText(panel_UI['阵营数量'], HoepColorText('sheepblue') + '1' + '/9')

        panel_UI['阵营词条一'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营词条一'], 0.2, 0.08)
        DzFrameSetFont(panel_UI['阵营词条一'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['阵营词条一'], true)
        DzFrameSetPoint(panel_UI['阵营词条一'], 0, panel_UI['阵营背景图'], 0, 0.007, -0.03)
        // DzFrameSetText(panel_UI['阵营词条一'], HoepColorText('grey') + '[数量 3]\n' + '三才阵\n' + '英雄木元素伤害加成+30%')

        panel_UI['阵营词条二'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营词条二'], 0.2, 0.08)
        DzFrameSetFont(panel_UI['阵营词条二'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['阵营词条二'], true)
        DzFrameSetPoint(panel_UI['阵营词条二'], 0, panel_UI['阵营背景图'], 0, 0.007, -0.065)
        // DzFrameSetText(panel_UI['阵营词条二'], HoepColorText('grey') + '[数量 6]\n' + '六合阵\n' + '英雄木元素暴伤加成+50%')

        panel_UI['阵营词条三'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营词条三'], 0.2, 0.08)
        DzFrameSetFont(panel_UI['阵营词条三'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['阵营词条三'], true)
        DzFrameSetPoint(panel_UI['阵营词条三'], 0, panel_UI['阵营背景图'], 0, 0.007, -0.1)
        // DzFrameSetText(panel_UI['阵营词条三'], HoepColorText('grey') + '[数量 9]\n' + '九宫阵\n' + '英雄木元素伤害+5000')

        panel_UI['阵营底部提示'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['阵营背景图'], "template", 0)
        DzFrameSetSize(panel_UI['阵营底部提示'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['阵营底部提示'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['阵营底部提示'], true)
        DzFrameSetPoint(panel_UI['阵营底部提示'], 0, panel_UI['阵营背景图'], 0, 0.007, -0.14)
        DzFrameSetText(panel_UI['阵营底部提示'], HoepColorText('purple') + '羁绊内英雄才可享受羁绊效果')

        ///=============阵营-------------------
        //鼠标移出模式按钮
        DzFrameSetScriptByCode(sst_z, FRAMEEVENT_MOUSE_LEAVE, () => {
            // DzFrameShow(panel_UI['阵营按钮'], true)
            DzFrameShow(panel_UI['阵营背景图'], false)
            // DzFrameShow(panel_UI['阵营按钮2'], false)
        }, false)


        //鼠标移入模式按钮
        DzFrameSetScriptByCode(sst_z, FRAMEEVENT_MOUSE_ENTER, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            // DisplayTimedTextToPlayer(Player(0), 0, 0, 300, 'index=' + index);
            DzFrameShow(panel_UI['阵营背景图'], true)
            // DzFrameShow(panel_UI['阵营按钮2'], true)
            // DzFrameShow(panel_UI['阵营按钮'], false)
            let player_first_hero = SelectUtil.getAnHero(index)
            if (!IsHandle(player_first_hero)) return;

            let id = GetUnitTypeId(player_first_hero)
            let hreo_id = id2string(id)

            let str = index + '_' + hreo_id
            // DzSyncData("UI阵营移入显示羁绊", str)

        }, false);

        // // 注册事件同步数据
        let triggerHandle = CreateTrigger();
        DzTriggerRegisterSyncData(triggerHandle, "UI阵营移入显示羁绊", false)
        TriggerAddAction(triggerHandle, () => {
            let str = DzGetTriggerSyncData()
            let length: number = StringLength(str)
            let index = S2I(SubString(str, 0, 1))
            let p: player = Player(index)
            let ID: string = SubString(str, 2, length)
            let EditorSuffix = unit[ID].EditorSuffix
            let type = SubString(EditorSuffix, 0, 6)
            if (!DataBase.getPlayerSolarData(p).阵营刷新数据) {
                UnitFetterEffect.refesh_effect(ID, index)
                DataBase.getPlayerSolarData(p).阵营刷新数据 = true
            }

        });
        //----------------------------------------------------------------定位----------------------------------------
        panel_UI['定位按钮'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['定位按钮'], btn, btn)
        DzFrameSetTexture(panel_UI['定位按钮'], UnitFetterEffect.background[0], 0)
        DzFrameShow(panel_UI['定位按钮'], true)
        // DzFrameSetPoint(panel_UI['定位按钮'], 0, DzGetGameUI(), 0, 0.0093, -0.13)

        panel_UI['定位按钮模型'] = DzCreateFrameByTagName("SPRITE", this.Suit_Ui_Name(), panel_UI['定位按钮'], "template", 0)
        DzFrameSetSize(panel_UI['定位按钮模型'], btn, btn)
        DzFrameShow(panel_UI['定位按钮模型'], true)
        DzFrameSetPoint(panel_UI['定位按钮模型'], 4, panel_UI['定位按钮'], 4, -0.005, -0.003)
        DzFrameSetModel(panel_UI['定位按钮模型'], "purple.mdx", 0, 0)

        // panel_UI['定位按钮2'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        // DzFrameSetSize(panel_UI['定位按钮2'], btn, btn)
        // DzFrameSetTexture(panel_UI['定位按钮2'], background[0], 0)
        // DzFrameShow(panel_UI['定位按钮2'], false)
        // DzFrameSetPoint(panel_UI['定位按钮2'], 0, DzGetGameUI(), 0, 0.0093, -0.13)

        let dingweisst = UiButtonUtil.Button_Backdrop(btn, btn, panel_UI['定位按钮'], this.Suit_Ui_Name())
        // let sst_z21 = ChallengeBoss.Button_Backdrop(btn, btn, panel_UI['定位按钮2'], this.Suit_Ui_Name())

        panel_UI['定位背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['定位背景图'], 0.13, 0.15)
        DzFrameSetTexture(panel_UI['定位背景图'], UnitFetterEffect.background[1], 0)
        DzFrameShow(panel_UI['定位背景图'], false)
        DzFrameSetPoint(panel_UI['定位背景图'], 0, DzGetGameUI(), 0, 0.04, -0.155)


        panel_UI['定位'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位'], 0.1, 0.02)
        DzFrameSetFont(panel_UI['定位'], 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0)
        DzFrameShow(panel_UI['定位'], true)
        DzFrameSetPoint(panel_UI['定位'], 0, panel_UI['定位背景图'], 0, 0.007, -0.007)
        DzFrameSetText(panel_UI['定位'], HoepColorText('sheepblue') + '英雄定位')

        panel_UI['定位数量'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位数量'], 0.1, 0.02)
        DzFrameSetFont(panel_UI['定位数量'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['定位数量'], true)
        DzFrameSetPoint(panel_UI['定位数量'], 0, panel_UI['定位背景图'], 0, 0.07, -0.007)
        DzFrameSetText(panel_UI['定位数量'], HoepColorText('sheepblue') + '1' + '/9')

        panel_UI['定位词条一'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位词条一'], 0.2, 0.04)
        DzFrameSetFont(panel_UI['定位词条一'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['定位词条一'], true)
        DzFrameSetPoint(panel_UI['定位词条一'], 0, panel_UI['定位背景图'], 0, 0.007, -0.03)
        // DzFrameSetText(panel_UI['定位词条一'], HoepColorText('turquoise') + '[数量 3]\n' + '肉盾一星\n' + '英雄最大生命值+2000')

        panel_UI['定位词条二'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位词条二'], 0.2, 0.04)
        DzFrameSetFont(panel_UI['定位词条二'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['定位词条二'], true)
        DzFrameSetPoint(panel_UI['定位词条二'], 0, panel_UI['定位背景图'], 0, 0.007, -0.065)
        // DzFrameSetText(panel_UI['定位词条二'], HoepColorText('turquoise') + '[数量 6]\n' + '肉盾二星\n' + '英雄生命值恢复+200')

        panel_UI['定位词条三'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位词条三'], 0.2, 0.04)
        DzFrameSetFont(panel_UI['定位词条三'], 'Fonts\\ChaoCuZiTi.ttf', 0.009, 0)
        DzFrameShow(panel_UI['定位词条三'], true)
        DzFrameSetPoint(panel_UI['定位词条三'], 0, panel_UI['定位背景图'], 0, 0.007, -0.10)
        // DzFrameSetText(panel_UI['定位词条三'], HoepColorText('turquoise') + '[数量 9]\n' + '肉盾三星\n' + '英雄生命百分比+30%')

        panel_UI['定位底部提示'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['定位背景图'], "template", 0)
        DzFrameSetSize(panel_UI['定位底部提示'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['定位底部提示'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['定位底部提示'], true)
        DzFrameSetPoint(panel_UI['定位底部提示'], 0, panel_UI['定位背景图'], 0, 0.007, -0.14)
        DzFrameSetText(panel_UI['定位底部提示'], HoepColorText('purple') + '羁绊内英雄才可享受羁绊效果')


        ///=============定位-------------------
        //鼠标移出模式按钮
        DzFrameSetScriptByCode(dingweisst, FRAMEEVENT_MOUSE_LEAVE, () => {
            DzFrameShow(panel_UI['定位背景图'], false)
        }, false)

        //鼠标移入模式按钮
        DzFrameSetScriptByCode(dingweisst, FRAMEEVENT_MOUSE_ENTER, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            DzFrameShow(panel_UI['定位背景图'], true)
            let player_first_hero = SelectUtil.getAnHero(index)
            if (!IsHandle(player_first_hero)) return;
            let id = GetUnitTypeId(player_first_hero)
            let hreo_id = id2string(id)

            let str = index + '_' + hreo_id
            // DzSyncData("UI定位移入显示羁绊", str)

        }, false);

        // // 注册事件同步数据
        // let triggerHandle1 = CreateTrigger();
        // DzTriggerRegisterSyncData(triggerHandle1, "UI定位移入显示羁绊", false)
        // TriggerAddAction(triggerHandle1, () => {
        //     let str = DzGetTriggerSyncData()
        //     let length: number = StringLength(str)
        //     let index = S2I(SubString(str, 0, 1))
        //     let p: player = Player(index)
        //     let ID: string = SubString(str, 2, length)
        //     let dingw = unit[ID].Description
        //     if (!DataBase.getPlayerSolarData(p).定位刷新数据) {
        //         if (dingw == '肉盾近战') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '肉盾近战')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '肉盾一星\n' + '英雄最大生命值+2000')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '肉盾二星\n' + '英雄生命值恢复+200')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '肉盾三星\n' + '英雄生命百分比+30%')
        //             }
        //         } else if (dingw == '力量近战') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '力量近战')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '力战一星\n' + '英雄绿字力量+500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '力战二星\n' + '英雄白字力量+1500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '力战三星\n' + '英雄力量加成+50%')
        //             }
        //         } else if (dingw == '敏捷近战') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷近战')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '敏战一星\n' + '英雄绿字敏捷+500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '敏战二星\n' + '英雄白字敏捷+1500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '敏战三星\n' + '英雄敏捷加成+50%')
        //             }
        //         } else if (dingw == '敏捷远程') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷远程')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '远程一星\n' + '英雄绿字攻击力+800')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '远程二星\n' + '英雄白字攻击力+2000')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '远程三星\n' + '英雄攻击力加成+50%')
        //             }
        //         } else if (dingw == '敏捷刺客') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷刺客')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '刺客一星\n' + '英雄攻速+20%')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '刺客二星\n' + '英雄攻速+50%')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '刺客三星\n' + '英雄附加伤害+10000')
        //             }
        //         } else if (dingw == '元素法师') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '元素法师')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '元素一星\n' + '英雄绿字智力+500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '元素二星\n' + '英雄白字智力1500')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '元素三星\n' + '英雄智力加成+50%')
        //             }
        //         } else if (dingw == '魔力法师') {
        //             if (GetLocalPlayer() == p) {
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '魔力法师')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '魔力一星\n' + '英雄绿字智力+1000')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '魔力二星\n' + '英雄魔法暴伤加成+50%')
        //                 DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '魔力三星\n' + '英雄魔法伤害加成+50%')
        //             }
        //         }

        //         DataBase.getPlayerSolarData(p).定位刷新数据 = true
        //     }


        // });


        //----------------------------------------------个人 -------------------------------------------
        panel_UI['个人按钮'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['个人按钮'], btn, btn)
        DzFrameSetTexture(panel_UI['个人按钮'], UnitFetterEffect.background[0], 0)
        DzFrameShow(panel_UI['个人按钮'], true)
        // DzFrameSetPoint(panel_UI['个人按钮'], 0, DzGetGameUI(), 0, 0.0093, -0.165)

        panel_UI['个人按钮模型'] = DzCreateFrameByTagName("SPRITE", this.Suit_Ui_Name(), panel_UI['个人按钮'], "template", 0)
        DzFrameSetSize(panel_UI['个人按钮模型'], btn, btn)
        DzFrameShow(panel_UI['个人按钮模型'], true)
        DzFrameSetPoint(panel_UI['个人按钮模型'], 4, panel_UI['个人按钮'], 4, -0.005, -0.003)
        DzFrameSetModel(panel_UI['个人按钮模型'], "purple.mdx", 0, 0)

        let gerensst = UiButtonUtil.Button_Backdrop(btn, btn, panel_UI['个人按钮'], this.Suit_Ui_Name())

        panel_UI['个人背景图'] = DzCreateFrameByTagName("BACKDROP", this.Suit_Ui_Name(), DzGetGameUI(), "template", 0)
        DzFrameSetSize(panel_UI['个人背景图'], 0.2, 0.2)
        DzFrameSetTexture(panel_UI['个人背景图'], UnitFetterEffect.background[1], 0)
        DzFrameShow(panel_UI['个人背景图'], false)
        DzFrameSetPoint(panel_UI['个人背景图'], 0, DzGetGameUI(), 0, 0.04, -0.19)

        panel_UI['个人词条1'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条1'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条1'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['个人词条1'], true)
        DzFrameSetPoint(panel_UI['个人词条1'], 0, panel_UI['个人背景图'], 0, 0.007, -0.01)
        DzFrameSetText(panel_UI['个人词条1'], HoepColorText('turquoise') + '需求一：')

        panel_UI['个人词条2'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条2'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条2'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条2'], true)
        DzFrameSetPoint(panel_UI['个人词条2'], 0, panel_UI['个人背景图'], 0, 0.007, -0.03)
        // DzFrameSetText(panel_UI['个人词条2'], HoepColorText('grey') + '名字第一')

        panel_UI['个人词条3'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条3'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条3'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条3'], true)
        DzFrameSetPoint(panel_UI['个人词条3'], 0, panel_UI['个人背景图'], 0, 0.042, -0.03)
        // DzFrameSetText(panel_UI['个人词条3'], HoepColorText('grey') + '名字第二')

        panel_UI['个人词条4'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条4'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条4'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条4'], true)
        DzFrameSetPoint(panel_UI['个人词条4'], 0, panel_UI['个人背景图'], 0, 0.077, -0.03)
        // DzFrameSetText(panel_UI['个人词条4'], HoepColorText('grey') + '名字第三')

        panel_UI['个人词条5'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条5'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条5'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条5'], true)
        DzFrameSetPoint(panel_UI['个人词条5'], 0, panel_UI['个人背景图'], 0, 0.112, -0.03)
        // DzFrameSetText(panel_UI['个人词条5'], HoepColorText('grey') + '名字第四')

        panel_UI['个人词条6'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条6'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条6'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条6'], true)
        DzFrameSetPoint(panel_UI['个人词条6'], 0, panel_UI['个人背景图'], 0, 0.147, -0.03)
        // DzFrameSetText(panel_UI['个人词条6'], HoepColorText('grey') + '名字第五')

        panel_UI['集齐效果'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['集齐效果'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['集齐效果'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['集齐效果'], true)
        DzFrameSetPoint(panel_UI['集齐效果'], 0, panel_UI['个人背景图'], 0, 0.007, -0.045)
        DzFrameSetText(panel_UI['集齐效果'], HoepColorText('turquoise') + '集齐效果')

        panel_UI['效果一'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果一'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果一'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果一'], true)
        DzFrameSetPoint(panel_UI['效果一'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.06)
        // DzFrameSetText(panel_UI['效果一'], HoepColorText('turquoise') + '本多理慧：强袭触发时额外造成1000点伤害')


        panel_UI['效果二'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果二'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果二'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果二'], true)
        DzFrameSetPoint(panel_UI['效果二'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.071)
        // DzFrameSetText(panel_UI['效果二'], HoepColorText('turquoise') + '大桥直美：经商每秒对周围的敌人造成200点魔法伤害')

        panel_UI['效果三'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果三'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果三'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果三'], true)
        DzFrameSetPoint(panel_UI['效果三'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.082)
        // DzFrameSetText(panel_UI['效果三'], HoepColorText('turquoise') + '北川尤娜：抢劫发动时额外造成攻击力*3的物理伤害')

        panel_UI['效果四'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果四'], 0.3, 0.02)
        DzFrameSetFont(panel_UI['效果四'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果四'], true)
        DzFrameSetPoint(panel_UI['效果四'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.093)
        // DzFrameSetText(panel_UI['效果四'], HoepColorText('turquoise') + '福冈乃：天降冰山会对500范围内的敌人造成1000点冰冻伤害')

        panel_UI['效果五'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果五'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果五'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果五'], true)
        DzFrameSetPoint(panel_UI['效果五'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.104)
        // DzFrameSetText(panel_UI['效果五'], HoepColorText('turquoise') + '土田结人：召唤巨鸡召唤时间间隔减少5秒')

        panel_UI['效果六'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果六'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果六'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果六'], true)
        DzFrameSetPoint(panel_UI['效果六'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.115)
        // DzFrameSetText(panel_UI['效果六'], HoepColorText('turquoise') + '小松琉圣：金刚天风触发几率提高5%')

        panel_UI['提示'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['提示'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['提示'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['提示'], true)
        DzFrameSetPoint(panel_UI['提示'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.13)
        DzFrameSetText(panel_UI['提示'], HoepColorText('purple') + '需要全部集齐才有效果')

        panel_UI['需求二'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['需求二'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['需求二'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['需求二'], true)
        DzFrameSetPoint(panel_UI['需求二'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.14)
        DzFrameSetText(panel_UI['需求二'], HoepColorText('turquoise') + '需求二：')

        panel_UI['个人词条7'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['个人词条7'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['个人词条7'], 'Fonts\\ChaoCuZiTi.ttf', 0.008, 0)
        DzFrameShow(panel_UI['个人词条7'], true)
        DzFrameSetPoint(panel_UI['个人词条7'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.155)
        // DzFrameSetText(panel_UI['个人词条7'], HoepColorText('grey') + '我很熟啊')

        panel_UI['集齐效果1'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['集齐效果1'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['集齐效果1'], 'Fonts\\ChaoCuZiTi.ttf', 0.01, 0)
        DzFrameShow(panel_UI['集齐效果1'], true)
        DzFrameSetPoint(panel_UI['集齐效果1'], 0, panel_UI['个人背景图'], 0, 0.007, -0.17)
        DzFrameSetText(panel_UI['集齐效果1'], HoepColorText('turquoise') + '集齐效果')

        panel_UI['效果七'] = DzCreateFrameByTagName("TEXT", this.Suit_Ui_Name(), panel_UI['个人背景图'], "template", 0)
        DzFrameSetSize(panel_UI['效果七'], 0.2, 0.02)
        DzFrameSetFont(panel_UI['效果七'], 'Fonts\\ChaoCuZiTi.ttf', 0.007, 0)
        DzFrameShow(panel_UI['效果七'], true)
        DzFrameSetPoint(panel_UI['效果七'], 0, panel_UI['个人背景图'], 0, 0.0075, -0.185)
        // DzFrameSetText(panel_UI['效果七'], HoepColorText('grey') + '羁绊内英雄木元素伤害增加2000')

        ///=============个人-------------------
        //鼠标移出模式按钮
        DzFrameSetScriptByCode(gerensst, FRAMEEVENT_MOUSE_LEAVE, () => {
            DzFrameShow(panel_UI['个人背景图'], false)
        }, false)

        //鼠标移入模式按钮
        DzFrameSetScriptByCode(gerensst, FRAMEEVENT_MOUSE_ENTER, () => {
            // 点击的ui玩家
            let player = DzGetTriggerUIEventPlayer()
            let index = GetPlayerId(player)
            DzFrameShow(panel_UI['个人背景图'], true)
            let player_first_hero = SelectUtil.getAnHero(index)
            if (!IsHandle(player_first_hero)) return;
            let id = GetUnitTypeId(player_first_hero)
            let hreo_id = id2string(id)
            let str = index + '_' + hreo_id
            // DzSyncData("UI个人移入显示羁绊", str)

        }, false);

        // // // 注册事件同步数据
        // let triggerHandle2 = CreateTrigger();
        // DzTriggerRegisterSyncData(triggerHandle2, "UI个人移入显示羁绊", false)
        // TriggerAddAction(triggerHandle2, () => {
        //     let str = DzGetTriggerSyncData()
        //     let length: number = StringLength(str)
        //     let index = S2I(SubString(str, 0, 1))
        //     let p: player = Player(index)
        //     let ID: string = SubString(str, 2, length)
        //     if (!DataBase.getPlayerSolarData(p).个人刷新数据) {
        //         for (let v in UnitFetterEffectSimple.config) {
        //             let data = UnitFetterEffectSimple.config[v]
        //             if (ID === v) {
        //                 DzFrameSetText(panel_UI['个人词条2'], HoepColorText('grey') + data.textShow[1][0])
        //                 DzFrameSetText(panel_UI['个人词条3'], HoepColorText('grey') + data.textShow[1][1])
        //                 DzFrameSetText(panel_UI['个人词条4'], HoepColorText('grey') + data.textShow[1][2])
        //                 DzFrameSetText(panel_UI['个人词条5'], HoepColorText('grey') + data.textShow[1][3])
        //                 DzFrameSetText(panel_UI['个人词条6'], HoepColorText('grey') + data.textShow[1][4])
        //                 DzFrameSetText(panel_UI['个人词条7'], HoepColorText('grey') + data.textShow[2][0])
        //                 DzFrameSetText(panel_UI['效果一'], HoepColorText('grey') + data.textShow[0][0])
        //                 DzFrameSetText(panel_UI['效果二'], HoepColorText('grey') + data.textShow[0][1])
        //                 DzFrameSetText(panel_UI['效果三'], HoepColorText('grey') + data.textShow[0][2])
        //                 DzFrameSetText(panel_UI['效果四'], HoepColorText('grey') + data.textShow[0][3])
        //                 DzFrameSetText(panel_UI['效果五'], HoepColorText('grey') + data.textShow[0][4])
        //                 DzFrameSetText(panel_UI['效果六'], HoepColorText('grey') + data.textShow[0][5])
        //                 DzFrameSetText(panel_UI['效果七'], HoepColorText('grey') + data.textShow[2][1])
        //             }
        //         }
        //         DataBase.getPlayerSolarData(p).个人刷新数据 = true
        //     }
        // });

    }

    /**
     * 数据获取
     * @param index 
     * @param u 
     * @returns 
     */
    static refesh_unit_count(index: number, u: unit) {
        if (IsUnitType(u, UNIT_TYPE_HERO)) {
            let hero = SelectUtil.getAnHero(index)
            //获取配置表的数据
            let config = UnitFetterEffect.config
            let typeConfig = UnitFetterEffect.typeConfig
            //获取单位的自定义值
            let unit_type = unit[id2string(GetUnitTypeId(u))]
            //获取阵营
            let unit_type_zq = unit_type.EditorSuffix
            let typeStr = SubString(unit_type_zq, 0, 6)
            //获取第一个英雄的阵营
            let getAnHeroType = SubString(unit[id2string(GetUnitTypeId(hero))].EditorSuffix, 0, 6)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, 'getAnHeroType=' + getAnHeroType)
            GroupAddUnit(UnitFetterEffect.campg[index], hero)
            if (typeStr === getAnHeroType) {
                GroupAddUnit(UnitFetterEffect.campg[index], u)
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '单位组数量=' + CountUnitsInGroup(UnitFetterEffect.campg[index]))
                if (GetLocalPlayer() == Player(index)) {
                    DzFrameSetText(UnitFetterEffect.panel_UI['阵营数量'], HoepColorText('red') + CountUnitsInGroup(UnitFetterEffect.campg[index]) + HoepColorText('turquoise') + '/9')
                }
                for (let v in config) {
                    let data = config[v]
                    if (typeStr == v) {
                        if (CountUnitsInGroup(UnitFetterEffect.campg[index]) == 3) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('red') + '[数量 3]\n' + data.name[0] + '\n' + data.effect[0])
                            } //添加羁绊效果
                            UnitFetterEffect.effectAdd(v, 0, UnitFetterEffect.campg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + v + '·' + data.name[0]);
                        } else if (CountUnitsInGroup(UnitFetterEffect.campg[index]) == 6) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('red') + '[数量 3]\n' + data.name[1] + '\n' + data.effect[1])
                            }
                            UnitFetterEffect.effectAdd(v, 1, UnitFetterEffect.campg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + v + '·' + data.name[1]);
                        } else if (CountUnitsInGroup(UnitFetterEffect.campg[index]) == 9) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('red') + '[数量 3]\n' + data.name[2] + '\n' + data.effect[2])
                            }
                            UnitFetterEffect.effectAdd(v, 2, UnitFetterEffect.campg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + v + '·' + data.name[2]);
                        } else if (CountUnitsInGroup(UnitFetterEffect.campg[index]) > 4) {
                            GroupClear(UnitFetterEffect.campg[index])
                            DestroyGroup(UnitFetterEffect.campg[index])
                        }
                    }
                }
            }
            //获取定位
            let dingwStr = unit_type.Description
            //获取第一个英雄的定位
            let getAnHerodingw = unit[id2string(GetUnitTypeId(hero))].Description
            GroupAddUnit(UnitFetterEffect.locationg[index], hero)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '单位的定位' + dingwStr);
            if (dingwStr == getAnHerodingw) {
                GroupAddUnit(UnitFetterEffect.locationg[index], u)
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '单位数量' + CountUnitsInGroup(UnitFetterEffect.locationg[index]));
                if (GetLocalPlayer() == Player(index)) {
                    DzFrameSetText(UnitFetterEffect.panel_UI['定位数量'], HoepColorText('red') + CountUnitsInGroup(UnitFetterEffect.locationg[index]) + HoepColorText('turquoise') + '/9')
                }
                for (let k in typeConfig) {
                    let data = typeConfig[k]
                    if (dingwStr == k) {
                        if (CountUnitsInGroup(UnitFetterEffect.locationg[index]) == 2) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('red') + '[数量 3]\n' + data.name[0] + '\n' + data.effect[0])
                            }
                            UnitFetterEffect.dingwEffectAdd(k, 0, UnitFetterEffect.locationg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + data.name[0]);
                            return
                        } else if (CountUnitsInGroup(UnitFetterEffect.locationg[index]) == 4) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('red') + '[数量 3]\n' + data.name[1] + '\n' + data.effect[1])
                            }
                            UnitFetterEffect.dingwEffectAdd(k, 1, UnitFetterEffect.locationg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + data.name[1]);
                        } else if (CountUnitsInGroup(UnitFetterEffect.locationg[index]) == 6) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('red') + '[数量 3]\n' + data.name[2] + '\n' + data.effect[2])
                            }
                            UnitFetterEffect.dingwEffectAdd(k, 2, UnitFetterEffect.locationg[index])
                            DisplayTimedTextToPlayer(Player(index), 0, 0, 5, HoepColorText('yellow') + '【系统】' + '激活羁绊' + HoepColorText('snow') + data.name[2]);
                        } else if (CountUnitsInGroup(UnitFetterEffect.locationg[index]) > 4) {
                            GroupClear(UnitFetterEffect.locationg[index])
                            DestroyGroup(UnitFetterEffect.locationg[index])
                        }
                    }
                }
            }
            //个人羁绊 --------------
            for (let k in UnitFetterEffectSimple.config) {
                let data = UnitFetterEffectSimple.config[k]
                if (GetUnitTypeId(hero) == FourCC(k)) {
                    for (let v in data.simpleConfig) {
                        let data1 = data.simpleConfig[v]
                        if (GetUnitTypeId(u) == FourCC(v)) {
                            UnitFetterEffect.num[index] += 1
                            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, 'kkkkkkkkkkkkk' + UnitFetterEffect.num);
                            let table_index = NumerivalUtil.getSpecialIndexArr(data.textShow[1], GetUnitName(u))
                            if (table_index[0] == 0) {
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['个人词条2'], HoepColorText('gold') + data1.name)
                                }
                            } else if (table_index[0] == 1) {
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['个人词条3'], HoepColorText('gold') + data1.name)
                                }
                            } else if (table_index[0] == 2) {
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['个人词条4'], HoepColorText('gold') + data1.name)
                                }
                            } else if (table_index[0] == 3) {
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['个人词条5'], HoepColorText('gold') + data1.name)
                                }
                            } else if (table_index[0] == 4) {
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['个人词条6'], HoepColorText('gold') + data1.name)
                                }
                            }
                            if (UnitFetterEffect.num[index] == 5) {
                                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '个人羁绊触发-----');
                                //效果点亮
                                if (GetLocalPlayer() == Player(index)) {
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果一'], HoepColorText('gold') + data.textShow[0][0])
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果二'], HoepColorText('gold') + data.textShow[0][1])
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果三'], HoepColorText('gold') + data.textShow[0][2])
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果四'], HoepColorText('gold') + data.textShow[0][3])
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果五'], HoepColorText('gold') + data.textShow[0][4])
                                    DzFrameSetText(UnitFetterEffect.panel_UI['效果六'], HoepColorText('gold') + data.textShow[0][5])
                                }
                                //团队效果触发
                                UnitFetterEffect.FiveTeamFetterEffect(k, GetOwningPlayer(u))

                            }
                        }
                    }

                    for (let v in data.simpleConfigTwo) {
                        let data2 = data.simpleConfigTwo[v]
                        if (GetUnitTypeId(u) == FourCC(v)) {
                            if (GetLocalPlayer() == Player(index)) {
                                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条7'], HoepColorText('red') + data2.name)
                                DzFrameSetText(UnitFetterEffect.panel_UI['效果七'], HoepColorText('red') + data2.effect)
                            }
                            UnitFetterEffect.IndividualEffectAdd(u)
                            UnitFetterEffect.IndividualEffectAdd(hero)
                        }
                    }
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
     * 阵营加成羁绊效果
     * @param effectStr 
     * @param index 
     * @param group 
     */
    static effectAdd(effectStr: string, index: number, group: group) {
        ForGroup(group, () => {
            let xdw = GetEnumUnit()
            switch (effectStr) {
                case '神木':
                    if (index == 0) {
                        let wood_damage = DataBase.getUnitSolarData(xdw).wood_damage ? DataBase.getUnitSolarData(xdw).wood_damage : 0
                        wood_damage += 5000
                        DataBase.getUnitSolarData(xdw).wood_damage = wood_damage
                        /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                    } else if (index == 1) {
                        let wood_critical_damage = DataBase.getUnitSolarData(xdw).wood_critical_damage ? DataBase.getUnitSolarData(xdw).wood_critical_damage : 0
                        wood_critical_damage += 0.5
                        DataBase.getUnitSolarData(xdw).wood_critical_damage = wood_critical_damage
                    } else if (index == 2) {
                        let wood_damage_increased = DataBase.getUnitSolarData(xdw).wood_damage_increased ? DataBase.getUnitSolarData(xdw).wood_damage_increased : 0
                        wood_damage_increased += 0.3
                        DataBase.getUnitSolarData(xdw).wood_damage_increased = wood_damage_increased
                    }
                    break;
                case '白玲':
                    if (index == 0) {
                        let water_damage = DataBase.getUnitSolarData(xdw).water_damage ? DataBase.getUnitSolarData(xdw).water_damage : 0
                        water_damage += 5000
                        DataBase.getUnitSolarData(xdw).water_damage = water_damage
                        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(xdw).water_damage)
                    } else if (index == 1) {
                        let water_critical_damage = DataBase.getUnitSolarData(xdw).water_critical_damage ? DataBase.getUnitSolarData(xdw).water_critical_damage : 0
                        water_critical_damage += 0.5
                        DataBase.getUnitSolarData(xdw).water_critical_damage = water_critical_damage
                    } else if (index == 2) {
                        let water_damage_increased = DataBase.getUnitSolarData(xdw).water_damage_increased ? DataBase.getUnitSolarData(xdw).water_damage_increased : 0
                        water_damage_increased += 0.3
                        DataBase.getUnitSolarData(xdw).water_damage_increased = water_damage_increased
                    }
                    break;
                case '圣神':
                    if (index == 0) {
                        let gold_damage = DataBase.getUnitSolarData(xdw).gold_damage ? DataBase.getUnitSolarData(xdw).gold_damage : 0
                        gold_damage += 5000
                        DataBase.getUnitSolarData(xdw).gold_damage = gold_damage
                        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(xdw).water_damage)
                    } else if (index == 1) {
                        let gold_critical_damage = DataBase.getUnitSolarData(xdw).gold_critical_damage ? DataBase.getUnitSolarData(xdw).gold_critical_damage : 0
                        gold_critical_damage += 0.5
                        DataBase.getUnitSolarData(xdw).gold_critical_damage = gold_critical_damage
                    } else if (index == 2) {
                        let gold_damage_increased = DataBase.getUnitSolarData(xdw).gold_damage_increased ? DataBase.getUnitSolarData(xdw).gold_damage_increased : 0
                        gold_damage_increased += 0.3
                        DataBase.getUnitSolarData(xdw).gold_damage_increased = gold_damage_increased
                    }
                    break;
                case '天龙':
                    if (index == 0) {
                        let fire_damage = DataBase.getUnitSolarData(xdw).fire_damage ? DataBase.getUnitSolarData(xdw).fire_damage : 0
                        fire_damage += 5000
                        DataBase.getUnitSolarData(xdw).fire_damage = fire_damage
                        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(xdw).water_damage)
                    } else if (index == 1) {
                        let fire_critical_damage = DataBase.getUnitSolarData(xdw).fire_critical_damage ? DataBase.getUnitSolarData(xdw).fire_critical_damage : 0
                        fire_critical_damage += 0.5
                        DataBase.getUnitSolarData(xdw).fire_critical_damage = fire_critical_damage
                    } else if (index == 2) {
                        let fire_damage_increased = DataBase.getUnitSolarData(xdw).fire_damage_increased ? DataBase.getUnitSolarData(xdw).fire_damage_increased : 0
                        fire_damage_increased += 0.3
                        DataBase.getUnitSolarData(xdw).fire_damage_increased = fire_damage_increased
                    }
                    break;
                case '御兽':
                    if (index == 0) {
                        let Soil_damage = DataBase.getUnitSolarData(xdw).Soil_damage ? DataBase.getUnitSolarData(xdw).Soil_damage : 0
                        Soil_damage += 5000
                        DataBase.getUnitSolarData(xdw).Soil_damage = Soil_damage
                        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(xdw).water_damage)
                    } else if (index == 1) {
                        let Soil_critical_damage = DataBase.getUnitSolarData(xdw).Soil_critical_damage ? DataBase.getUnitSolarData(xdw).Soil_critical_damage : 0
                        Soil_critical_damage += 0.5
                        DataBase.getUnitSolarData(xdw).Soil_critical_damage = Soil_critical_damage
                    } else if (index == 2) {
                        let Soil_damage_increased = DataBase.getUnitSolarData(xdw).Soil_damage_increased ? DataBase.getUnitSolarData(xdw).Soil_damage_increased : 0
                        Soil_damage_increased += 0.3
                        DataBase.getUnitSolarData(xdw).Soil_damage_increased = Soil_damage_increased
                    }
                    break;
            }
        })


    }

    /**
     * 定位加成羁绊
     * @param effectStr 
     * @param index 
     * @param group 
     */
    static dingwEffectAdd(effectStr: string, index: number, group: group) {
        ForGroup(group, () => {
            let xdw = GetEnumUnit()
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(xdw))
            if (effectStr == '肉盾近战') {
                if (index == 0) { //英雄最大生命值+2000
                    SetUnitState(xdw, UNIT_STATE_MAX_LIFE, GetUnitState(xdw, UNIT_STATE_MAX_LIFE) + 2000)
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄生命值恢复+200
                    UnitAddAbility(xdw, 'A01B')
                } else if (index == 2) {
                    let life_p = DataBase.getUnitSolarData(xdw).life_p ? DataBase.getUnitSolarData(xdw).life_p : 0
                    life_p += 0.3
                    DataBase.getUnitSolarData(xdw).life_p = life_p
                }
            } else if (effectStr == '力量近战') {
                if (index == 0) { //英雄绿字力量+500
                    UnitAddAbility(xdw, 'A017')
                    // let strength = DataBase.getUnitSolarData(xdw).strength ? DataBase.getUnitSolarData(xdw).strength : 0
                    // strength += 500
                    // DataBase.getUnitSolarData(xdw).strength = strength
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄白字力量+1500
                    ModifyHeroStat(bj_HEROSTAT_STR, xdw, bj_MODIFYMETHOD_ADD, 1500);
                } else if (index == 2) { //英雄力量加成+50%
                    let strength_p = DataBase.getUnitSolarData(xdw).strength_p ? DataBase.getUnitSolarData(xdw).strength_p : 0
                    strength_p += 0.5
                    DataBase.getUnitSolarData(xdw).strength_p = strength_p
                }
            } else if (effectStr == '敏捷近战') {
                if (index == 0) { //英雄绿字敏捷+500
                    UnitAddAbility(xdw, 'A018')
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄白字敏捷+1500
                    ModifyHeroStat(bj_HEROSTAT_AGI, xdw, bj_MODIFYMETHOD_ADD, 1500);
                } else if (index == 2) { //英雄敏捷加成+50%
                    let agility_p = DataBase.getUnitSolarData(xdw).agility_p ? DataBase.getUnitSolarData(xdw).agility_p : 0
                    agility_p += 0.5
                    DataBase.getUnitSolarData(xdw).agility_p = agility_p
                }
            } else if (effectStr == '敏捷远程') {
                if (index == 0) { //英雄绿字攻击力+800
                    UnitAddAbility(xdw, 'A01A')
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄白字攻击力+2000
                    SetUnitState(xdw, ConvertUnitState(0x12), GetUnitState(xdw, ConvertUnitState(0x12)) + 2000)
                } else if (index == 2) { //英雄攻击力加成+50%
                    let attack_p = DataBase.getUnitSolarData(xdw).attack_p ? DataBase.getUnitSolarData(xdw).attack_p : 0
                    attack_p += 0.5
                    DataBase.getUnitSolarData(xdw).attack_p = attack_p
                }
            } else if (effectStr == '敏捷刺客') {
                if (index == 0) { //英雄攻速+20%
                    UnitAddAbility(xdw, 'A01C')
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄攻速+50%
                    UnitAddAbility(xdw, 'A01D')
                } else if (index == 2) { //英雄附加伤害+10000
                    let Add_damage = DataBase.getUnitSolarData(xdw).Add_damage ? DataBase.getUnitSolarData(xdw).Add_damage : 0
                    Add_damage += 10000
                    DataBase.getUnitSolarData(xdw).Add_damage = Add_damage
                }
            } else if (effectStr == '元素法师') {
                if (index == 0) { //英雄绿字智力+500
                    UnitAddAbility(xdw, 'A019')
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄bai智力+1500
                    ModifyHeroStat(bj_HEROSTAT_INT, xdw, bj_MODIFYMETHOD_ADD, 1500);
                } else if (index == 2) { //英雄zhi力加成+50%
                    let intelligence_p = DataBase.getUnitSolarData(xdw).intelligence_p ? DataBase.getUnitSolarData(xdw).intelligence_p : 0
                    intelligence_p += 0.5
                    DataBase.getUnitSolarData(xdw).intelligence_p = intelligence_p
                }
            } else if (effectStr == '魔力法师') {
                if (index == 0) { //英雄绿字智力+1000
                    UnitAddAbility(xdw, 'A01E')
                    /// DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + GetUnitName(u))
                } else if (index == 1) { //英雄魔法暴伤加成+50%
                    let magic_critical_damage = DataBase.getUnitSolarData(xdw).magic_critical_damage ? DataBase.getUnitSolarData(xdw).magic_critical_damage : 0
                    magic_critical_damage += 0.5
                    DataBase.getUnitSolarData(xdw).magic_critical_damage = magic_critical_damage
                } else if (index == 2) { //英英雄魔法伤害加成+50%
                    let magic_damage_increased = DataBase.getUnitSolarData(xdw).magic_damage_increased ? DataBase.getUnitSolarData(xdw).magic_damage_increased : 0
                    magic_damage_increased += 0.5
                    DataBase.getUnitSolarData(xdw).magic_damage_increased = magic_damage_increased
                }
            }

        })
    }
    /**
     * 个人羁绊效果
     * @param u 
     */
    static IndividualEffectAdd(u: unit) {
        if (GetUnitName(u) == '小松琉圣' || GetUnitName(u) == '佐野野') {
            let wood_damage = DataBase.getUnitSolarData(u).wood_damage ? DataBase.getUnitSolarData(u).wood_damage : 0
            wood_damage += 2000
            DataBase.getUnitSolarData(u).wood_damage = wood_damage
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(u).water_critical_damage)
        } else if (GetUnitName(u) == '浅井祥' || GetUnitName(u) == '大纣豪') {
            let wood_critical_damage = DataBase.getUnitSolarData(u).wood_critical_damage ? DataBase.getUnitSolarData(u).wood_critical_damage : 0
            wood_critical_damage += 1
            DataBase.getUnitSolarData(u).wood_critical_damage = wood_critical_damage
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(u).water_critical_damage)
        } else if (GetUnitName(u) == '江口锦' || GetUnitName(u) == '关口辉') {
            let wood_damage_increased = DataBase.getUnitSolarData(u).wood_damage_increased ? DataBase.getUnitSolarData(u).wood_damage_increased : 0
            wood_damage_increased += 1
            DataBase.getUnitSolarData(u).wood_damage_increased = wood_damage_increased
        } else if (GetUnitName(u) == '谷口亮介' || GetUnitName(u) == '福田生') {
            let Add_damage = DataBase.getUnitSolarData(u).Add_damage ? DataBase.getUnitSolarData(u).Add_damage : 0
            Add_damage += 3000
            DataBase.getUnitSolarData(u).Add_damage = Add_damage
        } else if (GetUnitName(u) == '立原美' || GetUnitName(u) == '佐久间') {
            let real_damage = DataBase.getUnitSolarData(u).real_damage ? DataBase.getUnitSolarData(u).real_damage : 0
            real_damage += 1000
            DataBase.getUnitSolarData(u).real_damage = real_damage
        } else if (GetUnitName(u) == '北原祐真' || GetUnitName(u) == '大桥直美') {
            let damage_increased = DataBase.getUnitSolarData(u).damage_increased ? DataBase.getUnitSolarData(u).damage_increased : 0
            damage_increased += 0.3
            DataBase.getUnitSolarData(u).damage_increased = damage_increased
        } else if (GetUnitName(u) == '内山奈' || GetUnitName(u) == '本多理') {
            let wood_critical_chance = DataBase.getUnitSolarData(u).wood_critical_chance ? DataBase.getUnitSolarData(u).wood_critical_chance : 0
            wood_critical_chance += 0.05
            DataBase.getUnitSolarData(u).damage_increased = wood_critical_chance
        } else if (GetUnitName(u) == '下田大树' || GetUnitName(u) == '竹田贝斗') {
            let gold_damage = DataBase.getUnitSolarData(u).gold_damage ? DataBase.getUnitSolarData(u).gold_damage : 0
            gold_damage += 2000
            DataBase.getUnitSolarData(u).gold_damage = gold_damage
        } else if (GetUnitName(u) == '西光希' || GetUnitName(u) == '田辽悠生') {
            let gold_critical_damage = DataBase.getUnitSolarData(u).gold_critical_damage ? DataBase.getUnitSolarData(u).gold_critical_damage : 0
            gold_critical_damage += 1
            DataBase.getUnitSolarData(u).gold_critical_damage = gold_critical_damage
        } else if (GetUnitName(u) == '宫下野' || GetUnitName(u) == '大田有里') {
            let gold_damage_increased = DataBase.getUnitSolarData(u).gold_damage_increased ? DataBase.getUnitSolarData(u).gold_damage_increased : 0
            gold_damage_increased += 0.3
            DataBase.getUnitSolarData(u).gold_damage_increased = gold_damage_increased
        } else if (GetUnitName(u) == '川岛奏汰' || GetUnitName(u) == '涉谷京香') {
            let ability_type = DataBase.getUnitSolarData(u).ability_type ? DataBase.getUnitSolarData(u).ability_type : 0
            ability_type += 3000
            DataBase.getUnitSolarData(u).ability_type = ability_type
        } else if (GetUnitName(u) == '黑沢帆' || GetUnitName(u) == '三木右斗') {
            let magic_critical_damage = DataBase.getUnitSolarData(u).magic_critical_damage ? DataBase.getUnitSolarData(u).magic_critical_damage : 0
            magic_critical_damage += 1
            DataBase.getUnitSolarData(u).magic_critical_damage = magic_critical_damage
        } else if (GetUnitName(u) == '藤本太一' || GetUnitName(u) == '福原贝人') {
            let magic_damage_increased = DataBase.getUnitSolarData(u).magic_damage_increased ? DataBase.getUnitSolarData(u).magic_damage_increased : 0
            magic_damage_increased += 0.3
            DataBase.getUnitSolarData(u).magic_damage_increased = magic_damage_increased
        } else if (GetUnitName(u) == '冈村树理' || GetUnitName(u) == '三木正宗') {
            let gold_critical_chance = DataBase.getUnitSolarData(u).gold_critical_chance ? DataBase.getUnitSolarData(u).gold_critical_chance : 0
            gold_critical_chance += 0.05
            DataBase.getUnitSolarData(u).gold_critical_chance = gold_critical_chance
        } else if (GetUnitName(u) == '远藤悠雅' || GetUnitName(u) == '立原和宏') {
            let fire_damage = DataBase.getUnitSolarData(u).fire_damage ? DataBase.getUnitSolarData(u).fire_damage : 0
            fire_damage += 2000
            DataBase.getUnitSolarData(u).fire_damage = fire_damage
        } else if (GetUnitName(u) == '蹈叶航平' || GetUnitName(u) == '和田纯一') {
            let fire_critical_damage = DataBase.getUnitSolarData(u).fire_critical_damage ? DataBase.getUnitSolarData(u).fire_critical_damage : 0
            fire_critical_damage += 1
            DataBase.getUnitSolarData(u).fire_critical_damage = fire_critical_damage
        } else if (GetUnitName(u) == '杉山喜江' || GetUnitName(u) == '中井圭悟') {
            let fire_damage_increased = DataBase.getUnitSolarData(u).fire_damage_increased ? DataBase.getUnitSolarData(u).fire_damage_increased : 0
            fire_damage_increased += 0.3
            DataBase.getUnitSolarData(u).fire_damage_increased = fire_damage_increased
        } else if (GetUnitName(u) == '中原良介' || GetUnitName(u) == '森山雄斗') {
            let Armor_penetrate_p = DataBase.getUnitSolarData(u).Armor_penetrate_p ? DataBase.getUnitSolarData(u).Armor_penetrate_p : 0
            Armor_penetrate_p += 0.3
            DataBase.getUnitSolarData(u).Armor_penetrate_p = Armor_penetrate_p
        } else if (GetUnitName(u) == '长尾加南' || GetUnitName(u) == '满口结人') {
            let deathdamage = DataBase.getUnitSolarData(u).deathdamage ? DataBase.getUnitSolarData(u).deathdamage : 0
            deathdamage += 5
            DataBase.getUnitSolarData(u).Armor_penetrate_p = deathdamage
        } else if (GetUnitName(u) == '丹羽耀' || GetUnitName(u) == '黑田章') {
            UnitAddAbility(u, 'A01C')
        } else if (GetUnitName(u) == '平田成美' || GetUnitName(u) == '藤川阳树') {
            let fire_critical_chance = DataBase.getUnitSolarData(u).fire_critical_chance ? DataBase.getUnitSolarData(u).fire_critical_chance : 0
            fire_critical_chance += 0.05
            DataBase.getUnitSolarData(u).fire_critical_chance = fire_critical_chance
        } else if (GetUnitName(u) == '武田裕介' || GetUnitName(u) == '北川尤娜') {
            let water_damage = DataBase.getUnitSolarData(u).water_damage ? DataBase.getUnitSolarData(u).water_damage : 0
            water_damage += 2000
            DataBase.getUnitSolarData(u).water_damage = water_damage
        } else if (GetUnitName(u) == '吉原康平' || GetUnitName(u) == '久保奏多') {
            let water_critical_damage = DataBase.getUnitSolarData(u).water_critical_damage ? DataBase.getUnitSolarData(u).water_critical_damage : 0
            water_critical_damage += 1
            DataBase.getUnitSolarData(u).water_critical_damage = water_critical_damage
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(u).water_critical_damage)
        } else if (GetUnitName(u) == '小松由子' || GetUnitName(u) == '德田右京') {
            let water_damage_increased = DataBase.getUnitSolarData(u).water_damage_increased ? DataBase.getUnitSolarData(u).water_damage_increased : 0
            water_damage_increased += 0.3
            DataBase.getUnitSolarData(u).water_damage_increased = water_damage_increased
            //  DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 300, '' + DataBase.getUnitSolarData(u).water_critical_damage)
        } else if (GetUnitName(u) == '森下太雅' || GetUnitName(u) == '大竹卓也') {
            let ability_CD = DataBase.getUnitSolarData(u).ability_CD ? DataBase.getUnitSolarData(u).ability_CD : 0
            ability_CD += 0.2
            DataBase.getUnitSolarData(u).ability_CD = ability_CD
        } else if (GetUnitName(u) == '平松娅栗' || GetUnitName(u) == '原口和纱') {
            let mana_r = DataBase.getUnitSolarData(u).mana_r ? DataBase.getUnitSolarData(u).mana_r : 0
            mana_r += 5
            DataBase.getUnitSolarData(u).mana_r = mana_r
        } else if (GetUnitName(u) == '今村敦史' || GetUnitName(u) == '松沢牙') {
            let magic_penetrate_p = DataBase.getUnitSolarData(u).magic_penetrate_p ? DataBase.getUnitSolarData(u).magic_penetrate_p : 0
            magic_penetrate_p += 0.2
            DataBase.getUnitSolarData(u).magic_penetrate_p = magic_penetrate_p
        } else if (GetUnitName(u) == '冈有香' || GetUnitName(u) == '渡部知子') {
            let water_critical_chance = DataBase.getUnitSolarData(u).water_critical_chance ? DataBase.getUnitSolarData(u).water_critical_chance : 0
            water_critical_chance += 0.05
            DataBase.getUnitSolarData(u).water_critical_chance = water_critical_chance
        } else if (GetUnitName(u) == '竹内聪介' || GetUnitName(u) == '土田结人') {
            let Soil_damage = DataBase.getUnitSolarData(u).Soil_damage ? DataBase.getUnitSolarData(u).Soil_damage : 0
            Soil_damage += 2000
            DataBase.getUnitSolarData(u).Soil_damage = Soil_damage
        } else if (GetUnitName(u) == '黑沢新大' || GetUnitName(u) == '秋原夏江') {
            let Soil_critical_damage = DataBase.getUnitSolarData(u).Soil_critical_damage ? DataBase.getUnitSolarData(u).Soil_critical_damage : 0
            Soil_critical_damage += 1
            DataBase.getUnitSolarData(u).Soil_critical_damage = Soil_critical_damage
        } else if (GetUnitName(u) == '横田富佐' || GetUnitName(u) == '沢田尚子') {
            let Soil_damage_increased = DataBase.getUnitSolarData(u).Soil_damage_increased ? DataBase.getUnitSolarData(u).Soil_damage_increased : 0
            Soil_damage_increased += 0.3
            DataBase.getUnitSolarData(u).Soil_damage_increased = Soil_damage_increased
        } else if (GetUnitName(u) == '宫本雅也' || GetUnitName(u) == '福本悠也') {
            let Summon_add_damage = DataBase.getUnitSolarData(u).Summon_add_damage ? DataBase.getUnitSolarData(u).Summon_add_damage : 0
            Summon_add_damage += 3000
            DataBase.getUnitSolarData(u).Summon_add_damage = Summon_add_damage
        } else if (GetUnitName(u) == '片山逸美' || GetUnitName(u) == '金田健介') {
            let Summon_real_damage = DataBase.getUnitSolarData(u).Summon_real_damage ? DataBase.getUnitSolarData(u).Summon_real_damage : 0
            Summon_real_damage += 1000
            DataBase.getUnitSolarData(u).Summon_real_damage = Summon_real_damage
        } else if (GetUnitName(u) == '板纣爽太' || GetUnitName(u) == '沼田崎') {
            let Summon_damage_increased = DataBase.getUnitSolarData(u).Summon_damage_increased ? DataBase.getUnitSolarData(u).Summon_damage_increased : 0
            Summon_damage_increased += 0.3
            DataBase.getUnitSolarData(u).Summon_damage_increased = Summon_damage_increased
        } else if (GetUnitName(u) == '小山寿美' || GetUnitName(u) == '西田里') {
            let Soil_critical_chance = DataBase.getUnitSolarData(u).Soil_critical_chance ? DataBase.getUnitSolarData(u).Soil_critical_chance : 0
            Soil_critical_chance += 0.05
            DataBase.getUnitSolarData(u).Soil_critical_chance = Soil_critical_chance
        }

    }
    /**
     * 团队羁绊效果
     * @param str 
     * @param p 
     */
    static FiveTeamFetterEffect(str: string, p: player) {
        if (str == 'Q0ou') {
            DataBase.getPlayerSolarData(p).小松琉圣团队效果触发 = true
        } else if (str == 'Q0ov') {
            DataBase.getPlayerSolarData(p).浅井祥团队效果触发 = true
        } else if (str == 'Q0p0') {
            DataBase.getPlayerSolarData(p).江口锦团队效果触发 = true
        } else if (str == 'Q0p1') {
            DataBase.getPlayerSolarData(p).谷口亮介团队效果触发 = true
        } else if (str == 'Q0p2') {
            DataBase.getPlayerSolarData(p).立原美团队效果触发 = true
        } else if (str == 'Q0p3') {
            DataBase.getPlayerSolarData(p).北原祐真团队效果触发 = true
        } else if (str == 'Q0p4') {
            DataBase.getPlayerSolarData(p).内山奈团队效果触发 = true
        } else if (str == 'Q0p5') {
            DataBase.getPlayerSolarData(p).下田大树团队效果触发 = true
        } else if (str == 'Q0p6') {
            DataBase.getPlayerSolarData(p).西光希团队效果触发 = true
        } else if (str == 'Q0p7') {
            DataBase.getPlayerSolarData(p).宫下野团队效果触发 = true
        } else if (str == 'Q0p8') {
            DataBase.getPlayerSolarData(p).川岛奏汰团队效果触发 = true
        } else if (str == 'Q0p9') {
            DataBase.getPlayerSolarData(p).黑沢帆团队效果触发 = true
        } else if (str == 'Q0pa') {
            DataBase.getPlayerSolarData(p).藤本太一团队效果触发 = true
        } else if (str == 'Q0pb') {
            DataBase.getPlayerSolarData(p).冈村树理团队效果触发 = true
        } else if (str == 'Q0pc') {
            DataBase.getPlayerSolarData(p).远藤悠雅团队效果触发 = true
        } else if (str == 'Q0pd') {
            DataBase.getPlayerSolarData(p).蹈叶航平团队效果触发 = true
        } else if (str == 'Q0pe') {
            DataBase.getPlayerSolarData(p).杉山喜江团队效果触发 = true
        } else if (str == 'Q0pf') {
            DataBase.getPlayerSolarData(p).中原良介团队效果触发 = true
        } else if (str == 'Q0pg') {
            DataBase.getPlayerSolarData(p).长尾加南团队效果触发 = true
        } else if (str == 'Q0ph') {
            DataBase.getPlayerSolarData(p).丹羽耀团队效果触发 = true
        } else if (str == 'Q0pi') {
            DataBase.getPlayerSolarData(p).平田成美团队效果触发 = true
        } else if (str == 'Q0pj') {
            DataBase.getPlayerSolarData(p).武田裕介团队效果触发 = true
        } else if (str == 'Q0pk') {
            DataBase.getPlayerSolarData(p).吉原康平团队效果触发 = true
        } else if (str == 'Q0pl') {
            DataBase.getPlayerSolarData(p).小松由子团队效果触发 = true
        } else if (str == 'Q0pm') {
            DataBase.getPlayerSolarData(p).森下太雅团队效果触发 = true
        } else if (str == 'Q0pn') {
            DataBase.getPlayerSolarData(p).平松娅栗团队效果触发 = true
        } else if (str == 'Q0po') {
            DataBase.getPlayerSolarData(p).今村敦史团队效果触发 = true
        } else if (str == 'Q0pp') {
            DataBase.getPlayerSolarData(p).冈有香团队效果触发 = true
        } else if (str == 'Q0pq') {
            DataBase.getPlayerSolarData(p).竹内聪介团队效果触发 = true
        } else if (str == 'Q0pr') {
            DataBase.getPlayerSolarData(p).黑沢新大团队效果触发 = true
        } else if (str == 'Q0ps') {
            DataBase.getPlayerSolarData(p).横田富佐团队效果触发 = true
        } else if (str == 'Q0pt') {
            DataBase.getPlayerSolarData(p).宫本雅也团队效果触发 = true
        } else if (str == 'Q0pu') {
            DataBase.getPlayerSolarData(p).片山逸美团队效果触发 = true
        } else if (str == 'Q0pv') {
            DataBase.getPlayerSolarData(p).板纣爽太团队效果触发 = true
        } else if (str == 'Q0q0') {
            DataBase.getPlayerSolarData(p).小山寿美团队效果触发 = true
        }
        //羁绊调用
        // let solarData = DataBase.getPlayerSolarData(p)
        // let isTrgger = solarData.小松琉圣团队效果触发 ? solarData.小松琉圣团队效果触发 : false
        // if (isTrgger == true) {
        //     /**
        //      * 触发技能效果
        //      * 这里面写技能效果
        //      */
        // }
    }

    /**
     * 刷新羁绊效果
     * @param ID 
     * @param index 
     */
    static refesh_effect(ID: string, index: number) {
        let EditorSuffix = unit[ID].EditorSuffix
        let dingw = unit[ID].Description
        let type = SubString(EditorSuffix, 0, 6)
        if (type == '神木') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营'], HoepColorText('sheepblue') + '神木阵营')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('grey') + '[数量 3]\n' + '三才阵\n' + '英雄木元素伤害+5000')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('grey') + '[数量 6]\n' + '六合阵\n' + '英雄木元素暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('grey') + '[数量 9]\n' + '九宫阵\n' + '英雄木元素伤害加成+30%')
            }
        } else if (type == '圣神') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营'], HoepColorText('sheepblue') + '圣神阵营')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('turquoise') + '[数量 3]\n' + '三星阵\n' + '英雄金元素伤害+5000')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('turquoise') + '[数量 6]\n' + '六芒阵\n' + '英雄金元素暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('turquoise') + '[数量 9]\n' + '九天阵\n' + '英雄金元素伤害加成+30%')
            }
        } else if (type == '白玲') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营'], HoepColorText('sheepblue') + '白玲阵营')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('turquoise') + '[数量 3]\n' + '三截阵\n' + '英雄水元素伤害+5000')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('turquoise') + '[数量 6]\n' + '六爻阵\n' + '英雄水元素暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('turquoise') + '[数量 9]\n' + '九诡阵\n' + '英雄水元素伤害加成+30%')

            }
        } else if (type == '天龙') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营'], HoepColorText('sheepblue') + '天龙阵营')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('turquoise') + '[数量 3]\n' + '三合阵\n' + '英雄火元素伤害+5000')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('turquoise') + '[数量 6]\n' + '六魂阵\n' + '英雄火元素暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('turquoise') + '[数量 9]\n' + '九阳阵\n' + '英雄火元素伤害加成+30%')

            }
        } else if (type == '御兽') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营'], HoepColorText('sheepblue') + '御兽阵营')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条一'], HoepColorText('turquoise') + '[数量 3]\n' + '三裂阵\n' + '英雄土元素伤害+5000')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条二'], HoepColorText('turquoise') + '[数量 6]\n' + '六滔阵\n' + '英雄土元素暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['阵营词条三'], HoepColorText('turquoise') + '[数量 9]\n' + '九魄阵\n' + '英雄土元素伤害加成+30%')

            }
        }
        if (dingw == '肉盾近战') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '肉盾近战')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '肉盾一星\n' + '英雄最大生命值+2000')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '肉盾二星\n' + '英雄生命值恢复+200')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '肉盾三星\n' + '英雄生命百分比+30%')
            }
        } else if (dingw == '力量近战') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '力量近战')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '力战一星\n' + '英雄绿字力量+500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '力战二星\n' + '英雄白字力量+1500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '力战三星\n' + '英雄力量加成+50%')
            }
        } else if (dingw == '敏捷近战') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷近战')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '敏战一星\n' + '英雄绿字敏捷+500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '敏战二星\n' + '英雄白字敏捷+1500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '敏战三星\n' + '英雄敏捷加成+50%')
            }
        } else if (dingw == '敏捷远程') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷远程')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '远程一星\n' + '英雄绿字攻击力+800')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '远程二星\n' + '英雄白字攻击力+2000')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '远程三星\n' + '英雄攻击力加成+50%')
            }
        } else if (dingw == '敏捷刺客') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '敏捷刺客')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '刺客一星\n' + '英雄攻速+20%')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '刺客二星\n' + '英雄攻速+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '刺客三星\n' + '英雄附加伤害+10000')
            }
        } else if (dingw == '元素法师') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '元素法师')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '元素一星\n' + '英雄绿字智力+500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '元素二星\n' + '英雄白字智力1500')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '元素三星\n' + '英雄智力加成+50%')
            }
        } else if (dingw == '魔力法师') {
            if (GetLocalPlayer() == Player(index)) {
                DzFrameSetText(UnitFetterEffect.panel_UI['定位'], HoepColorText('sheepblue') + '魔力法师')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条一'], HoepColorText('grey') + '[数量 3]\n' + '魔力一星\n' + '英雄绿字智力+1000')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条二'], HoepColorText('grey') + '[数量 6]\n' + '魔力二星\n' + '英雄魔法暴伤加成+50%')
                DzFrameSetText(UnitFetterEffect.panel_UI['定位词条三'], HoepColorText('grey') + '[数量 9]\n' + '魔力三星\n' + '英雄魔法伤害加成+50%')
            }
        }
        for (let v in UnitFetterEffectSimple.config) {
            let data = UnitFetterEffectSimple.config[v]
            if (ID === v) {
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条2'], HoepColorText('grey') + data.textShow[1][0])
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条3'], HoepColorText('grey') + data.textShow[1][1])
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条4'], HoepColorText('grey') + data.textShow[1][2])
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条5'], HoepColorText('grey') + data.textShow[1][3])
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条6'], HoepColorText('grey') + data.textShow[1][4])
                DzFrameSetText(UnitFetterEffect.panel_UI['个人词条7'], HoepColorText('grey') + data.textShow[2][0])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果一'], HoepColorText('grey') + data.textShow[0][0])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果二'], HoepColorText('grey') + data.textShow[0][1])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果三'], HoepColorText('grey') + data.textShow[0][2])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果四'], HoepColorText('grey') + data.textShow[0][3])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果五'], HoepColorText('grey') + data.textShow[0][4])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果六'], HoepColorText('grey') + data.textShow[0][5])
                DzFrameSetText(UnitFetterEffect.panel_UI['效果七'], HoepColorText('grey') + data.textShow[2][1])
            }
        }


    }

}