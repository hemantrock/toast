
//$(document).ready(function () {
//    $('#tblTAG').dataTable({
//        "iDisplayLength": iGblNoRows,
//        "bLengthChange": false,
//        "bFilter": true,
//        "bPaginate": true,
//        "bSort": false,
//        "bInfo": true,
//        "aoColumns":
//            [
//                { sWidth: "15%" },
//                { sWidth: "15%" },
//                { sWidth: "15%" },
//                { sWidth: "15%" },
//                { sWidth: "15%" },
//                { sWidth: "8%" },
//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//        }
//    });
//});

var ControlName, PageName, selectedRowId, selectedRowRef;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/TagPageLink/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TagName', type: 'string' },
                    { name: 'ControlName', type: 'string' },
                    { name: 'PageName', type: 'number' },
                    { name: 'ControlType', type: 'number' },
                    { name: 'ClassName', type: 'string' },
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
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tag Page Link Master</span></div>");
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
                        OpenAddTagPageLink();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(TagName, PageName, ControlName);
                    });

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteTagPageLink(TagName, PageName, ControlName);
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
                  { text: 'Tag Name', datafield: 'TagName', width: "25%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  { text: 'Control Name', datafield: 'ControlName', width: "25%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  { text: 'Page Name', datafield: 'PageName', width: "25%", filtertype: 'checkedlist' },
                  { text: 'Control Type', datafield: 'ControlType', width: "10%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'Class Name', datafield: 'ClassName', width: "15%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
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
                    PageName = selectedRowData["PageName"];
                    ControlName = selectedRowData["ControlName"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["uid"];
                    PageName = selectedRowData["PageName"];
                    ControlName = selectedRowData["ControlName"];
                    selectedRowRef = selectedRowData["TagName"] + " (" + selectedRowData["PageName"] + ")";
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
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteTag(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddTagPageLink()
{
    $.ajax({
        type: "GET",
        url: "/TagPageLink/Add",
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

function EditRecord(TagName, PageName, ControlName)
{
    $.ajax({
        type: "GET",
        url: "/TagPageLink/Edit?TagName=" + TagName + "&PageName=" + PageName + "&ControlName=" + ControlName,
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
function deleteTagPageLink(TagName, PageName, ControlName) {
    var activityName = "Delete Existing TagPageLink";
    var activityDetail = "Tag Name: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Tag Page Link  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteTagPageLinkDo(TagName, PageName, ControlName);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteTagPageLinkDo(TagName, PageName, ControlName); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}
function deleteTagPageLinkDo(TagName, PageName, ControlName) {

            $.ajax({
                type: "GET",
                url: "/TagPageLink/Delete?TagName=" + TagName + "&PageName=" + PageName + "&ControlName=" + ControlName,
                cache: false,
                success: function (result) {
                    alertDismissable(result.strType, result.strMessage);
                    if (result.blnStatus == true) {
                        OpenTagPageLinkMenu();
                    }
                }
            });
            }

    
