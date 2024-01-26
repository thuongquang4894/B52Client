// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ViewItemHistory from "./ViewItemHistory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewFullHistory extends cc.Component {

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    box:cc.Node = null;

    private itemList:ViewItemHistory[] = [];
    private historyList =  [];
    protected onLoad(): void {
        this.itemList = [];
        for(var i=0;i<this.content.childrenCount;i++){
            this.itemList.push(this.content.children[i].getComponent(ViewItemHistory));
        }
    }

    public init(historyList:number[]){
        this.historyList = historyList;
        for(var i=0;i<this.itemList.length;i++){
            if(i <= historyList.length - 1){
                this.itemList[i].init(historyList[i]);
            }
        }
    }

    protected onEnable(): void {
        cc.systemEvent.on("button_show_full_history",this.show.bind(this));
    }

    protected onDisable(): void {
        cc.systemEvent.off("button_show_full_history",this.show.bind(this));
    }

    public show(data){
        for(var i=0;i<this.itemList.length;i++){
            if(i <= data.length - 1){
                this.itemList[i].init(data[i]);
            }
            else{
                this.itemList[i].resetView();
            }
        }
        this.box.scaleY = 0;
        this.box.active = true;
        cc.Tween.stopAllByTarget(this.box);
        cc.tween(this.box)
        .to(0.2,{scaleY:1})
        .start();
    }

    public hide(){
        cc.Tween.stopAllByTarget(this.box);
        cc.tween(this.box)
        .to(0.2,{scaleY:0})
        .call(()=>{
            this.box.active = false;
        })
        .start();
    }
    
}
