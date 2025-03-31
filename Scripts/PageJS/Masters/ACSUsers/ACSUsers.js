var LastTTNum;
$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenACSUsersMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            LoginID: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },
            FirstName: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },
            Surname: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },
            Designation: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select a valid Designation'
                    }
                }
            },
            Company: {
                validators: {
                    notEmpty: {
                        message: 'The Company is required and cannot be empty'
                    },
                }
            },
            MobileNo: {
                validators: {
                    digits: {
                        message: 'Mobile No should be in digits'
                    },
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'The Mobile No  should be 10 characters long'
                    }
                } 
            },
            EmpId: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },
            UserAccountValidityDays: {
                validators: {
                    notEmpty: {
                        message: 'The UserAccountValidityDays is required and cannot be empty'
                    },
                    digits: {
                        message: 'The User Account Validity Days must be a Number'
                    },
                }
            },
            AccountCreationDate: {
                validators: {
                    notEmpty: {
                        message: 'The AccountCreationDate is required and cannot be empty'
                    },
                    date: {
                        format: 'dd-M-yyyy',
                        message: 'The value is not a valid date'
                    }
                }
            },
            //CardAssignDate: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The CardAssignDate is required and cannot be empty'
            //        },
            //    }
            //},
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });
    AutoComplete($("#txtTruckNumber"), "TruckNumber", "ACSUsers");
    $('#ddlUserTypes').change(function () {
        var TypeId = $('#ddlUserTypes').val();

        if (TypeId == 2) {
            LastTTNum = $('#txtTruckNumber').val();
            $('#txtTruckNumber').val("");
            $('#txtTruckNumber').attr({ 'disabled': 'disabled'});
        }
        else if (TypeId == 1) {
            $('#txtTruckNumber').val(LastTTNum);
            $('#txtTruckNumber').removeAttr('disabled');
        }
        else
        {
            $('#txtTruckNumber').attr({ 'disabled': 'disabled' });
        }
    });
    $('#dtpValidUpto').datetimepicker({
        useCurrent: false,
        minDate: moment(),
        format: "D-MMM-YYYY"
    });
    $('.js-basic-single').select2({
        //placeholder: "Transporter",
        //width: "100%",
        //allowClear: true
    });
});

function UpdateACSUsers() {
    $('#FormBU').bootstrapValidator('resetForm');
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing ACS User";
    var activityDetail = "User Name: " + $('#txtUserName').val() + "(" + $('#txtReferenceCode').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateACSUsersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateACSUsersDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateACSUsersDo() {
    var VCurrentStatusActive = 0, userDisabled = 0;
    var pass = null;
    if ($('#chkCurrentStatus').is(":checked")) {
        VCurrentStatusActive = 1;
    }
    else {
        VCurrentStatusActive = 0;
    }

    if ($('#chkEnabled').is(":checked")) {
        userEnabled = 1;
    }
    else {
        userEnabled = 0;
    }

    var objUsers = {
        'UniqueID': $('#hdnIdKey').val(),
        'ReferenceCode': $('#txtReferenceCode').val(),
        'UserType': $('#ddlUserTypes').val(),
        'TransporterID': $('#ddlTransporters').val(),
        'TruckID': $('#txtTruckNumber').attr('data-key-value'),
        'MobileNo': $('#txtMobileNo').val(),
        'TASUserID': $('#txtTASUser').attr('data-key-value'),
        'Enabled': userEnabled,
        'ValidUpto': $('#dtpValidUpto').val(),
        };
    
    $.ajax({
        url: "/ACSUsers/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objUsers),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenACSUsersMenu();
            }
        }
    });
}
