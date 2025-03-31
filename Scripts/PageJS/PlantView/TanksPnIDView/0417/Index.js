
var oSvg;
$(document).ready(function () {
    var oSvg = $('#svgContent svg')[0];
    var OrgWidth = oSvg.clientWidth;
    var OrgHght = oSvg.clientHeight;
    var Ratio = OrgWidth / OrgHght;

    var oZoom = JSON.parse(localStorage.getItem(opageZoom));
    if (oZoom == 'undefined' || oZoom == null || oZoom.percent == undefined) { oZoom = { percent: 100, top: 0, left: 0, scrollTop: 0 }; }
    $('#svgContent').draggable({
        cursor: "grabbing", zIndex: 0, stop: function (e, ui) {  //disabled: true, 
            oZoom.top = ui.position.top;
            oZoom.left = ui.position.left;
            localStorage.setItem(opageZoom, JSON.stringify(oZoom));
        }
    });
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
    $("#jqxslider").jqxSlider({
        theme: 'summer',
        min: 10,
        max: 1000,
        showTicks: true,
        ticksPosition: 'bottom',
        ticksFrequency: 100,
        showTickLabels: true,
        tooltip: true,
        mode: 'fixed'
    });
    $('#jqxslider').bind('change', function (event) {
        $('#sliderValue').html(event.args.value);
        var NewWid = OrgWidth * event.args.value / 100;
        var NewHght = OrgHght * event.args.value / 100;
        oSvg.setAttribute('height', NewHght);
        oSvg.setAttribute('width', NewWid);
        //if (event.args.value > 100) {
        //    $('#svgContent').draggable("enable");
        //}
        //else {
        //    $('#svgContent').draggable({ disabled: true });
        //}
        oZoom.percent = event.args.value;
        localStorage.setItem(opageZoom, JSON.stringify(oZoom));
    });
    $('#jqxslider').jqxSlider({ value: oZoom.percent });
    $('#sliderValue').html(oZoom.percent);
    $('#svgContent').css({ 'top': oZoom.top, 'left': oZoom.left });
});

function ResetZoom() {
    oZoom = { percent: 100, top: 0, left: 0 };
    $('html, body').animate({ scrollTop: 0 }, 500);
    $('#svgContent').css({ 'top': oZoom.top, 'left': oZoom.left });
    $('#jqxslider').jqxSlider({ value: oZoom.percent });
    localStorage.removeItem(opageZoom);
}