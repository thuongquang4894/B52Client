// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewToast extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    box:cc.Node = null;

    public show(content:string){
        this.label.string = content;
        this.box.active = true;
        this.box.scaleY = 0;

        cc.Tween.stopAllByTarget(this.box);
        cc.tween(this.box)
        .to(0.5,{scaleY:1},{easing:"backOut"})
        .delay(2)
        .to(0.5,{scaleY:0})
        .call(()=>{
            this.box.active = false;
        })
        .start();

    }
}
