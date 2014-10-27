'use strict';

angular.module('tigerwitApp')
.factory('wdValidator', ['$window', function($window) {

    var validateFuns = {
        regTypes: {
            'phone': '1[0-9]{10}$',
            'num': '0-9',
            'email': '\\S+@\\S+\\.\\S+',
            'en': 'a-zA-Z',
            'sym': '\\-\\_'
        },
        number: function (str, type) {
            return !/\D/.test(str);
        },
        id: function (str) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        },
        /*
        *text 书写规则: text:en-zh-sym-num, 是"或"的关系
        */
        text: function (str, type) {
            var textTypes = type.split(":")[1];
            var textTypeList = textTypes.split("-");

            var textRegStr = "[";
            textTypeList.forEach(function (item) {
                textRegStr += '' + (validateFuns.regTypes[item] || '') + '';
            });
            textRegStr += ']';

            var textReg = new RegExp(textRegStr);
            return textReg.test(str);
        },
        /*
         *密码验证：6-15位字符，可由大写字母，小写字母，数字，符号组成，且至少包含其中2项
         */
        password: function (str) {

            var typeCounter = 0;
            if (str.search(/\d/) != -1) {
                typeCounter += 1;
            }

            if (str.search(/[a-z]/) != -1) {
                typeCounter += 1;
            }

            if (str.search(/[A-Z]/) != -1) {
                typeCounter += 1;
            }

            if (str.search(/\!\@\#\$\%\^\&\*\(\)\_\+/) != -1) {
                typeCounter += 1;
            }

            var hasBadChar = false;
            if (str.search(/^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+/) !=-1) {
                hasBadChar = true;
            }

            if (typeCounter >= 2 && !hasBadChar) {
                return true;
            }
            return false;
        },
        /*
         * length 书写规则： length:start-end
         */
        length: function (str, type) {
            var lengthContent = type.split(":")[1];
            var lengthStart = lengthContent.split("-")[0];
            var lengthEnd = lengthContent.split("-")[1];
            return lengthStart <= str.length <= lengthEnd;
        },
        option: function (str) {
            return true;
        },
        required: function (str) {
            if (str) {
                return true;
            }
            return false;
        },
        phone: function (str) {
            var phoneReg = new RegExp(this.regTypes.phone);
            return phoneReg.test(str);
        },
        email: function (str) {
            var emailReg = new RegExp(this.regTypes.email);
            return emailReg.test(str);
        }
    };


    return {
        validate: function(type, str) {
            var typeList = type.split(" ");
            var validateResult = true;

            if (typeList.indexOf("option") >= 0 && str === "") {
                return true;
            }

            typeList.forEach(function (type) {
                var funcsType = type.split(":")[0];
                validateResult = validateResult &&  validateFuns[funcsType](str, type);
            });

            return validateResult;
        }
    };
    // 结束
}]);
