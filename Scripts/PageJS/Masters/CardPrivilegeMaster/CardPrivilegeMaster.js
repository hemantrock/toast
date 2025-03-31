$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenCardPrivilegeMasterMenu();
        $('#cancelModal').modal('hide');
    });

    //txtCardPrivilage
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
            CardPrivilage: {
                validators: {
                    notEmpty: {
                        message: 'The Card Privilage is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Card Privilage must be more than 1 and less than or equal to 30 characters long'
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
            var fullName = [validator.getFieldElements('txtCardPrivilage').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveCardPrivilegeMaster()
{
    // int PrivilegeID
    //string PrivilegeDesc
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objCardPrivilegeMaster = {
        'PrivilegeDesc': $('#txtCardPrivilage').val(),
    };

    $.ajax({
        url: "/CardPrivilegeMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCardPrivilegeMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtCardPrivilage').val() + " saved successfully.");
                OpenCardPrivilegeMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save Card Privilege: " + $('#txtCardPrivilage').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving Card Privilege: " + $('#txtCardPrivilage').val() + ".");
            }
        }
    });
}

function UpdateCardPrivilegeMaster()
{
    
    // int PrivilegeID
    //string PrivilegeDesc

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objCardPrivilegeMaster = {
        'PrivilegeID': $('#hdnIdKey').val(),
        'PrivilegeDesc': $('#txtCardPrivilage').val(),
    };

    $.ajax({
        url: "/CardPrivilegeMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCardPrivilegeMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtCardPrivilage').val() + " updated successfully.");
                OpenCardPrivilegeMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update Card Privilege: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of Card Privilege: " + $('#txtLongName').val() + ".");
            }
        }
    });
}