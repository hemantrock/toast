$(document).ready(function () {
    //opcPageName = "ROSOVView.*,RSVView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function OpenMOVModal(ROSOVId, PageName)
{
    $.ajax({
        type: "GET",
        url: "/PlantView/GetROSOVDetailsView?ROSOVId=" + ROSOVId,
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

function ValidateAutoManualChange(src, TagToWrite, UserID, LoginID, UserName, currValDesc)
{
    var local = false; var Auto = true;
    var temp = $('.' + TagToWrite.replace("AUTOMAN", "LOCREM")).attr('data-opcvalue');
    if (temp != undefined && temp != null) { local = temp; }
    var temp = ($('.' + TagToWrite).attr('data-opcvalue'));
    if (temp != undefined && temp != null) { Auto = temp; }
    if (local == 'True' && Auto == 'False') { alertDismissable('danger', 'ROSOV must be in Remote mode to set in Auto Mode.'); return; }

    //if ($('#myMOVModalBody .remote_img_mov_true').length <= 0
    //    && $(src).attr('data-opcvalue').toUpperCase() == "FALSE") {
    //    alertDismissable('danger', 'MOV should have Remote Select feedback to work in AUTO mode.');
    //}

    if ($('#hdnTankAutoMan').attr('data-opcvalue').toUpperCase() == "TRUE"
        && $(src).attr('data-opcvalue').toUpperCase() == "TRUE")
    {
        alertDismissable('danger', 'Tank is in AUTO mode. Change Tank control to Manual first.');
        return;
    }

    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
}

function ValidateOpenClose(ROSOVDetail, src, TagToWrite, UserID, LoginID, UserName)
{
    
    if ($('#myMOVModalBody div.chng_automan_mov_true').length > 0) {
        alertDismissable('danger', 'MOV is in AUTO mode. Cannot send command');
        return;
    }

    //if ($('#myMOVModalBody .remote_img_mov_true').length <= 0) {
    //    alertDismissable('danger', 'MOV should have Remote Select feedback for command to be executed.');
    //}
    //SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);

    var activityName = "Open/Close Command to ROSOV";
    var activityDetail = "ROSOV: " + ROSOVDetail;

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
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, "");;
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, "");
                }, activityName, activityDetail);
            }
        }
    });
}

function UpdatePercentage(model) {
    $.each(model, function (i, item) {
        if (item.TagName.indexOf("PER_OPN_MOV_") >= 0) {
            $('.FILL_'+item.TagName).css('height', item.Value+'%');                
        }
    });
}

function UpdateMOVValve_ALRM(model) {
    $.each(model, function (i, item) {
        if (item.TagName.indexOf("GEN_ALRM_") >= 0 && item.Value.toUpperCase()=="TRUE") {
            $('div.IMG_' + item.TagName).removeClass('mov-valve').addClass('mov-valve-red');
        }
        else if (item.TagName.indexOf("GEN_ALRM_") >= 0 && item.Value.toUpperCase()=="FALSE") {
            $('div.IMG_' + item.TagName).removeClass('mov-valve-red').addClass('mov-valve');
        }
    });
}

function ValidateOpenPercent(src, TagToWrite, UserID, LoginID, UserName)
{
    if (parseFloat($('#txtOpenPercent').val()) < 0 || parseFloat($('#txtOpenPercent').val()) > 100 || parseFloat($('#txtOpenPercent').val()).toString() == "NaN")
    {
        alertDismissable("danger","Open Percent must be in XX.X format between 00.1 to 99.9");
        return false;
    }
    $(src).attr('data-opcvalue', parseFloat($('#txtOpenPercent').val()).toFixed(1));
    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
}

function OpenAutoManModal(src, hdnTankId, MovDetails, ClassName, TagName, UserID, LoginID, UserName) {

    if (hdnTankId != '' && $('#' + hdnTankId).attr('data-opcvalue') != 'undefined')
    {
        if ($('#' + hdnTankId).attr('data-opcvalue').toUpperCase() == "TRUE"
                && $(src).attr('data-opcvalue').toUpperCase() == "TRUE") {
            alertDismissable('danger', 'Tank is in AUTO mode. Change Tank control to Manual first.');
            return;
        }
    }
    
    $.each($("#AutoManModal ." + ClassName), function (index, ele) {
        removeClasses(ele, "AUTOMAN_MOV_");
        removeClasses(ele, "automan_mov");
    });
    $("#AutoManModal ." + ClassName).addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 0);
    $('#AutoManModal #AutoManLabel').html(MovDetails + ' - Change Control');
    $('#AutoManModal').modal('show');
    $('#AutoManModal').draggable({ handle: ".modal-header" });
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        var activityName = "Change Auto/Manual Mode ROSOV";
        var activityDetail = "ROSOV: " + MovDetails;
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
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModal("Change Mode", function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, ApproverId, "", "", "");
                        $('#AutoManModal').modal('hide');
                    }, "Change Local /Remote Mode");
                }
            }
        });
    });
}

function MaintainenceMode(MMDetails, src, TagName, UserID, LoginID, UserName, event) {
    
    cancelBubble(event);
    var activityName = "Set ROSOV Maintainence Mode";
    var activityDetail = "ROSOV Maintainence Mode: " + MMDetails;

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