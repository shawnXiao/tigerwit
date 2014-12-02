'use strict';

angular.module('tigerwitApp')
.filter('symbolBeauty', function () {
    var notBeautyList = ['silver', 'gold', 'wtoli'];
    return function (input) {
        var temptInput = input.toLowerCase();
        if (notBeautyList.indexOf(temptInput) < 0 && temptInput.length === 6) {
            return input.substring(0, 3) + "/" + input.substring(3, 6);
        } else {
            return input;
        }
    }
})
.filter('startNow', function () {
    return function (startNowTimeStamp) {

        if (startNowTimeStamp < 60) {
            return startNowTimeStamp + "秒";
        }

        if (startNowTimeStamp < 60 * 60) {
            return Math.round((startNowTimeStamp / 60)) + "分钟";
        }

        if (startNowTimeStamp < 60 * 60 * 24) {
            return Math.round((startNowTimeStamp / (60 * 60))) + "小时";
        }


        if (startNowTimeStamp < 60 * 60 * 24 * 7) {
            return Math.round((startNowTimeStamp / (60 * 60 * 24))) + "天";
        }

        return Math.round((startNowTimeStamp / (60 * 60 * 24 * 7))) + "周";

    }
});
