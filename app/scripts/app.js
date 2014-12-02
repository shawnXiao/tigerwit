'use strict';

/**
 * @ngdoc overview
 * @name tigerwitApp
 * @description
 * # tigerwitApp
 *
 * Main module of the application.
 */
var routerApp = angular.module('tigerwitApp', ['ngRoute', 'ngSanitize', 'ui.router']);

// 在 IE 8 中请求会被缓存，通过下面来阻止缓存
routerApp.config(['$httpProvider', function ($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);

routerApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$controllerProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $controllerProvider) {
    // 全局 $http 请求配置。
    $httpProvider.interceptors.push(['wdConfig', '$rootScope', '$location', '$q', function(wdConfig, $rootScope, $location, $q) {
        return {
            'request': function(config) {
                config.timeout = wdConfig.httpTimeout;
                if (!/^[http|https|ws]/.test(config.url) && !/\.html$/.test(config.url)) {
                    config.url = wdConfig.apiUrl + config.url;
                    ga('send', 'event', 'xhr-request', config.url, $location.path());
                }
                return config;
            },
            'response': function(response) {
                if (/\.html/.test(response.config.url)) {
                    return response;
                } else {
                    ga('send', 'event', 'xhr-response', response.config.url, response.status);
                    return response.data;
                }
            },
            'responseError': function (response) {
                // 当修改密码成功时不自动跳转到登录页
                if (response.status === 401 && $rootScope.resetPassword) {
                    ga('send', 'event', '401', response.config.url);
                    $location.path('/login')
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }]);

    $urlRouterProvider.otherwise('/index');

    // 登录验证
    var authorizResolve =  {
        simpleObj: function () {
            return {value: "simple!"}
        },
        authorize: ['authorization', function (authorization) {
            return authorization.authorize();
        }]
    };


    // 下面为 page 的配置
    $stateProvider
    .state('index', {
        url: "/index",
        primaryPage: "index",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
            },
            'hd@index': {
                templateUrl: 'views/navs/navbar1.html',
                controller: 'wdWebNavbarController'
            },
            'bd@index': {
                templateUrl: 'views/web/index.html'
            },
            'ft@index': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    // 各种静态页面的配置
    .state('static', {
        url: "/static/:subPage",
        primaryPage: "static",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
            },
            'hd@static': {
                templateUrl: 'views/navs/navbar1.html',
                controller: 'wdWebNavbarController'
            },
            'bd@static': {
                templateUrl: function ($stateParams) {
                    return 'views/web/' + $stateParams.subPage+ '.html';
                }
            },
            'staticGuide@static': {
                templateUrl: 'views/guides/install.html',
            },
            'ft@static': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    // 常见问题页面对应的 router
    .state('faqRoot', {
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
            },
            'hd@faqRoot': {
                templateUrl: 'views/navs/navbar1.html',
                controller: 'wdWebNavbarController'
            },
            'bd@faqRoot': {
                templateUrl: 'views/web/faq.html',
            },
            'ft@faqRoot': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('faqRoot.setting', {
        url: '/faq/:subPage',
        primaryPage: "faq",
        views: {
            'sidebar': {
                templateUrl: 'views/web/faq_side.html',
            },
            'content': {
                templateUrl: function ($stateParams) {
                    $stateParams.subPage = $stateParams.subPage || 'index';
                    return 'views/web/faq_' + $stateParams.subPage + '.html';
                }
            }
        }
    })

    .state('regist', {
        url: "/regist",
        primaryPage: "regist",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
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
        primaryPage: "login",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
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
        primaryPage: "reset",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
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
        primaryPage: "regist-succ",
        authenticate: true,
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdWebMarketingController'
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
    .state('personalRoot', {
        views: {
            '': {
                templateUrl: 'views/layout/doc2.html',
                controller: 'wdPersonalController'
            },
            'hd@personalRoot': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@personalRoot': {
                templateUrl: 'views/personal/info_side.html'
            },
            'sidebar-ad@personalRoot': {
                templateUrl: 'views/personal/personal_side.html'
            },
            'ft@personalRoot': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    // 个人页面对应的 router, 需要 subUrl 和对应的 controller 名称对应
    .state('personalRoot.personal', {
        url: '/personal/:subPage',
        primaryPage: "personal",
        authenticate: true,
        views: {
            'content': {
                templateUrl: function ($stateParams) {
                    $stateParams.subPage = $stateParams.subPage || 'index';
                    return 'views/personal/' + $stateParams.subPage + '.html';
                },
                controllerProvider: function ($stateParams) {
                    var ctrlPrefix = "wdPersonal";
                    var ctrlSuffix = "Controller";
                    var subPage = $stateParams.subPage || 'index';
                    var ctrlName = subPage.charAt(0).toUpperCase() + subPage.substring(1, subPage.length);
                    if (subPage === "index") {
                        ctrlName = "History";
                    }
                    ctrlName = ctrlPrefix + ctrlName + ctrlSuffix;
                    return ctrlName;
                }
            }
        }
    })
    // 设置页面对应的 router，subPage 都共用的一个 controller
    .state('settingRoot', {
        views: {
            '': {
                templateUrl: 'views/layout/doc3.html',
                controller: 'wdPersonalController'
            },
            'hd@settingRoot': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'sidebar@settingRoot': {
                templateUrl: 'views/settings/side.html',
            },
            'ft@settingRoot': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('settingRoot.setting', {
        url: '/setting/:subPage',
        primaryPage: "setting",
        authenticate: true,
        views: {
            'content': {
                templateUrl: function ($stateParams) {
                    $stateParams.subPage = $stateParams.subPage || 'index';
                    return 'views/settings/' + $stateParams.subPage + '.html';
                },
                controller: 'wdSettingController'
            },
        }
    })
    .state('master', {
        url: '/master',
        primaryPage: "master",
        authenticate: true,
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdPersonalController'
            },
            'hd@master': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'bd@master': {
                templateUrl: 'views/master/index.html',
                controller: 'wdMasterController'
            },
            'ft@master': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
    .state('guides', {
        url: '/guides',
        primaryPage: "guides",
        views: {
            '': {
                templateUrl: 'views/layout/doc1.html',
                controller: 'wdPersonalController'
            },
            'hd@guides': {
                templateUrl: 'views/navs/navbar_personal.html',
                controller: 'wdWebNavbarController'
            },
            'bd@guides': {
                templateUrl: 'views/guides/index.html',
                controller: 'wdMasterController'
            },
            'staticGuide@guides': {
                templateUrl: 'views/guides/install.html',
            },
            'ft@guides': {
                templateUrl: 'views/layout/footer.html'
            }
        }
    })
}])
.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
     function ($rootScope, $state, $stateParams, authorization, principal) {

         $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
             $rootScope.toState = toState;
             $rootScope.toStateParams = toStateParams;

             // 页面的 pageId
             $rootScope.moduleId = "tigerwit-" + toState.primaryPage + (toStateParams.subPage ? "-" + toStateParams.subPage : "");

             // 判断子导航条是否是 active
             $rootScope.stateName = toStateParams.subPage || "";
             $rootScope.primaryPage = toState.primaryPage || "";
             ga('send', 'pageview', {
                 'page': $rootScope.primaryPage + "/" + $rootScope.stateName
             });

             if (toState.authenticate) {
                 authorization.authorize();
             }
         });

         $rootScope.$on('$stateChangeSuccess', function () {
             $("html, body").animate({scrollTop: 0}, 300)
         });

     }
])
