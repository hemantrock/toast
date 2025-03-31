$(document).ready(function () {

});

function GetNewLoadSpot(wLoadID, SeqNo, ActDet) {
    var activityName = "Assign New Load Spot";
    var activityDetail = ActDet;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                GetNewLoadSpotDo(wLoadID, SeqNo);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { GetNewLoadSpotDo(wLoadID, SeqNo); }, activityName, activityDetail, wLoadID);
            }
        }
    });
}

function GetNewLoadSpotDo(wLoadID, SeqNo)
{
    var ClustNo = $('#ddlClusterNo').val();
    var LSNo = $('#ddlLoadSpotNo').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/AssignNewLoadSpot?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&ClustNo=" + ClustNo + "&LSNo=" + LSNo,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                $(".modal-backdrop").slideUp('slow');
                $('#EmptyModal').modal('hide');
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
        }
    });
}
