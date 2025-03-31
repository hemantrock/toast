var oTable;

$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTankManualPostMenu();
        $('#cancelModal').modal('hide');
    });

    strUrl = "/TankManualEntry/GetTankMasterData";
    //if ($('#dtpFrom').val() != null && $('#dtpFrom').val() != 'undefined' && $('#dtpFrom').val() != "") {
    //    strUrl = "/TankManualEntry/GetTankMasterData?FromDT=" + $('#dtpFrom').val();
    //}
    //else {
    //    return false;
    //}
    

});

function ManualPostTankData() {
    var tankData = [];

    $('input[name=chkTank]:checked', oTable.fnGetNodes()).each(function () {
        var obj = {
            'TankID': $(this).attr('id'),
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