'use strict';

angular.module('tigerwitApp')
.directive('focusTip', ['wdValidator', function(wdValidator) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {
            var focusTip = attributes.focusTip;

            element.bind('focus', function () {
                $('[focus-tip-type="' + attributes.focusTip + '"]').show();
                $('[focus-tip-type="' + attributes.focusTip + '"]').removeClass("has-error");
            });

            element.bind('blur', function () {
                var validatorType = attributes.validate;
                if (!!!validatorType) {
                    $('[focus-tip-type="' + attributes.focusTip + '"]').hide();
                    return;
                }

                // 验证输入的有效性
                if (wdValidator.validate(validatorType, element.val())) {
                    $('[focus-tip-type="' + attributes.focusTip + '"]').hide();
                } else {
                    $('[focus-tip-type="' + attributes.focusTip + '"]').addClass("has-error");
                }
            });
        }
    };
}]);
