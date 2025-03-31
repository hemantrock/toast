
$(document).ready(function () {
    $('#tblTruckDetails').dataTable({
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
                { sWidth: "20%" },
                { sWidth: "20%" },
                { sWidth: "20%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
        }
    });
});
