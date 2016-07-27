(function() {
  'use strict';
  angular.module('gdsApp')
    .service('ScannerService', ScannerService)
    .run(function(ScannerService) {
      ScannerService.startScanner();
    });

  ScannerService.$inject = ['vendors', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT', '$state'];

  function ScannerService(vendors, PROTOCOL, HOST, PORT, $state) {
    return {
      startScanner: startScanner
    };

    function startScanner() {
      var server = PROTOCOL + '://' + HOST + ':' + PORT;
      var socket = vendors.Socket.connect(server);
      socket.on('scanned', function(info) {
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