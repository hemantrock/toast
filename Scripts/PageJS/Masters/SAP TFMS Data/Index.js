
$(document).ready(function () {
    $('#tbl').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "5%" },
                { sWidth: "5%" },
                { sWidth: "8%" },
                { sWidth: "5%" },
                { sWidth: "5%" },
                { sWidth: "20%" },
                { sWidth: "5%" },
                { sWidth: "8%" },
                { sWidth: "5%" },
                { sWidth: "5%" },
                { sWidth: "9%" },
                { sWidth: "20%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
           
        }
    });
   
});








