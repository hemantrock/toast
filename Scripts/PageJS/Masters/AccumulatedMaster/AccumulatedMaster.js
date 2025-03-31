$(document).ready(function () {
  
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenAccumulatedMasterMenu();
        $('#cancelModal').modal('hide');
    });


    $('#frmLogin').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Accumulated: {
                validators: {
                    notEmpty: {
                        message: 'The Accumulated Total is required and cannot be empty'
                 
                    },
                    digits: {
                        message: 'Accumulated Total must be Integer value.'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The long name must be more than 1 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('txtAccumulated').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveAccumulatedMaster()
{
    //int BCIndex 
    //int Acctotal
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objAccumulatedMaster = {
        'Acctotal': $('#txtAccumulated').val(),
    };

    $.ajax({
        url: "/AccumulatedMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objAccumulatedMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtAccumulated').val() + " saved successfully.");
                OpenAccumulatedMasterMenu();
            }
            else if (result=="fail")
            {
                alertDismissable("danger", "Failed to save Accumulated: " + $('#txtAccumulated').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Accumulated: " + $('#txtAccumulated').val() + ".");
            }
        }
    });
}

function UpdateAccumulatedMaster()
{
    
    // int BCIndex 
    //string Acctotal

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objAccumulatedMaster = {
        'BCIndex ': $('#hdnIdKey').val(),
        'Acctotal': $('#txtAccumulated').val(),
    };

    $.ajax({
        url: "/AccumulatedMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objAccumulatedMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtAccumulated').val() + " updated successfully.");
                OpenAccumulatedMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Accumulated: " + $('#txtAccumulated').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Accumulated: " + $('#txtAccumulated').val() + ".");
            }
        }
    });
}