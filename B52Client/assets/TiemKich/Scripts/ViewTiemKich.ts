// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ConfigTiemKich from "./ConfigTiemKich";
import ViewBetting from "./ViewBetting";
import ViewChat from "./ViewChat";
import ViewFullHistory from "./ViewFullHistory";
import ViewGame from "./ViewGame";
import ViewPlaceBet from "./ViewPlaceBet";
import ViewQuickHistory from "./ViewQuickHistory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewTiemKich extends cc.Component {
    

    @property(ViewBetting)
    viewBetting:ViewBetting = null;

    @property(ViewChat)
    viewChat:ViewChat = null;

    @property(ViewPlaceBet)
    viewPlaceBet:ViewPlaceBet = null;

    @property(ViewQuickHistory)
    viewQuickHistory:ViewQuickHistory = null;

    @property(ViewFullHistory)
    viewFullHistory:ViewFullHistory = null;

    @property(ViewGame)
    viewGame:ViewGame = null;

    protected onLoad(): void {
        this.viewBetting.resetView();
        this.viewChat.resetView();  
        this.viewPlaceBet.resetView();
        this.viewQuickHistory.resetView();
        this.viewGame.resetView();
    }

    protected onEnable(): void {
        cc.systemEvent.on("snapshot_tiemkich",this.onSnapshot.bind(this));
        cc.systemEvent.on("updateGame_tiemkich",this.onUpdateGame.bind(this));
        cc.systemEvent.on("loadConfig_tiemkich",this.onLoadConfig.bind(this));
        cc.systemEvent.on("history_tiemkich",this.onHistory.bind(this));
        cc.systemEvent.on("betting_tiemkich",this.onBetting.bind(this));
    }

    protected onDisable(): void {
        cc.systemEvent.off("snapshot_tiemkich",this.onSnapshot.bind(this));
        cc.systemEvent.off("updateGame_tiemkich",this.onUpdateGame.bind(this));
        cc.systemEvent.off("loadConfig_tiemkich",this.onLoadConfig.bind(this));
        cc.systemEvent.off("history_tiemkich",this.onHistory.bind(this));
        cc.systemEvent.off("betting_tiemkich",this.onBetting.bind(this));
    }

    private onBetting(data){
        if(data["bettingList"] != null){
            this.viewBetting.updateGame(data["bettingList"]);
        }
    }

    private onHistory(data){
        if(data["historyList"] != null){
            this.viewQuickHistory.init(data["historyList"]);
            this.viewFullHistory.init(data["historyList"]);
        }
    }

    private onLoadConfig(data){
        ConfigTiemKich.WAITING_TIME = parseInt(data["WAITING_TIME"]);
        ConfigTiemKich.RESULT_TIME = parseInt(data["RESULT_TIME"]);
        ConfigTiemKich.SPEED_RATE = parseFloat(data["SPEED_RATE"]);
    }

    private onSnapshot(data){
        this.viewQuickHistory.init(data["historyList"]);
        this.viewFullHistory.init(data["historyList"]);
        this.viewBetting.init(data["bettingList"],data["sessionId"]);
        this.viewPlaceBet.init(data["stateGame"]);
        this.viewGame.init(data["stateGame"],data["timer"]);
    }

    private onUpdateGame(data){
        this.viewPlaceBet.updateGame(data["stateGame"]);
        this.viewGame.init(data["stateGame"],data["timer"]);
        if(data["sessionId"] != null){
            this.viewBetting.updateSessionId(data["sessionId"]);
        }
    }
}
