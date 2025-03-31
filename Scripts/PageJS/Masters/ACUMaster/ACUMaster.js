var LastTTNum;
$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('Masters/ACUMaster', 'Index');
        $('#cancelModal').modal('hide');
    });
});

function UpdateACUMasters() {

    var activityName = "Edit an ACU";
    var activityDetail = "Device: " + $('#txtACUDesc').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateACUMastersDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateACUMastersDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateACUMastersDo() {

    if ($('#chkEnabled').is(":checked")) {
        DevEnabled = 1;
    }
    else {
        DevEnabled = 0;
    }

    var objACUMast = {
        'ACUID': $('#hdnIdKey').val(),
        'Enabled': DevEnabled,
        };
    
    $.ajax({
        url: "/ACUMaster/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objACUMast),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Masters/ACUMaster', 'Index');
            }
        }
    });
}
