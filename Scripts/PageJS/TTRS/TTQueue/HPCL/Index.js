var objTbl, RegSource, FailSource, toggleTimeout;
//$(document).ready(function () {
//    clearTimeout(gblTimeout);
//    gblTimeout = setTimeout(function () { refreshTTQ(); }, 15000);
//    createTTQDataTable();
//    opcPageName = "TTQueue";
//    opc.server.addToGroup(opcPageName);
//});

var selectedRowId, selectedRowRef;

$(document).ready(function () {
    $.when(getRegisteredTTs(), getFailedTTs()).then(function () {
        clearTimeout(gblTimeout);
        gblTimeout = setTimeout(function () { RefreshTTData(); }, 15000);
    }, function () { console.log('ajax error in GettingTTQData'); });

    clearTimeout(toggleTimeout);
    toggleTimeout = setTimeout(function () { ToggleTTQTabs(); }, 10000);

    //opcPageName = "TTRSQueue";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    $('.js-basic-single').select2();
});

function getRegisteredTTs() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexRegistered",
        cache: false,
        global: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            RegSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'date' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'string' },
                    { name: 'Ack', type: 'bool' },
                    { name: 'Del', type: 'bool' },
                    { name: 'BayNo', type: 'number' },
                    { name: 'Destination', type: 'string' },
                    { name: 'EstFANTime', type: 'date' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var renderer = function (id) {
                return '<input type="button" onClick="buttonclick(event)" class="gridButton" id="btn' + id + '" value="Delete Row"/>'
            }

            var adapter = new $.jqx.dataAdapter(RegSource);
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
                var column = $("#jqxRegistered").jqxGrid('getcolumn', datafield);
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
                    $("#jqxRegistered").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxRegistered").jqxGrid('applyfilters');
                    $("#jqxRegistered").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxRegistered").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxRegistered").jqxGrid('applyfilters');
                    $("#jqxRegistered").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
            var numberrenderer = function (row, column, value) {
                return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
            }
            var cellsrendererDelete = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxRegistered').jqxGrid('getrowdata', row);
                TruckID = selectedRowData["TruckID"];
                if (value != true) {
                    return '<div style="text-align: center;"><span></span></div>';
                }
                else {
                    return '<div onclick="DeleteTruckFromQueue(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-remove clickable spanDelete"></span></div>';
                }
            }
            var cellsrendererPost = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxRegistered').jqxGrid('getrowdata', row);
                if (value != true) {
                    PostCode = selectedRowData["PostedStatusCode"];
                    return '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">' + PostCode + '</div>';
                }
                else {
                    TruckID = selectedRowData["TruckID"];
                    return '<div onclick="PostTruckToJDE(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
                }
            }

            $("#jqxRegistered").jqxGrid(
                {
                    width: "100%", //width: "1200px",
                    source: adapter,
                    columnsresize: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: iGblNoRows,
                    pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                    autoheight: true,
                    showtoolbar: false,
                    // code by hemant
                    filterbarmode: 'simple',
                    showfilterbar: true,
                    // code by hemant                    
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Registered Trucks</span></div>");
                        //var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        //var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        //var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");
                        // code by hemant
                        var searchInput = $('<div style="float:right; display: flex; height: 25px; margin-top: 5px; align-items: center; position: relative; margin-left: 4px; " class="jqx-rc-all jqx-widget jqx-input-group"><div style="position: relative; margin-right: 4px; margin-left: 4px; float: left; ">Search:</div><input style="width: 200px; height: 100%; direction: ltr; " role="textbox" type="text" id="jqxcustomSearch" class="jqx-input jqx-rc-l jqx-input-group-addon jqx-widget jqx-widget-content"><div style="cursor: pointer; height: 100%; padding-top: 5px !important; " class="jqx-fill-state-normal jqx-rc-r jqx-input-group-addon"><div id="jqx-searchBtnIcon" class="jqx-icon-search"></div></div><div style="float: left; width: 16px; height: 16px; position: relative; margin: 3px; visibility:hidden; " title="Clear" class="jqx-icon-close jqxCustomclear"></div></div>');
                        //code by hemant


                        container.append(tableHeading);
                        //container.append(addButton);
                        //container.append(deleteButton);

                        statusbar.append(container);
                        container.append(searchInput);

                        // code by hemant                    
                        // setTimeout(function () {
                        //     $("#filterjqxgrid").hide();
                        // }, 100);
                        // setTimeout(function () {
                        //     $("#contentjqxRegistered").css("top", "36px");
                        // }, 100);
                        // code by hemant                        
                        //addButton.jqxButton({ height: 20 });
                        //deleteButton.jqxButton({ height: 20 });

                        // add new row.
                        //addButton.click(function (event) {
                        //    OpenAddNewTruckinTTQueue();
                        //});

                        // edit Row.
                        //editButton.click(function (event) {
                        //    EditRecord(selectedRowId);
                        //});

                        // delete Row.
                        //deleteButton.click(function (event) {
                        //    DeleteTruckFromQueue(selectedRowId);
                        //});
                    },
                    ready: function () {
                        PageSize = adapter.records.length;
                        if (PageSize > iGblNoRows || PageSize < 1) { PageSize = iGblNoRows; }
                        $("#jqxRegistered").jqxGrid({ pagesize: PageSize });
                        $("#jqxRegistered").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                    },
                    autoshowfiltericon: true,
                    columnmenuopening: function (menu, datafield, height) {
                        var column = $("#jqxRegistered").jqxGrid('getcolumn', datafield);
                        if (column.filtertype === "custom") {
                            menu.height(155);
                            setTimeout(function () {
                                menu.find('input').focus();
                            }, 25);
                        }
                        else menu.height(height);
                    },
                    columns: [
                        { text: 'TruckID', dataField: 'TruckID', width: "0%", hidden: true },
                        { text: 'SNO', dataField: '', columntype: 'number', width: "5%", cellsalign: 'center', cellsrenderer: numberrenderer },
                        { text: 'Truck No.', datafield: 'TruckNo', width: "12%", cellsalign: 'center', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'Card No', datafield: 'CardNumber', width: "8%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'Reg/Rep DateTime', datafield: 'RepDateTime', width: "15%", cellsalign: 'left', filtertype: 'date', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                        { text: 'Truck Status', datafield: 'TruckStatusDesc', width: "25%", cellsalign: 'left', filtertype: 'checkedlist' },
                        { text: 'BayNo', datafield: 'BayNo', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'Destination', datafield: 'Destination', width: "15%" },
                        { text: 'EstFANTime', datafield: 'EstFANTime', width: "15%", cellsalign: 'left', filtertype: 'date', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                        //{ text: 'Remarks', datafield: 'Remarks', width: "35%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                    ]
                });

            $("#jqxRegistered").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxRegistered').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxRegistered").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxRegistered').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    selectedRowRef = selectedRowData["TruckNo"] + " (" + selectedRowData["CardNumber"] + ")";
                }
            });
            // code by hemant
            $("#jqxcustomSearch").on("keyup", function (event) {
                let searchText = $(this).val();
                if (searchText.length) {
                    $('.jqxCustomclear').css('visibility', 'visible');
                    $('.jqx-input-group-addon').val(searchText);//.click();
                } else {
                    $('.jqxCustomclear').css('visibility', 'hidden');
                }
                if (event.keyCode == 27) {
                    $(this).val('');
                    $('.jqx-icon-close').css('visibility', 'hidden');
                    $('.jqx-icon-close').eq(1).click();
                }
                if (event.keyCode == 13) {
                    $('.jqx-input-group-addon').val(searchText).click();
                }
                // setTimeout(function () {
                //     $("#contentjqxRegistered").css("top", "36px");
                // }, 50);

            });
            // $('.jqxCustomclear').click(function () {
            //     $('.jqx-icon-close').eq(1).click();
            // })
            $('.jqxCustomclear').click(function () {
                $('.jqx-icon-close').eq(1).click();
                let inputField = $(this).siblings('input'); // Select the sibling input field
                let clearIcon = $(this).siblings('.jqx-icon-close'); // Select the sibling clear icon
            
                inputField.val(''); // Clear the input field
                clearIcon.hide(); // Hide the clear icon
                // setTimeout(function () {
                //     $("#contentjqxRegistered").css("top", "36px");
                // }, 50);
            });
            $('#jqx-searchBtnIcon').click(function () {
                let searchText = $("#jqxcustomSearch").val();
                $('.jqx-input-group-addon').val(searchText).click();
                // setTimeout(function () {
                //     $("#contentjqxRegistered").css("top", "36px");
                // }, 50);
            })
            //code by hemant
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function getFailedTTs() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexFailed",
        cache: false,
        global: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            FailSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'date' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'string' },
                    { name: 'Ack', type: 'bool' },
                    { name: 'Del', type: 'bool' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var renderer = function (id) {
                return '<input type="button" onClick="buttonclick(event)" class="gridButton" id="btn' + id + '" value="Delete Row"/>'
            }

            var adapter = new $.jqx.dataAdapter(FailSource);
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
                var column = $("#jqxFailedTTs").jqxGrid('getcolumn', datafield);
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
                    $("#jqxFailedTTs").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxFailedTTs").jqxGrid('applyfilters');
                    $("#jqxFailedTTs").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxFailedTTs").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxFailedTTs").jqxGrid('applyfilters');
                    $("#jqxFailedTTs").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
            var numberrenderer = function (row, column, value) {
                return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
            }
            var cellsrendererDelete = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxFailedTTs').jqxGrid('getrowdata', row);
                TruckID = selectedRowData["TruckID"];
                if (value != true) {
                    return '<div style="text-align: center;"><span></span></div>';
                }
                else {
                    return '<div onclick="DeleteTruckFromQueue(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-remove clickable spanDelete"></span></div>';
                }
            }
            var cellsrendererPost = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxFailedTTs').jqxGrid('getrowdata', row);
                if (value != true) {
                    PostCode = selectedRowData["PostedStatusCode"];
                    return '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">' + PostCode + '</div>';
                }
                else {
                    TruckID = selectedRowData["TruckID"];
                    return '<div onclick="PostTruckToJDE(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
                }
            }

            $("#jqxFailedTTs").jqxGrid(
                {
                    width: "100%", //width: "1500px",
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
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Failed Trucks (R1)</span></div>");
                        //var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        //var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        //var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                        container.append(tableHeading);
                        //container.append(addButton);
                        //container.append(deleteButton);

                        statusbar.append(container);
                        //addButton.jqxButton({ height: 20 });
                        //deleteButton.jqxButton({ height: 20 });

                        // add new row.
                        //addButton.click(function (event) {
                        //    OpenAddNewTruckinTTQueue();
                        //});

                        // edit Row.
                        //editButton.click(function (event) {
                        //    EditRecord(selectedRowId);
                        //});

                        // delete Row.
                        //deleteButton.click(function (event) {
                        //    DeleteTruckFromQueue(selectedRowId);
                        //});
                    },
                    ready: function () {
                        PageSize = adapter.records.length;
                        if (PageSize > iGblNoRows || PageSize < 1) { PageSize = iGblNoRows; }
                        $("#jqxFailedTTs").jqxGrid({ pagesize: PageSize });
                        $("#jqxFailedTTs").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                    },
                    autoshowfiltericon: true,
                    columnmenuopening: function (menu, datafield, height) {
                        var column = $("#jqxFailedTTs").jqxGrid('getcolumn', datafield);
                        if (column.filtertype === "custom") {
                            menu.height(155);
                            setTimeout(function () {
                                menu.find('input').focus();
                            }, 25);
                        }
                        else menu.height(height);
                    },
                    columns: [
                        { text: 'TruckID', dataField: 'TruckID', width: "0%", hidden: true },
                        { text: 'SNO', dataField: '', columntype: 'number', width: "3%", cellsalign: 'center', cellsrenderer: numberrenderer },
                        { text: 'Truck No.', datafield: 'TruckNo', width: "8%", cellsalign: 'center', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'Card No', datafield: 'CardNumber', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'Reporting Date-Time', datafield: 'RepDateTime', width: "11%", cellsalign: 'left', filtertype: 'date', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                        { text: 'Truck Status', datafield: 'TruckStatusDesc', width: "16%", cellsalign: 'left', filtertype: 'checkedlist' },
                        //{ text: 'Sensor', datafield: 'SensorDesc', width: "10%", filtertype: 'checkedlist' },
                        //{ text: 'Posted By', datafield: 'PostedBy', width: "6%", hidden: true, cellsalign: 'center', filtertype: 'checkedlist' },
                        //{ text: 'Post Method', datafield: 'PostedMethod', width: "6%", hidden: true, cellsalign: 'center', filtertype: 'checkedlist' },
                        //{ text: 'Posted Status', datafield: 'PostedStatusDesc', width: "20%", cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'Post to ' + ERPName, datafield: 'Ack', width: "6%", cellsrenderer: cellsrendererPost, cellsalign: 'center' },
                        { text: 'Posted Time', datafield: 'PostedTime', width: "11%", cellsalign: 'center', filtertype: 'checkedlist', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                        { text: 'Delete', datafield: 'Del', width: "4%", cellsrenderer: cellsrendererDelete, cellsalign: 'center' },
                        { text: 'Remarks', datafield: 'Remarks', width: "35%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                    ]
                });

            $("#jqxFailedTTs").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxFailedTTs').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxFailedTTs").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxFailedTTs').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    selectedRowRef = selectedRowData["TruckNo"] + " (" + selectedRowData["CardNumber"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function RefreshTTData() {
    if ($('#jqxRegistered').hasClass("jqx-widget") == false) { return; }
    if ($('#jqxFailedTTs').hasClass("jqx-widget") == false) { return; }
    $.when(refreshRegisteredTTs(), refreshFailedTTs()).then(function () {
        clearTimeout(gblTimeout);
        gblTimeout = setTimeout(function () { RefreshTTData(); }, 15000);
    }, function () { console.log('ajax error in RefreshTTQData'); });
}

function refreshRegisteredTTs() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexRegistered",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var rows = result.length;
            var newSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'number' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'number' },
                    { name: 'Ack', type: 'bool' },
                    { name: 'Del', type: 'bool' },
                    { name: 'BayNo', type: 'number' },
                    { name: 'Destination', type: 'string' },
                    { name: 'EstFANTime', type: 'date' },
                ],
                localdata: data,
                id: "UniqueID"
            };
            RegSource.localdata = newSource.localdata;
            if (rows > iGblNoRows || rows < 2) { rows = iGblNoRows; }
            if ($('#jqxRegistered').hasClass("jqx-widget") == false) { return; }
            setTimeout(function () {
                $("#contentjqxRegistered").css("top", "36px");
            }, 50);
            $('#jqxRegistered').jqxGrid('updatebounddata', 'cells');
            $("#jqxRegistered").jqxGrid({ pagesize: rows });
            $("#jqxRegistered").jqxGrid({ pagesizeoptions: [rows, rows * 2, rows * 3] });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function refreshFailedTTs() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexFailed",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var Faildata = result;
            var FailRows = result.length;
            var newFailSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'date' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'string' },
                    { name: 'Ack', type: 'bool' },
                    { name: 'Del', type: 'bool' },
                ],
                localdata: Faildata,
                id: "UniqueID"
            };
            FailSource.localdata = newFailSource.localdata;
            if (FailRows > iGblNoRows || FailRows < 2) { FailRows = iGblNoRows; }
            if ($('#jqxFailedTTs').hasClass("jqx-widget") == false) { return; }
            $('#jqxFailedTTs').jqxGrid('updatebounddata', 'cells');
            $("#jqxFailedTTs").jqxGrid({ pagesize: FailRows });
            setTimeout(function () {
                $("#contentjqxRegistered").css("top", "36px");
            }, 50);
            //Below line is giving problems. To be checked.
            //$("#jqxFailedTTs").jqxGrid({ pagesizeoptions: [FailRows, FailRows * 2, FailRows * 3] });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function ToggleTTQTabs() {
    clearTimeout(toggleTimeout);
    if ($('#tabTTQ').length < 1) { return; }

    if ($('#failTT').hasClass('active')) { $('a[href="#ola"]').tab('show'); }
    else { $('a[href="#failTT"]').tab('show'); }
    toggleTimeout = setTimeout(function () { ToggleTTQTabs(); }, 10000);
}

function ExtraActivities(model) {

}

function BindSpanPost() {
    $('.spanPost').on("click", function (e) {
        $('#myConfirmMsg').html('<p>Are you sure to Post the Truck to ERP?</p>');
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({ handle: ".modal-header" });
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            PostTruckToJDE(Id);
            $('#confirmModal').modal('hide');
        });
    });
}

function BindSpanAck() {
    $('.spanAck').on("click", function (e) {
        $('#myConfirmMsg').html('<p>Are you sure to Acknowledge the Truck?</p>');
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({ handle: ".modal-header" });
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            AcknowledgeTruckFromQueue(Id);
            $('#confirmModal').modal('hide');
        });
    });
}

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            DeleteTruckFromQueue(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function AcknowledgeTruckFromQueue(Id) {
    var activityName = "Acknowledge Truck From TT Queue";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AcknowledgeTruckFromQueueDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AcknowledgeTruckFromQueueDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function AcknowledgeTruckFromQueueDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/AcknowledgeTruckFromQueue?TruckID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function PostTruckToJDE(Id) {
    var activityName = "Post Truck Arrival to SAP";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                PostTruckToJDEDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { PostTruckToJDEDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function PostTruckToJDEDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/PostTruckR1ToJDE?TruckID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function DeleteTruckFromQueue(Id) {
    var activityName = "Delete Truck From TT Queue";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                DeleteTruckFromQueueDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteTruckFromQueueDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function DeleteTruckFromQueueDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/DeleteTruckFromQueue?TruckID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function OpenAddNewTruckinTTQueue() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/AddTruckView",
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-dialog').addClass('add-truck');
            $('#myModal .modal-title').html('Add Truck');
            $('#myModal').modal('show');
            $('#myModal').draggable({ handle: ".modal-header" });
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (AddTruckinTTQueue() != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $('#myModal .modal-dialog').removeClass('truck-regularize');
                }
            });
        }
    });
}

function ValidateTruck(TruckID) {
    $.ajax({
        url: "/TruckMasters/ValidateTruckForManualLoad?TruckID=" + TruckID,
        type: "GET",
        cache: false,
        success: function (result) {
            if (result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
                $('#txtTruck').attr('data-key-value', '0');
                $('#txtTruck').text('');
                $('#txtTruck').val('');
            }
        }
    });
}

function AddTruckinTTQueue() {
    var TruckID = $('#ttqTruck').val();
    if (TruckID == "0" || TruckID == '' || TruckID==undefined) {
        alertDismissable("danger", "Please select a Truck Number"); return;
    }

    var activityName = "Add Truck in TT Queue";
    var activityDetail = "Card / Truck No: " + $('#ttqTruck :selected').text();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AddTruckinTTQueueDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AddTruckinTTQueueDo(); }, activityName, activityDetail);
            }
        }
    });
}

function AddTruckinTTQueueDo() {
    var TruckID = $('#ttqTruck').val();
    var Remarks = "Manual Add Truck to TT Queue";

    $.ajax({
        url: "/TTQueue/AddTruckinTTQueue",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ TruckID: TruckID, Sensor: 3, Remarks: Remarks }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function ResetTimer() {
    clearTimeout(toggleTimeout);
    toggleTimeout = setTimeout(function () { ToggleTTQTabs(); }, 10000);
}