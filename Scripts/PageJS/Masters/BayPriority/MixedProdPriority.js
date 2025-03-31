$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenBayPriorityMenu();
        $('#cancelModal').modal('hide');
    });

    $('#tblMixedPriority').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "15%", "sClass": "text-center" },
                { sWidth: "30%", "sClass": "text-center" },
                { sWidth: "15%", "sClass": "text-center" },
                { sWidth: "25%", "sClass": "text-center" },
                { sWidth: "15%", "sClass": "text-center" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindMoveUp();
            BindMoveDown();
        }
    });
    $('#tblMixedPriority_filter label').remove();
    $('#tblMixedPriority tbody td.baseProduct').each(function () {
        $(this).html($('#ddlProduct option:selected').html());
    });
});

function UpdateMixedProdPriority()
{
    var iCnt = 0;
    $('#tblMixedPriority tbody tr').each(function () {
        iCnt = iCnt + 1;
        $(this).find("td.priority").html(iCnt);
    }); 
}

function BindMoveUp() {
    $('.spanUp').on("click", function (e) {
        var row = $(this).parent().parent();
        row.insertBefore(row.prev());
        UpdateMixedProdPriority();
    });
}

function BindMoveDown() {
    $('.spanDown').on("click", function (e) {
        var row = $(this).parent().parent();
        row.insertAfter(row.next());
        UpdateMixedProdPriority();
    });
}

function UpdateMixedProdPriority() {
    var iCnt = 0;
    $('#tblMixedPriority tbody tr').each(function () {
        iCnt = iCnt + 1;
        $(this).find("td.priority").html(iCnt);
    });
}

function UpdateBayMixedProdPriority() {
    var activityName = "Bay Priority";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBayMixedProdPriorityDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBayMixedProdPriorityDo(); }, activityName,"");
            }
        }
    });
}

function UpdateBayMixedProdPriorityDo() {
    var Bays = [];

    $('#tblMixedPriority tbody tr').each(function () {
        $(this).find("td:eq(0)")
        var obj = {
            'BayId': $(this).find("td:eq(0)").html(),
            'SingleProdPriority': 0,
            'MixedProdPriority': $(this).find("td.priority").html(),
        };
        Bays.push(obj);
    });

    $.ajax({
        url: "/BayPriority/UpdateBayMixedProdPriority",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'Bays': Bays }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBayPriorityMenu();
            }
        }
    });
}