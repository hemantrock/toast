var objTbl;
$(document).ready(function () {
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { RefreshTruckStatus(); }, 10000);
    createDataTable();
});

function createDataTable()
{
    objTbl = $('#tblTrucks').DataTable({
        "iDisplayLength": parseInt(((iGblNoRows - 5) / 2)),
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bDestroy": true,
        "bInfo": false,
        "bSort": false,
        "bStateSave":false,
        "aoColumns":
            [
                { sWidth: "14%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "10%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
            ],
        "bAutoWidth": false,
    });
}

function RefreshTruckStatus()
{
    $.ajax({
        type: "GET",
        url: "/TrucksStatus/GetTrucksData",
        cache: false,
        global:false,
        success: function (result) {
            var strTable = "";
            //Delete the datable object first
            if (objTbl != null) {
                // Destroy dataTable
                objTbl.destroy();
                //$('#tblTrucks').empty();
            }
            $(result).each(function (i, val) {
                var rowClass='';
                if (val.Product.toUpperCase() == "Grand Totals".toUpperCase()) {
                    rowClass = 'highlight_row';
                }
                strTable = strTable + "<tr class='"+rowClass+"'>" +
                                        "<td class='text-center'><strong>" + val.Product + "</strong></td>" +
                                        "<td class='text-center'>" + val.Registered + "</td>" +
                                        "<td class='text-center'>" + val.Authorized + "</td>" +
                                        "<td class='text-center'>" + val.In_Queue + "</td>" +
                                        "<td class='text-center'>" + val.Loading + "</td>" +
                                        "<td class='text-center highlight_row'><strong>" + parseInt(val.Registered + val.Authorized + val.In_Queue + val.Loading) + "</strong></td>" +
                                        "<td class='text-center'>" + val.Loaded + "</td>" +
                                        "<td class='text-center'>" + val.Invoiced + "</td>" +
                                        "<td class='text-center'>" + val.Exited + "</td>" +
                                        "<td class='text-center highlight_row'><strong>" + parseInt(val.Loaded + val.Invoiced + val.Exited) + "</strong></td>" +
                                        "<td class='text-center highlight_row'><strong>" + parseInt(val.Registered + val.Authorized + val.In_Queue + val.Loading + val.Loaded + val.Invoiced + val.Exited) + "</strong></td>" +
                                    "</tr>";
            });
            $('#tblTrucksBody').html(strTable);
            createDataTable();
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { RefreshTruckStatus(); }, 10000);
        }
    });
}