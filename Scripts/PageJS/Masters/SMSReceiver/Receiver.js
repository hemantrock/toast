$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenSMSReceiverMenu();
        $('#cancelModal').modal('hide');
    });

    $('#frmReceiver').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ReceiverName: {
                validators: {
                    notEmpty: {
                        message: 'Receiver Name is required and cannot be empty'
                    },
                }
            },
            MobileNo: {
                validators: {
                    notEmpty: {
                        message: 'Mobile No. is required and cannot be empty'
                    },
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Mobile No. must be of 10 digits'
                    },
                    digits: {
                        message: 'Mobile No. must be digits'
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
        }
    });
});
function SaveReceiver() {
    $('#frmReceiver').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New SMS Receiver";
    var activityDetail = "Receiver Name: " + $('#txtReceiverName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveReceiverDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveReceiverDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveReceiverDo() {
    var cEnabled=0;
    if ($('#chkIsEnabled').is(":checked")) {
        cEnabled = 1;
    }
    else {
        cEnabled = 0;
    }

    var objReceiver = {
        'Name': $('#txtReceiverName').val(),
        'MobileNo': $('#txtMobileNo').val(),
        'Enabled': cEnabled,
    };

    $.ajax({
        url: "/SMSReceiver/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objReceiver),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSMSReceiverMenu();
            }
        }
    });
}
function UpdateReceiver() {
    $('#frmReceiver').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing SMS Receiver";
    var activityDetail = "Receiver Name: " + $('#txtReceiverName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateReceiverDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateReceiverDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateReceiverDo() {

    var cEnabled = 0;
    if ($('#chkIsEnabled').is(":checked")) {
        cEnabled = 1;
    }
    else {
        cEnabled = 0;
    }

    var objReceiver = {
        'UniqueID': $('#hdnIdKey').val(),
        'Name': $('#txtReceiverName').val(),
        'MobileNo': $('#txtMobileNo').val(),
        'Enabled': cEnabled,
    };

    $.ajax({
        url: "/SMSReceiver/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(objReceiver),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSMSReceiverMenu();
            }
        }
    });
}