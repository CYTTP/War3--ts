/** @noSelfInFile */
/**
 * 获取玩家选取的单位
*/
declare function GetRealSelectUnit(): unit;
/**
 * UI模型Z轴旋转
*/
declare function FrameSetModelRotateZ(ui: number, jd: number): void;
/**
 * 设置单位名字
*/
declare function SetUnitName(handle: handle, name: string): void;
/**
 * 设置单位模型
*/
declare function SetUnitModel(dw: unit, model: string): void;
/**
 * 设置单位头像模型
*/
declare function SetUnitPortrait(dw: unit, model: string): void;
/**
 * 设置单位称谓
*/
declare function SetUnitProperName(handle: unit, name: string): void;
/**
 * 设置单位移动类型
*/
declare function EXSetUnitMoveType(handle: unit, ydlx: number): void;
/**
 * 获取英雄头像BTN
*/
declare function FrameGetHeroBarButton(id: number): number;
/**
 * 修改 原生按钮图片 button 可以是 技能按钮 物品按钮 英雄按钮 农民按钮 框选按钮 buff按钮
*/
declare function FrameSetOriginButtonTexture(ui: number, txt: string): void;
/**
 * 获取原生BTN图标(异步)
*/
declare function FrameGetOriginButtonTexture(id: number): string;
/**
 *世界坐标转屏幕坐标
*/
declare function world_to_screen(x: number, y: number, gd: number): number;
/**
 *UI隐藏（内置版）
*/
declare function FrameShow(ui: number, bol: boolean): void;
/**
 *修改UI图片（内置版）
*/
declare function FrameSetTexture(ui: number, str: string, pp: number): void;
/**
 *修改Frame宽度（内置版）
*/
declare function FrameSetWidth(ui: number, width: number): void;
/**
 *修改Frame高度（内置版）
*/
declare function FrameSetHeight(ui: number, height: number): void;

// 内置 -- 单位 分类-------------------------------------------
/**
 * 
 */


// 内置 -- 模型 -- 特效 分类-------------------------------------------
/**
 * 
 */

// 内置 -- UI -- 显示 分类-------------------------------------------
/**
 * 显示屏幕中间的FPS文本
 */
// declare function ShowFpsText(show: boolean): void;
/**
 * 异步获取 玩家当前的帧数 玩家比较卡时 帧数较低 可以异步空特效路径 以及 弹道模型 屏蔽特效来提高帧数。
 */
declare function GetFps(): number;


/**
 * 缩放倍数
 */
//  function FrameSetSize takes integer p1, real p2, real p3 returns nothing
//  call GetTriggeringTrigger()
// endfunction  FrameSetModelScale
 declare function FrameSetSize(p1:number,p2:number,p3:number): void;

 declare function FrameSetModelScale(p1:number,p2:number,p3:number,p4:number): void;


//  function FrameSetModelColor takes integer p1, integer p2 returns nothing
//     	call GetTriggeringTrigger()
//     endfunction
 declare function FrameSetModelColor(p1:number,p2:number,): void;