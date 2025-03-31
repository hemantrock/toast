var oTable;

$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTankManualPostMenu();
        $('#cancelModal').modal('hide');
    });

    oTable = $('#tblTanks').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bSort": false,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "5%", sClass: 'text-center' },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "10%"},
                { sWidth: "6%" },
                { sWidth: "6%" },
                { sWidth: "12%"},
                { sWidth: "7%" },
                { sWidth: "6%" },
                { sWidth: "9%" },
                { sWidth: "8%" },               
            ],
        "bAutoWidth": false,
    });
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