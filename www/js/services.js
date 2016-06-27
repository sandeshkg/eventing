angular.module('app.services', ['ngStorage', 'ui-notification', 'firebase'])

.factory('Events', ['$localStorage', '$http', 'Notification', '$firebaseArray', '$state', '$ionicHistory', '$firebaseAuth', function ($localStorage, $http, Notification, $firebaseArray, $state, $ionicHistory, $firebaseAuth) {

    var events = {};
    var self = this;
    //var self = this;
    this.notificationSubscribers = {};
    //var ref = new Firebase('https://boiling-fire-629.firebaseio.com');

    function CustomEvent(id, type, title, description, venue, startTime, duration, image, eventImages, showInSlider) {
        this.id = id;
        this.type = type ? type : 'news';
        this.title = title;
        this.description = description;
        this.venue = venue;
        this.startTime = startTime;
        this.duration = duration;
        this.image = image;
        this.eventImages = eventImages;
        this.showInSlider = showInSlider;
    };

    
    this.loadEventsFromStorage = function () {

        if ($localStorage.events) {
            events = $localStorage.events;
        }

    };

    this.fetchNewEvents = function () {

        var updates = $firebaseArray(firebase.database().ref().child('events'));

        updates.$loaded()
        .then(function(response){
            //console.log(response);

            //console.log('fetching from firebase');
            for (var i = 0; i < response.length; i++) {
                Array.prototype.map.call(response,
                  function (elem) {
                      events[elem.id] = elem;
                  });
            }

            //console.log(events);

            Notification.success('Latest events fetched succesfully !');
            self.saveEventsToStorage();
            self.notifySubscribers();
        },
        function(err){
            console.log(err);
            if(err.code =='PERMISSION_DENIED'){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                  });
                $state.go('menu.login');
            }
        });

        updates.$watch(function(){
            for(var i=0; i < updates.length; i++){
                events[updates[i].id] = updates[i];
                //console.log(updates[i]);
            };
            self.saveEventsToStorage();
            self.notifySubscribers();
        });

    };

    this.saveEventsToStorage = function () {
        if(events && events.length > 0){
            $localStorage.events = events;
        }
    };

    $firebaseAuth().$onAuthStateChanged(function(){
        self.loadEventsFromStorage();
        self.fetchNewEvents();
        self.saveEventsToStorage();
    });   

    
    this.notifySubscribers = function () {
        angular.forEach(self.notificationSubscribers,
            function (callback, key) {
                callback();
            });
    };

    function getDetails(id){
        var result;
        angular.forEach(events,
            function(value, key) {
                if(id == value.id){
                    result = value;
                }
            });
        return result;
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
            notifySubscribers();
        },
        awaitUpdate: function (key, callback) {
            self.notificationSubscribers[key] = callback;
        },
        getDetails: function (id) {
            return getDetails(id);
        }
    };

}])


.factory('AuthService', ['$firebaseAuth', function($firebaseAuth){
    //var ref = new Firebase('https://boiling-fire-629.firebaseio.com');
    return $firebaseAuth();
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


