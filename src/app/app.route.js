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
            .when('/bar-code/:timeInID', {
                template: '<bar-code time-in-id="barCode.param.timeInID"></bar-code>',
                controller: ExposeRouteParams,
                controllerAs: 'barCode'
            });
    }
    ExposeRouteParams.$inject = ['$routeParams'];
    function ExposeRouteParams($routeParams) {
        var exposedRoute = this;
        exposedRoute.param = $routeParams;

        console.log('exposedRoute', exposedRoute);
    }

})();