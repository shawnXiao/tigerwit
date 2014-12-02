'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalHistoryController',
['$scope', 'wdStock',
function ($scope, wdStock) {

    $scope.currentPain = "一周";
    // 绘画中间历史净收益图
    $scope.rePaintStock = function (count, currentPain) {
        $scope.currentPain = currentPain;
        wdStock.getEquityReport({
            period: count
        }).then(function (data) {
            $scope.$broadcast("personal_history", data.data);
        });
    };

    wdStock.getEquityReport({
        period: 7
    }).then(function (data) {
        $scope.$broadcast("personal_history", data.data);
    });

    wdStock.getSummaryReport().then(function (data) {
        $scope.summary = data;
    });

    // 默认获取交易历史
    var lastId = 0;
    wdStock.getHistory({
        count: 30
    }).then(function (data) {
        var dataLen = data.data.length;
        if (dataLen) {
            $scope.historyTable = data.data;
            lastId = data.data[dataLen - 1].id;
        } else {
            $scope.historyTable = [];
        }
    });

    var isGetting = false;
    $scope.getMoreHistory = function () {
        if (isGetting) {
            return;
        }

        isGetting = true;
        wdStock.getHistory({
            count: 30,
            after: lastId
        }).then(function (data) {
            isGetting = false;
            var dataLen = data.data.length;
            if (dataLen) {
                $scope.historyTable = $scope.historyTable.concat(data.data)
                lastId = data.data[dataLen - 1].id;
            }
        });
    }
}]);
