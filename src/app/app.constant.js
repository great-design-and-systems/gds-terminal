(function () {
    'use strict';
    angular.module('gdsApp')
        .constant('SCANNER_PROTOCOL', 'https')
        .constant('SCANNER_HOST', 'gds-ms-api.herokuapp.com')
        .constant('SCANNER_PORT', '')
        .constant('SCANNER_CONTEXT', '/gds/scanner/');
})();