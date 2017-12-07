angular
.module("backpackerApp")
.controller("addTripCtrl", function ($scope, TripFactory, $location, $timeout, AuthFactory) {
    $scope.newTrip = {}
    $scope.trips = []
    const currentUID = firebase.auth().currentUser.uid

    // creates trip object to be added to Firebase
    $scope.addTrip = function () {
        const trip = {
            "country": $scope.newTrip.country,
            "departureDate": $scope.newTrip.departureDate,
            "returnDate": $scope.newTrip.returnDate,
            "uid": currentUID
        }
        
        // clears field and pushes trip object to tripFactory
        TripFactory.add(trip).then(() => {
            $scope.trips.push(trip)
            $scope.newTrip.country = ""
            $scope.newTrip.departureDate = ""
            $scope.newTrip.returnDate = ""
            
            $timeout(() => {
                $location.url("/trips/list")
            }, 100)
        })
    }
    TripFactory.list().then(data => {
        $scope.trips = data
    })
})


