'use strict';

angular.module('tigerwitApp')
.controller('wdWebNavbarController',
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdStorage', '$location',
function ($scope, wdAccount, $timeout, wdConfig, wdStorage, $location) {
    $scope.login = {
        phone: '',
        password: '',
        uiLoginError: ''
    };
    $scope.login.expires = "checked";

    $scope.loginFun = function() {
        $scope.login.uiLoginError = '';
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


}]);
