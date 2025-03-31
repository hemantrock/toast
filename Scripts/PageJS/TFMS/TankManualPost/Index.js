$(document).ready(function () {
    ViewTankManualPost();
    InitDTPickers();
});

function InitDTPickers() {
    $('#dtpFrom').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        stepping: 15
    });
}

function ViewTankManualPost()
{
    var strUrl = "/TankManualPost/LoadTankData";

    if ($('#dtpFrom').val() != null && $('#dtpFrom').val() != 'undefined' && $('#dtpFrom').val() != "") {
        strUrl = "/TankManualPost/LoadTankData?FromDT=" + $('#dtpFrom').val();
    }
    else {
        return false;
    }
    $.ajax({
        type: "GET",
        url: strUrl,
        UpdateTargetId: "dvTankData",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvTankData").html(result);
                UpdateChecks();
            }
        }
    });
}

function UpdateChecks() {
    var bChk = $('#chkSelect').is(':checked');
    $("input[name=chkTank]").prop('checked', bChk);
}
