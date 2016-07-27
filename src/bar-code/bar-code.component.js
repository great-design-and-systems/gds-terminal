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
	
	function onInit() {
		BarcodeResourceService.getTimeInfo(barCode.timeInId, function (err, timeInfo) {
			barCode.entry = timeInfo;
		});
	}
}