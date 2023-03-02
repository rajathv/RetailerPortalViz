define({
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_jb6525bd56bc445f922c6c8831d0ab82: function AS_AppEvents_jb6525bd56bc445f922c6c8831d0ab82(eventobject) {
        var self = this;
        kony.print("Testing JS Load");
        _kony.mvc.initCompositeApp(true);
        var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
        if (isIOS13) {
            kony.application.setApplicationBehaviors({
                disableForceRepaint: true
            });
        }
        var moduleName = 'ApplicationManager';
        require([moduleName], function(ApplicationManager) {
            applicationManager = ApplicationManager.getApplicationManager();
            document.body.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
            });
        });
    }
});