$(document).ready(function () {

});

function SaveTopUpQtyDo(wLoadID, SeqNo) {
    $.ajax({
        url: "/WagonSummary/SaveTopUpQtyDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&TopUpQty=" + $('#txtTopUpQty').val(),
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