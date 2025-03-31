var source;
$(document).ready(function () {
    //ViewTankArchive();
    InitDTPickers();

    $.ajax({
        type: "GET",
        //url: "/TankArchive/LoadTankDataDetails",
        url: GetURL(),
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TankID', type: 'number' },
                    { name: 'Selected', type: 'bool' },
                    { name: 'DataTimeStamp', type: 'date' },
                    { name: 'TankName', type: 'string' },
                    { name: 'SAPTankNo', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'ProductLevel', type: 'number' },
                    { name: 'SecondaryLevel', type: 'number' },
                    { name: 'StdDensity', type: 'number' },
                    { name: 'AmbDensity', type: 'number' },
                    { name: 'DipType', type: 'string'},
                    { name: 'TankModeID', type: 'number'},
                    { name: 'ModeName', type: 'string' },
                    { name: 'TempProduct', type: 'number' },
                    { name: 'SAPResponse', type: 'string' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'GrossQty', type: 'number' },
                    { name: 'TOV', type: 'number' },
                    { name: 'GSV', type: 'number' },
                    { name: 'ProductMass', type: 'number' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostStatus', type: 'string' },
                    { name: 'PostedBy', type: 'string' }
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

            $("#jqxgrid").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                editable: false,
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tanks Data Archive</span></div>");

                    container.append(tableHeading);
                    statusbar.append(container);

                },
                ready: function () {
                    PageSize = adapter.records.length;
                    if (PageSize > iGblNoRows) { PageSize = iGblNoRows; }
                    $("#jqxgrid").jqxGrid({ pagesize: PageSize });
                    $("#jqxgrid").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
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
                    { text: 'TankID', datafield: 'TankID', filtertype: 'checkedlist', width: '0%', hidden: true},
                    { text: 'Date Time', datafield: 'DataTimeStamp', filtertype: 'date', cellsformat: 'dd-MMM-yyyy HH:mm', width: '10%' },
                    { text: 'Tank Name', datafield: 'TankName', filtertype: 'checkedlist', width: '6%'},
                    { text: 'SAP Tank No', datafield: 'SAPTankNo', filtertype: 'checkedlist', width: '6%'},
                    { text: 'Product Name', datafield: 'ProductName', filtertype: 'checkedlist', width: '8%'},
                    { text: 'Tank Mode', datafield: 'ModeName', filtertype: 'checkedlist', width: '10%' },
                    //{ text: 'Dip Type', datafield: 'DipType', filtertype: 'checkedlist', width: '8%'},
                    { text: 'Pri Level (' + TFMSLevelUnit + ')', datafield: 'ProductLevel', width: '6%' },
                    { text: 'Sec Level (' + TFMSLevelUnit + ')', datafield: 'SecondaryLevel', width: '6%' },                    
                    { text: 'Temp (°C)', datafield: 'TempProduct', width: '6%' },
                    { text: 'Press (kg/cm²)', datafield: 'Pressure', width: '6%' },
                    { text: 'Gross Qty (KL)', datafield: 'GrossQty', width: '8%' },
                    { text: 'TOV (KL)', datafield: 'TOV', width: '8%' },
                    { text: 'GSV (KL)', datafield: 'GSV', width: '8%' },
                    //{ text: 'SAPResponse', datafield: 'SAPResponse', width: '14%' },
                    { text: 'PostStatus', datafield: 'PostStatus', filtertype: 'checkedlist', width: '5%' },
                    { text: 'PostedBy', datafield: 'PostedBy', width: '7%' },
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

            $("#jqxgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    //EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    selectedRowRef = selectedRowData["BayName"];
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

});

function InitDTPickers() {

    $('#dtpTnkArchFrom').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        stepping: 15,
        maxDate: new Date()
    });

    $('#dtpTnkArchTo').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        stepping: 15,
        maxDate: new Date()
    });
}

function ViewTankArchive()
{
    $.ajax({
        type: "GET",
        url: GetURL(),
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var rows = result.length;
            var newsource =
            {
                datafields: [
                    { name: 'TankID', type: 'number' },
                    { name: 'Selected', type: 'bool' },
                    { name: 'DataTimeStamp', type: 'date' },
                    { name: 'TankName', type: 'string' },
                    { name: 'SAPTankNo', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'ProductLevel', type: 'number' },
                    { name: 'StdDensity', type: 'number' },
                    { name: 'AmbDensity', type: 'number' },
                    { name: 'DipType', type: 'string' },
                    { name: 'TankModeID', type: 'number' },
                    { name: 'ModeName', type: 'string' },
                    { name: 'TempProduct', type: 'number' },
                    { name: 'SAPResponse', type: 'string' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostStatus', type: 'string' },
                    { name: 'PostedBy', type: 'string' }
                ],
                datatype: "json",
                async: false,
                localdata: data
            };
            source.localdata = newsource.localdata;
            if (rows > iGblNoRows || rows < 1) { rows = iGblNoRows; }
            
            if ($('#jqxgrid').hasClass("jqx-widget") == false) { return; }
            $('#jqxgrid').jqxGrid('updatebounddata', 'cells');
            $("#jqxgrid").jqxGrid({ pagesize: rows });
            $("#jqxgrid").jqxGrid({ pagesizeoptions: [rows, rows * 2, rows * 3] });
        }
    });
}

function GetURL()
{
    //var strUrl = "/TankArchive/LoadTankData";
    var strUrl = "/TankArchive/LoadTankDataDetails";
    if ($('#dtpTnkArchFrom').val() != null && $('#dtpTnkArchTo').val() != null
        && $('#dtpTnkArchFrom').val() != 'undefined' && $('#dtpTnkArchTo').val() != 'undefined'
        && $('#dtpTnkArchFrom').val() != "" && $('#dtpTnkArchTo').val() != "") {
        strUrl = strUrl + "?FromDT=" + $('#dtpTnkArchFrom').val() + "&ToDT=" + $('#dtpTnkArchTo').val();
    }
    if ($('#ddlPosted option:selected').val() != null && $('#ddlPosted option:selected').val() != 'undefined') {
        if (strUrl.indexOf("?") > 0) {
            strUrl = strUrl + '&Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
        else {
            strUrl = strUrl + '?Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
    }
    return strUrl;
}

function DownloadTankArchive()
{
    var strUrl = "/TankArchive/TankDataToExcel";

    if ($('#dtpTnkArchFrom').val() != null && $('#dtpTnkArchTo').val() != null 
        &&  $('#dtpTnkArchFrom').val() != 'undefined'  && $('#dtpTnkArchTo').val() != 'undefined' 
        && $('#dtpTnkArchFrom').val() != "" && $('#dtpTnkArchTo').val() != "" )
    {
        strUrl = "/TankArchive/TankDataToExcel?FromDT=" + $('#dtpTnkArchFrom').val() + "&ToDT=" + $('#dtpTnkArchTo').val();
    }
    if ($('#ddlPosted option:selected').val() != null && $('#ddlPosted option:selected').val() != 'undefined') {
        if (strUrl.indexOf("?") > 0) {
            strUrl = strUrl + '&Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
        else {
            strUrl = strUrl + '?Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
    }
}

function UpdateHREF()
{
    $('#downloadButton').attr('href', function () {
        return CreateExcelURL();
    });
}

function CreateExcelURL()
{
    var strUrl = "/TankArchive/TankDataToExcel";

    if ($('#dtpTnkArchFrom').val() != null && $('#dtpTnkArchTo').val() != null
        && $('#dtpTnkArchFrom').val() != 'undefined' && $('#dtpTnkArchTo').val() != 'undefined'
        && $('#dtpTnkArchFrom').val() != "" && $('#dtpTnkArchTo').val() != "") {
        strUrl = "/TankArchive/TankDataToExcel?FromDT=" + $('#dtpTnkArchFrom').val() + "&ToDT=" + $('#dtpTnkArchTo').val();
    }
    if ($('#ddlPosted option:selected').val() != null && $('#ddlPosted option:selected').val() != 'undefined') {
        if (strUrl.indexOf("?") > 0) {
            strUrl = strUrl + '&Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
        else {
            strUrl = strUrl + '?Posted=' + encodeURIComponent($('#ddlPosted option:selected').val());
        }
    }
    return strUrl;
}