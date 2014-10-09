'use strict';

angular.module('tigerwitApp')
.controller('loginCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage',
function ($scope, wdAccount, $timeout, $location, wdStorage) {
    $scope.login = {
        phone: '',
        password: '',
        uiLoginError: ''
    };

    // 进入时的逻辑
    // wdAccount.check().then(function(data) {
    //     if (data.is_succ) {
    //         $location.path('/index');
    //     } else {
    //         $scope.loading = false;
    //     }
    // }, function(data) {
    //     $scope.loading = false;
    // });

    $scope.loginFun = function() {
        $scope.login.uiLoginError = '';
        wdAccount.login($scope.login).then(function(data) {
            if (data.is_succ) {
                $location.path('/register');
            } else {
                $scope.login.uiLoginError = data.error_msg;
            }
        }, function(data) {
            console.log(data);
            $scope.login.uiLoginError = '登录失败';
        });
    };

    $scope.keyDown = function(e) {
        if (e.keyCode === 13) {
            $scope.loginFun();
        }
    };
}]);
