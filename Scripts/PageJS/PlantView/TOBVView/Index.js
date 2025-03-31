$(document).ready(function () {
    opcPageName = "TOBVView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function OpenMOVModal(TOBVId, PageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetTOBVDetailsView?TOBVId=" + TOBVId,
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
        }
    });
    opcPageName = opcPageName + "," + PageName;
}

function ExtraActivities(model) {

}

function ValidateAutoManualChange(src, MovName, TagToWrite, UserID, LoginID, UserName, currValDesc) {
    if ($('#hdnTankAutoMan').attr('data-opcvalue').toUpperCase() == "TRUE"
        && $(src).attr('data-opcvalue').toUpperCase() == "TRUE") {
        alertDismissable('danger', 'Tank is in AUTO mode. Change Tank control to Manual first.');
        return;
    }

    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
}

function ValidateOpenClose(src, MovName, TagToWrite, UserID, LoginID, UserName, currValDesc) {
    if ($('#myMOVModalBody div.chng_automan_mov_true').length > 0) {
        alertDismissable('danger', 'MOV is in AUTO mode. Cannot send command');
        return;
    }

    var activityName = "Open/Close Command to TOBV";
    var activityDetail = "TOBV: " + MovName;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
            }
            else {
                ShowPasswordModalForReqTrn('Change Auto/Manual Mode TOBV', function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
                }, activityName, activityDetail);
            }
        }
    });
}

function UpdatePercentage(model) {
    $.each(model, function (i, item) {
        if (item.TagName.indexOf("PER_OPN_MOV_") >= 0) {
            $('.FILL_' + item.TagName).css('height', item.Value + '%');
        }
    });
}

function UpdateMOVValve_ALRM(model) {
    $.each(model, function (i, item) {
        if (item.TagName.indexOf("GEN_ALRM_") >= 0 && item.Value.toUpperCase() == "TRUE") {
            $('div.IMG_' + item.TagName).removeClass('mov-valve').addClass('mov-valve-red');
        }
        else if (item.TagName.indexOf("GEN_ALRM_") >= 0 && item.Value.toUpperCase() == "FALSE") {
            $('div.IMG_' + item.TagName).removeClass('mov-valve-red').addClass('mov-valve');
        }
    });
}

function ValidateOpenPercent(src, MovName, TagToWrite, UserID, LoginID, UserName) {
    if (parseFloat($('#txtOpenPercent').val()) < 0 || parseFloat($('#txtOpenPercent').val()) > 100 || parseFloat($('#txtOpenPercent').val()).toString() == "NaN") {
        alertDismissable("danger", "Open Percent must be in XX.X format between 00.1 to 99.9");
        return false;
    }
    $(src).attr('data-opcvalue', parseFloat($('#txtOpenPercent').val()).toFixed(1));


    var activityName = "Validate Open Percent TOBV";
    var activityDetail = "TOBV: " + MovName;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}

function MaintainenceMode(MMDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Set TOBV Maintainence Mode";
    var activityDetail = "TOBV Maintainence Mode: " + MMDetails;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    toggleChange(this, TagName, UserID, LoginID, UserName);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}