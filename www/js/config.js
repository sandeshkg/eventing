'use strict';

// Declare app level module which depends on filters, and services
angular.module('app.config', [])

   // where to redirect users if they need to authenticate (see module.routeSecurity)
   .constant('loginRedirectPath', '/login')

   // your Firebase URL goes here
   .constant('FBURL', 'https://boiling-fire-629.firebaseio.com')