var meterSource, tfmsSource;
$(document).ready(function () {
    var bodyEl = $('body'),
        accordionDT = $('.accordion').find('dt'),
        accordionDD = accordionDT.next('dd'),
        parentHeight = accordionDD.height(),
        childHeight = accordionDD.children('.content').outerHeight(true),
        newHeight = parentHeight > 0 ? 0 : childHeight,
        accordionPanel = $('.accordion-panel'),
        buttonsWrapper = accordionPanel.find('.buttons-wrapper'),
        openBtn = accordionPanel.find('.open-btn'),
        closeBtn = accordionPanel.find('.close-btn');



    bodyEl.on('click', function (argument) {
        var totalItems = $('.accordion').children('dt').length;
        var totalItemsOpen = $('.accordion').children('dt.is-open').length;

        if (totalItems == totalItemsOpen) {
            openBtn.addClass('hidden');
            closeBtn.removeClass('hidden');
            buttonsWrapper.addClass('is-open');
        } else {
            openBtn.removeClass('hidden');
            closeBtn.addClass('hidden');
            buttonsWrapper.removeClass('is-open');
        }
    });

    function openAll() {

        openBtn.on('click', function (argument) {

            accordionDD.each(function (argument) {
                var eachNewHeight = $(this).children('.content').outerHeight(true) + 58;
                $(this).css({
                    height: eachNewHeight
                });
            });
            accordionDT.addClass('is-open');
        });
    }

    function closeAll() {

        closeBtn.on('click', function (argument) {
            accordionDD.css({
                height: 0
            });
            accordionDT.removeClass('is-open');
        });
    }

    function openCloseItem() {
        accordionDT.on('click', function () {

            var el = $(this),
                target = el.next('dd'),
                parentHeight = target.height(),
                childHeight = target.children('.content').outerHeight(true) + 58,
                newHeight = parentHeight > 0 ? 0 : childHeight;

            // animate to new height
            target.css({
                height: newHeight
            });

            // remove existing classes & add class to clicked target
            if (!el.hasClass('is-open')) {
                el.addClass('is-open');
            }

                // if we are on clicked target then remove the class
            else {
                el.removeClass('is-open');
            }
        });
    }

    openAll();
    closeAll();
    openCloseItem();

    //Open all Tab by default
    setTimeout(function () {
        openBtn.trigger('click');
    }, 100);
});