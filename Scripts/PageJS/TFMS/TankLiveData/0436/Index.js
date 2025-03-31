var selectedRowId, selectedRowRef;
var source, GridRows, tankModes, SummGridRows, SummSource;
var JQXSummTags = [];
var LevelTag = "_LEVEL"; var HHHTag = "_LVL_HHH";
var VolumeTag = "_TOV";
var PercentLevelTag = "_PER_LVL";
var PercentVolumeTag = "_PER_VOL";

$(document).ready(function () {
    $.when(CreateLiveDataTable(), CreateTankSummaryTable()).then(function () {
        InitConn(opcPageName, 0);
        opc.server.readPageTags(opcPageName);
    }, function () { console.log('ajax error in Tanks Live Data'); });
});

function CreateLiveDataTable() {
    var ShowSafetyRadarData = $('#ShowSafetyRadarLevel').html().toLowerCase();
    var hiddenProp;
    if (ShowSafetyRadarData == 'true') {
        hiddenProp = false;
    }
    else {
        hiddenProp = true;
    }
    $.ajax({
        type: "GET",
        url: "/TankLiveData/GetTankLabels",
        async: false,
        //cache: false,
        success: function (result) {
            tankModes = result;
        },
        error: function () { }
    });
    var tankModesSource =
    {
        datatype: "array",
        datafields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' }
        ],
        localdata: tankModes
    };
    var tankModesAdapter = new $.jqx.dataAdapter(tankModesSource, {
        autoBind: true
    });

    $.ajax({
        type: "GET",
        url: "/TankLiveData/TanksLiveData",
        async: false,
        cache: true,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TagName', type: 'string' },
                    { name: 'TagPrefix', type: 'string' },
                    { name: 'TankName', type: 'string' },
                    { name: 'DipReferenceHeight', type: 'number' },
                    { name: 'NominalDia', type: 'number' },
                    { name: 'MaxVolume', type: 'number' },
                    { name: 'SafeFillingCapacity', type: 'number' },
                    { name: 'NoOfTempEle', type: 'number' },
                    { name: 'SafeFillingHeight', type: 'number' },
                    { name: 'PercentFilled', type: 'number' },
                    { name: 'GrossObsvol', type: 'number' },
                    { name: 'GrossStdvol', type: 'number' },
                    { name: 'NetStdvol', type: 'number' },
                    { name: 'Mass', type: 'number' },
                    { name: 'TankCode', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'TankMode', type: 'string' },
                    { name: 'TankModeName', type: "string", value: 'TankMode', values: { source: tankModesAdapter.records, value: 'value', name: 'label' } },
                    { name: 'TankType', type: 'string' },
                    { name: 'PriLevel', type: 'number' },
                    { name: 'WaterLevel', type: 'number' },
                    { name: 'TempAvg', type: 'number' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'VapPress', type: 'number' },
                    { name: 'DensityAmb', type: 'number' },
                    { name: 'DensityStd', type: 'number' },
                    { name: 'WaterVolume', type: 'number' },
                    { name: 'LevelRate', type: 'number' },
                    { name: 'FlowRate', type: 'number' },
                    { name: 'TOV', type: 'number' },
                    { name: 'PumpVol', type: 'number' },
                    { name: 'Ullage', type: 'number' },
                    { name: 'UllageVol', type: 'number' },
                    { name: 'Temp01', type: 'number' },
                    { name: 'Temp02', type: 'number' },
                    { name: 'Temp03', type: 'number' },
                    { name: 'Temp04', type: 'number' },
                    { name: 'Temp05', type: 'number' },
                    { name: 'Temp06', type: 'number' },
                    { name: 'Temp07', type: 'number' },
                    { name: 'Temp08', type: 'number' },
                    { name: 'Temp09', type: 'number' },
                    { name: 'Temp10', type: 'number' },
                    { name: 'Temp11', type: 'number' },
                    { name: 'Temp12', type: 'number' },
                    { name: 'Temp13', type: 'number' },
                    { name: 'Temp14', type: 'number' },
                    { name: 'Temp15', type: 'number' },
                    { name: 'SecLevel', type: 'number' },
                    { name: 'Pri_Sec_Lvl_Diff', type: 'number' },
                    { name: 'Pri_Sec_Diff_Alert', type: 'bool' },
                    { name: 'SP_Level_HHH', type: 'number' },
                    { name: 'SP_Level_HH', type: 'number' },
                    { name: 'SP_Level_H', type: 'number' },
                    { name: 'SP_Level_L', type: 'number' },
                    { name: 'SP_Level_LL', type: 'number' },

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
                var column = $("#jqxgridTkLiveData").jqxGrid('getcolumn', datafield);
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
                    $("#jqxgridTkLiveData").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxgridTkLiveData").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            initrowdetails = function (index, parentElement, gridElement, datarecord) {
                var tabsdiv = null;
                var basicdata = null, product = null, density = null, water = null, temperature = null, alarms = null;

                tabsdiv = $($(parentElement).children()[0]);
                if (tabsdiv != null) {
                    basicdata = tabsdiv.find('.basicdata');
                    product = tabsdiv.find('.product');
                    density = tabsdiv.find('.density');
                    water = tabsdiv.find('.water');
                    temperature = tabsdiv.find('.temperature');
                    alarms = tabsdiv.find('.alarms');

                    //Basic Data
                    var container = $('#' + datarecord.TagPrefix + '_BasicData')
                    container.appendTo($(basicdata));

                    //Product
                    $('#' + datarecord.TagPrefix + '_Products').appendTo($(product));

                    //Density
                    $('#' + datarecord.TagPrefix + '_Density').appendTo($(density));

                    //Water
                    $('#' + datarecord.TagPrefix + '_Water').appendTo($(water));

                    //Temperature
                    $('#' + datarecord.TagPrefix + '_Temperature').appendTo($(temperature));

                    //Alarm Setpoints
                    $('#' + datarecord.TagPrefix + '_Alarms').appendTo($(alarms));

                    $(tabsdiv).jqxTabs({ width: '75%', height: 185 });
                }
            }
            var columnrendererSingle = function (value) {
                return '<div style="margin: 22px 22px 2px 4px;">' + value + '</div>';
            }
            var columnrendererDouble = function (value) {
                return '<div style="margin: 4px 0 0 4px;text-align: center;">' + value + '</div>';
            }
            var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="alert_' + value + '"></span></div>';
                //return '<div style="text-align: center;"><span style="height: 35px; width: 33px;" class="alert_true"></span></div>';
            }

            $("#jqxgridTkLiveData").jqxGrid(
                {
                    width: "100%",
                    source: adapter,
                    rowdetails: true,
                    rowdetailstemplate:
                    {
                        rowdetails:
                            "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li>Basic Data</li><li>Product</li><li>Density</li><li>Water</li><li>Temperature</li><li>Alarms</li>" +
                            "</ul><div class='basicdata'></div><div class='product'></div><div class='density'></div><div class='water'></div><div class='temperature'></div><div class='alarms'></div>",
                        rowdetailsheight: 210

                    },
                    ready: function () {
                    },
                    initrowdetails: initrowdetails,

                    columnsresize: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    //pagesize: iGblNoRows,
                    //pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                    //rowsheight: 35,
                    autoheight: true,
                    showtoolbar: true,
                    columnsheight: 40,
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tanks Live Data</span></div>");
                        container.append(tableHeading);
                        statusbar.append(container);

                    },
                    ready: function () {
                        PageSize = adapter.records.length;
                        if (PageSize > iGblNoRows) { PageSize = iGblNoRows; }
                        $("#jqxgridTkLiveData").jqxGrid({ pagesize: PageSize });
                        $("#jqxgridTkLiveData").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                        SetTagArray();
                    },
                    autoshowfiltericon: true,
                    columnmenuopening: function (menu, datafield, height) {
                        var column = $("#jqxgridTkLiveData").jqxGrid('getcolumn', datafield);
                        if (column.filtertype === "custom") {
                            menu.height(155);
                            setTimeout(function () {
                                menu.find('input').focus();
                            }, 25);
                        }
                        else menu.height(height);
                    },
                    columns: [
                        //Below without Safety Radars
                        { text: 'Tag Name', datafield: 'TagName', hidden: true, cellsalign: 'center', width: "0%" },
                        { text: 'Tank<br/>Code', datafield: 'TankCode', cellsalign: 'left', filtertype: "checkedlist", width: "6%", pinned: true, renderer: columnrendererDouble },
                        { text: 'Tank<br/>Name', datafield: 'TankName', cellsalign: 'left', filtertype: "checkedlist", width: "9%", pinned: true, renderer: columnrendererDouble },
                        { text: 'Product', datafield: 'ProductName', cellsalign: 'left', filtertype: "checkedlist", width: "10%", pinned: true },
                        { text: 'Tank Mode', datafield: 'TankMode', displayfield: 'TankModeName', cellsalign: 'left', width: "15%" },
                        { text: 'Level<br/>(' + TFMSLevelUnit + ')', datafield: 'PriLevel', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        { text: 'WaterLevel<br/>(' + TFMSLevelUnit + ')', datafield: 'WaterLevel', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        { text: 'Avg Temp<br/>(°C)', datafield: 'TempAvg', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        { text: 'Amb Density<br/>(Kg/cm³)', datafield: 'DensityAmb', cellsalign: 'center', width: "9%", renderer: columnrendererDouble },
                        { text: 'Std Density<br/>(Kg/cm³)', datafield: 'DensityStd', cellsalign: 'center', width: "9%", renderer: columnrendererDouble },
                        { text: 'Flow Rate<br/>(m³/hr)', datafield: 'FlowRate', cellsalign: 'center', width: "9%", renderer: columnrendererDouble },
                        { text: 'Gross Volume<br/>(KL)', datafield: 'TOV', cellsalign: 'center', width: "9%", renderer: columnrendererDouble }

                        //Below With Safety Radars
                        //{ text: 'Tag Name', datafield: 'TagName', hidden: true, cellsalign: 'center', width: "0%" },
                        //{ text: 'Tank<br/>Code', datafield: 'TankCode', cellsalign: 'left', filtertype: "checkedlist", width: "5%", pinned: true },
                        //{ text: 'Tank<br/>Name', datafield: 'TankName', cellsalign: 'left', filtertype: "checkedlist", width: "7%", pinned: true },
                        //{ text: 'Product', datafield: 'ProductName', cellsalign: 'left', filtertype: "checkedlist", width: "10%", pinned: true },
                        //{ text: 'Tank Mode', datafield: 'TankMode', displayfield: 'TankModeName', cellsalign: 'left', width: "10%" },
                        //{ text: 'Level<br/>(' + TFMSLevelUnit + ')', datafield: 'PriLevel', cellsalign: 'center', width: "6%", renderer: columnrendererDouble },
                        //{ text: 'WaterLevel<br/>(' + TFMSLevelUnit + ')', datafield: 'WaterLevel', cellsalign: 'center', width: "6%", renderer: columnrendererDouble },
                        //{ text: 'Avg Temp<br/>(°C)', datafield: 'TempAvg', cellsalign: 'center', width: "6%", renderer: columnrendererDouble },
                        //{ text: 'Amb Density<br/>(Kg/cm³)', datafield: 'DensityAmb', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        //{ text: 'Std Density<br/>(Kg/cm³)', datafield: 'DensityStd', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        //{ text: 'Flow Rate<br/>(m³/hr)', datafield: 'FlowRate', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        //{ text: 'Gross Volume<br/>(KL)', datafield: 'TOV', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                        //{ text: 'Level Diff<br/>Alarm', datafield: 'Pri_Sec_Diff_Alert', cellsalign: 'center', width: "5%", renderer: columnrendererDouble, cellsrenderer: cellsrenderer, hidden: hiddenProp },
                        //{ text: 'Safety<br/>Level', datafield: 'SecLevel', cellsalign: 'center', width: "7%", renderer: columnrendererDouble, hidden: hiddenProp },
                        //{ text: 'Level<br/>Diff', datafield: 'Pri_Sec_Lvl_Diff', cellsalign: 'center', width: "6%", renderer: columnrendererDouble, hidden: hiddenProp },
                    ]
                });

            //display selected row index.
            $("#jqxgridTkLiveData").on('rowselect', function (event) {
                if (event.args.rowindex >= 0 && event.args.columnindex >= 0) {
                    var column = event.args.column;
                    var rowindex = event.args.rowindex;
                    var columnindex = event.args.columnindex;

                    var selectedRowData = $('#jqxgridTkLiveData').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["PageName"];
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function CreateTankSummaryTable() {
    $.ajax({
        type: "GET",
        url: "/TankLiveData/TanksLiveSummary",
        async: false,
        cache: true,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            SummSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'ProductGroupID', type: 'number' },
                    { name: 'GroupDesc', type: 'string' },
                    { name: 'TagPrefix', type: 'string' },
                    { name: 'PageName', type: 'string' },
                    { name: 'TagName', type: 'string' },
                    { name: 'TanksWaterVol', type: 'number' },
                    { name: 'TanksPumpVol', type: 'number' },
                    { name: 'TanksMass', type: 'number' },
                    { name: 'TanksTOV', type: 'number' },
                    { name: 'TankPerVol', type: 'number' },
                    { name: 'TanksUllageVol', type: 'number' },
                    { name: 'TanksGov', type: 'number' },
                    { name: 'TanksGsv', type: 'number' },
                    { name: 'TanksNsv', type: 'number' },
                    { name: 'TanksUllageMass', type: 'number' },
                    { name: 'TanksNov', type: 'number' },
                    { name: 'TanksRov', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var adapter = new $.jqx.dataAdapter(SummSource);
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
                var column = $("#jqxgridTkLiveData").jqxGrid('getcolumn', datafield);
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
                    $("#jqxgridTkLiveData").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxgridTkLiveData").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            $("#jqxTkSummary").jqxGrid(
                {
                    width: "100%",
                    source: adapter,
                    columnsresize: true,
                    filterable: false,
                    sortable: false,
                    pageable: false,
                    //pagesize: iGblNoRows,
                    //pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                    //rowsheight: 35,
                    autoheight: true,
                    showtoolbar: true,
                    //columnsheight: 60,
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Product Summary (KL)</span></div>");
                        container.append(tableHeading);
                        statusbar.append(container);
                    },
                    ready: function () {
                        PageSize = adapter.records.length;
                        if (PageSize > iGblNoRows) { PageSize = iGblNoRows; }
                        $("#jqxTkSummary").jqxGrid({ pagesize: PageSize });
                        $("#jqxTkSummary").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                        SetSummaryTagArray();
                    },
                    autoshowfiltericon: true,
                    columns: [
                        { text: 'Tag Name', datafield: 'GrpTagName', hidden: true, cellsalign: 'center', width: "0%", hidden: true },
                        { text: 'Group', datafield: 'GroupDesc', cellsalign: 'left', filtertype: "checkedlist", width: "16%" },
                        { text: 'Volume ', datafield: 'TanksTOV', cellsalign: 'center', width: "22%" },
                        { text: 'Ullage ', datafield: 'TanksUllageVol', cellsalign: 'center', width: "22%" },
                        { text: 'Pumpable ', datafield: 'TanksPumpVol', cellsalign: 'center', width: "22%" },
                        { text: '%VolFilled', datafield: 'TankPerVol', cellsalign: 'center', width: "18%" },
                    ]
                });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function JQXTableUpdate(item) {
    //console.log(item);
    var controlName = item.ControlName.toUpperCase();
    var index = JQXTagNames.findIndex(x => x.indexOf(controlName) >= 0);
    if (index >= 0) {
        if (GridRows[index] != undefined) {
            //console.log(item);
            if (item.Value == null || item.Value == undefined || item.Quality < 192) {
                GridRows[index][item.ClassName] = "?";
            } else {
                GridRows[index][item.ClassName] = item.Value.toLowerCase();
            }
        }
    }

    var indexS = JQXSummTags.findIndex(x => x.indexOf(controlName) >= 0);
    if (indexS >= 0) {
        if (SummGridRows[indexS] != undefined) {
            //console.log(item);
            if (item.Value == null || item.Value == undefined || item.Quality < 192) {
                SummGridRows[indexS][item.ClassName] = "?";
            } else {
                SummGridRows[indexS][item.ClassName] = item.Value.toLowerCase();
            }
        }
    }
}

function ExtraActivities(model) {

    if ($('#jqxgridTkLiveData').hasClass("jqx-widget") == true) {
        source.localdata = GridRows;
        $('#jqxgridTkLiveData').jqxGrid('updatebounddata', 'cells');
    }
    if ($('#jqxTkSummary').hasClass("jqx-widget") == true) {
        SummSource.localdata = SummGridRows;
        $('#jqxTkSummary').jqxGrid('updatebounddata', 'cells');
    }

}

function SetTagArray() {
    //JQXrowCount = $('#jqxgridTkLiveData').jqxGrid('getrows').length;
    GridRows = $('#jqxgridTkLiveData').jqxGrid('getrows');
    JQXTagNames = [];
    for (var i = 0; i < GridRows.length; i++) {
        JQXTagNames.push(GridRows[i].TagName.toUpperCase());
    }
}

function SetSummaryTagArray() {
    //JQXSummRowCount = $('#jqxTkSummary').jqxGrid('getrows').length;
    SummGridRows = $('#jqxTkSummary').jqxGrid('getrows');
    JQXSummTags = [];
    for (var i = 0; i < SummGridRows.length; i++) {
        JQXSummTags.push(SummGridRows[i].TagName.toUpperCase());
    }
}

function UpdateLevelDiff(PriLevel, SecLevel, index) {
    var level = parseFloat(PriLevel);
    var SecLvl = parseFloat(SecLevel);
    if (level >= 0 && SecLvl >= 0) {
        
        var LvlDiff = parseFloat(level - SecLvl);
        GridRows[index]['Pri_Sec_Lvl_Diff'] = LvlDiff;
        if (LvlDiff > 5 || LvlDiff < -5) {
            GridRows[index]['Pri_Sec_Diff_Alert'] = true;
        }
        else {
            GridRows[index]['Pri_Sec_Diff_Alert'] = false;
        }
    }
    else {
        GridRows[index]['Pri_Sec_Lvl_Diff'] = '?';
        GridRows[index]['Pri_Sec_Diff_Alert'] = '';
    }
}

function UpdatePercentage(CntrlName, PriLevel) {
    if (PriLevel == null || PriLevel == undefined) { return; }
    var HHHCtrl = $('.' + CntrlName.replace(LevelTag, HHHTag));
    var PerCtrl = $('.' + CntrlName.replace(LevelTag, PercentLevelTag));
    var height = parseFloat($(HHHCtrl).val());
    if (!height) { height = $(HHHCtrl).data('sfl') }

    if (height > 0 && PriLevel >= 0 && PriLevel <= height) {
        
        var percentage = ((PriLevel / height) * 100).toFixed(0);
        PerCtrl.text('' + percentage + '');
    }
    else {
        if (PriLevel > height) { alertDismissable('danger', CntrlName + '; Level: ' + PriLevel + '; Tank Height: ' + height) }
        PerCtrl.text('?');
    }
}

function UpdateLevelPer(strCtrlName) {
    var tankNo = strCtrlName.replace('_LEVEL', '');
    var MastElem = $(".chdnHeight." + strCtrlName.replace('_LEVEL', '_LVL_HHH') + "");
    var PercVal = $('.' + tankNo + PercentLevelTag).attr('data-opcvalue');
    if (MastElem != undefined && PercVal == undefined) {
        var tankNo = $(MastElem).data('id');
        if (tankNo == undefined) { tankNo = strCtrlName.replace('_LEVEL', ''); }
        var height = parseFloat($(MastElem).val());
        if (!height) { height = $(MastElem).data('sfl') }
        var maxVol = parseFloat($(MastElem).data('maxvol'));
        var level = parseFloat($('.' + tankNo + LevelTag).first().text());
        var Volume = parseFloat($('.' + tankNo + VolumeTag).first().text());
        var SecLvl = parseFloat($('.' + tankNo + "_SEC_LEVEL").first().text());
        if (height > 0 && level >= 0 && level <= height) {
            var percentage = ((level / height) * 100).toFixed(0);
            $('.' + tankNo + PercentLevelTag).text('' + percentage + '');
            if (maxVol > 0 && Volume >= 0 && Volume <= maxVol) {
                var perVol = ((Volume / maxVol) * 100).toFixed(0);
                $('.' + tankNo + PercentVolumeTag).text('' + perVol + '');
            }
            var perc = ((level / height) * 100);
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', (perc).toFixed(0) + '%');
            var svgFillTag = tankNo + '_SVG_OIL_TANK_FILL';
            var svgFillEle = $('#' + svgFillTag);
            if (svgFillEle != undefined || svgFillEle != null) {
                if (typeof tnkFill !== 'undefined' && tnkFill != undefined && tnkFill != null) {
                    const otnkFill = tnkFill.find(o => o.tag == svgFillTag);
                    if (otnkFill != undefined && otnkFill != null) { svgFillEle.css('transform', "translateY(" + -1 * otnkFill.factor * perc + "px)"); }
                    else { svgFillEle.css('transform', "scaleY(" + perc + ")"); }
                }
                //else { svgFillEle.css('transform', "scaleY(" + (perc/100) + ")"); }
                else { svgFillEle.css('transform-origin', "bottom center"); svgFillEle.css('transform', "scaleY(" + (perc / 100) + ")"); }
            }
            if (SecLvl > 0) {
                var LvlDiff = parseFloat(level - SecLvl);
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text(LvlDiff)
                var elem = $('.' + tankNo + '_PRI_SEC_DIFF_ALERT');
                elem.removeClass("alert_bad");
                if (LvlDiff > 5 || LvlDiff < -5) {
                    elem.removeClass("alert_false");
                    elem.addClass("alert_true");
                }
                else {
                    elem.removeClass("alert_true");
                    elem.addClass("alert_false");
                }
            }
            else {
                $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
                $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
            }
        }
        else {
            if (level > height) { alertDismissable('danger', tankNo + '; Level: ' + level + '; Tank Height: ' + height) }
            if (Volume > maxVol) { alertDismissable('danger', tankNo + '; Volume: ' + Volume + '; Max Volume: ' + maxVol) }
            $('.' + tankNo + PercentLevelTag).text('0');
            $('.' + tankNo + PercentVolumeTag).text('0');
            $('.' + tankNo + '_OIL_TANK_FILL .oil-tank-fill').css('height', '0%');
            $('.' + tankNo + '_PRI_SEC_LVL_DIFF').text('?')
            $('.' + tankNo + '_PRI_SEC_DIFF_ALERT').addClass("alert_bad")
        }
    }
}