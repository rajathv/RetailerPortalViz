define([], function () { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
  function VoucherManager() { 
    kony.mvc.Business.Delegator.call(this); 
  } 

  inheritsFrom(VoucherManager, kony.mvc.Business.Delegator); 
  VoucherManager.prototype.getVoucherList = function(params,sucessCB,errorCB) {
    var self = this;
    var userRepo =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("voucher");
    userRepo.customVerb('getVoucherList', params, serviceCompletionCallback);
    function serviceCompletionCallback(status, data, error) {
      //alert("status"+status+" data "+data+" error "+error);
      if(data && data.opstatus === 0){
        if(data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg")) {
          failureCallback(data);
        } else {
          successCallback(data);
        }
      } else {
        failureCallback(error);
      }
    } 
    function successCallback(resSucess){
      sucessCB(resSucess);
    }
    function failureCallback(resError){
      errorCB(resError);
    }
  };
  VoucherManager.prototype.getVoucherDetails = function(params,sucessCB,errorCB) {
    var self = this;
    var userRepo =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("voucher");
    userRepo.customVerb('getVoucherDetails', params, serviceCompletionCallback);
    function serviceCompletionCallback(status, data, error) {
      //alert("status"+status+" data "+data+" error "+error);
      if(data && data.opstatus === 0){
        if(data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg")) {
          failureCallback(data);
        } else {
          successCallback(data);
        }
      } else {
        failureCallback(error);
      }
    } 
    function successCallback(resSucess){
      sucessCB(resSucess);
    }
    function failureCallback(resError){
      errorCB(resError);
    }
  };
  VoucherManager.prototype.redeemVoucher = function(params,sucessCB,errorCB) {
    var self = this;
    var userRepo =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("voucher");
    userRepo.customVerb('redeemVoucher', params, serviceCompletionCallback);
    function serviceCompletionCallback(status, data, error) {
      //alert("status"+status+" data "+data+" error "+error);
      if(data){
        if(data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg")) {
          failureCallback(data);
        } else {
          successCallback(data);
        }
      } else {
        failureCallback(data);
      }
    } 
    function successCallback(resSucess){
      sucessCB(resSucess);
    }
    function failureCallback(resError){
      errorCB(resError);
    }
  };
  VoucherManager.prototype.getVoucherMIList = function(params,sucessCB,errorCB) {
    var self = this;
    var userRepo =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("voucher");
    userRepo.customVerb('getVoucherMI', params, serviceCompletionCallback);
    function serviceCompletionCallback(status, data, error) {
      //alert("status"+status+" data "+data+" error "+error);
      if(data && data.opstatus === 0){
        if(data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg")) {
          failureCallback(data);
        } else {
          successCallback(data);
        }
      } else {
        failureCallback(error);
      }
    } 
    function successCallback(resSucess){
      sucessCB(resSucess);
    }
    function failureCallback(resError){
      errorCB(resError);
    }
  };
  return VoucherManager;
});