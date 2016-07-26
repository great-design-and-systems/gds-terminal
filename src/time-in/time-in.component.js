angular.module('gdsApp')
.component('timeIn', {
	templateUrl: 'src/time-in/time-in.tpl.html',
	controllerAs:'timeIn',
	controller: TimeInComponent
});

function TimeInComponent() {
	var timeIn = this;
	timeIn.user = {};
	timeIn.manualTimeIn = manualTimeIn;

	function manualTimeIn(){
		if (timeIn.user.firstName && timeIn.user.lastName && timeIn.user.purpose) {
			console.log(timeIn.user);
		} else {	
			alert('Please fill all information.');
		}
	}	
}