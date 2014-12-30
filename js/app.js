'use strict';

var MCCalorieCounterApp = angular.module('MCCalorieCounterApp', [
  'ngRoute',
  'MCCalorieCounterApp',
  'ngSanitize'
]);

MCCalorieCounterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
		when('/count/:day', {
			templateUrl: 'partials/count.html',
			controller: 'DefaultCtrl'
		}).
		when('/settings', {
			templateUrl: 'partials/settings.html',
			controller: 'DefaultCtrl'
		}).
		otherwise({
			redirectTo: '/count/Mon'
		});
  }]);
var timeoutId;