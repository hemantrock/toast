var selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/PlantView/DeviceTableData?TypeIDs=" + TypeIDs,
        //cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'UniqueID', type: 'number' },
                    { name: 'TypeSeqNo', type: 'number' },
                    { name: 'DeviceName', type: 'string' },
                    { name: 'DeviceDesc', type: 'string' },
                    { name: 'SlaveID', type: 'number' },
                    { name: 'DeviceGroup', type: 'string' },
                    { name: 'LocationDesc', type: 'string' },
                    { name: 'TankName', type: 'string' },
                    { name: 'Product', type: 'string' },
                    { name: 'TagName', type: 'string' },
                    { name: 'TagUnits', type: 'string' },
                    { name: 'DSName', type: 'string' },
                    { name: 'Conn01', type: 'bool' },
                    { name: 'Conn02', type: 'bool' },
                    { name: 'DevValue', type: 'number' },
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
            var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                //return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="alert_' + value + '"></span></div>';
                return '<div style="text-align: center; top:5px" class="circle-cont-sm"><span class="status_' + value + '"></span></div>';
            }
            $("#jqxgrid").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: 21,
                pagesizeoptions: [21, 21 * 2, 21 * 3],
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>DEVICE Data View</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);

                },
                ready: function () {
                    SetTagArray();
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
                  { text: 'UniqueID', datafield: 'UniqueID', cellsalign: 'center', filtertype: "checkedlist", width: "4%", hidden: true },
                  { text: 'TypeSeqNo', datafield: 'TypeSeqNo', cellsalign: 'center', filtertype: "checkedlist", width: "4%", hidden: true },
                  { text: 'DeviceGroup', datafield: 'DeviceGroup', filtertype: "checkedlist", width: "12%" },
                  { text: 'Device Name', datafield: 'DeviceName', width: "12%" },
                  { text: 'Device Desc', datafield: 'DeviceDesc', width: "20%" },
                  { text: 'LocationDesc', datafield: 'LocationDesc', filtertype: "checkedlist", width: "15%" },
                  { text: 'SlaveID', datafield: 'SlaveID', filtertype: "checkedlist", cellsalign: 'center', width: "6%" },
                  { text: 'Product', datafield: 'Product', cellsalign: 'center', filtertype: "checkedlist", width: "8%" },
                  { text: 'TankName', datafield: 'TankName', cellsalign: 'center', width: "10%" },
                  { text: 'DSName', datafield: 'DSName', cellsalign: 'center', width: "6%", hidden: true },
                  { text: 'TagName', datafield: 'TagName', hidden: true, width: "0%" },
                  { text: 'Pri Conn', datafield: 'Conn01', width: "4%", cellsrenderer: cellsrenderer, hidden: true },
                  { text: 'Sec Conn', datafield: 'Conn02', width: "4%", cellsrenderer: cellsrenderer, hidden: true },
                  { text: 'Value', datafield: 'DevValue', cellsalign: 'center', width: "10%" },
                  { text: 'Unit', datafield: 'TagUnits', cellsalign: 'center', width: "7%" },
                  
                ]
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function ExtraActivities(model) {
    console.log('DeviceTableView. Tags:' + model.length);
}

function SetTagArray() {
    JQXrowCount = $('#jqxgrid').jqxGrid('getrows').length;
    var rows = $('#jqxgrid').jqxGrid('getrows');
    JQXTagNames = [];
    for (var i = 0; i < rows.length; i++) {
        JQXTagNames.push(rows[i].TagName.toUpperCase());
    }
    opcPageName = "DeviceTableView";
    opc.server.addToGroup(opcPageName);
    opc.server.readPageTags(opcPageName);
}