'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalController',
['$rootScope', '$scope', 'wdAccount', 'wdAccountMoney', '$state', '$timeout', 'i18nConf',
function ($rootScope, $scope, wdAccount, wdAccountMoney, $state, $timeout, i18nConf) {

    $scope.profile = {};
    $scope.i18nConf = i18nConf;
    $scope.i18nLang = "cn";

    wdAccount.getInfo().then(function(data) {
        $scope.hasLoadProfile = true;
        $scope.profile = data;
        if (data.verified) {
            // 获取个人的资产信息
            (function getEquity() {
               wdAccountMoney.equityLast().then(function (data) {
                   $scope.equityInfo = data;
                   $timeout(getEquity, 5 * 1000)
               });
            }());
        }
    });

}]);
