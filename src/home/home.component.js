(function () {
    'use strict';
    angular.module('gdsApp')
        .component('home', {
            templateUrl: 'src/home/home.html',
            controller: HomeComponent,
            controllerAs: 'home'
        });

    HomeComponent.$inject = ['AlertService','$timeout'];

    function HomeComponent(AlertService,$timeout) {
    	var home = this;
    	home.logSuccess = AlertService.showAlertSuccess;
    	home.logFail = AlertService.showAlertFail;

        if(home.logSuccess){
            console.log(home.logSuccess);
            $timeout(function(){
                home.logSuccess = false;
                console.log(home.logSuccess);
            }, 2000);
        }
        if(home.logFail){
            $timeout(function(){
                home.logFail = false;
            }, 2000);
        }
    }

})();