'use strict';
/*
 * Controller: registerCtrl
 * Function: 完成了注册真实用户，虚拟用户和找回密码的功能
 */

angular.module('tigerwitApp')
.controller('registerCtrl',
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdValidator', '$location', '$interval', '$rootScope',
function ($scope, wdAccount, $timeout, wdConfig, wdValidator, $location, $interval, $rootScope) {
    // 通过 query 中的 type 字段来标示注册的类型，默认情况下为
    // 注册虚拟账户
    // type: virtual || "" 注册虚拟账户
    // type: real 注册真实账户，但还是先要注册虚拟账户
    // type: virtual2real 虚拟账户转变成真实账户
    // Model:
    //      person: 个人真实信息
    //      signIn: 注册虚拟账户
    //      resetInfo: 重置密码的步骤信息，包括出错信息和所属步骤
    //      realInfo: 真实账户的步骤信息，包括出错信息和所属步骤

    var searchObj = $location.search();
    $scope.registType = searchObj.type || "";
    $rootScope.hideNav = true;
    $scope.realInfo = {};
    $scope.resetInfo = {};
    $scope.resetInfo.step = 1;


    // 设置真实信息的步骤表示
    if ($scope.registType === "virtual2real") {
        wdAccount.getInfoStep({
            type: "ReliableInformation"
        }).then(function (msg) {
            $scope.realInfo.step = msg.progress + 1;
        }, function () {})
    }

    // 注册虚拟账户
    $scope.signIn = {
        notice: true,
        verify_code: '',
        phone: '',
        password: '',
        email: '',
        username: ''
    };

    // 如果从其他页面带有电话号码跳到注册页面
    // 那么自动填充到手机输入框，并且开始倒计时
    if (searchObj.phone) {
        $scope.signIn.phone = searchObj.phone;
        coutDown();
    } else {
        $scope.isDisable = "";
        $scope.countDownText = "获取验证码";
    }

    // 进入时的逻辑
    wdAccount.check().then(function(data) {
        data.is_succ = false;
        if (data.is_succ) {
            wdAccount.getInfo().then(function (data) {
                $scope.verified = data.verified;
            });
            $scope.isLogin = true;
            // 已经完成注册申请过程
            $location.path('/personal');
        }
    }, function(data) {});

    // 注册虚拟账号
    $scope.registVirtual = function () {
        if (!$scope.signIn.notice) {
            $scope.error_msg = "请勾选 “同意并遵循风险揭露和用户交易须知” ";
        }
        if (validateInput() && confirmPassword()) {
            register();
        }
    };

    // 将虚拟账户转变成真实账户
    $scope.uploadUrl = wdConfig.apiUrl + '/upload';

    $scope.person = {
        real_name: '',
        invite_code: '',
        // 上传状态：0、未上传；1、上传中，2、上传成功；3、上传失败；
        uiFrontImageStatus: 0,
        uiBackImageStatus: 0,
        uiFrontImageError: '',
        uiBackImageError: ''
    };

    // 设置真实账号信息
    $scope.setRealInfo = function () {
        var realInfoStep = wdAccount.getInfoStep({type: "IdPicInformation"});
        realInfoStep.then(function (msg) {
            if (msg.progress != 3) {
                $scope.realInfo.error_msg_1 = "请上传身份证正反面";
                return;
            }
            if (validateInput()) {
                setInfo().then(function(data) {
                    if (data.is_succ) {
                        $scope.realInfo.step = 2;
                    } else {
                        console.log("error");
                    }
                });
            }

        });
    };

    // 发送风险鉴定
    $scope.person.questionnaire = {};
    $scope.sendAssessment = function () {
        if (!checkQuestionaire()) {
            return;
        }

        wdAccount.submitQuestionnaire($scope.person.questionnaire).
            then(function (msg) {
            $scope.realInfo.step = 3;
        }, function () {})
    }

    // 发送手机验证码, 如果是在找回密码的阶段
    // 发生验证码， isexistphone: true
    $scope.verifyPhone = function (isExistPhone) {
        verifyPhone(isExistPhone).then(function (msg) {
            if (!msg.is_succ) {
                $scope.countDownText = msg.error_msg;
            }
        }, function () {

        });
        coutDown();
    };

    // 验证手机验证码是否正确
    $scope.verifyCode = function () {
        wdAccount.verifyCode({
            phone: $scope.signIn.phone,
            verify_code: $scope.signIn.verify_code
        }).then(function (msg) {
            if (msg.is_succ) {
                $scope.resetInfo.step = 2;
            } else {
                $scope.resetInfo.error_msg_1 = msg.error_msg;
            }
        });
    }

    // 重置密码
    $scope.resetPassword = function () {
        wdAccount.resetPassword({
            phone: $scope.signIn.phone,
            code: $scope.signIn.verify_code,
            new_pwd: $scope.signIn.password
        }).then(function (msg) {
            if (msg.is_succ) {
                $scope.resetInfo.step = 3;
            }
        })
    }

    $scope.keyDown = function(e) {
        if (e.keyCode !== 13) {
            return;
        }

        switch($scope.registType) {
            case '/virtual':
                $scope.registVirtual();
            break;
            case '/real':
                $scope.registVirtual();
            break;
            case '/virtual2real':
                $scope.setRealInfo();
            break;
            default :
                $scope.registVirtual();
            break;
        }
    };

    function checkQuestionaire() {
        var questionnaire = $scope.person.questionnaire;
        console.log($scope.person.questionnaire);
        if (questionnaire.current_situation === undefined) {
            $scope.person.questionnaire.error_msg = "请选择你的就业状况";
            return false;
        }

        if (questionnaire.yearly_income === undefined) {
            $scope.person.questionnaire.error_msg = "请选择你的年收入";
            return false;
        }

        if (questionnaire.investing_experience === undefined) {
            $scope.person.questionnaire.error_msg = "请选择你的投资外汇经验";
            return false;
        }

        return true;
    }
    function confirmPassword() {
        if ($scope.signIn.password === $scope.signIn.passwordConfirm) {
            return true;
        }

        var $focusTip = $('[focus-tip-type="passwordconfirm"]');
        var $focusTipTextWrpper = $('p', $focusTip);
        $focusTipTextWrpper.show();
        $focusTipTextWrpper.text("两次输入密码不一致");
        $focusTip.parent().addClass("has-error");
        return false;
    }

    function validateInput() {
        var $validateInput = $('#tigerwitRegister [data-validate]:visible');
        var valideAll = true;

        $validateInput.each(function (index, element) {
            var $elem = $(element);
            var validatorType = $elem.attr("data-validate");
            var validatorVal = $elem.val();
            var validateResObj = wdValidator.validate(validatorType, validatorVal);
            if (!validateResObj.validate_result) {
                var focusTip = $elem.attr("focus-tip");

                if (focusTip) {
                    var $focusTip = $('[focus-tip-type="' + focusTip + '"]');
                    var $focusTipTextWrpper = $('p', $focusTip);
                    $focusTip.show();
                    $focusTipTextWrpper.text(validateResObj.validate_reason);
                }

                $elem.closest(".form-group").addClass("has-error");
            }
            valideAll = valideAll && validateResObj.validate_result;
        });
        return valideAll;
    }

    var countDownTimer;
    function coutDown() {
        $scope.isDisable = "disabled";
        $scope.countDownNum = 30;
        $scope.countDownText = "秒重新获取";
        countDownTimer = $interval(function () {
            if ($scope.countDownNum === 0) {
                $interval.cancel(countDownTimer);
                $scope.isDisable = "";
                $scope.countDownText = "重新获取";
                $scope.countDownNum = "";
            } else {
                $scope.countDownNum --;
            }
        }, 1000, 0);
    }

    $scope.$on('wd-upload-form-success', function(e, data) {
        switch(data.face) {
            case 'front':
                $scope.$apply(function() {
                    $scope.person.uiFrontImageError = '';
                    $scope.person.uiFrontImageStatus = 2;
                });
            break;
            case 'back':
                $scope.$apply(function() {
                    $scope.person.uiBackImageError = '';
                    $scope.person.uiBackImageStatus = 2;
                });
            break;
        }
    });

    $scope.$on('wd-upload-form-start', function(e, data) {
        switch(data.face) {
            case 'front':
                $scope.$apply(function() {
                    $scope.person.uiFrontImageError = '';
                    $scope.person.uiFrontImageStatus = 1;
                });
            break;
            case 'back':
                $scope.$apply(function() {
                    $scope.person.uiBackImageError = '';
                    $scope.person.uiBackImageStatus = 1;
                });
            break;
        }
    });

    $scope.$on('wd-upload-form-error', function(e, data) {
        switch(data.face) {
            case 'front':
                $scope.$apply(function() {
                    $scope.person.uiFrontImageError = '上传失败';
                    $scope.person.uiFrontImageStatus = 3;
                });
            break;
            case 'back':
                $scope.$apply(function() {
                    $scope.person.uiBackImageError = '上传失败';
                    $scope.person.uiBackImageStatus = 3;
                });
            break;
        }
    });

    function setInfo() {
        return wdAccount.setInfo($scope.person);

    }

    function verifyPhone(isExistPhone) {
        return wdAccount.verifyPhone({
            phone: $scope.signIn.phone,
            exists: isExistPhone
        });
    }

    $scope.error_msg = "";
    function register() {
        wdAccount.register($scope.signIn).then(function(data) {
            if (!data.is_succ) {
                $scope.error_msg = data.error_msg;
                return;
            }

            if (searchObj.type === "real") {
                $location.search("type", "virtual2real");
            } else {
                $location.path("regist_succ")
            }

        }, function(data) {
        });
    }
}]);
