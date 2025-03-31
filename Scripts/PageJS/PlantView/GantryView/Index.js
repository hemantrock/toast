var pageLoaded = false;
$(document).ready(function () {
    opcPageName = "GantryOverview";
    InitConn(opcPageName, 0);
    opc.server.readPageTags(opcPageName);
    createTooltip();
});

function ExtraActivities(model) {
    if (model.length > 15) { pageLoaded = false; }
    //CheckNoCard(model);
    UpdatePercentage();
    if (model.length > 15) { pageLoaded = true; }
}

function CheckNoCard(model) {
    if (model.length < 15) {
        $.each(model, function (i, item) {
            if (item.Value != null && item.Value != undefined && pageLoaded==true && (item.ControlName.toUpperCase().indexOf('CARD_NO') >= 0
                || item.ControlName.toUpperCase().indexOf('CURR_CHAMBER') >= 0))
            {
                //if (item.ControlName.toUpperCase().indexOf('CARD_NO') >= 0) {
                //    $('#CardNo_' + item.ControlName.toUpperCase().replace('CARD_NO_', '').replace('CURR_CHAMBER_', '')).text(item.Value);
                //}
                RefreshBayData(item);
            }
        });
    }

    $.each($('.spnCardNo'), function (i, spn) {
        var bayNo = $(this).data('id');
        var CardNo = parseInt($(this).text());
        if (CardNo == '0' || isNaN(CardNo) || CardNo == 'undefined') {
            $('#dvTruckDetails_' + bayNo).hide();
        }
        else {
            $('#dvTruckDetails_' + bayNo).show();
        }
    });
}

function RefreshBayData(item) {

    $.ajax({
        type: "GET",
        url: "/PlantView/GantryBayUpdate?ControlName=" + item.ControlName.toUpperCase() + "&CardNo=" + item.Value,
        async: false,
        cache: false,
        global: false,
        success: function (result) {
            console.log('BayNo:' + result.BayNo);
            $('#TruckNo_' + result.BayNo).text(result.TruckNumber);
            console.log('TruckNo:' + result.TruckNumber);
            $('#CurrChamber_' + result.BayNo).text(result.CurrChamber);
            console.log('CurrChamber:' + result.CurrChamber);
            $('#NoOfComps_' + result.BayNo).text(result.NoOfComps);
            console.log('NoOfComps:' + result.NoOfComps);
            $('#Preset_' + result.BayNo).text(result.Preset);
            console.log('Preset:' + result.Preset);
            $('#Products_' + result.BayNo).text(result.Products);
            $('#Products_' + result.BayNo).css('color', result.ProductColor);
            console.log('Products:' + result.Products);
            $('#Color_' + result.BayNo).css('background-color', result.ProductColor);
            console.log('Color:' + result.ProductColor);
            $('#CardNo_' + result.BayNo).text(result.CardNo);
            console.log('CardNo:' + result.CardNo);
            var strLoadDetail = '';
            $(result.lstLoadDetail).each(function (index, obj) {
                //var chamberBay = "CH" + pad(obj.CompNo.ToString, 2) + "_" + result.BayNo;
                strLoadDetail = strLoadDetail + "<span class='Chamber-wise-qty-" + result.BayNo + " QTY_ACC_" + obj.ChamberSuffix + "' style='display:none;'>" + (obj.ChProdQty) + "</span>";
            });
            strLoadDetail = strLoadDetail + "<span class='QTY_ACC_" + result.BayNo + "'>" + (+result.Delivered  + +result.PreviousQty) + "</span>";
            $('#Delivered_' + result.BayNo).html(strLoadDetail);
            //console.log(strLoadDetail);
        }
    });

}

function RefreshBayData(RemScrObj) {
    $.ajax({
        type: "GET",
        url: "/PlantView/RefreshGantryBay?LPNo=" + RemScrObj.Param1,
        async: false,
        cache: false,
        global: false,
        success: function (result) {
            //console.log('BayNo:' + result.BayNo);
            $('#TruckNo_' + result.BayNo).text(result.TruckNumber);
            //console.log('TruckNo:' + result.TruckNumber);
            $('#CurrChamber_' + result.BayNo).text(result.CurrChamber);
            //console.log('CurrChamber:' + result.CurrChamber);
            $('#NoOfComps_' + result.BayNo).text(result.NoOfComps);
            //console.log('NoOfComps:' + result.NoOfComps);
            $('#Preset_' + result.BayNo).text(result.Preset);
            //console.log('Preset:' + result.Preset);
            $('#Products_' + result.BayNo).text(result.Products);
            $('#Products_' + result.BayNo).css('color', result.ProductColor);
            //console.log('Products:' + result.Products);
            $('#Color_' + result.BayNo).css('background-color', result.ProductColor);
            //console.log('Color:' + result.ProductColor);
            $('#CardNo_' + result.BayNo).text(result.CardNo);
            //console.log('CardNo:' + result.CardNo);
            var strLoadDetail = '';
            $(result.lstLoadDetail).each(function (index, obj) {
                //var chamberBay = "CH" + pad(obj.CompNo.ToString, 2) + "_" + result.BayNo;
                strLoadDetail = strLoadDetail + "<span class='Chamber-wise-qty-" + result.BayNo + " QTY_ACC_" + obj.ChamberSuffix + "' style='display:none;'>" + (obj.ChProdQty) + "</span>";
            });
            strLoadDetail = strLoadDetail + "<span class='QTY_ACC_" + result.BayNo + "'>" + (+result.Delivered + +result.PreviousQty) + "</span>";
            $('#Delivered_' + result.BayNo).html(strLoadDetail);
            //console.log(strLoadDetail);

            if (result.TruckNumber == '' || result.TruckNumber == 'undefined') {
                $('#dvTruckDetails_' + result.BayNo).hide();
            }
            else {
                $('#dvTruckDetails_' + result.BayNo).show();
            }
        }
    });

}



function UpdatePercentage() {
    $.each($('span.percentage'), function (i, spn) {
        var bayNo = $(this).data('id');
        var delivered = 0;
        $('.Chamber-wise-qty-' + bayNo).each(function (index, val) {
            delivered += +$(this).text();
        })

        var preset = parseFloat($('.QTY_PR_' + bayNo).text());
        var PrevQty = +($('.bay-prev-qty-' + bayNo).text());
        delivered = delivered + PrevQty;
        if (delivered != 'NaN' && preset != 'NaN' && preset>=0)
        {
            $('.QTY_ACC_' + bayNo).text(delivered);
            //console.log(bayNo + ': Preset: ' + preset);
            //console.log(bayNo + ': PrevQty: ' + PrevQty);
            //console.log(bayNo + ': delivered: ' + delivered);
            if (preset > 0) {
                var percentage = ((delivered / preset) * 100).toFixed(0);
                $(this).html(' ' + percentage + '%');
                $(this).parent().css('width', percentage + '%');
                $(this).css('width', percentage + '%');
                //console.log(percentage);
            }
            else {
                $(this).html('0%');
                $(this).parent().css('width', '0%');
                $(this).css('width', '0%');
            }
        }
    });
}