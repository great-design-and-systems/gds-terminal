(function() {
	'use strict';
	angular.module('gdsApp')
		.component('timeIn', {
			templateUrl: 'src/time-in/time-in.tpl.html',
			controllerAs: 'timeIn',
			controller: TimeInComponent
		});
	TimeInComponent.$inject = ['PurposeResourceService', 'TimeInResourceService', 'vendors', '$state'];

	function TimeInComponent(PurposeResourceService, TimeInResourceService, vendors, $state) {
		var timeIn = this;
		timeIn.user = {};
		timeIn.$onInit = onInit;
		timeIn.onSelectPurpose = onSelectPurpose;
		timeIn.isSubmitting = false;

		function onInit() {
			return PurposeResourceService.getPurposes(function(err, purposes) {
				if (err) {
					//redirect to error page
					console.error(err);
				} else {
					timeIn.purposes = purposes;
				}
			}).$promise;
		}

		function onSelectPurpose() {
			if (timeIn.user) {
				timeIn.isSubmitting = true;
				vendors.pace.restart();
				var fullname = timeIn.user.lastName + ', ' + timeIn.user.firstName;
				var when = new Date().getTime();
				TimeInResourceService.checkInVisitor(fullname, timeIn.user.purpose, when, function(err, result) {
					if (err) {
						//redirect to error page
						console.error(err);
					} else {
						$state.go('home');
					}
					vendors.pace.stop();
				});
			}
		}
	}
})();