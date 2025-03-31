var ddlServiceOptions = "";

$(document).ready(function () {

    opcPageName = "PumpsOverview";
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

function loadData(pumpName)
{
    opc.server.getPageData(opcPageName, 50);
    opc.server.readPageTags(opcPageName)
}

function ChangePumpView() {
    var idx = $('#ddlPumpView option:selected').attr('data-id');
    $('.slider-container').slick('slickGoTo', idx, false);
}


function ExtraActivities(model) {

}

function OpenPumpModal(PumpId, PumpName) {
    $.ajax({
        type: "GET",
        url: "/PlantView/GetPumpDetailsView?PumpId=" + PumpId,
        cache: false,
        success: function (result) {
            $('#myPUMPModal').html(result);
            $('#myPUMPModal').modal('show');
            $('#myPUMPModal').draggable();
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 50);
        }
    });
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
            $('#myPUMPModal').draggable();
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#myPUMPModal').modal('hide');
            });
            opc.server.getPageData(opcPageName, 50);
        }
    });
}


function OpenSetPointModal(PumpId, UserID, LoginID, UserName)
{
    $('#txtSetPoint').removeClass();
    $('#txtSetPoint').addClass('form-control SP_PUMP_' + PumpId);
    opc.server.getPageData(opcPageName, 50);
    $('#SetPointModal').modal('show');
    $('#SetPointModal').draggable();
    $("#SetPointModal #btnOK").unbind('click');
    $("#SetPointModal #btnOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $.ajax({
            type: "GET",
            url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Update Pump Set Point",
            cache: false,
            success: function (result) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage);
                }


                ShowPasswordModalForReqTrn("Update Pump Set Point", function (ApproverId) {
                    $('#txtSetPoint').attr('data-opcvalue', $('#txtSetPoint').val());
                    SendDataToOPC($('#txtSetPoint'), 'SP_PUMP_' + PumpId, ApproverId, "", "","");
                    $('#SetPointModal').modal('hide');
                }, "Update Pump Set Point");
            }
        });
        
    });
}


function OpenPriorityModal(TagName, UserID, LoginID, UserName) {
    $('#txtPriority').removeClass();
    $('#txtPriority').addClass(TagName).addClass('form-control');
    opc.server.getPageData(opcPageName, 50);
    $('#PriorityModal').modal('show');
    $('#PriorityModal').draggable();
    $("#PriorityModal #btnPriorityOK").unbind('click');
    $("#PriorityModal #btnPriorityOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $.ajax({
            type: "GET",
            url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Update Pump Priority",
            cache: false,
            success: function (result) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage);
                }
                ShowPasswordModalForReqTrn("Update Pump Priority", function (ApproverId) {
                    $('#txtPriority').attr('data-opcvalue', $('#txtPriority').val());
                    SendDataToOPC($('#txtPriority'), TagName, ApproverId, "", "", "");
                    $('#PriorityModal').modal('hide');
                }, "Update Pump Priority");
            }
        });

    });
}


function OpenServiceModal(PumpId, PumpName, ServiceId,pName, TagName, UserID) {
    $('#ServiceModal').modal('show');
    $('#ServiceModalLabel').html(PumpName + " - Set Service")
    $('#ddlService').val(ServiceId);
    $('#ServiceModal').draggable();
    $("#btnServiceOK").unbind('click');
    $("#btnServiceOK").on("click", function () {
        SetPumpService(PumpId, TagName, UserID,pName);
        $(".modal-backdrop").slideUp('slow');
        $('#ServiceModal').modal('hide');
    });
}

function SetPumpService(PumpId, TagName, UserID, pName)
{
    $('#btnServiceOK').attr('data-opcvalue', $('#ddlService option:selected').val());
    var src = $('#btnServiceOK');

    $.ajax({
        type: "GET",
        url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Change Pump Service",
        cache: false,
        success: function (result) {
            if (result.strType == "danger") {
                alertDismissable(result.strType, result.strMessage);
                ShowPasswordModalForReqTrn("Change Pump Service", function (ApproverId) {
                    SetPumpServiceData(PumpId, $('#ddlService option:selected').val());
                    //SendDataToOPC(src, TagName, ApproverId, "", "", $('#ddlService option:selected').text());
                }
                , "Change Pump Service","Pump: "+pName);
            }
            else {
                if (result.blnStatus == true) {
                    SetPumpServiceData(PumpId, $('#ddlService option:selected').val());
                    //SendDataToOPC(src, TagName, UserID, "", "", $('#ddlService option:selected').text());
                }
            }
        }
    });
}

function SetPumpServiceData(PumpId, ServiceId)
{
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
    $.each($("#LOCREMModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName + "_");
        removeClasses(ele, "pump_automan");
    });
    $("#LOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#LOCREMModal #LocRemLabel').html(PumpDetails + ' - Change Mode');
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable();
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $.ajax({
            type: "GET",
            url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Change Local /Remote Mode",
            cache: false,
            success: function (result) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage);
                    ShowPasswordModal("Change Mode", function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, ApproverId, "", "", "");
                        $('#LOCREMModal').modal('hide');
                    }, "Change Local /Remote Mode","Pump: "+PumpDetails);
                }
                else {
                    SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                    $('#LOCREMModal').modal('hide');
                }
            }
        });
    });
}

function OpenAutoManModal(PumpDetails, ClassName, TagName, UserID, LoginID, UserName) {
    $.each($("#AutoManModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName+"_");
        removeClasses(ele, "pump_automan");
    });
    $("#AutoManModal ." + ClassName).addClass(TagName);
    $('#hdnAutoMan').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#AutoManModal #AutoManLabel').html(PumpDetails + ' - Change Control');
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