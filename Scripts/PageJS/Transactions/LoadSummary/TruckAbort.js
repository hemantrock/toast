
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
                { sWidth: "12%", 'sClass': 'text-center' },
                { sWidth: "12%", 'sClass': 'text-center' },
                { sWidth: "19%" },
                { sWidth: "19%" },
                { sWidth: "19%" },
                { sWidth: "19%" },
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
            Reason: {
                validators: {
                    greaterThan: {
                        value: 1,
                        message: 'Reason must be selected'
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
});


function TruckAbortDo(Id, ApproverId) {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }

    $.ajax({
        type: "GET",
        url: "/LoadSummary/DoTruckAbort?Id=" + Id + "&ReasonId=" + $('#ddlManualEntry').val() + "&Remarks=" + $('#txtRemarks').val() + "&ApproverId=" + ApproverId,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

