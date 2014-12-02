'use strict';

angular.module('tigerwitApp')
.controller('wdWebMarketingController',
['$scope', 'wdAccount', '$timeout', '$state', '$window', 'wdValidator', 'wdStorage', '$location', 'wdAccountMoney', 'principal', 'i18nConf',
function ($scope, wdAccount, $timeout, $state, $window, wdValidator, wdStorage, $location,  wdAccountMoney, principal, i18nConf) {
    var stateName = $state.current.name;

    $scope.moduleId =  "tigerwit-" + stateName;
    $scope.i18nConf = i18nConf;
    $scope.i18nLang = "cn";
    if (stateName === "index") {
        $scope.i18n =  true;
    }

    $scope.changeLang = function (lang) {
        $scope.i18nLang = lang;
    }

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


    // 进入时的逻辑
    // 判断用户是否登录和用户的属性
    // 登录用户：去掉提醒用户开户的横条
    principal.identity().then(function () {
        // 验证用户是否登录
        if (principal.isLogined()) {
            $scope.isLogin = true;
            wdAccount.getInfo().then(function(data) {
                $scope.hasLoadProfile = true;
                $scope.profile = data;
                $scope.verified = data.verified;
                if (data.verified) {
                    // 获取个人的资产信息
                    (function getEquity() {
                       wdAccountMoney.equityLast().then(function (data) {
                           $scope.equityInfo = data;
                           $timeout(getEquity, 5 * 1000)
                       });
                    }());
                }
            });
        } else {
            $scope.isLogin = false;
        }
    });

    // 获得邀请码
    $scope.getInviteLink = function () {
        if ($scope.isLogin) {
            wdAccount.getInviteLink().then(function (msg) {
                $scope.inviteLink = msg.invite_url;
                $scope.showInviteLink = true;
            });
        } else {
            $location.path("/login");
        }
    };

    $scope.copyInviteLink = function () {
        $window.prompt("Ctrl + c ( Mac 系统：command + c ) 复制到剪切板，点击'确定'", $scope.inviteLink);
    };

}]);
