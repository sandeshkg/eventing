angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, Events) {
	$scope.events = Events.all();

	Events.awaitUpdate('homeCtrl', function(){
		//alert('Callback triggered')
		$scope.events = Events.all();
		$scope.$apply();
	})

	/*$scope.$watch(
		Events.all().length,

		function(newVal, oldVal){
			alert(newVal.length + ' : ' + oldVal.length);
			if(newVal.length != oldVal.length){
				alert('Length is not same');
				$scope.events = Events.all();
				$scope.$apply();
			}
		}


		);*/
})
   
.controller('aboutCtrl', function($scope) {

})
    