(function () {
	'use strict';
	angular.module('gdsApp')
		.service('TimeInResourceService', BarcodeResourceService);
	BarcodeResourceService.$inject = ['$resource', 'API_HOST', 'SCANNER_CONTEXT'];

	function BarcodeResourceService($resource, API_HOST, SCANNER_CONTEXT) {
		var timeInResource = $resource(API_HOST + SCANNER_CONTEXT + ':action', {}, {
			checkInVisitor: {
				method: 'POST',
				params: {
					action: 'checkInVisitor'
				},
				url: API_HOST + SCANNER_CONTEXT + ':action'
			}
		});

		return {
			checkInVisitor: checkInVisitor
		};

		function checkInVisitor(fullname, purpose, when, callback) {
			return timeInResource.checkInVisitor({
				fullname: fullname,
				purpose: purpose,
				when: when
			}, function (success) {
				callback(undefined, success);
			}, function (err) {
				callback(err);
			});
		}
	}
})();