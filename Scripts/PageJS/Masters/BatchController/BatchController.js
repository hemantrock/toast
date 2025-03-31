$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenBatchControllerMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            BCNo: {
                validators: {
                    notEmpty: {
                        message: 'The Batch Controller No is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Batch Controller No must be Integer value.'
                    },
                }
            },
            BCName: {
                validators: {
                    //notEmpty: {
                    //    message: 'The Batch Controller Name is required and cannot be empty'
                    //},
                    //stringLength: {
                    //    min: 3,
                    //    max: 30,
                    //    message: 'The Batch Controller Name must be 1 character long'
                    //}
                }
            },
           LoopNo: {
                validators: {
                    notEmpty: {
                        message: 'The Loop No is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Loop No must be Integer value.'
                    },
                }
            },
           TotalArms: {
                validators: {
                    notEmpty: {
                        message: 'The Total Arms is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Total Arms must be Integer value.'
                    },
                }
            },
           //ACUNo: {
           //     validators: {
           //         notEmpty: {
           //             message: 'The ACU No is required and cannot be empty'
           //         },
           //         digits: {
           //             message: 'The ACU No must be Integer value.'
           //         },
           //         stringLength: {
           //             min: 1,
           //             max: 1,
           //             message: 'The ACU No must be only 1 character long'
           //         }
           //     }
           // },
           SlaveID: {
                validators: {
                    notEmpty: {
                        message: 'The Modbus Address is required and cannot be empty'
                    },
                    between: {
                        min: 1,
                        max: 255,
                        message: 'The Modbus Address must be between 1 and 255'
                    }
                }
           },
           batchMake: {
               validators: {
                   notEmpty: {
                       message: 'The Make is required and cannot be empty'
                   },
                   greaterThan: {
                       value: 1,
                       message: 'Select Make'
                   }
               }
           },
           batchModel: {
               validators: {
                   notEmpty: {
                       message: 'The Model is required and cannot be empty'
                   },
                   greaterThan: {
                       value: 1,
                       message: 'Select Model'
                   }
               }
           },
           batchFirmware: {
               validators: {
                   notEmpty: {
                       message: 'The Firmware is required and cannot be empty'
                   },
                   greaterThan: {
                       value: 1,
                       message: 'Select Firmware'
                   }
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
        }
    });

    $('#ddlBatchMake').change(function(){
        var makeId = $('#ddlBatchMake').val();

        SetModelDropdownDefault();
        SetFirmwareDropdownDefault();

        if (makeId == 0) {
            return;
        }
        else {
            BindmodelFirmwareDropdown('#ddlBatchModel', $('#ddlBatchMake option:selected').text(), true);
        }
    });

    $('#ddlBatchModel').change(function () {
        var modelId = $('#ddlBatchModel').val();

        if (modelId == 0) {
            SetFirmwareDropdownDefault();
            return;
        }
        else {
            BindmodelFirmwareDropdown('#ddlBatchFirmware', $('#ddlBatchModel option:selected').text(), false);
        }
    });
});

function SaveBatchController() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Add a New Batch Controller";
    var activityDetail = "Batch Controller: " + $('#txtBCName').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveBatchControllerDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveBatchControllerDo(); }, activityName,activityDetail);
            }
        }
    });
}

function SaveBatchControllerDo()
{
    var VEnabledActive = 0;
    if ($('#chkEnabled').is(":checked")) {
        VEnabledActive = 1;
    }
    else {
        VEnabledActive = 0;
    }
    
    var objBatchController = {
        'BCNo': $('#txtBCNo').val(),
        'BCName': $('#txtBCName').val(),
        'LoopNo': $('#txtLoopNo').val(),
        'TotalArms': $('#txtTotalArms').val(),
        //'ACUNo': $('#txtACUNo').val(),
        'SlaveID': $('#txtSlaveID').val(),
        'Enabled': VEnabledActive,
        'BCMakes': $('#ddlBatchFirmware').val()
    };
    $.ajax({
        url: "/BatchController/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBatchController),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);            
            if (result.blnStatus == true) {
                OpenBatchControllerMenu();
            }
        }
    });
}

function UpdateBatchController() {

    $('#FormBU').bootstrapValidator('resetForm');
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Edit Existing Batch Controller";
    var activityDetail = "Batch Controller: " + $('#txtBCName').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBatchControllerDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBatchControllerDo(); }, activityName, activityDetail);
            }
        }
    });
}


function UpdateBatchControllerDo() {
    var VEnabledActive = 0;
    var pass = null;
    if ($('#chkEnabled').is(":checked")) {
        VEnabledActive = 1;
    }
    else {
        VEnabledActive = 0;
    }

    var objBatchController = {
        'BCNo': $('#txtBCNo').val(),
        'BCName': $('#txtBCName').val(),
        'LoopNo': $('#txtLoopNo').val(),
        'TotalArms': $('#txtTotalArms').val(),
        'ESDBypass': $('#chkESDBypass').is(":checked"),
        'SlaveID': $('#txtSlaveID').val(),
        'Enabled': VEnabledActive,
        'BCMakes': $('#ddlBatchFirmware').val()
    };

    $.ajax({
        url: "/BatchController/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBatchController),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true)
            {
                OpenBatchControllerMenu();
            }
        }
    });
}

function BindmodelFirmwareDropdown(Ctrl, makeModel, isMake) {
    $.ajax({
        url: "/BatchController/ModelFirmwareData?makeModel=" + makeModel + "&isMake=" + isMake,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {

            $(Ctrl).html('');
            if (isMake) {
                var r = "<option value='0'>Select Model</option>";
                $(Ctrl).append(r);
                $.each(result, function (modelVal, uniqueID) {
                    r = "<option value=" + uniqueID + ">" + modelVal + "</option>";
                    $(Ctrl).append(r);
                });
            }
            else {
                var r = "<option value='0'>Select Firmware Version</option>";
                $(Ctrl).append(r);
                $.each(result, function (firmwareVer, uniqueID) {
                    r = "<option value=" + uniqueID + ">" + firmwareVer + "</option>";
                    $(Ctrl).append(r);
                });
            }
            
        }
    });
}

function BindModelDropdownEdit(Ctrl, BCMakes, isMake) {
    $.ajax({
        url: "/BatchController/ModelFirmwareDataEdit?bcMakeId=" + BCMakes + "&isMake=" + isMake,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $(Ctrl).html('');
            var r = "<option value='0'>Select Model</option>";
            $(Ctrl).append(r);
            $.each(result, function (modelVal, uniqueID) {
                if (BCMakes == uniqueID) {
                    r = "<option value=" + uniqueID + " selected>" + modelVal + "</option>";
                }
                else {
                    r = "<option value=" + uniqueID + ">" + modelVal + "</option>";
                }
                $(Ctrl).append(r);
            });
        }
    });
}

function BindFirmwareDropdownEdit(Ctrl, BCMakes, isMake) {
    $.ajax({
        url: "/BatchController/ModelFirmwareDataEdit?bcMakeId=" + BCMakes + "&isMake=" + isMake,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $(Ctrl).html('');
            var r = "<option value='0'>Select Firmware Version</option>";
            $(Ctrl).append(r);
            $.each(result, function (firmwareVer, uniqueID) {
                if (BCMakes == uniqueID) {
                    r = "<option value=" + uniqueID + " selected>" + firmwareVer + "</option>";
                }
                else {
                    r = "<option value=" + uniqueID + ">" + firmwareVer + "</option>";
                }
                $(Ctrl).append(r);
            });
        }
    });
}

function SetMakeDropdownDefault() {
    $('#ddlBatchMake').html('');
    var r = "<option value='0'>Select Make</option>";
    $('#ddlBatchMake').append(r);
}

function SetModelDropdownDefault() {
    $('#ddlBatchModel').html('');
    var r = "<option value='0'>Select Model</option>";
    $('#ddlBatchModel').append(r);
}

function SetFirmwareDropdownDefault() {
    $('#ddlBatchFirmware').html('');
    var r = "<option value='0'>Select Firmware Version</option>";
    $('#ddlBatchFirmware').append(r);
}

function LoadModelFirmware(BCMakes) {
    SetModelDropdownDefault();
    SetFirmwareDropdownDefault();
    BindModelDropdownEdit('#ddlBatchModel',  BCMakes, true);
    BindFirmwareDropdownEdit('#ddlBatchFirmware', BCMakes, false);
}