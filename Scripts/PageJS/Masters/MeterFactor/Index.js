
$(document).ready(function () {
    $('#tblMeterFactor').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "20%" },
                { sWidth: "20%" },
                { sWidth: "15%" },
                { sWidth: "15%" },
                { sWidth: "15%" },
                { sWidth: "15%" },
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
            deleteMeterFactor(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function OpenAddMeterFactor()
{
    $.ajax({
        type: "GET",
        url: "/MeterFactor/Add",
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
        url: "/MeterFactor/Edit?Id=" + Id,
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

function deleteMeterFactor(Id) {
    $.ajax({
        type: "GET",
        url: "/MeterFactor/Delete?Id=" + Id,
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
                alertDismissable("danger", "Error in deletion of MeterFactor.");
            }
            else if (result == "referror") {
                alertDismissable("danger", "MeterFactor has referential integrity. Can not be deleted.");
            }
            OpenMeterFactorMenu();
           
        }
    });
}