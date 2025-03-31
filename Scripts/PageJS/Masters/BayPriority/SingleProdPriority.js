$(document).ready(function () {
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenBayPriorityMenu();
        $('#cancelModal').modal('hide');
    });
    $('#tblSinglePriority').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": false,
        "bInfo": true,
        "bSort":false,
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
    $('#tblSinglePriority_filter label').remove();

    $('#tblSinglePriority tbody td.baseProduct').each(function () {
        $(this).html($('#ddlProduct option:selected').html());
    });  
});

function BindMoveUp() {
    $('.spanUp').on("click", function (e) {
        var row = $(this).parent().parent();
        row.insertBefore(row.prev());
        UpdateSingleProdPriority();
    });
}

function BindMoveDown() {
    $('.spanDown').on("click", function (e) {
        var row = $(this).parent().parent();
        row.insertAfter(row.next());
        UpdateSingleProdPriority();
    });
}

function UpdateSingleProdPriority()
{
    var iCnt = 0;
    $('#tblSinglePriority tbody tr').each(function () {
        iCnt = iCnt + 1;
        $(this).find("td.priority").html(iCnt);
    }); 
}
function UpdateBaySingleProdPriority() {
    var activityName = "Bay Priority";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBaySingleProdPriorityDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBaySingleProdPriorityDo(); }, activityName,"");
            }
        }
    });
}
function UpdateBaySingleProdPriorityDo()
{
    var Bays = [];
    var ProductID = $('#ddlProduct option:selected').val();
    $('#tblSinglePriority tbody tr').each(function () {
        $(this).find("td:eq(0)")
        var obj = {
            'BayId': $(this).find("td:eq(0)").html(),
            'SingleProdPriority': $(this).find("td.priority").html(),
            'MixedProdPriority': 0,
        };
        Bays.push(obj);
    });

    $.ajax({
        url: "/BayPriority/UpdateBaySingleProdPriority",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'Bays': Bays, 'ProductID': ProductID }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBayPriorityMenu();
            }
        }
    });
}