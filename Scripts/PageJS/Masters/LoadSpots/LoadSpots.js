$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('/Masters/LoadSpots/', 'Index');
        $('#cancelModal').modal('hide');
    });
});


function UpdateLoadSpot() {

    var activityName = "Edit existing Load Spot";
    var activityDetail = "Load Spot ID: " + $('#txtLSUniqueID').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateLoadSpotDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateLoadSpotDo(); }, activityName, activityDetail);
            }
        }
    });
}


function UpdateLoadSpotDo() {
    var vLSEnabled = 0; vOVSPBypass = 0; vLAPSBypass = 0;
    if ($('#chkLSEnable').is(":checked")) { vLSEnabled = 1; }
    if ($('#chkOVSPBypass').is(":checked")) { vOVSPBypass = 1; }
    if ($('#chkLAPSBypass').is(":checked")) { vLAPSBypass = 1; }

    var objLoadSpot = {
        'UniqueID': $('#txtLSUniqueID').val(),
        'LAPSBypass': vLAPSBypass ,
        'OverspillBypass': vOVSPBypass,
        'LSEnable': vLSEnabled,
    };

    $.ajax({
        url: "/LoadSpot/EditLoadSpot",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objLoadSpot),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true)
            { OpenViewPath('/Masters/LoadSpots/', 'Index'); }
        }
    });
}
