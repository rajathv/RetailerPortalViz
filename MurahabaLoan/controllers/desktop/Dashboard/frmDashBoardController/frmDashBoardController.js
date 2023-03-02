define(['ServiceResponse'], function(ServiceResponse){ 
	return {
      onPreShow: function() {
        
        var retailername = ServiceResponse.USER_ATTRIBUTES.retailername;
        var dcontent = this.view.lblContent.text;
        dcontent = dcontent.replace("%", retailername);
        this.view.lblContent.text = dcontent;
      },

      onpostlogin: function(){
        var self = this;
        kony.print("Timerstrat");
        kony.application.registerForIdleTimeout(10, self.logoutFunction.bind(this));
      },
      logoutFunction: function(){
        kony.print("trigger");
        applicationManager.getAuthManager().logout(this.logoutSucess,this.logoutError);
      },
      logoutSucess: function(success){
        kony.print("call back success");
        var x = new kony.mvc.Navigation("frmLogin");
        x.navigate();
      },
      logoutError: function(error){
         kony.print("call back error");
        var x = new kony.mvc.Navigation("frmLogin");
        x.navigate();
      },


      
      
    };
});