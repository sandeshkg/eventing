angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
 .state('menu.home', {
    url: '/home',
    views: {
      'menu': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return AuthService.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.about', {
    url: '/about',
    views: {
      'menu': {
        templateUrl: 'templates/about.html'
        //controller: 'aboutCtrl'
      }
    }
  })

 .state('menu.login', {
    url: '/login',
    views: {
      'menu': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'menu': {
        templateUrl: 'templates/signup.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('menu.password', {
    url: '/password',
    views: {
      'menu': {
        templateUrl: 'templates/password.html',
        controller: 'passwordCtrl'
      }
    }
  })

  .state('menu.forgotpwd', {
    url: '/forgotpwd',
    views: {
      'menu': {
        templateUrl: 'templates/forgotpassword.html',
        controller: 'forgotPwdCtrl'
      }
    }
  })

  .state('menu.details', {
    url: '/details?id',
    views: {
      'menu': {
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["AuthService", function(AuthService) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return AuthService.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu', {
    url: '',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/home')

  

});