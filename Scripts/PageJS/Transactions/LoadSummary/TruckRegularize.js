
$(document).ready(function () {    
    $('#tblLoadDetails').dataTable({
        "iDisplayLength": iGblNoRows - 7,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bStateSave": false,
        "bInfo": true,
        "bAutoWidth": false,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "6%", 'sClass': 'text-center' },
                { sWidth: "6%", 'sClass': 'text-center' },
                { sWidth: "12%" },
                { sWidth: "12%" },
                { sWidth: "18%" },
                { sWidth: "9%" },
                { sWidth: "9%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "8%" },
                { sWidth: "0%" },
            ],
    });
});

function EnableCols(ctrl, CompNo)
{
    if ($(ctrl).is(':checked')) {
        $('#ddlLoadDetails_' + CompNo).removeAttr('disabled');
        $('#txtTopUp_' + CompNo).removeAttr('disabled');
        $('#txtDecant_' + CompNo).removeAttr('disabled');
    }
    else {
        $('#ddlLoadDetails_' + CompNo).attr('disabled','disabled');
        $('#txtTopUp_' + CompNo).attr('disabled', 'disabled');
        $('#txtDecant_' + CompNo).attr('disabled', 'disabled');
    }
}

function LoadCompartmentStatus(ctrl, LoadID, truckStatus, currentStatus) {
    $.ajax({
        url: "/LoadSummary/GetRegLoadStatus?LoadID=" + LoadID + "&TruckStatus=" + truckStatus + "&CurrentStatusId=" + currentStatus,
        type: "GET",
        datatype: "json",
        cache: true,
        success: function (result) {
            $(ctrl).html('');
            var r;
            $.each(result, function (i, objStatus) {
                r = "<option value=" + objStatus.LoadStatusID + ">" + objStatus.LoadStatusDesc + "</option>";
                $(ctrl).append(r);
            });
        }
    });
}

function LoadActualTruckStatus(ctrl, truckStatus, UomID) {
    $.ajax({
        url: "/LoadSummary/GetActualTruckStatus?TruckStatus=" + truckStatus + "&UomID=" + UomID + "&iPurposeID=" + Purpose,
        type: "GET",
        datatype: "json",
        cache: true,
        success: function (result) {
            $(ctrl).html('');
            var r;
            r = "<option value=-1 selected>&nbsp;</option>";
            $(ctrl).append(r);
            $.each(result, function (i, objStatus) {
                r = "<option value=" + objStatus.ActualStatusId + ">" + objStatus.ActualStatusDesc + "</option>";
                $(ctrl).append(r);
            });
        }
    });
}

function ValidateRegularize(Id)
{
    var ret=true;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        ret = false;
        return false;
    }
    $('tr').removeClass('selected-row');

    var TruckStatus = $('#txtTruckStatus').attr('data-id'); 

    if (TruckStatus == 923 || TruckStatus == 926 || TruckStatus == 929 || TruckStatus == 932) {
        if ($('#ddl_ActualTruckStatus').val() == "-1") {
            alertDismissable("danger", "Actual Truck Status must be selected.")
            ret = false;
            return false;
        }
    }
    else if (TruckStatus == 911 || TruckStatus == 914 || TruckStatus == 917) {
        if ($('#ddl_ActualTruckStatus').val() == "-1") {
            alertDismissable("danger", "Actual Truck Status must be selected.")
            ret = false;
            return false;
        }

        $("input[name='chkSelect']").each(function () {
            var compId = $(this).attr('id');
            var filledQty = Number($('#txtFilled_' + compId).text());
            var decantQty = Number($('#txtDecant_' + compId).val());
            var PresetQty = Number($('#txtPreset_' + compId).val());
            var UOM = Number($('#txtUOM_' + compId).val());
            
            if ($('#ddlLoadDetails_' + compId).val() == "1" && ((filledQty - decantQty)>0)) {
                alertDismissable("danger", "Select Valid Load Status of all the compartment status which is having filled quanity.")
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
        });

        $("input[name='chkSelect']:checked").each(function () {
            var compId = $(this).attr('id');
            var topupQty = Number($('#txtTopUp_' + compId).val());
            var decantQty = Number($('#txtDecant_' + compId).val());
            var UOM = Number($('#txtUOM_' + compId).val());

            if (UOM == 1 && (decantQty == "" || decantQty == 0)) {
                alertDismissable("danger", "Please enter Decant Qty for Truck Sick or Truck Aborted.")
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }

            if (UOM == 1 && (decantQty > 0 && ((filledQty > decantQty + tolerance) || (filledQty < decantQty)))) {
                alertDismissable("danger", "Decant Qty should be equal to Filled Qty within Tolerance(" + tolerance + ") for Abort / Sick Trucks");
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }
        });
    }
    else if (TruckStatus == 959) {  //959 = Loading Incomplete
        if ($('#ddl_ActualTruckStatus').val() == "-1") {
            alertDismissable("danger", "Actual Truck Status must be selected.")
            ret = false;
            return false;
        }
        return true; // Not Checking Compartment details as in Incomplete Loads are acceptable in Bitumen.
    }
    else if (TruckStatus == 408 || TruckStatus == 401 || TruckStatus == 404 || TruckStatus == 841) {
        $("input[name='chkSelect']").each(function () {
            var compId = $(this).attr('id');
            var compStatus = $('#ddlLoadDetails_' + compId).val;
            var decantQty = Number($('#txtDecant_' + compId).val());

            if (compStatus != 4) {
                alertDismissable("danger", "Actual Compartment status must be 'Completed'.")
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
        });
    }

    $("input[name='chkSelect']:checked").each(function () {
        var compId = $(this).attr('id');
        var topupQty = Number($('#txtTopUp_' + compId).val());
        var decantQty = Number($('#txtDecant_' + compId).val());
        var filledQty = Number($('#txtFilled_' + compId).text());
        var presetQty = Number($('#txtPreset_' + compId).text());
        var tolerance = Number($('#lblTolerance').val());
        var UOM = Number($('#txtUOM_' + compId).val());
        var compStatus = $('#ddlLoadDetails_' + compId).val();

        if (compStatus == 0) {
            alertDismissable("danger", "Actual Compartment status must be selected.")
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }

        if (UOM == 1 && (topupQty == "" || topupQty == 0) && (decantQty == "" || decantQty == 0)) {
            if (filledQty < (presetQty - tolerance)) {
                alertDismissable("danger", "Please provide Top Up Qty as Filled Qty < Preset - Tolerance(" + tolerance + ")")
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
            if (UOM == 1 && (filledQty > (presetQty + tolerance))) {
                alertDismissable("danger", "Please provide Decant Qty as Filled Qty > Preset + Tolerance("+ tolerance +")")
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
        }
        else if (topupQty > 0 && compStatus != 4) {
            alertDismissable("danger", "Please select actual compartment status as 'Completed' since TopUp Qty is provided or remove TopUp Qty.")
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }

        if ((compStatus == 3 || compStatus == 5) && decantQty > 0) {
            alertDismissable("danger", "Only TopUp allowed in case of Interruption / Incomplete Compartments.")
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }
        else if ((compStatus == 3 || compStatus == 5) && (topupQty == "" || topupQty == 0)) {
            alertDismissable("danger", "TopUp quantity must be filled in case of Interruption / Incomplete.")
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }
        
        if (UOM == 1 && topupQty > 0 && ((presetQty > filledQty + topupQty + tolerance) || (presetQty < filledQty + topupQty - tolerance))) {
            alertDismissable("danger", "Filled + TopUp Qty should be equal to Preset Qty within Tolerance (" + tolerance + ")")
            $('tr#' + compId).addClass('selected-row');
            ret = false;
            return false;
        }
        
        if (decantQty > 0 && Purpose == 1) {
            if((filledQty - decantQty) <0)
            {
                alertDismissable("danger", "Filled - Decant Qty cannot be Less than 0");
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
            if(TruckStatus==941)
            {
                if ((filledQty - decantQty) > (presetQty + tolerance) || (filledQty - decantQty) < (presetQty - tolerance)) {
                    alertDismissable("danger", "Filled - Decant Qty should be within Tolerance (+/-" + tolerance + ")");
                    $('tr#' + compId).addClass('selected-row');
                    ret = false;
                    return false;
                }
            }
        }
        if (decantQty > 0 && Purpose==2) {
            if ((presetQty - decantQty) < 0) {
                alertDismissable("danger", "Preset - Decant Qty cannot be Less than 0");
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
            if ((presetQty - decantQty) > tolerance) {
                alertDismissable("danger", "presetQty - Decant Qty should less than Tolerance (" + tolerance + ")");
                $('tr#' + compId).addClass('selected-row');
                ret = false;
                return false;
            }
        }
    });

    return ret;
}

function TruckRegularizeDo(Id) {
    var ret = true;
    var blnResult = true; //ValidateRegularize(Id);

    if (blnResult == true) {
        var selectedIds = "";

        $("input[name='chkSelect']:checked").each(function () {
            selectedIds = selectedIds + $(this).attr('id') + "_";
        });

        if (selectedIds == null || selectedIds == "" || selectedIds == 'undefined' || selectedIds == 0) {
            alertDismissable("danger", "Atleast 1 Compartment must be selected to Regularize.");
            ret = false;
            return false;
        }

        var ActualTruckStatus = $('#ddl_ActualTruckStatus').val();

        if (ActualTruckStatus == "-1") {
            //ActualTruckStatus= $('#txtTruckStatus').attr('data-id'); 
            alertDismissable('danger', 'Please select the actual truck Status');
            ret = false;
            return false;
        }

        alertDismissable("info", "Regularizing Truck:" + $('#txtTruckStatus').text() + ", LoadID:" + Id + ".....");
        var objLoadMaster = {
            'LoadID': Id,
            'TruckStatus': ActualTruckStatus,
        };

        var objLoadDetails = [];

        $("input[name='chkSelect']:checked").each(function () {
            var compId = $(this).attr('id');
            var obj = {
                'LoadID': Id,
                'CompNo': compId,
                'LoadStatus': $('#ddlLoadDetails_' + compId).val(),
                'TopUpQty': Number($('#txtTopUp_' + compId).val().trim()),
                'DecantedQty': Number($('#txtDecant_' + compId).val().trim())
            };
            objLoadDetails.push(obj);
        });

        var blnResp = $.ajax({
            url: "/LoadSummary/TruckRegularizeDo",
            type: "POST",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ objLoadMaster: objLoadMaster, objLoadDetails: objLoadDetails, strRemarks: $('#txtRemarks').val() }),
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
            }
        }).responseJSON;
        if (blnResp.blnStatus == true) { ret = true; OpenLoadSummaryMenu(); }
        else { ret = false; }
    }
    else {
        ret = false;
    }
    return ret;
}

function UpdateEffQty(CompNo) {
    var TopUpQty = parseFloat($('#txtTopUp_' + CompNo).val());
    var DecantQty = parseFloat($('#txtDecant_' + CompNo).val());
    var FilledQty = parseFloat($('#txtFilled_' + CompNo).text());
    $('#txtEffQty_' + CompNo).text((FilledQty + TopUpQty - DecantQty).toFixed());
}