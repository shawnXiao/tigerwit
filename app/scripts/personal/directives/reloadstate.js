'use strict';

angular.module('tigerwitApp')
.directive('reloadState', ['$state', '$stateParams', function($state, $stateParams) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {
            var stateParams = attributes.subpage;
            element.bind('click', function (e) {
                if ($stateParams.subPage != stateParams) {
                    return;
                }
                $state.transitionTo($state.current, {subPage: stateParams}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            });
        }
    };
}]);
