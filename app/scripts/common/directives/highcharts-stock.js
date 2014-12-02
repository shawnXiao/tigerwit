angular.module('tigerwitApp')
.directive('highchartsStock', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="container" style="width: 480px; height: 200px;"><img style="padding-left: 150px;height: 200px;" src="ngsrc/ajax-loading.gif" /></div>',
        link: function (scope, elemnt, attrs) {
            scope.$on("personal_history", function (event, data) {
                data = Highcharts.map(data, function (config) {
                    return {
                        x: config[0] * 1000,
                        y: config[1]
                    }
                });

                var options = {
                    chart: {
                        renderTo: 'container',
                        type: 'StockChart'
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            enabled: false
                        }
                    },
                    xAxis: {
                        gapGridLineWidth: 0,
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%m/%d',
                            month: '%m/%d',
                            year: '%m年',
                            week: '%m/%d'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            var dateStamp = new Date(this.x);
                            var date = dateStamp.getFullYear() + '/' + (dateStamp.getMonth() + 1) + "/" + (dateStamp.getDate());
                            return '<p class="chart-title">' + date + '</p><p class="chart-money">$' + this.y + '</p>';
                        }
                    },
                    series : [{
                        name : 'PL',
                        type: 'area',
                        data : data,
                        gapSize: 5,
                        tooltip: {
                            valueDecimals: 2
                        },
                        fillColor : {
                            linearGradient : {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops : [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        turboThreshold: 4000,
                        threshold: null
                    }]
                };
                var charts = new Highcharts.Chart(options);
            });
        }
    }
});
