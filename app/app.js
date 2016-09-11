"use strict";
var app = angular.module ("PinItApp", ["ngRoute"]).constant('FirebaseURL', 'https://pinthestuffontheboardterest.firebaseio.com/');
app.config(function($routeProvider){
  $routeProvider.
  when ('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
when ('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when("/boards/public", { //Here we are creating a URL and equating it with its associated partial
      templateUrl: 'partials/public-board.html', //Note that the grammar here specifies "Url", not all upper-case ("URL")
      controller: "PublicBoardCtrl"
  }).
  when("/boards/new", {
      templateUrl: 'partials/new-board.html',
      controller: "NewBoardController"
  }).
  when('/boards/private/:itemId', {
      //The above "/: whatever" syntax is particular to URL's for which we'll be using $routeParams ... $routeParams stands in for (:)?????
      templateUrl: "partials/private-board.html",
      controller: "PrivateBoardController"
  });




});
app.run( ($location, FBCreds)=> {
  let creds = FBCreds;
  let authConfig ={
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);

});
