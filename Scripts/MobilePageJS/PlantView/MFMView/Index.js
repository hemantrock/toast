$(document).ready(function () {
    $('#tblMFMOverview').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aaSorting": [[1, 'asc']],
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "6%", "sClass": "text-center" },
                { sWidth: "12%", "sClass": "text-center" },
                { sWidth: "10%", "sClass": "text-center" },
                { sWidth: "12%", "sClass": "text-center" },
                { sWidth: "10%", "sClass": "text-center" },
                { sWidth: "13%", "sClass": "text-center" },
                { sWidth: "10%", "sClass": "text-center" },
                { sWidth: "10%", "sClass": "text-center" },
                { sWidth: "17%", "sClass": "text-center" },
            ],
        "bAutoWidth": false,
    });
    opcPageName = "MFMView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}