$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTankTypeMenu();
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
            //txtTankType
            TankType: {
                validators: {
                    notEmpty: {
                        message: 'The Tank Type is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Tank Type must be more than 1 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTankType()
{
    // int Status
    //string StatusDesc
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objTankType = {
        'TYPE': $('#txtTankType').val(),
    };

    $.ajax({
        url: "/TankType/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankType),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtTankType').val() + " saved successfully.");
                OpenTankTypeMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Card: " + $('#txtTankType').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Card: " + $('#txtTankType').val() + ".");
            }
        }
    });
}

function UpdateTankType()
{
    
    // int Status
    //string StatusDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTankType = {
        'TYPE_ID': $('#hdnIdKey').val(),
        'TYPE': $('#txtTankType').val(),
    };

    $.ajax({
        url: "/TankType/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTankType),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtTankType').val() + " updated successfully.");
                OpenTankTypeMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Status : " + $('#txtTankType').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Status: " + $('#txtTankType').val() + ".");
            }
        }
    });
}