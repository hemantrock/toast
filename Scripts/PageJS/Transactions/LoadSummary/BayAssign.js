$(document).ready(function () {

    $('#tblSelectedLoad').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "8%" },
                { sWidth: "15%" },
                { sWidth: "10%" },
            ],
        "bAutoWidth": false,
    });

    $('#tblCompStatus').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "7%" },
                { sWidth: "7%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "15%" },
                { sWidth: "10%" },
                { sWidth: "10%" },
                { sWidth: "12%" },
                { sWidth: "12%" },
            ],
        "bAutoWidth": false,
    });
});

function UpdateBaySelection(opt) {
    
    var iBayID = $('option:selected', opt).attr('bayid');
    var CompNo = $(opt).attr('data-refid');
    var blnFound = false;
    $('#tblCompStatus select[name=AssignBay]').each(function () {
        if (blnFound == true) {
            
            var ddl = this;
            $('#' + $(this).attr('id') + " > option").each(function () {
                
                oBayID = $(this).attr('bayid');
                var LoadingPointNo = $(this).val();
                if (oBayID == iBayID) {
                    $(ddl).val(LoadingPointNo).change(); return false;
                }
            });
        }
        if (CompNo == $(this).attr('data-refid')) {
            blnFound = true;
        }
    });
}

function AssignAvlBay(LoadID) {
    var activityName = "Manually Allocate Bay";
    var activityDetail = "Load ID: " + LoadID;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AssignAvlBayDo(LoadID);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AssignAvlBayDo(LoadID); }, activityName, activityDetail, LoadID);
            }
        }
    });
}

function AssignAvlBayDo(LoadID)
{
    var objLoadID = {
        'LoadID': LoadID,
    };

    if ($('#chkQueueJump').is(":checked")) {
        QueueJump = true;
    }
    else {
        QueueJump = false;
    }

    var objLoadDetails = [];
        
    $('#tblCompStatus select[name=AssignBay]').each(function () {
        var CompNo = $(this).attr('data-refid');
        var LoadingPointNo = $(this).val();
        
        if (CompNo != null && CompNo != 0 && LoadingPointNo != null && LoadingPointNo != 0)
        {
            var obj = {
                'LoadID': LoadID,
                'CompNo': CompNo,
                'LoadingPointNo': LoadingPointNo,
            };
            objLoadDetails.push(obj);
        }
    });
       
    if (objLoadDetails.length > 0) {
        $.ajax({
       
            url: "/LoadSummary/AssignSelectedBays",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ objLoadID: objLoadID, objLoadDetails: objLoadDetails,'QueueJump': QueueJump }),
            cache: false,
            success: function (result) {
                alertDismissable(result.strType, result.strMessage);
                if (result.blnStatus == true) {
                    OpenLoadSummaryMenu();
                }
            }
        });
    }
    else {
        alertDismissable("danger", "Bays not selected to update.");
    }
}

function AutoAssignBay(LoadID) {

    var QueueJump = true;
    var MixedBayUsing1LP = true;
    var UserDiffBaysAllowedForMixedLoad = true;
    if ($('#chkQueueJump').is(":checked")) {
        QueueJump = true;
    }
    else {
        QueueJump = false;
    }
    if ($('#chkMixedBay').is(":checked")) {
        MixedBayUsing1LP = true;
    }
    else {
        MixedBayUsing1LP = false;
    }
    if ($('#chkDiffBay').is(":checked")) {
        UserDiffBaysAllowedForMixedLoad = true;
    }
    else {
        UserDiffBaysAllowedForMixedLoad = false;
    }

    var activityName = "Auto Allocate Bays";
    var activityDetail = "Load ID: " + LoadID;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AutoAssignBaysDo(LoadID, QueueJump, MixedBayUsing1LP, UserDiffBaysAllowedForMixedLoad);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AutoAssignBaysDo(LoadID, QueueJump, MixedBayUsing1LP, UserDiffBaysAllowedForMixedLoad); }, activityName, activityDetail, LoadID);
            }
        }
    });
}

function AutoAssignBaysDo(LoadID, QueueJump, MixedBayUsing1LP, UserDiffBaysAllowedForMixedLoad) {
    $.ajax({
        url: "/LoadSummary/AutoAssignBays",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'iLoadID': LoadID, 'QueueJump': QueueJump, 'MixedBayUsing1LP': MixedBayUsing1LP, 'UserDiffBaysAllowedForMixedLoad': UserDiffBaysAllowedForMixedLoad }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}