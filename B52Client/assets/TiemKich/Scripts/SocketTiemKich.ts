// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SocketTiemKich extends cc.Component {

    public static Instance:SocketTiemKich = null;

    protected onLoad(): void {
        SocketTiemKich.Instance = this;
    }

    public responseSnapShot(data){
        cc.systemEvent.emit("snapshot_tiemkich",data);
    }

    public responseUpdateGame(data){
        cc.systemEvent.emit("updateGame_tiemkich",data);
    }

    public responseLoadConfig(data){
        cc.systemEvent.emit("loadConfig_tiemkich",data);
    }

    public responseHistory(data){
        cc.systemEvent.emit("history_tiemkich",data);
    }
    
    public responseBetting(data){
        cc.systemEvent.emit("betting_tiemkich",data);
    }
}
