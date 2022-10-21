import ChangeWeatherOnTimeState from "./Util/ChangeWeatherOnTimeState";
import Item_UI_Initialization from "cyttp/ItemData/Item_UI_Initialization";
import Item_UI_Initialization_data from "cyttp/ItemData/Item_UI_Initialization_data";
import ItemSimulationAttributeHope from "cyttp/ItemData/ItemSimulationAttributeHope";
import CyttpDamageSystem from "cyttp/DamageSystem/CyttpDamageSystem";
import SummonConfig from "cyttp/DamageSystem/SummonConfig";
import Fukubukuro from "cyttp/UnitData/Fukubukuro";
import ItemSynthesisTriggerEventState from "cyttp/ItemData/ItemSynthesisTriggerEventState";
import StrangeStonesAddProperties from "cyttp/UnitData/StrangeStonesAddProperties";
import UnitFetterEffect from "cyttp/Fetter/UnitFetterEffect";
import EQ_Three_In_One from "cyttp/Equipment/EQ_Three_In_One";
import InitString from "./Equipment/Init_String";
import itemTransfer from "./Equipment/itemTransfer";
import FirstChargeGiftPack from "./UI/FirstChargeGiftPack/FirstChargeGiftPack";
import Hope_Item from "./Equipment/Hope_Item";
import Hope_Switch from "./UI/Functionality_UI/Hope_Switch";
import Suit_Equip_Ui_Show from "./UI/CD_Suit_UI/Suit_Equip_Ui_Show";
import index from "cyttp";
import keepIntheArchives from "./UI/CD_UI/keepIntheArchives";





export default function fileInit() {

    //天气
    // new ChangeWeatherOnTimeState()

    //伤害系统and属性系统
    new SummonConfig()
    new CyttpDamageSystem()
    new Item_UI_Initialization()
    new Item_UI_Initialization_data()
    new ItemSimulationAttributeHope()
    new ItemSynthesisTriggerEventState()

    //水引碗
    new EQ_Three_In_One()
    new InitString()
    new itemTransfer()
    new Hope_Item()

    //福袋 and 属性石
    new Fukubukuro()
    new StrangeStonesAddProperties()

    //羁绊效果
    new UnitFetterEffect()

    //首充礼包
    new FirstChargeGiftPack()
    //快捷开关
    new Hope_Switch()
    //存档套装
    new Suit_Equip_Ui_Show()
    //存档
    new keepIntheArchives()

}