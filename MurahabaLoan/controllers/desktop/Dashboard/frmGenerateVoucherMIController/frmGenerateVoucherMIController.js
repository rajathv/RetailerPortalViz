define(['ServiceResponse'],function(ServiceResponse){
  let voucherStatus = {"CREATED" : "CREATED",
                       "Redeemed" : "REDEEMED",
                       "Unutilised" : "UNUTILISED",
                       "Cancelled" : "CANCELLED",
                       "Expired" : "EXPIRED",
                       "All" : "All"
                      };
  let selectedStatus = "",startDate = "",endDate = "";
  let voucherData = [];
  return {
    onPreShow: function() {
      var self = this;
      selectedStatus = "";
      startDate = "";
      endDate = "";
      this.resetUI();
      this.view.leftpane.lblVoucher.text = "Voucher MI";
      this.view.btnGenerateVoucher.onClick = function() {
        self.getVoucherMI();
      };
      this.view.btnDownloadVoucher.onClick = function() {
        self.downloadVoucherData();        
      };
      this.view.btnSelectStatus.onClick = function() {
        if(self.view.flxSegStatus.isVisible) {
          self.view.flxSegStatus.isVisible = false;
        } else {
          self.view.flxSegStatus.isVisible = true;  
        }
      };
      this.view.segStatus.onRowClick = function(eventId) {
        kony.print("event :: "+JSON.stringify(eventId.selectedRowItems[0]));
        selectedStatus = eventId.selectedRowItems[0].lblUserName;
        kony.print("selectedStatus :: "+selectedStatus);
        self.view.lblVoucherSts.text = selectedStatus;
        self.view.flxSegStatus.isVisible = false;
        self.validatefields();
      };
      this.view.CalenderStartDate.onSelection = function(eventId) {
        let day = self.view.CalenderStartDate.day;
        let month = self.view.CalenderStartDate.month;
        let year = self.view.CalenderStartDate.year;
        day = day < 10 ? "0"+day : day;
        month = month < 10 ? "0"+month : month;
        startDate = year+"-"+month+"-"+day;
        self.validatefields();
      };
      this.view.CalenderEndDate.onSelection = function(eventId) {
        let day = self.view.CalenderEndDate.day;
        let month = self.view.CalenderEndDate.month;
        let year = self.view.CalenderEndDate.year;
        day = day < 10 ? "0"+day : day;
        month = month < 10 ? "0"+month : month;
        endDate = year+"-"+month+"-"+day;
        self.validatefields();
      };
      this.view.txtSearchVoucher.onEndEditing = function() {
        self.validatefields();
      };
    },
    resetUI: function() {
      selectedStatus = "";
      startDate = "";
      endDate = "";
      this.view.flxscrollvoucherlist.isVisible = false;
      this.view.flxSegStatus.isVisible = false;
      this.view.txtSearchVoucher.text = "";
      this.view.CalenderStartDate.text = "";
      this.view.CalenderEndDate.text = "";
      this.view.lblDownloadMessage.isVisible = false;
      this.view.lblDownloadMessage.text = "% records are ready to download";
      this.view.btnDownloadVoucher.isVisible = false;
      this.view.btnGenerateVoucher.isVisible = true;
      this.view.btnGenerateVoucher.setEnabled(false);
      this.view.btnGenerateVoucher.skin = "btn919191GreyBorderWhite";
      this.view.lblVoucherSts.text = "Voucher Status";
      this.view.CalenderStartDate.placeholder = "voucher generate start date";
      this.view.CalenderEndDate.placeholder = "voucher generate end date";
    },
    validatefields: function() {
      var phoneformat = /^\d+$/;
      var phone = this.view.txtSearchVoucher.text;
      if(phone.match(phoneformat) || selectedStatus !== "" || (startDate !== "" && endDate !== "")) {
        this.view.btnGenerateVoucher.setEnabled(true);
        this.view.btnGenerateVoucher.skin = "sknbtn2c3d73Rounded18px";
        if(this.view.flxscrollvoucherlist.isVisible === true) {
          this.view.btnGenerateVoucher.isVisible = true;
          this.view.flxscrollvoucherlist.isVisible = false;
          this.view.lblDownloadMessage.isVisible = false;
          this.view.btnDownloadVoucher.isVisible = false;
        }
      }
    },
    getVoucherMI: function() {
      var param = {};
      param.startdate = startDate;
      param.enddate = endDate;
      param.mobile = this.view.txtSearchVoucher.text;
      param.status = selectedStatus;
      param.retailerid = ServiceResponse.USER_ATTRIBUTES.retailerid;
      kony.application.showLoadingScreen("", "Loading", "", "", "", "");
      var voucherManager = applicationManager.getVoucherManager();
      voucherManager.getVoucherMIList(param,this.getVoucherMISucess,this.getVoucherMIError);
    },
    getVoucherMISucess: function(response) {
      kony.application.dismissLoadingScreen();
      kony.print(response);
      voucherData = response.records;
      let size = voucherData.length;
      let content = "% records are ready to download";
      content = content.replace("%", size);
      this.view.lblDownloadMessage.text = content;
      this.view.lblDownloadMessage.isVisible = true;
      this.view.btnGenerateVoucher.isVisible = false;
      this.view.btnDownloadVoucher.isVisible = true;
      this.view.segVoucherData.widgetDataMap = {
        // lblApplicatntId:"applicationID",
        // lblApplicantPhone: "mobile",
        // lblLoanAmount : "loanAmount",
        // lblVoucherNumber : "voucherCode",
        // lblVoucherStatus : "voucherStatus",
        // lblGenerationDate : "createdts",
        // lblExpiryDate : "expiryDate",
        // lblRetailerName : "retailerName",
        // lblUserID : "",
        // lblDateTime : "createdts"

        lblApplicatntId:"lblApplicatntId",
        lblApplicantPhone:"lblApplicantPhone",
        lblLoanAmount:"lblLoanAmount",
        lblVoucherNumber:"lblVoucherNumber",
        lblVoucherStatus:"lblVoucherStatus",
        lblGenerationDate:"lblGenerationDate",
        lblExpiryDate:"lblExpiryDate",
        lblRetailerName:"lblRetailerName",
        lblUserID:"lblUserID",
        lblDateTime:"lblDateTime"
      };

      var appDataPush = [];

      for(var i=0;i<voucherData.length;i++){
        var createdDate = voucherData[i].createdts;
        if(voucherData[i].expiryDate !== undefined){
          var expDate = voucherData[i].expiryDate;
          var expireSlice = expDate.slice(0,10);
        }else {
          var expireSlice ="";
        }
        var gendate = createdDate.slice(0,10);

        var segdatas = {
          "lblApplicatntId":voucherData[i].applicationID,
          "lblApplicantPhone":voucherData[i].mobile,
          "lblLoanAmount" : voucherData[i].loanAmount,
          "lblVoucherNumber" :voucherData[i].voucherCode,
          "lblVoucherStatus" : voucherData[i].voucherStatus,
          "lblGenerationDate" : gendate,
          "lblExpiryDate" : expireSlice,
          "lblRetailerName" : voucherData[i].retailerName,
          "lblUserID" :  voucherData[i].retailerID,
          "lblDateTime" : gendate,
        };
      appDataPush.push(segdatas);
      }

   //  this.view.segVoucherData.setData(segdatas);


      var sectionHeader = {
        "lblApplicantName": "Applicant Name",
        "lblApplicatntId": "Applicant Id",
        "lblApplicantPhone": "Phone Number",
        "lblAmount": "Amount",
        "lblVoucherNo": "Voucher Number",
        "lblVoucherStatus": "Voucher Status",
        "lblGenerateDate": "Generation Date",
        "lblExpiryDate": "Expiry Date",
        "lblUserId": "Retailer Name",
        "lbldate": "Retailer Date and Time"
      };
      var vdata = [sectionHeader,appDataPush];
      var voucherSectionData = [vdata];
      this.view.segVoucherData.setData(voucherSectionData);
      this.view.flxscrollvoucherlist.isVisible = true;
    },
    getVoucherMIError: function(error) {
      kony.application.dismissLoadingScreen();
      kony.print(error);
    },
    downloadVoucherData: function() {
      if(voucherData.length > 0) {
        var excelData = [];
        var serialNo = 1;
        for(var i = 0,iLen=voucherData.length; i<iLen;i++) {
          var data = {};
          data.serialNo = serialNo;
          data.ApplicantNumber = voucherData[i].applicationID;
          data.VoucherCode = voucherData[i].voucherCode;
          data.GeneratedDate = voucherData[i].createdts;
          data.ExpiryDate = voucherData[i].expiryDate;
          data.LoanAmount = voucherData[i].loanAmount;
          data.Status = voucherData[i].voucherStatus;
          data.PhoneNo = voucherData[i].mobile;
          data.T24CustomerId = voucherData[i].Customer_id;
          data.Tenor = voucherData[i].tenor;
          excelData.push(data);
          ++serialNo;
        }
        this.view.brwsExcel.evaluateJavaScript("exportJsonToXLSX(" + JSON.stringify(excelData) + ")");
      }
    }
  };
});