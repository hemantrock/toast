var oTable;
$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenSecurityActivityMenu();
        $('#cancelModal').modal('hide');
    });

    oTable = $('#tblActivity').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%", "sClass": "text-center" },
                { sWidth: "10%", "sClass": "text-center" },
                { sWidth: "13%" },
                { sWidth: "15%" },
                { sWidth: "50%" },
                { sWidth: "12%", "sClass": "text-center" },
            ],
        "bAutoWidth": false,
    });
});

function SaveActivityPermissions(Id) {
    var activityName = "Update Activity Permissions";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveActivityPermissionsDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveActivityPermissionsDo(Id); }, activityName,"");
            }
        }
    });
}


function SaveActivityPermissionsDo(Id) {
    var ActivityData = [];

    $('input[name=chkActivity]', oTable.fnGetNodes()).each(function () {
        var obj = {
            'ActivityID': $(this).attr('id'),
            'UserRoleID': Id,
            'Permission': $(this).is(':checked'),
        };
        ActivityData.push(obj);
    });

    $.ajax({
        url: "/ActivityPermissions/EditActivity",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(ActivityData),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSecurityActivityMenu();
            }
        }
    });
}