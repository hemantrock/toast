$(document).ready(function () {

});

function LoadSpotAssign(wLoadID, SeqNo, ActDet) {
    if (wLoadID == null || wLoadID == "" || wLoadID == 'undefined' || wLoadID == 0) {
        alertDismissable("danger", 'LoadID was Invalid!'); return;
    }
    $(".modal-backdrop").slideUp('slow');
    $('#EmptyModal').modal('hide');
    $.ajax({
        type: "GET",
        url: "/WagonSummary/GetNewLoadSpot?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                //clearTimeout(gblTimeout);
                $('#EmptyModal').html('');
                $('#EmptyModal').html(result);
                //$('#EmptyModal .modal-title').html('Assign New Load Spot');
                $('#EmptyModal').modal('show');
                $('#EmptyModal').draggable({ handle: ".modal-header" });
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    GetNewLoadSpot(wLoadID, SeqNo, ActDet);
                });
            }
        }
    });
}

function LoadSpotReallocate(wLoadID, SeqNo) {
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/LoadSpotToBeReallocated?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&Remarks=" + sRemarks,
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

function WagonRegularizeView(wLoadID, SeqNo) {
    $(".modal-backdrop").slideUp('slow');
    $('#EmptyModal').modal('hide');
    alertDismissable("info", "Initiating Regularize for Wagon LoadID: " + wLoadID+", SeqNo: "+ SeqNo);
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonRegularizeView?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo,
        cache: false,
        success: function (RegularizeResult) {
            if (RegularizeResult.blnStatus != 'undefined' && RegularizeResult.blnStatus == false) {
                alertDismissable(RegularizeResult.strType, RegularizeResult.strMessage)
            }
            else {
                $('#EmptyModal').html('');
                $('#EmptyModal').html(RegularizeResult);
                $('#EmptyModal').modal('show');
                $('#EmptyModal').draggable({ handle: ".modal-header" });
            }
        }
    });
}

function WagonSick(wLoadID, SeqNo) {
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/SetWagonSick?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&Remarks=" + sRemarks,
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

function WagonCancel(wLoadID, SeqNo) {
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonCancelDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&Remarks=" + sRemarks,
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

function WagonSamplingView(wLoadID, SeqNo, ActDet) {
    if (wLoadID == null || wLoadID == "" || wLoadID == 'undefined' || wLoadID == 0) {
        alertDismissable("danger", 'LoadID was Invalid!'); return;
    }
    var sRemarks = $('#Pwd_txtRemarks').val();
    $(".modal-backdrop").slideUp('slow');
    $('#EmptyModal').modal('hide');
    alertDismissable('info', "Getting Sampling Config Page....");
    $.ajax({
        type: "GET",
        url: "/WagonSummary/AddSamplingQtyView?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&Remarks=" + sRemarks,
        UpdateTargetId: "dvContent",
        global: true,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                //clearTimeout(gblTimeout);
                $('#EmptyModal').html('');
                $('#EmptyModal').html(result);
                $('#EmptyModal').modal('show');
                $('#EmptyModal').draggable({ handle: ".modal-header" });
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    ValidateSamplingQty(wLoadID, SeqNo, ActDet);
                });
            }
        }
    });
}

function WagonTopUpView(wLoadID, SeqNo, ActDet) {
    alertDismissable("info", "Initiating TopUp for: " + ActDet);
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonTopUpView?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&Remarks=" + sRemarks,
        cache: false,
        success: function (TopUpResult) {
            if (TopUpResult.blnStatus != 'undefined' && TopUpResult.blnStatus == false) {
                alertDismissable(TopUpResult.strType, TopUpResult.strMessage)
            }
            else {
                $('#EmptyModal').html('');
                $('#EmptyModal').html(TopUpResult);
                $('#EmptyModal').modal('show');
                $('#EmptyModal').draggable({ handle: ".modal-header" });
            }
        }
    });
}

function WagonAbortDo(wLoadID, SeqNo, ActDet) {
    alertDismissable("info", "Initiating Abort for: " + ActDet);
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonAbortDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&strRemarks=" + sRemarks,
        cache: false,
        success: function (AbortResult) {
            alertDismissable(AbortResult.strType, AbortResult.strMessage);
            if (AbortResult.blnStatus == true) {
                $(".modal-backdrop").slideUp('slow');
                $('#EmptyModal').modal('hide');
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
        }
    });
}
function WagonRemoteStopDo(wLoadID, SeqNo, ActDet) {
    alertDismissable("info", "Initiating Remote Stop for: " + ActDet);
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonRemoteStopDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&strRemarks=" + sRemarks,
        cache: false,
        success: function (AbortResult) {
            alertDismissable(AbortResult.strType, AbortResult.strMessage);
            if (AbortResult.blnStatus == true) {
                $(".modal-backdrop").slideUp('slow');
                $('#EmptyModal').modal('hide');
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
        }
    });
}