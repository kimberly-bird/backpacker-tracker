angular
.module("backpackerApp")
.controller("mapCtrl",
    function ($scope, TripFactory) {

        // empty array to hold coordinates of user's saved trips
        $scope.marker = []

        function initMap() {
            let options = {
                center: {lat:47.1625,lng:19.5033},
                zoom: 1,
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

            // listen for click on map - change to connect to a trip detail
            // google.maps.event.addListener(map, "click", function (event) {
            //     // add marker to map
            //     addMarker({coordinates:event.latLng, content:"<h4>View Trip</h4>"})
            // })

            // get results from firebase
            TripFactory.list().then(result => {
                $scope.marker = result

                // loop over array to invoke addMarker function
                for (let i = 0; i < result.length; i++) {
                    addMarker(result[i])               
                }
            })
        
            // add marker function
            function addMarker (properties) {
                // debugger
                let marker = new google.maps.Marker({
                    position: properties.position,
                    map:map,
                    content: `<div><a href="#!/trips/detail/${ properties.id }">View Trip</a></div>`
                })
        
                let infoWindow = new google.maps.InfoWindow({
                    content: `<div ><a href="#!/trips/detail/${ properties.id }">View Trip</a></div>`
                })
        
                marker.addListener("click", function(){
                    infoWindow.open(map, marker)
                })
            }
        }
        initMap()

    }
)

