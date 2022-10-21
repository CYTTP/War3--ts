/**
 * @brief 全体单位效果工具
 * @brief 天气效果
 */

import BaseUtil from "solar/util/BaseUtil";
import VestUtil from "solar/util/VestUtil";
import { Trigger } from "solar/w3ts/handles/trigger";


export default class CCForceUtil {

    /**
      * @brief 创建或者获取一个伤害来源
      */
    static damageSource: unit = null;
    static getOrCreateDamageSource(x: number = 0, y: number = 0): unit {
        if (IsHandle(CCForceUtil.damageSource)) {
            return CCForceUtil.damageSource;
        }
        CCForceUtil.damageSource = VestUtil.SunCreateVestByUnit(null, x, y, '', 0, -1, Player(PLAYER_NEUTRAL_AGGRESSIVE));
        return CCForceUtil.damageSource;
    }

    /**
     * @brief 降低所有敌对单位的移动速度
     * @param slowdown 降低的速度(百分比)
     * @param duration  减速的持续时间
     */
    static slowdownAllUnits(slowdown: number, duration: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有敌对玩家
        for (let i = 5; i < 9; i++) {
            let player = Player(i);

            //  获取玩家的所有单位
            GroupEnumUnitsOfPlayer(group, player, null);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.slowdownUnit(unit, slowdown, duration);
            })
        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 降低指定单位的移动速度
     * @param whichUnit 减速的单位
     * @param slowdown 降低的速度(百分比)
     * @param duration  减速的持续时间
     */
    static slowdownUnit(whichUnit: unit, slowdown: number, duration: number) {

        //  单位已经死亡
        if (!IsUnitAliveBJ(whichUnit)) return;

        //  给handle增加一个引用计数
        handle_ref(whichUnit);

        //  获取单位的移动速度
        let moveSpeed = GetUnitMoveSpeed(whichUnit);

        //  计算单位新的移动速度
        let newMoveSpeed = moveSpeed * (1 - slowdown);

        //  设置单位移动速度
        SetUnitMoveSpeed(whichUnit, newMoveSpeed);

        //  一段时间后
        BaseUtil.runLater(duration, () => {

            //  给handle减少一个引用计数
            handle_unref(whichUnit);
            //  恢复单位移动速度
            if (IsUnitAliveBJ(whichUnit)) {
                SetUnitMoveSpeed(whichUnit, moveSpeed);
            }

        });
    }

    /**
     * @brief 所有玩家单位增加攻击力
     * @param addAttackP 增加的攻击力(百分比)
     * @param duration  增加攻击力的持续时间
     */
    static addAttackForAllEnemyUnits(addAttackP: number, duration: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有玩家
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            let player = Player(i);

            //  玩家没有在游戏中
            if (GetPlayerSlotState(player) != PLAYER_SLOT_STATE_PLAYING) continue;

            //  获取玩家的所有单位
            GroupEnumUnitsOfPlayer(group, player, null);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.addAttackForUnit(unit, addAttackP, duration);
            })

            //  清空单位组
            GroupClear(group);
        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 所有敌方单位增加攻击力
     * @param whichUnit 增加攻击力的单位
     * @param addAttackP 增加的攻击力(百分比)
     * @param duration  增加攻击力的持续时间
     */
    static addAttackForUnit(whichUnit: unit, addAttackP: number, duration: number) {

        //  单位已经死亡
        if (!IsUnitAliveBJ(whichUnit)) return;

        //  给handle增加一个引用计数
        handle_ref(whichUnit);

        //  获取单位的攻击力
        let attack = GetUnitState(whichUnit, ConvertUnitState(0x12));

        //  计算单位新的攻击力
        let newAttack = attack * (1 + addAttackP);

        //  设置单位攻击力
        SetUnitState(whichUnit, ConvertUnitState(0x12), newAttack);

        //  一段时间后
        BaseUtil.runLater(duration, () => {

            //  恢复单位攻击力
            if (IsUnitAliveBJ(whichUnit)) {
                SetUnitState(whichUnit, ConvertUnitState(0x12), attack);
            }

            //  给handle减少一个引用计数
            handle_unref(whichUnit);
        });
    }

    /**
     * @brief 所有单位随机移动
     * @param probability 随机移动的几率
     * @param distance 随机移动的距离
     */
    static randomMoveAllUnits(probability: number, distance: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有玩家
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            let player = Player(i);

            //  玩家没有在游戏中
            if (GetPlayerSlotState(player) != PLAYER_SLOT_STATE_PLAYING) continue;

            //  获取玩家的所有单位
            GroupEnumUnitsOfPlayer(group, player, null);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.randomMoveUnit(unit, probability, distance);
            })

        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 指定单位随机移动
     * @param whichUnit 随机移动的单位
     * @param probability 随机移动的几率
     * @param distance 随机移动的距离
     */
    static randomMoveUnit(whichUnit: unit, probability: number, distance: number) {

        //  没有触发随机移动事件
        if (GetRandomReal(0.00, 1.00) > probability) return;

        //  单位已经死亡
        if (!IsUnitAliveBJ(whichUnit)) return;

        //  获取单位的位置
        let x = GetUnitX(whichUnit);
        let y = GetUnitY(whichUnit);

        //  计算单位新的位置
        let angle = GetRandomInt(0, 360);
        let newX = x + distance * CosBJ(angle);
        let newY = y + distance * SinBJ(angle);

        //  设置单位位置
        SetUnitPosition(whichUnit, newX, newY);
    }

    /**
     * @brief 所有单位损失生命值
     * @param probability 损失生命值的几率
     * @param damage 损失的生命值
     */
    static damageAllUnits(probability: number, damage: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有玩家
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            let player = Player(i);

            //  玩家没有在游戏中
            if (GetPlayerSlotState(player) != PLAYER_SLOT_STATE_PLAYING) continue;

            //  获取玩家的所有单位
            GroupEnumUnitsOfPlayer(group, player, null);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.damageUnit(unit, probability, damage);
            })

        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 指定单位损失生命值
     * @param target 指定单位
     * @param probability 损失生命值的几率
     * @param damage 损失的生命值
     */
    static damageUnit(target: unit, probability: number, damage: number) {

        //  没有触发损失生命值事件
        if (GetRandomReal(0.00, 1.00) > probability) return;

        //  单位已经死亡
        if (!IsUnitAliveBJ(target)) return;

        //  获取伤害来源
        let damageSource = CCForceUtil.getOrCreateDamageSource();

        //  对单位造成伤害
        UnitDamageTarget(damageSource, target, damage, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_NORMAL, null);
    }

    /**
     * @brief 增加所有英雄单位的生命恢复
     * @param lifeRegen 每秒钟恢复的生命值
     * @param duration 效果持续时间
     */
    static addLifeRegenForAllHeros(lifeRegen: number, duration: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有玩家
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            let player = Player(i);

            //  玩家没有在游戏中
            if (GetPlayerSlotState(player) != PLAYER_SLOT_STATE_PLAYING) continue;

            //  获取玩家的所有单位
            let filter = Filter(() => {
                return IsUnitType(GetFilterUnit(), UNIT_TYPE_HERO);
            })
            GroupEnumUnitsOfPlayer(group, player, filter);
            DestroyFilter(filter);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.addLifeRegenForUnit(unit, lifeRegen, duration);
            })
        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 增加指定英雄单位的生命恢复
     * @param whichUnit 指定英雄单位
     * @param addLifeRegen 每秒钟恢复的生命值
     * @param duration 效果持续时间
     */
    static addLifeRegenForUnit(whichUnit: unit, addLifeRegen: number, duration: number) {

        //  单位死亡
        if (!IsUnitAliveBJ(whichUnit)) return;

        //  给handle增加一个引用计数
        handle_ref(whichUnit);

        //  获取单位的生命恢复
        let oldLifeRegen = GetUnitState(whichUnit, ConvertUnitState(0x53));

        //  计算单位新的生命恢复
        let newLifeRegen = oldLifeRegen + addLifeRegen;

        //  设置单位生命恢复
        SetUnitState(whichUnit, ConvertUnitState(0x53), newLifeRegen);

        //  一段时间后
        BaseUtil.runLater(duration, () => {
            //  给handle减少一个引用计数
            handle_unref(whichUnit);
            //  重置生命恢复
            if (IsUnitAliveBJ(whichUnit)) {
                SetUnitState(whichUnit, ConvertUnitState(0x53), oldLifeRegen);
            }
        });
    }

    /**
     * @brief 所有单位攻击有几率丢失
     * @param probability 攻击丢失的几率
     * @param duration 攻击丢失效果持续时间
     */
    static attackMissForAllUnits(probability: number, duration: number) {

        //  创建单位组
        let group = CreateGroup();

        //  遍历所有玩家
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            let player = Player(i);

            //  玩家没有在游戏中
            if (GetPlayerSlotState(player) != PLAYER_SLOT_STATE_PLAYING) continue;

            //  获取玩家的所有单位
            GroupEnumUnitsOfPlayer(group, player, null);

            //  遍历单位组
            BaseUtil.SForGroup(group, unit => {
                CCForceUtil.attackMissForUnit(unit, probability, duration);
            })

            //  清空单位组
            GroupClear(group);
        }

        //  删除单位组
        DestroyGroup(group);
    }

    /**
     * @brief 指定单位攻击有几率丢失
     * @param whichUnit 指定单位
     * @param probability 攻击丢失的几率
     * @param duration 攻击丢失效果持续时间
     */
    static attackMissForUnit(whichUnit: unit, probability: number, duration: number) {

        //  单位死亡
        if (!IsUnitAliveBJ(whichUnit)) return;

        //  给handle增加一个引用计数
        handle_ref(whichUnit);

        let trigger = new Trigger();
        trigger.registerAnyUnitDamagedEvent();
        trigger.addAction(() => {

            //  没有触发攻击丢失事件
            if (GetRandomReal(0.00, 1.00) > probability) return;

            //  获取伤害来源
            let damageUnit = GetEventDamageSource();

            //  伤害来源不是该单位
            if (GetHandleId(damageUnit) != GetHandleId(whichUnit)) return;

            //  关闭触发器
            DisableTrigger(GetTriggeringTrigger());

            //  设置伤害值
            EXSetEventDamage(0);

            //  创建漂浮文字
            let texttag = CreateTextTagUnitBJ('Miss', damageUnit, 0.10, 15.00, 100, 0.00, 0.00, 0);
            SetTextTagVelocity(texttag, GetRandomReal(-0.10, 0.10), 0.10);
            BaseUtil.runLater(1.0, () => {
                DestroyTextTag(texttag);
            });

            //  打开触发器
            EnableTrigger(GetTriggeringTrigger());
        });

        //  一段时间后
        BaseUtil.runLater(duration, () => {
            //  给handle减少一个引用计数
            handle_unref(whichUnit);
            //  停止攻击丢失效果
            trigger.destroy();
        });
    }

    /**
     * @brief 指定区域内随机位置出现龙卷风,把指定单位吹到全图随机位置,如果不在陆地上则直接死亡
     * @param whichUnit 指定单位
     * @param whichRect 指定区域
     */
    static tornadoTeleportUnit(whichUnit: unit, whichRect: rect) {

        //  获取随机位置
        let locA = GetRandomLocInRect(whichRect);

        //  获取单位位置
        let locB = GetUnitLoc(whichUnit);

        //  创建龙卷风特效
        let effect = AddSpecialEffectLoc('Abilities\\Spells\\Other\\Tornado\\TornadoElementalSmall.mdl', locA);

        //  获取两点间角度与距离
        let angle = AngleBetweenPoints(locA, locB);
        let distance = DistanceBetweenPoints(locA, locB);

        //  刷新龙卷风位置
        let timer = CreateTimer();
        let delta = 0;
        TimerStart(timer, 0.003, true, () => {
            let x = EXGetEffectX(effect) + CosBJ(angle);
            let y = EXGetEffectY(effect) + SinBJ(angle);
            EXSetEffectXY(effect, x, y);
            delta++;
            if (delta >= distance) {

                //  删除计时器和特效
                DestroyTimer(timer);
                DestroyEffect(effect);

                //  获取地图随机位置
                let location = GetRandomLocInRect(GetPlayableMapRect());

                //  设置触发单位的位置
                SetUnitPositionLoc(whichUnit, location);

                //  不在陆地上则直接死亡
                if (false) {
                    KillUnit(whichUnit);
                }
            }
        });
    }
}