'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalHistoryController',
['$scope', 'wdStock',
function ($scope, wdStock) {

    // 绘画中间历史净收益图
    $scope.rePaintStock = function (count) {
        wdStock.getEquityReport({
            period: count
        }).then(function (data) {
            $scope.$broadcast("personal_history", data);
        });
    };

    $scope.showDropdown = false;
    $scope.toggleDropdown  = function () {
        $scope.showDropdown = !$scope.showDropdown;
    }

    wdStock.getEquityReport({
        period: 7
    }).then(function (data) {
        $scope.$broadcast("personal_history", data);
    });


}]);
