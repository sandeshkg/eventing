angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', 'Events', '$state', function($scope, Events, $state) {
	$scope.events = Events.all();

	/*$scope.showDetails = function(eventId){

		$state.go('menu.details', { 'id' : '1'});

		console.log('Show details' + eventId);

	};*/

	Events.awaitUpdate('homeCtrl', function(){
		//alert('Callback triggered')
		$scope.events = Events.all();
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

.controller('detailsCtrl',['$scope', '$stateParams', function($scope, $stateParams) {

$scope.id = $stateParams.id;
$scope.when = "Today";
$scope.where = "In your home";
$scope.img = '';
$scope.title = '';
$scope.venue = '';
$scope.datetime='';
$scope.details = '';
//$scope.eventid = $stateParams.id;

}])  