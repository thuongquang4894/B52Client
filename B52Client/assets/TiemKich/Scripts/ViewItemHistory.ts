// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewItemHistory extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property([cc.Color])
    colorList:cc.Color[] = [];

    @property([Number])
    numberList:Number[] = [];

    public init(rate){
        this.label.string = rate+"x";
        for(var i=0;i<this.numberList.length;i++){
            if(rate <= this.numberList[i]){
                this.label.node.color = this.colorList[i];
                return;
            }
        }
    }
}
