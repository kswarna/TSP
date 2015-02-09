angular.module('travelApp')
.controller('resultCtrl', ['$scope','TsParent',
function($scope,TsParent) {
    TsParent.calculateResult();
    $scope.CityLinks = TsParent.GetCityLink();
//    $scope.TestLinks = [{orig:'asd',dest:'asd',dist:'asd'},{orig:'asd',dest:'asd',dist:'asd'},{orig:'asd',dest:'asd',dist:'asd'}]
 }]);