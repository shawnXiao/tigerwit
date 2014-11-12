'use strict';

angular.module('tigerwitApp')
.factory('wdStock',
['$rootScope', '$http', 'wdStorage',
function($rootScope, $http, wdStorage) {
    return {
        getTestData: function () {
            return $http.get('http://0.0.0.0:9000/test/stock.json')
        },
        /**
        * 个人中心 - 历史交易记录
        *
        * @method getHistory
        * @param {Object} {
        *   after: // 从某个编号（id） 之后取记录,
        *   count: // 拉取记录的数量
        * }
        * @return {Object} {
        *   id: // 历史单编号
        *   open_price: // 开仓价格
        *   close_price: // 平仓价格
        *   profit: // 收益金额
        *   storage: // 隔夜利息
        *   timestamp: // 平仓时间
        *   symbol: // 外汇名称
        *   cmd: //类型， 0是做多的平仓， 1是做空的平仓
        * }
        */
        getHistory: function (opts) {
            return $http.get('/get_history', {
                params: opts
            })
        },
        /**
        * 个人中心 - 近期资产情况
        *
        * @method getEquityReport
        * @param {Object} {
        *   period: //  距离当前的天数
        * }
        * @return {Object} {
        *   data: [[ //timestamp / 1000, // 金额]],
        *   error_msg:"",
        *   is_succ: true / false
        * }
        */
        getEquityReport: function (opts) {
            return $http.get('/equity_report', {
                params: opts
            });
        },
        /**
        * 个人中心 - 账户概况
        *
        * @method getSummaryReport
        * @return {Object} {
        *   profit_rate: // 盈利率,
        *   percent_profitable: // 胜率，
        *   total_pips: // 获利点数,
        *   total_volume: // 总交易手数,
        *   total_orders: // 总订单数
        *   monthly_volume: // 30天交易手数
        *   max_rate: // 最牛交易百分比
        *   min_rate: // 最差交易百分比
        * }
        */
        getSummaryReport: function () {
            return $http.get('/summary_report');
        }
    };
    // 结束
}]);
