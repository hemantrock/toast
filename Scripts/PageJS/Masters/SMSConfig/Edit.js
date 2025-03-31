$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenSMSConfigMenu();
        $('#cancelModal').modal('hide');
    });
});

function LoadDDLSMSReceivers(sel)
{
    console.log(sel);
    var selData = new Array();
    selData = sel.split(',');
    for (a in selData) {
        selData[a] = parseInt(selData[a], 10);
    }

    var ctrl = $('#ddlReceivers');
    $.ajax({
        url: "/SMSConfig/GetSMSReceivers",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r = "";
            $.each(result, function (i, obj) {
                var selected = (selData.indexOf(obj.Id) >= 0 ? 'selected' : '');               
                r = "<option " + selected + " value=" + obj.Id +  ">" + obj.Name + "</option>";
                ctrl.append(r);
            });
            $('#ddlReceivers').chosen();
            $('#ddlReceivers_chosen').css('width', '400px');
        }
    });
}
function SaveEventSMSReceivers(Id) {
    var activityName = "Edit SMS Receivers";
    var activityDetail = "Event ID: " + Id;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveEventSMSReceiversDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveEventSMSReceiversDo(Id); }, activityName, activityDetail);
            }
        }
    });
}
function SaveEventSMSReceiversDo(Id) {
    var selData = $('#ddlReceivers').val();

    $.ajax({
        url: "/SMSConfig/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({Id: Id, selData : $('#ddlReceivers').val()}),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSMSConfigMenu();
            }
        }
    });
}