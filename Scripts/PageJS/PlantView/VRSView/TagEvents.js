
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/TagEventsData_VRS",
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
                    { name: 'Application', type: 'string' },
                    { name: 'TagName', type: 'string' },
                    { name: 'TagEventName', type: 'string' },
                    { name: 'EventLogDesc', type: 'string' },
                    { name: 'Active', type: 'bool' },
                    { name: 'LogTime', type: 'date' },
                    { name: 'ConditionClearDT', type: 'date' },
                    { name: 'LoginID', type: 'string' },
                    { name: 'TypeID', type: 'number' },
                    { name: 'EventType', type: 'string' },
                    { name: 'Severity', type: 'string' },
                    { name: 'AckDateTime', type: 'date' },
                    { name: 'AckUserName', type: 'string' },
                    { name: 'Ack', type: 'bool' },
                ],
                localdata: data,
                id: "UniqueID"
            };

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
                var column = $("#jqxTagEventGrid").jqxGrid('getcolumn', datafield);
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
                    $("#jqxTagEventGrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxTagEventGrid").jqxGrid('applyfilters');
                    $("#jqxTagEventGrid").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxTagEventGrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxTagEventGrid").jqxGrid('applyfilters');
                    $("#jqxTagEventGrid").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            var cellsrendererAck = function (row, columnfield, value, defaulthtml, columnproperties) {
                var selectedRowData = $('#jqxTagEventGrid').jqxGrid('getrowdata', row);
                uid = selectedRowData["UniqueID"];

                if (value) {
                    return '<div onclick="AcknowledgeSelectedAlarms(' + uid + ')" style="text-align: center; display: inline-block; cursor: pointer; width: 100%; height: 100%; margin: 0 auto; position: relative;"><span class="glyphicon glyphicon-check clickable spanAck" style="width: 16px; height: 15px; margin: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"></span></div>';
                }
                else {
                    return '<div style="text-align: center;"><span></span></div>';
                }
            }
            var cellsrendererActive = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value) {
                    var Prefix = 'alert_';
                    var selectedRowData = $('#jqxTagEventGrid').jqxGrid('getrowdata', row);
                    if (selectedRowData["Ack"] == false) { Prefix = 'alert_inactive_'; }
                    return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="' + Prefix + value + '"></span></div>';
                }
                else {
                    return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="' + '"></span></div>';
                }
                //return '<div style="text-align: center;"><span style="height: 35px; width: 33px;" class="alert_true"></span></div>';
            }

            $("#jqxTagEventGrid").jqxGrid(
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
                //autoRowHeight: true,
                showtoolbar: true,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>VRS Alarms and Events</span></div>");
                    var refreshButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-refresh' aria-hidden='true'></span> Refresh</span></div>");
                    var ackButton = $("<div class='jqx-header-btn btn btn-primary' style='margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: -3px;'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span> Ack Selected</span></div>");

                    container.append(tableHeading);
                    container.append(refreshButton);
                    //container.append(ackButton);

                    statusbar.append(container);
                    refreshButton.jqxButton({ height: 20 });
                    //ackButton.jqxButton({ height: 20 });

                    // add new row.
                    refreshButton.click(function (event) {
                        RefreshPage();
                    });

                    // edit Row.
                    ackButton.click(function (event) {
                        EditRecord(selectedRowId);
                    });

                },
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxTagEventGrid").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                    { text: 'UniqueID', datafield: 'UniqueID', width: '0%', hidden: true },
                    { text: 'Application', datafield: 'Application', filtertype: 'checkedlist', width: '0%', hidden: true },
                    { text: 'TagName', datafield: 'TagName', filtertype: 'checkedlist', width: '11%' },
                    { text: 'TagEventName', datafield: 'TagEventName', filtertype: "custom", createfilterpanel: function (datafield, filterPanel) { buildFilterPanel(filterPanel, datafield); }, width: '0%', hidden: true },
                    { text: 'EventLogDesc', datafield: 'EventLogDesc', width: '40%' },
                    { text: 'LogTime', datafield: 'LogTime', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                    { text: 'ConditionClearDT', datafield: 'ConditionClearDT', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                    { text: 'Active', datafield: 'Active', filtertype: 'checkedlist', width: '4%', cellsrenderer: cellsrendererActive, cellsalign: 'center' },
                    { text: 'LoginID', datafield: 'LoginID', filtertype: 'checkedlist', width: '0%', hidden: true },
                    { text: 'TypeID', datafield: 'TypeID', width: '0%', hidden: true },
                    { text: 'EventType', datafield: 'EventType', filtertype: 'checkedlist', width: '5%' },
                    { text: 'Severity', datafield: 'Severity', filtertype: 'checkedlist', width: '5%' },
                    { text: 'AckDateTime', datafield: 'AckDateTime', filtertype: 'date', width: '8%', cellsformat: 'dd-MMM-yy HH:mm:ss' },
                    { text: 'AckUserName', datafield: 'AckUserName', filtertype: 'checkedlist', width: '7%' },
                    { text: 'Ack', datafield: 'Ack', filtertype: 'checkedlist', width: '4%', cellsrenderer: cellsrendererAck, cellsalign: 'center' },
                ]
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function BindSpanAck() {
    $('.spanAck').on("click", function (e) {
        var Id = $(this).data('id');
        $('#myPasswordLabel').html('Confirm Acknowledge K Factor');
        $('#myPasswordModal').modal('show');
        $("#btnPwdOK").unbind('click');
        $("#btnPwdOK").on("click", function () {
            ConfirmPasswordKFactor(Id);
            $('#Pwd_txtPassword').text(''); $('#Pwd_txtPassword').val('');
        });
        cancelBubble(e);
    });
}

function BindSpanDelete() {
    $('.spanDelete').on("click", function (e) {
        $('#deleteModal').modal('show');
        cancelBubble(e);
        var Id = $(this).attr('data-id');
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            deleteBatchController(Id);
            $('#deleteModal').modal('hide');
        });
    });
}

function OpenAddBatchController() {
    $.ajax({
        type: "GET",
        url: "/BatchController/Add",
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
    $.ajax({
        type: "GET",
        url: "/BatchController/Edit?Id=" + Id,
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

function deleteBatchController(Id, e) {
    var activityName = "Delete Existing Batch Controller";
    var activityDetail = "Batch Controller: " + selectedRowRef;
    if (Id == undefined) {
        alertDismissable("danger", "Please select the row you want to delete");
    }
    else {
        $('#deleteModal').modal('show');
        $('#myConfirmDelete').html("<p>Are you sure to Delete Batch Controller  : " + selectedRowRef + "?</p>");
        $("#confirmDelete").unbind('click');
        $("#confirmDelete").click(function () {
            $(".modal-backdrop").slideUp('slow');
            $.ajax({
                type: "GET",
                url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
                cache: false,
                success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        deleteBatchControllerDo(Id);
                    }
                    else {
                        ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { deleteBatchControllerDo(Id); }, activityName, activityDetail);
                    }
                }

            });
            $('#deleteModal').modal('hide');
            $('#myConfirmDelete').html("<p>Are you sure you want to Delete selected record??</p>");
        });
    }
}

function deleteBatchControllerDo(Id) {
    $.ajax({
        type: "GET",
        url: "/BatchController/Delete?Id=" + Id,
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBatchControllerMenu();
            }
        }
    });
}

function AckKFactBC(Id) {
    var activityName = "Ack K Factor";
    var activityDetail = "Meter: " + selectedRowRef;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                AckKFactBCDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { AckKFactBCDo(Id); }, activityName, activityDetail);
            }
        }
    });
}

function AckKFactBCDo(Id) {

    $.ajax({
        type: "GET",
        url: "/BatchController/KFactorAck?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBatchControllerMenu();
            }
        }
    });
}


function AcknowledgeSelected() {
    $('#AckAll').on("click", function (e) {
        var strIds = "";
        $("input[name='chkRow'][type='checkbox']:checked").each(function (i, c) {
            strIds = strIds + $(c).attr('id') + ',';
        });
        $('#myConfirmMsg').html("<p>Are you sure to Acknowledge Selected Alarms / Events ?</p>");
        $('#confirmModal').modal('show');
        $('#confirmModal').draggable({handle: ".modal-header"});
        cancelBubble(e);
        $("#btnConfirmOK").unbind('click');
        $("#btnConfirmOK").click(function () {
            $(".modal-backdrop").slideUp('slow');
            AcknowledgeSelectedAlarms(strIds);
            $('#confirmModal').modal('hide');
        });
    });
}

function AcknowledgeSelectedAlarms(strIds) {
    $.ajax({
        type: "GET",
        url: "/AlarmsAndEvents/AcknowledgeSelectedAlarms?strIds=" + strIds,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                GetStatusBarAck();
                if ($('#hdnType').val() == "Alarms") {
                    OpenAlarmsMenu();
                }
                else {
                    OpenEventsMenu();
                }
            }
        }
    });
}

function SelectAll(blnCheck)
{
    if (blnCheck == true) {
        $("input[name='chkRow'][type='checkbox']").each(function (i, c) {
            $(c).prop('checked', true);
        });
    }
    else {
        $("input[name='chkRow'][type='checkbox']").each(function (i, c) {
            $(c).prop('checked', false);
        });
    }
}

function RefreshPage()
{
    if ($('#hdnType').val() == "Alarms") {
        OpenAlarmsMenu();
    }
    else {
        OpenViewPath('AlarmsAndEvents/Alarms', 'TagEvents')
    }
}