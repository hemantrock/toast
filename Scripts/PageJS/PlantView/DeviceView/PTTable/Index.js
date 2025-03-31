$(document).ready(function () {
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);

    //$('#tblPTs').dataTable({
    //    "iDisplayLength": iGblNoRows,
    //    "bLengthChange": false,
    //    "bFilter": true,
    //    "bPaginate": false,
    //    "bInfo": true,
    //    "aaSorting": [],
    //    "aoColumns":
    //        [
    //            { sWidth: "12%" },
    //            { sWidth: "28%" },
    //            { sWidth: "15%" },
    //            { sWidth: "15%" },
    //            { sWidth: "15%" },
    //            { sWidth: "10%" },

    //        ],
    //    "bAutoWidth": false,
    //});
});