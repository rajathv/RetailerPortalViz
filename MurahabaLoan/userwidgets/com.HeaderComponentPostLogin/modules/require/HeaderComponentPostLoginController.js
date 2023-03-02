define(['ServiceResponse'],function(ServiceResponse) {

  return {
    onPreShow: function() {
      this.view.flxActionbar.isVisible = true;
      this.view.flxLogout.isVisible = false;
      this.view.btnSignup.text = ServiceResponse.USER_ATTRIBUTES.username;
      this.view.btnRetailerName.text = ServiceResponse.USER_ATTRIBUTES.username;
      this.setActions();
    },
    setActions : function() {
      var self = this;
      this.view.btnSignup.onClick = function() {
        if(self.view.flxLogout.isVisible) {
          self.view.flxLogout.isVisible = false;
        } else {
          self.view.flxLogout.isVisible = true;
        }
      };
      this.view.btnRetailerName.onClick = function() {
        self.view.flxLogout.isVisible = false;
      };
      this.view.btnLogout.onClick = function() {
        self.view.flxLogout.isVisible = false;
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
    }
  };
});