$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenVDUParameterMenu();
        $('#cancelModal').modal('hide');
    });

     $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ParameterId: {
                validators: {
                    notEmpty: {
                        message: 'The ParameterId is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The VDU Parameter No. 3 and less than or equal to 30 characters long'
                    }
                }
            },

            ParameterValue: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },

            ParameterDesc: {
                validators: {
                    notEmpty: {
                        message: 'The Parameter description is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: 'The Parameter description must be more than 3 and less than or equal to 50 characters long'
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
        },
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('ddlVDUParameter').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveVDUParameter() {

    var cManager=0;
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var objVDUParameter = {
        'ParameterId': $('#txtParameterId').val(),
        'ParameterValue': $('#txtParameterValue').val(),
       'ParameterStatus': $('#ddlParameterStatus').val(),
    };

    $.ajax({
        url: "/VDUParameter/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objVDUParameter),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpensVDUParameterMenu();
            }
        }
    });
}

function UpdateVDUParameter() {

    var cManager = 0;
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var objVDUParameter = {
        'ParameterId': $('#txtParameterId').val(),
        'ParameterValue': $('#txtParameterValue').val(),
        'ParameterDesc': $('#txtParameterDesc').val(),
    };

    $.ajax({
        url: "/VDUParameter/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objVDUParameter),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenVDUParameterMenu();
            }
        }
    });
}

function LoadDDLParameterStatus(iSel) {
    $.ajax({
        url: "/VDUParameter/GetParameterStatus",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlParameterStatus').html('');
            var r = "<option value=0>Select Parameter Status</option>";
            $('#ddlParameterStatus').append(r);

            $.each(result, function (i, result) {
                if (parseInt(iSel) == parseInt(result.Status)) {
                    r = "<option selected value=" + result.Status + ">" + result.StatusDesc + "</option>";
                }
                else {
                    r = "<option value=" + result.Status + ">" + result.StatusDesc + "</option>";
                }
                $('#ddlParameterStatus').append(r);
            });
        }
    });
}