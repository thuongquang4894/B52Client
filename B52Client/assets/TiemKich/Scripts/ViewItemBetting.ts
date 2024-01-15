// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ConfigTiemKich from "./ConfigTiemKich";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewItemBetting extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null;
    @property(cc.SpriteFrame)
    sfBgLose : cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfBgWin:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    sfBgSpecial:cc.SpriteFrame = null;

    @property(cc.Label)
    txtUsername:cc.Label = null;

    @property(cc.Sprite)
    bgBet:cc.Sprite = null;
    @property(cc.Label)
    txtBet:cc.Label = null;

    @property(cc.Sprite)
    bgRate:cc.Sprite = null;
    @property([cc.SpriteFrame])
    bgRateList:cc.SpriteFrame[] = [];
    @property(cc.Label)
    txtRate:cc.Label = null;

    @property(cc.Label)
    txtReward:cc.Label = null;


    public init(data){
        this.txtUsername.string = data.username;
        this.txtBet.string = data.bet;

        if(data.rate == null){
            for(var i=0;i<ConfigTiemKich.NumbetRateList.length;i++){
                if(data.rate <= ConfigTiemKich.NumbetRateList[i]){
                    this.bgRate.spriteFrame = this.bgRateList[i];
                    return;
                }
            }
        }
    }

}
