$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenCardStatusMasterMenu();
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
            var fullName = [validator.getFieldElements('txtStatus').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveCardStatusMaster()
{
    // int Status
    //string StatusDesc
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objCardStatusMaster = {
        'StatusDesc': $('#txtStatus').val(),
    };

    $.ajax({
        url: "/CardStatusMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCardStatusMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtStatus').val() + " saved successfully.");
                OpenCardStatusMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Card: " + $('#txtStatus').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Card: " + $('#txtStatus').val() + ".");
            }
        }
    });
}

function UpdateCardStatusMaster()
{
    
    // int Status
    //string StatusDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objCardStatusMaster = {
        'Status': $('#hdnIdKey').val(),
        'StatusDesc': $('#txtStatus').val(),
    };

    $.ajax({
        url: "/CardStatusMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCardStatusMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtStatus').val() + " updated successfully.");
                OpenCardStatusMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Status : " + $('#txtStatus').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Status: " + $('#txtStatus').val() + ".");
            }
        }
    });
}