 var App = angular.module('travelApp')
.controller('oneCtrl', ['$scope','CityFactory', 
function($scope,CityFactory,$timeout) {
  $scope.AvailableCities = [
    { 'Name': 'Item 1', 'drag': true },
    { 'Name': 'Item 2', 'drag': true },
	{ 'Name': 'Item 3', 'drag': true },
    { 'Name': 'Item 4', 'drag': true },
    { 'Name': 'Item 5', 'drag': true },
    { 'Name': 'Item 6', 'drag': true },
    { 'Name': 'Item 7', 'drag': true },
    { 'Name': 'Item 8', 'drag': true }
];
  $scope.selectedCities = [];
  

  // // Limit items to be dropped in unselectedCities
  // $scope.optionsunselectedCities = {
    // accept: function(dragEl) {
      // if ($scope.unselectedCities.length >= 2) {
        // return false;
      // } else {
        // return true;
      // }
    // }
  // };
 }]);