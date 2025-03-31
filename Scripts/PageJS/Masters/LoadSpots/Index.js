var selectedRowId, selectedRowRef;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/LoadSpot/LoadSpotData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'LSID', type: 'number' }, 
                    { name: 'BCU_ID', type: 'number' },
                    { name: 'SpurNo', type: 'number' },
                    { name: 'ClusterNo', type: 'number' },
                    { name: 'BCUNo', type: 'number' },
                    { name: 'BCUName', type: 'string' },
                    { name: 'ProdNameShort', type: 'string' },
                    { name: 'LoadSpotNo', type: 'number' },
                    { name: 'LAPSBypass', type: 'bool' },
                    { name: 'OverspillBypass', type: 'bool' },
                    { name: 'EarthBypass', type: 'bool' },
                    { name: 'BCUEnabled', type: 'bool' },
                    { name: 'LSEnable', type: 'bool' },
                ],
                localdata: data,
                id: "LSID"
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
                    width: "1000px",
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
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Load Spot Master</span></div>");
                        //var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        //var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                        container.append(tableHeading);
                        //container.append(addButton);
                        container.append(editButton);
                        //container.append(deleteButton);

                        statusbar.append(container);
                        //addButton.jqxButton({ height: 20 });
                        editButton.jqxButton({ height: 20 });
                        //deleteButton.jqxButton({ height: 20 });

                        // add new row.
                    //    addButton.click(function (event) {
                    //        OpenAddBatchController();
                    //    });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
                        });

                    //    // delete Row.
                    //    deleteButton.click(function (event) {
                    //        deleteBatchController(selectedRowId, event);
                    //    });
    
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
                        { text: 'LS-ID', datafield: 'LSID', width: '7%', cellsalign: 'center' },
                        { text: 'BCU-ID', datafield: 'BCU_ID', width: '7%', cellsalign: 'center' },
                        { text: 'Spur', datafield: 'SpurNo', filtertype: 'checkedlist', width: '7%', cellsalign: 'center' },
                        { text: 'Cluster', datafield: 'ClusterNo', filtertype: 'checkedlist', width: '7%', cellsalign: 'center' },
                        { text: 'BCUNo', datafield: 'BCUNo', filtertype: 'checkedlist', width: '7%', cellsalign: 'center' },
                        { text: 'BCUName', datafield: 'BCUName', filtertype: 'checkedlist', width: '0%', hidden: true, cellsalign: 'center' },
                        { text: 'Product', datafield: 'ProdNameShort', filtertype: 'checkedlist', width: '7%', cellsalign: 'center' },
                        { text: 'LSNo', datafield: 'LoadSpotNo', filtertype: 'checkedlist', width: '7%', cellsalign: 'center' },
                        { text: 'LAPS Bypass', datafield: 'LAPSBypass', filtertype: 'checkedlist', width: '10%', threestatecheckbox: true, columntype: 'checkbox' },
                        { text: 'OVSP Bypass', datafield: 'OverspillBypass', filtertype: 'checkedlist', width: '10%', threestatecheckbox: true, columntype: 'checkbox' },
                        { text: 'Earth Bypass', datafield: 'EarthBypass', filtertype: 'checkedlist', width: '11%', threestatecheckbox: true, columntype: 'checkbox' },
                        { text: 'BCU Enabled', datafield: 'BCUEnabled', filtertype: 'checkedlist', width: '10%', threestatecheckbox: true, columntype: 'checkbox' },
                        { text: 'LS Enable', datafield: 'LSEnable', filtertype: 'checkedlist', width: '10%', threestatecheckbox: true, columntype: 'checkbox' },
                    ]
                });

            //// clear the filtering.
            //$('#clearfilteringbutton').click(function () {
            //    $("#jqxgrid").jqxGrid('clearfilters');
            //});

            //// show/hide filter background
            //$('#filterbackground').on('change', function (event) {
            //    $("#jqxgrid").jqxGrid({ showfiltercolumnbackground: event.args.checked });
            //});

            //// show/hide filter icons
            //$('#filtericons').on('change', function (event) {
            //    $("#jqxgrid").jqxGrid({ autoshowfiltericon: !event.args.checked });
            //});

            $("#jqxgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["LSID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["LSID"];
                    selectedRowRef = selectedRowData["LoadSpotNo"] + " (" + selectedRowData["BCUName"] + "-" + selectedRowData["ProdNameShort"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function EditRecord(LSID) {
    if (LSID == undefined) {
        alertDismissable("danger", "Please select the row you want to Edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/LoadSpot/Edit?LoadSpotID=" + LSID,
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

