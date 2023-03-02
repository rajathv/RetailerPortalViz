define(['ServiceResponse'], function(ServiceResponse){ 
	return {
      onPreShow: function() {
        
        var retailername = ServiceResponse.USER_ATTRIBUTES.retailername;
        var dcontent = this.view.lblContent.text;
        dcontent = dcontent.replace("%", retailername);
        this.view.lblContent.text = dcontent;
      }
    };
});