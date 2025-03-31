var selectedRowId, selectedRowRef;

$(document).ready(function () {
    var columnrendererTooltip = function (value) {
        return '<div class="tooltips" onmouseover="createTooltip();" title="' + value + '" style="margin: 12px 0 0 4px;">' + value + '</div>';
    }

    $.ajax({
        type: "GET",
        url: "/TFMSHost/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'SEQUENCE_NUMBER', type: 'number' },
                    { name: 'LOCATION_CODE', type: 'string' },
                    { name: 'TANK_CODE', type: 'string' },
                    { name: 'DESCRIPTION', type: 'string' },
                    { name: 'TANK_CAPICITY', type: 'number' },
                    { name: 'ITEM_NUMBER', type: 'number' },
                    { name: 'PRODUCT_LEVEL', type: 'number' },
                    { name: 'PRODUCT_GROSS_QUANTITY', type: 'number' },
                    { name: 'PRODUCT_NET_QUANTITY', type: 'number' },
                    { name: 'TOTAL_OBSERVED_VOLUME', type: 'number' },
                    { name: 'TANK_HHH_CAPACITY', type: 'number' },
                    { name: 'AVERAGE_TEMPERATURE', type: 'number' },
                    { name: 'DENSITY', type: 'number' },
                    { name: 'WATER_LEVEL', type: 'number' },
                    { name: 'WATER_VOLUME', type: 'number' },
                    { name: 'TANK_ALARMS', type: 'number' },
                    { name: 'TANK_MODE_INDICATOR', type: 'string' },
                    { name: 'TANK_STATUS', type: 'string' },
                    { name: 'VOLUME_UOM', type: 'string' },
                    { name: 'TANK_ID_JDE', type: 'string' },
                    { name: 'RECORD_DATE', type: 'date' },
                    { name: 'RECORD_TIME', type: 'number' },
                    { name: 'PROCESSING_STATUS', type: 'string' },
                    { name: 'PROCESSING_RESPONSE', type: 'string' },
                    { name: 'PROCESSED_DATE', type: 'date' },
                    { name: 'PROCESSED_TIME', type: 'number' }
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
                width: "100%",
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>JDE TFMS Data</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);
                },
                ready: function () {
                    createTooltip();
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
                    { text: 'SEQUENCE_NUMBER', datafield: 'SEQUENCE_NUMBER', width: '3%', pinned: true, renderer: columnrendererTooltip },
                    { text: 'LOCATION_CODE', datafield: 'LOCATION_CODE', width: '4%', pinned: true, renderer: columnrendererTooltip },
                    { text: 'TANK_CODE', datafield: 'TANK_CODE', width: '4%', pinned: true, filtertype: 'checkedlist', renderer: columnrendererTooltip },
                    { text: 'DESCRIPTION', datafield: 'DESCRIPTION', width: '8%', renderer: columnrendererTooltip },
                    { text: 'TANK_CAPICITY', datafield: 'TANK_CAPICITY', width: '4%', renderer: columnrendererTooltip },
                    { text: 'ITEM_NUMBER', datafield: 'ITEM_NUMBER', width: '4%', renderer: columnrendererTooltip },
                    { text: 'PRODUCT_LEVEL', datafield: 'PRODUCT_LEVEL', width: '6%', renderer: columnrendererTooltip },
                    { text: 'PRODUCT_GROSS_QUANTITY', datafield: 'PRODUCT_GROSS_QUANTITY', width: '6%', renderer: columnrendererTooltip },
                    { text: 'PRODUCT_NET_QUANTITY', datafield: 'PRODUCT_NET_QUANTITY', width: '4%', renderer: columnrendererTooltip },
                    { text: 'TOTAL_OBSERVED_VOLUME', datafield: 'TOTAL_OBSERVED_VOLUME', width: '6%', renderer: columnrendererTooltip },
                    { text: 'TANK_HHH_CAPACITY', datafield: 'TANK_HHH_CAPACITY', width: '4%', renderer: columnrendererTooltip },
                    { text: 'AVERAGE_TEMPERATURE', datafield: 'AVERAGE_TEMPERATURE', width: '4%', renderer: columnrendererTooltip },
                    { text: 'DENSITY', datafield: 'DENSITY', width: '6%', renderer: columnrendererTooltip },
                    { text: 'WATER_LEVEL', datafield: 'WATER_LEVEL', width: '5%', renderer: columnrendererTooltip },
                    { text: 'WATER_VOLUME', datafield: 'WATER_VOLUME', width: '6%', renderer: columnrendererTooltip },
                    { text: 'TANK_ALARMS', datafield: 'TANK_ALARMS', width: '3%', renderer: columnrendererTooltip },
                    { text: 'TANK_MODE_INDICATOR', datafield: 'TANK_MODE_INDICATOR', width: '3%', renderer: columnrendererTooltip },
                    { text: 'TANK_STATUS', datafield: 'TANK_STATUS', width: '3%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                    { text: 'VOLUME_UOM', datafield: 'VOLUME_UOM', width: '3%', renderer: columnrendererTooltip },
                    { text: 'TANK_ID_JDE', datafield: 'TANK_ID_JDE', width: '3%', renderer: columnrendererTooltip },
                    { text: 'RECORD_DATE', datafield: 'RECORD_DATE', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM-yyyy', renderer: columnrendererTooltip },
                    { text: 'RECORD_TIME', datafield: 'RECORD_TIME', width: '5%', renderer: columnrendererTooltip },
                    { text: 'PROCESSING_STATUS', datafield: 'PROCESSING_STATUS', width: '3%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                    { text: 'PROCESSING_RESPONSE', datafield: 'PROCESSING_RESPONSE', width: '3%', filtertype: 'checkedlist', renderer: columnrendererTooltip },
                    { text: 'PROCESSED_DATE', datafield: 'PROCESSED_DATE', width: '6%', filtertype: 'date', cellsformat: 'dd-MMM-yyyy', renderer: columnrendererTooltip },
                    { text: 'PROCESSED_TIME', datafield: 'PROCESSED_TIME', width: '5%', renderer: columnrendererTooltip }
                ]
            });


            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    //selectedRowRef = selectedRowData["CardNumber"] + " (" + selectedRowData["PrivilegeDesc"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});
