
$(document).ready(function () {
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


function WagonCancelDo(wLoadID, SeqNo) {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonCancelDo?wLoadID=" + wLoadID + "&WagonSeqNo=" + SeqNo + "&ReasonId=" + $('#ddlManualEntry').val() + "&Remarks=" + $('#txtRemarks').val(),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}