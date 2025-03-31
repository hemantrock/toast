       
var selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/Product/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'ProductID', type: 'number' },
                    { name: 'ProductCode', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'ProductColor', type: 'string' },
                    { name: 'ProductDescription', type: 'string' },
                    { name: 'ProdNameShort', type: 'string' },
                    { name: 'MinDensity', type: 'string' },
                    { name: 'MaxDensity', type: 'string' },
                    { name: 'Density', type: 'number' },
                    { name: 'StdDensity', type: 'string' },
                    { name: 'AdditiveQty1', type: 'string' },
                    { name: 'AdditiveQty2', type: 'string' },
                    { name: 'EthBlending', type: 'string' },
                    { name: 'UOM', type: 'number' },
                    { name: 'HeaderNo', type: 'number' },
                    { name: 'IsBaseProduct', type: 'bool' },
                    { name: 'Components', type: 'string' },
                    { name: 'Additive', type: 'string' },

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
            var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                return '<span style="background-color:' + value + ';display: inline-block;width: 100%;height: 30px;"></span> ';
                

                //var element = $(defaulthtml);
                //element.css({ 'background-color': '#' + columnproperties.datafield });
                //return element[0].outerHTML;
                //return defaultHtml;
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
                autoshowcolumnsmenubutton: false,
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Product Master</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                    container.append(tableHeading);
                    container.append(addButton);
                    container.append(editButton);
                    container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({height: 20 });
                    editButton.jqxButton({height: 20 });
                    deleteButton.jqxButton({height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        OpenAddProduct();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteProduct(selectedRowId);
                    });

                },
                ready: function () {
                    PageSize = adapter.records.length;
                    if (PageSize > iGblNoRows) { PageSize = iGblNoRows; }
                    $("#jqxgrid").jqxGrid({ pagesize: PageSize });
                    $("#jqxgrid").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                },
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
             
                  { text: 'Id', datafield: 'ProductID', width: "0%", cellsalign: 'center', hidden: true },
                  { text: 'Code', datafield: 'ProductCode', width: "8%", cellsalign: 'center' },
                  { text: 'Product Name', datafield: 'ProductName', width: "12%", filtertype: 'checkedlist' },
                  { text: 'Product Color', datafield: 'ProductColor', width: "11%", filterable: false, cellsrenderer: cellsrenderer },
                  { text: 'Short Name', datafield: 'ProdNameShort', width: "8%" },
                  { text: 'Product Description', datafield: 'ProductDescription', width: "19%" },
                  { text: 'Components', datafield: 'Components', width: "20%", cellsalign: 'left' },
                  { text: 'Additive', datafield: 'Additive', width: "10%", cellsalign: 'left' },
                  //{ text: 'Min Density', datafield: 'MinDensity', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  //{ text: 'Max Density', datafield: 'MaxDensity', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  //{ text: 'Std Density', datafield: 'StdDensity', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  //{ text: 'Additive 1', datafield: 'AdditiveQty1', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  //{ text: 'Additive 2', datafield: 'AdditiveQty2', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  //{ text: 'Blending %', datafield: 'EthBlending', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'UoM', datafield: 'UOM', width: "7%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Header#', datafield: 'HeaderNo', width: "5%", cellsalign: 'center', filtertype: 'checkedlist' },

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
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    selectedRowRef = selectedRowData["ProductName"] + " (" + selectedRowData["ProductCode"] + ")";
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//        }
//    });
//    //$('#tblProduct_filter').html('<h3 class="grid-header">PRODUCTS</h3>' + $('#tblProduct_filter').html());
//});

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteProduct(Id);
            $('#deleteModal').modal('hide');
        });

    });
}

function OpenAddProduct()
{
    $.ajax({
        type: "GET",
        url: "/Product/Add",
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

function EditRecord(Id)
{
    $.ajax({
        type: "GET",
        url: "/Product/Edit?Id=" + Id,
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
function deleteProduct(Id) {
    var activityName = "Delete Existing Product";
    var activityDetail = "Product Name: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete the Product : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteProductDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteProductDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}
function deleteProductDo(Id) {
            $.ajax({
                type: "GET",
                url: "/Product/Delete?Id=" + Id,
                UpdateTargetId: "dvContent",
                cache: false,
                success: function (result) {
                    alertDismissable(result.strType, result.strMessage);
                    if (result.blnStatus == true) {
                        OpenProductMenu();
                    }
                }
            });
}