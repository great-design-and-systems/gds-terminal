(function () {
    'use strict';
    angular.module('gdsApp')
        .service('ScannerService', ScannerService)
        .run(function (ScannerService) {
            ScannerService.start();
        });;
    ScannerService.$inject = ['vendors', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT'];

    function ScannerService(vendors, PROTOCOL, HOST, PORT) {
        var server = PROTOCOL + '://' + HOST + ':' + PORT;
        return {
            startScanner: startScanner
        }

        function startScanner() {
            var socket = new vendors.Socket(server);
            socket.on('scanned', function (info) {
                alert('scanned ' + info);
            });
        }
    }
})