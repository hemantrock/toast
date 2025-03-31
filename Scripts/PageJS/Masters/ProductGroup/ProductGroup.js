$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenProductGroupMenu();
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
            productGroup: {
                validators: {
                    notEmpty: {
                        message: 'The Product Group is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Product Group must be more than 1 and less than or equal to 30 characters long'
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

function SaveProductGroup()
{
    // int Id
    //string GroupName
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objProductGroup = {
        'ProductGroupDesc': $('#txtProductGroup').val(),
        'ProductID': $('#ddlProduct').val(),
    };

    $.ajax({
        url: "/ProductGroup/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objProductGroup),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtProductGroup').val() + " saved successfully.");
                OpenProductGroupMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Customer Group: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Customer Group: " + $('#txtLongName').val() + ".");
            }
        }
    });
}

function UpdateProductGroup()
{
    //int ProductGroupID
    //string ProductGroupDesc
    //int ProductID
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objProductGroup = {
        'ProductGroupID': $('#hdnIdKey').val(),
        'ProductGroupDesc': $('#txtProductGroup').val(),
        'ProductID': $('#ddlProduct').val(),
    };

    $.ajax({
        url: "/ProductGroup/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objProductGroup),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtProductGroup').val() + " updated successfully.");
                OpenProductGroupMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Customer Group: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Customer Group: " + $('#txtLongName').val() + ".");
            }
        }
    });
}