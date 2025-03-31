var source, DetailsSource, DetailsSourceMain, Details, nestedGrids, summaryGridSource;
var LastExpandedRow, iNoRows = 21;
//var truckStatus;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/LoadSummary/GetExitedLoadSummaryData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            source =
            {
                datafields: [
                    { name: 'LoadID', type: 'number' },
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
                var column = $("#jqxExitedLSgrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxExitedLSgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxExitedLSgrid").jqxGrid('applyfilters');
                    $("#jqxExitedLSgrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxExitedLSgrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxExitedLSgrid").jqxGrid('applyfilters');
                    $("#jqxExitedLSgrid").jqxGrid('closemenu');
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
                url: "/LoadSummary/ExitedLoadDetailsData?Purpose=" + Purpose,
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
                            { name: 'Additive2', type: 'number' },
                            { name: 'Additive3', type: 'number' },
                            { name: 'TotalAdditive', type: 'number' },
                            { name: 'Blending', type: 'number' },
                            { name: 'TopUpQty', type: 'number' },
                            { name: 'DecantedQty', type: 'number' },
                            { name: 'EffQty', type: 'number' },
                            { name: 'InvoiceDensityGrs', type: 'number' },
                            { name: 'InvoiceDensityAt15', type: 'number' },
                            { name: 'InvoiceTemp', type: 'number' },
                            { name: 'DensityAvg', type: 'number' },
                            { name: 'DensityAvgAt15', type: 'number' },
                            { name: 'TempAvg', type: 'number' },
                            { name: 'LoadingStartTime', type: 'date' },
                            { name: 'LoadingEndTime', type: 'date' },
                            { name: 'Status', type: 'string' },
                            { name: 'TankNo', type: 'string' },
                            { name: 'Destination', type: 'string' },
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
                                { name: 'Additive2', type: 'number' },
                                { name: 'Additive3', type: 'number' },
                                { name: 'TotalAdditive', type: 'number' },
                                { name: 'Blending', type: 'number' },
                                { name: 'TopUpQty', type: 'number' },
                                { name: 'DecantedQty', type: 'number' },
                                { name: 'EffQty', type: 'number' },
                                { name: 'InvoiceDensityGrs', type: 'number' },
                                { name: 'InvoiceDensityAt15', type: 'number' },
                                { name: 'InvoiceTemp', type: 'number' },
                                { name: 'DensityAvg', type: 'number' },
                                { name: 'DensityAvgAt15', type: 'number' },
                                { name: 'TempAvg', type: 'number' },
                                { name: 'LoadingStartTime', type: 'date' },
                                { name: 'LoadingEndTime', type: 'date' },
                                { name: 'Status', type: 'string' },
                                { name: 'TankNo', type: 'string' },
                                { name: 'Destination', type: 'string' },

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
                                autoshowfiltericon: true,
                                source: nestedGridAdapter, width: '100%', height: 190,
                                columns: [
                                    { text: 'LoadID', datafield: 'LoadID', width: '5%' },
                                    { text: 'LP#', datafield: 'LoadingPointNo', width: '3%', filtertype: 'checkedlist', cellsalign: 'center' },
                                    { text: 'Comp#', datafield: 'CompNo', width: '3%', filtertype: 'checkedlist', cellsalign: 'center' },
                                    { text: 'Product', datafield: 'ProductName', filtertype: 'checkedlist', width: '6%' },
                                    { text: 'Customer', datafield: 'CustomerDesc', width: '15%' },
                                    { text: 'Preset', datafield: 'PresetQty', width: '4%' },
                                    { text: 'Filled', datafield: 'Filled', width: '4%' },
                                    { text: 'Base Qty', datafield: 'BaseProduct', width: '4%' },
                                    { text: 'Blend', datafield: 'Blending', width: '4%' },
                                    { text: 'Add01', datafield: 'Additive1', width: '3%' },
                                    { text: 'Add02', datafield: 'Additive2', width: '3%' },
                                    { text: 'TopUp', datafield: 'TopUpQty', width: '3%' },
                                    { text: 'Decant', datafield: 'DecantedQty', width: '3%' },
                                    { text: 'EffQty', datafield: 'EffQty', width: '4%' },
                                    { text: 'Density', datafield: 'DensityAvg', width: '5%' },
                                    { text: 'Temp', datafield: 'TempAvg', width: '4%' },
                                    { text: 'Loading Start', datafield: 'LoadingStartTime', width: '7%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                    { text: 'Loading End', datafield: 'LoadingEndTime', width: '7%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                    { text: 'Status', datafield: 'Status', filtertype: 'checkedlist', width: '6%' },
                                    { text: 'Tank', datafield: 'TankNo', width: '6%' },
                                    //{ text: 'Destination', datafield: 'Destination', width: '8%' },
                                ]
                            });
                        }
                    }

                    // creage jqxgrid
                    $("#jqxExitedLSgrid").jqxGrid(
                        {
                            width: '100%',
                            source: MastersAdapter,
                            columnsresize: true,
                            filterable: true,
                            sortable: true,
                            pageable: true,
                            pagesize: iNoRows,
                            pagesizeoptions: [iNoRows, iNoRows * 2, iNoRows * 3],
                            autoheight: true,
                            showtoolbar: false,
                            // code by hemant
                            filterbarmode: 'simple',
                            showfilterbar: true,
                            // code by hemant
                            rendertoolbar: function (statusbar) {
                                // appends buttons to the status bar.
                                var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                                var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>EXITED LOADING TT SUMMARY</span></div>");
                                // code by hemant
                                var searchInput = $('<div style="float:right; display: flex; height: 25px; margin-top: 5px; align-items: center; position: relative; margin-left: 4px; " class="jqx-rc-all jqx-widget jqx-input-group"><div style="position: relative; margin-right: 4px; margin-left: 4px; float: left; ">Search:</div><input style="width: 200px; height: 100%; direction: ltr; " role="textbox" type="text" id="jqxcustomSearch" class="jqx-input jqx-rc-l jqx-input-group-addon jqx-widget jqx-widget-content"><div style="cursor: pointer; height: 100%; padding-top: 5px !important; " class="jqx-fill-state-normal jqx-rc-r jqx-input-group-addon"><div id="jqx-searchBtnIcon" class="jqx-icon-search"></div></div><div style="float: left; width: 16px; height: 16px; position: relative; margin: 3px; visibility:hidden; " title="Clear" class="jqx-icon-close jqxCustomclear"></div></div>');
                                //code by hemant
                                container.append(tableHeading);
                                statusbar.append(container);
                                container.append(searchInput);

                                // code by hemant                    
                                // setTimeout(function () {
                                //     $("#filterjqxExitedLSgrid").hide();
                                // }, 100);
                                // setTimeout(function () {
                                //     $("#contentjqxExitedLSgrid").css("top", "36px");
                                // }, 100);
                                // code by hemant                                
                            },
                            autoshowfiltericon: true,
                            columnmenuopening: function (menu, datafield, height) {
                                var column = $("#jqxExitedLSgrid").jqxGrid('getcolumn', datafield);
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
                                //$("#jqxExitedLSgrid").jqxGrid('showrowdetails', 1);
                            },
                            columns: [
                                { text: 'LoadID', datafield: 'LoadID', width: '4%' },
                                { text: 'Reg Date', datafield: 'Date', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Truck No', datafield: 'TruckNumber', width: '6%' },
                                { text: 'Truck Status ID', datafield: 'TruckStatusID', hidden: true, width: '0%' },
                                { text: 'LoadDet Status ID', datafield: 'LoadDetStatus', hidden: true, width: '0%' },
                                { text: 'Truck Status', datafield: 'TruckStatusDesc', width: '6%', filtertype: 'checkedlist' },
                                { text: 'Product(s)', datafield: 'ProdNameShort', width: '5.5%' },
                                { text: 'Bay(s)', datafield: 'BayID', width: '3%', cellsalign: 'center' },
                                { text: 'Card#', datafield: 'CardNumber', width: '3%' },
                                { text: 'Customer', datafield: 'CustDesc', width: '8%' },
                                { text: 'Req.Qty', datafield: 'RequiredQty', width: '3.5%' },
                                { text: 'Fill.Qty', datafield: 'DeliveredQty', width: '3.5%' },
                                { text: 'Card Issue', datafield: 'CardReAuthorizeTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'FAN Print', datafield: 'FANPrintTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Gate Entry', datafield: 'EntryGateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Bay Reporting', datafield: 'BayReportingTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Loading Start', datafield: 'LoadingStartTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                //{ text: 'Loading End', datafield: 'LoadingEndTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Post Load', datafield: 'PostLoadDateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                //{ text: 'Post Ack', datafield: 'PostedAckDateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'Exit Gate', datafield: 'ExitGateTime', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM HH:mm' },
                                { text: 'TT Time', datafield: 'TotalSeconds', width: '4.5%', filterable: false, cellsformat: 'HH:mm:ss' },
                                { text: 'ShipmentNo', datafield: 'ShipmentNo', width: '5%' },
                            ]
                        });

                    $("#jqxExitedLSgrid").on('rowdoubleclick', function (event) {
                        if (event.args.rowindex >= 0) {
                            if (event.args.row.LoadID != undefined) {
                                //GetActionOptions($('#jqxExitedLSgrid').jqxGrid('getrowdatabyid', event.args.row.LoadID));
                            }
                        }
                    });

                    $('#jqxExitedLSgrid').on('rowexpand', function (event) {
                        if (LastExpandedRow != event.args.rowindex) {
                            $('#jqxExitedLSgrid').jqxGrid('hiderowdetails', LastExpandedRow);
                        }
                        LastExpandedRow = event.args.rowindex;
                        $('#jqxExitedLSgrid').jqxGrid({ selectedrowindex: event.args.rowindex });
                    });

                    $('#jqxExitedLSgrid').on('rowcollapse', function (event) {

                    });

                    //display selected row index.
                    $("#jqxExitedLSgrid").on('rowselect', function (event) {
                        if (event.args.rowindex >= 0) {
                            if (event.args.row.LoadID != undefined) {
                                if (event.args.rowindex != LastExpandedRow && event.args.row.TruckNumber != undefined) {
                                    $('#jqxExitedLSgrid').jqxGrid('hiderowdetails', LastExpandedRow);
                                }
                                //GetActionOptions($('#jqxExitedLSgrid').jqxGrid('getrowdatabyid', event.args.row.LoadID));
                            }
                        }
                    });
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
                            //     $("#contentjqxExitedLSgrid").css("top", "36px");
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
                            //     $("#contentjqxExitedLSgrid").css("top", "36px");
                            // }, 50);
                        });
                        $('#jqx-searchBtnIcon').click(function () {
                            let searchText = $("#jqxcustomSearch").val();
                            $('.jqx-input-group-addon').val(searchText).click();
                            setTimeout(function () {
                                $("#contentjqxExitedLSgrid").css("top", "36px");
                            }, 50);
                        })
                        //code by hemant            
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

    $.ajax({
        type: "GET",
        url: "/LoadSummary/TrucksStatusData",
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
                    $("#jqxExitedLSgridData").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxExitedLSgridData").jqxGrid('applyfilters');
                    $("#jqxExitedLSgridData").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxExitedLSgridData").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxExitedLSgridData").jqxGrid('applyfilters');
                    $("#jqxExitedLSgridData").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
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
                    { name: 'Additive2', type: 'number' },
                    { name: 'Additive3', type: 'number' },
                    { name: 'TotalAdditive', type: 'number' },
                    { name: 'Blending', type: 'number' },
                    { name: 'TopUpQty', type: 'number' },
                    { name: 'DecantedQty', type: 'number' },
                    { name: 'EffQty', type: 'number' },
                    { name: 'LoadingStartTime', type: 'date' },
                    { name: 'LoadingEndTime', type: 'date' },
                    { name: 'Status', type: 'string' },
                    { name: 'Destination', type: 'string' },

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

