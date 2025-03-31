$(document).ready(function () {
    $('#tblTagEvent').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bSort": false,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "15%" },
                { sWidth: "10%" },
                { sWidth: "5%" },
                { sWidth: "10%" },
                { sWidth: "15%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
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
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteEventConfig(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function OpenAddTagEvent()
{
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/AddEventsConfig",
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
        url: "/AlarmsAndEvents/EditTagEvent?Id=" + Id,
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

function deleteEventConfig(Id) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/DeleteTagEvent?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenEventsConfig();
            }
        }
    });
}