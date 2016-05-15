angular.module('app.controllers', ['truncate', 'ksSwiper'])

.controller('homeCtrl', ['$scope', 'Events', '$state', function ($scope, Events, $state) {
    
    $scope.showDetails = function (eventId) {
        $state.go('menu.details', { 'id': eventId });
        console.log('Show details' + eventId);
    };

    Events.awaitUpdate('homeCtrl', function () {        
        $scope.events = Events.all();
        postUpdate();
    });


    function postUpdate(){
    	$scope.slider = [];

	    angular.forEach($scope.events, function (value, key) {
	        $scope.slider.push({
	            id: value.id,
	            label: 'slide #' + value.id,
	            image: (value.images && value.images.indexOf(',') ? value.images.split(',') : value.images),
	            startTime: value.startTime,
	            venue: value.venue,
	            description: value.description,
	            title: value.title
	        });
	    });

	    $scope.topEvents = [];

	    for (i = 0; i < 4 && $scope.events.length > i; i++) {
	        $scope.topEvents.push($scope.slider[i]);
	    }
    };


    

}])

.controller('loginCtrl', ['$scope', 'signUpService', '$state', function ($scope, signUpService, $state) {
    $scope.login = { email: "" };
    $scope.loginApp = function () {

        if ($scope.login.email) {
            signUpService.sendMail($scope.login.email)
			.then(function (response) {
			    //$location.path('/signup');
			    $state.go('menu.signup');
			},
			function (err) {
			    $scope.message = err;
			})
        }
    }
}])

.controller('signUpCtrl', ['$scope', 'signUpService', '$state', function ($scope, signUpService, $state) {

    $scope.getToken = function () {
        $scope.signup = { key: '' };
        if ($scope.signup.key) {
            signUpService.getToken($scope.signup.key)
			.then(function (response) {
			    //$location.path('/home');
			    $state.go('menu.home');
			},
			function (err) {
			    $scope.message = err;
			})
        }
    }
}])

.controller('detailsCtrl', ['$scope', '$stateParams', 'Events', function ($scope, $stateParams, Events) {

    var details = Events.getDetails($stateParams.id);
    $scope.id = details.id;
    $scope.when = details.startTime;
    $scope.where = details.venue;
    $scope.title = details.title;
    $scope.description = details.description;
    $scope.duration = details.duration;
    $scope.image = details.image;
    $scope.type = details.type;
    if (details.eventImages && details.eventImages.length > 1) {
        $scope.images = details.eventImages;
    }
}])
