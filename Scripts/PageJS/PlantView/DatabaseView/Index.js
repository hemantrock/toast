$(document).ready(function () {
    opcPageName = "DBView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});


function ExtraActivities(model) {
    console.log("DBView : ExtraActivities");
}