angular.module('app.services', ['ngStorage'])

.factory('Events', ['$localStorage', function($localStorage){


  var events = new Array();
  var newid = 0;

  this.loadEventsFromStorage = function(){
    
    if($localStorage.events){
      events = $localStorage.events;
    }
    newid= events.length +1 || 0;

    //TODO:check the validity of the events, look for expiration policy
    
    var newevents = [
    {
      id:newid++ ,
      title:'Town Hall ',
      description:'Townhall with Sandesh Kumar, CXO of XYZ Company. Speaking about nothing :)'

    },
    {
      id:newid++,
      title:'Town Hall ',
      description:'Meeting with Idiot, of ABC Company. Idiot is going to talk about how to be a smart and intelligent person like him :)'

    }];

    for(var i = 0; i < newevents.length; i++) {
         events.push(newevents[i]);
    }

    //newevents.map(function(index, elem) {
     
    //})
  };

  this.fetchNewEvents = function(){

    //TODO: once api is ready
    var evt = {
      id:newid++,
      title:'Town Hall from Server',
      description:'Townhall with Manager, XYZ Company. Speaking about how to write a search engine without knowing syntax :)'
    };

    events.push(evt);
  };

  this.saveEventsToStorage = function(){
    $localStorage.events = events;
  };

  this.loadEventsFromStorage();
  this.fetchNewEvents();
  this.saveEventsToStorage();

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
        evt.id = newid++;
        evt.title = title;
        evt.description = description;

        events.push(evt);
        self.notifySubscribers();
      },
      awaitUpdate : function(key,callback){
        self.notificationSubscribers[key]=callback;
      }
    };

}])
.factory('Storage', ['', function(){
  return {
    getItem : function(argument) {
      // body...
    },
    saveItem : function(argument) {
      // body...
    }


  };
}])

.factory('signUpService', ['$http', '$q', '$timeout', function($http, $q, $timeout){
  return{

    sendMail:sendMail,
    getToken: getToken

  };

  function sendMail(email){
    var deferred = $q.defer();
    //deferred.notify();

    $timeout(function(){

      deferred.resolve();

    }, 2000);

    //deferred.resolve();

    return deferred.promise;
  };

  function getToken(email) {
    // body...

    var deferred = $q.defer();
    //deferred.notify();
    
    $timeout(function(){

      deferred.resolve();

    }, 2000);

    return deferred.promise;

  };
}])


//.service('BlankService', [function(){

//}]);

