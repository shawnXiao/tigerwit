'use strict';

angular.module('tigerwitApp')
.directive('dropDown', ['$document', 'wdValidator','wdAccount', function($document, wdValidator, wdAccount) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.showDropdown = false;

            scope.toggleDropdown = function () {
                scope.showDropdown = !scope.showDropdown;
            };

            element.on('click', 'a', function () {
                scope.showDropdown = false;
            });

            $document.bind('click', function (event) {
                var isClickeElementChildOfPopup = element.find(event.target).length > 0;
                if (isClickeElementChildOfPopup) {
                    return;
                }
                scope.showDropdown = false;
                scope.$apply();
            });

        }
    };
}]);
