(function () {
  'use strict';
  angular.module('gdsApp')
    .service('PurposeResourceService', PurposeResourceService);

  PurposeResourceService.$inject = ['$resource', 'API_HOST', 'CONFIG_CONTEXT', 'SCHOOL_ID'];

  function PurposeResourceService($resource, API_HOST, CONFIG_CONTEXT, SCHOOL_ID) {
    var configResource = $resource(API_HOST + CONFIG_CONTEXT + ':action?param=codeType::codeType&param=schoolId::schoolId');
    return {
      getPurposes: getPurposes
    };

    function getPurposes(callback) {
      return configResource.query({
        action: 'getCodes',
        codeType: 'purpose',
        schoolId: SCHOOL_ID
      },
        function (data) {
          callback(undefined, data);
        },
        function (err) {
          callback(err);
        });
    }

  }
})();