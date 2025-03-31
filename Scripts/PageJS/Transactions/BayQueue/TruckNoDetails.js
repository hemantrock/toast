
$(document).ready(function () {
    $('#tblTruckNoDetails').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "5%" },
                { sWidth: "25%" },
                { sWidth: "30%" },
                { sWidth: "20%" },
               
            ],
        "bAutoWidth": false,
    });
});
