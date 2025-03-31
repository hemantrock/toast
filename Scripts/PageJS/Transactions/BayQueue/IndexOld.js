var objTblBQ;
$(document).ready(function () {
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
    createDataTable();
});

function createDataTable() {
    
    objTblBQ = $('#tblLoadingPointMasterQueue').DataTable({
        "iDisplayLength": parseInt(((iGblNoRows) / 2)),
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "bStateSave": true,
        "aoColumns":
            [
                { sWidth: "5%", 'sClass': 'text-center' }, //Bay Id
                { sWidth: "15%" }, //TT1
                { sWidth: "15%" }, //TT2
                { sWidth: "15%" }, //TT3
                { sWidth: "15%" }, //TT4
                { sWidth: "15%" }, //TT5
                { sWidth: "15%" }, //TT6
            ],
        "bAutoWidth": false,
    });
   
}

function refreshBayQueue()
{
    $.ajax({
        type: "GET",
        url: "/BayQueue/GetBayQueueData",
        cache: false,
        global: false,
        success: function (result) {
            var strTable = "";

            if (objTblBQ != null) {
                objTblBQ.destroy();
            }
            $(result).each(function (i, val) {
               
                var rowClass = '';
                strTable = strTable + "<tr class='height51'>" +
                                            "<td>" + val.BayID + "</td>";

                var cnt = 0;
                $(val.lstTruck).each(function (idx, truck) {
                    
                    var showTruckNoDetails = 'ShowTruckNoDetails(this,\'' + truck.TruckNumber + '\',\'' + truck.LoadID + '\')';
                    strTable = strTable + "<td align='center' class='clickable truckImage " + localStorage.getItem('CustName') + " " + localStorage.getItem('Application') + " truckStatus_" + truck.TruckStatusId + "' onclick=" + showTruckNoDetails + ">" +
                                            "<span class='truckNumber'>" + truck.TruckNumber + "</span>" +
                                            "<span class='truckStatus'>" + truck.TruckStatus + "</span>" +
                                          "</td>";
                    
                    cnt = cnt + 1;
                });
                if (cnt < 6)
                {
                    for (iCnt = cnt + 1; iCnt <= 6; iCnt++)
                    {
                        strTable = strTable + "<td>&nbsp;</td>";
                    }
                }
                strTable = strTable + "</tr>";
            });

            $('#tblLoadingPointMasterQueueBody').html(strTable);
            createDataTable();
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshBayQueue(); }, 10000);
        }
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