function makeShape(list_of_coordinates, block_length, w, h, r) {
  var r1 = list_of_coordinates[0][3];
  var r2 = list_of_coordinates[0][4];
  var start_x = r1 * w;
  var start_y = r2 * h;
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
    makeBlock(x, y, block_length, colorMap(list_of_coordinates[i][2]));
  }
}

function makeBlock(x, y, length, color) {
  d3.select("#area")
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", length)
    .attr("height", length)
    .attr("fill", color);
}

function colorMap(c) {
  cmap = {
    'f': '#fefefe',
    'r': '#D63D4A',
    'o': '#C6802A',
    'y': '#D4C435',
    'g': '#26B532',
    'b': '#2578AD',
    'p': '#6224A8'
  }
  if (c in cmap) {
    return cmap[c];
  }
  return '#fefefe';
}

function updateScroll(element){
  var element = document.getElementById(element);
  element.scrollTop = element.scrollHeight;
}

function updateWindow(){
    var x = $('#page').width();
    var y = $('#page').height();

    console.log(x + ", " + y);

    var svg = d3.select('svg')
        .attr('width', x)
        .attr('height', y);
}
window.onresize = updateWindow;

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
            makeShape(coords, block_length, w, h);
          });
        });
      });
    });
  }
]);
pivotApp.controller('404Ctrl', function($scope) {
  $scope.message = '404 - an error';
});