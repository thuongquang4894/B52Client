// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewChat extends cc.Component {

    @property(cc.Widget)
    boxNode:cc.Widget = null;

    private isToggle : boolean = false;
    public OnBtnToggle(){
        if(this.isToggle == false){
            this.boxNode.top = 20;
        }
        else{
            this.boxNode.top = 550;
        }
        this.boxNode.updateAlignment();
        this.isToggle = !this.isToggle;
    }
    
    public OnBtnSend(){

    }
}
