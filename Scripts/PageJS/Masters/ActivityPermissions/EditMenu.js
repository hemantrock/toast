var oTable;
$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenSecurityActivityMenu();
        $('#cancelModal').modal('hide');
    });

    oTable = $('#tblMenus').dataTable({
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
                { sWidth: "20%" },
                { sWidth: "70%" },
            ],
        "bAutoWidth": false,
    });
});

function SaveMenuPermissions(Id) {
    var activityName = "Update Menu Permissions";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveMenuPermissionsDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveMenuPermissionsDo(Id); }, activityName,"");
            }
        }
    });
}

function SaveMenuPermissionsDo(Id) {
    var menuData = [];

    $('input[name=chkMenu]', oTable.fnGetNodes()).each(function () {
        var obj = {
            'MenuID': $(this).attr('id'),
            'UserRoleID': Id,
            'Permission': $(this).is(':checked'),
        };
        menuData.push(obj);
    });

    $.ajax({
        url: "/ActivityPermissions/EditMenu",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(menuData),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSecurityActivityMenu();
            }
        }
    });

}