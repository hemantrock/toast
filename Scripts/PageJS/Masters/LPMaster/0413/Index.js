var selectedRowId, selectedRowRef, bayId, BCNo, GridWidth = "1250px", HideCleanStart = true;

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/LPMaster/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'BayID', type: 'number' },
                    { name: 'ArmNo', type: 'number' },
                    { name: 'LoadingPointNo', type: 'number' },
                    { name: 'BCNo', type: 'number' },
                    { name: 'ProductNames', type: 'string' },
                    { name: 'LPStatus', type: 'bool' },
                    { name: 'ToDoFlushing', type: 'bool' },
                    { name: 'FlushingQty', type: 'number' },
                    { name: 'AcuID', type: 'number' },
                    { name: 'LoadingType', type: 'string' },
                    { name: 'LoadPurposeDesc', type: 'string' },
                ],
                localdata: data,
                //id: "UniqueID"
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

            var cellsrendererClearStart = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                LoadingPointNo = selectedRowData["LoadingPointNo"];
                return '<div onclick="ClearStart(' + LoadingPointNo + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
            }

            $("#jqxgrid").jqxGrid(
            {
                width: "1250px",
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Loading Point Master</span></div>");
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
                        OpenAddLPs();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId, selectedRowRef);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteLPs(selectedRowId);
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
                  { text: 'BayID', datafield: 'BayID', width: "6%", filtertype: 'checkedlist', cellsalign: 'center' },
                  { text: 'ArmNo', datafield: 'ArmNo', filtertype: 'checkedlist', width: "6%", cellsalign: 'center' },
                  { text: 'LP No', datafield: 'LoadingPointNo', width: "6%", cellsalign: 'center' },
                  { text: 'BC No', datafield: 'BCNo', width: "6%", cellsalign: 'center' },
                  { text: 'Products', datafield: 'ProductNames', width: "35%" },
                  { text: 'LP Enabled', datafield: 'LPStatus', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "7%" },
                  { text: 'PigEnabled', datafield: 'ToDoFlushing', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "8%" },
                  { text: 'PiggingQty', datafield: 'FlushingQty', width: "8%", cellsalign: 'center' },
                  { text: 'Loading Type', datafield: 'LoadingType', filtertype: 'checkedlist', width: "10%", cellsalign: 'center' },
                  { text: 'Purpose', datafield: 'LoadPurposeDesc', filtertype: 'checkedlist', width: "8%", cellsalign: 'center' },
                  { text: 'Clean Start', width: "5%", cellsalign: 'center', cellsrenderer: cellsrendererClearStart, hidden: HideCleanStart },
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
                    selectedRowId = selectedRowData["LoadingPointNo"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["LoadingPointNo"];
                    selectedRowRef = selectedRowData["LoadingPointNo"] + " (Bay: " + selectedRowData["BayID"] + "; Arm: " + selectedRowData["ArmNo"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});


function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteBays(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function BindSpanFlush() {
    if ($('.spanFlush').parent('td').is(':visible')) {
        $('.spanFlush').on("click", function (e) {
            $('#myConfirmMsg').html("<p>Are you sure to FORCE FLUSH?</p>");
            $('#confirmModal').modal('show');
            $('#confirmModal').draggable({handle: ".modal-header"});
            cancelBubble(e);
            $("#btnConfirmOK").unbind('click');
            $("#btnConfirmOK").on("click", function () {
                $(".modal-backdrop").slideUp('slow');
                $('#confirmModal').modal('hide');
                $.ajax({
                    type: "GET",
                    url: "/LPMaster/ForceFlush?Id=" + Id,
                    cache: false,
                    success: function (result) {
                        alertDismissable(result.strType, result.strMessage);
                        if (result.blnStatus == true) {
                            OpenLPMasterMenu();
                        }
                    }
                });
            });
        });
    }
}

function OpenAddLPs() {
    $.ajax({
        type: "GET",
        url: "/LPMaster/Add",
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
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/LPMaster/Edit?Id=" + Id,
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

function deleteLPs(Id) {
    var activityName = "Delete existing Loading Point";
    var activityDetail = "Loading Point No: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Loading Point  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteLPsDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteLPsDo(Id); }, activityName,activityDetail);
                    }
                }
            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteLPsDo(Id) {

    $.ajax({
        type: "GET",
        url: "/LPMaster/Delete?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLPMasterMenu();
            }
        }
    });
}

function ClearStart(LoadingPointNo) {

    $('#myConfirmMsg').html("<p>Are you sure to you want to clean start LP?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({handle: ".modal-header"});
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        var activityName = "Clean Start an LP Loop";
        var activityDetail = "LP: " + LoadingPointNo;
        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    ClearStartDo(LoadingPointNo);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ClearStartDo(LoadingPointNo); }, activityName, activityDetail);
                }
            }
        });
    });
}

function ClearStartDo(LoadingPointNo) {
    $.ajax({
        type: "GET",
        url: "/LPMaster/UpdateBCLastStep?LoadingPointNo=" + LoadingPointNo,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}