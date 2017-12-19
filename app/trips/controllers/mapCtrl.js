angular
.module("backpackerApp")
.controller("mapCtrl",
    function ($scope, TripFactory) {

        // empty array to hold coordinates of user's saved trips
        $scope.marker = []
        let country = $scope.country

        // google map function
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

                let marker = new google.maps.Marker({
                    position: properties.position,
                    map:map,
                    content: `<div><a href="#!/trips/detail/${ properties.id }">View Trip ${ properties.country }</a></div>`,
                    icon: './app/trips/img/rsz_1small_pin.png'
                })
        
                let infoWindow = new google.maps.InfoWindow({
                    content: 
                    `<div id="iw-container">
                        <a href="#!/trips/detail/${ properties.id }"> 
                        <div class="iw-title">${ properties.country }</div> 
                        <div class="iw-subTitle">View Trip</a></div>
                    </div>`,
                    icon: './app/trips/img/rsz_1small_pin.png'
                })
        
                marker.addListener("click", function(){
                    infoWindow.open(map, marker)
                })
            }
        }
        initMap()

    }
)

