$(document).ready(function () {

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenProductMenu();
        $('#cancelModal').modal('hide');
    });

    if ($("input[type='radio'].radioBtnClass").is(':checked')) {
        var card_type = $("input[type='radio'].radioBtnClass:checked").val();
        //alert(card_type);
    }

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ProductName: {
                validators: {
                    notEmpty: {
                        message: 'The Product Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 40,
                        message: 'The Product Name must be more than 3 and less than or equal to 40 characters long'
                    }
                }
            },
            ProductCode: {
                validators: {
                    notEmpty: {
                        message: 'The Product Code is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The Product Code must be more than 1 and less than or equal to 30 characters long'
                    }
                }
            },
            ProdDescription: {
                validators: {
                    notEmpty: {
                        message: 'The Product Description is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 60,
                        message: 'The Product Description must be more than 3 and less than or equal to 60 characters long'
                    }
                }
            },
            ProdshortName: {
                validators: {
                    notEmpty: {
                        message: 'The Product short Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 40,
                        message: 'The Product short Name must be more than 0 and less than or equal to 40 characters long'
                    }
                }
            },
            ProductGroup: {
                validators: {
                    notEmpty: {
                        message: 'The Product Group is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Product Group'
                    },
                }
            },
            UOM: {
                validators: {
                    notEmpty: {
                        message: 'The UOM is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select UOM'
                    }
                }
            },
            StdDensity: {
                validators: {
                    notEmpty: {
                        message: 'The Standard Density is required and cannot be empty'
                    },
                    numeric: {
                        message: 'The Standard Density must be Integer value.'
                    },
                }
            },
            RECIPENo: {
                validators: {
                    notEmpty: {
                        message: 'The Recipe No is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Recipe No must be Integer value.'
                    },
                }
            },
            TempStd: {
                validators: {
                    notEmpty: {
                        message: 'The Temp Std is required and cannot be empty'
                    },
                    digits: {
                        message: 'TempStd Min must be Integer value.'
                    },
                }
            },
            UpdateDate: {
                validators: {
                    notEmpty: {
                        message: 'The Update Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            AckDate: {
                validators: {
                    notEmpty: {
                        message: 'The Ack Date is required and cannot be empty'
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            NoOfComponents: {
                validators: {
                    digits: {
                        message: 'No of Components must be Integer value.'
                    },
                    between: {
                        min: 1,
                        max: 4,
                        message: 'No of Components must be between 1 to 4'
                    },
                    notEmpty: {
                        message: 'No of Components is required and cannot be empty'
                    }
                }
            },
            NoOfAdditive: {
                validators: {
                    digits: {
                        message: 'No of Additive Quantity must be Integer value.'
                    },
                    between: {
                        min: 0,
                        max: 6,
                        message: 'No of Additive Quantity must be between 0 to 6'
                    }
                }
            },
            ComponentSeq: {
                validators: {
                    notEmpty: {
                        message: 'The Comp. Seq. is required'
                    },
                    digits: {
                        message: 'The Comp. Seq. must be Integer.'
                    },
                    between: {
                        min: 0,
                        max: 4,
                        message: 'The Comp. Seq. must be between 0 to 4'
                    }
                }
            },
            ComponentPercentage: {
                validators: {
                    notEmpty: {
                        message: 'The Component % is required'
                    },
                    numeric: {
                        message: 'The Component % must be numeric.'
                    },
                    between: {
                        min: 1,
                        max: 100,
                        message: 'The Component % must be between 1 to 100'
                    }
                }
            },
            ddlProduct: {
                validators: {
                    notEmpty: {
                        message: 'The Product is required and cannot be empty'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Product'
                    }
                }
            },
            SeqNoInLP: {
                validators: {
                    notEmpty: {
                        message: 'The Seq. No In LP is required'
                    },
                    digits: {
                        message: 'The Seq. No In LP must be Integer.'
                    },
                }
            },

            ddlAdditive: {
                validators: {
                    notEmpty: {
                        message: 'The Additive is required'
                    },
                    greaterThan: {
                        value: 1,
                        message: 'Select Additive'
                    }
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
        },
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });

    $("input:checkbox#chkIsBaseProduct").click(function () {
        if ($(this).is(":checked")) {
            $('#tblCompDetails').parent().hide();
            $('#tblAdditiveDetails').parent().hide();
            $('#txtNoOfComponents').text(1);
            $('#txtNoOfComponents').val(1).attr('readonly', true);
            $('#txtNoOfAdditive').text(0);
            $('#txtNoOfAdditive').val(0).attr('readonly', true);
        }
        else {
            $('#txtNoOfComponents').val('').attr('readonly', false);
            $('#txtNoOfAdditive').val('').attr('readonly', false);
        }
        $('#FormBU').bootstrapValidator('validate');
        //$('#FormBU').bootstrapValidator('resetForm', true);
        
    });

});

function SaveProduct() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Product";
    var activityDetail = "Product Name: " + $('#txtProductName').val() + " (" + $('#txtProductCode').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveProductDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveProductDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveProductDo() {

    var bBaseProduct = 0;

    if ($('#chkIsBaseProduct').is(":checked")) {
        bBaseProduct = 1;
    }
    else {
        bBaseProduct = 0;
    }

    var objProduct = {
        'ProductCode': $('#txtProductCode').val(),
        'ProductName': $('#txtProductName').val(),
        'ProductDescription': $('#txtProdDescription').val(),
        'ProdGroupId': $('#ddlProductGroup').val(),
        'ProductColor': $('#txtProductColor').val(),
        //'AdditiveQty1': $('#txtNoOfAdditive').val(),
        'ProdNameShort': $('#txtProdshortName').val(),
        'UomID': $('#ddlUOM').val(),
        'StdDensity': $('#txtStdDensity').val(),
        'ReceipeNumber': $('#txtRECIPENo').val(),
        'IsBaseProduct': bBaseProduct,
        'TempStd': $('#txtTempStd').val(),
        'HeaderNo': $('#txtHeaderNo').val(),
        'NoOfComp': $('#txtNoOfComponents').val()
    };

    var objProdComp = [];
    var TotalPer = 0;
    var objAdditive = [];

    if (bBaseProduct == 0) {
        for (i = 1; i <= 4; i++) {
            if ($('#txtComponentNo_' + i).is(':visible')) {
                var obj = {
                    'ComponentNo': $('#txtComponentNo_' + i).val(),
                    'BaseProductID': $('#ddlProduct_' + i).val(),
                    'CompPercent': $('#txtComponentPer_' + i).val(),
                    'CompSequence': $('#txtComponentSeq_' + i).val()
                };
                objProdComp.push(obj);
                TotalPer = +TotalPer + +($('#txtComponentPer_' + i).val());
            }
        }
        if (TotalPer != 100) {
            console.log(TotalPer);
            alertDismissable('danger', 'Sum of all components must be 100%');
            return;
        }


        for (i = 1; i <= 6; i++) {
            if ($('#txtSeqNoInLP_' + i).is(':visible')) {
                var obj = {
                    'Enabled': 'true',
                    'AdditiveID': $('#ddlAdditive_' + i).val(),
                    'SeqNoInLPProd': $('#txtSeqNoInLP_' + i).val()
                };
                objAdditive.push(obj);
            }
        }
    }
    

    $.ajax({
        url: "/Product/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objProduct: objProduct, objProdComp: objProdComp, objAdditive: objAdditive }),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenProductMenu();
            }
        }
    });
}

function UpdateProduct() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Product";
    var activityDetail = "Product Name: " + $('#txtProductName').val() + " (" + $('#txtProductCode').val() + ")";

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateProductDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateProductDo(); }, activityName, activityDetail);
            }
        }
    });
}

function UpdateProductDo() {

    //var bBaseProduct = 0;

    //if ($('#chkIsBaseProduct').is(":checked")) {

    //    bBaseProduct = 1;
    //}
    //else {
    //    bBaseProduct = 0;
    //}

    var objProduct = {
        'ProductID': $('#hdnIdKey').val(),
        'ProductCode': $('#txtProductCode').val(),
        'ProductName': $('#txtProductName').val(),
        'ProductDescription': $('#txtProdDescription').val(),
        'ProdGroupId': $('#ddlProductGroup').val(),
        'ProductColor': $('#txtProductColor').val(),
        'ProdNameShort': $('#txtProdshortName').val(),
        'UomID': $('#ddlUOM').val(),
        'StdDensity': $('#txtStdDensity').val(),
        'ReceipeNumber': $('#txtRECIPENo').val(),
        //'IsBaseProduct': bBaseProduct,
        'TempStd': $('#txtTempStd').val(),
        'HeaderNo': $('#txtHeaderNo').val(),
        'NoOfComp': $('#txtNoOfComponents').val()
    };

    var objProdComp = [];
    var TotalPer = 0;
    for (i = 1; i <= 4; i++) {
        if ($('#txtComponentNo_' + i).is(':visible')) {
            var obj = {
                'ComponentNo': $('#txtComponentNo_' + i).val(),
                'BaseProductID': $('#ddlProduct_' + i).val(),
                'CompPercent': $('#txtComponentPer_' + i).val(),
                'CompSequence': $('#txtComponentSeq_' + i).val()
            };
            objProdComp.push(obj);
            TotalPer = +TotalPer + +($('#txtComponentPer_' + i).val());
        }
    }
    if (TotalPer != 100) {
        console.log(TotalPer);
        alertDismissable('danger', 'Sum of all components must be 100%');
        return;
    }
    var objAdditive = [];

    for (i = 1; i <= 6; i++) {
        if ($('#txtSeqNoInLP_' + i).is(':visible')) {
            var obj = {
                'Enabled': 'true',
                'AdditiveID': $('#ddlAdditive_' + i).val(),
                'SeqNoInLPProd': $('#txtSeqNoInLP_' + i).val()
            };
            objAdditive.push(obj);
        }
    }

    $.ajax({
        url: "/Product/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ objProduct: objProduct, objProdComp: objProdComp, objAdditive: objAdditive }),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenProductMenu();
            }
        }
    });
}

function LoadDDLProductGroup(iSel) {
    $.ajax({
        url: "/ProductGroup/GetProductGroups",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlProductGroup').html('');
            var r = "<option value=0>Select Product Group</option>";
            $('#ddlProductGroup').append(r);

            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val.ProductGroupID)) {
                    r = "<option selected value=" + val.ProductGroupID + ">" + val.ProductGroupDesc + "</option>";
                }
                else {
                    r = "<option value=" + val.ProductGroupID + ">" + val.ProductGroupDesc + "</option>";
                }
                $('#ddlProductGroup').append(r);
            });
        }
    });
}

function LoadDDLUOM(iSel) {
    $.ajax({
        url: "/Product/GetUOM",
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlUOM').html('');
            var r = "<option value=0>Select Product Group</option>";
            $('#ddlUOM').append(r);

            $.each(result, function (i, val) {
                if (parseInt(iSel) == parseInt(val.UOMId)) {
                    r = "<option selected value=" + val.UOMId + ">" + val.UOMName + "</option>";
                }
                else {
                    r = "<option value=" + val.UOMId + ">" + val.UOMName + "</option>";
                }
                $('#ddlUOM').append(r);
            });
        }
    });
}

function changeCompartmentNo(ctrl) {
    if (ctrl == null) {
        return false;
    }

    $(ctrl).parent().show();

    $(ctrl).dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "20%" },
                { sWidth: "25%" },
                { sWidth: "25%" },
                { sWidth: "25%" },
            ],
        "bAutoWidth": false,
        "bDestroy": true,
    });


    var comps = $('#txtNoOfComponents').val();

    if (comps != null && comps != 'undefined' && comps != 0) {
        for (i = 1; i <= 4; i++) {
            $('#rowComp_' + i).hide();
        }
        for (i = 1; i <= comps; i++) {
            $('#rowComp_' + i).show();
        }
    }
}

function changeAdditive(ctrl) {
    if (ctrl == null) {
        return false;
    }

    $(ctrl).parent().show();

    $(ctrl).dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "bSort": false,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "30%" },
                { sWidth: "70%" },
            ],
        "bAutoWidth": false,
        "bDestroy": true,
    });


    var additive = $('#txtNoOfAdditive').val();

    if (additive != null && additive != 'undefined') {
        for (i = 1; i <= 6; i++) {
            $('#rowAdditive_' + i).hide();
        }
        for (i = 1; i <= additive; i++) {
            $('#rowAdditive_' + i).show();
        }
    }
}