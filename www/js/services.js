angular.module('app.services', [])

.factory('Events', [function(){

var events = [
{
  id:1,
  title:'Town Hall',
  description:'Townhall with Sandesh Kumar, CXO of XYZ Company. Speaking about nothing :)'

},
{
  id:2,
  title:'Town Hall',
  description:'Meeting with Idiot, of ABC Company. Idiot is going to talk about how to write better code without any editor. Yes you read it right. :)'

}];

  return{
    all: function(){
      return events;
    },
    add: function(event){
      events.push(event);
    }
  };


}]);

//.service('BlankService', [function(){

//}]);

