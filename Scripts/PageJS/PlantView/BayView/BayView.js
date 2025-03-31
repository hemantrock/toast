var bay = $("#ddlBayView option:selected").attr('pagename');
$(document).ready(function () {
    opcPageName = opcPageName + bay + ',HeaderView.*';
    createTooltip();
    $.ajax(InitConn(opcPageName, 100));
    opc.server.readPageTags(opcPageName);
    $('#spnCardNumber').keypress(function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            $('#GLYPH_B' + bay.toLowerCase().replace('bayview', '')).click();
        }
    });
});


function ExtraActivities(model)
{
    UpdateQuantities(model);
    //UpdatePercentage();
}

function RefreshData() {
    $.ajax({
        type: "GET",
        url: "/PlantView/BayBatchDetailView?BayId=" + bay.toLowerCase().replace('bayview', ''),
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#bayBatchDetail").html(result);
            }
            opc.server.getPageData(opcPageName, 0);
        }
    });
}

function UpdateQuantities(model) {
    var blnQtyUpdate = false;
    $.each(model, function (i, item) {
        if (item.ControlName.toUpperCase().indexOf('LAPS') >= 0 && item.Value != null && item.Value != undefined) {
            //pipeAnimation(true);
        }
        if (item.ControlName.toUpperCase().indexOf('QTY_ACC_CH') >= 0)
        {
            blnQtyUpdate = true;
            var chBayNo = item.ControlName.replace("QTY_ACC_","");
            if (item.Value == null || item.Value == undefined)
            {
                
                var DB_QTY_CN01 = parseFloat($('.DB_QTY_CN01_' + chBayNo).first().text());
                var DB_QTY_CN02 = parseFloat($('.DB_QTY_CN02_' + chBayNo).first().text());
                if (DB_QTY_CN01 != undefined && DB_QTY_CN02 != undefined)
                {
                    $('.QTY_CN01_' + chBayNo).text(DB_QTY_CN01);
                    $('.QTY_CN02_' + chBayNo).text(DB_QTY_CN02);
                    item.Value = parseFloat(DB_QTY_CN01 + DB_QTY_CN02);
                }
            };
            var Effpreset = parseFloat($('.Eff_PresetQty_' + chBayNo).text());
            var PrevQty = parseFloat($('.QTY_ACC_PREV_' + chBayNo).first().text());
            var delivered = parseFloat(item.Value);
            if (Effpreset != undefined)
            {
                var RemQty = parseFloat(Effpreset - delivered);
                $('.' + item.ControlName.replace("QTY_ACC", "EFF_QTY_ACC")).text(parseFloat(PrevQty + delivered));
                if (RemQty != NaN && RemQty != undefined && RemQty > 0)
                {
                    $('.' + item.ControlName.replace("QTY_ACC", "QTY_REM")).text(parseInt(Effpreset - delivered));
                }
                else
                {
                    $('.' + item.ControlName.replace("QTY_ACC", "QTY_REM")).text(0);
                }
            }
        }
        if (blnQtyUpdate) { UpdatePercentage(); }
    });
}

function UpdatePercentage() {
    $.each($('span.percentage'), function (i, spn) {
        var chBayNo = $(this).data('id');
        var preset = parseFloat($('.PresetQty_' + chBayNo).text());
        var PrevQty = parseFloat($('.PrevQty_' + chBayNo).text());
        var delivered = parseFloat($('.EFF_QTY_ACC_' + chBayNo).first().text());
        //var delivered = parseFloat($('.QTY_ACC_' + chBayNo).first().text());
        //var PrevQty = parseFloat($('.QTY_ACC_PREV_' + chBayNo).first().text());
        //delivered = delivered + PrevQty;
        
        if (delivered!='NaN' && delivered >= 0) {
            var percentage = ((delivered / preset) * 100).toFixed(0);
            $(this).text(' ' + percentage + '%');
            $('.fill_' + chBayNo).css('height', percentage + '%');
        }
        else if (delivered != 'NaN') {
            $(this).text('0%');
            $('.fill_' + chBayNo).css('height', '0%');
        }
    });
}

function OpenLocRemModal_old(BayDetails, ClassName, TagName, UserID, LoginID, UserName, event) {

    //Temporay Disable
    //return;
    cancelBubble(event);
    
    $.each($("#LOCREMModal ." + ClassName), function (index, ele) {
        
        removeClasses(ele, 'LOCREM_BC');
        removeClasses(ele, "locrem_");
    });
    $("#LOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 0);
    $('#LOCREMModal #LocRemLabel').html(BayDetails + ' - Change Mode');
    $('#LOCREMModal').modal('show');
    $('#LOCREMModal').draggable({ handle: ".modal-header" });
    $("#LOCREMModal #btnModeChangeOK").unbind('click');
    $("#LOCREMModal #btnModeChangeOK").on("click", function () {
        

        $(".modal-backdrop").slideUp('slow');
        var activityName = "Change BC Local /Remote";
        var activityDetail = "Bay: " + BayDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
            cache: false,
            success: function (result) {
                    if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                        if (result.strType == "danger") {
                            alertDismissable(result.strType, result.strMessage); return;
                        }
                        else
                        {
                            SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                            $('#LOCREMModal').modal('hide');
                        }
                }
                else {
                    ShowPasswordModalForReqTrn(BayDetails + ' - Change Mode', function (ApproverId) {
                        SendDataToOPC($('#hdnLOCREMMode'), TagName, UserID, LoginID, UserName, "");
                        $('#LOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function OpenBayLOCREMModal(BayDetails, ClassName, TagName, BCNo, UserID, LoginID, UserName) {

    var CurrVal = $('.' + TagName).attr('data-opcvalue');
    if (CurrVal == undefined) { alertDismissable('danger', 'No Connection'); return; }

    $.each($("#BayLOCREMModal ." + ClassName), function (index, ele) {
        removeClasses(ele, ClassName + "_");
        removeClasses(ele, "locrem");
    });
    $("#BayLOCREMModal ." + ClassName).addClass(TagName);
    $('#hdnLOCREMMode').removeClass().addClass(TagName);
    opc.server.getPageData(opcPageName, 50);
    $('#BayLOCREMModal #LocRemLabel').html(BayDetails + ' - Change Mode');
    $('#BayLOCREMModal').modal('show');
    $('#BayLOCREMModal').draggable({ handle: ".modal-header" });
    $("#BayLOCREMModal #btnModeChangeOK").unbind('click');
    $("#BayLOCREMModal #btnModeChangeOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');

        var activityName = "Change BC Local /Remote";
        var activityDetail = "Bay: " + BayDetails;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    if (result.strType == "danger") {
                        alertDismissable(result.strType, result.strMessage); return;
                    }
                    else {
                        ChangeBCOperatingMode($('#hdnLOCREMMode'), BCNo, TagName);
                        $('#BayLOCREMModal').modal('hide');
                    }
                }
                else {
                    ShowPasswordModalForReqTrn(BayDetails + ' - Change Mode', function (ApproverId) {
                        ChangeBCOperatingMode($('#hdnLOCREMMode'), BCNo, TagName);
                        $('#BayLOCREMModal').modal('hide');
                    }, activityName, activityDetail);
                }
            }
        });
    });
}

function ChangeBCOperatingMode(src, BCNo, TagName)
{
    var locrem = $('#hdnLOCREMMode').attr('data-opcvalue');
    if (locrem.toUpperCase() == "TRUE") {
        NewMode = "AUTO";
    } else { NewMode = "MANUAL" }
    $.ajax({
        type: "GET",
        url: "/BatchController/cmdChangeOpeartingMode?BCNo=" + BCNo + "&NewMode=" + NewMode + "&TagName=" + TagName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function LoadingArmAnimate(ArmNo, ChamberNo) {
    $('.pipe_' + ArmNo + '_1 input[type=hidden]').val(ChamberNo);
    //pipeAnimation(true);
}

function pipeAnimation(isanimate) {
    //constructor   
    function comptObj(obj) {
        this.obj = obj;
    }


    comptObj.prototype.init = function () {
        var self = this;
        
        //when chamber value changes
        $('.pipe input[type=hidden]').change(function () {
            var pipe1 = $('.pipe_1_1 input[type=hidden]').val();
            var pipe2 = $('.pipe_2_1 input[type=hidden]').val();
            self.obj = {
                "pipe_1_1": pipe1,
                "pipe_2_1": pipe2
            }
        })

        var pipeEle1 = $('.pipe-extension.pipe_ext_1');
        if (!pipeEle1.hasClass('animate') && pipeEle1.hasClass('status_true')) {
            if (isanimate) {
                self.sendToChamberWithAnimate(pipeEle1, "pipe_1_1");
            } else {
                self.sendToChamberNOAnimate(pipeEle1, "pipe_1_1");
            }
            
        } else if (pipeEle1.hasClass('animate') && pipeEle1.hasClass('status_false')) {
            if (isanimate) {
                self.removeFromChamberWithAnimate(pipeEle1, "pipe_1_1");
            }
        }


        var pipeEle2 = $('.pipe-extension.pipe_ext_2');
        if (!pipeEle2.hasClass('animate') && pipeEle2.hasClass('status_true')) {
            if (isanimate) {
                self.sendToChamberWithAnimate(pipeEle2, "pipe_2_1");
            } else {
                self.sendToChamberNOAnimate(pipeEle2, "pipe_2_1");
            }

        } else if (pipeEle2.hasClass('animate') && pipeEle2.hasClass('status_false')) {
            if (isanimate) {
                self.removeFromChamberWithAnimate(pipeEle2, "pipe_2_1");
            }
        }
    }

    comptObj.prototype.sendToChamberWithAnimate = function (ele, chambNo) {
        
        var self = this;
        if (self.obj[chambNo] > 0) { 
            var outerPosLef = ele.offset().left;
            var comptOuterPosLeft = $('#chamber_' + self.obj[chambNo]).offset().left;
            var anmiateWidth = (comptOuterPosLeft - outerPosLef) + $('#chamber_' + this.obj[chambNo]).outerWidth() / 2;

            var champPosFromTop = $('#chamber_' + self.obj[chambNo]).offset().top;
            var pipeGodownFromTop = ele.children().offset().top;
            var pipeGoDownHeight = champPosFromTop - pipeGodownFromTop;

            ele.animate({
                width: anmiateWidth + "px"
            }, 1000).delay(500).queue(function (next) {
                ele.addClass('animate');
                ele.children().animate({
                    height: pipeGoDownHeight + "px"
                }, 500);
                next();
            })
           
        }
    }

    comptObj.prototype.removeFromChamberWithAnimate = function (ele) {
        
        ele.children().animate({
            height: 0 + "px"
        }, 500).delay(500).queue(function (next) {
            ele.animate({
                width: 0 + "px"
            }, 1000);
            next();
            ele.removeClass('animate');
            ele.children().removeClass('go-down');
        })
    }

    comptObj.prototype.sendToChamberNOAnimate = function (ele, chambNo) {
        
        var self = this;
        if (ele.hasClass('status_true') && self.obj[chambNo] > 0 ) {
            var outerPosLef = ele.offset().left;
            var comptOuterPosLeft = $('#chamber_' + self.obj[chambNo]).offset().left;
            var anmiateWidth = (comptOuterPosLeft - outerPosLef) + $('#chamber_' + this.obj[chambNo]).outerWidth() / 2;

            var champPosFromTop = $('#chamber_' + self.obj[chambNo]).offset().top;
            var pipeGodownFromTop = ele.children().offset().top;
            var pipeGoDownHeight = champPosFromTop - pipeGodownFromTop;

            ele.css({
                'width': anmiateWidth,
                'transition': 'none'
            }).addClass('animate');
            ele.children().addClass('go-down').css({
                'height': pipeGoDownHeight,
                'transition': 'none'
            });
        }
    }
    
    var pipe1ChamberToGo = parseInt($('.pipe_1_1 input[type=hidden]').val());
    var pipe2ChamberToGo = parseInt($('.pipe_2_1 input[type=hidden]').val());
    var compObj = new comptObj({ "pipe_1_1": pipe1ChamberToGo, "pipe_2_1": pipe2ChamberToGo });
    compObj.init();

}

function AckAlarm(ActDet, src, ControlName, UserID, LoginID, UserName) {
    var activityName = "Acknowledge Batch Controller Alarm";
    var activityDetail = ActDet;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }, activityName, activityDetail);
            }
        }
    });
}

function AckAlarmNew(ActDet, src, ControlName, LPNo) {
    var activityName = "Acknowledge Batch Controller Alarm";
    var activityDetail = ActDet;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + CurrUserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    AckAlarmDo(src, ControlName, LPNo)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    AckAlarmDo(src, ControlName, LPNo)
                }, activityName, activityDetail);
            }
        }
    });
}

function AckAlarmDo(src, ControlName, LPNo) {
    var CurrAckAlarm = $(src).attr('data-opcvalue');
    var sRemarks = $('#Pwd_txtRemarks').val();
    $.ajax({
        type: "GET",
        url: "/BatchController/cmdAckAlarm?LPNo=" + LPNo + "&CurrAckAlarm=" + CurrAckAlarm + "&TagName=" + ControlName + "&strRemarks=" + sRemarks,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function RemoteStop(ActDet, src, ControlName, UserID, LoginID, UserName) {
    var activityName = "Control Room Stop Batch Controller";
    var activityDetail = ActDet;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName+ " : Requires Transaction Password", function (ApproverId) {
                    SendDataToOPC(src, ControlName, UserID, LoginID, UserName)
                }, activityName, activityDetail);
            }
        }
    });
}

function RemoteStopNew(ActDet, src, ControlName, LPNo, UserID, LoginID, UserName) {
    var activityName = "Control Room Stop Batch Controller";
    var activityDetail = ActDet;
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    RemoteStopDo(src, ControlName, LPNo, UserID, LoginID, UserName)
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    RemoteStopDo(src, ControlName, LPNo, UserID, LoginID, UserName)
                }, activityName, activityDetail);
            }
        }
    });
}

function RemoteStopDo(src, ControlName, LPNo, UserID, LoginID, UserName) {
    var CurrRemStop = $(src).attr('data-opcvalue');
    $.ajax({
        type: "GET",
        url: "/BatchController/cmdRemoteStop?LPNo=" + LPNo + "&CurrRemStop=" + CurrRemStop + "&TagName=" + ControlName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function SetBayCardNo(activityName, activityDetail, ControlName, BayID, UserID) {
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal <= 0) { alertDismissable('danger', 'Incorrect Card No: ' + CurrVal); return; }
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName + "&UserID=" + UserID,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                if (result.strType == "danger") {
                    alertDismissable(result.strType, result.strMessage); return;
                }
                else {
                    SetBayCardNoDo(BayID, CurrVal); $('#' + ControlName.replace('CARD_NO', 'GLYPH')).addClass('hide');
                }
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function (ApproverId) {
                    SetBayCardNoDo(BayID, CurrVal); $('#' + ControlName.replace('CARD_NO', 'GLYPH')).addClass('hide');
                }, activityName, activityDetail);
            }
        }
    });
}

function SetBayCardNoDo(BayID, CurrVal) {
    var CardData = {
        'LoadingPointNo': BayID,
        'CardID': CurrVal,
    };
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: "/Cards/ForceBayCard",
        data: JSON.stringify(CardData),
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
        }
    });
}

function updateGlyphButton(ControlName, glyphID) {
    if (glyphID == undefined) { glyphID = ControlName.replace('CARD_NO', 'GLYPH'); }
    var CurrVal = parseFloat($('.editable-input.' + ControlName).val());
    if (CurrVal > 0) { $('#' + glyphID).removeClass('hide'); }
    else { $('#' + glyphID).addClass('hide'); }
}