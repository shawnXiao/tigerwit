'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalHistoryController',
['$scope', 'wdStock',
function ($scope, wdStock) {

    // 绘画中间历史净收益图
    $scope.rePaintStock = function (count) {
        wdStock.getTestData().then(function (data) {
            var temptData = data.slice(0, count);
            $scope.$broadcast("personal_history", temptData);
        });
    };

    $scope.showDropdown = false;
    $scope.toggleDropdown  = function () {
        $scope.showDropdown = !$scope.showDropdown;
    }

    wdStock.getTestData().then(function (data) {
        $scope.$broadcast("personal_history", data);
    });
}]);
