// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewPlaceBet extends cc.Component {

    @property(cc.Label)
    txtPlaceBet:cc.Label = null;

    public OnBtnToggle(){
        
    }

    public OnBtnDescrease(){

    }

    public OnBtnIncrease(){

    }

    public OnBtnPlaceBet (amount:number){
        
    }

}
