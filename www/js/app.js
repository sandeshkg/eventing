// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform, Events) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    if(jsonData.additionalData){
      try {
        Events.add(jsonData.additionalData.nid, jsonData.additionalData.ntype,
          jsonData.additionalData.ntitle,
          jsonData.additionalData.ndescription,
          jsonData.additionalData.nvenue,
          jsonData.additionalData.nstartTime,
          jsonData.additionalData.nduration,
          jsonData.additionalData.nimage);
        

        //id, type, title, description, venue, startTime, duration, iconImageURL


        //alert('Successfully inserted');
        //alert(Events.all().length);
      }
      catch(e){
        alert(e);
      }
    }
    //alert(JSON.stringify(jsonData));
  };

  window.plugins.OneSignal.init("afa56c6f-73ca-4d5b-a0d9-c847ab96ee12",
                                 {googleProjectNumber: "180539138548"},
                                 notificationOpenedCallback);
  
  window.plugins.OneSignal.setSubscription(true);
  
  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);

  });
})
.filter('datetime', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input),
                              'MMM dd yyyy - HH:mm:ss');
 
  return _date.toUpperCase();

 };
});