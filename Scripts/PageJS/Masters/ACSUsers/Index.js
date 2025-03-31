var selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/ACSUsers/IndexData",
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
                    { name: 'ACSCode', type: 'string' },
                    { name: 'ReferenceCode', type: 'string' },
                    { name: 'LocalUserName', type: 'string' },
                    { name: 'UserRoleDesc', type: 'string' },
                    { name: 'TASUserName', type: 'string' },
                    { name: 'Transporter', type: 'string' },
                    { name: 'TruckNumber', type: 'string' },
                    { name: 'MobileNo', type: 'string' },
                    { name: 'ACSUserType', type: 'string' },
                    { name: 'Enabled', type: 'bool' },
                    { name: 'Visible', type: 'bool' },
                    { name: 'UKID', type: 'number' },
                    { name: 'LicenseExpDate', type: 'date' },
                    { name: 'PoliceTill', type: 'date' },
                    { name: 'RTOTill', type: 'date' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var renderer = function (id) {
                return '<input type="button" onClick="buttonclick(event)" class="gridButton" id="btn' + id + '" value="Delete Row"/>'
            }
            var cellsrendererDrvUpdt = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', row);
                UKID = selectedRowData["UKID"];
                selectedRowId = selectedRowData["uid"];
                //EditRecord(selectedRowId);
                //return '<div onclick="UpdateDriverData(' + UKID + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
                return '<div onclick="EditRecord(' + selectedRowId + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;" class="glyphicon glyphicon-check clickable spanAck"></span></div>';
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
                    width: "1400px",
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
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Biometric ACS Users Master</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");


                        container.append(tableHeading);
                        container.append(editButton);

                        statusbar.append(container);
                        editButton.jqxButton({ height: 20 });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
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
                        { text: 'Id', datafield: 'UniqueID', width: "0%", hidden: true },
                        { text: 'Ref Code', datafield: 'ReferenceCode', width: "8%" },
                        { text: 'UKID', datafield: 'UKID', width: "8%" },
                        { text: 'Name', datafield: 'LocalUserName', width: "20%" },
                        { text: 'Transporter', datafield: 'Transporter', width: "23%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'Truck Number', datafield: 'TruckNumber', width: "11%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                        { text: 'Mobile No', datafield: 'MobileNo', width: "11%", filtertype: 'checkedlist' },
                        { text: 'User Type', datafield: 'ACSUserType', width: "9%", filtertype: 'checkedlist' },
                        { text: 'Valid Upto', datafield: 'ValidUpto', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yyyy', hidden: true },
                        { text: 'Enabled', datafield: 'Enabled', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "5%" },
                        { text: 'Update', datafield: 'UpdateDriver', width: "5%", cellsrenderer: cellsrendererDrvUpdt, cellsalign: 'center' },
                    ]
                });

            $("#jqxgrid").on('rowdoubleclick', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    selectedRowRef = selectedRowData["LocalUserName"] + " (" + selectedRowData["ReferenceCode"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function EditRecord(LocalUserID) {
    if (LocalUserID == undefined) {
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/ACSUsers/Edit?LocalUserID=" + LocalUserID,
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

function UpdateDriverData(UKID) {
    var activityName = "Update Driver Data";
    var activityDetail = "UKID: " + UKID;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateDriverDataDo(UKID);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateDriverDataDo(UKID); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateDriverDataDo(UKID) {
    $.ajax({
        type: "GET",
        url: "/ACSUsers/UpdataDriverData?UKID=" + UKID,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}


