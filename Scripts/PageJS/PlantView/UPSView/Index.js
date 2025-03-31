$(document).ready(function () {
    opcPageName = "UPSView.*";
    InitConn(opcPageName, 0);
    createTooltip();
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}