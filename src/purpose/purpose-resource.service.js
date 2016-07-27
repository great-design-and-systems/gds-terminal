(function() {
  'use strict';
  angular.module('gdsApp')
    .service('PurposeResourceService', PurposeResourceService);

  PurposeResourceService.$inject = ['$resource', 'CONFIG_PROTOCOL', 'CONFIG_HOST', 'CONFIG_PORT', 'CONFIG_CONTEXT'];

  function PurposeResourceService($resource, CONFIG_PROTOCOL, CONFIG_HOST, CONFIG_PORT, CONFIG_CONTEXT) {
    var configResource = $resource((CONFIG_PROTOCOL.length ? (CONFIG_PROTOCOL + '://') : '') +
      CONFIG_HOST + (CONFIG_PORT.length ? ':' + CONFIG_PORT : '') + CONFIG_CONTEXT + ':action');
    return {
      getPurposes: getPurposes
    };

    function getPurposes(callback) {
      return configResource.query({
          action: 'purposes'
        },
        function(data) {
          callback(undefined, data);
        },
        function(err) {
          callback(err);
        });
    }

  }
})();