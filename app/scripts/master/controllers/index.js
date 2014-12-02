'use strict';

angular.module('tigerwitApp')
.controller('wdMasterController',
['$rootScope', '$scope', 'wdAccount', 'wdAccountMoney', '$state', '$timeout', 'wdValidator', '$modal',
function ($rootScope, $scope, wdAccount, wdAccountMoney, $state, $timeout, wdValidator, $modal) {

    wdAccount.getMasterList().then(function(data) {
        if (data.is_succ) {
            $scope.masterRecords = data.data;
            $scope.orderField = 'profit_rate';
        }
    });
}]);
