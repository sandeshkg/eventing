// Initialize the Firebase SDK
/*var config = {
    apiKey: "AIzaSyDrwEh6Z8voms0WgiC2IscrhMYfeoPb_Is",
    authDomain: "boiling-fire-629.firebaseapp.com",
    databaseURL: "https://boiling-fire-629.firebaseio.com",
    storageBucket: "boiling-fire-629.appspot.com",
  };
firebase.initializeApp(config);
*/

var app = angular.module("app", ["firebase"]);
app.config(function() {
  var config = {
    apiKey: "AIzaSyDrwEh6Z8voms0WgiC2IscrhMYfeoPb_Is",               // Your Firebase API key
    authDomain: "boiling-fire-629.firebaseapp.com",       // Your Firebase Auth domain ("*.firebaseapp.com")
    databaseURL: "https://boiling-fire-629.firebaseio.com",     // Your Firebase Database URL ("https://*.firebaseio.com")
    storageBucket: "boiling-fire-629.appspot.com"  // Your Firebase Storage bucket ("*.appspot.com")
  };
  firebase.initializeApp(config);
});