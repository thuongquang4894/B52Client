// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ListView from "../../Global/Scripts/ListView";
import Utils from "../../Global/Scripts/Utils";
import ViewItemBetting from "./ViewItemBetting";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewBetting extends cc.Component {

    @property(cc.Label)
    txtSession: cc.Label = null;

    @property(cc.Label)
    txtTotalBet: cc.Label = null;

    @property(ListView)
    listItem : ListView = null;

    private bettingList = null;
    public resetView(){
        this.txtSession.string = "-/-";
        this.txtTotalBet.string = "-/-";
        this.listItem.clear();
    }

    public init(data,sessionId){
        this.bettingList = data;
        this.updateSessionId(sessionId);
        this.txtTotalBet.string = Utils.FormatNumberWithCommon(this.getTotalBet());
        this.listItem.init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this.listItem.notifyDataSetChanged(data);
    }

    public updateSessionId(sessionId){
        this.txtSession.string = "#"+sessionId;
    }

    public updateGame(data){
        cc.log("updateGame:"+JSON.stringify(data));
        this.bettingList = data;
        this.txtTotalBet.string = Utils.FormatNumberWithCommon(this.getTotalBet());
        this.listItem.notifyDataSetChanged(data);
    }

    private getTotalBet(){
        let totalBet = 0;
        for(var i=0;i<this.bettingList.length;i++){
            totalBet += parseInt(this.bettingList[i]["bet"]);
        }
        return totalBet;
    }

    public bindcallfunc(node: cc.Node, info, i) {
        node.getComponent(ViewItemBetting).init(info);
    }

    public getItemType(data, index) {
        return 0;
    } 
}
