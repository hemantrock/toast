
$(document).ready(function () {
    $('#tblTruckDetailsEdit').dataTable({
        "iDisplayLength": iGblNoRows,
        "bLengthChange": false,
        "bFilter": false,
        "bPaginate": true,
        "bInfo": true,
        "aoColumns":
            [
                { sWidth: "0%" },
                { sWidth: "20%" },
                { sWidth: "40%" },
                { sWidth: "40%" },
                { sWidth: "0%" },
            ],
        "bAutoWidth": false,
        "fnDrawCallback": function (oSettings) {
            BindSpanDelete();
        }
    });

    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenTruckDetailsMenu();
        $('#cancelModal').modal('hide');
    });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            truckNo: {
                validators: {
                    notEmpty: {
                        message: 'The Truck No is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: 'The Truck No must be more than 3 and less than or equal to 30 characters long'
                    }
                }
            },

            CompartNo: {
                validators: {
                    notEmpty: {
                        message: 'The Compartment No is required and cannot be empty'
                    },
                    digits: {
                        message: 'Compartment No should be Integer Value'
                    },
                }
            },
            capacity: {
                validators: {
                    notEmpty: {
                        message: 'The capacity is required and cannot be empty'
                    },

                    digits: {
                        message: 'capacity should be Integer Value'
                    },
                }
            },
            Product: {
                validators: {
                    notEmpty: {
                        message: 'The Product is required and cannot be empty'
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
        },
        submitHandler: function (validator, form, submitButton) {
            var fullName = [validator.getFieldElements('txttruckNo').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveTruckDetails() {


    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTruckDetails = {
        'CompNo': $('#txtCompartNo').val(),
        'Capacity': $('#txtcapacity').val(),
        'ProductID': $('#ddlProduct').val(),
    };

    $.ajax({
        url: "/TruckDetails/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTruckDetails),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txttruckNo').val() + " saved successfully.");
                OpenTruckDetailsMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to save TruckDetails: " + $('#txttruckNo').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in saving TruckDetails: " + $('#txttruckNo').val() + ".");
            }
        }
    });
}

function UpdateTruckDetails() {
   
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    var objTruckDetails = {
        'TruckID': $('#hdnIdKey').val(),
        'TruckNo': $('#txttruckNo').val(),
        'CompNo': $('#txtCompartNo').val(),
        'Capacity': $('#txtcapacity').val(),
        'ProductID': $('#ddlProduct').val(),
    };

    $.ajax({
        url: "/TruckDetails/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objTruckDetails),
        cache: false,
        success: function (result) {
            if (result == "pass") {
                alertDismissable("success", $('#txttruckNo').val() + " updated successfully.");
                OpenTruckDetailsMenu();
            }
            else if (result == "fail") {
                alertDismissable("danger", "Failed to update TruckDetails: " + $('#txttruckNo').val() + ".");
            }
            else if (result == "error") {
                alertDismissable("danger", "Error in updation of  TruckDetails: " + $('#txttruckNo').val() + ".");
            }
        }
    });
}