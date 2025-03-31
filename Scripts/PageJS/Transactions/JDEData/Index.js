var selectedRowId, selectedRowRef, iNoRows;
var nestedGrids = new Array();

$(document).ready(function () {

    var columnrendererTooltip = function (value) {
        return '<div class="tooltips" onmouseover="createTooltip();" title="' + value + '" style="margin: 12px 0 0 4px;">' + value + '</div>';
    }

    $.ajax({
        type: "GET",
        url: "/JDEData/GetFanHeaders",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var source =
            {
                datafields: [
                    { name: 'UNIQUE_ID', type: 'number' },
                    { name: 'LOCATION_CODE', type: 'string' },
                    { name: 'FAN_NUMBER', type: 'number' },
                    { name: 'LOAD_NUMBER', type: 'number' },
                    { name: 'SCHEDULED_DATE', type: 'date' },
                    { name: 'VEHICLE_CODE', type: 'string' },
                    { name: 'CONTRACTOR_CODE', type: 'number' },
                    { name: 'NO_OF_COMPARTMENTS', type: 'number' },
                    { name: 'USE_COMPARTMENTS', type: 'string' },
                    { name: 'CALIBRATION_EXPIRY_DATE', type: 'date' },
                    { name: 'EXPLOSIVE_EXPIRY_DATE', type: 'date' },
                    { name: 'LICENSE_EXPIRY_DATE', type: 'date' },
                    { name: 'GROSS_CAPACITY', type: 'number' },
                    { name: 'RATED_GROSS_LADEN_WEIGHT', type: 'number' },
                    { name: 'Actual_Raw_Laden_Weight', type: 'number' },
                    { name: 'Actual_Gross_Laden_Weight', type: 'number' },
                    { name: 'OIL_COMPANY', type: 'string' },
                    { name: 'NO_OF_CUSTOMERS', type: 'number' },
                    { name: 'NO_OF_PRODUCTS', type: 'number' },
                    { name: 'PROCESSING_STATUS', type: 'string' },
                    { name: 'PROCESSING_RESPONSE', type: 'string' },
                    { name: 'CANCEL_REQUEST', type: 'string' },
                    { name: 'CANCEL_RESPONSE', type: 'number' },
                    { name: 'ACTIVE_FLAG', type: 'string' },
                    { name: 'WEIGHT_BASED_FLAG', type: 'string' },
                    { name: 'WEIGHT_BASED_TYPE', type: 'string' },
                    { name: 'ACK_RESPONSE', type: 'string' },
                    { name: 'ACK_REASON_CODE', type: 'number' },
                    { name: 'POSTLOAD_RESPONSE', type: 'number' },
                    { name: 'PRELOAD_DATE', type: 'date' },
                    { name: 'PRELOAD_TIME', type: 'number' },
                    { name: 'ACK_DATE', type: 'date' },
                    { name: 'ACK_TIME', type: 'number' },
                    { name: 'POSTLOAD_DATE', type: 'date' },
                    { name: 'POSTLOAD_TIME', type: 'number' },
                    { name: 'CANCEL_DATE', type: 'date' },
                    { name: 'CANCEL_TIME', type: 'number' },
                    { name: 'SYNC_FLAG', type: 'string' },
                ],
                root: "FanHeaders",
                id: 'UNIQUE_ID',
                datatype: "json",
                async: false,
                localdata: data
            };
            var MastersAdapter = new $.jqx.dataAdapter(source);
            if (iGblNoRows > $.parseJSON(data).length) { iNoRows = $.parseJSON(data).length; } else { iNoRows = iGblNoRows; }
            $.ajax({
                type: "GET",
                url: "/JDEData/GetProdOrder",
                cache: false,
                beforeSend: function () { },
                complete: function () { },
                success: function (DetailsResultOutput) {

                    var ProdOrderData = DetailsResultOutput;
                    var ProdOrderDataSource =
                    {
                        datafields: [
                                { name: 'UNIQUE_ID', type: 'number' },
                                { name: 'LOCATION_CODE', type: 'string' },
                                { name: 'FAN_NUMBER', type: 'number' },
                                { name: 'LINE_NUMBER', type: 'number' },
                                { name: 'CUSTOMER_CODE', type: 'number' },
                                { name: 'CUSTOMER_DESC', type: 'string' },
                                { name: 'DESTINATION_CODE', type: 'string' },
                                { name: 'DESTINATION_DESC', type: 'string' },
                                { name: 'PRODUCT_CODE', type: 'string' },
                                { name: 'PRODUCT_DESC', type: 'string' },
                                { name: 'ORDER_QUANTITY', type: 'number' },
                                { name: 'QUANTITY_UOM', type: 'string' },
                                { name: 'DENSITY', type: 'number' },
                                { name: 'TEMPERATURE', type: 'number' },
                                { name: 'CUSTOMER_SEAL_NUMBER', type: 'string' },
                        ],
                        root: "ProdOrder",
                        //record: "Order",
                        datatype: "json",
                        localdata: ProdOrderData,
                        async: false
                    };
                    var ProdOrderAdapter = new $.jqx.dataAdapter(ProdOrderDataSource, { autoBind: true });
                    ProdOrderDetails = ProdOrderAdapter.records;

                    $.ajax({
                        type: "GET",
                        url: "/JDEData/GetFanCompartment",
                        cache: false,
                        beforeSend: function () { },
                        complete: function () { },
                        success: function (FanCompartmentResult) {
                            var FanCompData = FanCompartmentResult;
                            var FanCompDataSource =
                            {
                                datafields: [
                                        { name: 'UNIQUE_ID', type: 'number' },
                                        { name: 'LOCATION_CODE', type: 'string' },
                                        { name: 'FAN_NUMBER', type: 'number' },
                                        { name: 'LOGICAL_COMPARTMENT', type: 'number' },
                                        { name: 'PRODUCT_CODE', type: 'number' },
                                        { name: 'COMP_CAPACITY_MASS', type: 'number' },
                                        { name: 'COMP_CAPACITY_MASS_UOM', type: 'number' },
                                        { name: 'COMP_CAPACITY_VOL', type: 'number' },
                                        { name: 'COMP_CAPACITY_VOL_UOM', type: 'number' },
                                        { name: 'ACTUAL_RAW_LADEN_WEIGHT', type: 'number' },
                                        { name: 'ACTUAL_GROSS_LADEN_WEIGHT', type: 'number' },
                                        { name: 'PHYSICAL_COMPARTMENT', type: 'number' },
                                        { name: 'ACTUAL_LOADED_MASS', type: 'number' },
                                        { name: 'ACTUAL_LOADED_VOL', type: 'number' },
                                        { name: 'OVER_RUN_QUANTITY', type: 'number' },
                                        { name: 'ACTUAL_LOADED_VOL_AT_15', type: 'number' },
                                        { name: 'DENSITY', type: 'number' },
                                        { name: 'DENSITY_AT_15', type: 'number' },
                                        { name: 'TEMPERATURE', type: 'number' },
                                        { name: 'TOP_SEAL_NUMBER', type: 'number' },
                                        { name: 'BOTTOM_SEAL_NUMBER', type: 'number' },
                                        { name: 'TANK_ID', type: 'number' },
                                        { name: 'BAY_NUMBER', type: 'number' },
                                        { name: 'CUSTOMER_CODE', type: 'number' },
                                        { name: 'CUSTOMER_DESC', type: 'number' },
                                        { name: 'DESTINATION_CODE', type: 'number' },
                                        { name: 'DESTINATION_DESC', type: 'number' },
                                        { name: 'DENSITY_TYPE', type: 'number' },
                                        { name: 'TEMP_TYPE', type: 'number' },
                                        { name: 'FILLING_START_DATE', type: 'date' },
                                        { name: 'FILLING_START_TIME', type: 'number' },
                                        { name: 'FILLING_END_DATE', type: 'date' },
                                        { name: 'FILLING_END_TIME', type: 'number' },
                                        { name: 'PRELOAD_FLAG', type: 'string' },
                                        { name: 'POSTLOAD_FLAG', type: 'string' },

                                ],
                                root: "FanComp",
                                datatype: "json",
                                localdata: FanCompData,
                                async: false
                            };
                            var FanCompAdapter = new $.jqx.dataAdapter(FanCompDataSource, { autoBind: true });
                            FanCompDetails = FanCompAdapter.records;
                            //var nestedGrids = new Array();

                            // create nested grid.
                            var initrowdetails = function (index, parentElement, gridElement, record) {
                                var id = record.uid.toString();
                                var grid = $($(parentElement).children()[0]);
                                var secondGrid = $($(parentElement).children()[1]);
                                nestedGrids[index] = grid;
                                var filtergroup = new $.jqx.filter();
                                var filter_or_operator = 1;
                                var filtervalue = id;
                                var filtercondition = 'equal';
                                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                                // fill the orders depending on the id.
                                var ProdOrderDetailsbyid = [];
                                for (var m = 0; m < ProdOrderDetails.length; m++) {
                                    var result = filter.evaluate(ProdOrderDetails[m]["UNIQUE_ID"]);
                                    if (result)
                                        ProdOrderDetailsbyid.push(ProdOrderDetails[m]);
                                }

                                var FanCompDetailsbyid = [];
                                for (var m = 0; m < FanCompDetails.length; m++) {
                                    var result = filter.evaluate(FanCompDetails[m]["UNIQUE_ID"]);
                                    if (result)
                                        FanCompDetailsbyid.push(FanCompDetails[m]);
                                }

                                var ProdOrderDataSource = {
                                    datafields: [
                                        { name: 'UNIQUE_ID', type: 'number' },
                                        { name: 'LOCATION_CODE', type: 'string' },
                                        { name: 'FAN_NUMBER', type: 'number' },
                                        { name: 'LINE_NUMBER', type: 'number' },
                                        { name: 'CUSTOMER_CODE', type: 'string' },
                                        { name: 'CUSTOMER_DESC', type: 'string' },
                                        { name: 'DESTINATION_CODE', type: 'string' },
                                        { name: 'DESTINATION_DESC', type: 'string' },
                                        { name: 'PRODUCT_CODE', type: 'string' },
                                        { name: 'PRODUCT_DESC', type: 'string' },
                                        { name: 'ORDER_QUANTITY', type: 'number' },
                                        { name: 'QUANTITY_UOM', type: 'string' },
                                        { name: 'DENSITY', type: 'number' },
                                        { name: 'TEMPERATURE', type: 'number' },
                                        { name: 'CUSTOMER_SEAL_NUMBER', type: 'string' },
                                    ],
                                    id: 'ProdOrderID',
                                    localdata: ProdOrderDetailsbyid
                                }

                                var FanCompDataSource = {
                                    datafields: [
                                        { name: 'UNIQUE_ID', type: 'number' },
                                        { name: 'LOCATION_CODE', type: 'string' },
                                        { name: 'FAN_NUMBER', type: 'number' },
                                        { name: 'LOGICAL_COMPARTMENT', type: 'number' },
                                        { name: 'PRODUCT_CODE', type: 'number' },
                                        { name: 'COMP_CAPACITY_MASS', type: 'number' },
                                        { name: 'COMP_CAPACITY_MASS_UOM', type: 'number' },
                                        { name: 'COMP_CAPACITY_VOL', type: 'number' },
                                        { name: 'COMP_CAPACITY_VOL_UOM', type: 'number' },
                                        { name: 'ACTUAL_RAW_LADEN_WEIGHT', type: 'number' },
                                        { name: 'ACTUAL_GROSS_LADEN_WEIGHT', type: 'number' },
                                        { name: 'PHYSICAL_COMPARTMENT', type: 'number' },
                                        { name: 'ACTUAL_LOADED_MASS', type: 'number' },
                                        { name: 'ACTUAL_LOADED_VOL', type: 'number' },
                                        { name: 'OVER_RUN_QUANTITY', type: 'number' },
                                        { name: 'ACTUAL_LOADED_VOL_AT_15', type: 'number' },
                                        { name: 'DENSITY', type: 'number' },
                                        { name: 'DENSITY_AT_15', type: 'number' },
                                        { name: 'TEMPERATURE', type: 'number' },
                                        { name: 'TOP_SEAL_NUMBER', type: 'number' },
                                        { name: 'BOTTOM_SEAL_NUMBER', type: 'number' },
                                        { name: 'TANK_ID', type: 'number' },
                                        { name: 'BAY_NUMBER', type: 'number' },
                                        { name: 'CUSTOMER_CODE', type: 'number' },
                                        { name: 'CUSTOMER_DESC', type: 'number' },
                                        { name: 'DESTINATION_CODE', type: 'number' },
                                        { name: 'DESTINATION_DESC', type: 'number' },
                                        { name: 'DENSITY_TYPE', type: 'number' },
                                        { name: 'TEMP_TYPE', type: 'number' },
                                        { name: 'FILLING_START_DATE', type: 'date' },
                                        { name: 'FILLING_START_TIME', type: 'number' },
                                        { name: 'FILLING_END_DATE', type: 'date' },
                                        { name: 'FILLING_END_TIME', type: 'number' },
                                        { name: 'PRELOAD_FLAG', type: 'string' },
                                        { name: 'POSTLOAD_FLAG', type: 'string' },

                                    ],
                                    id: 'FanCompID',
                                    localdata: FanCompDetailsbyid
                                }

                                var ProdOrderGridAdapter = new $.jqx.dataAdapter(ProdOrderDataSource);
                                var FanCompGridAdapter = new $.jqx.dataAdapter(FanCompDataSource);
                                var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                                    return '<span style="background-color:#fff"></span> ';
                                }

                                if (grid != null) {
                                    grid.jqxGrid({
                                        filterable: true,
                                        width: '100%',
                                        height: 220,
                                        columnsresize: true,
                                        showtoolbar: true,
                                        rendertoolbar: function (statusbar) {
                                            // appends buttons to the status bar.
                                            var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                                            var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>FAN PROD ORDERS</span></div>");
                                            //var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Test</span></div>");
                                            container.append(tableHeading);
                                            //container.append(addButton);
                                            statusbar.append(container);
                                            //addButton.jqxButton({ height: 20 });
                                            //// add new row.
                                            //addButton.click(function (event) {
                                            //    updateNestedSubGrid();
                                            //});

                                        },
                                        ready: function () {
                                            createTooltip();
                                        },
                                        source: ProdOrderGridAdapter,
                                        columns: [
                                        { text: 'UNIQUE_ID', datafield: 'UNIQUE_ID', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                        { text: 'LOCATION_CODE', datafield: 'LOCATION_CODE', width: '4%', pinned: true , renderer: columnrendererTooltip},
                                        { text: 'FAN_NUMBER', datafield: 'FAN_NUMBER', width: '5%', pinned: true, renderer: columnrendererTooltip },
                                        { text: 'LINE_NUMBER', datafield: 'LINE_NUMBER', width: '3%', filtertype: 'checkedlist', cellsalign: 'center', renderer: columnrendererTooltip },
                                        { text: 'CUSTOMER_CODE', datafield: 'CUSTOMER_CODE', width: '7%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                                        { text: 'CUSTOMER_DESC', datafield: 'CUSTOMER_DESC', width: '14%', renderer: columnrendererTooltip },
                                        { text: 'DESTINATION_CODE', datafield: 'DESTINATION_CODE', width: '6%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                                        { text: 'DESTINATION_DESC', datafield: 'DESTINATION_DESC', width: '10%', renderer: columnrendererTooltip },
                                        { text: 'PRODUCT_CODE', datafield: 'PRODUCT_CODE', width: '8%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                                        { text: 'PRODUCT_DESC', datafield: 'PRODUCT_DESC', width: '12%', renderer: columnrendererTooltip },
                                        { text: 'ORDER_QUANTITY', datafield: 'ORDER_QUANTITY', width: '8%', renderer: columnrendererTooltip },
                                        { text: 'QUANTITY_UOM', datafield: 'QUANTITY_UOM', width: '3%', filtertype: 'checkedlist', cellsalign: 'center', renderer: columnrendererTooltip },
                                        { text: 'DENSITY', datafield: 'DENSITY', width: '6%', renderer: columnrendererTooltip },
                                        { text: 'TEMPERATURE', datafield: 'TEMPERATURE', width: '5%', renderer: columnrendererTooltip },
                                        { text: 'CUSTOMER_SEAL_NUMBER', datafield: 'CUSTOMER_SEAL_NUMBER', width: '5%', renderer: columnrendererTooltip },
                                        ]
                                    });
                                }

                                if (secondGrid != null) {
                                    secondGrid.jqxGrid({
                                        filterable: true,
                                        width: '100%',
                                        height: 220,
                                        columnsresize: true,
                                        //autoheight: true,
                                        showtoolbar: true,
                                        rendertoolbar: function (statusbar) {
                                            // appends buttons to the status bar.
                                            var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                                            var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>FAN COMPARTMENTS</span></div>");
                                            container.append(tableHeading);
                                            statusbar.append(container);
                                        },
                                        source: FanCompGridAdapter,
                                        ready: function () {
                                            createTooltip();
                                        },
                                        columns: [
                                            { text: 'UNIQUE_ID', datafield: 'UNIQUE_ID', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                            { text: 'LOCATION_CODE', datafield: 'LOCATION_CODE', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                            { text: 'FAN_NUMBER', datafield: 'FAN_NUMBER', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                            { text: 'LOGICAL_COMPARTMENT', datafield: 'LOGICAL_COMPARTMENT', width: '3%', filtertype: 'checkedlist', cellsalign: 'center', pinned: true, renderer: columnrendererTooltip },
                                            { text: 'PRODUCT_CODE', datafield: 'PRODUCT_CODE', filtertype: 'checkedlist', width: '5%', renderer: columnrendererTooltip },
                                            { text: 'COMP_CAPACITY_MASS', datafield: 'COMP_CAPACITY_MASS', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'COMP_CAPACITY_MASS_UOM', datafield: 'COMP_CAPACITY_MASS_UOM', width: '3%', cellsalign: 'center', renderer: columnrendererTooltip },
                                            { text: 'COMP_CAPACITY_VOL', datafield: 'COMP_CAPACITY_VOL', width: '4%', renderer: columnrendererTooltip },
                                            { text: 'COMP_CAPACITY_VOL_UOM', datafield: 'COMP_CAPACITY_VOL_UOM', width: '3%', cellsalign: 'center', renderer: columnrendererTooltip },
                                            { text: 'ACTUAL_RAW_LADEN_WEIGHT', datafield: 'ACTUAL_RAW_LADEN_WEIGHT', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'ACTUAL_GROSS_LADEN_WEIGHT', datafield: 'ACTUAL_GROSS_LADEN_WEIGHT', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'PHYSICAL_COMPARTMENT', datafield: 'PHYSICAL_COMPARTMENT', width: '3%', cellsalign: 'center', renderer: columnrendererTooltip },
                                            { text: 'ACTUAL_LOADED_MASS', datafield: 'ACTUAL_LOADED_MASS', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'ACTUAL_LOADED_VOL', datafield: 'ACTUAL_LOADED_VOL', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'OVER_RUN_QUANTITY', datafield: 'OVER_RUN_QUANTITY', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'ACTUAL_LOADED_VOL_AT_15', datafield: 'ACTUAL_LOADED_VOL_AT_15', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'DENSITY', datafield: 'DENSITY', width: '5%', renderer: columnrendererTooltip },
                                            { text: 'DENSITY_AT_15', datafield: 'DENSITY_AT_15', width: '5%', renderer: columnrendererTooltip },
                                            { text: 'TEMPERATURE', datafield: 'TEMPERATURE', width: '4%', renderer: columnrendererTooltip },
                                            { text: 'TOP_SEAL_NUMBER', datafield: 'TOP_SEAL_NUMBER', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'BOTTOM_SEAL_NUMBER', datafield: 'BOTTOM_SEAL_NUMBER', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'TANK_ID', datafield: 'TANK_ID', filtertype: 'checkedlist', width: '3%', renderer: columnrendererTooltip },
                                            { text: 'BAY_NUMBER', datafield: 'BAY_NUMBER', filtertype: 'checkedlist', width: '4%', renderer: columnrendererTooltip },
                                            { text: 'CUSTOMER_CODE', datafield: 'CUSTOMER_CODE', width: '5%', renderer: columnrendererTooltip },
                                            { text: 'CUSTOMER_DESC', datafield: 'CUSTOMER_DESC', width: '12%', renderer: columnrendererTooltip },
                                            { text: 'DESTINATION_CODE', datafield: 'DESTINATION_CODE', width: '5%', renderer: columnrendererTooltip },
                                            { text: 'DESTINATION_DESC', datafield: 'DESTINATION_DESC', width: '8%', renderer: columnrendererTooltip },
                                            { text: 'DENSITY_TYPE', datafield: 'DENSITY_TYPE', filtertype: 'checkedlist', width: '2%', renderer: columnrendererTooltip },
                                            { text: 'TEMP_TYPE', datafield: 'TEMP_TYPE', filtertype: 'checkedlist', width: '2%', renderer: columnrendererTooltip },
                                            { text: 'FILLING_START_DATE', datafield: 'FILLING_START_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                            { text: 'FILLING_START_TIME', datafield: 'FILLING_START_TIME', width: '4%', renderer: columnrendererTooltip },
                                            { text: 'FILLING_END_DATE', datafield: 'FILLING_END_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                            { text: 'FILLING_END_TIME', datafield: 'FILLING_END_TIME', width: '4%', renderer: columnrendererTooltip },
                                            { text: 'PRELOAD_FLAG', datafield: 'PRELOAD_FLAG', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                            { text: 'POSTLOAD_FLAG', datafield: 'POSTLOAD_FLAG', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip }
                                        ]
                                    });
                                }
                            }

                            
                            // creage jqxgrid
                            $("#jqxgrid").jqxGrid(
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
                                showtoolbar: true,
                                rendertoolbar: function (statusbar) {
                                    // appends buttons to the status bar.
                                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>FAN HEADER</span></div>");
                                    container.append(tableHeading);
                                    statusbar.append(container);
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
                                rowdetails: true,
                                rowsheight: 35,
                                initrowdetails: initrowdetails,
                                rowdetailstemplate:
                                    {
                                        rowdetails: "<div id='grid' style='margin: 10px;'></div><div class='secondGrid' style='margin: 10px;'></div>",
                                        rowdetailsheight: 465, rowdetailshidden: true
                                    },

                                rendergridrows: function () {
                                    return dataAdapter.records;
                                },
                                ready: function () {
                                    //$("#jqxgrid").jqxGrid('showrowdetails', 1);
                                    createTooltip();
                                },
                                columns: [
                                    { text: 'UNIQUE_ID', datafield: 'UNIQUE_ID', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                    { text: 'LOCATION_CODE', datafield: 'LOCATION_CODE', width: '3%', pinned: true, renderer: columnrendererTooltip },
                                    { text: 'FAN_NUMBER', datafield: 'FAN_NUMBER', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                    { text: 'LOAD_NUMBER', datafield: 'LOAD_NUMBER', width: '4%', pinned: true, renderer: columnrendererTooltip },
                                    { text: 'SCHEDULED_DATE', datafield: 'SCHEDULED_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'VEHICLE_CODE', datafield: 'VEHICLE_CODE', width: '6%', renderer: columnrendererTooltip },
                                    { text: 'CONTRACTOR_CODE', datafield: 'CONTRACTOR_CODE', width: '5%', renderer: columnrendererTooltip },
                                    { text: 'NO_OF_COMPARTMENTS', datafield: 'NO_OF_COMPARTMENTS', width: '3%', filtertype: 'checkedlist', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'USE_COMPARTMENTS', datafield: 'USE_COMPARTMENTS', width: '2%', filtertype: 'checkedlist', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'CALIBRATION_EXPIRY_DATE', datafield: 'CALIBRATION_EXPIRY_DATE', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'EXPLOSIVE_EXPIRY_DATE', datafield: 'EXPLOSIVE_EXPIRY_DATE', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'LICENSE_EXPIRY_DATE', datafield: 'LICENSE_EXPIRY_DATE', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'GROSS_CAPACITY', datafield: 'GROSS_CAPACITY', width: '3%', renderer: columnrendererTooltip },
                                    { text: 'RATED_GROSS_LADEN_WEIGHT', datafield: 'RATED_GROSS_LADEN_WEIGHT', width: '3%', renderer: columnrendererTooltip },
                                    { text: 'Actual_Raw_Laden_Weight', datafield: 'Actual_Raw_Laden_Weight', width: '3%', renderer: columnrendererTooltip },
                                    { text: 'Actual_Gross_Laden_Weight', datafield: 'Actual_Gross_Laden_Weight', width: '3%', renderer: columnrendererTooltip },
                                    { text: 'OIL_COMPANY', datafield: 'OIL_COMPANY', width: '3%', renderer: columnrendererTooltip },
                                    { text: 'NO_OF_CUSTOMERS', datafield: 'NO_OF_CUSTOMERS', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'NO_OF_PRODUCTS', datafield: 'NO_OF_PRODUCTS', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'PROCESSING_STATUS', datafield: 'PROCESSING_STATUS', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'PROCESSING_RESPONSE', datafield: 'PROCESSING_RESPONSE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'CANCEL_REQUEST', datafield: 'CANCEL_REQUEST', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'CANCEL_RESPONSE', datafield: 'CANCEL_RESPONSE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'ACTIVE_FLAG', datafield: 'ACTIVE_FLAG', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'WEIGHT_BASED_FLAG', datafield: 'WEIGHT_BASED_FLAG', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'WEIGHT_BASED_TYPE', datafield: 'WEIGHT_BASED_TYPE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'ACK_RESPONSE', datafield: 'ACK_RESPONSE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'ACK_REASON_CODE', datafield: 'ACK_REASON_CODE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'POSTLOAD_RESPONSE', datafield: 'POSTLOAD_RESPONSE', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip },
                                    { text: 'PRELOAD_DATE', datafield: 'PRELOAD_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'PRELOAD_TIME', datafield: 'PRELOAD_TIME', width: '4%', renderer: columnrendererTooltip },
                                    { text: 'ACK_DATE', datafield: 'ACK_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'ACK_TIME', datafield: 'ACK_TIME', width: '4%', renderer: columnrendererTooltip },
                                    { text: 'POSTLOAD_DATE', datafield: 'POSTLOAD_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'POSTLOAD_TIME', datafield: 'POSTLOAD_TIME', width: '4%', renderer: columnrendererTooltip },
                                    { text: 'CANCEL_DATE', datafield: 'CANCEL_DATE', width: '5%', filtertype: 'date', cellsformat: 'dd-MMM-yy', renderer: columnrendererTooltip },
                                    { text: 'CANCEL_TIME', datafield: 'CANCEL_TIME', width: '4%', renderer: columnrendererTooltip },
                                    { text: 'SYNC_FLAG', datafield: 'SYNC_FLAG', width: '2%', cellsalign: 'center', renderer: columnrendererTooltip }
                                ]
                            });
                        }
                    });
                }
            });
            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                }
            });
            
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function updateNestedSubGrid() {
    alert('updateNestedSubGrid');
}
