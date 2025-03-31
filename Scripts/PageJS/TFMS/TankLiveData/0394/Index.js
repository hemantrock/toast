var selectedRowId, selectedRowRef;
var source, GridRows, tankModes;
var LevelTag = "_LEVEL"; var HHHTag = "_LVL_HHH";
var PercentLevelTag = "_PER_LVL";
$(document).ready(function () {
    var ShowSafetyRadarData = $('#ShowSafetyRadarLevel').html().toLowerCase();
    var hiddenProp;
    if (ShowSafetyRadarData == 'true') {
        hiddenProp = false;
    }
    else {
        hiddenProp = true;
    }

    $.ajax({
        type: "GET",
        url: "/TankLiveData/GetTankLabels",
        async: false,
        //cache: false,
        success: function (result) {
            tankModes = result;
        },
        error: function () { }
    });

    var tankModesSource =
            {
                datatype: "array",
                datafields: [
                    { name: 'label', type: 'string' },
                    { name: 'value', type: 'string' }
                ],
                localdata: tankModes
            };
    var tankModesAdapter = new $.jqx.dataAdapter(tankModesSource, {
        autoBind: true
    });
    $.ajax({
        type: "GET",
        url: "/TankLiveData/TanksLiveData",
        //cache: false,
        cache: true,
        beforeSend: function () { },
        complete: function () { },
        success: function (result) {
            var data = result;
            source =
            {
                datatype: "json",
                datafields: [
                    { name: 'TagName', type: 'string' },
                    { name: 'TagPrefix', type: 'string' },
                    { name: 'TankName', type: 'string' },
                    { name: 'DipReferenceHeight', type: 'number' },
                    { name: 'NominalDia', type: 'number' },
                    { name: 'MaxVolume', type: 'number' },
                    { name: 'SafeFillingCapacity', type: 'number' },
                    { name: 'NoOfTempEle', type: 'number' },
                    { name: 'SafeFillingHeight', type: 'number' },
                    { name: 'PercentFilled', type: 'number' },
                    { name: 'GrossObsvol', type: 'number' },
                    { name: 'GrossStdvol', type: 'number' },
                    { name: 'NetStdvol', type: 'number' },
                    { name: 'Mass', type: 'number' },
                    { name: 'TankCode', type: 'string' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'TankMode', type: 'string' },
                    { name: 'TankModeName', type: "string", value: 'TankMode', values: { source: tankModesAdapter.records, value: 'value', name: 'label' } },
                    { name: 'TankType', type: 'string' },
                    { name: 'PriLevel', type: 'number' },
                    { name: 'WaterLevel', type: 'number' },
                    { name: 'TempAvg', type: 'number' },
                    { name: 'Pressure', type: 'number' },
                    { name: 'VapPress', type: 'number' },
                    { name: 'DensityAmb', type: 'number' },
                    { name: 'DensityStd', type: 'number' },
                    { name: 'WaterVolume', type: 'number' },
                    { name: 'LevelRate', type: 'number' },
                    { name: 'FlowRate', type: 'number' },
                    { name: 'TOV', type: 'number' },
                    { name: 'PumpVol', type: 'number' },
                    { name: 'Ullage', type: 'number' },
                    { name: 'UllageVol', type: 'number' },
                    { name: 'Temp01', type: 'number' },
                    { name: 'Temp02', type: 'number' },
                    { name: 'Temp03', type: 'number' },
                    { name: 'Temp04', type: 'number' },
                    { name: 'Temp05', type: 'number' },
                    { name: 'Temp06', type: 'number' },
                    { name: 'Temp07', type: 'number' },
                    { name: 'Temp08', type: 'number' },
                    { name: 'Temp09', type: 'number' },
                    { name: 'Temp10', type: 'number' },
                    { name: 'Temp11', type: 'number' },
                    { name: 'Temp12', type: 'number' },
                    { name: 'Temp13', type: 'number' },
                    { name: 'Temp14', type: 'number' },
                    { name: 'Temp15', type: 'number' },
                    { name: 'SecLevel', type: 'number' },
                    { name: 'Pri_Sec_Lvl_Diff', type: 'number' },
                    { name: 'Pri_Sec_Diff_Alert', type: 'bool' },
                    { name: 'SP_Level_HHH', type: 'number' },
                    { name: 'SP_Level_HH', type: 'number' },
                    { name: 'SP_Level_H', type: 'number' },
                    { name: 'SP_Level_L', type: 'number' },
                    { name: 'SP_Level_LL', type: 'number' },

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
                var column = $("#jqxgridTkLiveData").jqxGrid('getcolumn', datafield);
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
                    $("#jqxgridTkLiveData").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                    }
                });
                filterclearbutton.click(function () {
                    $("#jqxgridTkLiveData").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#jqxgridTkLiveData").jqxGrid('applyfilters');
                    $("#jqxgridTkLiveData").jqxGrid('closemenu');
                });
                filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
                });
            }

            initrowdetails = function (index, parentElement, gridElement, datarecord) {
                var tabsdiv = null;
                var basicdata = null, product = null, density = null, water = null, temperature = null, alarms = null;

                tabsdiv = $($(parentElement).children()[0]);
                if (tabsdiv != null) {
                    basicdata = tabsdiv.find('.basicdata');
                    product = tabsdiv.find('.product');
                    density = tabsdiv.find('.density');
                    water = tabsdiv.find('.water');
                    temperature = tabsdiv.find('.temperature');
                    alarms = tabsdiv.find('.alarms');

                    //Basic Data
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(basicdata));
                    var leftSection = $('<div style="float: left; width: 55%;"></div>');
                    //var rightSection = $('<div style="float: left; width: 40%;"></div>');
                    container.append(leftSection);
                    //container.append(rightSection);

                    var tankBasicData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class='bold'>Tank Name</td>
                                            <td>` + datarecord.TankName + `</td>
                                            <td class='bold'>ERP TankNo</td>
                                            <td>` + datarecord.TankCode + `</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Product Name</td>
                                            <td>` + datarecord.ProductName + `</td>
                                            <td class='bold'>Tank Type</td>
                                            <td>` + datarecord.TankType + `</td>
                                        </tr>

                                        <tr>
                                            <td class ='bold'>Dip Reference Height (`+ TFMSLevelUnit + `) </td>
                                            <td>` + datarecord.DipReferenceHeight + `</td>
                                            <td class='bold'>Nominal Dia (Mtrs)</td>
                                            <td>` + datarecord.NominalDia + `</td>
                                        </tr>

                                        <tr>
                                            <td class='bold'>Max Volume</td>
                                            <td>` + datarecord.MaxVolume + ` Ltrs</td>
                                            <td class='bold'>Safe Filling Level (mm)</td>
                                            <td>` + datarecord.SafeFillingCapacity + `</td>
                                        </tr>
                                    </tbody>
                                    </table>`;

                    //var tankName = "<div style='margin: 10px;'><b>Tank Name:</b> " + datarecord.TankName + "</div>";
                    //var sapTankNo = "<div style='margin: 10px;'><b>ERP TankNo:</b> " + datarecord.TankCode + "</div>";
                    //var productName = "<div style='margin: 10px;'><b>Product Name:</b> " + datarecord.ProductName + "</div>";
                    //var tankType = "<div style='margin: 10px;'><b>Tank Type:</b> " + datarecord.TankType + "</div>";
                    //$(leftSection).append(tankName);
                    //$(leftSection).append(sapTankNo);
                    // $(leftSection).append(productName);
                    //$(leftSection).append(tankType);
                    $(leftSection).append(tankBasicData);

                    //var dipReferenceHeight = "<div style='margin: 10px;'><b>DipReference Height:</b> " + datarecord.DipReferenceHeight + "</div>";
                    //var nominalDia = "<div style='margin: 10px;'><b>Nominal Dia:</b> " + datarecord.NominalDia + " Mtrs</div>";
                    //var maxVolume = "<div style='margin: 10px;'><b>Max Volume:</b> " + datarecord.MaxVolume + " Ltrs</div>";
                    //var safeFillingCapacity = "<div style='margin: 10px;'><b>Safe Filling Capacity: </b> " + datarecord.SafeFillingCapacity + " Ltrs</div>";
                    //$(rightSection).append(dipReferenceHeight);
                    //$(rightSection).append(nominalDia);
                    //$(rightSection).append(maxVolume);



                    //Product
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(product));
                    var leftSection = $('<div style="float: left; width: 60%;"></div>');
                    //var rightSection = $('<div style="float: left; width: 30%;"></div>');
                    container.append(leftSection);
                    //container.append(rightSection);


                    var productData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class='bold'>Process Radar Level </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LEVEL> ` + datarecord.PriLevel + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class ='bold'>Safe Filling Height (`+ TFMSLevelUnit + `) </td>
                                            <td><span data-sfl ="` + datarecord.SafeFillingHeight + `" class = ` + datarecord.TagPrefix + `_LVL_HHH> ` + datarecord.SafeFillingHeight + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class ='bold'>Gross Obs. Vol. </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_GOV> ` + datarecord.GrossObsvol + ` </span> KL</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>% Filled</td>
                                            <td><span class=` + datarecord.TagPrefix + `_PER_LVL> ` + datarecord.PercentFilled + `</span> %</td>
                                            <td class ='bold'>Level Rate </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LEVEL_RATE> ` + datarecord.LevelRate + ` </span> m/hr</td>
                                            <td class ='bold'>Gross Standard Vol. </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_GSV> ` + datarecord.GrossStdvol + ` </span> KL</td>
                                        </tr>
                                        <tr>
                                            <td class ='bold'>Flow Rate </td>
                                            <td><span class=` + datarecord.TagPrefix + `_FLOW_RATE> ` + datarecord.FlowRate + `</span> m³/hr</td>
                                            <td class='bold'>Total Obs Vol (TOV) </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_TOV> ` + datarecord.TOV + ` </span> KL</td>
                                            <td class ='bold'>Net Standard Vol. </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_NSV> ` + datarecord.NetStdvol + ` </span> KL</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Pump Vol </td>
                                            <td><span class=` + datarecord.TagPrefix + `_PUMP_VOL> ` + datarecord.PumpVol + `</span> KL</td>
                                            <td class='bold'>Ullage Level </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_ULLAGE> ` + datarecord.Ullage + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class ='bold'>Ullage Volume </td>
                                            <td><span class = ` + datarecord.TagPrefix + `_ULLAGE_VOL> ` + datarecord.UllageVol + ` </span> KL</td>
                                        </tr>
                                    </tbody>
                                    </table>`;


                    //var primaryRadarLevel = "<div style='margin: 10px;'><b>Process Radar Level: </b><span class=" + datarecord.TagPrefix + "_LEVEL>" + datarecord.PriLevel + "</span> M</div>";
                    //var safeFillingHeight = "<div style='margin: 10px;'><b>Safe Filling Height: </b><span class=" + datarecord.TagPrefix + "_LVL_HHH>" + datarecord.SafeFillingHeight + "</span> M</div>";
                    //var perFilled = "<div style='margin: 10px;'><b>% Filled: </b><span class=" + datarecord.TagPrefix + "_PER_LVL>" + datarecord.PercentFilled + "</span>%</div>";
                    //var levelRate = "<div style='margin: 10px;'><b>Level Rate: </b><span class=" + datarecord.TagPrefix + "_LEVEL_RATE>" + datarecord.LevelRate + "</span> m/sec</div>";
                    //var flowRate = "<div style='margin: 10px;'><b>Flow Rate: </b><span class=" + datarecord.TagPrefix + "_FLOW_RATE>" + datarecord.FlowRate + "</span> m³/hr</div>";
                    //$(leftSection).append(primaryRadarLevel);
                    //$(leftSection).append(safeFillingHeight);
                    //$(leftSection).append(perFilled);
                    //$(leftSection).append(levelRate);
                    //$(leftSection).append(flowRate);

                    $(leftSection).append(productData);

                    //var TOV = "<div style='margin: 10px;'><b>TOV: </b><span class=" + datarecord.TagPrefix + "_TOV>" + datarecord.TOV + "</span> Ltrs</div>";
                    //var pumpVol = "<div style='margin: 10px;'><b>Pump Vol: </b><span class=" + datarecord.TagPrefix + "_PUMP_VOL>" + datarecord.PumpVol + "</span> Ltrs</div>";
                    //var ullage = "<div style='margin: 10px;'><b>Ullage: </b><span class=" + datarecord.TagPrefix + "_ULLAGE>" + datarecord.Ullage + "</span> Ltrs</div>";
                    //var mass = "<div style='margin: 10px;'><b>Mass: </b><span class=" + datarecord.TagPrefix + "_MASS>" + datarecord.Mass + "</span> Kg</div>";
                    //$(rightSection).append(TOV);
                    //$(rightSection).append(pumpVol);
                    //$(rightSection).append(ullage);
                    //$(rightSection).append(mass);

                    //Density
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(density));
                    var leftSection = $('<div style="float: left; width: 30%;"></div>');
                    container.append(leftSection);

                    var densityData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class ='bold'>Density Ambient</td>
                                            <td><span class=` + datarecord.TagPrefix + `_AMB_DENSITY> ` + datarecord.DensityAmb + `</span> Kg/m³</td>
                                        </tr>
                                        <tr>
                                            <td class ='bold'>Density Standard </td>
                                           <td><span class=` + datarecord.TagPrefix + `_STD_DENSITY> ` + datarecord.DensityStd + `</span> Kg/m³</td>
                                        </tr>

                                        <tr>
                                            <td class ='bold'>Temp Avg </td>
                                            <td><span class=` + datarecord.TagPrefix + `_AVG_TEMP> ` + datarecord.TempAvg + `</span> °C</td>
                                        </tr>

                                        <tr>
                                            <td class ='bold'>Pressure</td>
                                            <td><span class=` + datarecord.TagPrefix + `_PRESSURE> ` + datarecord.Pressure + `</span> Kg/cm²</td>
                                        </tr>
                                    </tbody>
                                    </table>`;

                    //var densityAmb = "<div style='margin: 10px;'><b>Density Amb: </b><span class=" + datarecord.TagPrefix + "_AMB_DENSITY>" + datarecord.DensityAmb + "</span> Kg/m³</div>";
                    //var densityStd = "<div style='margin: 10px;'><b>Density Std: </b><span class=" + datarecord.TagPrefix + "_STD_DENSITY>" + datarecord.DensityStd + "</span> Kg/m³</div>";
                    //var tempAvg = "<div style='margin: 10px;'><b>Temp Avg: </b><span class=" + datarecord.TagPrefix + "_AVG_TEMP>" + datarecord.TempAvg + "</span> °C</div>";
                    //var pressure = "<div style='margin: 10px;'><b>Temp Avg: </b><span class=" + datarecord.TagPrefix + "_PRESSURE>" + datarecord.Pressure + "</span> Kg/cm²</div>";
                    //$(leftSection).append(densityAmb);
                    //$(leftSection).append(densityStd);
                    //$(leftSection).append(tempAvg);
                    $(leftSection).append(densityData);

                    //Water
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(water));
                    var leftSection = $('<div style="float: left; width: 30%;"></div>');
                    container.append(leftSection);

                    var waterData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class='bold'>Water Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_WATER_LVL> ` + datarecord.WaterLevel + ` </span> ` + TFMSLevelUnit + `</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Water Volume</td>
                                           <td><span class=` + datarecord.TagPrefix + `_WATER_VOL> ` + datarecord.WaterVolume + `</span> KL</td>
                                        </tr>
                                    </tbody>
                                    </table>`;

                    //var waterLevel = "<div style='margin: 10px;'><b>Water Level: </b><span class=" + datarecord.TagPrefix + "_WATER_LVL>" + datarecord.WaterLevel + "</span> M</div>";
                    //var waterVolume = "<div style='margin: 10px;'><b>Water Volume:</b><span class=" + datarecord.TagPrefix + "_WATER_VOL>" + datarecord.WaterVolume + "</span> Ltrs</div>";
                    //$(leftSection).append(waterLevel);
                    $(leftSection).append(waterData);

                    //Temperature
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(temperature));
                    var section1 = $('<div style="float: left; width: 100%;"></div>');
                    //var section2 = $('<div style="float: left; width: 25%;"></div>');
                    //var section3 = $('<div style="float: left; width: 25%;"></div>');
                    //var section4 = $('<div style="float: left; width: 20%;"></div>');

                    container.append(section1);
                    //container.append(section2);
                    //container.append(section3);
                    //container.append(section4);

                    var temperatureData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class='bold'>No Of RTD</td>
                                            <td>` + datarecord.NoOfTempEle + `</td>
                                            <td class='bold'>Temp04</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_04> ` + datarecord.Temp04 + `</span> °C</td>
                                            <td class='bold'>Temp09</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_09> ` + datarecord.Temp09 + `</span> °C</td>
                                            <td class='bold'>Temp14</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_14> ` + datarecord.Temp14 + `</span> °C</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Temp Avg</td>
                                            <td><span class=` + datarecord.TagPrefix + `_AVG_TEMP> ` + datarecord.TempAvg + `</span> °C</td>
                                            <td class='bold'>Temp05</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_05> ` + datarecord.Temp05 + `</span> °C</td>
                                            <td class='bold'>Temp10</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_10> ` + datarecord.Temp10 + `</span> °C</td>
                                            <td class='bold'>Temp15</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_15> ` + datarecord.Temp15 + `</span> °C</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Temp01</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_01> ` + datarecord.Temp01 + `</span> °C</td>
                                            <td class='bold'>Temp06</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_06> ` + datarecord.Temp06 + `</span> °C</td>
                                            <td class='bold'>Temp11</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_11> ` + datarecord.Temp11 + `</span> °C</td>
                                            <td class='bold'></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Temp02</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_02> ` + datarecord.Temp02 + `</span> °C</td>
                                            <td class='bold'>Temp07</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_07> ` + datarecord.Temp07 + `</span> °C</td>
                                            <td class='bold'>Temp12</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_12> ` + datarecord.Temp12 + `</span> °C</td>
                                            <td class='bold'></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>Temp03</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_03> ` + datarecord.Temp03 + `</span> °C</td>
                                            <td class='bold'>Temp08</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_08> ` + datarecord.Temp08 + `</span> °C</td>
                                            <td class='bold'>Temp13</td>
                                            <td><span class=` + datarecord.TagPrefix + `_TEMP_13> ` + datarecord.Temp13 + `</span> °C</td>
                                            <td class='bold'></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    </table>`;



                    //var noOfTempEle = "<div style='margin: 10px;'><b>No Of RTD: </b> " + datarecord.NoOfTempEle + "</div>";
                    //var tempAvg = "<div style='margin: 10px;'><b>Temp Avg: </b><span class=" + datarecord.TagPrefix + "_AVG_TEMP>" + datarecord.TempAvg + "</span> °C</div>";
                    //var temp01 = "<div style='margin: 10px;'><b>Temp01: </b><span class=" + datarecord.TagPrefix + "_TEMP_01>" + datarecord.Temp01 + "</span> °C</div>";
                    //var temp02 = "<div style='margin: 10px;'><b>Temp02: </b><span class=" + datarecord.TagPrefix + "_TEMP_02>" + datarecord.Temp02 + "</span> °C</div>";
                    //var temp03 = "<div style='margin: 10px;'><b>Temp03: </b><span class=" + datarecord.TagPrefix + "_TEMP_03>" + datarecord.Temp03 + "</span> °C</div>";
                    //$(section1).append(noOfTempEle);
                    //$(section1).append(tempAvg);
                    //$(section1).append(temp01);
                    //$(section1).append(temp02);
                    //$(section1).append(temp03);
                    $(section1).append(temperatureData);

                    //var temp04 = "<div style='margin: 10px;'><b>Temp04: </b><span class=" + datarecord.TagPrefix + "_TEMP_04>" + datarecord.Temp04 + "</span> °C</div>";
                    // var temp05 = "<div style='margin: 10px;'><b>Temp05: </b><span class=" + datarecord.TagPrefix + "_TEMP_05>" + datarecord.Temp05 + "</span> °C</div>";
                    //var temp06 = "<div style='margin: 10px;'><b>Temp06: </b><span class=" + datarecord.TagPrefix + "_TEMP_06>" + datarecord.Temp06 + "</span> °C</div>";
                    // var temp07 = "<div style='margin: 10px;'><b>Temp07: </b><span class=" + datarecord.TagPrefix + "_TEMP_07>" + datarecord.Temp07 + "</span> °C</div>";
                    // var temp08 = "<div style='margin: 10px;'><b>Temp08: </b><span class=" + datarecord.TagPrefix + "_TEMP_08>" + datarecord.Temp08 + "</span> °C</div>";
                    // $(section2).append(temp04);
                    // $(section2).append(temp05);
                    // $(section2).append(temp06);
                    // $(section2).append(temp07);
                    // $(section2).append(temp08);

                    //var temp09 = "<div style='margin: 10px;'><b>Temp09: </b><span class=" + datarecord.TagPrefix + "_TEMP_09>" + datarecord.Temp09 + "</span> °C</div>";
                    // var temp10 = "<div style='margin: 10px;'><b>Temp10: </b><span class=" + datarecord.TagPrefix + "_TEMP_10>" + datarecord.Temp10 + "</span> °C</div>";
                    //var temp11 = "<div style='margin: 10px;'><b>Temp11: </b><span class=" + datarecord.TagPrefix + "_TEMP_11>" + datarecord.Temp11 + "</span> °C</div>";
                    //var temp12 = "<div style='margin: 10px;'><b>Temp12: </b><span class=" + datarecord.TagPrefix + "_TEMP_12>" + datarecord.Temp12 + "</span> °C</div>";
                    //var temp13 = "<div style='margin: 10px;'><b>Temp13: </b><span class=" + datarecord.TagPrefix + "_TEMP_13>" + datarecord.Temp13 + "</span> °C</div>";
                    //$(section3).append(temp09);
                    //$(section3).append(temp10);
                    //$(section3).append(temp11);
                    //$(section3).append(temp12);
                    //$(section3).append(temp13);

                    //var temp14 = "<div style='margin: 10px;'><b>Temp14: </b><span class=" + datarecord.TagPrefix + "_TEMP_14>" + datarecord.Temp14 + "</span> °C</div>";
                    //var temp15 = "<div style='margin: 10px;'><b>Temp15: </b><span class=" + datarecord.TagPrefix + "_TEMP_15>" + datarecord.Temp15 + "</span> °C</div>";
                    //$(section4).append(temp14);
                    //$(section4).append(temp15);


                    //Alarm Setpoints
                    var container = $('<div style="margin: 5px;"></div>')
                    container.appendTo($(alarms));
                    var leftSection = $('<div style="float: left; width: 60%;"></div>');
                    //var rightSection = $('<div style="float: left; width: 40%;"></div>');
                    container.append(leftSection);
                    //container.append(rightSection);


                    var alarmData = `<table class = 'table-striped app-tbl jqx-app-tbl'>
                                    <tbody>
                                        <tr>
                                            <td class='bold'>HHH Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LVL_HHH> ` + datarecord.SP_Level_HHH + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class='bold'>L Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LVL_L> ` + datarecord.SP_Level_L + ` </span> ` + TFMSLevelUnit + `</td>
                                        </tr>
                                        <tr>
                                            <td class='bold'>HH Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LVL_HH> ` + datarecord.SP_Level_HH + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class='bold'>LL Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LVL_LL> ` + datarecord.SP_Level_LL + ` </span> ` + TFMSLevelUnit + `</td>
                                        </tr>

                                        <tr>
                                            <td class='bold'>H Level</td>
                                            <td><span class = ` + datarecord.TagPrefix + `_LVL_H> ` + datarecord.SP_Level_H + ` </span> ` + TFMSLevelUnit + `</td>
                                            <td class='bold'></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    </table>`;

                    //var sp_level_HHH = "<div style='margin: 10px;'><b>HHH Level: </b><span class=" + datarecord.TagPrefix + "_LVL_HHH>" + datarecord.SP_Level_HHH + "</span> `+TFMSLevelUnit+`</div>";
                    //var sp_level_HH = "<div style='margin: 10px;'><b>HH Level: </b><span class=" + datarecord.TagPrefix + "_LVL_HH>" + datarecord.SP_Level_HH + "</span> `+TFMSLevelUnit+`</div>";
                    //var sp_level_H = "<div style='margin: 10px;'><b>H Level: </b><span class=" + datarecord.TagPrefix + "_LVL_H>" + datarecord.SP_Level_H + "</span> `+TFMSLevelUnit+`</div>";
                    //$(leftSection).append(sp_level_HHH);
                    //$(leftSection).append(sp_level_HH);
                    //$(leftSection).append(sp_level_H);
                    $(leftSection).append(alarmData);

                    //var sp_level_L = "<div style='margin: 10px;'><b>L Level: </b><span class=" + datarecord.TagPrefix + "_LVL_L>" + datarecord.SP_Level_L + "</span> `+TFMSLevelUnit+`</div>";
                    //var sp_level_LL = "<div style='margin: 10px;'><b>LL Level: </b><span class=" + datarecord.TagPrefix + "_LVL_LL>" + datarecord.SP_Level_LL + "</span> `+TFMSLevelUnit+`</div>";
                    //$(rightSection).append(sp_level_L);
                    //$(rightSection).append(sp_level_LL);


                    $(tabsdiv).jqxTabs({ width: '60%', height: 185 });
                }
            }
            var columnrendererSingle = function (value) {
                return '<div style="margin: 22px 22px 2px 4px;">' + value + '</div>';
            }
            var columnrendererDouble = function (value) {
                return '<div style="margin: 12px 0 0 4px;">' + value + '</div>';
            }
            var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                return '<div style="text-align: center;" class="jqx-tbl-alert-icon"><span class="alert_' + value + '"></span></div>';
                //return '<div style="text-align: center;"><span style="height: 35px; width: 33px;" class="alert_true"></span></div>';
            }

            $("#jqxgridTkLiveData").jqxGrid(
            {
                width: "100%",
                source: adapter,
                rowdetails: true,
                rowdetailstemplate:
                    {
                        rowdetails:
                          "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li>Basic Data</li><li>Product</li><li>Density</li><li>Water</li><li>Temperature</li><li>Alarms</li>" +
                          "</ul><div class='basicdata'></div><div class='product'></div><div class='density'></div><div class='water'></div><div class='temperature'></div><div class='alarms'></div>",
                        rowdetailsheight: 210

                    },
                ready: function () {
                },
                initrowdetails: initrowdetails,

                columnsresize: true,
                filterable: true,
                sortable: true,
                pageable: true,
                //pagesize: iGblNoRows,
                //pagesizeoptions: [iGblNoRows, iGblNoRows * 2, iGblNoRows * 3],
                //rowsheight: 35,
                autoheight: true,
                showtoolbar: true,
                columnsheight: 60,
                rendertoolbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div class='jqx-header-wrapper' style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var tableHeading = $("<div style='float: left; margin-left: 5px;' class='heading-lbl'><span style='margin-left: 4px; position: relative; top: -3px;'>Tanks Live Data</span></div>");
                    container.append(tableHeading);
                    statusbar.append(container);

                },
                ready: function () {
                    PageSize = adapter.records.length;
                    if (PageSize > iGblNoRows) { PageSize = iGblNoRows; }
                    $("#jqxgridTkLiveData").jqxGrid({ pagesize: PageSize });
                    $("#jqxgridTkLiveData").jqxGrid({ pagesizeoptions: [PageSize, PageSize * 2, PageSize * 3] });
                    SetTagArray();
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#jqxgridTkLiveData").jqxGrid('getcolumn', datafield);
                    if (column.filtertype === "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                  { text: 'Tag Name', datafield: 'TagName', hidden: true, cellsalign: 'center', width: "0%" },
                  { text: 'Tank Code', datafield: 'TankCode', cellsalign: 'left', filtertype: "checkedlist", width: "5%", pinned: true },
                  { text: 'Tank Name', datafield: 'TankName', cellsalign: 'left', filtertype: "checkedlist", width: "8%", pinned: true },
                  { text: 'Product', datafield: 'ProductName', cellsalign: 'left', filtertype: "checkedlist", width: "10%", pinned: true },
                  //{ text: 'TankMode', datafield: 'TankMode', cellsalign: 'left', filtertype: "checkedlist", width: "5%" },
                  { text: 'Tank Mode', datafield: 'TankMode', displayfield: 'TankModeName', cellsalign: 'left', width: "10%" },
                  { text: 'Level<br/>(' + TFMSLevelUnit + ')', datafield: 'PriLevel', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'WaterLevel<br/>(' + TFMSLevelUnit + ')', datafield: 'WaterLevel', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'Avg Temp<br/>(°C)', datafield: 'TempAvg', cellsalign: 'center', width: "7%", renderer: columnrendererDouble },
                  { text: 'Amb Density<br/>(Kg/cm³)', datafield: 'DensityAmb', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'Std Density<br/>(Kg/cm³)', datafield: 'DensityStd', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'Level Rate<br/>(m/hr)', datafield: 'LevelRate', cellsalign: 'center', width: "7%", renderer: columnrendererDouble },
                  { text: 'Flow Rate<br/>(m³/hr)', datafield: 'FlowRate', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'Gross Volume<br/>(KL)', datafield: 'TOV', cellsalign: 'center', width: "8%", renderer: columnrendererDouble },
                  { text: 'Level Diff<br/>Alarm', datafield: 'Pri_Sec_Diff_Alert', cellsalign: 'center', width: "5%", renderer: columnrendererDouble, cellsrenderer: cellsrenderer },
                  { text: 'Safety<br/>Level', datafield: 'SecLevel', cellsalign: 'center', width: "5%", renderer: columnrendererDouble, hidden: hiddenProp },
                  { text: 'Level<br/>Diff', datafield: 'Pri_Sec_Lvl_Diff', cellsalign: 'center', width: "5%", renderer: columnrendererDouble, hidden: hiddenProp },
                ]
            });

            //display selected row index.
            $("#jqxgridTkLiveData").on('rowselect', function (event) {
                if (event.args.rowindex >= 0 && event.args.columnindex >= 0) {
                    var column = event.args.column;
                    var rowindex = event.args.rowindex;
                    var columnindex = event.args.columnindex;

                    var selectedRowData = $('#jqxgridTkLiveData').jqxGrid('getrowdata', event.args.rowindex);
                    selectedRowId = selectedRowData["PageName"];
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

});

function ExtraActivities(model) {
    $.each(model, function (i, item) {
        //console.log(model);
        var controlName = item.ControlName.toUpperCase();
        var index = JQXTagNames.findIndex(x => x.indexOf(controlName) >= 0);
        if (index >= 0) {
            if (GridRows[index] != undefined) {
                if (item.Value == null || item.Value == undefined || item.Quality < 192) {
                    GridRows[index][item.ClassName] = "?";
                } else {
                    GridRows[index][item.ClassName] = item.Value.toLowerCase();
                }
                if (item.ClassName == 'PriLevel') {
                    
                    UpdateLevelDiff(item.Value, GridRows[index]['SecLevel'], index);
                    UpdatePercentage(controlName, item.Value);
                }
                else if (item.ClassName == 'SecLevel') {
                    
                    UpdateLevelDiff(GridRows[index]['PriLevel'], item.Value, index);
                }
            }
        }
    });
    source.localdata = GridRows;
    if ($('#jqxgridTkLiveData').hasClass("jqx-widget") == false) { return; }
    $('#jqxgridTkLiveData').jqxGrid('updatebounddata', 'cells');
}

function SetTagArray() {
    JQXrowCount = $('#jqxgridTkLiveData').jqxGrid('getrows').length;
    GridRows = $('#jqxgridTkLiveData').jqxGrid('getrows');
    JQXTagNames = [];
    for (var i = 0; i < GridRows.length; i++) {
        JQXTagNames.push(GridRows[i].TagName.toUpperCase());
    }
    opcPageName = "TankLiveData";
    opc.server.addToGroup(opcPageName);
    
    opc.server.readPageTags(opcPageName);
}

function UpdateLevelDiff(PriLevel, SecLevel, index) {
    var level = parseFloat(PriLevel);
    var SecLvl = parseFloat(SecLevel);
    if (level >= 0 && SecLvl >= 0) {
        
        var LvlDiff = parseFloat(level - SecLvl);
        GridRows[index]['Pri_Sec_Lvl_Diff'] = LvlDiff;
        if (LvlDiff > 5 || LvlDiff < -5) {
            GridRows[index]['Pri_Sec_Diff_Alert'] = true;
        }
        else {
            GridRows[index]['Pri_Sec_Diff_Alert'] = false;
        }
    }
    else {
        GridRows[index]['Pri_Sec_Lvl_Diff'] = '?';
        GridRows[index]['Pri_Sec_Diff_Alert'] = '';
    }
}

function UpdatePercentage(CntrlName, PriLevel) {
    if (PriLevel == null || PriLevel == undefined) { return;}
    var HHHCtrl = $('.' + CntrlName.replace(LevelTag, HHHTag));
    var PerCtrl = $('.' + CntrlName.replace(LevelTag, PercentLevelTag));
    var height = parseFloat($(HHHCtrl).val());
    if (!height) { height = $(HHHCtrl).data('sfl') }

    if (height > 0 && PriLevel >= 0 && PriLevel <= height) {
        
        var percentage = ((PriLevel / height) * 100).toFixed(0);
        PerCtrl.text('' + percentage + '');
    }
    else {
        if (PriLevel > height) { alertDismissable('danger', tankNo + '; Level: ' + PriLevel + '; Tank Height: ' + height) }
        PerCtrl.text('?');
    }
}
