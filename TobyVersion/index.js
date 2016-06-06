/*

http://api.themoviedb.org/3/movie/now_playing?api_key=API_code
http://api.themoviedb.org/3/movie/:id?api_key=API_code
*/

var API_KEY = 'fec8b5ab27b292a68294261bb21b04a5';
var app = angular.module('movie-app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'main.html'
    })
    // Line 16 is connected to Line 39.
    .when('/:movieInfo', {
      controller: 'DetailsController',
      templateUrl: 'details.html'
    })
});

app.controller('MainController', function($scope, $http) {
  $http({
    url: 'http://api.themoviedb.org/3/movie/now_playing',
    params: {
      api_key: API_KEY
    }
  })
  // Line 31 (function(data) captures the data. Line 32 data.results takes the Array called
  // results and displays them.
  .success(function(data) {
    $scope.movies = data.results;
    console.log($scope.movies);
  });
});

app.controller('DetailsController', function($scope, $http, $routeParams) {
  var movieInfo = $routeParams.movieInfo;
  $scope.movieId = movieInfo;
  var url = 'http://api.themoviedb.org/3/movie/' + movieInfo;
  $http({
    url: url,
    params: {
      api_key: API_KEY
    }
  })
  /*
  or equivalent to:
  $http.get(url + '?api_key=' + API_key)
  */
  // You CAN'T change api_key anywhere in the code. It is hard coded that way.
  .success(function(data) {
    $scope.movie = data;
    console.log(data);
  });

});
