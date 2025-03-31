var selectedRowRef = "";
$(document).ready(function () {
    $('#tblIconSAPConfig').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "5%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "10%", 'sClass': 'text-center' },
                { sWidth: "8%", 'sClass': 'text-center' },
                { sWidth: "12%", 'sClass': 'text-center' },
                { sWidth: "12%", 'sClass': 'text-center' },
                { sWidth: "4%", 'sClass': 'text-center' },
                { sWidth: "30%", 'sClass': 'text-center' },
                { sWidth: "6%", 'sClass': 'text-center' },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
        }
    });
});

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteIconSAPConfig(Id);
            $('#deleteModal').modal('hide');
        });

    });
}


function OpenAddIconSAPConfig()
{
    $.ajax({
        type: "GET",
        url: "/IconSAPConfig/Add",
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

function EditRecord(Id)
{
    $.ajax({
        type: "GET",
        url: "/IconSAPConfig/Edit?Id=" + Id,
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
function deleteIconSAPConfig(Id) {
    var activityName = "Delete Existing SAP Config";
    var activityDetail = "SAP Record No: " + selectedRowRef;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Selected SAP Config ?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteIconSAPConfigDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteIconSAPConfigDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}
function deleteIconSAPConfigDo(Id) {
    $.ajax({
        type: "GET",
        url: "/IconSAPConfig/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenSAPConfigMenu();
            }

        }
    });
}