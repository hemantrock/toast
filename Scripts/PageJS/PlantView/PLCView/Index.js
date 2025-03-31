$(document).ready(function () {
    opcPageName = "PLCView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function ExtraActivities(model) {

}