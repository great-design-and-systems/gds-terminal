(function () {
    'use strict';
    angular.module('gdsApp')
        .config(AppRoute);

    AppRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
    function AppRoute($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      
        $stateProvider
            .state('home', {
                url: "/home",
                template: '<home></home>'
            })
            .state('timeIn', {
                url:'/time-in',
                template: '<time-in></time-in>'
            })
            .state('barcode', {
                url:'/bar-code/:timeInID',
                template: '<bar-code time-in-id="barCode.param.timeInID"></bar-code>',
                controller: ExposeRouteParams,
                controllerAs: 'barCode'
            });
    }
  
    ExposeRouteParams.$inject = ['$stateParams'];
    function ExposeRouteParams($stateParams) {
        var exposedRoute = this;
        exposedRoute.param = $stateParams;
    }

})();