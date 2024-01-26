// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ConfigTiemKich from "./ConfigTiemKich";
import ResourcesTiemKich from "./ResourcesTiemKich";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewItemHistory extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    imgBg:cc.Sprite = null;

    public resetView(){
        this.label.string = "-/-";
    }

    public init(rate){
        this.label.string = rate+"x";
        
        for(var i=0;i<ConfigTiemKich.NumbetRateList.length;i++){
            if(rate <= ConfigTiemKich.NumbetRateList[i]){
                this.imgBg.spriteFrame = ResourcesTiemKich.Instance.bgRateBetList[i];
                return;
            }
        }
    }
}
