
$(document).ready(function () {
    $('#tblBayReallocationStatus').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "40%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "20%" },
                { sWidth: "10%" },
            ],
        "bAutoWidth": false,
        
    });

    $('#tblCompStatus').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "3%" },
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "10%" },
                { sWidth: "5%" },
                { sWidth: "8%" },
                { sWidth: "10%" },
                { sWidth: "25%" },
                { sWidth: "10%" },

            ],
        "bAutoWidth": false,
    });
});



function ReAllocatedBay(ID) {

    var objLoadID = {
        'LoadID': ID,
    };

    var objLoadDetails = [];

    for(i=1;i<=8;i++)
    {
        if ($('#ddlAvlBay_' + i).is(':visible')) {
            var obj = {
                'BayId': $('#ddlAvlBay_' + i).val(),
            };
            objLoadDetails.push(obj);
        }
    }

    $.ajax({
        url: "/LoadSummary/ReAllocatedBay",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objLoadID: objLoadID, objLoadDetails: objLoadDetails }),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                alertDismissable("success", " Bay details updated Successfully.");
                OpenLoadSummaryMenu();
            }
        }
    });
}

function RePrintFAN() {

    var Id = $('#tblLoadMaster tr.selected-row td').eq(0).text();
    //if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
    //    return false;
    //}
    $('#myConfirmMsg').html("<p>Are you sure to RePrint FAN ?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        OpenLoadSummaryMenu();
    });
}

 