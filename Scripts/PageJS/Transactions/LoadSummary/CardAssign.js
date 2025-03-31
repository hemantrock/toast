var selectedRowRef = "";
$(document).ready(function () {

    LoadDDLCardReaders();
    LoadCard();
    //AutoComplete($("#txtCard"), "Cards", "");


    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Remarks: {
                validators: {
                    notEmpty: {
                        message: 'Field is required'
                    },
                }
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });
});


function CardAssignDo(Id) {

    var activityName = "Manually Allocate Card";
    var activityDetail = "Card Id: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                MaunallyCardAssignDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { MaunallyCardAssignDo(Id); }, activityName, activityDetail, Id);
            }
        }
    });
}

function MaunallyCardAssignDo(Id) {
    
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    if (Id == null || Id == "" || Id == "undefined" || Id == 0) {
        alertDismissable("danger", "Please select Truck");
        return false;
    }
    var CardID = $('#ddlCard :selected').val();
    if (CardID == "0") {
        CardID = 0;
        alertDismissable("danger", "Please select Card.");
        return false;
    }
    var CardNum = $('#ddlCard :selected').text();

    $.ajax({
        type: "GET",
        url: "/LoadSummary/ManuallyCardAssign?Id=" + Id + "&CardID=" + CardID + "&CardNumber=" + CardNum,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function CardAutoAssign(Id){
    var activityName = "Auto Allocate Card";
    var activityDetail = "Card Id: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                CardAutoAssignDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { CardAutoAssignDo(Id); }, activityName, activityDetail, Id);
            }
        }
    });
}

function CardAutoAssignDo(Id) {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    if (Id == null || Id == "" || Id == undefined || Id == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/LoadSummary/CardAutoAssignDo?Id=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenLoadSummaryMenu();
            }
        }
    });
}

function ShowGetCardButton()
{
    var ddlOption = $('#ddlCardReader option:selected').text()
    if (ddlOption.toUpperCase() == "MANUAL") {
        $('#btnGetCard').hide();
        //$('#txtCard').text('');
        //$('#txtCard').removeAttr('disabled');

        //$('#txtCard').text('');
        $("#ddlCard").prop("selectedIndex", 0);
        $('#ddlCard').removeAttr('disabled');
    }
    else {
        $('#btnGetCard').show();
        //$('#txtCard').text('');
        //$('#txtCard').attr('disabled','disabled');
        $("#ddlCard").prop("selectedIndex", 0);
        $('#ddlCard').attr('disabled', 'disabled');
    }
}

function ReadCard() {
    var activityName = "Read Card from Card Reader";
    var activityDetail = "Card Id: " + selectedRowRef;

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                ReadCardDo(Id);
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { ReadCardDo(Id); }, activityName, activityDetail, Id);
            }
        }
    });
}

function ReadCardDo()
{
    $('#txtCard').attr('disabled', 'disabled');
    $.ajax({
        type: "GET",
        url: "/LoadSummary/CardRead?Type=LoadCardAssign",
        cache: false,
        success: function (result) {
            if (result.blnStatus == true) {
                $('#txtCard').val(result.strMessage);
            }
            else {
                alertDismissable(result.strType, result.strMessage);
            }
        }
    });
}

function LoadDDLCardReaders() {
    $.ajax({
        url: "/LoadSummary/CardReaders",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlCardReader').html('');
            var r;
            $.each(result, function (i, objCardReader) {
                r = "<option acuid=" + objCardReader.ParameterDesc + " value=" + objCardReader.Value + ">" + objCardReader.ParameterName + "</option>";
                $('#ddlCardReader').append(r);
            });
            r = "<option acuid=0 value=999>Manual</option>";
            $('#ddlCardReader').append(r);
        }
    });
}


function LoadCard() {
    $.ajax({
        url: "/Cards/GetCardNumbers",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlCard').html('');
            var r = "<option value=0>Select Card</option>";
            $('#ddlCard').append(r);

            $.each(result, function (i, val) {
                r = "<option value=" + val.UniqueID + ">" + val.CardNumber + "</option>";
                $('#ddlCard').append(r);
            });
        }
    });
}