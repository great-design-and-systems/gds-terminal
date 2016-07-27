angular.module('gdsApp')
	.component('barCode', {
		templateUrl: 'src/bar-code/bar-code.tpl.html',
		controllerAs: 'barCode',
		controller: BarCodeController,
		bindings: {
			timeInId: '<'
		}
	});
BarCodeController.$inject = ['BarcodeResourceService'];
function BarCodeController(BarcodeResourceService) {
	var barCode = this;
	barCode.$onInit = onInit;
	barCode.user = {};

	barCode.barCodeTimeIn = barCodeTimeIn;

	function barCodeTimeIn() {
		if (barCode.user.purpose) {
			console.log(barCode.user);
		} else {
			alert('Please fill all information.');
		}
	}

	function onInit() {
		BarcodeResourceService.getTimeInfo(barCode.timeInId, function (err, timeInfo) {
			barCode.user = timeInfo;
		});
	}
}