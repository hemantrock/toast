var TrendsTags = "";
$(document).ready(function () {
    LoadTrendsGroup();
    $('#formTrends').bootstrapValidator({
        excluded: ['disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            TrendGroup: {
                validators: {
                    notEmpty: {
                        message: 'Field is empty'
                    },
                }
            },
            Tag: {
                validators: {
                    notEmpty: {
                        message: 'Field is empty'
                    },
                }
            },
            //ChartFrom: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Field is empty'
            //        },
            //    }
            //},
            //ChartTo: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Field is empty'
            //        },
            //    }
            //},
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
    });

});

function LoadTrendsGroup() {
    $.ajax({
        url: "/AlarmsAndEvents/GetTrendsGroupAndTags",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTagGroup').html('');
            var r = "<option value=0>Select Trend Group</option>";
            $('#ddlTagGroup').append(r);
            TrendsTags = JSON.parse(result[1]);
            $.each(JSON.parse(result[0]), function (i, val) {
                r = "<option value='" + val + "'>" + val + "</option>";
                $('#ddlTagGroup').append(r);
            });
        }
    });
}

function LoadTrendsTags() {
    strTrendName = $('#ddlTagGroup option:selected').val();
    $('#ddlTags').html('');
    var r ;
    $.each(TrendsTags, function (i, val) {
        if (val.TrendName == strTrendName)
        {
            r = "<option value=" + val.TagName + ">" + val.TagDesc + "</option>";
            $('#ddlTags').append(r);
        }
    });
    $('#ddlTags').chosen();
    $('#ddlTags').trigger("chosen:updated");
}

function processChart()
{
    drawChartMobile($('#ddlTags').val(), $('#dtpChartFrom').val(), $('#dtpChartTo').val());
}

function drawChartMobile(TagName, FromDate, ToDate) {

    if (FromDate == null || FromDate == 'undefined' || ToDate == null || ToDate == 'undefined') {
        alertDismissable('danger', "Invalid inputs");
        return false;
    }

    var arrTagName = "";
    $.each(TagName, function (i, val) {
        arrTagName = arrTagName + val.toUpperCase() + ",";
    });
    arrTagName.substring(0, arrTagName.length - 1);

    $.ajax({
        url: "/PlantView/TrendsGraphData",
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        cache: false,
        async: false,
        data: JSON.stringify({ "TagName": arrTagName, "fromDT": FromDate, "toDt": ToDate }),
        success: function (result) {
            runChartMobile(result[0], result[5], "Chart: " + result[4], TagName, result[6], result[7]);
            $(window).unbind('orientationchange');
            $(window).bind('orientationchange', function () {
                runChartMobile(result[0], result[5], "Chart: " + result[4], TagName, result[6], result[7]);
            });
        }
    });
}

function runChartMobile(result, numOfSeries, titleText, arrTags, strMsg, Unit) {

    if (result == null || result == 'undefined' || result.length <= 0) {
        alertDismissable("danger", "No Data Available.");
        return false;
    }
    onBeginAjax();
    $('#dvTrends #chartCriteria').hide();
    $('#dvTrends #chartBody').show();
    $('#dvTrends .chartModal-chart').css('height', 600);
    $('#dvTrends .chartModal-chart').css('width', $(window).screenWidth);
    $('#dvTrends .chartModal-chart').show();

    var defaultColors = new Array("#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0");
    var themeColor = new Array(numOfSeries * 2);

    for (iCnt = 0; iCnt < numOfSeries; iCnt++) {
        themeColor[iCnt] = defaultColors[iCnt];
        themeColor[numOfSeries + iCnt] = defaultColors[iCnt];
    }
    $('#headingTrends').html(" - " +titleText);
    // use
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar'
        ],
        function (ec) {
            // Initialize after dom ready
            var myChart = ec.init(document.getElementById('main'));
            var arrSeries = [];
            var objSer = function (serName, dataIndex) {
                return {
                    name: serName,
                    type: "line",
                    data: function () {
                        var list = [];
                        $.each(result, function (i, val) {
                            if (val.lstTagValue[dataIndex] == null) {
                                list.push('-');
                            }
                            else {
                                list.push(val.lstTagValue[dataIndex]);
                            }
                        });
                        return list;
                    }(),
                    /*markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg.' }
                        ]
                    },*/
                };
            }

            for (iCnt = 0; iCnt < numOfSeries; iCnt++) {
                arrSeries.push(objSer(arrTags[iCnt], iCnt));
            }
            var option = {
                title: {
                    //text: titleText,
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                legend: {
                    data: arrTags,
                    'x': 'center',
                    'y': 'top'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: { show: false },
                        mark: { show: false },
                        dataView: { show: false, readOnly: false },
                        magicType: {
                            show: false, type: ['line', 'bar']
                        },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                dataZoom: {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100
                },
                calculable: false, // show data points circles when true
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: function () {
                            var listX = [];
                            $.each(result, function (i, val) {
                                listX.push(val.TimeStamp);
                            });
                            return listX;
                        }()
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ' + Unit
                        }
                    }
                ],
                series: arrSeries
            };
            // Load data into the ECharts instance
            myChart.setOption(option);
            myChart.setTheme({ color: themeColor });
            onCompleteAjax();
        }
    );
}

function showCriteria()
{
    $('#dvTrends #chartCriteria').show();
    $('#dvTrends #chartBody').hide();
}