'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalHistoryController',
['$scope', 'wdStock',
function ($scope, wdStock) {
    $scope.rePaintStock = function (count) {
        wdStock.getTestData().then(function (data) {
            var temptData = data.slice(0, count);
            $scope.$broadcast("personal_history", temptData);
        });
    }
    wdStock.getTestData().then(function (data) {
        $scope.$broadcast("personal_history", data);
    });
}]);
