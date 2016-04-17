angular.module('app.services', [])

.factory('Events', [function(){

var id = 0;
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

var self = this;
self.notificationSubscribers={};
/*self.awaitUpdate=function(key,callback){
    self.notificationSubscribers[key]=callback;
};*/
self.notifySubscribers=function(){
    angular.forEach(self.notificationSubscribers,
        function(callback,key){
            callback();
        });
};

/*
this.all = function(){
  return events;
};

this.add = function(title,description){
  var evt = new Object();
  evt.id = id++;
  evt.title = title;
  evt.description = description;

  events.push(evt);
}

return this;*/

  return{
    all: function(){
      return events;
    },
    add: function(title, description){
      var evt = new Object();
      evt.id = id++;
      evt.title = title;
      evt.description = description;

      events.push(evt);
      self.notifySubscribers();
    },
    awaitUpdate : function(key,callback){
      self.notificationSubscribers[key]=callback;
    }
  };


}]);

//.service('BlankService', [function(){

//}]);

