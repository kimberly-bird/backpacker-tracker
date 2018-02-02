# Backpacker Tracker

This is an app to add past trips to track experiences abroad. 

## Technology used
* AngularJS
* CSS
* Google Firebase for persistent storage of data and files
* Google Maps API

## Configuration
* `npm install angular --save`
* `npm install angular-filter --save`
* `npm install angular-route --save`
* Create [Firebase database](https://firebase.google.com/) (use `app.config.js.example` to configure with Firebase). If you don't have Firebase already configured, see directions [here](https://firebase.google.com/docs/web/setup).

## General App Use
* Authentication: When user first visits site, user is prompted to register with an email and password. To view map/list/add a trip, user must be logged in. User details are found in Firebase > Console > Authentication
* Adding a trip: User can add a trip from the map and list view. Form provides the following fields: Trip Title, [Geocode](https://developers.google.com/maps/documentation/geocoding/intro) of the location (user can enter either a city / city, country / specific address), Trip Dates, Rating of trip (star rating), Memories (separated by comma to display in list form), and photo. All data is sent to and stored in Firebase storage.
* [Google Maps:](https://developers.google.com/maps/documentation/javascript/adding-a-google-map) On adding a trip, Geocoding will add the latitude and longitude of the location. On map view, Google maps is displayed with [markers](https://developers.google.com/maps/documentation/javascript/markers). When marker is clicked, an [info window](https://developers.google.com/maps/documentation/javascript/infowindows) pops up with the trip title and a link to view the trip detail. 
* Timeline: The timeline view displays all user's trips in descending order. User may search by trip title to filter down. User may click trip title to visit details of trip.
* Trip detail page: When user clicks an individual trip title from the map or timeline view, user is taken to the details of that trip. All information user entered when they created the trip is displayed. User may also delete the trip from this page and the data is removed from Firebase storage.

