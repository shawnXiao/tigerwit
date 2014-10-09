'use strict';

angular.module('tigerwitApp')
.factory('wdAccountMoney', 
['$window', '$location', 'wdConfig', '$http',
function($window, $location, wdConfig, $http) {
    var equitySocketUrl = wdConfig.webSocketUrl + '/equity';
    console.log(equitySocketUrl);

    // 当前接口的 socket 对象
    var equitySocket;
    return {
        equitySocket: function() {
            if (equitySocket) {
                return equitySocket;
            } else {
                equitySocket = new WebSocket(equitySocketUrl);
                return equitySocket;
            }
        },
        pay: function(money) {
            $window.open(wdConfig.apiUrl + '/pay?amount=' + money);
        }
    };
// 结束
}]);
