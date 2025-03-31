$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenMeterFactorMenu();
        $('#cancelModal').modal('hide');
    });

    
    $('#txtCalibrationDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
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

            BayNo: {
                validators: {
                    notEmpty: {
                        message: 'The BayNo is required and cannot be empty'
                    },
                }
            },
            LpNo: {
                validators: {
                    notEmpty: {
                        message: 'The LpNo is required and cannot be empty'
                    },
                }
            },
            Product: {
                validators: {
                    notEmpty: {
                        message: 'The distance is required and cannot be empty'
                    },
                }
            },
        
            MeterNo: {
                validators: {
                    notEmpty: {
                        message: 'The Meter No is required and cannot be empty'
                    },
                    digits: {
                        message: 'MeterNo must be Integer value.'
                    },
                }
            },
            CalibrationNo: {
                validators: {
                    notEmpty: {
                        message: 'The CalibrationNo is required and cannot be empty'
                    },
                }
            },
            CalibrationDate: {
                validators: {
                    notEmpty: {
                        message: 'The Calibration Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            Frequency1: {
                validators: {
                    notEmpty: {
                        message: 'The Frequency1 is required and cannot be empty'
                    },
                    digits: {
                        message: 'Frequency1 Strd must be Integer value.'
                    },
                }
            },
            Frequency2: {
                validators: {
                    notEmpty: {
                        message: 'The Frequency2 is required and cannot be empty'
                    },
                    digits: {
                        message: 'Frequency2 Strd must be Integer value.'
                    },
                }
            },
            Frequency3: {
                validators: {
                    notEmpty: {
                        message: 'The Frequency3 is required and cannot be empty'
                    },
                    digits: {
                        message: 'Frequency3 Strd must be Integer value.'
                    },
                }
            },
            Frequency4: {
                validators: {
                    notEmpty: {
                        message: 'The Frequency4 is required and cannot be empty'
                    },
                    digits: {
                        message: 'Frequency4 Strd must be Integer value.'
                    },
                }
            },
            Frequency5: {
                validators: {
                    notEmpty: {
                        message: 'The Frequency5 is required and cannot be empty'
                    },
                    digits: {
                        message: 'Frequency5 Strd must be Integer value.'
                    },
                }
            },
            kF1: {
                validators: {
                    notEmpty: {
                        message: 'The kF1 is required and cannot be empty'
                    },
                    digits: {
                        message: 'kF1  must be Integer value.'
                    },
                }
            },
            kF2: {
                validators: {
                    notEmpty: {
                        message: 'The kF2 is required and cannot be empty'
                    },
                    digits: {
                        message: 'kF2  must be Integer value.'
                    },
                }
            },
            kF3: {
                validators: {
                    notEmpty: {
                        message: 'The kF3 is required and cannot be empty'
                    },
                    digits: {
                        message: 'kF3  must be Integer value.'
                    },
                }
            },
            kF4: {
                validators: {
                    notEmpty: {
                        message: 'The kF4 is required and cannot be empty'
                    },
                    digits: {
                        message: 'kF4  must be Integer value.'
                    },
                }
            },
            kF5: {
                validators: {
                    notEmpty: {
                        message: 'The kF5 is required and cannot be empty'
                    },
                    digits: {
                        message: 'kF5  must be Integer value.'
                    },
                }
            },
            OthersUser: {
                validators: {
                    notEmpty: {
                        message: 'The Others is required and cannot be empty'
                    },
                }
            },

            Comment: {
                validators: {
                    notEmpty: {
                        message: 'The Comment is required and cannot be empty'
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
});

function SaveMeterFactor()
{
    //[MeterId] [int] NOT NULL,
	//[GantryNo] [int] NOT NULL,
	//[BayId] [int] NULL,
	//[LPNo] [int] NOT NULL,
	//[ProductID] [int] NULL,
	//[MeterNo] [int] NULL,
	//[CalibrationNo] [int] NULL,
	//[CalibrationDate] [datetime] NULL,
	//[Frequency1] [int] NULL,
	//[Frequency2] [int] NULL,
	//[Frequency3] [int] NULL,
	//[Frequency4] [int] NULL,
	//[Frequency5] [int] NULL,
	//[KFactor1] [decimal](18, 0) NULL,
	//[KFactor2] [decimal](18, 0) NULL,
	//[KFactor3] [decimal](18, 0) NULL,
	//[KFactor4] [decimal](18, 0) NULL,
	//[KFactor5] [decimal](18, 0) NULL,
	//[Comments] [varchar](500) NULL,
	//[OtherUserName] [varchar](100) NULL,
	//[UserID] [int] NULL,
	//[TS] [datetime] NULL,

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
    var objMeterFactor = {
       
        'GantryNo': vGantryNo,
        'BayId': $('#ddlBayNo').val(),
        'LPNo': $('#txtLpNo').val(),
        'ProductID': $('#ddlProduct').val(),
        'MeterNo': $('#txtMeterNo').val(),
        'CalibrationNo': $('#txtCalibrationNo').val(),
        'CalibrationDate': $('#txtCalibrationDate').val(),
        'Frequency1': $('#txtFrequency1').val(),
        'Frequency2': $('#txtFrequency2').val(),
        'Frequency3': $('#txtFrequency3').val(),
        'Frequency4': $('#txtFrequency4').val(),
        'Frequency5': $('#txtFrequency5').val(),
        'KFactor1': $('#txtkF1').val(),
        'KFactor2': $('#txtkF2').val(),
        'KFactor3': $('#txtkF3').val(),
        'KFactor4': $('#txtkF4').val(),
        'KFactor5': $('#txtkF5').val(),
        'Comments': $('#txtComment').val(),
        'OtherUserName': $('#txtOthersUser').val(),
    };

    $.ajax({
        url: "/MeterFactor/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMeterFactor),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtLongName').val() + " saved successfully.");
                OpenMeterFactorMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save MeterFactor: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving MeterFactor: " + $('#txtLongName').val() + ".");
            }
        }
    });
}

function UpdateMeterFactor()
{
//    [MeterId] [int] NOT NULL,
//[GantryNo] [int] NOT NULL,
//[BayId] [int] NULL,
//[LPNo] [int] NOT NULL,
//[ProductID] [int] NULL,
//[MeterNo] [int] NULL,
//[CalibrationNo] [int] NULL,
//[CalibrationDate] [datetime] NULL,
//[Frequency1] [int] NULL,
//[Frequency2] [int] NULL,
//[Frequency3] [int] NULL,
//[Frequency4] [int] NULL,
//[Frequency5] [int] NULL,
//[KFactor1] [decimal](18, 0) NULL,
//[KFactor2] [decimal](18, 0) NULL,
//[KFactor3] [decimal](18, 0) NULL,
//[KFactor4] [decimal](18, 0) NULL,
//[KFactor5] [decimal](18, 0) NULL,
//[Comments] [varchar](500) NULL,
//[OtherUserName] [varchar](100) NULL,
//[UserID] [int] NULL,
    //[TS] [datetime] NULL,
    var vGantryNo = 0;
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }


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
    var objMeterFactor = {
        'MeterId': $('#hdnIdKey').val(),
        //'GantryNo': $('#selectG').val(),
        'GantryNo': vGantryNo,
        'BayId': $('#ddlBayNo').val(),
        'LPNo': $('#txtLpNo').val(),
        'ProductID': $('#ddlProduct').val(),
        'MeterNo': $('#txtMeterNo').val(),
        'CalibrationNo': $('#txtCalibrationNo').val(),
        'CalibrationDate': $('#txtCalibrationDate').val(),
        'Frequency1': $('#txtFrequency1').val(),
        'Frequency2': $('#txtFrequency2').val(),
        'Frequency3': $('#txtFrequency3').val(),
        'Frequency4': $('#txtFrequency4').val(),
        'Frequency5': $('#txtFrequency5').val(),
        'KFactor1': $('#txtkF1').val(),
        'KFactor2': $('#txtkF2').val(),
        'KFactor3': $('#txtkF3').val(),
        'KFactor4': $('#txtkF4').val(),
        'KFactor5': $('#txtkF5').val(),
        'Comments': $('#txtComment').val(),
        'OtherUserName': $('#txtOthersUser').val(),
    };

    $.ajax({
        url: "/MeterFactor/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMeterFactor),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtLongName').val() + " updated successfully.");
                OpenMeterFactorMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update MeterFactor: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of  MeterFactor: " + $('#txtLongName').val() + ".");
            }
        }
    });
}