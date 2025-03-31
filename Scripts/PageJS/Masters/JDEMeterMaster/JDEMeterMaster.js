$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenJDEMeterMasterMenu();
        $('#cancelModal').modal('hide');
    });

    //chkGantryNo
    //BayNo
    //txtLpNo
    //txtDescription
    //txtSerialNo
    //txtTasItemNo
    //txtBlendConfig
    //txttotalcolumnName
    //txtBussinessUnit
    //digits: {
    //        message: 'Lp No must be Integer value.'
    //},
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
            BayNo: {
                validators: {
                    notEmpty: {
                        message: 'The Bay No  is required and cannot be empty'
                    },
                 
                }
            },
            LpNo: {
                validators: {
                    notEmpty: {
                        message: 'The Lp No is required and cannot be empty'
                    },
                   
                }
            },

            Description: {
                validators: {
                    notEmpty: {
                        message: 'The Description is required and cannot be empty'
                    },

                }
            },
            SerialNo: {
                validators: {
                    notEmpty: {
                        message: 'The SerialNo is required and cannot be empty'
                    },

                }
            },
            TasItemNo: {
                validators: {
                    notEmpty: {
                        message: 'The TasItemNo is required and cannot be empty'
                    },

                }
            },
            BlendConfig: {
                validators: {
                    notEmpty: {
                        message: 'The BlendConfig is required and cannot be empty'
                    },

                }
            },
            
            totalcolumnName: {
                validators: {
                    notEmpty: {
                        message: 'The total column Name is required and cannot be empty'
                    },

                }
            },
            BussinessUnit: {
                validators: {
                    notEmpty: {
                        message: 'The Bussiness Unit is required and cannot be empty'
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
            var fullName = [validator.getFieldElements('txtDescription').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveJDEMeterMaster()
{

    //    [MeterNo] [int] NOT NULL,
    //    [GantryNo] [int] NULL,
    //    [BayId] [int] NULL,
    //    [LPNo] [int] NULL,
    //    [Description] [varchar](30) NULL,
    //    [SerialNo] [varchar](25) NULL,
    //    [TASItemNo] [varchar](8) NULL,
    //    [BlendConfig] [varchar](10) NULL,
    //    [TotColumnName] [varchar](20) NULL,
    //    [BussinessUnit] [varchar](5) NULL,
   

    var vGantryNo = 0;
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    if ($('#chkGantryNo').is(":checked")) {
        // it is checked
        vGantryNo = 1;
    }
    else {
        vGantryNo = 2;
    }

    var objJDEMeterMaster = {
        'GantryNo': vGantryNo,
        'BayId': $('#ddlBayNo').val(),
        'LPNo': $('#txtLpNo').val(),
        'Description': $('#txtDescription').val(),
        'SerialNo': $('#txtSerialNo').val(),
        'TASItemNo': $('#txtTasItemNo').val(),
        'BlendConfig': $('#txtBlendConfig').val(),
        'TotColumnName': $('#txttotalcolumnName').val(),
        'BussinessUnit': $('#txtBussinessUnit').val(),
    };

    $.ajax({
        url: "/JDEMeterMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objJDEMeterMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtDescription').val() + " saved successfully.");
                OpenJDEMeterMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save JDEMeterMaster: " + $('#txtDescription').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving JDEMeterMaster: " + $('#txtDescription').val() + ".");
            }
        }
    });
}

function UpdateJDEMeterMaster()
{
    //    [MeterNo] [int] NOT NULL,
    //    [GantryNo] [int] NULL,
    //    [BayId] [int] NULL,
    //    [LPNo] [int] NULL,
    //    [Description] [varchar](30) NULL,
    //    [SerialNo] [varchar](25) NULL,
    //    [TASItemNo] [varchar](8) NULL,
    //    [BlendConfig] [varchar](10) NULL,
    //    [TotColumnName] [varchar](20) NULL,
    //    [BussinessUnit] [varchar](5) NULL,
    var vGantryNo = 0;
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    if ($('#chkGantryNo').is(":checked")) {
        // it is checked
        vGantryNo = 1;
    }
    else {
        vManager = 0;
    }
    var objJDEMeterMaster = {
        'MeterNo': $('#hdnIdKey').val(),
        //'GantryNo': $('#GantryNo').val(),
        'GantryNo': vGantryNo,
        'BayId': $('#ddlBayNo').val(),
        'LPNo': $('#txtLpNo').val(),
        'Description': $('#txtDescription').val(),
        'SerialNo': $('#txtSerialNo').val(),
        'TASItemNo': $('#txtTasItemNo').val(),
        'BlendConfig': $('#txtBlendConfig').val(),
        'TotColumnName': $('#txttotalcolumnName').val(),
        'BussinessUnit': $('#txtBussinessUnit').val(),
    };

    $.ajax({
        url: "/JDEMeterMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objJDEMeterMaster),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtDescription').val() + " updated successfully.");
                OpenJDEMeterMasterMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update JDEMeterMaster: " + $('#txtDescription').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of  JDEMeterMaster: " + $('#txtDescription').val() + ".");
            }
        }
    });
}