function updateScroll(element){
  var element = document.getElementById(element);
  element.scrollTop = element.scrollHeight;
}

var pivotApp = angular.module('pivotApp', ['ngRoute', 'firebase']);

// helpers
var addScript = function(script_name) {
  var s = document.createElement('script');
  s.src = script_name;
  document.body.appendChild(s);
}

// configure angular routes
pivotApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/static/partials/_main.html',
      controller: 'mainCtrl'
    })

    .otherwise({
      templateUrl: 'static/partials/_404.html',
      controller: '404Ctrl'
    })
});

// controllers for routes
pivotApp.controller('defaultCtrl', function($scope) {
});
pivotApp.controller('mainCtrl', ["$scope", "$firebase",
  function($scope, $firebase) {
    $(document).ready(function() {
      console.log($('#page').height());
    });
    var ref = new Firebase("https://sentencesoup.firebaseio.com/texts/");
    var sync = $firebase(ref);
    var syncObject = sync.$asObject();
    syncObject.$loaded().then(function () {
      angular.forEach(syncObject, function(data) {
        // get coords
        angular.forEach(data, function(coords) {
        console.log('coord');
          angular.forEach(coords, function(coord) {
            console.log(coord['coord']);
          })
        });
      });
    })
    // syncObject.$bindTo($scope, "shapes");
    // $scope.$watch("story", function(value) {
    //   var element = document.getElementById("story");
    //   setTimeout(function() {
    //     updateScroll("story");
    //   });
    // });
  }
]);
pivotApp.controller('404Ctrl', function($scope) {
  $scope.message = '404 - an error';
});