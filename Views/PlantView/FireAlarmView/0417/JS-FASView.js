// print process.argv
console.log('Program Version: 1.0');
var oReadFile = process.argv[2];
var oUpdateFile = process.argv[3];

console.log('File to Find Replace: ' + oReadFile);
if (oUpdateFile == undefined || oUpdateFile == "" || oUpdateFile == null) { console.log('File to Update: NO FILE FOUND' + '\n'); }
else {console.log('File to Update: ' + oUpdateFile + '\n');}

var oWriteFile = oReadFile
var list = [
{ find: /viewBox=\".*>/, replace: 'style="display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit;">' },
{ find: /<title>.*<\/title>/gm, replace: '' },
{ find: /xlink:href/g, replace: 'href' },
{ find: /!<\/text>/g, replace: '<animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />!</text>' },
{ find: /<g id=\"RedButton\">/g, replace: ' <g id="RedButton"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite"></animate>' },
{ find: /%5C/gm, replace: '/' },
{ find: /href=\".*TOAST/gm, replace: 'href="' },

{ find: /<symbol id=\"mcp_active\"[^]*?<\/symbol>/gm, subsearch01: /<path id=\"colpath[^]*?>/g, subsearch02: /\/+?>/g, subsearch03: '', replace: '><animate attributeName="fill" begin="1s" dur="2s" values ="red; orange; yellow; red" repeatCount="indefinite" /></path>' },
{ find: /<symbol id=\"hooter_active\"[^]*?<\/symbol>/gm, subsearch01: /<path id=\"colpath[^]*?>/g, subsearch02: /\/+?>/g, subsearch03: '', replace: '><animate attributeName="fill" begin="1s" dur="2s" values ="red; orange; yellow; red" repeatCount="indefinite" /></path>' },

{ find: /<g id="FLPMCP_01_TF_ALARM">/g, replace: '<g id="FLPMCP_01_TF_ALARM" title="FLP MCP at Tank Farm" class="svg-alarm FLPMCP_01_TF_ALARM">' },
{ find: /<g id="FLPMCP_02_TF_ALARM">/g, replace: '<g id="FLPMCP_02_TF_ALARM" title="FLP MCP at Tank Farm" class="svg-alarm FLPMCP_02_TF_ALARM">' },
{ find: /<g id="FLPMCP_03_TF_ALARM">/g, replace: '<g id="FLPMCP_03_TF_ALARM" title="FLP MCP at Tank Farm" class="svg-alarm FLPMCP_03_TF_ALARM">' },
{ find: /<g id="FLPMCP_04_TF_ALARM">/g, replace: '<g id="FLPMCP_04_TF_ALARM" title="FLP MCP at Tank Farm" class="svg-alarm FLPMCP_04_TF_ALARM">' },
{ find: /<g id="FLPMCP_05_OWS_ALARM">/g, replace: '<g id="FLPMCP_05_OWS_ALARM" title="FLP MCP at OWS" class="svg-alarm FLPMCP_05_OWS_ALARM">' },
{ find: /<g id="FLPMCP_06_PH_ALARM">/g, replace: '<g id="FLPMCP_06_PH_ALARM" title="FLP MCP at Pump House" class="svg-alarm FLPMCP_06_PH_ALARM">' },
{ find: /<g id="FLPMCP_07_PH_ALARM">/g, replace: '<g id="FLPMCP_07_PH_ALARM" title="FLP MCP at Pump House" class="svg-alarm FLPMCP_07_PH_ALARM">' },
{ find: /<g id="FLPMCP_08_OPH_ALARM">/g, replace: '<g id="FLPMCP_08_OPH_ALARM" title="" class="svg-alarm FLPMCP_08_OPH_ALARM">' },
{ find: /<g id="FLPMCP_09_FPH_ALARM">/g, replace: '<g id="FLPMCP_09_FPH_ALARM" title="" class="svg-alarm FLPMCP_09_FPH_ALARM">' },
{ find: /<g id="HTR_01_CR_ALARM">/g, replace: '<g id="HTR_01_CR_ALARM" title="" class="svg-alarm HTR_01_CR_ALARM">' },
{ find: /<g id="HTR_02_SR_ALARM">/g, replace: '<g id="HTR_02_SR_ALARM" title="" class="svg-alarm HTR_02_SR_ALARM">' },
{ find: /<g id="HTR_03_ADM_ALARM">/g, replace: '<g id="HTR_03_ADM_ALARM" title="" class="svg-alarm HTR_03_ADM_ALARM">' },
{ find: /<g id="HTR_04_MCC_ALARM">/g, replace: '<g id="HTR_04_MCC_ALARM" title="" class="svg-alarm HTR_04_MCC_ALARM">' },
{ find: /<g id="HTR_05_FPH_ALARM">/g, replace: '<g id="HTR_05_FPH_ALARM" title="" class="svg-alarm HTR_05_FPH_ALARM">' },
{ find: /<g id="MCP_01_CR_ALARM">/g, replace: '<g id="MCP_01_CR_ALARM" title="" class="svg-alarm MCP_01_CR_ALARM">' },
{ find: /<g id="MCP_01_UPS_ALARM">/g, replace: '<g id="MCP_01_UPS_ALARM" title="" class="svg-alarm MCP_01_UPS_ALARM">' },
{ find: /<g id="MCP_02_SR_ALARM">/g, replace: '<g id="MCP_02_SR_ALARM" title="" class="svg-alarm MCP_02_SR_ALARM">' },
{ find: /<g id="MCP_03_ADM_ALARM">/g, replace: '<g id="MCP_03_ADM_ALARM" title="" class="svg-alarm MCP_03_ADM_ALARM">' },
{ find: /<g id="MCP_04_CTM_ALARM">/g, replace: '<g id="MCP_04_CTM_ALARM" title="" class="svg-alarm MCP_04_CTM_ALARM">' },
{ find: /<g id="MCP_05_DGR_ALARM">/g, replace: '<g id="MCP_05_DGR_ALARM" title="" class="svg-alarm MCP_05_DGR_ALARM">' },
{ find: /<g id="MCP_06_MCC_ALARM">/g, replace: '<g id="MCP_06_MCC_ALARM" title="" class="svg-alarm MCP_06_MCC_ALARM">' },
{ find: /<g id="MCP_07_FPH_ALARM">/g, replace: '<g id="MCP_07_FPH_ALARM" title="" class="svg-alarm MCP_07_FPH_ALARM">' },
{ find: /<g id="MULTI_DET_01_CR_ALARM">/g, replace: '<g id="MULTI_DET_01_CR_ALARM" title="Multi Detector at Control Room" class="svg-alarm MULTI_DET_01_CR_ALARM">' },
{ find: /<g id="MULTI_DET_02_CR_ALARM">/g, replace: '<g id="MULTI_DET_02_CR_ALARM" title="" class="svg-alarm MULTI_DET_02_CR_ALARM">' },
{ find: /<g id="MULTI_DET_03_CR_ALARM">/g, replace: '<g id="MULTI_DET_03_CR_ALARM" title="" class="svg-alarm MULTI_DET_03_CR_ALARM">' },
{ find: /<g id="MULTI_DET_04_CR_ALARM">/g, replace: '<g id="MULTI_DET_04_CR_ALARM" title="" class="svg-alarm MULTI_DET_04_CR_ALARM">' },
{ find: /<g id="MULTI_DET_05_CTM_ALARM">/g, replace: '<g id="MULTI_DET_05_CTM_ALARM" title="" class="svg-alarm MULTI_DET_05_CTM_ALARM">' },
{ find: /<g id="MULTI_DET_06_DGR_ALARM">/g, replace: '<g id="MULTI_DET_06_DGR_ALARM" title="" class="svg-alarm MULTI_DET_06_DGR_ALARM">' },
{ find: /<g id="MULTI_DET_07_DGR_ALARM">/g, replace: '<g id="MULTI_DET_07_DGR_ALARM" title="" class="svg-alarm MULTI_DET_07_DGR_ALARM">' },
{ find: /<g id="MULTI_DET_08_MCC_ALARM">/g, replace: '<g id="MULTI_DET_08_MCC_ALARM" title="" class="svg-alarm MULTI_DET_08_MCC_ALARM">' },
{ find: /<g id="MULTI_DET_09_MCC_ALARM">/g, replace: '<g id="MULTI_DET_09_MCC_ALARM" title="" class="svg-alarm MULTI_DET_09_MCC_ALARM">' },
{ find: /<g id="MULTI_DET_10_MCC_ALARM">/g, replace: '<g id="MULTI_DET_10_MCC_ALARM" title="" class="svg-alarm MULTI_DET_10_MCC_ALARM">' },
{ find: /<g id="MULTI_DET_11_MCC_ALARM">/g, replace: '<g id="MULTI_DET_11_MCC_ALARM" title="" class="svg-alarm MULTI_DET_11_MCC_ALARM">' },
{ find: /<g id="MULTI_DET_12_UPS_ALARM">/g, replace: '<g id="MULTI_DET_12_UPS_ALARM" title="" class="svg-alarm MULTI_DET_12_UPS_ALARM">' },
{ find: /<g id="RPTR_01_SR_ALARM">/g, replace: '<g id="RPTR_01_SR_ALARM" title="" class="svg-alarm RPTR_01_SR_ALARM">' },
{ find: /<g id="RPTR_02_FPH_ALARM">/g, replace: '<g id="RPTR_02_FPH_ALARM" title="" class="svg-alarm RPTR_02_FPH_ALARM">' },
{ find: /<g id="SD_01_CR_ALARM">/g, replace: '<g id="SD_01_CR_ALARM" title="" class="svg-alarm SD_01_CR_ALARM">' },
{ find: /<g id="SD_02_CR_ALARM">/g, replace: '<g id="SD_02_CR_ALARM" title="" class="svg-alarm SD_02_CR_ALARM">' },
{ find: /<g id="SD_03_UPS_ALARM">/g, replace: '<g id="SD_03_UPS_ALARM" title="" class="svg-alarm SD_03_UPS_ALARM">' },
{ find: /<g id="ESD_PB01">/g, replace: '<g id="ESD_PB01" title="ESD PB at Control Room" class="svg-alarm ESD_PB01">' },
{ find: /<g id="ESD_PB02">/g, replace: '<g id="ESD_PB02" title="ESD PB at Security Room" class="svg-alarm ESD_PB02">' },
{ find: /<g id="ESD_PB03">/g, replace: '<g id="ESD_PB03" title="ESD PB at TM Room" class="svg-alarm ESD_PB03">' },
{ find: /<g id="ESD_PB04">/g, replace: '<g id="ESD_PB04" title="ESD PB at Pump House" class="svg-alarm ESD_PB04">' },
];

function FindReplaceScript(olist) {

    var fs = require('fs');
    fs.readFile(oReadFile, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        for (var i = 0; i < olist.length; i++) {
            var found = data.match(olist[i].find);
            //console.log('Search: '+ olist[i].find+'\nFound:' + found);
            if (olist[i].subsearch01 != undefined && olist[i].subsearch01 != null && olist[i].subsearch01 != '' && found != null && found.length > 0)
            { 
                for (var j = 0; j < found.length; j++) {

                    //console.log('SubSearch01: ' + olist[i].subsearch01);
                    var SubFound01 = found[j].match(olist[i].subsearch01);
                    //console.log('SubFound01:' + SubFound01);
                    if (olist[i].subsearch02 != undefined && olist[i].subsearch02 != null && olist[i].subsearch02 != '' && SubFound01 !=null && SubFound01.length > 0) {

                        for (var k = 0; k < SubFound01.length; k++) {

                            //console.log('SubSearch02: ' + olist[i].subsearch02);
                            var SubFound02 = SubFound01[k].match(olist[i].subsearch02);
                            //console.log('SubFound02:' + SubFound02);
                            if (olist[i].subsearch03 != undefined && olist[i].subsearch03 != null && olist[i].subsearch03 != '' && SubFound02 != null && SubFound02.length > 0) {

                                for (var l = 0; l < SubFound02.length; l++) {
                                    //console.log('SubSearch03: ' + olist[i].subsearch03);
                                    var SubFound03 = SubFound02[l].match(olist[i].subsearch03);
                                    //console.log('SubFound03:' + SubFound03);
                                    if (SubFound03 == null) { console.log('String/Exp SubSearch03 not found:' + olist[i].subsearch03 + ' in string: ' + SubFound02[l]); }
                                    else {
                                        var tmpFound2 = SubFound02[l];
                                        var Change2 = tmpFound2.replace(SubFound03, olist[i].replace);
                                        tmpFound1 = SubFound01[k];
                                        Change1 = tmpFound1.replace(SubFound02[l], Change2);
                                        tmpFound0 = found[j];
                                        Change0 = tmpFound0.replace(SubFound01[k], Change1);
                                        data = data.replace(found[j], Change0);
                                        found[j] = Change0;
                                        SubFound01[k] = Change1;
                                        SubFound02[l] = Change2;
                                    }
                                }
                            }
                            else {
                                if (SubFound02 == null) { console.log('String/Exp SubSearch02 not found:' + olist[i].subsearch02 + ' in string: ' + SubFound01); }
                                else {
                                    var tmpFound1 = SubFound01[k];
                                    var Change1 = tmpFound1.replace(SubFound02[0], olist[i].replace);
                                    //console.log('\n\nFound: ' + tmpFound1);
                                    //console.log('\nReplace: ' + Change1+'\n\n\n');
                                    tmpFound0 = found[j];
                                    Change0 = tmpFound0.replace(SubFound01[k], Change1);
                                    //console.log('\n\nFound: ' + tmpFound0);
                                    //console.log('Replace: ' + Change0 + '\n\n\n');
                                    data = data.replace(found[j], Change0);
                                    found[j] = Change0;
                                    SubFound01[k] = Change1;
                                }
                            }
                        }
                    }
                    else {
                        if (SubFound01 == null) { console.log('String/Exp SubSearch01 not found:' + olist[i].subsearch01 + ' in string: ' + SubFound01); }
                        else {
                            var tmpFound0 = found[j];
                            var Change0 = tmpFound0.replace(SubFound01[0], olist[i].replace);
                            //console.log('\n\nFound: ' + tmpFound0);
                            //console.log('Replace: ' + Change0 + '\n\n\n');
                            data = data.replace(found[j], Change0);
                            found[j] = Change0;
                        }
                    }
                }
            }
            else{
                if (found == null) { console.log('String/Exp not found:' + olist[i].find); }
                else { data = data.replace(olist[i].find, olist[i].replace); }
            }
        }

        fs.writeFile(oWriteFile, data, 'utf8', function (err) {
            if (err) return console.log(err);
            else console.log('Find Replace Completed:' + GetDateTime());
        });
        if (oUpdateFile != undefined && oUpdateFile != "" && oUpdateFile != null) {
            fs.readFile(oUpdateFile, 'utf8', function (err, UpdateFileData) {
                if (err) {
                    return console.log(err);
                }

                const strfind = /<!--SVGStart-->[^]*<!--SVGEnd-->/gm;
                var found = UpdateFileData.match(strfind);
                if (found == null) { console.log('Tag not found:' + strfind); }
                else
                {
                    UpdateFileData = UpdateFileData.replace(strfind, '<!--SVGStart-->' + '\n' + data + '\n' + '<!--SVGEnd-->');
                    fs.writeFile(oUpdateFile, UpdateFileData, 'utf8', function (err) {
                        if (err) return console.log(err);
                        else console.log('File Update Completed:' + GetDateTime());
                    });
                }
            });
        }
        else { console.log('No File found to Update....'); }
    });
}

FindReplaceScript(list);

function GetDateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
    //console.log('Find Replace Completed:' + dateTime);
}