define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RetailerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RetailerRepository.prototype = Object.create(BaseRepository.prototype);
	RetailerRepository.prototype.constructor = RetailerRepository;

	//For Operation 'resetPassword' with service id 'ResetPassword7664'
	RetailerRepository.prototype.resetPassword = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('resetPassword', params, onCompletion);
	};

	//For Operation 'modifyUser' with service id 'ModifyUser2473'
	RetailerRepository.prototype.modifyUser = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('modifyUser', params, onCompletion);
	};

	//For Operation 'verifyMFA' with service id 'verifyOTP6897'
	RetailerRepository.prototype.verifyMFA = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('verifyMFA', params, onCompletion);
	};

	//For Operation 'getAllUser' with service id 'getAllUsers5565'
	RetailerRepository.prototype.getAllUser = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('getAllUser', params, onCompletion);
	};

	//For Operation 'createUser' with service id 'CreateNewUser9107'
	RetailerRepository.prototype.createUser = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('createUser', params, onCompletion);
	};

	//For Operation 'requestMFA' with service id 'RequestMFA1401'
	RetailerRepository.prototype.requestMFA = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('requestMFA', params, onCompletion);
	};

	//For Operation 'resendPassword' with service id 'ResendPassword1237'
	RetailerRepository.prototype.resendPassword = function(params, onCompletion){
		return RetailerRepository.prototype.customVerb('resendPassword', params, onCompletion);
	};

	return RetailerRepository;
})