// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Utils from "../../Global/Scripts/Utils";
import ConfigTiemKich from "./ConfigTiemKich";
import ResourcesTiemKich from "./ResourcesTiemKich";

const {ccclass, property} = cc._decorator;

enum StateBetting{
    Betting,
    Win,
    Lose
}
@ccclass
export default class ViewItemBetting extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null;
    @property(cc.SpriteFrame)
    sfBgPlace : cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfBgWin:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfBgLose:cc.SpriteFrame = null;

    @property(cc.Label)
    txtUsername:cc.Label = null;

    @property(cc.Sprite)
    bgBet:cc.Sprite = null;
    @property(cc.Label)
    txtBet:cc.Label = null;

    @property(cc.Sprite)
    bgRate:cc.Sprite = null;
    @property(cc.Label)
    txtRate:cc.Label = null;

    @property(cc.Label)
    txtReward:cc.Label = null;

    private data = null;

    public init(data){
        this.data = data;
        this.txtUsername.string = Utils.ReduceName(data.username);
        this.txtBet.string = Utils.FormatNumber(data.bet);
       
        if(data.state != null){
            switch(data.state){
                case StateBetting.Betting:
                    this.bg.spriteFrame = this.sfBgPlace;
                    this.bgBet.node.active = true;
    
                    this.bgRate.node.active = false;
                    
                break;
                case StateBetting.Win:
                    this.bg.spriteFrame = this.sfBgWin;
                    this.bgBet.node.active = false;
    
                    this.bgRate.node.active = true;
                    for(var i=0;i<ConfigTiemKich.NumbetRateList.length;i++){
                        if(data.bet <= ConfigTiemKich.NumbetRateList[i]){
                            this.bgRate.spriteFrame = ResourcesTiemKich.Instance.bgRateBetList[i];
                            break;
                        }
                    }
    
                    this.txtReward.string = Utils.FormatNumber(data.bet * data.winRate);
                break;
                case StateBetting.Lose:
                    this.bg.spriteFrame = this.sfBgLose;
                    this.bgBet.node.active = false;
    
                    this.bgRate.node.active = true;
                    for(var i=0;i<ConfigTiemKich.NumbetRateList.length;i++){
                        if(data.bet <= ConfigTiemKich.NumbetRateList[i]){
                            this.bgRate.spriteFrame = ResourcesTiemKich.Instance.bgRateBetList[i];
                            break;
                        }
                    }
    
                    this.txtReward.string = "0";
                break;
            }
        }
        else{
            this.bgRate.node.active = false;
        }
        
    }

}
