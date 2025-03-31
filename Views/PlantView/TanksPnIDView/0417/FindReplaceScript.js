// print process.argv
console.log('Program Version: 1.0');
var oReadFile = process.argv[2];
console.log('File to Read & Write: ' + oReadFile);

//var oReadFile = 'PnID-LSHFHSD.svg'
var oWriteFile = oReadFile
var list = [
{ find: /<g id="MOV01_TK04_IN">/g, replace: '<g id="MOV01_TK04_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK04_IN_IN_GEN_ALRM_IMG MOV01_TK04_IN_OPN_IMG MOV01_TK04_IN_CLS_IMG" onclick="OpenMOVModal(\'1\',\'MOVView01\')">' },
{ find: /<g id="MOV02_TK04_IN">/g, replace: '<g id="MOV02_TK04_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK04_IN_IN_GEN_ALRM_IMG MOV02_TK04_IN_OPN_IMG MOV02_TK04_IN_CLS_IMG" onclick="OpenMOVModal(\'2\',\'MOVView02\')">' },
{ find: /<g id="MOV01_TK04_OUT">/g, replace: '<g id="MOV01_TK04_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK04_OUT_IN_GEN_ALRM_IMG MOV01_TK04_OUT_OPN_IMG MOV01_TK04_OUT_CLS_IMG" onclick="OpenMOVModal(\'3\',\'MOVView03\')">' },
{ find: /<g id="MOV02_TK04_OUT">/g, replace: '<g id="MOV02_TK04_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK04_OUT_IN_GEN_ALRM_IMG MOV02_TK04_OUT_OPN_IMG MOV02_TK04_OUT_CLS_IMG" onclick="OpenMOVModal(\'4\',\'MOVView04\')">' },
{ find: /<g id="MOV01_TK05_IN">/g, replace: '<g id="MOV01_TK05_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK05_IN_IN_GEN_ALRM_IMG MOV01_TK05_IN_OPN_IMG MOV01_TK05_IN_CLS_IMG" onclick="OpenMOVModal(\'5\',\'MOVView05\')">' },
{ find: /<g id="MOV02_TK05_IN">/g, replace: '<g id="MOV02_TK05_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK05_IN_IN_GEN_ALRM_IMG MOV02_TK05_IN_OPN_IMG MOV02_TK05_IN_CLS_IMG" onclick="OpenMOVModal(\'6\',\'MOVView06\')">' },
{ find: /<g id="MOV01_TK05_OUT">/g, replace: '<g id="MOV01_TK05_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK05_OUT_IN_GEN_ALRM_IMG MOV01_TK05_OUT_OPN_IMG MOV01_TK05_OUT_CLS_IMG" onclick="OpenMOVModal(\'7\',\'MOVView07\')">' },
{ find: /<g id="MOV02_TK05_OUT">/g, replace: '<g id="MOV02_TK05_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK05_OUT_IN_GEN_ALRM_IMG MOV02_TK05_OUT_OPN_IMG MOV02_TK05_OUT_CLS_IMG" onclick="OpenMOVModal(\'8\',\'MOVView08\')">' },
{ find: /<g id="MOV01_TK06_IN">/g, replace: '<g id="MOV01_TK06_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK06_IN_IN_GEN_ALRM_IMG MOV01_TK06_IN_OPN_IMG MOV01_TK06_IN_CLS_IMG" onclick="OpenMOVModal(\'9\',\'MOVView09\')">' },
{ find: /<g id="MOV02_TK06_IN">/g, replace: '<g id="MOV02_TK06_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK06_IN_IN_GEN_ALRM_IMG MOV02_TK06_IN_OPN_IMG MOV02_TK06_IN_CLS_IMG" onclick="OpenMOVModal(\'10\',\'MOVView10\')">' },
{ find: /<g id="MOV01_TK06_OUT">/g, replace: '<g id="MOV01_TK06_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK06_OUT_IN_GEN_ALRM_IMG MOV01_TK06_OUT_OPN_IMG MOV01_TK06_OUT_CLS_IMG" onclick="OpenMOVModal(\'11\',\'MOVView11\')">' },
{ find: /<g id="MOV02_TK06_OUT">/g, replace: '<g id="MOV02_TK06_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK06_OUT_IN_GEN_ALRM_IMG MOV02_TK06_OUT_OPN_IMG MOV02_TK06_OUT_CLS_IMG" onclick="OpenMOVModal(\'12\',\'MOVView12\')">' },
{ find: /<g id="MOV01_TK07_IN">/g, replace: '<g id="MOV01_TK07_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK07_IN_IN_GEN_ALRM_IMG MOV01_TK07_IN_OPN_IMG MOV01_TK07_IN_CLS_IMG" onclick="OpenMOVModal(\'13\',\'MOVView13\')">' },
{ find: /<g id="MOV02_TK07_IN">/g, replace: '<g id="MOV02_TK07_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK07_IN_IN_GEN_ALRM_IMG MOV02_TK07_IN_OPN_IMG MOV02_TK07_IN_CLS_IMG" onclick="OpenMOVModal(\'14\',\'MOVView14\')">' },
{ find: /<g id="MOV01_TK07_OUT">/g, replace: '<g id="MOV01_TK07_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK07_OUT_IN_GEN_ALRM_IMG MOV01_TK07_OUT_OPN_IMG MOV01_TK07_OUT_CLS_IMG" onclick="OpenMOVModal(\'15\',\'MOVView15\')">' },
{ find: /<g id="MOV02_TK07_OUT">/g, replace: '<g id="MOV02_TK07_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_TK07_OUT_IN_GEN_ALRM_IMG MOV02_TK07_OUT_OPN_IMG MOV02_TK07_OUT_CLS_IMG" onclick="OpenMOVModal(\'16\',\'MOVView16\')">' },
{ find: /<g id="MOV_TKR01">/g, replace: '<g id="MOV_TKR01" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR01_IN_GEN_ALRM_IMG MOV_TKR01_OPN_IMG MOV_TKR01_CLS_IMG" onclick="OpenMOVModal(\'17\',\'MOVView17\')">' },
{ find: /<g id="MOV_TKR02">/g, replace: '<g id="MOV_TKR02" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR02_IN_GEN_ALRM_IMG MOV_TKR02_OPN_IMG MOV_TKR02_CLS_IMG" onclick="OpenMOVModal(\'18\',\'MOVView18\')">' },
{ find: /<g id="MOV_TKR03">/g, replace: '<g id="MOV_TKR03" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR03_IN_GEN_ALRM_IMG MOV_TKR03_OPN_IMG MOV_TKR03_CLS_IMG" onclick="OpenMOVModal(\'19\',\'MOVView19\')">' },
{ find: /<g id="MOV_TKR04">/g, replace: '<g id="MOV_TKR04" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR04_IN_GEN_ALRM_IMG MOV_TKR04_OPN_IMG MOV_TKR04_CLS_IMG" onclick="OpenMOVModal(\'20\',\'MOVView20\')">' },
{ find: /<g id="MOV_TKR09">/g, replace: '<g id="MOV_TKR09" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR09_IN_GEN_ALRM_IMG MOV_TKR09_OPN_IMG MOV_TKR09_CLS_IMG" onclick="OpenMOVModal(\'21\',\'MOVView21\')">' },
{ find: /<g id="MOV_TKR10">/g, replace: '<g id="MOV_TKR10" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR10_IN_GEN_ALRM_IMG MOV_TKR10_OPN_IMG MOV_TKR10_CLS_IMG" onclick="OpenMOVModal(\'22\',\'MOVView22\')">' },
{ find: /<g id="MOV_TKR11">/g, replace: '<g id="MOV_TKR11" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR11_IN_GEN_ALRM_IMG MOV_TKR11_OPN_IMG MOV_TKR11_CLS_IMG" onclick="OpenMOVModal(\'23\',\'MOVView23\')">' },
{ find: /<g id="MOV_TKR12">/g, replace: '<g id="MOV_TKR12" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR12_IN_GEN_ALRM_IMG MOV_TKR12_OPN_IMG MOV_TKR12_CLS_IMG" onclick="OpenMOVModal(\'24\',\'MOVView24\')">' },
{ find: /<g id="MOV_TKR13">/g, replace: '<g id="MOV_TKR13" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR13_IN_GEN_ALRM_IMG MOV_TKR13_OPN_IMG MOV_TKR13_CLS_IMG" onclick="OpenMOVModal(\'25\',\'MOVView25\')">' },
{ find: /<g id="MOV_TKR14">/g, replace: '<g id="MOV_TKR14" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_TKR14_IN_GEN_ALRM_IMG MOV_TKR14_OPN_IMG MOV_TKR14_CLS_IMG" onclick="OpenMOVModal(\'26\',\'MOVView26\')">' },
{ find: /<g id="MOV_BD05">/g, replace: '<g id="MOV_BD05" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD05_IN_GEN_ALRM_IMG MOV_BD05_OPN_IMG MOV_BD05_CLS_IMG" onclick="OpenMOVModal(\'27\',\'MOVView27\')">' },
{ find: /<g id="MOV_BD06">/g, replace: '<g id="MOV_BD06" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD06_IN_GEN_ALRM_IMG MOV_BD06_OPN_IMG MOV_BD06_CLS_IMG" onclick="OpenMOVModal(\'28\',\'MOVView28\')">' },
{ find: /<g id="MOV_BD07">/g, replace: '<g id="MOV_BD07" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD07_IN_GEN_ALRM_IMG MOV_BD07_OPN_IMG MOV_BD07_CLS_IMG" onclick="OpenMOVModal(\'29\',\'MOVView29\')">' },
{ find: /<g id="MOV_BD08">/g, replace: '<g id="MOV_BD08" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD08_IN_GEN_ALRM_IMG MOV_BD08_OPN_IMG MOV_BD08_CLS_IMG" onclick="OpenMOVModal(\'30\',\'MOVView30\')">' },
{ find: /<g id="MOV_BD09">/g, replace: '<g id="MOV_BD09" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD09_IN_GEN_ALRM_IMG MOV_BD09_OPN_IMG MOV_BD09_CLS_IMG" onclick="OpenMOVModal(\'31\',\'MOVView31\')">' },
{ find: /<g id="MOV_BD10">/g, replace: '<g id="MOV_BD10" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD10_IN_GEN_ALRM_IMG MOV_BD10_OPN_IMG MOV_BD10_CLS_IMG" onclick="OpenMOVModal(\'32\',\'MOVView32\')">' },
{ find: /<g id="MOV_BD11">/g, replace: '<g id="MOV_BD11" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD11_IN_GEN_ALRM_IMG MOV_BD11_OPN_IMG MOV_BD11_CLS_IMG" onclick="OpenMOVModal(\'33\',\'MOVView33\')">' },
{ find: /<g id="MOV_BD12">/g, replace: '<g id="MOV_BD12" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD12_IN_GEN_ALRM_IMG MOV_BD12_OPN_IMG MOV_BD12_CLS_IMG" onclick="OpenMOVModal(\'34\',\'MOVView34\')">' },
{ find: /<g id="MOV_BD13">/g, replace: '<g id="MOV_BD13" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD13_IN_GEN_ALRM_IMG MOV_BD13_OPN_IMG MOV_BD13_CLS_IMG" onclick="OpenMOVModal(\'35\',\'MOVView35\')">' },
{ find: /<g id="MOV_BD14">/g, replace: '<g id="MOV_BD14" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD14_IN_GEN_ALRM_IMG MOV_BD14_OPN_IMG MOV_BD14_CLS_IMG" onclick="OpenMOVModal(\'36\',\'MOVView36\')">' },
{ find: /<g id="MOV_BD15">/g, replace: '<g id="MOV_BD15" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD15_IN_GEN_ALRM_IMG MOV_BD15_OPN_IMG MOV_BD15_CLS_IMG" onclick="OpenMOVModal(\'37\',\'MOVView37\')">' },
{ find: /<g id="MOV_BD16">/g, replace: '<g id="MOV_BD16" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD16_IN_GEN_ALRM_IMG MOV_BD16_OPN_IMG MOV_BD16_CLS_IMG" onclick="OpenMOVModal(\'38\',\'MOVView38\')">' },
{ find: /<g id="MOV_BD17">/g, replace: '<g id="MOV_BD17" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD17_IN_GEN_ALRM_IMG MOV_BD17_OPN_IMG MOV_BD17_CLS_IMG" onclick="OpenMOVModal(\'39\',\'MOVView39\')">' },
{ find: /<g id="MOV_BD18">/g, replace: '<g id="MOV_BD18" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD18_IN_GEN_ALRM_IMG MOV_BD18_OPN_IMG MOV_BD18_CLS_IMG" onclick="OpenMOVModal(\'40\',\'MOVView40\')">' },
{ find: /<g id="MOV_BD19">/g, replace: '<g id="MOV_BD19" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD19_IN_GEN_ALRM_IMG MOV_BD19_OPN_IMG MOV_BD19_CLS_IMG" onclick="OpenMOVModal(\'41\',\'MOVView41\')">' },
{ find: /<g id="MOV_BD20">/g, replace: '<g id="MOV_BD20" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD20_IN_GEN_ALRM_IMG MOV_BD20_OPN_IMG MOV_BD20_CLS_IMG" onclick="OpenMOVModal(\'42\',\'MOVView42\')">' },
{ find: /<g id="MOV_BD21">/g, replace: '<g id="MOV_BD21" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD21_IN_GEN_ALRM_IMG MOV_BD21_OPN_IMG MOV_BD21_CLS_IMG" onclick="OpenMOVModal(\'43\',\'MOVView43\')">' },
{ find: /<g id="MOV_BD22">/g, replace: '<g id="MOV_BD22" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD22_IN_GEN_ALRM_IMG MOV_BD22_OPN_IMG MOV_BD22_CLS_IMG" onclick="OpenMOVModal(\'44\',\'MOVView44\')">' },
{ find: /<g id="MOV_BD23">/g, replace: '<g id="MOV_BD23" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD23_IN_GEN_ALRM_IMG MOV_BD23_OPN_IMG MOV_BD23_CLS_IMG" onclick="OpenMOVModal(\'45\',\'MOVView45\')">' },
{ find: /<g id="MOV_BD24">/g, replace: '<g id="MOV_BD24" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD24_IN_GEN_ALRM_IMG MOV_BD24_OPN_IMG MOV_BD24_CLS_IMG" onclick="OpenMOVModal(\'46\',\'MOVView46\')">' },
{ find: /<g id="MOV_BD25">/g, replace: '<g id="MOV_BD25" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD25_IN_GEN_ALRM_IMG MOV_BD25_OPN_IMG MOV_BD25_CLS_IMG" onclick="OpenMOVModal(\'47\',\'MOVView47\')">' },
{ find: /<g id="MOV_BD26">/g, replace: '<g id="MOV_BD26" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD26_IN_GEN_ALRM_IMG MOV_BD26_OPN_IMG MOV_BD26_CLS_IMG" onclick="OpenMOVModal(\'48\',\'MOVView48\')">' },
{ find: /<g id="MOV_BD27">/g, replace: '<g id="MOV_BD27" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD27_IN_GEN_ALRM_IMG MOV_BD27_OPN_IMG MOV_BD27_CLS_IMG" onclick="OpenMOVModal(\'49\',\'MOVView49\')">' },
{ find: /<g id="MOV_BD28">/g, replace: '<g id="MOV_BD28" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD28_IN_GEN_ALRM_IMG MOV_BD28_OPN_IMG MOV_BD28_CLS_IMG" onclick="OpenMOVModal(\'50\',\'MOVView50\')">' },
{ find: /<g id="MOV_BD29">/g, replace: '<g id="MOV_BD29" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD29_IN_GEN_ALRM_IMG MOV_BD29_OPN_IMG MOV_BD29_CLS_IMG" onclick="OpenMOVModal(\'51\',\'MOVView51\')">' },
{ find: /<g id="MOV_BD30">/g, replace: '<g id="MOV_BD30" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD30_IN_GEN_ALRM_IMG MOV_BD30_OPN_IMG MOV_BD30_CLS_IMG" onclick="OpenMOVModal(\'52\',\'MOVView52\')">' },
{ find: /<g id="MOV_BD31">/g, replace: '<g id="MOV_BD31" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD31_IN_GEN_ALRM_IMG MOV_BD31_OPN_IMG MOV_BD31_CLS_IMG" onclick="OpenMOVModal(\'53\',\'MOVView53\')">' },
{ find: /<g id="MOV_BD32">/g, replace: '<g id="MOV_BD32" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD32_IN_GEN_ALRM_IMG MOV_BD32_OPN_IMG MOV_BD32_CLS_IMG" onclick="OpenMOVModal(\'54\',\'MOVView54\')">' },
{ find: /<g id="MOV_BD33">/g, replace: '<g id="MOV_BD33" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD33_IN_GEN_ALRM_IMG MOV_BD33_OPN_IMG MOV_BD33_CLS_IMG" onclick="OpenMOVModal(\'55\',\'MOVView55\')">' },
{ find: /<g id="MOV_BD34">/g, replace: '<g id="MOV_BD34" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD34_IN_GEN_ALRM_IMG MOV_BD34_OPN_IMG MOV_BD34_CLS_IMG" onclick="OpenMOVModal(\'56\',\'MOVView56\')">' },
{ find: /<g id="MOV_BD35">/g, replace: '<g id="MOV_BD35" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD35_IN_GEN_ALRM_IMG MOV_BD35_OPN_IMG MOV_BD35_CLS_IMG" onclick="OpenMOVModal(\'57\',\'MOVView57\')">' },
{ find: /<g id="MOV_BD36">/g, replace: '<g id="MOV_BD36" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD36_IN_GEN_ALRM_IMG MOV_BD36_OPN_IMG MOV_BD36_CLS_IMG" onclick="OpenMOVModal(\'58\',\'MOVView58\')">' },
{ find: /<g id="MOV_BD37">/g, replace: '<g id="MOV_BD37" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD37_IN_GEN_ALRM_IMG MOV_BD37_OPN_IMG MOV_BD37_CLS_IMG" onclick="OpenMOVModal(\'59\',\'MOVView59\')">' },
{ find: /<g id="MOV_BD38">/g, replace: '<g id="MOV_BD38" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_BD38_IN_GEN_ALRM_IMG MOV_BD38_OPN_IMG MOV_BD38_CLS_IMG" onclick="OpenMOVModal(\'60\',\'MOVView60\')">' },
{ find: /<g id="MOV_M05_D1">/g, replace: '<g id="MOV_M05_D1" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_M05_D1_IN_GEN_ALRM_IMG MOV_M05_D1_OPN_IMG MOV_M05_D1_CLS_IMG" onclick="OpenMOVModal(\'61\',\'MOVView61\')">' },
{ find: /<g id="MOV_M04_D1">/g, replace: '<g id="MOV_M04_D1" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_M04_D1_IN_GEN_ALRM_IMG MOV_M04_D1_OPN_IMG MOV_M04_D1_CLS_IMG" onclick="OpenMOVModal(\'62\',\'MOVView62\')">' },
{ find: /<g id="MOV_M03_D1">/g, replace: '<g id="MOV_M03_D1" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_M03_D1_IN_GEN_ALRM_IMG MOV_M03_D1_OPN_IMG MOV_M03_D1_CLS_IMG" onclick="OpenMOVModal(\'63\',\'MOVView63\')">' },
{ find: /<g id="MOV_M02_D1">/g, replace: '<g id="MOV_M02_D1" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_M02_D1_IN_GEN_ALRM_IMG MOV_M02_D1_OPN_IMG MOV_M02_D1_CLS_IMG" onclick="OpenMOVModal(\'64\',\'MOVView64\')">' },
{ find: /<g id="MOV_M01_D1">/g, replace: '<g id="MOV_M01_D1" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV_M01_D1_IN_GEN_ALRM_IMG MOV_M01_D1_OPN_IMG MOV_M01_D1_CLS_IMG" onclick="OpenMOVModal(\'65\',\'MOVView65\')">' },
{ find: /<g id="MOV01_FWT01_IN">/g, replace: '<g id="MOV01_FWT01_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_FWT01_IN_IN_GEN_ALRM_IMG MOV01_FWT01_IN_OPN_IMG MOV01_FWT01_IN_CLS_IMG" onclick="OpenMOVModal(\'66\',\'MOVView66\')">' },
{ find: /<g id="MOV01_FWT01_OUT">/g, replace: '<g id="MOV01_FWT01_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_FWT01_OUT_IN_GEN_ALRM_IMG MOV01_FWT01_OUT_OPN_IMG MOV01_FWT01_OUT_CLS_IMG" onclick="OpenMOVModal(\'67\',\'MOVView67\')">' },
{ find: /<g id="MOV01_FWT02_IN">/g, replace: '<g id="MOV01_FWT02_IN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_FWT02_IN_IN_GEN_ALRM_IMG MOV01_FWT02_IN_OPN_IMG MOV01_FWT02_IN_CLS_IMG" onclick="OpenMOVModal(\'68\',\'MOVView68\')">' },
{ find: /<g id="MOV01_FWT02_OUT">/g, replace: '<g id="MOV01_FWT02_OUT" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_FWT02_OUT_IN_GEN_ALRM_IMG MOV01_FWT02_OUT_OPN_IMG MOV01_FWT02_OUT_CLS_IMG" onclick="OpenMOVModal(\'69\',\'MOVView69\')">' },
{ find: /<g id="MOV01_TK04_WDOFF">/g, replace: '<g id="MOV01_TK04_WDOFF" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK04_WDOFF_IN_GEN_ALRM_IMG MOV01_TK04_WDOFF_OPN_IMG MOV01_TK04_WDOFF_CLS_IMG" onclick="OpenMOVModal(\'70\',\'MOVView70\')">' },
{ find: /<g id="MOV01_TK05_WDOFF">/g, replace: '<g id="MOV01_TK05_WDOFF" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK05_WDOFF_IN_GEN_ALRM_IMG MOV01_TK05_WDOFF_OPN_IMG MOV01_TK05_WDOFF_CLS_IMG" onclick="OpenMOVModal(\'71\',\'MOVView71\')">' },
{ find: /<g id="MOV01_TK06_WDOFF">/g, replace: '<g id="MOV01_TK06_WDOFF" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK06_WDOFF_IN_GEN_ALRM_IMG MOV01_TK06_WDOFF_OPN_IMG MOV01_TK06_WDOFF_CLS_IMG" onclick="OpenMOVModal(\'72\',\'MOVView72\')">' },
{ find: /<g id="MOV01_TK07_WDOFF">/g, replace: '<g id="MOV01_TK07_WDOFF" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_TK07_WDOFF_IN_GEN_ALRM_IMG MOV01_TK07_WDOFF_OPN_IMG MOV01_TK07_WDOFF_CLS_IMG" onclick="OpenMOVModal(\'73\',\'MOVView73\')">' },
{ find: /<g id="MOV01_DYKE_DRAIN">/g, replace: '<g id="MOV01_DYKE_DRAIN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV01_DYKE_DRAIN_IN_GEN_ALRM_IMG MOV01_DYKE_DRAIN_OPN_IMG MOV01_DYKE_DRAIN_CLS_IMG" onclick="OpenMOVModal(\'74\',\'MOVView74\')">' },
{ find: /<g id="MOV02_DYKE_DRAIN">/g, replace: '<g id="MOV02_DYKE_DRAIN" data-tooltip-attr="MOV*" class="tooltips svg-valve MOV02_DYKE_DRAIN_IN_GEN_ALRM_IMG MOV02_DYKE_DRAIN_OPN_IMG MOV02_DYKE_DRAIN_CLS_IMG" onclick="OpenMOVModal(\'75\',\'MOVView75\')">' },

{ find: /<title>.*<\/title>/gm, replace: '' },
{ find: /xlink:href/g, replace: 'href' },
{ find: /!<\/text>/g, replace: '<animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />!</text>' },


{ find: /<g id="PMP_HSD_01">/g, replace: '<g id="PMP_HSD_01" class="svg-pump tooltips PMP_HSD_01_TRIP_IMG PMP_HSD_01_FAIL_IMG PMP_HSD_01_RUN_IMG" onclick="OpenPumpModal(\'1\',\'PumpsView01\')" data-tooltip-attr="PMP*">' },
{ find: /<g id="PMP_HSD_02">/g, replace: '<g id="PMP_HSD_02" class="svg-pump tooltips PMP_HSD_02_TRIP_IMG PMP_HSD_02_FAIL_IMG PMP_HSD_02_RUN_IMG" onclick="OpenPumpModal(\'2\',\'PumpsView02\')" data-tooltip-attr="PMP*">' },
{ find: /<g id="PMP_HSD_03">/g, replace: '<g id="PMP_HSD_03" class="svg-pump tooltips PMP_HSD_03_TRIP_IMG PMP_HSD_03_FAIL_IMG PMP_HSD_03_RUN_IMG" onclick="OpenPumpModal(\'3\',\'PumpsView03\')" data-tooltip-attr="PMP*">' },
{ find: /<g id="PMP_HSD_04">/g, replace: '<g id="PMP_HSD_04" class="svg-pump tooltips PMP_HSD_04_TRIP_IMG PMP_HSD_04_FAIL_IMG PMP_HSD_04_RUN_IMG" onclick="OpenPumpModal(\'4\',\'PumpsView04\')" data-tooltip-attr="PMP*">' },
{ find: /<g id="PMP_HSD_05">/g, replace: '<g id="PMP_HSD_05" class="svg-pump tooltips PMP_HSD_05_TRIP_IMG PMP_HSD_05_FAIL_IMG PMP_HSD_05_RUN_IMG" onclick="OpenPumpModal(\'5\',\'PumpsView05\')" data-tooltip-attr="PMP*">' },


{ find: /<g id="TK04">/g, replace: '<g id="TK04" onclick="OpenTankViewModal(\'4\',\'MOVView04,MOVView03,MOVView02,MOVView01,TankView04\')">' },
{ find: /<g id="TK05">/g, replace: '<g id="TK05" onclick="OpenTankViewModal(\'5\',\'MOVView08,MOVView07,MOVView06,MOVView05,TankView05\')">' },
{ find: /<g id="TK06">/g, replace: '<g id="TK06" onclick="OpenTankViewModal(\'6\',\'MOVView12,MOVView11,MOVView10,MOVView09,TankView06\')">' },
{ find: /<g id="TK07">/g, replace: '<g id="TK07" onclick="OpenTankViewModal(\'7\',\'MOVView16,MOVView15,MOVView14,MOVView13TankView07\')">' },


{ find: /<text id="TK04_LEVEL" class="/g, replace: '<text id="TK04_LEVEL" title="Primary Radar Level" onclick="OpenChartModal(\'TK04_LEVEL\', \'TankView04\'); cancelBubble(event);" class="get-hover tooltips TK04_LEVEL ' },
{ find: /<text id="TK05_LEVEL" class="/g, replace: '<text id="TK05_LEVEL" title="Primary Radar Level" onclick="OpenChartModal(\'TK05_LEVEL\', \'TankView05\'); cancelBubble(event);" class="get-hover tooltips TK05_LEVEL ' },
{ find: /<text id="TK06_LEVEL" class="/g, replace: '<text id="TK06_LEVEL" title="Primary Radar Level" onclick="OpenChartModal(\'TK06_LEVEL\', \'TankView06\'); cancelBubble(event);" class="get-hover tooltips TK06_LEVEL ' },
{ find: /<text id="TK07_LEVEL" class="/g, replace: '<text id="TK07_LEVEL" title="Primary Radar Level" onclick="OpenChartModal(\'TK07_LEVEL\', \'TankView07\'); cancelBubble(event);" class="get-hover tooltips TK07_LEVEL ' },


{ find: /<text id="TK04_AVG_TEMP" class="/g, replace: '<text id="TK04_AVG_TEMP" title="Avg Tank Temp" onclick="OpenChartModal(\'TK04_AVG_TEMP\', \'TankView04\'); cancelBubble(event);" class="get-hover tooltips TK04_AVG_TEMP ' },
{ find: /<text id="TK05_AVG_TEMP" class="/g, replace: '<text id="TK05_AVG_TEMP" title="Avg Tank Temp" onclick="OpenChartModal(\'TK05_AVG_TEMP\', \'TankView05\'); cancelBubble(event);" class="get-hover tooltips TK05_AVG_TEMP ' },
{ find: /<text id="TK06_AVG_TEMP" class="/g, replace: '<text id="TK06_AVG_TEMP" title="Avg Tank Temp" onclick="OpenChartModal(\'TK06_AVG_TEMP\', \'TankView06\'); cancelBubble(event);" class="get-hover tooltips TK06_AVG_TEMP ' },
{ find: /<text id="TK07_AVG_TEMP" class="/g, replace: '<text id="TK07_AVG_TEMP" title="Avg Tank Temp" onclick="OpenChartModal(\'TK07_AVG_TEMP\', \'TankView07\'); cancelBubble(event);" class="get-hover tooltips TK07_AVG_TEMP ' },


{ find: /<text id="TK04_PER_LVL" class="/g, replace: '<text id="TK04_PER_LVL" title="Primary % Level" class="tooltips TK04_PER_LVL ' },
{ find: /<text id="TK05_PER_LVL" class="/g, replace: '<text id="TK05_PER_LVL" title="Primary % Level" class="tooltips TK05_PER_LVL ' },
{ find: /<text id="TK06_PER_LVL" class="/g, replace: '<text id="TK06_PER_LVL" title="Primary % Level" class="tooltips TK06_PER_LVL ' },
{ find: /<text id="TK07_PER_LVL" class="/g, replace: '<text id="TK07_PER_LVL" title="Primary % Level" class="tooltips TK07_PER_LVL ' },


{ find: /<text id="DP_TK04_BOT_AMB_DENSITY" class="/g, replace: '<text id="DP_TK04_BOT_AMB_DENSITY" title="Observed Density" onclick="OpenChartModal(\'DP_TK04_BOT_AMB_DENSITY\', \'DensProbeView04\'); cancelBubble(event);" class="get-hover tooltips DP_TK04_BOT_AMB_DENSITY ' },
{ find: /<text id="DP_TK05_BOT_AMB_DENSITY" class="/g, replace: '<text id="DP_TK05_BOT_AMB_DENSITY" title="Observed Density" onclick="OpenChartModal(\'DP_TK05_BOT_AMB_DENSITY\', \'DensProbeView05\'); cancelBubble(event);" class="get-hover tooltips DP_TK05_BOT_AMB_DENSITY ' },
{ find: /<text id="DP_TK06_BOT_AMB_DENSITY" class="/g, replace: '<text id="DP_TK06_BOT_AMB_DENSITY" title="Observed Density" onclick="OpenChartModal(\'DP_TK06_BOT_AMB_DENSITY\', \'DensProbeView06\'); cancelBubble(event);" class="get-hover tooltips DP_TK06_BOT_AMB_DENSITY ' },
{ find: /<text id="DP_TK07_BOT_AMB_DENSITY" class="/g, replace: '<text id="DP_TK07_BOT_AMB_DENSITY" title="Observed Density" onclick="OpenChartModal(\'DP_TK07_BOT_AMB_DENSITY\', \'DensProbeView07\'); cancelBubble(event);" class="get-hover tooltips DP_TK07_BOT_AMB_DENSITY ' },


{ find: /<g id="AOP_TK04">/g, replace: '<g id="AOP_TK04" title="AOPS" class="tooltips svg-aop-meter AOP_TK04_STATUS">' },
{ find: /<g id="AOP_TK05">/g, replace: '<g id="AOP_TK05" title="AOPS" class="tooltips svg-aop-meter AOP_TK05_STATUS">' },
{ find: /<g id="AOP_TK06">/g, replace: '<g id="AOP_TK06" title="AOPS" class="tooltips svg-aop-meter AOP_TK06_STATUS">' },
{ find: /<g id="AOP_TK07">/g, replace: '<g id="AOP_TK07" title="AOPS" class="tooltips svg-aop-meter AOP_TK07_STATUS">' },


{ find: /<g id="RDR_TK04">/g, replace: '<g id="RDR_TK04" title="Secondary Radar HH" class="tooltips svg-sec-radar RDR_TK04_STATUS">' },
{ find: /<g id="RDR_TK05">/g, replace: '<g id="RDR_TK05" title="Secondary Radar HH" class="tooltips svg-sec-radar RDR_TK05_STATUS">' },
{ find: /<g id="RDR_TK06">/g, replace: '<g id="RDR_TK06" title="Secondary Radar HH" class="tooltips svg-sec-radar RDR_TK06_STATUS">' },
{ find: /<g id="RDR_TK07">/g, replace: '<g id="RDR_TK07" title="Secondary Radar HH" class="tooltips svg-sec-radar RDR_TK07_STATUS">' },


{ find: /<g id="PRLY_TK04">/g, replace: '<g id="PRLY_TK04" title="Primary Radar HH" class="tooltips svg-pri-radar PRLY_TK04_STATUS">' },
{ find: /<g id="PRLY_TK05">/g, replace: '<g id="PRLY_TK05" title="Primary Radar HH" class="tooltips svg-pri-radar PRLY_TK05_STATUS">' },
{ find: /<g id="PRLY_TK06">/g, replace: '<g id="PRLY_TK06" title="Primary Radar HH" class="tooltips svg-pri-radar PRLY_TK06_STATUS">' },
{ find: /<g id="PRLY_TK07">/g, replace: '<g id="PRLY_TK07" title="Primary Radar HH" class="tooltips svg-pri-radar PRLY_TK07_STATUS">' },


{ find: /<g id="TK04_ALRM_HHH">/g, replace: '<g id="TK04_ALRM_HHH" title="" class="svg-alarm TK04_ALRM_HHH">' },
{ find: /<g id="TK05_ALRM_HHH">/g, replace: '<g id="TK05_ALRM_HHH" title="" class="svg-alarm TK05_ALRM_HHH">' },
{ find: /<g id="TK06_ALRM_HHH">/g, replace: '<g id="TK06_ALRM_HHH" title="" class="svg-alarm TK06_ALRM_HHH">' },
{ find: /<g id="TK07_ALRM_HHH">/g, replace: '<g id="TK07_ALRM_HHH" title="" class="svg-alarm TK07_ALRM_HHH">' },


{ find: /<g id="TK04_ALRM_HH">/g, replace: '<g id="TK04_ALRM_HH" title="" class="svg-alarm TK04_ALRM_HH">' },
{ find: /<g id="TK05_ALRM_HH">/g, replace: '<g id="TK05_ALRM_HH" title="" class="svg-alarm TK05_ALRM_HH">' },
{ find: /<g id="TK06_ALRM_HH">/g, replace: '<g id="TK06_ALRM_HH" title="" class="svg-alarm TK06_ALRM_HH">' },
{ find: /<g id="TK07_ALRM_HH">/g, replace: '<g id="TK07_ALRM_HH" title="" class="svg-alarm TK07_ALRM_HH">' },


{ find: /<g id="TK04_ALRM_OP_HI">/g, replace: '<g id="TK04_ALRM_OP_HI" title="" class="svg-alarm TK04_ALRM_OP_HI">' },
{ find: /<g id="TK05_ALRM_OP_HI">/g, replace: '<g id="TK05_ALRM_OP_HI" title="" class="svg-alarm TK05_ALRM_OP_HI">' },
{ find: /<g id="TK06_ALRM_OP_HI">/g, replace: '<g id="TK06_ALRM_OP_HI" title="" class="svg-alarm TK06_ALRM_OP_HI">' },
{ find: /<g id="TK07_ALRM_OP_HI">/g, replace: '<g id="TK07_ALRM_OP_HI" title="" class="svg-alarm TK07_ALRM_OP_HI">' },


{ find: /<g id="TK04_ALRM_H">/g, replace: '<g id="TK04_ALRM_H" title="" class="svg-alarm TK04_ALRM_H">' },
{ find: /<g id="TK05_ALRM_H">/g, replace: '<g id="TK05_ALRM_H" title="" class="svg-alarm TK05_ALRM_H">' },
{ find: /<g id="TK06_ALRM_H">/g, replace: '<g id="TK06_ALRM_H" title="" class="svg-alarm TK06_ALRM_H">' },
{ find: /<g id="TK07_ALRM_H">/g, replace: '<g id="TK07_ALRM_H" title="" class="svg-alarm TK07_ALRM_H">' },


{ find: /<g id="TK04_ALRM_L">/g, replace: '<g id="TK04_ALRM_L" title="" class="svg-alarm TK04_ALRM_L">' },
{ find: /<g id="TK05_ALRM_L">/g, replace: '<g id="TK05_ALRM_L" title="" class="svg-alarm TK05_ALRM_L">' },
{ find: /<g id="TK06_ALRM_L">/g, replace: '<g id="TK06_ALRM_L" title="" class="svg-alarm TK06_ALRM_L">' },
{ find: /<g id="TK07_ALRM_L">/g, replace: '<g id="TK07_ALRM_L" title="" class="svg-alarm TK07_ALRM_L">' },


{ find: /<g id="TK04_ALRM_LL">/g, replace: '<g id="TK04_ALRM_LL" title="" class="svg-alarm TK04_ALRM_LL">' },
{ find: /<g id="TK05_ALRM_LL">/g, replace: '<g id="TK05_ALRM_LL" title="" class="svg-alarm TK05_ALRM_LL">' },
{ find: /<g id="TK06_ALRM_LL">/g, replace: '<g id="TK06_ALRM_LL" title="" class="svg-alarm TK06_ALRM_LL">' },
{ find: /<g id="TK07_ALRM_LL">/g, replace: '<g id="TK07_ALRM_LL" title="" class="svg-alarm TK07_ALRM_LL">' },


{ find: /<g id="DP_TK04">/g, replace: '<g id="DP_TK04" title="Multi Density Probe" class="tooltips svg-multi-dens-probDP_TK04" onclick="OpenDensityModal(\'4\',0,\'DensProbeView04\')">' },
{ find: /<g id="DP_TK05">/g, replace: '<g id="DP_TK05" title="Multi Density Probe" class="tooltips svg-multi-dens-probDP_TK05" onclick="OpenDensityModal(\'5\',0,\'DensProbeView05\')">' },
{ find: /<g id="DP_TK06">/g, replace: '<g id="DP_TK06" title="Multi Density Probe" class="tooltips svg-multi-dens-probDP_TK06" onclick="OpenDensityModal(\'6\',0,\'DensProbeView06\')">' },
{ find: /<g id="DP_TK07">/g, replace: '<g id="DP_TK07" title="Multi Density Probe" class="tooltips svg-multi-dens-probDP_TK07" onclick="OpenDensityModal(\'7\',0,\'DensProbeView07\')">' },

];

function FindReplaceScript (olist){

var fs = require('fs');
fs.readFile(oReadFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  for (var i = 0; i < olist.length; i++) {
	  var found = data.match(olist[i].find);
	  if(found==null){console.log('String/Exp not found:'+olist[i].find);}
    else { data = data.replace(olist[i].find, olist[i].replace);}
  }

  fs.writeFile(oWriteFile, data, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
}

FindReplaceScript(list);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
console.log('Find Replace Completed:'+dateTime);