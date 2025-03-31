$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenConfigurationMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ConfigurationName: {
                validators: {
                    notEmpty: {
                        message: 'The Configuration name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The Configuration name must be more than 3 and less than or equal to 30 characters long'
                    }
                }
            },

            ConfigurationDesc: {
                validators: {
                    notEmpty: {
                        message: 'The Configuration description is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: 'The Configuration description must be more than 3 and less than or equal to 50 characters long'
                    }
                }
            },

            ConfigurationValue: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
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

function SaveConfiguration() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Configuration";
    var activityDetail = "Parameter: " + $('#txtConfigurationName').val() + "; Configuration: " + $('#txtConfigurationValue').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveConfigurationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveConfigurationDo(); }, activityName, activityDetail);
            }
        }
    });
}


function SaveConfigurationDo()
{
    var EnabledStatusActive = 1;

   
    var objConfiguration = {
        'ParameterName': $('#txtConfigurationName').val(),
        'ParameterGroup': $('#txtParameterGroup').val(),
        'ParameterDesc': $('#txtConfigurationDesc').val(),
        'Value': $('#txtConfigurationValue').val(),
        'Enabled': EnabledStatusActive,
    };

    $.ajax({
        url: "/Configuration/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objConfiguration),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenConfigurationMenu();
            }
        }
    });
}

function UpdateConfiguration() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Configuration";
    var activityDetail = "Parameter: " + $('#txtConfigurationName').val() + "; Configuration: " + $('#txtConfigurationValue').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateConfigurationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateConfigurationDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateConfigurationDo()
{
    var EnabledStatusActive = 1;

    var objConfiguration = {
        'UniqueID': $('#hdnIdKey').val(),
        'ParameterName': $('#txtConfigurationName').val(),
        'ParameterGroup': $('#txtParameterGroup').val(),
        'ParameterDesc': $('#txtConfigurationDesc').val(),
        'Value': $('#txtConfigurationValue').val(),
        'Enabled': EnabledStatusActive,
    };

    $.ajax({
        url: "/Configuration/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objConfiguration),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenConfigurationMenu();
            }
        }
    });
}