var ddlPumpPriorities = "";

$(document).ready(function () {
    //opcPageName = "VFDView,PumpsView.*,HeaderView.*";
    InitConn(opcPageName, 0);
    $('.nav-tabs a:first').tab('show');

    $.ajax({
        url: "/PlantView/GetPumpPriorities",
        type: "GET",
        datatype: "json",
        //cache: false,
        async: false,
        success: function (result) {
            ddlPumpPriorities = result;
        }
    });
    $('.tooltip-custom').tooltipster({
        contentAsHTML: true,
    });
    opc.server.readPageTags(opcPageName);
    createTooltip();
});


function ExtraActivities(model) {

}

function SetToggleTAS_DOL(DeviceDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    
    if ($('.' + TagName).is(':disabled') == true) { alertDismissable("danger", "No Connection. Switch is disabled!"); return;}
    var activityName = "Set VFD in TAS/ DOL Mode";
    var activityDetail = "VFD TAS/ DOL Mode for : " + DeviceDetails;

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
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
            }
        }
    });
}

function SetToggleVFD_AutoManual(DeviceDetails, src, TagName, UserID, LoginID, UserName, event) {

    cancelBubble(event);
    var activityName = "Set VFD/ Pump Operations in Auto / Manual Mode";
    var activityDetail = "VFD TAS/ DOL Mode for : " + DeviceDetails;

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
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    toggleChange(src, TagName, UserID, LoginID, UserName);
                }, activityName, activityDetail);
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