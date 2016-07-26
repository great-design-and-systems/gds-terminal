(function () {
    'use strict';
    angular.module('gdsApp')
        .constant('SCANNER_PROTOCOL', 'http')
        .constant('SCANNER_HOST', 'localhost')
        .constant('SCANNER_PORT', 8080);
})();