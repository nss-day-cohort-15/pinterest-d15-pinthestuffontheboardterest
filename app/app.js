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
            controller: "ItemListCtrl"
        }).
        when("/boards/private", {
            templateUrl: 'partials/item-form.html',
            controller: "ItemNewCtrl"
        }).
        when('/items/view/:itemId', {
            //The above "/: whatever" syntax is particular to URL's for which we'll be using $routeParams ... $routeParams stands in for (:)?????
            templateUrl: "partials/item-details.html",
            controller: "ItemViewCtrl"
        }).



        otherwise("items/item-list");
        //The above is a safety URL that prevents users from accessing URL's that we don't want them to
});



app.run( ($location, FBCreds)=> {
  let creds = FBCreds;
  let authConfig ={
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);

});
