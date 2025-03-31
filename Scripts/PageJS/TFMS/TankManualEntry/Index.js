$(document).ready(function () {
    var lastselectedCell;
    var tankModes = [{ ID: "4", ModeDesc: "Dormant" },
             { ID: "2", ModeDesc: "Dispatch" },
             { ID: "3", ModeDesc: "Maintenance" },
             { ID: "1", ModeDesc: "Re-Circulating" },
             { ID: "5", ModeDesc: "Receipt" },
             { ID: "6", ModeDesc: "Inter Tank Receipt" },
             { ID: "9", ModeDesc: "Inter Tank Dispatch" }];

    var tankModesNames = ["Dormant",
                         "Dispatch",
                         "Maintenance",
                         "Re-Circulating",
                         "Receipt",
                         "Tank to Tank Transfer"];

    var DipTypes = [{ ID: "1", Type: "Opening" },
                    { ID: "2", Type: "Closing" }];

    var tankModesSource =
            {
                datatype: "array",
                datafields: [
                    { name: 'ModeDesc', type: 'string' },
                    { name: 'ID', type: 'string' }
                ],
                localdata: tankModes
            };
    var tankModesAdapter = new $.jqx.dataAdapter(tankModesSource, {
        autoBind: true
    });

    $.ajax({
        type: "GET",
        url: "/TankManualEntry/GetTankMasterData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
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
                    { name: 'DensityStd', type: 'number' },
                    { name: 'DipType', type: 'string'},
                    { name: 'TankModeID', type: 'number'},
                    { name: 'TankModeName', values: { source: tankModesAdapter.records, value: 'ID', name: 'ModeDesc' } },
                    { name: 'MaterialTemp', type: 'number' },
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
                            if (rows[i].Selected == true)
                            {
                                if (rows[i].DipType == 'Opening') { SnapID = 1; } else { SnapID = 2; }
                                var TankData = {
                                    TankID: rows[i].TankID,
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
                        PostEnteredTankData(TanksDataList);
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
                    { text: 'TankID', datafield: 'TankID', filtertype: 'checkedlist', width: '9%', hidden: true, editable: false },
                    { text: '...', datafield: 'Selected', threestatecheckbox: false, columntype: 'checkbox', width: '9%' },
                    { text: 'TankName', datafield: 'TankName', filtertype: 'checkedlist', width: '9%', editable: false },
                    { text: 'SAPTankNo', datafield: 'SAPTankNo', filtertype: 'checkedlist', width: '9%', editable: false },
                    { text: 'ProductName', datafield: 'ProductName', filtertype: 'checkedlist', width: '9%', editable: false },
                    { text: 'Dip Type', datafield: 'DipType', displayfield: 'DipType', columntype: 'dropdownlist', width: '9%',
                        createeditor: function (row, column, editor) { editor.jqxDropDownList({ autoDropDownHeight: true, source: DipTypes, displayMember: "Type", valueMember: "ID"});}},
                    { text: 'ModeName', datafield: 'TankModeID', displayfield: 'TankModeName', columntype: 'dropdownlist', width: '9%',
                        createeditor: function (row, column, editor) { editor.jqxDropDownList({autoDropDownHeight: true, source: tankModesAdapter, displayMember: "ModeDesc", valueMember: "ID"});}},
                    { text: 'ProductLevel (mm)', datafield: 'ProductLevel', width: '9%' },
                    { text: 'Density (kg/m³)', datafield: 'DensityStd', width: '9%' },
                    { text: 'MaterialTemp (°C)', datafield: 'MaterialTemp', width: '9%' },
                    { text: 'Pressure (kg/cm²)', datafield: 'Pressure', width: '9%' },
                    { text: 'Remarks', datafield: 'Remarks', width: '10%' },
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
        format: 'D-MMM-YY hh:mm a',
        stepping: 15,
        maxDate: new Date()
    }).on("changeDate", function (e) {
        var TimeZoned = new Date(e.Date.setTime(e.Date.getTime() + (e.Date.getTimezoneOffset() * 60000)));
        $('#dtpFrom').Datetimepicker('setDate', TimeZoned);
        $('#dtpFrom').parent().removeClass('has-error').addClass('has-success');
        $('#dtpFrom').parent().children("small").hide();
        $('#dtpFrom').parent().children("i").removeClass("glyphicon-remove").addClass("glyphicon-ok");
    });

    //$('#dtpTo').Datetimepicker({
    //    format: 'DD/MM/YYYY hh:mm a',
    //    autoclose: true,
    //    pickerPosition: "bottom-left",
    //    maxView: 3,
    //    minuteStepping: 15,
    //    endDate: new Date()
    //}).on("changeDate", function (e) {
    //    var TimeZoned = new Date(e.Date.setTime(e.Date.getTime() + (e.Date.getTimezoneOffset() * 60000)));
    //    $('#dtpTo').Datetimepicker('setDate', TimeZoned);
    //    $('#dtpTo').parent().removeClass('has-error').addClass('has-success');
    //    $('#dtpTo').parent().children("small").hide();
    //    $('#dtpTo').parent().children("i").removeClass("glyphicon-remove").addClass("glyphicon-ok");
    //});
}

function ViewTankManualEntry()
{
    var strUrl = "/TankManualEntry/LoadTankData";

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

function PostEnteredTankData(lstTankData) {

    var activityName = "Manual Data ERP Post";
    var activityDetail = "";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                PostEnteredTankDataDo(lstTankData);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { PostEnteredTankDataDo(lstTankData); }, activityName, activityDetail);
            }
        }
    });

}

function PostEnteredTankDataDo(lstTankData) {
    $.ajax({
        url: "/TankManualEntry/PostEnteredTankData",
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
