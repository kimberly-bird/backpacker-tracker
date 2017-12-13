angular
.module("backpackerApp")
.controller("addTripCtrl", function ($scope, TripFactory, $location, $timeout, AuthFactory) {
    $scope.newTrip = {}
    $scope.trips = []
    const currentUID = firebase.auth().currentUser.uid
    let targetedStar

    // create trip object to be added to Firebase
    $scope.addTrip = function () {
        const trip = {
            "country": $scope.newTrip.country,
            "position": $scope.newTrip.marker,
            "departureDate": $scope.newTrip.departureDate,
            "returnDate": $scope.newTrip.returnDate,
            "uid": currentUID,
            "photo": $scope.newTrip.photo,
            "rating": targetedStar,
            "listOfMemories": $scope.newTrip.listOfMemories
        }

        // clear fields and push trip object to tripFactory
        TripFactory.add(trip).then(() => {
            $scope.trips.push(trip)
            $scope.newTrip.country = ""
            $scope.newTrip.departureDate = ""
            $scope.newTrip.returnDate = ""
            $scope.newTrip.listOfMemories = ""
            
            // redirect to map view after submitting form
            $timeout(() => {
                $location.url("/trips/map")
            }, 100)
        })
    }
    TripFactory.list().then(data => {
        $scope.trips = data
    })


    // change class on click of a star rating to update color of star rating
    $scope.starClicked = function(e) {
        // target clicked star and split on _ to get index
        targetedStar = e.target.id.split("_")[1]

        let starCollection = document.getElementsByClassName("fa-star")
        let starArray = targetedStar - 1

        // make an array of the stars that need to be filled in
        let numStarsToChange = []
            for (let i = 0; i <= starArray; i++) {
                const element = starArray[i]
                numStarsToChange.push(i)
            }

        // change class for each of the stars that need to be filled in
        for (let i = 0; i < numStarsToChange.length; i++) {
            starCollection[i].classList.add("checked")   
        }
    }  
    
    // get photo elements
    let uploader = document.getElementById("uploader")
    let fileButton = document.getElementById("fileButton")
    let fileList
    
    // listen to change event
    fileButton.addEventListener("change", function (e) {

        // get file
        fileList = this.files[0]

        // get firebase storage reference
        let storageRef = firebase.storage().ref("uploads/" + fileList.name)
        
        // upload file
        let task = storageRef.put(fileList)

        // update progress bar
        task.on("state_changed", 
        function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            uploader.value = percentage
        },
        function error(err) {
            alert("Oops! Your image didn't upload. Please try again.")
        },
        function complete () {
            alert("Great! Your photo has been uploaded.")
        })

        // upload photo to firebase
        task.then(function (snapshot) {

            storageRef.getDownloadURL()

            .then(function(url) {
                $scope.newTrip.photo = url
            })
        })
    })

    // map function
    function initMap() {
        let options = {
            center: {lat:26.3351,lng:17.228331000000026},
            zoom: 2,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "42"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#ff0000"
                        },
                        {
                            "saturation": "-100"
                        },
                        {
                            "gamma": "0.78"
                        },
                        {
                            "weight": "0.37"
                        },
                        {
                            "invert_lightness": true
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#3ec7c9"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        }
        let map = new google.maps.Map(document.getElementById("map"), options)

        let geocoder = new google.maps.Geocoder()

        // listen to geocoding input on submit
        document.getElementById('submit').addEventListener('click', function() {
            geocodeAddress(geocoder, map)
        })
            
        }
    initMap()

    // geocoding function 
        function geocodeAddress(geocoder, resultsMap) {
        let address = document.getElementById('address').value
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location)
            // geocoding results to add Marker to map
            let marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location, 
                content: `<div ng-repeat="currentTrip in trips"><a href="#!/trips/detail/{{ currentTrip.id }}">View Trip</a></div>`,
                icon: './app/trips/img/rsz_1small_pin.png'
            })
            $scope.newTrip.marker = marker.position

            let infoWindow = new google.maps.InfoWindow({
                content: marker.content
            })
            //  listen to click on marker to display info window
            marker.addListener("click", function(){
                infoWindow.open(map, marker)
            })
            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
        })
        }
    }
    )
    


