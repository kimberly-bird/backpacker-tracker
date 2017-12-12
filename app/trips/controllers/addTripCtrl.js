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
            
            // redirect to list after submitting form
            $timeout(() => {
                $location.url("/trips/list")
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
            starCollection[i].classList.add("active")   
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

    // array of marker properties
    // let markerCollection = [
    //     { 
    //         coordinates: {lat:47.4979,lng:19.0402}, 
    //         content: "<h4>View Trip</h4>"
    //     },
    //     // { 
    //     //     coordinates: {lat:21.5218,lng:-77.7812}, 
    //     //     content: "<h4>View Trip</h4>"
    //     // }
    // ]
    // map function
    function initMap() {
        let options = {
            zoom: 2,
            center: {lat:47.1625,lng:19.5033}
        }
        let map = new google.maps.Map(document.getElementById("map"), options)

        let geocoder = new google.maps.Geocoder()
        
        // listen for click on map - stretch
        // google.maps.event.addListener(map, "click", function (event) {
        //     // add marker to map
        //     addMarker({coordinates:event.latLng, content:"<h4>View Trip</h4>"})
        // })

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
                content: "<h4>View Trip</h4>"
            })
            $scope.newTrip.marker = marker.position

            let infoWindow = new google.maps.InfoWindow({
                content: marker.content
            })
    
            marker.addListener("click", function(){
                infoWindow.open(map, marker)
            })
            //push geocoded results to markerCollection array
            // addMarker()
            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
        })
        }
    }
    )
    


