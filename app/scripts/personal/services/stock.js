'use strict';

angular.module('tigerwitApp')
.factory('wdStock',
['$rootScope', '$http', 'wdStorage',
function($rootScope, $http, wdStorage) {
    return {
        getTestData: function () {
            return $http.get('http://0.0.0.0:9000/test/stock.json')
        }
    };
    // 结束
}]);
