//$(document).ready(function () {
//    tblObj = $('#tblTAG').DataTable({
//        "iDisplayLength": iGblNoRows,
//        "bLengthChange": false,
//        "bFilter": true,
//        "bPaginate": true,
//        "bSort": false,
//        "bInfo": true,
//        "aoColumns":
//            [
//                { sWidth: "15%" },
//                { sWidth: "25%" },
//                { sWidth: "10%" },
//                { sWidth: "10%" },
//                { sWidth: "10%" },
//                { sWidth: "10%" },
//                { sWidth: "10%" },
//                { sWidth: "10%" },
//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//        }
//    });
//    //createTableFilter('tblTAG', tblObj);

//});

var selectedRowId, selectedRowRef, selectedRowData;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/Tags/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TagName', type: 'string'},
                    { name: 'TagDescription', type: 'string'},
                    { name: 'DSName', type: 'string'},
                    { name: 'Address', type: 'string' },
                    { name: 'Segment', type: 'number' },
                    { name: 'ForcedVal', type: 'string' },
                    { name: 'MinVal', type: 'number' },
                    { name: 'MaxVal', type: 'number'},
                    { name: 'UOM', type: 'string'},
                    { name: 'DataType', type: 'string'},
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
                autoheight: true,
                showtoolbar: true,
                autoloadstate: true,
                autosavestate: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tags Master</span></div>");
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    if (AllowForce) {
                        var ForceButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Force Tag Value</span></div>");
                    }
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-refresh' aria-hidden='true'></span> Clear State</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");


                    container.append(tableHeading);
                    container.append(addButton);
                    container.append(editButton);
                    if (AllowForce) { container.append(ForceButton); }
                    container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    editButton.jqxButton({ height: 20 });
                    if (AllowForce) { ForceButton.jqxButton({ height: 20 }); }
                    deleteButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        alertDismissable('danger','This feature is currently disabled!');
                        //OpenAddTag();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        //EditRecord(selectedRowId);
                        alertDismissable('danger', 'This feature is currently disabled!');
                        //$("#jqxgrid").jqxGrid('loadstate', initialState);
                    });

                    //ForceTagButton
                    if (AllowForce) {
                        ForceButton.click(function (event) {
                            var getselectedrowindexes = $('#jqxgrid').jqxGrid('getselectedrowindexes');
                            if (getselectedrowindexes.length > 0) {
                                // returns the selected row's data.
                                selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', getselectedrowindexes[0]);
                                SetTagForceValue(selectedRowData["TagName"], selectedRowData["ForcedVal"]);
                            }
                            else{
                                alertDismissable('danger', 'Please select a row first!'); return;
                            }
                        });
                    }

                    // delete Row.
                    deleteButton.click(function (event) {
                        alertDismissable('danger', 'This feature is currently disabled!');
                        //DeleteTags(selectedRowId);
                    });

                },
                ready: function () {
                    initialState = $("#jqxgrid").jqxGrid('getstate');
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
                  { text: 'TagName', datafield: 'TagName', width: "15%", filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); } },
                  { text: 'TagDescription', datafield: 'TagDescription', width: "35%" },
                  { text: 'DSName', datafield: 'DSName', width: "10%", filtertype: 'checkedlist' },
                  { text: 'Address', datafield: 'Address', width: "12%" },
                  { text: 'Seg#', datafield: 'Segment', width: "4%", cellsalign: 'center' },
                  { text: 'MinVal', datafield: 'MinVal', width: "6%", cellsalign: 'center' },
                  { text: 'MaxVal', datafield: 'MaxVal', width: "6%", cellsalign: 'center' },
                  { text: 'ForcedVal', datafield: 'ForcedVal', width: "6%", hidden:true, cellsalign: 'center' },
                  { text: 'UOM', datafield: 'UOM', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
                  { text: 'DataType', datafield: 'DataType', width: "6%", cellsalign: 'center', filtertype: 'checkedlist' },
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
                    selectedRowId = selectedRowData["TagName"];
                    EditRecord(selectedRowId);
                }
            });
            
            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["TagName"];
                    selectedRowRef = selectedRowData["ForcedVal"];
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

function OpenAddTag() {
    $.ajax({
        type: "GET",
        url: "/Tags/Add",
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
    $.ajax({
        type: "GET",
        url: "/Tags/Edit?TagName=" + Id,
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

function deleteTag(Id) {
    $.ajax({
        type: "GET",
        url: "/Tags/Delete?TagName=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagsMasterMenu();
            }
        }
    });
}
function DeleteTags(Id) {
    var activityName = "Delete Existing Tag";
    var activityDetail = "Tag Name: " + selectedRowRef;

    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Tag : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        DeleteTagsDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { DeleteTagsDo(Id); }, activityName, activityDetail);
                    }
                }
            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}
function DeleteTagsDo(Id) {

            $.ajax({
                type: "GET",
                url: "/Tags/DeleteTags?TagName=" + Id,
                cache: false,
                success: function (result) {
                    alertDismissable(result.strType, result.strMessage);
                    if (result.blnStatus == true) {
                        OpenTagsMasterMenu();
                    }
                }
            });
}

function SetTagForceValue(TagName, ForcedVal) {
    $('#TagName').val(TagName);
    $('#ForceTag').val(ForcedVal);
    if (ForcedVal != undefined && ForcedVal != null) { $('#chkTagForced').prop('checked', true); } else { $('#chkTagForced').prop('checked', false); }
    $('#ForceTagModal').modal('show');
    $('#ForceTagModal').draggable({ handle: ".modal-header" });
    $("#ForceTagModal #btnOK").unbind('click');
    $("#ForceTagModal #btnOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        var activityDetail = "Existing Value:" + ForcedVal + " New Value :" + $('#ForceTag').val();
        var activityName = "Force Tag Value";

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    SetForcedVal(TagName, $('#ForceTag').val());
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () {SetForcedVal(TagName, $('#ForceTag').val()); }, activityName, activityDetail);
                }
            }
        });

    });
}

function SetForcedVal(TagName, NewValue) {
    if ($('#chkTagForced').is(':checked')) {
        chkForce = true;
    }
    else {
        chkForce = false;
    }
    $.ajax({
        url: "/Tags/UpdateTagForcedVal?TagName=" + TagName + "&ForcedVal=" + NewValue + "&blnForce="+chkForce,
        type: "GET",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenTagsMasterMenu();
            }
        }
    });
    $('#ForceTagModal').modal('hide');
}

function EnablField(ctrl, fld) {
    if ($(ctrl).is(':checked')) {
        $('#' + fld).removeAttr('disabled');
    }
    else {
        $('#' + fld).val('');
        $('#' + fld).attr('disabled', 'disabled');
    }
}