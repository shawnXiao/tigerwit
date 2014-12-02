'use strict';

angular.module('tigerwitApp')
.directive('autoFill', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, ngModel) {
            var originVal = element.val();
            $timeout(function () {
                var newVal = element.val();
                if (ngModel.$pristine && originVal !== newVal) {
                    ngModel.$setViewValue(newVal);
                }
            }, 500);
        }
    };
}])
.directive('autoNotFill', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, ngModel) {
            $timeout(function () {
                ngModel.$setViewValue('');
            }, 500);
        }
    };
}]);
