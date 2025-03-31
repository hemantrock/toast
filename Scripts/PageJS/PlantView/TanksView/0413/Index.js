var sameGrptags = "";
var LevelTag = "_LEVEL";
var VolumeTag = "_TOV";
var PercentLevelTag = "_PER_LVL";
var PercentVolumeTag = "_PER_VOL";

$(document).ready(function () {
    GetTankMode();
    createTooltip();
});

function ExtraActivities(model) {
    $.each(model, function (i, item) {
        if (item.ControlName.toUpperCase().indexOf('_FLOW_RATE') >= 0 && item.Value != null && item.Value != undefined) {
            var elem = $('.' + item.ControlName.replace('_FLOW_RATE', '_FLW_RATE').toUpperCase());
            if (elem != undefined)
            {
                var FlowRate = parseFloat(item.Value);
                if (FlowRate < -2) {
                    elem.removeClass("up");
                    elem.addClass("down");
                } else if (FlowRate > 2) {
                    elem.removeClass("down");
                    elem.addClass("up");
                } else {
                    elem.removeClass("down");
                    elem.removeClass("up")
                }
            }
        }
        //Commented on 04-Jan-2022
        //if (item.ControlName.toUpperCase().indexOf('_LEVEL') >= 0 && item.Value != null && item.Value != undefined) {
            //UpdateLevelPer(item.ControlName.toUpperCase());
        //}
        if ((item.ControlName.toUpperCase().indexOf('PER_LVL') >= 0 || item.ControlName.toUpperCase().indexOf('PER_MAX') >= 0)
            && item.Value != null && item.Value != undefined) {
            UpdateTankFill(item);
        }
    });
    //UpdatePercentage();
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
    //The Idea of below was to disable a Tank in AutoMode but no longer used.
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
//    if (clsName.toUpperCase().search("MODE") >= 0) {
//        $.each($('.' + clsName + " span"), function (i, ele) {
//            $(ele).attr('data-opcvalue', value);
//            for (mode in ddlTankModes) {
//                if (ddlTankModes[mode].ModeId == value) {
//                    result = ddlTankModes[mode].ModeDesc;
//                    break;
//                }
//            }
//            if (result != null && result != 'undefined') {
//                $(ele).text(result);
//                $(ele).val(value);
//            }
//        });
//    } else if (clsName.toUpperCase().search("SEQNO") >= 0 && value != null && value!=undefined) {
//        $.each($('.' + clsName + " span"), function (i, ele) {
//            $(ele).attr('data-opcvalue', value);
//            $(ele).text("Seq-" + value.toString().padStart(2, '0'));
//            $(ele).val(value);
//        });
//    }

//}

function UpdatePercentage() {
    $.each($('.chdnHeight'), function (i, hdn) {
        var tankNo = $(this).data('id');
        var height = parseFloat($(this).val());
        if (!height) { height = $(this).data('sfl') }
        var maxVol = parseFloat($(this).data('maxvol'));
        var level = parseFloat($('.' + tankNo + LevelTag).first().text());
        var Volume = parseFloat($('.' + tankNo + VolumeTag).first().text());
        var SecLvl = parseFloat($('.' + tankNo + "_SEC_LEVEL").first().text());
        if (height > 0 && level>=0  && level<=height) {
            var percentage = ((level / height) * 100).toFixed(0);
            $('.' + tankNo + PercentLevelTag).text('' + percentage + '');
            if (maxVol > 0 && Volume >= 0 && Volume <= maxVol) {
                var perVol = ((Volume / maxVol) * 100).toFixed(0);
                $('.' + tankNo + PercentVolumeTag).text('' + perVol + '');
            }
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
            if (level > height) { alertDismissable('danger', tankNo + '; Level: ' + level + '; Tank Height: ' + height) }
            if (Volume > maxVol) { alertDismissable('danger', tankNo + '; Volume: ' + Volume + '; Max Volume: ' + maxVol) }
            $('.' + tankNo + PercentLevelTag).text('0');
            $('.' + tankNo + PercentVolumeTag).text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
            $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
            $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
        }
    });
}

// BP-2020-03-19 - New Code to avoid unnecessary execution of all tags.
function UpdateLevelPer(strCtrlName) {
    var tankNo = strCtrlName.replace('_LEVEL', '');
    var MastElem = $(".chdnHeight." + strCtrlName.replace('_LEVEL', '_LVL_HHH') + "");
    var PercVal = $('.' + tankNo + PercentLevelTag).attr('data-opcvalue');
    if (MastElem != undefined && PercVal==undefined)
    {
        var tankNo = $(MastElem).data('id');
        if (tankNo == undefined) { tankNo = strCtrlName.replace('_LEVEL', ''); }
        var height = parseFloat($(MastElem).val());
        if (!height) { height = $(MastElem).data('sfl') }
        var maxVol = parseFloat($(MastElem).data('maxvol'));
        var level = parseFloat($('.' + tankNo + LevelTag).first().text());
        var Volume = parseFloat($('.' + tankNo + VolumeTag).first().text());
        var SecLvl = parseFloat($('.' + tankNo + "_SEC_LEVEL").first().text());
        if (height > 0 && level >= 0) //&& level <= height - Commented on 17-Feb-2021 to allow more than 100% filling.
        {
            if (level > height) { alertDismissable('danger', tankNo + '; Level: ' + level + '; Tank Height: ' + height) }
            if (Volume > maxVol) { alertDismissable('danger', tankNo + '; Volume: ' + Volume + '; Max Volume: ' + maxVol) }
            var percentage = ((level / height) * 100).toFixed(0);
            $('.' + tankNo + PercentLevelTag).text('' + percentage + '');
            if (maxVol > 0 && Volume >= 0 && Volume <= maxVol) {
                var perVol = ((Volume / maxVol) * 100).toFixed(0);
                $('.' + tankNo + PercentVolumeTag).text('' + perVol + '');
            }
            var perc = ((level / height) * 100);
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (perc).toFixed(0) + '%');
            var svgFillTag = tankNo + '_SVG_OIL_TANK_FILL';
            var svgFillEle = $('#' + svgFillTag);
            if (svgFillEle != undefined || svgFillEle != null)
            {
                if (typeof tnkFill !== 'undefined' && tnkFill != undefined && tnkFill != null)
                {
                    const otnkFill = tnkFill.find(o => o.tag == svgFillTag);
                    if (otnkFill != undefined && otnkFill != null)
                    { svgFillEle.css('transform', "translateY(" + -1 * otnkFill.factor * perc + "px)"); }
                    else { svgFillEle.css('transform', "scaleY(" + perc + ")"); }
                }
                    //else { svgFillEle.css('transform', "scaleY(" + (perc/100) + ")"); }
                else { svgFillEle.css('transform-origin', "bottom center"); svgFillEle.css('transform', "scaleY(" + (perc / 100) + ")"); }
            }
            if (SecLvl > 0) {
                var LvlDiff = parseFloat(level - SecLvl);
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text(LvlDiff)
                var elem = $('.' + tankNo + '_PRI_SEC_DIFF_ALERT');
                elem.removeClass("alert_bad");
                if (LvlDiff > 5 || LvlDiff < -5) {
                    elem.removeClass("alert_false");
                    elem.addClass("alert_true");
                }
                else {
                    elem.removeClass("alert_true");
                    elem.addClass("alert_false");
                }
            }
            else {
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
                $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
            }
        }
        else {
            if (level > height) { alertDismissable('danger', tankNo + '; Level: ' + level + '; Tank Height: ' + height) }
            if (Volume > maxVol) { alertDismissable('danger', tankNo + '; Volume: ' + Volume + '; Max Volume: ' + maxVol) }
            $('.' + tankNo + PercentLevelTag).text('0');
            $('.' + tankNo + PercentVolumeTag).text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
            $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
            $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
        }
    }
}

function UpdateTankFill(item) {
    var perc = parseFloat(item.Value);
    var tankNo = item.ControlName.replace('_PER_LVL', '').replace('_PER_MAX', '').toUpperCase()
    $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (perc).toFixed(0) + '%');
    var svgFillTag = tankNo + '_SVG_OIL_TANK_FILL';
    var svgFillEle = $('#' + svgFillTag);
    if (svgFillEle != undefined || svgFillEle != null) {
        if (typeof tnkFill !== 'undefined' && tnkFill != undefined && tnkFill != null) {
            const otnkFill = tnkFill.find(o => o.tag == svgFillTag);
            if (otnkFill != undefined && otnkFill != null)
            { svgFillEle.css('transform', "translateY(" + -1 * otnkFill.factor * perc + "px)"); }
            else { svgFillEle.css('transform', "scaleY(" + perc + ")"); }
        }
        else { svgFillEle.css('transform-origin', "bottom center"); svgFillEle.css('transform', "scaleY(" + (perc / 100) + ")"); }
    }
    //Added on 04-Jan-2022
    if (item.ControlType == 3) {
        $('.' + item.ControlName).text(item.Value);
    }
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
}

function OpenTankViewModal(TankId, TankPageName) {
    console.log('TankPageName:' + TankPageName);
    $.ajax({
        type: "GET",
        url: "/PlantView/GetTankDetailsView?tankId=" + TankId,
        cache: false,
        success: function (result) {
            $('#myTANKVIEWModal').html(result);
            $('#myTANKVIEWModal').modal('show');
            $('#myTANKVIEWModal').draggable({ handle: ".modal-header" });
            fillDDLTankMode(TankId);
            opc.server.getPageData(TankPageName, 0);
            if (CustomerName == 'HPCL') { $('#ddlTankMode').removeAttr('disabled'); }
            $(".myTANKVIEWModal").css({
                top: 0,
                left: 0
            });
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
            opc.server.readPageTags(opcPageName);
        }
    });
    opcPageName = opcPageName + "," + TankPageName;
    //BP-Removed this on 26-Nov-2019
    //opc.server.readPageTags(opcPageName);
}

function ResetTankAlarms(src, TankName, UserID, LoginID, UserName)
{
    UpdateActivityTime();
    opc.server.resetTankAlarms(TankName, opcPageName, UserID, LoginID, UserName);
}

function ChangeTankMode(src, TankUnqId, TagName, AutoManTag, UserID, LoginID, UserName) {
    
    //if (CustomerName != 'HPCL')
    //{
    //    var Auto = ($('.' + AutoManTag).attr('data-opcvalue'));
    //    if (Auto == undefined || Auto == null) { alertDismissable('danger', 'Tank Mode unknown. Tank must be in Manual mode to set New Tank Mode.'); return; }
    //    if (Auto != undefined && Auto != null && Auto == 'True') { alertDismissable('danger', 'Tank must be in Manual mode to set New Tank Mode.'); return; }
    //}
    var prevValue = $('#ddlTankMode').attr('data-opcvalue');
    var modeValue = $('#ddlTankMode option:selected').val();

    if (modeValue == undefined || modeValue == 0) {
        alertDismissable("danger", "Please select Proper Tank Mode for Auto Operation.");
        return;
    }

    if (prevValue == modeValue) {
        alertDismissable("danger", "Tank is already in same Mode. Can't change Tank mode.");
        return;
    }
   
    //opc.server.validateTankMode(TankUnqId, modeValue, TagName, UserID);
    opc.server.validateTankMode(TankUnqId, modeValue, TagName, UserID, prevValue);
}

function ConfirmTankModeChange(TankUnqId, TagName, UserID, result)
{
    var modeValue = $('#ddlTankMode option:selected').val();
    if (result.blnStatus == true) {
        var strMsg = "Are you sure to change the Mode?";
        obj = ddlTankModes.find(o => o.ModeId === parseInt(modeValue));
        if(obj==undefined){ alertDismissable("danger", "Invalid Tank Mode. Can't change Tank mode."); return; }
        if (obj.TASModeID == 5) {
            strMsg = "Dispatch Valve of the tank if open will be closed. <br>Is Gauging & Sampling Done?" ;
        }
        else if (obj.TASModeID == 2) {
            strMsg = "Is Tank Quality Certified?";
        }
        else {
            var prevValue = $('#ddlTankMode').attr('data-opcvalue');
            Prevobj = ddlTankModes.find(o => o.ModeId === parseInt(prevValue));
            if(Prevobj!=undefined && obj.TASModeID == 4) // New Mdode is Dormant
            {
                if(Prevobj.TASModeID == 2) // Prev Mode: Dispatch
                {
                    var textToshow = $('.disp-mode .chng-text').attr('disp-text');
                    if (textToshow != undefined) { strMsg = textToshow; }
                }
                else if(Prevobj.TASModeID == 5) // Prev Mode: Receipt
                {
                    var textToshow = $('.rcpt-mode .chng-text').attr('rcpt-text');
                    if (textToshow != undefined) { strMsg = textToshow; }
                }
            }
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
    if ($('#ddlTankMode').attr('data-opcvalue') != undefined) {
        var existingID = $('#ddlTankMode').attr('data-opcvalue');
        obj = ddlTankModes.find(o => o.ModeId === parseInt(existingID));
        if(obj != null || obj != undefined) {
            existingValue = obj.ModeDesc;}
    }
    //$('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var NewVal = $('#ddlTankMode option:selected').val();
    var activityName = "Change Tank Mode Authorize";
    var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#ddlTankMode option:selected').text();

    //$('#aChangeMode').attr('data-opcvalue', $('#ddlTankMode option:selected').val());
    var src = $('#Mode');
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
                    opc.server.sendDataToOPC(TagName, existingValue, opcPageName, UserID, "", "", NewVal, true, false);
                    TankModeChangeExtraWorks(TagName, existingValue, opcPageName, UserID, NewVal);
                }
            }
            else {
                ShowPasswordModalForReqTrn("Change Tank Mode", function (ApproverId) {
                    opc.server.sendDataToOPC(TagName, existingValue, opcPageName, UserID, "", "", NewVal, true, false);
                    TankModeChangeExtraWorks(TagName, existingValue, opcPageName, UserID, NewVal);
                }, activityName, activityDetail);
            }
        }
    });
}

function TankModeChangeExtraWorks(TagName, existingValue, opcPageName, UserID, NewVal)
{ }

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
    var modeValue = $('#ddlTankMode').attr('data-opcvalue'); // OPC Mode Value
    if (ddlValue != modeValue) {
        alertDismissable("danger", "Tank mode selected is not set/Changed. Please set the new selected mode");
        return;
    }
    opc.server.validateTankAutoManual(TankUnqId, prevValue, ddlValue, TagName, UserID, modeValue);
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

function OpenTankAutoManModal(src, TankUnqId, TankDetails, TagName, UserID, LoginID, UserName) {

    $.each($("#TankAutoManModal .TANK_AUTOMAN"), function (index, ele) {
        removeClasses(ele, "TANK_AUTOMAN_");
        removeClasses(ele, "tankautoman");
    });
    //$("#TankAutoManModal").removeClass("TANK_AUTOMAN_");
    $("#TankAutoManModal .TANK_AUTOMAN").addClass(TagName);
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

function SetTankSeqNo(TankUnqId, SeqTagName, ModeTagName, tankName, UserID, LoginID, UserName) {
    var src = $('.' + SeqTagName);
    var prevSeqValue = src.attr('data-opcvalue');
    var NewSeqValue = $('.' + SeqTagName +' option:selected').val();
    var CurrModeValue = $('.' + ModeTagName).attr('data-opcvalue');

    if (prevSeqValue == NewSeqValue) {
        alertDismissable("danger", "Tank is already in same Sequence. Can't change Sequence.");
        return;
    }
    var activityName = "Change Tank Sequence No";
    var activityDetail = "Tank:" + tankName;
    $.ajax({
        url: "/PlantView/ValidateSetTankSeqNo",
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        cache: false,
        data: JSON.stringify({ "TankUnqId": TankUnqId, "NewSeqValue": NewSeqValue, "CurrModeVal": CurrModeValue }),
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage); return;
            }
            else {
                SetSeqNo(activityName, activityDetail, src, SeqTagName, "DDL", UserID, LoginID, UserName);
            }
        }
    });
}

function SetSeqNo(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName) {
    var activityName = ActName;
    var activityDetail = ActDet;
    var CurrVal = $('.' + ControlName + ' option:selected').val();

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
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName, CurrVal);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName, CurrVal);
                    setTimeout(function () { opc.server.sendDataToOPC(ControlName.replace('_DDL', '') + '_CONFIRM', $(src).attr('data-opcvalue'), opcPageName, UserID, LoginID, UserName, CurrVal, false, false) }, 1000);
                }, activityName, activityDetail);
            }
        }
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