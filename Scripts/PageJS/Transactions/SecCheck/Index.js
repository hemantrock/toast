$(document).ready(function () {
    //$('#tblSecCheck').dataTable({
    //    "iDisplayLength": 50,
    //    "bLengthChange": false,
    //    "bFilter": true,
    //    "bPaginate": true,
    //    "bInfo": true,
    //    "bSort": false,
    //    "aoColumns":
    //        [
    //            { sWidth: "0%" },
    //            { sWidth: "40%" },
    //            { sWidth: "60%" },
    //            //{ sWidth: "55%" },
    //            //{ sWidth: "15%" },
    //        ],
    //    "bAutoWidth": false,
    //});
    refreshSecCheckList(oStage);
    //clearTimeout(gblTimeout);
    //gblTimeout = setTimeout(function () { refreshSecCheckList(oStage); }, 10000);
});

function AddEditRecord(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        clearTimeout(gblTimeout);
        $.ajax({
            type: "GET",
            url: "/SecCheck/EditSecCheckView?LoadID=" + Id + "&Stage=" + oStage,
            UpdateTargetId: "dvContent",
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    alertDismissable(result.strType, result.strMessage);
                }
                else {
                    $("#dvContent").html(result);
                }
            }
        });
    }
}

function refreshSecCheckList(oStage) {
    if ($("#SecCheckData").length <= 0) { return; }
    $.ajax({
        type: "GET",
        url: "/SecCheck/GetSecTable?Stage=" + oStage,
        cache: false,
        global: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#SecCheckData").html(result);
                createDataTable();
            }
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshSecCheckList(oStage); }, 10000);
        }
    });
}

function createDataTable() {
    $('#tblSecCheck').dataTable({
        "iDisplayLength": 50,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "responsive": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "40%" },
                { sWidth: "60%" },
                //{ sWidth: "55%" },
                //{ sWidth: "15%" },
            ],
        "bAutoWidth": false,
    });
}