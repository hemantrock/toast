$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenCardsMenu();
        $('#cancelModal').modal('hide');
    });


    $('#txtActiveFromDate').datetimepicker({
        format: "D-MMM-YYYY"
    });

    $('#txtActiveToDate').datetimepicker({
        format: "D-MMM-YYYY"
    });

    $('#txtActiveToDate').datetimepicker()
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
            CardReader: {
                validators: {
                    notEmpty: {
                        message: 'The Card Reader is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Status'
                    }

                }
            },

            CardPrivilege: {
                validators: {
                    notEmpty: {
                        message: 'The Card Privilege is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select privilege'
                    }
                }
            },

            CardNumber: {
                validators: {
                    notEmpty: {
                        message: 'The Card Number is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Card Number must be Integer value.'
                    },

                }
            },
            CardExpiryDate: {
                validators: {
                    notEmpty: {
                        message: 'The Card Expiry Date is required and cannot be empty'
                    }
                }
            }
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
            var fullName = [validator.getFieldElements('ddlCardReader').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });

    //$('#dtpCardExpiryDate').datetimepicker({
    //    format: "D-MMM-YYYY"
    //}).on('changeDate hide', function (ev) {
    //    $('#dtpCardExpiryDate').parent().removeClass('has-error').addClass('has-success');
    //    $('#dtpCardExpiryDate').parent().children("small").hide();
    //    $('#dtpCardExpiryDate').parent().children("i").removeClass("glyphicon-remove").addClass("glyphicon-ok");
    //});

    $('#dtpCardExpiryDate').datetimepicker({
        useCurrent: false,
        minDate: moment(),
        format: "D-MMM-YYYY"
    });
});

function SaveCards() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Card";
    var activityDetail = "Card: " + $('#txtCardNumber').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveCardsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveCardsDo(); }, activityName,activityDetail);
            }
        }
    });
}

function SaveCardsDo() {

    var cManager = 0;
    if ($('#chkIsManager').is(":checked")) {
        cManager = 1;
    }
    else {
        cManager = 0;
    }

    var objCards = {
        'CardNumber': $('#txtCardNumber').val(),
        'Status': $('#ddlCardReader').val(),
        'PrivilegeID': $('#ddlCardPrivilage').val(),
        'IsManager': cManager,
        'ExpiryDateTime': $('#dtpCardExpiryDate').val()
    };

    $.ajax({
        url: "/Cards/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCards),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenCardsMenu();
            }
        }
    });
}

function UpdateCards() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit an existing Card";
    var activityDetail = "Card: " + $('#txtCardNumber').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateCardsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateCardsDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateCardsDo() {

    var cManager = 0;
    if ($('#chkIsManager').is(":checked")) {
        cManager = 1;
    }
    else {
        cManager = 0;
    }

    var objCards = {
        'UniqueID': $('#hdnIdKey').val(),
        'CardNumber': $('#txtCardNumber').val(),
        'Status': $('#ddlCardReader').val(),
        'PrivilegeID': $('#ddlCardPrivilage').val(),
        'IsManager': cManager,
        'ExpiryDateTime': $('#dtpCardExpiryDate').val()
    };

    $.ajax({
        url: "/Cards/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objCards),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenCardsMenu();
            }
        }
    });
}

