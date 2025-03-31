$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenCustomerMenu();
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
        //txtCustomer
        //txtLockSeal
        //txtNoofLock
        //txtNoofLockIssued
        fields: {
            Customer: {
                validators: {
                    notEmpty: {
                        message: 'The Customer is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 45,
                        message: 'The Customer must be more than 3 and less than or equal to 45 characters long'
                    }
                }
            },
            CustomerCode: {
                validators: {
                    notEmpty: {
                        message: 'The Customer Code is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Customer Code must be numeric'
                    },
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
            var fullName = [validator.getFieldElements('txtCustomer').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveCustomer() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Add a New Customer";
    var activityDetail = "Customer: " + $('#txtCustomer').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveCustomerDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveCustomerDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveCustomerDo()
{
    ///int CustomerID
    // string [CustomerDesc]
    // string [Lock_Seal] 

    var objCustomer = {
        
        'CustomerCode': $('#txtCustomerCode').val(),
        'CustomerDesc': $('#txtCustomer').val(),
        'Lock_Seal': $('#txtLockSeal').val(),
        'CategoryID': $('#ddlCustomerCategory').val()
    };

    $.ajax({
        url: "/Customer/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCustomer),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);            
            if (result.blnStatus == true) {
                OpenCustomerMenu();
            }
        }
    });
}

function UpdateCustomer() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Edit Existing Customer";
    var activityDetail = "Customer: " + $('#txtCustomer').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateCustomerDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateCustomerDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateCustomerDo()
{
    //int CustomerID
    // string [CustomerDesc]
    // string [Lock_Seal] 

    var objCustomer = {
        'UniqueID': $('#hdnUniqueID').val(),
        'CustomerCode': $('#txtCustomerCode').val(),
        'CustomerDesc': $('#txtCustomer').val(),
        'Lock_Seal': $('#txtLockSeal').val(),
        'CategoryID': $('#ddlCustomerCategory').val()
    };

    $.ajax({
        url: "/Customer/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCustomer),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true)
            {
                OpenCustomerMenu();
            }
        }
    });
}