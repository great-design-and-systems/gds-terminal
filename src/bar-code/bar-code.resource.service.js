(function () {
    'use strict';
    angular.module('gdsApp')
        .service('BarcodeResourceService', BarcodeResourceService);
    BarcodeResourceService.$inject = ['$resource', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT', 'SCANNER_CONTEXT'];
    function BarcodeResourceService($resource, SCANNER_PROTOCOL, SCANNER_HOST, SCANNER_PORT, SCANNER_CONTEXT) {
        var scannerResource = $resource(SCANNER_PROTOCOL + '://' + SCANNER_HOST + ':' + SCANNER_PORT + SCANNER_CONTEXT + ':action/:timeInID');
        return {
            getTimeInfo: getTimeInfo
        };

        function getTimeInfo(timeInID, callback) {
            scannerResource.get({ action: 'get-time-info', timeInID: timeInID }, function (data) {
                callback(undefined, data);
            }, function (err) {
                callback(err);
            });
        }
    }
})();