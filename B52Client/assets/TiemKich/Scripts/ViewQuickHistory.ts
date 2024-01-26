// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ViewItemHistory from "./ViewItemHistory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewQuickHistory extends cc.Component {

    @property([ViewItemHistory])
    items: ViewItemHistory[] = [];

    private historyList:number[] = [];

    public resetView(){
        for(var i=0;i<this.items.length;i++){
            this.items[i].resetView();
        }
    }

    public init(historyList:number[]){
        this.historyList = historyList;
        for(var i=0;i<this.items.length;i++){
            if(i <= historyList.length - 1){
                this.items[i].init(historyList[i]);
            }
        }
    }

    public updateGame(data){
        
    }

    public add(amount){
        if(this.historyList.length == this.items.length){
            this.historyList = this.historyList.splice(0,1);
        }
        this.historyList.push(amount);
        this.init(this.historyList);
    }

    public onBtnShow(){
        cc.systemEvent.emit("button_show_full_history",this.historyList);
    }
}
