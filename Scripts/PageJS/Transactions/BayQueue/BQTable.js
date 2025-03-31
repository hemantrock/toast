var objTblBQ;
$(document).ready(function () {
    refreshBayQueue();
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
});


function refreshBayQueue() {
    $.ajax({
        type: "GET",
        url: "/BayQueue/GetBQTable",
        cache: false,
        global: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#BQTable").html(result);
                createTooltip();
            }
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}


function ShowTruckNoDetails(s,truckNo, LoadID) {
    $('#tblLoadingPointMasterQueue td').removeClass('selected-cell');
    $(s).addClass('selected-cell');

    $.ajax({
        type: "GET",
        url: "/BayQueue/TruckPopup?LoadID=" + LoadID,
        cache: false,
        success: function (BQResult) {
            if (BQResult.blnStatus != 'undefined' && BQResult.blnStatus == false) {
                alertDismissable(BQResult.strType, BQResult.strMessage);
                OpenBayQueue();
            }
            else {
                $('#myModalBody').html('');
                $('#myModalBody').html(BQResult);
                $('#myModal .modal-title').html('Truck Details');
                $('#myModal').modal('show');
                $('#myModal').draggable({handle: ".modal-header"});
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                });
            }
        }
    });
}
