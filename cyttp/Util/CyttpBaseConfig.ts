import BaseUtil from "solar/util/BaseUtil";


//通用技能函数
export default class CyttpBaseConfig {

    /*** 矩形区域类型技能   
    ** u1 = 触发单位
    ** u2 = 对其释放技能的单位 
    ** length = 长度
    ** width = 宽度
    ** type = 1 为单位面向角度选取  2为自由角度选取
    ** hurt = 伤害
    ** effect = 特效
    ** timerOut = 特效延迟删除
    */
    static Rectangle(u1?: unit, u2?: unit, length?: number, width?: number, type?: number, hurt?: number, effect?: string, timeOut?: number) {
        let x = GetUnitX(u1)
        let y = GetUnitY(u1)
        let p1 = GetUnitLoc(u2);
        let x0 = GetUnitX(u2)
        let y0 = GetUnitY(u2)
        let r = SquareRoot((Pow((length / 2.00), 2.00) + Pow((width / 2.00), 2.00)));
        let g = GetUnitsInRangeOfLocAll(r, p1);
        if (type == 1) {
            let an = Atan2(y0 - y, x0 - x);
            let xt = ((x0 * CosBJ(an)) + (y0 * SinBJ(an)));
            let yt = ((y0 * CosBJ(an)) - (x0 * SinBJ(an)));
            ForGroup(g, () => {
                let x1 = GetUnitX(GetEnumUnit());
                let y1 = GetUnitY(GetEnumUnit());
                let x2 = ((x1 * CosBJ(an)) + (y1 * SinBJ(an)));
                let y2 = ((y1 * CosBJ(an)) - (x1 * SinBJ(an)));
                //选取矩形
                if ((RAbsBJ((xt - x2)) <= (length / 2.00)) && (RAbsBJ((yt - y2)) <= (width / 2.00))) {
                    if ((IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(u1)) == true) && (IsUnitAliveBJ(GetEnumUnit()) == true) && (IsUnitType(GetEnumUnit(), UNIT_TYPE_STRUCTURE) == false)) {
                        UnitDamageTarget(u1, GetEnumUnit(), hurt, false, false, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
                    }
                    // let effect = AddSpecialEffectTarget("Abilities\\Spells\\Other\\TalkToMe\\TalkToMe.mdl", GetEnumUnit(), "overhead")
                    let Effect = AddSpecialEffect(effect, GetUnitX(GetEnumUnit()), GetUnitY(GetEnumUnit()))
                    BaseUtil.runLater(timeOut, () => {
                        DestroyEffect(Effect)
                    })
                }
            });
        } else if (type == 2) {
            ForGroup(g, () => {
                let x = GetUnitX(GetEnumUnit());
                let y = GetUnitY(GetEnumUnit());
                if ((RAbsBJ((x0 - x)) <= (length / 2.00)) && (RAbsBJ((y0 - y)) <= (width / 2.00))) {
                    if ((IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(u1)) == true) && (IsUnitAliveBJ(GetEnumUnit()) == true) && (IsUnitType(u2, UNIT_TYPE_STRUCTURE) == false)) {
                        UnitDamageTarget(u1, GetEnumUnit(), hurt, false, false, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
                    }
                    let Effect = AddSpecialEffectTarget(effect, GetEnumUnit(), "overhead")
                    BaseUtil.runLater(timeOut, () => {
                        DestroyEffect(Effect)
                    })
                }
            });
        }
        RemoveLocation(p1);
        DestroyGroup(g);
    }

    /*** 抛物线类型技能   使用注意：马甲移动类型设置飞行
      ** u1 = 触发单位
      ** u2 = 对其释放技能的单位
      ** num = 数量（1-20）
      ** angle = 为最左和最右弹道的夹角（0-180）
      ** height = 最大高度和两单位距离的比值（0-1）
      ** speed = 弹道速度  eg：500
      ** hurt = 伤害
      ** vestId = 马甲id
      ** vestModel = 马甲模型
      */
    static Parabola(u1?: unit, u2?: unit, num?: number, angle?: number, height?: number, speed?: number, hurt?: number, vestId?: string, vestModel?: string): void {

        let u: unit[] = [] //马甲单位数组
        let t: timer = CreateTimer()
        let x1 = GetUnitX(u1);
        let y1 = GetUnitY(u1);
        let x2 = GetUnitX(u2); //目标单位坐标
        let y2 = GetUnitY(u2);
        u[0] = u2;
        let dist_ex = 0;
        let dist_s = speed * 0.01;
        let ang2 = Atan2(y2 - y1, x2 - x1);
        for (let i = 1; i <= num; i++) {
            u[i] = CreateUnit(GetTriggerPlayer(), FourCC(vestId), x1, y1, Rad2Deg(ang2));
            DzSetUnitModel(u[i], vestModel)
            // DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, GetUnitName(u[0]));
        }
        BaseUtil.onTimer(0.03, () => {
            x2 = GetUnitX(u[0]);
            y2 = GetUnitY(u[0]);
            let dist = SquareRoot(Pow(x1 - x2, 2.0) + Pow(y1 - y2, 2.0));
            if (dist < dist_s) {
                if ((IsUnitEnemy(u2, GetOwningPlayer(u1)) == true) && (IsUnitAliveBJ(u2) == true) && (IsUnitType(u2, UNIT_TYPE_STRUCTURE) == false)) {
                    UnitDamageTarget(u1, u2, hurt, false, false, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
                }
                //  BJDebugMsg("test");
                DestroyTimer(t);
                for (let i = 1; i <= num; i++) {
                    KillUnit(u[i]);
                }
                return;
            }
            dist_ex = dist_ex + dist_s;
            ang2 = Atan2(y2 - y1, x2 - x1);
            x1 = x1 + dist_s * Cos(ang2);
            y1 = y1 + dist_s * Sin(ang2);
            //单位之间的距离
            dist = SquareRoot(Pow(x1 - x2, 2.0) + Pow(y1 - y2, 2.0));
            //高度
            let h = (- height * 4.0) / (dist_ex + dist) * dist_ex * dist_ex + height * 4.0 * dist_ex
            if (num == 1) {
                //当马甲数量唯一  设置单位的坐标
                SetUnitX(u[1], x1);
                SetUnitY(u[1], y1);
                SetUnitFlyHeight(u[1], h, 0);
                SetUnitFacing(u[1], ang2 * bj_RADTODEG);
            } else {
                for (let i = 1; i <= num; i++) {
                    let ang3 = angle * ((I2R(i) - 1) / (I2R(num) - 1) - 0.5)
                    let x3 = x1 + h * Sin(ang3) * Sin(ang2);
                    let y3 = y1 - h * Sin(ang3) * Cos(ang2);
                    SetUnitX(u[i], x3);
                    SetUnitY(u[i], y3);
                    SetUnitFlyHeight(u[i], h * Cos(ang3), 0);
                    SetUnitFacing(u[i], Atan2(y2 - y3, x2 - x3) * bj_RADTODEG);
                }
            }
            return true
        });
    }
    /*** 正弦曲线类型技能   
    ** u1 = 触发单位
    ** u2 = 对其释放技能的单位
    ** hurt = 伤害
    ** range = 范围，一般在100-300之间
    ** effect = 特效
    */
    static SineCurve(u1?: unit, u2?: unit, hurt?: number, range?: number, effect?: string) {
        let t: timer = CreateTimer();
        let X = GetUnitX(u1);
        let Y = GetUnitY(u1);
        let MX = GetUnitX(u2);
        let MY = GetUnitY(u2);
        let g: group = CreateGroup()
        let Ang = Atan2BJ((MY - Y), (MX - X));
        let L = SquareRoot((Pow((X - MX), 2.00) + Pow((Y - MY), 2.00)));
        let ang1 = 0
        let Ang0 = 0
        // let mj = CreateUnit(GetOwningPlayer(s), FourCC('h002'), X, Y, GetUnitFacing(s))
        // DzSetUnitModel(mj, dataConfig.effectPath1)
        // let MJX = GetUnitX(mj);
        // let MJY = GetUnitY(mj);
        TimerStart(t, 0.03, true, () => {
            Ang0 = Ang0 + 20.00
            // 先计算中轴线
            X = X + (50.00 * CosBJ(Ang))
            Y = Y + (50.00 * SinBJ(Ang))
            // 再围绕中轴线画弧线  100控制S顶点到中轴线距离
            let X1 = (X + (300.00 * SinBJ(Ang0)) * CosBJ((Ang + 90.00)));
            let Y1 = (Y + (300.00 * SinBJ(Ang0)) * SinBJ((Ang + 90.00)));
            GroupEnumUnitsInRange(g, X1, Y1, range, null)
            DestroyEffect(AddSpecialEffect(effect, X1, Y1));
            BaseUtil.SForGroup(g, xdw => {
                if (IsUnitEnemy(xdw, GetOwningPlayer(u1)) == true && IsUnitAliveBJ(xdw) == true) {
                    UnitDamageTarget(u1, xdw, hurt, true, false, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_MAGIC, WEAPON_TYPE_WHOKNOWS);
                }
            })
            if ((SquareRoot((Pow((X - MX), 2.00) + Pow((Y - MY), 2.00))) <= 50.00)) {
                DestroyTimer(t);
            }
        });
    }
    /*** 直线类型技能   
    ** u1 = 触发单位
    ** length = 最小为10
    ** effect = 特效
    */
    static StraightLine(u1?: unit, length?: number, effect?: string) {
        let x = GetUnitX(u1);
        let y = GetUnitY(u1);
        let x2 = GetSpellTargetX();
        let y2 = GetSpellTargetY();
        let jd = Atan2BJ((y2 - y), (x2 - x));
        let jd1 = jd - 90.00
        x = x2 + 550.00 * CosBJ(jd1)
        y = y2 + 550.00 * SinBJ(jd1)
        let jd2 = jd1 + 180.00
        let t: timer = CreateTimer();
        let cs = 0
        TimerStart(t, 0.05, true, () => {
            cs = cs + 1
            if (cs <= length) {
                x = x + 100.00 * CosBJ(jd2)
                y = y + 100.00 * SinBJ(jd2)
                AddSpecialEffect(effect, x, y)
            } else {
                DestroyTimer(t);
            }
        });
    }
    /*** 椭圆冲锋类型技能   注意技能模板：无目标
       ** u = 触发单位
       ** l = 椭圆长轴
       ** w = 椭圆短轴
       ** speed = 循环最大数，一次环绕的动作最大次数，根据马甲大小和范围大小调整
       ** angle = 角度
       ** type =  1为椭圆环 2为椭圆冲锋
       ** vestId = 马甲id
       ** vestModel = 马甲模型
       */
    static Ellipse(u?: unit, l?: number, w?: number, speed?: number, angle?: number, type?: number, vestId?: string, vestModel?: string) {
        let x = GetUnitX(u);
        let y = GetUnitY(u);
        let t = 1;
        let timer: timer = CreateTimer()
        if (type == 1) {
            for (let t = 1; t <= speed; t++) {
                let theta = I2R(t) * (360.00 / I2R(speed))
                // theta再进一步除以二则画一半，除以多少则画几分之一
                theta = (theta - (180.00));
                // theta改成负的从单位左手边开始冲锋，反之右手
                let U = l + l * CosBJ((theta))
                let V = w * SinBJ((theta))
                let x0 = x + U * CosBJ(angle) - V * SinBJ(angle)
                let y0 = y + U * SinBJ(angle) + V * CosBJ(angle)
                let majia = CreateUnit(GetOwningPlayer(u), FourCC(vestId), x0, y0, 0);
                DzSetUnitModel(majia, vestModel)
                UnitApplyTimedLifeBJ(2.00, FourCC('BTLF'), majia);
            }
        } else if (type == 2) {
            let majia = CreateUnit(GetOwningPlayer(u), FourCC(vestId), x, y, angle);
            DzSetUnitModel(majia, vestModel)
            TimerStart(timer, 0.04, true, () => {
                if (t <= speed) {
                    x = GetUnitX(u);
                    y = GetUnitY(u);
                    // 取消上面动作则以单位施法施时的坐标固定范围冲锋
                    // theta再进一步除以二则冲锋一半，画鸡蛋同理。除以多少则冲几分之一
                    let theta = (I2R(t) * (360.00 / I2R(speed)));
                    // 减180度从单位身边开始冲锋，否则以面向角度的长轴距离往回冲
                    theta = theta - 180.00
                    //theta = theta * -1
                    // theta改成负的从单位左手边开始冲锋，反之右手
                    let U = l + l * CosBJ((theta))
                    let V = w * SinBJ((theta))
                    let x0 = x + U * CosBJ(angle) - V * SinBJ(angle)
                    let y0 = y + U * SinBJ(angle) + V * CosBJ(angle)
                    t += 1
                    SetUnitX(majia, x0);
                    SetUnitY(majia, y0);
                }
                else {
                    RemoveUnit(majia);
                    DestroyTimer(timer);
                }
            });
        }
    }
    /*** 钩子类型技能   
         ** u = 触发单位
         ** u1 = 对其施放技能单位
         ** vestId = 马甲id
         ** vestModel = 马甲模型
         */
    static Hook(u?: unit, u1?: unit, vestId?: string, vestModel?: string) {
        // let u = GetTriggerUnit();
        let p = GetUnitLoc(u);
        // let p1 = GetSpellTargetLoc();
        let p1 = Location(GetUnitX(u1), GetUnitY(u1))
        let a = AngleBetweenPoints(p, p1);
        let x = GetLocationX(p);
        let y = GetLocationY(p);
        let gt = CreateUnit(GetOwningPlayer(u), FourCC(vestId), x, y, a);
        DzSetUnitModel(gt, vestModel)
        RemoveLocation(p);
        let g = CreateGroup();
        GroupAddUnit(g, gt);
        let gu = null;
        let t: timer = CreateTimer();
        let d = 0.00;
        let n = 1;
        TimerStart(t, 0.03, true, () => {
            d = d + 50.00
            let n1 = 0;
            if (d <= 1000.00) {
                x = x + 50.00 * CosBJ(a)
                y = y + 50.00 * SinBJ(a)
                if ((IsTerrainPathable(x, y, PATHING_TYPE_FLYABILITY) == true)) {
                    d = 1314.00;
                } else {
                    SetUnitX(gt, x);
                    SetUnitY(gt, y);
                    p = Location(x, y);
                    let gx = GetUnitsInRangeOfLocMatching(80.00, p, Condition(() => {
                        return (IsUnitType(GetFilterUnit(), UNIT_TYPE_STRUCTURE) == false) &&
                            (IsUnitAliveBJ(GetFilterUnit()) == true) &&
                            (IsUnitEnemy(GetFilterUnit(), GetOwningPlayer(u)) == true);
                    }));
                    RemoveLocation(p);
                    if ((CountUnitsInGroup(gx) > 0)) {
                        gu = FirstOfGroup(gx);
                        d = 1314.00;
                    }
                    DestroyGroup(gx);
                }
                let ux = gt;
                ForGroup(g, () => {
                    n1 = n1 + 1
                    if (n1 == 1) {
                        DoNothing()
                    } else {
                        p = GetUnitLoc(GetEnumUnit());
                        let p2 = GetUnitLoc(ux);
                        let a1 = AngleBetweenPoints(p2, p);
                        RemoveLocation(p);
                        p = PolarProjectionBJ(p2, 50.00, a1);
                        RemoveLocation(p2);
                        SetUnitX(GetEnumUnit(), GetLocationX(p));
                        SetUnitY(GetEnumUnit(), GetLocationY(p));
                        RemoveLocation(p);
                        SetUnitFacing(GetEnumUnit(), (a1 + 180.00));
                    }
                    if (n1 == n) {
                        if ((DistanceBetweenPoints(GetUnitLoc(u), GetUnitLoc(GetEnumUnit())) >= 50.00)) {
                            p = GetUnitLoc(u);
                            let p2 = GetUnitLoc(GetEnumUnit());
                            let a1 = AngleBetweenPoints(p2, p);
                            RemoveLocation(p);
                            p = PolarProjectionBJ(p2, 50.00, a1);
                            RemoveLocation(p2);
                            let gl = CreateUnitAtLoc(GetOwningPlayer(u), FourCC(vestId), p, (a1 + 180.00));
                            DzSetUnitModel(gl, vestModel)
                            RemoveLocation(p);
                            GroupAddUnit(g, gl);
                            n = n + 1
                        }
                    }
                    // ux = GetEnumUnit();
                })
            } else {
                ForGroup(g, () => {
                    n1 = n1 + 1
                    p = GetUnitLoc(u);
                    let p2 = GetUnitLoc(GetEnumUnit());
                    let a1 = AngleBetweenPoints(p2, p);
                    RemoveLocation(p);
                    p = PolarProjectionBJ(p2, 50.00, a1);
                    RemoveLocation(p2);
                    SetUnitX(GetEnumUnit(), GetLocationX(p));
                    SetUnitY(GetEnumUnit(), GetLocationY(p));
                    if (n1 == 1) {
                        if (gu == null) {
                            let gx = GetUnitsInRangeOfLocMatching(80.00, p, Condition(() => {
                                return (IsUnitType(GetFilterUnit(), UNIT_TYPE_STRUCTURE) == false) &&
                                    (IsUnitAliveBJ(GetFilterUnit()) == true) &&
                                    (IsUnitEnemy(GetFilterUnit(), GetOwningPlayer(u)) == true);
                            }));
                            if ((CountUnitsInGroup(gx) > 0)) {
                                gu = FirstOfGroup(gx);
                            }
                            DestroyGroup(gx);
                        }
                        SetUnitX(gu, GetLocationX(p));
                        SetUnitY(gu, GetLocationY(p));
                    }
                    RemoveLocation(p);
                    SetUnitFacing(GetEnumUnit(), (a1 + 180.00));
                    if (DistanceBetweenPoints(GetUnitLoc(u), GetUnitLoc(GetEnumUnit())) <= 50.00) {
                        GroupRemoveUnit(g, GetEnumUnit());
                        RemoveUnit(GetEnumUnit());
                        if ((CountUnitsInGroup(g) == 0)) {
                            RemoveLocation(p1);
                            DestroyGroup(g);
                            DestroyTimer(t);
                        }
                    }
                })
            }
        });
    }
    /*** 弹射  
      ** u1 = 触发单位
      ** u2 = 对其施放技能单位
      ** damge = 伤害
      ** vestId = 马甲id
      ** vestModel = 马甲模型
      */

    static Ejection(u1?: unit, u2?: unit, damge?: number, vestId?: string, effect?: string, BodyP?: string) {
        let p1: location = GetUnitLoc(u1);
        let p2: location = GetUnitLoc(u2);
        let an: number = AngleBetweenPoints(p1, p2);
        let mj = CreateUnitAtLocSaveLast(GetOwningPlayer(u1), FourCC(vestId), p1, an)
        RemoveLocation(p1);
        RemoveLocation(p2);
        let t: timer = CreateTimer();
        let i = 10;
        let max = 500;
        TimerStart(t, 0.02, true, () => {
            max = max - 1
            let p11 = GetUnitLoc(mj);
            let p2 = GetUnitLoc(u2);
            let an = AngleBetweenPoints(p11, p2);
            let p3 = PolarProjectionBJ(p11, 30.00, an);
            EXSetUnitFacing(mj, an);
            SetUnitPositionLoc(mj, p3);
            let l: number = DistanceBetweenPoints(p3, p2);
            RemoveLocation(p11);
            RemoveLocation(p2);
            RemoveLocation(p3);
            if (l <= 50.00) {
                i = i - 1
                if (i > 0) {
                    UnitDamageTargetBJ(u1, u2, damge, ATTACK_TYPE_MELEE, DAMAGE_TYPE_NORMAL);
                    DestroyEffect(AddSpecialEffectTarget(effect, u2, BodyP));
                    SetUnitLifeBJ(u1, (GetUnitStateSwap(UNIT_STATE_LIFE, u1) + (0.03 * (GetUnitStateSwap(UNIT_STATE_MAX_LIFE, u1) - GetUnitStateSwap(UNIT_STATE_LIFE, u1)))));
                }
                p2 = GetUnitLoc(u2);
                //添加 限制条件  单位是活的   单位是敌人  单位不等于对其释放技能的单位
                let g = GetUnitsInRangeOfLocMatching(600.00, p2, Condition(() => {
                    return (IsUnitType(GetFilterUnit(), UNIT_TYPE_DEAD) == false) && (IsUnitEnemy(GetFilterUnit(), GetOwningPlayer(u1)) == true) && (GetFilterUnit() != u2);
                }));
                u2 = GroupPickRandomUnit(g);
                RemoveLocation(p2);
                DestroyGroup(g);
                if ((i == 0)) {
                    u2 = u1;
                }
                if ((i < 0)) {
                    //延迟一秒删除
                    // BaseUtil.runLater(1, () => {
                    //     DestroyEffect(AddSpecialEffectTarget(dataConfig.effectPath1, u1, "origin"));
                    // })
                    RemoveUnit(mj);
                    DestroyTimer(t);
                }
            }
            if ((max <= 0)) {
                RemoveUnit(mj);
                DestroyTimer(t);
            }

        });
    }

    static jian() {
        let u = GetEventDamageSource();
        let uu = GetTriggerUnit();
        let x = GetUnitX(u);
        let y = GetUnitY(u);
        for (let i = 1; i <= 15; i++) {
            let jd = (24.00 * I2R(i));
            let mj = CreateUnit(GetOwningPlayer(u), FourCC('hfoo'), x, y, jd);
            UnitApplyTimedLife(mj, FourCC('BHwe'), 5.00);
            UnitAddAbility(mj, FourCC('Amrf'));
            SetUnitFlyHeight(mj, 60.00, 0.00);
            let t: timer = CreateTimer();
            TimerStart(t, 0.03, true, () => {
                if ((IsUnitType(mj, UNIT_TYPE_DEAD) == true)) {
                    DestroyTimer(t);
                }
                SetUnitFacing(mj, CyttpBaseConfig.GetAngleBetweenUnits(mj, uu));
                let x2 = ((GetUnitX(mj) + CosBJ(GetUnitFacing(mj)) * 30.00));
                let y2 = ((GetUnitY(mj) + SinBJ(GetUnitFacing(mj)) * 30.00));
                SetUnitX(mj, x2);
                SetUnitY(mj, y2);
                if ((IsUnitInRangeXY(mj, GetUnitX(uu), GetUnitY(uu), 20.00) == true)) {
                    UnitDamageTarget(u, uu, 100.00, true, false, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
                    KillUnit(mj);
                    DestroyTimer(t);
                }
            });
        }


    }
    /**
    * 获得两个单位之间的角度
    */
    static GetAngleBetweenUnits(A: unit, B: unit): number {
        return Atan2(GetUnitY(B) - GetUnitY(A), GetUnitX(B) - GetUnitX(A));
    }
    /**
   * 两个坐标之间的距离
   */
    static DistanceBetweenXY(x1: number, x2: number, y1: number, y2: number): number {
        return SquareRoot((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    /**
    * 两个单位之间的距离
    */
    static DistanceBetweenUnits(A: unit, B: unit): number {
        let x1: number = GetUnitX(A);
        let x2: number = GetUnitX(B);
        let y1: number = GetUnitY(A);
        let y2: number = GetUnitY(B);
        return SquareRoot((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    /**
     * 两个坐标之间的角度
     */
    static AngleBetweenXY(x1: number, x2: number, y1: number, y2: number): number {
        return bj_RADTODEG * Atan2(y2 - y1, x2 - x1);
    }
}