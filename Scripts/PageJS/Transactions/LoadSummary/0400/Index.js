
function RefreshLoadSummary() {
    $.when(GetLoadSummary(), TruckDetailSummary()).then(function () {
        if ($('#jqxLSgrid').hasClass("jqx-widget") == false) { return; }
        $('#jqxLSgrid').jqxGrid('updatebounddata', 'cells');
        for (var i = 0; i < nestedGrids.length; i++) {
            if (nestedGrids[i] == undefined || nestedGrids[i].jqxGrid("getrows") == undefined) {
                //alertDismissable('danger', 'undefined');
            }
            else {
                var id = nestedGrids[i].jqxGrid("getrows")[0].LoadID.toString();
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                var filtervalue = id;
                var filtercondition = 'equal';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                // fill the orders depending on the id.
                var Detailsbyid = [];
                for (var m = 0; m < Details.length; m++) {
                    var result = filter.evaluate(Details[m]["LoadID"]);
                    if (result)
                        Detailsbyid.push(Details[m]);
                }
                DetailsSource[i].localdata = Detailsbyid;
                nestedGrids[i].jqxGrid('updatebounddata', 'cells');
            }
        }
        clearTimeout(gblTimeout);
        gblTimeout = setTimeout(function () { RefreshLoadSummary(); }, 10000);
        $("#TruckAssigmentOptions").html(CreateHtmlforAccess($('#jqxLSgrid').jqxGrid('getrowdata', $('#jqxLSgrid').jqxGrid('selectedrowindex'))));
    }, function () { console.log('ajax error in RefreshLoadSummary'); });

    var Request = $.ajax({
        type: "GET",
        url: "/LoadSummary/TrucksStatusData?iPurpose=" + Purpose,
        cache: false,
        dataType: 'json',
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var newSummaryGridSource =
            {
                datatype: "json",
                datafields: [
                    { name: 'Registered', type: 'number' },
                    { name: 'Authorized', type: 'number' },
                    { name: 'In_Queue', type: 'number' },
                    { name: 'Loading', type: 'number' },
                    { name: 'Loaded', type: 'number' },
                    { name: 'TimedOut', type: 'number' },
                    { name: 'SickTTs', type: 'number' },
                    { name: 'Exited', type: 'number' },
                    { name: 'Completed_Tot', type: 'number' },
                ],
                localdata: data,
                id: "UniqueID"
            };
            summaryGridSource.localdata = newSummaryGridSource.localdata;
            if ($('#jqxgridSummary').hasClass("jqx-widget") == false) { return; }
            $('#jqxgridSummary').jqxGrid('updatebounddata', 'cells');
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}

function GetLoadSummary() {
   
    return  $.ajax({
        type: "GET",
        url: "/LoadSummary/GetLoadSummaryData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            var newsource =
            {
                datafields: [
                    { name: 'LoadID', type: 'number' },
                    { name: 'PurposeID', type: 'number' },
                    { name: 'SourceID', type: 'number' },
                    { name: 'Date', type: 'date' },
                    { name: 'TruckNumber', type: 'string' },
                    { name: 'FANSlipNo', type: 'string' },
                    { name: 'TruckStatusDesc', type: 'string' },
                    { name: 'CustDesc', type: 'string' },
                    { name: 'LoadDetStatus', type: 'string' },
                    { name: 'ProdNameShort', type: 'string' },
                    { name: 'BayID', type: 'string' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'CardReAuthorizeTime', type: 'date' },
                    { name: 'FANPrintTime', type: 'date' },
                    { name: 'TotalSeconds', type: 'date' },
                    { name: 'EntryGateTime', type: 'date' },
                    { name: 'BayReportingTime', type: 'date' },
                    { name: 'LoadingStartTime', type: 'date' },
                    { name: 'LoadingEndTime', type: 'date' },
                    { name: 'PostLoadDateTime', type: 'date' },
                    { name: 'PostedAckDateTime', type: 'date' },
                    { name: 'ReportPrintedDateTime', type: 'date' },
                    { name: 'ExitGateTime', type: 'date' },
                    { name: 'ShipmentNo', type: 'string' },
                    { name: 'ManualPost', type: 'bool' }
                ],
                root: "LoadMasters",
                id: 'LoadID',
                datatype: "json",
                async: false,
                localdata: data
            };
            source.localdata = newsource.localdata;
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}

function TruckDetailSummary() {
    
    return $.ajax({
        type: "GET",
        url: "/LoadSummary/TruckDetailsData?Purpose=" + Purpose,
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (DetailsResultOutput) {
            var LoadDetailsData = DetailsResultOutput;
            var newDetailsSource =
            {
                datafields: [
                        { name: 'LoadID', type: 'number' },
                        { name: 'LoadingPointNo', type: 'number' },
                        { name: 'CompNo', type: 'number' },
                        { name: 'ProductName', type: 'string' },
                        { name: 'CustomerDesc', type: 'string' },
                        { name: 'PresetQty', type: 'number' },
                        { name: 'Filled', type: 'number' },
                        { name: 'BaseProduct', type: 'number' },
                        { name: 'Additive1', type: 'number' },
                        { name: 'Blending', type: 'number' },
                        { name: 'TopUpQty', type: 'number' },
                        { name: 'DecantedQty', type: 'number' },
                        { name: 'EffQty', type: 'number' },
                        { name: 'InvoiceDensityGrs', type: 'number' },
                        { name: 'InvoiceDensityAt15', type: 'number' },
                        { name: 'InvoiceTemp', type: 'number' },
                        { name: 'DensityAvg', type: 'number' },
                        { name: 'DensityAvgAt15', type: 'number' },
                        { name: 'TempAvg', type: 'number' },
                        { name: 'LoadingStartTime', type: 'date' },
                        { name: 'LoadingEndTime', type: 'date' },
                        { name: 'Status', type: 'string' },
                        { name: 'Destination', type: 'string' },

                ],
                root: "Details",
                //record: "Order",
                datatype: "json",
                localdata: LoadDetailsData,
                async: false
            };

            var DetailsDataAdapter = new $.jqx.dataAdapter(newDetailsSource, { autoBind: true });
            Details = DetailsDataAdapter.records;
        }
    });
}

function GetActionOptions(rowData) {
    $("#TruckAssigmentOptions").html(CreateHtmlforAccess(rowData));
    clearTimeout(gblTimeout);
    RefreshLoadSummary();
}