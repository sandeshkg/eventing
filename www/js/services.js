angular.module('app.services', ['ngStorage', 'ui-notification', 'firebase'])

.factory('Events', ['$localStorage', '$http', 'Notification', '$firebaseArray', function ($localStorage, $http, Notification, $firebaseArray) {

    var events = $firebaseArray(new Firebase('https://boiling-fire-629.firebaseio.com/events'));

    events.$loaded()
    .then(function(x){
      self.notifySubscribers();
    });

    events.$watch(function(){
      self.notifySubscribers();
    });

    var self = this;
    self.notificationSubscribers = {};

    self.notifySubscribers = function () {
        angular.forEach(self.notificationSubscribers,
            function (callback, key) {
                callback();
            });
    };

    function getDetails(id){
      for (var i = 0; i < events.length; i++) {
        if(events[i].id == id)
          return events[i];
      };
    }

    return {
        all: function () {
            return events;
        },
        add: function (id, type, title, description, venue, startTime, duration, iconImageURL, sliderImageUrls) {

            var evt = new CustomEvent(id,
                  type,
                  title,
                  description,
                  venue,
                  startTime,
                  duration,
                  iconImageURL,
                  eventImages.split(','));
            events[id] = evt;
            self.notifySubscribers();
        },
        awaitUpdate: function (key, callback) {
            self.notificationSubscribers[key] = callback;
        },
        getDetails: function (id) {
            return getDetails(id);
        }
    };

}])

.factory('signUpService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    return {

        sendMail: sendMail,
        getToken: getToken

    };

    function sendMail(email) {
        var deferred = $q.defer();
        //deferred.notify();

        $timeout(function () {

            deferred.resolve();

        }, 2000);

        //deferred.resolve();

        return deferred.promise;
    };

    function getToken(email) {
        // body...

        var deferred = $q.defer();
        //deferred.notify();

        $timeout(function () {

            deferred.resolve();

        }, 2000);

        return deferred.promise;

    };
}])
.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
})

.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'bottom'
        });
    });


