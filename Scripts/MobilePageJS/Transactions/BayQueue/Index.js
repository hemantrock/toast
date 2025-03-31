var objTblBQPinned;
var objTblBQScroll;

$(document).ready(function () {
    
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
    createDataTable(); 
});

function createDataTable() {

    objTblBQPinned = $('div.pinned #tblLoadingPointMasterQueue').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bStateSave": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
            ],
        "bAutoWidth": false,
    });
    objTblBQScroll = $('div.scrollable #tblLoadingPointMasterQueue').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
                { sWidth: "16%" },
            ],
        "bAutoWidth": false,
    });
}

function refreshBayQueue() {
    $.ajax({
        type: "GET",
        url: "/BayQueue/Trucks?BayId=0",
        cache: false,
        global: false,
        success: function (result) {
            var strTable = "";

            if (objTblBQPinned != null) {
                objTblBQPinned.destroy();
            }
            if (objTblBQScroll != null) {
                objTblBQScroll.destroy();
            }
            $(result).each(function (i, val) {
                var rowClass = '';
                strTable = strTable + "<tr style='height: 63px;'>" +
                                            "<td style='height: 63px;'>" + val.BayID + "</td>";
                var cnt = 0;
                $(val.lstTruck).each(function (idx, truck) {
                    strTable = strTable + "<td align='center' class='clickable truckImage' style='height: 63px;'>" +
                                            "<span class='truckNumber'>" + truck.TruckNumber + "</span>" +
                                            "<span class='truckStatus truckStatus_"+ truck.TruckStatusId+"'>" + truck.TruckStatus + "</span>" +
                                          "</td>";
                    cnt = cnt + 1;
                });
                if (cnt < 6) {
                    for (iCnt = cnt + 1; iCnt <= 6; iCnt++) {
                        strTable = strTable + "<td style='height: 63px;'>&nbsp;</td>";
                    }
                }
                strTable = strTable + "</tr>";
            });
            $('div.scrollable #tblLoadingPointMasterQueueBody, div.pinned #tblLoadingPointMasterQueueBody').html(strTable);
            createDataTable();
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
        }
    });
}

function ShowTruckNoDetails(s, truckNo, LoadID) {
   
    $('#tblLoadingPointMasterQueue td').removeClass('selected-cell');
    $(s).addClass('selected-cell');
    $.ajax({
        type: "GET",
        url: "/BayQueue/TruckNoDetails?LoadID=" + LoadID,
        UpdateTargetId: "dvBayQueue",
        cache: false,
        success: function (result) {
            
            $("#dvBayQueue").html(result);
        }
    });

    $.ajax({
        type: "GET",
        url: "/BayQueue/TruckPopup?LoadID=" + LoadID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
                OpenBayQueue();
            }
            else {
                $('#myModalBody').html(result);
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

function Loadtruck(Ctrl_1,Ctrl_2,Ctrl_3,Ctrl_4, BayId)
{
    $.ajax({
       
        url: "/BayQueue/Trucks?BayId=" + BayId,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result)
        {
            $('#txttruckno_1').html('');
            $('#txttruckno_2').html('');
            $('#txttruckno_3').html('');
            $('#txttruckno_4').html('');
           
            var i = "<option value=0> </option>";
            $.each(result, function (j, val) {
                if (val != null) {
                     {
                         $('#txttruckno_1').append(val);
                         $('#txttruckno_2').append(val);
                         $('#txttruckno_3').append(val);
                         $('#txttruckno_4').append(val);
                    }
                }
                else {
                    $('#txttruckno_1').append();
                    $('#txttruckno_2').append();
                    $('#txttruckno_3').append();
                    $('#txttruckno_4').append();
                }
            });
        }
    });
}