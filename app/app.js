const app = angular.module("backpackerApp", ["ngRoute"])

angular.module("backpackerApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

let isAuth = AuthFactory => new Promise ((resolve, reject) => {

    if (AuthFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("backpackerApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes 
     */
    $routeProvider
        .when("/", {
            templateUrl: "app/trips/partials/map.html",
            controller: "mapCtrl",
            resolve: { isAuth }
        })
        .when("/trips/list", {
            templateUrl: "app/trips/partials/listAllTrips.html",
            controller: "listAllTripsCtrl",
            resolve: { isAuth }
        })
        .when('/trips/new', {
            templateUrl: 'app/trips/partials/addTrip.html',
            controller: 'addTripCtrl',
            resolve: { isAuth }
        })
        .when('/trips/detail/:tripId', {
            templateUrl: 'app/trips/partials/tripDetail.html',
            controller: 'tripDetailCtrl',
            resolve: { isAuth }
        })
        .when('/auth', {
            templateUrl: 'app/auth/partials/auth.html',
            controller: 'AuthCtrl'
        })
        .when("/trips/map", {
            templateUrl: "app/trips/partials/map.html",
            controller: "mapCtrl",
            resolve: { isAuth }
        })
        .otherwise('/auth')
})