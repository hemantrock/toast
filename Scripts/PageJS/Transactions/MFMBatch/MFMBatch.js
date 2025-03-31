var LastRefreshStartDT; var LastRefreshEndDT; var MFMObj;
$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('Transactions/MFMBatch', 'Index');
        $('#cancelModal').modal('hide');
    });
    InitDTPickers();
    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            IssuingPlantCode: {
                validators: {
                    notEmpty: {
                        message: 'The Issuing Plant Code is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 8,
                        message: 'The Issuing Plant Code must be 1 to 8 characters'
                    }
                }
            },

            ReceivingPlantCode: {
                validators: {
                    notEmpty: {
                        message: 'The Receiving Plant Code is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Receiving Plant Code'
                    }
                }
            },

            IssuingStorageTank: {
                validators: {
                    notEmpty: {
                        message: 'The Storage Tank is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 8,
                        message: 'The Storage Tank must be 1 to 8 characters'
                    }
                }
            },

            ReceivingStorageTank: {
                validators: {
                    notEmpty: {
                        message: 'The Storage Tank is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select the Storage Tank'
                    }
                }
            },

            MFMDevice: {
                validators: {
                    notEmpty: {
                        message: 'The MFM Device is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select MFM Device'
                    }
                }
            },

            ReceiptIssue: {
                validators: {
                    notEmpty: {
                        message: 'The Receipt / Issue Transaction Type is required and cannot be empty'
                    },
                }
            },

            StkTrOMC: {
                validators: {
                    notEmpty: {
                        message: 'The Stock Transfer / OMC Transaction Type is required and cannot be empty'
                    },
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
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('ddlCardReader').val(),
            validator.getFieldElements('shortName').val()].join(' ');
        }
    });


});
function InitDTPickers() {
    $('#dtpStartBatchTime').datetimepicker({
        format: 'D-MMM-YY HH:mm:ss',
        sideBySide: true,
        maxDate: new Date()
    });
    $('#dtpEndBatchTime').datetimepicker({
        format: 'D-MMM-YY HH:mm:ss',
        sideBySide: true,
        maxDate: new Date()
    });
}

function GenerateMFMBatch() {
    var BatchStartDT = $('#dtpStartBatchTime').val();
    var BatchEndDT = $('#dtpEndBatchTime').val();
    var TankID = $('#ddlReceivingStorageTank').val();
    var MFMDeviceID = $('#ddlMFMDevice').val();
    if (BatchStartDT == null || BatchStartDT == 'undefined' || BatchStartDT == '') { alertDismissable('danger', 'Please Select the Start Date and Time'); return; }
    if (BatchEndDT == null || BatchEndDT == 'undefined' || BatchEndDT == '') { alertDismissable('danger', 'Please Select the End Date and Time'); return; }
    if (TankID == null || TankID == 'undefined' || TankID == 0) { alertDismissable('danger', 'Please Select the Tank'); return; }
    if (MFMDeviceID == null || MFMDeviceID == 'undefined' || MFMDeviceID == 0) { alertDismissable('danger', 'Please Select the MFM Device'); return; }
    $.ajax({
        url: "/MFMBatch/GenerateMFMBatch?dtpStart=" + BatchStartDT + "&TankID=" + TankID + "&MFMID=" + MFMDeviceID + "&dtpEnd=" + BatchEndDT,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == null) { alertDismissable('danger', 'Unable to Get data for the MFM and Tank at the required time'); return; }
            if (result.blnStatus == false) { alertDismissable(result.strType, result.strMessage); return; }
            MFMObj = result;
            LastRefreshStartDT = $('#dtpStartBatchTime').val(); LastRefreshEndDT = $('#dtpEndBatchTime').val();
            $('#TankLevelStart').text(MFMObj.TankLevelStart); $('#TankLevelEnd').text(MFMObj.TankLevelEnd); $('#TankLevelDiff').text((MFMObj.TankLevelEnd - MFMObj.TankLevelStart).toFixed(3));
            $('#MFMTotzAmbVolStart').text(MFMObj.MFMTotzAmbVolStart); $('#MFMTotzAmbVolEnd').text(MFMObj.MFMTotzAmbVolEnd); $('#MFMTotzAmbVolDiff').text(MFMObj.VolumeObs);
            $('#MFMTotz15VolStart').text(MFMObj.MFMTotz15VolStart); $('#MFMTotz15VolEnd').text(MFMObj.MFMTotz15VolEnd); $('#MFMTotz15VolDiff').text(MFMObj.VolumeStd15);
            $('#MFMTotz295VolStart').text(MFMObj.MFMTotz295VolStart); $('#MFMTotz295VolEnd').text(MFMObj.MFMTotz295VolEnd); $('#MFMTotz295VolDiff').text(MFMObj.VolumeStd295);
            $('#MFMTotzMassStart').text(MFMObj.MFMTotzMassStart); $('#MFMTotzMassEnd').text(MFMObj.MFMTotzMassEnd); $('#MFMTotzMassDiff').text(MFMObj.Mass);

            if (MFMObj.AvgTemp == null) { MFMObj.AvgTemp = $('#txtAvgBatchTemp').val(); }
            $('#AvgTemp').text(MFMObj.AvgTemp); $('#AvgDensObs').text(MFMObj.AvgDensObs); $('#AvgDens15').text(MFMObj.AvgDens15);
            alertDismissable('danger', 'Available Data updated successfully for: ' + LastRefreshStartDT.toLocaleString() + ' and ' + LastRefreshEndDT.toLocaleString());
        }
    });
}

function SaveGeneratedBatch() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    if (MFMObj == null || MFMObj == 'undefined') { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if (MFMObj.MFMTotzAmbVolStart == null || MFMObj.MFMTotz15VolStart == null) { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#dtpStartBatchTime').val() != LastRefreshStartDT) { alertDismissable('danger', 'Start Time Changed. Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#dtpEndBatchTime').val() != LastRefreshEndDT) { alertDismissable('danger', 'End Time Changed. Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#ddlReceivingStorageTank').val() != MFMObj.ReceiptTankID) { alertDismissable('danger', 'Tank Changed. Please refresh and check the data before Proceeding!'); return; }
    if ($('#ddlMFMDevice').val() != MFMObj.MFMDeviceID) { alertDismissable('danger', 'MFM Device Changed. Please refresh and check the MFM data before Proceeding!'); return; }

    var activityName = "Add a New MFM Batch";
    var activityDetail = "From Plant: " + $('#txtIssuingPlantCode').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveGeneratedBatchDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveGeneratedBatchDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveGeneratedBatchDo() {

    MFMObj.IssuingPlantCode = $('#txtIssuingPlantCode').val();
    MFMObj.ReceivingPlantCode = $('#ddlReceivingPlantCode').val();
    MFMObj.IssuingStorageTank = $('#txtIssuingStorageTank').val();
    MFMObj.ReceiptIssue = $('#ddlReceiptIssue').val();
    MFMObj.StkTrOMC = $('#ddlStkTrOMC').val();
    MFMObj.Remarks = $('#txtRemarks').val();
    MFMObj.StartDateTime = $('#dtpStartBatchTime').val();
    MFMObj.EndDateTime = $('#dtpEndBatchTime').val();

    if ($('#txtAvgBatchTemp') != 'undefined' && ($('#txtAvgBatchTemp').val() > 0)) { MFMObj.AvgTemp = $('#txtAvgBatchTemp').val(); }

    $.ajax({
        url: "/MFMBatch/SaveGeneratedBatch",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(MFMObj),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function ShowMFMStartSnapshot() {
    var BatchDT = $('#dtpStartBatchTime').val();
    var ReceiptTankID = $('#ddlReceivingStorageTank').val();
    var MFMDeviceID = $('#ddlMFMDevice').val();
    if (BatchDT == null || BatchDT == 'undefined' || BatchDT == '') { alertDismissable('danger', 'Please Select the Date and Time'); return; }
    if (ReceiptTankID == null || ReceiptTankID == 'undefined' || ReceiptTankID == 0) { alertDismissable('danger', 'Please Select the Receipt Tank'); return; }
    if (MFMDeviceID == null || MFMDeviceID == 'undefined' || MFMDeviceID == 0) { alertDismissable('danger', 'Please Select the MFM Device'); return; }
    $.ajax({
        url: "/MFMBatch/GetMFMSnapshot?dtpMFMSnaphot=" + BatchDT + "&RecTankID=" + ReceiptTankID + "&MFMID=" + MFMDeviceID,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == null) { alertDismissable('danger', 'Unable to Get data for the MFM and Tank at the required time'); return; }
            if (result.blnStatus == false) { alertDismissable(result.strType, result.strMessage); return; }
            MFMObj = result; $('#dtpStartBatchTime').data("DateTimePicker").date(moment(MFMObj.StartDateTime)); LastRefreshDT = $('#dtpStartBatchTime').val();
            $('#TankLevelStart').text(MFMObj.TankLevelStart); $('#TankLevelStart').val(MFMObj.TankLevelStart);
            $('#MFMTotzAmbVolStart').text(MFMObj.MFMTotzAmbVolStart); $('#MFMTotzAmbVolStart').val(MFMObj.MFMTotzAmbVolStart);
            $('#MFMTotz15VolStart').text(MFMObj.MFMTotz15VolStart); $('#MFMTotz15VolStart').val(MFMObj.MFMTotz15VolStart);
            $('#MFMTotz295VolStart').text(MFMObj.MFMTotz295VolStart); $('#MFMTotz295VolStart').val(MFMObj.MFMTotz295VolStart);
            $('#MFMTotzMassStart').text(MFMObj.MFMTotzMassStart); $('#MFMTotzMassStart').val(MFMObj.MFMTotzMassStart);
            alertDismissable('danger', 'Available Data updated successfully for: ' + LastRefreshDT.toLocaleString());
        }
    });
}

function ShowMFMEndSnapshot() {
    var BatchDT = $('#dtpEndBatchTime').val(); var ReceiptTankID = null; var MFMDeviceID = null;
    var ReceiptTankID = $('#ddlReceivingStorageTank').attr('tankID');
    var MFMDeviceID = $('#ddlMFMDevice').attr('mfmID');
    var BatchID = $('#txtBatchID').val();
    if (BatchDT == null || BatchDT == 'undefined' || BatchDT == '') { alertDismissable('danger', 'Please Select the Date and Time'); return; }
    if (ReceiptTankID == null || ReceiptTankID == 'undefined' || ReceiptTankID == 0) { alertDismissable('danger', 'Please Select the Receipt Tank'); return; }
    if (MFMDeviceID == null || MFMDeviceID == 'undefined' || MFMDeviceID == 0) { alertDismissable('danger', 'Please Select the MFM Device'); return; }
    $.ajax({
        url: "/MFMBatch/GetMFMEndSnapshot?dtpMFMSnaphot=" + BatchDT + "&BatchID=" + BatchID,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result == null) { alertDismissable('danger', 'Unable to Get data for the MFM and Tank at the required time'); return; }
            if (result.blnStatus == false) { alertDismissable(result.strType, result.strMessage); return; }
            MFMObj = result; $('#dtpEndBatchTime').data("DateTimePicker").date(moment(MFMObj.EndDateTime)); LastRefreshDT = $('#dtpEndBatchTime').val();
            console.log(MFMObj); debugger;
            $('#TankLevelEnd').text(MFMObj.TankLevelEnd); $('#TankLevelEnd').val(MFMObj.TankLevelEnd);
            $('#MFMTotzAmbVolEnd').text(MFMObj.MFMTotzAmbVolEnd); $('#MFMTotzAmbVolEnd').val(MFMObj.MFMTotzAmbVolEnd);
            $('#MFMTotz15VolEnd').text(MFMObj.MFMTotz15VolEnd); $('#MFMTotz15VolEnd').val(MFMObj.MFMTotz15VolEnd);
            $('#MFMTotz295VolEnd').text(MFMObj.MFMTotz295VolEnd); $('#MFMTotz295VolEnd').val(MFMObj.MFMTotz295VolEnd);
            $('#MFMTotzMassEnd').text(MFMObj.MFMTotzMassEnd); $('#MFMTotzMassEnd').val(MFMObj.MFMTotzMassEnd);

            $('#TankLevelDiff').text((MFMObj.TankLevelEnd - MFMObj.TankLevelStart).toFixed(3)); $('#TankLevelDiff').val((MFMObj.TankLevelEnd - MFMObj.TankLevelStart).toFixed(3));
            $('#MFMTotzAmbVolDiff').text((MFMObj.MFMTotzAmbVolEnd - MFMObj.MFMTotzAmbVolStart).toFixed(3)); $('#MFMTotzAmbVolDiff').val(MFMObj.MFMTotzAmbVolEnd - MFMObj.MFMTotzAmbVolStart);
            $('#MFMTotz15VolDiff').text((MFMObj.MFMTotz15VolEnd - MFMObj.MFMTotz15VolStart).toFixed(3)); $('#MFMTotz15VolDiff').val(MFMObj.MFMTotz15VolEnd - MFMObj.MFMTotz15VolStart);
            $('#MFMTotz295VolDiff').text((MFMObj.MFMTotz295VolEnd - MFMObj.MFMTotz295VolStart).toFixed(3)); $('#MFMTotz295VolDiff').val(MFMObj.MFMTotz295VolEnd - MFMObj.MFMTotz295VolStart);
            $('#MFMTotzMassDiff').text((MFMObj.MFMTotzMassEnd - MFMObj.MFMTotzMassStart).toFixed(3)); $('#MFMTotzMassDiff').val(MFMObj.MFMTotzMassEnd - MFMObj.MFMTotzMassStart);

            alertDismissable('danger', 'Available Data updated successfully for: ' + LastRefreshDT.toLocaleString());
        }
    });
}




function SaveMFMBatch() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    if (MFMObj == null || MFMObj == 'undefined') { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if (MFMObj.MFMTotzAmbVolStart == null || MFMObj.MFMTotz15VolStart == null) { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#dtpStartBatchTime').val() != LastRefreshDT) { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#ddlReceivingStorageTank').val() != MFMObj.ReceiptTankID) { alertDismissable('danger', 'Receipt Tank Changed. Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#ddlMFMDevice').val() != MFMObj.MFMDeviceID) { alertDismissable('danger', 'MFM Device Changed. Please refresh and check the MFM data before Proceeding!'); return; }

    var activityName = "Add a New MFM Batch";
    var activityDetail = "From Plant: " + $('#txtIssuingPlantCode').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveMFMBatchDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveMFMBatchDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveMFMBatchDo() {

    //var objMFMBatch = {
    //    'IssuingPlantCode': $('#txtIssuingPlantCode').val(),
    //    'ReceivingPlantCode': $('#ddlReceivingPlantCode').val(),
    //    'IssuingStorageTank': $('#txtIssuingStorageTank').val(),
    //    'ReceiptTankID': $('#ddlReceivingStorageTank').val(),
    //    'MFMDeviceID': $('#ddlMFMDevice').val(),
    //    'ReceiptIssue': $('#ddlReceiptIssue').val(),
    //    'StkTrOMC': $('#ddlStkTrOMC').val(),
    //    'Remarks': $('#txtRemarks').val(),
    //};
    MFMObj.StartDateTime = $('#dtpStartBatchTime').val();
    MFMObj.IssuingPlantCode = $('#txtIssuingPlantCode').val();
    MFMObj.ReceivingPlantCode = $('#ddlReceivingPlantCode').val();
    MFMObj.IssuingStorageTank = $('#txtIssuingStorageTank').val();
    MFMObj.ReceiptIssue = $('#ddlReceiptIssue').val();
    MFMObj.StkTrOMC = $('#ddlStkTrOMC').val();
    MFMObj.Remarks = $('#txtRemarks').val();

    $.ajax({
        url: "/MFMBatch/AddMFMBatchObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(MFMObj),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function SaveMFMEndBatch() {
    if (MFMObj == null || MFMObj == 'undefined') { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if (MFMObj.MFMTotzAmbVolEnd == null || MFMObj.MFMTotz15VolEnd == null) { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }
    if ($('#dtpEndBatchTime').val() != LastRefreshDT) { alertDismissable('danger', 'Please refresh and check the MFM data before Proceeding!'); return; }

    var activityName = "End an existing MFM Batch";
    var activityDetail = "From Plant: " + $('#txtIssuingPlantCode').val() + "; Batch ID:" + $('#txtBatchID').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveMFMEndBatchDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveMFMEndBatchDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveMFMEndBatchDo() {
    MFMObj.EndDateTime = $('#dtpEndBatchTime').val();
    MFMObj.AvgTemp = $('#txtAvgBatchTemp').val();
    MFMObj.Remarks = $('#txtRemarks').val();

    $.ajax({
        url: "/MFMBatch/EndMFMBatchObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(MFMObj),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function UpdateMFMBatch() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit an existing MFM Batch";
    var activityDetail = "Batch No : " + $('#txtBatchID').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateMFMBatchDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateMFMBatchDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateMFMBatchDo() {

    var objMFMBatch = {
        'BatchID': $('#txtBatchID').val(),
        'IssuingPlantCode': $('#txtIssuingPlantCode').val(),
        'ReceivingPlantCode': $('#ddlReceivingPlantCode').val(),
        'IssuingStorageTank': $('#txtIssuingStorageTank').val(),
        'ReceiptTankID': $('#ddlReceivingStorageTank').val(),
        'MFMDeviceID': $('#ddlMFMDevice').val(),
        'ReceiptIssue': $('#ddlReceiptIssue').val(),
        'StkTrOMC': $('#ddlStkTrOMC').val(),
        'Remarks': $('#txtRemarks').val(),
    };

    $.ajax({
        url: "/MFMBatch/EditMFMBatchObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMFMBatch),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function GenerateSubBatches(ctrl) {
    if (ctrl == null) { return false; }
    $(ctrl).parent().show();
    $(ctrl).dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "10%" },
                { sWidth: "30%" },
                { sWidth: "20%" },
                { sWidth: "20%" },
                { sWidth: "20%" },
                //{ sWidth: "20%" },
            ],
        "bAutoWidth": false,
        "bDestroy": true,
    });

    var NoSubBatch = $('#txtNoSubBatch').val();
    if (NoSubBatch != null && NoSubBatch != 'undefined' && NoSubBatch != 0) {
        for (i = 1; i <= 8; i++) {
            if (i <= NoSubBatch) { $('#row_' + i).show(); }
            else { $('#row_' + i).hide(); }
        }
        $('#SubBatchBal').show(); UpdateBatchBalance();
    }
}

function SplitMFMBatch() {
    var activityName = "Split MFM Batch";
    var activityDetail = "Batch ID: " + $('#txtBatchID').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SplitMFMBatchDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SplitMFMBatchDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SplitMFMBatchDo() {
    var iBatchID = $('#txtBatchID').val();
    var objSubBatchDetails = [];
    for (i = 1; i <= 8; i++) {
        if ($('#txtSubBatchNo_' + i).is(':visible')) {
            var obj = {
                'BatchID': $('#txtSubBatchNo_' + i).val(),
                'Remarks': $('#txtSubBatchRemarks_' + i).val(),
                'VolumeObs': $('#txtSubBatchQty_' + i).val(),
                'VolumeStd15': $('#txtSubBatchVol15Qty_' + i).val(),
                'Mass': $('#txtSubBatchMassQty_' + i).val()
            };
            objSubBatchDetails.push(obj);
        }
    }
    $.ajax({
        url: "/MFMBatch/SplitMFMBatch",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ iMasterBatchID: iBatchID, oSubBatchDetails: objSubBatchDetails }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function UpdateBatchBalance() {
    //debugger;
    var NoSubBatch = $('#txtNoSubBatch').val();
    var usedQty = 0; var TotObsVol = parseFloat($('#txtVolumeObs').text());
    var TotObsVol15 = parseFloat($('#txtVolumeStd15').text());
    var TotMass = parseFloat($('#txtMass').text());
    for (i = 1; i <= 8; i++) {
        var sBatchQty = parseFloat($('#txtSubBatchQty_' + i).val());
        if ($('#txtSubBatchNo_' + i).is(':visible') && i <= NoSubBatch && sBatchQty > 0) {
            usedQty = usedQty + sBatchQty;
            var perSBatch = sBatchQty / TotObsVol;
            $('#txtSubBatchVol15Qty_' + i).val((perSBatch * TotObsVol15).toFixed(3));
            $('#txtSubBatchMassQty_' + i).val((perSBatch * TotMass).toFixed(3));
        }
    }
    $('#txtSubBatchBal').val((TotObsVol - usedQty).toFixed(3));
}
