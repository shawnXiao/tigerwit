'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalDepositController',
['$scope', 'wdAccount', '$timeout', '$location', 'wdAccountMoney', 'principal',
function ($scope, wdAccount, $timeout, $location, wdAccountMoney, principal) {
    var equitySocket;
    console.log("haha");
    console.log(principal.isAuthenticated());
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
                //$location.path('/index');
            }
        }, function() {
        });
    };

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
