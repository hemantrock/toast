var RefreshTime = 7000;
$(document).ready(function () {
    refreshTWSummary();
    clearTimeout(gblTimeout);
    //gblTimeout = setTimeout(function () { refreshTWSummary(); }, RefreshTime);

});

function ShowWagonDetails(s, WagonNo, wLoadID, wSeqNo) {
    //$(s).addClass('selected-cell');
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonPopup?wLoadID=" + wLoadID + "&wSeqNo=" + wSeqNo,
        cache: false,
        success: function (wResult) {
            if (wResult.blnStatus != 'undefined' && wResult.blnStatus == false) {
                alertDismissable(wResult.strType, wResult.strMessage);
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
            else {
                $('#EmptyModal').html(wResult);
                $('#EmptyModal').modal('show');
                $('#EmptyModal').draggable({ handle: ".modal-header" });
                $("#btnOK").unbind('click');
                $("#btnOK").on("click", function () {
                    $(".modal-backdrop").slideUp('slow');
                    $('#EmptyModal').modal('hide');
                });
            }
        }
    });
}

function ShowWagonRakes(s, wLoadID) {
    activeRakeID = wLoadID;
    $('.wload').hide();
    $('#' + wLoadID).show();
}

function ExitRake(s, LoadID) {
    var Id = LoadID;
    if (Id == null || Id == "" || Id == 'undefined' || Id == 0) {
        return false;
    }
    $('#myConfirmMsg').html("<p>Are you sure to Exit Rake?</p>");
    $('#confirmModal').modal('show');
    $('#confirmModal').draggable({ handle: ".modal-header" });
    $("#btnConfirmOK").unbind('click');
    $("#btnConfirmOK").on("click", function () {
        $(".modal-backdrop").slideUp('slow');
        $('#confirmModal').modal('hide');

        var activityName = "Wagon CheckOut";
        var activityDetail = "Rake ID: " + LoadID;

        $.ajax({
            type: "GET",
            url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
            cache: false,
            success: function (result) {
                if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                    WagonCheckOutDo(Id);
                }
                else {
                    ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { WagonCheckOutDo(Id); }, activityName, activityDetail, Id);
                }
            }
        });
    });
}

function WagonCheckOutDo(Id) {
    $.ajax({
        type: "GET",
        url: "/WagonSummary/WagonCheckOut?wLoadID=" + Id,
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
        }
    });
}

function fileValidation(e) {
    console.log(e.value);
    var filePath = e.value;
    // Allowing file type
    var allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i;

    if (!allowedExtensions.exec(filePath)) {
        $('.excelUpload .error').removeClass('hide');
        filePath = '';
        $('#excelfile').val('');
        return false;
    } else {
        $('.excelUpload .error').addClass('hide');
        $('#excelfile').val(filePath);
    }
}

function UploadExcel() {
    var fileUpload = $("#excelfile").get(0);
    var files = fileUpload.files;
    console.log(files);
    if (files.length <= 0) { alertDismissable('danger', "Invalid File selected. Please select File again."); return; }
    // Create FormData object
    var fileData = new FormData();

    // Looping over all files and add it to FormData object
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }
    // Adding one more key to FormData object
    fileData.append('username', 'ICON');

    $.ajax({
        url: '/WagonSummary/UploadWagonExcelFile',
        type: "POST",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        data: fileData,
        success: function (result) {
            if (result.blnStatus == true) {
                alertDismissable("success", result.strMessage);
                OpenGenericViewPath('/WagonSummary/Index', '/Wagon/Summary/', 'TWSummary');
            }
            else { alertDismissable("danger", result.strMessage); }
            console.log(result);
            alert(result.strMessage);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
    alertDismissable('info', 'Uploading Excel File');
}

function refreshTWSummary() {
    $.ajax({
        type: "GET",
        url: "/WagonSummary/TWTable",
        cache: false,
        global: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
            }
            else {
                $("#TWTable").html(result);
                $('.wload').hide();
                $('#' + activeRakeID).show();
            }
            clearTimeout(gblTimeout);
            gblTimeout = setTimeout(function () { refreshTWSummary(); }, RefreshTime);
        },
        error: function (jqXHR, textStatus, errorThrown) { processAjaxError(jqXHR, textStatus, errorThrown); }
    });
}