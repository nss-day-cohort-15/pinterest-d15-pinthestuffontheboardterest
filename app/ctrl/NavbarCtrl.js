"use strict";

app.controller("NavCtrl", function($scope, searchTermData, $location) {
    $scope.searchText = searchTermData;
    $scope.navItems = [    //create an array of objects
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
            {url: '#/boards/public', name: "All Items", showState: "!$parent.isLoggedIn"},
            {url: '#/boards/private', name: "New Items"}
    ];

    $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
// Because NavCtrl is nested within TopCtrl, we can access something on the scope in TopCtrl from $parent.
