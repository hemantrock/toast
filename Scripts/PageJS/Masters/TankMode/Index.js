
$(document).ready(function () {
    $('#tblTankMode').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
               { sWidth: "0%" },
                { sWidth: "50%" },
                { sWidth: "30%" },
                { sWidth: "20%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
        }
    });
});

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteTankMode(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function OpenAddTankMode()
{
    $.ajax({
        type: "GET",
        url: "/TankMode/Add",
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

function EditRecord(Id)
{
    $.ajax({
        type: "GET",
        url: "/TankMode/Edit?Id=" + Id,
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

function deleteTankMode(Id) {   
    $.ajax({
        type: "GET",
        url: "/TankMode/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", "Record deleted successfully.");
            }
            else if (result == "fail") {
                alertDismissable("danger", "Object not found to delete.");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in deletion of Tank Mode.");
            }
            else if (result == "referror") {
                alertDismissable("danger", "Tank Mode has referential integrity. Can not be deleted.");
            }
            OpenTankModeMenu();
        }
    });
}