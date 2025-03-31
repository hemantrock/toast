$(document).ready(function () {
    opcPageName = "MOVOverview";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);

    $('.slider-container').on('afterChange', function (event, slick, currentSlide) {
        var idx = currentSlide;
        $.each($('#ddlPumpView option'), function (i, val) {
            if ($(val).attr('data-id') == idx) {
                $(val).prop('selected', true);
            }
        });
    });
});

function ChangeMOVView() {
    var idx = $('#ddlMovView option:selected').attr('data-id');
    $('.slider-container').slick('slickGoTo', idx, false);
}

function ExtraActivities(model) {

}

function OpenMOVModal(MOVId, MOVName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetMOVDetailsView?MOVId=" + MOVId,
        cache: false,
        success: function (result) {
            $('#myMOVModal').html(result);
            $('#myMOVModal').modal('show');
            $('#myMOVModal').draggable();
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myMOVModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 0);
        }
    });
}


function ValidateAutoManualChange(src, TagToWrite, UserID, LoginID, UserName, currValDesc) {
    //if ($('#myMOVModalBody .remote_img_mov_true').length <= 0
    //    && $(src).attr('data-opcvalue').toUpperCase() == "FALSE") {
    //    alertDismissable('danger', 'MOV should have Remote Select feedback to work in AUTO mode.');
    //}

    if ($('#hdnTankAutoMan').attr('data-opcvalue').toUpperCase() == "TRUE"
        && $(src).attr('data-opcvalue').toUpperCase() == "TRUE") {
        alertDismissable('danger', 'Tank is in AUTO mode. Change Tank control to Manual first.');
        return;
    }


    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
}

function ValidateOpenClose(src, TagToWrite, UserID, LoginID, UserName, currValDesc) {
    if ($('#myMOVModalBody div.chng_automan_mov_true').length > 0) {
        alertDismissable('danger', 'MOV is in AUTO mode. Cannot send command');
        return;
    }

    //if ($('#myMOVModalBody .remote_img_mov_true').length <= 0) {
    //    alertDismissable('danger', 'MOV should have Remote Select feedback for command to be executed.');
    //}
    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName, currValDesc);
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

function ValidateOpenPercent(src, TagToWrite, UserID, LoginID, UserName) {
    if (parseFloat($('#txtOpenPercent').val()) < 0 || parseFloat($('#txtOpenPercent').val()) > 100 || parseFloat($('#txtOpenPercent').val()).toString() == "NaN") {
        alertDismissable("danger", "Open Percent must be in XX.X format between 00.1 to 99.9");
        return false;
    }
    $(src).attr('data-opcvalue', parseFloat($('#txtOpenPercent').val()).toFixed(1));
    SendDataToOPC(src, TagToWrite, UserID, LoginID, UserName);
}


function OpenAutoManModal(src, hdnTankId, MovDetails, ClassName, TagName, UserID, LoginID, UserName) {

    if (hdnTankId != '') {
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
    $('#AutoManModal').draggable();
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $.ajax({
            type: "GET",
            url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Change Local /Remote Mode",
            cache: false,
            success: function (result) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage);
                    ShowPasswordModal("Change Mode", function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, ApproverId, "", "", "");
                        $('#AutoManModal').modal('hide');
                    }, "Change Local /Remote Mode");
                }
                else {
                    SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                    $('#AutoManModal').modal('hide');
                }
            }
        });
    });
}