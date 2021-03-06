angular.module('app.services', ['ngStorage', 'ui-notification'])

.factory('Events', ['$localStorage', '$http', 'Notification', function ($localStorage, $http, Notification) {


    function CustomEvent(id, type, title, description, where, starttime, duration, image, sliderImageUrls) {
        this.id = id;
        this.type = type ? type : 'news';
        this.title = title;
        this.description = description;
        this.where = where;
        this.starttime = starttime;
        this.duration = duration;
        this.image = image;
        this.sliderImageUrls = sliderImageUrls;
    };

    var events = {};
    this.loadEventsFromStorage = function () {

        if ($localStorage.events) {
            events = $localStorage.events;
        }

        //TODO:check the validity of the events, look for expiration policy

    };

    this.fetchNewEvents = function () {

        $http.get('http://bulletin.us-west-2.elasticbeanstalk.com/api/Events/GetEventDetails')
        .then(function (response) {
            console.log('fetching from aws');
            for (var i = 0; i < response.data.length; i++) {
                Array.prototype.map.call(response.data,
                  function (elem) {
                      var evt = new CustomEvent(elem.id,
                        elem.type,
                        elem.title,
                        elem.description,
                        elem.venue,
                        elem.startTime,
                        elem.duration,
                        elem.iconImageURL.split(',')[0],
                        elem.iconImageURL.split(','));//elem.sliderImageUrls.split(','));
                      events[elem.id] = evt;
                  });
            }

            Notification.success('Latest events fetched succesfully !');
        }
         , function (response) {
             console.log(response);
         });

    };

    this.saveEventsToStorage = function () {
        $localStorage.events = events;
    };

    this.loadEventsFromStorage();
    this.fetchNewEvents();
    this.saveEventsToStorage();

    var self = this;
    self.notificationSubscribers = {};
    /*self.awaitUpdate=function(key,callback){
        self.notificationSubscribers[key]=callback;
    };*/
    self.notifySubscribers = function () {
        angular.forEach(self.notificationSubscribers,
            function (callback, key) {
                callback();
            });
    };

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
                  sliderImageUrls.split(','));
            events[id] = evt;
            self.notifySubscribers();
        },
        awaitUpdate: function (key, callback) {
            self.notificationSubscribers[key] = callback;
        },
        getDetails: function (id) {
            return events[id];
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


