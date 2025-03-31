var BGEntryPrevStatus = "";
var BGExitPrevStatus = "";
var ddlTruckOptions = "";

$(document).ready(function () {
    opcPageName = "BGView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
     
});

function ExtraActivities(model) {
    //console.log("BG-ExtraActivities")
    OpenCloseBG(model);
}

function OpenCloseBG(model)
{
    $.each(model, function (i, item) {
        if (item.Value != null && (item.ControlName.toUpperCase() == BGEntryPrefix+"_OPN_FB" || item.ControlName.toUpperCase() == BGEntryPrefix+"_CLS_FB"))
        {
            var id = BGEntryPrefix + "_ENT";
            //$('#entryShutter').removeClass('was-close').removeClass('was-open').removeClass('was-unknown');
            $('#' + id).removeClass('was-close').removeClass('was-open').removeClass('was-unknown');

            if (item.ClassName.toLowerCase() == "bg_close") {
                if (item.Value.toUpperCase() == "TRUE") {
                    BGEntryPrevStatus = "close";
                }
                else {
                    if (BGEntryPrevStatus == "close") {
                        //$('#entryShutter').addClass('was-close');
                        $('#' + id).addClass('was-close');
                        //animateShutter(".bg_close_false.was-close", '10s');
                    }
                    else if (BGEntryPrevStatus == "") {
                        //$('#entryShutter').addClass('was-unknown');
                        $('#' + id).addClass('was-unknown');
                    }
                }
            }
            else if (item.ClassName.toLowerCase() == "bg_open") {
                if (item.Value.toUpperCase() == "TRUE") {
                    BGEntryPrevStatus = "open";
                }
                else {
                    if (BGEntryPrevStatus == "open") {
                        //$('#entryShutter').addClass('was-open');
                        $('#' + id).addClass('was-open');
                        //animateShutter(".bg_open_false.was-open", '5s');
                    }
                    else if (BGEntryPrevStatus == "") {
                        //$('#entryShutter').addClass('was-unknown');
                        $('#' + id).addClass('was-unknown');
                    }
                }
            }
        }
        //else if (item.Value != null && (item.ControlName.toUpperCase() == BGExitPrefix + "_OPN_FB" || item.ControlName.toUpperCase() == BGExitPrefix + "_CLS_FB"))
        if (item.Value != null && (item.ControlName.toUpperCase() == BGExitPrefix + "_OPN_FB" || item.ControlName.toUpperCase() == BGExitPrefix + "_CLS_FB"))
        {
            var id = BGExitPrefix + "_EXT";
            //$('#exitShutter').removeClass('was-close').removeClass('was-open').removeClass('was-unknown');
            $('#' + id).removeClass('was-close').removeClass('was-open').removeClass('was-unknown');

            if (item.ClassName.toLowerCase() == "bg_close") {
                if (item.Value.toUpperCase() == "TRUE") {
                    BGExitPrevStatus = "close";
                }
                else {
                    if (BGExitPrevStatus == "close") {
                        //$('#exitShutter').addClass('was-close');
                        $('#' + id).addClass('was-close');
                        //animateShutter(".bg_close_false.was-close", '10s');
                    }
                    else if (BGExitPrevStatus == "") {
                        //$('#exitShutter').addClass('was-unknown');
                        $('#' + id).addClass('was-unknown');
                    }
                }
            }
            else if (item.ClassName.toLowerCase() == "bg_open") {
                if (item.Value.toUpperCase() == "TRUE") {
                    BGExitPrevStatus = "open";
                }
                else {
                    if (BGExitPrevStatus == "open") {
                        //$('#exitShutter').addClass('was-open');
                        $('#' + id).addClass('was-open');
                        //animateShutter(".bg_open_false.was-open", '5s');
                    }
                    else if (BGExitPrevStatus == "") {
                        //$('#exitShutter').addClass('was-unknown');
                        $('#' + id).addClass('was-unknown');
                    }
                }
            }
        }
    });
}

function OpenLocRemModal(TagName, UserID, LoginID, UserName)
{
    //Currently, status taken from PLC
    //return;
    var FindClassName = 'LOCREM_BG';
    $('#LOCREMModal .' + BGEntryPrefix + '_LOCREM').removeClass('bgentry_locrem_false').removeClass('bgentry_locrem_true').removeClass(BGEntryPrefix + '_LOCREM').addClass(TagName);
    $('#LOCREMModal .'+BGExitPrefix+'_LOCREM').removeClass('bgexit_locrem_false').removeClass('bgexit_locrem_true').removeClass(BGExitPrefix+'_LOCREM').addClass(TagName);

    $.each($("#LOCREMModal ." + FindClassName), function (index, ele) {
        removeClasses(ele, "BG");
    });

    $("#LOCREMModal ." + FindClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);

    opc.server.getPageData(opcPageName, 50);
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable({ handle: ".modal-header" });
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change Local /Remote Mode Barrier Gate";
        var activityDetail = "BG: " + TagName.replace('_LOCREM','');

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
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function OpenAutoManModal(BarrierDetails, TagName, UserID, LoginID, UserName) {

    var CurrVal = $('.' + TagName).attr('data-opcvalue');
    if (CurrVal == undefined) { alertDismissable('danger', 'No Connection'); return; }

    $('#AutoManModal .' + BGEntryPrefix + '_AUTOMAN').removeClass('bgentry_automan_false').removeClass('bgentry_automan_true').removeClass('' + BGEntryPrefix + '_AUTOMAN').addClass(TagName);
    $('#AutoManModal .' + BGExitPrefix + '').removeClass('bgexit_automan_false').removeClass('bgexit_automan_true').removeClass('' + BGExitPrefix + '_AUTOMAN').addClass(TagName);

    var FindClassName = 'AUTOMAN_BG';
    $.each($("#AutoManModal ." + FindClassName), function (index, ele) {
        removeClasses(ele, "BG");
    });

    $("#AutoManModal ." + FindClassName).addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);

    opc.server.getPageData(opcPageName, 50);
    $('#AutoManModal #AutoManLabel').html(BarrierDetails + ' - Change Control');
    $('#AutoManModal').modal('show');
    $('#AutoManModal').draggable({ handle: ".modal-header" });
    $("#AutoManModal #btnAutoManOK").unbind('click');
    $("#AutoManModal #btnAutoManOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change Auto/Manual Mode Barrier Gate";
        var activityDetail = "Barrier: " + BarrierDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else
                    {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
                        $('#AutoManModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function ManualOpenCloseBG(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName)
{
    SetProcessValue(ActName, ActDet, src, ControlName, Type, UserID, LoginID, UserName);
}

function SetBGCardNo(activityName, activityDetail, ControlName, SlaveID, DSID, UserID) {
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal <= 0) { alertDismissable('danger', 'Incorrect Card No: ' + CurrVal); return; }
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
                    SetBGCardNoDo(SlaveID, DSID, CurrVal); $('#' + ControlName.replace('CARD_NO', 'GLYPH')).addClass('hide');
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SetBGCardNoDo(SlaveID, DSID, CurrVal); $('#' + ControlName.replace('CARD_NO', 'GLYPH')).addClass('hide');
                }, activityName, activityDetail);
            }
        }
    });
}

function SetBGCardNoDo(SlaveID, DSID, CurrVal) {
    var CardData = {
        'SlaveID': SlaveID,
        'DSID': DSID,
        'CardReaderNo': CurrVal,
    };
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: "/Cards/ForceBGCard",
        data: JSON.stringify(CardData),
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}

function updateGlyphButton(ControlName, glyphID) {
    if (glyphID == undefined) { glyphID = ControlName.replace('CARD_NO','GLYPH'); }
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal > 0) { $('#' + glyphID).removeClass('hide'); }
    else { $('#' + glyphID).addClass('hide'); }
}

function fillTruck(isEntryOpen) {
    $.ajax({
        url: "/PlantView/GetBarrierGateTruck?isEntryOpen=" + isEntryOpen,
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlTruckOptions = result;
            $('#ddlTruck option').remove();
            var r = "";
            r = "<option value=0>--Select Truck--</option>";
            $('#ddlTruck').append(r);
            $.each(ddlTruckOptions, function (i, obj) {
                r = "<option value=" + obj.TruckID + ">" + obj.TruckNumer + "</option>";
                $('#ddlTruck').append(r);
            });
        }
    });
}

function EntryOpenBarrierGateTruckModal(src, TagName, UserID, LoginID, UserName) {
    if ($('.bgentry_automan_true').length > 0) {
        alertDismissable('danger', 'Barrier Gate is in AUTO mode. Cannot send command');
        return;
    }

    $('#BarrierGateTruckModel').modal('show');
    $('#BarrierGateTruckModelLabel').html("Set Truck");
    fillTruck(true);
    $('#BarrierGateTruckModel').draggable({ handle: ".modal-header" });
    $("#btnServiceOK").unbind('click');
    $("#btnServiceOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Open/Close Command to BG";
        var activityDetail = "BG: " + TagName.replace('_SOFT_OPN', '');

        var truckId = $('#ddlTruck').val();
        
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
                        SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                        UpdateTruckStatus(truckId,true);
                        $('#BarrierGateTruckModel').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                        UpdateTruckStatus(truckId,true);
                        $('#BarrierGateTruckModel').modal('hide');

                    }, activityName, activityDetail);
                }
            }
        });

    });
}

function ExitOpenBarrierGateTruckModal(src, TagName, UserID, LoginID, UserName) {
    if ($('.bgexit_automan_true').length > 0) {
        alertDismissable('danger', 'Barrier Gate is in AUTO mode. Cannot send command');
        return;
    }
    $('#BarrierGateTruckModel').modal('show');
    $('#BarrierGateTruckModelLabel').html("Set Truck");
    $('.modal-body p').text('Select a truck and proceed to simulate gate exit and open gate. If no truck is selected only BG gate will open.')
    fillTruck(false);
    $('#BarrierGateTruckModel').draggable({ handle: ".modal-header" });
    $("#btnServiceOK").unbind('click');
    $("#btnServiceOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Open/Close Command to BG";
        var activityDetail = "BG: " + TagName.replace('_SOFT_OPN', '');
        var truckId = $('#ddlTruck').val();
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
                        SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                        UpdateTruckStatus(truckId,false);
                        $('#BarrierGateTruckModel').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                        SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                        UpdateTruckStatus(truckId,false);
                        $('#BarrierGateTruckModel').modal('hide');

                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function UpdateTruckStatus(truckId, isEntryOpen) {
    $.ajax({
        type: "GET",
        url: "/PlantView/SimulateGateEntry?truckId=" + truckId + "&isEntryOpen=" + isEntryOpen,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}