var ChartsAmcharts = function() {


    var initChartSample12 = function() {


        var chartData = [];
        $('#optgra').on('change', function() {
          url="https://www.quandl.com/api/v3/datasets/NSE/"+this.value+".json?sort_order=asc?api_key=agh3EisozxmzwjdutDMA";
          console.log(url);
          $.getJSON(url, function(json) {
            for (var i = json.dataset.data.length-1; i>0 ; i--) {
              chartData.push({
                "date": new Date(json.dataset.data[i][0]),
                "value": json.dataset.data[i][1],
                "volume": json.dataset.data[i][7]
              });
            }
            chart.dataProvider = chartData;
            chart.validateData();
          });
        });

        var chart = AmCharts.makeChart("chart_12", {
            type: "stock",
            "theme": "light",
            pathToImages: Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
            "fontFamily": 'Open Sans',

            "color":    '#888',
            dataSets: [{
                color: "#b0de09",
                fieldMappings: [{
                    fromField: "value",
                    toField: "value"
                }, {
                    fromField: "volume",
                    toField: "volume"
                }],
                dataProvider:chartData,
                categoryField: "date",
                // EVENTS
                stockEvents: [{
                    date: new Date(2010, 8, 19),
                    type: "sign",
                    backgroundColor: "#85CDE6",
                    graph: "g1",
                    text: "S",
                    description: "This is description of an event"
                }, {
                    date: new Date(2010, 10, 19),
                    type: "flag",
                    backgroundColor: "#FFFFFF",
                    backgroundAlpha: 0.5,
                    graph: "g1",
                    text: "F",
                    description: "Some longerntext can alson be added"
                }, {
                    date: new Date(2010, 11, 10),
                    showOnAxis: true,
                    backgroundColor: "#85CDE6",
                    type: "pin",
                    text: "X",
                    graph: "g1",
                    description: "This is description of an event"
                }, {
                    date: new Date(2010, 11, 26),
                    showOnAxis: true,
                    backgroundColor: "#85CDE6",
                    type: "pin",
                    text: "Z",
                    graph: "g1",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 0, 3),
                    type: "sign",
                    backgroundColor: "#85CDE6",
                    graph: "g1",
                    text: "U",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 1, 6),
                    type: "sign",
                    graph: "g1",
                    text: "D",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 3, 5),
                    type: "sign",
                    graph: "g1",
                    text: "L",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 3, 5),
                    type: "sign",
                    graph: "g1",
                    text: "R",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 5, 15),
                    type: "arrowUp",
                    backgroundColor: "#00CC00",
                    graph: "g1",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 6, 25),
                    type: "arrowDown",
                    backgroundColor: "#CC0000",
                    graph: "g1",
                    description: "This is description of an event"
                }, {
                    date: new Date(2011, 8, 1),
                    type: "text",
                    graph: "g1",
                    text: "Longer text can\nalso be displayed",
                    description: "This is description of an event"
                }]
            }],


            panels: [{
                title: "Value",
                percentHeight: 70,

                stockGraphs: [{
                    id: "g1",
                    valueField: "value"
                }],

                stockLegend: {
                    valueTextRegular: " ",
                    markerType: "none"
                }
            }],

            chartScrollbarSettings: {
                graph: "g1"
            },

            chartCursorSettings: {
                valueBalloonsEnabled: true,
                graphBulletSize: 1,
                valueLineBalloonEnabled:true,
                valueLineEnabled:true,
                valueLineAlpha:0.5
            },

            periodSelector: {
                periods: [{
                    period: "DD",
                    count: 10,
                    label: "10 days"
                }, {
                    period: "MM",
                    count: 1,
                    label: "1 month"
                }, {
                    period: "YYYY",
                    count: 1,
                    label: "1 year"
                }, {
                    period: "YTD",
                    label: "YTD"
                }, {
                    period: "MAX",
                    label: "MAX"
                }]
            },

            panelsSettings: {
                usePrefixes: true
            }
        });

        $('#chart_12').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    }

    return {
        //main function to initiate the module

        init: function() {
            initChartSample12();
        }

    };

}();
