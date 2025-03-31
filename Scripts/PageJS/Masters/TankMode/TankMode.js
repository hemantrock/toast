$(document).ready(function () {
   

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTankModeMenu();
        $('#cancelModal').modal('hide');
    });

    $('#txtActiveFromDate').Datepicker({
        format: "dd-MMM-yyyy",
        autoclose: true
    });

    $('#txtActiveToDate').Datepicker({
        format: "dd-MMM-yyyy",
        autoclose: true
    });

    $('#txtActiveToDate').Datepicker()
      .on('hide', function (e) {
          alertActiveToDate($('#txtActiveToDate'));
      });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //txtModeName
            ModeName: {
                validators: {
                    notEmpty: {
                        message: 'The Mode Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Mode Name must be more than 1 and less than or equal to 30 characters long'
                    }
                }
            },
            shortName: {
                validators: {
                    notEmpty: {
                        message: 'The Short name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 2,
                        message: 'The Short name must  1  characters long'
                    }
                },
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
            var fullName = [validator.getFieldElements('txtModeName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTankMode()
{
    // int Mode
    //string ModeDesc
    //string ModeShortLetter
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objTankMode = {
        'ModeDesc': $('#txtModeName').val(),
        'ModeShortLetter': $('#txtShortName').val(),
    };
   

    $.ajax({
        url: "/TankMode/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankMode),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtModeName').val() + " saved successfully.");
                OpenTankModeMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Tank Mode: " + $('#txtModeName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Tank Mode: " + $('#txtModeName').val() + ".");
            }
        }
    });
}

function UpdateTankMode()
{
    
    // int Status
    //string StatusDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTankMode = {
        'Mode': $('#hdnIdKey').val(),
        'ModeDesc': $('#txtModeName').val(),
        'ModeShortLetter': $('#txtShortName').val(),
    };

    $.ajax({
        url: "/TankMode/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankMode),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtModeName').val() + " updated successfully.");
                OpenTankModeMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Tank Mode: " + $('#txtModeName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Tank Mode: " + $('#txtModeName').val() + ".");
            }
        }
    });
}