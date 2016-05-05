angular.module('app.controllers', ['truncate', 'angular-carousel'])

.controller('homeCtrl', ['$scope', 'Events', '$state', function ($scope, Events, $state) {
    $scope.events = Events.all();
    console.log('1' + $scope.events.length);
    $scope.showDetails = function (eventId) {
        $state.go('menu.details', { 'id': eventId });
        console.log('Show details' + eventId);
    };

    Events.awaitUpdate('homeCtrl', function () {
        //alert('Callback triggered')
        $scope.events = Events.all();
        console.log('2' + $scope.events.length);
        $scope.$apply();
    })


    $scope.slides = [];

    angular.forEach($scope.events, function (value, key) {
        $scope.slides.push({
            id: value.id,
            label: 'slide #' + value.id,
            img: value.image,
            startTime: value.startTime,
            where: value.where,
            description: value.description,
            title: value.title
        });
    });

    $scope.TopEvents = [];

    for (i = 0; i < 4; i++) {
        $scope.TopEvents.push($scope.slides[i]);
    }

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
    $scope.multiimg = false;
    $scope.id = details.id;
    $scope.when = details.startTime;
    $scope.where = details.where;
    $scope.title = details.title;
    $scope.description = details.description;
    $scope.duration = details.duration;
    $scope.image = details.image;
    $scope.type = details.type;
    if (details.sliderImageUrls.length > 1) {
        $scope.imageurls = details.sliderImageUrls;
        $scope.multiimg = true;
    }
    else {
        $scope.singleimg = true;
    }
}])
