define(['ServiceResponse'],function(ServiceResponse){ 
  let validatePasswordFields= {};
  let numericPattern = /[0-9]/g;
  let spcharPattern = /[!@#%?]/g;
  return {
    onPreShow: function(){
      var self = this;
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.onClick = function() {
        self.validateFields();
      };
      this.view.txtPassword.onTextChange = function() {
        self.onTextChangePassword();
      };
      this.view.txtPassword.onEndEditing = function() {
        let isValidation = true;
        for(let validatePwd in validatePasswordFields) {
          kony.print(validatePwd+":"+validatePasswordFields[validatePwd]);
          if(!validatePasswordFields[validatePwd]) 
            isValidation = false;
        }
        if(isValidation)
          self.view.btnContinue.setEnabled(true);
      };
      this.view.flxShowPwd.onClick=function(){
        ///showpwd.png   hidepwd
        if(self.view.imgeye.src==="hidepwd.png"){
          self.view.txtPassword.secureTextEntry=false;
          self.view.imgeye.src="showpwd.png";
        }else{
          self.view.txtPassword.secureTextEntry=true;
          self.view.imgeye.src="hidepwd.png";
        }
      };
      this.view.flxShowRenewpwd.onClick=function(){

        if(self.view.imgshowpwdnew.src==="hidepwd.png"){
          self.view.txtRepeatPassword.secureTextEntry=false;
          self.view.imgshowpwdnew.src="showpwd.png";
        }else{
          self.view.txtRepeatPassword.secureTextEntry=true;
          self.view.imgshowpwdnew.src="hidepwd.png";
        }
      };
    },
    validateFields: function() {
      let password = this.view.txtPassword.text;
      let repeatPassword = this.view.txtRepeatPassword.text;
      if(!password || !repeatPassword) {
        alert("Fill all the fields");
      } else if(password !== repeatPassword) {
        alert("Password not matched");
      } else {
        //todo: have map the userid based on login
        var request = {
          "userid"     : ServiceResponse.USER_ATTRIBUTES.user_id,
          "resetpassword": password.trim()
        };
        kony.application.showLoadingScreen("", "Loading", "", "", "", "");
        var authManager = applicationManager.getAuthManager();
        authManager.resetPassword(request,this.resetPasswordSuccess,this.resetPasswordError);
      }
    },
    resetPasswordSuccess: function(success){
      kony.application.dismissLoadingScreen();
      alert("Password is successfully reset");
      var x = new kony.mvc.Navigation("frmLogin");
      x.navigate();
    },
    resetPasswordError: function(error){
      kony.application.dismissLoadingScreen();
      alert(error);
    },
    onTextChangePassword: function() {
      let self = this;
      let lowercasepattern = /[a-z]/g;
      let uppercasepattern = /[A-Z]/g;
      let password = this.view.txtPassword.text;
      validatePasswordFields = {"length":false,"alphachar":false,"specialchars":false,"numeric":false};
      if(password.length >= 6) {
        validatePasswordFields.length = true;
        self.view.img1.src = "acme.png";
      } else {
        self.view.img1.src = "tick1x.png";
      }
      if(password.match(lowercasepattern) && password.match(uppercasepattern)) {
        validatePasswordFields.alphachar = true;
        self.view.img2.src = "acme.png";
      } else {
        self.view.img2.src = "tick1x.png";
      }
      if(password.match(numericPattern)) {
        validatePasswordFields.numeric = true;
        self.view.img3.src = "acme.png";
      } else {
        self.view.img3.src = "tick1x.png";
      }
      if(password.match(spcharPattern)) {
        validatePasswordFields.specialchars = true;
        self.view.img4.src = "acme.png";
      } else {
        self.view.img4.src = "tick1x.png";
      }
    }
  };
});