//String.prototype.trim = function() {
//    return this.replace(/^\s+|\s+$/g,"");
//}
//String.prototype.ltrim = function() {
//    return this.replace(/^\s+/,"");
//}
//String.prototype.rtrim = function() {
//    return this.replace(/\s+$/,"");
//}
//String.prototype.crop = function(cropLength, cropMark) {
//    if (typeof(cropMark) != "string")
//        cropMark = "";

//    if (this.length > cropLength && this.length > cropMark.length)
//        return this.substr(0, cropLength - cropMark.length) + cropMark;
//    else
//        return this;
//}

function launch(url) {
    var w = 480, h = 340;

    if (document.all) {
        /* the following is only available after onLoad */
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }
    else if (document.layers) {
        w = window.innerWidth;
        h = window.innerHeight;
    }

    var popW = 475, popH = 590;

    var leftPos = (w-popW)/2, topPos = (h-popH)/2;

    self.name = "opener";
    remote = open(url, 'helpWin', "resizable,scrollbars,status,width=" + popW + ",height="+popH+",left="+leftPos+",top="+topPos+"");

    //Fix for IE6 to solve problem with video stopping when opening help
    try {
        if ((typeof(useAMC) != "undefined")&&(useAMC == "yes") &&(navigator.appVersion.indexOf("MSIE 6") != -1) && (typeof(stopStartStream) == "function") && (typeof(imagepath) == "string"))
            stopStartStream(imagepath);
    } catch (e) {}
}

function openPopUp(thePage, theName, theWidth, theHeight)
{
    theWidth = Number( theWidth ) + 10;
    theHeight = Number( theHeight ) + 20;

    var someFeatures = 'scrollbars=yes,toolbar=0,location=no,directories=0,status=0,menubar=0,resizable=1,width=' + theWidth + ',height=' + theHeight;
    var aPopUpWin = window.open(thePage, theName, someFeatures);

    if (navigator.appName == "Netscape" && aPopUpWin != null) {
        aPopUpWin.focus();
    }
}

function showStatus(msg)
{
    window.status = msg
    return true
}

function CSS()
{
    if ((navigator.appVersion.indexOf("Mac") != -1) && (navigator.appName.indexOf("Netscape") != -1)) {
        document.write('<link rel="stylesheet" href="/css/mac_ns.css?version=142" type="text/css" />');

    } else if ((navigator.appVersion.indexOf("Mac") != -1) && (navigator.appName.indexOf("Microsoft Internet Explorer") != -1)) {
        document.write('<link rel="stylesheet" href="/css/mac_ie.css?version=142" type="text/css" />');

    } else if ((navigator.appVersion.indexOf("Win") != -1) && (navigator.appName.indexOf("Netscape") != -1)) {
        document.write('<link rel="stylesheet" href="/css/win_ns.css?version=142" type="text/css" />');

    } else if ((navigator.appVersion.indexOf("Win") != -1) && (navigator.appName.indexOf("Microsoft Internet Explorer") != -1)) {
        document.write('<link rel="stylesheet" href="/css/win_ie.css?version=142" type="text/css" />');

    } else if (navigator.appName.indexOf("Netscape") != -1) {
        // Unix or other system
        document.write('<link rel="stylesheet" href="/css/win_ns.css?version=142" type="text/css" />');
    } else {         
        document.write('<link rel="stylesheet" href="/css/other.css?version=142" type="text/css" />');
    }

    // Wrapper for old browsers which can't handle getElementById
    if(!document.getElementById) {
        document.getElementById = function(element)
        {
            return eval("document.all." + element);
        }
    }
}

//CSS();

function SubmitForm()
{
    document.WizardForm.submit();
}

//if ((navigator.appName == "Microsoft Internet Explorer") &&
//    (navigator.platform != "MacPPC") &&
//    (navigator.platform != "Mac68k")) {
//        var browser = "IE"
//    } else {
//  var browser = "Netscape"
//}

//function drawBoxHeader(title)
//{
//    var args = drawBoxHeader.arguments;
//    var fill = (args.length >= 2 ? args[1] : false);

//    document.write('' +
//  '<td' + (fill ? ' width="100%"' : '') + '>' +
//  '  <table width="100%" height="46" cellpadding=0 cellspacing=0 border=0>' +
//  '    <tr>' +
//  '      <td colspan=2 width=5 background="/pics/gray_corner_lt_5x50px.gif"><img src="/pics/blank.gif" width=5 height=5 border=0 alt=""></td>' +
//  '      <td valign="top" align="center" width="100%" background="/pics/gray_t_5x50px.gif" height="5" class="funcText" nowrap>' + title + '</td>' +
//  '      <td colspan=2 width=5  background="/pics/gray_corner_rt_5x50px.gif"><img src="/pics/blank.gif" width=5 height=5 border=0 alt=""></td>' +
//  '    </tr>' +
//  '    <tr>' +
//  '      <td width=1 class="lineBg"><img src="/pics/blank.gif" width=1 height=5 alt=""></td>' +
//  '      <td width=4><img src="/pics/blank.gif" width=4 height=5 alt=""></td>' +
//  '      <td valign="middle" align="center" width="100%">' +
//  '        <table cellpadding=0 cellspacing=0 border=0>' +
//  '          <tr>');
//}

//function drawBoxFooter()
//{
//    document.write('' +
//  '          </tr>' +
//  '        </table>' +
//  '      </td>' +
//  '      <td width=4><img src="/pics/blank.gif" width=4 height=5 alt=""></td>' +
//  '      <td width=1 class="lineBg"><img src="/pics/blank.gif" width=1 height=5 alt=""></td>' +
//  '    </tr>' +
//  '    <tr>' +
//  '      <td colspan=2 width=5 height=5><img src="/pics/line_corner_lb_5x5px.gif" width=5 height=5 border=0 alt=""></td>' +
//  '      <td width="100%" height=5 background="/pics/line_b_100x5px.gif"><img src="/pics/blank.gif" width=1 height=5 alt=""></td>' +
//  '      <td colspan=2 width=5 height=5><img src="/pics/line_corner_rb_5x5px.gif" width=5 height=5 border=0 alt=""></td>' +
//  '    </tr>' +
//  '  </table>' +
//  '</td>');
//}

//function drawBoxButton(pic, title)
//{
//    var args = drawBoxButton.arguments;
//    var url =      (args.length >= 3 ? args[2] : null);
//    var name =     (args.length >= 4 ? args[3] : null);
//    var pressed =  (args.length >= 5 ? args[4] : null);
//    var on_click = (args.length >= 6 ? args[5] : null);
//    var width =    (args.length >= 7 ? args[6] : 27);
//    var height =   (args.length >= 8 ? args[7] : 27);

//    if (url) {
//        if (name) {
//            document.write('<td valign="middle" align="left">' +
//                           '<a href="' + url + '" id="' + name +'_link" target="Temp"' +
//                           (on_click ? ' onClick="' + on_click+ '"' : '') +
//                           ' onMouseDown="movepic(\'' + name + '\', \'' + pressed + '\')"' +
//                           ' onMouseUp="movepic(\'' + name + '\', \'' + pic + '\')"' +
//                           '>' +
//                           '<img name="' + name + '" src="' + pic + '" ' +
//                           'width=' + width + ' height=' + height + ' border=0 ' +
//                           (title ? ' title="' + title + '" alt="' + title + '"' : '') +
//                           '>' +
//                           '</a>' +
//                           '</td>');
//        } else {
//            document.write('<td valign="middle" align="left">' +
//                           '<a href="' + url + '" target="_self"' +
//                           (on_click ? ' onClick="' + on_click+ '"' : '') +
//                           '>' +
//                           '<img src="' + pic + '" ' +
//                           'width=' + width + ' height=' + height + ' border=0 ' +
//                           (title ? ' title="' + title + '" alt="' + title + '"' : '') +
//                           '>' +
//                           '</a>' +
//                           '</td>');
//        }
//    } else {
//        document.write('<td valign="middle" align="left">' +
//                       '<img src="' + pic + '" ' +
//                       (name ? 'name="' + name + '" ' : '') +
//                       'width=' + width + ' height=' + height + ' border=0' +
//                       (on_click ? ' onClick="' + on_click+ '"' : '') +
//                       (title ? ' title="' + title + '" alt="' + title + '"' : '') +
//                       '>' +
//                       '</td>');
//    }
//}

//function drawBoxToggleButton(picActive, picActivePressed, titleActive, urlActive, nameActive, picInactive, picInactivePressed, titleInactive, urlInactive, nameInactive, initStatusActive)
//{
//    document.write('<td valign="middle" align="left">' +
//                   '<a href="' + urlActive + '" target="Temp"' +
//                   ' onMouseDown="movepic(\'' + nameActive + '\', \'' + picActivePressed + '\'); movepic(\'' + nameInactive + '\', \'' + picInactive + '\')"' +
//                   '>' +
//                   '<img name="' + nameActive + '" src="' + (initStatusActive ? picActivePressed : picActive) + '" ' +
//                   'width=27 height=27 border=0 ' +
//                   ' title="' + titleActive + '" alt="' + titleActive + '"' +
//                   '>' +
//                   '</a>' +
//                   '</td>');
//    document.write('<td valign="middle" align="left">' +
//                   '<a href="' + urlInactive + '" target="Temp"' +
//                   ' onMouseDown="movepic(\'' + nameActive + '\', \'' + picActive + '\'); movepic(\'' + nameInactive + '\', \'' + picInactivePressed + '\')"' +
//                   '>' +
//                   '<img name="' + nameInactive + '" src="' + (!initStatusActive ? picInactivePressed : picInactive) + '" ' +
//                   'width=27 height=27 border=0 ' +
//                   ' title="' + titleInactive + '" alt="' + titleInactive + '"' +
//                   '>' +
//                   '</a>' +
//                   '</td>');
//}

//function drawBoxSpacer()
//{
//    document.write('<td width=5><img src="/pics/blank.gif" width=5 height=5 alt=""></td>');
//}

var playclip_request = zXmlHttp.createRequest();
if( playclip_request.overrideMimeType )
    playclip_request.overrideMimeType( 'text/plain' );

function playclip()
{
    var clipselect = document.getElementsByName("audioclip")[0];
    if (clipselect.value == "")
    {
        return;
    }
  
    var now = new Date();
    var url = "/axis-cgi/playclip.cgi?clip=" + clipselect.value + "&timestamp="+now.getTime();
    if (playclip_request.readyState > 0 || playclip_request.readyState < 4)
        playclip_request.abort();

    playclip_request.open("GET", url, true);
    playclip_request.onreadystatechange = playclip_request_onchange;

    //Try catch needs to be here beacuse IE7 returns "Operation aborted". If we dont handled that IE7 will hang on send().
    try {
        playclip_request.send("");
    } catch (e) { }
}

function playclip_request_onchange()
{
    if (typeof(playclip_request) == 'object' && playclip_request.readyState == 4) {
        if (playclip_request.status == 200 && playclip_request.responseText.length > 0)
        {
            var responseText = playclip_request.responseText;
            if(responseText.indexOf("OK") == -1)
            {
                alert("Error when playing audio clip.");
            }
        }
    }
}

function extractVideoNbr(theParamPos)
{
    var i = 0;
    var start, stop;
    var len;
    var colonCount = 0;

    while (theParamPos.charAt(i++) != '~' && i < theParamPos.length);
    if (i >= theParamPos.length) {
        return -1;
    }
    while (colonCount < 6 && i < theParamPos.length) {
        if (theParamPos.charAt(i++) == ':') {
            colonCount++;
            if (colonCount == 4)
                start = i;
            if (colonCount == 5)
                len = i-2-start+1;
        }
    }
    if (i < theParamPos.length && len > 0)
        return parseInt(theParamPos.substr(start,len), 10);
    else
        return -1;
}

function extractPresetNbr(name)
{
    var nbr = name.slice(20, -4)
    return parseInt(nbr, 10)
}

function getNewImageSource( camera_nbr )
{
    var imageSource;
    imageSource = "/mjpg/"+(( camera_nbr != null && camera_nbr != "" )? camera_nbr + "/":"")+"video.mjpg";

    return imageSource;
}

function listVideoSources()
{
    var formInt = document.listFormInt;
    var formExt = document.listFormExt;
    var formCrop = document.listFormCrop;
    var presetForm = document.listFormPreset;
    var form = document.WizardForm
    var currentPath = '/mjpg/video.mjpg';
    var imageSource;

    if ((1 > 1)
          || presetForm.elements.length > 4
        || ext_sources > 0
       ) {
        document.write('<select name="videoList" onChange="selectView()" >');

        if ((1 == 1)
              && (presetForm.elements.length > 4)
            && ext_sources == 0
           ) {
            document.write('<option class="gray" value="no_change">&nbsp;----------------</option>');
        }

        // ***** PTZ presets *****
        var prevReqCam = 1;
        if (currentPath.indexOf("camera") != -1)
        {
            var tmpStr = currentPath.substring(currentPath.indexOf("camera")+7);
            prevReqCam = (tmpStr.indexOf("&") != -1 )?tmpStr.substr(0, tmpStr.indexOf("&") ):tmpStr.substr(0);
        }
        var curpreset = unescape("");
        if (currentPath.indexOf("gotopresetname") != -1) {
            if (currentPath.lastIndexOf("&") > currentPath.lastIndexOf("gotopresetname="))
                curpreset = unescape(currentPath.substring(currentPath.lastIndexOf("gotopresetname=")+15, currentPath.lastIndexOf("&")-1))
            else
                curpreset = unescape(currentPath.substr(currentPath.lastIndexOf("gotopresetname=")+15))
        }
        for (i = 0; i < 1; i++) {
            if (presetForm.elements.length >= 4) {
                for (var j = 0; j < presetForm.elements.length; j++) {
                    var tmpArray = presetForm.elements[j].name.split("_");
                    if (tmpArray[tmpArray.length - 1] == "Name") {
                        var label = escape(presetForm[j].value);

                        var videoNbr = 1;
                        var group = tmpArray[tmpArray.length - 2];
                        if (videoNbr-1 == i) {
                            var tmpOpt = 'camera=' + videoNbr + '&gotopresetname=' + label;

                            if (currentPath.indexOf('?') >= 0)
                                tmpOpt = '&' + tmpOpt;
                            else
                                tmpOpt = '?' + tmpOpt;
                            document.write('<option value="' + currentPath + tmpOpt + '"');
                            if (unescape(label) == curpreset && videoNbr == prevReqCam)
                                document.write(' selected');
                            document.write('>');
                            document.write(unescape(label).crop(25, "...") + '</option>');
                        }//if videoNbr-1 == i
                    }
                }
            }
        }
        var viewAppletIE = "no";
        var viewAppletOther = "no";
        // Don't show external sources while using Java applet as Default Viewer. An unsigned applet doesn't have permission to access remote hosts.
        if (((browser == "IE") && (viewAppletIE == "no")) || ((browser != "IE") && (viewAppletOther == "no"))) {
            if (formExt.elements.length > 0) {
                for (i = 0; i < formExt.elements.length; i += 3) {
                    var aTempString = formExt.elements[i].name
                    var videoNr = aTempString.substring(20, aTempString.lastIndexOf('_'))
                    var external = formExt['root_ExternalVideo_E' + videoNr + '_ImagePath'].value;

                    document.write('<option value="' + external + '"');
                    if (formExt['root_ExternalVideo_E' + videoNr + '_ImagePath'].value == currentPath)
                        document.write(' selected');
                    document.write('>' + formExt['root_ExternalVideo_E' + videoNr + '_Name'].value + '</option>');
                }
            }
        }

        document.write('</select>');
        document.write("<input type=\"button\" value=\"Go\" width=\"40\" onClick=\"JavaScript:selectView()\">");
        //} else {
        //  document.write(formInt.root_ImageSource_I0_Name.value);
    }
}

function zoom(size)
{
    var url = document.URL;

    if (url.indexOf("?") == -1) {
        url += "?size=" + size
    } else if (url.indexOf("size=") == -1) {
        url += "&size=" + size
    } else {
        var searchStr = "size=1"
        var replaceStr = "size=" + size
        var re = new RegExp(searchStr , "g")
        url = url.replace(re, replaceStr)
    }

    document.location = url;
}

var aNewImagePath;

function reloadPage()
{
    document.location = aNewImagePath;
}

var gotopresetname = unescape('');

function selectView()
{
    if (!showSourceList)
        return;
    var form = document.WizardForm;
    var source = form.videoList.options[form.videoList.selectedIndex].value;
    var params = source.split('&');
    var newCamera = null;
    var presetName = null;

    if ((params[1] != null) && ("no" == "no")) {
        if (source.lastIndexOf("camera=") != -1) {
            if (source.lastIndexOf("&") > source.lastIndexOf("camera="))
                newCamera = source.substring(source.lastIndexOf("camera=")+7, source.lastIndexOf("&"))
            else
                newCamera = source.substr(source.lastIndexOf("camera=")+7)
        }
        if (source.lastIndexOf("gotopresetname=") != -1) {
            if (source.lastIndexOf("&") > source.lastIndexOf("gotopresetname="))
                presetName = source.substring(source.lastIndexOf("gotopresetname=")+15, source.lastIndexOf("&")-1)
            else
                presetName = source.substr(source.lastIndexOf("gotopresetname=")+15)
        }
        source = params[0];
        if (source.indexOf("?") != -1)
            source = source.substring(0, source.indexOf("?"))
    } else if (source == "no_change") {
        return;
    }
    if (presetName != null) gotopresetname = presetName;

    source = unescape( source );
    changeView(source, newCamera, presetName);
}

function changeView(imagePath)
{
    var args = changeView.arguments;
    var newCamera  = (args.length >= 2 ? args[1] : null);
    var presetName = (args.length >= 3 ? args[2] : null);
    var newSize    = (args.length >= 4 ? args[3] : null);
    var other      = (args.length >= 5 ? args[4] : null);

    // Go to correct preset when coming from an external video source
    if ((presetName == null || presetName == "") && (imagePath.indexOf("gotopresetname=") != -1)) {
        presetName = imagePath.slice(imagePath.indexOf("gotopresetname=") + 15)
        if (presetName.indexOf("&") != -1)
            presetName = presetName.substring(0, presetName.indexOf("&"))
    }
    if ((newCamera == null || newCamera == "") && (imagePath.indexOf("camera=") != -1)) {
        newCamera = imagePath.slice(imagePath.indexOf("camera=") + 7)
        if (newCamera.indexOf("&") != -1)
            newCamera = newCamera.substring(0, newCamera.indexOf("&"))
    }

    var reload = false;
    // the whole Live View design is built on page reload >-(
    // must reload initial sequence mode view to toggle buttons etc
    reload |= (other != null && other.search("seq=yes") >= 0);
    reload |= (other != null && other.search("streamprofile=") >= 0);
    reload |= ((other == null || (other != null && other.search("streamprofile=") == -1)) && ('' != ""));
    reload |= (imagePath != '/mjpg/video.mjpg');

    if ((presetName != null) && (presetName != "")) {
        var prevCamera = '1';
        // set new image path
        if (prevCamera == 'quad') {
            imagePath = imagePath.replace(/quad/, newCamera);
            reload = true;
        } else if (prevCamera != newCamera) {
            imagePath = imagePath.replace("/" + prevCamera + "/", "/" + newCamera + "/");
            reload = true;
        }
        var oLocked = document.getElementsByName("root_PTZ_Various_V" + newCamera + "_Locked")[0];
        if (oLocked && oLocked.value != "true")
            gotoPreset(newCamera, presetName);
    }
    if (reload) {
        var size = newSize;

        if (size == null) {
            size = 1;
        }
        if (size != null) {
            size = '&size=' + size;
        }
        aNewImagePath = '/view/view.shtml?id=14&imagePath=' + escape(imagePath) + size;
        if (other != null)
            aNewImagePath += other;
        /* append preset parameters so that preset postion is selected in drop down list after reload */
        if (presetName != '')
            aNewImagePath += "&gotopresetname=" + escape(presetName);
        else if (gotopresetname != '')
            aNewImagePath += "&gotopresetname=" + escape(gotopresetname);

        if( newCamera != '')
            aNewImagePath += "&camera=" + escape(newCamera);
        reloadPage();
    }
    else if (other != null) {
        selectSource(newCamera, presetName);
    }
}

var ajaxRequest = zXmlHttp.createRequest();
if( ajaxRequest.overrideMimeType )
    ajaxRequest.overrideMimeType( 'text/plain' );
function gotoPreset(camera, presetName)
{
    var now = new Date();
    var speed = parseInt("100", 10);

    var url = "/axis-cgi/com/ptz.cgi?gotoserverpresetname=" + presetName + "&camera=" + camera + "&timestamp="+now.getTime()  +"&speed=" + speed;
    if (ajaxRequest.readyState > 0 || ajaxRequest.readyState < 4)
        ajaxRequest.abort();

    ajaxRequest.open("GET", url, true);
    ajaxRequest.onreadystatechange = ajaxRequest_onchange;

    //Try catch needs to be here beacuse IE7 returns "Operation aborted". If we dont handled that IE7 will hang on send().
    try {
        ajaxRequest.send("");
    } catch (e) { }
}

function ajaxRequest_onchange()
{
    if (typeof(ajaxRequest) == 'object' && ajaxRequest.readyState == 4) {
        if (ajaxRequest.status == 200 && ajaxRequest.responseText.length > 0)
        {
            var errorMessage;
            var responseText = ajaxRequest.responseText;
            if(responseText.indexOf("<HTML>") != -1 || responseText.indexOf("<html>") != -1)
            {
                var headStartPos = responseText.indexOf("<HEAD>");
                if(headStartPos == -1)
                    headStartPos = responseText.indexOf("<head>");
                var headEndPos = responseText.indexOf("</HEAD>")+7;
                if(headEndPos == -1)
                    headEndPos = responseText.indexOf("</head>")+7;

                responseText = responseText.replace(responseText.slice(headStartPos, headEndPos),"");
                var re= /<\S[^>]*>/g;
                errorMessage = responseText.replace(re,"");
            }
            else
                errorMessage = responseText;

            alert(errorMessage);
        }
    }
}

function selectSource(newCamera, presetName) {
    if (!showSourceList)
        return;
    var options = document.WizardForm.videoList.options;
    var i = 0;
    var option;

    while ((option = options[i++]) != null) {
        if (presetName != null) {
            var presetStart = option.value.search('gotopresetname');
            if (presetStart != -1) {
                var preset = option.value.substring(presetStart).split('=');
                if (unescape(preset[1]) == presetName) {
                    option.selected = true;
                    return;
                }
            }
        } else {
            var videoNbr = option.value.match(/\d/);
            if (videoNbr == null && newCamera == 1 || videoNbr == newCamera) {
                option.selected = true;
                return;
            }
        }
    }
}

var seqNext = null;

function doSequence(size) {
    var formSeq = document.listFormSeq;
    var formExt = document.listFormExt;
    var presetForm = document.listFormPreset;
    var seqSources = new Array();
    var seqNumbers = new Array();
    var seqTimes = new Array();
    var cameraNbr;
    var presetName = null;
    var imagePath;
    var next;

    for (var i = 0; i < formSeq['root_Sequence_S0_NbrOfSources'].value; i++) {
        seqSources[i] = formSeq['root_Sequence_S0_Source_S' + i + '_Type'].value;
        seqNumbers[i] = formSeq['root_Sequence_S0_Source_S' + i + '_Number'].value;
        seqTimes[i] = formSeq['root_Sequence_S0_Source_S' + i + '_Time'].value;
    }

    if (seqNext != null) {
        next = seqNext;
    } else {
        next = 0;
    }

    imagePath = "";
    if (seqSources[next] == 'Ext') {
        imagePath = formExt['root_ExternalVideo_E' + seqNumbers[next] + '_ImagePath'].value;
    }
    else if (seqSources[next] == 'Preset') {
        cameraNbr = 1
        presetName = presetForm['root_PTZ_Preset_P0_Position_P' + seqNumbers[next] + '_Name'].value;
    }
    else if (seqSources[next] == 'Quad') {
        cameraNbr = 'quad';
    } else {
        cameraNbr = parseInt(seqNumbers[next], 10) + 1;
    }

    if (imagePath == "") {
        imagePath = '/mjpg/' + cameraNbr + '/video.mjpg';
    }

    var nextNext;
    if (formSeq['root_Sequence_S0_RandomEnabled'].value == "yes")
        nextNext = Math.floor(Math.random() * formSeq['root_Sequence_S0_NbrOfSources'].value);
    else
        nextNext = next + 1;
    if (nextNext >= formSeq['root_Sequence_S0_NbrOfSources'].value)
        nextNext = 0;

    seqNext = nextNext;
    changeView(imagePath, cameraNbr, presetName, size, '&seq=yes&next=' + nextNext + '&sequencetime=' + seqTimes[next]);

    t1 = setTimeout("doSequence(" + size + ")", 1000 * seqTimes[next]);
}


function snapshot(imagepath)
{
    var no = document.WizardForm.amount.value++
    var picturepath;
    var protEnd = imagepath.indexOf("://");
    var camIndex = imagepath.indexOf("camera=");

    if (imagepath.charAt(0) == '/' && protEnd < 0) {
        if (camIndex >= 0) {
            var secondEt = imagepath.indexOf('&', camIndex);
            var camnbr = imagepath.substring(camIndex + 7, (secondEt >= 0 ? secondEt : imagepath.length));
        } else {
            var afterfirstSlash = imagepath.indexOf('/', 1) + 1;
            var secondSlash = imagepath.indexOf('/', afterfirstSlash);
            var camnbr = imagepath.substring(afterfirstSlash, (secondSlash >= 0 ? secondSlash : imagepath.length));
        }
        if (camnbr != "quad" && isNaN(parseInt(camnbr, 10)))
            camnbr = 1;
        picturepath = "/jpg/" + camnbr + "/image.jpg";
    } else {
        if (imagepath.indexOf("h264") >= 0 || imagepath.indexOf("mpeg4") >= 0) {
            var prot = document.location.protocol;
            var imageHost = imagepath.substring(protEnd + 3, imagepath.indexOf('/', protEnd+3));
            var secondEt = imagepath.indexOf('&', camIndex);
            var camnbr = imagepath.substring(camIndex + 7, (secondEt >= 0 ? secondEt : imagepath.length));
            if (camnbr != "quad" && isNaN(parseInt(camnbr, 10)))
                camnbr = 1;
            picturepath = prot + "//" + imageHost + "/jpg/" + camnbr + "/image.jpg";
        } else {
            picturepath = imagepath.replace(/video/, "image").replace(/mjpg/g, "jpg");
        }
    }


    var pictureoptions = "";
    var page = 'snapshot.shtml?picturepath=' + picturepath + pictureoptions;
    var time = new Date()
    var timestamp = time.getTime()

    page += '&timestamp=' + timestamp + '&width=' + 480
    openPopUp(page, 'Take_snapshot' + [no] + '', 480 + 45, 360 + 75 )
}

var statusPtz_count_id;

var statusPtz_periodicRequest;
var statusPtz_periodicRequest_timeout;
var statusPtz_periodicRequest_interval;

var statusPtz_request;
var statusPtz_request_control = "request";
var statusPtz_request_timeout;


var statusPtz_update_id;
var statusPtz_update_response;
var statusPtz_update_min_period = parseInt(20*0.75); //(seconds)
var statusPtz_update_seconds = 0; //(seconds left)
var statusPtz_update_position = 0;
var statusPtz_update_error = "";

function setStatusParams(response)
{
    var re = /\"\-{0,1}\d*\"/g;
    var a = response.match(re);
    var reF = /\"/g;
    if (a != null) {
        statusPtz_update_position   = parseInt(a[0].replace(reF, ""), 10);
        statusPtz_update_seconds    = parseInt(a[1].replace(reF, ""), 10);
        statusPtz_update_min_period = parseInt(a[2].replace(reF, ""), 10);
        statusPtz_update_error      = "";
    } else {
        response = response.replace(/<.*?>|\n|\r/ig, " ").trim();
        response = response.replace(/\s+/ig, " ");
        setStatusParams_error(response);
    }
}

function setStatusParams_error(error)
{
    statusPtz_update_error = error;
    statusPtz_update_min_period    = parseInt(20*0.75);
    statusPtz_update_position      = 0;
    statusPtz_update_seconds       = 0;
}

function updateStatus()
{
    var form = document.ctlstatusform;
    var lbl = document.getElementsByName("label")[0];
    if (statusPtz_update_error.length == 0) {
        form.tleft.value = ((statusPtz_update_seconds == -1) ? "Unlimited" : statusPtz_update_seconds);
        if (statusPtz_update_position == "0") {
            lbl.value = "Request control";
            statusPtz_request_control = "request";
            form.pos.value = "";
            if (statusPtz_update_seconds == "0") {
                form.status.value = "No entry in queue with higher priority than yours.";
                //Restarts poll for position
                if (typeof(getPtzPositions) == "function" && !ptzPosInterval)
                    getPtzPositions();
            } else {
                form.status.value = "Queue contains entry(s) with higher priority than yours.";
            }
        } else {
            form.pos.value = statusPtz_update_position;
            statusPtz_request_control = "drop";
            if (statusPtz_update_position == "1") {
                form.status.value = "You are possessing the control.";
                lbl.value = "Release control";
                //Restarts poll for position
                if (typeof(getPtzPositions) == "function" && !ptzPosInterval)
                    getPtzPositions();
            } else {
                form.status.value = "You are in queue, please wait for your turn.";
                lbl.value = "Leave queue";
            }
        }
    }
    else
    {
        // some error has occurred
        if(form)
        {
            form.status.value = statusPtz_update_error;
            form.pos.value = "";
            form.tleft.value = "";
        }
        ctlStop();
    }
}


function ctlReq()
{
    switch(statusPtz_request_control)
    {
        case "request":
            sendStatusRequest("request")
            break;
        case "drop":
            sendStatusRequest("drop")
            break;
    }
}

function sendStatusRequest(action)
{
    if (!statusPtz_request)
        ctlStart();
    var now = new Date();
    statusPtz_request.open("GET", "/axis-cgi/com/ptzqueue.cgi?control=" + action + "&tagresponse=yes&camera=1&timestamp=" + now.getTime(), true);
    delete now;
    statusPtz_request.onreadystatechange = statusPtz_request_stateChange;
    statusPtz_request.send("");

    statusPtz_request_timeout = window.setTimeout(statusPtz_request_timedout, 10000);
}

function statusPtz_request_stateChange()
{
    window.clearTimeout(statusPtz_request_timeout);
    if (statusPtz_request.readyState == 4) {
        if (statusPtz_request.status == 200) {
            setStatusParams(statusPtz_request.responseText);
        } else if (statusPtz_request.status != 204 && statusPtz_request.status != 1223) {
            setStatusParams_error(statusPtz_request.status + " - " + statusPtz_request.statusText)
        }
        if (statusPtz_request.status != 401) {
            statusPtz_periodicRequest_start();
        }
    } else if (statusPtz_request.readyState == 0) {
        setStatusParams_error("Aborted");
        statusPtz_periodicRequest_start();
    }
}

function statusPtz_request_timedout()
{
    statusPtz_request.abort();
}

function sendPeriodicRequest()
{
    if (statusPtz_periodicRequest.readyState != 0 && statusPtz_periodicRequest.readyState != 4)
        return;
    var now = new Date();
    statusPtz_periodicRequest.open("GET", "/axis-cgi/com/ptzqueue.cgi?control=query&tagresponse=yes&camera=1&timestamp=" + now.getTime(), true);
    delete now;
    statusPtz_periodicRequest.onreadystatechange = statusPtz_periodicRequest_stateChange;
    statusPtz_periodicRequest.send("");

    statusPtz_periodicRequest_timeout = window.setTimeout(statusPtz_periodicRequest_timedOut, 10000);
}

function statusPtz_periodicRequest_stateChange()
{
    window.clearTimeout(statusPtz_periodicRequest_timeout);
    if (statusPtz_periodicRequest.readyState == 4) {
        if (statusPtz_periodicRequest.status == 200) {
            setStatusParams(statusPtz_periodicRequest.responseText);
        } else if (statusPtz_periodicRequest.status != 204 && statusPtz_periodicRequest.status != 1223) {
            setStatusParams_error(statusPtz_periodicRequest.status + " - " + statusPtz_periodicRequest.statusText)
        }
        updateStatus();
    } else if (statusPtz_periodicRequest.readyState == 0) {
        setStatusParams_error("Aborted");
        updateStatus();
    }
}

function statusPtz_periodicRequest_timedOut()
{
    statusPtz_periodicRequest.abort();
}

function statusPtz_periodicRequest_start()
{
    if (statusPtz_periodicRequest_interval)
        window.clearInterval(statusPtz_periodicRequest_interval);
    if (statusPtz_periodicRequest_timeout)
        window.clearTimeout(statusPtz_periodicRequest_timeout);

    sendPeriodicRequest();
    statusPtz_periodicRequest_interval = window.setInterval(sendPeriodicRequest, statusPtz_update_min_period * 1000);
}

function handleCtlReq()
{
    window.clearTimeout(statusPtz_update_id);
    sendStatusRequest("request");
    // restart timeout to be sure update will be done in time.
    statusPtz_update_id = window.setTimeout(updateStatus, 2000);
}

function handleCtlDrop(form)
{
    window.clearInterval(statusPtz_count_id);
    window.clearTimeout(statusPtz_update_id);
    sendStatusRequest("drop");
    // restart - but wait a while to be sure the above form is sent.
    statusPtz_update_id = window.setTimeout(ctlStart, 500);
}

function ctlStart()
{
    if (typeof(zXmlHttp) == "undefined") {
        window.setTimeout(ctlStart, 500);
        return;
    }
    statusPtz_periodicRequest = zXmlHttp.createRequest();
    if( statusPtz_periodicRequest.overrideMimeType )
        statusPtz_periodicRequest.overrideMimeType( 'text/plain' );
    statusPtz_request = zXmlHttp.createRequest();
    if( statusPtz_request.overrideMimeType )
        statusPtz_request.overrideMimeType( 'text/plain' );

    statusPtz_periodicRequest_start();

    startCountDown();
}

function ctlRepeat()
{
    statusPtz_periodicRequest_start();
}

function ctlStop()
{
    // reset label + action
    var lbl = document.getElementsByName("label")[0];
    if(lbl)
        lbl.value = "Request control";
    statusPtz_request_control = "request";
    // stop timers
    window.clearInterval(statusPtz_count_id);
    window.clearTimeout(statusPtz_update_id);
}

function startCountDown()
{
    statusPtz_count_id = window.setInterval(countDown, 1000);
}

function countDown()
{
    var form = document.ctlstatusform;
    if (form && form.tleft.value != "")
    {
        var t = parseInt(form.tleft.value, 10);
        if (t > 0)
        {
            form.tleft.value = t - 1;
        }
    }
}
function movepic(img_name, img_src)
{
    document[img_name].src = img_src;
}

function auto(Path)
{
    parent.frames[1].location = Path
}

function AbsoluteOrRelative(form)
{
    var url = document.URL;
    if (form.AbsOrRel.selectedIndex == 0)
        var relative = "no";
    else
        var relative = "yes_no_cross";
    if (url.indexOf("?") == -1) {
        url += "?relative=" + relative;
    } else if (url.indexOf("relative=") == -1) {
        url += "&relative=" + relative;
    } else {
        var searchStr = "relative=";
        var replaceStr = "relative=" + relative;
        var re = new RegExp(searchStr , "g");
        url = url.replace(re, replaceStr);
    }
    document.location = url;
} 	 



var stillImagePath;
var fullImagePath = "";
var use_activex = 0;
var use_java = 0;
var use_spush = 0;
var use_flash = 0;
var use_still = 0;
var use_quicktime = 0;
var rotation_in_url = "";
var rotation_in_parhand = "0";
var resolution_in_url = "";
var resolution_in_parhand = "480x360";
var streamprofile_in_url = "";
var recording = "";
var zoom_fact = "";
var ShowAMCToolbar = "yes";

function IPAddress(path)
{
    var str = path.slice(7);
    var anArray = str.split('/');

    if (anArray[0].split(":").length > 1)
    {
        anArray[0] = "[" + anArray[0] + "]";
    }
    return anArray[0];
}

function video(imagepath)
{
    var resolution = 0;
    var width = 0;
    var height = 0;
    var isTilted = false;
    
    if (imagepath.indexOf("rotation=") != -1) {
        if (rotation_in_url == "90" || rotation_in_url == "270") {
            isTilted = true;
        } else if (rotation_in_url == "" && (rotation_in_parhand == "90" || rotation_in_parhand == "270")) {
            isTilted = true;
        }
    } else {
        if (rotation_in_parhand == "90" || rotation_in_parhand == "270") {
            isTilted = true;
        }
    }

    if (imagepath.indexOf("resolution=") != -1)
    {
        var resStart = imagepath.indexOf("resolution=")
        var resStop = imagepath.indexOf("&", resStart)
        if (resStop == -1)
            resStop = imagepath.length
        resolution = imagepath.substring(resStart + 11, resStop);
        if (resolution.indexOf('x') != -1)
        {
            width = parseInt(resolution.substring(0, resolution.indexOf('x')), 10);
            height = parseInt(resolution.slice((resolution.indexOf('x') + 1)), 10);
        }
    }
    if (!(width > 0 && height > 0))
    {
        if (typeof(img_width) == "number" && typeof(img_height) == "number" && img_width > 0 && img_height > 0)
        {
            width = img_width;
            height = img_height;
            resolution = width + 'x' + height;
        }
        else if ((imagepath.indexOf("mpeg4") != -1) || (imagepath.indexOf("h264") != -1))
        {
            width = parseInt("480", 10);
            height = parseInt("360", 10);
            resolution = width + 'x' + height;
        }
        else
        {
            width = parseInt("480", 10);
            height = parseInt("360", 10);
            resolution = width + 'x' + height;
        }
    }

    if ('1' != '1')
    {
        var strSize = '1';
        var sizeNum = 0;
        //floating number try to parse it
        if( strSize.indexOf('.') != -1  )
        {
            sizeNum = parseFloat( strSize );
            //might be the wrong decimal separation
            if( sizeNum == 0 || isNaN( sizeNum ) )
            {
                strSize = strSize.replace( ".", "," );
                sizeNum = parseFloat( strSize );
            }
        }
        else if( strSize.indexOf(',') != -1  )
        {
            sizeNum = parseFloat( strSize );
            //might be the wrong decimal separation
            if( sizeNum == 0 || isNaN( sizeNum ) )
            {
                strSize = strSize.replace( ",", "." );
                sizeNum = parseFloat( strSize );
            }
        }
        else
        {
            sizeNum = parseInt( strSize, 10 );
        }
        width = width * sizeNum;
        height = height * sizeNum;
    }   
    var doubleLines = false;
    var imagepath_has_resolution = (imagepath.indexOf("resolution=") >= 0);
    var imagepath_uses_2cif = (imagepath.indexOf("resolution=2CIFEXP") == -1 && imagepath.indexOf("resolution=2CIF") != -1);

    var streamprofile_has_resolution = false;
    var streamprofile_uses_2cif = false;
    if ((imagepath.indexOf("streamprofile=") != -1))
    {
        var videoFormat = document.getElementsByName("videoFormat")[0];
        if (videoFormat)
        {
            var streamprofile_nr = videoFormat.options[videoFormat.selectedIndex].value;
            var streamprofile_param = document.getElementsByName("root_StreamProfile_S" + streamprofile_nr + "_Parameters")[0];
            if (streamprofile_param)
            {
                streamprofile_has_resolution = (streamprofile_param.value.indexOf("resolution=") >= 0);
                streamprofile_uses_2cif = (streamprofile_param.value.indexOf("resolution=2CIFEXP") == -1 && streamprofile_param.value.indexOf("resolution=2CIF") != -1);
            }
        }
    }
    if (recording != "yes" && resolution_in_url == "" && streamprofile_in_url == "" && !imagepath_has_resolution && !streamprofile_has_resolution && resolution_in_parhand.toLowerCase() == "2cif"
        || imagepath_uses_2cif || streamprofile_uses_2cif)
    {
        doubleLines = true;
    }

    if (width > height)
    {
        height *= (doubleLines ? 2 : 1);
        if (isTilted)
        {
            var tmp = width;
            width = height;
            height = tmp;
        }
    }
    else
    {
        width *= (doubleLines ? 2 : 1);
    }
    resolution = width + 'x' + height;

    var width_height = 'width="' + width + '" height="' + height + '"';
    var viewer = "";  
    if (viewer == "")
    {
        if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.platform != "MacPPC") && (navigator.platform != "Mac68k"))
        {
            viewer = "activex";
        }
        else
        {
            viewer = "spush";
        }
    }

    if (viewer.indexOf("activex") != -1)
    {
        use_activex = 1;
    }
    if (viewer.indexOf("spush") != -1)
    {
        use_spush = 1;
    }
    if (viewer.indexOf("flash") != -1)
    {
        use_flash = 1;
    }
    if (viewer.indexOf("quicktime") != -1)
    {
        use_quicktime = 1;
    }
    if ((imagepath.indexOf("videocodec=mpeg4") != -1) || (imagepath.indexOf("videocodec=h264") != -1))
    {
        if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.platform != "MacPPC") && (navigator.platform != "Mac68k"))
        {
            use_quicktime = 0;
            use_activex = 1;
        }
        else
        {
            use_quicktime = 1;
            use_spush = 0;
            use_still = 0;
        }
    }
    else
    {
        if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.platform != "MacPPC") && (navigator.platform != "Mac68k"))
        {
            use_quicktime = 0;
            use_activex = 1;
        }
        else
        {
            use_quicktime = 0;
            use_spush = 1;
            use_still = 0;
        }
    }
    if (viewer.indexOf("java") != -1)
    {
        if ((imagepath.indexOf("mpeg4") == -1) && (imagepath.indexOf("h264") == -1))
        {
            use_java = 1;
            use_activex = 0;
            use_spush = 0;
            use_flash = 0;
            use_still = 0;
            use_quicktime = 0;
        }
    }
    var obey_still = true;
    var ExcludeList = new Array("ptz.shtml", "vmd.shtml", "playWindow.shtml", "streampreview.shtml");
    var ppath = window.location.pathname;
    var pcurrent = ppath.substring(ppath.lastIndexOf('/') + 1);

    for (var i=0; i<ExcludeList.length; i++)
    {
        if (ExcludeList[i] == pcurrent)
        {
            obey_still = false;
            break;
        }
    }

    if ((obey_still && (viewer.indexOf("still") != -1) ) || !(use_activex || use_spush || use_flash || use_java || use_quicktime))
    {
        if ((imagepath.indexOf("mpeg4") == -1) && (imagepath.indexOf("h264") == -1))
        {
            use_still = 1;
            use_quicktime = 0;
            use_spush = 0;
            use_activex = 0;
        }
        else
        {
            if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.platform != "MacPPC") && (navigator.platform != "Mac68k"))
            {
                use_activex = 1;
            }
            else
            {
                use_quicktime = 1;
            }
        }
    }
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("applewebkit/") != -1)
    {
        var pos = agent.indexOf("applewebkit/") + 12
        var webKitVersion = parseInt(agent.substring(pos, agent.indexOf(" ", pos)), 10)
        if ((use_spush) && (webKitVersion < 416))
        {
            use_java = 1;
            use_spush = 0;
        }
    }
    if (use_activex)
    {
        if (ShowAMCToolbar == "yes")
            height = height + 54;
        var notAuthorizedText = "The installation of the MPEG-4 Decoder has been disabled. Contact the Administrator of this AXIS M1033-W Network Camera.";
        var notAuthorizedH264Text = "The installation of the H.264 Decoder has been disabled. Contact the Administrator of this AXIS M1033-W Network Camera.";
        var authorizedText = "Click here to install or upgrade the MPEG-4 Decoder.";
        var authorizedH264Text = "Click here to install or upgrade the H.264 Decoder.";
        var installDecoderText1 = "<b>MPEG-4 Decoder</b>, which enables streaming video in Microsoft Internet Explorer, has not been installed or could not be registered on this computer.";
        var installDecoderH264Text1 = "<b>The H.264 Decoder</b>, which enables streaming video in Microsoft Internet Explorer, has not been installed or could not be registered on this computer.";
        var installDecoderText2 = "To install or upgrade the MPEG-4 Decoder, you must have Administration rights on this computer and you must answer Yes <br>when asked if you wish to allow the installation. AXIS M1033-W Network Camera can also be configured to show still images.";
        var installDecoderH264Text2 = "To install or upgrade the H.264 Decoder, you must have Administration rights on this computer and you must answer Yes <br>when asked if you wish to allow the installation. AXIS M1033-W Network Camera can also be configured to show still images.";
        var notAuthorizedAacText = "The installation of the AAC Decoder has been disabled. Contact the Administrator of this AXIS M1033-W Network Camera.";
        var authorizedAacText = "Click here to install or upgrade the AAC Decoder.";
        var installAacDecoderText1 = "<b>AAC Decoder</b>, which enables streaming AAC audio in Microsoft Internet Explorer, has not been installed or could not be registered on this computer.";
        var installAacDecoderText2 = "To install or upgrade the AAC Decoder, you must have Administration rights on this computer and you must answer Yes <br>when asked if you wish to allow the installation.";

        var installText1 = "which enables streaming";
        var videoText = "video";
        var audioText = "audio";
        var installText2 = "in Microsoft Internet Explorer, has not been installed<br>or could not be registered on this computer.";
        var installText3 = "To install or upgrade the";
        var installText4 = ", you must have Administration rights on this computer and you must answer Yes <br>when asked if you wish to allow the installation.<br>Click on the yellow banner to begin the installation. If the banner is not visible, turn off pop-up blockers<br>from the Tools menu in Microsoft Internet Explorer.<br>AXIS M1033-W Network Camera can also be configured to show still images.";
        //document.write("<center>");
        DrawAMC("AXIS M1033-W", "AXIS Media Control", height, width, imagepath, "DE625294-70E6-45ED-B895-CFFA13AEB044", "AMC.cab", "6&#44;0&#44;6&#44;7", ShowAMCToolbar, "no", "no", "1", "no", "no", "", "", "no", "554", "no", installText1, videoText, installText2, installText3, installText4, "0", (recording == "yes" ? "recording" : zoom_fact), "yes", "");

        if (imagepath.indexOf("h264") != -1)
        {
            InstallDecoder("AXIS M1033-W", "H.264 Decoder", "7340F0E4-AEDA-47C6-8971-9DB314030BD7", "NotFound.cab", "3&#44;0&#44;2&#44;0", "yes", notAuthorizedH264Text, authorizedH264Text, installDecoderH264Text1, installDecoderH264Text2);
        }
        InstallFilter("AXIS M1033-W", "File Writer", "24E31783-87EF-4765-A430-4C8A983ACE16", "2&#44;0&#44;23&#44;0", "AMC.cab", installText1, videoText, installText2, installText3, installText4);
        if ( String( getHost(imagepath) ).indexOf("rtsp") != -1 )
        {
            InstallFilter("AXIS M1033-W", "Overlay Mixer Filter", "03825DEB-4BC8-4344-ACF7-EC390A8A5A21", "1&#44;1&#44;4&#44;0", "AMC.cab", installText1, videoText, installText2, installText3, installText4);
            InstallFilter("AXIS M1033-W", "MPEG RTP Reader", "67B1A88A-B5D2-48B1-BF93-EB74D6FCB077", "3&#44;0&#44;4&#44;5", "AMC.cab", installText1, videoText, installText2, installText3, installText4);
            InstallFilter("AXIS M1033-W", "Image Notify Component", "0173EEF5-1FDE-479C-9F24-34C3CB0B3243", "1&#44;2&#44;1&#44;0", "AMC.cab", installText1, videoText, installText2, installText3, installText4);
        } 

        //document.write("</center>");
        //document.write("<br>");
    }
    if (use_spush)
    {
        if (recording != "yes" && ShowAMCToolbar == "yes")
        {
            //document.write('<table cellspacing=0 cellpadding=0 border=0 style="min-width:260"><tr><td colspan="3" align="center">');
        }
        var output = '<img id="stream" SRC="' + imagepath + '" ' + width_height;
        var view_NoImageTxt = "If no image is displayed, there might be too many viewers, or the browser configuration may have to be changed. See help for detailed instructions on how to do this."
        output += ' border=0 ALT="' + view_NoImageTxt + '">';
        output += '<br>';
        //document.write(output);

        $('#dvVideo').html(output);
        if (recording != "yes" && ShowAMCToolbar == "yes")
        {
            if (document.getElementById("stream"))
                fullImagePath = document.getElementById("stream").src
            else
                fullImagePath = "";
            stillImagePath = "/jpg/1/image.jpg"
            if (imagepath.indexOf("/axis-cgi/mjpg/video.cgi") != -1)
            {
                var searchStr = "/axis-cgi/mjpg/video.cgi"
                var replaceStr = "/jpg/1/image.jpg"
                var re = new RegExp(searchStr , "g")
                stillImagePath = imagepath.replace(re, replaceStr)
            }

            //document.write('</td></tr>');
            //document.write('<tr><td colspan="3" align="center" style="white-space:nowrap">' );
            //document.write('<div class="cornerVideoBox"><div class="content">');
            //document.write('<table cellspacing=0 border=0 width="100%" id="videoItems" class="shownItems">');
            //document.write('<tr height="32">');
            //document.write("<td align=\"left\" width=\"40\"><a id=\"stopBtn\" href=\"javascript:void(0)\" onclick=\"stopStartStream('" + stillImagePath + "')\"><img src=\"/pics/stop_blue_button_27x27px.gif\" width=\"27\" height=\"27\" alt=\"Stop stream\" title=\"Stop stream\" border=\"0\" onmouseover=\"javascript:btnShiftCls( this, true )\" onmouseout=\"javascript:btnShiftCls( this, false )\" /></a>");
            //document.write("<a id=\"playBtn\" style=\"display:none;\" href=\"javascript:void(0)\" onclick=\"stopStartStream('" + fullImagePath + "')\"><img src=\"/pics/play_blue_button_27x27px.gif\" width=\"27\" height=\"27\" alt=\"Start stream\" title=\"Start stream\" border=\"0\" onmouseover=\"javascript:btnShiftCls( this, true )\" onmouseout=\"javascript:btnShiftCls( this, false )\" /></a></td></tr></table>");
            //document.write('</div><div class="footerLeft"><div class="footerRight"></div></div></div>');
            //document.write('</td></tr></table>');
        }
    }

    if (use_quicktime)
    {
        var DisplayWidth = width;
        var DisplayHeight = height + (ShowAMCToolbar == "yes" ? 16 : 0 );
        var rtspPort = "554";
        if (imagepath.indexOf("://") == -1)
        {
            if (location.hostname.split(":").length > 1)
            {
                //IPv6
                var MediaURL = "rtsp://[" + location.hostname + "]:" + rtspPort + imagepath 
            }
            else
            {
                //IPv4
                var MediaURL = "rtsp://" + location.hostname + ":" + rtspPort + imagepath 
            }
        }
        else
        {
            var MediaURL = imagepath
        }

        var output = "";
        output  = '<OBJECT CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width=' + DisplayWidth + ' height=' + DisplayHeight + ' CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab">';
        output += '<param name="src" value="/view/AxisMoviePoster.mov">';
        output += '<param name="autoplay" value="true">';
        output += '<param name="controller" value="' + (ShowAMCToolbar == "yes" ? true : false) + '">';
        output += '<param name="qtsrc" value="' + MediaURL + '">';
        output += '<embed src="/view/AxisMoviePoster.mov" width=' + DisplayWidth + ' height=' + DisplayHeight + ' qtsrc="' + MediaURL + '" autoplay="true" controller="' + (ShowAMCToolbar == "yes" ? true : false) + '" target="myself" PLUGINSPAGE="http://www.apple.com/quicktime/download/"></embed>';
        output += '</OBJECT>';
        document.write(output);
    }

    if (use_flash)
    {
        var view_NeedFlashPluginTxt = "You need a Shockwave Flash plugin, get it from:"
        document.write('<EMBED src="/axis-cgi/mjpg/video.swf?resolution=' + resolution +'&camera=1" ' +
        'quality=high bgcolor=#000000 ' + width_height +
        ' TYPE="application/x-shockwave-flash" swLiveConnect=TRUE' +
        ' PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">' +
        '</EMBED>' +
        '<NOEMBED>' + view_NeedFlashPluginTxt +
        '<a href="http://www.macromedia.com/shockwave/download/">Macromedia</a>.' +
        '</NOEMBED><br>');
    }

    if (use_java)
    {
        if (resolution.indexOf("x") != 0 && isTilted)
        {
            var tmpW = parseInt(resolution.split("x")[0], 10);
            var tmpH = parseInt(resolution.split("x")[1], 10);
            if (tmpW < tmpH)
            {
                resolution = tmpH + "x" + tmpW;
            }
        }
        var playerWidth = width;
        var playerHeight = height;
        if (ShowAMCToolbar == "yes")
        {
            if (playerWidth < 300)
                playerWidth = 300;
            playerHeight += 105;
        }

        var addr = "";
        if (imagepath.indexOf("http") != -1)
        {
            var addrEnd = imagepath.indexOf("/", 8);
            addr = imagepath;
        }
        //init AMA applet
        document.write('<OBJECT name="AMA" codeBase="/java/ama" archive="ama.jar" code="ama.MediaApplet" codetype="application/x-java-applet;version=1.4" type="application/x-java-applet;version=1.4" width="' + playerWidth + '" height="' + playerHeight + '">');
        document.write('<PARAM NAME="name" VALUE="AMA">');
        document.write('<PARAM NAME="codebase" VALUE="/java/ama">');
        document.write('<PARAM NAME="archive" VALUE="ama.jar">');
        document.write('<PARAM NAME="code" VALUE="ama.MediaApplet">');
        document.write('<PARAM NAME="codetype" VALUE="application/x-java-applet;version=1.4">');
        document.write('<PARAM NAME="type" VALUE="application/x-java-applet;version=1.4">');
        document.write('<PARAM NAME="mayscript" VALUE="false">');
        document.write('<PARAM NAME="ama_cgi-path" VALUE="axis-cgi">');
        document.write('<PARAM NAME="cache_archive" VALUE="ama.jar">');
        document.write('<PARAM NAME="cache_version" VALUE="1.1.9.0">');
        document.write('<PARAM NAME="ama_plugins" VALUE="">');
        var img_opts = "";
        if (imagepath.indexOf("?") > 0)
        {
            img_opts = imagepath.substring(imagepath.indexOf("?"));
            imagepath = imagepath.substring(0, imagepath.indexOf("?"));
        }
        if (img_opts.indexOf("camera=") == -1)
            img_opts += (img_opts.length > 0 ? "&" : "?") + "camera=1";

        if (img_opts.indexOf("resolution=") == -1)
            img_opts += (img_opts.length > 0 ? "&" : "?") + "resolution=" + resolution;

        if (rotation_in_parhand != "" && img_opts.indexOf("rotation=") == -1)
            img_opts += (img_opts.length > 0 ? "&" : "?") + "rotation=" + rotation_in_parhand;

        document.write('<PARAM NAME="ama_url" VALUE="' + imagepath + img_opts + '">');
        document.write("Your browser does not support Java")
        document.write('</OBJECT><br>');
    }

    if (use_still)
    {
        var picturepath;
        var tmpAddress = imagepath.match(/\/\/(.+?)\//g);

        if (tmpAddress == null)
            tmpAddress = imagepath.match(/(.+?)\//g);

        if (imagepath.charAt(0) == '/' || tmpAddress == null)
            picturepath = "/jpg/1/image.jpg";
        else
            picturepath = document.location.protocol + "//" + tmpAddress + "/jpg/1/image.jpg";

        document.write('<img SRC="' + picturepath + '" border=0 ' + width_height +'><br>');
    }
}

function stopStartStream(path)
{
    try {
        var orgPath = path;
        theDate = new Date();
        if (path.indexOf("?") != -1)
            path += "&"
        else
            path += "?"
        path += "timestamp=" + theDate.getTime()
        if (use_spush)
        {
            if (recording != "yes")
                stopStartBtnShift( orgPath );
            document.getElementById("stream").src = path;
        }
        else if (use_activex)
        {
            document.Player.MediaURL = path;
        }
    }
    catch(e) {}
}


function stopStartBtnShift( orgPath )
{
    if( orgPath == stillImagePath )
    {
        document.getElementById("stopBtn").style.display = 'none';
        document.getElementById("playBtn").style.display = 'inline';
    }
    else
    {
        document.getElementById("stopBtn").style.display = 'inline';
        document.getElementById("playBtn").style.display = 'none';
    }
}

function btnShiftCls( btnEl, over )
{
    if( btnEl ){
        btnEl.className = ((over)?'hover':'');
    }
}


function goto_camera(cam)
{
    cam += ''; // cam value needs to be a string, not an integer, for cam.length to work.
    cam = '';

    var imagePath;
    newVideoFormatCam(cam);
}

function getStreamProfileNbr()
{
    return document.WizardForm.videoFormat[document.WizardForm.videoFormat.selectedIndex].value;
}

function getStreamProfileName()
{
    try {
        var nbr = getStreamProfileNbr();
        return ( isNaN( nbr )?"":document.profileForm["root_StreamProfile_S" + nbr + "_Name"].value );
    }
    catch(e) {
        alert("The selected profile is no longer valid.\nThe list has been updated with valid profiles\nso you may select another one now.");
    }
}

function getStreamProfileParameters()
{
    try {
        var nbr = getStreamProfileNbr();
        return ( isNaN( nbr )?"":document.profileForm["root_StreamProfile_S" + nbr + "_Parameters"].value );
    }
    catch(e) {
        alert("The selected profile is no longer valid.\nThe list has been updated with valid profiles\nso you may select another one now.");
    }
}


    
//"DrawTB('no', '/mjpg/video.mjpg', '1', '0', 'no', 'no', 'true', getStreamProfileNbr());initSliders&#40;&#41;&#59;" onResize="initSliders&#40;&#41;&#59;">


var t1;
var seqOn = "no";

function sequence()
{
    var size;
    if (seqOn == 'no') {
        seqOn = 'yes';
        size = 1;
        doSequence(size);
    } else {
        clearTimeout(t1);
        seqOn = 'no';
        link = document.URL;
        if (link.indexOf('seq=yes' != -1)) {
            var regexp = /seq=yes&/;
            link = link.replace(regexp, "");
        }
        document.location = link;
    }
    return;
}

//var ext_sources = 0;
//ext_sources = document.listFormExt.elements.length/3;

//// Calculate the number of sequence sources that are supported by this browser
//var seq_sources = 0;
//if (document.listFormSeq.elements.length > 0 )  {
//    if (browser == "IE") {
//        seq_sources = document.listFormSeq['root_Sequence_S0_NbrOfSources'].value;
//    } else {
//        for (var i = 0; i < document.listFormSeq['root_Sequence_S0_NbrOfSources'].value; i++) {
//            var type = document.listFormSeq['root_Sequence_S0_Source_S' + i + '_Type'].value;
//            if (type != 'Ext') {
//                seq_sources++;
//            } else {
//                var num = document.listFormSeq['root_Sequence_S0_Source_S' + i + '_Number'].value;
//                var path = document.listFormExt['root_ExternalVideo_E' + num + '_ImagePath'].value;
//                if ((path.indexOf("mpeg4") == -1) || (path.indexOf("h264") == -1)) {
//                    seq_sources++;
//                }
//            }
//        }
//    }
//}


// Workaround for IE7 that doesn't handle location.host correctly with IPv6.
//var address = "";
//var axoper_new = "http";
//var axadmin_new = "http";
//var user_realm = 2;

//var the_hostname = document.location.hostname
//if ((document.location.protocol == 'http:') && ((((axoper_new == 'https') || (axoper_new == 'both')) && user_realm != 1 ) || (axadmin_new == 'https') || (axadmin_new == 'both'))) {
//    var the_https_port = '443'
//    address = 'https://'
//    address += the_hostname
//    if (the_https_port != '443') {
//        address += ':' + the_https_port
//    }
//}

//document.write(address)

// Functions to include to handle selection of stream profiles
var globProfileBase = "root_StreamProfile_S";

function profileSelectUrlpars(listform,editform)
{
    group = editform.streamprofile.options[editform.streamprofile.selectedIndex].value;
    if (group == "none") {
        return "";
    }
    name = globProfileBase + group + "_Parameters";
    return listform[name].value;
}

function profileParseOption(optionString,option)
{
    var res = "";
    option += "=";
    var start = optionString.indexOf(option);
    if (start >= 0) {
        start += option.length;
        var end = optionString.indexOf("&", start);
        if (end >= 0)
            res = optionString.substring(start, end);
        else
            res = optionString.substring(start);
    }
    return res;
}

function profileCurrentMax(listform)
{
    var grpMax = 0;
    for (i = 0; i < listform.elements.length; i++) {
        var par = listform.elements[i].name;
        pos1 = globProfileBase.length;
        pos2 = par.indexOf('_', globProfileBase.length);
        var grp = 1 * (par.substring(pos1, pos2));
        if (grp > grpMax) {
            grpMax = grp;
        }
    }
    return grpMax;
}

function profileOptionsWrite(listform,selopt)
{
    var elemName, name, cls, optionValue;

    var grpMax = profileCurrentMax(listform);
    for (var grp = 0; grp <= grpMax; grp++) {
        elemName = globProfileBase + grp + "_Name";
        if (document.getElementsByName(elemName).length > 0) {
            name = listform[elemName].value;
            cls = "";
            optionValue = grp;
            if (name == selopt) {
                document.write("<option value=\"" + optionValue + "\" selected=\"selected\""+cls+">" + name + "</option>");
            } else {
                document.write("<option value=\"" + optionValue + "\""+cls+">" + name + "</option>");
            }
        }
    }
}

function profileSelectWrite(listform,selopt)
{
    var grpMax = profileCurrentMax(listform);

    /* Write start */
    document.write("<select name='streamprofile' size='1'>");
    document.write("<option selected value='none'>-----------</option>");

    profileOptionsWrite(listform,selopt);

    /* Write end */
    document.write('</select>');
}

function getProfileGrp(listform,theProfile)
{
    var grpMax = profileCurrentMax(listform);
    var grp = "Profile group not found"
    for (i=0; i<=grpMax; i++) {
        elemName = globProfileBase + i + "_Name";
        if (document.getElementsByName(elemName).length > 0) {
            name = listform[elemName].value;
            if (name == theProfile)
                var grp = i
        }
    }
    return grp;
}


function newVideoFormat()
{
    newVideoFormatCam('1');
}

function newVideoFormatCam(cam)
{
    var url = "";
    var options = "";
    var selvalue = document.WizardForm.videoFormat[document.WizardForm.videoFormat.selectedIndex].value;

    if( selvalue == "#UNSELECTABLE#")
    {
        return;
    }

    if (selvalue == "MJPEG") {
        url = '/mjpg/video.mjpg';
    }  else if (selvalue == "MPEG4") {
        url = '/axis-media/media.amp?videocodec=mpeg4';
    } else if (selvalue == "H264") {
        url = '/axis-media/media.amp?videocodec=h264';
    } else {
        var val = document.profileForm["root_StreamProfile_S" + selvalue + "_Name"].value;
        if (val) {
            options = "&streamprofile=" + val;
            val = profileParseOption(document.profileForm["root_StreamProfile_S" + selvalue + "_Parameters"].value,"audio");
            if (val == "1") {
                options += "&audio=yes";
            } else if (val == "0") {
                options += "&audio=no";
            }
        }
    
        var enc = profileParseOption(document.profileForm["root_StreamProfile_S" + selvalue + "_Parameters"].value,"videocodec");
        if ((enc == "jpeg") || (enc == "")) {
            url = '/mjpg/video.mjpg';
        }  else if ((enc == "mpeg4")) {
            url = '/axis-media/media.amp?videocodec=mpeg4';
        }  else if ((enc == "h264")) {
            url = '/axis-media/media.amp?videocodec=h264';
        }
    }
    changeView(url, cam, '', '1', options);
}

// Draw the format drop down


function writeFormatOptions()
{
    var profileform = document.profileForm;

    document.write('<option value="MJPEG" selected>Motion JPEG</option>');
    document.write('<option value="H264">H.264</option>');
    profileOptionsWrite(profileform,"mjpeg+");
}

var form;
function slider_onChange(name)
{
    if (name.substr(0, 10) == 'lightlevel')
    {
        var submitform = document.getElementById('form'+name);
        if (submitform)
        {
            input = document.getElementById(name);
            submitform.level.value = input.value;
            submitform.submit();
        }
    }
}

// Draw the light buttons
//form = document.lightsForm;
//var LightStateStr = "0";
//var LightState = LightStateStr.split(",");
//var lightlevel0Slider = null;

function initSliders()
{
}

function validateLightLevel0() {
    var value = parseInt(document.getElementById("lightlevel0").value, 10);
    return (value != NaN && value >= 0 && value <= 100);
}

//{
//    var k = 0;

//    try {
//        var LightName = form["root_LightControl_L" + k + "_Name"].value;
//        var unit = form["root_LightControl_L" + k + "_PulseTime"].value;
//        var buttontype = form["root_LightControl_L" + k + "_Button"].value;
//        var activate = form["root_LightControl_L" + k + "_Activate"].value;
//        var inactivate = form["root_LightControl_L" + k + "_Inactivate"].value;

//        for (j = unit.length-1; j >= 0; j--) {
//            if (unit.charAt(j) == "h") {
//                var value = parseInt(unit, 10) * 10;
//                var displayValue = parseFloat(unit)/100;
//                break;
//            } else if (unit.charAt(j) == "s") {
//                var value = parseInt(unit, 10) * 1000;
//                var displayValue = parseInt(unit, 10);
//                break;
//            }
//        }

//        if (buttontype != "none") {
//            drawBoxHeader(LightName);
//            if (buttontype == "actinact") {
//                drawBoxToggleButton('/pics/on_blue_button_27x27px.gif',
//                                    '/pics/on_blue_pressed_button_27x27px.gif',
//                                    "Activate " + [LightName],
//                                    '/axis-cgi/io/lightcontrol.cgi?action=L' + [k + 1] + ':'+ activate,
//                                    'buttonOn0' + k,
//                                    '/pics/off_blue_button_27x27px.gif',
//                                    '/pics/off_blue_pressed_button_27x27px.gif',
//                                    "Inactivate " + [LightName],
//                                    '/axis-cgi/io/lightcontrol.cgi?action=L' + [k + 1] + ':'+ inactivate,
//                                    'buttonOff0' + k,
//                                    LightState[k] != '0');

//            } else if (buttontype == "pulse") {
//                drawBoxButton('/pics/pulse_blue_button_27x27px.gif',
//                              "Pulse&nbsp;" + [LightName] + " for " + [displayValue] + " second(s)",
//                              '/axis-cgi/io/lightcontrol.cgi?action=L' + [k+1] + ':' + activate + ',' + 'w'+value + ','+inactivate,
//                              'PulseOff0' + [k],
//                              '/pics/pulse_blue_button_pressed_27x27px.gif');
//            } else if (buttontype == "slider") {
//                var id = 'lightlevel'+k;
//                document.write('<td nowrap valign="middle">' +
//                               '<img src="/pics/slider_left.gif" width="14" height="14" id="'+id+'-left">'+
//                               '<img src="/pics/slider_bg_151x14px.gif" width="151" height="14" id="'+id+'-bg">'+
//                               '<img src="/pics/slider_handle.gif" width="5" height="14" id="'+id+'-handle" style="display: none">'+
//                               '<img src="/pics/slider_right.gif" width="14" height="14" id="'+id+'-right">'+
//                               '</td>');
//                document.write('<td><input type="hidden" id="'+id+'" name="'+id+'" size="4" value="'+Math.round(parseFloat(LightState[k]))+'"></td>');
//                document.getElementById(id+'-handle').style.display = "inline";
//            }

//            drawBoxFooter();
//            drawBoxSpacer();
//        }
//    }
//    catch(e) {}
//}

// Draw the output buttons

//form = document.outputsForm;


//var OutputName = "";
//var unit = "";
//var value = 0;
//var displayValue = 0.0;
//var IO_Status = new Array(3);
//IO_Status[0] = "output";
//IO_Status[1] = "output";
//IO_Status[2] = "output";
//var IOStateO = "0";
//for (k = 0; k < (1+2); k++) {
//    if (IO_Status[k] == "output") {
//        try {
//            var OutputName = form["root_IOPort_I" + k + "_Output_Name"].value;
//            var unit = form["root_IOPort_I" + k + "_Output_PulseTime"].value;
//            var buttontype = form["root_IOPort_I" + k + "_Output_Button"].value;
//            for (j = unit.length-1; j >= 0; j--) {
//                if (unit.charAt(j) == "h") {
//                    var value = parseInt(unit, 10) * 10;
//                    var displayValue = parseFloat(unit)/100;
//                    break;
//                } else if (unit.charAt(j) == "s") {
//                    var value = parseInt(unit, 10) * 1000;
//                    var displayValue = parseInt(unit, 10);
//                    break;
//                }
//            }

//            if (buttontype != "none") {
//                drawBoxHeader(OutputName);
//                if (buttontype == "actinact") {
//                    drawBoxToggleButton('/pics/on_blue_button_27x27px.gif',
//                                        '/pics/on_blue_pressed_button_27x27px.gif',
//                                        "Activate " + [OutputName],
//                                        '/axis-cgi/io/port.cgi?action=' + [k + 1] + ':/',
//                                        'buttonOn0' + k,
//                                        '/pics/off_blue_button_27x27px.gif',
//                                        '/pics/off_blue_pressed_button_27x27px.gif',
//                                        "Inactivate " + [OutputName],
//                                        '/axis-cgi/io/port.cgi?action=' + [k + 1] + ':\\',
//                                        'buttonOff0' + k,
//                                        IOStateO.charAt(k) == '1' && form["root_IOPort_I" + k + "_Output_Active"].value == "closed" || IOStateO.charAt(k) == '0' && form["root_IOPort_I" + k + "_Output_Active"].value == "open");
//                } else if (buttontype == "pulse") {
//                    drawBoxButton('/pics/pulse_blue_button_27x27px.gif',
//                                  "Pulse&nbsp;" + [OutputName] + " for " + [displayValue] + " second(s)",
//                                  '/axis-cgi/io/port.cgi?action=' + [k+1] + ':/' + value + '\\',
//                                  'PulseOff0' + [k],
//                                  '/pics/pulse_blue_button_pressed_27x27px.gif');
//                }
//                drawBoxFooter();
//                drawBoxSpacer();
//            }
//        }
//        catch(e) {}
//    }
//}

var clips = null;
function getMediaClips()
{
    if(clips != null)
        return clips;
 
    var result = null;
    var now = new Date();
    var timestamp = now.getTime();
    var url = "/axis-cgi/view/param.cgi?usergroup=anonymous&action=listdefinitions&listformat=xmlschema&group=root.Mediaclip.*.Name&timestamp="+timestamp;

    var ajaxReq = zXmlHttp.createRequest();
    ajaxReq.open("GET", url, false);
    try{
        ajaxReq.send("");
    } catch(e) {}

    var listXml = (ajaxReq.status == 200 ? ajaxReq.responseXML : null);
    if(listXml != null)
    {
        var xpathExp = '//*[local-name() = "parameter" and namespace-uri() = "http://www.axis.com/ParameterDefinitionsSchema"]';
      
        if(zXml.useActiveX)
            listXml.setProperty("SelectionLanguage", "XPath");
        var result = listXml.selectNodes(xpathExp);

        clips = result;
    }
  
    return result;
}

function sortClipName(a, b)
{
    var x = a.clipName.toLowerCase();
    var y = b.clipName.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

//// Draw the AudioClip selector and Play button
//drawBoxHeader("Audio clip");
//document.write('<td nowrap valign="middle">');
//document.writeln('<select name="audioclip" onchange="javascript:playclip();">');
//document.writeln('<option value="">----------</option>');

//var xmlClips = getMediaClips();

//if (xmlClips)
//{
//    var clipArray = new Array();
//    var clipObject;
//    for(var i=0; i < xmlClips.length; i++)
//    {
//        clipObject = new Object();
//        var clipName = xmlClips[i].getAttribute("value");
//        clipName = clipName.replace(/</g, "&lt;"); //try to prevent injections and broken tags
//        clipName = clipName.replace(/>/g, "&gt;");
//        var clipNr = xmlClips[i].parentNode.getAttribute("name").replace("M", "");
//        clipObject.clipNr = clipNr;
//        clipObject.clipName = clipName;
//        clipArray[i] = clipObject;
//    }
  
//    clipArray = clipArray.sort(sortClipName);
//    for(var i=0; i < clipArray.length; i++)
//    {
//        document.write("<option value=\"" + clipArray[i].clipNr + "\">" + clipArray[i].clipName + "</option>");
//    }
//}

//document.writeln('</select>');
//document.write('</td><td nowrap valign="middle">');

//drawBoxButton('/pics/play_blue_button_27x27px.gif',
//              "Play Audio",
//              '#',
//              null,
//              '/pics/play_blue_button_27x27px.gif',
//              'JavaScript:playclip();');

//document.write('</td>');
//drawBoxFooter();
//drawBoxSpacer();




// Draw the sequence buttons and the list of sources
//var showSourceList = true;

//if (showSourceList && (1 > 1
//    || document.listFormExt.elements.length > 0))
//{
//    drawBoxHeader('<br>', true);
//} else {
//    drawBoxHeader('<br>', true);
//}

//if ((("yes" != "yes") || ("no" == "yes")) && (seq_sources > 1)) {
//    drawBoxButton('/pics/button_sequence_27x27px.gif',
//                  "Click to view sequence mode",
//                  'JavaScript:sequence()');
//    drawBoxButton('/pics/button_one_gray_27x27px.gif',
//                  "Sequence mode - Stopped");
//} else {
//    drawBoxButton('/pics/space.gif', null, null, null, null, null, 1);
//}
//document.write('<td valign="middle" align="left"><br></td>');

//drawBoxFooter();

// Draw the trigger buttons

function addTriggerButtons(button_name, indx)
{
    if (document.WizardForm["root_Layout_Trigger_T" + indx + "_Enabled"].value != "yes") {
        return;
    }

    drawBoxSpacer();
    drawBoxHeader(button_name);
    drawBoxButton('/pics/on_blue_button_27x27px.gif',
                  button_name + " on",
                  '/axis-cgi/io/virtualinput.cgi?action=' + [indx + 6] + ':/',
                  'buttonOn',
                  '/pics/on_blue_pressed_button_27x27px.gif');
    drawBoxButton('/pics/off_blue_button_27x27px.gif',
                    button_name + " off",
                    '/axis-cgi/io/virtualinput.cgi?action=' + [indx + 6] + ':\\',
                  'buttonOff',
                  '/pics/off_blue_pressed_button_27x27px.gif');
    drawBoxFooter();
}

function getTriggerIndex()
{
    var triggerIndex = 0;
    triggerIndex = document.WizardForm.videoList.selectedIndex;
    return triggerIndex;
}

//addTriggerButtons("Trigger", 0);
//var theTempDevice = zXmlHttp.createRequest();

function startTemperatureControl(device, id)
{
    var now = new Date();
    theTempDevice.open("GET", "/axis-cgi/temperaturecontrol.cgi?device=" + device + "&id=" + id + "&action=start&timestamp="+now.getTime(), false);
    theTempDevice.send("");
}