angular
.module("backpackerApp")
.controller("addTripCtrl", function ($scope, TripFactory) {
    $scope.newTrip = {}
    $scope.trips = []

    $scope.addTrip = function () {
        const trip = {
            "country": $scope.newTrip.country,
            "departureDate": $scope.newTrip.departureDate,
            "returnDate": $scope.newTrip.returnDate
        }

        TripFactory.add(trip).then(() => {
            $scope.newTrip.country = ""
            $scope.newTrip.departureDate = ""
            $scope.newTrip.returnDate = ""
            
            $scope.trips.push(trip)
        })
    }
    TripFactory.list().then(data => {
        $scope.trips = data
    })
})


