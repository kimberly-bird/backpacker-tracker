angular
.module("backpackerApp")
.controller("mapCtrl",
    function ($scope) {

        function initMap() {
            let options = {
                zoom: 2,
                center: {lat:47.1625,lng:19.5033}
            }
            let map = new google.maps.Map(document.getElementById("map"), options)
        
            // listen for click on map
            google.maps.event.addListener(map, "click", function (event) {
                // add marker to map
                addMarker({coordinates:event.latLng, content:"<h4>View Trip</h4>"})
            })
        
            // array of marker properties
            let markerCollection = [
                { 
                    coordinates: {lat:47.4979,lng:19.0402}, 
                    content: "<h4>View Trip</h4>"
                },
                { 
                    coordinates: {lat:21.5218,lng:-77.7812}, 
                    content: "<h4>View Trip</h4>"
                }
            ]
        
            // loop over array to invoke addMarker function
            for (let i = 0; i < markerCollection.length; i++) {
                addMarker(markerCollection[i])               
            }
        
            // add marker function
            function addMarker (properties) {
                let marker = new google.maps.Marker({
                    position: properties.coordinates,
                    map:map,
                    content: properties.content
                })
        
                let infoWindow = new google.maps.InfoWindow({
                    content: properties.content
                })
        
                marker.addListener("click", function(){
                    infoWindow.open(map, marker)
                })
            }
        }
        initMap()
    }
)

