$(document).ready(function () {
   

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTankStatusMenu();
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
            //txtStatus
            //txtShortName
            Status: {
                validators: {
                    notEmpty: {
                        message: 'The Status is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Status must be more than 1 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTankStatus()
{
    // int StatusID
    //string StatusDesc
    //string StatusShortLetter
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objTankStatus = {
        'StatusDesc': $('#txtStatus').val(),
        'StatusShortLetter': $('#txtShortName').val(),
    };
   

    $.ajax({
        url: "/TankStatus/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankStatus),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtStatus').val() + " saved successfully.");
                OpenTankStatusMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Tank Status: " + $('#txtStatus').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Tank Status: " + $('#txtLongName').val() + ".");
            }
        }
    });
}

function UpdateTankStatus()
{
    
    // int Status
    //string StatusDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTankStatus = {
        'StatusID': $('#hdnIdKey').val(),
        'StatusDesc': $('#txtStatus').val(),
        'StatusShortLetter': $('#txtShortName').val(),
    };

    $.ajax({
        url: "/TankStatus/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankStatus),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtStatus').val() + " updated successfully.");
                OpenTankStatusMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Tank Status: " + $('#txtStatus').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Tank Status: " + $('#txtStatus').val() + ".");
            }
        }
    });
}