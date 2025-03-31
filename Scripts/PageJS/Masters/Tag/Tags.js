$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTagsMasterMenu();
        $('#cancelModal').modal('hide');
    });

    var sourceVal = $("#ddlDataSource option:selected").attr("ConnType");

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

    var item = $("#ddlDataType option:selected").text();
    if (item.toUpperCase() == "BOOL" || item.toUpperCase() == "STRING") {
        
        $('.decimalShow').hide();
        if (item.toUpperCase() == "BOOL") {
            if (sourceVal == 1){
                $('.BoolData .RTUField').show();
            }
            else if (sourceVal == 2) {
                $('.BoolData .TCPField').show();
            }
        }
        else {
            $('.BoolData').hide();
        }
    }
    else {
        $('.BoolData').hide();
        $('.decimalShow').show();
    }
    frmBSValidator();
    $("#txtDeviceType").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/Tags/DeviceType_Autocomplete",
                dataType: "json",
                data: "{ 'term': '" + request.term + "'}",
                success: function (data) {
                    if (data.blnStatus != 'undefined' && data.blnStatus == false) {
                        //alertDismissable(result.strType, result.strMessage);
                    }
                    else {
                        response($.map(data, function (item) {
                            return { label: item, value: item };
                        }))
                    }
                },
                error: function (result) {
                    alert(response.responseText);
                },
                failure: function () {
                    response.responseText
                }
            });
        }
    });
});

$('#ddlDataSource').change(function () {
    var sourceVal = $("#ddlDataSource option:selected").attr("ConnType");
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
    $("#frmTag").data('bootstrapValidator').resetForm();
    frmBSValidator();

});

$('#ddlDataType').change(function () {
    var item = $("#ddlDataType option:selected").text();
    if (item.toUpperCase() == "BOOL" || item.toUpperCase() == "STRING") {
        $('.decimalShow').hide();
        $('#txtMinVal').val("");
        $('#txtMaxVal').val("");
        $('#txtScaling').val("");
        $('#txtRoundDigits').val("");
        $('#ddlUOM').prop('selectedIndex', 0);
        if (item.toUpperCase() == "BOOL") {
            var sourceVal = $("#ddlDataSource option:selected").attr("ConnType");
            if (sourceVal == 1) {
                //$('.BoolData .RTUField').show();
                $('.BoolDataRTUField').show();
            }
            else if (sourceVal == 2) {
                //$('.BoolData .TCPField').show();
                $('.BoolDataTCPField').show();
            }
        }
        else { $('.BoolData').hide(); }
        $("#frmTag").data('bootstrapValidator').resetForm();
    }
    else {
        $('.decimalShow').show();
        $('.BoolData').hide();
        $("#frmTag").data('bootstrapValidator').resetForm();
    }
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
                TagName: {
                    validators: {
                        notEmpty: {
                            message: 'The Tag Name cannot be empty'
                        },
                    }
                },
                TagDesc: {
                    validators: {
                        notEmpty: {
                            message: 'The TagDesc is required and cannot be empty'
                        },
                    }
                },
                TagDescShort: {
                    validators: {
                        notEmpty: {
                            message: 'The Tag Desc Short is required and cannot be empty'
                        },
                    }
                },
                MinVal: {
                    validators: {
                        notEmpty: {
                            message: 'The MinVal is required and cannot be empty'
                        },
                        numeric: {
                            message: 'MinVal must be numeric value.'
                        },
                    }
                },
                MaxVal: {
                    validators: {
                        notEmpty: {
                            message: 'The MaxVal is required and cannot be empty'
                        },
                        numeric: {
                            message: 'MaxVal must be numeric value.'
                        },
                    }
                },
                //UOM: {
                //    validators: {
                //        notEmpty: {
                //            message: 'The UOM is required and cannot be empty'
                //        },
                //        greaterThan: {
                //            value: 1,
                //            message: 'Select UOM'
                //        }
                //    }
                //},
                DataType: {
                    validators: {
                        notEmpty: {
                            message: 'The DataType is required and cannot be empty'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select DataType'
                        }
                    }
                },
                Scaling: {
                    validators: {
                        notEmpty: {
                            message: 'The Scaling is required and cannot be empty'
                        },
                        numeric: {
                            message: 'Scaling must be numeric value.'
                        },
                    }
                },
                RoundDigits: {
                    validators: {
                        notEmpty: {
                            message: 'The Round Digits is required'
                        },
                        between: {
                            min: 0,
                            max: 8,
                            message: 'The Round Digits must be between 0 and 8'
                        },
                    }
                },
                Location: {
                    validators: {
                        notEmpty: {
                            message: 'The Location is required and cannot be empty'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select Location'
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
                PrimarySerialPort: {
                    validators: {
                        notEmpty: {
                            message: 'The Primary Port is required and cannot be blank'
                        },
                        regexp: {
                            regexp: /^COM[1-9][0-9]?$/,
                            message: 'The Primary Port must be COM1 to COM99'
                        },
                    }
                },
                BackupSerialPort: {
                    validators: {
                        regexp: {
                            regexp: /^COM[1-9][0-9]?$/,
                            message: 'The Backup Port must be COM1 to COM99'
                        },
                    }
                },
                BaudRate: {
                    validators: {
                        notEmpty: {
                            message: 'The Baud Rate is required and cannot be blank'
                        },
                        greaterThan: {
                            value: 1,
                            message: 'Select Baud Rate'
                        }
                    }
                },
                Parity: {
                    validators: {
                        notEmpty: {
                            message: 'The Parity is required'
                        },
                        callback: {
                            message: 'Please select Parity',
                        }
                    }
                },
                Poll_Interval_msec: {
                    validators: {
                        notEmpty: {
                            message: 'Poll Interval in ms is required'
                        },
                        digits: {
                            message: 'Poll Interval must be Integer value.'
                        },
                    }
                },
                SlaveIdRTU: {
                    validators: {
                        notEmpty: {
                            message: 'Slave ID cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 255,
                            message: 'The SlaveID must be between 1 and 255'
                        }
                    }
                },
                StartRegisterRTU: {
                    validators: {
                        notEmpty: {
                            message: 'Start Register cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 49999,
                            message: 'StartRegister must be between 1 and 49999'
                        }
                    }
                },
                WriteCoilRegisterRTU: {
                    validators: {
                        //notEmpty: {
                        //    message: 'The Write Coil Register is required and cannot be empty'
                        //},
                        numeric: {
                            message: 'Write Coil Register must be numeric value.'
                        },
                    }
                },
                NoOfBytesRTU: {
                    validators: {
                        notEmpty: {
                            message: 'No Of Bytes cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 4,
                            message: 'No Of Bytes must be between 1 and 4'
                        }
                    }
                },
                SegmentNoRTU: {
                    validators: {
                        notEmpty: {
                            message: 'Segment No cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 16,
                            message: 'Segment No must be between 1 and 16'
                        }
                    }
                },
                SlaveIdTCP: {
                    validators: {
                        notEmpty: {
                            message: 'Slave ID cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 255,
                            message: 'The SlaveID must be between 1 and 255'
                        }
                    }
                },
                StartRegisterTCP: {
                    validators: {
                        notEmpty: {
                            message: 'Start Register cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 49999,
                            message: 'StartRegister must be between 1 and 49999'
                        }
                    }
                },
                NoOfBytesTCP: {
                    validators: {
                        notEmpty: {
                            message: 'No Of Bytes cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 4,
                            message: 'No Of Bytes must be between 1 and 4'
                        }
                    }
                },
                SegmentNoTCP: {
                    validators: {
                        notEmpty: {
                            message: 'Segment No cannot be blank'
                        },
                        between: {
                            min: 1,
                            max: 16,
                            message: 'Segment No must be between 1 and 16'
                        }
                    }
                },
                WriteCoilRegisterTCP: {
                    validators: {
                        //notEmpty: {
                        //    message: 'The Write Coil Register is required and cannot be empty'
                        //},
                        numeric: {
                            message: 'Write Coil Register must be numeric value.'
                        },
                    }
                },
                OPCTagName: {
                    validators: {
                        notEmpty: {
                            message: 'OPC Tag Name cannot be blank'
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
                ProgId: {
                    validators: {
                        notEmpty: {
                            message: 'OPC Prod/ Instance Name cannot be blank'
                        },
                    }
                },
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

function saveNewTags() {
    $('form').each(function () {
        $(this).bootstrapValidator('validate');
    });
    var activityName = "Add a New Tag";
    var activityDetail = "Tag Name: " + $('#txtTagName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                saveNewTagsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { saveNewTagsDo(); }, activityName, activityDetail);
            }
        }
    });
}

function saveNewTagsDo() {
    
    if ($('.has-error').length > 0) {
        return false;
    }

    var ConnectionType;

    var sourceVal = $("#ddlDataSource option:selected").attr("ConnType");
    var objNewTags;
    
    if (sourceVal == 1 || sourceVal == 3) {
        objNewTags = {
            'TagName': $('#txtTagName').val(),
            'TagDescription': $('#txtTagDesc').val(),
            'TagDescShort': $('#txtTagDescShort').val(),
            'DSId': $('#ddlDataSource').val(),
            'MinVal': $('#txtMinVal').val(),
            'MaxVal': $('#txtMaxVal').val(),
            'UnitId': $('#ddlUOM').val(),
            'DataType': $('#ddlDataType').val(),
            'Scaling': $('#txtScaling').val(),
            'RoundDigits': $('#txtRoundDigits').val(),
            'DeviceType': $('#txtDeviceType').val(),

            'TagGroup': $('#txtTagGroup').val(),
            'OPCTagName': $('#txtOPCTagName').val(),

            'SlaveId': $('#txtSlaveIdRTU').val(),
            'RegType': $('#ddlRegTypeRTU').val(),
            'StartRegister': $('#txtStartRegisterRTU').val(),
            'NoOfBytes': $('#txtNoOfBytesRTU').val(),
            'SegmentNo': $('#txtSegmentNoRTU').val(),
            'WriteCoilAddr': $('#txtWriteCoilRegisterRTU').val()
        };
    }
    else {
        objNewTags = {
            'TagName': $('#txtTagName').val(),
            'TagDescription': $('#txtTagDesc').val(),
            'TagDescShort': $('#txtTagDescShort').val(),
            'DSId': $('#ddlDataSource').val(),
            'MinVal': $('#txtMinVal').val(),
            'MaxVal': $('#txtMaxVal').val(),
            'UnitId': $('#ddlUOM').val(),
            'DataType': $('#ddlDataType').val(),
            'Scaling': $('#txtScaling').val(),
            'RoundDigits': $('#txtRoundDigits').val(),
            'DeviceType': $('#txtDeviceType').val(),

            'TagGroup': $('#txtTagGroup').val(),
            'OPCTagName': $('#txtOPCTagName').val(),

            'SlaveId': $('#txtSlaveIdTCP').val(),
            'RegType': $('#ddlRegTypeTCP').val(),
            'StartRegister': $('#txtStartRegisterTCP').val(),
            'NoOfBytes': $('#txtNoOfBytesTCP').val(),
            'SegmentNo': $('#txtSegmentNoTCP').val(),
            'WriteCoilAddr': $('#txtWriteCoilRegisterTCP').val(),
        };
    }

    $.ajax({
        url: "/Tags/AddNewTags",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objNewTags,
            'ConnType': $('#ddlConnType').val()
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus != 'undefined' && result.blnStatus == true) {
                OpenTagsMasterMenu();
            }
        }
    });
}

function UpdateTagsData() {
    $('#frmTag').bootstrapValidator('validate');
    
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Tag";
    var activityDetail = "Tag Name: " + $('#txtTagName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTagsDataDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTagsDataDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateTagsDataDo() {

    var sourceVal = $("#ddlDataSource option:selected").attr("ConnType");
    var objTags;

    if (sourceVal == 1 || sourceVal == 3) {
        objTags = {
            'TagName': $('#txtTagName').val(),
            'TagDescription': $('#txtTagDesc').val(),
            'TagDescShort': $('#txtTagDescShort').val(),
            'DSId': $('#ddlDataSource').val(),
            'MinVal': $('#txtMinVal').val(),
            'MaxVal': $('#txtMaxVal').val(),
            'UnitId': $('#ddlUOM').val(),
            'DataType': $('#ddlDataType').val(),
            'Scaling': $('#txtScaling').val(),
            'RoundDigits': $('#txtRoundDigits').val(),
            'DeviceType': $('#txtDeviceType').val(),

            'TagGroup': $('#txtTagGroup').val(),
            'OPCTagName': $('#txtOPCTagName').val(),

            'SlaveId': $('#txtSlaveIdRTU').val(),
            'RegType': $('#ddlRegTypeRTU').val(),
            'StartRegister': $('#txtStartRegisterRTU').val(),
            'NoOfBytes': $('#txtNoOfBytesRTU').val(),
            'SegmentNo': $('#txtSegmentNoRTU').val(),
            'WriteCoilAddr': $('#txtWriteCoilRegisterRTU').val()
        };
    }
    else {
        objTags = {
            'TagName': $('#txtTagName').val(),
            'TagDescription': $('#txtTagDesc').val(),
            'TagDescShort': $('#txtTagDescShort').val(),
            'DSId': $('#ddlDataSource').val(),
            'MinVal': $('#txtMinVal').val(),
            'MaxVal': $('#txtMaxVal').val(),
            'UnitId': $('#ddlUOM').val(),
            'DataType': $('#ddlDataType').val(),
            'Scaling': $('#txtScaling').val(),
            'RoundDigits': $('#txtRoundDigits').val(),
            'DeviceType': $('#txtDeviceType').val(),

            'TagGroup': $('#txtTagGroup').val(),
            'OPCTagName': $('#txtOPCTagName').val(),

            'SlaveId': $('#txtSlaveIdTCP').val(),
            'RegType': $('#ddlRegTypeTCP').val(),
            'StartRegister': $('#txtStartRegisterTCP').val(),
            'NoOfBytes': $('#txtNoOfBytesTCP').val(),
            'SegmentNo': $('#txtSegmentNoTCP').val(),
            'WriteCoilAddr': $('#txtWriteCoilRegisterTCP').val(),
        };
    }

    $.ajax({
        url: "/Tags/EditTagData",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags,
            'ConnType': $('#ddlConnType').val()
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagsMasterMenu();
            }
        }
    });
}

function ClearField() {
    $('#txtSegmentNoRTU').val('');
    $('#txtNoOfBytesRTU').val('');
    $('#txtStartRegisterRTU').val('');
    $('#ddlRegTypeRTU').val('0');
    $('#txtSlaveIdRTU').val('');
    $('#txtSegmentNoTCP').val('');
    $('#txtNoOfBytesTCP').val('');
    $('#txtStartRegisterTCP').val('');
    $('#ddlRegTypeTCP').val('0');
    $('#txtSlaveIdTCP').val('');
    $('#txtTagGroup').val('');
    $('#txtOPCTagName').val('');
}