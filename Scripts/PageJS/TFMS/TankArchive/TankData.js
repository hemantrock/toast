$(document).ready(function () {
    $('#tblTanks').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bSort": false,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "10%" },
                { sWidth: "6%" },
                { sWidth: "6%" },
                { sWidth: "12%" },
                { sWidth: "7%" },
                { sWidth: "6%" },
                { sWidth: "9%" },
                { sWidth: "8%" },
                { sWidth: "7%" },
            ],
        "bAutoWidth": false,
    });
});
