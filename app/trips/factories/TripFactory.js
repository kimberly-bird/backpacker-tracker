// creating an object with an interface - these are global objects that can be injected anywhere else when injected as a parameter in a controller (so $scope.list, etc.)

angular
.module("backpackerApp")
.factory("TripFactory", function ($http) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        "list": {
            value: function () {
                return $http({
                    method: "GET",
                    url: "https://backpacker-tracker.firebaseio.com/trips/.json"
                }).then(response => {
                    const data = response.data

                    // Make an array of objects so we can use filters
                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })
                    return this.cache
                })
            }
        },
        "single": {
            value: function (key) {
                return $http({
                    method: "GET",
                    url: `https://backpacker-tracker.firebaseio.com/trips/${key}/.json`
                }).then(response => {
                    return response.data
                })
            }
        },
        "add": {
            value: function (trip) {
                return $http({
                    method: "POST",
                    url: "https://backpacker-tracker.firebaseio.com/trips/.json",
                    data: {
                        "country": trip.country,
                        "departureDate": trip.departureDate,
                        "returnDate": trip.returnDate
                    }
                })
            }
        }
    })
})