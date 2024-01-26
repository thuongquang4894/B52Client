// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils {

    public static ReduceName(username:string){
        if(username.length > 12){
            return username.slice(0,12)+"...";
        }
        return username;
    }

    public static FormatNumber(number){
        if(number <= 10000){
            return Utils.FormatNumberWithCommon(number);
        }
        else if(number < 1000000){
            let result = (number/1000).toFixed(2);
            return result+"K";
        }
        else {
            let result = (number/1000000).toFixed(2);
            return result+"M";
        }
    }

    public static FormatNumberWithCommon(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
