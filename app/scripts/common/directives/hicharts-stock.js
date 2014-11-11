angular.module('tigerwitApp')
.directive('highchartsStock', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            items: '='
        },
        controller: function ($scope, $element, $attrs) {

        },
        template: '<div id="container">not working</div>',
        link: function (scope, elemnt, attrs) {
            console.log(3);
            var charts = new Highcharts.Chart(options)
            scope.$watch("items", function (newValue) {
                chart.series[0].setData(newValue, true);
            });
        }
    }
})
