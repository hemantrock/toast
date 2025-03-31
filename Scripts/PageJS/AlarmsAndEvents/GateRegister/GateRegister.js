
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/GetGateRegister",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'LoadID', type: 'number' },
                    { name: 'TruckNum', type: 'string' },
                    { name: 'Driver', type: 'string' },
                    { name: 'TransporterDesc', type: 'string' },
                    { name: 'FanSlipNo', type: 'string' },
                    { name: 'InvoiceNo', type: 'string' },
                    { name: 'Products', type: 'string' },
                    { name: 'Prod_MS', type: 'number' },
                    { name: 'Prod_MSPow', type: 'number' },
                    { name: 'Prod_GAS', type: 'number' },
                    { name: 'Prod_GASPow', type: 'number' },
                    { name: 'Prod_HSD', type: 'number' },
                    { name: 'Prod_HSDTurbo', type: 'number' },
                    { name: 'Prod_SKO', type: 'number' },
                    { name: 'Prod_BioD', type: 'number' },
                    { name: 'Prod_HSDBioD', type: 'number' },
                    { name: 'Prod_Others', type: 'number' },
                    { name: 'RegDate', type: 'date' },
                    { name: 'CardIssueTime', type: 'date' },
                    { name: 'FANPrintTime', type: 'date' },
                    { name: 'EntryGateTime', type: 'date' },
                    { name: 'ExitGateTime', type: 'date' },
                    { name: 'SealingTime', type: 'date' },
                    { name: 'TareWeighedTime', type: 'date' },
                    { name: 'GrossWeighedTime', type: 'date' },
                    { name: 'TTLoadingStartTime', type: 'date' },
                    { name: 'LoadingEndTime', type: 'date' },
                    { name: 'SecCheckEntry', type: 'date' },
                    { name: 'SecCheckExit', type: 'date' },
                    { name: 'BayReportingTime', type: 'date' },
                    { name: 'PostLoadDateTime', type: 'date' },
                ],
                localdata: data,
                id: "UniqueID"
            };

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
                var column = $("#jqxGateRegGrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxGateRegGrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxGateRegGrid").jqxGrid('applyfilters');
                    $("#jqxGateRegGrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxGateRegGrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxGateRegGrid").jqxGrid('applyfilters');
                    $("#jqxGateRegGrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            var cellsrendererAck = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxGateRegGrid').jqxGrid('getrowdata', row);
                uid = selectedRowData["UniqueID"];

                if (value) {
                    return '<div onclick="AcknowledgeSelectedAlarms(' + uid + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span class="glyphicon glyphicon-check clickable spanAck" style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"></span></div>';
                }
                else {
                    return '<div style="text-align: center;"><span></span></div>';
                }
            }
            var cellsrendererActive = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value) {
                    var Prefix = 'alert_';
                    var selectedRowData = $('#jqxGateRegGrid').jqxGrid('getrowdata', row);
                    if (selectedRowData["Ack"] == false) { Prefix = 'alert_inactive_'; }
                    return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="' + Prefix + value + '"></span></div>';
                }
                else {
                    return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="' + '"></span></div>';
                }
                //return '<div style="text-align: center;"><span style="height: 35px; width: 33px;" class="alert_true"></span></div>';
            }

            $("#jqxGateRegGrid").jqxGrid(
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
                //autoRowHeight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Gate Register</span></div>");
                    var refreshButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-refresh' aria-hidden='true'></span> Refresh</span></div>");
                    var ackButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span> Ack Selected</span></div>");

                    container.append(tableHeading);
                    container.append(refreshButton);
                    //container.append(ackButton);

                    statusbar.append(container);
                    refreshButton.jqxButton({ height: 20 });
                    //ackButton.jqxButton({ height: 20 });

                    // add new row.
                    refreshButton.click(function (event) {
                        RefreshPage();
                    });

                    // edit Row.
                    ackButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                },
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxGateRegGrid").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                    { text: 'LoadID', datafield: 'LoadID', width: '4%' },
                    { text: 'TruckNum', datafield: 'TruckNum', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '6%' },
                    { text: 'Driver', datafield: 'Driver', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '6%' },
                    { text: 'Transporter', datafield: 'TransporterDesc', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '10%' },
                    { text: 'FanSlipNo', datafield: 'FanSlipNo', width: '4%' },
                    { text: 'InvoiceNo', datafield: 'InvoiceNo', width: '0%', hidden: true },
                    { text: 'Products (KL)', datafield: 'Products', width: '10%' },
                    { text: 'Prod_MS', datafield: 'Prod_MS', width: '0%', hidden: true },
                    { text: 'Prod_MSPow', datafield: 'Prod_MSPow', width: '0%', hidden: true },
                    { text: 'Prod_GAS', datafield: 'Prod_GAS', width: '0%', hidden: true },
                    { text: 'Prod_GASPow', datafield: 'Prod_GASPow', width: '0%', hidden: true },
                    { text: 'Prod_HSD', datafield: 'Prod_HSD', width: '0%', hidden: true },
                    { text: 'Prod_HSDTurbo', datafield: 'Prod_HSDTurbo', width: '0%', hidden: true },
                    { text: 'Prod_SKO', datafield: 'Prod_SKO', width: '0%', hidden: true },
                    { text: 'Prod_BioD', datafield: 'Prod_BioD', width: '0%', hidden: true },
                    { text: 'Prod_HSDBioD', datafield: 'Prod_HSDBioD', width: '0%', hidden: true },
                    { text: 'Prod_Others', datafield: 'Prod_Others', width: '0%', hidden: true },
                    { text: 'RegDate', datafield: 'RegDate', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'AuthTime', datafield: 'CardIssueTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'FANTime', datafield: 'FANPrintTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'EntryCheck', datafield: 'SecCheckEntry', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'EntryTime', datafield: 'EntryGateTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'BayReportingTime', datafield: 'BayReportingTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'LoadStart', datafield: 'TTLoadingStartTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'LoadEnd', datafield: 'LoadingEndTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'LoadPost', datafield: 'PostLoadDateTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'SealTime', datafield: 'SealingTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'ExitCheck', datafield: 'SecCheckExit', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'ExitTime', datafield: 'ExitGateTime', width: '5%', cellsformat: 'HH:mm' },
                    { text: 'TareWeighedTime', datafield: 'TareWeighedTime', width: '0%', cellsformat: 'HH:mm', hidden: true},
                    { text: 'GrossWeighedTime', datafield: 'GrossWeighedTime', width: '0%', cellsformat: 'HH:mm', hidden: true},
                ]
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function RefreshPage() {
    OpenViewPath('AlarmsAndEvents/GateRegister', 'Index');
}