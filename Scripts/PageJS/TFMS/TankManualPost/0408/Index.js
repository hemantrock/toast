var source, GridRows, tankModes;
$(document).ready(function () {
    InitDTPickers();

    var DipTypes = [{ ID: "1", Type: "Opening" },
                { ID: "2", Type: "Closing" }];

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
        url: "/TankManualPost/LoadTankDataForGrid",
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
                    { name: 'SecondaryLevel', type: 'number' },
                    { name: 'ProductLevel', type: 'number' },
                    { name: 'DensityStd', type: 'number' },
                    { name: 'DipType', type: 'string' },
                    { name: 'TankModeID', type: 'number' },
                    { name: 'ModeName', type: 'string' },
                    { name: 'TempProduct', type: 'number' },
                    { name: 'FreeWaterLevel', type: 'number' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'Remarks', type: 'string' }
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
                //filterable: true,
                //sortable: true,
                pageable: true,
                editable: true,
                editmode: 'selectedcell',
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tanks Data</span></div>");
                    var UpdatePriorityButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Post Tank Data</span></div>");

                    container.append(tableHeading);
                    container.append(UpdatePriorityButton);

                    statusbar.append(container);
                    UpdatePriorityButton.jqxButton({ height: 20 });

                    // UpdatePriority.
                    UpdatePriorityButton.click(function (event) {
                        if (lastselectedCell != undefined) {
                            $("#jqxgrid").jqxGrid('endcelledit', lastselectedCell.rowindex, lastselectedCell.datafield, false)
                        }
                        var rows = $('#jqxgrid').jqxGrid('getrows');
                        var errorMessage = "";
                        var TanksDataList = [];
                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].Selected == true) {
                                if (rows[i].DipType == 'Opening') { SnapID = -1; } 
                                else if (rows[i].DipType == 'Closing') { SnapID = -2; }
                                else { SnapID = null; }
                                var TankData = {
                                    TankID: rows[i].TankID,
                                    DataTimeStamp: $(dtpFrom).val(),
                                    ProductLevel: rows[i].ProductLevel,
                                    TempProduct: rows[i].MaterialTemp,
                                    DensityStd: rows[i].DensityStd,
                                    Pressure: rows[i].Pressure,
                                    SnapshotID: SnapID,
                                    TankModeID: rows[i].TankModeID,
                                    Remarks: rows[i].Remarks,
                                };
                                TanksDataList.push(TankData);
                            }
                        }
                        PostSelectedTankData(TanksDataList);
                    });

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
                    { text: 'TankID', datafield: 'TankID', filtertype: 'checkedlist', width: '5%', hidden: true, editable: false },
                    { text: '...', datafield: 'Selected', threestatecheckbox: false, columntype: 'checkbox', width: '4%' },
                    { text: 'TankName', datafield: 'TankName', filtertype: 'checkedlist', width: '7%', editable: false },
                    { text: 'SAPTankNo', datafield: 'SAPTankNo', filtertype: 'checkedlist', width: '7%', editable: false },
                    { text: 'ProductName', datafield: 'ProductName', filtertype: 'checkedlist', width: '9%', editable: false },
                    {
                        text: 'Dip Type', datafield: 'DipType', displayfield: 'DipType', columntype: 'dropdownlist', width: '9%',
                        createeditor: function (row, column, editor) { editor.jqxDropDownList({ autoDropDownHeight: true, source: DipTypes, displayMember: "Type", valueMember: "ID" }); }
                    },
                    { text: 'Tank Mode', datafield: 'ModeName', filtertype: 'checkedlist', width: '10%', editable: false },
                    { text: 'RadarLevel (mm)', datafield: 'ProductLevel', width: '8%', editable: false },
                    { text: 'RochesterLevel (mm)', datafield: 'SecondaryLevel', width: '8%', editable: false },
                    { text: 'Density (kg/m³)', datafield: 'DensityStd', width: '8%', editable: false },
                    { text: 'MaterialTemp (°C)', datafield: 'TempProduct', width: '8%', editable: false },
                    { text: 'Pressure (kg/cm²)', datafield: 'Pressure', width: '8%', editable: false },
                    { text: 'Remarks', datafield: 'Remarks', width: '14%' },
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

            $("#jqxgrid").on('cellbeginedit', function (event) {
                lastselectedCell = event.args;
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

});

function InitDTPickers() {

    $('#dtpFrom').datetimepicker({
        format: 'D-MMM-YY HH:mm',
        stepping: 15
    });
}

function ViewTankManualPostGrid() {
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
                    { name: 'SecondaryLevel', type: 'number' },
                    { name: 'DensityStd', type: 'number' },
                    { name: 'DipType', type: 'string' },
                    { name: 'TankModeID', type: 'number' },
                    { name: 'ModeName', type: 'string' },
                    { name: 'TempProduct', type: 'number' },
                    { name: 'FreeWaterLevel', type: 'number' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'Remarks', type: 'string' }
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

function GetURL() {
    var strUrl = "/TankManualPost/LoadTankDataForGrid";
    if ($('#dtpFrom').val() != null && $('#dtpTo').val() != null
        && $('#dtpFrom').val() != 'undefined' && $('#dtpFrom').val() != "") {
        strUrl = strUrl + "?FromDT=" + $('#dtpFrom').val();
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

function ViewTankManualPost()
{
    var strUrl = "/TankManualPost/LoadTankDataForGrid";

    if ($('#dtpFrom').val() != null && $('#dtpFrom').val() != 'undefined' && $('#dtpFrom').val() != "") {
        strUrl = "/TankManualPost/LoadTankData?FromDT=" + $('#dtpFrom').val();
    }
    else {
        return false;
    }
    $.ajax({
        type: "GET",
        url: strUrl,
        UpdateTargetId: "dvTankData",
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#dvTankData").html(result);
            }
        }
    });
}


function PostSelectedTankData(lstTankData) {

    var activityName = "Manual Data ERP Post";
    var activityDetail = "";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                PostSelectedTankDataDo(lstTankData);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { PostSelectedTankDataDo(lstTankData); }, activityName, activityDetail);
            }
        }
    });

}

function PostSelectedTankDataDo(lstTankData) {
    $.ajax({
        url: "/TankManualPost/PostTankDataManual",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(lstTankData),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {

            }

        }
    });
}