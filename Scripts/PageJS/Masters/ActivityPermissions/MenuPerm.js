var columns;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/ActivityPermissions/MenuPermissionData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var json = result;
            //console.log('Data:' + json);
            var obj = $.parseJSON(json);
            columns = obj[0];
            var datafields = new Array();
            for (var i = 0; i < columns.length; i++) {
                datafields.push({ name: columns[i].datafield, type: columns[i].datatype });
            }
            var rows = obj[1];
            var source =
            {
                datatype: "json",
                datafields: datafields,
                id: 'ID',
                localdata: rows
            };
            console.log(columns);
            console.log(rows);
            var dataAdapter = new $.jqx.dataAdapter(source);
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
                    localdata: dataAdapter.records,
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
                source: dataAdapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                editable: true,
                autoheight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Menu Permissions</span></div>");
                    var editButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Update Menu Permissions</span></div>");


                    container.append(tableHeading);
                    container.append(editButton);

                    statusbar.append(container);
                    editButton.jqxButton({ height: 20 });

                    editButton.click(function (event) {
                        UpdateRecords();
                    });
                },
                ready: function () {
                    PageSize = dataAdapter.records.length;
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
                columns: columns
            });
        }
    });
});


function UpdateRecords() {
    var activityName = "Update Menu Permissions";
    var activityDetail = "Update Menu Permissions";
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateMenuPermDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateMenuPermDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateMenuPermDo() {
    var rows = $('#jqxgrid').jqxGrid('getrows');
    var MenuPermList = [];
    for (var i = 0; i < rows.length; i++) {
        for (var j = 5; j < columns.length; j++) {
            var oMenuPerm = {
                MenuID: rows[i].UniqueID,
                UserRoleID: columns[j].datafield,
                Permission: rows[i][columns[j].datafield],
            };
            MenuPermList.push(oMenuPerm);
        }
    }
    $.ajax({
        url: "/ActivityPermissions/UpdateMenuPerm",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(MenuPermList),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenMenuPermission();
            }
        }
    });
}