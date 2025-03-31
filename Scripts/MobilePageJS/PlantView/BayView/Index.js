$(document).ready(function () {
    $('#ddlBayView').chosen();
    ChangeBayView();
});

function ChangeBayView()
{
    var bay = $('#ddlBayView').val();
    
    $.ajax({
        type: "GET",
        url: "/PlantView/ShowBayView?BayId="+bay.toLowerCase().replace('bayview',''),
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvBayView").html(result);
            }
        }
    });
}