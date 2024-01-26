// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import UserData from "../../Global/Scripts/UserData";
import Utils from "../../Global/Scripts/Utils";
import ConfigTiemKich from "./ConfigTiemKich";
import { StatusGameTiemKich } from "./DataTiemKich";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewGame extends cc.Component {

    @property(cc.Label)
    txtRateRunning:cc.Label = null;

    @property(cc.Label)
    txtBalance:cc.Label = null;

    @property(cc.Animation)
    gameAnimation:cc.Animation = null;

    @property(sp.Skeleton)
    maybaySke:sp.Skeleton = null;

    @property(sp.Skeleton)
    bgSke:sp.Skeleton = null;

    @property(cc.Node)
    boxWaitingGame:cc.Node = null;

    @property(cc.Sprite)
    sliderWaitingGame:cc.Sprite = null;

    private stateGame:number = -1;
    public resetView(){
        this.txtBalance.string = "$"+Utils.FormatNumberWithCommon(UserData.balance);
        this.boxWaitingGame.active = true;
        this.gameAnimation.play("ViewGameIdle");
        this.bgSke.animation = "BGbay_idle"; 
        this.bgSke.loop = false;
    }

    private timer:number = 0;
    protected update(dt: number): void {
        if(this.stateGame == StatusGameTiemKich.Running){
            this.timer += dt;
            this.updateRateByTimer();
        }
    }

    private updateRateByTimer(){
        this.txtRateRunning.string = (this.timer * ConfigTiemKich.SPEED_RATE + 1).toFixed(2)+"x";
    }

    public init(stateGame:StatusGameTiemKich,timer:number){
        cc.log("-------init:"+stateGame+":"+timer);
        if(this.stateGame == stateGame){
            return;
        }
        this.stateGame = stateGame;
        this.timer = timer;
        switch(stateGame)
        {
            case StatusGameTiemKich.Waiting:
                this.boxWaitingGame.active = true;
                this.txtRateRunning.node.active = false;
                this.bgSke.setAnimation(0,"BGbay_idle",false);
                this.gameAnimation.play("ViewGameIdle");
                
                let ratio = 1 - timer/ConfigTiemKich.WAITING_TIME;
                this.sliderWaitingGame.fillRange = ratio;
                cc.Tween.stopAllByTarget(this.sliderWaitingGame);
                cc.tween(this.sliderWaitingGame)
                    .to(ConfigTiemKich.WAITING_TIME - timer,{fillRange:0},{easing:"linear"})
                .start();
            break;
            case StatusGameTiemKich.Running:
                this.boxWaitingGame.active = false;
                this.bgSke.setAnimation(0,"BGbay",true);
                let durationRunning = 6;
                this.txtRateRunning.node.active = true;
                this.timer = timer;
                if(timer < durationRunning){
                    this.gameAnimation.play("ViewGameRunning");
                    this.scheduleOnce(function(){
                        this.gameAnimation.play("ViewGameRunningLoop");
                    },durationRunning - timer);
                }
                else{
                    this.gameAnimation.play("ViewGameRunningLoop");
                }
                this.updateRateByTimer();
               
            break;
            case StatusGameTiemKich.EndGame:
                this.unscheduleAllCallbacks();
                this.gameAnimation.stop();
                cc.Tween.stopAllByTarget(this.maybaySke.node);
                cc.tween(this.maybaySke.node)
                .to(1,{position:new cc.Vec3(2000,1000)})
                .start();
            break;
        }
    }

    public flyOut(){
        this.unscheduleAllCallbacks();
        this.gameAnimation.stop();
        cc.Tween.stopAllByTarget(this.maybaySke.node);
        cc.tween(this.maybaySke.node)
        .to(1,{position:new cc.Vec3(2000,1000)})
        .start();

    }

    public clickTest(){
        this.flyOut();
    }
}
