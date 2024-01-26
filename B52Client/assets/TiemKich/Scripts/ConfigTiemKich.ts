

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConfigTiemKich  {

    public static NumbetRateList = [2,10,20,50,100,1000];
    public static PlaceBetList = [10000,50000,100000,500000,1000000,5000000];

    //server
    public static WAITING_TIME:number = 7;
    public static RESULT_TIME:number = 3;
    public static SPEED_RATE:number = 0.1;
}
