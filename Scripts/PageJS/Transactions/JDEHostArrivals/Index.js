var selectedRowId, selectedRowRef;
//var iGblNoRows = 10;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/JDEData/GetHostTTArrival",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'UNIQUE_ID', type: 'number' },
                    { name: 'SEQUENCE_NUMBER', type: 'number' },
                    { name: 'VEHICLE_CODE', type: 'string' },
                    { name: 'LOCATION_CODE', type: 'string' },
                    { name: 'FAN_NUMBER', type: 'number' },
                    { name: 'CARD_NUMBER', type: 'number' },
                    { name: 'PROCESSING_STATUS', type: 'string' },
                    { name: 'SEQUENCING_ID', type: 'number' },
                    { name: 'EVENT_BYPASS', type: 'string' },
                    { name: 'PROCESSING_RESPONSE', type: 'string' },
                    { name: 'OIL_COMPANY', type: 'string' },
                    { name: 'EVENT_DATE', type: 'date' },
                    { name: 'EVENT_TIME', type: 'number' }
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>JDE Host Arrival</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);
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
                    { text: 'UNIQUE ID', datafield: 'UNIQUE_ID', width: '7%', pinned: true },
                    { text: 'SEQUENCE NUMBER', datafield: 'SEQUENCE_NUMBER', width: '8%', pinned: true },
                    { text: 'VEHICLE CODE', datafield: 'VEHICLE_CODE', width: '7%', pinned: true },
                    { text: 'LOCATION CODE', datafield: 'LOCATION_CODE', width: '7%' },
                    { text: 'FAN NUMBER', datafield: 'FAN_NUMBER', width: '6%' },
                    { text: 'CARD NUMBER', datafield: 'CARD_NUMBER', width: '6%' },
                    { text: 'PROCESSING STATUS', datafield: 'PROCESSING_STATUS', width: '12%' },
                    { text: 'SEQUENCING ID', datafield: 'SEQUENCING_ID', width: '7%' },
                    { text: 'EVENT BYPASS', datafield: 'EVENT_BYPASS', width: '7%' },
                    { text: 'PROCESSING RESPONSE', datafield: 'PROCESSING_RESPONSE', width: '12%' },
                    { text: 'OIL COMPANY', datafield: 'OIL_COMPANY', width: '7%' },
                    { text: 'EVENT DATE', datafield: 'EVENT_DATE', width: '7%', filtertype: 'date', cellsformat: 'dd-MMM-yy' },
                    { text: 'EVENT TIME', datafield: 'EVENT_TIME', width: '7%' },
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