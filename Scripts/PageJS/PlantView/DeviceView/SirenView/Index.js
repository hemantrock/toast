$(document).ready(function () {
    opcPageName = "SirenView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

function ExtraActivities(model) {

}