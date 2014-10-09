'use strict';

angular.module('tigerwitApp')
.factory('wdConfig', 
['$rootScope', '$location', 
function($rootScope, $location) {
    return {
        apiUrl: '/api/v1',
        // webSocketUrl: 'ws://10.1.1.188/api/v1',
        webSocketUrl: 'ws://' + $location.host() + '/api/v1',
        httpTimeout: 10000
    };
    // 结束 
}]);
