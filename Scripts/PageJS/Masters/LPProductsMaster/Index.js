//$(document).ready(function () {
//    $('#tblLoadingPointMaster').dataTable({
//        "iDisplayLength": iGblNoRows,
//        "bLengthChange": false,
//        "bFilter": true,
//        "bPaginate": true,
//        "bInfo": true,
//        "aoColumns":
//            [
//                { sWidth: "6%", "sClass": "text-center" }, //Bay No
//                { sWidth: "6%", "sClass": "text-center" }, //LP No.
//                { sWidth: "0%", "sClass": "text-center" },//ProductID
//                { sWidth: "11%" }, //Product Name
//                { sWidth: "11%" }, //Product Group
//                { sWidth: "9%", "sClass": "text-center" },//Header No
//                { sWidth: "7%", "sClass": "text-center" },//Recipe No
//                { sWidth: "10%", "sClass": "text-center" }, //Is Base Product
//                { sWidth: "10%", "sClass": "text-center" }, //LP Product Status
//                { sWidth: "7%", "sClass": "text-center" }, //Delete
//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//        }
//    });
//});


var selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/LPProductsMaster/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'BayID', type: 'number' },
                    { name: 'ArmNo', type: 'number' },
                    { name: 'Purpose', type: 'string' },
                    { name: 'Direction', type: 'string' },
                    { name: 'LoadingPointNo', type: 'number' },
                    { name: 'ProductID', type: 'number' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'ProductDescription', type: 'string' },
                    { name: 'ProductGroupDesc', type: 'string' },
                    { name: 'HeaderNo', type: 'number' },
                    { name: 'RecipeNo', type: 'number' },                    
                    { name: 'LPEnabled', type: 'bool' },
                    { name: 'IsBaseProduct', type: 'bool' },
                    { name: 'ProductStatus', type: 'bool' },

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
                width: "1350px",
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>LP Products Master</span></div>");
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
                        OpenAddLPProductsMaster();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId, selectedRowRef);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteLPProductsMaster(selectedRowId, selectedRowRef);
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
                  { text: 'Bay#', datafield: 'BayID', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Arm#', datafield: 'ArmNo', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Purpose', datafield: 'Purpose', width: "9%", filtertype: 'checkedlist' },
                  { text: 'Direction', datafield: 'Direction', width: "7%", filtertype: 'checkedlist' },
                  { text: 'LP#', datafield: 'LoadingPointNo', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'ProductID', datafield: 'ProductID', width: "0%", hidden: true, cellsalign: 'center' },
                  { text: 'Product Name', datafield: 'ProductName', width: "10%" },
                  { text: 'Product Desc', datafield: 'ProductDescription', width: "21%" },
                  { text: 'Group', datafield: 'ProductGroupDesc', width: "7%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Header#', datafield: 'HeaderNo', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Recipe#', datafield: 'RecipeNo', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'LPEnabled', datafield: 'LPEnabled', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "6%", cellsalign: 'center' },
                  { text: 'BaseProd', datafield: 'IsBaseProduct', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "6%", cellsalign: 'center' },
                  { text: 'Prod.Enabled', datafield: 'ProductStatus', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "7%", cellsalign: 'center' },

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
                    selectedRowId = selectedRowData["LoadingPointNo"];
                    selectedRowRef = selectedRowData["ProductID"];
                    EditRecord(selectedRowId,selectedRowRef);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["LoadingPointNo"];
                    selectedRowRef = selectedRowData["ProductID"];
                   //selectedRowRef = selectedRowData["ProductName"] + " at Bay No: " + selectedRowData["BayID"] + "; Arm No: " + selectedRowData["ArmNo"];
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        },

    });
});



function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var ProductID = $(this).attr('data-ProductID');
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteLPProductsMaster(Id, ProductID);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddLPProductsMaster() {
    $.ajax({
        type: "GET",
        url: "/LPProductsMaster/Add",
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

function EditRecord(Id, ProductID) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to Edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/LPProductsMaster/Edit?Id=" + Id + "&ProductID=" + ProductID,
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

function deleteLPProductsMaster(Id, ProductID) {
    var activityName = "Delete Existing LP Product";
    var activityDetail = "Product Id: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Loading Point Product ?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteLPProductsMasterDo(Id, ProductID);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteLPProductsMasterDo(Id, ProductID); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteLPProductsMasterDo(Id, ProductID) {
            $.ajax({
                type: "POST",
                url: "/LPProductsMaster/Delete?Id=" + Id + "&ProductID=" + ProductID,
                UpdateTargetId: "dvContent",
                cache: false,
                success: function (result) {
                    alertDismissable(result.strType, result.strMessage);
                    if (result.blnStatus == true) {
                        OpenLPProductsMasterMenu();
                    }
                }
        });
}

    