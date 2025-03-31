var source, DetailsSource, DetailsSourceMain, Details, nestedGrids, summaryGridSource;
var LastExpandedRow, iNoRows = 14;
//var truckStatus;
$(document).ready(function () {
    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { RefreshLoadSummary(); }, 10000);

    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetLoadSummaryData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            source =
            {
                datafields: [
                    { name: 'LoadID', type: 'number' },
                    { name: 'PurposeID', type: 'number' },
                    { name: 'SourceID', type: 'number' },
                    { name: 'Date', type: 'date' },
                    { name: 'TruckNumber', type: 'string' },
                    { name: 'FANSlipNo', type: 'string' },
                    { name: 'TruckStatusID', type: 'number' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'CustDesc', type: 'string' },
                    { name: 'LoadDetStatus', type: 'string' },
                    { name: 'ProdNameShort', type: 'string' },
                    { name: 'BayID', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'CardReAuthorizeTime', type: 'date' },
                    { name: 'RequiredQty', type: 'number' },
                    { name: 'DeliveredQty', type: 'number' },
                    { name: 'TareWeight', type: 'number' },
                    { name: 'GrossWeight', type: 'number' },
                    { name: 'WBWeight', type: 'number' },
                    { name: 'FANPrintTime', type: 'date' },
                    { name: 'TotalSeconds', type: 'date' },
                    { name: 'EntryGateTime', type: 'date' },
                    { name: 'BayReportingTime', type: 'date' },
                    { name: 'LoadingStartTime', type: 'date' },
                    { name: 'LoadingEndTime', type: 'date' },
                    { name: 'PostLoadDateTime', type: 'date' },
                    { name: 'PostedAckDateTime', type: 'date' },
                    { name: 'ReportPrintedDateTime', type: 'date' },
                    { name: 'ExitGateTime', type: 'date' },
                    { name: 'ShipmentNo', type: 'string' },
                    { name: 'ManualPost', type: 'bool' }
                ],
                root: "LoadMasters",
                id: 'LoadID',
                datatype: "json",
                async: false,
                localdata: data
            };
            var MastersAdapter = new $.jqx.dataAdapter(source);

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
                    localdata: MastersAdapter.records,
                    datatype: "array",
                    async: false
                }

                var dataadapter = new $.jqx.dataAdapter(dataSource,
                {
                    autoBind: true,
                    autoSort: false,
                    autoSortField: datafield,
                    async: false,
                    uniqueDataFields: [datafield]
                });
                var column = $("#jqxLSgrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxLSgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxLSgrid").jqxGrid('applyfilters');
                    $("#jqxLSgrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxLSgrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxLSgrid").jqxGrid('applyfilters');
                    $("#jqxLSgrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            $.ajax({
                type: "GET",
                url: "/LoadSummary/TruckDetailsData?Purpose=" + Purpose,
                cache: false,
                beforeSend: function () { },
                complete: function () { },
                success: function (DetailsResultOutput) {

                    var LoadDetailsData = DetailsResultOutput;
                    DetailsSourceMain =
                    {
                        datafields: [
                                { name: 'LoadID', type: 'number' },
                                { name: 'LoadingPointNo', type: 'number' },
                                { name: 'CompNo', type: 'number' },
                                { name: 'ProductName', type: 'string' },
                                { name: 'CustomerDesc', type: 'string' },
                                { name: 'PresetQty', type: 'number' },
                                { name: 'Filled', type: 'number' },
                                { name: 'BaseProduct', type: 'number' },
                                { name: 'Additive1', type: 'number' },
                                { name: 'Blending', type: 'number' },
                                { name: 'TopUpQty', type: 'number' },
                                { name: 'DecantedQty', type: 'number' },
                                { name: 'EffQty', type: 'number' },
                                { name: 'DensityAvg', type: 'number' },
                                { name: 'TempAvg', type: 'number' },
                                { name: 'LoadingStartTime', type: 'date' },
                                { name: 'LoadingEndTime', type: 'date' },
                                { name: 'Status', type: 'string' },
                                { name: 'TankNo', type: 'string' },
                                { name: 'Destination', type: 'string' },
                                { name: 'SOQty', type: 'number' },
                                { name: 'SOUom', type: 'string' },
                                { name: 'TareWeight', type: 'number' },
                                { name: 'GrossWeight', type: 'number' },
                        ],
                        root: "Details",
                        //record: "Order",
                        datatype: "json",
                        localdata: LoadDetailsData,
                        async: false
                    };
                    var DetailsDataAdapter = new $.jqx.dataAdapter(DetailsSourceMain, { autoBind: true });
                    Details = DetailsDataAdapter.records;
                    nestedGrids = new Array();
                    DetailsSource = new Array();
                    // create nested grid.
                    var initrowdetails = function (index, parentElement, gridElement, record) {
                        var id = record.uid.toString();
                        var grid = $($(parentElement).children()[0]);
                        nestedGrids[index] = grid;
                        var filtergroup = new $.jqx.filter();
                        var filter_or_operator = 1;
                        var filtervalue = id;
                        var filtercondition = 'equal';
                        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                        // fill the orders depending on the id.
                        var Detailsbyid = [];
                        for (var m = 0; m < Details.length; m++) {
                            var result = filter.evaluate(Details[m]["LoadID"]);
                            if (result)
                                Detailsbyid.push(Details[m]);
                        }
                        DetailsSource[index] = {
                            datafields: [
                                { name: 'LoadID', type: 'number' },
                                { name: 'LoadingPointNo', type: 'number' },
                                { name: 'CompNo', type: 'number' },
                                { name: 'ProductName', type: 'string' },
                                { name: 'CustomerDesc', type: 'string' },
                                { name: 'PresetQty', type: 'number' },
                                { name: 'Filled', type: 'number' },
                                { name: 'BaseProduct', type: 'number' },
                                { name: 'Additive1', type: 'number' },
                                { name: 'Blending', type: 'number' },
                                { name: 'TopUpQty', type: 'number' },
                                { name: 'DecantedQty', type: 'number' },
                                { name: 'EffQty', type: 'number' },
                                { name: 'DensityAvg', type: 'number' },
                                { name: 'TempAvg', type: 'number' },
                                { name: 'LoadingStartTime', type: 'date' },
                                { name: 'LoadingEndTime', type: 'date' },
                                { name: 'Status', type: 'string' },
                                { name: 'TankNo', type: 'string' },
                                { name: 'Destination', type: 'string' },
                                { name: 'SOQty', type: 'number' },
                                { name: 'SOUom', type: 'string' },
                                { name: 'TareWeight', type: 'number' },
                                { name: 'GrossWeight', type: 'number' },
                            ],
                            id: 'LoadID',
                            localdata: Detailsbyid
                        }
                        var nestedGridAdapter = new $.jqx.dataAdapter(DetailsSource[index]);
                        if (grid != null) {
                            grid.jqxGrid({
                                columnsresize: true,
                                filterable: true,
                                sortable: true,
                                source: nestedGridAdapter, width: '100%', height: 190,
                                columns: [
                                    { text: 'LoadID', datafield: 'LoadID', width: '5%' },
                                    { text: 'LP#', datafield: 'LoadingPointNo', width: '2%', filtertype: 'checkedlist', cellsalign: 'center' },
                                    { text: 'Comp#', datafield: 'CompNo', width: '3%', filtertype: 'checkedlist', cellsalign: 'center' },
                                    { text: 'Product', datafield: 'ProductName', filtertype: 'checkedlist', width: '6%' },
                                    { text: 'Customer', datafield: 'CustomerDesc', width: '12%' },
                                    { text: 'Qty', datafield: 'SOQty', width: '3%' },
                                    { text: 'Unit', datafield: 'SOUom', width: '2%' },
                                    { text: 'Preset', datafield: 'PresetQty', width: '4%' },
                                    { text: 'Filled', datafield: 'Filled', width: '4%' },
                                    { text: 'Base Qty', datafield: 'BaseProduct', width: '4%' },
                                    //{ text: 'Blend', datafield: 'Blending', width: '4%' },
                                    //{ text: 'Add01', datafield: 'Additive1', width: '3%' },
                                    { text: 'TopUp', datafield: 'TopUpQty', width: '3%' },
                                    { text: 'Decant', datafield: 'DecantedQty', width: '3%' },
                                    { text: 'EffQty', datafield: 'EffQty', width: '4%' },
                                    { text: 'Density', datafield: 'DensityAvg', width: '5%' },
                                    { text: 'Temp', datafield: 'TempAvg', width: '4%' },
                                    { text: 'Start Time', datafield: 'LoadingStartTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm', cellsalign: 'center' },
                                    { text: 'End Time', datafield: 'LoadingEndTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm', cellsalign: 'center' },
                                    { text: 'Status', datafield: 'Status', filtertype: 'checkedlist', width: '6%' },
                                    { text: 'Tank', datafield: 'TankNo', width: '4%' },
                                    { text: 'TareWt', datafield: 'TareWeight', width: '5%' },
                                    { text: 'GrossWt', datafield: 'GrossWeight', width: '5%' },
                                    //{ text: 'Destination', datafield: 'Destination', width: '8%' },
                                ]
                            });
                        }
                    }

                    // creage jqxgrid
                    $("#jqxLSgrid").jqxGrid(
                    {
                        width: '100%',
                        source: MastersAdapter,
                        columnsresize: true,
                        filterable: true,
                        sortable: true,
                        pageable: true,
                        //autoshowcolumnsmenubutton: false,
                        pagesize: iNoRows,
                        pagesizeoptions: [iNoRows, iNoRows * 2, iNoRows * 3],
                        autoheight: true,
                        showtoolbar: true,
                        rendertoolbar: function (statusbar) {
                            // appends buttons to the status bar.
                            var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                            var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>LOAD SUMMARY</span></div>");
                            container.append(tableHeading);
                            statusbar.append(container);
                        },
                        autoshowfiltericon: true,
                        columnmenuopening: function (menu, datafield, height) {
                            var column = $("#jqxLSgrid").jqxGrid('getcolumn', datafield);
                            if (column.filtertype === "custom") {
                                menu.height(155);
                                setTimeout(function () {
                                    menu.find('input').focus();
                                }, 25);
                            }
                            else menu.height(height);
                        },
                        rowdetails: true,
                        rowsheight: 35,
                        initrowdetails: initrowdetails,
                        rowdetailstemplate: {
                            rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 190, rowdetailshidden: true
                        },
                        rendergridrows: function () {
                            return dataAdapter.records;
                        },
                        ready: function () {
                            //$("#jqxLSgrid").jqxGrid('showrowdetails', 1);
                        },
                        columns: [
                             { text: 'LoadID', datafield: 'LoadID', width: '4%' },
                             { text: 'PurposeID', datafield: 'PurposeID', hidden: true, width: '0%' },
                             { text: 'SourceID', datafield: 'SourceID', hidden: true, width: '0%' },
                             { text: 'Reg Date', datafield: 'Date', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Truck No', datafield: 'TruckNumber', width: '5%' },
                             { text: 'Truck Status ID', datafield: 'TruckStatusID', hidden: true, width: '0%' },
                             { text: 'LoadDet Status ID', datafield: 'LoadDetStatus', hidden: true, width: '0%' },
                             { text: 'Truck Status', datafield: 'TruckStatusDesc', width: '11%', filtertype: 'checkedlist' },
                             { text: 'Product(s)', datafield: 'ProdNameShort', width: '6%' },
                             { text: 'Bay(s)', datafield: 'BayID', width: '3%', cellsalign: 'center' },
                             { text: 'Card#', datafield: 'CardNumber', width: '3%' },
                             { text: 'Customer', datafield: 'CustDesc', width: '10%' },
                             { text: 'Req.Qty', datafield: 'RequiredQty', width: '3.5%' },
                             { text: 'Fill.Qty', datafield: 'DeliveredQty', width: '3.5%' },
                             //{ text: 'Card Issue', datafield: 'CardReAuthorizeTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'FAN Print', datafield: 'FANPrintTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Gate Entry', datafield: 'EntryGateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Bay Reporting', datafield: 'BayReportingTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Loading Start', datafield: 'LoadingStartTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             //{ text: 'Loading End', datafield: 'LoadingEndTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Post Load', datafield: 'PostLoadDateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'Post Ack', datafield: 'PostedAckDateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             //{ text: 'Exit Gate', datafield: 'ExitGateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                             { text: 'WB.Wt', datafield: 'WBWeight', width: '4%' },
                             //{ text: 'TT Time', datafield: 'TotalSeconds', width: '4%', filterable: false, cellsformat: 'HH:mm:ss' },
                             { text: 'Shipment', datafield: 'ShipmentNo', width: '5%' },
                        ]
                    });

                    $("#jqxLSgrid").on('rowdoubleclick', function (event) {
                        if (event.args.rowindex >= 0) {
                            if (event.args.row.LoadID != undefined) {
                                GetActionOptions($('#jqxLSgrid').jqxGrid('getrowdatabyid', event.args.row.LoadID));
                            }
                        }
                    });

                    $('#jqxLSgrid').on('rowexpand', function (event) {
                        if (LastExpandedRow != event.args.rowindex) {
                            $('#jqxLSgrid').jqxGrid('hiderowdetails', LastExpandedRow);
                        }
                        LastExpandedRow = event.args.rowindex;
                        $('#jqxLSgrid').jqxGrid({ selectedrowindex: event.args.rowindex });
                    });

                    $('#jqxLSgrid').on('rowcollapse', function (event) {

                    });

                    //display selected row index.
                    $("#jqxLSgrid").on('rowselect', function (event) {
                        if (event.args.rowindex >= 0) {
                            if (event.args.row.LoadID != undefined) {
                                if (event.args.rowindex != LastExpandedRow && event.args.row.TruckNumber != undefined) {
                                    $('#jqxLSgrid').jqxGrid('hiderowdetails', LastExpandedRow);
                                }
                                GetActionOptions($('#jqxLSgrid').jqxGrid('getrowdatabyid', event.args.row.LoadID));
                            }
                        }
                    });
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

    $.ajax({
        type: "GET",
        url: "/LoadSummary/TrucksStatusData?Purpose=" + Purpose,
        cache: false,
        dataType: 'json',
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            summaryGridSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'Registered', type: 'number' },
                    { name: 'Authorized', type: 'number' },
                    { name: 'In_Queue', type: 'number' },
                    { name: 'Loading', type: 'number' },
                    { name: 'Loaded', type: 'number' },
                    { name: 'TimedOut', type: 'number' },
                    { name: 'SickTTs', type: 'number' },
                    { name: 'Exited', type: 'number' },
                    { name: 'Completed_Tot', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var renderer = function (id) {
                return '<input type="button" onClick="buttonclick(event)" class="gridButton" id="btn' + id + '" value="Delete Row"/>'
            }

            var adapter = new $.jqx.dataAdapter(summaryGridSource);
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
                var column = $("#jqxgridSummary").jqxGrid('getcolumn', datafield);
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
                    $("#jqxLSgridData").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxLSgridData").jqxGrid('applyfilters');
                    $("#jqxLSgridData").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxLSgridData").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxLSgridData").jqxGrid('applyfilters');
                    $("#jqxLSgridData").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
            $("#jqxgridSummary").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
                filterable: false,
                sortable: false,
                pageable: false,
                pagesize: iGblNoRows,
                pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Load Summary Count</span></div>");

                    container.append(tableHeading);
                    statusbar.append(container);

                },
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxgridSummary").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                  { text: 'TTs from ' + ERPName, datafield: 'Registered', width: "11%", cellsalign: 'center' },
                  { text: 'FAN Generated', datafield: 'Authorized', width: "11%", cellsalign: 'center' },
                  { text: 'Inside Loading Area', datafield: 'In_Queue', width: "11%", cellsalign: 'center' },
                  { text: 'Under Loading', datafield: 'Loading', width: "11%", cellsalign: 'center' },
                  { text: 'Completed Loading', datafield: 'Loaded', width: "11%", cellsalign: 'center' },
                  { text: 'Timed-Out', datafield: 'TimedOut', width: "11%", cellsalign: 'center' },
                  { text: 'Sick TTs', datafield: 'SickTTs', width: "11%", cellsalign: 'center' },
                  { text: 'Exited', datafield: 'Exited', width: "11%", cellsalign: 'center' },
                  { text: 'Total Trucks', datafield: 'Completed_Tot', width: "12%", cellsalign: 'center' }
                ]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });

});

function GetLoadSummary() {

    return $.ajax({
        type: "GET",
        url: "/LoadSummary/GetLoadSummaryData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var newsource =
            {
                datafields: [
                    { name: 'LoadID', type: 'number' },
                    { name: 'PurposeID', type: 'number' },
                    { name: 'SourceID', type: 'number' },
                    { name: 'Date', type: 'date' },
                    { name: 'TruckNumber', type: 'string' },
                    { name: 'FANSlipNo', type: 'string' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'ProdNameShort', type: 'string' },
                    { name: 'BayID', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'CardReAuthorizeTime', type: 'date' },
                    { name: 'RequiredQty', type: 'number' },
                    { name: 'DeliveredQty', type: 'number' },
                    { name: 'TareWeight', type: 'number' },
                    { name: 'GrossWeight', type: 'number' },
                    { name: 'WBWeight', type: 'number' },
                    { name: 'FANPrintTime', type: 'date' },
                    { name: 'TotalSeconds', type: 'string' },
                    { name: 'EntryGateTime', type: 'date' },
                    { name: 'BayReportingTime', type: 'date' },
                    { name: 'LoadingStartTime', type: 'date' },
                    { name: 'LoadingEndTime', type: 'date' },
                    { name: 'PostLoadDateTime', type: 'date' },
                    { name: 'PostedAckDateTime', type: 'date' },
                    { name: 'ReportPrintedDateTime', type: 'date' },
                    { name: 'ExitGateTime', type: 'date' },
                    { name: 'ShipmentNo', type: 'string' }
                ],
                root: "LoadMasters",
                id: 'LoadID',
                datatype: "json",
                async: false,
                localdata: data
            };
            source.localdata = newsource.localdata;
        }
    });
}

function TruckDetailSummary() {

    return $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckDetailsData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (DetailsResultOutput) {
            var LoadDetailsData = DetailsResultOutput;
            var newDetailsSource =
            {
                datafields: [
                        { name: 'LoadID', type: 'number' },
                        { name: 'LoadingPointNo', type: 'number' },
                        { name: 'CompNo', type: 'number' },
                        { name: 'ProductName', type: 'string' },
                        { name: 'CustomerDesc', type: 'string' },
                        { name: 'PresetQty', type: 'number' },
                        { name: 'Filled', type: 'number' },
                        { name: 'BaseProduct', type: 'number' },
                        { name: 'Additive1', type: 'number' },
                        { name: 'Blending', type: 'number' },
                        { name: 'TopUpQty', type: 'number' },
                        { name: 'DecantedQty', type: 'number' },
                        { name: 'EffQty', type: 'number' },
                        { name: 'DensityAvg', type: 'number' },
                        { name: 'TempAvg', type: 'number' },
                        { name: 'LoadingStartTime', type: 'date' },
                        { name: 'LoadingEndTime', type: 'date' },
                        { name: 'Status', type: 'string' },
                        { name: 'TankNo', type: 'string' },
                        { name: 'Destination', type: 'string' },
                        { name: 'SOQty', type: 'number' },
                        { name: 'SOUom', type: 'string' },
                        { name: 'TareWeight', type: 'number' },
                        { name: 'GrossWeight', type: 'number' },
                ],
                root: "Details",
                //record: "Order",
                datatype: "json",
                localdata: LoadDetailsData,
                async: false
            };

            var DetailsDataAdapter = new $.jqx.dataAdapter(newDetailsSource, { autoBind: true });
            Details = DetailsDataAdapter.records;
        }
    });
}

