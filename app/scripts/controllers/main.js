'use strict';

/**
 * @ngdoc function
 * @name travelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelApp
 */
angular.module('travelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
