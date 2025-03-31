$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTransporterMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            LocationName: {
                validators: {
                    notEmpty: {
                        message: 'The Location name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Location name must be more than 1 and less than or equal to 30 characters long'
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
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('txtLocationName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveLocation() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Location";
    var activityDetail = "Location Name: " + $('#txtLocationName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveLocationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveLocationDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveLocationDo()
{
    //int LocationId
    //string LocationDesc

   
    var objLocation = {
        'LocationDesc': $('#txtLocationName').val(),
    };

    $.ajax({
        url: "/Location/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLocation),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtLocationName').val() + " saved successfully.");
                OpenLocationMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Location: " + $('#txtLocationName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Location: " + $('#txtLocationName').val() + ".");
            }
        }
    });
}
function UpdateLocation() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Location";
    var activityDetail = "Location Name: " + $('#txtLocationName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateLocationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateLocationDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateLocationDo()
{
    //int LocationId
    //string LocationDesc

    var objLocation = {
        'LocationId': $('#hdnIdKey').val(),
        'LocationDesc': $('#txtLocationName').val(),
    };

    $.ajax({
        url: "/Location/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLocation),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtLocationName').val() + " updated successfully.");
                OpenLocationMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Location: " + $('#txtLocationName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of  Location: " + $('#txtLocationName').val() + ".");
            }
        }
    });
}