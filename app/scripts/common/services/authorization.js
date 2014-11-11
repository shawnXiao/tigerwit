'use strict';

/**
 * @ngdoc overview
 * @name tigerwitApp
 * @description
 * # tigerwitApp
 *
 * 用于验证用户是否登录以及用户角色
 */
angular.module('tigerwitApp')
.factory('principal', ['$q', '$http', '$timeout',
     function ($q, $http, $timeout) {
         var _identify = undefined;
         var _authenticated = false;
         return {
             isIdentityResolved: function () {
                 return angular.isDefined(_identify);
             },
             isAuthenticated: function () {
                 return _authenticated;
             },
             isInRole: function (role) {
                 if (!_authenticated || !_identify.roles) {
                     return false;
                 }

                 return _identify.roles.indexOf(role) != -1;
             },
             isInAnyRole: function (roles) {
                 if (!_authenticated || !_identify.roles) {
                     return false;
                 }

                 for (var i = 0; i < roles.length; i++) {
                     if (this.isInRole(roles[i])) {
                         return true;
                     }
                 }
             },
             authenticate: function (identity) {
                 _identify = identity;
                 _authenticated = identity != null;
             },
             identity: function (force) {
                 var deferred = $q.defer();
                 if (force) {
                     _identify = undefined;
                 }

                 if (angular.isDefined(_identify)) {
                     deferred.resolve(_identify);
                     return deferred.promise;
                 }
                 $http.get('/check').then(function (data) {
                     if (data.is_succ) {
                         _authenticated = true;
                     }
                     _identify = data;
                     deferred.resolve(_identify)
                 }, function () {
                     _identify = null;
                     _authenticated = false;
                     deferred.resolve(_identify)
                 });
                 return deferred.promise;
             }
         }
 }])
 .factory('authorization', ['$rootScope', '$state', 'principal',
    function ($rootScope, $state, principal) {
        return {
            authorize: function () {
                return principal.identity()
                .then(function () {
                    var isAuthenticated = principal.isAuthenticated();
                    if ($rootScope.toState.data.roles &&
                        $rootScope.toState.data.roles.length > 0 &&
                       !principal.isInAnyRole($rootScope.toState.data.roles)) {
                        if (isAuthenticated) {
                            $state.go('login');
                        } else {
                            $rootScope.returnToState = $rootScope.toState;
                            $rootScope.returnToStateParams  = $rootScope.toStateParams;
                            $state.go('regist');
                        }
                    }
                })
            }
        }
    }
 ])
