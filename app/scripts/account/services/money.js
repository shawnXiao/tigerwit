'use strict';

angular.module('tigerwitApp')
.factory('wdAccountMoney',
['$window', '$location', 'wdConfig', '$http',
function($window, $location, wdConfig, $http) {
    //var equitySocketUrl = wdConfig.webSocketUrl + '/equity';
    var equitySocketUrl = 'ws://test.tigerwit.com/api/v1/equity';

    // 当前接口的 socket 对象
    var equitySocket;
    return {
        equitySocket: function() {
            if (equitySocket) {
                return equitySocket;
            } else {
                if ('WebSocket' in window) {
                    equitySocket = new WebSocket(equitySocketUrl);
                    return equitySocket;
                } else {

                }
            }
        },
        equityLast: function () {
            return $http.get('/equity/last');
        },
        pay: function(money) {
            return $http.get('/pay', {
                params: {
                    amount: money
                }
            });
        },
        withdraw: function (opts) {
            return $http.post('/withdraw', opts)
        }
    };
// 结束
}]);
