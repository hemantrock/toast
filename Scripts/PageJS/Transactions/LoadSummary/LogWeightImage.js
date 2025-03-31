function TakeSnapshot(baseIPAddress)
{
    var BaseURL = "http://"+ baseIPAddress + "/";
    var Camera = "";
    var ImageResolution = "480x360"; var DisplayWidth = "480"; var DisplayHeight = "360";

    var File = "axis-cgi/jpg/image.cgi?resolution=" + ImageResolution;
    if (Camera != "") { File += "&camera=" + Camera; }
    theDate = new Date();
    var output = "<IMG SRC=\"" + BaseURL + File + "&dummy=" + theDate.getTime().toString(10);
    output += "\" HEIGHT=\"" + DisplayHeight + "\" WIDTH=\"" + DisplayWidth + "\" ALT=\"Snapshot\">";
    $('#dvImage').html(output);
}