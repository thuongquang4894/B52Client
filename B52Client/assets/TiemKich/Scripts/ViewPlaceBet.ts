// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import UserData from "../../Global/Scripts/UserData";
import Utils from "../../Global/Scripts/Utils";
import SimulatorServerTiemKich from "../SimulatorServerTiemKich";
import ConfigTiemKich from "./ConfigTiemKich";
import { StatusGameTiemKich } from "./DataTiemKich";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewPlaceBet extends cc.Component {
    
    @property(cc.Node)
    waitingNextSession:cc.Node = null;

    @property(cc.Label)
    txtRewarding:cc.Label = null;

    @property(cc.Node)
    boxAuto:cc.Node = null;

    @property(cc.Toggle)
    toggleAuto:cc.Toggle = null;

    @property(cc.Toggle)
    toggleStop:cc.Toggle = null;

    @property(cc.Label)
    txtRateStop:cc.Label = null;

    @property(cc.Label)
    txtPlaceBet:cc.Label = null;

    @property(cc.Node)
    btnCuoc:cc.Node = null;

    @property(cc.Node)
    btnHuy:cc.Node = null;

    @property(cc.Node)
    btnDung:cc.Node = null;

    private statusGame:StatusGameTiemKich = StatusGameTiemKich.Waiting;
    private betAmount:number = 10000;
    public resetView(){
        this.btnCuoc.active = true;
        this.btnHuy.active = false;
        this.btnDung.active = true;
        this.txtPlaceBet.string = Utils.FormatNumber(this.betAmount);
    }

    public updateGame(data){
        
    }

    public init(status:number){
        this.statusGame = status;
        this.txtPlaceBet.string = Utils.FormatNumber(this.betAmount);
        switch(status){
            case StatusGameTiemKich.Waiting:
                this.btnCuoc.active = true;
                this.btnHuy.active = false;
                this.btnDung.active = false;
            break;
            case StatusGameTiemKich.Running:
                this.btnCuoc.active = true;
                this.btnHuy.active = false;
                this.btnDung.active = false;
            break;
            case StatusGameTiemKich.EndGame:
                this.btnCuoc.active = true;
                this.btnHuy.active = false;
                this.btnDung.active = false;
            break;
        }
    }

    public OnBtnToggleAuto(){

    }

    public OnBtnToggleStop(){

    }

    public OnBtnShowSettingStop(){

    }
    
    private isShowAuto:boolean = false;
    public OnBtnToggle(){
        this.isShowAuto = !this.isShowAuto;
        this.boxAuto.active = this.isShowAuto;
    }

    public OnBtnDescrease(){
        this.betAmount -= 1000;
        if(this.betAmount < 0) this.betAmount = 0;
        this.txtPlaceBet.string = Utils.FormatNumber(this.betAmount);
    }

    public OnBtnIncrease(){
        this.betAmount += 1000;
        this.txtPlaceBet.string = Utils.FormatNumber(this.betAmount);
    }

    public OnBtnAddAmount(event,amount){
        this.betAmount += parseInt(amount.toString()+"");
        this.txtPlaceBet.string = Utils.FormatNumber(this.betAmount);
    }

    public OnBtnCuoc (){
        if(this.betAmount <= 0) return;
        if(UserData.balance < this.betAmount)return;
        SimulatorServerTiemKich.Instance.requestPlaceBet(UserData.username,this.betAmount);
    }

    public OnBtnDung(){

    }

    public OnBtnHuy(){

    }
}
