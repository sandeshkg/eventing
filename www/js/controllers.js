angular.module('app.controllers', ['truncate'])
  
.controller('homeCtrl', ['$scope', 'Events', '$state', function($scope, Events, $state) {
	$scope.events = Events.all();
	console.log('1'+$scope.events.length);
	$scope.showDetails = function(eventId){
		$state.go('menu.details', { 'id' : eventId});
		console.log('Show details' + eventId);
	};

	Events.awaitUpdate('homeCtrl', function(){
		//alert('Callback triggered')
		$scope.events = Events.all();
		console.log('2' +$scope.events.length);
		$scope.$apply();
	})
}])

.controller('loginCtrl', ['$scope', 'signUpService', '$state', function($scope,signUpService, $state) {
	$scope.login = {email:""};
	$scope.loginApp = function () {

		if($scope.login.email){
			signUpService.sendMail($scope.login.email)
			.then(function(response){
				//$location.path('/signup');
				$state.go('menu.signup');
			},
			function(err){
				$scope.message = err;
			})  
	    }
	}
}])
  
.controller('signUpCtrl',['$scope', 'signUpService', '$state', function($scope, signUpService, $state) {

	$scope.getToken = function () {
		$scope.signup = {key :''};
		if($scope.signup.key){
			signUpService.getToken($scope.signup.key)
			.then(function(response){
				//$location.path('/home');
				$state.go('menu.home');
			},
			function(err){
				$scope.message = err;
			})
	    }
	}
}])

.controller('detailsCtrl',['$scope', '$stateParams', 'Events', function($scope, $stateParams, Events) {

	var details = Events.getDetails($stateParams.id);

	$scope.id = details.id;
	$scope.when = details.startTime;
	$scope.where = details.where;
	$scope.title = details.title;
	$scope.description = details.description;
	$scope.duration = details.duration;
	$scope.image = details.image;
	$scope.type = details.type;
	$scope.imageurls = details.imageurls;
//$scope.eventid = $stateParams.id;

}])  