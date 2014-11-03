'use strict';

angular.module('tigerwitApp')
.controller('wdWebMarketingController',
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdStorage', '$location',
function ($scope, wdAccount, $timeout, wdConfig, wdStorage, $location) {
    var slides = $scope.slides = [];
    $scope.myInterval = 3000;

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
            image: "haha"
        });
    };

    for (var i = 0; i < 4; i ++) {
        $scope.addSlide();
    }

    // 进入时的逻辑
    // 判断用户是否登录和用户的属性
    // 登录用户：去掉提醒用户开户的横条，去掉提醒用户登录注册的安妮
    // 登录的虚拟用户：增加虚拟用户转位真实账户的入口
    $scope.isLogin = false;
    wdAccount.check().then(function(data) {
        // 已经完成注册申请过程
        console.log(data);
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
        $scope.submit_text = "发送验证码中...";
        console.log($scope.signIn);
        verifyPhone().then(function(data) {
            if (data.is_succ) {
                $location.path('/register').search('phone', $scope.signIn.phone);
            } else {
                $scope.error_msg = data.error_msg;
            }
        });
    };


    function verifyPhone() {
        return wdAccount.verifyPhone($scope.signIn);
    }

}]);
