$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenBaseDensTemp();
        $('#cancelModal').modal('hide');
    });

    $('#tblBaseLineDetail').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "33%" },
                { sWidth: "33%" },
                { sWidth: "33%" }
            ],
        "bAutoWidth": false
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Density: {
                validators: {
                    //notEmpty: {
                    //    message: 'The Density is required and cannot be empty'
                    //},
                    numeric: {
                        message: 'The Density must be numeric value',
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                }
            },
            Temp: {
                validators: {
                    //notEmpty: {
                    //    message: 'The Temp is required and cannot be empty'
                    //},
                    numeric: {
                        message: 'The Temp must be numeric value.',
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },

                }
            },
            BaselineDT: {
                validators: {
                    notEmpty: {
                        message: 'Baseline Date cannot be empty'
                    }
                }
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter('.form-group');
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
    });

    //$('#dtpBaselineDT').datetimepicker({
    //    format: "D-MMM-YYYY HH:mm"
    //}).on('changeDate', function (e) {
    //    // Revalidate the date field
    //    $('#FormBU').formValidation('revalidateField', 'BaselineDT');
    //    $('#FormBU').bootstrapValidator('validate');
    //});

    //$('#dtpBaselineDT').datetimepicker({
    //    format: "D-MMM-YYYY HH:mm"
    //}).on('dp.change', function (e) {
    //    $('#FormBU').bootstrapValidator('validate');
    //});
    

    //$('#dtpBaselineDT').on('changeDate', function (ev) {
    //    $(this).datepicker('hide');
    //});

    //$('#dtpBaselineDT').val(new Date());
});


function SaveBaseDensTemp() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }

    var activityName = "Add New Manual Density Temp";
    var activityDetail = "Baseline DateTime: " + $('#dtpBaselineDT').val();
    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveBaseDensTempDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveBaseDensTempDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveBaseDensTempDo() {

    var rowCount = $('#rowCount').val();
    var objBaseDensTemp = [];

    for (i = 1; i <= rowCount; i++) {
        var Sel = $('#chkSelected_' + i).is(":checked");
        if (Sel)
        {
            var ProdName = $('#txtProduct_' + i).val();
            var Density = $('#txtDensity_' + i).val();
            var Temp = $('#txtTemp_' + i).val();
            if (Density == "") { alertDismissable("danger", "Density for Selected Product: " + ProdName + " is required."); return; }
            if (Temp == "") { alertDismissable("danger", "Temp for Selected Product: " + ProdName + " is required."); return; }
            var obj = {
                'BaselineDT': $('#dtpBaselineDT').val(),
                'ProductID': $('#txtProductID_' + i).val(),
                'Density': $('#txtDensity_' + i).val(),
                'Temp': $('#txtTemp_' + i).val()
            };
            objBaseDensTemp.push(obj);
        }
    }
    if (objBaseDensTemp.length <= 0) {
        alertDismissable("danger", "No Product is Selected");
        return;
    }

    $.ajax({
        url: "/BaselineDensTemp/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBaseDensTemp),
        cache: false,
        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaseDensTemp();
            }
        }
    });
}

function UpdateBaseDensTemp() {
    $('#FormBU').bootstrapValidator('validate');
    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Manual Density Temp";
    var activityDetail = "Baseline DateTime: " + $('#dtpBaselineDT').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateBaseDensTempDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateBaseDensTempDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateBaseDensTempDo() {

    var objBaseDensTemp = {
        'UniqueID': $('#hdnUniqueIDKey').val(),
        'BaselineDT': $('#dtpBaselineDT').val(),
        'ProductID': $('#ddlProduct').val(),
        'Density': $('#txtDensity').val(),
        'Temp': $('#txtTemp').val(),
    };

    $.ajax({
        url: "/BaselineDensTemp/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objBaseDensTemp),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenBaseDensTemp();
            }
        }
    });
}