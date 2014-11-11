'use strict';

angular.module('tigerwitApp')
.controller('wdWebNavbarController',
['$scope', 'wdAccount', '$state', '$timeout', 'wdStorage', 'principal', '$location', '$window',
function ($scope, wdAccount, $state, $timeout, wdStorage, principal, $location, $window) {
    var stateUrl = $state.current.url;
    var stateUrlList = stateUrl.split("/");
    $scope.parentState = stateUrlList[1];

    $scope.showTail = false;
    principal.identity().then(function () {
        // 验证用户是否登录
        $scope.authenticated = principal.isAuthenticated();
        $scope.showTail = true;
    });


    // 登录相关操作
    $scope.login = {
        phone: '',
        password: '',
        uiLoginError: ''
    };

    // 是否 cookie 过期
    $scope.login.expires = "checked";
    $scope.loginFun = function() {
        $scope.login.uiLoginError = '';
        wdAccount.login($scope.login).then(function(data) {
            // 登录成功后跳转到个人页面
            if (data.is_succ) {
                $location.path('/personal');
                $window.location.reload();
            } else {
                $scope.login.error_msg = data.error_msg;
            }
        }, function(data) {
            $scope.login.error_msg = '登录失败';
        });
    };

    // 退出
    $scope.signOut = function () {
        wdAccount.logout().then(function (data) {
            if (data.is_succ) {
                $location.path('/index');
                $window.location.reload();
            }
        });
    };

    // 个人信息 hover 框
    $scope.infoDropdownShow = false;
    var hideTimerPromise;
    $scope.showInfoDropdown = function () {
        if (hideTimerPromise) {
            $timeout.cancel(hideTimerPromise);
        }
        $scope.infoDropdownShow = true;
    };

    $scope.hideInfoDropdown = function () {
        hideTimerPromise = $timeout(function () {
            $scope.infoDropdownShow = false;
        }, 300);
    };

}]);
