angular.module('gdsApp')
  .service('TimeInService', TimeInService);

  TimeInService.$inject = ['$http'];
  
  var userInfoApi = 'api/user-info/';

  function TimeInService($http) {
	return {
		getUserInfo: getUserInfo
	};

	function getUserInfo(username, callback) {
		$http.get(userInfoApi+username)
		.success(function(data){
			callback(undefined, data);
		}).error(function(err){
			callback(err);
		});
	}
  }