import { Easing, Tween } from "solar/tween"

export default class AnimationUtil {


    /**
 * 动画效果
 * @param frame 
 * @param timer 
 * @param toX 
 * @param toY 
 */
    static telekineticMovement(frame: number, timer: number, oX: number, oY: number, toX: number, toY: number) {
        const tween = new Tween({ x: oX, y: oY, a: 150 })
            .to({ x: toX, y: toY, a: 255 }, timer)
            .easing(Easing.Quadratic.InOut)
            .onUpdate((temp) => {
                DzFrameSetAlpha(frame, temp.a)
                DzFrameSetPoint(frame, FRAMEPOINT_CENTER, DzGetGameUI(), FRAMEPOINT_BOTTOMLEFT, temp.x, temp.y)
            })
        tween.start()
    }

    static instantReturn(frame: number, timer: number, oX: number, oY: number, toX: number, toY: number) {
        const tween = new Tween({ x: oX, y: oY, a: 255 })
            .to({ x: toX, y: toY, a: 150 }, timer)
            .easing(Easing.Quadratic.InOut)
            .onUpdate((temp) => {
                DzFrameSetAlpha(frame, temp.a)
                DzFrameSetPoint(frame, FRAMEPOINT_CENTER, DzGetGameUI(), FRAMEPOINT_BOTTOMLEFT, temp.x, temp.y)
            })
        tween.start()
    }
}