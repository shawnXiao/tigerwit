'use strict';

angular.module('tigerwitApp')
.controller('wdWebMarketingController',
['$scope', 'wdAccount', '$timeout', 'wdValidator', 'wdStorage', '$location',
function ($scope, wdAccount, $timeout, wdValidator, wdStorage, $location) {
    var slides = $scope.slides = [];
    $scope.myInterval = 3000;
    $scope.moduleId = "tigerwitIndex";

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

        if (!validatePhone.validate_result) {
            $scope.error_msg = validatePhone.validate_reason;
            return;
        }

        $location.path('/regist').search('phone', $scope.signIn.phone);
    };


    function verifyPhone() {
        return wdAccount.verifyPhone($scope.signIn);
    }
}]);
