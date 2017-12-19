angular
.module("backpackerApp")
.factory("TripFactory", function ($http, AuthFactory) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        // function to GET all trips for authenticated user
        "list": {
            value: function () {
                return $http.get(`https://backpacker-tracker.firebaseio.com/trips.json?orderBy="uid"&equalTo="${AuthFactory.getUser().uid}"`
                ).then(response => {
                    const data = response.data

                    // Array of objects 
                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })
                    return this.cache
                })
            }
        },
        // function to GET specific trip based on key
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
        // function to POST new trip to Firebase
        "add": {
            value: function (trip) {
                return firebase.auth().currentUser.getIdToken(true)
				.then(idToken => {
                    return $http({
                        method: "POST",
                        url: `https://backpacker-tracker.firebaseio.com/trips/.json?auth=${idToken}`,
                        data: trip
                    })
                })
                .catch(function(error) {
                    console.log("Error getting token")
                })
            }
        },
        // function to DELETE trip based on key
        "delete": {
            value: function (key) {
                return $http({
                    method: "DELETE",
                    url: `https://backpacker-tracker.firebaseio.com/trips/${key}/.json`
                })
            }
        }
    })
})