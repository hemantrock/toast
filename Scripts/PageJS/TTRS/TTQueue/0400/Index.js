var objTbl, source;
//$(document).ready(function () {
//    clearTimeout(gblTimeout);
//    gblTimeout = setTimeout(function () { refreshTTQ(); }, 15000);
//    createTTQDataTable();
//    opcPageName = "TTQueue";
//    opc.server.addToGroup(opcPageName);
//});

var selectedRowId, selectedRowRef;

$(document).ready(function () {

    clearTimeout(gblTimeout);
    gblTimeout = setTimeout(function () { RefreshTTData(); }, 10000);

    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexData",
        cache: false,
        global: false,
        dataType: 'json',
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'date' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'string' },
                    { name: 'Ack', type: 'bool' },
                    { name: 'Del', type: 'bool' },
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
                var column = $("#jqxTTQgrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxTTQgrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxTTQgrid").jqxGrid('applyfilters');
                    $("#jqxTTQgrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxTTQgrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxTTQgrid").jqxGrid('applyfilters');
                    $("#jqxTTQgrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }
            var numberrenderer = function (row, column, value) {
                return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
            }
            var cellsrendererDelete = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxTTQgrid').jqxGrid('getrowdata', row);
                TruckID = selectedRowData["TruckID"];
                //if (value != true) {
                //    return '<div style="text-align: center;"><span></span></div>';
                //}
                //else {
                //    return '<div onclick="DeleteTruckFromQueue(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-remove clickable spanDelete"></span></div>';
                //}
                return '<div onclick="DeleteTruckFromQueue(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-remove clickable spanDelete"></span></div>';
            }
            var cellsrendererPost = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxTTQgrid').jqxGrid('getrowdata', row);
                TruckID = selectedRowData["TruckID"];
                if (value != true) {
                    return '<div style="text-align: center;"><span></span></div>';
                }
                else {
                    return '<div onclick="PostTruckToSAP(' + TruckID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
                }
            }

            $("#jqxTTQgrid").jqxGrid(
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>TT Reporting 122</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    //var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                    container.append(tableHeading);
                    container.append(addButton);
                    container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    deleteButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        OpenAddNewTruckinTTQueue();
                    });

                    // edit Row.
                    //editButton.click(function (event) {
                    //    EditRecord(selectedRowId);
                    //});

                    // delete Row.
                    deleteButton.click(function (event) {
                        DeleteTruckFromQueue(selectedRowId);
                    });

                },
                ready: function () {
                    PageSize = adapter.records.length;
                    if (PageSize > iGblNoRows || PageSize < 1) { PageSize = iGblNoRows; }
                    $("#jqxTTQgrid").jqxGrid({ pagesize: PageSize });
                    $("#jqxTTQgrid").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxTTQgrid").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                  { text: 'TruckID', dataField: 'TruckID', width: "0%", hidden:true },
                  { text: 'SNO', dataField: '', columntype: 'number', width: "4%", cellsalign: 'center', cellsrenderer: numberrenderer },
                  { text: 'Truck No.', datafield: 'TruckNo', width: "8%", cellsalign: 'center', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  { text: 'Card No', datafield: 'CardNumber', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Reporting Date-Time', datafield: 'RepDateTime', width: "10%", cellsalign: 'left', filtertype: 'date', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                  { text: 'Truck Status', datafield: 'TruckStatusDesc', width: "14%", cellsalign: 'left', filtertype: 'checkedlist' },
                  { text: 'Posted By', datafield: 'PostedBy', width: "6%", filtertype: 'checkedlist' },
                  { text: 'Post Method', datafield: 'PostedMethod', width: "6%", filtertype: 'checkedlist' },
                  { text: 'Posted Status', datafield: 'PostedStatusDesc', width: "20%", filtertype: 'checkedlist' },
                  { text: 'Posted Time', datafield: 'PostedTime', width: "10%", filtertype: 'date', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                  { text: 'Sensor', datafield: 'SensorDesc', width: "6%", filtertype: 'checkedlist' },
                  //{ text: 'Remarks', datafield: 'Remarks', width: "20%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  { text: 'Post to '+ERPName, datafield: 'Ack', width: "6%", cellsrenderer: cellsrendererPost, cellsalign: 'center' },
                  { text: 'Delete', datafield: 'Del', width: "5%", cellsrenderer: cellsrendererDelete, cellsalign: 'center' },
                ]
            });

            $("#jqxTTQgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxTTQgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxTTQgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxTTQgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TruckID"];
                    selectedRowRef = selectedRowData["TruckNo"] + " (" + selectedRowData["CardNumber"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

    opcPageName = "TTRSQueue";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function RefreshTTData() {
    $.ajax({
        type: "GET",
        url: "/TTQueue/IndexData",
        cache: false,
        dataType: 'json',
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var rows = result.length;
            var newSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'TruckNo', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RepDateTime', type: 'date' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'Remarks', type: 'string' },
                    { name: 'PostedBy', type: 'string' },
                    { name: 'PostedMethod', type: 'string' },
                    { name: 'PostedStatusDesc', type: 'string' },
                    { name: 'PostedTime', type: 'number' },
                    { name: 'SensorDesc', type: 'string' },
                    { name: 'PostedStatusCode', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };
            source.localdata = newSource.localdata;
            if (rows > iGblNoRows || rows < 1) { rows = iGblNoRows; }
            if ($('#jqxTTQgrid').hasClass("jqx-widget") == false) { return; }
            $('#jqxTTQgrid').jqxGrid('updatebounddata', 'cells');
            $("#jqxTTQgrid").jqxGrid({ pagesize: rows });
            $("#jqxTTQgrid").jqxGrid({ pagesizeoptions: [rows, rows * 2, rows * 3] });
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { RefreshTTData(); }, 10000);
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function createTTQDataTable()
{
    objTbl= $('#tblTTQueue').DataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "bSort": true,
        "bStateSave": true,
        "aoColumns":
            [
                { sWidth: "4%" },  // SNo
                { sWidth: "8%" }, // Truck No.	
                { sWidth: "5%" },  // Card No	
                { sWidth: "10%" }, // Reporting Date-Time	
                { sWidth: "14%" }, // Truck Status	
                { sWidth: "6%" },  // Posted By	
                { sWidth: "6%" },  // Method	
                { sWidth: "20%" }, // Posted Status	
                { sWidth: "10%" }, // Posted Time	
                { sWidth: "6%" },  // Sensor
                { sWidth: "6%" },  // Post to SAP	
                { sWidth: "6%" },  // Delete
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
            BindSpanAck();
            BindSpanPost();
        }
    });
}

function ExtraActivities(model) {
    
}

function refreshTTQ()
{
    $.ajax({
        type: "GET",
        url: "/TTQueue/GetOnlyTTQueueList",
        cache: false,
        global: false,
        success: function (result) {
            var strTable = "";
            if (objTbl != null) {
                objTbl.destroy();
            }
            $(result).each(function (i, val) {
                strTable = strTable + "<tr>" +
                        "<td>" + parseInt(parseInt(i) + parseInt(1)) + "</td>" +
                        "<td>" + val.TruckNo + "</td>" +
                        "<td>" + val.CardNumber + "</td>" +
                        "<td>" + val.RepDateTime + "</td>" +
                        "<td>" + val.TruckStatusDesc + "</td>" +
                        "<td>" + val.PostedBy + "</td>" +
                        "<td>" + val.PostedMethod + "</td>" +
                        "<td>" + val.PostedStatusDesc + "</td>" +
                        "<td>" + val.PostedTime + "</td>" +
                        "<td>" + val.SensorDesc + "</td>";

                if (val.PostedStatusCode != 'Y') {
                    strTable = strTable + "<td class='text-center'><span id=spanPost_"+val.TruckID+" class='glyphicon glyphicon-check clickable spanPost' data-id='"+val.TruckID+"'></span></td>";
                }
                else {
                    strTable = strTable + "<td class='text-center'>&nbsp;</td>";
                }
                if (val.PostedStatusCode == '') {
                    strTable = strTable + "<td class='text-center'><span id=spanDelete_" + val.TruckID + " class='glyphicon glyphicon-remove clickable spanDelete' data-id='" + val.TruckID + "'></span></td>";
                }
                else {
                    strTable = strTable + "<td class='text-center'>&nbsp;</td>";
                }
                strTable = strTable + "</tr>";
            });
            $('#tblTTQBody').html(strTable);
            createTTQDataTable();
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshTTQ(); }, 15000);
        }
    });
}

function BindSpanPost() {
    $('.spanPost').on("click", function (e) {
        $('#myConfirmMsg').html('<p>Are you sure to Post the Truck to ERP?</p>');
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            PostTruckToSAP(Id);
            $('#confirmModal').modal('hide');
        });
    });
}

function BindSpanAck() {
    $('.spanAck').on("click", function (e) {
        $('#myConfirmMsg').html('<p>Are you sure to Acknowledge the Truck?</p>');
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            AcknowledgeTruckFromQueue(Id);
            $('#confirmModal').modal('hide');
        });
    });
}

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            DeleteTruckFromQueue(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function AcknowledgeTruckFromQueue(Id) {
    var activityName = "Acknowledge Truck From TT Queue";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AcknowledgeTruckFromQueueDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AcknowledgeTruckFromQueueDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function AcknowledgeTruckFromQueueDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/AcknowledgeTruckFromQueue?TruckID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function PostTruckToSAP(Id) {
    var activityName = "Post Truck Arrival to SAP";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                PostTruckToSAPDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { PostTruckToSAPDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

//function PostTruckToSAPDo(Id) {
//    $.ajax({
//        type: "GET",
//        url: "/TTQueue/PostTruckToSAP?TruckID=" + Id,
//        cache: false,
//        success: function (result) {
//            alertDismissable(result.strType, result.strMessage);
//            if (result.blnStatus == true) {
//                OpenTTQueue();
//            }
//        }
//    });
//}

function PostTruckToSAPDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/PostArrivedTruckToSAP?TruckID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function DeleteTruckFromQueue(Id) {
    var activityName = "Delete Truck From TT Queue";
    var activityDetail = "TT / Card No: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                DeleteTruckFromQueueDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteTruckFromQueueDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function DeleteTruckFromQueueDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TTQueue/DeleteTruckFromQueue?TruckID=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}

function OpenAddNewTruckinTTQueue()
{
    $.ajax({
        type: "GET",
        url: "/TTQueue/AddTruckView",
        cache: false,
        success: function (result) {
            $('#myModalBody').html(result);
            $('#myModal .modal-dialog').addClass('add-truck');
            $('#myModal .modal-title').html('Add Truck');
            $('#myModal').modal('show');
            $('#myModal').draggable({handle: ".modal-header"});
            $("#btnOK").unbind('click');
            $("#btnOK").on("click", function () {
                if (AddTruckinTTQueue() != false) {
                    $(".modal-backdrop").slideUp('slow');
                    $('#myModal').modal('hide');
                    $('#myModal .modal-dialog').removeClass('truck-regularize');
                }
            });
        }
    });
}

function ValidateTruck(TruckID)
{
    $.ajax({
        url: "/TruckMasters/ValidateTruckForManualLoad?TruckID="+TruckID,
        type: "GET",
        cache: false,
        success: function (result) {
            if (result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
                $('#txtTruck').attr('data-key-value', '0');
                $('#txtTruck').text('');
                $('#txtTruck').val('');
            }
        }
    });
}

function AddTruckinTTQueue() {
    var activityName = "Add Truck in TT Queue";
    var activityDetail = "Card / Truck No: " + $('#txtTruck').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AddTruckinTTQueueDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AddTruckinTTQueueDo(); }, activityName, activityDetail);
            }
        }
    });
}

function AddTruckinTTQueueDo()
{
    //var TruckID = $('#txtTruck').attr('data-key-value');
    var TruckID = $('#ddlTruck').val();
    var Remarks = $('#txtRemarks').val();

    if (TruckID == "0") {
        $('#txtTruck').attr('data-key-value', '0');
        $('#txtTruck').text('');
        $('#txtTruck').val('');
        $('#FormBU').bootstrapValidator('resetForm');
    }

    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
   

    $.ajax({
        url: "/TTQueue/AddTruckinTTQueue",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ TruckID: TruckID, Sensor: 3, Remarks: Remarks }),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTTQueue();
            }
        }
    });
}