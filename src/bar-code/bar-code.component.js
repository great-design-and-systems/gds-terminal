(function() {
    'use strict';
    angular.module('gdsApp')
        .component('barCode', {
            templateUrl: 'src/bar-code/bar-code.tpl.html',
            controllerAs: 'barCode',
            controller: BarCodeController,
            bindings: {
                timeInId: '<'
            }
        });
    BarCodeController.$inject = ['BarcodeResourceService', 'PurposeResourceService', 'vendors', '$state', '$q', 'AlertService'];

    function BarCodeController(BarcodeResourceService, PurposeResourceService, vendors, $state, $q, AlertService) {
        var barCode = this;
        barCode.$onInit = onInit;
        barCode.otherPurpose = '';
        barCode.backToHome = backToHome;
        barCode.barCodeTimeIn = barCodeTimeIn;
        barCode.isSubmitting = false;

        function onInit() {
            vendors.pace.restart();
            var deferred = $q.defer();

            BarcodeResourceService.getTimeInfo(barCode.timeInId, function(err, timeInfo) {
                if (err) {
                    //redirect to error page
                    deferred.reject(err);
                } else {
                    barCode.entry = timeInfo;
                    PurposeResourceService.getPurposes(function(err, purposes) {
                        if (err) {
                            //redirect to error page
                            deferred.reject(err);
                        } else {
                            barCode.purposes = purposes;
                            deferred.resolve();
                        }

                    });
                }
            });

            return deferred.promise;
        }

        function processLogIn() {
            vendors.pace.restart();
            barCode.isSubmitting = true;
            BarcodeResourceService.checkInPurpose(barCode.timeInId, barCode.entry.purpose, function(err, result) {
                if (err) {
                    console.error('err', err);
                    AlertService.showAlertFail = true;
                    //redirect to error page
                } else {
                    AlertService.showAlertSuccess = true;
                    backToHome();
                }
                barCode.isSubmitting = false;
                vendors.pace.stop();
            });
        }

        function backToHome() {
            $state.go('home');
        }

        function barCodeTimeIn() {
            if (barCode.entry.purpose === 'Others') {
                barCode.entry.purpose = barCode.otherPurpose;
                processLogIn();
            } else {
                processLogIn();
            }
        }
    }
})();