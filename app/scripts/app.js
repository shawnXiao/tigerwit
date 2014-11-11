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
                console.log(config.url);
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

    // 登录验证
    var authorizResolve =  { authorize: ['authorization', function (authorization) { return authorization.authorize(); }] };

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
                controller: 'wdWebNavbarController'
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
    .state('about', {
        url: "/about",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-about"
                }
            },
            'hd@about': {
                templateUrl: 'views/navs/navbar1.html',
                controller: 'wdWebNavbarController'
            },
            'bd@about': {
                templateUrl: 'views/web/about.html',
                controller: 'wdWebMarketingController'
            },
            'ft@about': {
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
                controller: 'wdWebNavbarController'
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
                controller: 'wdWebNavbarController'
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
                controller: 'wdWebNavbarController'
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
        data: {
            roles: []
        },
        resolve: authorizResolve,
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: function ($scope) {
                    $scope.moduleId = "tigerwit-regist-succ"
                }
            },
            'hd@regist_succ': {
                templateUrl: 'views/navs/navbar1.html',
                controller: 'wdWebNavbarController'
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
        data: {
            roles: []
        },
        resolve: authorizResolve,
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: 'wdPersonalController'
            },
            'hd@personal': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@personal': {
                templateUrl: 'views/personal/info_side.html',
                controller: ''
            },
            'content@personal': {
                templateUrl: 'views/personal/history_chart.html',
                controller: 'wdPersonalHistoryController'
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
    .state('deposit', {
        url: '/personal/deposit',
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: 'wdPersonalController'
            },
            'hd@deposit': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@deposit': {
                templateUrl: 'views/personal/info_side.html',
                controller: ''
            },
            'content@deposit': {
                templateUrl: 'views/personal/deposit.html',
                controller: 'wdPersonalDepositController'
            },
            'sidebar-ad@deposit': {
                templateUrl: 'views/personal/deposit_side.html',
                controller: ''
            },
            'ft@deposit': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('history', {
        url: '/personal/history',
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: 'wdPersonalController'
            },
            'hd@history': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@history': {
                templateUrl: 'views/personal/info_side.html',
                controller: ''
            },
            'content@history': {
                templateUrl: 'views/personal/history.html',
                controller: 'wdPersonalDepositController'
            },
            'sidebar-ad@history': {
                templateUrl: 'views/personal/deposit_side.html',
                controller: ''
            },
            'ft@history': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('notify', {
        url: '/personal/notify',
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: 'wdPersonalController'
            },
            'hd@notify': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@notify': {
                templateUrl: 'views/personal/info_side.html',
                controller: ''
            },
            'content@notify': {
                templateUrl: 'views/personal/notify.html'
            },
            'sidebar-ad@notify': {
                templateUrl: 'views/personal/deposit_side.html',
                controller: ''
            },
            'ft@notify': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('setting', {
        url: '/setting',
        views: {
            '': {
                templateUrl: 'views/layout/doc3.html',
                controller: 'wdPersonalController'
            },
            'hd@setting': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@setting': {
                templateUrl: 'views/settings/side.html',
                controller: ''
            },
            'content@setting': {
                templateUrl: 'views/settings/info.html'
            },
            'ft@setting': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('settingPassword', {
        url: '/setting/password',
        views: {
            '': {
                templateUrl: 'views/layout/doc3.html',
                controller: 'wdPersonalController'
            },
            'hd@settingPassword': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@settingPassword': {
                templateUrl: 'views/settings/side.html',
                controller: ''
            },
            'content@settingPassword': {
                templateUrl: 'views/settings/password.html'
            },
            'ft@settingPassword': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('settingGlobal', {
        url: '/setting/global',
        views: {
            '': {
                templateUrl: 'views/layout/doc3.html',
                controller: 'wdPersonalController'
            },
            'hd@settingGlobal': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@settingGlobal': {
                templateUrl: 'views/settings/side.html',
                controller: ''
            },
            'content@settingGlobal': {
                templateUrl: 'views/settings/global.html'
            },
            'ft@settingGlobal': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })

})
.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
     function ($rootScope, $state, $stateParams, authorization, principal) {
         $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
             $rootScope.toState = toState;
             $rootScope.toStateParams = toStateParams;
             if (principal.isIdentityResolved()) {
                 authorization.authorize();
             }
         });
     }
])
