
$(document).ready(function () {

    $('#tblLoadDetails').dataTable({
        "iDisplayLength": iGblNoRows - 7,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bStateSave": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "18%" },
                { sWidth: "18%" },
                { sWidth: "18%" },
                { sWidth: "18%" },
                { sWidth: "18%" },
            ],
        "bAutoWidth": false,
    });

    LoadDDLReasonForManualEntry('TruckCancelReason');

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
            TopUp: {
                validators: {
                    regexp: {
                        regexp: "[0-9]{0,5}",
                        message: 'Numbers only'
                    }
                }
            },
            Decant: {
                validators: {
                    regexp: {
                        regexp: "[0-9]{0,5}",
                        message: 'Numbers only'
                    }
                }
            }
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

function TruckTerminateDo(Id) {

    $('#FormBU').data('bootstrapValidator').resetForm();
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }

    var selectedIds = "";
    
    $("input[name='chkSelect']:checked").each(function () {
        selectedIds = selectedIds + $(this).attr('id') + "_";
    });
    
    if (selectedIds == null || selectedIds == "" || selectedIds == 'undefined' || selectedIds == 0) {
        return false;
    }

    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckTerminateDo?Id=" + Id + "&Remarks=" + $('#txtRemarks').val() + "&selectedIds=" + selectedIds,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

