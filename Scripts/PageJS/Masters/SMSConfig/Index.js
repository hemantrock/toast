$(document).ready(function () {
    $('#tblEvents').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "15%" },
                { sWidth: "0%" },
                { sWidth: "30%" },
                { sWidth: "50%" },
                { sWidth: "5%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanEdit();
        }
    });
});

function BindSpanEdit() {
    $('.spanEdit').on("click", function (e) {
        cancelBubble(e);
        var Id = $(this).data('id');
        EditSMSConfigRecord(Id);
    });
}

function EditSMSConfigRecord(Id)
{
    $.ajax({
        type: "GET",
        url: "/SMSConfig/Edit?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $('#myModalBody').html(result);
                $('#myModal .modal-title').html('Edit ' + Id  + ' Receivers : ');
                $('#myModal').modal('show');
                $('#myModal').draggable({handle: ".modal-header"});
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    if (SaveEventSMSReceivers(Id) != false)
                    {
                        $(".modal-backdrop").slideUp('slow');
                        $('#myModal').modal('hide');
                        OpenSMSConfigMenu();
                    }    
                });
            }
        }
    });
}