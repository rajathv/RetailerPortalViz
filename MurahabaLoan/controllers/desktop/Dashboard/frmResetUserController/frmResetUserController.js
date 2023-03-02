define(['ServiceResponse'],function(ServiceResponse){
  let retailerList = [];
  let selecteduser = {};
  return {
    onPreShow: function(){
      let self = this;
      this.resetUI();
      this.view.txtSearchUser.onBeginEditing = function() {
        self.view.flxSegmentSearchList.isVisible = true;
      };
      this.view.segUsers.onRowClick = function(eventId) {
        kony.print(eventId.selectedRowItems[0]);
        selecteduser = eventId.selectedRowItems[0];
        self.view.flxSegmentSearchList.isVisible = false;
        self.mapUserDetails(selecteduser);
      };
      this.view.btnClose.onClick = function() {
        self.resetUI();
        self.view.segUsers.setData(retailerList);
      };
      this.view.btnResetUserPassword.onClick = function() {
        self.view.flxConfirmationPopup.isVisible = true;
      };
      this.view.btnNo.onClick = function() {
        self.view.flxConfirmationPopup.isVisible = false;
      };
      this.view.btnYes.onClick = function() {
		self.resetUserpassword();
      };
      this.view.btnContinue.onClick = function() {
        self.resetUI();
      };
      this.view.txtSearchUser.onTextChange = function(eventId) {
        let searchText = eventId.text;
        if(searchText.length > 1) {
          let filteredData = retailerList.filter(
            data => (data.UserId).includes(searchText));
          kony.print(filteredData);
          self.view.segUsers.setData(filteredData);
          if(filteredData.length === 0) {
            self.view.flxSegmentSearchList.isVisible = false;
            self.view.flxUserNotFound.isVisible = true;
          }
        } else {
          self.view.segUsers.setData(retailerList);
        }
      };
      this.view.btnSearchAgain.onClick = function(){
        self.view.flxUserNotFound.isVisible = false;
        self.view.txtSearchUser.text = "";
        self.view.segUsers.setData(retailerList);
      };
    },
    resetUI: function(){
      this.view.flxUserSearch.isVisible = true;
      this.view.flxUserDetails.isVisible = false;
      this.view.flxUserNotFound.isVisible = false;
      this.view.flxConfirmationPopup.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxSegmentSearchList.isVisible = false;
    },
    onPostShow: function() {
      this.getAllUserList();
    },
    getAllUserList: function() {
      let param = {
        "retailerid": ServiceResponse.USER_ATTRIBUTES.retailerid
      };
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var retailerManager = applicationManager.getRetailerManager();
      retailerManager.getAllUser(param,this.getListSucess,this.getListError);
    },
    getListSucess: function(response) {
      kony.application.dismissLoadingScreen();
      this.view.txtSearchUser.setEnabled(true);
      this.view.segUsers.widgetDataMap = {
        lblUserName: "UserId"
      };
      this.view.segUsers.setData(response.retailer);
      retailerList = response.retailer;
    },
    getListError: function(error) {
      kony.application.dismissLoadingScreen();
      this.view.flxUserNotFound.isVisible = true;
      this.view.txtSearchUser.setEnabled(false);
    },
    mapUserDetails: function(data) {
      this.view.flxUserDetails.isVisible = true;
      this.view.txtUsername.text = data.UserName;
      this.view.txtEmail.text = data.EmailId;
      this.view.txtPhoneNumber.text = data.PhoneNo;
      this.view.txtUserId.text = data.UserId;
      this.view.txtRole.text = data.Role;
      this.view.txtStatus.text = (data.Status === "SID_ACTIVE")?"Active":"Inactive";
      this.view.txtUsername.setEnabled(false);
      this.view.txtRole.setEnabled(false);
      this.view.txtPhoneNumber.setEnabled(false);
      this.view.txtEmail.setEnabled(false);
      this.view.txtUserId.setEnabled(false);
      this.view.txtStatus.setEnabled(false);
    },
    resetUserpassword: function() {
      let password = this.randomString(6, "aA!#");
      kony.print("Random password :: "+password);
      var request = {
        "userid"     : selecteduser.UserId,
        "password": password.trim()
      };
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var authManager = applicationManager.getAuthManager();
      authManager.resendPassword(request,this.resendPasswordSuccess,this.resendPasswordError);
    },
    resendPasswordSuccess: function(sucess) {
      kony.application.dismissLoadingScreen();
      this.view.flxAcknowledgement.isVisible = true;
    },
    resendPasswordError: function(error) {
      kony.application.dismissLoadingScreen();
      alert(error);
    },
    randomString: function(length, chars) {
      var mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '!@#$%';
      var result = '';
      for (var i = length; i > 0; --i) {
        result += mask[Math.round(Math.random() * (mask.length - 1))];
      }
      return result;
    }
  };
});