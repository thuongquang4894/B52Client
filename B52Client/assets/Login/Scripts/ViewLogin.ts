import ViewGlobal from "../../Global/Scripts/ViewGlobal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewLogin extends cc.Component {

    @property(cc.EditBox)
    username: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    start(){
        this.username.string = "";
        this.password.string = "";
    }

    onBtnClick(){
        if(this.username.string == ""){
            ViewGlobal.Instance.viewToast.show("Chưa nhập tên đăng nhập!");
            return;
        }

        if(this.password.string == ""){
            ViewGlobal.Instance.viewToast.show("Chưa nhập mật khẩu!");
            return;
        }
        
        cc.director.loadScene("TiemKich");
    }
}
