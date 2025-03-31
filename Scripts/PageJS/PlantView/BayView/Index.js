$(document).ready(function () {
    
    $('#ddlBayView').chosen();
    //ChangeBayView();
});

function ChangeBayView()
{
    var bay = $('#ddlBayView').val();
    opc.server.removeFromGroup(opcPageName);
    $.ajax({
        type: "GET",
        url: "/PlantView/ShowBayView?BayId="+bay.toLowerCase().replace('bayview',''),
        cache: false,
        global: false,
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

