define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function voucherRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	voucherRepository.prototype = Object.create(BaseRepository.prototype);
	voucherRepository.prototype.constructor = voucherRepository;

	//For Operation 'getVoucherList' with service id 'dbxdb_sp_get_voucher_ids_by_retailerID9307'
	voucherRepository.prototype.getVoucherList = function(params, onCompletion){
		return voucherRepository.prototype.customVerb('getVoucherList', params, onCompletion);
	};

	//For Operation 'generateVoucher' with service id 'GenerateVoucher2560'
	voucherRepository.prototype.generateVoucher = function(params, onCompletion){
		return voucherRepository.prototype.customVerb('generateVoucher', params, onCompletion);
	};

	//For Operation 'getVoucherMI' with service id 'dbxdb_sp_get_vouchermi4180'
	voucherRepository.prototype.getVoucherMI = function(params, onCompletion){
		return voucherRepository.prototype.customVerb('getVoucherMI', params, onCompletion);
	};

	//For Operation 'getVoucherDetails' with service id 'GetVoucherByCodeOrNumber7141'
	voucherRepository.prototype.getVoucherDetails = function(params, onCompletion){
		return voucherRepository.prototype.customVerb('getVoucherDetails', params, onCompletion);
	};

	//For Operation 'redeemVoucher' with service id 'RedeemVoucher3475'
	voucherRepository.prototype.redeemVoucher = function(params, onCompletion){
		return voucherRepository.prototype.customVerb('redeemVoucher', params, onCompletion);
	};

	return voucherRepository;
})