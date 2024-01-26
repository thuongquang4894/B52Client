// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewChat extends cc.Component {

    @property(cc.Node)
    arrow:cc.Node = null;
    
    @property(cc.Node)
    boxNode:cc.Node = null;

    public resetView(){

    }

    private isToggle : boolean = false;
    public OnBtnToggle(){
        cc.Tween.stopAllByTarget(this.arrow);
        cc.Tween.stopAllByTarget(this.boxNode);
        if(this.isToggle == true){
            cc.tween(this.boxNode)
            .to(0.3,{height:210})
            .start();

            cc.tween(this.arrow)
            .delay(0.2)
            .to(0.3,{angle:90})
            .start();
        }
        else{
            cc.tween(this.boxNode)
            .to(0.3,{height:560})
            .start();

            cc.tween(this.arrow)
            .delay(0.2)
            .to(0.3,{angle:-90})
            .start();
        }
        this.isToggle = !this.isToggle;
    }
    
    public OnBtnSend(){

    }
}
