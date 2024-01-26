// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import UserData from "../Global/Scripts/UserData";
import SocketTiemKich from "./Scripts/SocketTiemKich";

const {ccclass, property} = cc._decorator;
const WAITING_TIME:number = 7;
const RESULT_TIME:number = 3;
const SPEED_RATE:number = 0.1; // once second
@ccclass
export default class SimulatorServerTiemKich extends cc.Component {

    public static Instance:SimulatorServerTiemKich = null;

    private historyList = [];
    private bettingList = [];
    private chatList = [];
    private stateGame = 0;
    private rate:number = 0;
    private rateEnd:number = 0;
    private timer:number = 0;
    private sessionId:number = 0;
    protected start(): void {
        SimulatorServerTiemKich.Instance = this;
        this.bettingList = [];
        this.loadConfig();
        // this.initBettingList();
        this.initChatList();
        this.initHistoryList();

        this.snapshot();

    }

    private loadConfig(){
        var dataConfig = {};
        dataConfig["WAITING_TIME"] = WAITING_TIME;
        dataConfig["RESULT_TIME"] = RESULT_TIME;
        dataConfig["SPEED_RATE"] = SPEED_RATE;
        SocketTiemKich.Instance.responseLoadConfig(dataConfig);
    }

    protected update(dt: number): void {
        this.timer += dt;

        switch(this.stateGame)
        {
            case 0://waiting
                if(this.timer >= WAITING_TIME){
                    this.stateGame = 1;
                    this.timer = 0;
                    this.rateEnd = parseInt((Math.random()*1 + 1)*100+"")/100;
                    cc.log("rateEnd:"+this.rateEnd);
                    var dataUpdateGame = {};
                    dataUpdateGame["stateGame"] = this.stateGame;
                    dataUpdateGame["timer"] = this.timer;
                    dataUpdateGame["sessionId"] = this.sessionId;
                    SocketTiemKich.Instance.responseUpdateGame(dataUpdateGame);
                }
            break;
            case 1://running
           
                this.rate = this.timer * SPEED_RATE + 1; 
                if(this.rate >= this.rateEnd){
                    this.rate = this.rateEnd;
                    this.stateGame = 2;
                    this.timer = 0;
                    this.addHistory(this.rateEnd);
                    this.updateStateLoseRemainPlayers();
                    let dataHistory = {};
                    dataHistory["historyList"] = this.historyList;
                    SocketTiemKich.Instance.responseHistory(dataHistory);

                    let dataBetting = {};
                    dataBetting["bettingList"] = this.bettingList;
                    SocketTiemKich.Instance.responseBetting(dataBetting);

                    var dataUpdateGame = {};
                    dataUpdateGame["stateGame"] = this.stateGame;
                    dataUpdateGame["timer"] = this.timer;
                    dataUpdateGame["sessionId"] = this.sessionId;
                    SocketTiemKich.Instance.responseUpdateGame(dataUpdateGame);
                }
            break;
            case 2://result
                if(this.timer >= RESULT_TIME){
                    this.bettingList = [];
                    this.stateGame = 0;
                    this.timer = 0;
                    this.rate = 0;
                    this.sessionId++;
                   
                    var dataUpdateGame = {};
                    dataUpdateGame["stateGame"] = this.stateGame;
                    dataUpdateGame["timer"] = this.timer;
                    dataUpdateGame["sessionId"] = this.sessionId;
                    SocketTiemKich.Instance.responseUpdateGame(dataUpdateGame);
                }
            break;
        }
    }

  

    private updateStateLoseRemainPlayers(){
        for(var i=0;i<this.bettingList.length;i++){
            if(this.bettingList[i] != null && this.bettingList[i]["state"] != 0){
                this.bettingList[i]["state"] = 2;//lose
            }
        }
    }

    private addHistory(winRate:number){
        cc.log("addHistory before:"+winRate+" : "+JSON.stringify(this.historyList));
        if(this.historyList.length == 50){
            this.historyList.pop();
        }
        this.historyList.unshift(winRate);

        cc.log("addHistory after:"+winRate+" : "+JSON.stringify(this.historyList));
    }

    private snapshot(){
        var dataSnapShot = {};
        dataSnapShot["historyList"] = this.historyList;
        dataSnapShot["sessionId"] = 1;
        dataSnapShot["chatList"] = this.chatList;
        dataSnapShot["bettingList"] = this.bettingList;
        dataSnapShot["stateGame"] = this.stateGame;//0 : waiting , 1:running , 2 : result
        dataSnapShot["bet"] = this.getBettingByUserName(UserData.username);
        dataSnapShot["timer"] = this.timer;
        SocketTiemKich.Instance.responseSnapShot(dataSnapShot);
    }

    private getBettingByUserName(username){
        for(var i=0;i<this.bettingList.length;i++){
            if(this.bettingList["username"] == username)
                return this.bettingList["bet"];
        }
        return 0;
    }
    private initHistoryList(){
        this.historyList = [];
        for(var i=0;i<50;i++){
            var data = parseInt(Math.random() * 5000+"")/100;
            this.historyList.push(data);
        }
        return this.historyList;
    }

    private initChatList(){
        this.chatList = [];
        for(var i=0;i<100;i++){
            var chat = {};
            chat["username"] = "username"+i;
            chat["content"] = "chat "+i;
            this.chatList.push(chat);
        }
        return this.chatList;
    }

    private initBettingList(){
        this.bettingList = [];
        for(var i=0;i<100;i++){
            var data = {};
            data["username"] = "username"+i;
            data["bet"] = parseInt(Math.random()*10000000+"");
            data["state"] = 1;//0 : running , 1:win , 2 lose
            data["winRate"] = 50;
            data["reward"] = data["bet"] * data["winRate"];
            this.bettingList.push(data);
        }
        return this.bettingList;
    }
    

    public requestPlaceBet(username:string,amount:number){
        for(var i=0;i<this.bettingList.length;i++){
            if(this.bettingList[i]["username"] == username) return;
        }
        this.bettingList.push({username:username,bet:amount})
        cc.log("requestPlaceBet:"+JSON.stringify(this.bettingList));
        SocketTiemKich.Instance.responseBetting({"bettingList":this.bettingList});
    }
}
