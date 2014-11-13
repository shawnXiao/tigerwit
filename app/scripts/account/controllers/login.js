'use strict';

angular.module('tigerwitApp')
.controller('loginCtrl',
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage', 'wdValidator',
function ($scope, wdAccount, $timeout, $location, wdStorage, wdValidator) {
    $scope.login = {
        phone: '',
        password: '',
        uiLoginError: ''
    };
    $scope.login.expires = "checked";

    $scope.loginFun = function() {
        var validateResObj = wdValidator.validate('phone', $scope.login.phone);
        if (!validateResObj.validate_result) {
            $scope.login.error_msg = validateResObj.validate_reason;
            return;
        }

        wdAccount.login($scope.login).then(function(data) {
            if (data.is_succ) {
                $location.path('/register');
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
