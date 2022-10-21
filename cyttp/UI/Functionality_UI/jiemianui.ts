export default class jiemianui {
    constructor() {

        //移动农民头像
        DzFrameSetPoint(FrameGetUnitButton(), 6, DzGetGameUI(), 4, -0.395, 0.23)
        //小地图
        // DzFrameHideInterface()
        // 修改黑边
        // DzFrameEditBlackBorders(0.018, 0.129)
        // 小地图
        // DzSetWar3MapMap('war3mapMap.blp')
        let min_map = DzFrameGetMinimap()
        DzFrameClearAllPoints(min_map)
        // //                      0.1125
        DzFrameSetPoint(min_map, 6, DzGetGameUI(), 6, 0.009, 0.007)
        DzFrameSetSize(min_map, 0.107, 0.107)

        // // 小地图按钮 
        // DzFrameClearAllPoints(DzFrameGetMinimapButton(0))
        // DzFrameSetSize(DzFrameGetMinimapButton(0), 0.01, 0.01)
        DzFrameSetPoint(DzFrameGetMinimapButton(0), 0, DzGetGameUI(), 0, 0, 0)
        // DzFrameShow(DzFrameGetMinimapButton(0), false)

        // DzFrameClearAllPoints(DzFrameGetMinimapButton(1))
        DzFrameSetPoint(DzFrameGetMinimapButton(1), 0, DzGetGameUI(), 0, 0, 0)
        // // DzFrameShow(DzFrameGetMinimapButton(1), false)

        // DzFrameClearAllPoints(DzFrameGetMinimapButton(2))
        // DzFrameSetSize(DzFrameGetMinimapButton(2), 0.022, 0.022)
        DzFrameSetPoint(DzFrameGetMinimapButton(2), 0, DzGetGameUI(), 0, 0, 0)
        // // DzFrameShow(DzFrameGetMinimapButton(2), false)

        // DzFrameClearAllPoints(DzFrameGetMinimapButton(3))
        // DzFrameSetSize(DzFrameGetMinimapButton(3), 0.02, 0.02)
        DzFrameSetPoint(DzFrameGetMinimapButton(3), 0, DzGetGameUI(), 0, 0, 0)
        // // DzFrameShow(DzFrameGetMinimapButton(3), false)

        // DzFrameClearAllPoints(DzFrameGetMinimapButton(4))
        DzFrameSetPoint(DzFrameGetMinimapButton(4), 0, DzGetGameUI(), 0, 0, 0)
        // // DzFrameShow(DzFrameGetMinimapButton(4),false)
        // 

    }
}