$(document).ready(function () {

    $('#tblPrintFAN').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "5%" },
                { sWidth: "5%" },
                { sWidth: "10%" },
                { sWidth: "15%" },
                { sWidth: "5%" },
                { sWidth: "10%" },
                { sWidth: "15%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "15%" },
              
            ],
        "bAutoWidth": false,
    });
});

$(document).ready(function () {
    $('#tblManualPrintFAN').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "5%" },
                { sWidth: "20%" },
                { sWidth: "10%" },              

            ],
        "bAutoWidth": false,
    });
});

function LoadddlTruckNo(iSel) {
    $.ajax({
        url: "/LoadSummary/TruckNo",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlTruckNo').html('');
            var r = "<option value=0>Select Truck No</option>";
            $('#ddlTruckNo').append(r);
            
            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val)) {
                    r = "<option selected value=" + val + ">" + val + "</option>";
                }
                else {
                    r = "<option value=" + val + ">" + val + "</option>";
                }
                $('#ddlTruckNo').append(r);
            });
        }
    });
}

function ManualLoadID(iSel) {
    $.ajax({
        url: "/LoadSummary/ManualLoadID",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {                        
            $('#txtLoadID').append(result);          
        }
    });
}
// Print text hide on printing