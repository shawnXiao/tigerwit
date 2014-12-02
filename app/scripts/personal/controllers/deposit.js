'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalDepositController',
['$scope',  'wdAccount', 'wdValidator', 'wdAccountMoney', 'principal', '$modal', '$window', '$timeout', '$state', '$stateParams',
function ($scope, wdAccount, wdValidator, wdAccountMoney, principal, $modal, $window, $timeout, $state, $stateParams) {

    $scope.today = (+ new Date());

    wdAccount.getParity().then(function (msg) {
        if (msg.is_succ) {
            $scope.parity = msg.parity;
        }
    });

    wdAccount.getDepositLimit().then(function (msg) {
        if (msg.is_succ) {
            $scope.limit = msg.limit;
        }
    });
    $scope.max = 1000000;

    $scope.deposit = {};
    // 金额要增加两位小数
    $scope.pay = function () {
        $scope.deposit.error_msg = "";

        var validateResObj = wdValidator.validate('money', $scope.deposit.recharge);

        if (!validateResObj.validate_result) {
            return;
        }


        // 弹出需要成为真实账户的提示
        var modalInstance;
        if (!$scope.profile.verified) {
            modalInstance = $modal.open({
                templateUrl: 'views/personal/verfied_modal.html',
            });
            return;
        }

        if (($scope.deposit.recharge - 0 ) < ($scope.limit - 0)) {
            $scope.deposit.error_msg = "您好，你本次的最低入金额为 " + $scope.limit + " 美元";
            return;
        }

        if (($scope.deposit.recharge - 0 ) > ($scope.max - 0)) {
            $scope.deposit.error_msg = "您好，你本次的最高入金额为 " + $scope.max + " 美元";
            return;
        }

        var num = Number($scope.deposit.recharge);
        if (String(typeof(num)).toLocaleLowerCase() === 'number') {

            // 浏览器会阻止非点击的默认行为
            // http://theandystratton.com/2012/how-to-bypass-google-chromes-javascript-popup-blocker
            var w = $window.open('#/static/waiting');
            wdAccountMoney.pay(Number(num).toFixed(2)).then(function (data) {
                if (data.is_succ) {
                    modalInstance = $modal.open({
                        templateUrl: 'views/personal/deposit_modal.html',
                        backdrop: 'static',
                        controller: function ($scope, $modalInstance) {
                            $scope.depositSucc = function () {
                                $modalInstance.close(true);
                            };
                            $scope.depositFail = function () {
                                OpenChat();
                                $modalInstance.dismiss();
                            };
                        }
                    });

                    modalInstance.result.then(function (result) {
                        $scope.depositSucc = result;
                    });

                    w.location = data.url;
                } else {

                    $scope.deposit.error_msg = data.error_msg;
                }
            });

        }
    };
}]);
