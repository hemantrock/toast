var selectedRowId, selectedRowRef;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/TTBypass/GetTTBypassData",
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
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNo', type: 'string' },
                    { name: 'Stage', type: 'string' },
                    { name: 'Type', type: 'string' },
                    { name: 'StartTime', type: 'date' },
                    { name: 'EndTime', type: 'date' }
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
            $("#jqxgrid").jqxGrid(
            {
                width: "750px",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: iGblNoRows,
                //showfilterrow: true,
                pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                //autoloadstate: true,
                //autosavestate: true,
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Truck Bypass List</span></div>");
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
                        OpenAddTTBypass();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        DeleteTTBypass(selectedRowId);
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
                    { text: 'UniqueID', datafield: 'UniqueID', width: '0%', hidden: true },
                    { text: 'TruckID', datafield: 'TruckID', width: '0%', hidden: true },
                    { text: 'TruckNo', datafield: 'TruckNo', width: '20%', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }},
                    { text: 'CardNo', datafield: 'CardNo', width: '14%', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }},
                    { text: 'Stage', datafield: 'Stage', filtertype: 'checkedlist', width: '8%' },
                    { text: 'Type', datafield: 'Type', filtertype: 'checkedlist', width: '14%' },
                    { text: 'StartTime', datafield: 'StartTime', filtertype: 'date', width: '22%', cellsformat: 'dd-MMM-yy HH:mm' },
                    { text: 'EndTime', datafield: 'EndTime', filtertype: 'date', width: '22%', cellsformat: 'dd-MMM-yy HH:mm' }
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
                    selectedRowId = selectedRowData["UniqueID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    selectedRowRef = selectedRowData["TruckNo"] + ", " + selectedRowData["Stage"] + " (" + selectedRowData["Type"] +")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function OpenAddTTBypass() {
    $.ajax({
        type: "GET",
        url: "/TTBypass/AddTTBypassView",
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
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/TTBypass/EditTTBypassView?UniqueID=" + Id,
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

function DeleteTTBypass(Id) {
    var activityName = "Delete an existing Truck Bypass";
    var activityDetail = "Truck: " + selectedRowRef ;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete The TT Bypass: " + selectedRowRef + "?</p>");
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
                        DeleteTTBypassDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteTTBypassDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function DeleteTTBypassDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTBypass/DeleteTTBypassObj?UniqueID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenViewPath('Masters/TTBypass', 'Index');
            }
        }
    });
}