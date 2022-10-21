import DataBase from "solar/common/DataBase";
import SelectUtil from "solar/util/SelectUtil";
import { Trigger } from "solar/w3ts/handles/trigger";

/**
 * 发布命令
 */
export default class OrderUnitMove2NextRectOnEnterRectState {
    //order = "move" attack
    static config: { [rectValName: string]: { nextRectValName: string, order: string } } = {}

    constructor() {
        this.init();
        //按时去发布移动命令 以使被中断命令的单位（如被眩晕） 继续执行需要执行的移动命令
        let trigger = new Trigger()
        trigger.registerTimerEvent(1, true)
        trigger.addAction(() => {
            SelectUtil.forAllEnemyUnits(unit => {
                let solarData = DataBase.getUnitSolarData(unit);
                let nextX = solarData.OrderUnitMove2NextRectOnEnterRectState_nextX;
                if (nextX) {
                    IssuePointOrder(unit, solarData.OrderUnitMove2NextRectOnEnterRectState_order, nextX,
                        solarData.OrderUnitMove2NextRectOnEnterRectState_nextY);
                }
            })
        })
    }


    init() {
        for (let rectValName in OrderUnitMove2NextRectOnEnterRectState.config) {
            let data = OrderUnitMove2NextRectOnEnterRectState.config[rectValName];
            let trigger = new Trigger()
            let rectRegion: region = CreateRegion()
            RegionAddRect(rectRegion, (_G as any)[rectValName])
            trigger.registerEnterRegion(rectRegion, null);
            trigger.addAction(() => {
                let unit = GetTriggerUnit();
                //是玩家1的敌人
                if (IsUnitEnemy(unit, Player(0))) {
                    let rectHandle = (_G as any)[data.nextRectValName]
                    let nextX = GetRectCenterX(rectHandle)
                    let nextY = GetRectCenterY(rectHandle)
                    IssuePointOrder(unit, data.order, nextX, nextY);
                    let solarData = DataBase.getUnitSolarData(unit);
                    solarData.OrderUnitMove2NextRectOnEnterRectState_nextX = nextX;
                    solarData.OrderUnitMove2NextRectOnEnterRectState_nextY = nextY;
                    solarData.OrderUnitMove2NextRectOnEnterRectState_order = data.order;
                    // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '' + rectValName);
                }
            })
        }
    }
}
