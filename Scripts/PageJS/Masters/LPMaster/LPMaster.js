var ReAllocBay = false;
$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenLPMasterMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //GantryNo: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Field is required'
            //        },
            //        between: {
            //            min: 1,
            //            max: 9,
            //            message: 'Field must be in between 1 to 9'
            //        }
            //    }
            //},
            BayNo: {
                validators: {
                    notEmpty: {
                        message: 'The Bay No is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Bay No'
                    }
                }
            },

            BCNo: {
                validators: {
                    //notEmpty: {
                    //    message: 'Field is required'
                    //},
                    //between: {
                    //    min: 1,
                    //    max: 99,
                    //    message: 'The Batch Controller No. should be between 1 and 99'
                    //}
                }
            },
            ACUNo: {
                validators: {
                    notEmpty: {
                        message: 'The ACUNo is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select ACUNo'
                    }
                }
            },
            LoadingType: {
                validators: {
                    notEmpty: {
                        message: 'The Load Type is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select LoadingType'
                    }
                }
            },
            ArmNo: {
                validators: {
                    notEmpty: {
                        message: 'The ArmNo is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select ArmNo'
                    }
                }
            },
            LoadingPoint: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    between: {
                        min: 1,
                        max: 99,
                        message: 'The Loading Point No. should be between 1 and 99'
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
});

function SaveBays() {
    var activityName = "Add New Loading Point";
    var activityDetail = "Loading Point No: " + $('#txtLoadingPoint').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveBaysDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveBaysDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveBaysDo() {
    var VLpEnable = 0, VMixLoadAllowed = 0; VToDoFlushing = 0;

    if ($('#chkLpEnable').is(":checked")) {
        VLpEnable = 1;
    }
    else {
        VLpEnable = 0;
    }
    if ($('#chkmixedLoadallowed').is(":checked")) {
        VMixLoadAllowed = 1;
    }
    else {
        VMixLoadAllowed = 0;
    }
    if ($('#chkToDoFlushing').is(":checked")) {
        VToDoFlushing = 1;
    }
    else {
        VToDoFlushing = 0;
    }

    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var objBays = {
        //'GantryNo': $('#txtGantryNo').val(),
        'BayId': $('#ddlBayNo').val(),
        'LoadingPointNo': $('#txtLoadingPoint').val(),
        'BCNumber': $('#ddlBcNo').val(),
        'AcuID': $('#ddlACUNo').val(),
        'DirectionID': $('#ddlLoadingType').val(),
        'PurposeID': $('#ddlLoadingPurpose').val(),
        'ArmNo': $('#ddlArmNo').val(),
        'LPEnable': VLpEnable,
        'ToDoFlushing': VToDoFlushing,
        'IsLAPSBypassed': $('#chkLAPSBypass').is(":checked"),
        'FlushingQty': $('#txtFlushingQty').val(),
    };

    $.ajax({
        url: "/LPMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBays),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLPMasterMenu();
            }
        }
    });
}
function UpdateBays() {
    if ($('#chkLpEnable').is(":checked")==false && $('#txtRemarks').val() == "") { alertDismissable('danger', 'Remarks must be entered if LP is disabled.'); return; }

    var activityName = "Edit existing Loading Point";
    var activityDetail = "Loading Point No: " + $('#txtLoadingPoint').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBaysDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBaysDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateBaysDo() {
    var VLpEnable = 0, VMixLoadAllowed = 0; VToDoFlushing = 0; blnOvspBypass = 0;

    if ($('#chkLpEnable').is(":checked")) {
        VLpEnable = 1;
    }
    else {
        VLpEnable = 0;
        if ($('#txtRemarks').val() == "") { alertDismissable('danger', 'Remarks must be entered if LP is disabled.'); return;}
    }

    if ($('#chkmixedLoadallowed').is(":checked")) {
        VMixLoadAllowed = 1;
    }
    else {
        VMixLoadAllowed = 0;
    }

    if ($('#chkToDoFlushing').is(":checked")) {
        VToDoFlushing = 1;
    }
    else {
        VToDoFlushing = 0;
    }

    if ($('#chkOvspBypass').is(":checked")) {
        blnOvspBypass = 1;
    }
    //else {
    //    blnOvspBypass = 0;
    //}

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objBays = {
        'BayId': $('#txtBayNo').val(),
        'LoadingPointNo': $('#txtLoadingPoint').val(),
        'BCNumber': $('#ddlBcNo').val(),
        'AcuID': $('#ddlACUNo').val(),
        'DirectionID': $('#ddlLoadingType').val(),
        'PurposeID': $('#ddlLoadingPurpose').val(),
        'ArmNo': $('#ddlArmNo').val(),
        'LPEnable': VLpEnable,
        'IsOverspillBypassed': blnOvspBypass,
        'ToDoFlushing': VToDoFlushing,
        'Remarks': $('#txtRemarks').val(),
        'ToDoFlushing': VToDoFlushing,
        'IsLAPSBypassed': $('#chkLAPSBypass').is(":checked"),
        'FlushingQty': $('#txtFlushingQty').val(),
    };

    $.ajax({
        url: "/LPMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBays),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLPMasterMenu();
            }
        }
    });

    if (ReAllocBay) {
        $.ajax({
            url: "/LPMaster/ReAllocTTsinBay?LPNo=" + $('#txtLoadingPoint').val(),
            type: "GET",
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    //OpenLPMasterMenu();
                }
            }
        });
    }
}

function LoadDDLACUNo(iSel) {
    $.ajax({
        url: "/CardStatusMaster/GetACUNoList",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlACUNo').html('');
            var r = "<option value=0>Select ACU No</option>";
            $('#ddlACUNo').append(r);
            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val)) {
                    r = "<option selected value=" + val + ">" + val + "</option>";
                }
                else {
                    r = "<option value=" + val + ">" + val + "</option>";
                }
                $('#ddlACUNo').append(r);
            });
            //LoadDDLCardReader(iCardReader);
        }
    });
}

function LoadDDLArmNo(iSel) {

    $('#ddlArmNo').html('');
    var r = "<option value=0>Select ARM No.</option>";
    $('#ddlArmNo').append(r);
    if (iSel == 1) {
        r = "<option selected value=1>1</option>";
    }
    else {
        r = "<option value=1>1</option>";
    }
    $('#ddlArmNo').append(r);
    if (iSel == 2) {
        r = "<option selected value=2>2</option>";
    }
    else {
        r = "<option value=2>2</option>";
    }
    $('#ddlArmNo').append(r);

}

function AskBayReAllocation() {
    if ($('#chkLpEnable').is(":checked") == false) {
        $('#myConfirmMsg').html("<p>Do you also want to Auto-Assign New bay for Valid Trucks in this Bay?</p><p>Press YES to Re-Allocate TTs in this Bay to new Bay.</p><p>Press NO to retain the same Bay.</p>");
        $("#btnConfirmCancel").text('No');
        $("#btnConfirmOK").text('Yes');
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({ handle: ".modal-header" });
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").on("click", function () {
            $(".modal-backdrop").slideUp('slow');
            $('#confirmModal').modal('hide');
            ReAllocBay = true;
            setTimeout(function () { $("#btnConfirmOK").text('OK'); $("#btnConfirmCancel").text('Cancel'); }, 1000);
        });
        $("#btnConfirmCancel").on("click", function () {
            $(".modal-backdrop").slideUp('slow');
            $('#confirmModal').modal('hide');
            ReAllocBay = false;
            setTimeout(function () { $("#btnConfirmOK").text('OK'); $("#btnConfirmCancel").text('Cancel'); },1000);
        });
    }
    else {
        ReAllocBay = false;
    }
}