'use strict';

angular.module('tigerwitApp')
.directive('fontFit', ['$document', '$timeout', function($document, $timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {
            var edgeWidth = element.width();
            var startFont = attributes.font;
            var $textContainer = $('span', element);
            var textWidth = $textContainer.width();
            textWidth = $textContainer.width();
            attributes.$observe('equityInfo', function (value) {
                $timeout(function () {
                    textWidth = $textContainer.width();
                    if (value.length > 0) {
                        while(textWidth > edgeWidth) {
                            $textContainer.css({'font-size': (parseInt($textContainer.css('font-size')) - 1) + "px"})
                            textWidth = $textContainer.width();
                        }
                    }
                }, 200)

            });
        }
    };
}]);
