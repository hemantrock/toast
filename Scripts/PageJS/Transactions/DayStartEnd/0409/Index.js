var meterSource, tfmsSource;
$(document).ready(function () {
    DoOnDocReady();
    $('#dtpDayStartDate').datetimepicker({
        format: 'DD/MM/YYYY',
    });
});

function DoOnDocReady()
{
    $.when(getTFMSData()).then(function () {
        //var MtrDiff = $("#jqxgridMeters").jqxGrid('getcolumnaggregateddata', 'TotalizerDiff', ['sum']);
        var LvlDiff = $("#jqxgridTFMS").jqxGrid('getcolumnaggregateddata', 'ProductLevelDiff', ['sum']);
    }, function () { console.log('ajax error in Getting Totals'); });
}

function getTFMSData()
{
    return $.ajax({
        type: "GET",
        url: "/DayStartEnd/GetTFMSData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            tfmsSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'CurrSnapshotID', type: 'number' },
                    { name: 'CurrTankID', type: 'number' },
                    { name: 'TankName', type: 'string' },
                    { name: 'Product', type: 'string' },
                    { name: 'CurrSnapDateTime', type: 'date' },
                    { name: 'CurrSnapshotType', type: 'string' },
                    { name: 'CurrProductLevel', type: 'number' },
                    { name: 'CurrTempProduct', type: 'number' },
                    { name: 'CurrDensityAmb', type: 'number' },
                    { name: 'CurrDensityStd', type: 'number' },
                    { name: 'CurrTOV', type: 'number' },
                    { name: 'CurrGrossQty', type: 'number' },
                    { name: 'CurrGrossQtyAt15', type: 'number' },
                    { name: 'CurrNetQty', type: 'number' },
                    { name: 'CurrNetQtyAt15', type: 'number' },
                    { name: 'PrevSnapDateTime', type: 'date' },
                    { name: 'PrevSnapshotType', type: 'string' },
                    { name: 'PrevProductLevel', type: 'number' },
                    { name: 'PrevTempProduct', type: 'number' },
                    { name: 'PrevDensityAmb', type: 'number' },
                    { name: 'PrevDensityStd', type: 'number' },
                    { name: 'PrevTOV', type: 'number' },
                    { name: 'PrevGrossQty', type: 'number' },
                    { name: 'PrevGrossQtyAt15', type: 'number' },
                    { name: 'PrevNetQty', type: 'number' },
                    { name: 'PrevNetQtyAt15', type: 'number' },
                    { name: 'ProductLevelDiff', type: 'number' },
                    { name: 'TOVDiff', type: 'number' },
                    { name: 'GOVDiff', type: 'number' },
                    { name: 'NetVDiff', type: 'number' },
                    { name: 'NSVDiff', type: 'number' },
                    { name: 'Gross15VDiff', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };

            var adapter = new $.jqx.dataAdapter(tfmsSource);
            var columnrendererSingle = function (value) {
                return '<div style="margin: 22px 22px 2px 4px;">' + value + '</div>';
            }
            var columnrendererDouble = function (value) {
                return '<div style="margin: 12px 0 0 4px;">' + value + '</div>';
            }
            $("#jqxgridTFMS").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                autoheight: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>TFMS Data</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);
                },
                ready: function () {
                    var PageSize = adapter.records.length;
                    if (PageSize > iGblNoRows || PageSize <= 3) { PageSize = iGblNoRows; }
                    $("#jqxgridTFMS").jqxGrid({ pagesize: PageSize });
                    $("#jqxgridTFMS").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                },
                autoshowfiltericon: true,
                columns: [
                  { text: 'Tank Name', datafield: 'TankName', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Product', datafield: 'Product', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Day Start', datafield: 'CurrSnapDateTime', width: "10%", cellsalign: 'center', cellsformat: 'dd-MMM-yy HH:mm', filtertype: 'date', },
                  { text: 'Start Level', datafield: 'CurrProductLevel', width: "6%", cellsalign: 'center' },
                  { text: 'Start Temp', datafield: 'CurrTempProduct', width: "6%", cellsalign: 'center' },
                  //{ text: 'Start Gross', datafield: 'CurrGrossQty', width: "7%", cellsalign: 'center' },
                  { text: 'Start Density15', datafield: 'CurrDensityStd', width: "8%", cellsalign: 'center' },
                  { text: 'Start NetQty15', datafield: 'CurrNetQtyAt15', width: "8%", cellsalign: 'center' },
                  //{ text: 'Start TOV', datafield: 'CurrTOV', width: "7%", cellsalign: 'center' },
                  //{ text: 'Start GrossQty15', datafield: 'CurrGrossQtyAt15', width: "7%", cellsalign: 'center' },
                  //{ text: 'Start NetQty', datafield: 'CurrNetQty', width: "7%", cellsalign: 'center' },
                  { text: 'Prev Day End', datafield: 'PrevSnapDateTime', width: "10%", cellsalign: 'center', cellsformat: 'dd-MMM-yy HH:mm', filtertype: 'date', },
                  { text: 'End Level', datafield: 'PrevProductLevel', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'End Temp', datafield: 'PrevTempProduct', width: "6%", cellsalign: 'center' },
                  //{ text: 'End Gross', datafield: 'PrevGrossQty', width: "7%", cellsalign: 'center' },
                  { text: 'End Density15', datafield: 'PrevDensityStd', width: "8%", cellsalign: 'center' },
                  { text: 'End NetQty15', datafield: 'PrevNetQtyAt15', width: "8%", cellsalign: 'center' },
                  //{ text: 'End TOV', datafield: 'PrevTOV', width: "7%", cellsalign: 'center' },
                  //{ text: 'End GrossQty15', datafield: 'PrevGrossQtyAt15', width: "7%", cellsalign: 'center' },
                  //{ text: 'End NetQty', datafield: 'PrevNetQty', width: "7%", cellsalign: 'center' },
                  { text: 'Level Diff', datafield: 'ProductLevelDiff', width: "6%", cellsalign: 'center', aggregates: ['sum'] },
                  //{ text: 'GOV Diff', datafield: 'GOVDiff', width: "6%", cellsalign: 'center', aggregates: ['sum']},
                  { text: 'NetQty15 Diff', datafield: 'NSVDiff', width: "6%", cellsalign: 'center', aggregates: ['sum'] },
                  //{ text: 'TOV Difference', datafield: 'TOVDiff', width: "7%", cellsalign: 'center', aggregates: ['sum'] },
                  //{ text: 'Grosss15 Diff', datafield: 'Gross15VDiff', width: "6%", cellsalign: 'center', aggregates: ['sum'] }
                  //{ text: 'Net Vol Diff', datafield: 'NetVDiff', width: "6%", cellsalign: 'center', aggregates: ['sum'] },
                ]
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function DayStartEndFilter() {
    var dayStartDate = $('#dtpDayStartDate').val();
    var dtd = dayStartDate.split("/");

    if (dayStartDate == '' || dtd.length!=3) {
        alertDismissable("danger", "Invalid Date. Please select a valid date before click on Filter button");
        return;
    }
    else {
        var StartDate = new Date(dtd[2], dtd[1] - 1, dtd[0]);
        var todaysDate = new Date();
        if (StartDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            OpenDayStartEndMenu();
            return;
        }
        else
        {
            $.when(RefreshTFMSData(dayStartDate)).then(function () {
                var LvlDiff = $("#jqxgridTFMS").jqxGrid('getcolumnaggregateddata', 'ProductLevelDiff', ['sum']);
                $('#btnDayStart').hide();
                $('#btnDayEnd').hide();
                $('#btnAckDeviation').hide();
                alertDismissable("info","Data Updated!");
            }, function () { console.log('ajax error in Getting Totals'); });
        }
    }
}

function RefreshTFMSData(dayStartDate)
{
    $.ajax({
        type: "GET",
        url: "/DayStartEnd/GetTFMSData?dayStartDate=" + dayStartDate,
        cache: false,
        global: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var newtfmsSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'CurrTankID', type: 'number' },
                    { name: 'TankName', type: 'string' },
                    { name: 'Product', type: 'string' },
                    { name: 'CurrSnapDateTime', type: 'date' },
                    { name: 'CurrSnapshotType', type: 'string' },
                    { name: 'CurrProductLevel', type: 'number' },
                    { name: 'PrevSnapDateTime', type: 'date' },
                    { name: 'PrevSnapshotType', type: 'string' },
                    { name: 'PrevProductLevel', type: 'number' },
                    { name: 'ProductLevelDiff', type: 'number' },
                    { name: 'TOVDiff', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };
            tfmsSource.localdata = newtfmsSource.localdata;
            //$('#jqxgridTFMS').jqxGrid('updatebounddata', 'cells');
            $('#jqxgridTFMS').jqxGrid('updatebounddata');
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function AddDayStartEnd(SnapshotType) {
    var activityName = "Create Day Start / End";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AddDayStartEndDo(SnapshotType);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AddDayStartEndDo(SnapshotType); }, activityName);
            }
        }
    });
}

function AddDayStartEndDo(SnapshotType) {
    $('#btnDayEnd').prop('disabled', true);
    $('#btnDayStart').prop('disabled', true);
    $.ajax({
        url: "/DayStartEnd/AddDayStartEnd?SnapType=" + SnapshotType,
        type: "POST",
        cache: false,
        success: function (result) {
            $('#btnDayEnd').prop('disabled', false);
            $('#btnDayStart').prop('disabled', false);
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenDayStartEndMenu();
            }
        }
    });
}

function AckDeviations()
{
    //var dayStartDate = $('#dtpDayStartDate').val();
    //var SnapshotID = $("#jqxgridMeters").jqxGrid('getrows')[0].CurrSnapshotID;
    
    var activityName = "Ack Day Start/End Deviation";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AckDeviationsDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AckDeviationsDo(); }, activityName);
            }
        }
    });
}

function AckDeviationsDo() {
    
    $.ajax({
        url: "/DayStartEnd/AckDayStartEndDeviations",
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        data: JSON.stringify({ "SnapDate": $('#dtpDayStartDate').val()}),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenDayStartEndMenu();
            }
        }
    });
}