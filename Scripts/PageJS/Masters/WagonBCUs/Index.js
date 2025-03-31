var selectedRowId, selectedRowRef;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/BatchController/WagonMasterData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'UniqueID', type: 'number' },
                    { name: 'SpurNo', type: 'number' },
                    { name: 'ClusterNo', type: 'number' },
                    { name: 'BCUNo', type: 'number' },
                    { name: 'BCUName', type: 'string' },
                    { name: 'BCMake', type: 'string' },
                    { name: 'ProgVer', type: 'string' },
                    { name: 'DSID', type: 'string' },
                    { name: 'SlaveID', type: 'number' },
                    { name: 'ProdName', type: 'string' },
                    { name: 'KFactChanged', type: 'bool' },
                    { name: 'NoOfArms', type: 'string' },
                    { name: 'RITAvailable', type: 'bool' },
                    { name: 'EarthBypass', type: 'bool' },
                    { name: 'ESDBypass', type: 'bool' },
                    { name: 'Enabled', type: 'bool' },
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

            var cellsrendererNonCommMode = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                gblBcuID = selectedRowData["UniqueID"];
                selectedRowRef = selectedRowData["BCUName"];
                return '<div onclick="SetNonCommMode(' + gblBcuID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
            }
            var cellsrendererCleanStart = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                gblBcuID = selectedRowData["UniqueID"];
                return '<div onclick="CleanStart(' + gblBcuID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
            }
            $("#jqxgrid").jqxGrid(
                {
                    width: "1450px",
                    source: adapter,
                    columnsresize: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    pagesize: iGblNoRows,
                    pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                    autoheight: true,
                    showtoolbar: true,
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Wagon BCU Master</span></div>");
                        //var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        //var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                        container.append(tableHeading);
                        //container.append(addButton);
                        container.append(editButton);
                        //container.append(deleteButton);

                        statusbar.append(container);
                        //addButton.jqxButton({ height: 20 });
                        editButton.jqxButton({ height: 20 });
                        //deleteButton.jqxButton({ height: 20 });

                        // add new row.
                        //    addButton.click(function (event) {
                        //        OpenAddBatchController();
                        //    });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
                        });

                        //    // delete Row.
                        //    deleteButton.click(function (event) {
                        //        deleteBatchController(selectedRowId, event);
                        //    });

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
                        { text: 'BCU-ID', datafield: 'UniqueID', width: '4%', cellsalign: 'center' },
                        { text: 'Spur', datafield: 'SpurNo', filtertype: 'checkedlist', width: '4%', cellsalign: 'center' },
                        { text: 'Cluster', datafield: 'ClusterNo', width: '4%', cellsalign: 'center', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'BCUNo', datafield: 'BCUNo', filtertype: 'checkedlist', width: '4%', cellsalign: 'center' },
                        { text: 'BCUName', datafield: 'BCUName', width: '9%' },
                        { text: 'BCMake', datafield: 'BCMake', width: '9%', filtertype: 'checkedlist' },
                        { text: 'Prog.Ver', datafield: 'ProgVer', filtertype: 'checkedlist', width: '5%', cellsalign: 'center' },
                        { text: 'DataSrc', datafield: 'DSID', width: '9%', filtertype: 'checkedlist' },
                        { text: 'SlaveID', datafield: 'SlaveID', width: '5%', cellsalign: 'center', filtertype: 'checkedlist' },
                        //{ text: 'KFactChanged', datafield: 'KFactChanged', width: '10%' },
                        { text: 'Product', datafield: 'ProdName', width: '5%', cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: '#Arms', datafield: 'NoOfArms', width: '4%', cellsalign: 'center', filtertype: 'checkedlist' },
                        { text: 'RITAvailable', datafield: 'RITAvailable', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: '7%' },
                        { text: 'Earth Bypass', datafield: 'EarthBypass', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: '7%' },
                        { text: 'ESD Bypass', datafield: 'ESDBypass', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: '7%' },
                        { text: 'Enabled', datafield: 'Enabled', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: '5%' },
                        { text: 'Clean Start', width: "6%", cellsalign: 'center', cellsrenderer: cellsrendererCleanStart },
                        { text: 'NonComm', width: "6%", cellsalign: 'center', cellsrenderer: cellsrendererNonCommMode },
                    ]
                });

            //// clear the filtering.
            //$('#clearfilteringbutton').click(function () {
            //    $("#jqxgrid").jqxGrid('clearfilters');
            //});

            //// show/hide filter background
            //$('#filterbackground').on('change', function (event) {
            //    $("#jqxgrid").jqxGrid({ showfiltercolumnbackground: event.args.checked });
            //});

            //// show/hide filter icons
            //$('#filtericons').on('change', function (event) {
            //    $("#jqxgrid").jqxGrid({ autoshowfiltericon: !event.args.checked });
            //});

            $("#jqxgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    selectedRowRef = selectedRowData["BCUName"] + " (" + selectedRowData["ProdName"] + ")";
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function EditRecord(wBcuID) {
    if (wBcuID == undefined) {
        alertDismissable("danger", "Please select the row you want to Edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/BatchController/EditWagonView?wBcuID=" + wBcuID,
            UpdateTargetId: "dvContent",
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    alertDismissable(result.strType, result.strMessage);
                }
                else {
                    $("#dvContent").html(result);
                }
            }
        });
    }
}

function CleanStart(wBcuID) {

    $('#myConfirmMsg').html("<p>Are you sure to you want to clean start Wagon BCU?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');
        var activityName = "Clean Start an Wagon BCU Loop";
        var activityDetail = "BCU: " + selectedRowRef;
        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    CleanStartDo(wBcuID);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { CleanStartDo(wBcuID); }, activityName, activityDetail);
                }
            }
        });
    });
}

function CleanStartDo(wBcuID) {
    $.ajax({
        type: "GET",
        url: "/BatchController/UpdateWagonBCLastStep?wBcuID=" + wBcuID,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}

function SetNonCommMode(wBcuID) {
    var activityName = "Set BCU Arm to Non Comm. Mode";
    var activityDetail = "BCU : " + selectedRowRef;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SetNonCommModeDo(wBcuID);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SetNonCommModeDo(wBcuID); }, activityName, activityDetail);
            }
        }
    });
}

function SetNonCommModeDo(wBcuID) {
    $.ajax({
        type: "GET",
        url: "/BatchController/SetWagBCUArmNonCommMode?wBcuID=" + wBcuID,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}