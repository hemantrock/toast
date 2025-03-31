$(document).ready(function () {
    opc.server.removeFromGroup(opcPageName);
    opcPageName = "HHHCauseEffect";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});


function ExtraActivities(model) {

}
