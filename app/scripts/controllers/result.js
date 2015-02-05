angular.module('travelApp')
.controller('resultCtrl', ['$scope','TsParent',
function($scope,TsParent) {

    $scope.CityLinks = TsParent.GetCityLink();
 }]);