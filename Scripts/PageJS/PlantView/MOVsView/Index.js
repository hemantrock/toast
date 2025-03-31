//$(document).ready(function () {
//    opcPageName = "MOVView.*";
//    InitConn(opcPageName, 0);
//    opc.server.readPageTags(opcPageName);
//    $('.nav-tabs a:first').tab('show');
//});

function ExtraActivities(model) {
  
}

function ValidateAutoManualChange(src, MovName, TagToWrite, UserID, LoginID, UserName, currValDesc)
{
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

function ValidateOpenClose(src, MovName, TagToWrite, UserID, LoginID, UserName)
{
    if ($('#myMOVModalBody div.chng_automan_mov_true').length > 0) {
        alertDismissable('danger', 'MOV is in AUTO mode. Cannot send command');
        return;
    }
    var currValDesc = ($('.' + TagToWrite).attr('data-opcvalue'));
    //if ($('#myMOVModalBody .remote_img_mov_true').length <= 0) {
    //    alertDismissable('danger', 'MOV should have Remote Select feedback for command to be executed.');
    //}

    var activityName = "Open/Close Command to MOV";
    var activityDetail = "MOV: " + MovName;

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
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
                }, activityName, activityDetail);
            }
        }
    });

    //SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
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

function ValidateOpenPercent(src, MovName, TagToWrite, UserID, LoginID, UserName)
{
    if (parseFloat($('#txtOpenPercent').val()) < 0 || parseFloat($('#txtOpenPercent').val()) > 100 || parseFloat($('#txtOpenPercent').val()).toString() == "NaN")
    {
        alertDismissable("danger","Open Percent must be in XX.X format between 00.1 to 99.9");
        return false;
    }
    $(src).attr('data-opcvalue', parseFloat($('#txtOpenPercent').val()).toFixed(1));

    var activityName = "Set Open % of MOV";
    var activityDetail = "MOV: " + MovName;

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
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });

    //SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
}


function OpenAutoManModal(src, hdnTankId, MovDetails, ClassName, TagName, UserID, LoginID, UserName) {

    if (hdnTankId != '')
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

        var activityName = "Change Auto/Manual Mode MOV";
        var activityDetail = "MOV: " + MovDetails;

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
                    }
                    SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                    $('#AutoManModal').modal('hide');
                }
                else {
                    ShowPasswordModal(MovDetails + ' - Change Control', function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}