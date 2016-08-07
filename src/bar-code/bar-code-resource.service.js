(function () {
  'use strict';
  angular.module('gdsApp')
    .service('BarcodeResourceService', BarcodeResourceService);
  BarcodeResourceService.$inject = ['$resource', 'API_HOST', 'SCANNER_CONTEXT'];

  function BarcodeResourceService($resource, API_HOST, SCANNER_CONTEXT) {
    var scannerResource = $resource(API_HOST + SCANNER_CONTEXT + ':action?param=timeInID::timeInID', {}, {
      checkInPurpose: {
        method: 'PUT',
        params: {
          action: 'checkInPurpose'
        },
        url: API_HOST + SCANNER_CONTEXT + ':action?param=timeInID::timeInID'
      }
    });
    return {
      getTimeInfo: getTimeInfo,
      checkInPurpose: checkInPurpose
    };

    function getTimeInfo(timeInID, callback) {
      return scannerResource.get({
        action: 'getTimeInfo',
        timeInID: timeInID
      }, function (data) {
        callback(undefined, data);
      }, function (err) {
        callback(err);
      });
    }

    function checkInPurpose(timeInID, purpose, callback) {
      return scannerResource.checkInPurpose({
        timeInID: timeInID,
        purpose: purpose
      }, function (data) {
        callback(undefined, data);
      }, function (err) {
        callback(err);
      });
    }
  }
})();