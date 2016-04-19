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
        controller: 'homeCtrl'
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
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'menu': {
        templateUrl: 'templates/signup.html',
        controller: 'signUpCtrl'
      }
    }
  })

  .state('menu.details', {
    url: '/details?id',
    views: {
      'menu': {
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl'
      }
    }
  })


  /*.state('menu.details', {
    url: '/details',
    views: {
      'details': {
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl'
      }
    }
  })*/

  .state('menu', {
    url: '',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/home')

  

});