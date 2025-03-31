$(document).ready(function () {
    UpdateTotal();
});

function ValidateSamplingQty(wLoadID, SeqNo, ActDet) {
    var effSamplQty = parseFloat($('#txtEffSample').text());
    if (effSamplQty < 0) { alertDismissable("danger", "Effective Sampling Qty cannot be less than Zero."); return; }
    if (effSamplQty > 0 && (effSamplQty < parseFloat(WagonMinPreset).toFixed(2))) { alertDismissable("danger", "Effective Sampling Qty, if greater than 0 should be more than Min Preset of "+ WagonMinPreset); return; }
    var msg = "Are you sure to Add Sampling Qty?";
    if (effSamplQty < WagonMinPreset) { msg = "Effective Sampling Qty is 0. This will Reset the Sampling Requirement. Are you sure to continue?"; }
    $('#myConfirmMsg').html("<p>"+msg+"</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        SaveSamplingQty(wLoadID, SeqNo, ActDet)
    });
}

function SaveSamplingQty(wLoadID, SeqNo, ActDet) {
    var activityName = "Add Sampling Qty in Wagon";
    var activityDetail = ActDet;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveSamplingQtyDo(wLoadID, SeqNo);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveSamplingQtyDo(wLoadID, SeqNo); }, activityName, activityDetail, wLoadID);
            }
        }
    });
}

function SaveSamplingQtyDo(wLoadID, SeqNo) {
    $.ajax({
        url: "/WagonSummary/SaveSamplingQtyDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&SamplingQty=" + $('#txtSampling').val(),
        type: "GET",
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

function UpdateTotal() {
    $('#txtEffSample').text(((+$('#txtDelivered').text()) - (+$('#txtPreset').text()) + (+$('#txtSampling').val())).toFixed(2));
}

