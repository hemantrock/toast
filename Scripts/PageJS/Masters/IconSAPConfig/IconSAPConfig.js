$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenSAPConfigMenu();
        $('#cancelModal').modal('hide');
    });

    $('#dtpOpenDipTime').datetimepicker({
        format: 'HH:mm',
        stepping: 15,
        //maxDate: new Date()
    });

    $('#dtpCloseDipTime').datetimepicker({
        format: 'HH:mm',
        stepping: 15,
        //maxDate: new Date()
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            RecordNo: {
                validators: {
                    notEmpty: {
                        message: 'The RecordNo is required and cannot be empty'
                    },

                }
            },
            ClientName: {
                validators: {
                    notEmpty: {
                        message: 'The ClientName is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'The ClientName must be less than or equal to 5 characters long'
                    }
                }
            },
            Username: {
                validators: {
                    notEmpty: {
                        message: 'The Username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: 'The Username must be less than or equal to 20 characters long'
                    }
                }
            },
            PlantCode: {
                validators: {
                    notEmpty: {
                        message: 'The Plant Code is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Plant Code must be Integer value.'
                    },
                    stringLength: {
                        min: 1,
                        max: 4,
                        message: 'The Plant Code must be less than or equal to 4 characters long'
                    },
                }
            },

            Destination: {
                validators: {
                    notEmpty: {
                        message: 'The Destination is required and cannot be empty'
                    },
                stringLength: {
                    min: 1,
                    max: 20,
                    message: 'The Destination must be less than or equal to 20 characters long'
                },
                }
            },
            Host: {
                validators: {
                    notEmpty: {
                        message: 'The App Server Host is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: 'The App Server Host must be less than or equal to 20 characters long'
                    },
                }
            },
            GatewayHost: {
                validators: {
                    notEmpty: {
                        message: 'The Gateway Host is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: 'The Gateway Host must be less than or equal to 20 characters long'
                    }
                }
            },
            GatewayService: {
                validators: {
                    notEmpty: {
                        message: 'The Gateway Service is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: 'The Gateway Service must be less than or equal to 20 characters long'
                    },
                }
            },

            MSHost: {
                validators: {
                    notEmpty: {
                        message: 'The MS Host is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The MS Host must be less than or equal to 10 characters long'
                    },
                }
            },
            MSService: {
                validators: {
                    notEmpty: {
                        message: 'The MS Service is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The MS Service must be less than or equal to 10 characters long'
                    },
                }
            },
            PlantCode: {
                validators: {
                    notEmpty: {
                        message: 'The Plant Code is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 4,
                        message: 'The Plant Code must be 4 characters long'
                    },
                }
            },
            LogonGroup: {
                validators: {
                    notEmpty: {
                        message: 'The Logon Group is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The Logon Group must be less than or equal to 10 characters long'
                    },
                }
            },
            SysNumber: {
                validators: {
                    notEmpty: {
                        message: 'The System ID is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The System ID must be less than or equal to 10 characters long'
                    },
                }
            },
            Password: {
                validators: {
                    notEmpty: {
                        message: 'The Password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 50,
                        message: 'The Password must be less than or equal to 50 characters long'
                    },
                }
            },
            Language: {
                validators: {
                    notEmpty: {
                        message: 'The Language is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 2,
                        message: 'The Language must be less than or equal to 2 characters long'
                    },
                }
            },
            ConnectionString: {
                validators: {
                    notEmpty: {
                        message: 'The Connection String is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 200,
                        message: 'The Connection String must be less than or equal to 200 characters long'
                    },
                }
            },
            TFMSFileTime: {
                validators: {
                    notEmpty: {
                        message: 'The TFMSFileTime is required and cannot be empty'
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

function MakeConnectionString()
{
    //var strConn = "-a RFC" + $('#txtPlantCode').val() + "_01 -g " + $('#txtGatewayHost').val() + " -x " + $('#txtGatewayService').val() + "";
    //$('#txtConnectionString').val(strConn);
}

function SaveIconSapConfiguration() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New SAP Config";
    var activityDetail = "SAP Record No: " + $('#txtRecordNo').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveIconSapConfigurationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveIconSapConfigurationDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveIconSapConfigurationDo()
{
    MakeConnectionString();
    var RecordNo = 1;

    var vIsTFMSavble = 0; chkAutoDipPostEnabled = 0;
    if ($('#chkTFMSPostingEnabled').is(":checked")) {

        vIsTFMSavble = 1;
    }
    else {
        vIsTFMSavble = 0;
    }

    if ($('#chkAutoPostingEnabled').is(":checked")) {

        chkAutoDipPostEnabled = 1;
    }
    else {
        chkAutoDipPostEnabled = 0;
    }

    var OpenDipTime = $('#dtpOpenDipTime').val();
    var CloseDipTime = $('#dtpCloseDipTime').val();

    var objSapConfig = {
        'RecordNo': $('#txtRecordNo').val(),
        'ClientName': $('#txtClientName').val(),
        'Username': $('#txtUsername').val(),
        'Password': $('#txtPassword').val(),
        'Destination': $('#txtDestination').val(),
        'NoOfAttempts': $('#txtNoOfAttempts').val(),
        'BaseAddress': $('#txtBaseAddress').val(),
        'Host': $('#txtHost').val(),
        'GatewayHost': $('#txtGatewayHost').val(),
        'GatewayService': $('#txtGatewayService').val(),
        'MSHost': $('#txtMSHost').val(),
        'MSService': $('#txtMSService').val(),
        'SysNumber': $('#txtSysNumber').val(),
        'LogonGroup': $('#txtLogonGroup').val(),
        'Language': $('#txtLanguage').val(),
        'sPlantCode': $('#txtPlantCode').val(),
        'SecPlantCode01': $('#txtSecPlantCode01').val(),
        'SecPlantCode02': $('#txtSecPlantCode02').val(),
        'TASCode': $('#txtTASCode').val(),
        'OpenDipPostTime': $('#dtpOpenDipTime').val(),
        'CloseDipPostTime': $('#dtpCloseDipTime').val(),
        'TFMSPostingEnabled': vIsTFMSavble,
        'AutoDipPostEnabled': chkAutoDipPostEnabled,
        'ConnectionString': $('#txtConnectionString').val(),
    };

    $.ajax({
        url: "/IconSAPConfig/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'objICONSAPTASConfig': objSapConfig, 'fileTime': fileTime }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                UploadCert();
                OpenSAPConfigMenu();
            }
        }
    });
}
function UpdateIconSapConfiguration() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing SAP Config";
    var activityDetail = "SAP Record No: " + $('#txtRecordNo').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateIconSapConfigurationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateIconSapConfigurationDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateIconSapConfigurationDo()
{
    MakeConnectionString();
    var vGantryNo = 0;

    var vIsTFMSavble = 0;
    if ($('.has-error').length > 0) {
        return false;
    }

    if ($('#chkTFMSPostingEnabled').is(":checked")) {
     
        vIsTFMSavble = 1;
    }
    else {
        vIsTFMSavble = 0;
    }


    if ($('#chkAutoPostingEnabled').is(":checked")) {

        chkAutoDipPostEnabled = 1;
    }
    else {
        chkAutoDipPostEnabled = 0;
    }

    var OpenDipTime = $('#dtpOpenDipTime').val();
    var CloseDipTime = $('#dtpCloseDipTime').val();

    var objSapConfig = {
        'RecordNo': $('#txtRecordNo').val(),
        'ClientName': $('#txtClientName').val(),
        'Username': $('#txtUsername').val(),
        'Password': $('#txtPassword').val(),
        'Destination': $('#txtDestination').val(),
        'NoOfAttempts': $('#txtNoOfAttempts').val(),
        'BaseAddress': $('#txtBaseAddress').val(),
        'Host': $('#txtHost').val(),
        'GatewayHost': $('#txtGatewayHost').val(),
        'GatewayService': $('#txtGatewayService').val(),
        'MSHost': $('#txtMSHost').val(),
        'MSService': $('#txtMSService').val(),
        'SysNumber': $('#txtSysNumber').val(),
        'LogonGroup': $('#txtLogonGroup').val(),
        'Language': $('#txtLanguage').val(),
        'sPlantCode': $('#txtPlantCode').val(),
        'SecPlantCode01': $('#txtSecPlantCode01').val(),
        'SecPlantCode02': $('#txtSecPlantCode02').val(),
        'TASCode': $('#txtTASCode').val(),
        'OpenDipPostTime': $('#dtpOpenDipTime').val(),
        'CloseDipPostTime': $('#dtpCloseDipTime').val(),
        'TFMSPostingEnabled': vIsTFMSavble,
        'AutoDipPostEnabled': chkAutoDipPostEnabled,
        'ConnectionString': $('#txtConnectionString').val(),
    };

    $.ajax({
        url: "/IconSAPConfig/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'objICONSAPTASConfig': objSapConfig, 'fileTime': null }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                UploadCert();
                OpenSAPConfigMenu();
            }
           
        }
    });
}

function UploadCert() {
    var formdata = new FormData(); //FormData object
    var fileInput = $('#CertPath').get(0);
    //Iterating through each files selected in fileInput
    for (i = 0; i < fileInput.files.length; i++) {
        //Appending each file to FormData object
        formdata.append(fileInput.files[i].name, fileInput.files[i]);
    }
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/IconSAPConfig/UploadCert?RecordNo=' + $('#txtRecordNo').val());
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = JSON.parse(xhr.responseText)
            alertDismissable("success", resp.strMessage);
        }
    }
    return false;
}