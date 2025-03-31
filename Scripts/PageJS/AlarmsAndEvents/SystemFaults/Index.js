var selectedRowId, selectedRowRef;

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/GetSystemFaults",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'UniqueID', type: 'number' },
                    { name: 'ItemGroup', type: 'string' },
                    { name: 'ItemTags', type: 'string' },
                    { name: 'IssueTitle', type: 'string' },
                    { name: 'IssueDesc', type: 'string' },
                    { name: 'IssueSince', type: 'date' },
                    { name: 'LogDate', type: 'date' },
                    { name: 'ResolutionDate', type: 'date' },
                    { name: 'ClosureDate', type: 'date' },
                    { name: 'ClosureRemarks', type: 'string' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var adapter = new $.jqx.dataAdapter(source);
            var buildFilterPanel = function (filterPanel, datafield) {
                var textInput = $("<input style='margin:5px;'/>");
                var applyinput = $("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");
                var filterbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 2px;">Filter</span>');
                applyinput.append(filterbutton);
                var filterclearbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 5px;">Clear</span>');
                applyinput.append(filterclearbutton);
                filterPanel.append(textInput);
                filterPanel.append(applyinput);
                filterbutton.jqxButton({ height: 20 });
                filterclearbutton.jqxButton({ height: 20 });
                var dataSource =
                {
                    localdata: adapter.records,
                    datatype: "array",
                    async: false
                }
                var dataadapter = new $.jqx.dataAdapter(dataSource,
                {
                    autoBind: false,
                    autoSort: true,
                    autoSortField: datafield,
                    async: false,
                    uniqueDataFields: [datafield]
                });
                var column = $("#jqxSystemFaultsGrid").jqxGrid('getcolumn', datafield);
                textInput.jqxInput({ placeHolder: "Enter " + column.text, popupZIndex: 9999999, displayMember: datafield, source: dataadapter, height: 23, width: 175 });
                textInput.keyup(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterbutton.click(function () {
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = textInput.val();
                    var filtercondition = 'contains';
                    var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter1);
                    // add the filters.
                    $("#jqxSystemFaultsGrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxSystemFaultsGrid").jqxGrid('applyfilters');
                    $("#jqxSystemFaultsGrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxSystemFaultsGrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxSystemFaultsGrid").jqxGrid('applyfilters');
                    $("#jqxSystemFaultsGrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
            $("#jqxSystemFaultsGrid").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>System Faults</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add New Fault</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Update / Close Fault Data</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete Fault</span></div>");
                    var EndFaultButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-stop' aria-hidden='true'></span> Close Fault</span></div>");

                    container.append(tableHeading);
                    container.append(addButton);
                    container.append(editButton);
                    container.append(deleteButton);
                    //container.append(EndFaultButton);

                    statusbar.append(container);
                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    editButton.jqxButton({ height: 20 });
                    deleteButton.jqxButton({ height: 20 });
                    //EndFaultButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        AddSystemFault();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        DeleteSystemFault(selectedRowId);
                    });

                    // End Batch.
                    //EndFaultButton.click(function (event) {
                    //    EndBatch(selectedRowId);
                    //});
                },
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxSystemFaultsGrid").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                    { text: 'FaultID', datafield: 'UniqueID', width: '4%' },
                    { text: 'ItemGroup', datafield: 'ItemGroup', filtertype: 'checkedlist', width: '7%' },
                    { text: 'ItemTags', datafield: 'ItemTags', filtertype: 'checkedlist', width: '7%' },
                    { text: 'IssueTitle', datafield: 'IssueTitle', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '12%' },
                    { text: 'IssueDesc', datafield: 'IssueDesc', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '32%' },
                    { text: 'IssueSince', datafield: 'IssueSince', filtertype: 'date', width: '7%', cellsformat: 'dd-MMM-yy HH:mm' },
                    { text: 'LogDate', datafield: 'LogDate', filtertype: 'date', width: '7%', cellsformat: 'dd-MMM-yy HH:mm' },
                    { text: 'ResolutionDate', datafield: 'ResolutionDate', filtertype: 'date', width: '7%', cellsformat: 'dd-MMM-yy HH:mm' },
                    { text: 'ClosureDate', datafield: 'ClosureDate', filtertype: 'date', width: '7%', cellsformat: 'dd-MMM-yy HH:mm' },
                    { text: 'ClosureRemarks', datafield: 'ClosureRemarks', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '10%' },
                ]
            });

            $("#jqxSystemFaultsGrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxSystemFaultsGrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxSystemFaultsGrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxSystemFaultsGrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    selectedRowRef = selectedRowData["UniqueID"] + " (" + selectedRowData["StartDateTIme"] + ")";
                    BatchEndedDone = (selectedRowData["EndDateTime"] != null || selectedRowData["EndDateTime"] != undefined);
                    PostDone = (selectedRowData["RespCode"] != 'Y');
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function AddSystemFault() {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/AddSystemFaultView",
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
    else {
        $.ajax({
            type: "GET",
            url: "/AlarmsAndEvents/EditSystemFaultView?BatchID=" + Id,
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

function DeleteSystemFault(Id) {
    var activityName = "Delete an existing MFM Batch";
    var activityDetail = "Batch: " + Id + "";
    var ResolutionDate = $('#dtpResolutionDate').val();
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete"); return;
    }
    else if (ResolutionDate != null && ResolutionDate != undefined && ResolutionDate != '') {
        alertDismissable("danger", "Cannot delete a fault that has been resolved"); return;
    }
    else {
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
                        DeleteSystemFaultDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteSystemFaultDo(Id); }, activityName, activityDetail);
                    }
                }
            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function DeleteSystemFaultDo(Id) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/DeleteSystemFaultObj?UniqueID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('AlarmsAndEvents/SystemFaults', 'Index');
            }
        }
    });
}

function EndBatch(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to End Batch"); return;
    }
    else if (BatchEndedDone == true) {
        alertDismissable("danger", "The Batch is already ended."); return;
    }
    else {
        var activityName = "End an existing MFM Batch";
        var activityDetail =  selectedRowRef;
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
                        EndBatchDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { EndBatchDo(Id); }, activityName, activityDetail);
                    }
                }
            });
            $('#confirmModal').modal('hide');
            $('#myConfirmMsg').html("<p>Are you sure ?</p>");
        });
    }
}

function EndBatchDo(Id) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/EndSystemFault?UniqueID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('AlarmsAndEvents/SystemFaults', 'Index');
            }
        }
    });
}
