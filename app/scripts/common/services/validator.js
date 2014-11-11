'use strict';

angular.module('tigerwitApp')
.factory('wdValidator', ['$window', function($window) {

    var validateFuns = {
        regTypes: {
            'phone': '^(?:\\+86)?(1[0-9]{10}$)',
            'email': '\\S+@\\S+\\.\\S+',
            'num': '0-9',
            'zh': '\\u4e00-\\u9fa5',
            'en': 'a-zA-Z',
            'sym': '[!@#$%^&*()_+]',
            'nosym': '[^!@#$%^&*()_+]'
        },
        number: function (str, type) {
            var validateResult = !/\D/.test(str);
            var validateReason = "";

            if (!validateResult) {
                validateReason = '输入项必须为数字！';
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        id: function (str) {
            var validateResult = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
            var validateReason = "";

            if (!validateResult) {
                validateReason = '输入的身份证号格式不正确';
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        /*
        *text 书写规则: text:en-zh-num, 是"或"的关系, 且仅有
        */
        text: function (str, type) {
            var textTypes = type.split(":")[1];
            var textTypeList = textTypes.split("-");

            var regStr = "";
            textTypeList.forEach(function (item) {
                regStr += '' + (validateFuns.regTypes[item] || '');
            });
            var textRegStr = "[" + regStr + "]";
            var antiTextRegStr = "[^" + regStr + "]";

            // trim string
            str = str.replace(/\s/g, '');
            var textReg = new RegExp(textRegStr);
            var antiTextReg = new RegExp(antiTextRegStr);
            var validateResult = textReg.test(str) && !antiTextReg.test(str);

            var validateReason = "";
            if (!validateResult) {
                validateReason = "输入项不符合规范！";
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
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

            if (str.search(/[!@#$%^&*()_+]/) != -1) {
                typeCounter += 1;
            }

            var hasBadChar = false;
            if (str.search(/[^a-zA-Z0-9!@#$%^&*()_+]/) !=-1) {
                hasBadChar = true;
            }

            var validateReason = "";
            var validateResult = true;
            if (typeCounter < 2) {
                validateReason = "密码必须包含大写字母，小写字母，数字和符号其中两项";
                validateResult = false;
            }

            if (hasBadChar){
                validateReason = "包含非法输入项";
                validateResult = false;
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        /*
         * length 书写规则： length:start-end
         */
        length: function (str, type) {
            var lengthContent = type.split(":")[1];
            var lengthStart = lengthContent.split("-")[0];
            var lengthEnd = lengthContent.split("-")[1];

            var validateResult = (lengthStart <= str.length && str.length <= lengthEnd);
            var validateReason = "";
            if (!validateResult) {
                validateReason = "输入项长度应介于 " + lengthStart + " 位和 " + lengthEnd + " 位之间";
            }
            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        option: function (str) {
            return {
                validate_reason: "",
                validate_result: true
            };
        },
        required: function (str) {
            var validateResult = false;
            var validateReason = "";
            if (str) {
                validateResult = true;
            } else {
                validateReason = "此项为必填项";
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        phone: function (str) {
            var phoneReg = new RegExp(this.regTypes.phone);
            var validateReason = "";
            var validateResult = phoneReg.test(str);
            if (!validateResult) {
                validateReason = "输入的手机号不符合规范！";
            }

            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        },
        email: function (str) {
            var emailReg = new RegExp(this.regTypes.email);
            var validateReason = "";
            var validateResult = emailReg.test(str);
            if (!validateResult) {
                validateReason = "输入的邮箱不符合规范！";
            }
            return {
                validate_reason: validateReason,
                validate_result: validateResult
            };
        }
    };


    return {
        validateFuns: validateFuns,
        validate: function(type, str) {
            var typeList = type.split(" ");
            var validateResult = {
                validate_result: true,
                validate_reason: ""
            };

            if (typeList.indexOf("option") >= 0 && str === "") {
                return validateResult;
            }

            typeList.forEach(function (type) {
                var funcsType = type.split(":")[0];
                var temptResultObj = validateFuns[funcsType](str, type);
                if (!temptResultObj.validate_result) {
                    validateResult = temptResultObj;
                }
            });
            return validateResult;
        }
    };
    // 结束
}]);
