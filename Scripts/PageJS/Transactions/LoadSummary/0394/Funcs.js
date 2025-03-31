$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TrucksStatusTableData",
        //cache: false,
        success: function (result) {
            truckStatus = result;
        },
        error: function () { }
    });
});

function ShowTruckDetails(s, Id) {
    $('#tblLoadMaster tr').removeClass('selected-row');
    $(s).addClass('selected-row');
    GetTruckDetails(Id);
    GetActionOptions(Id);
    $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckStatus?Id=" + Id,
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                $(s).find("td.truckStatus").html(result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
                OpenLoadSummaryMenu();
            }
        }
    });
}

function GetTruckDetails(Id) {
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


function CardToBeReallocated(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reallocate card?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Card to be Reallocated";
        var activityDetail = "LoadID: " + Id;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    CardToBeReallocatedDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { CardToBeReallocatedDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function CardToBeReallocatedDo(Id) {
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
}

function CardReauthorize(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reauthorize card?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Reauthorize Card";
        var activityDetail = "LoadID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    CardReauthorizeDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { CardReauthorizeDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function CardReauthorizeDo(Id) {
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
}

function BayAssign(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }

    $('#myConfirmMsg').html("<p>Are you sure to Assign Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
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
                    clearTimeout(gblTimeout);
                    $("#dvContent").html(result);
                }
            }
        });
    });
}

function CardAssignView(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        alertDismissable('danger', 'No Load Selected for Card Assign');
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
            $('#myModal').draggable({ handle: ".modal-header" });
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
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        //window.open("/LoadSummary/GetPrintFAN_Html?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        var activityName = "Print FAN";
        var activityDetail = "Load Id: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    return GetPrintFAN_AutoDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { return GetPrintFAN_AutoDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function GetPrintFAN_AutoDo(Id) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/ManualPrintFAN?LoadID=" + Id,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == true) {
                if (result.strMessage == 'LOCALPRINT') {
                    window.open("/LoadSummary/GetPrintFAN_Auto?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
                    UpdateFANPrinted(Id);
                    LogActivityInDB("FANPrintManual", "FAN for LoadID: " + Id + " printed manually.", Id);
                }
                else {
                    alertDismissable(result.strType, result.strMessage);
                }
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

//function GetPrintFAN_AutoDo(Id) {
//    window.open("/LoadSummary/GetPrintFAN_Auto?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
//    UpdateFANPrinted(Id);
//    LogActivityInDB("FANPrintManual", "FAN for LoadID: " + Id + " printed manually.", Id);
//}

function UpdateFANPrinted(Id) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/UpdateFANPrinted?LoadID=" + Id + "&blnPrint=" + true,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                //
            }
            else {
                //
            }
        }
    });
}

function PrintUAN(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Print UAN slip?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        //window.open("/LoadSummary/GetPrintUAN?Id=" + Id, 'PrintFAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
        var activityName = "Print UAN";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    return GetPrintUAN(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { return GetPrintUAN(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}


function GetPrintUAN(Id) {
    window.open("/LoadSummary/GetPrintUANpdf?Id=" + Id, 'PrintUAN', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
}

function PrintBOL(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Print BOL slip?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Print BOL";
        var activityDetail = "Load Id: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    GetPrintBOLDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { GetPrintBOLDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function GetPrintBOLDo(Id) {
    window.open("/LoadSummary/GetPrintBOL?Id=" + Id, 'PrintBOL', 'left=20, top=20, width=1000, height=550 ,resizable=no, scrollbar=1');
    LogActivityInDB("FANPrint", "BOL for LoadID: " + Id + " printed successfully.", Id)
}

function ManualCompleteTT(LoadID) {
    if (LoadID == null || LoadID == "" || LoadID == 'undefined' || LoadID == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Manually Complete the TT?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Manually Complete TT";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    ManualCompleteTTView(LoadID);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ManualCompleteTTView(LoadID); }, activityName, activityDetail);
                }
            }
        });
    });
}

function ManualCompleteTTView(LoadID) {
    if (LoadID == null || LoadID == "" || LoadID == 'undefined' || LoadID == 0) {
        return false;
    }
    document.getElementById("waitpage").style.display = "block";
    $.ajax({
        type: "GET",
        url: "/LoadSummary/ManualCompleteTTView?ID=" + LoadID,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-dialog').addClass('truck-mancomp');
            $('#myModal .modal-title').html('Truck Manually Complete');
            $('#myModal').modal('show');
            $('#myModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (ManualCompleteTTDo(LoadID) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $('#myModal .modal-dialog').removeClass('truck-mancomp');
                }
            });
        }
    });
}

function BayDeallocate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Deallocate Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Deallocate Bay Assignment";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    DeallocateBayDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeallocateBayDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function DeallocateBayDo(Id) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/DeallocateBay?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function ManualPost(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Manually Post Invoice Data to ERP?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Manually Post Invoice";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    ManualPostDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ManualPostDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function ManualPostDo(LoadID) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/ManualPostInvoice?Id=" + LoadID,
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                alertDismissable(result.strType, result.strMessage);
                if (result.strType == "success") { OpenLoadSummaryMenu(); }
            }
            else {
                OpenJDEManualEntryView(LoadID);
            }
        }
    });
}

function OpenJDEManualEntryView(LoadID) {
    $.ajax({
        type: "GET",
        url: "/LoadSummary/JDEManualEntryView?Id=" + LoadID,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            if (result.blnStatus != null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                clearTimeout(gblTimeout);
                $("#dvContent").html(result);
            }
        }
    });
}

function BayReallocate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Reallocate Bay?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Bay To Be Reallocated";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    BayReallocateAfterPassword(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { BayReallocateAfterPassword(Id); }, activityName, activityDetail, LoadID);
                }
            }
        });
    });
}

function BayReallocateAfterPassword(Id) {
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/LoadSummary/BayToBeReallocated?Id=" + Id + "&strRemarks=" + sRemarks,
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
            $('#myModal').draggable({ handle: ".modal-header" });
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
            $('#myModal').draggable({ handle: ".modal-header" });
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
    $('#confirmModal').draggable({ handle: ".modal-header" });
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
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "TT CheckOut";
        var activityDetail = "Load ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    TruckCheckOutDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { TruckCheckOutDo(Id); }, activityName, activityDetail);
                }
            }
        });
    });
}

function TruckCheckOutDo(Id) {
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
}

function TruckTerminate(LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Terminate Truck?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
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
                $('#myModal').draggable({ handle: ".modal-header" });
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
            $('#myModal').draggable({ handle: ".modal-header" });
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
                clearTimeout(gblTimeout);
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
    $('#confirmModal').draggable({ handle: ".modal-header" });
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

function SampleQtyView(LoadID, ApproverId) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }

    $.ajax({
        type: "GET",
        url: "/LoadSummary/SampleQtyView?Id=" + Id,
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-dialog').addClass('truck-sampleQty');
            $('#myModal .modal-title').html('Sample Qty');
            $('#myModal').modal('show');
            $('#myModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (AddSamplingQtyDo(Id, ApproverId) != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $('#myModal .modal-dialog').removeClass('truck-sampleQty');
                }
            });
        }
    });
}

function CreateHtmlforAccess(row) {
    if (row == undefined || row.TruckStatusID == undefined)
    { return ""; }

    var objTruckStatus;
    for (var i = 0; i < truckStatus.length; i++) {
        if (truckStatus[i].TruckStatus == row.TruckStatusID) {
            objTruckStatus = truckStatus[i];
        }
    }

    var HtmlContent = "";
    var activityDetail = row.TruckNumber + " (" + row.FANSlipNo + ")";
    if (objTruckStatus != null && row.PurposeID == 1 && row.BayReportingTime == null && objTruckStatus.TruckCancel == true && gblCustName == 'HPCL') {
        HtmlContent = '<div class="text-right">' +
            '<a id="btnSampleQty" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Add Sampling Qty\', function (ApproverId) { SampleQtyView(\'' + row.LoadID + '\',ApproverId); } , \'Add Sampling Qty\', \'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-plus-sign">  </span>Add Sample Qty' +
            '</a>' +
        '</div>';
    }

    if (objTruckStatus != null && objTruckStatus.AssignBayCard == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
           '<a id="btnBayAssign" role="button" class="btn btn-primary" href="#" onclick="BayAssign(\'' + row.LoadID + '\');">' +
        '<span class="glyphicon glyphicon-check"></span>Bay Assign' +
        '</a>' +
    ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.AssignCard == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnCardAssign" role="button" class="btn btn-primary" href="#" onclick="CardAssignView(\'' + row.LoadID + '\');">' +
        '<span class="glyphicon glyphicon glyphicon-credit-card"></span>Card Assign' +
        '</a>' +
    ' </div>';
    }

    if (objTruckStatus != null && objTruckStatus.CardReallocate == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnCardReallocate" role="button" class="btn btn-primary" href="#" onclick="CardToBeReallocated(\'' + row.LoadID + '\');">' +
        '<span class="glyphicon glyphicon-credit-card"></span>Card To Reallocate' +
        '</a>' +
    ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.CardReauthorize == true) {
        HtmlContent = HtmlContent + '<div class=" text-right">' +
            '<a id="btnCardReAuthorize" role="button" class="btn btn-primary" href="#" onclick="CardReauthorize(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-repeat"></span>ReAuthorize Card' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.BayReallocate == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnBayReallocate" role="button" class="btn btn-primary" href="#" onclick="BayReallocate(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-refresh">  </span>Bay To Reallocate' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.BayDeallocate == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnBayDeallocate" role="button" class="btn btn-primary" href="#" onclick="BayDeallocate(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-arrow-down">  </span>Bay Deallocate' +
            '</a>' +
       ' </div>';
    }

    //if (objTruckStatus != null && objTruckStatus.ManualComplete == true) {
    if (objTruckStatus != null && objTruckStatus.ManualComplete == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnManualComplete" role="button" class="btn btn-primary" href="#" onclick="ManualCompleteTT(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-hand-up">  </span>Manual Complete' +
            '</a>' +
       ' </div>';
    }

    if (objTruckStatus != null && objTruckStatus.Regularize == true && row.LoadDetStatus.indexOf('2') < 0) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnRegularize" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Truck Regularize\', function (ApproverId) { TruckRegularizeView(\'' + row.LoadID + '\',ApproverId); } , \'TT Regularize\', \'' + activityDetail + '\' );">' +
                '<span class="glyphicon glyphicon-transfer">  </span>Regularize' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.TruckCancel == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnTruckCancel" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Truck Cancel\', function (ApproverId) { TruckCancel(\'' + row.LoadID + '\',ApproverId); } , \'TT Cancel\', \'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-remove">  </span>Cancel Truck' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.TruckAbort == true && row.TruckStatusDesc.indexOf('Interrupted') >= 0) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnTruckAbort" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Truck Abort\', function (ApproverId) { TruckAbort(\'' + row.LoadID + '\',ApproverId); }, \'TT Abort\', \'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-remove"></span>Abort Truck' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.TruckSick == true && row.TruckStatusDesc.indexOf('Interrupted') >= 0) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnTruckSick" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Truck Sick\', function (ApproverId) { TruckSick(\'' + row.LoadID + '\',ApproverId); }, \'TT Sick\', \'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-exclamation-sign">  </span>Truck Sick' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.BaySick == true && row.TruckStatusDesc.indexOf('Interrupted') >= 0) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnBaySick" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'Bay Sick\', function (ApproverId) { BaySick(\'' + row.LoadID + '\',ApproverId); }, \'Bay Sick\',\'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-ban-circle">  </span>Bay Sick' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && (objTruckStatus.TruckCheckOut == true || (CheckInvoiceForBGExit && row.PostLoadDateTime != undefined && (objTruckStatus.TruckStatus == 401)))) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
        '<a id="btnTruckCheckOut" role="button" class="btn btn-primary" href="#" onclick="TruckCheckOut(\'' + row.LoadID + '\');">' +
            '<span class="glyphicon glyphicon-log-out">  </span>CheckOut Truck' +
        '</a>' +
    ' </div>';
    }
    if (objTruckStatus != null && (objTruckStatus.LogWeight == true
        || ((objTruckStatus.TruckStatus == 124 || objTruckStatus.TruckStatus == 815) && IsBGEntryBypassed == true && WeightBased == true)
        )) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnLogWeight" role="button" class="btn btn-primary" href="#" onclick="LogWeight(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-download-alt">  </span>Log Weight' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.TruckTerminate == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnTruckTerminate" role="button" class="btn btn-primary" href="#" onclick="ShowPasswordModalForReqTrn(\'TT Terminate\', function (ApproverId) { TruckTerminate(\'' + row.LoadID + '\',ApproverId); }, \'TT Terminate\',\'' + activityDetail + '\');">' +
                '<span class="glyphicon glyphicon-remove-circle">  </span>Terminate Truck' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.PrintFAN == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnPrintFAN" role="button" class="btn btn-primary" href="#" onclick="PrintFAN(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-print">  </span>Print FAN' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.PrintBOL == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnPrintBOL" role="button" class="btn btn-primary" href="#" onclick="PrintBOL(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-print">  </span>Print BOL' +
            '</a>' +
       ' </div>';
    }
    if (objTruckStatus != null && objTruckStatus.PrintUAN == true) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnPrintUAN" role="button" class="btn btn-primary" href="#" onclick="PrintUAN(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-print">  </span>Print UAN' +
            '</a>' +
       ' </div>';
    }
    if (row.ManualPost == true && objTruckStatus.PostLoad == true && row.PostLoadDateTime == null) {
        HtmlContent = HtmlContent + '<div class="text-right">' +
            '<a id="btnManualPost" role="button" class="btn btn-primary" href="#" onclick="ManualPost(\'' + row.LoadID + '\');">' +
                '<span class="glyphicon glyphicon-tasks">  </span>Postload Repost' +
            '</a>' +
       ' </div>';
    }
    return HtmlContent;
}