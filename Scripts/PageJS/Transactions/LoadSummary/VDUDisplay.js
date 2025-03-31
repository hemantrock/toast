$(document).ready(function () {

    $('#tblVDUDisplay').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "20%" },
                { sWidth: "25%" },
                { sWidth: "15%" },
                { sWidth: "25%" },
                { sWidth: "15%" },
            ],
        "bAutoWidth": false,
    });
});