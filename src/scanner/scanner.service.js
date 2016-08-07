(function () {
  'use strict';
  angular.module('gdsApp')
    .service('ScannerService', ScannerService)
    .run(function (ScannerService) {
      ScannerService.startScanner();
    });

  ScannerService.$inject = ['vendors', 'API_HOST', '$state'];

  function ScannerService(vendors, API_HOST, $state) {
    return {
      startScanner: startScanner
    };

    function startScanner() {
      var socket = vendors.Socket.connect(API_HOST);
      socket.on('scanned', function (info) {
        console.log('scanned', info);
        if (info && info.timeInID) {
          $state.go('barcode', {
            timeInID: info.timeInID
          });
        }
      });
      console.log('Scanner has been started: ', socket);
    }
  }
})();