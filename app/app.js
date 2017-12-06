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
     * Configure all Angular application routes here -- needs updating to align with my trips controllers
     */
    $routeProvider
        .when("/", {
            templateUrl: "app/trips/partials/list.html",
            controller: "EmployeeListCtrl",
            resolve: { isAuth }
        })
        .when("/trips/list", {
            templateUrl: "app/trips/partials/list.html",
            controller: "EmployeeListCtrl",
            resolve: { isAuth }
        })
        .when('/trips/new', {
            templateUrl: 'app/trips/partials/create.html',
            controller: 'EmployeeCreateCtrl',
            resolve: { isAuth }
        })
        .when('/trips/detail/:employeeId', {
            templateUrl: 'app/trips/partials/detail.html',
            controller: 'EmployeeDetailCtrl',
            resolve: { isAuth }
        })
        .when('/auth', {
            templateUrl: 'app/auth/partials/auth.html',
            controller: 'AuthCtrl'
        })
        .otherwise('/auth')
})