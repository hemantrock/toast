
$(document).ready(function () {
    opcPageName = "TTView";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});