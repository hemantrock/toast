$(document).ready(function () {
    opc.server.removeFromGroup(opcPageName);
    opcPageName = "CauseEffect";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});


function ExtraActivities(model) {

}
