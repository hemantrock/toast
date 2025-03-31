$(document).ready(function () {
    var pageType = "Alarm";
    $('#tblOpActions').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": true,
        "aoColumns":
            [
                { sWidth: "5%", 'sClass': 'text-center', 'bSortable': false },
                { sWidth: "10%" },
                { sWidth: "12%" },
                { sWidth: "48%" },
                { sWidth: "7%", 'sClass': 'text-center' },
                { sWidth: "6%", 'sClass': 'text-center' },
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "3%", 'sClass': 'text-center' },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanAck();
        }
    });
    AcknowledgeSelected();
});

function BindSpanAck() {
    $('.spanAck').on("click", function (e) {
        $('#myConfirmMsg').html("<p>Are you sure to Acknowledge this Alarms / Events ?</p>");
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            AcknowledgeAlarm(Id);
            $('#confirmModal').modal('hide');
        });
    });
}

function AcknowledgeSelected() {
    $('#AckAll').on("click", function (e) {
        var strIds = "";
        $("input[name='chkRow'][type='checkbox']:checked").each(function (i, c) {
            strIds = strIds + $(c).attr('id') + ',';
        });
        $('#myConfirmMsg').html("<p>Are you sure to Acknowledge Selected Alarms / Events ?</p>");
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        cancelBubble(e);
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            AcknowledgeSelectedAlarms(strIds);
            $('#confirmModal').modal('hide');
        });
    });
}

function AcknowledgeSelectedAlarms(strIds) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/AcknowledgeSelectedAlarms?strIds=" + strIds,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                GetStatusBarAck();
                if ($('#hdnType').val() == "Alarms") {
                    OpenAlarmsMenu();
                }
                else {
                    OpenEventsMenu();
                }
            }
        }
    });
}

function SelectAll(blnCheck)
{
    if (blnCheck == true) {
        $("input[name='chkRow'][type='checkbox']").each(function (i, c) {
            $(c).prop('checked', true);
        });
    }
    else {
        $("input[name='chkRow'][type='checkbox']").each(function (i, c) {
            $(c).prop('checked', false);
        });
    }
}

function RefreshPage()
{
    if ($('#hdnType').val() == "Alarms") {
        OpenAlarmsMenu();
    }
    else {
        OpenEventsMenu();
    }
}