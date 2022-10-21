import { Trigger } from "solar/w3ts/handles/trigger";
import { Unit } from "solar/w3ts/handles/unit";

export default class InRectEffect {
    //增加的速度
    static newSpeed = 200
    static effString = 'sem_te_xiao_1_5.mdx'
    static rectarr: rect[] = [gg_rct_jiasu_1, gg_rct_jiasu_2, gg_rct_jiasu_3, gg_rct_jiasu_4]

    constructor() {
        //单位进入区域  **
        let tri1 = new Trigger()
        let rectRegion1: region = CreateRegion()
        for (let i = 0; i < 4; i++) {
            RegionAddRect(rectRegion1, InRectEffect.rectarr[i])
        }
        tri1.registerEnterRegion(rectRegion1, null)
        tri1.addAction(this.action)

        //单位离开区域** 
        let tri2 = new Trigger()
        let rectRegion2: region = CreateRegion()
        for (let i = 0; i < 4; i++) {
            RegionAddRect(rectRegion2, InRectEffect.rectarr[i])
        }
        tri2.registerLeaveRegion(rectRegion2, null)
        tri2.addAction(this.action1)
    }
    action(this: void) {
        let u = GetTriggerUnit()
        for (let i = 0; i < 4; i++) {
            if (GetOwningPlayer(u) == Player(5 + i)) {
                //   DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '进来');
                let effect = AddSpecialEffectTarget(InRectEffect.effString, u, 'origin')
                EXSetEffectSize(effect, 2)
                Unit.fromHandle(u).solarData.TX = effect
                Unit.fromHandle(u).solarData.当前速度 = GetUnitMoveSpeed(u)
                SetUnitMoveSpeed(u, Unit.fromHandle(u).solarData.当前速度 + InRectEffect.newSpeed)
            }
        }

    }
    action1(this: void) {
        let u = GetTriggerUnit()
        for (let i = 0; i < 4; i++) {
            if (GetOwningPlayer(u) == Player(5 + i)) {
                Unit.fromHandle(u).solarData.当前速度 = GetUnitMoveSpeed(u)
                SetUnitMoveSpeed(u, Unit.fromHandle(u).solarData.当前速度 - InRectEffect.newSpeed)
                DestroyEffect(Unit.fromHandle(u).solarData.TX)
            }
        }
    }
}