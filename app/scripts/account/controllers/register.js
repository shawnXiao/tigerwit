'use strict';

angular.module('tigerwitApp')
.controller('registerCtrl',
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdValidator', '$location', '$interval',
function ($scope, wdAccount, $timeout, wdConfig, wdValidator, $location, $interval) {

    // 通过 query 中的 type 字段来标示注册的类型，默认情况下为
    // 注册虚拟账户
    // type: virtual || "" 注册虚拟账户
    // type: real 注册真实账户，但还是先要注册虚拟账户
    // type: virtual2real 虚拟账户转变成真实账户
    var searchObj = $location.search();
    $scope.registType = searchObj.type || "";


    // 注册虚拟账户
    $scope.signIn = {
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
        console.log(data);
        if (data.is_succ) {
            wdAccount.getInfo().then(function (data) {
                console.log(data);
                $scope.verified = data.verified;
            });
            $scope.isLogin = true;
            // 已经完成注册申请过程
            $location.path('/personal');
        }

    }, function(data) {});

    $scope.registVirtual = function () {
        if (validateInput() && ($scope.signIn.password === $scope.signIn.passwordConfirm)) {
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

    $scope.setRealInfo = function () {
        if (validateInput()) {
            setInfo().then(function(data) {
                if (data.is_succ) {
                    $location.path("/personal").search("")
                } else {
                    console.log("error");
                }
            });
        }
    };

    // 发送手机验证码
    $scope.verifyPhone = function() {
        verifyPhone();
        coutDown();
    };


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

    function validateInput() {
        var $validateInput = $('#tigerwitRegister [data-validate]:visible');
        var valideAll = true;

        $validateInput.each(function (index, element) {
            var $elem = $(element);
            var validatorType = $elem.attr("data-validate");
            var validatorVal = $elem.val();
            console.group();
            console.log(validatorVal);
            console.log(validatorType);
            console.groupEnd();
            var validateResult = wdValidator.validate(validatorType, validatorVal);
            if (!validateResult) {
                var focusTip = $elem.attr("focus-tip");
                if (focusTip) {
                    debugger;
                    $('[focus-tip-type="' + focusTip + '"]').show();
                    $('[focus-tip-type="' + focusTip + '"]').addClass("has-error");
                } else {
                    $elem.parent().addClass("has-error");
                }
            }
            valideAll = valideAll && validateResult;
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

    function verifyPhone() {
        return wdAccount.verifyPhone($scope.signIn.phone);
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
                $location.path("register_succ")
            }

        }, function(data) {
            console.log(data);
        });
    }
}]);
