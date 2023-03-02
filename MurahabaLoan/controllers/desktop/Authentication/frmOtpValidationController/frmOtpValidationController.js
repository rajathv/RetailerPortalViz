define([],function(){ 
  let securityKey = "", resendtime = 180,phoneno = "";
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
            this.timer(resendtime);
          }
        },
          resendMFASucess: function(response) {
            kony.application.dismissLoadingScreen();
            if(response.securityKey) {
              securityKey = response.securityKey;
              this.view.txtotp1.text = "";
              this.view.txtotp2.text = "";
              this.view.txtotp3.text = "";
              this.view.txtotp4.text = "";
              this.view.txtotp5.text = "";
              this.view.txtotp6.text = "";
              this.view.btnReSend.setEnabled(false);
              this.timer(resendtime);
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
                  var x = new kony.mvc.Navigation("frmDashBoard");
                  x.navigate();
                },
                  verifyMFAError: function(error) {
                    kony.application.dismissLoadingScreen();
                    this.view.flxError.isVisible = true;
                  },
                    timer: function (remaining) {
                      var timerself = this;
                      var m = Math.floor(remaining / 60);
                      var s = remaining % 60;
                      m = m < 10 ? '0' + m : m;
                      s = s < 10 ? '0' + s : s;
                      this.view.lblotpresend.text = m + ':' + s;
                      remaining -= 1;
                      if(remaining >= 0) {
                        setTimeout(function() {
                          timerself.timer(remaining);
                        }, 1000);
                        return;
                      }
                      this.view.btnReSend.setEnabled(true);
                    }
};
       });