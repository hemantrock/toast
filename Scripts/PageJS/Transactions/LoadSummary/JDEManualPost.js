
$(document).ready(function () {    
    $('#tblManualPostLoad').dataTable({
        "iDisplayLength": iGblNoRows - 7,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bStateSave": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "4%" },
                { sWidth: "12%" },
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "9%" },
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "9%" },
                { sWidth: "16%" },
                { sWidth: "0%" },
            ],
        "bAutoWidth": false,
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Remarks: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                    regexp: {
                        regexp: "^[a-zA-Z0-9 ]*$",
                        message: 'Remarks should be alphanumeric'
                    },
                }
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenLoadSummaryMenu();
        $('#cancelModal').modal('hide');
    });
});


function SaveManualJDEPos_Oldt() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var rowCount = $('#rowCount').val();
    var objbaseDensityTempList = [];

    for (i = 1; i <= rowCount; i++) {
        if (hasValue(objbaseDensityTempList, "UniqueID", $('#txtUniqueId_' + i).val()))
        {
            var obj = {
                'UniqueID': $('#txtUniqueId_' + i).val(),
                'BaselineDT': $('#txtBaselineDT_' + i).val(),
                'ProductID': $('#txtProductID_' + i).val(),
                'Density': $('#txtManDens_' + i).val(),
                'Temp': $('#txtManTemp_' + i).val(),
                'Mode': 'BASELINE'
            };
            objbaseDensityTempList.push(obj);
        }
    }

    $.ajax({
        url: "/LoadSummary/SaveManualJDEPost",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objbaseDensityTempList: objbaseDensityTempList, loadID: $('#loadID').val() }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });

}

function SaveManualJDEPost(LoadID) {

    var objLoadDetails = [];

    $("#tblManualPostLoad tbody tr").each(function () {
        debugger;
        var ChamberNo = $(this).attr('id');
        var obj = {
            'LoadID': LoadID,
            'CompNo': ChamberNo,
            'InvoiceTemp': Number($('#txtManTemp_' + ChamberNo).val()),
            'InvoiceDensityAt15': Number($('#txtManDens_' + ChamberNo).val()),
            'TankID': $('#ddlTankNo_' + ChamberNo).val(),
        };
        objLoadDetails.push(obj);
    });
    alertDismissable('success', 'Manual Load Data Posting, Please wait...');
    $.ajax({
        url: "/LoadSummary/SaveManualJDEPost",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objLoadDetails: objLoadDetails }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                $('#EmptyModal').modal('hide');
                OpenLoadSummaryMenu();
            }
        }
    });
    ret = true;
    return ret;
}
