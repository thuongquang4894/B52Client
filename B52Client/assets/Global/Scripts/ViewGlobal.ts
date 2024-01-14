// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ViewToast from "./ViewToast";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewGlobal extends cc.Component {

    @property(ViewToast)
    viewToast:ViewToast = null;

    public static Instance : ViewGlobal = null;
    start () {
        ViewGlobal.Instance = this;
        cc.game.addPersistRootNode(this.node);
    }

}
