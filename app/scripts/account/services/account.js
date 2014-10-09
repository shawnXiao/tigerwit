'use strict';

angular.module('tigerwitApp')
.factory('wdAccount', 
['$rootScope', '$http', 'wdStorage',
function($rootScope, $http, wdStorage) {
    return {
        check: function() {
            return $http.get('/check');
        },
        verifyPhone: function(num) {
            return $http.get('/verify', {
                params: {
                    phone: String(num)
                }
            });
        },
        register: function(opts) {
            return $http.post('/register', opts);
        },
        login: function(opts) {
            wdStorage.removeAll();
            var promise = $http.post('/login', opts);
            promise.then(function(data) {
                if (data.is_set_info) {
                    wdStorage.item('is_set_info', data.is_set_info);
                }
                if (data.is_set_id_pic) {
                    wdStorage.item('is_set_id_pic', data.is_set_id_pic);
                }
            });
            return promise;
        },
        logout: function() {
            wdStorage.removeAll();
            return $http.get('/logout');
        },
        setInfo: function(opts) {
            return $http.post('/set_info', opts);
        },
        getInfo: function() {
            return $http.get('/get_info');
        }
    };
    // 结束 
}]);
