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
            TransporterCode: {
                validators: {
                    notEmpty: {
                        message: 'The Transporter Code is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Transporter Code must be numeric'
                    }
                }
            },
            TransporterName: {
                validators: {
                    notEmpty: {
                        message: 'The Transporter name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Transporter name must be more than 1 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('txtTransporterName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTransporter() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Transporters";
    var activityDetail = "Transporters Name: " + $('#txtTransporterName').val() + "(" + $('#txtTransporterCode').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTransporterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTransporterDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveTransporterDo()
{   
    var objTransporter = {
        'TransporterCode': $('#txtTransporterCode').val(),
        'TransporterDesc': $('#txtTransporterName').val(),
    };

    $.ajax({
        url: "/Transporter/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTransporter),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);            
            if (result.blnStatus == true) {
                OpenTransporterMenu();
            }
        }
        
        
    });
}
function UpdateTransporter() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Transporters";
    var activityDetail = "Transporters Name: " + $('#txtTransporterName').val() + "(" + $('#txtTransporterCode').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTransporterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTransporterDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTransporterDo()
{
    //int TransporterId
    //string TransporterDesc

    var objTransporter = {
        'UniqueID': $('#hdnUniqueID').val(),
        'TransporterCode': $('#txtTransporterCode').val(),
        'TransporterDesc': $('#txtTransporterName').val(),
    };

    $.ajax({
        url: "/Transporter/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTransporter),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true)
            {
                OpenTransporterMenu();
            }
        }
        //success: function (result) {
        //    if (result == "pass") {
        //        alertDismissable("success", "TransporterName: " + $('#txtTransporterName').val() + " updated successfully.");
        //        OpenTransporterMenu();
        //    }
        //    else if (result == "fail") {
        //        alertDismissable("danger", "Failed to update TransporterName: " + $('#txtTransporterName').val() + ".");
        //    }
        //    else if (result == "error") {
        //        alertDismissable("danger", "Error in updation of TransporterName: " + $('#txtTransporterName').val() + ".");
        //    }
        //}
    });
}