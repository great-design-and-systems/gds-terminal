angular.module('gdsApp')
.component('timeIn', {
	templateUrl: 'src/time-in/time-in.tpl.html',
	controllerAs:'timeIn',
	controller: TimeInComponent
});

function TimeInComponent() {
	var timeIn = this;
	timeIn.user = {};
}