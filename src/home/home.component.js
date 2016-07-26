(function () {
    'use strict';
    angular.module('gdsApp')
        .component('home', {
            templateUrl: 'src/home/home.html',
            controller: HomeComponent,
            controllerAs: 'home'
        });

    function HomeComponent() {

    }

})();