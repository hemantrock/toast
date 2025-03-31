$(document).ready(function () {
    documentReady();
});

function documentReady()
{
    if (opcStartDone == true) {
        opc.server.removeFromGroup(opcPageName);
        opc.server.removeFromGroup(opcPageName1);
        opcPageName = "";
        opcPageName1 = "";

        var bay = $('#ddlBayView').val();
        opcPageName = bay;

        opc.server.getPageData(opcPageName, 50);
    }
    else {
        console.log('BayViewjs - opcStartDone == false');
        setTimeout(function () { documentReady(); }, 500);
    }
}

function ExtraActivities()
{
    CheckNoCard();
    UpdateLoadingArm();
    UpdatePercentage();
}


function CheckNoCard()
{
    if ($('.spnCardNumber').text() == "0" || $('.spnCardNumber').text() == "") {
        $('#bayTruck').css("visibility", "hidden");
    }
    else {
        $('#bayTruck').css("visibility", "visible");
    }
}

function UpdateLoadingArm()
{
    $.each($('span.flow-range'), function (i, spn) {
        var bayNo = $(this).data('id');
        var flowRate = parseFloat($(this).attr('data-opcvalue'));

        if (flowRate > 0) {
            $('.LA_' + bayNo).addClass('la_true');
        }
        else {
            $('.LA_' + bayNo).removeClass('la_true');
        }
    });
}

function UpdatePercentage() {
    $.each($('span.percentage'), function (i, spn) {
        var bayNo = $(this).data('id');
        console.log(bayNo);
        var delivered = parseFloat($('.flow-range.QTY_BP_' + bayNo).text());
        var preset = parseFloat($('.flow-range.QTY_PR_' + bayNo).text());
        var accumulated = parseFloat($('.flow-range.QTY_ACC_' + bayNo).text());

        var effPreset = accumulated - delivered + preset;      
        if (effPreset > 0) {
            var percentage = ((accumulated / effPreset) * 100).toFixed(0);
            $(this).text(' ' + percentage + '%');
            $('.bay-truck-fill').css('width', percentage + '%');
        }
        else {
            $(this).text('0%');
            $('.bay-truck-fill').css('width', '0%');
        }
    });
}

function OpenLocRemModal(BayDetails, ClassName, TagName, UserID, LoginID, UserName) {
    $.each($("#LOCREMModal ." + ClassName), function (index, ele) {
        removeClasses(ele, 'LOCREM_BAY');
        removeClasses(ele, "locrem_");
    });
    $("#LOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#LOCREMModal #LocRemLabel').html(BayDetails + ' - Change Mode');
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable();
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change BC Local /Remote";
        var activityDetail = "Bay: " + BayDetails;

        $.ajax({
            type: "GET",
            url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage);

                    ShowPasswordModalForReqTrn(BayDetails + ' - Change Mode', function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, ApproverId, "", "", "");
                        $('#LOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
                else {
                    SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                    $('#LOCREMModal').modal('hide');
                }
            }
        });
    });
}