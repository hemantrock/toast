$(document).ready(function () {
    if (window.location.href.toUpperCase().indexOf("MASTER") != -1) {
        window.location.href = "/Home/Index";
    }
    $('#txtPassword').keypress(function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            cancelBubble(e);
            AuthenticateUser();
        }
    });
});


function AuthenticateUser() {
    $('#frmLogin').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var LoginID = $('#txtLoginID').val();
    var pwd = $('#txtPassword').val();

    $.ajax({
        url: "/Home/AuthenticateUser",
        type: "POST",
        beforeSend: function () { $('#spinnerLogin').show(); },
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify({ "LoginID": LoginID, "Password": pwd }),
        success: function (result) {
            $('#spinnerLogin').hide();
            if (result.strType == "confirm") {
                $('#myConfirmMsg').html("<p>" + result.strMessage + "</p>");
                $('#confirmModal').modal('show');
                $('#confirmModal').draggable({handle: ".modal-header"});
                $("#btnConfirmOK").unbind('click');
                $("#btnConfirmOK").click(function () {
                    $(".modal-backdrop").slideUp('slow');
                    $('#confirmModal').modal('hide');
                    alertDismissable("info", "Please Wait...");
                    $.ajax({
                        url: "/Home/AuthenticateUserAndLogoutFromOther",
                        type: "POST",
                        contentType: 'application/json; charset=utf-8',
                        cache: false,
                        data: JSON.stringify({ "LoginID": LoginID, "Password": pwd }),
                        success: function (data) {
                            console.log(data);
                            alertDismissable(data.strType, data.strMessage);
                            if (data.blnStatus == true) {
                                window.location = "/Masters/Index";
                            }
                        }
                    });
                });
            }
            else {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    window.location = "/Masters/Index";
                }
            }
        }
    });
}