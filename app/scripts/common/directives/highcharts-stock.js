angular.module('tigerwitApp')
.directive('highchartsStock', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="container" style="width: 480px; height: 200px;">not working</div>',
        link: function (scope, elemnt, attrs) {
            scope.$on("personal_history", function (event, data) {
                data = Highcharts.map(data, function (config) {
                    return {
                        x: config[0],
                        open: config[1],
                        high: config[2],
                        low: config[3],
                        close: config[4],
                        y: config[4]
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
                        type: 'datetime'
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
                    rangeSelector : {
                        buttons : [{
                            type : 'hour',
                            count : 1,
                            text : '1h'
                        }, {
                            type : 'day',
                            count : 1,
                            text : '1D'
                        }, {
                            type : 'all',
                            count : 1,
                            text : 'All'
                        }],
                        selected : 1,
                        inputEnabled : false
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            var dateStamp = new Date(this.x);
                            var date = dateStamp.getFullYear() + '/' + (dateStamp.getMonth() + 1) + "/" + (dateStamp.getDate()) + " " +
                                dateStamp.getHours() + ":" + dateStamp.getMinutes();
                            return '<p>' + date + '</p><p>' + this.y + '</p>';
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
