// creating an object with an interface - these are global objects that can be injected anywhere else when injected as a parameter in a controller (so $scope.list, etc.)

angular
.module("backpackerApp")
.factory("TripFactory", function ($http, AuthFactory) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
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
                        data: trip
                            // reference to the cloud storage here
                    })
                })
                .catch(function(error) {
                    console.log("Error getting token")
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