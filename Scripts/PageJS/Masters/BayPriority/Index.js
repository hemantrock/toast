
$(document).ready(function () {
    $('#tblLPPriority').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [               
                { sWidth: "15%", "sClass": "text-center" },
                { sWidth: "15%", "sClass": "text-center" },
                { sWidth: "30%", "sClass": "text-center" },
                { sWidth: "20%", "sClass": "text-center" },
                { sWidth: "20%", "sClass": "text-center" },
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
        var ProductID = $(this).attr('data-ProductID');
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteBayPriority(Id, ProductID);
            $('#deleteModal').modal('hide');
        });
    });
}
         
function OpenAddSingleProductPriority()
{
    $.ajax({
        type: "GET",
        url: "/BayPriority/AddSingleProduct",
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

function OpenAddMixedProductPriority()
{
    $.ajax({
        type: "GET",
        url: "/BayPriority/AddMixedProduct",
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

function deleteBayPriority(Id, ProductID) {
    $.ajax({
        type: "POST",
        url: "/BayPiority/Delete?Id=" + Id + "&ProductID=" + ProductID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBayPriorityMenu();
            }
        }
    });
}