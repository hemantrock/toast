//$(document).ready(function () {
//    $('#tblMeterMaster').dataTable({
//        "iDisplayLength": iGblNoRows,
//        "bLengthChange": false,
//        "bFilter": true,
//        "bPaginate": true,
//        "bInfo": true,
//        "aoColumns":
//            [
//                { sWidth: "10%" },  //LP No
//                { sWidth: "10%" },  //Meter No
//                { sWidth: "15%" },  //Active Product
//                { sWidth: "20%" },  //Meter Desc
//                { sWidth: "10%" },  //Bck Factor PC
//                { sWidth: "10%" },  //Slave ID
//                { sWidth: "15%" },  //Enabled 
//                { sWidth: "10%", 'sClass': 'text-center' },  //Delete
//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//            //BindSpanFlush();
//        }
//    });
//});

var LPNo, MeterNo, selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/MetersMaster/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'MeterID', type: 'number' },
                    { name: 'BayNo', type: 'number' },
                    { name: 'ArmNo', type: 'number' },
                    { name: 'LPNo', type: 'number' },
                    { name: 'MeterCompNo', type: 'number' },
                    { name: 'ActiveProduct', type: 'string' },
                    { name: 'MeterDesc', type: 'string' },
                    { name: 'UnAuthFlowTot', type: 'number' },
                    { name: 'UnAuthFlowAck', type: 'bool' },
                    { name: 'MFMKFactor', type: 'number' },
                    { name: 'MFMChangeAck', type: 'bool' },
                    { name: 'SlaveID', type: 'number' },
                    { name: 'ErroneousDensity', type: 'bool' },
                    { name: 'ErroneousRTD', type: 'bool' },
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

            var cellsrendererUnAuth = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                LPNo = selectedRowData["LPNo"];
                MeterNo = selectedRowData["MeterCompNo"];

                if (value) {
                    return '<div style="text-align: center;"><span></span></div>';
                }
                else {
                    return '<div onclick="AckKFactUnAuthFlow(' + LPNo + ',' + MeterNo + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span class="glyphicon glyphicon-check clickable spanAck" style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"></span></div>';
                }

            }

            var cellsrendererMFM = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                LPNo = selectedRowData["LPNo"];
                MeterNo = selectedRowData["MeterCompNo"];

                if (value) {
                    return '<div style="text-align: center;"><span></span></div>';
                }
                else {
                    return '<div onclick="AckKFactMFM(' + LPNo + ',' + MeterNo + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
                }
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
                pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Meters Master</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                    container.append(tableHeading);
                    container.append(addButton);
                    container.append(editButton);
                    container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    editButton.jqxButton({ height: 20 });
                    deleteButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        OpenAddMetersMaster();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(LPNo, MeterNo);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteMetersMaster(LPNo, MeterNo);
                    });

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
                  { text: 'Meter ID', datafield: 'MeterID', width: "6%", cellsalign: 'center' },
                  { text: 'Bay No', datafield: 'BayNo', width: "6%", cellsalign: 'center' },
                  { text: 'Arm No', datafield: 'ArmNo', width: "6%", cellsalign: 'center' },
                  { text: 'LP No', datafield: 'LPNo', width: "0%", cellsalign: 'center', hidden:true ,filtertype: 'checkedlist' },
                  { text: 'LP Meter#', datafield: 'MeterCompNo', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Base Product', datafield: 'ActiveProduct', width: "8%", filtertype: 'checkedlist' },
                  { text: 'Meter Desc', datafield: 'MeterDesc', width: "18%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, },
                  { text: 'UnAuthFlow Tot', datafield: 'UnAuthFlowTot', width: "7%", cellsalign: 'center' },
                  { text: 'Ack UnAuthFlow', datafield: 'UnAuthFlowAck', width: "8%", cellsrenderer: cellsrendererUnAuth, cellsalign: 'center' },
                  { text: 'MFM KFactor', datafield: 'MFMKFactor', width: "8%", cellsalign: 'center' },
                  { text: 'Ack MFM KFac', datafield: 'MFMChangeAck', width: "7%", cellsrenderer: cellsrendererMFM, cellsalign: 'center' },
                  { text: 'Slave ID', datafield: 'SlaveID', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Err Density', datafield: 'ErroneousDensity', width: "7%", cellsalign: 'center', filtertype: 'checkedlist', threestatecheckbox: true, columntype: 'checkbox' },
                  { text: 'Err Temp', datafield: 'ErroneousRTD', width: "7%", cellsalign: 'center', filtertype: 'checkedlist', threestatecheckbox: true, columntype: 'checkbox' },
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
                    LPNo = selectedRowData["LPNo"];
                    MeterNo = selectedRowData["MeterCompNo"];
                    EditRecord(LPNo, MeterNo);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    LPNo = selectedRowData["LPNo"];
                    MeterNo = selectedRowData["MeterCompNo"];
                    selectedRowId = selectedRowData["uid"];
                    selectedRowRef = 'LP: ' + LPNo + "; Meter: " + MeterNo;
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteMetersMaster(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddMetersMaster() {
    $.ajax({
        type: "GET",
        url: "/MetersMaster/Add",
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

function EditRecord(LPNo, MeterNo) {
    if (LPNo == undefined || MeterNo == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
        return;
    }
    $.ajax({
        type: "GET",
        url: "/MetersMaster/Edit?LPNo=" + LPNo + "&MeterNo=" + MeterNo,
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

function deleteMetersMaster(LPNo, MeterNo) {
    var activityName = "Delete Existing Meter";
    var activityDetail = "Meter: " + selectedRowRef;
    if (LPNo == undefined || MeterNo == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete the meter (" + selectedRowRef + ")?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteMetersMasterDo(LPNo, MeterNo);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteMetersMasterDo(LPNo, MeterNo); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteMetersMasterDo(LPNo, MeterNo) {

    $.ajax({
        type: "GET",
        url: "/MetersMaster/Delete?LPNo=" + LPNo + "&MeterNo=" + MeterNo,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenMetersMasterMenu();
            }
        }
    });
}

function AckKFactUnAuthFlow(LPNo, MeterNo) {
    var activityName = "Ack UnAuth Flow in Meter";
    var activityDetail = "Meter: " + selectedRowRef;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AckKFactUnAuthFlowDo(LPNo, MeterNo);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AckKFactUnAuthFlowDo(LPNo, MeterNo); }, activityName, activityDetail);
            }
        }
    });
}

function AckKFactUnAuthFlowDo(LPNo, MeterNo) {

    $.ajax({
        type: "GET",
        url: "/MetersMaster/AckKFactUnAuthFlow?LPNo=" + LPNo + "&MeterNo=" + MeterNo,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                //OpenBatchControllerMenu();
                OpenMetersMasterMenu();
            }
        }
    });
}

function AckKFactMFM(LPNo, MeterNo) {
    var activityName = "Ack K Factor";
    var activityDetail = "Meter: " + selectedRowRef;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AckKFactMFMDo(LPNo, MeterNo);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AckKFactMFMDo(LPNo, MeterNo); }, activityName, activityDetail);
            }
        }
    });
}

function AckKFactMFMDo(LPNo, MeterNo) {

    $.ajax({
        type: "GET",
        url: "/MetersMaster/AckKFactMFM?LPNo=" + LPNo + "&MeterNo=" + MeterNo,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                //OpenBatchControllerMenu();
                OpenMetersMasterMenu();
            }
        }
    });
}