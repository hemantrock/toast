var ddlOptions = "";
var LevelTag = "_LEVEL";
var PercentLevelTag = "_PER_LVL";

$(document).ready(function () {
    opcPageName = "TankView.*";
    InitConn(opcPageName, 0);
    if ($('#jqxtabs') != undefined && $('#jqxtabs') != null && $('#jqxtabs').length > 0)
    {
        $('#jqxtabs').jqxTabs({ width: '100%', height: '100%', position: 'top' });
        //$('#jqxtabs').jqxTabs('focus');
        //$('#jqxtabs').jqxTabs({ selectionTracker: true });
        //$('#jqxtabs').jqxTabs({ animationType: 'fade' });
    }


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
    opc.server.readPageTags(opcPageName);

});


function ExtraActivities(model) {
    $.each(model, function (i, item) {
        if (item.ControlName.toUpperCase().indexOf('AUTOMAN') >= 0 && item.Value != null && item.Value != undefined) {
            EnableTankModeDDL(item);
        }
        if (item.ControlName.toUpperCase().indexOf('_LEVEL_RATE') >= 0 && item.Value != null && item.Value != undefined) {
            var elem = $('.' + item.ControlName.toUpperCase());
            if (elem != undefined)
            {
                var LvlRate = parseInt(elem.val());
                if (LvlRate < 0) {
                    elem.siblings().removeClass("fa fa-arrow-up");
                    elem.siblings().addClass("fa fa-arrow-down");
                } else if (LvlRate > 0) {
                    elem.siblings().removeClass("fa fa-arrow-down");
                    elem.siblings().addClass("fa fa-arrow-up");
                } else {
                    elem.siblings().removeClass("fa fa-arrow-down");
                    elem.siblings().removeClass("fa fa-arrow-up")
                }
            }
            
        }
    });
    UpdatePercentage();
}

function UpdateTankLvlSetPoints(src, TagName, tankName, UserID, LoginID, UserName) {
    var prev=0;
    if ($('.' + TagName) != undefined && $('.' + TagName).attr('data-opcvalue') != undefined && $('.' + TagName).attr('data-opcvalue') != '?')
    {
        prev = $('.editable-input.' + TagName).attr('data-opcvalue');
    }
    var NewVal = $('.editable-input.' + TagName).val();
    if (prev == NewVal) { alertDismissable('info', 'Previous and current values are the same'); }
    else {
       
        var activityName = "Update Tank Level SetPoints";
        var activityDetail = "Tank: " + tankName + "; Existing Value:" + prev + " New Value :" + NewVal;
        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, CurrUserID, LoginID, UserName, NewVal, true, false);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function ()
                    {
                        opc.server.sendDataToOPC(TagName, prev, opcPageName, CurrUserID, LoginID, UserName, NewVal, true, false);
                    }, activityName, activityDetail);
                }
            }
        });
    }
}

function EnableTankModeDDL(tag)
{
    var Automan = $('.' + tag.ControlName).attr('data-opcvalue');
    if (Automan != undefined && Automan != null && Automan.toUpperCase() == "FALSE") {
        $('#ddlTankMode').removeAttr('disabled');
    }
    else {
        $('#ddlTankMode').attr('disabled', 'disabled');
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
        var level = parseFloat($('.' + tankNo + LevelTag).first().text());
        if (height > 0 && level>=0  && level<=height) {
            var percentage = ((level / height) * 100).toFixed(0);
            $('.' + tankNo + PercentLevelTag).text('' + percentage + '');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (((level / height) * 100)).toFixed(0) + '%');
        }
        else {
            $('.' + tankNo + PercentLevelTag).text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
        }
    });
}

function checkLevelRate(model) {
    $.each(model, function (i, itm) {
        if (itm.ControlName.toUpperCase().indexOf('_LEVEL_RATE') >= 0 && itm.Value != null && itm.Value != undefined) {
            console.log($(this).val());
        }
    });
     
}

function fillDDLTankMode(TankId)
{
    $('#ddlTankMode').html('');
    var r = "<option selected value=0>Select Mode</option>";
    $('#ddlTankMode').append(r);
    var thisTankModes = ddlTankModes.filter(function (el) {
        return el.TankID == TankId;
    });
    $.each(thisTankModes, function (i, obj) {
        r = "<option value=" + obj.ModeId + ">" + obj.ModeDesc + "</option>";
        $('#ddlTankMode').append(r);
    });
}

function OpenTankViewModal(TankId, TankPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetTankDetailsView?tankId=" + TankId,
        cache: false,
        success: function (result) {
            $('#myTANKVIEWModal').html(result);
            opc.server.getPageData(TankPageName, 0);
            fillDDLTankMode(TankId);
            $('#myTANKVIEWModal').modal('show');
            $('#myTANKVIEWModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myTANKVIEWModal').modal('hide');
            });
        }
    });
    opcPageName = opcPageName + "," + TankPageName;
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

function ChangeTankMode(src, TankUnqId, TagName, AutoManTag, UserID, LoginID, UserName) {
    
    var Auto = ($('.' + AutoManTag).attr('data-opcvalue'));
    if (Auto == undefined || Auto == null) { alertDismissable('danger', 'Tank Mode unknown. Tank must be in Manual mode to set New Tank Mode.'); return; }
    if (Auto != undefined && Auto != null && Auto=='True') { alertDismissable('danger', 'Tank must be in Manual mode to set New Tank Mode.'); return; }

    var prevValue = $(src).attr('data-opcvalue');
    var modeValue = $('#ddlTankMode option:selected').val();

    if (modeValue== undefined || modeValue == 0) {
        alertDismissable("danger", "Please select Proper Tank Mode for Auto Operation.");
        return;
    }

    if (prevValue == modeValue) {
        alertDismissable("danger", "Tank is already in same Mode. Can't change Tank mode.");
        return;
    }
   
    opc.server.validateTankMode(TankUnqId, modeValue, TagName, UserID);
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
            ValidateTanksModePermission(TankUnqId, TagName, UserID, result);
        });
    }
    else {
        alertDismissable(result.strType, result.strMessage);
    }
}

function ValidateTanksModePermission(TankUnqId, TagName, UserID, result)
{
    var existingValue = "";
    if ($('#aChangeMode').attr('data-opcvalue') != undefined) {
        existingValue = $('#aChangeMode').attr('data-opcvalue');
    }
    $('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var activityName = "Change Tank Mode Authorize";
    var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#ddlTankMode option:selected').text();

    //$('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var src = $('#aChangeMode');
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
                    if (result.blnStatus == true) {
                        SendDataToOPC(src, TagName, UserID, "", "", $('#ddlTankMode option:selected').text());
                        TakeTankDetailsSnapshot(TankUnqId, TagName, UserID, result);
                    }
                }
            }
            else {
                ShowPasswordModalForReqTrn("Change Tank Mode", function (ApproverId) {
                    SendDataToOPC(src, TagName, ApproverId, "", "", $('#ddlTankMode option:selected').text());
                    TakeTankDetailsSnapshot(TankUnqId, TagName, UserID, result);
                }, activityName, activityDetail);
            }
        }
    });
}

function TakeTankDetailsSnapshot(TankUnqId, TagName, UserID, result)
{
    $.ajax({
        type: "GET",
        url: "/PlantView/TakeTankDetailsSnapshot?tankId=" + TankUnqId,
        cache: false,
        success: function (result) {
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
    opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, UserID);
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
            ValidateTankAutoManualPermission(TankUnqId, TagName, UserID, result);
        });
    }
    else {
        alertDismissable(result.strType, result.strMessage);
    }
}

function ValidateTankAutoManualPermission(TankUnqId, TagName, UserID, result) {
    var src = $('#aChangeAutoManual');
    var activityName = "Change Tank Mode Authorize";
    var activityDetail = "Tank ID:" + TankUnqId;

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
                    SendDataToOPC(src, TagName, UserID, "", "", "");
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagName, ApproverId, "", "", "");
                }, activityName, activityDetail);
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
        ddlValue = $('.' + TagName.replace("AUTOMAN", "MODE_CLS")).attr('data-opcvalue');
    }
    var modeValue = $('.' + TagName.replace("AUTOMAN", "MODE_CLS")).attr('data-opcvalue'); // OPC Mode Value
    if ((ddlValue == null || ddlValue == undefined || ddlValue == 0) || modeValue!=ddlValue) {
        alertDismissable("danger", "Tank mode is not set. Please set the new selected mode.");
        return;
    }

    //if (ddlValue == undefined || ddlValue == 0 || ddlValue == null) { alertDismissable("danger", "Tank mode is not set. Please set the new selected mode."); }

    opc.server.getPageData(opcPageName, 50);
    $('#AutoManModal #AutoManLabel').html(TankDetails + ' - Change Control');
    $('#AutoManModal').modal('show');
    $('#AutoManModal').draggable({ handle: ".modal-header" });
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, UserID);
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

function ByPassGantryShutdown(Details, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "ByPass Gantry Shutdown";
    var activityDetail = "ByPass Gantry Shutdown: " + Details;

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