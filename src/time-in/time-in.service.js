(function() {
	'use strict';
	angular.module('gdsApp')
		.service('TimeInResourceService', BarcodeResourceService);
	BarcodeResourceService.$inject = ['$resource', 'SCANNER_PROTOCOL', 'SCANNER_HOST', 'SCANNER_PORT', 'SCANNER_CONTEXT'];

	function BarcodeResourceService($resource, SCANNER_PROTOCOL, SCANNER_HOST, SCANNER_PORT, SCANNER_CONTEXT) {
		var timeInResource = $resource(SCANNER_PROTOCOL + '://' + SCANNER_HOST + ':' + SCANNER_PORT + SCANNER_CONTEXT + ':action', {}, {
			checkInVisitor: {
				method: 'POST',
				params: {
					action: 'check-in-visitor'
				},
				url: SCANNER_PROTOCOL + '://' + SCANNER_HOST + ':' + SCANNER_PORT + SCANNER_CONTEXT + ':action'
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
			}, function(success) {
				callback(undefined, success);
			}, function(err) {
				callback(err);
			});
		}
	}
})();