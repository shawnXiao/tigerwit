'use strict';

angular.module('tigerwitApp')
.controller('loginCtrl',
['$scope', '$window', 'wdAccount', '$timeout', '$location', 'wdStorage', 'wdValidator',
function ($scope, $window, wdAccount, $timeout, $location, wdStorage, wdValidator) {
    $scope.login = {
        phone: '',
        password: '',
        uiLoginError: ''
    };
    $scope.login.expires = "checked";

    $scope.loginFun = function () {
        var validateResObj = wdValidator.validate('phone', $scope.login.phone);
        if (!validateResObj.validate_result) {
            $scope.login.error_msg = validateResObj.validate_reason;
            return;
        }
        if (!$scope.login.expires) {
            $scope.login.expires = 0;
        }

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

    $scope.keyDown = function(e) {
        if (e.keyCode === 13) {
            $scope.loginFun();
        }
    };
}]);
