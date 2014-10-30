'use strict';

angular.module('tigerwitApp')
.directive('focusTip', ['wdValidator', function(wdValidator) {
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
                if (!!!validatorType) {
                    $focusTipTextWrpper.hide();
                    return;
                }

                // 验证输入的有效性
                var validateResObj = wdValidator.validate(validatorType, element.val());
                if (validateResObj.validate_result) {
                    $focusTipTextWrpper.hide();
                } else {
                    $focusTipTextWrpper.text(validateResObj.validate_reason);
                    $focusTip.parent().addClass("has-error");
                }
            });
        }
    };
}]);
