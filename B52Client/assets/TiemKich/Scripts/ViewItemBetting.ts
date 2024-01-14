// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewItemBetting extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null;
    @property(cc.Color)
    colorBgLose : cc.Color = null;
    @property(cc.Color)
    colorBgWin:cc.Color = null;

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


    public init(data){
        this.txtUsername.string = data.username;
        this.txtBet.string = data.bet;

        if(data.rate == null){
            
        }
    }

}
