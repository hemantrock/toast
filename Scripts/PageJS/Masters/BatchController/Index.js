var selectedRowId, selectedRowRef;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/BatchController/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'BCNo', type: 'number' },
                    { name: 'BCName', type: 'string' },
                    { name: 'BCMake', type: 'string' },
                    { name: 'Model', type: 'string' },
                    { name: 'FirmwareVer', type: 'string' },
                    { name: 'ESDBypass', type: 'bool' },
                    { name: 'ServiceName', type: 'string' },
                    { name: 'KFactChanged', type: 'bool' },
                    { name: 'SlaveID', type: 'string' },
                    { name: 'Count', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var renderer = function (id) {
                return '<input type="button" onClick="buttonclick(event)" class="gridButton" id="btn' + id + '" value="Delete Row"/>'
            }

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
                var column = $("#jqxgrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                    $("#jqxgrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxgrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                    $("#jqxgrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            var cellsrendererBC = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                BCNo = selectedRowData["BCNo"];

                if (value) {
                    return '<div onclick="AckKFactBC(' + BCNo + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span class="glyphicon glyphicon-check clickable spanAck" style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"></span></div>';
                }
                else {
                    return '<div style="text-align: center;"><span></span></div>';
                }

            }
            $("#jqxgrid").jqxGrid(
                {
                    width: "1100px",
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
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Batch Controller Master</span></div>");
                        var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                        container.append(tableHeading);
                        container.append(addButton);
                        container.append(editButton);
                        container.append(deleteButton);

                        statusbar.append(container);
                        addButton.jqxButton({ height: 20 });
                        editButton.jqxButton({ height: 20 });
                        deleteButton.jqxButton({ height: 20 });

                        // add new row.
                        addButton.click(function (event) {
                            OpenAddBatchController();
                        });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
                        });

                        // delete Row.
                        deleteButton.click(function (event) {
                            deleteBatchController(selectedRowId, event);
                        });

                    },
                    ready: function () {
                    },
                    autoshowfiltericon: true,
                    columnmenuopening: function (menu, datafield, height) {
                        var column = $("#jqxgrid").jqxGrid('getcolumn', datafield);
                        if (column.filtertype === "custom") {
                            menu.height(155);
                            setTimeout(function () {
                                menu.find('input').focus();
                            }, 25);
                        }
                        else menu.height(height);
                    },
                    columns: [

                        { text: 'BCNo', datafield: 'BCNo', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'BCName', datafield: 'BCName', width: "8%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'BCMake', datafield: 'BCMake', width: "12%", filtertype: 'checkedlist', cellsalign: 'center' },
                        { text: 'Model', datafield: 'Model', width: "20%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'Firmware', datafield: 'FirmwareVer', width: "10%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, cellsalign: 'center' },
                        { text: 'Service', datafield: 'ServiceName', width: "15%", filtertype: 'checkedlist', cellsalign: 'center' },
                        { text: 'Ack KFac', datafield: 'KFactChanged', width: "6%", cellsrenderer: cellsrendererBC, cellsalign: 'center' },
                        { text: 'ESD Bypass', datafield: 'ESDBypass', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "10%", editable: false },
                        //{ text: 'LoopNo', datafield: 'LoopNo', width: "7%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'SlaveID', datafield: 'SlaveID', width: "7%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: '#Arms', datafield: 'Count', width: "7%", cellsalign: 'center', filtertype: 'checkedlist' },
                    ]
                });

            // trigger the column resized event.
            //$("#jqxgrid").on('columnresized', function (event) {
            //    var column = event.args.columntext;
            //    var newwidth = event.args.newwidth
            //    var oldwidth = event.args.oldwidth;
            //    //$("#eventlog").text("Column: " + column + ", " + "New Width: " + newwidth + ", Old Width: " + oldwidth);
            //});

            // clear the filtering.
            $('#clearfilteringbutton').click(function () {
                $("#jqxgrid").jqxGrid('clearfilters');
            });

            // show/hide filter background
            $('#filterbackground').on('change', function (event) {
                $("#jqxgrid").jqxGrid({ showfiltercolumnbackground: event.args.checked });
            });

            // show/hide filter icons
            $('#filtericons').on('change', function (event) {
                $("#jqxgrid").jqxGrid({ autoshowfiltericon: !event.args.checked });
            });

            $("#jqxgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    selectedRowRef = selectedRowData["BCName"] + " (" + selectedRowData["BCNo"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function BindSpanAck() {
    $('.spanAck').on("click", function (e) {
        var Id = $(this).data('id');
        $('#myPasswordLabel').html('Confirm Acknowledge K Factor');
        $('#myPasswordModal').modal('show');
        $("#btnPwdOK").unbind('click');
        $("#btnPwdOK").on("click", function () {
            ConfirmPasswordKFactor(Id);
            $('#Pwd_txtPassword').text(''); $('#Pwd_txtPassword').val('');
        });
        cancelBubble(e);
    });
}

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteBatchController(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddBatchController() {
    alertDismissable("danger", "This function is not enabled."); return;
    $.ajax({
        type: "GET",
        url: "/BatchController/Add",
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
    $.ajax({
        type: "GET",
        url: "/BatchController/Edit?Id=" + Id,
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

function deleteBatchController(Id, e) {
    var activityName = "Delete Existing Batch Controller";
    var activityDetail = "Batch Controller: " + selectedRowRef;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Batch Controller  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteBatchControllerDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteBatchControllerDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteBatchControllerDo(Id) {
    $.ajax({
        type: "GET",
        url: "/BatchController/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBatchControllerMenu();
            }
        }
    });
}

function AckKFactBC(Id) {
    var activityName = "Ack K Factor";
    var activityDetail = "Meter: " + selectedRowRef;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AckKFactBCDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AckKFactBCDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function AckKFactBCDo(Id) {

    $.ajax({
        type: "GET",
        url: "/BatchController/KFactorAck?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBatchControllerMenu();
            }
        }
    });
}