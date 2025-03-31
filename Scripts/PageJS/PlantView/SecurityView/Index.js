$(document).ready(function () {
    //opcPageName = "SecurityView,ESDView,DykeValveView.*,HCDView,SirenView";
    //InitConn(opcPageName, 0);
    //if (opcStartDone == true) {
    //    setTimeout(function () { opc.server.readPageTags(opcPageName); }, 3000);
    //}
});


function ExtraActivities(model) {

}

function ChangeESDTimeOut(src, TagName, UserID, LoginID, UserName) {

    var existingValue = 0;
    if ($('#txtESDTimeEntry').attr('data-opcvalue') != undefined) {
        existingValue=$('#txtESDTimeEntry').attr('data-opcvalue').val();
    }
    $('#txtESDTimeEntry').attr('data-opcvalue', $('#txtESDTimeEntry').val());

    var activityName = "Update ESD Timer";
    var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#txtESDTimeEntry').val();

    var src = $('#txtESDTimeEntry');
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SendDataToOPC($('#txtESDTimeEntry'), TagName, ApproverId, "", "");
                }
            }
            else
            {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC($('#txtESDTimeEntry'), TagName, ApproverId, "", "");
                }, activityName, activityDetail);
            }
        }
    });
}