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
            "departureDate": $scope.newTrip.departureDate,
            "returnDate": $scope.newTrip.returnDate,
            "uid": currentUID,
            "photo": $scope.newTrip.photo,
            "rating": targetedStar
        }

        // clear fields and push trip object to tripFactory
        TripFactory.add(trip).then(() => {
            $scope.trips.push(trip)
            $scope.newTrip.country = ""
            $scope.newTrip.departureDate = ""
            $scope.newTrip.returnDate = ""
            
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
})


