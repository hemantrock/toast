
$(document).ready(function () {
   
    $('#tblSamplingQty').dataTable({
        "iDisplayLength": iGblNoRows - 7,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bStateSave": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                //{ sWidth: "0%" },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "32%" },
                { sWidth: "16%", 'sClass': 'text-center' },
                { sWidth: "16%", 'sClass': 'text-center' },
                { sWidth: "16%", 'sClass': 'text-center' },
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
            SamplingQty: {
                validators: {
                    lessThan: {
                        value: 6,
                        message: 'Qty cannot be more than 5',
                    }
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
});

function AddSamplingQtyDo(Id, ApproverId) {
    
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    var validated = true;
    var objLoadDetails = [];

    $("input[name='chkSelect']").each(function () {
        var compId = $(this).attr('id'); var Qty = 0;
        if (this.checked) { Qty = $('#txtSampling_' + compId).val();}
        var obj = {
            'LoadID': Id,
            'CompNo': compId,
            'SamplingQty': Qty
        };
        if (obj.SamplingQty > 5) {
            alertDismissable('danger', 'Sampling Qty in each Compartment cannot be greater than 5 Ltrs');
            validated = false;
        }
        objLoadDetails.push(obj);
    });

    if (!validated) { return false;}

    $.ajax({
        url: "/LoadSummary/AddSamplingQty",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objLoadDetails: objLoadDetails, strRemarks: $('#txtRemarks').val() }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });

    
}

function UpdateTotal(compNo) {
    
    $('#txtTotal_' + compNo).text(+$('#txtPreset_' + compNo).text() + +$('#txtSampling_' + compNo).val());
}

