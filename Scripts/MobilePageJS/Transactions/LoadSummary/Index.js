var myVar;
var tbleS, tbleP;

$(document).ready(function () {
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { RefreshLoadSummary(); }, 20000);
    createLoadSummaryDataTable();
});

function createLoadSummaryDataTable() {

    tbleS = $('div.scrollable #tblLoadMaster').DataTable({
        "iDisplayLength": iGblNoRows - 4,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bStateSave": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "5%" },
                { sWidth: "9%" },
                { sWidth: "7%" },
                { sWidth: "12%" },
                { sWidth: "9%" }, // New for Product Name
                { sWidth: "3%" },
                { sWidth: "4%" },
                { sWidth: "9%" },
                { sWidth: "5%" },
                { sWidth: "9%" },
                { sWidth: "9%" },
                { sWidth: "9%" },
                { sWidth: "7%" },
            ],
        "bAutoWidth": false,
    });

    tbleP = $('div.pinned #tblLoadMaster').DataTable({
        "iDisplayLength": iGblNoRows - 4,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bStateSave": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "5%" },
                { sWidth: "9%" },
                { sWidth: "7%" },
                { sWidth: "12%" },
                { sWidth: "9%" }, // New for Product Name
                { sWidth: "3%" },
                { sWidth: "4%" },
                { sWidth: "9%" },
                { sWidth: "5%" },
                { sWidth: "9%" },
                { sWidth: "9%" },
                { sWidth: "9%" },
                { sWidth: "7%" },
            ],
        "bAutoWidth": false,
    });

    $('#txtSearchTable').val($('.scrollable #tblLoadMaster_wrapper #tblLoadMaster_filter label input').val());
    $('#txtSearchTable').unbind('input keyup');
    $('#txtSearchTable').bind('input keyup', function () {
        tbleS.search($('#txtSearchTable').val(), false, false).draw();
        tbleP.search($('#txtSearchTable').val(), false, false).draw();
    });
}

function RefreshLoadSummary() {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetLoadSummary",
        cache: false,
        global: false,
        success: function (result) {
            var strTable = "";
            //Delete the datable object first
            if (tbleP != null) {
                tbleP.destroy();
            }
            if (tbleS != null) {
                tbleS.destroy();
            }
            strTable = "<table id='tblLoadMaster' class='responsive'>" +
                        "<thead>" +
                            "<tr>" +
                                "<th>Truck No.</th>" +
                                "<th>Truck Status</th>" +
                                "<th>Product</th>" +
                                "<th>Bay#</th>" +
                                "<th>Card#</th>" +
                                "<th>TT Reg. Date</th>" +
                                "<th>Card IssueTime</th>" +
                                "<th>TT Time</th>" +
                                "<th>Gate Entry</th>" +
                                "<th>Loading Start</th>" +
                                "<th>Invoice Print</th>" +
                                "<th>ShipmentNo</th>" +
                                "<th>LoadID</th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody id='tblLoadSummaryBody'>";
            $(result).each(function (i, val) {
                var rowClass = '';
                strTable = strTable + "<tr class='clickable'>" +
                                        "<td>" + val.TruckNumber + "</td>" +
                                        "<td class='truckStatus'>" + val.TruckStatusDesc + "</td>" +
                                        "<td>" + val.ProdNameShort + "</td>" +
                                        "<td>" + val.BayID + "</td>" +
                                        "<td>" + val.CardNumber + "</td>" +
                                        "<td>" + val.Date + "</td>" +
                                        "<td>" + val.CardReAuthorizeTime + "</td>" +
                                        "<td>" + val.TotalSeconds + "</td>" +
                                        "<td>" + val.EntryGateTime + "</td>" +
                                        "<td>" + val.LoadingStartTime + "</td>" +
                                        "<td>" + val.ReportPrintedDateTime + "</td>" +
                                        "<td>" + val.ShipmentNo + "</td>" +
                                        "<td>" + val.LoadID + "</td>" +
                                    "</tr>";
            });
            strTable = strTable + "</tbody>" +
                                "</table>";
            $('#dvTable').html(strTable);
            updateTables(false);
            createLoadSummaryDataTable();
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { RefreshLoadSummary(); }, 20000);
        }
    });
}

function ShowTruckDetails(s, Id) {
    $('#dvTimer').timer('reset');
    $('#tblLoadMaster tr').removeClass('selected-row');
    $(s).addClass('selected-row');

    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckStatus?Id=" + Id,
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                $(s).find("td.truckStatus").html(result.strMessage);
                GetTruckDetails(Id);
                GetActionOptions(Id);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
                OpenLoadSummaryMenu();
            }
        }
    });
}

function GetTruckDetails(Id)
{
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckDetails?Id=" + Id,
        UpdateTargetId: "dvTruckDetails",
        cache: false,
        success: function (result) {
            $("#dvTruckDetails").html(result);
        },
        error: function () {

        }
    });
}

function GetActionOptions(Id)
{
    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetActionOptions?Id=" + Id,
        UpdateTargetId: "TruckAssigmentOptions",
        cache: false,
        success: function (result) {
            $("#TruckAssigmentOptions").html(result);
        },
        error: function () {

        }
    });
}

function CardReallocate(LoadID)
{
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id==0)
    {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reallocate card?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
         $(".modal-backdrop").slideUp('slow');
         $('#confirmModal').modal('hide');
         $.ajax({
             type: "GET",
             url: "/LoadSummary/CardToBeReallocate?Id=" + Id,
             cache: false,
             success: function (result) {
                 alertDismissable(result.strType, result.strMessage);
                 if (result.blnStatus == true) {
                     OpenLoadSummaryMenu();
                 }
             }
         });
    });
}

function CardReauthorize(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reauthorize card?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/CardReauthorize?Id=" + Id,
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    });
}

function BayAssign(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    //Commented due to By-Pass of Gantry Full
    //$.ajax({
    //    type: "GET",
    //    url: "/LoadSummary/MaxTrucksPerGantry",
    //    cache: false,
    //    success: function (result) {
    //        if (result.blnStatus == true) {
    //            $('#myConfirmMsg').html("<p>Are you sure to Assign Bay?</p>");
    //            $('#confirmModal').modal('show');
    //            $("#btnConfirmOK").unbind('click');
    //            $("#btnConfirmOK").on("click", function () {
    //                $(".modal-backdrop").slideUp('slow');
    //                $('#confirmModal').modal('hide');

    //                $.ajax({
    //                    type: "GET",
    //                    url: "/LoadSummary/GetAssignBay?Id=" + Id,
    //                    UpdateTargetId: "dvContent",
    //                    cache: false,
    //                    success: function (result) {
    //                        if (result.blnStatus != 'undefined' && result.blnStatus == false) {
    //                            alertDismissable(result.strType, result.strMessage);
    //                        }
    //                        else {
    //                            $("#dvContent").html(result);
    //                        }
    //                    }
    //                });
    //            });
    //        }
    //        else
    //        {
    //            alertDismissable(result.strType, result.strMessage);
    //        }
    //    }
    //});

    $('#myConfirmMsg').html("<p>Are you sure to Assign Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        $.ajax({
            type: "GET",
            url: "/LoadSummary/GetAssignBay?Id=" + Id,
            UpdateTargetId: "dvContent",
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    alertDismissable(result.strType, result.strMessage);
                }
                else {
                    $("#dvContent").html(result);
                }
            }
        });
    });
}

function CardAssignView(LoadID)
{
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetCardAssignView?Id=" + Id,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-title').html('Card Assign');
            $('#myModal').modal('show');
            $('#myModal').draggable({handle: ".modal-header"});
            $("#btnOK").text('Assign Card');
            $("#btnAutoAssign").show();
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (CardAssignDo(Id) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $("#btnOK").text('OK')
                    $("#btnAutoAssign").hide();
                }
            });
            $("#btnAutoAssign").unbind('click');
            $("#btnAutoAssign").on("click", function () {
                if (CardAutoAssignDo(Id) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $("#btnOK").text('OK')
                    $("#btnAutoAssign").hide();
                }
            });
            $('#myModal').on('hidden.bs.modal', function () {
                $("#btnOK").text('OK');
                $("#btnAutoAssign").hide();
            });
        }
    });
}

function PrintFAN(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Print FAN slip?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        //window.open("/LoadSummary/GetPrintFAN_Html?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        //window.open("/LoadSummary/GetPrintFAN_Auto?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/GetPrintFAN_Auto?Id=" + Id,
            cache: false,
            success: function (result) {
                //window.open("/LoadSummary/GetPrintFAN_Auto?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
            }
        });
        LogActivityInDB("FANPrint", "FAN for LoadID: " + Id + " printed successfully." , Id)
    });
}

function PrintUAN(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Print UAN slip?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        window.open("/LoadSummary/GetPrintUAN?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        LogActivityInDB("UANPrint", "UAN for LoadID: " + Id + " printed successfully.", Id)
    });
}

function PrintBOL(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Print BOL slip?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        window.open("/LoadSummary/GetPrintBOL?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        LogActivityInDB("FANPrint", "BOL for LoadID: " + Id + " printed successfully.", Id)
    });
}

function BayDeallocate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Deallocate Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/BayDeallocate?Id=" + Id,
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    });
}

function BayReallocate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reallocate Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        ShowPasswordModalForReqTrn("Confirm Credentials for Bay Reallocate", function () { BayReallocateAfterPassword(Id); }, "Bay Reallocate", null, Id);
    });
}

function BayReallocateAfterPassword(Id)
{
    $.ajax({
        type: "GET",
        url: "/LoadSummary/BayReallocate?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function TruckCancel(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckCancelView?Id=" + Id,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-title').html('Truck Cancel');
            $('#myModal').modal('show');
            $('#myModal').draggable({handle: ".modal-header"});
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (TruckCancelDo(Id, ApproverId) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                }
            });
        }
    });
}

function TruckAbort(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckAbortView?Id=" + Id,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-title').html('Truck Abort');
            $('#myModal').modal('show');
            $('#myModal').draggable({handle: ".modal-header"});
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (TruckAbortDo(Id, ApproverId) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                }
            });
        }
    });
}



function TruckSick(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckSick?Id=" + Id + "&ApproverId=" + ApproverId,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function BaySick(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure the Bay is Sick?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/BaySick?Id=" + Id + "&ApproverId=" + ApproverId,
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    });
}



function TruckCheckOut(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to CheckOut Truck?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/TruckCheckOut?Id=" + Id,
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    });
}

function TruckTerminate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Terminate Truck?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/TruckTerminateView?Id=" + Id,
            cache: false,
            success: function (result) {
                $('#myModalBody').html(result);
                $('#myModal .modal-title').html('Truck Terminate');
                $('#myModal').modal('show');
                $('#myModal').draggable({handle: ".modal-header"});
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    if (TruckTerminateDo(Id) != false) {
                        $(".modal-backdrop").slideUp('slow');
                        $('#myModal').modal('hide');
                    }
                });
            }
        });
    });
}

function TruckRegularizeView(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }

    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckRegularizeView?Id=" + Id,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-dialog').addClass('truck-regularize');
            $('#myModal .modal-title').html('Truck Regularize');
            $('#myModal').modal('show');
            $('#myModal').draggable({handle: ".modal-header"});
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (TruckRegularizeDo(Id, ApproverId) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $('#myModal .modal-dialog').removeClass('truck-regularize');
                }
            });
        }
    });
}

function LogWeight(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    
    $.ajax({
        type: "GET",
        url: "/LoadSummary/LogWeightView?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvContent").html(result);
            }
        }
    });
}

function ArchiveLoad() {
    var Id = $('#tblLoadMaster tr.selected-row td').eq(0).text();

    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Archive Load?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        $.ajax({
            type: "GET",
            url: "/LoadSummary/ArchiveLoad?Id=" + Id,
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    });
}