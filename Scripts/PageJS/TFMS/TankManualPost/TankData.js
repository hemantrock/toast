function ManualPostTankData() {
    var cntTanks = $('input[name=chkTank]:checked');
    if (cntTanks <= 0) { alertDismissable("danger", "Please select atleast 1 Tank to Post"); return; }

    var DipType = $('#ddlDipType').val();
    if (DipType == "") { alertDismissable("danger", "Please select Proper Dip Type to Post"); return; }
   
    var activityName = "Manual Post TFMS Data";
    var activityDetail = "";
    $('input[name=chkTank]:checked', oTable.fnGetNodes()).each(function () {
        activityDetail = activityDetail + $(this).attr('tnkName') + "; "
    });

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                ManualPostTankDataDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ManualPostTankDataDo(); }, activityName, activityDetail);
            }
        }
    });
}


function ManualPostTankDataDo() {
    var cntTanks = $('input[name=chkTank]:checked');
    if (cntTanks <= 0) { alertDismissable("danger", "Please select atleast 1 Tank to Post"); return; }

    var DipType = $('#ddlDipType').val();
    if (DipType == "") { alertDismissable("danger", "Please select Proper Dip Type to Post"); return;}
    var tankData = [];
    $('input[name=chkTank]:checked', oTable.fnGetNodes()).each(function () {
        var obj = {
            'TankID': $(this).attr('id'),
            'DipType': DipType,
            'DataTimeStamp': $(this).attr('data-datetime'),
        };
        tankData.push(obj);
    });

    $.ajax({
        url: "/TankManualPost/ManualPostData",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(tankData),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTankManualPostMenu();
            }
        }
    });
}