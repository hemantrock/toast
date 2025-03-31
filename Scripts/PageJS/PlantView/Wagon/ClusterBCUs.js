var updatePer = false; var tabID = "span.percentage."; var RefreshTime = 3000;
$(document).ready(function () {
    var e = $('a[href="#' + SelSpur + '"]');
    if (e.length > 0) {
        $(e).tab('show');
        clearControlsSubscriptions();
        RefreshSelectedCluster(e);
    }
    else { $('.nav-tabs a:first').tab('show'); }
    createTooltip();
});

$('.nav-tabs').click(function () {
    clearControlsSubscriptions();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    RefreshSelectedCluster(e.target);
});

function ExtraActivities(model) {
    updatePer = true;
}

function UpdatePercentage() {
    //console.log(showTime() + ':UpdatePercentage');
    clearTimeout(gblTimeout);
    if (updatePer == false) { gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime); return; }
    else { updatePer = false; }
    $.each($(tabID), function (i, spn) {
        var bcuPref = $(this).data('id');
        if (bcuPref == "") { return;}
        //console.log(showTime() + ':UpdatePercentage:' + bcuPref);
        var preset = (parseFloat($('.PRESET_' + bcuPref).text()) || 0);
        var PrevQty = (parseFloat($('.PREV_QTY_' + bcuPref).text()) || 0);
        var FillQty = (parseFloat($('.FILL_QTY_' + bcuPref).text()) || 0);
        var EffQty = PrevQty + FillQty;
        //console.log(showTime() + ':UpdatePercentage:' + EffQty);
        if (preset > 0) {
            $('.EFF_QTY_' + bcuPref).text(EffQty);
            if (EffQty != NaN && EffQty >= 0) {
                var percentage = ((EffQty / preset) * 100).toFixed(2);
                $(this).text(' ' + percentage + '%');
                $('.fill_' + bcuPref).css('height', percentage + '%');
            }
            else if (EffQty != NaN) {
                $(this).text('0%');
                $('.fill_' + bcuPref).css('height', '0%');
            }
        } else {
            $('.EFF_QTY_' + bcuPref).text('SICK');
        }

    });
    gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime);
}

function RefreshWagBCU(RemScrObj) {
    var BcuID = RemScrObj.Param1; ClusRef = RemScrObj.Param2;
    //var str = showTime() + ': RefreshWagBCU: ' + BcuID + "; Cluster: " + ClusRef;
    //alertDismissable("info", str);
    //console.log(str);
    if (SelSpur == ClusRef) {
        //alertDismissable("info", "Refreshing:" + ClusRef);
        var e = $('a[href="#' + SelSpur + '"]');
        $(e).tab('show');
        clearControlsSubscriptions();
        RefreshSelectedCluster(e);
    }
}

function RefreshSelectedCluster(e) {
    //console.log(showTime() + ':RefreshSelectedCluster:' + ClusterID);
    opcPageName = $(e).attr("data-pagename");
    tabID = 'span.percentage.' + $(e).attr("data-uid");
    var ClusterID = $(e).attr("data-clid");
    var RefID = $(e).attr("href");

    $.ajax({
        type: "GET",
        url: "/WagonSummary/GetClusterView?ClusterID=" + ClusterID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $(RefID).html(result);
            }
            InitConn(opcPageName, 0);
            opc.server.readPageTags(opcPageName);
            gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime);
        }
    });
}

function OpenWagonBCULocRemModal(TagName, wBcuID, actName, actDet) {
    var CurrVal = $('.' + TagName).attr('data-opcvalue');
    if (CurrVal == undefined) { alertDismissable('danger', 'No Connection'); return; }

    $.each($("#GenericLocRemModal .DEV_LOCREM"), function (index, ele) {
        removeClasses(ele, "DEV_LOCREM_");
        removeClasses(ele, "locrem");
    });
    $("#GenericLocRemModal .DEV_LOCREM").addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#GenericLocRemModal #LocRemLabel').html(actDet + ' - Change Mode');
    $('#GenericLocRemModal').modal('show');
    $('#GenericLocRemModal').draggable({ handle: ".modal-header" });
    $("#GenericLocRemModal #btnModeChangeOK").unbind('click');
    $("#GenericLocRemModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = actName;
        var activityDetail = actDet;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        ChangeWagBCUOpMode($('#hdnLOCREMMode'), wBcuID, TagName);
                        $('#GenericLocRemModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ChangeWagBCUOpMode($('#hdnLOCREMMode'), wBcuID, TagName); }, activityName, activityDetail);
                }
            }
        });
    });
}

function ChangeWagBCUOpMode(src, wBcuID, TagName) {
    var locrem = $(src).attr('data-opcvalue');
    if (locrem.toUpperCase() == "TRUE") {
        NewMode = "AUTO";
    } else { NewMode = "MANUAL" }
    debugger;
    $.ajax({
        type: "GET",
        url: "/BatchController/cmdChangeWagBCUOpMode?wBcuID=" + wBcuID + "&NewMode=" + NewMode + "&TagName=" + TagName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}