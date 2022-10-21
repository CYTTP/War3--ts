
import Fukubukuro from "cyttp/UnitData/Fukubukuro";
import HoepColorText from "cyttp/Util/HoepColorText";
import HopeNonRepeatingRandom from "cyttp/Util/HopeNonRepeatingRandom";
import DataBase from "solar/common/DataBase"
import UnitSystem from "solar/ecs/UnitSystem";
import SelectUtil from "solar/util/SelectUtil"
import { Item } from "solar/w3ts/handles/item";
import { MapPlayer } from "solar/w3ts/handles/player";
import { Trigger } from "solar/w3ts/handles/trigger"


import Item_UI_Initialization_data from "./Item_UI_Initialization_data";



export default class Item_UI_Initialization {
    static config: {
        [id: string]: string,
    } = {
            '攻击+': '', '攻击加成+': HoepColorText('green'),
            '护甲+': '',
            '生命+': '', '生命加成+': HoepColorText('green'),
            '攻速+': HoepColorText('green'),
            '力量+': '', '力量加成+': HoepColorText('yellow'),
            '敏捷+': '', '敏捷加成+': HoepColorText('yellow'),
            '智力+': '', '智力加成+': HoepColorText('yellow'),
            '物理暴击+': HoepColorText('orange'), '物理爆伤+': HoepColorText('red'), '物理吸血+': '',
            '法术暴击+': HoepColorText('orange'), '法术爆伤+': HoepColorText('red'), '法术吸血+': '',
            '生命恢复+': HoepColorText('grass'), '百分比恢复生命+': HoepColorText('grass'),
            '魔法恢复+': HoepColorText('grass'),
            '护甲加成+': HoepColorText('grass'),
            '雷元素伤害+': HoepColorText('cyan'),
            '火元素伤害+': HoepColorText('cyan'),
            '木元素伤害+': HoepColorText('cyan'),
            '金元素伤害+': HoepColorText('cyan'),
            '土元素伤害+': HoepColorText('cyan'),
            '冰元素伤害+': HoepColorText('cyan'),
            '水元素伤害+': HoepColorText('cyan'),
            '雷元素伤害加成+': HoepColorText('grey'),
            '火元素伤害加成+': HoepColorText('grey'),
            '木元素伤害加成+': HoepColorText('grey'),
            '金元素伤害加成+': HoepColorText('grey'),
            '土元素伤害加成+': HoepColorText('grey'),
            '冰元素伤害加成+': HoepColorText('grey'),
            '水元素伤害加成+': HoepColorText('grey'),
            '雷元素暴击伤害加成+': HoepColorText('purple'),
            '火元素暴击伤害加成+': HoepColorText('purple'),
            '木元素暴击伤害加成+': HoepColorText('purple'),
            '金元素暴击伤害加成+': HoepColorText('purple'),
            '土元素暴击伤害加成+': HoepColorText('purple'),
            '冰元素暴击伤害加成+': HoepColorText('purple'),
            '水元素暴击伤害加成+': HoepColorText('purple'),
            '攻击增加攻击+': HoepColorText('pink'),
            '攻击增加敏捷+': HoepColorText('pink'),
            '攻击增加智力+': HoepColorText('pink'),
            '攻击增加力量+': HoepColorText('pink'),
            '攻击增加生命+': HoepColorText('pink'),
            '攻击增加木材+': HoepColorText('pink'),
            '攻击增加金币+': HoepColorText('pink'),
            '召唤物属性加成+': HoepColorText('azure'),
            '召唤物继承属性加成+': HoepColorText('azure'),
            '召唤物攻击速度+': HoepColorText('azure'),
            '召唤物护甲穿透+': HoepColorText('azure'),
            '召唤物数量+': HoepColorText('azure'),
            '召唤物伤害减免+': HoepColorText('azure'),
            '召唤物减伤+': HoepColorText('azure'),
            '召唤物附加伤害+': HoepColorText('azure'),
            '召唤物真实伤害+': HoepColorText('azure'),
            '每秒增加攻击+': HoepColorText('violet'),
            '每秒增加敏捷+': HoepColorText('violet'),
            '每秒增加智力+': HoepColorText('violet'),
            '每秒增加力量+': HoepColorText('violet'),
            '每秒增加生命+': HoepColorText('violet'),
            '每秒增加金币+': HoepColorText('violet'),
            '每秒增加木材+': HoepColorText('violet'),
            '每秒增加杀敌+': HoepColorText('violet'),
            '真实伤害+': HoepColorText('red'),
            '附加伤害+': HoepColorText('red'),
            '技能附加伤害+': HoepColorText('red'),
            '技能CD-': HoepColorText('grass'),
            '致命一击+': HoepColorText('red'),
            '护甲穿透+': HoepColorText('grass'),
            '魔抗穿透+': HoepColorText('grass'),
            '固定值吸血+': HoepColorText('wolred'),
            '百分比吸血+': HoepColorText('wolred'),
            '充能技能伤害+': HoepColorText('wolred'),
            '幸运值+': HoepColorText('wolred'),

        };
    static real?: string[] = ['攻击加成+', '生命加成+', '攻速+', '力量加成+', '敏捷加成+',
        '智力加成+', '物理暴击+', '物理爆伤+', '法术暴击+', '法术爆伤+', '护甲加成+',
        '雷元素伤害加成+', '雷元素暴击伤害加成+', '火元素伤害加成+', '火元素暴击伤害加成+',
        '木元素伤害加成+',
        '金元素伤害加成+',
        '土元素伤害加成+',
        '冰元素伤害加成+',
        '水元素伤害加成+',
        '木元素暴击伤害加成+',
        '金元素暴击伤害加成+',
        '土元素暴击伤害加成+',
        '冰元素暴击伤害加成+',
        '水元素暴击伤害加成+',
        '召唤物属性加成+',
        '召唤物继承属性加成+',
        '召唤物伤害减免+',
        '充能技能伤害+',
        '百分比吸血+',
        '百分比恢复生命+'
    ]


    static arry: string[] = []
    constructor() {
        // DzLoadToc("UI\\path.toc")
        let trigger = new Trigger()
        trigger.registerTimerEvent(0.1, false)
        trigger.addAction(this.ui_display)

    }
    // 随机属性ui创建
    ui_display(this: void) {
        DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, 'ui--------------')
        // 创建平铺的背景   DzFrameGetTooltip() ToolTipBackground       Demo_BorderBack
        let f = DzCreateFrameByTagName("BACKDROP", "name", DzGetGameUI(), "Demo_BorderBack", 0)
        //  DzFrameSetTexture(f, "icon_Prop_bar_interface_one.tga", 0)
        DzFrameSetTexture(f, "sxzld.blp", 0)
        let ff = DzCreateFrameByTagName("BACKDROP", "name", f, "template", 0)
        DzFrameSetSize(ff, 0.215, 0.00001)
        DzFrameSetPoint(ff, 6, DzGetGameUI(), 8, -0.215, 0.163)

        let f1 = DzCreateFrameByTagName("BACKDROP", "name", f, "template", 0)
        DzFrameSetSize(f1, 0.205, 0.001)
        // // // // 创建宽64 高64  装备图标
        let f2 = DzCreateFrameByTagName("BACKDROP", "name", f, "Demo_SizeBack", 0)
        DzFrameSetSize(f2, 0.025, 0.025)
        let f3 = DzCreateFrameByTagName("TEXT", "name", f, "template", 0)
        DzFrameSetFont(f3, 'Fonts\\ChaoCuZiTi.ttf', 0.015, 0.015)
        DzFrameSetText(f3, "这只是一个装备名字")

        let f4 = DzCreateFrameByTagName("TEXT", "name", f, "template", 0)
        DzFrameSetText(f4, '未赋值文本' + '\n')
        DzFrameSetFont(f4, 'Fonts\\ChaoCuZiTi.ttf', 0.012, 0.012)
        DzFrameSetPoint(f4, 6, DzGetGameUI(), 8, -0.215, 0.173)

        DzFrameSetPoint(f1, 0, f4, 0, 0, 0.005)

        DzFrameSetPoint(f2, 0, f4, 0, 0, 0.04)
        DzFrameSetPoint(f3, 3, f2, 5, 0.01, 0)
        DzFrameSetPoint(f, 0, f2, 0, -0.01, 0.01)
        DzFrameSetPoint(f, 8, ff, 8, 0, 0)

        DzFrameShow(f, false)

        // 清除原生文本提示
        let w0: string = I2S(DzFrameGetItemBarButton(0))
        let w1: string = I2S(DzFrameGetItemBarButton(1))
        let w2: string = I2S(DzFrameGetItemBarButton(2))
        let w3: string = I2S(DzFrameGetItemBarButton(3))
        let w4: string = I2S(DzFrameGetItemBarButton(4))
        let w5: string = I2S(DzFrameGetItemBarButton(5))
        Item_UI_Initialization.arry = [w0, w1, w2, w3, w4, w5]
        for (let i = 0; i < 6; i++) {
            // if (GetLocalPlayer() == GetLocalPlayer()) {
            // 关闭原生文本提示，显示ui，
            DzFrameSetScriptByCode(DzFrameGetItemBarButton(i), 2, () => {
                let id: string = I2S(DzGetTriggerUIEventFrame())
                let ii;
                if (id == Item_UI_Initialization.arry[0]) {
                    ii = 0
                } else if (id == Item_UI_Initialization.arry[1]) {
                    ii = 1
                }
                else if (id == Item_UI_Initialization.arry[2]) {
                    ii = 2
                }
                else if (id == Item_UI_Initialization.arry[3]) {
                    ii = 3
                }
                else if (id == Item_UI_Initialization.arry[4]) {
                    ii = 4
                }
                else if (id == Item_UI_Initialization.arry[5]) {
                    ii = 5
                }
                let p = DzGetTriggerUIEventPlayer()
                let unit = DataBase.getPlayerSolarData(p).获得物品的单位
                if (!unit) { return }
                let item: item = UnitItemInSlot(unit, ii)
                // let iii = DataBase.getPlayerSolarData(Player(0)).装备UI物品栏按钮序号[DzFrameGetItemBarButton(i)]
                // let item:item = UnitItemInSlot(SelectUtil.getAnHero(GetConvertedPlayerId(DzGetTriggerUIEventPlayer()) - 1), DataBase.getPlayerSolarData(Player(0)).装备UI物品栏按钮序号[DzGetTriggerUIEventFrame()])
                // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetItemName(item))
                // 不是永久类型物品，就返回
                if (GetItemType(item) != ITEM_TYPE_PERMANENT) { return }
                for (let v in Item_UI_Initialization_data.item_data) {
                    if (GetItemTypeId(item) == FourCC(v)) {
                        if (GetItemName(item)) {
                            DzFrameSetText(f3, GetItemName(item))
                            let txte = Item_UI_Initialization.Item_UI_Text_Splicing(item)
                            DzFrameSetText(f4, txte)
                            DzFrameClearAllPoints(DzFrameGetTooltip())
                            DzFrameSetAbsolutePoint(DzFrameGetTooltip(), 3, 0.80, 0)
                            DzFrameSetTexture(f2, EXGetItemDataString(GetItemTypeId(item), 1), 0)
                            DzFrameShow(f, true)
                        }
                    }
                }
            }, false)
            // }

            // 隐藏ui，开启原生文本提示
            DzFrameSetScriptByCode(DzFrameGetItemBarButton(i), 3, () => {
                DzFrameClearAllPoints(DzFrameGetTooltip())
                DzFrameSetPoint(DzFrameGetTooltip(), 8, DzGetGameUI(), 8, 0, 0.163)
                DzFrameShow(f, false)
            }, false)

        }


    }

    // 赋值随机属性的 文本
    static Item_UI_Text_Splicing(item: item): string {
        let row: string = '\n'
        let text: string = DataBase.getItemSolarData(item).模拟随机属性UI文本提示 + row + row
        let Separator: string = '|r'
        let config = Item_UI_Initialization.config
        let data = DataBase.getItemSolarData(item).模拟随机属性UI
        // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '======' + data)
        if (!data) {
            text = '本装备不支持属性'
            return text
        }
        for (let value in config) {
            if (data[value]) {
                // let data = Item_UI_Initialization_data.item_data[wp_id]
                // 判断百分比
                let num = data[value]
                let real = Item_UI_Initialization.real
                for (let i = 0; i < real.length; i++) {
                    if (real[i] == value) {
                        num = num + '%'
                        break
                    }
                }
                // 判断文本要不要加颜色
                if (config[value] != '') {
                    text = text + config[value] + value + num + Separator + row
                } else {
                    text = text + value + num + + row
                }
            }
        }
        return text
    }

    // 初始创建永久物品，给物品绑定随机属性
    static ItemStartRandomData(wp: item, wp_id: string, player: player) {

        if (!DataBase.getItemSolarData(wp).属性加成一次) {

            if (GetItemType(wp) != ITEM_TYPE_PERMANENT) { return }
            if (!DataBase.getItemSolarData(wp).模拟随机属性UI) {
                DataBase.getItemSolarData(wp).模拟随机属性UI = {}
                // 记录物品原本的 文本说明
                // DataBase.getItemSolarData(wp).模拟随机属性UI文本提示 = item[wp_id].Ubertip
                DataBase.getItemSolarData(wp).模拟随机属性UI文本提示 = '星级：' + item[wp_id].Level

            }

            let data = Item_UI_Initialization_data.item_data[wp_id]
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '======' + data)
            if (data == null) { return }
            let abs = data.abs
            // 赋值绝对属性
            this.item_int_real_judge(wp, abs,)
            // 额外随机属性的数量 + 通过锻造额外增加的属性词条
            // let num = data.num + add_num
            // if (num <= 0) { return }
            // let random_array: number[] = HopeNonRepeatingRandom(0, 11, num)
            // // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, ' random_array长度:' + random_array.length)
            // let section_data = data.section_data
            // // 赋值额外的属性
            // for (let i = 0; i < random_array.length; i++) {
            //     let attribute = section_data[random_array[i]]
            //     //DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, ' attribute长度:' + attribute)
            //     this.item_int_real_judge(wp, attribute,)
            // }

            // for (let v in abs) {
            //     DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '  v:' + v)
            // }

            DataBase.getItemSolarData(wp).属性加成一次 = true

        }

    }

    // 判断随机属性，是整数，还是实数
    static item_int_real_judge(wp: item, data: { [name: string]: number[] },) {
        for (let k in data) {
            let start = data[k][0]
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, ' start:' + start)
            let num = DataBase.getItemSolarData(wp).模拟随机属性UI[k] ? DataBase.getItemSolarData(wp).模拟随机属性UI[k] : 0
            DataBase.getItemSolarData(wp).模拟随机属性UI[k] = start + num

        }
    }
}
