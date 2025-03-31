$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenMetersMasterMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            LPNo: {
                validators: {
                    notEmpty: {
                        message: 'The LP No is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select LP No'
                    }
                }
            },
            MeterCompNo: {
                validators: {
                    notEmpty: {
                        message: 'Meter No is required'
                    },
                    between: {
                        min: 1,
                        max: 4,
                        message: 'Meter No must be in between 1 to 4'
                    }
                }
            },
            MeterDesc: {
                validators: {
                    notEmpty: {
                        message: 'Meter Desc is required'
                    }
                }
            },
            BckFactorPC: {
                validators: {
                    notEmpty: {
                        message: 'K-Factor Prog Code is required'
                    },
                    between: {
                        min: 1,
                        max: 1200,
                        message: 'Field must be in between 1 to 1200'
                    }
                }
            },
            LoopNo: {
                validators: {
                    notEmpty: {
                        message: 'Loop No is required'
                    }
                }
            },
            SlaveID: {
                validators: {
                    notEmpty: {
                        message: 'Slave ID is required'
                    },
                    between: {
                        min: 1,
                        max: 255,
                        message: 'Slave ID must be in between 1 to 255'
                    }
                }
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });
});
function SaveMeterMaster() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Meter";
    var activityDetail = "LP:" + $('#ddlLPNo').val() + "Meter:" + $('#txtMeterCompNo').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveMeterMasterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveMeterMasterDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveMeterMasterDo() {

    var Enable = 0;

    if ($('#chkEnable').is(":checked")) {
        Enable = 1;
    }

    var objMetersMaster = {
        'LPNo': $('#ddlLPNo').val(),
        'MeterCompNo': $('#txtMeterCompNo').val(),
        'LPNo': $('#ddlLPNo').val(),
        'BaseProductID': $('#ddlProduct').val(),
        'BCKFactorPC': $('#txtBckFactorPC').val(),
        'LoopNo': $('#txtLoopNo').val(),
        'SlaveID': $('#txtSlaveID').val(),
        'Enabled': Enable
    };

    $.ajax({
        url: "/MetersMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMetersMaster),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenMetersMasterMenu();
            }
        }
    });
}
function UpdateMeterMaster() {
        $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Meter";
    var activityDetail = "LP:" + $('#ddlLPNo').val() + "Meter:" + $('#txtMeterCompNo').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateMeterMasterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateMeterMasterDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateMeterMasterDo() {

    var Enable = 0, ErroneousDensity = 0, ErroneousRTD = 0;

    if ($('#chkEnable').is(":checked")) {
        Enable = 1;
    }
    if ($('#chkErroneousDensity').is(":checked")) {
        ErroneousDensity = 1;
    }
    if ($('#chkErroneousRTD').is(":checked")) {
        ErroneousRTD = 1;
    }

    var objMetersMaster = {
        'LPNo': $('#txtLPNo').val(),
        'MeterCompNo': $('#txtMeterCompNo').val(),
        'BaseProductID': $('#ddlProduct').val(),
        'MeterDesc': $('#txtMeterDesc').val(),
        'BCKFactorPC': $('#txtBckFactorPC').val(),
        'LoopNo': $('#txtLoopNo').val(),
        'SlaveID': $('#txtSlaveID').val(),
        'Enabled': Enable,
        'ErroneousDensity': ErroneousDensity,
        'ErroneousRTD': ErroneousRTD,
        
    };

    $.ajax({
        url: "/MetersMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMetersMaster),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenMetersMasterMenu();
            }
        }
    });
}