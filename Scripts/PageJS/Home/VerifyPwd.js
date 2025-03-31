$(document).ready(function () {
    $('#frmLoginPwd').bootstrapValidator({
        //feedbackIcons: {
        //    valid: 'glyphicon glyphicon-ok',
        //    invalid: 'glyphicon glyphicon-remove',
        //    validating: 'glyphicon glyphicon-refresh'
        //},
        fields: {
            LoginID: {
                validators: {
                    notEmpty: {
                        message: 'Login Id is required'
                    },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Password is required'
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

    $('#myPasswordModal').on('shown.bs.modal', function () {
        $('#frmLoginPwd').bootstrapValidator('resetForm');
        $('#Pwd_txtPassword').text(''); $('#Pwd_txtPassword').val('');
    });
    $('#myPasswordModal').on('hidden.bs.modal', function () {
        $('#Pwd_txtPassword').text(''); $('#Pwd_txtPassword').val('');
    });
    $("#Pwd_txtPassword").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            $("#btnPwdOK").trigger('click');
        }
    });

});