import { Trigger } from "solar/w3ts/handles/trigger";
import CCForceUtil from "./CCForceUtil";


export default class ChangeWeatherOnTimeState {

    static WEATHER_TYPE_NORMAL: number = 0;     //  正常天气
    static WEATHER_TYPE_SNOW: number = 1;       //  冰雪天气
    static WEATHER_TYPE_HAZE: number = 2;      //  雾霾天气
    static WEATHER_TYPE_WIND: number = 3;       //  大风天气
    static WEATHER_TYPE_SUN: number = 4;        //  太阳天气
    static WEATHER_TYPE_RAINSTORM: number = 5;  //  暴雨天气

    //  天气效果类型与天气类型
    static config: {
        [id: string]: number
    } = {
            'SNbs': ChangeWeatherOnTimeState.WEATHER_TYPE_SNOW,
            'FDwh': ChangeWeatherOnTimeState.WEATHER_TYPE_HAZE,
            'WOcw': ChangeWeatherOnTimeState.WEATHER_TYPE_WIND,
            'LRaa': ChangeWeatherOnTimeState.WEATHER_TYPE_SUN,
            'RLhr': ChangeWeatherOnTimeState.WEATHER_TYPE_RAINSTORM, //RAhr
        };

    //  刷新天气的间隔
    static interval: number = 120.0;

    constructor() {

        //  注册计时器事件
        let trigger = new Trigger();
        trigger.registerTimerEvent(ChangeWeatherOnTimeState.interval, true);
        trigger.addAction(this.action);
    }

    action(this: void) {
        let weathertype = GetRandomInt(ChangeWeatherOnTimeState.WEATHER_TYPE_SNOW, ChangeWeatherOnTimeState.WEATHER_TYPE_RAINSTORM);

        ChangeWeatherOnTimeState.updateWeather(weathertype);


    }

    static updateWeather(weathertype: number) {

        //  删除先前的天气效果
        let weathereffect: weathereffect = GetLastCreatedWeatherEffect();
        if (weathereffect) {
            RemoveWeatherEffect(weathereffect);
        }

        //  正常天气没有效果
        if (weathertype == ChangeWeatherOnTimeState.WEATHER_TYPE_NORMAL) return;

        //  获取可玩的地图区域
        let playableMapRect: rect = GetPlayableMapRect();

        //  添加新的天气效果
        for (const id in ChangeWeatherOnTimeState.config) {

            //  新的天气类型
            let type = ChangeWeatherOnTimeState.config[id];
            if (type == weathertype) {
                // weathereffect = AddWeatherEffectSaveLast(playableMapRect, FourCC(id));
                weathereffect = AddWeatherEffect(playableMapRect, id)
                EnableWeatherEffect(weathereffect, true);
                break;
            }
        }

        //  处理天气影响
        ChangeWeatherOnTimeState.handle(weathertype);
    }

    static handle(weathertype: number) {
        switch (weathertype) {
            case ChangeWeatherOnTimeState.WEATHER_TYPE_SNOW:
                CCForceUtil.slowdownAllUnits(0.3, ChangeWeatherOnTimeState.interval);
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '大雪天气:全体所有敌对单位移动速度降低30%');
                break;
            case ChangeWeatherOnTimeState.WEATHER_TYPE_HAZE:
                CCForceUtil.addAttackForAllEnemyUnits(0.15, ChangeWeatherOnTimeState.interval);
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '雾霾天气:全体所有英雄攻击力增加15%');
                break;
            case ChangeWeatherOnTimeState.WEATHER_TYPE_WIND:
                CCForceUtil.damageAllUnits(0.1, 50);
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '大风天气:全体所有英雄10%几率损失50点生命值');
                break;
            case ChangeWeatherOnTimeState.WEATHER_TYPE_SUN:
                CCForceUtil.addLifeRegenForAllHeros(50, ChangeWeatherOnTimeState.interval);
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '阳光天气:全体所有英雄生命恢复+50点');
                break;
            case ChangeWeatherOnTimeState.WEATHER_TYPE_RAINSTORM:
                CCForceUtil.attackMissForAllUnits(0.05, ChangeWeatherOnTimeState.interval);
                DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '暴雨天气:全体所有英雄攻击有5%几率丢失');
                break;
        }
    }
}