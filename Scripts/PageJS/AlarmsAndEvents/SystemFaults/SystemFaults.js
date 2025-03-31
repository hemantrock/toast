$(document).ready(function () {
    InitDTPickers();

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenViewPath('AlarmsAndEvents/SystemFault', 'Index');
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ItemGroup: {
                validators: {
                    notEmpty: {
                        message: 'The Item Group is required and cannot be empty'
                    },
                }
            },

            ItemTags: {
                validators: {
                    notEmpty: {
                        message: 'The Item Tags are required and cannot be empty'
                    },
                }
            },

            IssueTitle: {
                validators: {
                    notEmpty: {
                        message: 'The Issue Title is required and cannot be empty'
                    },
                }
            },
            
            dtpIssueSince: {
                validators: {
                    notEmpty: {
                        message: 'The Issue Since date is required and cannot be empty'
                    },
                }
            },

            IssueDesc: {
                validators: {
                    notEmpty: {
                        message: 'The Issue Descrption is required and cannot be empty'
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

function InitDTPickers() {

    $('#dtpIssueSince').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        //maxDate: new Date()
    });

    $('#dtpResolutionDate').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        maxDate: new Date()
    });

}

function UpdateTagsList() {
    var iSel = $('#ddlItemGroup option:selected').val();

    if (iSel == null || iSel == '' || iSel == '0' || iSel == 'undefined') {
        return false;
    }

    var DevTags = dicDevices.find(o => o.DeviceName === iSel)
    if (DevTags != null || DevTags != 'undefined') {
        $("#txtItemTags").text('');
        $("#txtItemTags").val('');
        $('#FormBU').bootstrapValidator('revalidateField', 'ItemTags');
        $("#txtItemTags").autocomplete({
            source: DevTags.DeviceTags,
            minLength: 0,
            close: function (event, ui) { $('#FormBU').bootstrapValidator('revalidateField', 'ItemTags'); }
        }).bind('focus', function () { $(this).autocomplete("search"); });
    }
}

function SaveSystemFault() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New System Fault";
    var activityDetail = "From Plant: " + $('#txtIssuingPlantCode').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveSystemFaultDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveSystemFaultDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveSystemFaultDo() {

    var objSystemFault = {
        'ItemGroup': $('#ddlItemGroup').val(),
        'ItemTags': $('#txtItemTags').val(),
        'IssueTitle': $('#txtIssueTitle').val(),
        'IssueDesc': $('#txtIssueDesc').val(),
        'IssueSince': $('#dtpIssueSince').val(),
        'ResolutionDate': $('#dtpResolutionDate').val(),
    };

    $.ajax({
        url: "/AlarmsAndEvents/AddSystemFaultObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objSystemFault),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('AlarmsAndEvents/SystemFaults', 'Index');
            }
        }
    });
}

function CheckClosureUpdate()
{
    var ResolutionDate = $('#dtpResolutionDate').val();
    if (ResolutionDate != null && ResolutionDate != undefined && ResolutionDate != '')
    {
        $('#confirmModal').modal('show');
        $('#myConfirmMsg').html("<p>Are you sure to close the fault #: " + FaultID + "? Once closed, it can't be undone and updated again.</p>");
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            UpdateSystemFault();
            $('#confirmModal').modal('hide');
            $('#myConfirmMsg').html("<p>Are you sure ?</p>");
        });
    }
    else { UpdateSystemFault(); }
}

function UpdateSystemFault() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Edit an existing System Fault";
    var activityDetail = "Batch No : " + $('#txtBatchID').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateSystemFaultDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateSystemFaultDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateSystemFaultDo() {

    var objSystemFault = {
        'UniqueID': FaultID,
        'ItemGroup': $('#ddlItemGroup').val(),
        'ItemTags': $('#txtItemTags').val(),
        'IssueTitle': $('#txtIssueTitle').val(),
        'IssueDesc': $('#txtIssueDesc').val(),
        'IssueSince': $('#dtpIssueSince').val(),
        'ResolutionDate': $('#dtpResolutionDate').val(),
        'ClosureRemarks': $('#txtClosureRemarks').val(),
    };

    $.ajax({
        url: "/AlarmsAndEvents/EditSystemFaultObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objSystemFault),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('AlarmsAndEvents/SystemFaults', 'Index');
            }
        }
    });
}

