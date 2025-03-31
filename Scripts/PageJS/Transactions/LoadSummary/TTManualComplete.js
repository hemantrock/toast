
function ValidateManualTTComplete(Id) {
    var ret = true;
    return ret;
}

function UpdateFilled(CompNo) {
    $('#txtAccEnd_' + CompNo).val();
    var diff = parseFloat($('#txtAccEnd_' + CompNo).val()) - parseFloat($('#txtAccStart_' + CompNo).val());
    if (diff != 'NaN') {
        $("#txtFilled_" + CompNo).val(diff);
    }
    else {
        $("#txtFilled_" + CompNo).val(0);
    }
}


function ManualCompleteTTDo(LoadID) {
    var ret = true;
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        ret = false;
        return false;
    }

    var blnResult = ValidateManualTTComplete(LoadID);

    alertDismissable('info', 'Manually Completing LoadID:' + LoadID + '....');

    if (blnResult == false) { return false; }
    var ActualTruckStatus = $('#ddl_ActualTruckStatus').val();

    var objLoadMaster = {
        'LoadID': LoadID,
        'TruckStatus': ActualTruckStatus,
    };

    var objLoadDetails = [];

    $("input[name='chkSelect']").each(function () {
        var compId = $(this).attr('id');
        var obj = {
            'LoadID': LoadID,
            'CompNo': compId,
            'LoadStatus': $('#ddlLoadDetails_' + compId).val(),
            'AccumulatedStart': Number($('#txtAccStart_' + compId).val().trim()),
            'AccumulatedComplete': Number($('#txtAccEnd_' + compId).val().trim()),
            'BaseProdQtyGrs': Number($('#txtFilled_' + compId).val().trim()),
            'TempAvg': Number($('#txtAvgTemp_' + compId).val()),
            'DensityAvg': Number($('#txtAvgDens_' + compId).val()),
            'DensityAvgAt15': Number($('#txtDens15_' + compId).val()),
            'TankID': $('#ddlTankNo_' + compId).val(),
        };
        objLoadDetails.push(obj);
    });
    var blnResp = $.ajax({
        url: "/LoadSummary/ManualCompleteTTDo",
        type: "POST",
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objLoadMaster: objLoadMaster, objLoadDetails: objLoadDetails, strRemarks: $('#txtRemarks').val() }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    }).responseJSON;
    console.log(blnResp);
    if (blnResp.blnStatus == true) { ret = true; OpenLoadSummaryMenu(); }
    else { ret = false; }
    return ret;
}