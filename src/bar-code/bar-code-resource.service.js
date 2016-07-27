(function() {
  'use strict';
  angular.module('gdsApp')
    .service('BarcodeResourceService', BarcodeResourceService);
  BarcodeResourceService.$inject = ['$resource', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT', 'SCANNER_CONTEXT'];

  function BarcodeResourceService($resource, SCANNER_PROTOCOL, SCANNER_HOST, SCANNER_PORT, SCANNER_CONTEXT) {
    var scannerResource = $resource(SCANNER_PROTOCOL + '://' + SCANNER_HOST + ':' + SCANNER_PORT + SCANNER_CONTEXT + ':action/:timeInID', {}, {
      checkInPurpose: {
        method: 'PUT',
        params: {
          action: 'check-in-purpose'
        },
        url: SCANNER_PROTOCOL + '://' + SCANNER_HOST + ':' + SCANNER_PORT + SCANNER_CONTEXT + ':action/:timeInID'
      }
    });
    return {
      getTimeInfo: getTimeInfo,
      checkInPurpose: checkInPurpose
    };

    function getTimeInfo(timeInID, callback) {
      return scannerResource.get({
        action: 'get-time-info',
        timeInID: timeInID
      }, function(data) {
        callback(undefined, data);
      }, function(err) {
        callback(err);
      });
    }

    function checkInPurpose(timeInID, purpose, callback) {
      return scannerResource.checkInPurpose({
        timeInID: timeInID,
        purpose: purpose
      }, function(data) {
        callback(undefined, data);
      }, function(err) {
        callback(err);
      });
    }
  }
})();