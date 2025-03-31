var objTblBQ;
$(document).ready(function () {
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
});


function refreshBayQueue() {
    $.ajax({
        type: "GET",
        url: "/BayQueue/GetBayQueueData",
        cache: false,
        global: false,
        success: function (result) {
            $(result).each(function (i, val) {
                var cnt = 0; var RowSpan = val.lstLPProds.length;
                $(val.lstLPProds).each(function (LPNo, LPProd) {
                    var strProdID = 'Prod_' + 'B' + val.BayID + '_L' + LPNo;
                    var oldtd = $('#' + strProdID);
                    if (oldtd != undefined) {
                        oldtd.html(LPProd);
                    }
                });
                $(val.lstTruck).each(function (idx, truck) {
                    var strID = 'BayTruck_' + 'B' + val.BayID + '_T' + idx;
                    var oldtd = $('#' + strID);
                    if (oldtd != undefined) {
                        var showTruckNoDetails = 'ShowTruckNoDetails(this,\'' + truck.TruckNumber + '\',\'' + truck.LoadID + '\')';
                        strTable = "<td id='" + strID + "' rowspan='" + RowSpan + "'  align='center' class='clickable truckImage " + gblCustName + " " + gblApplication + " truckStatus_" + truck.TruckStatusId + "' onclick=" + showTruckNoDetails + ">" +
                            "<span class='truckNumber' style='top: " + ((RowSpan-2)*8 + 3) + "px; left:" + (RowSpan*10+12) + "px; font-size:" + (16+(RowSpan-2)*3)+"px;'>" + truck.TruckNumber + "</span>" +
                            "<span class='truckStatus' style='top: " + ((RowSpan) * 23 - 21) + "px; font-size:" + (12 + (RowSpan - 2) * 5) +"px;'>" + truck.TruckStatus + "</span>" +
                                                "</td>";
                        oldtd.replaceWith(strTable);
                    }
                    cnt = cnt + 1;
                });
                if (cnt < 6) {
                    for (iCnt = cnt; iCnt < 6; iCnt++) {
                        var strID = 'BayTruck_' + 'B' + val.BayID + '_T' + iCnt;
                        var oldtd = $('#' + strID);
                        if (oldtd != undefined) {
                            strTable = "<td id='" + strID + "' rowspan='" + RowSpan + "'>&nbsp;</td>";
                            oldtd.replaceWith(strTable);
                        }
                    }
                }
            });
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}


function ShowTruckNoDetails(s,truckNo, LoadID) {
    $('#tblLoadingPointMasterQueue td').removeClass('selected-cell');
    $(s).addClass('selected-cell');
    //$.ajax({
    //    type: "GET",
    //    url: "/BayQueue/TruckNoDetails?LoadID=" + LoadID,
    //    UpdateTargetId: "dvBayQueue",
    //    cache: false,
    //    success: function (result) {
    //        $("#dvBayQueue").html(result);
    //    }
    //});

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
