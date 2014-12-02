'use strict';

angular.module('tigerwitApp')
.controller('wdSettingController',
['$rootScope', '$scope', 'wdAccount', '$timeout', 'wdValidator', '$modal', '$location',
function ($rootScope, $scope, wdAccount, $timeout, wdValidator, $modal, $location) {

    $scope.profile = {};
    wdAccount.getInfo('Profile').then(function(data) {
        $scope.hasLoadProfile = true;
        $scope.profile = data;
    });

    $scope.setting = {};
    $scope.resetPassword = function () {
        if (wdValidator.validateInput('settings-password').result && confirmPassword()) {
            wdAccount.resetPassword({
                password: $scope.setting.password,
                new_pwd: $scope.setting.new_password
            }).then(function (msg) {
                if (msg.is_succ) {
                    $rootScope.resetPassword = true;

                    var modalInstance = $modal.open({
                        templateUrl: 'views/settings/password_succ.html',
                        backdrop: 'static'
                    });

                    $timeout(function () {
                        modalInstance.close();
                        $location.path("/login");
                    }, 3000);

                } else {
                    $scope.setting.error_msg = msg.error_msg;
                }
            });
        }
    }

    function confirmPassword() {
        if ($scope.setting.new_password === $scope.setting.passwordConfirm) {
            return true;
        }

        var $focusTip = $('[focus-tip-type="passwordconfirm"]');
        var $focusTipTextWrpper = $('p', $focusTip);
        $focusTipTextWrpper.show();
        $focusTipTextWrpper.text("两次输入密码不一致");
        $focusTip.parent().addClass("has-error");
        return false;
    }
}]);
