import Player_choice_unit from "cyttp/Util/Player_choice_unit";
import DataBase from "solar/common/DataBase";
import BaseUtil from "solar/util/BaseUtil";
import SyncUtil from "solar/util/SyncUtil";
import { Trigger } from "solar/w3ts/handles/trigger";
import * as React from "solar/w3ts/tsx";
import Choice_Hero_UI from "../Choice_Hero_UI/Choice_Hero_UI";
// import Archive from "state/base/Archive";
// import Prefix from "state/base/Prefix";

DzLoadToc('UI\\Difficulty.toc')
export default class UiChooseDifficulty {

	static config: {
		[page: string]: {
			text: string,
			difficulty: number,
			isEndlessMode: boolean,
		}[],
	} = {

		};

	background = { visible: false, ref: { current: 0 } };
	btn_left = { visible: true, ref: { current: 0 } };
	btn_right = { visible: true, ref: { current: 0 } };
	btn_difficulty_1 = { visible: true, ref: { current: 0 } };
	btn_difficulty_2 = { visible: true, ref: { current: 0 } };
	btn_difficulty_3 = { visible: true, ref: { current: 0 } };
	btn_difficulty_4 = { visible: true, ref: { current: 0 } };
	btn_difficulty_5 = { visible: true, ref: { current: 0 } };
	btn_difficulty_6 = { visible: true, ref: { current: 0 } };
	btn_difficulty_7 = { visible: false, ref: { current: 0 } };
	btn_difficulty_8 = { visible: false, ref: { current: 0 } };
	btn_difficulty_9 = { visible: false, ref: { current: 0 } };
	btn_difficulty_10 = { visible: false, ref: { current: 0 } };
	btn_difficulty_11 = { visible: false, ref: { current: 0 } };
	btn_difficulty_12 = { visible: false, ref: { current: 0 } };
	text_difficulty_endless = { visible: false, ref: { current: 0 } };

	page: number = 1;

	//	是否正在向上移动
	isMoveUp: boolean = false;

	constructor(container = DzGetGameUI()) {
		React.render(this.render(), container);
		// // 注册事件同步数据
		let triggerHandle = CreateTrigger();
		DzTriggerRegisterSyncData(triggerHandle, "同步游戏难度", false)
		TriggerAddAction(triggerHandle, () => {
			let str = DzGetTriggerSyncData()
			let index = S2I(str)
			this.player_int_create_unit()
			BaseUtil.runLater(0.7, () => {
				DzFrameShow(Choice_Hero_UI.UI_xz_ying_xiong, true)
			})
			//	设置游戏难度
			let cfData = UiChooseDifficulty.config[I2S(this.page)];
			gameDifficulty = cfData[index].difficulty;
			let message = '|CFFFF00FF【系统提示】玩家|r';
			message += '|CFF00FF00' + GetPlayerName(Player(0)) + '|r';
			message += '|CFFFF00FF选择了难度|r';
			message += '|CFFFF0000' + cfData[index].text + '|r';
			for (let i = 0; i < 4; i++) {
				//  向所有玩家发送文本消息
				DisplayTimedTextToPlayer(Player(i), 0, 0, 60, message);
			}
		})

		//	注册计时器事件
		let trigger = new Trigger();
		trigger.registerTimerEvent(0.0, false);
		trigger.addAction(() => {

			//	不是主玩家
			if (Player(0) != GetLocalPlayer()) {
				DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '等待玩家一选择难度');
				return
			}
			//	显示选择难度
			this.background.visible = !this.background.visible;
			DzFrameShow(this.background.ref.current, this.background.visible);

		})
	}



	onClick_btn_left() {
		this.page--;
		if (this.page < 1) {
			this.page = 1;
		}
		this.update();
	}

	onClick_btn_right() {
		this.page++;
		if (this.page > this.getPageCount()) {
			this.page = this.getPageCount();
		}
		this.update();
	}

	getPageCount(): number {
		let count = 0;
		for (const id in UiChooseDifficulty.config) {
			count++;
		}
		return count;
	}

	update() {

		if (1 == this.page) {
			DzFrameShow(this.btn_difficulty_1.ref.current, true);
			DzFrameShow(this.btn_difficulty_2.ref.current, true);
			DzFrameShow(this.btn_difficulty_3.ref.current, true);
			DzFrameShow(this.btn_difficulty_4.ref.current, true);
			DzFrameShow(this.btn_difficulty_5.ref.current, true);
			DzFrameShow(this.btn_difficulty_6.ref.current, true);
			DzFrameShow(this.btn_difficulty_7.ref.current, false);
			DzFrameShow(this.btn_difficulty_8.ref.current, false);
			DzFrameShow(this.btn_difficulty_9.ref.current, false);
			DzFrameShow(this.btn_difficulty_10.ref.current, false);
			DzFrameShow(this.btn_difficulty_11.ref.current, false);
			DzFrameShow(this.btn_difficulty_12.ref.current, false);
		} else if (2 == this.page) {
			DzFrameShow(this.btn_difficulty_1.ref.current, false);
			DzFrameShow(this.btn_difficulty_2.ref.current, false);
			DzFrameShow(this.btn_difficulty_3.ref.current, false);
			DzFrameShow(this.btn_difficulty_4.ref.current, false);
			DzFrameShow(this.btn_difficulty_5.ref.current, false);
			DzFrameShow(this.btn_difficulty_6.ref.current, false);
			DzFrameShow(this.btn_difficulty_7.ref.current, true);
			DzFrameShow(this.btn_difficulty_8.ref.current, true);
			DzFrameShow(this.btn_difficulty_9.ref.current, true);
			DzFrameShow(this.btn_difficulty_10.ref.current, true);
			DzFrameShow(this.btn_difficulty_11.ref.current, true);
			DzFrameShow(this.btn_difficulty_12.ref.current, true);
		}
	}

	onClick_btn_difficulty_1() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_1.ref.current, 0.05, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_7.ref.current, 0.05, 0.19);
		}
		this.setDifficulty(0);


	}

	onClick_btn_difficulty_2() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_2.ref.current, 0.17, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_8.ref.current, 0.17, 0.19);
		}
		this.setDifficulty(1);
	}

	onClick_btn_difficulty_3() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_3.ref.current, 0.29, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_9.ref.current, 0.29, 0.19);
		}
		this.setDifficulty(2);
	}

	onClick_btn_difficulty_4() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_4.ref.current, 0.41, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_10.ref.current, 0.41, 0.19);
		}
		this.setDifficulty(3);
	}

	onClick_btn_difficulty_5() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_5.ref.current, 0.53, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_11.ref.current, 0.53, 0.19);
		}
		this.setDifficulty(4);
	}

	onClick_btn_difficulty_6() {
		if (this.isMoveUp) return;
		this.isMoveUp = true;
		if (1 == this.page) {
			this.moveUp(this.btn_difficulty_6.ref.current, 0.65, 0.19);
		} else if (2 == this.page) {
			this.moveUp(this.btn_difficulty_12.ref.current, 0.65, 0.19);
		}
		this.setDifficulty(5);
	}

	moveUp(button: number, startX: number, startY: number) {
		BaseUtil.runLater(0.03, () => {
			startY += 0.01,
				DzFrameSetAbsolutePoint(button, 6, startX, startY);
		}, 20);
		BaseUtil.runLater(0.6, () => {
			DzFrameShow(this.background.ref.current, false);
			this.isMoveUp = false;
			//  SyncUtil.syncData("UI双击选择英雄");

			this.selectHeroShow()
		});
	}

	setDifficulty(idx: number) {
		let str = '' + idx
		DzSyncData("同步游戏难度", str)
	}

	player_int_create_unit() {
		//创建玩家区域   玩家1 玩家2 玩家3 玩家4
		let rectArray = [gg_rct_p_create_1, gg_rct_p_create_2, gg_rct_p_create_3, gg_rct_p_create_4]
		let gold = 5000
		let wood = 100000
		//DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, '创建玩家单位进来=');
		for (let i = 0; i < 4; i++) {
			let p = Player(i)
			if (GetPlayerSlotState(p) == PLAYER_SLOT_STATE_PLAYING
				&& GetPlayerController(p) == MAP_CONTROL_USER) {
				let x = GetRectCenterX(rectArray[i])
				let y = GetRectCenterY(rectArray[i])
				let unit = CreateUnit(p, FourCC('qzu2'), x, y, 0)
				UnitAddAbility(unit, FourCC('Lz09'));
				SetPlayerState(Player(5 + i), PLAYER_STATE_GIVES_BOUNTY, 1)

				// // 添加绿字属性技能
				// UnitAddAbility(unit, FourCC('Lz09'));
				DataBase.getPlayerSolarData(p).建造师 = unit

				// 给初始金币
				AdjustPlayerStateBJ(gold, p, PLAYER_STATE_RESOURCE_GOLD)
				AdjustPlayerStateBJ(wood, p, PLAYER_STATE_RESOURCE_LUMBER)
				//平移镜头
				Player_choice_unit(unit, p, x, y)
				DataBase.getPlayerSolarData(p).游戏开始 = true
			}
		}
	}
	selectHeroShow() {
		DzFrameShow(Choice_Hero_UI.UI_xz_ying_xiong, true)
	}


	render() {
		return (<root>
			<backdrop
				id="background"
				inherits="background"
				position={{ x: 0.000, y: 0.000 }}
				size={{ width: 0.800, height: 0.600 }}
				visible={this.background.visible}
				ref={this.background.ref}
				texture={"difficulty\\bg_difficulty.blp"}
			>
				<button
					id="btn_left"
					inherits="btn_left"
					position={{ x: 0.004, y: 0.320 }}
					size={{ width: 0.042, height: 0.042 }}
					visible={this.btn_left.visible}
					ref={this.btn_left.ref}
					background-image={"difficulty\\difficulty_right.blp"}
					onClick={() => this.onClick_btn_left()}
				>
				</button>
				<button
					id="btn_right"
					inherits="btn_right"
					position={{ x: 0.760, y: 0.320 }}
					size={{ width: 0.042, height: 0.042 }}
					visible={this.btn_right.visible}
					ref={this.btn_right.ref}
					background-image={"difficulty\\difficulty_left.blp"}
					onClick={() => this.onClick_btn_right()}
				>
				</button>
				<button
					id="btn_difficulty_1"
					inherits="btn_difficulty_1"
					position={{ x: 0.050, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_1.visible}
					ref={this.btn_difficulty_1.ref}
					background-image={"difficulty\\difficulty1.blp"}
					// frametip={{
					// 	frametipRef: this.btn_difficulty_1.ref, pos: 7, onTip: (fh, th) => {
					// 		this.onClick_btn_difficulty_1(1)
					// 	}
					// }}
					onClick={() => this.onClick_btn_difficulty_1()}

				>
				</button>
				<button
					id="btn_difficulty_2"
					inherits="btn_difficulty_2"
					position={{ x: 0.170, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_2.visible}
					ref={this.btn_difficulty_2.ref}
					background-image={"difficulty\\difficulty2.blp"}
					onClick={() => this.onClick_btn_difficulty_2()}
				>
				</button>
				<button
					id="btn_difficulty_3"
					inherits="btn_difficulty_3"
					position={{ x: 0.290, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_3.visible}
					ref={this.btn_difficulty_3.ref}
					background-image={"difficulty\\difficulty3.blp"}
					onClick={() => this.onClick_btn_difficulty_3()}
				>
				</button>
				<button
					id="btn_difficulty_4"
					inherits="btn_difficulty_4"
					position={{ x: 0.410, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_4.visible}
					ref={this.btn_difficulty_4.ref}
					background-image={"difficulty\\difficulty4.blp"}
					onClick={() => this.onClick_btn_difficulty_4()}
				>
				</button>
				<button
					id="btn_difficulty_5"
					inherits="btn_difficulty_5"
					position={{ x: 0.530, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_5.visible}
					ref={this.btn_difficulty_5.ref}
					background-image={"difficulty\\difficulty5.blp"}
					onClick={() => this.onClick_btn_difficulty_5()}
				>
				</button>
				<button
					id="btn_difficulty_6"
					inherits="btn_difficulty_6"
					position={{ x: 0.650, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_6.visible}
					ref={this.btn_difficulty_6.ref}
					background-image={"difficulty\\difficulty6.blp"}
					onClick={() => this.onClick_btn_difficulty_6()}
				>
				</button>
				{/* <button
					id="btn_difficulty_7"
					inherits="btn_difficulty_7"
					position={{ x: 0.050, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_7.visible}
					ref={this.btn_difficulty_7.ref}
					background-image={"difficulty\\difficulty7.blp"}
					onClick={() => this.onClick_btn_difficulty_1()}
				>
				</button>
				<button
					id="btn_difficulty_8"
					inherits="btn_difficulty_8"
					position={{ x: 0.170, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_8.visible}
					ref={this.btn_difficulty_8.ref}
					background-image={"difficulty\\difficulty8.blp"}
					onClick={() => this.onClick_btn_difficulty_2()}
				>
				</button>
				<button
					id="btn_difficulty_9"
					inherits="btn_difficulty_9"
					position={{ x: 0.290, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_9.visible}
					ref={this.btn_difficulty_9.ref}
					background-image={"difficulty\\difficulty9.blp"}
					onClick={() => this.onClick_btn_difficulty_3()}
				>
				</button>
				<button
					id="btn_difficulty_10"
					inherits="btn_difficulty_10"
					position={{ x: 0.410, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_10.visible}
					ref={this.btn_difficulty_10.ref}
					background-image={"difficulty\\difficulty10.blp"}
					onClick={() => this.onClick_btn_difficulty_4()}
				>
				</button>
				<button
					id="btn_difficulty_11"
					inherits="btn_difficulty_11"
					position={{ x: 0.530, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					visible={this.btn_difficulty_11.visible}
					ref={this.btn_difficulty_11.ref}
					background-image={"difficulty\\difficulty11.blp"}
					onClick={() => this.onClick_btn_difficulty_5()}
				>
				</button> */}
				{/* <backdrop
					position={{ x: 0.650, y: 0.190 }}
					size={{ width: 0.102, height: 0.300 }}
					texture={"difficulty\\difficulty12.blp"}
					visible={this.btn_difficulty_12.visible}
					ref={this.btn_difficulty_12.ref}
				>
					<backdrop
						position={{ x: 0.000, y: 0.005 }}
						size={{ width: 0.075, height: 0.050 }}
						texture={"difficulty\\difficulty_endless.blp"}
					>
					</backdrop>
					<text
						position={{ x: 0.070, y: 0.010 }}
						size={{ width: 0.100, height: 0.040 }}
						ref={this.text_difficulty_endless.ref}
						text="文本"
						textAlignment={TEXTALIGN_LEFT}
						font={{ fileName: "RUIZIAOYUNJINGSHENPINBOJIANMIANFEI-SHAN(REEJI-PINBOGB-FLASH)-2.TTF", height: 0.020, flags: 0 }}
					>
					</text>
					<button
						id="btn_difficulty_12"
						inherits="btn_difficulty_12"
						position={{ x: 0.000, y: 0.000 }}
						size={{ width: 0.102, height: 0.300 }}
						onClick={() => this.onClick_btn_difficulty_6()}
					>
					</button>
				</backdrop> */}
			</backdrop>
		</root>);
	}
}
