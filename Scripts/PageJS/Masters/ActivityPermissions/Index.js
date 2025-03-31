
$(document).ready(function () {
    $('#tblDesignations').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "50%" },
                { sWidth: "25%" },
                { sWidth: "25%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanEdit();
        }
    });
});

function BindSpanEdit() {
    $('.spanMenu').on("click", function (e) {
        var Id = $(this).attr('data-id');        
        EditMenuRecord(Id);
    });

    $('.spanActivity').on("click", function (e) {
        var Id = $(this).attr('data-id');
        EditActivityRecord(Id);
    });
}

function EditMenuRecord(Id)
{
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/EditMenu?Id=" + Id,
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

function EditActivityRecord(Id) {
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/EditActivity?Id=" + Id,
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
