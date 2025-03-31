$(document).ready(function () {
    //opcPageName = "DMView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}