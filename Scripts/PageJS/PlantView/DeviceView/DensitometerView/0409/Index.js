$(document).ready(function () {
    opcPageName = "DensityView.*";
    InitConn(opcPageName, 0);
    $('.nav-tabs a:first').tab('show');
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function ExtraActivities(model) {

}