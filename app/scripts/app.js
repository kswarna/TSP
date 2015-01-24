'use strict';

/**
 * @ngdoc overview
 * @name travelApp
 * @description
 * # travelApp
 *
 * Main module of the application.
 */
angular
  .module('travelApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ngDragDrop'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
	  .when('/select', {
        templateUrl: 'views/select.html',
        controller: 'oneCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
