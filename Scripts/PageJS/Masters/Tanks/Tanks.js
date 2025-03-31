$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTanksMenu();
        $('#cancelModal').modal('hide');
    });

    $('#frmTanks').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            TankName: {
                validators: {
                    notEmpty: {
                        message: 'The Tank Name cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: 'The Tank Name  must be 3 to 10 characters'
                    }
                }
            },
            SAPTankNo: {
                validators: {
                    notEmpty: {
                        message: 'The Tank Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 8,
                        message: 'ERP Tank No must be be 3 to 8 characters long'
                    }
                }
            },
            TankType: {
                validators: {
                    notEmpty: {
                        message: 'The TankType is required and cannot be empty'
                    },
                    greaterThan: {
                        value: "1",
                        message: 'Select TankType'
                    }
                }
            },
            Product: {
                validators: {
                    notEmpty: {
                        message: 'The Product is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Product'
                    }
                }
            },
            PlantCode: {
                validators: {
                    notEmpty: {
                        message: 'The Plant Code is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Plant Code'
                    }
                }
            },
            NominalDia: {
                validators: {
                    notEmpty: {
                        message: 'The Nominal Dia cannot be empty'
                    },
                    numeric: {
                        message: 'Nominal Dia  must be numeric value.'
                    },
                }
            },
            PrimaryGaugeType: {
                validators: {
                    notEmpty: {
                        message: 'The Primary Gauge Type is required and cannot be empty'
                    },
                }
            },
            SafeFillingCapacity: {
                validators: {
                    notEmpty: {
                        message: 'The Safe Filling Height cannot be empty'
                    },
                    numeric: {
                        message: 'Safe Filling Height  must be numeric value.'
                    },
                }
            },
            MaxVolume: {
                validators: {
                    notEmpty: {
                        message: 'The MaxVolume cannot be empty'
                    },
                    numeric: {
                        message: 'MaxVolume  must be numeric value.'
                    },
                }
            },
            DipReferenceHeight: {
                validators: {
                    notEmpty: {
                        message: 'The Dip Reference Height cannot be empty'
                    },
                    //regexp: {
                    //    regexp: "((\d+)(\.\d{1,2}))$",
                    //    message: 'Dip Reference Height must be Integer value'
                    //},
                    numeric: {
                        message: 'Dip Reference Height must be numeric value.'
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
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
    $('.js-basic-single').select2();
});
function SaveTanks() {
    $('#frmTanks').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Tank";
    var activityDetail = "Tank Name: " + $('#txtTankName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTanksDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTanksDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveTanksDo()
{
 
    var objTanks = {
        'TankName': $('#txtTankName').val(),
        'SAPTankNo': $('#txtSAPTankNo').val(),
        'TankType': $('#ddlTankType').val(),
        'ProductID': $('#ddlProduct').val(),
        'PrimaryGaugeType': $('#ddlPrimaryGaugeType').val(),
        'SecGaugeType': $('#ddlSecGaugeType').val(),
        'WBSLocation': $('#ddlWBSLocation').val(),
        //'PlantCodeID': $('#ddlPlantCode').val(),
        'DipReferenceHeight': $('#txtDipReferenceHeight').val(),
        'NominalDia': $('#txtNominalDia').val(),
        'MaxVolume': $('#txtMaxVolume').val(),
        'TankMode': $('#ddlTankMode').val(),
        'Density': $('#txtDensity').val(),
    };

    $.ajax({
        url: "/Tanks/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTanks),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTanksMenu();
            }
        }
    });
}
function UpdateTanks() {
    $('#frmTanks').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Tank";
    var activityDetail = "Tank Name: " + $('#txtTankName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTanksDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTanksDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTanksDo()
{
    var objTanks = {
        'UniqueID': $('#hdnIdKey').val(),
        'TankName': $('#txtTankName').val(),
        'SAPTankNo': $('#txtSAPTankNo').val(),
        'TankType': $('#ddlTankType').val(),
        'ProductID': $('#ddlProduct').val(),
        'PrimaryGaugeType': $('#ddlPrimaryGaugeType').val(),
        'SecGaugeType': $('#ddlSecGaugeType').val(),
        'WBSLocation': $('#ddlWBSLocation').val(),
        //'PlantCodeID': $('#ddlPlantCode').val(),
        'DipReferenceHeight': $('#txtDipReferenceHeight').val(),
        'NominalDia': $('#txtNominalDia').val(),
        'MaxVolume': $('#txtMaxVolume').val(),
        'TankMode': $('#ddlTankMode').val(),
        'Density': $('#txtDensity').val(),
    };

    $.ajax({
        url: "/Tanks/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTanks),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTanksMenu();
            }
        }
    });
}