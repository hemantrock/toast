var blnLoad = 0;
var iGblNoRows = 25;
var iGblNoRowsDT = 25;
var iGblAlarmsCount = 20;
var gblTimeout; var gblChartTimeout;
var JQXrowCount = 0;
var JQXTagNames = [];
var iGblPrevStatus = 200;
var CustomerName = 'HPCL'
var defaultHeight = 1080;
var screenHeight = $(window).height();//screen.height;
var opcPageName = ""; var opcPageName1 = ""; var UsrPopUpThreshold = 0;
var opcStartDone = false;
var defaultColors = new Array("#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0");

var strPrimarySrv;
var strBackupSrv;
var BackupRedirectAttempts = 0;

var options = {
    globalPosition: 'bottom left',
    className: 'metro'
};

var svgDefaultOptions = {
    viewportSelector: '.svg-pan-zoom_viewport'
    , panEnabled: false
    , controlIconsEnabled: false
    , zoomEnabled: false
    , dblClickZoomEnabled: false
    , mouseWheelZoomEnabled: true
    , preventMouseEventsDefault: true
    , zoomScaleSensitivity: 0.5
    , minZoom: 0.5
    , maxZoom: 15
    , fit: true
    , contain: false
    , center: true
    , refreshRate: 'auto'
    , beforeZoom: function () { }
    , onZoom: function () { }
    , beforePan: function () { }
    , onPan: function () { }
    , onUpdatedCTM: function () { }
    //, customEventsHandler: {}
    , eventsListenerElement: null
}


//Config Parameters
var WeightBased, CheckInvoiceForBGExit, IsBGEntryBypassed, truckStatus, Purpose, ddlTankModes, ddlOption, panZoomInstance, TkFlwThres, CurrUserID = 1;
var ERPName = "SAP"; TFMSLevelUnit = "mm"; VTickSpeed = 2000; VTickPause = 3000; ProjNo = ""; gblCustName = ""; gblApplication = ""; gblProtocol = ""; TankDBModeID = "";
var activeRakeID = 0, SelSpur;

var tooltipArr = [
    {
        'automan.automan_new_false': 'Device is Manually Controlled',
        'automan.automan_new_true': 'Device is Auto Controlled',
        'locrem.locrem_new_false': 'Device is Remotely Operated',
        'locrem.locrem_new_true': 'Device is Locally Operated',
        'locrem*.locrem_new_false': 'Device is Remotely Operated',
        'locrem*.locrem_new_true': 'Device is Locally Operated',
        'locrem*.locrem_local_true': 'Device is Locally Operated',
        'locrem*.locrem_remote_true': 'Device is Remotely Operated',
        'locrem*.locrem_stop_true': 'Selector is in the Stop position',
        'mute_hooter.muted_true': 'Hooter muted. Press to Un-mute.',
        'mute_hooter.muted_false': 'Press to Mute Hooter',
        'mute_hooter.muted_bad': 'Mute/ Un-mute Hooter',
        'dbbv*.mov_opn_img_true': 'DBBV is Open',
        'dbbv*.mov_alrm_img_true': 'DBBV has Alarms',
        'dbbv*.mov_cls_img_true': 'DBBV is closed',
        'dbbv*.dbbv_opn_img_true': 'DBBV is Open',
        'dbbv*.dbbv_alrm_img_true': 'DBBV has Alarms',
        'dbbv*.dbbv_cls_img_true': 'DBBV is closed',
        'dbbv*.default': 'DBBV has no feedback',
        'pvalve*.pvalve_opn_true': 'Valve is Open',
        'pvalve*.pvalve_cls_true': 'Valve is closed',
        'pvalve*.default': 'Valve has no feedback',
        'pobv*.opn_img_true': 'Valve is Open',
        'pobv*.cls_img_true': 'Valve is closed',
        'pobv*.mov_opn_img_true': 'Valve is Open',
        'pobv*.mov_cls_img_true': 'Valve is closed',
        'pobv*.default': 'Valve has no feedback',
        'mov*.opn_img_true': 'Valve is Open',
        'mov*.cls_img_true': 'Valve is closed',
        'mov*.default': 'Valve has no feedback',
        'dykvalve*.dyk_opn_img_true': 'Dyke Valve is Open',
        'dykvalve*.dyk_cls_img_true': 'Dyke Valve is closed',
        'dykvalve*.default': 'Valve has no feedback',
        'mov*.mov_opn_img_true': 'MOV is Open',
        'mov*.mov_alrm_img_true': 'MOV has Alarms',
        'mov*.mov_cls_img_true': 'MOV is closed',
        'mov*.default': 'MOV has no feedback',
        'tobv*.tobv_opn_img_true': 'TOBV is Open',
        'tobv*.tobv_alrm_img_true': 'TOBV has Alarms',
        'tobv*.tobv_cls_img_true': 'TOBV is closed',
        'tobv*.default': 'TOBV has no Feedback',
        'sov*.status_true': 'SOV Open Command Active',
        'sov*.status_false': 'SOV Closed',
        'sov*.mov_opn_img_true': 'SOV Open',
        'sov*.mov_cls_img_true': 'SOV Closed',
        'sov*.default': 'SOV status Unknown',
        'rosov*.mov_opn_img_true': 'ROSOV is Open',
        'rosov*.mov_cls_img_true': 'ROSOV is closed',
        'rosov*.rosov_opn_img_true': 'ROSOV is Open',
        'rosov*.rosov_cls_img_true': 'ROSOV is closed',
        'rosov*.default': 'ROSOV has No Feedback',
        'dg*.run_img_true': 'DG is Running',
        'dg*.fail_img_true': 'DG failed to start',
        'dg*.default': 'DG is Off/ Stopped',
        'device*.opn_img_true': 'In Open Condition',
        'device*.cls_img_true': 'In Closed Condition',
        'device*.run_img_false': 'Device is Off/ Stopped',
        'device*.run_img_true': 'Device is Running',
        'device*.fail_img_true': 'Device failed to start',
        'device*.trip_img_true': 'Device is Tripped',
        'device*.default': 'Device has No Feedback',
        'pmp*.run_img_true': 'Pump is Running',
        'pmp*.fail_img_true': 'Pump failed to start',
        'pmp*.trip_img_true': 'Pump is Tripped',
        'pmp*.default': 'Pump Off'
    }
]

$.notify.defaults(options);

$(document).ready(function () {
    LoadUserProfile();
});

function disableautocompletion(id1) {
    var passwordControl = document.getElementById(id1);
    passwordControl.setAttribute("autocomplete", "off");
}

//Function for disabling cntrl key combinations
function disableCtrlKeyCombination(e) {
    //list all CTRL + key combinations you want to disable
    var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'v', 'j');
    var key;
    var isCtrl;

    if (window.event) {
        key = window.event.keyCode;     //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which;     //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }

    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {

                return false;
            }
        }
    }
    return true;
}

function processAjaxError(jqXHR, textStatus, errorThrown) {

    console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] ajaxSetup Ajax Error. Status:' + jqXHR.status + '. Exception:' + textStatus + ". Description: " + errorThrown);
    console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] ajaxSetup Error Function:' + jqXHR.url);

    iGblPrevStatus = jqXHR.status;
    if (jqXHR.status === 0) {
        //alert('Not connect.\n Verify Network.');
        //console.log('Not connected. Verify Network. Not executing Redirect for Controller Fail');
        console.log('Not connected. Verify Network. Not executing Redirect for Controller Fail');
        CheckReDirectToBackup();
    } else if (jqXHR.status == 307 || jqXHR.status == 347) {
        console.log('347 - Redirect to Home.');
        window.location.href = "/Home/GoToHome";
    } else if (jqXHR.status == 401) {
        console.log('401 - UnAuthorized - Relogin. Logging Out.');
        LogoutUser(false);
    } else if (jqXHR.status == 404) {
        //alert('Requested page not found. [404]');
        console.log('Requested page not found. [404]. Redirecting to: http://' + strBackupSrv);
        CheckReDirectToBackup();
    } else if (jqXHR.status == 500) {
        //alert('Internal Server Error [500].');
        console.log('Internal Server Error [500]. Redirecting to: http://' + strBackupSrv);
        CheckReDirectToBackup();
    } else if (textStatus === 'parsererror') {
        if ((jqXHR.responseText.indexOf("Session ended. Redirecting to Login page") != -1) ||
            (jqXHR.responseText.indexOf("homeBody") != -1)) {
            console.log("Redirecting to Login page");
            CheckReDirectToBackup();
        }
    } else if (textStatus === 'timeout') {
        console.log('Timeout. Redirecting to: http://' + strBackupSrv);
        CheckReDirectToBackup();
    } else if (textStatus === 'abort') {
        //alert('Ajax request aborted.');
        console.log('Ajax request aborted.');
    }
    else if (jqXHR.status === 412 || jqXHR.status === 503) {
        // Session TimeOut
        console.log('Ajax error / Ajax TimeOut. Redirecting to: http://' + strBackupSrv);
        CheckReDirectToBackup();
        //window.location.href = "/Home/GoToHome"; - Removed this as it was connecting to same server.
    } else {
        //alert('Uncaught Error.\n' + jqXHR.responseText);
        console.log('Uncaught Error: ' + jqXHR.responseText);
    }
}

function getFocus(x) {
    fieldObj = document.getElementById(x);
}

function animateShutter(eleClassName, duration) {
    if ($(eleClassName).attr('style') != undefined) {
        $(eleClassName).removeAttr('style');
    }
    $(eleClassName).css({
        'transition': 'transform ' + duration + ' ease-in-out'
    })

}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function showTime() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }

function jsSleep(msDelay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, msDelay);
    });
}

function JQXTableUpdate(item) {
    console.log("Scripts.js : JQXTableUpdate");
}

function ExtraActivities(model) {
    //console.log("Scripts.js : ExtraActivities");
}

function UpdateDDLTextVal(item) {
    var iValue = parseInt(item.Value)
    if (ddlOption == null || ddlOption == undefined) { GetDDLOptions(); }
    var result = ddlOption.find(x => x.optionId === iValue && x.optionName === item.ClassName);
    if (result != null && result != 'undefined') {
        $.each($('.' + item.ControlName.toUpperCase()), function (i, ele) {
            $(ele).attr('data-opcvalue', iValue);
            $(ele).val(iValue);
            if (ele.nodeName.toLowerCase() != "select") {
                $(ele).text(result.mode_desc);
            }
        });
    }
    //console.log("Scripts.js : UpdateDDLTextValue");
}

function SetDefaultRows() {
    var tempDT = screenHeight - 440;  //Used for DataTables
    var tempJQX = screenHeight - 156;    //Used for JQX Tables. TableName=40px + HeaderRow=36px + BottomPager=40px + BottomScroll=40px 
    var jqxRowHght = 32; //JQX Table Row Height = 32px
    iGblNoRows = Math.floor(tempJQX / jqxRowHght);
    if (iGblNoRows <= 1) {
        iGblNoRows = 1;
    }
    iGblNoRowsDT = parseInt(tempDT / 25);
    if (iGblNoRowsDT <= 1) {
        iGblNoRowsDT = 1;
    }
}

function GetNoOfRows(iRowHght, type) {
    var tempHght = screenHeight - 156;    //Used for JQX Tables. TableName=40px + HeaderRow=36px + BottomPager=40px + BottomScroll=40px 
    if (type == 'dt') { tempHght = screenHeight - 440; } //Used for DataTables
    var iNoOfRows = Math.floor(tempHght / iRowHght);
    if (iNoOfRows <= 1) {
        iNoOfRows = 1;
    }
    return iNoOfRows;
}

function GetEnString(str1) {
    var str = str1.toString();
    var encoded = "";
    for (i = 0; i < str.length; i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 129;
        encoded = encoded + String.fromCharCode(b);
    }
    return encoded;
}
function showInfo(objInfo) {
    $(objInfo).toggleClass('expanded');
    $(objInfo).siblings(".info-explanation").slideToggle();
};


window.localStorage.setItem("isWelcomeLoader", true);
var isWelcomeLoader = window.localStorage.getItem("isWelcomeLoader");


// Function for Ajax Wait
function onBeginAjax() {
    $('#waitpage').show();
    if (!isWelcomeLoader) {
        $('.loader-container').show();
    }
}
function onCompleteAjax() {
    $('#waitpage').hide();
    $('.loader-container').hide();
}
function collapseExpand(h) {
    $(h).siblings(".grid-container").slideToggle("slow");
    $(h).children('span:first-of-type').toggleClass("closed");
    $(h).toggleClass('border-rad-3');
}

function SelectDDL(ddlName, value) {
    if (value == '&lt;') { value = '<'; }
    if (value == '&gt;') { value = '>'; }
    $("#" + ddlName + " [value='" + value + "']").attr('selected', true);
}

// Function for checking Date Format
function isDate(txtDate) {
    var aoDate,           // needed for creating array and object
        ms,               // date in milliseconds
        month, day, year; // (integer) month, day and year
    var separator = '/';
    aoDate = txtDate.split(separator);
    if (aoDate.length !== 3) {
        return false;
    }

    month = aoDate[0] - 1;
    day = aoDate[1] - 0;
    year = aoDate[2] - 0;

    if (year < 1000 || year > 3000) {
        return false;
    }

    ms = (new Date(year, month, day)).getTime();

    aoDate = new Date();
    aoDate.setTime(ms);

    if (aoDate.getFullYear() !== year ||
        aoDate.getMonth() !== month ||
        aoDate.getDate() !== day) {
        return false;
    }
    // date is OK, return true
    return true;
}

function cancelBubble(e) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
}
//for the alert on Active To Date
function alertActiveToDate(obj) {
    var v_activeToDate = $(obj).val();
    if (ValidateDate(v_activeToDate)) {
        if (confirm("Are you sure you want to inactivate it on " + v_activeToDate + "?")) {
        }
        else {
            $(obj).val('');
            $(obj).focus();
            return true;
        }
    }
}

function BindSmallTables(tableBodyId) {
    var $trs = $('.scrollable .table tbody#' + tableBodyId + ' tr');
    var $trp = $('.pinned .table tbody#' + tableBodyId + ' tr');

    $trs.hover(
        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').addClass('highlight');
            $trp.filter(':nth-child(' + i + ')').addClass('highlight');
        },

        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').removeClass('highlight');
            $trp.filter(':nth-child(' + i + ')').removeClass('highlight');
        });

    $trp.hover(
        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').addClass('highlight');
            $trp.filter(':nth-child(' + i + ')').addClass('highlight');
        },

        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').removeClass('highlight');
            $trp.filter(':nth-child(' + i + ')').removeClass('highlight');
        });

}


function BindSmallTablesClick(tableBodyId) {
    var $trs = $('.scrollable .table tbody#' + tableBodyId + ' tr');
    var $trp = $('.pinned .table tbody#' + tableBodyId + ' tr');
    $trs.click(
        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').addClass('row_selected');
            $trp.filter(':nth-child(' + i + ')').addClass('row_selected');
        });
    $trp.click(
        function () {
            var i = $(this).index() + 1;
            $trs.filter(':nth-child(' + i + ')').addClass('highlight');
            $trp.filter(':nth-child(' + i + ')').addClass('highlight');
        });
}

function ValidateDate(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
}

var alertTimer;
function alertDismissable(alertType, msg) {
    if (msg == null || msg == 'undefined' || msg == '') {
        return false;
    }
    //console.log(msg);
    //window.clearTimeout(alertTimer);
    //$(".alert-" + alertType).animate({ left: '2px' });
    //$("#" + alertType).text(msg);

    var timer = 2000 + (msg.length * 50);
    //var width = $(".alert-" + alertType).width() * 1.5;
    //alertTimer = window.setTimeout(function () {
    //    $(".alert-" + alertType).animate({ left: '-' + width + 'px' });
    //}, timer);
    if (alertType == "danger") {
        $.notify(msg, { className: "error", autoHideDelay: timer });
    }
    else if (alertType == "warning") {
        $.notify(msg, { className: "warn", autoHideDelay: timer });
    }
    else {
        $.notify(msg, { className: alertType, autoHideDelay: timer });
    }
}

$(function () {
    $(".alert-dismissable .close").click(function () {
        var width = $(this).parent().width() + 52;
        $(this).parent().animate({ left: '-' + width + 'px' });
    });
});

function clearControlsSubscriptions() {
    clearTimeout(gblTimeout); clearTimeout(gblChartTimeout);
    opc.server.removeFromGroup(opcPageName);
    opc.server.removeFromGroup(opcPageName1);
    opcPageName = ""; opcPageName1 = "";
    $(window).unbind('orientationchange');
}


function downloadTrends(TagName, FromDate, ToDate, DataType, TrendFrmArch) {
    var arrTagName = "";

    $.each(TagName, function (i, val) {
        arrTagName = arrTagName + val.toUpperCase() + ",";
    });
    arrTagName.substring(0, arrTagName.length - 1);
    var strURL = "/PlantView/TrendsGraphDataDownload?TagName=" + arrTagName + "&fromDT=" + FromDate + "&toDt=" + ToDate + "&DataType=" + DataType + "&TrendFrmArch=" + TrendFrmArch;
    $.ajax({
        type: 'GET',
        url: strURL,
        async: true,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.strType == "success") {
                window.open('/PlantView/Download?file=' + result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
    //$('#downloadTrends').attr('href', strURL);
}

function OpenChartModal(ControlName, PageName, TrendFrmArch, DataType) {
    if (TrendFrmArch == undefined || TrendFrmArch == null) { TrendFrmArch = false; }
    var TagName = "";

    if (PageName != "") {
        $.ajax({
            url: "/PlantView/GetTagNameFromControlName?ControlName=" + ControlName + "&PageName=" + PageName,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            //cache: false,
            success: function (result) {
                if (result.blnStatus == true) {
                    TagName = result.strMessage;
                    ChartModalDefault(TagName, TrendFrmArch, DataType);
                }
                else { alertDismissable(result.strType, 'Tag not found!'); }
            }
        });
    }
    else {
        ChartModalDefault(ControlName, TrendFrmArch, DataType);
    }
}

function ChartModalDefault(TagName, TrendFrmArch, DataType) {
    var arrTags = [];
    arrTags.push(TagName);
    $('#chartModal').modal('show');
    $('#chartModal').draggable({ handle: ".modal-header" });
    $('#goButton').unbind('click');
    setTimeout(drawChart(arrTags, null, null, TrendFrmArch, DataType), 200);
    var strChart = "<div class='chartModal-chart' id='main'></div>";
    $('#chartModal').on('hidden.bs.modal', function () {
        $('#chartModalBody').html(strChart);
    });
}

function drawChart(TagName, FromDate, ToDate, TrendFrmArch, DataType) {
    var arrTagName = ""; var blnLiveData = false;

    $.each(TagName, function (i, val) {
        arrTagName = arrTagName + val.toUpperCase() + ",";
    });
    arrTagName.substring(0, arrTagName.length - 1);

    if ($('#chkLiveData').is(":checked")) {
        blnLiveData = true;
    }

    $.ajax({
        url: "/PlantView/TrendsGraphData",
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        cache: false,
        //async: false,
        data: JSON.stringify({ "TagName": arrTagName, "fromDT": FromDate, "toDt": ToDate, "DataType": DataType, "TrendFrmArch": TrendFrmArch, "LiveData": blnLiveData }),
        success: function (result) {
            //Original Code Commented
            //if (FromDate == null || FromDate == 'undefined' || ToDate == null || ToDate == 'undefined') {
            //    $('#dtpChartFrom').val(result[1]).change();
            //    $('#dtpChartTo').val(result[2]).change();
            //    //$('#dtpChartFrom').trigger('change');
            //    //$('#dtpChartTo').trigger('change');
            //}
            //New Code Added Below.
            $('#dtpChartFrom').val(result[1]);
            $('#dtpChartTo').val(result[2]);
            if (TrendFrmArch) { $('#dvLiveData').hide(); }
            else { $('#dvLiveData').show(); }
            $('#FirstInterval').val(result[8]);
            $('#TimerInterval').val(result[9]);

            $('#ddlChartTags').empty();
            $('#ddlChartTags').css('width', '600px');
            $.each(result[3], function (i, val) {
                if (arrTagName.indexOf(val.toUpperCase()) >= 0) {
                    $('#ddlChartTags').append("<option value='" + val + "' selected>" + val + "</option>");
                }
                else {
                    $('#ddlChartTags').append("<option value='" + val + "'>" + val + "</option>");
                }
            });
            $('#DataType').val(DataType);
            $('#ddlChartTags').css('width', '600px');
            $('#ddlChartTags').chosen();
            $('#ddlChartTags').trigger("chosen:updated");
            runChart(result[0], result[5], "Chart: " + result[4], result[11], result[6], result[7], result[10], DataType);
            $('#ddlChartTags_chosen').css('width', '600px');
            $('#goButton').unbind('click');
            $('#goButton').bind('click', function () {
                $('#chkLiveData').prop('checked', false);
                drawChart($('#ddlChartTags').val(), $('#dtpChartFrom').val(), $('#dtpChartTo').val(), TrendFrmArch, DataType);
            });
            $('#downloadTrends').unbind('click');
            $('#downloadTrends').bind('click', function () {
                downloadTrends($('#ddlChartTags').val(), $('#dtpChartFrom').val(), $('#dtpChartTo').val(), $('#DataType').val(), TrendFrmArch);
            });
        }
    });
}

function runChart(result, numOfSeries, titleText, arrTags, strMsg, TagAxisUnit, LastTime, DataType) {
    if (strMsg != "") alertDismissable("danger", strMsg);
    if (result.TS == null || result.TS == 'undefined' || result.TS.length <= 0) {
        CheckRunLiveData();
        return false;
    }
    $('#LastTime').val(LastTime);

    $('.chartModal-chart').show();
    var themeColor = new Array(numOfSeries * 2);

    for (iCnt = 0; iCnt < numOfSeries; iCnt++) {
        themeColor[iCnt] = defaultColors[iCnt];
        themeColor[numOfSeries + iCnt] = defaultColors[iCnt];
    }
    var AvgData = [{ type: 'average', name: 'Avg.' }];
    var MinMaxData = [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }];
    if (DataType == 2) {
        AvgData = [];
        MinMaxData = [];
    }

    $('#chartModalLabel').html(titleText);
    // use
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar'//,
            //'echarts/chart/scatter',
            //'echarts/chart/chord',
            //'echarts/chart/force',
            //'echarts/chart/funnel',
            //'echarts/chart/pie',
            //'echarts/chart/k'
        ],
        function (ec) {
            // Initialize after dom ready
            var myChart = ec.init(document.getElementById('main'));
            myChart.group = 'Group01';
            var arrSeries = [];
            var objSer = function (serName, dataIndex) {
                return {
                    name: serName,
                    type: "line",
                    yAxisIndex: TagAxisUnit[dataIndex].yAxisIndex,
                    data: function () {
                        return result.arrTagValue[dataIndex];
                    }(),
                    markPoint: {
                        data: MinMaxData
                    },
                    markLine: {
                        data: AvgData
                    },
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
                    trigger: 'axis',
                    //formatter: "{a} <br/>{b} : {c} (%)"
                },
                legend: {
                    data: arrTags,
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: { show: true },
                        mark: { show: false },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true, type: ['line', 'bar']
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
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
                            return result.TimeStamp;
                        }()
                    }
                ],
                yAxis: function () {
                    var splitNo = 5;
                    if (DataType == 2) { splitNo = 2; }
                    var listY = [];
                    let unique = [...new Set(TagAxisUnit.map(item => item.DataUnit))];
                    $.each(unique, function (i, val) {
                        listY.push({ type: 'value', splitNumber: splitNo, axisLabel: { formatter: '{value} ' + val } });
                    });
                    return listY;
                }(),
                series: arrSeries
            };

            // Load data into the ECharts instance
            myChart.setOption(option);
            myChart.setTheme({ color: themeColor });
        }
    );
    CheckRunLiveData();
}

function LiveDataClick() {
    if ($('#chkLiveData').is(":checked")) {
        alertDismissable('info', 'Live Trends Starting');
        drawChart($('#ddlChartTags').val(), null, null, false, $('#DataType').val());
    }
    else {
        clearTimeout(gblChartTimeout);
        alertDismissable('info', 'Live Trends Stopped');
    }
}

function CheckRunLiveData() {
    if ($('#chkLiveData').is(":checked")) {
        var FirstInterval = $('#FirstInterval').val();
        var RepeatInterval = $('#TimerInterval').val();
        //console.log('FirstInterval:' + $('#FirstInterval').val());
        //console.log('TimerInterval:' + $('#TimerInterval').val());
        setTimeout(function () { TestAddDataToChart(); }, $('#FirstInterval').val())
        clearTimeout(gblChartTimeout);
        gblChartTimeout = setTimeout(function () { TestAddDataToChart(); }, parseInt(FirstInterval) + parseInt(RepeatInterval));
    }
}

function ChartClose() {
    $('#chkLiveData').prop('checked', false);
    clearTimeout(gblChartTimeout);
    //alertDismissable('info','Chart Closed'); 
}

function TestAddDataToChart() {
    clearTimeout(gblChartTimeout);
    var TagName = $('#ddlChartTags').val();
    var FromDate = $('#LastTime').val();
    //console.log(FromDate);
    var arrTagName = "";

    $.each(TagName, function (i, val) {
        arrTagName = arrTagName + val.toUpperCase() + ",";
    });
    arrTagName.substring(0, arrTagName.length - 1);

    $.ajax({
        url: "/PlantView/NextTrendData",
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        cache: false,
        async: false,
        data: JSON.stringify({ "TagName": arrTagName, "fromDT": FromDate, "toDt": null, "DataType": $('#DataType').val() }),
        success: function (result) {
            if (result[0] == null || result[0] == 'undefined' || result[0].length <= 0) {
                alertDismissable("danger", "No Live Trend Data Available.");
                gblChartTimeout = setTimeout(function () { TestAddDataToChart(); }, parseInt($('#TimerInterval').val()));
                return false;
            }
            $('#LastTime').val(result[3]);

            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar'//,
                    //'echarts/chart/scatter',
                    //'echarts/chart/chord',
                    //'echarts/chart/force',
                    //'echarts/chart/funnel',
                    //'echarts/chart/pie',
                    //'echarts/chart/k'
                ],
                function (ec) {
                    var ChartID = $("#main").attr('_echarts_instance_');
                    var myChart = ec.getInstanceById(ChartID);
                    //console.log(result[0]);
                    var arrSeries = result[0];
                    myChart.addData(arrSeries);
                    gblChartTimeout = setTimeout(function () { TestAddDataToChart(); }, parseInt($('#TimerInterval').val()));
                });
        }
    });
}

function UpdateActivityTime() {
    $.ajax({
        url: "/Home/UpdateActivityTime",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (result) {
        }
    });
}

function LogoutUser(blnHome) {
    //$.connection.hub.stop();
    $.ajax({
        url: "/Home/Logout",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (result) {
            if (blnHome == false) // && result.blnStatus==true
            {
                alertDismissable(result.strType, result.strMessage);
                window.location.href = "/Home/Index";
            }
        }
    });
}

//Generic Function to Confirm, Validate Permission and Execute Once validated
function ConfirmValidateExecute(confirmMsg, activityName, activityDetail, CallBackFunction, LoadID) {

    $('#myConfirmMsg').html("<p>" + confirmMsg + "</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        ValidateExecute(activityName, activityDetail, CallBackFunction, LoadID);
    });


}

//Generic Function to Validate Permission and Execute Once validated
function ValidateExecute(activityName, activityDetail, CallBackFunction, LoadID) {
    $('#Pwd_txtRemarks').val("");
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "success") { CallBackFunction(); }
                else { alertDismissable(result.strType, result.strMessage) }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", CallBackFunction, activityName, activityDetail, LoadID);
            }
        }
    });
}

//Added for req. tran password
function ShowPasswordModalForReqTrn(msg, CallBackFunction, strActivityName, strActivityDetail, LoadID) {
    $('#Pwd_txtRemarks').val(""); //
    $('#myPasswordLabel').html(msg);
    $('#myPasswordModal').modal('show');
    $('#myPasswordModal').draggable({ handle: ".modal-header" });
    $("#btnPwdOK").unbind('click');
    $("#btnPwdOK").on("click", function () {
        ConfirmPasswordForReqTrn(CallBackFunction, strActivityName, strActivityDetail, LoadID);
    });
    $("#btnPwdCancel").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#myPasswordModal').modal('hide');
    });
    $('#myPasswordLabel').on('hidden.bs.modal', function () {
        OpenLoadSummaryMenu();
    })
}

function ConfirmPasswordForReqTrn(CallBackFunction, strActivityName, strActivityDetail, loadID) {
    $('#frmLoginPwd').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var LoginID = $('#Pwd_txtLoginID').val();
    var pwd = $('#Pwd_txtPassword').val();
    var Remarks = $('#Pwd_txtRemarks').val();

    $.ajax({
        url: "/Home/ConfirmTxnPassword",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify({ "LoginID": LoginID, "TxnPassword": pwd, "ActivityName": strActivityName, "ActivityDetail": strActivityDetail, "Remarks": Remarks, "LoadID": loadID }),
        success: function (result) {

            if (result.blnStatus == true) {
                $(".modal-backdrop").slideUp('slow');
                $('#myPasswordModal').modal('hide');
                CallBackFunction(result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
            //$('#Pwd_txtRemarks').val(); -->Use this for sending Remarks.
        }
    });
}

function ConfirmPassword(CallBackFunction, strActivityName) {
    $('#frmLoginPwd').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var LoginID = $('#Pwd_txtLoginID').val();
    var pwd = $('#Pwd_txtPassword').val();

    $.ajax({
        url: "/Home/ConfirmPassword",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify({ "LoginID": LoginID, "Password": pwd, "ActivityName": strActivityName }),
        success: function (result) {
            if (result.blnStatus == true) {
                $(".modal-backdrop").slideUp('slow');
                $('#myPasswordModal').modal('hide');
                CallBackFunction(result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function ShowPasswordModal(msg, CallBackFunction, strActivityName) {
    $('#myPasswordLabel').html(msg);
    $('#myPasswordModal').modal('show');
    $("#btnPwdOK").unbind('click');
    $("#btnPwdOK").on("click", function () {
        ConfirmPassword(CallBackFunction, strActivityName);
    });
    $('#myPasswordLabel').on('hidden.bs.modal', function () {
        OpenLoadSummaryMenu();
    })
}

function ChangePassword(Id) {
    $('#myConfirmMsg').html("<p>Are you sure, you want to change Password?</p>");
    $('#confirmModal').modal('show');
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/Users/ChangePasswordView?Id=" + Id,
            UpdateTargetId: "dvContent",
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    alertDismissable(result.strType, result.strMessage);
                }
                else {
                    $("#dvContent").html(result);
                }
            }
        });
    });
}

function ShowUserSettings() {
    clearControlsSubscriptions();
    $.ajax({
        type: "GET",
        url: "/Settings/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTransporterMenu() {
    $.ajax({
        type: "GET",
        url: "/Transporter/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTruckMastersMenu() {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenMachineView(MachineNo) {
    $.ajax({
        type: "GET",
        url: "/MachineView/MachineView?MachineNo=" + MachineNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenLocationMenu() {
    $.ajax({
        type: "GET",
        url: "/Location/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenDestinationMenu() {
    $.ajax({
        type: "GET",
        url: "/Destination/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenCardStatusMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/CardStatusMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenSecurityActivityMenu() {
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenActivityPermissionMenu() {
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/ActivityPermissionIndex",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenMenuPermission() {
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/MenuPermissionIndex",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenMapRFIDTruck() {
    $.ajax({
        type: "GET",
        url: "/RFID/MapRFIDTruck",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenMapCardruck() {
    OpenMapCardTruck();
}

function OpenMapCardTruck() {
    $.ajax({
        type: "GET",
        url: "/Cards/CardTruckMap",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenCardPrivilegeMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/CardPrivilegeMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenICONCustomerMenu() {
    $.ajax({
        type: "GET",
        url: "/ICONCustomer/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTruckTypeMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/TruckTypeMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenAccumulatedMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/AccumulatedMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenCardsMenu() {
    $.ajax({
        type: "GET",
        url: "/Cards/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTankModeMenu() {
    $.ajax({
        type: "GET",
        url: "/TankMode/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function GetTankMode() {
    if (ddlTankModes != undefined && ddlTankModes != null) { return; }
    $.ajax({
        url: "/Tanks/GetTanksMode",
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlTankModes = result;
        }
    });
}

function GetDDLOptions() {
    if (ddlOption != undefined && ddlOption != null) { return; }
    $.ajax({
        url: "/PlantView/GetDDLOptions",
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlOption = result;
        }
    });
}

function OpenCustomerMenu() {
    $.ajax({
        type: "GET",
        url: "/Customer/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenBatchControllerMenu() {
    $.ajax({
        type: "GET",
        url: "/BatchController/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTruckDetailsMenu() {
    $.ajax({
        type: "GET",
        url: "/TruckDetails/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenProductGroupMenu() {
    $.ajax({
        type: "GET",
        url: "/ProductGroup/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenProductMenu() {
    $.ajax({
        type: "GET",
        url: "/Product/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenLPProductsMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/LPProductsMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenBayPriorityMenu() {
    $.ajax({
        type: "GET",
        url: "/BayPriority/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenLPMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/LPMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenBayQueue() {
    $.ajax({
        type: "GET",
        url: "/BayQueue/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenBayQueueData() {
    $.ajax({
        type: "GET",
        url: "/BayQueue/BQIndex",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenUsersMenu() {
    $.ajax({
        type: "GET",
        url: "/Users/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenACSUsersMenu() {
    $.ajax({
        type: "GET",
        url: "/ACSUsers/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTransporterMenu() {
    $.ajax({
        type: "GET",
        url: "/Transporter/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenMeterFactorMenu() {
    $.ajax({
        type: "GET",
        url: "/MeterFactor/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenBayPrefMenu() {
    $.ajax({
        type: "GET",
        url: "/BayPref/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTanksMenu() {
    $.ajax({
        type: "GET",
        url: "/Tanks/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}


function OpenConfigurationMenu() {
    $.ajax({
        type: "GET",
        url: "/Configuration/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenJDEMeterMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/JDEMeterMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenMaintainceScheduleMenu() {
    $.ajax({
        type: "GET",
        url: "/MaintainceSchedule/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenTankTypeMenu() {
    $.ajax({
        type: "GET",
        url: "/TankType/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenSAPConfigMenu() {

    $.ajax({
        type: "GET",
        url: "/IconSAPConfig/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenSAPTFMSData() {

    $.ajax({
        alert: ('hi'),
        type: "GET",
        url: "/SAPTFMSData/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}
function OpenTankStatusMenu() {
    $.ajax({
        type: "GET",
        url: "/TankStatus/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}


function AutoOpenLoadSummaryMenu() {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/Index?Purpose=" + Purpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenLoadSummaryMenu(iPurpose) {
    if (iPurpose == undefined) { iPurpose = Purpose; }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/IndexManual?iPurpose=" + iPurpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenUnLoadSummaryMenu() {
    $.ajax({
        type: "GET",
        url: "/UnLoadSummary/IndexManual?Purpose=" + Purpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}


function OpenPackedTrksMenu(iPurpose) {
    if (iPurpose == undefined) { iPurpose = Purpose; }
    $.ajax({
        type: "GET",
        url: "/PackLoads/PackLoadIndex?iPurpose=" + iPurpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenERVTrksMenu(iPurpose) {
    if (iPurpose == undefined) { iPurpose = Purpose; }
    $.ajax({
        type: "GET",
        url: "/PackLoads/ERVIndex?iPurpose=" + iPurpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenExitedTTs(Purpose) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/ExitedTTs?Purpose=" + Purpose,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenManualFan() {
    $.ajax({
        type: "GET",
        url: "/ManualFAN/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenManualUAN() {
    $.ajax({
        type: "GET",
        url: "/ManualFAN/UANView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenVDUDisplay() {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/VDUDisplay",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTTQueue() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenWeighBridge() {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/WeighBridgeView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenJDEData() {
    $.ajax({
        type: "GET",
        url: "/JDEData/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenJDEHostArrivals() {
    $.ajax({
        type: "GET",
        url: "/JDEData/JDEHostArrivals",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenDayStartEndMenu() {
    $.ajax({
        type: "GET",
        url: "/DayStartEnd/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenAlarmsMenu() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/Alarms",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenEventsMenu() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/Events",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenWagonEvents() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/WagonEvents",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenOperatorActions() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/OpActions",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenEventsConfig() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/EventsConfig",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTrendsConfig() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/TrendsConfig",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenViewTrends(FrmArch) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/ViewTrends?FromArchives=" + FrmArch,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenReportsMenu() {
    $.ajax({
        type: "GET",
        url: "/Reports/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
                //$('body').css("overflow", "hidden");
                //$('.right-content-reports').css("overflow", "hidden");
                //$('div.report-content').css("overflow", "hidden");
                //$('.content').css("padding-top", 0);

                var innerHgt = $(window).innerHeight() - 100;
                var reportInnerHgt = $(window).innerHeight() - 150;
                //$('.left-nav-reports').css('height', innerHgt);
                //$('#reportData').css('height', innerHgt);
                //$('.right-content-reports').css('height', reportInnerHgt);
            }
        }
    });
}

function OpenRFIDMenu() {
    $.ajax({
        type: "GET",
        url: "/RFID/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenVDUParameterMenu() {
    $.ajax({
        type: "GET",
        url: "/VDUParameter/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTankArchiveMenu() {
    $.ajax({
        type: "GET",
        url: "/TankArchive/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTankManualPostMenu() {
    $.ajax({
        type: "GET",
        url: "/TankManualPost/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTankManualEntry() {
    $.ajax({
        type: "GET",
        url: "/TankManualEntry/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}


function OpenSMSConfigMenu() {
    $.ajax({
        type: "GET",
        url: "/SMSConfig/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenSMSReceiverMenu() {
    $.ajax({
        type: "GET",
        url: "/SMSReceiver/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenBayViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenBayViewHMIBasedOnSelectedBay(bay) {
    $.ajax({
        type: "GET",
        url: "/PlantView/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
            var iBayID = bay.toString().toLowerCase().replace('bayview0', '').replace('bayview', '');
            $('#ddlBayView option').map(function () {
                if ($(this).val() == iBayID) return this;
            }).attr('selected', 'selected');
            $('#ddlBayView').trigger('chosen:updated');

            $.ajax({
                type: "GET",
                url: "/PlantView/ShowBayView?BayId=" + iBayID,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        alertDismissable(result.strType, result.strMessage);
                    }
                    else {
                        $("#dvBayView").html(result);
                    }
                }
            });

        }
    });
}

function OpenMassFlowHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/MFMView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenMFMModal(DevUnqID, MeterID, DevPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/MFMDetailView?DevUnqID=" + DevUnqID + "&MeterID=" + MeterID,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(DevPageName, 0);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + DevPageName;
}

function OpenSetPointsView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/SetPointsView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenGantryViewHMI(GantryNo) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GantryView?GantryNo" + GantryNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenGantryGroupView(GantryNo) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GantryGroupView?GantryNo=" + GantryNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenTanksViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/TanksView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenTanksProdGrpView(ProdGrpID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/TanksProdGrpView?ProdGrpID=" + ProdGrpID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OHTanksView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/OHTanksView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenTanksLiveData() {
    $.ajax({
        type: "GET",
        url: "/TankLiveData/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenTankPnIDView(ProdID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/TanksPnIDView?ProdID=" + ProdID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTankPnIDOption(ProdID, OptionID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/TanksPnIDOption?ProdID=" + ProdID + "&strOption=" + OptionID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                //console.log(result);
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTestPage(OptionID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/OpenTestPage?strOption=" + OptionID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                //console.log(result);
                $("#dvContent").html(result);
            }
        }
    });
}


function OpenBGNewViewHMI(BGGroupID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/BarrierGateNewView?iBGGroup=" + BGGroupID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function BGViewDirection(direction) {
    $.ajax({
        type: "GET",
        url: "/PlantView/BGViewDirection?strBGDirection=" + direction,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenBGViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/BarrierGateView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenMOVsViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/MOVsView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenOtherMOVsView(Line, Grp) {
    $.ajax({
        type: "GET",
        url: "/PlantView/OtherMOVsView?Line=" + Line + "&Group=" + Grp,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}
('Header')

function OpenPumpsViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/PumpsView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenPumpsTypeViewHMI(ServiceIDs) {
    $.ajax({
        type: "GET",
        url: "/PlantView/PumpsTypeView?ServiceIDs=" + ServiceIDs,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenDGViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DGView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenESDViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/ESDView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSecurityView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/SecurityView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSecurityViewDirect() {
    $.ajax({
        type: "GET",
        url: "/BQD/SecurityView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenBQDTVDirect() {
    $.ajax({
        type: "GET",
        url: "/BQD/BQDTVView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenUPSViewHMI(Type) {
    $.ajax({
        type: "GET",
        url: "/PlantView/UPSView?Type=" + Type,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenMOSView(Type) {
    $.ajax({
        type: "GET",
        url: "/PlantView/MOSView?Type=" + Type,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenPLCViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/PLCView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSafetyPLCView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/SafetyPLCView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenPLCViewSVG(Type) {
    $.ajax({
        type: "GET",
        url: "/PlantView/PLCViewSVG?Type=" + Type,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}


function OpenFireWaterSystemHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/FireWaterSystem",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSVGViewPath(path) {
    $.ajax({
        type: "GET",
        url: "/PlantView/OpenSVGViewPath?path=" + path,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenViewPath(path, fileName) {
    if (fileName == undefined) { fileName = "Index"; }
    $.ajax({
        type: "GET",
        url: "/General/Index?path=" + path + "&fileName=" + fileName,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenGenericViewPath(controllerFunc, path, fileName) {
    if (fileName == undefined) { fileName = "Index"; }
    $.ajax({
        type: "GET",
        url: controllerFunc + "?path=" + path + "&fileName=" + fileName,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenGenericViewPathParam(controllerFunc, path, fileName, params) {
    if (fileName == undefined) { fileName = "Index"; }
    $.ajax({
        type: "GET",
        url: controllerFunc + "?path=" + path + "&fileName=" + fileName + "&parameter=" + params,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSpurView(spurNo) {
    $.ajax({
        type: "GET",
        url: "/WagonSummary/OpenSpurView?SpurNo=" + spurNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenClusterBCU(spurNo, clusterRef) {
    $.ajax({
        type: "GET",
        url: "/WagonSummary/OpenClusterBCUs?SpurNo=" + spurNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
            if (clusterRef != undefined) {
                SelSpur = clusterRef;
                //$('a[href="#' + clusterRef + '"]').tab('show');
            }
        }
    });
}

function OpenDashboardView(UserID) {
    $.ajax({
        type: "GET",
        url: "/PlantView/DashboardView?UserID=" + UserID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenEthernetViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/EthernetView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenLegendsViewHMI() {
    clearControlsSubscriptions();
    $.ajax({
        type: "GET",
        url: "/PlantView/LegendsView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}
function OpenPlantViewIndexHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/IndexView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenFireAlarmViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/FireAlarmView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenVFDViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/VFDView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenDatabaseStatusViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DatabaseView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenROSOVViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/ROSOVView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenTOBVViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/TOBVView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}
function OpenDBBVViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DBBVView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenESDCauseEffectViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/ESDCauseEffectView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenESDPopUp(RemScrObj) {
    if (UsrPopUpThreshold > RemScrObj.Severity) { return; }
    var Msg = RemScrObj.Param1;
    var TimeoutTime = RemScrObj.Param2;
    $.ajax({
        type: "GET",
        url: "/PlantView/ESDPopUpView?TimeoutTime=" + TimeoutTime,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (ESDResult) {
            $('#ESDMsgModal').html('');
            $('#ESDMsgModal').html(ESDResult);
            $('#ESDMsgModal #opcMsgModalMsg').html(Msg);
            $('#ESDMsgModal').modal('show');
            $('#ESDMsgModal').draggable({ handle: ".modal-header" });

            var Directpage = window.location.href.toUpperCase().indexOf("HTML") > 0;
            if (Directpage == false && (typeof window[RemScrObj.OnClickBGFunc] === "function")) {
                clearControlsSubscriptions();
                window[RemScrObj.OnClickBGFunc]();
            }
        }
    });
}

function Open3HCauseEffectViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/HHHCauseEffectView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}



function OpenSystemConfigViewHMI() {
    $.ajax({
        type: "GET",
        url: "/PlantView/SystemConfigView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenSirenView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/SirenView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenDykeValveView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DykeValveView",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            $("#dvContent").html(result);
        }
    });
}

function OpenTrucksStatusMenu() {
    $.ajax({
        type: "GET",
        url: "/TrucksStatus/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                var clickedItem = null;
                if ($('.truck-status-container .toggle-menu-container .menu-item.active').length > 0) {
                    clickedItem = $('.truck-status-container .toggle-menu-container .menu-item.active').attr('id');
                    //console.log(clickedItem);
                }
                $("#dvContent").html(result);
                if (clickedItem) {
                    $('.truck-status-container #' + clickedItem).trigger('click');
                }
            }
        }
    });
}

function OpenTagsMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/Tags/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTFMSHost() {
    $.ajax({
        type: "GET",
        url: "/TFMSHost/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTagPageLinkMenu() {
    $.ajax({
        type: "GET",
        url: "/TagPageLink/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTagTrendsMenu() {
    $.ajax({
        type: "GET",
        url: "/TagTrends/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenTagEventsMenu() {
    $.ajax({
        type: "GET",
        url: "/TagEvents/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}


function GetStatusBarAck() {
    var r = "";
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/StatusBarAlarmsList?iCnt=" + iGblAlarmsCount,
        cache: false,
        global: false,
        dataType: 'json',
        //beforeSend: function () {
        //    console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] Send Function:' + this.url);
        //},
        success: function (result) {
            if ($("#StatusBar_Ack_List").length > 0) {
                $("#StatusBar_Ack_List").html('');
                $.each(result, function (i, obj) {
                    r = "<li><span class='glyphicon glyphicon-check clickable spanAck' data-id='" + obj.Id + "' onclick=AcknowledgeAlarm('" + obj.Id + "')></span><span style='padding:10px;'><a onclick=OpenAlarmEventsPage('" + obj.Id + "')>" + obj.EventLogDesc + "</a><span></li>";
                    $('#StatusBar_Ack_List').append(r);
                });
                //$('#StatusBar_Ack').vTicker();
                $('#StatusBar_Ack').vTicker({
                    //speed: 2000, pause: 3000, //Default
                    speed: 3000, pause: 4000,
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}

function CallGlobalRefreshFunctions() {
    GetStatusBarAck();
}

function AcknowledgeAlarm(Id) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/AcknowledgeLog?LogID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                $('#logTr_' + Id).delay(600).fadeOut('slow');
            }
            GetStatusBarAck();
        }
    });
}

function OpenAlarmEventsPage(Id) {
    if (Id != undefined) {
        if (Id[0] == 'A') {
            OpenAlarmsMenu();
        } else {
            OpenEventsMenu();
        }
    }
}

function LoadDDLProductGroups(iSel) {
    $.ajax({
        url: "/ProductGroup/GetProductGroups",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlProductGroup').html('');
            var r = "Select Product Group";
            $('#ddlProductGroup').append(r);
            $.each(result, function (i, objPG) {
                if (parseInt(iSel) == parseInt(objPG.ProductGroupID)) {
                    r = "<option selected value=" + objPG.ProductGroupDesc + ">" + objPG.ProductGroupDesc + "</option>";
                }
                else {
                    r = "<option value=" + objPG.ProductGroupID + ">" + objPG.ProductGroupDesc + "</option>";
                }
                $('#ddlProductGroup').append(r);
            });
        }
    });
}


function LoadDDLProduct(ctrl, iSel) {
    if (ctrl == null) {
        return false;
    }
    $.ajax({
        //url: "/Product/GetProducts",
        url: "/Product/GetBaseProducts",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r = "<option value=0>Select Product</option>";
            ctrl.append(r);

            $.each(result, function (i, objProduct) {
                if (parseInt(iSel) == parseInt(objProduct.ProductID)) {
                    r = "<option selected value=" + objProduct.ProductID + ">" + objProduct.ProductName + "</option>";
                }
                else {
                    r = "<option value=" + objProduct.ProductID + ">" + objProduct.ProductName + "</option>";
                }
                ctrl.append(r);
            });
        }
    });
}


function LoadDDLTags(ctrl, iSel, callback, addBlank) {
    if (ctrl == null) {
        return false;
    }
    $.ajax({
        url: "/Tags/GetAllTags",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            if (addBlank === true) {
                ctrl.append("<option value=''></option>");
            }
            var r;
            $.each(result, function (i, objTag) {
                r = "<option value=" + objTag + ">" + objTag + "</option>";
                ctrl.append(r);
            });
            if (iSel) {
                $(ctrl).val(iSel);
            }
            if (callback) {
                callback();
            }
        }
    });
}

function LoadDDLEvents(ctrl, iSel, callback) {
    if (ctrl == null) {
        return false;
    }
    $.ajax({
        url: "/TagEvents/GetEventsList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r;
            $.each(result, function (i, objTag) {
                r = "<option value=" + objTag.EventID + ">" + objTag.EventID + "</option>";
                ctrl.append(r);
            });
            if (iSel) {
                $(ctrl).val(iSel);
            }
            if (callback) {
                callback();
            }
        }
    });
}

function LoadDDLPageNames(ctrl, iSel) {
    if (ctrl == null) {
        return false;
    }
    ctrlId = $(ctrl).attr('id');

    $.ajax({
        url: "/TagPageLink/GetAllPageName",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r;
            $.each(result, function (i, objTag) {
                r = "<option value=" + objTag + ">" + objTag + "</option>";
                ctrl.append(r);
            });
            $(ctrl).editableSelect();
            if (iSel) {
                $('#' + ctrlId).val(iSel);
            }
        }
    });
}


function LoadDDLPlantCode(ctrl, iSel) {
    if (ctrl == null) {
        return false;
    }
    $.ajax({
        url: "/IconSAPConfig/PlantCodeList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r = "<option value=0>Select Plant Code</option>";
            ctrl.append(r);

            $.each(result, function (i, objPlantCodes) {
                if (parseInt(iSel) == parseInt(objPlantCodes.PlantID)) {
                    r = "<option selected value=" + objPlantCodes.PlantID + ">" + objPlantCodes.PlantCode + "</option>";
                }
                else {
                    r = "<option value=" + objPlantCodes.PlantID + ">" + objPlantCodes.PlantCode + "</option>";
                }
                ctrl.append(r);
            });
        }
    });
}


function LoadDDLBayNO(iSel) {
    $.ajax({
        url: "/LPProductsMaster/GetBayNO",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlBayNo').html('');
            var r = "Select BayNO";
            $('#ddlBayNo').append(r);

            $.each(result, function (i, objBayNo) {
                if (parseInt(iSel) == parseInt(objBayNo.BayNo)) {
                    r = "<option selected value=" + objBayNo.BayID + ">" + objBayNo.BayNo + "</option>";
                }
                else {
                    r = "<option value=" + objBayNo.BayID + ">" + objBayNo.BayNo + "</option>";

                }
                $('#ddlBayNo').append(r);
            });
        }
    });
}

function LoadDDLCardStatusMaster(iSel) {
    $.ajax({
        url: "/CardStatusMaster/GetCardStatusMasterList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlCardReader').html('');
            //var r = "Select Card Status";
            var r = "<option value=0 selected>Select Card Status</option>";
            $('#ddlCardReader').append(r);
            $.each(result, function (i, objCardStatusMaster) {
                if (parseInt(iSel) == parseInt(objCardStatusMaster.Status)) {
                    r = "<option selected value=" + objCardStatusMaster.Status + ">" + objCardStatusMaster.StatusDesc + "</option>";
                }
                else {

                    r = "<option value=" + objCardStatusMaster.Status + ">" + objCardStatusMaster.StatusDesc + "</option>";
                }
                $('#ddlCardReader').append(r);
            });
        }
    });
}


function LoadDDLCardPrivilage(iSel) {

    $.ajax({
        url: "/CardPrivilegeMaster/GetCardPrivilageList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlCardPrivilage').html('');
            //var r = "Select Card Privilage";
            var r = "<option value=0 selected>Select Card Priviledge</option>";
            $('#ddlCardPrivilage').append(r);
            $.each(result, function (i, objCardPrivilage) {
                if (parseInt(iSel) == parseInt(objCardPrivilage.PrivilegeID)) {
                    r = "<option selected value=" + objCardPrivilage.PrivilegeID + ">" + objCardPrivilage.PrivilegeDesc + "</option>";
                }
                else {
                    r = "<option value=" + objCardPrivilage.PrivilegeID + ">" + objCardPrivilage.PrivilegeDesc + "</option>";
                }
                $('#ddlCardPrivilage').append(r);
            });
        }
    });
}

function LoadDDLLocation(iSel) {
    $.ajax({
        url: "/Location/GetLocationByID",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlLocation').html('');
            var r = "Select Location";
            $('#ddlLocation').append(r);

            $.each(result, function (i, objLocation) {
                if (parseInt(iSel) == parseInt(objLocation.LocationDesc)) {
                    r = "<option selected value=" + objLocation.LocationId + ">" + objLocation.LocationDesc + "</option>";
                }
                else {
                    r = "<option value=" + objLocation.LocationId + ">" + objLocation.LocationDesc + "</option>";

                }
                $('#ddlLocation').append(r);
            });
        }
    });
}

function LoadDDLTankType(iSel) {
    $.ajax({
        url: "/Tanks/GetTankTypes",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTankType').html('');
            var r = "<option selected value=0>Select Tank Type</option>";
            $('#ddlTankType').append(r);

            $.each(result, function (i, objTankType) {
                if (parseInt(iSel) == parseInt(objTankType.TYPE_ID)) {
                    r = "<option selected value=" + objTankType.TYPE_ID + ">" + objTankType.TYPE + "</option>";
                }
                else {
                    r = "<option value=" + objTankType.TYPE_ID + ">" + objTankType.TYPE + "</option>";

                }
                $('#ddlTankType').append(r);
            });
        }
    });
}

function LoadDDLTankStatus(iSel) {
    $.ajax({
        url: "/TankStatus/GetTankStatus",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTankStatus').html('');
            var r = "Select Tank Status";
            $('#ddlTankStatus').append(r);

            $.each(result, function (i, objTankStatus) {
                if (parseInt(iSel) == parseInt(objTankStatus.StatusDesc)) {
                    r = "<option selected value=" + objTankStatus.Status + ">" + objTankStatus.StatusDesc + "</option>";
                }
                else {
                    r = "<option value=" + objTankStatus.Status + ">" + objTankStatus.StatusDesc + "</option>";

                }
                $('#ddlTankStatus').append(r);
            });
        }
    });
}

function LoadDDLTanksMode(iSel) {
    $.ajax({
        url: "/Tanks/GetTanksMode",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTankMode').html('');
            var r = "<option selected value=0>Select Mode</option>";
            $('#ddlTankMode').append(r);
            $.each(result, function (i, objTankMode) {
                if (parseInt(iSel) == parseInt(objTankMode.ModeId)) {
                    r = "<option selected value=" + objTankMode.ModeId + ">" + objTankMode.ModeDesc + "</option>";
                }
                else {
                    r = "<option value=" + objTankMode.ModeId + ">" + objTankMode.ModeDesc + "</option>";
                }
                $('#ddlTankMode').append(r);
            });
        }
    });
}

function LoadDDLDestination(iSel) {
    $.ajax({
        url: "/Destination/GetDestinations",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlDestination').html('');
            var r = "Select Destination";
            $('#ddlDestination').append(r);

            $.each(result, function (i, objDestination) {
                if (parseInt(iSel) == parseInt(objDestination.DestinationDesc)) {
                    r = "<option selected value=" + objDestination.DestinationID + ">" + objDestination.DestinationDesc + "</option>";
                }
                else {
                    r = "<option value=" + objDestination.DestinationID + ">" + objDestination.DestinationDesc + "</option>";

                }
                $('#ddlDestination').append(r);
            });
        }
    });
}

function LoadDDLLoadingType(iSel) {

    $('#ddlLoadingType').html('');
    var r = "<option value=0>Select Loading Type</option>";
    $('#ddlLoadingType').append(r);

    if (iSel == '1') {
        r = "<option selected value=1>Top</option>";
    }
    else {
        r = "<option value=1>Top</option>";
    }
    $('#ddlLoadingType').append(r);
    if (iSel == '2') {
        r = "<option selected value=2>Bottom</option>";
    }
    else {
        r = "<option value=2>Bottom</option>";
    }
    $('#ddlLoadingType').append(r);
}

function LoadDDLReasonForManualEntry(Id, iSel) {

    $.ajax({
        url: "/LoadSummary/MaunalEntryReasons?Id=" + Id,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlManualEntry').html('');
            var r = "<option value=0 selected>Select Reason</option>";
            $('#ddlManualEntry').append(r);
            $.each(result, function (i, objCancelTruck) {
                if (parseInt(iSel) == parseInt(objCancelTruck.UniqueID)) {
                    r = "<option selected value=" + objCancelTruck.UniqueID + ">" + objCancelTruck.CancelReason + "</option>";
                }
                else {
                    r = "<option value=" + objCancelTruck.UniqueID + ">" + objCancelTruck.CancelReason + "</option>";
                }
                $('#ddlManualEntry').append(r);
            });
        }
    });
}

function LoadDDLDesignation(ctrl, iSel) {

    $.ajax({
        url: "/Users/GetUserRoles",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {

            $(ctrl).html('');
            var r = "Select Designation";
            $(ctrl).append(r);
            $.each(result, function (i, obj) {
                if (parseInt(iSel) == parseInt(obj.Id)) {
                    r = "<option selected value=" + obj.Id + ">" + obj.Designation + "</option>";
                }
                else {
                    r = "<option value=" + obj.Id + ">" + obj.Designation + "</option>";
                }
                $(ctrl).append(r);
            });
        }
    });
}

function LoadDDLDuration(ctrl, iSel) {
    $.ajax({
        url: "/TagTrends/GetDurationList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $(ctrl).html('');
            var r = "Select Duration";
            $(ctrl).append(r);
            $.each(result, function (i, obj) {
                if (parseInt(iSel) == parseInt(obj.DurationID)) {
                    r = "<option selected value=" + obj.DurationID + ">" + obj.DurationName + "</option>";
                }
                else {
                    r = "<option value=" + obj.DurationID + ">" + obj.DurationName + "</option>";
                }
                $(ctrl).append(r);
            });
        }
    });
}

// Generic Code for AutoComplete 
function AutoComplete(ctrl, strOptions, strPage) {
    $(ctrl).autocomplete({
        source: function (request, response) {

            var strURL = "../TruckMasters/TruckNumbers_Autocomplete"
            var arrData = { "term": request.term };

            if (strOptions == "TruckNumber" && strPage == "ManualLoad") {
                strURL = "../TruckMasters/TruckNumbers_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "TruckNumber" && strPage == "TTQueue") {
                strURL = "../TruckMasters/TruckNumbers_TTQueue_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "Cards") {
                strURL = "../Cards/CardNumbers_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "Customers") {
                strURL = "../Customer/Customers_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "Destination") {
                strURL = "../Destination/Destination_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "Transporter") {
                strURL = "../Transporter/Transporter_Autocomplete"
                arrData = { "term": request.term };
            }
            else if (strOptions == "RFID") {
                strURL = "../RFID/RFID_Autocomplete"
            }
            else if (strOptions == "TTDriver") {
                strURL = "../ACSUsers/ACSUser_Autocomplete"
            }
            else if (strOptions == "TruckNumber" && strPage == "ACSUsers") {
                strURL = "../TruckMasters/TruckNumbers_ACSUsers_Autocomplete"
            }
            arrData = { "term": request.term };

            $.ajax({
                async: true,
                cache: true,
                type: "GET",
                url: strURL,
                data: arrData,
                dataFilter: function (data) { return data; },
                success: function (data) {
                    if (data.length > 0) {
                        response($.map(data, function (data) {
                            return {
                                id: data.Id,
                                value: data.strValue,
                            }
                        }));
                    }
                    else {
                        response([{ label: 'No results found.', val: 0, id: 0 }]);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        minLength: 2,
        open: function () {
            $(this).removeClass('ui-corner-all').addClass('ui-corner-top');
        },
        close: function () {
            $(this).removeClass('ui-corner-top').addClass('ui-corner-all');
        },
        select: function (event, ui) {
            if (ui.item.id != '0' && ui.item.id != 'undefined') {
                $(ctrl).attr('data-key-value', ui.item.id);
                $(ctrl).text(ui.item.value);
                $(ctrl).val(ui.item.value);

                if (strOptions == "TruckNumber" && (strPage == "ManualLoad" || strPage == "TTQueue")) {
                    ValidateTruck(ui.item.id); // Don't Need to Validate
                }
                if (strOptions == "Customers" && strPage == "ManualLoad") {
                    FillCustomerBelow($(ctrl).attr('id'), ui.item.id, ui.item.value);
                }
                if (strOptions == "Destination" && strPage == "ManualLoad") {
                    FillDestinationBelow($(ctrl).attr('id'), ui.item.id, ui.item.value);
                }
            }
            else {
                $(ctrl).attr('data-key-value', '0');
                $(ctrl).text('');
                $(ctrl).val('');
                return false;
            }

        },
        change: function (event, ui) {
            $(ctrl).attr('data-key-value', ui.item ? ui.item.id : 0);
        },
        // focus: function (event, ui) {
        //     $(ctrl).value = ui.item.label;
        //     // or $('#autocomplete-input').val(ui.item.label);
        //     event.preventDefault(); // or return false;
        //}
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        if (item.id != '0' && item.id != 'undefined') {
            return jQuery("<li class='autocomplete-li'></li>")
                .data("item.autocomplete", item)
                .append("<div class='no-result'>" + item.value + "</div><br>")
                .appendTo(ul);
        }
        else {
            return jQuery("<li></li>")
                .data("item.autocomplete", item)
                .append("<div class='no-result'>No results found.</div><br>")
                .appendTo(ul);
        }
    };
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isDecimalKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode != 46 && charCode != 190 && charCode != 110 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}

function LogActivityInDB(EventID, EventLogDesc, LoadID) {
    var objLogActivity = {
        'EventID': EventID,
        'EventLogDesc': EventLogDesc,
        'LoadID': LoadID
    };
    $.ajax({
        url: "/Home/ActivityLog",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLogActivity),
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                //alertDismissable("success", " saved successfully.");
            }
        }
    });
}

function LoadUserProfile() {
    $('#Logout').unbind('click');
    $('#Logout').on('click', function () {
        $('#UserDetail').slideToggle(350);
    });

    $('#UserDetail .setting-icon').on('click', function () {
        $('#UserDetail').slideUp(350);
    });

    $(document).on('click', function (event) {

        if ($(event.target).closest('#Logout, #UserDetail').length == 0) {
            $('#UserDetail').is(':visible') ? $('#UserDetail').slideUp(350) : '';
        }

        //Toggling wrapper menu for mobile clicking on document
        if ($(event.target).closest('#sideNav, .hamburger').length == 0) {
            if ($('#wrapper').hasClass('toggle')) {
                $('#wrapper').removeClass('toggle');
                $('.hamburger #nav-toggle').removeClass('active');
            }
        }

    });
}


//Menu Toggle Mobile    
$(document).delegate(".menu-item", "click touchend", function () {
    if ($('.menu-item').length > 0) {
        $(".menu-item").removeClass('active');
        $('.menu-item .fa').removeClass('fa-minus-circle');
        $(this).addClass('active');
        $(this).children('.fa').addClass('fa-minus-circle');
        $(".menu-item").next().slideUp("fast");
        if ($(this).next().is(":hidden")) {
            $(this).next().slideDown("fast");
        } else {
            $(this).next().slideUp("fast");
            $(".menu-item").removeClass('active');
            $('.menu-item .fa').removeClass('fa-minus-circle');
        }

        return false;
    }
});

$(document).on("load", function () {
    var innerHgt = $(window).innerHeight();
    $('.left-nav-reports').css('border', "1px solid #000");
}, $('.left-nav-reports'));


function ShowOPCTagsinView(model, grpName) {
    //console.log(model);
    //if (grpName.toUpperCase() != opcPageName.toUpperCase() && grpName.toUpperCase() != opcPageName1.toUpperCase() && opcPageName.toUpperCase() != "ALL") {
    //    console.log("Returning due to Incorrect pagename.")
    //    return;
    //}
    // ControlType 1 - String to TextBox/Div/Span
    // ControlType 2 - Update Class
    // ControlType 3 - div height from css
    // ControlType 4 - Select / Dropdown
    // ControlType 5 - Radio / option
    // ControlType 6 - JQ DataTable
    // ControlType 7 - JQX Grid
    // ControlType 8 - HTML
    $.each(model, function (i, item) {
        var controlName = item.ControlName.toUpperCase();
        if (opcPageName1 == 'ALL_PAGES') { item.ControlType = 7; item.ClassName = "Value"; }
        var clsName = item.ClassName.toLowerCase();
        if ($('.' + controlName).length > 0) {
            $('.' + controlName).attr('data-opcvalue', item.Value);
        }
        //if (item.Value == null && item.Quality >= 192) { return true; }
        //console.log('Item: ' + controlName + '  Type: ' + item.ControlType + '  Value: ' + item.Value + '  Quality: ' + item.Quality);
        if (item.ControlType == 1) {
            if (item.Value == null) { var val = ""; } else { val = item.Value; }
            if (item.Quality >= 192 && item.Value != null) {
                $('.' + controlName).text(item.Value);
                $('.' + controlName).val(item.Value);
                $('.' + controlName).removeClass('blink_text');
            }
            else if (item.Quality <= 50) {
                $('.' + controlName).text(val + "?");
                $('.' + controlName).val(val + "?");
                $('.' + controlName).addClass('blink_text');
            }
            else if (item.Quality <= 100) {
                $('.' + controlName).text(val + "?");
                $('.' + controlName).val(val + "?");
                $('.' + controlName).addClass('blink_text');
            }
            else if (item.Quality <= 150) {
                $('.' + controlName).text(val + "?");
                $('.' + controlName).val(val + "?");
                $('.' + controlName).addClass('blink_text');
            }
            else {
                $('.' + controlName).text(val + "?");
                $('.' + controlName).val(val + "?");
                $('.' + controlName).addClass('blink_text');
            }
        }
        else if (item.ControlType == 2) {
            var true_class;
            $('.' + controlName).each(function (i, ctrl) {
                var classes = $(this).attr("class");
                var cl = [];
                if (classes != null && classes != 'undefined' && classes.length > 0) {
                    cl = classes.split(" ");
                    for (var i = 0; i < cl.length; i++) {
                        if (cl[i].indexOf(clsName.toLowerCase()) >= 0) {
                            $(this).removeClass(cl[i]);
                        }
                    }
                }
            });
            var clsNm = '';
            if (item.Quality >= 192 && item.Value != null) {
                clsNm = (clsName + '_' + item.Value).toLowerCase();
            }
            else {
                clsNm = ((clsName + '_bad').toLowerCase());
            }
            $('.' + controlName).addClass(clsNm);
            var tip = $('[data-tooltip-attr].' + controlName + '.tooltipstered');
            if (tip != undefined && tip.length > 0) {
                var Prefix = $(tip).attr('data-tooltip-attr').toLowerCase();
                if (Prefix.indexOf('*') > 0 && (item.Value == null || item.Value.toLowerCase() != 'true')) {
                    var classlst = $(tip)[0].classList; var done = false;
                    for (var i = 0; i < classlst.length; i++) {
                        if (classlst[i].indexOf('_true') >= 0) {
                            $(tip).tooltipster('content', tooltipArr[0][Prefix + '.' + classlst[i]]);
                            done = true;
                            break;
                        }
                        else if (classlst[i].indexOf('_false') >= 0) {
                            if (tooltipArr[0][Prefix + '.' + classlst[i]] != undefined) {
                                $(tip).tooltipster('content', tooltipArr[0][Prefix + '.' + classlst[i]]);
                                done = true;
                            }
                        }
                    }
                    if (done == false) {
                        $(tip).tooltipster('content', tooltipArr[0][Prefix + '.default']);
                    }
                }
                else {
                    $(tip).tooltipster('content', tooltipArr[0][Prefix + '.' + clsNm]);
                }
            }
            //var xref = $('.' + controlName + ' use');
            //if (xref != undefined && xref.length > 0)
            //{
            //    var clsN = clsNm;
            //    var pref = $(this).attr('grp-name');
            //    if (pref != undefined || pref != null) {
            //        clsN = pref.toLowerCase() + "_" + clsN;
            //    }
            //    xref.attr("xlink:href", clsN);
            //}
        }
        else if (item.ControlType == 3) {
            $('.' + controlName).css('height', item.Value + '%');
        }
        else if (item.ControlType == 4) {
            $('.' + controlName).val(item.Value);
            //UpdateDDLTextValue(controlName, item.Value);
            UpdateDDLTextVal(item);
            $('.' + controlName).trigger('change');
        }
        else if (item.ControlType == 5) // for radio and checkbox 
        {
            if (item.Quality < 192) { $('.' + controlName + '.' + item.ClassName).bootstrapToggle('disable'); }
            else { $('.' + controlName + '.' + item.ClassName).bootstrapToggle('enable'); }

            if (item.Value != null && item.Value.toLowerCase() == "true") {
                $('.' + controlName).prop('checked', true);
                $('.' + controlName + '.' + item.ClassName).bootstrapToggle('on');
            }
            else if (item.Value != null && item.Value.toLowerCase() == "false") {
                $('.' + controlName).removeAttr('checked');
                $('.' + controlName + '.' + item.ClassName).bootstrapToggle('off');
            }
            else {
                //$('.' + controlName).removeAttr('checked');
                $('.' + controlName + '.' + item.ClassName).hide();
            }

        }
        else if (item.ControlType == 6) { // For DataTable. On the page: var tblObj; TagColName = 3; tblObj = $('#tblTagList').DataTable({
            tblObj.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var dat = this.data();
                if (this.data()[TagColName] == item.ControlName.toUpperCase()) {
                    dat[TagColName + 1] = item.Value;
                    this.data(dat);
                    return;
                }
            });
        }
        else if (item.ControlType == 7) { // For JQX Grid
            JQXTableUpdate(item);
            //if ($('.jqx-tbl-container')==undefined) { return; }
            //if (item.Quality < 192) { if (opcPageName1 == 'ALL_PAGES') { return; } else { item.Value = item.Value + "?"; } }
            //var index = JQXTagNames.findIndex(x => x.indexOf(controlName.toUpperCase()) >= 0);
            //if (index >= 0) {
            //    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', index);
            //    if (item.Value == null) { item.Value = ""; }
            //    if (selectedRowData != undefined && selectedRowData[item.ClassName] != item.Value) {
            //        //$('#jqxgrid').jqxGrid('updaterow', index, selectedRowData);
            //        if (item.DataType.toLowerCase() == "bool") { item.Value = item.Value.toLowerCase(); }
            //        $("#jqxgrid").jqxGrid('setcellvalue', index, item.ClassName, item.Value);
            //    }
            //    return;
            //}
        }
        else if (item.ControlType == 8) { // For HTML
            $('.' + controlName).html(item.Value);
        }
        else {
            if (item.Quality >= 192 && item.Value != null) {
                $('.' + controlName).text(item.Value);
            }
            else {
                $('.' + controlName).text("?");
            }
        }
        //}
    });
    //console.log("Calling ExtraActivities");  If there are multiple scripts, the last extra activitites will get activated.
    ExtraActivities(model);
}

function ShowAlertMsg(result) {
    alertDismissable(result.strType, result.strMessage);
}

function SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc) {
    CurrVal = $(src).attr('data-opcvalue');
    if (typeof src === 'boolean') { CurrVal = src; }
    opc.server.sendDataToOPC(TagToWrite, CurrVal, opcPageName, CurrUserID, LoginID, UserName, currValDesc, true, false);
    UpdateActivityTime();
}

function createTooltip() {
    $('.tooltips').tooltipster({
        animation: 'fade',
        delay: 200,
        theme: 'tooltipster-default',
        touchDevices: false,
        trigger: 'hover'
    });
}

function removeClasses(control, classPrefix) {
    var classes = $(control).attr("class").split(" ");
    $.each(classes, function (index) {
        if (classes[index].indexOf(classPrefix) == 0) {
            $(control).removeClass(classes[index]);
        }
    });
}

function CallJSFunction(funcName, param1, param2, param3, param4, param5) {
    switch (funcName) {
        case "TTQ_Refresh":
            refreshTTQ();
        case "TTQ_Data":
            UpdateTTQData(param1, param2, param3);
        case "LRC_Changed":
            LRC_Changed(param1);
        case "ShowPopup":
            alertDismissable("danger", param1);
            opc.client.showPopup(param1, "");
            break;
        case "PopupRedirectClick":
            PopupRedirectClick(param1, param2, param3, param4, param5);
            break;
        default:
            window[funcName](param1, param2, param3, param4, param5);
            break;
    }
}

function CallobjJSFunction(RemScrObj) {
    switch (RemScrObj.FuncName) {
        case "PopupRedirectClick":
            PopupRedirectClick(RemScrObj);
            break;
        default:
            window[RemScrObj.FuncName](RemScrObj);
    }
    if (UsrPopUpThreshold > RemScrObj.Severity) { return; }
    setTimeout(function () { PlaySound(RemScrObj.SoundName, RemScrObj.SoundDurationMS) }, 0);
}

function ShowPopup(RemScrObj) {
    if (UsrPopUpThreshold > RemScrObj.Severity) { return; }
    alertDismissable("danger", RemScrObj.Message);
    //$('.ESDModal').hide();
    $('.OPCModal').show();
    $.showModal({ title: 'Alert!  <span class="pull-right">' + RemScrObj.EvntDateTime + '</span>', body: RemScrObj.Message, footer: '<button type="button" data-dismiss="modal" class="btn btn-primary" id="btnConfirmESD">Ok</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="btnConfirmCancel">Cancel</button>' })

    //$('.OPCModal #opcMsgModalMsg').html(RemScrObj.Message);
    //$('#opcMsgModal').modal('show');
    //$('#btnConfirmESD').text("OK");
    $('#btnConfirmESD').unbind('click');
    $('#btnConfirmESD').bind('click', function () {
        //StopSound(RemScrObj.SoundName);
        $(".modal-backdrop").slideUp('slow');
        //$('#opcMsgModal').modal('hide');
    });
}

function OpenBQDMenu(endIndex) {
    var msg = $('.empty-msg').html();
    $.ajax({
        type: "GET",
        url: "/BQD/GetBQD_TV?eIndex=" + endIndex,
        cache: false,
        global: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                var vduParams = result[1].objVDUParams;
                if (vduParams.BQDisplayMode === 0 || (vduParams.BQDisplayMode === 1 && result[1].lstTTQueue.length === 0)) {
                    if ((vduParams.BQDisplayMode === 0 && msg == vduParams.BQDOffMessage) || msg == vduParams.EmptyTTQueueMessage) {
                        //Do Nothing
                    }
                    else {
                        $("#dvContent").html(result[0]);
                    }
                }
                else {
                    $("#dvContent").html(result[0]);
                }
            }
        }
    });
}

function OpenBaysMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/BaysMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenMetersMasterMenu() {
    $.ajax({
        type: "GET",
        url: "/MetersMaster/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenPiggingView(TankID) {
    $.ajax({
        type: "GET",
        url: "/Pigging/Index?TankID=" + TankID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenDSMenu() {
    $.ajax({
        type: "GET",
        url: "/DataSource/Index",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenAOPView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/AOPView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenRadarRelays() {
    $.ajax({
        type: "GET",
        url: "/PlantView/RadarRelaysView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenPressureTransmitters() {
    $.ajax({
        type: "GET",
        url: "/PlantView/PressureTransmittersView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenPTTableView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/PTTableView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenDPTTableView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DPTTableView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenPipelineMFMView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/PipelineMFMView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenHeaderDevicesView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/HeaderDevicesView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenHCDView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/HCDView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenTcvTempTableView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/TcvTempTableView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenTempTxrView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/TempTransmittersView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenRochesterGaugeView() {
    $.ajax({
        type: "GET",
        url: "/PlantView/RochesterGaugeView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenDeviceDetailView(strTypes, grp) {
    if (grp == undefined) { grp = false; }
    $.ajax({
        type: "GET",
        url: "/PlantView/DeviceDetailView?TypeIDs=" + strTypes + "&Group=" + grp,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenDeviceTableView(strTypes, iRows) {
    $.ajax({
        type: "GET",
        url: "/PlantView/DeviceTableView?TypeIDs=" + strTypes + "&iRows=" + iRows,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenDensitometers() {
    $.ajax({
        type: "GET",
        url: "/PlantView/DensitometersView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });

}

function OpenBaseDensTemp() {
    $.ajax({
        type: "GET",
        url: "/BaselineDensTemp/Index",
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function OpenAllTagsMenu() {
    $.ajax({
        type: "GET",
        url: "/PlantView/AllTagsDataView",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function InitConn(pagename, delay) {
    if (opcStartDone == true) {
        opc.server.getPageData(pagename, delay);
    }
    else {
        console.log(showTime() + ': opc StartDone == false : iter 1');
        return jsSleep(500).then(() => {
            if (opcStartDone != true) {
                console.log(showTime() + ': opc StartDone == false : iter 2');
                return jsSleep(1000).then(() => {
                    if (opcStartDone != true) {
                        return jsSleep(1500).then(() => {
                            if (opcStartDone != true) {
                                console.log(showTime() + ': opc StartDone == false : iter 3');
                                return;
                            } else { console.log(showTime() + ': opc StartDone iter 3. Getting Page Data.'); opc.server.getPageData(pagename, delay); return; }
                        });
                    } else { console.log(showTime() + ': opc StartDone iter 2. Getting Page Data.'); opc.server.getPageData(pagename, delay); return; }
                });
            } else { console.log(showTime() + ': opc StartDone iter 1. Getting Page Data.'); opc.server.getPageData(pagename, delay); return; }
        });
    }
}

function DeInitConn() {
    if (opcStartDone == true) {
        clearTimeout(gblTimeout);
        opc.server.removeFromGroup(opcPageName);
        opc.server.removeFromGroup(opcPageName1);
        opcPageName = ""; opcPageName1 = "";
    }
}

function toggleChange(src, TagToWrite, UserID, LoginID, UserName) {
    var actualSrc = $(src).children().find('input');
    SendDataToOPC(actualSrc, TagToWrite, UserID, LoginID, UserName, "");
}

function UpdatePumpSetPoint(TagName, UserID, LoginID, UserName) {

    var prev = 0;
    if ($('.' + TagName) != undefined && $('.' + TagName).attr('data-opcvalue') != undefined && $('.' + TagName).attr('data-opcvalue') != '?') {
        prev = $('.editable-input.' + TagName).attr('data-opcvalue');
    }
    var NewVal = $('.editable-input.' + TagName).val();
    if (prev == NewVal) { alertDismissable('info', 'Previous and current values are the same'); return; }

    var activityDetail = "Tag:'" + TagName + "'; Existing Value:" + prev + " New Value :" + NewVal;
    var activityName = "Update Pump Set Point";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }, activityName, activityDetail);
            }
        }
    });
}

function UpdateVFDSetPoint(TagName, UserID, LoginID, UserName) {

    var prev = 0;
    if ($('.' + TagName) != undefined && $('.' + TagName).attr('data-opcvalue') != undefined && $('.' + TagName).attr('data-opcvalue') != '?') {
        prev = $('.editable-input.' + TagName).attr('data-opcvalue');
    }
    var NewVal = $('.editable-input.' + TagName).val();
    if (prev == NewVal) { alertDismissable('info', 'Previous and current values are the same'); return; }

    var activityDetail = "Tag:'" + TagName + "'; Existing Value:" + prev + " New Value :" + NewVal;
    var activityName = "Update VFD Set Point";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }, activityName, activityDetail);
            }
        }
    });
}

function UpdatePumpPriority(TagName, UserID, LoginID, UserName) {
    var prev = 0;
    if ($('.' + TagName) != undefined && $('.' + TagName).attr('data-opcvalue') != undefined && $('.' + TagName).attr('data-opcvalue') != '?') {
        prev = $('.editable-input.' + TagName).attr('data-opcvalue');
    }
    var NewVal = $('.editable-input.' + TagName).val();
    if (prev == NewVal) { alertDismissable('info', 'Previous and current values are the same'); }
    var activityDetail = "Tag:'" + TagName + "'; Existing Value:" + prev + "; New Value :" + NewVal;
    var activityName = "Update Pump Priority";

    $.ajax({

        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }, activityName, activityDetail);
            }
        }
    });
}

function UpdatePumpPriorityDDL(TagName, grp, CtrlName, UserID, LoginID, UserName) {
    var prevValue = $('.' + TagName).attr('data-opcvalue');
    var NewVal = $('#' + CtrlName + ' option:selected').val();

    if (NewVal == -1) { alertDismissable('info', 'Please select Priority'); return; }
    if (prevValue == NewVal) { alertDismissable('info', 'Previous and current values are the same'); return; }
    var sameGrpPrtytags = $('#SameGrpPumpsPrtyTags');
    if (sameGrpPrtytags != undefined && sameGrpPrtytags.length > 0) {
        sameGrpPrtytags = sameGrpPrtytags.val().split(',');
    }
    else { return; }

    if (sameGrpPrtytags.length < 1) { return; }
    var NotinSamePrty = true;
    $.each(sameGrpPrtytags, function (i, item) {
        var OthPumpPrty = $('.' + item).attr('data-opcvalue');
        if (OthPumpPrty != NewVal) { NotinSamePrty = (NotinSamePrty & true); }
        else { NotinSamePrty = false; }
    });
    if (NotinSamePrty == false) {
        alertDismissable("danger", "Another Device of same Grp is already in '" + $('#' + CtrlName + ' option:selected').text() + "'");
        return;
    }

    var activityDetail = "Tag:'" + TagName + "'; Existing Value:" + prevValue + "; New Value :" + NewVal;
    var activityName = "Update Pump Priority";

    $.ajax({

        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                opc.server.sendDataToOPC(TagName, prevValue, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                PumpPriorityExtraWorks(TagName, existingValue, opcPageName, UserID, NewVal);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () {
                    opc.server.sendDataToOPC(TagName, prevValue, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                    PumpPriorityExtraWorks(TagName, prevValue, opcPageName, UserID, NewVal);
                }, activityName, activityDetail);
            }
        }
    });
}

function PumpPriorityExtraWorks(TagName, existingValue, opcPageName, UserID, NewVal) {
    if (ProjNo == '0419') {
        //alertDismissable('success', 'Setting Confirm Tag...');
        opc.server.sendDataToOPC(TagName.replace('_DDL', '') + '_CONFIRM', 'false', opcPageName, UserID, "", "", NewVal, false, false);
        //setTimeout(function () { opc.server.sendDataToOPC(TagName.replace('_DDL', '') + '_CONFIRM', 'false', opcPageName, UserID, "", "", NewVal, false, false); }, 1000);
    }
}

function OpenPumpAutoManModal(PumpDetails, ClassName, TagName, locremClass, UserID, LoginID, UserName) {

    var local = false; var Auto = true;
    var temp = $('.' + locremClass).attr('data-opcvalue');
    if (temp != undefined && temp != null) { local = temp; }
    var temp = ($('.' + TagName).attr('data-opcvalue'));
    if (temp != undefined && temp != null) { Auto = temp; }
    else { alertDismissable('danger', 'No Connection'); return; }
    if (local == 'True' && Auto == 'False') { alertDismissable('danger', 'Pump must be in Remote mode to set in Auto Mode.'); return; }

    $.each($("#AutoManModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName + "_");
        removeClasses(ele, "pump_automan");
    });
    $("#AutoManModal ." + ClassName).addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#AutoManModal #AutoManLabel').html(PumpDetails + ' - Change Control');
    $('#AutoManModal').modal('show');
    $('#AutoManModal').draggable({ handle: ".modal-header" });
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change Auto/Manual Mode Pump";
        var activityDetail = "Pump: " + PumpDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(PumpDetails + ' - Change Control', function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function OpenPumpLocRemModal(PumpDetails, ClassName, TagName, UserID, LoginID, UserName) {
    var CurrVal = $('.' + TagName).attr('data-opcvalue');
    if (CurrVal == undefined) { alertDismissable('danger', 'No Connection'); return; }
    // Temporary Disable
    return;
    $.each($("#LOCREMModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName + "_");
        removeClasses(ele, "pump_automan");
    });
    $("#LOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#LOCREMModal #LocRemLabel').html(PumpDetails + ' - Change Mode');
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable({ handle: ".modal-header" });
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change Local /Remote Mode Pump";
        var activityDetail = "Pump: " + PumpDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(PumpDetails + ' - Change Mode', function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function OpenValveAutoManModal(src, hdnTankId, MovDetails, FindClassName, TagName, UserID, LoginID, UserName, activityName) {

    if (activityName == undefined || activityName == '') { activityName = "Change Auto/Manual Mode DBBV"; }
    var local = false; var Auto = true; var LocTag = TagName.replace("AUTOMAN", "LOCREM");
    var temp = $('.' + LocTag).attr('data-opcvalue');
    if (temp != undefined && temp != null) {
        var SepLocalTag = $('.locrem_local_true.' + LocTag);
        if (SepLocalTag != undefined && SepLocalTag != null && SepLocalTag.length > 0) { local = true; }
        else {
            SepLocalTag = $('.locrem_true.' + LocTag);
            if (SepLocalTag != undefined && SepLocalTag != null && SepLocalTag.length > 0) { local = true; }
        }
    }
    var temp = ($('.' + TagName).attr('data-opcvalue'));
    if (temp != undefined && temp != null) { Auto = temp; }
    else { alertDismissable('danger', 'No Connection'); return; }
    if (local == true && Auto == 'False') { alertDismissable('danger', 'Valve must be in Remote mode to set in Auto Mode.'); return; }

    if (hdnTankId != '' && $('#' + hdnTankId).attr('data-opcvalue') != undefined) {
        if ($('#' + hdnTankId).attr('data-opcvalue').toUpperCase() == "TRUE"
            && $(src).attr('data-opcvalue').toUpperCase() == "TRUE") {
            alertDismissable('danger', 'Tank is in AUTO mode. Change Tank control to Manual first.');
            return;
        }
    }

    $.each($("#ValveAutoManModal ." + FindClassName), function (index, ele) {
        removeClasses(ele, "AUTOMAN_MOV_");
        removeClasses(ele, "automan_mov");
    });
    $("#ValveAutoManModal ." + FindClassName).addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 0);
    $('#ValveAutoManModal #AutoManLabel').html(MovDetails + ' - Change Control');
    $('#ValveAutoManModal').modal('show');
    $('#ValveAutoManModal').draggable({ handle: ".modal-header" });
    $("#ValveAutoManModal #btnAutoManOK").unbind('click');
    $("#ValveAutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        var activityDetail = "DBBV: " + MovDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#ValveAutoManModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#ValveAutoManModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
    $("#ValveAutoManModal").unbind('hidden.bs.modal');
    $('#ValveAutoManModal').on('hidden.bs.modal', function () {
        $.each($("#ValveAutoManModal ." + TagName), function (index, ele) {
            removeClasses(ele, TagName);
        });
    });
}

function OpenGenericAutoManModal(activityName, ActDet, ControlName, locremClass, FindClassName, PgName, UserID, LoginID, UserName) {

    var local = false; var Auto = true;
    //var temp = $('.' + ControlName.replace("AUTOMAN", "LOCREM")).attr('data-opcvalue');
    var temp = $('.' + locremClass).attr('data-opcvalue');
    if (temp != undefined && temp != null) { local = temp; }
    var temp = ($('.' + ControlName).attr('data-opcvalue'));
    if (temp != undefined && temp != null) { Auto = temp; }
    else { alertDismissable('danger', 'No Connection'); return; }
    if (local == 'True' && Auto == 'False') { alertDismissable('danger', 'Device must be in Remote mode to set in Auto Mode.'); } //return;

    $("#GenericAutoManModal ." + FindClassName).addClass(ControlName);
    $('#hdnAutoMan').removeClass().addClass(ControlName);
    if (PgName == null || PgName == undefined || PgName == '') { PgName = opcPageName; }
    opc.server.getPageData(PgName, 0);
    $('#GenericAutoManModal #AutoManLabel').html(ActDet + ' - Change Control');
    $('#GenericAutoManModal').modal('show');
    $('#GenericAutoManModal').draggable({ handle: ".modal-header" });
    $("#GenericAutoManModal #btnAutoManOK").unbind('click');
    $("#GenericAutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        SendDataToOPC($('#hdnAutoMan'), ControlName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), ControlName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }, activityName, ActDet);
                }
            }
        });
    });
    $("#GenericAutoManModal").unbind('hidden.bs.modal');
    $('#GenericAutoManModal').on('hidden.bs.modal', function () {
        $.each($("#GenericAutoManModal ." + ControlName), function (index, ele) {
            removeClasses(ele, ControlName);
        });
    });
}

function OpenPumpModal(PumpId, PumpPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetPumpDetailsView?PumpId=" + PumpId,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(PumpPageName, 0);
            $('#myPUMPModal').modal('show');
            PumpExistingService = $('#ddlService option:selected').text();
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    if ((opcPageName.indexOf(PumpPageName) == -1) || (!opcPageName.endsWith(PumpPageName, opcPageName.length))) {
        opcPageName = opcPageName + "," + PumpPageName;
    }
    //opcPageName = opcPageName + "," + PumpPageName;
}

function OpenCustomDeviceModal(DevName, TagPrefix, ModalPath, DevPageName, DevDesc) {
    var myData = {};
    if (!DevPageName) { DevPageName = ''; }
    if (!DevDesc) { DevDesc = ''; }
    myData['Name'] = DevName;
    myData['TagPrefix'] = TagPrefix;
    myData['ModalPath'] = ModalPath;
    myData['DevPageName'] = DevPageName;
    myData['DevDesc'] = DevDesc;
    $.ajax({
        url: "/PlantView/GetCustomDeviceModal",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ Details: myData }),
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(opcPageName, 0);
            opc.server.getPageData(DevPageName, 50);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
}

function OpenDGModal(DevUnqID, DevPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetDGDetailsView?DevUnqID=" + DevUnqID,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(DevPageName, 0);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + DevPageName;
}

function OpenDensityModal(tankID, DevUnqID, DevPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetDensityDetailView?tankID=" + tankID + "&DevUnqID=" + DevUnqID,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(DevPageName, 0);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + DevPageName;
}

function OpenPTModal(DevUnqID, DevPageName) {
    if (DevUnqID == undefined || DevUnqID == null || DevUnqID == '' || DevUnqID == 0) { return; }
    $.ajax({
        type: "GET",
        url: "/PlantView/OpenPTModal?DevUnqID=" + DevUnqID,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(DevPageName, 0);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + DevPageName;
}

function OpenDeviceModal(DevUnqID, DevPageName) {
    if (DevUnqID == undefined || DevUnqID == null || DevUnqID == '' || DevUnqID == 0) { return; }
    $.ajax({
        type: "GET",
        url: "/PlantView/OpenDeviceModal?DevUnqID=" + DevUnqID,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(DevPageName, 0);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + DevPageName;
}

function PumpRunHrsReset(PumpDetails, src, TagName, UserID, LoginID, UserName) {
    var activityName = "Reset Pump Run Hrs";
    var activityDetail = "Pump: " + PumpDetails;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                }, activityName, activityDetail);
            }
        }
    });
}

function OpenPValveModal(ValveID, ValvePageName) {
    opcPageName = opcPageName + "," + ValvePageName;
    $.ajax({
        type: "GET",
        url: "/PlantView/GetPOVView?ValveID=" + ValveID,
        cache: false,
        success: function (result) {
            $('#myPValveModal').html(result);
            $('#myPValveModal').modal('show');
            $('#myPValveModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPValveModal').modal('hide');
            });
            opc.server.getPageData(ValvePageName, 50);
        }
    });
}

function SoftESD(ActDet, src, ControlName, UserID, LoginID, UserName) {
    var activityName = "ESD Soft Push Button";
    var activityDetail = ActDet;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }, activityName, activityDetail);
            }
        }
    });
}

function MuteHooter(ActDet, src, ControlName, UserID, LoginID, UserName) {
    var activityName = "Mute Hooter";
    var activityDetail = ActDet;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    MuteAlarmSounds();
                    opc.server.sendDataToOPC(ControlName, $(src).attr('data-opcvalue'), opcPageName, UserID, LoginID, UserName);
                    //SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    MuteAlarmSounds();
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}

function SetTankToDormantMode(TagName, CurrModeID, NewModeID) {
    opc.server.sendDataToOPC(TagName, CurrModeID, 'TankLiveData', CurrUserID, "", "", NewModeID, true, false);
}

function ValidateManualExecute(AutoManTag, ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName) {
    var AutoManVal = $('.' + AutoManTag).attr('data-opcvalue');
    if (AutoManVal != undefined && AutoManVal.toUpperCase() == "TRUE") {
        alertDismissable('danger', 'Device is in AUTO mode. Cannot send command...');
        return;
    }
    SetProcessValue(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName);
}

function SetProcessValue(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName) {
    var activityName = ActName;
    var activityDetail = ActDet;
    var CurrVal = "";
    if (Type == 'INPUT') {
        var prev = "";
        if ($('.' + ControlName) != undefined && $('.' + ControlName).attr('data-opcvalue') != undefined && $('.' + ControlName).attr('data-opcvalue') != '?') {
            prev = $('.editable-input.' + ControlName).attr('data-opcvalue');
        }
        var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
        if (prev == CurrVal) { alertDismissable('info', 'Previous and current values are the same'); return; }
        var maxVal = parseFloat($('.editable-input.' + ControlName).attr("max"));
        var minVal = parseFloat($('.editable-input.' + ControlName).attr("min"));
        if (CurrVal < minVal) { alertDismissable('danger', 'Current value:' + CurrVal + ' is less than Min value:' + minVal); return; }
        if (CurrVal > maxVal) { alertDismissable('danger', 'Current value:' + CurrVal + ' is greater than Max value:' + maxVal); return; }
    }
    else if (Type == 'TOGGLE') {
        if ($('.' + ControlName).is(':disabled') == true) { alertDismissable("danger", "No Connection. Switch is disabled!"); return; }
    }
    else if (Type == 'DDL') {
        CurrVal = $('.' + ControlName + ' option:selected').val();
    }
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    if (Type == 'TOGGLE') { toggleChange(src, ControlName, UserID, LoginID, UserName); }
                    else { SendDataToOPC(src, ControlName, UserID, LoginID, UserName, CurrVal); }
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    if (Type == 'TOGGLE') { toggleChange(src, ControlName, UserID, LoginID, UserName); }
                    else { SendDataToOPC(src, ControlName, UserID, LoginID, UserName, CurrVal); }
                }, activityName, activityDetail);
            }
        }
    });
}

function SetProcessValOnConfirm(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName) {
    $('#myConfirmMsg').html("<p style=\"text-align: center; color: #ad0001; font-size: 37px;\">Confirm action: " + ActDet + "?</p>");
    $('#confirmModal').modal('show');
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        SetProcessValue(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName);
    });
}

function SetCardNo(activityName, activityDetail, ControlName, glyphName, SlaveID, DSID) {
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal <= 0) { alertDismissable('danger', 'InValidt Card No: ' + CurrVal); return; }
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SetCardNoDo(SlaveID, DSID, CurrVal); $('#' + glyphName).addClass('hide');
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SetCardNoDo(SlaveID, DSID, CurrVal); $('#' + glyphName).addClass('hide');
                }, activityName, activityDetail);
            }
        }
    });
}

function SetCardNoDo(SlaveID, DSID, CurrVal) {
    var CardData = {
        'SlaveID': SlaveID,
        'DSID': DSID,
        'CardReaderNo': CurrVal,
    };
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: "/Cards/ForceBGCard",
        data: JSON.stringify(CardData),
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}

function updateGlyphButton(ControlName, glyphID) {
    if (glyphID == undefined) { glyphID = ControlName.replace('CARD_NO', 'GLYPH'); }
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal > 0) { $('#' + glyphID).removeClass('hide'); }
    else { $('#' + glyphID).addClass('hide'); }
}

function GetMOVModal(Type, ValveId, PageName) {
    var link = "";
    if (Type == 0) { link = "/PlantView/GetMOVDetailsView?MOVId=" + ValveId }
    else if (Type == 1) { link = "/PlantView/GetROSOVDetailsView?ROSOVId=" + ValveId }
    else if (Type == 2) { link = "/PlantView/GetDBBVDetailsView?DBBVId=" + ValveId }
    else if (Type == 3) { link = "/PlantView/GetTOBVDetailsView?TOBVId=" + ValveId }
    $.ajax({
        type: "GET",
        url: link,
        cache: false,
        success: function (result) {
            $('#myMOVModal').html(result);
            opc.server.getPageData(PageName, 0);
            $('#myMOVModal').modal('show');
            $('#myMOVModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myMOVModal').modal('hide');
            });
            opc.server.readPageTags(opcPageName);
        },
        error: function (result) {
            alertDismissable('Error in Valve Modal');
        }
    });
    //opcPageName = opcPageName + "," + PageName;
}

function OpenMOVModal(MOVId, PageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetMOVDetailsView?MOVId=" + MOVId,
        cache: false,
        success: function (result) {
            $('#myMOVModal').html(result);
            opc.server.getPageData(PageName, 0);
            $('#myMOVModal').modal('show');
            $('#myMOVModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myMOVModal').modal('hide');
            });
        },
        error: function (result) {
            alertDismissable('Error in Valve Modal');
        }
    });
}

function UpdateConfigParam(ParamName, ctrl) {
    var ConfVal = $(ctrl).val();
    var activityName = "Edit Existing Configuration";
    var activityDetail = "Parameter: " + ParamName + "; Value: " + ConfVal;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateConfigParamDo(ParamName, ConfVal);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateConfigParamDo(ParamName, ConfVal); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateConfigParamDo(ParamName, ConfVal) {

    var objConfiguration = {
        'ParameterName': ParamName,
        'Value': ConfVal,
    };

    $.ajax({
        url: "/Configuration/UpdateConfigParam",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objConfiguration),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}

function PlaySound(audioName, iter) {
    if (audioName == undefined || audioName == "") { return; }
    //var sound = window[audioName];
    var sound = document.getElementById(audioName);
    if (sound == undefined || sound == null || sound == "") { return; }
    if (iter == undefined) { sound.loop = false; }
    else { sound.loop = true; }
    //sound.load();
    sound.currentTime = 0;
    sound.muted = false;
    try {
        var playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                if (sound.loop == true) {
                    if (iter > 0) {
                        setTimeout(function () { StopSound(audioName); }, iter);
                    }
                }
            }).catch(function (error) {
                // Automatic playback failed.
                console.log(error.message);
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }

}

function StopSound(audioName) {
    var sound = document.getElementById(audioName);
    if (sound == undefined || sound == null || sound == "") { return; }
    sound.loop = false;
    sound.pause();
}

function MuteAllSound() {
    $.each($('audio'), function (i, sound) {
        if (sound == undefined || sound == null || sound == "") { return; }
        sound.loop = false;
        sound.pause();
    });
}
function MuteAlarmSounds() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/MuteAlarmSounds",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function ValidateOpenCloseValve(src, MovName, TagToWrite, ValveType, UserID, LoginID, UserName, currValDesc) {
    if ($('#myMOVModalBody div.chng_automan_mov_true').length > 0) {
        alertDismissable('danger', 'MOV is in AUTO mode. Cannot send command');
        return;
    }

    var activityName = "Validate Open Close " + ValveType;
    var activityDetail = ValveType + ": " + MovName;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
            }
            else {
                ShowPasswordModalForReqTrn('Change Auto/Manual Mode ' + ValveType, function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
                }, activityName, activityDetail);
            }
        }
    });
}

function GoToView(CallBackFunction) {
    opc.server.removeFromGroup(opcPageName);
    CallBackFunction();
}

function RefreshPage(RemScrObj) {
    var Directpage = window.location.href.toUpperCase().indexOf("HTML") > 0;
    if (Directpage == false) {
        if (typeof window[RemScrObj.OnClickBGFunc] === "function") {
            window[RemScrObj.OnClickBGFunc](RemScrObj.Param1, RemScrObj.Param2);
        }
    }
}

function PopupRedirectClick(RemScrObj) {
    if (UsrPopUpThreshold > RemScrObj.Severity) { return; }
    alertDismissable("danger", RemScrObj.Message);
    //$('.ESDModal').hide();
    $('.OPCModal').show();
    $.showModal({ title: 'Alert! <span class="pull-right">' + RemScrObj.EvntDateTime + '</span>', body: RemScrObj.Message, footer: '<button type="button" class="btn btn-primary" id="btnConfirmESD">' + RemScrObj.BtnLabel + '</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="btnConfirmCancel">Cancel</button>' })
    //$('.OPCModal #opcMsgModalMsg').html(RemScrObj.Message);
    //$('#opcMsgModal').modal('show');

    //$('#btnConfirmESD').text(RemScrObj.BtnLabel);
    $('#btnConfirmESD').unbind('click');
    var Directpage = window.location.href.toUpperCase().indexOf("HTML") > 0;
    $('#btnConfirmESD').bind('click', function () {
        if (Directpage == false) {
            clearControlsSubscriptions();
            window[RemScrObj.OnClickBGFunc](RemScrObj.Param1, RemScrObj.Param2, RemScrObj.Param3);
        }
        $(".modal-backdrop").slideUp('slow');
        $('#opcMsgModal').modal('hide');
        //StopSound(RemScrObj.SoundName);
    });
    $('#btnConfirmCancel').bind('click', function () {
        $(".modal-backdrop").slideUp('slow');
        $('#opcMsgModal').modal('hide');
    });
}

function PopupRedirectAuto(RemScrObj) {
    if (UsrPopUpThreshold > RemScrObj.Severity) { return; }
    alertDismissable("danger", RemScrObj.Message);
    //$('.ESDModal').hide();
    $('.OPCModal').show();
    $.showModal({ title: 'Alert!  <span class="pull-right">' + RemScrObj.EvntDateTime + '</span>', body: RemScrObj.Message, footer: '<button type="button" data-dismiss="modal" class="btn btn-primary" id="btnConfirmESD">Ok</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="btnConfirmCancel">Cancel</button>' })

    //$('.OPCModal #opcMsgModalMsg').html(RemScrObj.Message);
    //$('#opcMsgModal').modal('show');

    // $('#btnConfirmESD').text("OK");
    var Directpage = window.location.href.toUpperCase().indexOf("HTML") > 0;
    if (Directpage == false && (typeof window[RemScrObj.OnClickBGFunc] === "function")) {
        clearControlsSubscriptions();
        window[RemScrObj.OnClickBGFunc](RemScrObj.Param1, RemScrObj.Param2);
    }
    $('#btnConfirmESD').unbind('click');
    $('#btnConfirmESD').bind('click', function () {
        $(".modal-backdrop").slideUp('slow');
        //$('#opcMsgModal').modal('hide');
        //StopSound(RemScrObj.SoundName);
    });
    $('#btnConfirmCancel').bind('click', function () {
        $(".modal-backdrop").slideUp('slow');
        $('#opcMsgModal').modal('hide');
    });
}

function ShowMsgAlertRedirect(RemScrObj) {
    addNewMsgAlertItem(RemScrObj);
}

function closeModal(modalID) {
    $(".modal-backdrop").slideUp('slow');
    $('#' + modalID).modal('hide');
}

function SetZoom() {
    $('#btnZoom').bootstrapToggle('toggle');
    var ZoomStatus = $('#btnZoom').prop('checked');
    if (ZoomStatus == true) { panZoomInstance.enableZoom(); panZoomInstance.enableDblClickZoom(); }
    else { panZoomInstance.disableZoom(); panZoomInstance.disableDblClickZoom(); }
}

function SetPan() {
    $('#btnPan').bootstrapToggle('toggle');
    var PanStatus = $('#btnPan').prop('checked');
    if (PanStatus == true) { panZoomInstance.enablePan(); }
    else { panZoomInstance.disablePan(); }
}

function svgOnPageLoad() {
    var oSvg = $('#svgContent svg')[0];
    var ZoomStatus = $('.svgButtons .slideButtons .btnZoom').hasClass('active');
    svgDefaultOptions.panEnabled = $('.svgButtons .slideButtons .btnPan').hasClass('active');
    svgDefaultOptions.zoomEnabled = ZoomStatus;
    //svgDefaultOptions.dblClickZoomEnabled = ZoomStatus;
    panZoomInstance = svgPanZoom(oSvg, svgDefaultOptions);
    const promise1 = new Promise(function (resolve, reject) {
        resolve(InitConn(opcPageName, 0));
    });
    promise1.then(() => {
        if (opcStartDone == true) {
            console.log(showTime() + ': opc StartDone. Reading Page Data.');
            createTooltip();
            opc.server.readPageTags(opcPageName);
        }
        else {
            console.log(showTime() + ': opc signalR not started. Not reading Data.');
        }
    });
}

function SetZoom(e) {
    var ZoomStatus = $(e).hasClass('active');
    if (ZoomStatus) {
        $(e).removeClass('active');
    } else {
        $(e).addClass('active');
    }
    if (panZoomInstance != 'undefined' && panZoomInstance != null && panZoomInstance != "") {
        if (ZoomStatus != true) { panZoomInstance.enableZoom(); } //panZoomInstance.enableDblClickZoom(); 
        else { panZoomInstance.disableZoom(); } //panZoomInstance.disableDblClickZoom(); 
    }
}

function SetPan(e) {
    var PanStatus = $(e).hasClass('active');
    if (PanStatus) {
        $(e).removeClass('active');
    } else {
        $(e).addClass('active');
    }
    if (panZoomInstance != 'undefined' && panZoomInstance != null && panZoomInstance != "") {
        if (PanStatus != true) { panZoomInstance.enablePan(); }
        else { panZoomInstance.disablePan(); }
    }
}


function CheckReDirectToBackup() {
    $.ajax({
        type: "GET",
        url: 'http://' + strBackupSrv + '/TTESApi/Ping?AppName=JSTest',
        cache: false,
        global: false,
        timeout: 5000,
        beforeSend: function () {
            console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] Ping Test Start: ' + this.url);
        },
        success: function (result) {
            console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] Backup Check Success');
            window.location = 'http://' + strBackupSrv;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(errorThrown);
            BackupRedirectAttempts = BackupRedirectAttempts + 1;
            console.log('[' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] Ping Check failed before Redirect to Backup. Attempt:' + BackupRedirectAttempts);
            if (BackupRedirectAttempts > 5) { window.location = 'http://' + strPrimarySrv; return; }
            setTimeout(CheckReDirectToBackup(), 2000);
        }
    });
}

///// MEssage Alert SEction ////

if ($('.msg-alert ul li').length > 0) {
    $('.alert-action .msg-alert-bell').addClass('has-alert-item');
}

$('.remove-msg-alert-icon').click(function () {
    removeMsgAlertItem($(this), true);
    if ($('.msg-alert ul li').length < 1) {
        $('.alert-action .msg-alert-bell').removeClass('has-alert-item');
    }
});

function showHideMsgAlert() {
    $(".msg-alert").animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
}

// remove element
// if removing element from backend, pass second attribute as false,
// if removing element from cross icon, pass true for second attribute
function removeMsgAlertItem(item, isRemoveIconClick) {
    if (isRemoveIconClick) {
        $(item).parent().remove();
    } else {
        $(item).remove();
    }
}

// Pass new msg alert item value
function addNewMsgAlertItem(RemScrObj) {
    var ele = $('.msg-alert ul');
    var newItem = document.createElement('li');
    newItem.setAttribute('data-attr', 'msg-8');
    var onclck = "";
    if (RemScrObj.OnClickBGFunc != "") {
        onclck = ' onclick=' + RemScrObj.OnClickBGFunc + '("' + RemScrObj.Param1 + '","' + RemScrObj.Param2 + '") class="get-hover"';
        //newItem.className += 'get-hover';
    }
    newItem.innerHTML = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span' + onclck + '>' + RemScrObj.Message + '</span><i class="fa fa-times-circle remove-msg-alert-icon" aria- hidden="true" ></i>';
    ele.append(newItem);
    $('.alert-action .msg-alert-bell').addClass('has-alert-item');
    $('.msg-alert').is(':visible') ? '' : showHideMsgAlert();
    $('.remove-msg-alert-icon').click(function () {
        removeMsgAlertItem($(this), true);
        if ($('.msg-alert ul li').length < 1) {
            $('.alert-action .msg-alert-bell').removeClass('has-alert-item');
        }
    });
    //$('.msg-alert-bell').trigger('click');
}
//// End Message Alert ////

// Dynamic Model genrate
(function ($) {
    "use strict"

    var i = 0
    function Modal(props) {
        this.props = {
            title: "", // the dialog title html
            body: "", // the dialog body html
            footer: "", // the dialog footer html (mainly used for buttons)
            modalClass: "fade", // Additional css for ".modal", "fade" for fade effect
            modalDialogClass: "", // Additional css for ".modal-dialog", like "modal-lg" or "modal-sm" for sizing
            options: {
                backdrop: 'static',
                keyboard: false
            }, // The Bootstrap modal options as described here: https://getbootstrap.com/docs/4.0/components/modal/#options
            // Events:
            onCreate: null, // Callback, called after the modal was created
            onDispose: null, // Callback, called after the modal was disposed
            onSubmit: null // Callback of $.showConfirm(), called after yes or no was pressed
        }
        for (var prop in props) {
            this.props[prop] = props[prop]
        }
        this.id = "bootstrap-show-modal-" + i
        i++
        this.show()
    }

    Modal.prototype.createContainerElement = function () {
        var self = this
        this.element = document.createElement("div")
        this.element.id = this.id
        this.element.setAttribute("class", "modal " + this.props.modalClass)
        this.element.setAttribute("tabindex", "-1")
        this.element.setAttribute("role", "dialog")
        this.element.setAttribute("aria-labelledby", this.id)
        this.element.innerHTML = '<div class="modal-dialog ' + this.props.modalDialogClass + '" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<h3 class="modal-title"></h3>' +
            '</div>' +
            '<div class="modal-body"><p class="msgModaldata"></p></div>' +
            '<div class="modal-footer"></div>' +
            '</div>' +
            '</div>'
        document.body.appendChild(this.element)
        $(this.element).draggable({ handle: ".modal-header" });
        this.titleElement = this.element.querySelector(".modal-title")
        this.bodyElement = this.element.querySelector(".modal-body p")
        this.footerElement = this.element.querySelector(".modal-footer")
        $(this.element).on('hidden.bs.modal', function () {
            self.dispose()
        })
        if (this.props.onCreate) {
            this.props.onCreate(this)
        }
    }

    Modal.prototype.show = function () {
        if (!this.element) {
            this.createContainerElement()
            if (this.props.options) {
                $(this.element).modal(this.props.options)
            } else {
                $(this.element).modal()
            }
        } else {
            $(this.element).modal('show')
        }
        if (this.props.title) {
            $(this.titleElement).show()
            this.titleElement.innerHTML = this.props.title
        } else {
            $(this.titleElement).hide()
        }
        if (this.props.body) {
            $(this.bodyElement).show()
            this.bodyElement.innerHTML = this.props.body
        } else {
            $(this.bodyElement).hide()
        }
        if (this.props.footer) {
            $(this.footerElement).show()
            this.footerElement.innerHTML = this.props.footer
        } else {
            $(this.footerElement).hide()
        }
    }

    Modal.prototype.hide = function () {
        $(this.element).modal('hide')
    }

    Modal.prototype.dispose = function () {
        //$(this.element).modal('dispose')
        document.body.removeChild(this.element)
        //if (this.props.onDispose) {
        //this.props.onDispose(this)
        //}
    }

    $.extend({
        showModal: function (props) {
            return new Modal(props)
        }
    })

}(jQuery))