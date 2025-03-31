$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTagTrendsMenu();
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
            TrendName: {
                validators: {
                    notEmpty: {
                        message: 'The TrendName is required and cannot be empty'
                    },
                }
            },
            Duration: {
                validators: {
                    notEmpty: {
                        message: 'The Duration is required and cannot be empty'
                    },
                }
            },
            ScanTime: {
                validators: {
                    notEmpty: {
                        message: 'The Sacn is required and cannot be empty'
                    },
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
function SaveTagTrends() {
    $('#frmTagTrends').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New TagTrend";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val() + "(" + $('#txtTrendName').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTagTrendsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTagTrendsDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveTagTrendsDo() {
    var objTags = {
        'TagName': $('#ddlTagName').val(),
        'TrendName': $('#txtTrendName').val(),
        'ScanTime': $('#txtScanTime').val(),
        'DurationID': $('#ddlDuration').val(),
        'Color': $('#txtColor').val().replace('#','')
    };

    $.ajax({
        url: "/TagTrends/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagTrendsMenu();
            }
        }
    });
}
function UpdateTagTrends() {
    $('#frmTags').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing TagTrend";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val() + "(" + $('#txtTrendName').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTagTrendsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTagTrendsDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTagTrendsDo() {
    var objTags = {
        'TagName': $('#ddlTagName').val(),
        'TrendName': $('#txtTrendName').val(),
        'ScanTime': $('#txtScanTime').val(),
        'DurationID': $('#ddlDuration').val(),
        'Color': $('#txtColor').val().replace('#','')
    };

    $.ajax({
        url: "/TagTrends/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags,
            'TagName': $('#hdnIdKey').val(),
            'TrendName': $('#hdnIdTrendName').val()
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagTrendsMenu();
            }
        }
    });
}