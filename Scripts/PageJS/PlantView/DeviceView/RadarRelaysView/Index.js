$(document).ready(function () {
    opcPageName = "RDRView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}


function SetRadarRelayProofTest(RadarRelayDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Radar Relay Proof Test";
    var activityDetail = "Radar Relay Proof Test: " + RadarRelayDetails;

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

function RadarRelayMaintainenceMode(RadarRelayDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Radar Relay Maint Mode";
    var activityDetail = "Radar Relay Maintainence Mode: " + RadarRelayDetails;

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