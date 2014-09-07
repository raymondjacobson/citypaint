function makeShape(list_of_coordinates, block_length, w, h, r) {
  // console.log(w + ", " + h);
  var r = list_of_coordinates[0][2];
  var start_x = r * w;
  var start_y = r * h;
  // console.log(start_x + ", " + start_y);
  for (var i = 0; i < list_of_coordinates.length; i++) {
    var x = list_of_coordinates[i][0];
    var y = list_of_coordinates[i][1];
    if (start_x + block_length*(x+1) > w) {
      x = w - block_length;
    } else {
      x = start_x + block_length*x;
    }
    if (start_y + block_length*(y+1) > h) {
      y = h - block_length;
    } else {
      y = start_y + block_length*y;
    }
    makeBlock(x, y, block_length);
  }
}

function makeBlock(x, y, length) {
  d3.select("#area")
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", length)
    .attr("height", length)
}

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
    var ref = new Firebase("https://sentencesoup.firebaseio.com/texts/");
    ref.on('value', function(snapshot) {
      // console.log(snapshot.val());
      angular.forEach(snapshot.val(), function(data) {
        angular.forEach(data, function(data2) {
          coords = [];
          angular.forEach(data2, function(data3) {
            coords.push(data3['coord']);
          });
          // console.log(coords);
          $(document).ready(function() {
            var w = $("#page").width();
            var h = $("#page").height();
            var block_length = 5;
            // makeBlock(15, 15, 5);
            var list_of_coordinates = [
              {"x": 2, "y": 0},
              {"x": 1, "y": 1},
              {"x": 2, "y": 1},
              {"x": 3, "y": 1},
              {"x": 0, "y": 2},
              {"x": 1, "y": 2},
              {"x": 2, "y": 2},
              {"x": 3, "y": 2},
              {"x": 4, "y": 2}
            ];
            makeShape(coords, block_length, w, h);
          });
        });
      });
    });
    // var sync = $firebase(ref);
    // var syncObject = sync.$asObject();
    // syncObject.$loaded().then(function () {
    //   angular.forEach(syncObject, function(data) {
    //     syncObject.$bindTo($scope, "shapes");
    //     // get coords
    //     angular.forEach(data, function(coords) {
    //       });
    //     });
    //   });
    // })
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