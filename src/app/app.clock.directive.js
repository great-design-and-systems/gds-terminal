(function() {
  'use strict';
  angular.module('gdsApp')
    .directive('appClock', AppClock);
  AppClock.$inject = ['vendors'];

  function AppClock(vendors) {
    return {
      restrict: 'E',
      template: '<div><div>',
      link: function(scope, element) {
        vendors.jQuery(element).clock();
      }
    };
  }
})();