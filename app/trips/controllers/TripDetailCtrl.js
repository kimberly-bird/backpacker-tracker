angular
.module("backpackerApp")
.controller("tripDetailCtrl",
// $routeParams holds the URL that catches the id from :tripId
    function ($scope, $routeParams, TripFactory, $location) {
        
        $scope.trip = {}
        
        // go to Firebase and grab the data from the URL and bring it back as an object to use in other controllers. 
        TripFactory.single($routeParams.tripId).then(trip => {
            // splits listOfMemories array on the ,
            trip.listOfMemories = trip.listOfMemories.split(",")
            // binds scope to trip
            $scope.trip = trip
        })        


        // bound to ng-click on trip detail - not working
        $scope.editTrip = () => 
        TripFactory.edit($scope.trip, $routeParams.tripId).then(() =>
        $location.url("/trips/list"))

        // bound to ng-click on trip detail
        $scope.deleteTrip = () => 
        TripFactory.delete($routeParams.tripId).then(() => $location.url("/trips/list"))
    }
)