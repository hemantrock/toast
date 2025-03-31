var selectedRowId, selectedRowRef, NoOfRows, AllowPriorityEdit = false;
$(document).ready(function () {

    if ($('#AllowPriorityEdit').val() == 1) {
        AllowPriorityEdit = true;
    }

    $.ajax({
        type: "GET",
        url: "/BaysMaster/IndexData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'GantryNo', type: 'number' },
                    { name: 'BayName', type: 'string' },
                    { name: 'BayProducts', type: 'string' },
                    { name: 'BayID', type: 'number' },
                    { name: 'BayPriority', type: 'number' },
                    { name: 'IsEarthingBypassed', type: 'bool' },
                    { name: 'IsOverspillBypassed', type: 'bool' },
                    { name: 'IsVRUArmBypassed', type: 'bool' },
                    { name: 'IsBPBSBypassed', type: 'bool' }
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
                    width: "1200px",
                    source: adapter,
                    columnsresize: true,
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    editable: AllowPriorityEdit,
                    autoheight: true,
                    showtoolbar: true,
                    rendertoolbar: function (statusbar) {
                        // appends buttons to the status bar.
                        var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                        var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Bays Master</span></div>");
                        var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                        var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                        var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");
                        var UpdatePriorityButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Update Bay Priority</span></div>");


                        container.append(tableHeading);
                        container.append(addButton);
                        container.append(editButton);
                        container.append(deleteButton);
                        container.append(UpdatePriorityButton);

                        statusbar.append(container);
                        addButton.jqxButton({ height: 20 });
                        editButton.jqxButton({ height: 20 });
                        deleteButton.jqxButton({ height: 20 });
                        UpdatePriorityButton.jqxButton({ height: 20 });

                        // add new row.
                        addButton.click(function (event) {
                            OpenAddBaysMaster();
                        });

                        // edit Row.
                        editButton.click(function (event) {
                            EditRecord(selectedRowId);
                        });

                        // delete Row.
                        deleteButton.click(function (event) {
                            deleteBaysMaster(selectedRowId);
                        });

                        // UpdatePriority.
                        UpdatePriorityButton.click(function (event) {
                            var rows = $('#jqxgrid').jqxGrid('getrows');
                            var errorMessage = "";
                            var BaysMasterList = [];
                            for (var i = 0; i < rows.length; i++) {
                                var BaysMaster = {
                                    BayPriority: rows[i].BayPriority,
                                    BayID: rows[i].BayID
                                };

                                for (var obj in BaysMasterList) {
                                    if (BaysMasterList[obj].BayPriority == rows[i].BayPriority) {
                                        errorMessage = "BayPriority Value: " + BaysMasterList[obj].BayPriority + " already exist for Bay ID: " + BaysMasterList[obj].BayID;
                                        break;
                                    }
                                }
                                if (errorMessage != "") {
                                    break;
                                }
                                BaysMasterList.push(BaysMaster);
                            }
                            UpdateBayPriority(BaysMasterList, errorMessage);
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
                        { text: 'Gantry#', datafield: 'GantryNo', filtertype: 'checkedlist', width: "6%", cellsalign: 'center', editable: false },
                        { text: 'Bay#', datafield: 'BayID', width: "5%", cellsalign: 'center', editable: false },
                        { text: 'Bay Name', datafield: 'BayName', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: "8%", editable: false },
                        { text: 'Bay Products', datafield: 'BayProducts', width: "36%", editable: false },
                        { text: 'Bay Priority', datafield: 'BayPriority', width: "8%", cellsalign: 'center' },
                        { text: 'Earth Bypass', datafield: 'IsEarthingBypassed', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "9%", editable: false },
                        { text: 'Overspill Bypass', datafield: 'IsOverspillBypassed', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "10%", editable: false },
                        { text: 'VRU Bypass', datafield: 'IsVRUArmBypassed', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "9%", editable: false },
                        { text: 'BPBS Bypass', datafield: 'IsBPBSBypassed', threestatecheckbox: true, columntype: 'checkbox', filtertype: 'checkedlist', width: "9%", editable: false },
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
                    selectedRowId = selectedRowData["BayID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["BayID"];
                    selectedRowRef = selectedRowData["BayName"];
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
        var Id = $(this).data('id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteBaysMaster(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddBaysMaster() {
    $.ajax({
        type: "GET",
        url: "/BaysMaster/Add",
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
            url: "/BaysMaster/Edit?Id=" + Id,
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

function deleteBaysMaster(Id) {
    var activityName = "Delete Existing Bay";
    var activityDetail = "Bay: " + selectedRowRef;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Bay Master  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteBaysMasterDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteBaysMasterDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteBaysMasterDo(Id) {

    $.ajax({
        type: "GET",
        url: "/BaysMaster/Delete?Id=" + Id,
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaysMasterMenu();
            }
        }

    });
}

function UpdateBayPriority(BaysMasterList, errorMessage) {
    if (errorMessage != "") {
        alertDismissable("danger", errorMessage);
    }
    else {
        var activityName = "Bay Priority Edit";
        var activityDetail = "Bay Priority Edit";
        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    UpdateBayPriorityDo(BaysMasterList);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBayPriorityDo(BaysMasterList); }, activityName, activityDetail);
                }
            }
        });
    }
}

function UpdateBayPriorityDo(BaysMasterList) {
    $.ajax({
        url: "/BaysMaster/UpdateBayPriority",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(BaysMasterList),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaysMasterMenu();
            }
        }
    });
}

