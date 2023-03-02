define(['ServiceResponse'],function(ServiceResponse){ 
  let selectedRole = "";
  let createUser = {};
  return {
    onPreShow: function() {
      let self = this;
      this.resetUI();
      this.view.btnContinue.onClick = function(){
        self.view.flxUserNotFound.isVisible = false;
      };
      this.view.btnCreateUser.onClick = function() {
        self.createNewUser();
      };
      this.view.txtUsername.onEndEditing = function() {
        self.validateFields();
      };
      this.view.txtPhoneNo.onEndEditing = function() {
        self.validateFields();
      };
      this.view.txtEmail.onEndEditing = function() {
        self.validateFields();
      };
      this.view.txtUserId.onEndEditing = function() {
        self.validateFields();
      };
      this.view.lblRoleSelection.onTouchEnd = function() {
        if(self.view.flxSegRole.isVisible) {
          self.view.imgArrow.src = "downarrow1x.png";
          self.view.flxSegRole.isVisible = false;  
        } else {
          self.view.imgArrow.src = "uparrow1x.png";
          self.view.flxSegRole.isVisible = true;
        }
      };
      this.view.segRole.onRowClick = function() {
        let selectedvalue = self.view.segRole.selectedRowItems[0];
        kony.print("selectedvalue :: "+JSON.stringify(selectedvalue));
        selectedRole = selectedvalue.lblUserName;
        self.view.lblRoleSelection.text = selectedRole;
        self.view.imgArrow.src = "downarrow1x.png";
        self.view.flxSegRole.isVisible = false;
        self.validateFields();
      };
    },
    resetUI: function() {
      selectedRole = "";
      this.view.txtUsername.text = "";
      this.view.txtPhoneNo.text = "";
      this.view.txtEmail.text = "";
      this.view.txtUserId.text = "";
      this.view.imgArrow.src = "downarrow1x.png";
      this.view.btnCreateUser.skin = "sknbtn898A8DRounded";
      this.view.lblRoleSelection.text = "Please select role from drop down";
      this.view.btnCreateUser.setEnabled(false);
      this.view.flxSegRole.isVisible = false;
      this.view.flxUserNotFound.isVisible = false;
    },
    validateFields: function() {
      var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      //var phoneformat = /[0-9]/g;
      var phoneformat = /^\d+$/;
      let username = this.view.txtUsername.text;
      let phone = this.view.txtPhoneNo.text;
      let email = this.view.txtEmail.text;
      //let userid = this.view.txtUserId.text;
      //&& userid.length >= 3
      if(username.length >= 3 && phone.length >= 8 && phone.match(phoneformat)
         && email.match(mailformat) && selectedRole !== "") {
        createUser.userid = "";
        createUser.phoneno = phone.trim();
        createUser.emailid = email.trim();
        createUser.username = username.trim();
        createUser.role = selectedRole;
        //TODO : Change based on login
        createUser.retailerid = ServiceResponse.USER_ATTRIBUTES.retailerid;
        createUser.retailername = ServiceResponse.USER_ATTRIBUTES.retailername;
        this.view.btnCreateUser.setEnabled(true);
        this.view.btnCreateUser.skin = "sknbtn2c3d73Rounded18px";
      } else {
        this.view.btnCreateUser.setEnabled(false);
        this.view.btnCreateUser.skin = "sknbtn898A8DRounded";
      }
    },
    createNewUser: function() {
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var retailerManager = applicationManager.getRetailerManager();
      retailerManager.createUser(createUser,this.createUserSucess,this.createUserError);
    },
    createUserSucess: function(sucess) {
      //alert(sucess);
      kony.application.dismissLoadingScreen();
      this.resetUI();
      this.view.flxUserNotFound.isVisible = true;
    },
    createUserError: function(error) {
      kony.application.dismissLoadingScreen();
      if(error.dbpErrMsg)
        alert(error.dbpErrMsg);
    }
  };
});