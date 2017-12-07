// get photo elements
let uploader = document.getElementById("uploader")
let fileButton = document.getElementById("fileButton")

// listen to change event
fileButton.addEventListener("change", function (e) {
    // get file
    let file = e.target.files[0]
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
})