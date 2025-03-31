$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenMaintainceScheduleMenu();
        $('#cancelModal').modal('hide');
    });


    $('#txtCalibrationDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

    $('#txtCalibrationDueDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

    $('#txtCleanedDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

   


    $('#txtClearingDueDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

    $('#txtMaintainceDueDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

    $('#txtMaintainceDate').Datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    });

 


    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            SerialNo: {
                validators: {
                    notEmpty: {
                        message: 'The SerialNo  is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The SerialNo must be more than 3 and less than or equal to 30 characters long'
                    }
                }
            },
            EquipmentType: {
                validators: {
                    notEmpty: {
                        message: 'The Equipment Type is required and cannot be empty'
                    },
                  
                }
            },

            InstrumentDesc: {
                validators: {
                    notEmpty: {
                        message: 'The Instrument Description is required and cannot be empty'
                    },
                    stringLength: {
                        min: 5,
                        max: 60,
                        message: 'The Instrument Description must be more than 3 and less than or equal to 30 characters long'
                    }

                }
            },
            
            Make: {
                validators: {
                    notEmpty: {
                        message: 'The Make is required and cannot be empty'
                    },

                }
            },
            ModelNo: {
                validators: {
                    notEmpty: {
                        message: 'The ModelNo is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 15,
                        message: 'The ModelNo must be more than 3 and less than or equal to 30 characters long'
                    }

                }
            },
            Quantity: {
                validators: {
                    notEmpty: {
                        message: 'The Quantity is required and cannot be empty'
                    },
                    digits: {
                        message: 'Quantity  must be Integer value.'
                    },

                }
            },
            CalFrequency: {
                validators: {
                    notEmpty: {
                        message: 'The CalFrequency is required and cannot be empty'
                    },
                    digits: {
                        message: 'CalFrequency  must be Integer value.'
                    },

                }
            },
            CleaningFrq: {
                validators: {
                    notEmpty: {
                        message: 'The Cleaning Frq is required and cannot be empty'
                    },
                    digits: {
                        message: 'Cleaning Frq  must be Integer value.'
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

            CleanedDate: {
                validators: {
                    notEmpty: {
                        message: 'The Cleaned Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },

            MaintainceDate: {
                validators: {
                    notEmpty: {
                        message: 'The Maintaince Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            CalibrationDueDate: {
                validators: {
                    notEmpty: {
                        message: 'The Calibration Due Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            ClearingDueDate: {
                validators: {
                    notEmpty: {
                        message: 'The ClearingDueDate is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            MaintainceDueDate: {
                validators: {
                    notEmpty: {
                        message: 'The Maintaince Due Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            Remarks: {
                validators: {
                    notEmpty: {
                        message: 'The Remarks is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 15,
                        message: 'The Remarks must be more than 3 and less than or equal to 30 characters long'
                    }

                }
            },
            Location: {
                validators: {
                    notEmpty: {
                        message: 'The Location is required and cannot be empty'
                    },
                  

                }
            },
            CalibrationReq: {
                validators: {
                    notEmpty: {
                        message: 'The Calibration Req is required and cannot be empty'
                    },

                }
            },

            MaintananceFrequency: {
                validators: {
                    notEmpty: {
                        message: 'The Maintanance Frequency is required and cannot be empty'
                    },
                    digits: {
                        message: 'Maintanance Frequency  must be Integer value.'
                    },

                }
            },

            Remainder: {
                validators: {
                    notEmpty: {
                        message: 'The Remainder is required and cannot be empty'
                    },
                    digits: {
                        message: 'Quantity  must be Integer value.'
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

function SaveMaintainceSchedule()
{
    //[DevId] [int] NOT NULL,
    //[EquipmentType] [varchar](50) NULL,
    //[InstrumentDesc] [varchar](100) NOT NULL,
    //[Make] [varchar](10) NULL,
    //[ModelNo] [varchar](10) NULL,
    //[Qty] [int] NULL,
    //[CalibrationFreq] [int] NULL,
    //[CleaningFreq] [int] NULL,
    //[MaintainceFreq] [int] NULL,
    //[CalibrationDate] [datetime] NULL,
    //[CalibrationDueDate] [datetime] NULL,
    //[CleanedDate] [datetime] NULL,
    //[CleaningDueDate] [datetime] NULL,
    //[MaintainceDate] [datetime] NULL,
    //[MaintainceDueDate] [datetime] NULL,
    //[Remarks] [varchar](50) NULL,
    //[Location] [varchar](100) NULL,
    //[CalibrationRequired] [varchar](50) NULL,
    //[Reminder] [int] NULL,
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    var objMaintainceSchedule = {
        
        'EquipmentType': $('#txtEquipmentType').val(),
        'SerialNo': $('#txtSerialNo').val(),
        'InstrumentDesc': $('#txtInstrumentDesc').val(),
        'Make': $('#txtMake').val(),
        'ModelNo': $('#txtModelNo').val(),
        'Qty': $('#txtQuantity').val(),
        'CalibrationFreq': $('#txtCalFrequency').val(),
        'CleaningFreq': $('#txtCleaningFrq').val(),
        'MaintainceFreq': $('#txtMaintananceFrequency').val(),
        'CalibrationDate': $('#txtCalibrationDate').val(),
        'CalibrationDueDate': $('#txtCalibrationDueDate').val(),
        'CleanedDate': $('#txtCleanedDate').val(),
        'CleaningDueDate': $('#txtClearingDueDate').val(),
        'MaintainceDate': $('#txtMaintainceDate').val(),
        'MaintainceDueDate': $('#txtMaintainceDueDate').val(),
        'Remarks': $('#txtRemarks').val(),
        'Location': $('#ddlLocation').val(),
        'CalibrationRequired': $('#txtCalibrationReq').val(),
        'Reminder': $('#txtRemainder').val(),
    };

    $.ajax({
        url: "/MaintainceSchedule/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMaintainceSchedule),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtSerialNo').val() + " saved successfully.");
                OpenMaintainceScheduleMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save MaintainceSchedule: " + $('#txtLongName').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving MaintainceSchedule: " + $('#txtLongName').val() + ".");
            }
        }
    });
}

function UpdateMaintainceSchedule()
{
    // [SerialNo] [int] NOT NULL,
    //[DevId] [int] NOT NULL,
    //[EquipmentType] [varchar](50) NULL,
    //[InstrumentDesc] [varchar](100) NOT NULL,
    //[Make] [varchar](10) NULL,
    //[ModelNo] [varchar](10) NULL,
    //[Qty] [int] NULL,
    //[CalibrationFreq] [int] NULL,
    //[CleaningFreq] [int] NULL,
    //[MaintainceFreq] [int] NULL,
    //[CalibrationDate] [datetime] NULL,
    //[CalibrationDueDate] [datetime] NULL,
    //[CleanedDate] [datetime] NULL,
    //[CleaningDueDate] [datetime] NULL,
    //[MaintainceDate] [datetime] NULL,
    //[MaintainceDueDate] [datetime] NULL,
    //[Remarks] [varchar](50) NULL,
    //[Location] [varchar](100) NULL,
    //[CalibrationRequired] [varchar](50) NULL,
    //[Reminder] [int] NULL,
    //[UserID] [int] NOT NULL,
    //[TS] [datetime] NULL,
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objMaintainceSchedule = {
        'DevId': $('#hdnIdKey').val(),
        'SerialNo': $('#txtSerialNo').val(),
        'EquipmentType': $('#txtEquipmentType').val(),
        'InstrumentDesc': $('#txtInstrumentDesc').val(),
        'Make': $('#txtMake').val(),
        'ModelNo': $('#txtModelNo').val(),
        'Qty': $('#txtQuantity').val(),
        'CalibrationFreq': $('#txtCalFrequency').val(),
        'CleaningFreq': $('#txtCleaningFrq').val(),
        'MaintainceFreq': $('#txtMaintananceFrequency').val(),
        'CalibrationDate': $('#txtCalibrationDate').val(),
        'CalibrationDueDate': $('#txtCalibrationDueDate').val(),
        'CleanedDate': $('#txtCleanedDate').val(),
        'CleaningDueDate': $('#txtClearingDueDate').val(),
        'MaintainceDate': $('#txtMaintainceDate').val(),
        'MaintainceDueDate': $('#txtMaintainceDueDate').val(),
        'Remarks': $('#txtRemarks').val(),
        'Location': $('#ddlLocation').val(),
        'CalibrationRequired': $('#txtCalibrationReq').val(),
        'Reminder': $('#txtRemainder').val(),
    };

    $.ajax({
        url: "/MaintainceSchedule/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objMaintainceSchedule),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txtSerialNo').val() + " updated successfully.");
                OpenMaintainceScheduleMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update MaintainceSchedule: " + $('#txtSerialNo').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of  MaintainceSchedule: " + $('#txtSerialNo').val() + ".");
            }
        }
    });
}