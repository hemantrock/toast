var ddlOptions = ""; var sameGrptags = "";
var LevelTag = "_LEVEL";
var PercentLevelTag = "_PER_LVL";

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
    //opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {
    $.each(model, function (i, item) {
        if (item.ControlName.toUpperCase().indexOf('AUTOMAN') >= 0 && item.Value != null && item.Value != undefined) {
            //EnableTankModeDDL(item);
        }
        if (item.ControlName.toUpperCase().indexOf('_DISP_CFM') >= 0 && item.Value != null && item.Value != undefined) {
            $("#tkcfm").trigger("change");
        }
        //if (item.ControlName.toUpperCase().indexOf('_LEVEL_RATE') >= 0 && item.Value != null && item.Value != undefined) {
        //    var elem = $('.' + item.ControlName.replace('_LEVEL_RATE', '_LVL_RATE').toUpperCase());
        if (item.ControlName.toUpperCase().indexOf('_FLOW_RATE') >= 0 && item.Value != null && item.Value != undefined) {
            var elem = $('.' + item.ControlName.replace('_FLOW_RATE', '_FLW_RATE').toUpperCase());
            if (elem != undefined)
            {
                var FlowRate = parseFloat(item.Value);
                if (FlowRate < -6) {
                    elem.removeClass("up");
                    elem.addClass("down");
                } else if (FlowRate > 6) {
                    elem.removeClass("down");
                    elem.addClass("up");
                } else {
                    elem.removeClass("down");
                    elem.removeClass("up")
                }
            }
            
        }
    });
    UpdatePercentage();
    //checkLevelRate(model);
    UpdateInterlocks();
}

function UpdateTankLvlSetPoints(src, TagName, tankName, UserID, LoginID, UserName) {
    var prev = 0;
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
                    opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function ()
                    {
                        opc.server.sendDataToOPC(TagName, prev, opcPageName, UserID, LoginID, UserName, NewVal, true, false);
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
//            $(ele).val(value);
//        }
//    });
//}

function UpdatePercentage() {
    $.each($('.hdnHeight'), function (i, hdn) {
        var tankNo = $(this).data('id');
        var height = parseFloat($(this).val());
        var level = parseFloat($('.' + tankNo + LevelTag).first().text());
        var SecLvl = parseFloat($('.' + tankNo + "_SEC_LEVEL").first().text());
        if (height > 0 && level>=0  && level<=height) {
            var percentage = ((level / height) * 100).toFixed(0);
            $('.' + tankNo + PercentLevelTag).text('' + percentage + '');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (((level / height) * 100)).toFixed(0) + '%');
            if(SecLvl>0)
            {
                var LvlDiff = parseFloat(level - SecLvl);
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text(LvlDiff)
                var elem = $('.' + tankNo + '_PRI_SEC_DIFF_ALERT');
                elem.removeClass("alert_bad");
                if (LvlDiff > 5 || LvlDiff < -5)
                {
                    elem.removeClass("alert_false");
                    elem.addClass("alert_true");
                }
                else {
                    elem.removeClass("alert_true");
                    elem.addClass("alert_false");
                }
            }
            else
            {
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
                $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
            }
        }
        else {
            if (level > height) { alertDismissable('danger',tankNo + '; Level: ' + level + '; Tank Height: ' + height) }
            $('.' + tankNo + PercentLevelTag).text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
            $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
            $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
        }
    });
}

function UpdateInterlocks() {
    if ($('#ddlInterlockMode') == undefined) { return; }
    if (sameGrptags.length < 1) { return; }
    var ModesToCheck = [2,5];
    $.each(ModesToCheck, function (i, selMode) {
        var NotinSameMode = true;
        $.each(sameGrptags, function (i, item) {
            var OthTank = $('.' + item.value);
            if (OthTank == undefined) { return;}
            var OthTankMode = $('.' + item.value).attr('data-opcvalue');
            if (OthTankMode != selMode) { NotinSameMode = (NotinSameMode & true); }
            else { NotinSameMode = false;}
        });
        $('.tanksInSameMode_' + selMode).removeClass('status_true');
        $('.tanksInSameMode_' + selMode).removeClass('status_false');
        $('.tanksInSameMode_' + selMode).addClass('status_' + Boolean(NotinSameMode).toString().toLowerCase());
        $('.tanksInSameMode_' + selMode).attr('data-opcvalue', Boolean(NotinSameMode));
    });
    $.each($('.interlock-sts'), function (i, hdn) {
        //val 
        var currVal = $(hdn).find('.curr').attr('data-opcvalue');
        var ComprVal = $(hdn).find('.cmpr').attr('data-opcvalue');
        if(currVal==ComprVal)
        {
            $(hdn).find('.result-val').removeClass('cross');
            $(hdn).find('.result-val').addClass('tick');
        }
        else {
            $(hdn).find('.result-val').removeClass('tick');
            $(hdn).find('.result-val').addClass('cross');
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
    $('#ddlInterlockMode').html('');
    var r = "<option selected value=0>Select Mode</option>";
    $('#ddlTankMode').append(r);
    var thisTankModes = ddlTankModes.filter(function (el) {
        return el.TankID == TankId;
    });
    $.each(thisTankModes, function (i, obj) {
        r = "<option value=" + obj.ModeId + ">" + obj.ModeDesc + "</option>";
        $('#ddlTankMode').append(r);
        $('#ddlInterlockMode').append(r);
    });
    //$('#ddlInterlockMode').selectedIndex = 1;
    //$('#ddlInterlockMode').trigger('change');
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
            if (CustomerName == 'HPCL') { $('#ddlTankMode').removeAttr('disabled'); }
            $(".myTANKVIEWModal").css({
                top: 0,
                left: 0
            });
            $('#myTANKVIEWModal').modal('show');
            $('#myTANKVIEWModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myTANKVIEWModal').modal('hide');
            });
            sameGrptags = $('#SameGrpTankModeTags');
            if (sameGrptags != undefined && sameGrptags!="" && sameGrptags.length > 0 && sameGrptags.val().indexOf(',') > 0)
            {
                sameGrptags = sameGrptags.val().split(',');
            }
            UpdateInterlocks();
        }
    });
    opcPageName = opcPageName + "," + TankPageName;
    opc.server.readPageTags(opcPageName);
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
    
    if (CustomerName != 'HPCL')
    {
        var Auto = ($('.' + AutoManTag).attr('data-opcvalue'));
        if (Auto == undefined || Auto == null) { alertDismissable('danger', 'Tank Mode unknown. Tank must be in Manual mode to set New Tank Mode.'); return; }
        if (Auto != undefined && Auto != null && Auto == 'True') { alertDismissable('danger', 'Tank must be in Manual mode to set New Tank Mode.'); return; }
    }
    //var prevValue = $(src).attr('data-opcvalue');
    var prevValue = $('#ddlTankMode').attr('data-opcvalue');
    var modeValue = $('#ddlTankMode option:selected').val();

    if (modeValue== undefined || modeValue == 0) {
        alertDismissable("danger", "Please select Proper Tank Mode for Auto Operation.");
        return;
    }

    if (modeValue == 5 && $('#tklobp').val() == "") {
        alertDismissable("danger", "For Receipt Mode, LOBP Tank Name must be mentioned.");
        return;
    }

    if (modeValue == 2 && $('#TankMultiDataTxtBox').val().length <= 0) {
        alertDismissable("danger", "For Can Filling Mode, Atleast One Can Filling Machine must be selected.");
        return;
    }

    if (modeValue == 15 && $('#TankMultiDataTxtBox').val().length <= 0) {
        alertDismissable("danger", "For Machine Pigging Mode, Atleast One Can Filling Machine must be selected.");
        return;
    }
   
    if (prevValue == modeValue) {
        var CFMs = $('#TankMultiDataTxtBox').val();
        var NewVal = GetCFMint(CFMs);
        var PrevCFM = $("#tkcfm").val();
        if ((modeValue == 2 || modeValue == 15) && NewVal == PrevCFM) {
            alertDismissable("danger", "Tank and Machines are already in same Mode. Can't change Tank mode.");
            return;
        }
        else if (modeValue != 2) {
            alertDismissable("danger", "Tank is already in same Mode. Can't change Tank mode.");
            return;
        }
    }
    opc.server.validateTankMode(TankUnqId, modeValue, TagName, UserID);
}

function ConfirmTankModeChange(TankUnqId, TagName, UserID, result)
{
    var modeValue = $('#ddlTankMode option:selected').val();

    if (result.blnStatus == true) {
        ValidateTanksModePermission(TankUnqId, TagName, UserID, result);
    }
    else {
        alertDismissable(result.strType, result.strMessage);
    }
}

function ValidateTanksModePermission(TankUnqId, TagName, UserID, result)
{
    var existingValue = "";
    if ($('#ddlTankMode').attr('data-opcvalue') != undefined) {
        var existingID = $('#ddlTankMode').attr('data-opcvalue');
        obj = ddlOptions.find(o => o.ModeId === parseInt(existingID));
        var existingValue = obj.ModeDesc
    }
    $('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var NewVal = $('#ddlTankMode option:selected').val();
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
                        opc.server.sendDataToOPC(TagName, existingValue, opcPageName, UserID, "", "", NewVal, true, false);
                        StoreDetails(TagName,NewVal,UserID);
                        //TakeTankDetailsSnapshot(TankUnqId, TagName, UserID, result);
                    }
                }
            }
            else {
                ShowPasswordModalForReqTrn("Change Tank Mode", function (ApproverId) {
                    opc.server.sendDataToOPC(TagName, existingValue, opcPageName, UserID, "", "", NewVal, true, false);
                    StoreDetails(TagName,NewVal,UserID);
                    //TakeTankDetailsSnapshot(TankUnqId, TagName, UserID, result);
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

function StoreDetails(TagName, ModeID, UserID) {
    var CFMs = $('#TankMultiDataTxtBox').val();
    var LOBPTank = $('#tklobp').val();
    var TankName = $('.clstkname').text();
    if (ModeID == 2 || ModeID == 15)
    {
        var strTagName = TagName.replace('_MODE_DDL', '_DISP_CFM');
        var NewVal = GetCFMint(CFMs);
        opc.server.sendDataToOPC(strTagName, "", opcPageName, UserID, "", "", NewVal, true, false);
    }
    else if (ModeID != 5) { return;}
    $.ajax({
        type: "GET",
        url: "/MachineView/SaveModeData?TankName=" + TankName + "&ModeID=" + ModeID + "&CFMs=" + CFMs + "&LOBPTank=" + LOBPTank,
        cache: false,
        success: function (result) {
        }
    });
}

function GetCFMint(CFMs)
{
    var Val = 0;
    for (var i = 0; i < 5; i++) {
        if(CFMs.indexOf(i.toString())>=0)
        {
            Val = Val+(Math.pow(2,i));
        }
    }
    return Val;
}

function ChangeAutoManualMode(src, TankUnqId, TagName, UserID, LoginID, UserName) {
    //var prevValue = $(src).attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var prevValue = $(src).attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var ddlValue = $('#ddlTankMode option:selected').val(); // Selected Tank Mode
    var modeValue = $('#ddlTankMode').attr('data-opcvalue'); // OPC Mode Prev Value
    if (ddlValue != modeValue) {
        alertDismissable("danger", "Tank mode selected is not set/changed. Please set the new selected mode");
        return;
    }
    opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, UserID);
}

function ConfirmTankAutoManualChange(TankUnqId, TagName, UserID, result)
{
    //var prevValue = $('#aChangeAutoManual').attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var prevValue = $('.' + TagName).attr('data-opcvalue'); // Auto Manual Old / Existing Value

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

function OpenTankAutoManModal(src,TankUnqId, TankDetails, TagName, UserID, LoginID, UserName) {

    $.each($("#TankAutoManModal .TANK_AUTOMAN"), function (index, ele) {
        removeClasses(ele, "TANK_AUTOMAN_");
        removeClasses(ele, "tankautoman");
    });
    //$("#TankAutoManModal").removeClass("TANK_AUTOMAN_");
    $("#TankAutoManModal .TANK_AUTOMAN").addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    
    var prevValue = $('#ddlTankMode').attr('data-opcvalue'); // Auto Manual Old / Existing Value
    var ddlValue = $('#ddlTankMode option:selected').val(); // Selected Tank Mode

    if ($('#ddlTankMode').is(':visible')==false)
    {
        ddlValue = $('.' + TagName.replace("AUTOMAN", "MODE_CLS")).attr('data-opcvalue');
    }
    var modeValue = $('.' + TagName.replace("AUTOMAN", "MODE_CLS")).attr('data-opcvalue'); // OPC Mode Value
    if ((ddlValue == null || ddlValue == undefined || ddlValue == 0) ||
        (modeValue != null && modeValue != undefined && modeValue != ddlValue)) {
        alertDismissable("danger", "Tank mode is not set. Please set the new selected mode.");
        return;
    }

    //if (ddlValue == undefined || ddlValue == 0 || ddlValue == null) { alertDismissable("danger", "Tank mode is not set. Please set the new selected mode."); }

    opc.server.getPageData(opcPageName, 50);
    $('#TankAutoManModal #AutoManLabel').html(TankDetails + ' - Change Control');
    $('#TankAutoManModal').modal('show');
    $('#TankAutoManModal').draggable({handle: ".modal-header"});
    $("#TankAutoManModal #btnAutoManOK").unbind('click');
    $("#TankAutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        //Old Panipat-381 Code
        //opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, UserID);
        //$('#TankAutoManModal').modal('hide');
        //End Panipat 381 Code

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