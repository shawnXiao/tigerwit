'use strict';

angular.module('tigerwitApp')
.controller('wdPersonalNotifyController',
['$scope', 'wdAccount', function ($scope, wdAccount) {
    function getNotification() {
        wdAccount.getNotification({
            count: 30
        }).then(function (msgs) {
            $scope.notifications = msgs.data;
        })
    }
    getNotification();
}]);
