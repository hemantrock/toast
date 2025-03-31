var ddlServiceOptions = "";
var PumpExistingService = "";
var ddlPumpPriorities = "";

$(document).ready(function () {
    
    createTooltip();
    //opcPageName = "PumpsView.*";
    //InitConn(opcPageName, 0);

    //if ($('#jqxtabs') != undefined && $('#jqxtabs') != null && $('#jqxtabs').length > 0) {
    //    $('#jqxtabs').jqxTabs({ width: '100%', height: '100%', position: 'top' });
    //    //$('#jqxtabs').jqxTabs('focus');
    //    //$('#jqxtabs').jqxTabs({ selectionTracker: true });
    //    //$('#jqxtabs').jqxTabs({ animationType: 'fade' });
    //}
    //opc.server.readPageTags(opcPageName);
    //populatePumpServiceData();
    //$("body").delegate(".locrem_bad", "mouseover", function () {
    //    console.log('tooltips');
    //});

    $.ajax({
        url: "/PlantView/GetPumpPriorities",
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlPumpPriorities = result;
        }
    });
});

function populatePumpServiceData() {
    $.ajax({
        url: "/PlantView/GetPumpService",
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlServiceOptions = result;
            fillDDLServices();
        }
    });
}

//function UpdateDDLTextValue(clsName, value) {
//    var result;
//    $.each($('.' + clsName + " span"), function (i, ele) {
//        $(ele).attr('data-opcvalue', value);
//        for (Priority in ddlPumpPriorities) {
//            if (ddlPumpPriorities[Priority].ModeId == value) {
//                result = ddlPumpPriorities[Priority].ModeDesc;
//                break;
//            }
//        }
//        if (result != null && result != 'undefined') {
//            $(ele).text(result);
//        }
//    });
//}


function OpenPumpModal(PumpId, PumpPageName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetPumpDetailsView?PumpId=" + PumpId,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            opc.server.getPageData(PumpPageName, 0);
            $('#myPUMPModal').modal('show');
            PumpExistingService = $('#ddlService option:selected').text();
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
        }
    });
    //if ((opcPageName.indexOf(PumpPageName) == -1) || (!opcPageName.endsWith(PumpPageName, opcPageName.length))) {
    //    opcPageName = opcPageName + "," + PumpPageName;
    //}
}

function OpenBorewellModal(BWId, PumpName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetBorewellDetailsView?BWId=" + BWId,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            $('#myPUMPModal').modal('show');
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 50);
        }
    });
}

function OpenDGModal(DGId, PumpName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetDGDetailsView?DGId=" + DGId,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 50);
        }
    });
}


function OpenSetPointModal(PumpId, SPTag, UserID, LoginID, UserName) {
    $('#txtSetPoint').removeClass();
    $('#txtSetPoint').addClass('form-control SP_PUMP_' + PumpId);
    opc.server.getPageData(opcPageName, 50);
    $('#SetPointModal').modal('show');
    $('#SetPointModal').draggable({ handle: ".modal-header" });
    $("#SetPointModal #btnOK").unbind('click');
    $("#SetPointModal #btnOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var existingValue = 0;
        if ($('#txtSetPoint').attr('data-opcvalue') != undefined) {
            existingValue = $('#txtSetPoint').attr('data-opcvalue').val();
        }
        $('#txtSetPoint').attr('data-opcvalue', $('#txtSetPoint').val());
        var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#txtSetPoint').val();
        var activityName = "Update Pump Set Point";

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
                        $('#txtSetPoint').attr('data-opcvalue', $('#txtSetPoint').val());
                        SendDataToOPC($('#txtSetPoint'), SPTag, ApproverId, "", "", "");
                        $('#SetPointModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn("Update Pump Set Point", function (ApproverId) {
                        $('#txtSetPoint').attr('data-opcvalue', $('#txtSetPoint').val());
                        SendDataToOPC($('#txtSetPoint'), SPTag, ApproverId, "", "", "");
                        $('#SetPointModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });

    });
}


function OpenPriorityModal(TagName, UserID, LoginID, UserName) {
    $('#txtPriority').removeClass();
    $('#txtPriority').addClass(TagName).addClass('form-control');
    opc.server.getPageData(opcPageName, 50);
    $('#PriorityModal').modal('show');
    $('#PriorityModal').draggable({ handle: ".modal-header" });
    $("#PriorityModal #btnPriorityOK").unbind('click');
    $("#PriorityModal #btnPriorityOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var existingValue = 0;
        if ($('#txtPriority').attr('data-opcvalue') != undefined) {
            existingValue = $('#txtPriority').attr('data-opcvalue').val();
        }
        $('#txtPriority').attr('data-opcvalue', $('#txtPriority').val());
        var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#txtPriority').val();
        var activityName = "Update Pump Priority";

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
                        $('#txtPriority').attr('data-opcvalue', $('#txtPriority').val());
                        SendDataToOPC($('#txtPriority'), TagName, ApproverId, "", "", "");
                        $('#PriorityModal').modal('hide');
                    }
                }
                else
                {
                    ShowPasswordModalForReqTrn("Update Pump Priority", function (ApproverId) {
                        $('#txtPriority').attr('data-opcvalue', $('#txtPriority').val());
                        SendDataToOPC($('#txtPriority'), TagName, ApproverId, "", "", "");
                        $('#PriorityModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function OpenServiceModal(PumpId, PumpName, ServiceId, TagName, UserID) {
    $('#ServiceModal').modal('show');
    $('#ServiceModalLabel').html(PumpName + " - Set Service")
    $('#ddlService').val(ServiceId);
    $('#ServiceModal').draggable({ handle: ".modal-header" });
    $("#btnServiceOK").unbind('click');
    $("#btnServiceOK").on("click", function () {
        SetPumpService(PumpId, TagName, UserID);
        $(".modal-backdrop").slideUp('slow');
        $('#ServiceModal').modal('hide');
    });
}

function SetPumpService(PumpId, UserID) {
    //$('#btnServiceOK').attr('data-opcvalue', $('#ddlService option:selected').val());
    //var src = $('#btnServiceOK');
    var NewVal = $('#ddlService option:selected').val();
    var NewText = $('#ddlService option:selected').text();
    if (NewVal == undefined || NewVal == null) { alertDismissable('danger', 'Please select the correct Pump Service'); return; }
    var activityName = "Change Pump Service";
    var activityDetail = "Existing Value:" + PumpExistingService + "; New Value :" + NewText;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SetPumpServiceData(PumpId, NewVal);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SetPumpServiceData(PumpId, NewVal); }, activityName, activityDetail);
            }
        }
    });
}

function SetPumpServiceData(PumpId, ServiceId) {
    $.ajax({
        type: "GET",
        url: "/PlantView/SetPumpServiceData?PumpId=" + PumpId + "&ServiceId=" + ServiceId,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenPumpsViewHMI();
            }
        }
    });
}

function fillDDLServices() {
    //console.log(ddlServiceOptions);
    $('#ddlService').html('');
    var r = "";
    $.each(ddlServiceOptions, function (i, obj) {
        r = "<option value=" + obj.UniqueID + ">" + obj.Service + "</option>";
        $('#ddlService').append(r);
    });
}

function OpenLocRemModal(PumpDetails, ClassName, TagName, UserID, LoginID, UserName) {
    var CurrVal = $('.' + TagName).attr('data-opcvalue');
    if (CurrVal == undefined) { alertDismissable('danger', 'No Connection'); return; }
    // Temporary Disable
    return;
    $.each($("#LOCREMModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName + "_");
        removeClasses(ele, "pump_automan");
    });
    $("#LOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#LOCREMModal #LocRemLabel').html(PumpDetails + ' - Change Mode');
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable({ handle: ".modal-header" });
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change Local /Remote Mode Pump";
        var activityDetail = "Pump: " + PumpDetails;

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
                    ShowPasswordModalForReqTrn(PumpDetails + ' - Change Mode', function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

//function OpenAutoManModal(PumpDetails, ClassName, TagName, locremClass, UserID, LoginID, UserName) {

//    var local = false; var Auto = true;
//    var temp = $('.' + locremClass).attr('data-opcvalue');
//    if (temp != undefined && temp != null) { local = temp; }
//    var temp = ($('.' + TagName).attr('data-opcvalue'));
//    if (temp != undefined && temp != null) { Auto = temp; }
//    else { alertDismissable('danger', 'No Connection'); return; }
//    if (local == 'True' && Auto == 'False') { alertDismissable('danger', 'Pump must be in Remote mode to set in Auto Mode.'); return; }

//    $.each($("#AutoManModal ." + ClassName), function (index, ele) {
//        removeClasses(ele, ClassName + "_");
//        removeClasses(ele, "pump_automan");
//    });
//    $("#AutoManModal ." + ClassName).addClass(TagName);
//    $('#hdnAutoMan').removeClass().addClass(TagName);
//    opc.server.getPageData(opcPageName, 50);
//    $('#AutoManModal #AutoManLabel').html(PumpDetails + ' - Change Control');
//    $('#AutoManModal').modal('show');
//    $('#AutoManModal').draggable({ handle: ".modal-header" });
//    $("#AutoManModal #btnAutoManOK").unbind('click');
//    $("#AutoManModal #btnAutoManOK").on("click", function () {
//        $(".modal-backdrop").slideUp('slow');

//        var activityName = "Change Auto/Manual Mode Pump";
//        var activityDetail = "Pump: " + PumpDetails;

//        $.ajax({
//            type: "GET",
//            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
//            cache: false,
//            success: function (result) {
//                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
//                    if (result.strType == "danger") {
//                        alertDismissable(result.strType, result.strMessage); return;
//                    }
//                    else {
//                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
//                        $('#AutoManModal').modal('hide');
//                    }
//                }
//                else {
//                    ShowPasswordModalForReqTrn(PumpDetails + ' - Change Control', function (ApproverId) {
//                        SendDataToOPC($('#hdnAutoMan'), TagName, UserID, LoginID, UserName, "");
//                        $('#AutoManModal').modal('hide');
//                    }, activityName, activityDetail);
//                }
//            }
//        });
//    });
//}

function PumpStart(PumpDetails, src, TagName, UserID, LoginID, UserName) {
    var activityName = "Start/Stop Pump";
    var activityDetail = "Pump: " + PumpDetails;

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
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                }, activityName, activityDetail);
            }
        }
    });
}

function PumpStop(PumpDetails, src, TagName, UserID, LoginID, UserName) {
    var activityName = "Start/Stop Pump";
    var activityDetail = "Pump: " + PumpDetails;

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
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                }, activityName, activityDetail);
            }
        }
    });
}

function PumpFailReset(PumpDetails, src, TagName, UserID, LoginID, UserName) {
    var activityName = "Reset Pump Fail";
    var activityDetail = "Pump: " + PumpDetails;

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
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, TagName, UserID, LoginID, UserName, "");
                }, activityName, activityDetail);
            }
        }
    });
}

function LocalPermisive(MMDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Set PUMP Local Permisive";
    var activityDetail = "PUMP Local Permisive: " + MMDetails;

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
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}

function MaintainenceMode(MMDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Set PUMP Maintainence Mode";
    var activityDetail = "PUMP Maintainence Mode: " + MMDetails;

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
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}