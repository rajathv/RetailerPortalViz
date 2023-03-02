/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"userid": "userid",
		"password": "password",
		"temppassword": "temppassword",
		"resetpassword": "resetpassword",
		"status": "status",
		"retailerid": "retailerid",
		"retailername": "retailername",
		"role": "role",
		"phoneno": "phoneno",
		"emailid": "emailid",
		"username": "username",
		"securityKey": "securityKey",
		"Otp": "Otp",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"isOtpVerified": "isOtpVerified",
	};

	Object.freeze(mappings);

	var typings = {
		"userid": "string",
		"password": "string",
		"temppassword": "string",
		"resetpassword": "string",
		"status": "string",
		"retailerid": "string",
		"retailername": "string",
		"role": "string",
		"phoneno": "string",
		"emailid": "string",
		"username": "string",
		"securityKey": "string",
		"Otp": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"isOtpVerified": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"userid",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "RetailerCustomer",
		tableName: "Retailer"
	};

	Object.freeze(config);

	return config;
})