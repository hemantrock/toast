var ddlOptions = "";
var ddlPumpPriorities = "";

$(document).ready(function () {
    $.ajax({
        url: "/PlantView/GetPumpPriorities",
        type: "GET",
        datatype: "json",
        cache: false,
        async: false,
        success: function (result) {
            ddlPumpPriorities = result;
        }
    });
});

function UpdatePumpPriority(TagName, UserID, LoginID, UserName) {
    var prev = 0;
    if ($('.' + TagName) != undefined && $('.' + TagName).attr('data-opcvalue') != undefined && $('.' + TagName).attr('data-opcvalue') != '?') {
        prev = $('.editable-input.' + TagName).attr('data-opcvalue');
    }
    var NewVal = $('.editable-input.' + TagName).val();
    if (prev == NewVal) { alertDismissable('info', 'Previous and current values are the same'); }
    var activityDetail = "Tag:'" + TagName + "'; Existing Value:" + prev + "; New Value :" + NewVal;
    var activityName = "Update Pump Priority";

    $.ajax({

        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                opc.server.sendDataToOPC(TagName, prev, 'WaterSystem', CurrUserID, LoginID, UserName, NewVal, true, false);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function ()
                { opc.server.sendDataToOPC(TagName, prev, 'WaterSystem', CurrUserID, LoginID, UserName, NewVal, true, false); }, activityName, activityDetail);
            }
        }
    });
}

//function UpdateDDLTextValue(clsName, value) {
//    var result;
//    $.each($('.' + clsName + " span"), function (i, ele) {
//        $(ele).attr('data-opcvalue', value);
//        for (Priority in ddlPumpPriorities) {
//            if (ddlPumpPriorities[Priority].ModeId == value) {
//                result = ddlPumpPriorities[Priority].ModeDesc;
//                break;
//            }
//        }
//        if (result != null && result != 'undefined') {
//            $(ele).text(result);
//        }
//    });
//}

function RunTest(PumpDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Start/Stop Fire Engine Test Run";
    var activityDetail = "Fire Engine Test Run: " + PumpDetails;

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