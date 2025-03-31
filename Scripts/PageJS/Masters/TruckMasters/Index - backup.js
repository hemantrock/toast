
$(document).ready(function () {
    $('#tblTruckMasters').dataTable({
        "iDisplayLength": iGblNoRows - 7,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "15%" },
                { sWidth: "19%" },
                { sWidth: "6%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "5%" },
                { sWidth: "5%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanEdit();
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
            deleteTruckMasters(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function BindSpanEdit() {
    $('.spanEdit').on("click", function (e) {
        cancelBubble(e);
        var Id = $(this).data('id');
        EditRecord(Id);
    });
}

function OpenAddTruckMasters()
{
    $.ajax({
        type: "GET",
        url: "/TruckMasters/Add",
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
        url: "/TruckMasters/Edit?Id=" + Id,
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

function deleteTruckMasters(Id) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            OpenTruckMastersMenu();
        }
    });
}

function ShowTruckDetails(Id) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/TruckDetails?Id=" + Id,
        UpdateTargetId: "dvTruckDetails",
        cache: false,
        success: function (result) {
            $("#dvTruckDetails").html(result);
        }
    });
}
