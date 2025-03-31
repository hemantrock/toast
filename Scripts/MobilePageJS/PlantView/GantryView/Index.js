$(document).ready(function () {
    opcPageName = "GantryOverview";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);

    $('.slider-container').on('afterChange', function (event, slick, currentSlide) {
        var idx = currentSlide;
        $.each($('#ddlBayView option'), function (i, val) {
            if ($(val).attr('data-id') == idx+1) {
                $(val).prop('selected', true);
            }
        });
    });

});

function ExtraActivities(model) {
    CheckNoCard();
    UpdatePercentage();
}

function ChangeGantryView() {
    var idx = $('#ddlBayView option:selected').attr('data-id');
    $('.slider-container').slick('slickGoTo', idx-1, false);
}

function CheckNoCard() {
    $.each($('.spnCardNo'), function (i, spn) {
        var bayNo = $(this).data('id');
        if ($(this).text() == "0" || $(this).text() == "") {
            
            $('#dvTruckDetails_' + bayNo).hide();
        }
        else {  
            $('#dvTruckDetails_' + bayNo).show();
        }
    });
    
}

function UpdatePercentage()
{
    $.each($('span.percentage'), function (i, spn) {
        var bayNo = $(this).data('id');
        var delivered = parseFloat($('.QTY_BP_' + bayNo).text());
        var preset = parseFloat($('.QTY_PR_' + bayNo).text());
        var accumulated = parseFloat($('.QTY_ACC_' + bayNo).text());        
        var effPreset = accumulated - delivered + preset;

        if (effPreset > 0) {
            var percentage = ((accumulated / effPreset) * 100).toFixed(0);
            $(this).html(' ' + percentage + '%');
            $(this).parent().css('height', percentage + '%');
        }
        else {
            $(this).html('0%');
            $(this).parent().css('height', '0%');
        }
    });
}