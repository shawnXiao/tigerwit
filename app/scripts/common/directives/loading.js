'use strict';

angular.module('tigerwitApp')
.directive('wdLoading', function() {
return {
    restrict: 'A',
    template:
        '<div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
        '</div>',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        element.addClass('wd-loading');
    }
};
});
