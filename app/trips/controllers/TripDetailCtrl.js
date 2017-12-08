angular
.module("backpackerApp")
.controller("tripDetailCtrl",
// $routeParams holds the URL that catches the id from :tripId
    function ($scope, $routeParams, TripFactory, $location) {
        
        $scope.trip = {}
        
        // go to Firebase and grab the data from the URL and bring it back as an object to use in other controllers. 
        TripFactory.single($routeParams.tripId).then(trip => {
            $scope.trip = trip
        })        

        // contenteditable to edit text and send to Firebase
        $scope.editmode = false
        $scope.toggleEditMode = function() {
            $scope.editmode = $scope.editmode === false ? true: false
        }
        
        app.directive("contenteditable", function() {
            return {
                require: "ngModel",
                link: function(scope, element, attrs, ngModel) {
                    
                    function read() {
                        ngModel.$setViewValue(element.html())
                    }
                    
        // bound to ng-click on trip detail
        $scope.editTrip = () => 
        TripFactory.edit($scope.trip, $routeParams.tripId).then(() =>
        $location.url("/trips/list"))

        // bound to ng-click on trip detail
        $scope.deleteTrip = () => 
        TripFactory.delete($routeParams.tripId).then(() => $location.url("/trips/list"))
    }
)