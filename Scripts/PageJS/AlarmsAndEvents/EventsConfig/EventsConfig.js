$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenEventsConfig();
        $('#cancelModal').modal('hide');
    });

    $('#FormTagEventConfig').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            CompareValue: {
                validators: {
                    notEmpty: {
                        message: 'The Compare Value cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The Compare Value  must be 1 to 10 characters'
                    }
                }
            },
            LimiterName: {
                validators: {
                    notEmpty: {
                        message: 'The Limiter Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'Limiter Name must be 1 to 10 characters long'
                    }
                }
            },
            TagName: {
                validators: {
                    notEmpty: {
                        message: 'The TagName is required and cannot be empty'
                    },
                }
            },
            Operator: {
                validators: {
                    notEmpty: {
                        message: 'The Product is required and cannot be empty'
                    },
                }
            },
            TagToNotify: {
                validators: {
                    notEmpty: {
                        message: 'The TagToNotify is required and cannot be empty'
                    },
                }
            },
            TagNotifyValue: {
                validators: {
                    notEmpty: {
                        message: 'The Tag Notify Value cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'Tag Notify Value must be 1 to 10 characters long'
                    },
                }
            },
            MaxVolume: {
                validators: {
                    notEmpty: {
                        message: 'The MaxVolume cannot be empty'
                    },
                    digits: {
                        message: 'MaxVolume  must be Integer value.'
                    },
                }
            },
            EventID: {
                validators: {
                    notEmpty: {
                        message: 'The Event ID Height cannot be empty'
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
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTagEventConfig()
{
    $('#FormTagEventConfig').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
  
    var objTagEvent = {
        'TagName': $('#ddlTagName').val(),
        'LimiterName': $('#txtLimiterName').val(),
        'Operator': $('#ddlOperator').val(),
        'CompareValue': $('#txtCompareValue').val(),
        'EventTagToNotify': $('#ddlTagToNotify').val(),
        'EventTagValue': $('#txtTagNotifyValue').val(),
        'EventID': $('#ddlEventID').val(),
    };

    $.ajax({
        url: "/AlarmsAndEvents/AddEventsConfig",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTagEvent),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenEventsConfig();
            }
        }
    });
}

function UpdateTagEventConfig()
{
    $('#FormTagEventConfig').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTagEvent = {
        'UniqueID': $('#hdnIdKey').val(),
        'TagName': $('#ddlTagName').val(),
        'LimiterName': $('#txtLimiterName').val(),
        'Operator': $('#ddlOperator').val(),
        'CompareValue': $('#txtCompareValue').val(),
        'EventTagToNotify': $('#ddlTagToNotify').val(),
        'EventTagValue': $('#txtTagNotifyValue').val(),
        'EventID': $('#ddlEventID').val(),
    };

    $.ajax({
        url: "/AlarmsAndEvents/EditEventsConfig",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTagEvent),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenEventsConfig();
            }
        }
    });
}

function LoadDDLTagName(sel)
{
    var ctrl = $('#ddlTagName');
    $.ajax({
        url: "/AlarmsAndEvents/GetTagNames",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r = "";
            $.each(result, function (i, obj) {
                var selected = (obj==sel ? 'selected' : '');               
                r = "<option " + selected + " value=" + obj.Id +  ">" + obj.Name + "</option>";
                ctrl.append(r);
            });
            $('#ddlTagName').chosen();
            $('#ddlTagName_chosen').css('width', '400px');
        }
    });
}

function LoadDDLNotifyTagName(sel)
{
    var ctrl = $('#ddlTagToNotify');
    $.ajax({
        url: "/AlarmsAndEvents/GetNotifyTagNames",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            ctrl.html('');
            var r = "";
            $.each(result, function (i, obj) {
                var selected = (obj==sel ? 'selected' : '');               
                r = "<option " + selected + " value=" + obj.Id +  ">" + obj.Name + "</option>";
                ctrl.append(r);
            });
            $('#ddlTagToNotify').chosen();
            $('#ddlTagToNotify_chosen').css('width', '400px');
        }
    });
}