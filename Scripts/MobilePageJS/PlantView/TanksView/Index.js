var ddlOptions = "";

$(document).ready(function () {
    $.ajax({
        url: "/Tanks/GetTanksMode",
        type: "GET",
        datatype: "json",
        cache: false,
        async:false,
        success: function (result) {
            ddlOptions = result;
        }
    });

    opcPageName = "TFMSOverview"; // ABB Tags
    opcPageName1 = "TanksOverview"; //E&H Tags
    opc.server.getPageData(opcPageName1,50);
    opc.server.getPageData(opcPageName, 50);


    $('.slider-container').on('afterChange', function (event, slick, currentSlide) {
        var idx = currentSlide;
        $.each($('#ddlTankView option'), function (i, val) {
            if ($(val).attr('data-id') == idx)
            {
                $(val).prop('selected', true);
            }
        });
    });
    
});

function ChangeTankView()
{
    var idx = $('#ddlTankView option:selected').attr('data-id');
    $('.slider-container').slick('slickGoTo', idx, false);
}

function ExtraActivities(model) {
    EnableTankModeDDL();
}

function EnableTankModeDDL()
{
    if ($('#aChangeAutoManual').attr('data-opcvalue') != null
        && $('#aChangeAutoManual').attr('data-opcvalue') != 'undefined'
        && $('#aChangeAutoManual').attr('data-opcvalue').toUpperCase() == "FALSE") {
        $('#ddlTankMode').removeAttr('disabled');
    }
    else {
        $('#ddlTankMode').attr('disabled','disabled');
    }
}

//function UpdateDDLTextValue(clsName, value)
//{
//    var result;
//    $.each($('.' + clsName + " span"), function (i, ele) {
//        $(ele).attr('data-opcvalue', value);
//        for (mode in ddlOptions) {
//            if (ddlOptions[mode].ModeId == value) {
//                result = ddlOptions[mode].ModeDesc;
//                break;
//            }
//        }
//        if (result != null && result != 'undefined')
//        {
//            $(ele).text(result);
//        }
//    });
//}

function UpdatePercentage() {
    $.each($('.hdnHeight'), function (i, hdn) {
        var tankNo = $(this).data('id');
        var height = parseFloat($(this).val())/100;
        var level = parseFloat($('.'+tankNo+'_PRODUCT_LEVEL').text());
        if (height > 0 && level>=0  && level<=height) {
            var percentage = ((level / height) * 100).toFixed(0);
            $('.'+tankNo+'_PERCENTAGE').text('' + percentage + '');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (((level / height) * 100)).toFixed(0) + '%');
        }
        else {
            $('.' + tankNo + '_PERCENTAGE').text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
        }
    });
}

function fillDDLTankMode(TankId)
{
    $('#ddlTankMode').html('');
    var r = "<option selected value=0>Select Mode</option>";
    $('#ddlTankMode').append(r);
    $.each(ddlOptions, function (i, obj) {
        r = "<option value=" + obj.ModeId + ">" + obj.ModeDesc + "</option>";
        $('#ddlTankMode').append(r);
    });
}

function OpenTANKVIEWModal(TankId) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetTankDetailsView?tankId=" + TankId,
        cache: false,
        success: function (result) {
            $('#myTANKVIEWModal').html(result);
            fillDDLTankMode(TankId);
            $('#myTANKVIEWModal').modal('show');
            $('#myTANKVIEWModal').draggable();
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myTANKVIEWModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 50);
            opc.server.getPageData(opcPageName1,50);
        }
    });
}

function setOPCAttribute(clsName, value)
{
    //$.each($('.' + clsName), function (i, ele) {
    //    $(ele).attr('data-opcvalue', value);
    //});
}

function ResetTankAlarms(src, TankName, UserID, LoginID, UserName)
{
    UpdateActivityTime();
    opc.server.resetTankAlarms(TankName, opcPageName, UserID, LoginID, UserName);
}

function ChangeTankMode(src, TankUnqId, TagName, UserID, LoginID, UserName) {
    var prevValue = $(src).attr('data-opcvalue');
    var modeValue = $('#ddlTankMode option:selected').val();

    if (modeValue==0) {
        alertDismissable("danger", "Please select Proper Tank Mode for Auto Operation.");
        return;
    }

    if (prevValue == modeValue) {
        alertDismissable("danger", "Tank is already in same Mode. Can't change Tank mode.");
        return;
    }
   
    opc.server.validateTankMode(TankUnqId, modeValue, TagName, CurrUserID);
}

function ConfirmTankModeChange(TankUnqId, TagName, UserID, result)
{
    var modeValue = $('#ddlTankMode option:selected').val();

    if (result.blnStatus == true) {
        var strMsg = "";
        if (modeValue == 5) {
            strMsg = "Dispatch Valve of the tank if open will be closed. <br>Is Gauging & Sampling Done?" ;
        }
        else if (modeValue == 2) {
            strMsg = "Is Tank Quality Certified?";
        }
        else {
            strMsg = "Are you sure to change the Mode?";
        }
        $('#myConfirmMsg').html("<p>" + strMsg + "</p>");
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $('#confirmModal').modal('hide');
            ValidateTanksModePermission(TankUnqId, TagName, CurrUserID, result);
        });
    }
    else {
        alertDismissable(result.strType, result.strMessage);
    }
}

function ValidateTanksModePermission(TankUnqId, TagName, UserID, result)
{
    $('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var src = $('#aChangeMode');
    $.ajax({
        type: "GET",
        url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Change Tank Mode Authorize",
        cache: false,
        success: function (result) {
            if (result.strType == "danger") {
                alertDismissable(result.strType, result.strMessage);
                ShowPasswordModal("Change Tank Mode", function (ApproverId) {
                    SendDataToOPC(src, TagName, ApproverId, "", "", $('#ddlTankMode option:selected').text());
                }
                , "Change Tank Mode Authorize");
            }
            else {
                if (result.blnStatus == true) {
                    SendDataToOPC(src, TagName, CurrUserID, "", "", $('#ddlTankMode option:selected').text());
                }
            }
        }
    });
}

function ChangeAutoManualMode(src, TankUnqId, TagName, UserID, LoginID, UserName) {
    var prevValue = $(src).attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var ddlValue = $('#ddlTankMode option:selected').val(); // Selected Tank Mode
    var modeValue = $('#aChangeMode').attr('data-opcvalue'); // OPC Mode Value
    if (ddlValue != modeValue) {
        alertDismissable("danger", "Tank mode selected is not set. Please set the new selected mode");
        return;
    }

    opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, CurrUserID);
}

function ConfirmTankAutoManualChange(TankUnqId, TagName, UserID, result)
{
    var prevValue = $('#aChangeAutoManual').attr('data-opcvalue'); // Auto Manual Old / Existing Value

    if (result.blnStatus == true) {
        var strMsg = "";
        if (prevValue.toUpperCase() == "FALSE") // Manual to Auto
        {
            strMsg = "Tank will be changed to AUTO control. Do you wish to continue?";
        }
        else if (prevValue.toUpperCase() == "TRUE") // Auto to Manual
        {
            strMsg = "Tank will be changed to MANUAL control. Sequencing (if any) will be Stopped. Do you wish to continue?";
        }
        else {
            return;
        }

        $('#myConfirmMsg').html("<p>" + strMsg + "</p>");
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $('#confirmModal').modal('hide');
            ValidateTankAutoManualPermission(TankUnqId, TagName, CurrUserID, result);
        });
    }
    else {
        alertDismissable(result.strType, result.strMessage);
    }
}

function ValidateTankAutoManualPermission(TankUnqId, TagName, UserID, result) {
    var src = $('#aChangeAutoManual');

    $.ajax({
        type: "GET",
        url: "/PlantView/ValidateActivityPermission?UserID=" + CurrUserID + "&strActivityName=Change Tank Mode Authorize",
        cache: false,
        success: function (result) {
            if (result.strType == "danger") {
                alertDismissable(result.strType, result.strMessage);
                ShowPasswordModal("Change Tank Control", function (ApproverId) {
                    SendDataToOPC(src, TagName, ApproverId, "", "", "");
                }
                , "Change Tank Mode Authorize");
            }
            else {
                if (result.blnStatus == true) {
                    SendDataToOPC(src, TagName, CurrUserID, "", "", "");
                }
            }
        }
    });
}

function OpenAutoManModal(src,TankUnqId, TankDetails, TagName, UserID, LoginID, UserName) {

    $.each($("#AutoManModal .TANK_AUTOMAN"), function (index, ele) {
        removeClasses(ele, "TANK_AUTOMAN_");
        removeClasses(ele, "tankautoman");
    });
    //$("#AutoManModal").removeClass("TANK_AUTOMAN_");
    $("#AutoManModal .TANK_AUTOMAN").addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    
    var prevValue = $(src).attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var ddlValue = $('#ddlTankMode option:selected').val(); // Selected Tank Mode

    if ($('#ddlTankMode').is(':visible')==false)
    {
        ddlValue = $('.TANKMODECLS_' + TankDetails).attr('data-opcvalue');
    }
    var modeValue = $('.TANKMODECLS_' + TankDetails).attr('data-opcvalue'); // OPC Mode Value
    if ((ddlValue != null && ddlValue != 'undefined' && ddlValue == 0) || modeValue!=ddlValue) {
        alertDismissable("danger", "Tank mode is not set. Please set the new selected mode.");
        return;
    }

    opc.server.getPageData(opcPageName, 50);

    $('#AutoManModal #AutoManLabel').html(TankDetails + ' - Change Control');
    $('#AutoManModal').modal('show');
    $('#AutoManModal').draggable();
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, CurrUserID);
        $('#AutoManModal').modal('hide');
        //$.ajax({
        //    type: "GET",
        //    url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Change Local /Remote Mode",
        //    cache: false,
        //    success: function (result) {
        //        if (result.strType == "danger") {
        //            alertDismissable(result.strType, result.strMessage);
        //            ShowPasswordModal("Change Mode", function (ApproverId) {
        //                SendDataToOPC($('#hdnAutoMan'), TagName, ApproverId, "", "", "");
        //                $('#AutoManModal').modal('hide'); 
        //            }, "Change Local /Remote Mode");
        //        }
        //        else {
        //            SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
        //            $('#AutoManModal').modal('hide');
        //        }
        //    }
        //});
    });
}