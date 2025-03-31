$(document).ready(function () {
    opcPageName = "EthOverview";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
});

$(".menu-item").on('click touchend', function () {
    $(".menu-item").removeClass('active');
    $('.menu-item .fa').removeClass('fa-minus-circle');
    $(this).addClass('active');
    $(this).children('.fa').addClass('fa-minus-circle');
    $(".menu-item").next().slideUp("fast");
    if ($(this).next().is(":hidden")) {
        $(this).next().slideDown("fast");
    } else {
        $(".menu-item").removeClass('active');
        $('.menu-item .fa').removeClass('fa-minus-circle');
    }

    return false;
});

function ExtraActivities(model) {

}
