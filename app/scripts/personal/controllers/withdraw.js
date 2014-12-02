'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalWithdrawController',
['$scope', 'wdAccount', '$timeout', '$interval', '$location', 'wdAccountMoney', 'principal', '$modal', 'wdValidator',
function ($scope, wdAccount, $timeout, $interval, $location, wdAccountMoney, principal, $modal, wdValidator) {

    $scope.withdrawInfo = {};

    wdAccount.getParity().then(function (msg) {
        if (msg.is_succ) {
            $scope.parity = msg.parity;
        }
    });

    $scope.withdraw = function () {

        // 弹出需要成为真实账户的提示
        var modalInstance;
        if (!$scope.profile.verified) {
            var modalConf = {};
            modalConf.templateUrl = 'views/personal/verfied_modal.html';
            modalConf.backdrop = true;
            modalInstance = $modal.open(modalConf);
            return;
        }

        var validateAllInput = wdValidator.validateInput('personal-withdraw');
        $scope.withdrawInfo.error_msg = '';

        if (!wdValidator.validateFuns.required($scope.withdrawInfo.card_id).validate_result) {
            $scope.withdrawInfo.error_msg = "卡号为必填项！";
            return;
        }

        if (!wdValidator.validateFuns.required($scope.withdrawInfo.bank_name).validate_result) {
            $scope.withdrawInfo.error_msg = "开户行名称为必填项！";
            return;
        }

        if (!wdValidator.validateFuns.required($scope.withdrawInfo.amount).validate_result) {
            $scope.withdrawInfo.error_msg = "提取金额为必填项！";
            return;
        }

        if (!wdValidator.validateFuns.text($scope.withdrawInfo.card_id, "text:num").validate_result) {
            $scope.withdrawInfo.error_msg = "卡号必须为数字！";
            return;
        }


        var MAX_WITHDRAW = 1000000;
        if ($scope.equityInfo && $scope.equityInfo.equity > 0) {
            $scope.limit = 0.01;
            $scope.max = $scope.equityInfo.equity > MAX_WITHDRAW ? MAX_WITHDRAW : $scope.equityInfo.equity;
        } else {
            $scope.withdrawInfo.error_msg = "您好，你暂时没有金额可供提取！";
            return;
        }

        if (wdValidator.validateFuns.money($scope.withdrawInfo.amount).validate_result) {
            if (($scope.withdrawInfo.amount - 0 ) < ($scope.limit - 0)) {
                $scope.withdrawInfo.error_msg = "您好，你本次的最低出金额为 " + $scope.limit + " 美元";
                return;
            }

            if (($scope.withdrawInfo.amount -0 ) > ($scope.max - 0)) {
                $scope.withdrawInfo.error_msg = "您好，你本次的最高出金额为 " + $scope.max + " 美元";
                return;
            }

        } else {
            $scope.withdrawInfo.error_msg = "您好，输入项只能是整数或者保留两位的小数！";
            return;
        }


        // 从 wdPersonalController 获取用户的基本信息
        var modalConf = {
            templateUrl: 'views/personal/deposit_modal.html',
            backdrop: 'static'
        };

        $scope.withdrawInfo.amount = Number($scope.withdrawInfo.amount).toFixed(2);
        wdAccountMoney.withdraw($scope.withdrawInfo).then(function (msg) {
            if (msg.is_succ) {
                $scope.withdrawSucc = true;
            }
        });

    }
}]);
