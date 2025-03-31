$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenManualUAN();
        $('#cancelModal').modal('hide');
    });
});


function GenerateManualUAN() {
    var activityName = "Generate Manual UAN";
    
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                GenerateManualUANDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { GenerateManualUANDo(); }, activityName);
            }
        }
    });
}

function GenerateManualUANDo() {

    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    $('#FormManual').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var blnError = false;
    $('#tblManualPrintUAN tbody tr').each(function (i, row) {
        var capacity = parseFloat($(row).find('td.capacity').html());
        var load = parseFloat($(row).find('td > input[name=Quantity]').val());
        if (load > capacity) {
            alertDismissable("danger", "UnLoad quantity cannot be greater than compartment capacity for Comp No." + $(row).find('td.CompartmentNo').html());
            blnError = true;
            return false;
        }
    });

    if (blnError == true) {
        return false;
    }

    var objLoad = {
        'TruckID': $('#txtTruck').attr('data-key-value'),
        'TransporterId': $('#txtTransporter').attr('data-key-value'),
        'LoadType': 1,
        'SourceID': 1,
        'PurposeID': 2,
        'TruckStatus': 811,
        //'BridgingType': 1,
        'Remarks': $('#txtRemarks').val(),

    };

    var objLoadDetails = [];
    var strMsg = "";
    $('#tblManualPrintUAN tbody tr').each(function () {
        var i = $(this).attr('id').split('_')[1];
        var CustID = $('#txtCustomer_' + i).attr('data-key-value');
        var DestID = $('#txtDestination_' + i).attr('data-key-value');
        
        if(CustID==undefined || CustID==0)
        {
            strMsg = strMsg + "Comp: " + i + "-Please select from List or add to Customer Masters; ";
        }
        //if (DestID == undefined || DestID == 0) {
        //    strMsg = strMsg + "Comp: " + i + "-Please select from List or add to Destination Masters; ";
        //}
        var obj = {
            'CompNo': $('#txtCompartmentNo_' + i).text(),
            'CustomerID': CustID,
            'DestinationID': DestID,
            'ProductID': $('#ddlProduct_' + i).val(),
            'PresetQty': $('#txtQuantity_' + i).val(),
            'InvoiceDensityGrs': $('#txtAmbDensity_' + i).val(),
            'InvoiceDensityAt15': $('#txtStdDensity_' + i).val(),
            'InvoiceTemp': $('#txtTemp_' + i).val(),
            'LoadStatus': 101,
            'SealNo': 0,
        };
        objLoadDetails.push(obj);
    });

    if (strMsg != "")
    {
        alertDismissable("danger", strMsg);
        return;
    }

    if (objLoadDetails.length > 0) {
        $.ajax({
            url: "/ManualFAN/GenerateManualUAN",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ objLoad: objLoad, objLoadDetails: objLoadDetails }),
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenUnLoadSummaryMenu();
                }
            }
        });
    }
    else {
        alertDismissable("danger", "Products not selected to update.");
    }
}
function ValidateTruck(TruckID) {
    FillDetailsFromTruck(TruckID);
}

function FillDetailsFromTruck(TruckID) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/GetManualUnLoadDetailsView?TruckID=" + TruckID,
        cache: false,
        success: function (result) {
            $("#dvManualLoadDetails").html(result);
        }
    });
}

function FillCustomerBelow(ctrlId, CustomerID, CustomerName) {
    var rowid = "tr_" + ctrlId.split('_')[1];

    var blnFound = false;
    $('#tblManualPrintUAN tbody tr').each(function () {
        if (blnFound == true) {
            if ($(this).find('input[name="CustomerName"]').val() == "") {
                $(this).find('input[name="CustomerName"]').val(CustomerName);
                $(this).find('input[name="CustomerName"]').attr('data-key-value', CustomerID);
            }
        }
        if (rowid == $(this).attr('id')) {
            blnFound = true;
        }
    });
}

function FillDestinationBelow(ctrlId, DestinationID, Destination) {
    var rowid = "tr_" + ctrlId.split('_')[1];
    var blnFound = false;
    $('#tblManualPrintUAN tbody tr').each(function () {
        if (blnFound == true) {
            if ($(this).find('input[name="Destination"]').val() == "") {
                $(this).find('input[name="Destination"]').val(Destination);
                $(this).find('input[name="Destination"]').attr('data-key-value', DestinationID);
            }
        }
        if (rowid == $(this).attr('id')) {
            blnFound = true;
        }
    });
}


function FillProductsBelow(ctrl) {
    var ctrlId = $(ctrl).attr('id');
    var rowid = "tr_" + $(ctrl).attr('id').split('_')[1];

    var blnFound = false;
    $('#tblManualPrintUAN tbody tr').each(function () {
        if (blnFound == true) {
            if ($(this).find('select[name="Product"]').val() == "0") {
                $(this).find('select[name="Product"]').val($('#' + ctrlId + ' option:selected').val());
            }
        }
        if (rowid == $(this).attr('id')) {
            blnFound = true;
        }
    });
}

function FillItemsBelow(Sno, IDName,ItemName) {
    var rowid = "tr_" + Sno;
    var itemID = IDName + "_" + Sno;
    var ItemVal = $("#" + itemID).val()

    var blnFound = false;
    $('#tblManualPrintUAN tbody tr').each(function () {
        if (blnFound == true) {
            if ($(this).find('input[name="' + ItemName + '"]').val() == "") {
                $(this).find('input[name="' + ItemName + '"]').val(ItemVal);
            }
        }
        if (rowid == $(this).attr('id')) {
            blnFound = true;
        }
    });
}