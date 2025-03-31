var WBFetchedWeight = false;
$(document).ready(function () {
    $('#tblTruckMaster').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bInfo": false,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },   //
                { sWidth: "7%" },   //FANNo
                { sWidth: "7%" },   //ShipmentNo
                { sWidth: "9%" },   //TruckNo
                { sWidth: "14%" },  //Status
                { sWidth: "10%" },  //SAPTareWt.
                { sWidth: "12%" },  //ActualTareWt
                { sWidth: "12%" },  //ActualGrossWt
                { sWidth: "10%" },  //Max TT Wt
                { sWidth: "8%" },   //ToFillWt
                { sWidth: "8%" },   //Filledwt.
            ],
        "bAutoWidth": false,
    });
    $('#tblTruckMaster_filter').html('');

    $('#FormLog').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ManualEntry: {
                validators: {
                    greaterThan: {
                        value: 1,
                        message: 'Select Manual Entry Reason',
                    }
                }
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
    });

    $("#txtGrossWeight").on("input keyup", function () {
        var diff = parseFloat($("#txtGrossWeight").val()) - parseFloat($("#txtTareWeight").val());
        if (diff != 'NaN') {
            $("#txtNetWeight").val(diff);
        }
        else
        {
            $("#txtNetWeight").val(0);
        }
    });
    //LoadDDLReasonForManualEntry('WBManulEntryReason');
    var strStatus = $("#tblTruckMaster tbody tr:first-child td:eq(0)").text();
    //if (strStatus.trim() == '216' || strStatus.trim() == '905') {
    //    GetWeightFromWB("TARE");
    //}
    //else if (strStatus.trim() == '424' || strStatus.trim() == '908') {
    //    GetWeightFromWB("GROSS");
    //}

    if ($('#dvLeftVideo') != undefined && $('#dvLeftVideo').length>0)
    {
        $.ajax({
            type: "GET",
            url: "/LoadSummary/GetLiveVideoView",
            cache: false,
            success: function (result) {
                $('#dvLeftVideo').html(result);
            }
        });
    }

    if ($('#dvRightImage') != undefined && $('#dvRightImage').length > 0) {
        $.ajax({
            type: "GET",
            url: "/LoadSummary/GetImageView",
            cache: false,
            success: function (result) {
                $('#dvRightImage').html(result);
            }
        });
    }

});

function ValidateWeight(LoadID)
{
    $('#FormLog').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var strStatus = $("#tblTruckMaster tbody tr:first-child td:eq(0)").text();
    if (strStatus.trim() == '216' || strStatus.trim() == '905') {
        ValidateTareWeight(LoadID);
    }
    else if (strStatus.trim() == '424' || strStatus.trim() == '908') {
        ValidateGrossWeight(LoadID);
    }
}

function ValidateTareWeight(LoadID)
{
    if ($('#txtTareWeight').val().trim() == "") {
        GetWeightFromWB("TARE");
    }
    if ($('#txtTareWeight').val().trim()=="")
    {
        alertDismissable('danger', 'Tare Weight cannot be Blank');
        return false;
    }
    
    if (WBFetchedWeight)
    {
        ValidateTareWeightDo(LoadID);
    }
    else
    {
        var activityName = "Enter Weight Manually";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    ValidateTareWeightDo(LoadID);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ValidateTareWeightDo(LoadID); }, activityName, activityDetail, LoadID);
                }
            }
        });
    }
}

function ValidateTareWeightDo(LoadID)
{
    var BridgeType = $("#ddlBridgeType option:selected").val();
    var iTareWeight = $("#txtTareWeight").val();
    var iManualEntryReason = $('#ddlManualEntry').val();
    var remarks = "";

    if (iTareWeight == null || iTareWeight == "") {
        iTareWeight = 0;
    }
    if (iManualEntryReason == null || iManualEntryReason == "") {
        iManualEntryReason = 0;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/ValidateTareWeight?LoadID=" + LoadID + "&iTareWeight=" + iTareWeight + "&iManualEntryReason=" + iManualEntryReason + "&remarks=" + remarks + "&BridgeType=" + BridgeType + "&imgPath=" + encodeURIComponent($('#dvImage img').attr('src')),
        cache: false,
        success: function (result) {
            if (result.strType == "danger-password") {
                alertDismissable("danger", result.strMessage);
                setTimeout(function () { ShowPasswordModalForReqTrn("Validate Weight beyond Tolerance", function (ApproverId) { UpdateLoadAfterTolerance(LoadID, ApproverId); }, "Validate Weight beyond Tolerance", LoadID)}, 200);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        }
    });
}

function ValidateGrossWeight(LoadID)
{
    if ($('#txtGrossWeight').val().trim() == "") {
        GetWeightFromWB("GROSS");
    }

    if ($('#txtGrossWeight').val().trim() == "") {
        alertDismissable('danger','Gross Weight cannot be Blank');
        return false;
    }

    if (WBFetchedWeight) {
        ValidateGrossWeightDo(LoadID);
    }
    else {
        var activityName = "Enter Weight Manually";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    ValidateGrossWeightDo(LoadID);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ValidateGrossWeightDo(LoadID); }, activityName, activityDetail, LoadID);
                }
            }
        });
    }
}

function ValidateGrossWeightDo(LoadID)
{
    var BridgeType = $("#ddlBridgeType option:selected").val();
    var iGrossWeight = $("#txtGrossWeight").val();
    var iManualEntryReason = $('#ddlManualEntry').val();
    var remarks = "";
    if (iGrossWeight == null || iGrossWeight == "")
    {
        iGrossWeight = 0;
    }
    if (iManualEntryReason == null || iManualEntryReason == "") {
        iManualEntryReason = 0;
    }

    $.ajax({
        type: "GET",
        url: "/LoadSummary/ValidateGrossWeight?LoadID=" + LoadID + "&iGrossWeight=" + iGrossWeight + "&iManualEntryReason=" + iManualEntryReason + "&remarks=" + remarks + "&BridgeType=" + BridgeType + "&imgPath="+ encodeURIComponent($('#dvImage img').attr('src')),
        cache: false,
        success: function (result) {
            if (result.strType == "danger-password") {
                alertDismissable("danger", result.strMessage);
                setTimeout(function () { ShowPasswordModalForReqTrn("Validate Weight beyond Tolerance", function (UserID) { UpdateLoadAfterTolerance(LoadID, UserID); }, "Validate Weight beyond Tolerance", "" , LoadID) }, 200);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        }
    });
}

function UpdateLoadAfterTolerance(LoadID, ApproverId)
{
    var iManualEntryReason = $('#ddlManualEntry').val();
    var remarks = "";
    if (iManualEntryReason == "") {
        iManualEntryReason = null;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/UpdateLoadAfterTolerance?LoadID=" + LoadID + "&ApproverId=" + ApproverId + "&iManualEntryReason=" + iManualEntryReason + "&remarks=" + remarks,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function ManualWeightEntry()
{
    $('#btnValidate').removeAttr('disabled');
    var btnText = $('#btnManualEntry').clone().remove('span').text();
    if (btnText.toUpperCase().trim() == "Enable Manual Entry".toUpperCase())
    {
        $('#btnManualEntry').remove('span');
        $('#btnManualEntry').text('');
        $('#btnManualEntry').append('<span class=" glyphicon glyphicon-pencil"></span>Disable Manual Entry');
        $('#txtGrossWeight').removeAttr('disabled');
        $('#txtTareWeight').removeAttr('disabled');
        $('#dvManualEntry').show();
    }
    else
    {
        $('#btnManualEntry').remove('span');
        $('#btnManualEntry').text('');
        $('#btnManualEntry').append('<span class=" glyphicon glyphicon-pencil"></span>Enable Manual Entry');
        $('#txtGrossWeight').attr('disabled','disabled');
        $('#txtTareWeight').attr('disabled', 'disabled');
        $('#dvManualEntry').hide();
    }
}

function GetWeightFromWB(WeightType)
{
    var WBId = $('#ddlBridgeType option:selected').val()
    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetWBWeight?WeighBridgeId=" + WBId,
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                WBFetchedWeight = true;
                if (WeightType.toUpperCase() == "TARE") {
                    $('#txtTareWeight').val(result.strMessage);
                }
                else {
                    $('#txtGrossWeight').val(result.strMessage);   
                }

                if (result.strType.toUpperCase() != "SUCCESS") {
                    WBFetchedWeight = false;
                    alertDismissable("danger", "Weight returned with error: " + result.strMessage);
                    $('#btnValidate').attr('disabled', 'disabled');
                }
                else {
                    $('#btnValidate').removeAttr('disabled');
                    alertDismissable(result.strType, "Weight returned: " + result.strMessage);
                }
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}