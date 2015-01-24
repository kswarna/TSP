'use strict';

/**
 * @ngdoc function
 * @name travelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the travelApp
 */
angular.module('travelApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
