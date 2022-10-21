import BaseUtil from "solar/util/BaseUtil";
import { MapPlayer } from "solar/w3ts/handles/player";

export default class MapStart {
    static PlayerKJxzq: fogmodifier[] = []//可见度修正器

    static PlayerKeJianDu() {//地图玩家可见度设置
        for (let pid = 0; pid < 4; pid++) {
            MapStart.PlayerKJxzq[pid] = CreateFogModifierRect(MapPlayer.fromIndex(pid).handle, FOG_OF_WAR_VISIBLE, bj_mapInitialPlayableArea, true, false)
            FogModifierStart(MapStart.PlayerKJxzq[pid])
        }
    }
    static Trig_Action_Fun(this: void) {//地图开始
        EnableWorldFogBoundary(false)//禁用边界染色
        SetFloatGameState(GAME_STATE_TIME_OF_DAY, 12)//设置时间=7点
        SetTimeOfDayScale(0)//游戏时间流逝速度
        SetCameraField(CAMERA_FIELD_TARGET_DISTANCE, 3200, 1.0)//提高镜头
        SetCameraField(CAMERA_FIELD_FARZ, 10000.00, 0)// 远景裁剪
        MapStart.PlayerKeJianDu()//地图玩家可见度设置
    }
}

BaseUtil.runLater(0.1, MapStart.Trig_Action_Fun)

