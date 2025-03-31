$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTruckTypeMasterMenu();
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
            TruckType: {
                validators: {
                    notEmpty: {
                        message: 'The Type Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The Type Name must be more than 2 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('txtTruckType').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTruckTypeMaster()
{
    //int TypeID
    //string TypeDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objTruckTypeMaster = {
        'TypeDesc': $('#txtTruckType').val(),
    };

    $.ajax({
        url: "/TruckTypeMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTruckTypeMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtTruckType').val() + " saved successfully.");
                OpenTruckTypeMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Truck Type: " + $('#txtTruckType').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Truck Type: " + $('#txtTruckType').val() + ".");
            }
        }
    });
}

function UpdateTruckTypeMaster()
{
    //int TypeID
    //string TypeDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTruckTypeMaster = {
        'TypeID': $('#hdnIdKey').val(),
        'TypeDesc': $('#txtTruckType').val(),
    };

    $.ajax({
        url: "/TruckTypeMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTruckTypeMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtTruckType').val() + " updated successfully.");
                OpenTruckTypeMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Truck Type: " + $('#txtTruckType').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Truck Type: " + $('#txtTruckType').val() + ".");
            }
        }
    });
}