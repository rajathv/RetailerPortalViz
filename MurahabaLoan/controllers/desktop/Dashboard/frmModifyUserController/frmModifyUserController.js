define(['ServiceResponse'],function(ServiceResponse){ 
  let retailerList = [];
  let selecteduser = {};
  let selectedRole = "",selectedStatus = "";
  let modifyUser = {};
  return {
    onPreShow: function() {
      let self = this;
      this.resetUI();
      this.view.btnMContinue.onClick = function() {
        this.view.flxUserModified.isVisible = false;
      };
      this.view.txtSearchUser.onBeginEditing = function() {
        self.view.flxSegmentSearchList.isVisible = true;
      };
      this.view.btnModifyUser.onClick = function() {
        self.modifyUser();
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
      this.view.btnMContinue.onClick = function() {
        self.resetUI();
        self.getAllUserList();
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
      this.view.btnSearchAgain.onClick = function(){
        self.view.flxUserNotFound.isVisible = false;
        self.view.txtSearchUser.text = "";
        self.view.segUsers.setData(retailerList);
      };
      this.view.btnRoleSelection.onClick = function() {
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
      this.view.btnStatusSelection.onClick = function() {
        if(self.view.flxSegStatus.isVisible) {
          self.view.imgActiveArrow.src = "downarrow1x.png";
          self.view.flxSegStatus.isVisible = false;  
        } else {
          self.view.imgActiveArrow.src = "uparrow1x.png";
          self.view.flxSegStatus.isVisible = true;
        }
      };
      this.view.segActive.onRowClick = function() {
        let selectedvalue = self.view.segActive.selectedRowItems[0];
        kony.print("selectedvalue :: "+JSON.stringify(selectedvalue));
        selectedStatus = (selectedvalue.lblUserName == "Active") ? "SID_ACTIVE" : "SID_INACTIVE";
        self.view.lblActiveSelection.text = selectedvalue.lblUserName;
        self.view.imgActiveArrow.src = "downarrow1x.png";
        self.view.flxSegStatus.isVisible = false;
        self.validateFields();
      };
    },
    onPostShow: function() {
      this.getAllUserList();
    },
    resetUI: function() {
      this.view.flxUserSearch.isVisible = true;
      this.view.flxUserDetails.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxSegmentSearchList.isVisible = false;
      this.view.flxUserNotFound.isVisible = false;
      this.view.flxModifiedSucess.isVisible = false;
      this.view.flxSegRole.isVisible = false;
      this.view.flxSegStatus.isVisible = false;
      this.view.txtUserId.setEnabled(false);
      this.view.txtSearchUser.text = "";
      this.view.imgArrow.src = "downarrow1x.png";
      this.view.imgActiveArrow.src = "downarrow1x.png";
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
      this.view.txtPhoneNo.text = data.PhoneNo;
      this.view.txtUserId.text = data.UserId;
      this.view.lblRoleSelection.text = data.Role;
      this.view.lblActiveSelection.text = (data.Status === "SID_ACTIVE")?"Active":"Inactive";
      selectedRole = data.Role;
      selectedStatus = data.Status;
    },
    validateFields: function() {
      var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      //var phoneformat = /[0-9]/g;
      var phoneformat = /^\d+$/;
      let username = this.view.txtUsername.text;
      let phone = this.view.txtPhoneNo.text;
      let email = this.view.txtEmail.text;
      let userid = this.view.txtUserId.text;
      if(username.length >= 3 && phone.length >= 8 && phone.match(phoneformat)
         && email.match(mailformat) && userid.length >= 3 
         && selectedRole !== "" && selectedStatus !== "") {
        modifyUser.userid = userid.trim();
        modifyUser.phoneno = phone.trim();
        modifyUser.emailid = email.trim();
        modifyUser.username = username.trim();
        modifyUser.role = selectedRole;
        modifyUser.status = selectedStatus;
        //TODO : Change based on login
        modifyUser.retailerid = ServiceResponse.USER_ATTRIBUTES.retailerid;
        modifyUser.retailername = ServiceResponse.USER_ATTRIBUTES.retailername;
        this.view.btnModifyUser.setEnabled(true);
        this.view.btnModifyUser.skin = "sknbtn2c3d73Rounded18px";
      } else {
        this.view.btnModifyUser.setEnabled(false);
        this.view.btnModifyUser.skin = "sknbtn898A8DRounded";
      }
    },
    modifyUser: function() {
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var retailerManager = applicationManager.getRetailerManager();
      retailerManager.modifyUser(modifyUser,this.modifyUserSucess,this.modifyUserError);
    },
    modifyUserSucess: function(sucess) {
      kony.application.dismissLoadingScreen();
      this.view.flxModifiedSucess.isVisible = true;
    },
    modifyUserError: function(error) {
      kony.application.dismissLoadingScreen();
      if(error.dbpErrMsg)
        alert(error.dbpErrMsg);
    }
  };
});