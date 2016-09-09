"use strict"
var app = angular.module ("PinItApp", ["ngRoute"]).constant('FirebaseURL', 'https://pinthestuffontheboardterest.firebaseio.com/');
app.config(function($routeProvider){
  $routeProvider.
  when ('/', {
    templateUrl: 'partials/public-board.html',
    controller: 'PublicBoardCtrl.js';
  });

});
app.run( ($location, FBCreds)=> {
  let creds = FBCreds;
  let authConfig ={
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig)

})
