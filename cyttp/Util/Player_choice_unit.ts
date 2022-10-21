// 移动镜头 -- 选择单位     player_choice_unit
export default function player_choice_unit(unit: unit, player: player, x: number, y: number) {
    // 平移镜头
    if (GetLocalPlayer() == player) {
        PanCameraToTimed(x, y, 0)
        // 玩家 -- 选择单位
        ClearSelection()
        SelectUnit(unit, true)
    }
}