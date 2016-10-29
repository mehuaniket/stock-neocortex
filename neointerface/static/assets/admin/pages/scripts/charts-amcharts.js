var ChartsAmcharts = function() {


    var initChartSample12 = function() {


        var chartData = [];
        var newsData= []
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
          });
            url="/spnews?query=\""+this.value+"\"";
            console.log(url);
            $.getJSON(url, function(json) {
              for (var i=0;i<json.length-1; i++) {
                newstData.push({
                  date: new Date(),
                  type: "sign",
                  backgroundColor: "#85CDE6",
                  graph: "g1",
                  text: json[i].title,
                  description: ""
                });
              }
          });
          chart.dataProvider = chartData;
          chart.stockEvents= newsData
          chart.validateData();
          chart.validateNow();
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
                stockEvents: newsData
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
