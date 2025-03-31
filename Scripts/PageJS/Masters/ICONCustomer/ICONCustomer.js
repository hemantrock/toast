$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenICONCustomerMenu();
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
            ICONCustomer: {
                validators: {
                    notEmpty: {
                        message: 'The Group name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Group name must be more than 1 and less than or equal to 30 characters long'
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

function SaveICONCustomer() {
    // int Id
    //string GroupName
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objICONCustomer = {
        'GroupName': $('#txtICONCustomer').val(),
    };

    $.ajax({
        url: "/ICONCustomer/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objICONCustomer),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenICONCustomerMenu();
            }
        }

        //success: function (result) {
        //    if (result == "pass") {
        //        alertDismissable("success", $('#txtICONCustomer').val() + " saved successfully.");
        //        OpenICONCustomerMenu();
        //    }
        //    else if (result == "fail") {
        //        alertDismissable("danger", "Failed to save Customer Group: " + $('#txtLongName').val() + ".");
        //    }
        //    else if (result == "error") {
        //        alertDismissable("danger", "Error in saving Customer Group: " + $('#txtLongName').val() + ".");
        //    }
        //}
    });
}

function UpdateICONCustomer() {
    //int Id
    //string StatusDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objICONCustomer = {
        'Id': $('#hdnIdKey').val(),
        'GroupName': $('#txtICONCustomer').val(),
    };

    $.ajax({
        url: "/ICONCustomer/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objICONCustomer),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenICONCustomerMenu();
            }
        }

        //success: function (result) {
        //    if (result == "pass") {
        //        alertDismissable("success", $('#txtICONCustomer').val() + " updated successfully.");
        //        OpenICONCustomerMenu();
        //    }
        //    else if (result == "fail") {
        //        alertDismissable("danger", "Failed to update Customer Group: " + $('#txtLongName').val() + ".");
        //    }
        //    else if (result == "error") {
        //        alertDismissable("danger", "Error in updation of Customer Group: " + $('#txtLongName').val() + ".");
        //    }
        //}
    });
}