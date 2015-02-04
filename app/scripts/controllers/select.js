 var App = angular.module('travelApp')
.controller('oneCtrl', ['$scope','CityFactory', 
function($scope,CityFactory,$timeout) {
  $scope.AvailableCities = CityFactory.GetAvailableCities();
  $scope.selectedCities = CityFactory.GetSelectedCities();
 
// Function to add City to Availability List 
$scope.AddAvailableCity = function(Location)
{
	CityFactory.AddAvailableCity(Location);
	$scope.div_hide();
};

//Function to Show Popup
$scope.div_show =function()  {
document.getElementById('abc').style.display = "block";
};

//Function to Hide Popup
$scope.div_hide = function(){
document.getElementById('abc').style.display = "none";
}
 }]);