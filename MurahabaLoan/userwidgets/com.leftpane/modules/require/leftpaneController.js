define(['ServiceResponse'],function(ServiceResponse) {

	return {
		onPreShow: function() {
          var user = ServiceResponse.USER_ATTRIBUTES;
          this.view.lblVoucher.text = "Voucher MI";
          if((user.role).toLowerCase() !== "admin") {
            this.view.flxCreateNewUser.isVisible = false;
            this.view.flxModifyUser.isVisible = false;
            this.view.flxResetPassword.isVisible = false;  
          } else {
            this.view.flxCreateNewUser.isVisible = true;
            this.view.flxModifyUser.isVisible = true;
            this.view.flxResetPassword.isVisible = true;  
          }
        }
	};
});