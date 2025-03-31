var selectedRowId, selectedRowRef, iNoRows;// TrkDetailsSource;

$(document).ready(function () {
    //setInterval(function () { refreshGrid(); }, 100000);
    Set2415DefaultRows();
    console.log("Document Readty Start: "+(new Date()).toUTCString());

    $.ajax({
        type: "GET",
        url: "/TruckMasters/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            console.log("Truck Data Received: " + (new Date()).toUTCString());
            var data = result;
            var source =
            {
                datafields: [
                    { name: 'TruckID', type: 'number' },
                    { name: 'TruckNumber', type: 'string' },
                    { name: 'TransporterCode', type: 'string' },
                    { name: 'TransporterDesc', type: 'string' },
                    { name: 'TptrDescCode', type: 'string' },
                    { name: 'TotalNoOfComp', type: 'number' },
                    { name: 'CardNumber', type: 'number' },
                    { name: 'RFID_Code', type: 'string' },
                    { name: 'User_Data', type: 'string' },
                    { name: 'LoadTypeDesc', type: 'string' },
                    { name: 'MaxVolume', type: 'number' },
                    { name: 'CalibrationExpDate', type: 'date' },
                    { name: 'ExplosiveLiscExpDate', type: 'date' },
                    { name: 'LicenseExpiryDate', type: 'date' },
                    { name: 'CCOEWeight', type: 'number' },
                    { name: 'TTDriver', type: 'string' },
                ],
                root: "TruckMasters",
                //record: "TruckMaster",
                id: 'TruckID',
                datatype: "json",
                async: false,
                localdata: data
            };
            var MastersAdapter = new $.jqx.dataAdapter(source);

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
                    localdata: MastersAdapter.records,
                    datatype: "array",
                    async: false
                }
                //console.log(MastersAdapter.records);
                var dataadapter = new $.jqx.dataAdapter(dataSource,
                    {
                        autoBind: true,
                        autoSort: false,
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
            console.log("Start Truck Details: " + (new Date()).toUTCString());
            $.ajax({
                type: "GET",
                url: "/TruckMasters/TruckDetailsData",
                cache: false,
                beforeSend: function () { },
                complete: function () { },
                success: function (TrkDetailsResult) {
                    console.log("Truck Details Received: " + (new Date()).toUTCString());
                    var TruckDetailsData = TrkDetailsResult;
                    var TrkDetailsSrc =
                    {
                        datafields: [
                            { name: 'TruckID', type: 'number' },
                            { name: 'TruckNo', type: 'string' },
                            { name: 'CompNo', type: 'number' },
                            { name: 'Capacity', type: 'number' },
                            { name: 'ProductDescription', type: 'string' },
                        ],
                        root: "Details",
                        datatype: "json",
                        localdata: TruckDetailsData,
                        async: false
                    };
                    var TrkDetailsAdapter = new $.jqx.dataAdapter(TrkDetailsSrc, { autoBind: true });
                    Details = TrkDetailsAdapter.records;
                    var nestedGrids = new Array();
                    TrkDetailsSource = new Array();
                    // create nested grid.
                    var initrowdetails = function (index, parentElement, gridElement, record) {
                        var id = record.uid.toString();
                        var grid = $($(parentElement).children()[0]);
                        nestedGrids[index] = grid;
                        var filtergroup = new $.jqx.filter();
                        var filter_or_operator = 1;
                        var filtervalue = id;
                        var filtercondition = 'equal';
                        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                        // fill the orders depending on the id.
                        var DetailByID = [];
                        for (var m = 0; m < Details.length; m++) {
                            var result = filter.evaluate(Details[m]["TruckID"]);
                            if (result)
                                DetailByID.push(Details[m]);
                        }
                        var TrkDetailsSource = new Array();
                        TrkDetailsSource[index] = {
                            datafields: [
                                { name: 'TruckID', type: 'number' },
                                { name: 'TruckNo', type: 'string' },
                                { name: 'CompNo', type: 'number' },
                                { name: 'Capacity', type: 'number' },
                                { name: 'ProductDescription', type: 'string' },
                            ],
                            id: 'TruckID',
                            localdata: DetailByID
                        }
                        var nestedGridAdapter = new $.jqx.dataAdapter(TrkDetailsSource[index]);
                        if (grid != null) {
                            grid.jqxGrid({
                                source: nestedGridAdapter, width: 800, height: 150,
                                columns: [
                                    { text: 'Truck No', datafield: 'TruckNo', width: 200 },
                                    { text: 'Comp No', datafield: 'CompNo', width: 100 },
                                    { text: 'Compartment Capacity', datafield: 'Capacity', width: 200 },
                                    { text: 'Product Description', datafield: 'ProductDescription', width: 250 },
                                ]
                            });
                        }
                    }
                    console.log("JQX Grid Start: " + (new Date()).toUTCString());
                    // creage jqxgrid
                    $("#jqxgrid").jqxGrid(
                        {
                            width: '100%',
                            source: MastersAdapter,
                            columnsresize: true,
                            //adaptive: true,
                            filterable: true,
                            sortable: true,
                            pageable: true,
                            pagesize: (iGblNoRows-4),
                            pagesizeoptions: [(iGblNoRows - 4), (iGblNoRows - 4) * 2, (iGblNoRows - 4) * 3],
                            autoheight: true,
                            showtoolbar: false,
                            filterbarmode: 'simple',
                            showfilterbar: true,
                            rendertoolbar: function (statusbar) {
                                // appends buttons to the status bar.
                                var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                                var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Trucks Master</span></div>");
                                var searchInput = $('<div style="float:right; display: flex; height: 25px; margin-top: 5px; align-items: center; position: relative; margin-left: 4px; " class="jqx-rc-all jqx-widget jqx-input-group"><div style="position: relative; margin-right: 4px; margin-left: 4px; float: left; ">Search:</div><input style="width: 200px; height: 100%; direction: ltr; " role="textbox" type="text" id="jqxcustomSearch" class="jqx-input jqx-rc-l jqx-input-group-addon jqx-widget jqx-widget-content"><div style="cursor: pointer; height: 100%; padding-top: 5px !important; " class="jqx-fill-state-normal jqx-rc-r jqx-input-group-addon"><div id="jqx-searchBtnIcon" class="jqx-icon-search"></div></div><div style="float: left; width: 16px; height: 16px; position: relative; margin: 3px; visibility:hidden; " title="Clear" class="jqx-icon-close jqxCustomclear"></div></div>');

                                var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                                var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                                var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                                container.append(tableHeading);
                                container.append(searchInput);
                                container.append(addButton);
                                container.append(editButton);
                                container.append(deleteButton);

                                statusbar.append(container);
                                addButton.jqxButton({ height: 20 });
                                editButton.jqxButton({ height: 20 });
                                deleteButton.jqxButton({ height: 20 });

                                // add new row.
                                addButton.click(function (event) {
                                    OpenAddTruckMasters();
                                });

                                // edit Row.
                                editButton.click(function (event) {
                                    EditRecord(selectedRowId);
                                });

                                // delete Row.
                                deleteButton.click(function (event) {
                                    deleteTruckMasters(selectedRowId);
                                });

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
                            rowdetails: true,
                            rowsheight: 35,
                            initrowdetails: initrowdetails,
                            rowdetailstemplate: {
                                rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 170, rowdetailshidden: true
                            },
                            rendergridrows: function () {
                                return dataAdapter.records;
                            },
                            ready: function (e) {
                                //$("#jqxgrid").jqxGrid('showrowdetails', 1);
                            },
                            columns: [
                                { text: 'TruckID', datafield: 'TruckID', width: '0%', hidden: true },
                                { text: 'Truck Number', datafield: 'TruckNumber', width: '8%', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                                { text: 'Transporter', datafield: 'TptrDescCode', width: '18%' }, //filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                                //{ text: 'Transporter Desc', datafield: 'TransporterDesc', width: '20%' },
                                { text: 'Comps', datafield: 'TotalNoOfComp', filtertype: 'checkedlist', width: '4%', cellsalign: 'center' },
                                { text: 'Card Number', datafield: 'CardNumber', width: '7%', cellsalign: 'center', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                                { text: 'RFID EPC Code', datafield: 'RFID_Code', width: '15%', cellsalign: 'center' }, 
                                { text: 'User Data', datafield: 'User_Data', width: '10%', cellsalign: 'center' },
                                { text: 'Loading Type', datafield: 'LoadTypeDesc', filtertype: 'checkedlist', width: '8%', cellsalign: 'center' },
                                { text: 'Max Volume', datafield: 'MaxVolume', width: '6%', cellsalign: 'center' },
                                //{ text: 'TT Driver', datafield: 'TTDriver', width: '16%' },
                                { text: 'Calibration ExpDate', datafield: 'CalibrationExpDate', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yyyy', cellsalign: 'center' },
                                { text: 'Explo.Lisc ExpDate', datafield: 'ExplosiveLiscExpDate', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yyyy', cellsalign: 'center' },
                                { text: 'License ExpDate', datafield: 'LicenseExpiryDate', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yyyy', cellsalign: 'center' },
                                //{ text: 'CCOE Weight', datafield: 'CCOEWeight', width: '10%', cellsalign: 'right' }

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
                            selectedRowId = selectedRowData["TruckID"];
                            EditRecord(selectedRowId);
                        }
                    });

                    //display selected row index.
                    $("#jqxgrid").on('rowselect', function (event) {
                        if (event.args.rowindex >= 0) {
                            var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                            selectedRowId = selectedRowData["TruckID"];
                            selectedRowRef = selectedRowData["TruckNumber"];
                        }
                    });
                    $("#jqxcustomSearch").on("keyup", function (event) {
                        let searchText = $(this).val();
                        if (searchText.length) {
                            $('.jqxCustomclear').css('visibility', 'visible');
                            $('.jqx-input-group-addon').val(searchText);//.click();
                        } else {
                            $('.jqxCustomclear').css('visibility', 'hidden');
                        }
                        if (event.keyCode == 27) {
                            $(this).val('');
                            $('.jqx-icon-close').css('visibility', 'hidden');
                            $('.jqx-icon-close').eq(1).click();
                        }
                        if (event.keyCode == 13) {
                            $('.jqx-input-group-addon').val(searchText).click();
                        }
                       
                    });
                    $('.jqxCustomclear').click(function () {
                        $('.jqx-icon-close').eq(1).click();
                    })
                    $('#jqx-searchBtnIcon').click(function () {
                        let searchText = $("#jqxcustomSearch").val();
                        $('.jqx-input-group-addon').val(searchText).click();
                    })
                    console.log("JQX Grid End: " + (new Date()).toUTCString());
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
    console.log("End: " + (new Date()).toUTCString());
});

function OpenAddTruckMasters() {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/Add",
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

function EditRecord(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/TruckMasters/Edit?Id=" + Id,
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

function deleteTruckMasters(Id) {
    var activityName = "Delete Existing Truck";
    var activityDetail = "Truck No: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete the Truck : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteTruckMastersDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteTruckMastersDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteTruckMastersDo(Id) {
    $.ajax({
        type: "GET",
        url: "/TruckMasters/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            OpenTruckMastersMenu();
        }
    });
}

//Will use in future
function refreshGrid() {
    //    $.ajax({
    //        type: "GET",
    //        url: "/Home/GetData",
    //        cache: false,
    //        beforeSend: function () { },
    //        complete: function () { },
    //        success: function (result) {
    //            var data = result;
    //            var source =
    //                {
    //                    datatype: "json",
    //                    localdata: data,
    //                };
    //            $("#jqxgrid").jqxGrid({ source: source });
    //        },
    //        error: function (xhr, status, error) {
    //            console.log(xhr.responseText);
    //        }
    //    });
}

function Set2415DefaultRows() {
    //var temp = screenHeight - 440;  //Used for DataTables
    var temp = screenHeight - 480;    //Used for JQX Tables
    iNoRows = parseInt(temp / 32);
    if (iNoRows <= 1) {
        iNoRows = 1;
    }
}