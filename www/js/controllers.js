angular.module('app.controllers', ['truncate'])

.controller('homeCtrl', ['$scope', 'Events', '$state', '$timeout', function ($scope, Events, $state, $timeout) {
    
    
    $scope.sliderSetup = false;
    $scope.events = Events.all();
    postUpdate();

    $scope.showDetails = function (eventId) {
        $state.go('menu.details', { 'id': eventId });
        //console.log('Show details' + eventId);
    };

    Events.awaitUpdate('homeCtrl', function () {        
        $scope.events = Events.all();
        postUpdate();
    });


    function postUpdate(){
    	//$scope.slider.splice(0, $scope.slider.length);
        $scope.slider = {};
        if(!$scope.events || $scope.events.length <= 1) return;//There are no events

	    angular.forEach($scope.events, function (value, key) {
            if(value.showInSlider) {
    	        $scope.slider[value.id] = {
    	            id: value.id,
    	            //label: 'slide #' + value.id,
    	            //image: (value.images && value.images.indexOf(',') ? value.images.split(',') : value.images),
    	            startTime: value.startTime,
    	            venue: value.venue,
    	            description: value.description,
    	            title: value.title,
                    type : value.type,
                    conductedBy1 : value.conductedBy1,
                    conductedBy2 : value.conductedBy2
    	        };
            }
	    });

        //$scope.$apply();

	    /*$scope.topEvents = [];

	    for (i = 0; i < 4 && $scope.events.length > i; i++) {
	        $scope.topEvents.push($scope.slider[i]);
	    };*/

        //if(!$scope.sliderSetup){
            //$scope.sliderSetup = true;
            $timeout(function(){
                setUpSlides();
            }, 10);
        //};
    };

    function setUpSlides(){

        //$('#slider3').remove("li [pager]");

        /*$('#slider3').children().each(function(){
            $(this).removeClass().unbind();
        });*/

        $("#slider3").responsiveSlides({
                            auto: true,
                            pager: true,
                            nav:true,
                            speed: 500,
                            namespace: "callbacks",
                            before: function () {
                              //$('.events').append("<li>before event fired.</li>");
                            },
                            after: function () {
                              //$('.events').append("<li>after event fired.</li>");
                            }
                              });
    }


    

}])

.controller('authCtrl', ['$scope','AuthService'], function($scope, AuthService){
    Auth.$createUser({
        email: $scope.email,
        password: generatePass()
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
        AuthService.resetPassword();
      }).catch(function(error) {
        $scope.error = error;
      });

      // temporary password times!
    function generatePass() {
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var pass = "";

      for (let i = 0; i < 32; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
      }

      return pass;
    }




    })
/*.controller('loginCtrl', ['$scope', 'signUpService', '$state', function ($scope, signUpService, $state) {
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
}])*/

.controller('detailsCtrl', ['$scope', '$stateParams', 'Events', function ($scope, $stateParams, Events) {

    var details = Events.getDetails($stateParams.id);
    $scope.id = details.id;
    $scope.startTime = details.startTime;
    $scope.where = details.venue;
    $scope.title = details.title;
    $scope.description = details.description;
    $scope.duration = details.duration;
    $scope.mainImage = details.mainImage;
    $scope.type = details.type;
    if(details.eventImages){
        $scope.eventImages = details.eventImages.split(',');
    }
}])
