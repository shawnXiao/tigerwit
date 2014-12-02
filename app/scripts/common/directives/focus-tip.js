'use strict';

angular.module('tigerwitApp')
.directive('focusTip', ['wdValidator','wdAccount', function(wdValidator, wdAccount) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {
            var focusTip = attributes.focusTip;
            var $focusTip = $('[focus-tip-type="' + attributes.focusTip + '"]');
            var $focusTipTextWrpper = $('p', $focusTip);
            var focusTipText = $focusTipTextWrpper.attr("data-info");

            element.bind('focus', function () {
                $focusTipTextWrpper.text(focusTipText);
                $focusTipTextWrpper.show();
                $focusTip.parent().removeClass("has-error");
            });

            element.bind('blur', function () {
                var validatorType = attributes.validate;
                var exitsInfo = attributes.exits;
                var exitsType = attributes.exitsType || 'key';
                if (!!!validatorType) {
                    $focusTipTextWrpper.hide();
                    return;
                }

                // 验证是否已经存在
                // 验证输入的有效性
                var validateResObj = wdValidator.validate(validatorType, element.val());
                if (validateResObj.validate_result) {
                    $focusTipTextWrpper.hide();
                    if (exitsInfo) {
                        wdAccount.exits(element.val(), exitsType).then(function (msg) {
                            if (msg.data) {
                                $focusTipTextWrpper.show();
                                $focusTipTextWrpper.text(exitsInfo);
                                $focusTip.parent().addClass("has-error");
                            }
                        });
                    }
                } else {
                    $focusTipTextWrpper.text(validateResObj.validate_reason);
                    $focusTip.parent().addClass("has-error");
                }
            });
        }
    };
}]);
