$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenBaysMasterMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            GantryNo: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    between: {
                        min: 1,
                        max: 9,
                        message: 'Field must be in between 1 to 9'
                    }
                }
            },
            BayName: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    }
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
        }
    });
});


function SaveBaysMaster() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Bay";
    var activityDetail = "Bay: " + $('#txtBayName').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveBaysMasterDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveBaysMasterDo(); }, activityName, activityDetail);
            }
        }
    });
}


function SaveBaysMasterDo() {

    var objBayMaster = {
        'GantryNo': $('#txtGantryNo').val(),
        'BayName': $('#txtBayName').val(),
    };

    $.ajax({
        url: "/BaysMaster/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBayMaster),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaysMasterMenu();
            }
        }
    });
}

function UpdateBaysMaster() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Bay";
    var activityDetail = "Bay: " + $('#txtBayName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBaysMasteDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBaysMasteDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateBaysMasteDo() {

    var objBayMaster = {
        'BayID': $('#txtBayNo').val(),
        'GantryNo': $('#txtGantryNo').val(),
        'BayName': $('#txtBayName').val(),
        'IsEarthingBypassed': $('#chkEarthBypass').is(":checked"),
        'IsOverspillBypassed': $('#chkOVSPBypass').is(":checked"),
        'IsVRUArmBypassed': $('#chkVRUBypass').is(":checked"),
        'IsBPBSBypassed': $('#chkBPBSBypass').is(":checked"),
    };

    $.ajax({
        url: "/BaysMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBayMaster),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaysMasterMenu();
            }
        }
    });
}