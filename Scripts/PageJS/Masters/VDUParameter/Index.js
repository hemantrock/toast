
$(document).ready(function () {
    $('#tblVDUParameter').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "20%" },
                { sWidth: "50%" },
                { sWidth: "30%", 'sClass': 'text-center' },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
            BindSpanEdit();
        }
    });
});

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteVDUParameter(Id);
            $('#deleteModal').modal('hide');
        });

    });
}


function OpenAddVDUParameter() {
    $.ajax({
        type: "GET",
        url: "/VDUParameter/Add",
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

function BindSpanEdit() {
    $('.spanEdit').on("click", function (e) {
        cancelBubble(e);
        var Id = $(this).data('id');
        EditRecord(Id);
    });
}


function EditRecord(Id) {
    $.ajax({
        type: "GET",
        url: "/VDUParameter/Edit?Id=" + Id,
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