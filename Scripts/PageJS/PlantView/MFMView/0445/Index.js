var selectedRowId, selectedRowRef, GridRows, source;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/PlantView/MFMViewData",
        //cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            source =
            {
                datatype: "json",
                datafields: [
                    { name: 'BayID', type: 'number' },
                    { name: 'ArmNo', type: 'number' },
                    { name: 'LoadingPointNo', type: 'number' },
                    { name: 'MeterCompNo', type: 'number' },
                    { name: 'MeterNo', type: 'string' },
                    { name: 'BaseProd', type: 'string' },
                    { name: 'SlaveID', type: 'number' },
                    { name: 'DSName', type: 'string' },
                    { name: 'TagName', type: 'string' },
                    { name: 'Conn01', type: 'bool' },
                    { name: 'Conn02', type: 'bool' },
                    { name: 'obsDensity', type: 'number' },
                    { name: 'stdDensity', type: 'number' },                    
                    { name: 'obsTemp', type: 'number' },
                    { name: 'VFlowRate', type: 'number' },
                    { name: 'MassFlowRate', type: 'number' },
                    { name: 'obsVTotlzer', type: 'number' },
                    { name: 'obsMassTotlzer', type: 'number' },
                    { name: 'KFactor', type: 'number' },
                    { name: 'ErrMsg', type: 'string' },
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
                pagesizeoptions: [21, 21*2, 21*3],
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>MFM Data View</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);

                },
                ready: function () { SetTagArray();
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
                  { text: 'Bay#', datafield: 'BayID', cellsalign: 'center', filtertype: "checkedlist", width: "4%" },
                  { text: 'Arm#', datafield: 'ArmNo', cellsalign: 'center', filtertype: "checkedlist", width: "4%" },
                  { text: 'LP#', datafield: 'LoadingPointNo', hidden: true, cellsalign: 'center', filtertype: "checkedlist", width: "0%" },
                  { text: 'ArmMtr#', datafield: 'MeterCompNo', cellsalign: 'center', filtertype: "checkedlist", width: "4%" },
                  { text: 'MeterTag', datafield: 'MeterNo', cellsalign: 'center', width: "6%" },
                  { text: 'Product', datafield: 'BaseProd', cellsalign: 'center', filtertype: "checkedlist", width: "6%" },
                  { text: 'SlaveID', datafield: 'SlaveID', cellsalign: 'center', filtertype: "checkedlist", width: "4%" },
                  { text: 'Source', datafield: 'DSName', filtertype: "checkedlist", width: "6%" },
                  { text: 'TagName', datafield: 'TagName', hidden: true, width: "0%" },
                  { text: 'Pri Conn', datafield: 'Conn01', width: "4%", cellsrenderer: cellsrenderer  },
                  { text: 'Sec Conn', datafield: 'Conn02', width: "4%", cellsrenderer: cellsrenderer },
                  { text: 'ObsDensity (g/cc)', datafield: 'obsDensity', cellsalign: 'center', width: "8%"},
                  { text: 'StdDensity (g/cc)', datafield: 'stdDensity', cellsalign: 'center', width: "8%" },
                  { text: 'Temp(°C)', datafield: 'obsTemp', cellsalign: 'center', width: "6%" },
                  { text: 'Vol.Flow (m³/Hr)', datafield: 'VFlowRate', cellsalign: 'center', width: "8%" },
                  { text: 'Vol.Totalizer(m³)', datafield: 'obsVTotlzer', cellsalign: 'center', width: "10%" },
                  { text: 'Mass Flow (' + FlowRateUnit + ')', datafield: 'MassFlowRate', cellsalign: 'center', width: "8%" },
                  { text: 'Mass Totalizer(m³)', datafield: 'obsMassTotlzer', cellsalign: 'center', width: "10%" },
                  //{ text: 'Pulse/Unit', datafield: 'KFactor', cellsalign: 'center', width: "5%" },
                  //{ text: 'Status', datafield: 'ErrMsg', cellsalign: 'left', width: "19%" },
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

//function JQXTableUpdate(item) {
//    console.log(item);
//    var controlName = item.ControlName.toUpperCase();
//    var index = JQXTagNames.findIndex(x => x.indexOf(controlName) >= 0);
//    if (index >= 0) {
//        var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', index);
//        if (selectedRowData != undefined && selectedRowData[item.ClassName] != item.Value) {
//            if (item.Value == null || item.Value == undefined) { item.Value = ""; }
//            if (item.Quality < 192) { item.Value = item.Value + "?"; }
//            if (item.DataType.toLowerCase() == "bool") { item.Value = item.Value.toLowerCase(); }
//            $("#jqxgrid").jqxGrid('setcellvalue', index, item.ClassName, item.Value);
//        }
//    }
//}
function JQXTableUpdate(item) {
    //console.log(item);
    var controlName = item.ControlName.toUpperCase();
    var index = JQXTagNames.findIndex(x => x.indexOf(controlName) >= 0);
    if (index >= 0) {
        if (GridRows[index] != undefined) {
            //console.log(item);
            if (item.Value == null || item.Value == undefined) { item.Value = ""; }
            if (item.Quality < 192) { item.Value = item.Value + "?"; }
            if (item.DataType.toLowerCase() == "bool") { item.Value = item.Value.toLowerCase(); }
                GridRows[index][item.ClassName] = item.Value;
        }
    }
}


function ExtraActivities(model) {
    //console.log('MFMView. Tags:' + model.length);
    if ($('#jqxgrid').hasClass("jqx-widget") == true) {
        source.localdata = GridRows;
        $('#jqxgrid').jqxGrid('updatebounddata', 'cells');
    }
}

function SetTagArray() {
    JQXrowCount = $('#jqxgrid').jqxGrid('getrows').length;
    GridRows = $('#jqxgrid').jqxGrid('getrows');
    JQXTagNames = [];
    for (var i = 0; i < GridRows.length; i++) {
        JQXTagNames.push(GridRows[i].TagName.toUpperCase());
    }
    opcPageName = "MFMView.*,MFMTableView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
}