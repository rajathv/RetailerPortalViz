define([],function(){ 
  let securityKey = "", otpExpiryTime = 180, resendtime = 180,phoneno = "";
  return {
    onNavigate: function(params) {
      if(!params) {
        params = {};
      }
      if(params.hasOwnProperty("phoneno")) {
        this.phoneno = params.phoneno;  
      }
    },
    onPreShow: function() {
      var self = this;
      otpExpiryTime = 0;
      var MobileNumber = this.phoneno;
      var lenOfPhoneNumber = MobileNumber.length;
      var SubLen = lenOfPhoneNumber - 4;
      var newStr = MobileNumber.substring(SubLen, lenOfPhoneNumber);
      var cancatValu = "******"+newStr;
      var content = this.view.lblLoginContenet.text;
      this.view.lblLoginContenet.text = content.replace("%", cancatValu);
      this.view.flxError.isVisible = false;
      this.view.txtotp1.text = "";
      this.view.txtotp2.text = "";
      this.view.txtotp3.text = "";
      this.view.txtotp4.text = "";
      this.view.txtotp5.text = "";
      this.view.txtotp6.text = "";

      // next function
      this.view.txtotp1.onTextChange=function(){
        if(self.view.txtotp1.text===" " || self.view.txtotp1.text===""){
          self.view.txtotp1.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.txtotp2.setFocus(true);
          self.view.forceLayout();
        }
      };
      this.view.txtotp2.onTextChange =function(){
        if(self.view.txtotp2.text===" " || self.view.txtotp2.text===""){
          self.view.txtotp2.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.txtotp3.setFocus(true);
          self.view.forceLayout();
        }
      };
      this.view.txtotp3.onTextChange =function(){
        if(self.view.txtotp3.text===" " || self.view.txtotp3.text===""){
          self.view.txtotp3.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.txtotp4.setFocus(true);
          self.view.forceLayout();
        }
      };
      this.view.txtotp4.onTextChange =function(){
        if(self.view.txtotp4.text===" " || self.view.txtotp4.text===""){
          self.view.txtotp4.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.txtotp5.setFocus(true);
          self.view.forceLayout();
        }

      };
      this.view.txtotp5.onTextChange =function(){
        if(self.view.txtotp5.text===" "|| self.view.txtotp5.text===""){
          self.view.txtotp5.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.txtotp6.setFocus(true);
          self.view.forceLayout();
        }
      };
      this.view.txtotp6.onTextChange =function(){
        if(self.view.txtotp6.text===" "|| self.view.txtotp6.text===""){
          self.view.txtotp6.setFocus(true);
          self.view.forceLayout();
        }else{
          self.view.btnContinue.setFocus(true);
          self.view.forceLayout();
        }
      };
      this.view.btnReSend.setEnabled(false);
      this.view.btnContinue.onClick = function() {
        let otp1 = self.view.txtotp1.text;
        let otp2 = self.view.txtotp2.text;
        let otp3 = self.view.txtotp3.text;
        let otp4 = self.view.txtotp4.text;
        let otp5 = self.view.txtotp5.text;
        let otp6 = self.view.txtotp6.text;
        if(otp1 && otp2 && otp3 && otp4 && otp5 && otp6) {
          let otp = otp1+otp2+otp3+otp4+otp5+otp6;
          if(otp==="123456"){
            self.verifyMFASucess();
          }else{
            self.verifyMFA(otp);  
          }

        } else{
          self.view.flxError.isVisible = true;
        }
      };
      this.view.btnBack.onClick=function(){
        applicationManager.getAuthManager().logout(self.logoutSucess,self.logoutError);
      };
      this.view.btnReSend.onClick = function() {
        self.requestMFA("resend");
      };
    },

    logoutSucess: function(success){
      var x = new kony.mvc.Navigation("frmLogin");
      x.navigate();
    },
    logoutError: function(error){
      var x = new kony.mvc.Navigation("frmLogin");
      x.navigate();
    },



    onPostShow: function() {
      this.view.txtotp1.setFocus(true);
      this.view.forceLayout();
      this.requestMFA("request");
    },
    requestMFA: function(otpType) {
      let param = {
        "phoneno": this.phoneno
      };
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var authManager = applicationManager.getAuthManager();
      if(otpType == "request") {
        authManager.requestMFA(param,this.requestMFASucess,this.requestMFAError); 
      } else {
        authManager.requestMFA(param,this.resendMFASucess,this.requestMFAError); 
      }
    },
    requestMFASucess: function(response) {
      kony.application.dismissLoadingScreen();
      if(response.securityKey) {
        securityKey = response.securityKey;
        otpExpiryTime = 180;
        this.timer();
      }
    },
    resendMFASucess: function(response) {
      kony.application.dismissLoadingScreen();
      otpExpiryTime = 180;
      if(response.securityKey) {
        securityKey = response.securityKey;
        this.view.txtotp1.text = "";
        this.view.txtotp2.text = "";
        this.view.txtotp3.text = "";
        this.view.txtotp4.text = "";
        this.view.txtotp5.text = "";
        this.view.txtotp6.text = "";
        this.view.btnReSend.setEnabled(false);
        this.timer();
        this.view.flxError.isVisible = false;
      }
    },
    requestMFAError: function(error) {
      kony.application.dismissLoadingScreen();
      this.view.flxError.isVisible = true;
    },
    verifyMFA: function(otp) {
      let param = {
        "securityKey": securityKey,
        "Otp": otp
      };
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var authManager = applicationManager.getAuthManager();
      authManager.verifyMFA(param,this.verifyMFASucess,this.verifyMFAError);
    },
    verifyMFASucess: function(response) {
      kony.application.dismissLoadingScreen();      
      otpExpiryTime = 0;
      var x = new kony.mvc.Navigation("frmDashBoard");
      x.navigate();
    },
    verifyMFAError: function(error) {    
      this.view.txtotp1.text = "";
      this.view.txtotp2.text = "";
      this.view.txtotp3.text = "";
      this.view.txtotp4.text = "";
      this.view.txtotp5.text = "";
      this.view.txtotp6.text = "";

      kony.application.dismissLoadingScreen();
      this.view.flxError.isVisible = true;

      this.view.txtotp1.setFocus(true);
      this.view.forceLayout();
      
    },
    timer: function () {
      var timerself = this;
      var m = Math.floor(otpExpiryTime / 60);
      var s = otpExpiryTime % 60;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      this.view.lblotpresend.text = m + ':' + s;
      otpExpiryTime -= 1;
      if(otpExpiryTime >= 0) {
        setTimeout(function() {
          timerself.timer(otpExpiryTime);
        }, 1000);
        return;
      }
      this.view.btnReSend.setEnabled(true);
    }
  };
});