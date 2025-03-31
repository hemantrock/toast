
$(document).ready(function () {
    //opcPageName = "AllTagsView";
    //opcPageName = "ALL";

    $.ajax({
        type: "GET",
        url: "/PlantView/AllTagsData",
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;

            var source =
            {
                datafields: [
                    { name: 'TagName', type: 'string' },
                    { name: 'TagDescription', type: 'string' },
                    { name: 'DSName', type: 'string' },
                    { name: 'UOM', type: 'string' },
                    { name: 'DataType', type: 'string' },
                    { name: 'Value', type: 'string' }
                ],
                root: "AllTag",
                id: 'TagID',
                datatype: "json",
                async: false,
                localdata: data
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
                    uniqueDataFields: [datafield],
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
            var addfilter = function () {

                //First Filter
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                //var filtervalue = 'BC Loop 01';
                var filtervalue = 'Process-PLC';
                var filtercondition = 'equal';
                var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                //filtergroup.addfilter(filter_or_operator, filter1);

                //filtervalue = 'Andrew';
                //filtercondition = 'starts_with';
                //var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                //filtergroup.addfilter(filter_or_operator, filter2);

                //$("#jqxgrid").jqxGrid('addfilter', 'DSName', filtergroup);
                //$("#jqxgrid").jqxGrid('applyfilters');

                //Second Filter
                var filtergroup2 = new $.jqx.filter();
                //filtervalue = 'PL01';
                //filtervalue = 'DBBV01';
                filtercondition = 'starts_with';
                filtervalue = 'aop01';
                filtercondition = 'contains';
                var filter2 = filtergroup2.createfilter('stringfilter', filtervalue, filtercondition);
                filtergroup2.addfilter(filter_or_operator, filter2);
                //$("#jqxgrid").jqxGrid('addfilter', 'TagName', filtergroup2);
                //$("#jqxgrid").jqxGrid('applyfilters')

            }
            $("#jqxgrid").jqxGrid(
            {
                width: "100%",
                source: adapter,
                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                autoshowcolumnsmenubutton: false,
                pagesize: iGblNoRows,
                pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                //autoloadstate: true,
                //autosavestate: true,
                autoheight: true,
                showtoolbar: true,
                editmode: 'selectedcell',
                editable: true,
                ready: function () { SetTagArray(); addfilter(); },
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>All Tags DataSet</span></div>");

                    container.append(tableHeading);
                    statusbar.append(container);

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
                  {
                      text: 'TAG NAME', datafield: 'TagName', width: 160,
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          buildFilterPanel(filterPanel, datafield);
                      },
                      width: "15%", editable: false
                  },
                  { text: 'Tag Description', datafield: 'TagDescription', width: "30%", editable: false },
                  { text: 'Data Source', datafield: 'DSName', filtertype: 'checkedlist', width: "10%", editable: false },
                  { text: 'Unit', datafield: 'UOM', filtertype: 'checkedlist', width: "10%", editable: false },
                  { text: 'Data Type', datafield: 'DataType', filtertype: 'checkedlist', width: "10%", editable: false },
                  { text: 'Value', datafield: 'Value', editable: true, width: "15%" },
                  {
                      text: 'Update', datafield: 'Update', columntype: 'button', width: "10%", cellsrenderer: function () {
                          return "Update";
                      }, buttonclick: function (row) {
                          JQXPause = false;
                          var PrevRecord = $("#jqxgrid").jqxGrid('getrowdata', row);
                          var PrevValue = PrevRecord["Value"];
                          $("#jqxgrid").jqxGrid('endcelledit', row, "Value", false);
                          // open the popup window when the user clicks a button.
                          editrow = row;
                          var offset = $("#jqxgrid").offset();

                          // get the clicked row's data and initialize the input fields.
                          var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                          var value = dataRecord["Value"];
                          if (dataRecord["DataType"].toUpperCase() == "BOOL") {
                              if (dataRecord["Value"].toUpperCase() == "TRUE" || dataRecord["Value"].toUpperCase() == "1")
                              { value = "false" }
                              else { value = "true" }
                              opc.server.sendDataToOPC(dataRecord["TagName"], value, opcPageName, "1", "", "", "", false, true);
                          }
                          else
                          {
                              opc.server.sendDataToOPC(dataRecord["TagName"], PrevValue, opcPageName, "1", "", "", value, false, true);
                          }
                      }
                  }

                ]
            });

            //display selected row index.
            $("#jqxgrid").on('rowselect', function (event) {
                if (event.args.rowindex >= 0) {
                    var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', event.args.rowindex);
                    //selectedRowId = selectedRowData["uid"];
                    //selectedRowRef = selectedRowData["DestinationDesc"] + " (" + selectedRowData["DestinationCode"] + ")";
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});

function ExtraActivities(model) {
    //console.log('ExtraActivities :' + Date());
    //console.log(model);
}

function SetTagArray()
{
    var rows = $('#jqxgrid').jqxGrid('getrows');
    for (var i = 0; i < rows.length; i++) {
        JQXTagNames.push(rows[i].TagName.toUpperCase());
    }
    setTimeout(function () {
        //opc.server.addToAllGroup()
        opcPageName = ".*";
        opcPageName1 = 'ALL_PAGES';
        opc.server.addToGroup(opcPageName);
        opc.server.readPageTags(opcPageName);
    }, 1000);
}
