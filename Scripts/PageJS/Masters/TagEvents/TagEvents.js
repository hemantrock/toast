$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTagEventsMenu();
        $('#cancelModal').modal('hide');
    });

    $('#frmTags').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            TagName: {
                validators: {
                    notEmpty: {
                        message: 'The Tag Name cannot be empty'
                    },
                }
            },
            Limiter: {
                validators: {
                    notEmpty: {
                        message: 'The Limiter is required and cannot be empty'
                    },
                }
            },
            CompareValue: {
                validators: {
                    notEmpty: {
                        message: 'The Compare Value is required and cannot be empty'
                    },
                }
            },
            Operator: {
                validators: {
                    callback: {
                        message: 'The Operator is required and cannot be empty',
                        callback: function (value, validator, $field) {
                            var options = validator.getFieldElements('Operator').val();
                            return (options != null);
                        }
                    }
                }
            },
            FilterTimeInSecs: {
                validators: {
                    digits: {
                        message: 'Scan must be Integer value.'
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
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});
function SaveTagEvents() {
    $('#frmTags').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Tag Event";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTagEventsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTagEventsDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveTagEventsDo() {
    var objTags = {
        'TagName': $('#ddlTagName').val(),
        'LimiterName': $('#txtLimiter').val(),
        'CompareValue': $('#txtCompareValue').val(),
        'Operator': $('#ddlOperator').val(),
        'EventID': $('#ddlEvent').val(),
        'EventTagToNotify': $('#ddlEventTagToNotify').val(),
        'EventTagValue': $('#txtEventTagValue').val(),
        'AckTagToNotify': $('#ddlAckTagToNotify').val(),
        'FilterTimeInSecs': $('#txtFilterTimeInSecs').val(),
        'PopUpMsg': $('#txtPopUpMsg').val(),
    };

    $.ajax({
        url: "/TagEvents/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagEventsMenu();
            }
        }
    });
}
function UpdateTagEvents() {
    $('#frmTags').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Tag Event";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTagEventsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTagEventsDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTagEventsDo() {
    var objTags = {
        'CompareValue': $('#txtCompareValue').val(),
        'Operator': $('#ddlOperator').val(),
        'EventID': $('#ddlEvent').val(),
        'EventTagToNotify': $('#ddlEventTagToNotify').val(),
        'EventTagValue': $('#txtEventTagValue').val(),
        'AckTagToNotify': $('#ddlAckTagToNotify').val(),
        'FilterTimeInSecs': $('#txtFilterTimeInSecs').val(),
        'PopUpMsg': $('#txtPopUpMsg').val(),
    };

    $.ajax({
        url: "/TagEvents/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags,
            'UniqueID': $('#hdnIdKey').val()
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagEventsMenu();
            }
        }
    });
}