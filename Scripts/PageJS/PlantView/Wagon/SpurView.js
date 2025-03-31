var updatePer = false; var RefreshTime = 3000;
$(document).ready(function () {
    clearTimeout(gblTimeout);
    var spurNo = $('#SpurView').attr('data-spurno');
    refreshSpurView(spurNo);
    //Page Hangs with sooo Much Data - Use DB Refresh
    //opcPageName = 'SpurView' + spurNo;
    //InitConn(opcPageName, 0);
    //opc.server.readPageTags(opcPageName);
    //createTooltip();
    //gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime);
    //clearTimeout(gblTimeout);
    //gblTimeout = setTimeout(function () { refreshSpurView(spurNo); }, 10000);
});

function ExtraActivities(model) {
    //updatePer = true;
}

function UpdatePercentage() {
    return;
    clearTimeout(gblTimeout);
    if (updatePer == false) { gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime); return; }
    else { updatePer = false; }
    $.each($('span.percentage'), function (i, spn) {
        var bcuPref = $(this).data('id');
        var preset = (parseFloat($('.PRESET_' + bcuPref).text()) || 0);
        var PrevQty = (parseFloat($('.PREV_QTY_' + bcuPref).text()) || 0);
        var FillQty = (parseFloat($('.FILL_QTY_' + bcuPref).text()) || 0);
        var EffQty = PrevQty + FillQty;
        if (preset > 0) {
            if (EffQty != NaN) {
                var percentage = 0;
                if (EffQty >= 0) {
                    $('.EFF_QTY_' + bcuPref).text(EffQty);
                    percentage = ((EffQty / preset) * 100).toFixed(2);
                }
                $(this).text(' ' + percentage + '%');
                $('.fill_' + bcuPref).css('height', percentage + '%');
            }
        } else {
            $('.EFF_QTY_' + bcuPref).text('SICK');
        }
    });
    gblTimeout = setTimeout(function () { UpdatePercentage(); }, RefreshTime);
}

function refreshSpurView(spurNo) {
    $.ajax({
        type: "GET",
        url: "/WagonSummary/SpurTable?spurNo=" + spurNo,
        cache: false,
        global: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                //console.log(showTime() + ": Refreshing Spur Table...");
                $("#SpurTable").html(result);
            }
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshSpurView(spurNo); }, 10000);
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}