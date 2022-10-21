
import BaseUtil from "solar/util/BaseUtil"
import UnitUtil from "./UnitUtil"



/**
 * 数值上的工具  NumerivalUtil
 * 可直接调用
 */
export default class NumerivalUtil {
    /**
     * 两坐标间角度
     */
    static GetLocAngle(x: number, y: number, xto: number, yto: number,): number {//两坐标间角度
        let dx = 0
        let dy = 0
        let fx = 0
        //方向和距离
        dx = xto - x
        dy = yto - y
        fx = bj_RADTODEG * Atan2(dy, dx)
        return fx
    }
    /**
     * 两坐标间距离
     */
    static GetLocDistance(x: number, y: number, xto: number, yto: number,): number {
        let dx = 0
        let dy = 0
        let dis = 0
        //方向和距离
        dx = xto - x
        dy = yto - y
        dis = SquareRoot(dx * dx + dy * dy)
        return dis
    }
    /**
     * 两单位间距离
     */
    static DistanceBetweenUnits(a: unit, b: unit): number {
        return SquareRoot((GetUnitX(a) - GetUnitX(b)) * (GetUnitX(a) - GetUnitX(b)) + (GetUnitY(a) - GetUnitY(b)) * (GetUnitY(a) - GetUnitY(b)))
    }
    /**
     * 是否是在线用户玩家
     */
    static IsOnlineUser(pid: number): boolean {
        return GetPlayerController(Player(pid)) == MAP_CONTROL_USER && GetPlayerSlotState(Player(pid)) == PLAYER_SLOT_STATE_PLAYING
    }
    /**
     * 获得在线玩家人数   默认四个玩家
     */
    static GetOnLineUserCount(): number {
        let sum = 0
        for (let i = 0; i < 4; i++) {
            if (NumerivalUtil.IsOnlineUser(i) == true) {
                sum++
            }
        }
        return sum
    }
    /**
     * 传送单位至坐标   
     */
    static ChuanSongToXY(dw: unit, x: number, y: number, jtgs: boolean, effect: string) {
        let mpl = GetOwningPlayer(dw)
        SetUnitPosition(dw, x, y)//移动单位
        IssueImmediateOrder(dw, 'stop')//停止命令
        SelectUnitForPlayerSingle(dw, mpl)
        if (jtgs == true) {
            PanCameraToTimedForPlayer(mpl, x, y, 0)//移动镜头
        }
        if (effect != "" && effect != null) {
            BaseUtil.runLater(0.05, () => {//创建特效
                DestroyEffect(AddSpecialEffect(effect, x, y))
            });
        }
    }
    /**
     * 传送单位至区域
     */
    static ChuanSongToRect(dw: unit, qy: rect) {
        let x = GetRectCenterX(qy)
        let y = GetRectCenterY(qy)
        NumerivalUtil.ChuanSongToXY(dw, x, y, true, null)
    }

    /**
     * 新建区域
     */
    static NewRect(x: number, y: number, width: number, height: number): rect {
        return Rect(x - width * 0.5, y - height * 0.5, x + width * 0.5, y + height * 0.5)
    }
    /**
     * 截取number数，小数点后num位数
     */
    static toFixed(num: number, hws: number): number {
        let fhs: number = 0
        let txt = "" + num
        let int: number = 0
        while (true) {
            let jqtx: string = SubString(txt, int, int + 1)
            if (jqtx == ".") {
                fhs = Number(SubString(txt, int + 1, int + 1 + hws))
                break;
            }
            int++
        }
        return fhs
    }
    /**
    * 生成数值后缀称号（万，亿）
    */
    static RefUI_HMotxt(num: number): string {
        let JSsz: string = "" + num
        let txt1: number = Math.floor(num)//转换实数为整数
        let txt2: number = 0
        let zfc: string = ""
        if (txt1 >= 10000 * 10000) {
            txt1 = txt1 / (10000 * 10000)
            if (txt1 >= 10000) {
                txt2 = txt1 / 10000
                zfc = NumerivalUtil.toFixed(txt2, 4) + "亿"
            } else {
                zfc = Math.floor(txt1) + "亿" + NumerivalUtil.toFixed(txt1, 4) + "万"
            }
        }
        if (txt1 >= 10000) {
            txt1 = txt1 / 10000
            zfc = Math.floor(txt1) + "万" + zfc
        }
        if (zfc == "") { zfc = "" + Math.floor(Number(JSsz)) }
        return zfc
    }

    /**
        * 单位跳跃
        * @param unit 
        * @param start_x 
        * @param start_y 
        * @param end_x 
        * @param end_y 
        * @param rate 移动的速率
        * @param effect_str 特效路径
        */
    static Unit_Jump_Formula(unit: unit, start_x: number, start_y: number, end_x: number, end_y: number, rate: number, effect_str: string) {
        // 单位本来的基础高度
        let base_height = GetUnitFlyHeight(unit)
        // 让单位可以飞行
        UnitUtil.UnitFlyEnable(unit)
        handle_ref(unit)
        //暂停单位
        PauseUnit(unit, true)
        //单位无敌
        SetUnitInvulnerable(unit, true)
        // 创建尾翼特效
        let tx = AddSpecialEffectTarget(effect_str, unit, "chest")
        //角度
        let jd = NumerivalUtil.GetLocAngle(start_x, start_y, end_x, end_y)
        // 设置面向角度
        SetUnitFacing(unit, jd)
        //距离
        let dis = NumerivalUtil.GetLocDistance(start_x, start_y, end_x, end_y)
        // 高度 
        let height: number = dis / 3;
        // 全程跳跃的总次数
        let all_count = R2I(dis / rate)
        //跳跃位移
        BaseUtil.onTimer(0.03, (count) => {
            let x = GetUnitX(unit) + rate * CosBJ(jd)
            let y = GetUnitY(unit) + rate * SinBJ(jd)
            //已走过的距离
            let surplus_dis = NumerivalUtil.GetLocDistance(start_x, start_y, x, y)
            // sin函数
            // let new_height: number  = GetUnitFlyHeight(unit) * (1 - rate / surplus_dis)
            let new_height: number = SinBJ((surplus_dis / dis) * 180) * height
            // 设置高度
            SetUnitFlyHeight(unit, new_height, 0)
            SetUnitX(unit, x,)
            SetUnitY(unit, y,)
            if (count >= all_count) {
                // 恢复最初的高度
                SetUnitFlyHeight(unit, base_height, 0)
                //删除特效
                DestroyEffect(tx)
                //暂停单位
                PauseUnit(unit, false)
                //单位无敌
                SetUnitInvulnerable(unit, false)
                return false

            }
            return true
        });
    }

    /***  冲锋-功能模板 * 注意：想使用默认值,就填 - undefined    【特效冲锋】
    **  u = 释法单位 -
    **  n =  目标单位  -
    **  damage = 伤害值 - 默认100伤害
    **  range = 伤害的范围，-默认200
    **  model = 冲锋特效模型  - 默认 黑暗之箭
    **  unit_scale = 冲锋模型的大小，-默认3
    **  total_length = 冲锋的总长   - 默认1000
    **  step_length = 冲锋每次的长度    - 默认30步长
    **  timer= 冲锋的间隔，-默认0.03
    **  unit_scale = 冲锋模型的大小，-默认1
    **  damage_type = 伤害类型，-默认魔法伤害'Abilities\\Spells\\Other\\BlackArrow\\BlackArrowMissile.mdl'
    ***/
    static HoepAbility_ChargeTemplate(u: unit, x: number, y: number, damage: number = 100, range: number = 200,
        effect: string = 'Abilities\\Spells\\Other\\BlackArrow\\BlackArrowMissile.mdl', eff_scale: number = 3,
        total_length: number = 1000, step_length: number = 30, timer: number = 0.03, damage_type: damagetype = DAMAGE_TYPE_MAGIC) {
        // 冲锋
        let g: group = CreateGroup()
        let g1: group = CreateGroup()
        let x1: number = GetUnitX(u)
        let y1: number = GetUnitY(u)
        let jd: number = 57.29582 * Atan2(y - y1, x - x1)
        let mj = AddSpecialEffect(effect, x1, y1)
        EXSetEffectSize(mj, eff_scale)
        EXEffectMatRotateZ(mj, jd)
        // 设置高度
        EXSetEffectZ(mj, 400)
        let cosx: number = step_length * Cos(jd * 0.01745)
        let siny: number = step_length * Sin(jd * 0.01745)
        let count = math.floor(total_length / step_length)
        let ii = 0
        BaseUtil.runLater(timer, () => {
            ii++
            x1 = x1 + cosx
            y1 = y1 + siny
            // if (RectContainsCoords(bj_mapInitialPlayableArea, x1, y1)) {
            // EXEffectMatReset(mj)
            EXSetEffectXY(mj, x1, y1)
            // } else {
            //     ii = count
            // }
            GroupEnumUnitsInRange(g, x1, y1, range, null)
            BaseUtil.SForGroup(g, xdw => {
                if (IsUnitEnemy(xdw, GetOwningPlayer(u)) == true && GetUnitState(xdw, UNIT_STATE_LIFE) >= 0 && IsUnitInGroup(xdw, g1) == false) {
                    GroupAddUnit(g1, xdw)
                    UnitDamageTarget(u, xdw, damage, false, false, null, damage_type, null)
                }
            })
            if (ii >= count) {
                DestroyGroup(g)
                DestroyGroup(g1)
                DestroyEffect(mj)

            }
        }, count)
    }



    /**
     * 根据元素查找元素的索引
     * @param a 数组
     * @param x 某个元素
     * @returns 索引数组
     */
    static getSpecialIndexArr(a: (number | string)[], x: (number | string)): number[] {
        let results = [],
            len = a.length,
            pos = 0;
        while (pos < len) {
            pos = a.indexOf(x, pos);
            //未找到就退出循环
            if (pos === -1) {
                break;
            }
            //找到就存索引
            results.push(pos);
            //并从下个位置开始找
            pos += 1;
        }
        return results
    }


    /**
     * 
     * @param arr 数组
     * @param val 要删除的元素
     * 返回新数组
     */
    static removeByValue(arr: (number | string)[], val: (number | string)) {
        for (let i = 0; i < arr.length; i++) {
            //获取数组中相同的key
            if (arr[i] == val) {
                arr.splice(i, 1)
                break;
            }
        }
        return arr
    }
    /**
     * 去除两个数组的重复元素
     * @param temp 添加到的新数组
     * @param arr 数组1
     * @param arr1  数组2
     * @returns 
     */
    static arr2Remove(arr: (number | string)[], arr1: (number | string)[]): (number | string)[] {
        let temp = [];
        arr1.forEach(res => {
            let index = arr.indexOf(res);
            if (index == -1) {
                temp.push(res);
            }
        })
        return temp
    }

    static getNum(arr: any[]): number {
        for (let j = 0; j < arr.length; j++) {
            let num = arr.indexOf(arr[j])
            return num
        }
    }


    static getRandomArrayElements(arr: any[], count: number) {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
        }
        return shuffled.slice(min)
    }



}
