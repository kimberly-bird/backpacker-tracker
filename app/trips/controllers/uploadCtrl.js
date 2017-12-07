angular
.module("backpackerApp")
.controller("uploadCtrl", function ($scope) {
    // const currentUID = firebase.auth().currentUser.uid
    $scope.newUpload = {}

    $scope.uploadFile = function () {
    // get file
    let file = {
        "photo": $scope.newUpload.photo
    }
    // get storage reference
    let storageRef = firebase.storage().ref("trip_photos", + file.name)
    // upload file
    let task = storageRef.put(file)
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
        }
    )
    }
})
