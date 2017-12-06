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
                return firebase.auth().currentUser.getIdToken(true)
				.then(idToken => {
                    return $http({
                        method: "POST",
                        url: `https://backpacker-tracker.firebaseio.com/trips/.json?auth=${idToken}`,
                        data: {
                            "country": trip.country,
                            "departureDate": trip.departureDate,
                            "returnDate": trip.returnDate,
                            "uid": null 
                            // reference to the cloud storage here
                        }
                    })
                })
                .catch(function(error) {
                    alert("sorry, unsuccessful")
                })
            }
        }
        // photo uploaded to google cloud storage
        // "upload": {
        //     value: function () {
        //         return $http({
        //             method: "PUT"
        //         })
        //     }
        // }
    })
})