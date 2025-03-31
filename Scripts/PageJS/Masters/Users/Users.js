$(document).ready(function () {
    $("#txtCurrentTxnPassword").prop('disabled', true);
    $("#txtNewTxnPassword").prop('disabled', true);
    $("#txtConfirmNewTxnPassword").prop('disabled', true);

    $("#txtCurrentLoginPassword").prop('disabled', true);
    $("#txtNewLoginPassword").prop('disabled', true);
    $("#txtConfirmNewLoginPassword").prop('disabled', true);

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenUsersMenu();
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
            TxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            ConfirmTxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            LoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            ConfirmLoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            NewLoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            ConfirmNewLoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            NewTxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            ConfirmNewTxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            CurrentLoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            CurrentTxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
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
            PhoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'The PhoneNumber is required and cannot be empty'
                    },
                }
            },
            //MailId: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The MailId is required and cannot be empty'
            //        },
            //        emailAddress: {
            //            message: 'The value is not a valid email address'
            //        }
            //    }
            //},
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
    InitDTPickers();
});

function ShowPasswordDiv() {
    $('#divReset').hide();
    $('#divPassword').show();

    $('#formPassword').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ResetLoginPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
                    },
                }
            },
            ResetTxnPassword: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$",
                        message: 'Password must contain number, lower, upper and special(#?!@$%^&*-) of 8 to 30 character'
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
        }
    });
}
function SaveUsers() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New User";
    var activityDetail = "User Name: " + $('#txtFirstName').val() + "(" + $('#txtLoginID').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveUsersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveUsersDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveUsersDo() {

    if ($('#txtLoginPwd').val() != $('#txtConfirmLoginPwd').val()) {
        alertDismissable("danger", "New Login Password and Confirm Login Password don't match");
        return false;
    }

    if ($('#txtTxnPwd').val() != $('#txtConfirmTxnPwd').val()) {
        alertDismissable("danger", "New Txn Password and Confirm Txn Password don't match");
        return false;
    }

    var VCurrentStatusActive = 0;
    if ($('#chkCurrentStatus').is(":checked")) {
        VCurrentStatusActive = 1;
    }
    else {
        VCurrentStatusActive = 0;
    }

    var objUsers = {
        'LoginID': $('#txtLoginID').val(),
        'UserName': $('#txtFirstName').val(),
        'MiddleName': $('#txtMiddleName').val(),
        'Surname': $('#txtSurname').val(),
        'UserRoleID': $('#ddlDesignation').val(),
        'Company': $('#txtCompany').val(),
        'PhoneNumber': $('#txtPhoneNumber').val(),
        'MailID': $('#txtMailId').val(),
        'CardID': $('#txtCardID').val(),
        'CurrentStatus': VCurrentStatusActive,
        'Privilege': $('#txtPrivilege').val(),
        'EmpID': $('#txtEmpId').val(),
        'AccountValidUpto': $('#dtpAccountValidUpto').val(),
    };

    $.ajax({
        url: "/Users/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'objUsers': objUsers, 'CurrentLoginPassword': $('#txtLoginPwd').val(), 'CurrentTxnPassword': $('#txtTxnPwd').val() }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenUsersMenu();
            }
        }
    });
}
function UpdateUsers() {
    $('#FormBU').bootstrapValidator('resetForm');
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing User";
    var activityDetail = "User Name: " + $('#txtFirstName').val() + "(" + $('#txtLoginID').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateUsersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateUsersDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateUsersDo() {
    var VCurrentStatusActive = 0, userDisabled = 0;
    var pass = null;
    if ($('#chkCurrentStatus').is(":checked")) {
        VCurrentStatusActive = 1;
    }
    else {
        VCurrentStatusActive = 0;
    }

    if ($('#chkUserDisabled').is(":checked")) {
        userDisabled = 1;
    }
    else {
        userDisabled = 0;
    }

    var objUsers = {
        'UserID': $('#hdnIdKey').val(),
        'LoginID': $('#txtLoginID').val(),
        'UserName': $('#txtUserName').val(),
        'MiddleName': $('#txtMiddleName').val(),
        'Surname': $('#txtSurname').val(),
        'UserRoleID': $('#ddlDesignation').val(),
        'Company': $('#txtCompany').val(),
        'PhoneNumber': $('#txtPhoneNumber').val(),
        'MailID': $('#txtMailId').val(),
        'CardID': $('#txtCardID').val(),
        'CurrentStatus': VCurrentStatusActive,
        'Disabled': userDisabled,
        'Visible': ($('#chkUserArchive').is(":checked") == false),
        'Privilege': $('#txtPrivilege').val(),
        'EmpID': $('#txtEmpId').val(),
        'AccountValidUpto': $('#dtpAccountValidUpto').val(),
    };

    $.ajax({
        url: "/Users/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objUsers),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenUsersMenu();
            }
        }
    });
}

function ResetPassword() {
    $('#formPassword').bootstrapValidator('validate');

    if ($('#formPassword .has-error').length > 0) {
        return false;
    }

    if ($("#chEditLogin").is(':checked') == false && $("#chEditTxn").is(':checked') == false) {
        alertDismissable("danger", "Please select login or Txn password checkbox or Press cancel to exit.");
        return false;
    }

    var IsLoginPwd = "false", IsTxnPwd = "false";
    if ($("#chEditLogin").is(':checked')) {
        IsLoginPwd = "true";
    }
    if ($("#chEditTxn").is(':checked')) {
        IsTxnPwd = "true";
    }

    var objUsers = {
        'UserID': $('#hdnIdKey').val(),
        'NewLoginPassword': $('#txtNewLoginPassword').val(),
        'NewTxnPassword': $('#txtNewTxnPassword').val(),
        'IsLoginPwd': IsLoginPwd,
        'IsTxnPwd': IsTxnPwd
    };

    $.ajax({
        url: "/Users/ResetPassword",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objUsers),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenUsersMenu();
            }
        }
    });
}

function UpdatePassword() {

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    if ($("#chLogin").is(':checked') == false && $("#chTxn").is(':checked') == false) {
        alertDismissable("danger", "Please select login or Txn password checkbox or Press cancel to exit.");
        return false;
    }

    var IsLoginPwd = "false", IsTxnPwd = "false";
    if ($("#chLogin").is(':checked')) {
        IsLoginPwd = "true";
    }
    if ($("#chTxn").is(':checked')) {
        IsTxnPwd = "true";
    }
    var objUsers = {
        'UserID': $('#hdnIdKey').val(),
        'CurrentLoginPassword': $('#txtCurrentLoginPassword').val(),
        'NewLoginPassword': $('#txtNewLoginPassword').val(),
        'ConfirmNewLoginPassword': $('#txtConfirmNewLoginPassword').val(),
        'CurrentTxnPassword': $('#txtCurrentTxnPassword').val(),
        'NewTxnPassword': $('#txtNewTxnPassword').val(),
        'ConfirmNewTxnPassword': $('#txtConfirmNewTxnPassword').val(),
        'IsLoginPwd': IsLoginPwd,
        'IsTxnPwd': IsTxnPwd,

    };
    $.ajax({
        url: "/Users/ChangePassword",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objUsers),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);

            if (result.blnStatus == true) {
                $('#myConfirmMsg').html("<p> Selected Password(s) have been reset. Please login again. </p>");
                $('#confirmModal').modal('show');
                $('#confirmModal').draggable({ handle: ".modal-header" });
                $("#btnConfirmOK").unbind('click');
                $("#btnConfirmOK").click(function () {
                    $('#confirmModal').modal('hide');
                    window.location = "../Home/Index";
                });
            }
        }
    });
}

$('#chLogin').click(function () {
    if ($("#chLogin").is(':checked')) {
        $("#txtCurrentLoginPassword").prop('disabled', false);
        $("#txtNewLoginPassword").prop('disabled', false);
        $("#txtConfirmNewLoginPassword").prop('disabled', false);
    }
    else {
        $("#txtCurrentLoginPassword").prop('disabled', true);
        $("#txtNewLoginPassword").prop('disabled', true);
        $("#txtConfirmNewLoginPassword").prop('disabled', true);
    }
});

$('#chTxn').click(function () {

    if ($("#chTxn").is(':checked')) {
        $("#txtCurrentTxnPassword").prop('disabled', false);
        $("#txtNewTxnPassword").prop('disabled', false);
        $("#txtConfirmNewTxnPassword").prop('disabled', false);
    }
    else {
        $("#txtCurrentTxnPassword").prop('disabled', true);
        $("#txtNewTxnPassword").prop('disabled', true);
        $("#txtConfirmNewTxnPassword").prop('disabled', true);
    }
});

$('#chEditLogin').click(function () {

    if ($("#chEditLogin").is(':checked')) {
        $("#txtNewLoginPassword").prop('disabled', false);
    }
    else {
        $("#txtNewLoginPassword").prop('disabled', true);
    }
});

$('#chEditTxn').click(function () {

    if ($("#chEditTxn").is(':checked')) {
        $("#txtNewTxnPassword").prop('disabled', false);
    }
    else {
        $("#txtNewTxnPassword").prop('disabled', true);
    }
});

function InitDTPickers() {
    $('#dtpAccountValidUpto').datetimepicker({
        format: 'D-MMM-YYYY HH:mm',
    });
}