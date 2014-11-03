'use strict';

angular.module('tigerwitApp')
.factory('wdAccount',
['$rootScope', '$http', 'wdStorage',
function($rootScope, $http, wdStorage) {
    return {
        check: function() {
            return $http.get('/check');
        },
        verifyPhone: function(params) {
            return $http.get('/verify', {
                params: params
            });
        },
        /**
        * 验证验证码的正确性
        *
        * @method verifyCode
        * @param {Object} {
        *   phone:
        *   verify_code:
        * }
        * @return {Object} {
        *   "is_succ": true / false
        *   "error_msg": ""
        * }
        */
        verifyCode: function(opts) {
            return $http.post('/verifycode', opts)
        },
        /**
        * 开通真实账户 - 查询客户填写进度
        *
        * @method getRealinfoStep
        * @param {String} ?type=ReliableInformation
        * @return {Object} {
        *   "is_succ": true / false,
        *   "error_msg": "",
        *   "progress": -1 / 0 / 1/ 2
        * }
        */
        getRealInfoStep: function () {
            return $http.get('/get_info_progress', {
                params: {
                    type: "ReliableInformation"
                }
            });
        },
        /**
        * 开通真实账户-调查问卷
        *
        * @method submitQuestionnaire
        * @param {Object} {
        *   current_situation: 0 / 1 / 2 / 3,
        *   yearly_income: 0 / 1 / 2 / 3,
        *   investing_experience: 0 / 1 / 2 / 3 / 4
        * }
        * @return {Object} {
        *   "is_succ": true / false,
        *   "error_msg": ""
        * }
        */
        submitQuestionnaire: function (opts) {
            return $http.post('/questionnaire', opts);
        },
        /**
        * 重置密码接口
        *
        * @method resetPassword
        * @param {Object} {
        *   code: '',
        *   new_pwd: ""
        * }
        * @return {Object} {
        *   "is_succ": true / false,
        *   "error_msg": ""
        * }
        */
        resetPassword: function (opts) {
            return $http.post('/change_password', opts)
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
