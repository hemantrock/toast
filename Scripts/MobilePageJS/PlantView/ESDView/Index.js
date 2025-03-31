$(document).ready(function () {
    opcPageName = "ESDOverview";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});


function ExtraActivities(model) {

}

/*
$(".menu-item").on('click touchend', function () {
    $(".menu-item").removeClass('active');
    $('.menu-item .fa').removeClass('fa-minus-circle');
    $(this).addClass('active');
    $(this).children('.fa').addClass('fa-minus-circle');
    $(".menu-item").next().slideUp("fast");
    if ($(this).next().is(":hidden")) {
        $(this).next().slideDown("fast");
    } else {
        $(".menu-item").removeClass('active');
        $('.menu-item .fa').removeClass('fa-minus-circle');
    }

    return false;
});
*/

function ChangeESDTimeOut(src, TagName, UserID, LoginID, UserName) {
    
    var existingValue = $('#txtESDTimeEntry').attr('data-opcvalue').val();
    $('#txtESDTimeEntry').attr('data-opcvalue', $('#txtESDTimeEntry').val());
    var activityDetail = "Existing Value:" + existingValue + " New Value :" + $('#txtESDTimeEntry').attr('data-opcvalue').val();
    var src = $('#txtESDTimeEntry');
    $.ajax({
        type: "GET",
        url: "/PlantView/ValidateActivityPermission?UserID=" + UserID + "&strActivityName=Update ESD Timer",
        cache: false,
        success: function (result) {
            if (result.strType == "danger") {
                alertDismissable(result.strType, result.strMessage);  
            }
            ShowPasswordModalForReqTrn("Update ESD Timer", function (ApproverId) {
                SendDataToOPC($('#txtESDTimeEntry'), TagName, ApproverId, "", "");
            }, "Update ESD Timer", activityDetail);
        }
    });
}