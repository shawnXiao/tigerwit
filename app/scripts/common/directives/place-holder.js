'use strict';

angular.module('tigerwitApp')
.directive('wdPlaceHolder', function() {
return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
        var holder = attr.placeholder;
        // 标记一下是否是第一次进入
        var firstFlag = false;
        var placehold = function () {
            element.val(holder);
            element.addClass('wd-place-holder');
        };
        var unplacehold = function () {
            element.val('');
            element.removeClass('wd-place-holder');
        };
        scope.$watch(attr.ngModel, function(val) {
            if (!firstFlag && !val) {
                firstFlag = true;
                placehold();
            }
        });
        element.on('focus', function () {
            var v = element.val();
            if (v === holder) {
                unplacehold();
            }
        });
        element.on('blur', function () {
            var v = element.val();
            if (!v) {
                placehold();
            }
        });
    }
};
});
