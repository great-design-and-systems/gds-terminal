(function() {
  'use strict';
  angular.module('gdsApp')
    .service('AlertService', alertUser);

    function alertUser(){
        var showAlertSuccess = false;
        var showAlertFail = false;

        return {
            showAlertSuccess: showAlertSuccess,
            showAlertFail: showAlertFail
        };
    }
})();