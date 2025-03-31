$(document).ready(function () {
    $('#txtRemarks').val($('#Pwd_txtRemarks').val());
    UpdateEffQty();
});

function WagonRegularizeDo(wLoadID, SeqNo, ActDet) {
    //alertDismissable("danger", "Work is pending"); return;
    var ret = true;
    var ActualWagonStatus = $('#ddl_ActualWagonStatus').val();

    if (ActualWagonStatus == "-1") {
        alertDismissable('danger', 'Please select the actual wagon Status');
        return false;
    }

    //alertDismissable("info", "Regularizing " + ActDet);
    var objWagonDet = {
        'WLoadID': wLoadID,
        'WagonSeqNo': SeqNo,
        'WagonStatusID': ActualWagonStatus,
        'LoadStatusID': $('#ddlLoadDetails').val(),
        'TopUpQty': Number($('#txtTopUp').val().trim()),
        'DecantedQty': Number($('#txtDecant').val().trim()),
    };


    var blnResp = $.ajax({
        url: "/WagonSummary/WagonRegularizeDo",
        type: "POST",
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ oWagDet: objWagonDet, strRemarks: $('#txtRemarks').val() }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    }).responseJSON;
    if (blnResp.blnStatus == true)
    {
        ret = true;
        $(".modal-backdrop").slideUp('slow');
        $('#EmptyModal').modal('hide');
        OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
    }
    else { ret = false; }

    return ret;
}

function UpdateEffQty(event) {
    var TopUpQty = (parseFloat($('#txtTopUp').val()) || 0);
    var DecantQty = (parseFloat($('#txtDecant').val()) || 0);
    var FilledQty = (parseFloat($('#txtFilled').text()) || 0);
    $('#txtEffQty').text((FilledQty + TopUpQty - DecantQty).toFixed());
}