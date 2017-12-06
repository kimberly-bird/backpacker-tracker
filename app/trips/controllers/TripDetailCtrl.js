angular
.module("backpackerApp")
.controller("tripDetailCtrl",
// $routeParams can hold the URL that catches the id from :tripId
    function ($scope, $routeParams, TripFactory) {
        $scope.trip = {}

        // goes to Firebase and grabs the data from the URL and then brings it back as an object so you can use it in other controllers. 
        TripFactory.single($routeParams.tripId).then(trip => {
            $scope.trip = trip
        })        
    }
)