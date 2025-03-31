var selectedRowId, selectedRowRef, BatchEndedDone, PostDone, lstBatchID = [];

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/MFMBatch/GetMFMBatchData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'isSelected', type: 'boolean' },
                    { name: 'BatchID', type: 'number' },
                    { name: 'IssuingPlantCode', type: 'string' },
                    { name: 'ReceivingPlantCode', type: 'string' },
                    { name: 'ProductName', type: 'number' },
                    { name: 'IssuingStorageTank', type: 'string' },
                    { name: 'ReceivingStorageTank', type: 'string' },
                    { name: 'StartDateTime', type: 'date' },
                    { name: 'MFMID', type: 'string' },
                    { name: 'EndDateTime', type: 'date' },
                    { name: 'AvgDensObs', type: 'number' },
                    { name: 'AvgTemp', type: 'number' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'VolumeObs', type: 'number' },
                    { name: 'VolumeStd15', type: 'number' },
                    { name: 'VolumeStd295', type: 'number' },
                    { name: 'Mass', type: 'number' },
                    { name: 'TotalizerStart', type: 'number' },
                    { name: 'TotalizerEnd', type: 'number' },
                    { name: 'ReceiptIssue', type: 'string' },
                    { name: 'StkTrOMC', type: 'string' },
                    { name: 'ResponseCode', type: 'string' },
                    { name: 'ResponseDesc', type: 'string' },
                ],
                localdata: data,
                id: "BatchID"
            };

            var adapter = new $.jqx.dataAdapter(source);
            var columnrendererDouble = function (value) {
                return '<div style="margin: 4px 0 0 4px;text-align: center;">' + value + '</div>';
            }
            $("#jqxMFMBatchGrid").jqxGrid(
                {
                    width: "100%",
                    source: adapter,
                    columnsresize: true,
                    //selectionmode: "checkbox",
                    editable: true,
                    selectionmode: "none",
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: iGblNoRows,
                    pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                    autoheight: true,
                    showtoolbar: true,
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>MFM Batch Data</span></div>");
                        var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-import' aria-hidden='true'></span> Add/Start  RECEIPT  Batch</span></div>");
                        var DispButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-export' aria-hidden='true'></span> Add/Start  DISPATCH  Batch</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit Batch</span></div>");
                        var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete Batch</span></div>");
                        var EndBatchButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-stop' aria-hidden='true'></span> Stop/ End Batch</span></div>");
                        var ViewBatchButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-list' aria-hidden='true'></span> View Batch Data</span></div>");
                        var PostToSAPButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span> Post Batch To SAP</span></div>");

                        container.append(tableHeading);
                        container.append(addButton);
                        container.append(DispButton);
                        //container.append(editButton);
                        container.append(deleteButton);
                        //container.append(EndBatchButton);
                        container.append(ViewBatchButton);
                        container.append(PostToSAPButton);

                        statusbar.append(container);
                        DispButton.jqxButton({ height: 20 });
                        addButton.jqxButton({ height: 20 });
                        //editButton.jqxButton({ height: 20 });
                        deleteButton.jqxButton({ height: 20 });
                        //EndBatchButton.jqxButton({ height: 20 });
                        ViewBatchButton.jqxButton({ height: 20 });
                        PostToSAPButton.jqxButton({ height: 20 });

                        // add new row.
                        addButton.click(function (event) {
                            AddMFMBatch('');
                        });

                        DispButton.click(function (event) {
                            AddMFMBatch('Disp');
                        });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
                        });

                        // delete Row.
                        deleteButton.click(function (event) {
                            DeleteMFMBatch(selectedRowId);
                        });

                        // End Batch.
                        EndBatchButton.click(function (event) {
                            EndBatch(selectedRowId);
                        });

                        // View Batch Data.
                        ViewBatchButton.click(function (event) {
                            ViewBatchData(selectedRowId);
                        });

                        // Post Data to SAP.
                        PostToSAPButton.click(function (event) {
                            PostBatchToSAP(selectedRowId);
                        });
                    },
                    ready: function () {
                    },
                    autoshowfiltericon: true,
                    columns: [
                        { text: '', datafield: 'isSelected', columntype: 'checkbox', width: "2%", threestatecheckbox: false, editable: true },
                        { text: 'Batch#', datafield: 'BatchID', width: '3%', editable: false },
                        { text: 'From', datafield: 'IssuingPlantCode', filtertype: 'checkedlist', width: '3%', editable: false },
                        { text: 'To', datafield: 'ReceivingPlantCode', width: '3%', hidden: false, editable: false },
                        { text: 'Product', datafield: 'ProductName', filtertype: 'checkedlist', width: '4%', editable: false },
                        { text: 'FromTank#', datafield: 'IssuingStorageTank', width: '0%', hidden: true, editable: false },
                        { text: 'Tank#', datafield: 'ReceivingStorageTank', filtertype: 'checkedlist', width: '4%', editable: false },
                        { text: 'StartDate', datafield: 'StartDateTime', filtertype: 'date', width: '9%', cellsformat: 'dd-MMM-yy HH:mm:ss', editable: false },
                        { text: 'MFM#', datafield: 'MFMID', filtertype: 'checkedlist', width: '4%', editable: false },
                        { text: 'EndDate', datafield: 'EndDateTime', filtertype: 'date', width: '9%', cellsformat: 'dd-MMM-yy HH:mm:ss', editable: false },
                        { text: 'DensObs<br/>(Kg/m³)', datafield: 'AvgDensObs', width: '4%', renderer: columnrendererDouble, editable: false },
                        { text: 'Temp<br/>(°C)', datafield: 'AvgTemp', width: '3%', renderer: columnrendererDouble, editable: false },
                        { text: 'Vol.Obs<br/>(KL)', datafield: 'VolumeObs', width: '4%', renderer: columnrendererDouble, editable: false },
                        { text: 'Vol.Std15<br/>(KL)', datafield: 'VolumeStd15', width: '4%', renderer: columnrendererDouble, editable: false },
                        { text: 'Vol.Std295<br/>(KL)', datafield: 'VolumeStd295', width: '0%', renderer: columnrendererDouble, hidden: true, editable: false },
                        { text: 'Mass<br/>(Ton)', datafield: 'Mass', width: '4%', renderer: columnrendererDouble, editable: false },
                        { text: 'Totz Start<br/>Obs (KL)', datafield: 'TotalizerStart', width: '6%', renderer: columnrendererDouble, editable: false },
                        { text: 'Totz End<br/>Obs (KL)', datafield: 'TotalizerEnd', width: '6%', renderer: columnrendererDouble, editable: false },
                        { text: 'Type', datafield: 'ReceiptIssue', filtertype: 'checkedlist', width: '2%', cellsalign: 'center', editable: false },
                        { text: 'Tfr', datafield: 'StkTrOMC', filtertype: 'checkedlist', width: '2%', cellsalign: 'center', editable: false },
                        { text: 'Remarks', datafield: 'Remarks', width: '6%', editable: false },
                        { text: 'SAP<br/>Code', datafield: 'ResponseCode', filtertype: 'checkedlist', width: '3%', renderer: columnrendererDouble, cellsalign: 'center', editable: false },
                        { text: 'SAP Response Desc', datafield: 'ResponseDesc', width: '15%', editable: false },
                    ]
                });

            $("#jqxMFMBatchGrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxMFMBatchGrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["BatchID"];
                    ViewBatchData(selectedRowId);
                }
            });
            $("#jqxMFMBatchGrid").bind('cellendedit', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxMFMBatchGrid').jqxGrid('getrowdata', event.args.rowindex);
                    if (event.args.value) {
                        lstBatchID.push(selectedRowData["BatchID"]);
                    }
                    else {
                        const index = lstBatchID.indexOf(selectedRowData["BatchID"]);
                        if (index > -1) { // only splice array when item is found
                            lstBatchID.splice(index, 1); // 2nd parameter means remove one item only
                        }
                    }
                    //console.log(lstBatchID);
                }
            });

            //display selected row index.
            $("#jqxMFMBatchGrid").on('rowselect', function (event) {
                debugger;
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxMFMBatchGrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["BatchID"];
                    selectedRowRef = selectedRowData["BatchID"] + " (" + selectedRowData["StartDateTIme"] + ")";
                    BatchEndedDone = (selectedRowData["EndDateTime"] != null || selectedRowData["EndDateTime"] != undefined);
                    PostDone = (selectedRowData["ResponseDesc"] == 'OK');
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function AddMFMBatch(BatchType) {
    $.ajax({
        type: "GET",
        url: "/MFMBatch/AddMFMBatchView?BatchType=" + BatchType,
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

function EditRecord(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to edit"); return;
    }
    else if (PostDone) {
        alertDismissable("danger", "Cannot Edit a Posted Record"); return;
    }
    //else if (BatchEndedDone) {
    //    alertDismissable("danger", "Cannot Edit a Batch that has ended"); return;
    //}
    else {
        $.ajax({
            type: "GET",
            url: "/MFMBatch/EditMFMBatchView?BatchID=" + Id + "&EditMode=Y",
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
}

function ViewBatchData(Id) {
    if (Id == undefined && lstBatchID.length == 0) {
        alertDismissable("danger", "Please select the row you want to View");
    }
    else {
        if (Id == undefined) { Id = lstBatchID[0];}
        $.ajax({
            type: "GET",
            url: "/MFMBatch/ViewMFMBatchView?BatchID=" + Id,
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
}

function DeleteMFMBatch(Id) {
    if (lstBatchID.length == 0) {
        alertDismissable("danger", "Please select/ check the Batches you want to delete"); return;
    }
    //else if (BatchEndedDone) {
    //    alertDismissable("danger", "Cannot delete a Batch that has ended"); return;
    //}
    else if (PostDone) {
        alertDismissable("danger", "Cannot delete a Posted Record"); return;
    }
    else {
        var activityName = "Delete an existing MFM Batch";
        var activityDetail = "Batch: " + lstBatchID.join(", ") + "";

        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete " + activityDetail + "?</p>");
        //cancelBubble(e);
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        DeleteMFMBatchDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteMFMBatchDo(Id); }, activityName, activityDetail);
                    }
                }
            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function DeleteMFMBatchDo(Id) {
    $.ajax({
        type: "POST",
        url: "/MFMBatch/DeleteMFMBatches",
        UpdateTargetId: "dvContent",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ lstBatchIDs: lstBatchID }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function EndBatch(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to End Batch"); return;
    }
    else {
        $.ajax({
            type: "GET",
            url: "/MFMBatch/EndMFMBatchView?BatchID=" + Id,
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
}

function EndBatchOld(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to End Batch"); return;
    }
    else if (BatchEndedDone == true) {
        alertDismissable("danger", "The Batch is already ended."); return;
    }
    else {
        var activityName = "End an existing MFM Batch";
        var activityDetail = selectedRowRef;
        $('#confirmModal').modal('show');
        $('#myConfirmMsg').html("<p>Are you sure to End Batch: " + Id + "? Once ended, it can't be undone</p>");
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        EndBatchOldDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { EndBatchOldDo(Id); }, activityName, activityDetail);
                    }
                }
            });
            $('#confirmModal').modal('hide');
            $('#myConfirmMsg').html("<p>Are you sure ?</p>");
        });
    }
}

function EndBatchOldDo(Id) {
    $.ajax({
        type: "GET",
        url: "/MFMBatch/EndMFMBatch?BatchID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}

function PostBatchToSAP(Id) {
    if (lstBatchID.length == 0) {
        alertDismissable("danger", "Please select/ check the Batches that you want to Post");
    }
    else {
        var activityName = "Post MFM Batch to SAP";
        var activityDetail = "Batch: " + lstBatchID.join(", ") + "";

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    PostBatchToSAPDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { PostBatchToSAPDo(Id); }, activityName, activityDetail);
                }
            }
        });
    }
}

function PostBatchToSAPDo(Id) {
    $.ajax({
        type: "POST",
        url: "/MFMBatch/PostMFMBatches",
        UpdateTargetId: "dvContent",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ lstBatchIDs: lstBatchID }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Transactions/MFMBatch', 'Index');
            }
        }
    });
}