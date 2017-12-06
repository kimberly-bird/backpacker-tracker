// trip factory is being injected. 
angular
.module("backpackerApp")
// name of factory gets injected as a parameter to be used in the controller 
.controller("listAllTripsCtrl", function ($scope, TripFactory) {
    $scope.trips = []

    // renders list of trips
    TripFactory.list().then(data => {
        $scope.trips = data
    })
})


