'use strict';

angular.module('tigerwitApp')
.controller('wdWebMarketingController',
['$scope', 'wdAccount', '$timeout', '$state', 'wdValidator', 'wdStorage', '$location',
function ($scope, wdAccount, $timeout, $state, wdValidator, wdStorage, $location) {
    var stateName = $state.current.name;
    $scope.moduleId =  "tigerwit-" + stateName;
    $scope.stateName = stateName;

    var slides = $scope.slides = [];
    $scope.myInterval = 3000;
    $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
            image: "hh"
        });
    };

    for (var i = 0; i < 2; i ++) {
        $scope.addSlide();
    }

    // 进入时的逻辑
    // 判断用户是否登录和用户的属性
    // 登录用户：去掉提醒用户开户的横条
    $scope.isLogin = false;
    wdAccount.check().then(function(data) {
        // 已经完成注册申请过程
        if (data.is_succ) {
            $scope.isLogin = true;
            wdAccount.getInfo().then(function (data) {
                $scope.verified = data.verified;
            });
        }
    }, function(data) {});


    $scope.submit_text = "开通账号";
    $scope.error_msg = "";
    $scope.signIn = {};
    $scope.goToRegister = function() {
        var validatePhone = wdValidator.validateFuns.phone($scope.signIn.phone);
        if (!$scope.signIn.phone) {
            $scope.error_msg = "手机号码为空，请输入手机号码";
            return;
        }
        if (!validatePhone.validate_result) {
            $scope.error_msg = validatePhone.validate_reason;
            return;
        } else {
            wdAccount.exits($scope.signIn.phone).then(function (msg) {
                if (msg.data) {
                    $scope.error_msg = "该号码已经注册过一次";
                } else {
                    $location.path('/regist').search('phone', $scope.signIn.phone);
                }
            });
        }
    };


    function verifyPhone() {
        return wdAccount.verifyPhone($scope.signIn);
    }
}]);
