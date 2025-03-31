var oTable;
$(document).ready(function () {
    oTable = $('#tblNotifications').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aaSorting": [],
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "8%", sClass:'text-center' },
                { sWidth: "17%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "55%" },
            ],
        "bAutoWidth": false,
    });
});


function SaveNotifications(Id)
{
    var objMap = [];

    $('input[name=chkNotification]', oTable.fnGetNodes()).each(function () {
        var obj = {
            'EventId': $(this).attr("id").replace('chk_',''),
            'UserID': Id,
            'IsSubscribed': $(this).is(':checked'),
        };
        objMap.push(obj);
    });

    $.ajax({
        url: "/Users/UpdateNotifications",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({'Id': Id, 'objMap': objMap}),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenUsersMenu();
            }
        }
    });
}