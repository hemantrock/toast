var selectedRowId, selectedRowRef, iNoRows;

$(document).ready(function () {
    SetDefaults();
    $.ajax({
        type: "GET",
        url: "/Cards/IndexData",
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
                    { name: 'CardNumber', type: 'string' },
                    { name: 'StatusDesc', type: 'string' },
                    { name: 'PrivilegeDesc', type: 'string' },
                    { name: 'TruckNo', type: 'string' },
                    { name: 'ExpiryDateTime', type: 'date' },
                    { name: 'IsManager', type: 'bool' },
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
                width: "1000px",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                pagesize: iGblNoRows,
                //showfilterrow: true,
                pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                //autoloadstate: true,
                //autosavestate: true,
                autoheight: true,
                showtoolbar: false,
                // code by hemant
                filterbarmode: 'simple',
                showfilterbar: true,
                // code by hemant
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Cards Master</span></div>");
                    // code by hemant
                    var searchInput = $('<div style="float:right; display: flex; height: 25px; margin-top: 5px; align-items: center; position: relative; margin-left: 4px; " class="jqx-rc-all jqx-widget jqx-input-group"><div style="position: relative; margin-right: 4px; margin-left: 4px; float: left; ">Search:</div><input style="width: 200px; height: 100%; direction: ltr; " role="textbox" type="text" id="jqxcustomSearch" class="jqx-input jqx-rc-l jqx-input-group-addon jqx-widget jqx-widget-content"><div style="cursor: pointer; height: 100%; padding-top: 5px !important; " class="jqx-fill-state-normal jqx-rc-r jqx-input-group-addon"><div id="jqx-searchBtnIcon" class="jqx-icon-search"></div></div><div style="float: left; width: 16px; height: 16px; position: relative; margin: 3px; visibility:hidden; " title="Clear" class="jqx-icon-close jqxCustomclear"></div></div>');
                    // code by hemant
                    var addButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Add</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</span></div>");
                    var deleteButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete</span></div>");

                    container.append(tableHeading);
                    container.append(addButton);
                    // code by hemant
                    container.append(searchInput);
                    // code by hemant
                    container.append(editButton);
                    container.append(deleteButton);

                    statusbar.append(container);
                    addButton.jqxButton({ height: 20 });
                    editButton.jqxButton({ height: 20 });
                    deleteButton.jqxButton({ height: 20 });

                    // add new row.
                    addButton.click(function (event) {
                        OpenAddCards();
                    });

                    // edit Row.
                    editButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });
                    // code by hemant                    
                    // setTimeout(function () {
                    //     $("#filterjqxgrid").hide();
                    // }, 100);
                    // setTimeout(function () {
                    //     $("#contentjqxgrid").css("top", "36px");
                    // }, 100);
                    // code by hemant

                    // delete Row.
                    deleteButton.click(function (event) {
                        deleteCards(selectedRowId);
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
                     //{ text: 'ID', datafield: 'UniqueID', width: "0%", cellsalign: 'center', hidden: true },
                      { text: 'Card No', datafield: 'CardNumber', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: "12%" },
                      { text: 'Status', datafield: 'StatusDesc', width: "18%", filtertype: 'checkedlist' },
                      { text: 'Privilege', datafield: 'PrivilegeDesc', width: "21%", filtertype: 'checkedlist' },
                      { text: 'Truck No', datafield: 'TruckNo', width: "21%" },
                      { text: 'Card Expiry Date', datafield: 'ExpiryDateTime', width: "18%", filtertype: 'date', cellsformat: 'dd-MMMM-yyyy' },
                      { text: 'Officer Card', datafield: 'IsManager', width: "10%", cellsalign: 'center', filtertype: 'checkedlist', threestatecheckbox: true, columntype: 'checkbox' },
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
                    selectedRowId = selectedRowData["UniqueID"];
                    EditRecord(selectedRowId);
                }
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["UniqueID"];
                    selectedRowRef = selectedRowData["CardNumber"] + " (" + selectedRowData["PrivilegeDesc"] + ")";
                }
            });

            // code by hemant
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
                // setTimeout(function () {
                //     $("#contentjqxgrid").css("top", "36px");
                // }, 50);

            });
            // $('.jqxCustomclear').click(function () {
            //     $('.jqx-icon-close').eq(1).click();
            // })
            $('.jqxCustomclear').click(function () {
                $('.jqx-icon-close').eq(1).click();
                let inputField = $(this).siblings('input'); // Select the sibling input field
                let clearIcon = $(this).siblings('.jqx-icon-close'); // Select the sibling clear icon
            
                inputField.val(''); // Clear the input field
                clearIcon.hide(); // Hide the clear icon
                setTimeout(function () {
                    $("#contentjqxgrid").css("top", "36px");
                }, 50);
            });
            $('#jqx-searchBtnIcon').click(function () {
                let searchText = $("#jqxcustomSearch").val();
                $('.jqx-input-group-addon').val(searchText).click();
                // setTimeout(function () {
                //     $("#contentjqxgrid").css("top", "36px");
                // }, 50);
            })
            // code by hemant

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
            deleteCards(Id);
            $('#deleteModal').modal('hide');
        });

    });
}


function OpenAddCards() {
    $.ajax({
        type: "GET",
        url: "/Cards/Add",
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

function BindSpanEdit() {
    $('.spanEdit').on("click", function (e) {
        cancelBubble(e);
        var Id = $(this).data('id');
        EditRecord(Id);
    });
}


function EditRecord(Id) {
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to edit");
    }
    else {
        $.ajax({
            type: "GET",
            url: "/Cards/Edit?Id=" + Id,
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




function deleteCards(Id) {
    var activityName = "Delete an existing Card";
    var activityDetail = "Card: " + selectedRowRef ;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Card  : " + selectedRowRef + "?</p>");
        //cancelBubble(e);
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteCardsDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteCardsDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteCardsDo(Id) {
    $.ajax({
        type: "GET",
        url: "/Cards/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenCardsMenu();
            }
        }
    });
}

function SetDefaults() {
    iNoRows = iGblNoRows;
    if ($('#TruckCardFastMap')!=undefined) {
        iNoRows = iNoRows - 5;
    }
}






//$(document).ready(function () {
//    $('#tblCards').dataTable({
//        "iDisplayLength": iGblNoRows,
//        "bLengthChange": false,
//        "bFilter": true,
//        "bPaginate": true,
//        "bInfo": true,
//        "aaSorting": [[1, 'asc']],
//        "aoColumns":
//            [
//                { sWidth: "0%" },
//                { sWidth: "22%" },
//                { sWidth: "22%" },
//                { sWidth: "22%" },
//                { sWidth: "22%" },
//                { sWidth: "10%" },

//            ],
//        "bAutoWidth": false,
//        "fnDrawCallback": function (oSettings) {
//            BindSpanDelete();
//            BindSpanEdit();
//        }
//    });
//});