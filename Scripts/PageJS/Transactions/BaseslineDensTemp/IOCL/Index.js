var selectedRowId, selectedRowRef, selectedRowType;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/BaselineDensTemp/IndexData",
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
                    { name: 'BaselineDT', type: 'date' },
                    { name: 'Density', type: 'number' },
                    { name: 'MeterIDs', type: 'string' },
                    { name: 'TempIDs', type: 'string' },
                    { name: 'ObsTempSrc', type: 'string' },
                    { name: 'StdDensSrc', type: 'string' },
                    { name: 'Mode', type: 'string' },
                    { name: 'ProductCode', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'UserName', type: 'string' },
                    { name: 'Temp', type: 'number' },
                    { name: 'SamplingStart', type: 'date' },
                    { name: 'SamplingEnd', type: 'date' }
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
                width: "700px",
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Baseline Density & Temperature</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                    container.append(tableHeading);
                    container.append(addButton);
                    //container.append(editButton);
                    //container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    editButton.jqxButton({ height: 20 });
                    deleteButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        OpenAddBaseTempDensity();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteBaseTempDensity(selectedRowId);
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
                  { text: 'UniqueID', datafield: 'UniqueID', hidden:true },
                  { text: 'Baseline Date Time', datafield: 'BaselineDT', filtertype: 'date', width: "220px", cellsformat: 'dd-MMM-yyyy HH:mm' },
                  { text: 'Product Code', datafield: 'ProductCode', width: "120px", filtertype: 'checkedlist' },
                  { text: 'Product Name', datafield: 'ProductName', width: "180px", filtertype: 'checkedlist' },
                  { text: 'Std.Density 15°C(kg/m³) ', datafield: 'Density', width: "180px" },
                  //{ text: 'Temp ºC', datafield: 'Temp', width: "8%" },
                  //{ text: 'ObsTempSrc', datafield: 'ObsTempSrc', hidden: true },
                  //{ text: 'StdDensSrc', datafield: 'StdDensSrc', hidden: true },
                  //{ text: 'Mode', datafield: 'Mode', cellsalign: 'center', width: "8%", filtertype: 'checkedlist' },
                  //{ text: 'User Name', datafield: 'UserName', width: "10%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  //{ text: 'Sampling Start', datafield: 'SamplingStart', width: "12%", filtertype: 'date', cellsformat: 'dd-MMM-yyyy HH:mm' },
                  //{ text: 'Sampling End', datafield: 'SamplingEnd', width: "12%", filtertype: 'date', cellsformat: 'dd-MMM-yyyy HH:mm' },
                  //{ text: 'MeterIDs', datafield: 'MeterIDs', cellsalign:'center', width: "10%" },
                  //{ text: 'TempIDs', datafield: 'TempIDs', cellsalign:'center', width: "10%" },
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
            //$("#jqxgrid").on('rowdoubleclick', function (event) {
            //    
            //    console.log(event.args.datafield);
            //    if (event.args.rowindex >= 0 && event.args.columnindex >=0) {
            //        var cell = $('#jqxgrid').jqxGrid('getcell', rowindex, (columnindex).toString());
            //        var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
            //        selectedRowId = selectedRowData["uid"];
            //        selectedRowType = selectedRowData["Mode"];
            //        EditRecord(selectedRowId, selectedRowType);
            //    }

            //});

            $('#jqxgrid').on('celldoubleclick', function (event) {
                
                var datafield = event.args.datafield;
                if (datafield == "MeterIDs") {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    var MeterIDs = selectedRowData["MeterIDs"];
                    if (MeterIDs == null || MeterIDs == undefined || MeterIDs == "") { alertDismissable("danger", "No Data available"); return; }
                    ShowChart("MFM_STD_DENS_", MeterIDs, selectedRowData["SamplingStart"], selectedRowData["SamplingEnd"]);
                }
                else if (datafield == "TempIDs") {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    var TempIDs = selectedRowData["TempIDs"];
                    var TempPrefix;
                    if (selectedRowData["ObsTempSrc"] == "MFM") { TempPrefix = "MFM_TEMP_"; } else { TempPrefix = "TEMP_"; }
                    if (TempIDs == null || TempIDs == undefined || TempIDs == "") { alertDismissable("danger", "No Data available"); return; }
                    ShowChart(TempPrefix, TempIDs, selectedRowData["SamplingStart"], selectedRowData["SamplingEnd"]);
                }
                else if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    selectedRowType = selectedRowData["Mode"];
                    EditRecord(selectedRowId, selectedRowType);
                }

            });
            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    selectedRowType = selectedRowData["Mode"];
                    selectedRowRef = selectedRowData["BaselineDT"] + "(" + selectedRowData["Mode"] + ")";
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
            deleteBaysMaster(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddBaseTempDensity() {
    $.ajax({
        type: "GET",
        url: "/BaselineDensTemp/Add",
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

function ShowChart(Prefix, TagIDs, StartDT, EndDT) {
    $.ajax({
        url: "/BaselineDensTemp/GetMeterTags",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify({"Prefix": Prefix, "TagIDs": TagIDs }),
        success: function (result) {
            
            $('#chartModal').modal('show');
            $('#goButton').unbind('click');
            setTimeout(drawChart(result, StartDT, EndDT, false, null), 200);
            var strChart = "<div class='chartModal-chart' id='main'></div>";
            $('#chartModal').on('hidden.bs.modal', function () {
                $('#chartModalBody').html(strChart);
            });
        }
    });
}

function EditRecord(Id, selectedRowType) {
    alertDismissable("danger", "Edit feature is disabled. Please add a new Baseline Density"); return;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/BaselineDensTemp/Edit?Id=" + Id,
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

function deleteBaseTempDensity(Id) {
    var activityName = "Delete Existing Manual Density & Temp";
    var activityDetail = "Bay: " + selectedRowRef;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Bay Master  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteBaseTempDensityDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteBaseTempDensityDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteBaseTempDensityDo(Id) {
    $.ajax({
        type: "GET",
        url: "/BaselineDensTemp/Delete?Id=" + Id,
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaysMasterMenu();
            }
        }
    });
}
