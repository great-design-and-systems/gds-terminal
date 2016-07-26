angular.module('gdsApp')
.component('barCode', {
	templateUrl: 'src/bar-code/bar-code.tpl.html',
	controllerAs: 'barCode',
	controller: BarCodeController
})

function BarCodeController(){
	var barCode = this;

	barCode.user = {};

	barCode.barCodeTimeIn = barCodeTimeIn;

	function barCodeTimeIn(){
		if (barCode.user.purpose) {
			console.log(barCode.user);
		} else {
			alert('Please fill all information.');
		}
	}
}