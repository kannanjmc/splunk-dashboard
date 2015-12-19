'use strict';

angular.module('myApp.home', ['ngRoute'])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.title = "Overview"

  function isCurrentCategory(v) {
    return v === 'home';
  }
  $scope.isCurrentCategory = isCurrentCategory;

  $http.get('configuration/charts.json').success(function(data) {
    $scope.charts = data;
  })

  $http.get('configuration/searches.json').success(function(data) {
    $scope.searches = data;
  })

  $http.get('configuration/details.json').success(function(data) {
    $scope.details = data;
  })

  var deps = [
      'splunkjs/ready!',
      'splunk_utils'
  ];
  require(deps, function () {

    require(['splunk_utils'], function(util) {
      $scope.charts.map(util.createChart);
      $scope.details.map(util.createChart);
      $scope.searches.map(util.createSearch);

      $scope.$on('$destroy', function() {
        $scope.charts.map(destroyInstance);
        $scope.details.map(destroyInstance);
        $scope.searches.map(destroyInstance);
      });

    });

  });
}]);
