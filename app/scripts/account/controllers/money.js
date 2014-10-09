'use strict';

angular.module('tigerwitApp')
.controller('moneyCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdAccountMoney', 
function ($scope, wdAccount, $timeout, $location, wdAccountMoney) {
    var equitySocket;
    $scope.user = {
        money: {
            available: '0.00',
            recharge: '1.00',
            uiRecharge: false
        },
    };

    $scope.logout = function() {
        wdAccount.logout().then(function(data) {
            if (data.is_succ) {
                $location.path('/index');
            }
        }, function() {
        });
    };

    wdAccount.check().then(function(data) {
        if (data.is_succ) {
            $scope.loading = false;
            getInfo();
        } else {
            $location.path('/index');
        }
    }, function() {
        $location.path('/index');
    });

    equitySocket = wdAccountMoney.equitySocket();
    equitySocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data);
    };

    function getInfo() {
        wdAccount.getInfo().then(function(data) {
            console.log(data);
            $scope.user.money.available = data.money.available;
        });
    }

    // 金额要增加两位小数
    $scope.pay = function() {
        var num = Number($scope.user.money.recharge);
        if (String(typeof(num)).toLocaleLowerCase() === 'number') {
            wdAccountMoney.pay(Number(num).toFixed(2));
        }
    };
}]);
