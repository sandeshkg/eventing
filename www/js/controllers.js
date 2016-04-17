angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, Events) {
	$scope.events = Events.all();
})
   
.controller('aboutCtrl', function($scope) {

})
    