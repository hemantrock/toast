$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('Masters/TTBypass', 'Index');
        $('#cancelModal').modal('hide');
    });

    $('#dtpBypassStartDate').datetimepicker({ format: 'D-MMM-YY HH:mm' });
    $('#dtpBypassEndDate').datetimepicker({ format: 'D-MMM-YY HH:mm' });
    $('.js-basic-single').select2();

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            stage: {
                validators: {
                    notEmpty: {
                        message: 'The Bypass Stage is required and cannot be empty'
                    }
                }
            },

            TruckNumber: {
                validators: {
                    notEmpty: {
                        message: 'The Truck Number is required and cannot be empty'
                    }
                }
            },

            Type: {
                validators: {
                    notEmpty: {
                        message: 'The Bypass Type is required and cannot be empty'
                    },
                }
            },
            BypassStartDate: {
                validators: {
                    notEmpty: {
                        message: 'The Bypass Start Date is required and cannot be empty'
                    }
                }
            },
            BypassEndDate: {
                validators: {
                    notEmpty: {
                        message: 'The Bypass End Date is required and cannot be empty'
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

function SaveTTBypass() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Truck Bypass";
    var activityDetail = "Truck: " + $('#txtCardNumber').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTTBypasssDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTTBypasssDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveTTBypasssDo() {

    var cManager = 0;
    if ($('#chkIsManager').is(":checked")) { cManager = 1; }
    else { cManager = 0; }

    var objTTBypass = {
        'TruckID': $('#ddlTrucks').val(),
        'Stage': $('#ddlStage').val(),
        'Type': $('#ddlType').val(),
        'StartTime': $('#dtpBypassStartDate').val(),
        'EndTime': $('#dtpBypassEndDate').val()
    };

    $.ajax({
        url: "/TTBypass/AddTTBypassObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTTBypass),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Masters/TTBypass', 'Index');
            }
        }
    });
}

function UpdateTTBypass() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit an existing Truck Bypass";
    var activityDetail = "Truck: " + $('#ddlTrucks').text();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTTBypassDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTTBypassDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateTTBypassDo() {

    var cManager = 0;
    if ($('#chkIsManager').is(":checked")) {
        cManager = 1;
    }
    else {
        cManager = 0;
    }

    var objTTBypass = {
        'UniqueID': $('#hdnIdKey').val(),
        'TruckID': $('#ddlTrucks').val(),
        'Stage': $('#ddlStage').val(),
        'Type': $('#ddlType').val(),
        'StartTime': $('#dtpBypassStartDate').val(),
        'EndTime': $('#dtpBypassEndDate').val()
    };

    $.ajax({
        url: "/TTBypass/EditTTBypassObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTTBypass),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Masters/TTBypass', 'Index');
            }
        }
    });
}

function LoadBypassOptions() {
    var stage = $('#ddlStage :selected').val();
    $('#ddlType').html('');
    if (stage == "R1") {
        var op1 = "<option value='Biometric'>Biometric</option>";
        var op2 = "<option value='VTS'>VTS/Geofencing</option>";
        $('#ddlType').append(op1).append(op2);
    }
    else if (stage == "R2") {
        var op1 = "<option value='Biometric'>Biometric</option>";
        $('#ddlType').append(op1);
    } else if (stage == "R3") {
        var op1 = "<option value='Biometric'>Biometric</option>";
        var op2 = "<option value='EMLock'>EMLock</option>";
        var op3 = "<option value='OGP'>Out Gatepass</option>";
        $('#ddlType').append(op1).append(op2).append(op3);
    }
}
