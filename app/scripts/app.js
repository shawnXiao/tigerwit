'use strict';

/**
 * @ngdoc overview
 * @name tigerwitApp
 * @description
 * # tigerwitApp
 *
 * Main module of the application.
 */
var routerApp = angular.module('tigerwitApp', ['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
        };
    }]);

    $urlRouterProvider.otherwise('/index');

    // 下面为 page 的配置
    $stateProvider
    .state('index', {
        url: "/index",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-index"
                }
            },
            'hd@index': {
                templateUrl: 'views/navs/navbar1.html',
                controller: ''
            },
            'bd@index': {
                templateUrl: 'views/web/index.html',
                controller: 'wdWebMarketingController'
            },
            'ft@index': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('regist', {
        url: "/regist",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-regist"
                }
            },
            'hd@regist': {
                templateUrl: 'views/navs/navbar1.html',
                controller: ''
            },
            'bd@regist': {
               templateUrl: 'views/account/register.html',
               controller: 'registerCtrl'
            },
            'ft@regist': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('login', {
        url: "/login",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-login"
                }
            },
            'hd@login': {
                templateUrl: 'views/navs/navbar1.html',
                controller: ''
            },
            'bd@login': {
                templateUrl: 'views/account/login.html',
                controller: 'loginCtrl'
            },
            'ft@login': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('reset', {
        url: "/reset",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-index"
                }
            },
            'hd@reset': {
                templateUrl: 'views/navs/navbar1.html',
                controller: ''
            },
            'bd@reset': {
                templateUrl: 'views/account/reset_password.html',
                controller: 'registerCtrl'
            },
            'ft@reset': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('regist_succ', {
        url: "/regist_succ",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-regist-succ"
                }
            },
            'hd@regist_succ': {
                templateUrl: 'views/navs/navbar1.html',
                controller: ''
            },
            'bd@regist_succ': {
                templateUrl: 'views/account/register_succ.html'
            },
            'ft@regist_succ': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('personal', {
        url: '/personal',
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-personal-index"
                }
            },
            'hd@personal': {
                templateUrl: 'views/navs/navbar_personal.html'
            },
            'sidebar@personal': {
                templateUrl: 'views/personal/info_side.html',
                controller: ''
            },
            'content@personal': {
                templateUrl: 'views/personal/history.html',
                controller: ''
            },
            'sidebar-ad@personal': {
                templateUrl: 'views/personal/deposit_side.html',
                controller: ''
            },
            'ft@personal': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
})
