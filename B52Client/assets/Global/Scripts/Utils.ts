// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils {

    public static FormatNumber(number){
        if(number < 1000){
            return number;
        }
        else if(number < 1000000){
            let result = number/1000;
            return result+"K";
        }
        else {
            let result = number/1000000;
            return result+"M";
        }
    }
}
