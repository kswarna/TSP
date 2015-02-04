var App = angular.module('travelApp')
.controller('resultCtrl', ['$scope','TsParent',
function($scope,TsParent,$timeout) {

    $scope.CityLinks = TsParent.GetCityLink();
 }]);