(function () {
    'use strict';
    angular.module('gdsApp')
        .config(AppRoute);

    AppRoute.$inject = ['$routeProvider'];
    function AppRoute($routeProvider) {
        $routeProvider
            .when('/home', {
                template: '<home></home>'
            })
            .when('/time-in', {
                template: '<time-in></time-in>'
            })
            .when('/bar-code', {
                template: '<bar-code></bar-code>'
            });
    }

})();