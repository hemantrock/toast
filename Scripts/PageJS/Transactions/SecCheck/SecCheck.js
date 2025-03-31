$(document).ready(function () {
    $('#tblLoadSecCheck').dataTable({
        "iDisplayLength": iGblNoRows - 1,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": false,
        "bInfo": false,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%", "sClass": "text-center" },
                { sWidth: "0%", "sClass": "text-center" },
                { sWidth: "0%", "sClass": "text-center" },
                { sWidth: "6%", "sClass": "text-center" },
                { sWidth: "70%" },
                { sWidth: "8%", "sClass": "text-center" },
                { sWidth: "8%", "sClass": "text-center" },
                { sWidth: "8%", "sClass": "text-center" },
            ],
        "bAutoWidth": false,
    });
    $("input:checkbox").on('click', function () {
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenGenericViewPathParam('/SecCheck', '/Transactions/SecCheck', 'Index', oSecCheckStage);
        $('#cancelModal').modal('hide');
    });
});

function UpdateTruckSecCheck() {

    var activityName = "Add/Edit a Security Check";
    var activityDetail = "Truck: " + $('#txtTruckNum').text().trim();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateTruckSecCheckDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateTruckSecCheckDo(); }, activityName, activityDetail, iSecLoadID);
            }
        }
    });
}

function UpdateTruckSecCheckDo() {

    var objSecCheckDetails = [];
    $('#tblLoadSecCheck tbody').find('tr').each(function (i, el) {
        var $tds = $(this).find('td');
        var Sel = "";
        if ($tds.eq(5).find('input[type="checkbox"]').prop("checked")){ Sel = "Yes"; }
        if ($tds.eq(6).find('input[type="checkbox"]').prop("checked")){ Sel = "No"; }
        if ($tds.eq(7).find('input[type="checkbox"]').prop("checked")){ Sel = "NA"; }
        if (Sel == '') { alert('Please select option for S.No: ' + $tds.eq(3).text()); return;}
        var obj = {
            'LoadID': $tds.eq(0).text(),
            'Stage': $tds.eq(1).text(),
            'SeqNo': $tds.eq(2).text(),
            'Selection': Sel,
        };
        objSecCheckDetails.push(obj);
    });

    $.ajax({
        url: "/SecCheck/AddEditSecCheckObj",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objSecCheckDetails),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenGenericViewPathParam('/SecCheck', '/Transactions/SecCheck', 'Index', oSecCheckStage);
            }
        }
    });
}
