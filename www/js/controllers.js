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

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, AuthService, $ionicHistory) {
    //console.log('Login Controller Initialized');

    //var ref = new Firebase("https://boiling-fire-629.firebaseio.com");
    
    /*$ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });*/

    $scope.createUser = function (user) {
        console.log("Create User Function called");
        if (user && user.email && user.displayname) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            AuthService.$createUserWithEmailAndPassword(user.email, generatePass())
            .then(function (userData) {
                alert("User created successfully!");
                firebase.User.sendEmailVerification()
                //AuthService.$sendPasswordResetEmail(user.email)
                .then(function(){
                    //Send email in params
                    //$state.go('menu.password');
                    /*ref.child("users").child(userData.uid).set({
                        email: user.email,
                        displayName: user.displayname
                    });*/
                    
                    $ionicLoading.hide();
                    //$scope.modal.hide();
                    $scope.gotoLogin();

                })
                .catch(function(error){
                    $scope.error = error;
                    console.log("Error Sending Password Reset :" +error);
                });
                
                
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");
    }

    $scope.signIn = function (user) {

        if (user && user.email && user.password) {
            $ionicLoading.show({
                template: 'Signing In...'
            });
            AuthService.$signInWithEmailAndPassword(user.email, user.password)
            .then(function (authData) {
                console.log("Logged in as:" + authData.uid);

                /*ref.child("users").child(authData.uid).once('value', function (snapshot) {
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    $scope.$apply(function () {
                        $rootScope.displayName = val;
                    });
                });*/
                $ionicLoading.hide();
                $ionicHistory.nextViewOptions({
                    disableBack: true
                  });

                $scope.gotoHome();
                //$state.go('tab.rooms');
            }).catch(function (error) {
                alert("Authentication failed:" + error.message);
                $ionicLoading.hide();
            });
        } else
            alert("Please enter email and password both");
    }

    $scope.resetPwd = function(){
        AuthService.$sendPasswordResetEmail($scope.credential.email)
        .then(function(resp) {
            //Send email in params
            //$state.go('menu.password');
        })
        .catch(function(error) {
            $scope.error = error;
            console.log("Error Sending Password Reset :" +error);
        });
    }

    function generatePass() {
        "use strict";
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var pass = "";

      for (let i = 0; i < 32; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
      }

      return pass;
    }

    $scope.gotoCreateAcct = function(){
        $state.go('menu.signup');
    }

    $scope.gotoLogin = function(){
        $state.go('menu.login');
    }

    $scope.gotoHome = function(){

        $state.go('menu.home');
    }


})





/*.controller('loginCtrl', ['$scope','AuthService', function($scope, AuthService){
    $scope.credential = { email : ""};
    $scope.createUser = function(){

        AuthService.$createUser({
            email: $scope.credential.email,
            password: generatePass()
        })
        .then(function(userData) {
            console.log("User created with uid: " + userData.uid);
            AuthService.$resetPassword({ "email" : $scope.credential.email })
            .then(function(){
                //Send email in params
                $state.go('menu.password');
            })
            .catch(function(error){
                $scope.error = error;
                console.log("Error Sending Password Reset :" +error);
            })
        })
        .catch(function(error) {
            $scope.error = error;
            console.log("Error creating user :" +error);
        });
    }

      // temporary password times!
    function generatePass() {
        "use strict";
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var pass = "";

      for (let i = 0; i < 32; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
      }

      return pass;
    }

}])

.controller('forgotCtrl', ['$scope', '$stateParams', 'AuthService', function($scope, $stateParams, AuthService){
    $scope.credential = { email : ""};
    $scope.forgot = function(){
        AuthService.$resetPassword({ "email" : $scope.credential.email })
        .then(function(resp) {
            //Send email in params
            $state.go('menu.password');
        })
        .catch(function(error) {
            $scope.error = error;
            console.log("Error Sending Password Reset :" +error);
        });
    }
}])

.controller('passwordCtrl', ['$scope', '$stateParams', 'AuthService', function($scope, $stateParams, AuthService){
    $scope.credential = { email : "", password: ""};
    $scope.login = function(){
        AuthService.$authWithPassword({ 
            "email" : $scope.credential.email,
            "password" : $scope.credential.password 
        })
        .then(function(resp) {
            //Send email in params
            $state.go('menu.home');
        })
        .catch(function(error) {
            $scope.error = error;
            console.log("Error during Login :" +error);
        });
    }
}])*/
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
