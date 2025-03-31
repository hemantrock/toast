$(document).ready(function () {
   
    $("#confirmOK").unbind('click');
    $("#confirmOK").click(function () {
        $(".modal-backdrop").slideUp('slow');
        OpenDestinationMenu();
        $('#cancelModal').modal('hide');
    });


    $('#txtActiveFromDate').Datepicker({
        format: "dd-MMM-yyyy",
        autoclose: true
    });

    $('#txtActiveToDate').Datepicker({
        format: "dd-MMM-yyyy",
        autoclose: true
    });

    $('#txtActiveToDate').Datepicker()
      .on('hide', function (e) {
          alertActiveToDate($('#txtActiveToDate'));
      });

    $('#FormBU').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            DestinationCode: {
                validators: {
                    notEmpty: {
                        message: 'The Destination Code is required and cannot be empty'
                    },
                    digits: {
                        message: 'The Destination Code should be Numeric'
                    },
                }
            },
            Destination: {
                validators: {
                    notEmpty: {
                        message: 'The Destination name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The Destination name must be more than 3 and less than or equal to 30 characters long'
                    }
                }
            },
            Distance: {
                validators: {
                    notEmpty: {
                        message: 'The Distance is required and cannot be empty'
                    },
                    digits: {
                        message:'Distance must be Integer value.'
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
            var fullName = [validator.getFieldElements('longName').val(),
                            validator.getFieldElements('shortName').val()].join(' ');
        }
    });
});

function SaveDestination() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Add a New Destination";
    var activityDetail = "Destination: " + $('#txtDestinationCode').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                SaveDestinationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { SaveDestinationDo(); }, activityName, activityDetail);
            }
        }
    });
}

function SaveDestinationDo()
{
   
    var objDestination = {
        'DestinationCode': $('#txtDestinationCode').val(),
        'DestinationDesc': $('#txtDestination').val(),
        'Distance': $('#txtDistance').val(),
    };

    $.ajax({
        url: "/Destination/Add",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objDestination),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenDestinationMenu();
            }
        }

        //success: function (result) {
        //    if (result == "pass") {
        //        alertDismissable("success", $('#txtDestination').val() + " saved successfully.");
        //        OpenDestinationMenu();
        //    }
        //    else if (result == "fail") {
        //        alertDismissable("danger", "Failed to save Destination: " + $('#txtLongName').val() + ".");
        //    }
        //    else if (result == "error") {
        //        alertDismissable("danger", "Error in saving Destination: " + $('#txtLongName').val() + ".");
        //    }
        //}
    });
}
function UpdateDestination() {
    $('#FormBU').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }
    var activityName = "Edit Existing Destination";
    var activityDetail = "Destination: " + $('#txtDestinationCode').val();

    $.ajax({
        type: "GET",
        url: "/Home/ValidateRequiredTrnPwd?activityName=" + activityName,
        cache: false,
        success: function (result) {
            if (result.blnStatus != 'undefined' && result.blnStatus == false) {
                UpdateDestinationDo();
            }
            else {
                ShowPasswordModalForReqTrn(activityName + " : Requires Transaction Password", function () { UpdateDestinationDo(); }, activityName, activityDetail);
            }
        }
    });
}
function UpdateDestinationDo()
{
    //int DestinationID
    // string [DestinationDesc]
    // real [Distance] 
    // int [UserID] 
    // datetimt [TS]

    var objDestination = {
        'UniqueID': $('#hdnUniqueID').val(),
        'DestinationCode': $('#txtDestinationCode').val(),
        'DestinationDesc': $('#txtDestination').val(),
        'Distance': $('#txtDistance').val(),
    };

    $.ajax({
        url: "/Destination/Edit",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(objDestination),
        cache: false,

        success: function (result) {
            alertDismissable(result.strType, result.strMessage);
            if (result.blnStatus == true) {
                OpenDestinationMenu();
            }
        }


        //success: function (result) {
        //    if (result == "pass") {
        //        alertDismissable("success", $('#txtDestination').val() + " updated successfully.");
        //        OpenDestinationMenu();
        //    }
        //    else if (result == "fail") {
        //        alertDismissable("danger", "Failed to update Destination: " + $('#txtLongName').val() + ".");
        //    }
        //    else if (result == "error") {
        //        alertDismissable("danger", "Error in updation of  Destination: " + $('#txtLongName').val() + ".");
        //    }
        //}



    });
}