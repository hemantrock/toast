var myVar;
var tbleS, tbleP;
$(document).ready(function () {
    var pageType = "Alarm";
    console.log(iGblNoRows);
    tbleS = $('div.scrollable #tblAlarms').DataTable({
        "iDisplayLength": (iGblNoRows - 4),
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bStateSave": true,
        "bInfo": true,
        "bSort": false,
        "bAutoWidth": true,
    });

    tbleP = $('div.pinned #tblAlarms').DataTable({
        "iDisplayLength": (iGblNoRows - 4),
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bStateSave": true,
        "bInfo": true,
        "bSort": false,
        "bAutoWidth": true,
    });

    setTimeout(function () {
        $('#tblAlarms.dataTable').removeAttr('style');
    }, 1000);

    

    $('#txtSearchTable').on('input keyup', function () {
        tbleS.search($('#txtSearchTable').val(), false, false).draw();
        tbleP.search($('#txtSearchTable').val(), false, false).draw();
    });
});