$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTagPageLinkMenu();
        $('#cancelModal').modal('hide');
    });

    $('#frmTags').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            TagName: {
                validators: {
                    notEmpty: {
                        message: 'The Tag Name cannot be empty'
                    },
                }
            },
            ControlName: {
                validators: {
                    notEmpty: {
                        message: 'The ControlName is required and cannot be empty'
                    },
                }
            },
            ClassName: {
                validators: {
                    notEmpty: {
                        message: 'The ClassName is required and cannot be empty'
                    },
                }
            },
            ControlType: {
                validators: {
                    notEmpty: {
                        message: 'The ControlType is required and cannot be empty'
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
        },
    });
});
function SaveTagPageLink() {
    $('#frmTags').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New TagPageLink";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val() + "(" + $('#ddlPageName').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveTagPageLinkDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveTagPageLinkDo(); }, activityName, activityDetail);
            }
        }
    });
}
function SaveTagPageLinkDo()
{
    var objTags = {
        'TagName': $('#ddlTagName').val(),
        'PageName': $('#ddlPageName').val(),
        'ControlName': $('#txtControlName').val(),
        'ClassName': $('#txtClassName').val(),
        'ControlType': $('#ddlControlType').val(),
    };

    $.ajax({
        url: "/TagPageLink/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'objTag': objTags
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagPageLinkMenu();
            }
        }
    });
}
function UpdateTagPageLink() {
    $('#frmTags').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing TagPageLink";
    var activityDetail = "Tag Name: " + $('#ddlTagName').val() + "(" + $('#ddlPageName').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTagPageLinkDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTagPageLinkDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateTagPageLinkDo()
{
    var objTags = {
        'TagName': $('#ddlTagName').val(),
        'PageName': $('#ddlPageName').val(),
        'ControlName': $('#txtControlName').val(),
        'ClassName': $('#txtClassName').val(),
        'ControlType': $('#ddlControlType').val(),
    };

    var arr=$('#hdnIdKey').val().split('|');

    $.ajax({
        url: "/TagPageLink/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data:  JSON.stringify({
            'objTag':objTags,
            'TagName': arr[0],
            'PageName':arr[1],
            'ControlName':arr[2]
        }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagPageLinkMenu();
            }
        }
    });
}