$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenLPProductsMasterMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            LPNo: {
                validators: {
                    greaterThan: {
                        value: 1,
                        message: 'Select LP No'
                    }
                }
            },
            Product: {
                validators: {
                    greaterThan: {
                        value: 1,
                        message: 'Select Product'
                    }
                }
            },
            HeaderNumber: {
                validators: {
                    notEmpty: {
                        message: 'The Header Number is required and cannot be empty'
                    },
                    number: {
                        message: 'The Header Number is must be Numeric'
                    },
                }
            },
            RecipeNo: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    between: {
                        min: 1,
                        max: 99,
                        message: 'The Recipe No. should be between 1 and 99'
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
            var fullName = [validator.getFieldElements('txtDescription').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveLPProductsMaster() {
    var activityName = "Add a New LP Product";
    var activityDetail = "Product Id: " + $('#ddlProduct').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveLPProductsMasterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveLPProductsMasterDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveLPProductsMasterDo()
{
    var vGantryNo = 0;
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var vEnable=0;
    if ($('#chkEnable').is(":checked")) {
        vEnable = 1;
    }
    else {
        vEnable = 0;
    }
    var objLPProductMaster = {
        'LoadingPointNo': $('#ddlLPNo').val(),
        'ProductID': $('#ddlProduct').val(),
        'ProductStatus': vEnable,
        'RecipeNo': $('#txtRecipeNo').val(),
    };

    $.ajax({
        url: "/LPProductsMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLPProductMaster),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLPProductsMasterMenu();
            }
        }
    });
}

function UpdateLPProductsMaster() {
    var activityName = "Edit Existing LP Product";
    var activityDetail = "Product Id: " + $('#ddlProduct').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateLPProductsMasterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateLPProductsMasterDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateLPProductsMasterDo()
{
    var vGantryNo = 0;
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var vEnable=0;
    if ($('#chkEnable').is(":checked")) {
        vEnable = 1;
    }
    else {
        vEnable = 0;
    }
    var objLPProductMaster = {
        'LoadingPointNo': $('#txtLPNo').val(),
        'ProductID': $('#ddlProduct').val(),
        'ProductStatus': vEnable,
        'RecipeNo': $('#txtRecipeNo').val()
    };

    $.ajax({
        url: "/LPProductsMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLPProductMaster),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLPProductsMasterMenu();
            }
        }
    });
}