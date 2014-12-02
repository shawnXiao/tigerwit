'use strict';

angular.module('tigerwitApp')
.directive('analyticsOn', ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {
            var analyticsOn = attributes.analyticsOn;

            element.bind(analyticsOn, function () {
                var label = attributes.analyticsLabel;
                var category = attributes.analyticsCategory;
                ga('send', 'event', analyticsOn, category, label, {
                    'page': $rootScope.primaryPage + "/" + $rootScope.stateName
                });
            });

        }
    };
}]);
