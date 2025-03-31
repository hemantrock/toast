$(document).ready(function () {
    opcPageName = "DykeValveView.*";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function ExtraActivities(model) {

}
