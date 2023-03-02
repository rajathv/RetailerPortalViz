define(['ServiceResponse'],function(ServiceResponse){ 
  return {
    onPreShow: function() {
      let self = this;
      this.resetUI();
      this.view.btnContinue.onClick = function() {
        self.validateFields();
      };
    },
    resetUI: function() {
      this.view.txtEmailorPhone.text = "";
      this.view.txtPassword.text = "";
      this.view.flxError.isVisible = false;
      this.view.btnContinue.top = "105px";
      this.view.forceLayout();
    },
    validateFields: function() {
      let username = this.view.txtEmailorPhone.text;
      let password = this.view.txtPassword.text;
      if(!username || !password) {
        this.view.flxError.isVisible = true;
        this.view.btnContinue.top = "20px";
      } else {
        this.resetUI();
        let inputparam = {
          "username"  : username,
          "password": password
        };
        kony.application.showLoadingScreen("", "Loading", "", "", "", "");
        applicationManager.getAuthManager().login(inputparam,this.loginSucess,this.loginError);
      }
    },
    loginSucess: function(response) {
      kony.application.dismissLoadingScreen();
      ServiceResponse.USER_ATTRIBUTES = response;
      if(response.status !== "SID_ACTIVE") {
        var x = new kony.mvc.Navigation("frmResetPassword");
        x.navigate();  
      } else {
        var phoneno = ServiceResponse.USER_ATTRIBUTES.phoneno;
        var mfa = new kony.mvc.Navigation("frmOtpValidation");
        var params = {"phoneno": phoneno};
        mfa.navigate(params);    
//         var mfa = new kony.mvc.Navigation("frmDashBoard");
//         mfa.navigate();
      }
    },
    loginError: function(error) {
      this.view.flxError.isVisible = true;
      this.view.btnContinue.top = "20px";
      kony.application.dismissLoadingScreen();
    }
  };
});