angular
.module("backpackerApp")
.controller("tripDetailCtrl",
// $routeParams holds the URL that catches the id from :tripId
    function ($scope, $routeParams, TripFactory, $location) {
        
        $scope.trip = {}
        $scope.image = {}
        
        // go to Firebase and grab the data from the URL and bring it back as an object to use in other controllers. 
        TripFactory.single($routeParams.tripId).then(trip => {
            // splits listOfMemories array on the ,
            trip.listOfMemories = trip.listOfMemories.split(",")
            // binds scope to trip
            $scope.trip = trip
        })        

        TripFactory.single($routeParams.tripId).then(image => {
            image.photo = image.photo.split(",")
            $scope.image = image
        })

        // bound to ng-click on trip detail
        $scope.deleteTrip = () => 
        TripFactory.delete($routeParams.tripId).then(() => $location.url("/trips/list"))


    }
)