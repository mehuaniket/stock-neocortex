var app = angular.module('StockNeoApp', ['nvd3', 'ngMaterial', 'ngMdIcons']);


app.controller('StockSearchCtrl',['$scope','$http','$log', function StockSearchCtrl($scope,$http,$timeout, $q, $log) {


  $scope.simulateQuery = false;
  $scope.isDisabled = false;

  $scope.repos = loadAll();
  $scope.querySearch = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange = searchTextChange;

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for repos... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? $scope.repos.filter(createFilterFor(query)) : $scope.repos;
    deferred;
    if ($scope.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    console.log('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    console.log('Item changed to ' + JSON.stringify(item));
  }

  /**
   * Build `components` list of key/value pairs
   */
  function loadAll() {
    var repos= $http.get('nifty/json').then(function(response) {
        console.log(response);
        return response;
    });

    return repos;

  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };

  }
}]);



app.controller('AppCtrl', ['$scope', '$http', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function ($scope, $http, $mdBottomSheet, $mdSidenav, $mdDialog) {

  //=================================================chart area===================================================================


  $scope.options = {
    chart: {
      type: 'ohlcBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60
      },
      x: function (d) { return d['date']; },
      y: function (d) { return d['close']; },
      duration: 100,

      xAxis: {
        axisLabel: 'Dates',
        tickFormat: function (d) {
          return d3.time.format('%x')(new Date(new Date() - (20000 * 86400000) + (d * 86400000)));
        },
        showMaxMin: false
      },

      yAxis: {
        axisLabel: 'Stock Price',
        tickFormat: function (d) {
          return '$' + d3.format(',.1f')(d);
        },
        showMaxMin: false
      },
      zoom: {
        enabled: true,
        scaleExtent: [1, 10],
        useFixedDomain: false,
        useNiceScale: false,
        horizontalOff: false,
        verticalOff: true,
        unzoomEventType: 'dblclick.zoom'
      }
    }
  };

  $scope.data = [{
    values: [
      { "date": 15707, "open": 145.11, "high": 146.15, "low": 144.73, "close": 146.06, "volume": 192059000, "adjusted": 144.65 },
      { "date": 15708, "open": 145.99, "high": 146.37, "low": 145.34, "close": 145.73, "volume": 144761800, "adjusted": 144.32 },
      { "date": 15709, "open": 145.97, "high": 146.61, "low": 145.67, "close": 146.37, "volume": 116817700, "adjusted": 144.95 },
      { "date": 15712, "open": 145.85, "high": 146.11, "low": 145.43, "close": 145.97, "volume": 110002500, "adjusted": 144.56 },
      { "date": 15713, "open": 145.71, "high": 145.91, "low": 144.98, "close": 145.55, "volume": 121265100, "adjusted": 144.14 },
      { "date": 15714, "open": 145.87, "high": 146.32, "low": 145.64, "close": 145.92, "volume": 90745600, "adjusted": 144.51 },
      { "date": 15715, "open": 146.73, "high": 147.09, "low": 145.97, "close": 147.08, "volume": 130735400, "adjusted": 145.66 },
      { "date": 15716, "open": 147.04, "high": 147.15, "low": 146.61, "close": 147.07, "volume": 113917300, "adjusted": 145.65 },
      { "date": 15719, "open": 146.89, "high": 147.07, "low": 146.43, "close": 146.97, "volume": 89567200, "adjusted": 145.55 },
      { "date": 15720, "open": 146.29, "high": 147.21, "low": 146.2, "close": 147.07, "volume": 93172600, "adjusted": 145.65 },
      { "date": 15721, "open": 146.77, "high": 147.28, "low": 146.61, "close": 147.05, "volume": 104849500, "adjusted": 145.63 },
      { "date": 15722, "open": 147.7, "high": 148.42, "low": 147.15, "close": 148, "volume": 133833500, "adjusted": 146.57 },
      { "date": 15723, "open": 147.97, "high": 148.49, "low": 147.43, "close": 148.33, "volume": 169906000, "adjusted": 146.9 },
      { "date": 15727, "open": 148.33, "high": 149.13, "low": 147.98, "close": 149.13, "volume": 111797300, "adjusted": 147.69 },
      { "date": 15728, "open": 149.13, "high": 149.5, "low": 148.86, "close": 149.37, "volume": 104596100, "adjusted": 147.93 },
      { "date": 15729, "open": 149.15, "high": 150.14, "low": 149.01, "close": 149.41, "volume": 146426400, "adjusted": 147.97 },
      { "date": 15730, "open": 149.88, "high": 150.25, "low": 149.37, "close": 150.25, "volume": 147211600, "adjusted": 148.8 },
      { "date": 15733, "open": 150.29, "high": 150.33, "low": 149.51, "close": 150.07, "volume": 113357700, "adjusted": 148.62 },
      { "date": 15734, "open": 149.77, "high": 150.85, "low": 149.67, "close": 150.66, "volume": 105694400, "adjusted": 149.2 },
      { "date": 15735, "open": 150.64, "high": 150.94, "low": 149.93, "close": 150.07, "volume": 137447700, "adjusted": 148.62 },
      { "date": 15736, "open": 149.89, "high": 150.38, "low": 149.6, "close": 149.7, "volume": 108975800, "adjusted": 148.25 },
      { "date": 15737, "open": 150.65, "high": 151.42, "low": 150.39, "close": 151.24, "volume": 131173000, "adjusted": 149.78 },
      { "date": 15740, "open": 150.32, "high": 151.27, "low": 149.43, "close": 149.54, "volume": 159073600, "adjusted": 148.09 },
      { "date": 15741, "open": 150.35, "high": 151.48, "low": 150.29, "close": 151.05, "volume": 113912400, "adjusted": 149.59 },
      { "date": 15742, "open": 150.52, "high": 151.26, "low": 150.41, "close": 151.16, "volume": 138762800, "adjusted": 149.7 },
      { "date": 15743, "open": 151.21, "high": 151.35, "low": 149.86, "close": 150.96, "volume": 162490000, "adjusted": 149.5 },
      { "date": 15744, "open": 151.22, "high": 151.89, "low": 151.22, "close": 151.8, "volume": 103133700, "adjusted": 150.33 },
      { "date": 15747, "open": 151.74, "high": 151.9, "low": 151.39, "close": 151.77, "volume": 73775000, "adjusted": 150.3 },
      { "date": 15748, "open": 151.78, "high": 152.3, "low": 151.61, "close": 152.02, "volume": 65392700, "adjusted": 150.55 },
      { "date": 15749, "open": 152.33, "high": 152.61, "low": 151.72, "close": 152.15, "volume": 82322600, "adjusted": 150.68 },
      { "date": 15750, "open": 151.69, "high": 152.47, "low": 151.52, "close": 152.29, "volume": 80834300, "adjusted": 150.82 },
      { "date": 15751, "open": 152.43, "high": 152.59, "low": 151.55, "close": 152.11, "volume": 215226500, "adjusted": 150.64 },
      { "date": 15755, "open": 152.37, "high": 153.28, "low": 152.16, "close": 153.25, "volume": 95105400, "adjusted": 151.77 },
      { "date": 15756, "open": 153.14, "high": 153.19, "low": 151.26, "close": 151.34, "volume": 160574800, "adjusted": 149.88 },
      { "date": 15757, "open": 150.96, "high": 151.42, "low": 149.94, "close": 150.42, "volume": 183257000, "adjusted": 148.97 },
      { "date": 15758, "open": 151.15, "high": 151.89, "low": 150.49, "close": 151.89, "volume": 106356600, "adjusted": 150.42 },
      { "date": 15761, "open": 152.63, "high": 152.86, "low": 149, "close": 149, "volume": 245824800, "adjusted": 147.56 },
      { "date": 15762, "open": 149.72, "high": 150.2, "low": 148.73, "close": 150.02, "volume": 186596200, "adjusted": 148.57 },
      { "date": 15763, "open": 149.89, "high": 152.33, "low": 149.76, "close": 151.91, "volume": 150781900, "adjusted": 150.44 },
      { "date": 15764, "open": 151.9, "high": 152.87, "low": 151.41, "close": 151.61, "volume": 126866000, "adjusted": 150.14 },
      { "date": 15765, "open": 151.09, "high": 152.34, "low": 150.41, "close": 152.11, "volume": 170634800, "adjusted": 150.64 },
      { "date": 15768, "open": 151.76, "high": 152.92, "low": 151.52, "close": 152.92, "volume": 99010200, "adjusted": 151.44 },
      { "date": 15769, "open": 153.66, "high": 154.7, "low": 153.64, "close": 154.29, "volume": 121431900, "adjusted": 152.8 },
      { "date": 15770, "open": 154.84, "high": 154.92, "low": 154.16, "close": 154.5, "volume": 94469900, "adjusted": 153.01 },
      { "date": 15771, "open": 154.7, "high": 154.98, "low": 154.52, "close": 154.78, "volume": 86101400, "adjusted": 153.28 },
      { "date": 15772, "open": 155.46, "high": 155.65, "low": 154.66, "close": 155.44, "volume": 123477800, "adjusted": 153.94 },
      { "date": 15775, "open": 155.32, "high": 156.04, "low": 155.13, "close": 156.03, "volume": 83746800, "adjusted": 154.52 },
      { "date": 15776, "open": 155.92, "high": 156.1, "low": 155.21, "close": 155.68, "volume": 105755800, "adjusted": 154.17 },
      { "date": 15777, "open": 155.76, "high": 156.12, "low": 155.23, "close": 155.9, "volume": 92550900, "adjusted": 154.39 },
      { "date": 15778, "open": 156.31, "high": 156.8, "low": 155.91, "close": 156.73, "volume": 126329900, "adjusted": 155.21 },
      { "date": 15779, "open": 155.85, "high": 156.04, "low": 155.31, "close": 155.83, "volume": 138601100, "adjusted": 155.01 },
      { "date": 15782, "open": 154.34, "high": 155.64, "low": 154.2, "close": 154.97, "volume": 126704300, "adjusted": 154.15 },
      { "date": 15783, "open": 155.3, "high": 155.51, "low": 153.59, "close": 154.61, "volume": 167567300, "adjusted": 153.8 },
      { "date": 15784, "open": 155.52, "high": 155.95, "low": 155.26, "close": 155.69, "volume": 113759300, "adjusted": 154.87 },
      { "date": 15785, "open": 154.76, "high": 155.64, "low": 154.1, "close": 154.36, "volume": 128605000, "adjusted": 153.55 },
      { "date": 15786, "open": 154.85, "high": 155.6, "low": 154.73, "close": 155.6, "volume": 111163600, "adjusted": 154.78 },
      { "date": 15789, "open": 156.01, "high": 156.27, "low": 154.35, "close": 154.95, "volume": 151322300, "adjusted": 154.13 },
      { "date": 15790, "open": 155.59, "high": 156.23, "low": 155.42, "close": 156.19, "volume": 86856600, "adjusted": 155.37 },
      { "date": 15791, "open": 155.26, "high": 156.24, "low": 155, "close": 156.19, "volume": 99950600, "adjusted": 155.37 },
      { "date": 15792, "open": 156.09, "high": 156.85, "low": 155.75, "close": 156.67, "volume": 102932800, "adjusted": 155.85 },
      { "date": 15796, "open": 156.59, "high": 156.91, "low": 155.67, "close": 156.05, "volume": 99194100, "adjusted": 155.23 },
      { "date": 15797, "open": 156.61, "high": 157.21, "low": 156.37, "close": 156.82, "volume": 101504300, "adjusted": 155.99 },
      { "date": 15798, "open": 156.91, "high": 157.03, "low": 154.82, "close": 155.23, "volume": 154167400, "adjusted": 154.41 },
      { "date": 15799, "open": 155.43, "high": 156.17, "low": 155.09, "close": 155.86, "volume": 131885000, "adjusted": 155.04 },
      { "date": 15800, "open": 153.95, "high": 155.35, "low": 153.77, "close": 155.16, "volume": 159666000, "adjusted": 154.34 },
      { "date": 15803, "open": 155.27, "high": 156.22, "low": 154.75, "close": 156.21, "volume": 86571200, "adjusted": 155.39 },
      { "date": 15804, "open": 156.5, "high": 157.32, "low": 155.98, "close": 156.75, "volume": 101922200, "adjusted": 155.92 },
      { "date": 15805, "open": 157.17, "high": 158.87, "low": 157.13, "close": 158.67, "volume": 135711100, "adjusted": 157.83 },
      { "date": 15806, "open": 158.7, "high": 159.71, "low": 158.54, "close": 159.19, "volume": 110142500, "adjusted": 158.35 },
      { "date": 15807, "open": 158.68, "high": 159.04, "low": 157.92, "close": 158.8, "volume": 116359900, "adjusted": 157.96 },
      { "date": 15810, "open": 158, "high": 158.13, "low": 155.1, "close": 155.12, "volume": 217259000, "adjusted": 154.3 },
      { "date": 15811, "open": 156.29, "high": 157.49, "low": 155.91, "close": 157.41, "volume": 147507800, "adjusted": 156.58 },
      { "date": 15812, "open": 156.29, "high": 156.32, "low": 154.28, "close": 155.11, "volume": 226834800, "adjusted": 154.29 },
      { "date": 15813, "open": 155.37, "high": 155.41, "low": 153.55, "close": 154.14, "volume": 167583200, "adjusted": 153.33 },
      { "date": 15814, "open": 154.5, "high": 155.55, "low": 154.12, "close": 155.48, "volume": 149687600, "adjusted": 154.66 },
      { "date": 15817, "open": 155.78, "high": 156.54, "low": 154.75, "close": 156.17, "volume": 106553500, "adjusted": 155.35 },
      { "date": 15818, "open": 156.95, "high": 157.93, "low": 156.17, "close": 157.78, "volume": 166141300, "adjusted": 156.95 },
      { "date": 15819, "open": 157.83, "high": 158.3, "low": 157.54, "close": 157.88, "volume": 96781200, "adjusted": 157.05 },
      { "date": 15820, "open": 158.34, "high": 159.27, "low": 158.1, "close": 158.52, "volume": 131060600, "adjusted": 157.69 },
      { "date": 15821, "open": 158.33, "high": 158.6, "low": 157.73, "close": 158.24, "volume": 95918800, "adjusted": 157.41 },
      { "date": 15824, "open": 158.67, "high": 159.65, "low": 158.42, "close": 159.3, "volume": 88572800, "adjusted": 158.46 },
      { "date": 15825, "open": 159.27, "high": 159.72, "low": 158.61, "close": 159.68, "volume": 116010700, "adjusted": 158.84 },
      { "date": 15826, "open": 159.33, "high": 159.41, "low": 158.1, "close": 158.28, "volume": 138874200, "adjusted": 157.45 },
      { "date": 15827, "open": 158.68, "high": 159.89, "low": 158.53, "close": 159.75, "volume": 96407600, "adjusted": 158.91 },
      { "date": 15828, "open": 161.14, "high": 161.88, "low": 159.78, "close": 161.37, "volume": 144202300, "adjusted": 160.52 },
      { "date": 15831, "open": 161.49, "high": 162.01, "low": 161.42, "close": 161.78, "volume": 66882100, "adjusted": 160.93 },
      { "date": 15832, "open": 162.13, "high": 162.65, "low": 161.67, "close": 162.6, "volume": 90359200, "adjusted": 161.74 },
      { "date": 15833, "open": 162.42, "high": 163.39, "low": 162.33, "close": 163.34, "volume": 97419200, "adjusted": 162.48 },
      { "date": 15834, "open": 163.27, "high": 163.7, "low": 162.47, "close": 162.88, "volume": 106738600, "adjusted": 162.02 },
      { "date": 15835, "open": 162.99, "high": 163.55, "low": 162.51, "close": 163.41, "volume": 103203000, "adjusted": 162.55 },
      { "date": 15838, "open": 163.2, "high": 163.81, "low": 162.82, "close": 163.54, "volume": 81843200, "adjusted": 162.68 },
      { "date": 15839, "open": 163.67, "high": 165.35, "low": 163.67, "close": 165.23, "volume": 119000900, "adjusted": 164.36 },
      { "date": 15840, "open": 164.96, "high": 166.45, "low": 164.91, "close": 166.12, "volume": 120718500, "adjusted": 165.25 },
      { "date": 15841, "open": 165.78, "high": 166.36, "low": 165.09, "close": 165.34, "volume": 109913600, "adjusted": 164.47 },
      { "date": 15842, "open": 165.95, "high": 167.04, "low": 165.73, "close": 166.94, "volume": 129801000, "adjusted": 166.06 },
      { "date": 15845, "open": 166.78, "high": 167.58, "low": 166.61, "close": 166.93, "volume": 85071200, "adjusted": 166.05 },
      { "date": 15846, "open": 167.08, "high": 167.8, "low": 166.5, "close": 167.17, "volume": 95804200, "adjusted": 166.29 },
      { "date": 15847, "open": 167.34, "high": 169.07, "low": 165.17, "close": 165.93, "volume": 244031800, "adjusted": 165.06 },
      { "date": 15848, "open": 164.16, "high": 165.91, "low": 163.94, "close": 165.45, "volume": 211064400, "adjusted": 164.58 },
      { "date": 15849, "open": 164.47, "high": 165.38, "low": 163.98, "close": 165.31, "volume": 151573900, "adjusted": 164.44 },
      { "date": 15853, "open": 167.04, "high": 167.78, "low": 165.81, "close": 166.3, "volume": 143679800, "adjusted": 165.42 },
      { "date": 15854, "open": 165.42, "high": 165.8, "low": 164.34, "close": 165.22, "volume": 160363400, "adjusted": 164.35 },
      { "date": 15855, "open": 165.35, "high": 166.59, "low": 165.22, "close": 165.83, "volume": 107793800, "adjusted": 164.96 },
      { "date": 15856, "open": 165.37, "high": 166.31, "low": 163.13, "close": 163.45, "volume": 176850100, "adjusted": 162.59 },
      { "date": 15859, "open": 163.83, "high": 164.46, "low": 162.66, "close": 164.35, "volume": 168390700, "adjusted": 163.48 },
      { "date": 15860, "open": 164.44, "high": 165.1, "low": 162.73, "close": 163.56, "volume": 157631500, "adjusted": 162.7 },
      { "date": 15861, "open": 163.09, "high": 163.42, "low": 161.13, "close": 161.27, "volume": 211737800, "adjusted": 160.42 },
      { "date": 15862, "open": 161.2, "high": 162.74, "low": 160.25, "close": 162.73, "volume": 200225500, "adjusted": 161.87 },
      { "date": 15863, "open": 163.85, "high": 164.95, "low": 163.14, "close": 164.8, "volume": 188337800, "adjusted": 163.93 },
      { "date": 15866, "open": 165.31, "high": 165.4, "low": 164.37, "close": 164.8, "volume": 105667100, "adjusted": 163.93 },
      { "date": 15867, "open": 163.3, "high": 164.54, "low": 162.74, "close": 163.1, "volume": 159505400, "adjusted": 162.24 },
      { "date": 15868, "open": 164.22, "high": 164.39, "low": 161.6, "close": 161.75, "volume": 177361500, "adjusted": 160.9 },
      { "date": 15869, "open": 161.66, "high": 164.5, "low": 161.3, "close": 164.21, "volume": 163587800, "adjusted": 163.35 },
      { "date": 15870, "open": 164.03, "high": 164.67, "low": 162.91, "close": 163.18, "volume": 141197500, "adjusted": 162.32 },
      { "date": 15873, "open": 164.29, "high": 165.22, "low": 163.22, "close": 164.44, "volume": 136295600, "adjusted": 163.57 },
      { "date": 15874, "open": 164.53, "high": 165.99, "low": 164.52, "close": 165.74, "volume": 114695600, "adjusted": 164.87 },
      { "date": 15875, "open": 165.6, "high": 165.89, "low": 163.38, "close": 163.45, "volume": 206149500, "adjusted": 162.59 },
      { "date": 15876, "open": 161.86, "high": 163.47, "low": 158.98, "close": 159.4, "volume": 321255900, "adjusted": 158.56 },
      { "date": 15877, "open": 159.64, "high": 159.76, "low": 157.47, "close": 159.07, "volume": 271956800, "adjusted": 159.07 },
      { "date": 15880, "open": 157.41, "high": 158.43, "low": 155.73, "close": 157.06, "volume": 222329000, "adjusted": 157.06 },
      { "date": 15881, "open": 158.48, "high": 160.1, "low": 157.42, "close": 158.57, "volume": 162262200, "adjusted": 158.57 },
      { "date": 15882, "open": 159.87, "high": 160.5, "low": 159.25, "close": 160.14, "volume": 134848000, "adjusted": 160.14 },
      { "date": 15883, "open": 161.1, "high": 161.82, "low": 160.95, "close": 161.08, "volume": 129483700, "adjusted": 161.08 },
      { "date": 15884, "open": 160.63, "high": 161.4, "low": 159.86, "close": 160.42, "volume": 160402900, "adjusted": 160.42 },
      { "date": 15887, "open": 161.26, "high": 162.48, "low": 161.08, "close": 161.36, "volume": 131954800, "adjusted": 161.36 },
      { "date": 15888, "open": 161.12, "high": 162.3, "low": 160.5, "close": 161.21, "volume": 154863700, "adjusted": 161.21 },
      { "date": 15889, "open": 160.48, "high": 161.77, "low": 160.22, "close": 161.28, "volume": 75216400, "adjusted": 161.28 },
      { "date": 15891, "open": 162.47, "high": 163.08, "low": 161.3, "close": 163.02, "volume": 122416900, "adjusted": 163.02 },
      { "date": 15894, "open": 163.86, "high": 164.39, "low": 163.08, "close": 163.95, "volume": 108092500, "adjusted": 163.95 },
      { "date": 15895, "open": 164.98, "high": 165.33, "low": 164.27, "close": 165.13, "volume": 119298000, "adjusted": 165.13 },
      { "date": 15896, "open": 164.97, "high": 165.75, "low": 164.63, "close": 165.19, "volume": 121410100, "adjusted": 165.19 },
      { "date": 15897, "open": 167.11, "high": 167.61, "low": 165.18, "close": 167.44, "volume": 135592200, "adjusted": 167.44 },
      { "date": 15898, "open": 167.39, "high": 167.93, "low": 167.13, "close": 167.51, "volume": 104212700, "adjusted": 167.51 },
      { "date": 15901, "open": 167.97, "high": 168.39, "low": 167.68, "close": 168.15, "volume": 69450600, "adjusted": 168.15 },
      { "date": 15902, "open": 168.26, "high": 168.36, "low": 167.07, "close": 167.52, "volume": 88702100, "adjusted": 167.52 },
      { "date": 15903, "open": 168.16, "high": 168.48, "low": 167.73, "close": 167.95, "volume": 92873900, "adjusted": 167.95 },
      { "date": 15904, "open": 168.31, "high": 169.27, "low": 168.2, "close": 168.87, "volume": 103620100, "adjusted": 168.87 },
      { "date": 15905, "open": 168.52, "high": 169.23, "low": 168.31, "close": 169.17, "volume": 103831700, "adjusted": 169.17 },
      { "date": 15908, "open": 169.41, "high": 169.74, "low": 169.01, "close": 169.5, "volume": 79428600, "adjusted": 169.5 },
      { "date": 15909, "open": 169.8, "high": 169.83, "low": 169.05, "close": 169.14, "volume": 80829700, "adjusted": 169.14 },
      { "date": 15910, "open": 169.79, "high": 169.86, "low": 168.18, "close": 168.52, "volume": 112914000, "adjusted": 168.52 },
      { "date": 15911, "open": 168.22, "high": 169.08, "low": 167.94, "close": 168.93, "volume": 111088600, "adjusted": 168.93 },
      { "date": 15912, "open": 168.22, "high": 169.16, "low": 167.52, "close": 169.11, "volume": 107814600, "adjusted": 169.11 },
      { "date": 15915, "open": 168.68, "high": 169.06, "low": 168.11, "close": 168.59, "volume": 79695000, "adjusted": 168.59 },
      { "date": 15916, "open": 169.1, "high": 169.28, "low": 168.19, "close": 168.59, "volume": 85209600, "adjusted": 168.59 },
      { "date": 15917, "open": 168.94, "high": 169.85, "low": 168.49, "close": 168.71, "volume": 142388700, "adjusted": 168.71 },
      { "date": 15918, "open": 169.99, "high": 170.81, "low": 169.9, "close": 170.66, "volume": 110438400, "adjusted": 170.66 },
      { "date": 15919, "open": 170.28, "high": 170.97, "low": 170.05, "close": 170.95, "volume": 91116700, "adjusted": 170.95 },
      { "date": 15922, "open": 170.57, "high": 170.96, "low": 170.35, "close": 170.7, "volume": 54072700, "adjusted": 170.7 },
      { "date": 15923, "open": 170.37, "high": 170.74, "low": 169.35, "close": 169.73, "volume": 87495000, "adjusted": 169.73 },
      { "date": 15924, "open": 169.19, "high": 169.43, "low": 168.55, "close": 169.18, "volume": 84854700, "adjusted": 169.18 },
      { "date": 15925, "open": 169.98, "high": 170.18, "low": 168.93, "close": 169.8, "volume": 102181300, "adjusted": 169.8 },
      { "date": 15926, "open": 169.58, "high": 170.1, "low": 168.72, "close": 169.31, "volume": 91757700, "adjusted": 169.31 },
      { "date": 15929, "open": 168.46, "high": 169.31, "low": 168.38, "close": 169.11, "volume": 68593300, "adjusted": 169.11 },
      { "date": 15930, "open": 169.41, "high": 169.9, "low": 168.41, "close": 169.61, "volume": 80806000, "adjusted": 169.61 },
      { "date": 15931, "open": 169.53, "high": 169.8, "low": 168.7, "close": 168.74, "volume": 79829200, "adjusted": 168.74 },
      { "date": 15932, "open": 167.41, "high": 167.43, "low": 166.09, "close": 166.38, "volume": 152931800, "adjusted": 166.38 },
      { "date": 15933, "open": 166.06, "high": 166.63, "low": 165.5, "close": 165.83, "volume": 130868200, "adjusted": 165.83 },
      { "date": 15936, "open": 165.64, "high": 166.21, "low": 164.76, "close": 164.77, "volume": 96437600, "adjusted": 164.77 },
      { "date": 15937, "open": 165.04, "high": 166.2, "low": 164.86, "close": 165.58, "volume": 89294400, "adjusted": 165.58 },
      { "date": 15938, "open": 165.12, "high": 166.03, "low": 164.19, "close": 164.56, "volume": 159530500, "adjusted": 164.56 },
      { "date": 15939, "open": 164.9, "high": 166.3, "low": 164.89, "close": 166.06, "volume": 101471400, "adjusted": 166.06 },
      { "date": 15940, "open": 166.55, "high": 166.83, "low": 165.77, "close": 166.62, "volume": 90888900, "adjusted": 166.62 },
      { "date": 15943, "open": 166.79, "high": 167.3, "low": 165.89, "close": 166, "volume": 89702100, "adjusted": 166 },
      { "date": 15944, "open": 164.36, "high": 166, "low": 163.21, "close": 163.33, "volume": 158619400, "adjusted": 163.33 },
      { "date": 15945, "open": 163.26, "high": 164.49, "low": 163.05, "close": 163.91, "volume": 108113000, "adjusted": 163.91 },
      { "date": 15946, "open": 163.55, "high": 165.04, "low": 163.4, "close": 164.17, "volume": 119200500, "adjusted": 164.17 },
      { "date": 15947, "open": 164.51, "high": 164.53, "low": 163.17, "close": 163.65, "volume": 134560800, "adjusted": 163.65 },
      { "date": 15951, "open": 165.23, "high": 165.58, "low": 163.7, "close": 164.39, "volume": 142322300, "adjusted": 164.39 },
      { "date": 15952, "open": 164.43, "high": 166.03, "low": 164.13, "close": 165.75, "volume": 97304000, "adjusted": 165.75 },
      { "date": 15953, "open": 165.85, "high": 166.4, "low": 165.73, "close": 165.96, "volume": 62930500, "adjusted": 165.96 }
    ]
  }];





  //=============================================================================================================================
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.go = function (path) {
    $location.path(path);
  };
 	$scope.menu = [
    {
      link: '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: '',
      title: 'Portfolio',
      icon: 'assessment'
    },
    {
      link: '',
      title: 'loser/gainer',
      icon: 'trending_up'
    }
  ];
  $scope.admin = [
    {
      link: 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    },
    {
      title: 'logout',
      icon: 'user'
    }
  ];
  // $scope.newsindex=10;
  // $scope.MoreNews=function(){
  //   $scope.newsindex=$scope.MoreNews+5;
  //   $http.get('newscrunch/'+String.valueOf($scope.newsindex))
  //         .success(function(data) {
  //             $scope.activity=data;
  //             console.log(data)
  //         })
  //         .error(function(data,status,error,config){
  //             $scope.activity = [{heading:"Error",description:"Could not load json   data"}];
  //         });
  // }

  $http.get('newscrunch/')
    .success(function (data) {
      $scope.activity = data;
      console.log(data)
    })
    .error(function (data, status, error, config) {
      $scope.activity = [{ heading: "Error", description: "Could not load json   data" }];
    });
  $scope.alert = '';
  $scope.showListBottomSheet = function ($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function (clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.showAdd = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
  };
}]);

app.controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function ($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
    console.log("clicked");
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
};

app.directive('userAvatar', function () {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});

app.config(function ($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('light-green', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
});
