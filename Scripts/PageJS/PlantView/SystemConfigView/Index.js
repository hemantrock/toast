$(document).ready(function () {
    createTooltip();
    opcPageName = "SysConfView,DBView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});


function ExtraActivities(model) {

}