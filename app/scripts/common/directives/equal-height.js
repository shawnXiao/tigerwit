'use strict';

angular.module('tigerwitApp')
.directive('equalHeight',['$timeout', function($timeout) {
return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attributes) {
        $timeout(function () {
            var parentHeight = element.parent().height();
            element.height(parentHeight);
        }, 200);
    }
};
}]);
