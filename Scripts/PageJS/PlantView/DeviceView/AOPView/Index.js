$(document).ready(function () {
    opcPageName = "AOPView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}

function SetAOPProofTest(AOPDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "VFT Proof Test";
    var activityDetail = "VFT Proof Test: " + AOPDetails;

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

function MaintainenceMode(AOPDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "VFT Maint Mode";
    var activityDetail = "VFT Maintainence Mode: " + AOPDetails;

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