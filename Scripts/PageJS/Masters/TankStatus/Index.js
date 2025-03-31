
$(document).ready(function () {
    $('#tblTankStatus').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "40%" },
                { sWidth: "30%" },
                { sWidth: "30%" },
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
            deleteTankStatusr(Id);
            $('#deleteModal').modal('hide');
        });

    });
}


function OpenAddTankStatus() {
    $.ajax({
        type: "GET",
        url: "/TankStatus/Add",
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

function EditRecord(Id) {
    $.ajax({
        type: "GET",
        url: "/TankStatus/Edit?Id=" + Id,
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

//function deleteTankStatus(Id) {
//    $.ajax({
//        type: "GET",
//        url: "/TankStatus/Delete?Id=" + Id,
//        UpdateTargetId: "dvContent",
//        cache: false,
//        success: function (result) {
//            if (result == "pass") {
//                alertDismissable("success", "Record deleted successfully.");
//            }
//            else if (result == "fail") {
//                alertDismissable("danger", "Object not found to delete.");
//            }
//            else if (result == "error") {
//                alertDismissable("danger", "Error in deletion of Status.");
//            }
//            else if (result == "referror") {
//                alertDismissable("danger", "Status has referential integrity. Can not be deleted.");
//            }
//            OpenTankStatusMenu();
//        }
//    });
//}


function deleteTankStatus(Id) {
    $.ajax({
        type: "GET",
        url: "/TankStatus/Delete?Id=" + Id,
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
                alertDismissable("danger", "Error in deletion of Location.");
            }
            else if (result == "referror") {
                alertDismissable("danger", "Location has referential integrity. Can not be deleted.");
            }
            OpenTankStatusnMenu();
        }
    });
}