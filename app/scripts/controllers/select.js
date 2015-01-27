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
  
$scope.AddAvailableCity = function()
{
	CityFactory.verify().then(
	function()
	{
		alert(CityFactory.geo());
	});
	$scope.div_hide();
};
$scope.div_show =function()  {
document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
$scope.div_hide = function(){
document.getElementById('abc').style.display = "none";
}
 }]);