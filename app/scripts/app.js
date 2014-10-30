'use strict';

/**
 * @ngdoc overview
 * @name tigerwitApp
 * @description
 * # tigerwitApp
 *
 * Main module of the application.
 */
angular
.module('tigerwitApp',
['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
$routeProvider
    .when('/index', {
        templateUrl: 'views/web/index.html',
        controller: 'wdWebMarketingController'
    })
    .when('/personal', {
        templateUrl: 'views/personal/index.html',
        controller: 'wdWebPersonalController'
    })
    .when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'loginCtrl'
    })
    .when('/register', {
        templateUrl: 'views/account/register.html',
        controller: 'registerCtrl'
    })
    .when('/reset', {
        templateUrl: 'views/account/reset_password.html',
        controller: 'registerCtrl'
    })
    .when('/register_succ', {
        templateUrl: 'views/account/register_succ.html'
    })
    .when('/money', {
        templateUrl: 'views/account/money.html',
        controller: 'moneyCtrl'
    })
    .otherwise({
        redirectTo: '/index'
    });

    // 全局 $http 请求配置。
    $httpProvider.interceptors.push(['wdConfig', '$location', function(wdConfig, $location) {
        return {
            'request': function(config) {
                config.timeout = wdConfig.httpTimeout;
                if (!/^[http|https]/.test(config.url) && !/\.html$/.test(config.url)) {
                    config.url = wdConfig.apiUrl + config.url;
                }
                return config;
            },
            'response': function(response) {
                if (/\.html/.test(response.config.url)) {
                    return response;
                } else {
                    return response.data;
                }
            }
            // 'responseError': function(response) {
            //     console.log(response.status);
            //     if (response.status !== 200) {
            //         $location.path('/index');
            //     }
            //     return response;
            // }
        };
    }]);
}])
.controller("wdLayoutController", ['$scope', 'wdAccount', function ($scope, wdAccount) {
    $scope.login = {
        phone: '',
        password: '',
        error_msg: ''
    };

    $scope.login = function() {
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

}]);
