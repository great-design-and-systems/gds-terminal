(function() {
    'use strict';
    angular.module('gdsApp')
        .component('timeIn', {
            templateUrl: 'src/time-in/time-in.tpl.html',
            controllerAs: 'timeIn',
            controller: TimeInComponent
        });
    TimeInComponent.$inject = ['PurposeResourceService', 'TimeInResourceService', 'vendors', '$state', 'AlertService'];

    function TimeInComponent(PurposeResourceService, TimeInResourceService, vendors, $state, AlertService) {
        var timeIn = this;
        timeIn.user = {};
        timeIn.manualTimeIn = manualTimeIn;
        timeIn.$onInit = onInit;
        timeIn.isSubmitting = false;
        timeIn.otherPurpose = '';

        function onInit() {
            return PurposeResourceService.getPurposes(function(err, purposes) {
                if (err) {
                    //redirect to error page
                    console.error(err);
                } else {
                    timeIn.purposes = purposes;
                }
            }).$promise;
        }

        function manualTimeIn() {
            if (timeIn.user.firstName && timeIn.user.lastName && timeIn.user.purpose) {
                if (timeIn.user.purpose === 'Others') {
                    if (timeIn.otherPurpose) {
                        timeIn.user.purpose = timeIn.otherPurpose;
                        processLogIn();
                    }
                } else {
                    processLogIn();
                }

            }
        }

        function processLogIn() {
            timeIn.isSubmitting = true;
            vendors.pace.restart();
            var fullname = timeIn.user.lastName + ', ' + timeIn.user.firstName;
            var when = new Date().getTime();
            TimeInResourceService.checkInVisitor(fullname, timeIn.user.purpose, when, function(err, result) {
                if (err) {
                    //redirect to error page
                    console.error(err);
                    AlertService.showAlertFail = true;
                } else {
                    AlertService.showAlertSuccess = true;
                    $state.go('home');
                }
                vendors.pace.stop();
            });
        }
    }
})();