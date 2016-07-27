(function () {
    'use strict';
    angular.module('gdsApp')
        .service('ScannerService', ScannerService)
        .run(function (ScannerService) {
            ScannerService.startScanner();
        });

    ScannerService.$inject = ['vendors', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT', '$location'];

    function ScannerService(vendors, PROTOCOL, HOST, PORT, $location) {
        return {
            startScanner: startScanner
        };
        function startScanner() {
            var server = PROTOCOL + '://' + HOST + ':' + PORT;
            var socket = vendors.Socket.connect(server);
            socket.on('scanned', function (info) {
                console.log('scanned', info);
                $location.path('bar-code/' + info.timeInID);
                $location.replace();
            });
            console.log('Scanner has been started: ', socket);
        }
    }
})();