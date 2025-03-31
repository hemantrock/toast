
$(document).ready(function () {
    $('#tblTruckDetails').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },                           // Hidden
                { sWidth: "3%", 'sClass': 'text-center' },  // BayID
                { sWidth: "3%", 'sClass': 'text-center' },  // LP No
                { sWidth: "3%", 'sClass': 'text-center' },  // CompNo
                { sWidth: "8%" },                           // ProductName
                { sWidth: "15%" },                          // CustomerDesc
                { sWidth: "6%", 'sClass': 'text-center' },  // PresetQty
                { sWidth: "6%", 'sClass': 'text-center' },  // Filled
                { sWidth: "6%", 'sClass': 'text-center' },  // BaseProduct / Tare Wgt
                { sWidth: "6%", 'sClass': 'text-center' },  // Additive1 / Gross Wgt
                { sWidth: "6%", 'sClass': 'text-center' },  // Additive2 / Net Wgt
                { sWidth: "6%", 'sClass': 'text-center' },  // Blending / Hidden
                { sWidth: "6%", 'sClass': 'text-center' },  // TopUpQty
                { sWidth: "6%", 'sClass': 'text-center' },  // DecantQty
                { sWidth: "6%", 'sClass': 'text-center' },  // Eff.Qty
                { sWidth: "7%", 'sClass': 'text-center' },  // Comp.Status
                { sWidth: "7%", 'sClass': 'text-center' },  // Destination
            ],
        "bAutoWidth": false,
    });
});
