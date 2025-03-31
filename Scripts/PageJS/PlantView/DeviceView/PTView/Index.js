$(document).ready(function () {
    opcPageName = "PTView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}

function PTMaintainenceMode(PTDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "PT Maint Mode";
    var activityDetail = "Pressure Transmitter Maintainence Mode: " + PTDetails;

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
                    toggleChange(this, TagName, UserID, LoginID, UserName);
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}