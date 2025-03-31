$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenRFIDMenu();
        $('#cancelModal').modal('hide');
    });

     $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            RFIDType: {
                validators: {
                    notEmpty: {
                        message: 'The RFID Type is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select RFID Type'
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
        },
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('ddlRFIDReader').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});
function SaveRFID() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New RFID";
    var activityDetail = "RFID EPC: " + $('#txtEPC_Code').val();
    if ($('#txtEPC_Code').val() == "") { activityDetail = "RFID User Data: " + $('#txtUser_Data').val(); }

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveRFIDDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveRFIDDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveRFIDDo() {

    var cManager=0;

    var objRFID = {
        'TagID': $('#txtRFTagID').val(),
        'EPC_Code': $('#txtEPC_Code').val(),
        'User_Data': $('#txtUser_Data').val(),
        'Type': $('#ddlRFIDType').val(),
        //'Status': $('#ddlRFIDStatus').val(),
    };

    $.ajax({
        url: "/RFID/AddNewRFID",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objRFID),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenRFIDMenu();
            }
        }
    });
}
function UpdateRFID() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing RFID";
    var activityDetail = "RFID EPC: " + $('#txtEPC_Code').val();
    if ($('#txtEPC_Code').val() == "") { activityDetail = "RFID User Data: " + $('#txtUser_Data').val(); }

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateRFIDDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateRFIDDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateRFIDDo() {

    var cManager = 0;
    var objRFID = {
        'UniqueID': $('#hdnIdKey').val(),
        'TagID': $('#txtRFTagID').val(),
        'EPC_Code': $('#txtEPC_Code').val(),
        'User_Data': $('#txtUser_Data').val(),
        'Type': $('#ddlRFIDType').val(),
        //'Status': $('#ddlRFIDStatus').val(),
    };

    $.ajax({
        url: "/RFID/Update",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objRFID),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenRFIDMenu();
            }
        }
    });
}


function LoadDDLRFIDType(iSel) {
    $.ajax({
        url: "/RFID/GetRFIDTypes",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlRFIDType').html('');
            var r = "<option value=0>Select RFID Type</option>";
            $('#ddlRFIDType').append(r);

            $.each(result, function (i, result) {
                if (parseInt(iSel) == parseInt(result.TypeID)) {
                    r = "<option selected value=" + result.TypeID + ">" + result.TypeDesc + "</option>";
                }
                else {
                    r = "<option value=" + result.TypeID + ">" + result.TypeDesc + "</option>";
                }
                $('#ddlRFIDType').append(r);
            });
        }
    });
}

function LoadDDLRFIDStatus(iSel) {
    $.ajax({
        url: "/RFID/GetRFIDStatus",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlRFIDStatus').html('');
            var r = "<option value=0>Select RFID Status</option>";
            $('#ddlRFIDStatus').append(r);

            $.each(result, function (i, result) {
                if (parseInt(iSel) == parseInt(result.Status)) {
                    r = "<option selected value=" + result.Status + ">" + result.StatusDesc + "</option>";
                }
                else {
                    r = "<option value=" + result.Status + ">" + result.StatusDesc + "</option>";
                }
                $('#ddlRFIDStatus').append(r);
            });
        }
    });
}