$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTruckMastersMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            TruckNumber: {
                validators: {
                    notEmpty: {
                        message: 'The TruckNumber is required and cannot be empty'
                    },
                }
            },
            Compartments: {
                validators: {
                    digits: {
                        message: 'No of Compartments must be Integer value.'
                    },
                    between: {
                        min: 1,
                        max: 8,
                        message: 'No of Compartments must be between 1 to 8'
                    },
                    notEmpty: {
                        message: 'No of Compartments is required and cannot be empty'
                    }
                }
            },
            TareWeight: {
                validators: {
                    notEmpty: {
                        message: 'The TareWeight is required and cannot be empty'
                    },
                 digits: {
                     message: 'The TareWeight must be Integer value.'
                    },
                }
            },

            Transporter: {
                validators: {
                    notEmpty: {
                        message: 'The Transporter is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select a valid Transporter'
                    }
                }
            },
            LoadingType: {
                validators: {
                    notEmpty: {
                        message: 'The LoadingType is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select LoadingType'
                    }
                }
            },
            //ExplosiveLisc: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The ExplosiveLisc is required and cannot be empty'
            //        },
            //    }
            //},
            //ExplosiveLiscExpDate: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The Explosive Lisc Exp Date is required and cannot be empty'
            //        },
            //    }
            //},
            //CalibrationCertNo: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The Calibration Cert No is required and cannot be empty'
            //        },
            //    }
            //},
            //CalibrationLiscExpDate: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The Calibration Lisc Exp Date is required and cannot be empty'
            //        },
            //    }
            //},
            //LicenseExpiryDate: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The License Expiry Date is required and cannot be empty'
            //        },
            //    }
            //},
            RegistrationNo: {
                validators: {
                    notEmpty: {
                        message: 'The RegistrationNo is required and cannot be empty'
                    },
                }
            },

            RegistrationDate: {
                validators: {
                    notEmpty: {
                        message: 'The RegistrationDate is required and cannot be empty'
                    },
                }
            },

            MaxWeight: {
                validators: {
                    notEmpty: {
                        message: 'The MaxWeight is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Max Weight must be Integer value.'
                    },
                }
            },
            MaxVolume: {
                validators: {
                    notEmpty: {
                        message: 'The MaxVolume is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Max Volume must be Integer value.'
                    },
                }
            },
            //CardID: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The CardID is required and cannot be empty'
            //        },
            //    }
            //},
            //RFID: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The RFID is required and cannot be empty'
            //        },
            //    }
            //},
            TruckType: {
                validators: {
                    notEmpty: {
                        message: 'The TruckType is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select TruckType'
                    }
                }
            },
            //CCOEWeight: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The CCOE Weight is required and cannot be empty'
            //        },
            //        digits: {
            //            message: 'The CCOE Weight must be Integer value.'
            //        },
            //    }
            //},
            //CardID: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The CardID is required and cannot be empty'
            //        },
            //    }
            //},
            Capacity: {
                validators: {
                    notEmpty: {
                        message: 'The Capacity is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Capacity must be Integer value.'
                    },
                }
            },

            //ddlProduct: {
            //    validators: {
            //        notEmpty: {
            //            message: 'The Product is required and cannot be empty'
            //        },
            //        greaterThan: {
            //            value: 1,
            //            message: 'Select Product'
            //        }
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
        },
    });

    $('#dtpExplosiveLiscExpDate').datetimepicker({
        format: 'D-MMM-YYYY'
    });
    $('#dtpCalibrationLiscExpDate').datetimepicker({
        format: 'D-MMM-YYYY'
    });
    $('#dtpRegistrationDate').datetimepicker({
        format: 'D-MMM-YYYY'
    });
    $('#dtpLicenseExpiryDate').datetimepicker({
        format: 'D-MMM-YYYY'
    });
    $('.js-basic-single').select2();
});

function ReadCard() {
    $('#txtCardID').attr('disabled', 'disabled');
    $.ajax({
        type: "GET",
        url: "/LoadSummary/CardRead?Type=LoadCardAssign",
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                $('#txtCardID').val(result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function ShowTruckDetailsEdit(Id) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/TruckDetailsEdit?Id=" + Id,
        UpdateTargetId: "dvTruckDetailsEdit",
        cache: false,
        success: function (result) {
            $("#dvTruckDetailsEdit").html(result);
        }
    });
}

function changeCompartmentNo(ctrl, iSelArr) {
   
    if (ctrl == null) {
        return false;
    }
    
    $(ctrl).parent().show();

    $(ctrl).dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "bSort":false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "10%" },
                { sWidth: "20%" },
                //{ sWidth: "20%" },
            ],
        "bAutoWidth": false,
        "bDestroy":true,
    });

    
    var comps = $('#txtCompartments').val();

    if (comps!=null && comps!='undefined' && comps!=0)
    {
        for (i = 1; i <= 8; i++) {
            $('#row_' + i).hide();
        }
        for (i=1;i<=comps;i++)
        {
            $('#row_' + i).show();
        }
    }
}
function SaveTruckMasters() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Truck";
    var activityDetail = "Truck No: " + $('#txtTruckNumber').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTruckMastersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTruckMastersDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveTruckMastersDo()
{
    var VTruckMasterstatusActive = 0;
      
    if ($('#chkIsBlackListed').is(":checked")) {
        VTruckMasterstatusActive = 1;
    }
    else {
        VTruckMasterstatusActive = 0;
    }

    //if ($('#txtCardID').val() != "" && $('#txtCardID').attr('data-key-value') ==0) {
    //    alertDismissable("danger","Incorrect Card Selected. Please choose valid Card.");
    //        return false;
    //}

    var objTruckMasters = {
        'TruckNumber': $('#txtTruckNumber').val(),
        'TotalNoOfComp': $('#txtCompartments').val(),
        'PrintedTareWeight': $('#txtTareWeight').val(),
        'TransporterID': $('#ddlTransporters').val(),
        'LoadDirectionID': $('#ddlLoadingType').val(),
        'ExplosiveLisc': $('#txtExplosiveLisc').val(),
        'ExplosiveLiscExpDate': $('#dtpExplosiveLiscExpDate').val(),
        'CalibrationLiscNo': $('#txtCalibrationCertNo').val(),
        'CalibrationExpDate': $('#dtpCalibrationLiscExpDate').val(),
        'LicenseExpiryDate': $('#dtpLicenseExpiryDate').val(),
        'RegistrationNo': $('#txtRegistrationNo').val(),
        'RegistrationDate': $('#dtpRegistrationDate').val(),
        'MaxWeight': $('#txtMaxWeight').val(),
        'MaxVolume': $('#txtMaxVolume').val(),
        'IsBlackListed': VTruckMasterstatusActive,
        'CardID': $('#txtCardID').val(),
        'RFID': $('#txtRFID').attr('data-key-value'),
        'TruckTypeID': $('#ddlTruckType').val(),
        'CCOEWeight': $('#txtCCOEWeight').val(),
        //'TruckDetails': $('#tblTruckDetails').val(),
    };

    var ACSUserID = $('#txtACSUserID').attr('data-key-value');

    var objTruckDetails = [];

    for(i=1;i<=8;i++)
    {
        if ($('#txtCompartmentNo_' + i).is(':visible')) {
            var obj = {
                'CompNo': $('#txtCompartmentNo_' + i).val(),
                'Capacity': $('#txtCapacity_' + i).val(),
                'ProductID': $('#ddlProduct_' + i).val()
            };
            objTruckDetails.push(obj);
        }
    }
    
    $.ajax({
        url: "/TruckMasters/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objTruckMasters: objTruckMasters, objTruckDetails: objTruckDetails, ACSUserID: ACSUserID }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTruckMastersMenu();
            }
        }
    });
}
function UpdateTruckMasters() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Truck";
    var activityDetail = "Truck No: " + $('#txtTruckNumber').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTruckMastersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTruckMastersDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTruckMastersDo()
{
    
    var VTruckMasterstatusActive = 0;

    if ($('#chkIsBlackListed').is(":checked")) {
        VTruckMasterstatusActive = 1;
    }
    else {
        VTruckMasterstatusActive = 0;
    }
    //if ($('#txtCardID').val() != "" && $('#txtCardID').attr('data-key-value') ==0) {
    //    alertDismissable("danger", "Incorrect Card Selected. Please choose valid Card.");
    //        return false;
    //}
    
    var objTruckMasters = {
        'TruckID': $('#hdnIdKey').val(),
        'TruckNumber': $('#txtTruckNumber').val(),
        'TotalNoOfComp': $('#txtCompartments').val(),
        'PrintedTareWeight': $('#txtTareWeight').val(),
        'TransporterID': $('#ddlTransporters').val(),
        'LoadDirectionID': $('#ddlLoadingType').val(),
        'ExplosiveLisc': $('#txtExplosiveLisc').val(),
        'ExplosiveLiscExpDate': $('#dtpExplosiveLiscExpDate').val(),
        'CalibrationLiscNo': $('#txtCalibrationCertNo').val(),
        'CalibrationExpDate': $('#dtpCalibrationLiscExpDate').val(),
        'LicenseExpiryDate': $('#dtpLicenseExpiryDate').val(),
        'RegistrationNo': $('#txtRegistrationNo').val(),
        'RegistrationDate': $('#dtpRegistrationDate').val(),
        'MaxWeight': $('#txtMaxWeight').val(),
        'MaxVolume': $('#txtMaxVolume').val(),
        'IsBlackListed': VTruckMasterstatusActive,
        'CardID': $('#txtCardID').val(),
        //'CardID': $('#txtCardID').attr('data-key-value'),
        'RFID': $('#txtRFID').attr('data-key-value'),
        'TruckTypeID': $('#ddlTruckType').val(),
        'CCOEWeight': $('#txtCCOEWeight').val(),
    };
    var objTruckDetails = [];

    for (i = 1; i <= 8; i++) {
        if ($('#txtCompartmentNo_' + i).is(':visible')) {
            var obj = {
                'CompNo': $('#txtCompartmentNo_' + i).val(),
                'Capacity': $('#txtCapacity_' + i).val(),
                'ProductID': $('#ddlProduct_' + i).val()
            };
            objTruckDetails.push(obj);
        }
    }
    var ACSUserID = $('#txtACSUserID').attr('data-key-value');

    $.ajax({
        url: "/TruckMasters/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objTruckMasters: objTruckMasters, objTruckDetails: objTruckDetails, ACSUserID: ACSUserID }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTruckMastersMenu();
            }
        }
    });
}

function LoadDDLTransporters(iSel) {
    $.ajax({
        url: "/Transporter/GetTransporters",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTransporters').html('');
            var r = "<option value=0>Select Transporter</option>";
            $('#ddlTransporters').append(r);
            
            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val.TransporterId)) {
                    r = "<option selected value=" + val.TransporterId + ">" + val.TransporterDesc + "</option>";
                }
                else {
                    r = "<option value=" + val.TransporterId + ">" + val.TransporterDesc + "</option>";
                }
                $('#ddlTransporters').append(r);
            });
        }
    });
}

function LoadDDLTruckType(iSel) {
    $.ajax({
        url: "/TruckMasters/GetTruckTypeList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTruckType').html('');
            var r = "<option value=0>Select Truck Type</option>";
            $('#ddlTruckType').append(r);
            
            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val.TypeID)) {
                    r = "<option selected value=" + val.TypeID + ">" + val.TypeDesc + "</option>";
                }
                else {
                    r = "<option value=" + val.TypeID + ">" + val.TypeDesc + "</option>";
                }
                $('#ddlTruckType').append(r);
            });
        }
    });
}

function LoadDDLLoadingType(iSel) {

    $('#ddlLoadingType').html('');
    var r = "<option value=0>Select Loading Type</option>";
    $('#ddlLoadingType').append(r);

    if (iSel == '1') {
        r = "<option selected value=1>Top</option>";
    }
    else {
        r = "<option value=1>Top</option>";
    }
    $('#ddlLoadingType').append(r);
    if (iSel == '2') {
        r = "<option selected value=2>Bottom</option>";
    }
    else {
        r = "<option value=2>Bottom</option>";
    }
    $('#ddlLoadingType').append(r);
}

function GetTruckWghtHistory(iTruckID) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/TruckWghtHistory?TruckID=" + iTruckID,
        cache: false,
        global: false,
        success: function (result) {
            $("#dvTruckWghtHistory").html(result);
        }
    });
}