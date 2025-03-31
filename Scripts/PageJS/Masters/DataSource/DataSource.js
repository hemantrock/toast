$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenDSMenu();
        $('#cancelModal').modal('hide');
    });

    var sourceVal = $("#ddlConnType option:selected").attr("ConnType");

    if (sourceVal == 1) {
        $('.RTUField').show();
        $('.OPCField').hide();
        $('.TCPField').hide();
    }
    else if (sourceVal == 2) {
        $('.TCPField').show();
        $('.OPCField').hide();
        $('.RTUField').hide();
    }
    else if (sourceVal == 3) {
        $('.OPCField').show();
        $('.RTUField').hide();
        $('.TCPField').hide();
    }
    else {
        $('.RTUField').hide();
        $('.TCPField').hide();
        $('.OPCField').hide();
    }

    frmBSValidator();
});

$('#ddlConnType').change(function () {
    var sourceVal = $("#ddlConnType option:selected").attr("ConnType");
    ClearField();
    if (sourceVal == 1) {
        $('.RTUField').show();
        $('.OPCField').hide();
        $('.TCPField').hide();
    }
    else if (sourceVal == 2) {
        $('.TCPField').show();
        $('.OPCField').hide();
        $('.RTUField').hide();
    }
    else if (sourceVal == 3) {
        $('.OPCField').show();
        $('.RTUField').hide();
        $('.TCPField').hide();
    }
    else {
        $('.RTUField').hide();
        $('.TCPField').hide();
        $('.OPCField').hide();
    }
    $("#frmDataSource").data('bootstrapValidator').resetForm();
    frmBSValidator();
});

function frmBSValidator() {
   
    $('form').each(function () {
        $(this).bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            fields: {
                DSName: {
                    validators: {
                        notEmpty: {
                            message: 'The Data Source Name cannot be empty'
                        },
                    }
                },
                ProcessId: {
                    validators: {
                        notEmpty: {
                            message: 'The Process Id is required and cannot be empty'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select Process Id'
                        }
                    }
                },
                ConnType: {
                    validators: {
                        notEmpty: {
                            message: 'The Connection Type is required and cannot be empty'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select Connection Type'
                        }
                    }
                },
                PrimarySerialPort: {
                    validators: {
                        notEmpty: {
                            message: 'Primary Serial Port cannot be blank'
                        },
                    }
                },
                BackupSerialPort: {
                    validators: {
                        notEmpty: {
                            message: 'Backup Serial Port cannot be blank'
                        },
                    }
                },
                BaudRate: {
                    validators: {
                        notEmpty: {
                            message: 'The Baud Rate is required and cannot be empty'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select Baud Rate'
                        }
                    }
                },
                //Parity: {
                //    validators: {
                //        notEmpty: {
                //            message: 'The Parity is required and cannot be empty'
                //        },
                //        greaterThan: {
                //            value: 1,
                //            message: 'Select Parity'
                //        }
                //    }
                //},
                FIFO: {
                    validators: {
                        notEmpty: {
                            message: 'FIFO cannot be blank'
                        },
                    }
                },
                Poll_Interval_msec: {
                    validators: {
                        notEmpty: {
                            message: 'Poll Interval msec cannot be blank'
                        },
                    }
                },
                PrimaryHostName: {
                    validators: {
                        notEmpty: {
                            message: 'Primary Host Name cannot be blank'
                        },
                    }
                },
                BackupHostName: {
                    validators: {
                        notEmpty: {
                            message: 'Backup Host Name cannot be blank'
                        },
                    }
                },
                ProgId: {
                    validators: {
                        notEmpty: {
                            message: 'OPC Prod/ Instance Name cannot be blank'
                        },
                    }
                },
                //CommType: {
                //    validators: {
                //        notEmpty: {
                //            message: 'The Comm Type is required and cannot be empty'
                //        },
                //        greaterThan: {
                //            value: 1,
                //            message: 'Select Comm Type'
                //        }
                //    }
                //},
                PrimaryIPAddress: {
                    validators: {
                        notEmpty: {
                            message: 'The Primary IP Address is required'
                        },
                        ip: {
                            message: 'Please enter a valid IP address'
                        }
                    }
                },
                BackupIPAddress: {
                    validators: {
                        ip: {
                            message: 'Please enter a valid IP address'
                        }
                    }
                },
                PrimaryIPPort: {
                    validators: {
                        notEmpty: {
                            message: 'The Primary IP Port is required'
                        },
                        digits: {
                            message: 'Primary IP Port must be Integer value.'
                        },
                    }
                },
                BackupIPPort: {
                    validators: {
                        digits: {
                            message: 'Backup IP Port must be Integer value.'
                        },
                    }
                },
                Poll_Interval_msec_TCP: {
                    validators: {
                        notEmpty: {
                            message: 'Poll Interval msec cannot be blank'
                        },
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
                var fullName = [validator.getFieldElements('longName').val(),
				validator.getFieldElements('shortName').val()].join(' ');
            }
        });
        //});
    });


}

function saveNewDS() {
    $('form').each(function () {
        $(this).bootstrapValidator('validate');
    });
    var activityName = "Add a New DataSource";
    var activityDetail = "DataSource: " + $('#txtDSName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                saveNewDSDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { saveNewDSDo(); }, activityName, activityDetail);
            }
        }
    });
}

function saveNewDSDo() {

    if ($('.has-error').length > 0) {
        return false;
    }

    var sourceVal = $("#ddlConnType option:selected").attr("ConnType");
    var objNewDS;

    if (sourceVal == 1) {
        objNewDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'RTUPrimarySerialPort': $('#txtPrimarySerialPort').val(),
            'RTUBackupSerialPort': $('#txtBackupSerialPort').val(),
            'RTUBaudRate': $('#ddlBaudRate').val(),
            'RTUParity': $('#ddlParity').val(),
            'RTUFIFO': $('#txtFIFO').val(),
            'RTUPoll_Interval_msec': $('#txtPoll_Interval_msec').val(),
        };
    }
    else if (sourceVal == 2) {
        objNewDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'TCPPrimaryIPAddress': $('#txtPrimaryIPAddress').val(),
            'TCPPrimaryIPPort': $('#txtPrimaryIPPort').val(),
            'TCPBackupIPAddress': $('#txtBackupIPAddress').val(),
            'TCPBackupIPPort': $('#txtBackupIPPort').val(),
            'TCPCommTypeID': $('#ddlCommType').val(),
            'TCPPoll_Interval_msec': $('#txtPoll_Interval_msec_TCP').val(),
        };
    }
    else {
        objNewDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'OPCPrimaryHostName': $('#txtPrimaryHostName').val(),
            'OPCBackupHostName': $('#txtBackupHostName').val(),
            'OPCProgId': $('#txtProgId').val()
        };
    }

    $.ajax({
        url: "/DataSource/AddNewDataSource",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objDataSource': objNewDS,
            'ConnType': $('#ddlConnType').val()
        }),
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                OpenDSMenu();
            }
        }
    });
}

function UpdateDataSource() {
    $('#frmDataSource').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing DataSource";
    var activityDetail = "DataSource: " + $('#txtDSName').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateDataSourceDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateDataSourceDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateDataSourceDo() {
    
  
    var sourceVal = $("#ddlConnType option:selected").attr("ConnType");
    var objUpdateDS;

    if (sourceVal == 1) {
        objUpdateDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'RTUPrimarySerialPort': $('#txtPrimarySerialPort').val(),
            'RTUBackupSerialPort': $('#txtBackupSerialPort').val(),
            'RTUBaudRate': $('#ddlBaudRate').val(),
            'RTUParity': $('#ddlParity').val(),
            'RTUFIFO': $('#txtFIFO').val(),
            'RTUPoll_Interval_msec': $('#txtPoll_Interval_msec').val(),
        };
    }
    else if (sourceVal == 2) {
        objUpdateDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'TCPPrimaryIPAddress': $('#txtPrimaryIPAddress').val(),
            'TCPPrimaryIPPort': $('#txtPrimaryIPPort').val(),
            'TCPBackupIPAddress': $('#txtBackupIPAddress').val(),
            'TCPBackupIPPort': $('#txtBackupIPPort').val(),
            'TCPCommTypeID': $('#ddlCommType').val(),
            'TCPPoll_Interval_msec': $('#txtPoll_Interval_msec_TCP').val(),
        };
    }
    else {
        objUpdateDS = {
            'DSName': $('#txtDSName').val(),
            'ProcessID': $('#ddlProcessId').val(),
            'ConnTypeID': $('#ddlConnType').val(),
            'OPCPrimaryHostName': $('#txtPrimaryHostName').val(),
            'OPCBackupHostName': $('#txtBackupHostName').val(),
            'OPCProgId': $('#txtProgId').val()
        };
    }

    $.ajax({
        url: "/DataSource/EditDataSource",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objUpdateDS': objUpdateDS
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenDSMenu();
            }
        }
    });
}

function ClearField() {

    //RTU
    $('#txtPrimarySerialPort').val('');
    $('#txtBackupSerialPort').val('');
    $('#ddlBaudRate').val('0');
    $('#ddlParity').val('0');
    $('#txtFIFO').val('');
    $('#txtPoll_Interval_msec').val('');

    //TCP
    $('#txtPrimaryIPAddress').val('');
    $('#txtPrimaryIPPort').val('');
    $('#txtBackupIPAddress').val('');
    $('#txtBackupIPPort').val('');
    $('#ddlCommType').val('0');
    $('#txtPoll_Interval_msec_TCP').val('');

    //OPC
    $('#txtPrimaryHostName').val('');
    $('#txtBackupHostName').val('');
    $('#txtProgId').val('');
}