$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('/Masters/WagonBCUs/', 'Index');
        $('#cancelModal').modal('hide');
    });
});


function UpdateWagonBCU() {

    var activityName = "Edit existing Wagon BCU";
    var activityDetail = "BCU Name: " + $('#txtBCName').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateWagonBCUDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateWagonBCUDo(); }, activityName, activityDetail);
            }
        }
    });
}


function UpdateWagonBCUDo() {
    var vBcuEnabled = 0; vEarthBypass = 0; vRITAvailable = 0;
    if ($('#chkRITAvailable').is(":checked")) { vRITAvailable = 1; }
    if ($('#chkEarthBypass').is(":checked")) { vEarthBypass = 1; }
    if ($('#chkESDBypass').is(":checked")) { vESDBypass = 1; }
    if ($('#chkBCUEnable').is(":checked")) { vBcuEnabled = 1; }
    
    var objWagBcu = {
        'UniqueID': $('#txtBcuID').val(),
        'RITAvailable': vRITAvailable,
        'EarthBypass': vEarthBypass,
        'ESDBypass': vESDBypass,
        'Enabled': vBcuEnabled,
    };

    $.ajax({
        url: "/BatchController/EditWagonBCU",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objWagBcu),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) { OpenViewPath('/Masters/WagonBCUs/', 'Index'); }
        }
    });
}

