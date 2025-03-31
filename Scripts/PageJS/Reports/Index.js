$(document).ready(function () {
    LoadReportGroup();
    LoadDDLReportsMaster();
    LoadDDLReportsPeriods();
    LoadDDLReportsShift();
    LoadDDLDownLoadType();

    $('#formReports').bootstrapValidator({
        excluded: ['disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //ReportGroup: {
            //    validators: {
            //        greaterThan: {
            //            value: 1,
            //            message: 'Select Group'
            //        }
            //    }
            //},
            //Report: {
            //    validators: {
            //        greaterThan: {
            //            value: 1,
            //            message: 'Select Report'
            //        }
            //    }
            //},
            Shift: {
                validators: {
                    greaterThan: {
                        value: 1,
                        message: 'Select Shift'
                    }
                }
            },
            FromDate: {
                validators: {
                    notEmpty: {
                        message: 'Field is empty'
                    },
                }
            },
            ToDate: {
                validators: {
                    notEmpty: {
                        message: 'Field is empty'
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
    });
    $('#ddlInputReportName').select2();

    $('#jqxInputReportName').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //alert('You pressed a "enter" key in textbox');
            event.preventDefault();
            ViewReports();
        }
    });
    $('#ddlInputReportName').keypress(function (event) {
        debugger;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            alert('You pressed a "enter" key in textbox');
            event.preventDefault();
            ViewReports();
        }
    });
});

function LoadReportGroup() {
    $.ajax({
        url: "/Reports/GetReportsGroup",
        type: "GET",
        datatype: "json",
        //cache: false,
        success: function (result) {
            $('#ddlReportGroup').html('');
            var r = "<option value=0>Select Report Group</option>";
            $('#ddlReportGroup').append(r);

            $.each(result, function (i, val) {
                r = "<option value=" + val.UniqueId + ">" + val.ReportGroupName + "</option>";
                $('#ddlReportGroup').append(r);
            });
        }
    });

    //New - 14-Jul-2023
    //$.ajax({
    //    url: "/Reports/GetAllReportsList",
    //    type: "GET",
    //    datatype: "json",
    //    //cache: false,
    //    success: function (result) {
    //        console.log(result);
    //        $("#jqxInputReportName").autocomplete({
    //            source: result,
    //        minLength: 2,
    //            autoFocus: true,
    //                focus: function (event, ui) {
    //                    event.preventDefault();
    //                    $('#jqxInputReportName').val(ui.item.label);
    //                },

    //        select: function (event, ui) {
    //            event.preventDefault();
    //            $('#jqxInputReportName').val(ui.item.value);
    //            $('#jqxInputReportName').val(ui.item.value);
    //            /*$(document).click(eval(ui.item.action));*/
    //            //$('.togglerContent').slideToggle(350);
    //            //event.target.value = '';
    //            return false;
    //        }
    //    });
    //    }
    //});

    //Old - 14-Jul-2023
    //var url = "/Reports/GetAllReportsList";
    //// prepare the data
    //var source =
    //{
    //    datatype: "json",
    //    datafields: [
    //        { name: 'ReportID' },
    //        { name: 'ReportName' }
    //    ],
    //url: url
    //};
    //var dataAdapter = new $.jqx.dataAdapter(source);
    //// Create a jqxInput
    //$("#jqxInputReportName").jqxInput({ source: dataAdapter, placeHolder: "Select Report Name", displayMember: "ReportName",  valueMember: "ReportID", width: 250, height: 30 });
    //$("#jqxInputReportName").on('select', function (event) {
    //    if (event.args) {
    //        var item = event.args.item;
    //        if (item) {
    //        }
    //    }
    //});

}

function LoadDDLReportsMaster() {

    var iSel = $('#ddlReportGroup option:selected').val();

    if (iSel == null || iSel == '0' || iSel == 'undefined')
    {
        return false;
    }

    $.ajax({
        url: "/Reports/GetReportsList?ReportGroupID="+iSel,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $('#ddlReports').html('');
            var r = "<option value=0>Select Report</option>";
            $('#ddlReports').append(r);
            $.each(result, function (i, val) {
                r = "<option value=" + val.UniqueId + ">" + val.ReportTitle + "</option>";
                $('#ddlReports').append(r);
            });
        }
    });
}

function LoadDDLReportsPeriods() {
    $.ajax({
        url: "/Reports/GetReportPeriods",
        type: "GET",
        datatype: "json",
        //cache: false,
        success: function (result) {
            $('#ddlPeriod').html('');
            var r = "<option value=0>Select Period</option>";
            $('#ddlPeriod').append(r);
            $.each(result, function (i, val) {
                r = "<option value=" + val.UniqueId + ">" + val.PeriodName + "</option>";
                $('#ddlPeriod').append(r);
            });
        }
    });
}

function LoadDDLReportsShift() {
    $.ajax({
        url: "/Reports/GetReportShifts",
        type: "GET",
        datatype: "json",
        //cache: false,
        success: function (result) {
            $('#ddlShift').html('');
            var r = "<option value=0 data-FromTime='' data-ToTime=''>Select Shift</option>";
            $('#ddlShift').append(r);
            $.each(result, function (i, val) {
                r = "<option value=" + val.UniqueId + " data-FromTime='" + val.ShiftFromTime + "' data-ToTime='" + val.ShiftToTime + "'>" + val.ShiftName + "</option>";
                $('#ddlShift').append(r);
            });
            $('#ddlShift').val(4);
            InitializeDTPickers();
        }
    });
}

function LoadDDLDownLoadType() {

    var r = "<option value=0>Select File Type</option>";
    $('#ddlFileType').append(r);
    r = "<option value='pdf'>PDF - Adobe PDF</option>";
    $('#ddlFileType').append(r);
    r = "<option value='xls'>XLS - MS Excel</option>";
    $('#ddlFileType').append(r);
    r = "<option value='doc'>DOC - MS Word</option>";
    $('#ddlFileType').append(r);
}

function InitializeDTPickers()
{
    $('#dtpFrom').datetimepicker({
        format: "D-MMM-YYYY"
    });

    $('#dtpTo').datetimepicker({
        format: "D-MMM-YYYY"
    });

    var iSel = $('#ddlShift option:selected').val();

    if (iSel != null && iSel != 0 && iSel != "")
    {       
        if (iSel != 4) {
            $('#dtpFromTime').prop('disabled', true);
            $('#dtpToTime').prop('disabled', true);
            $('#dtpFromTime').val($('#ddlShift option:selected').attr('data-FromTime'));
            $('#dtpToTime').val($('#ddlShift option:selected').attr('data-ToTime'));
        }
        else
        {
            $('#dtpFromTime').prop('disabled', false);
            $('#dtpToTime').prop('disabled', false);
            $('#dtpFromTime').val($('#ddlShift option:selected').attr('data-FromTime'));
            $('#dtpToTime').val($('#ddlShift option:selected').attr('data-ToTime'));

            $('#dtpFromTime').datetimepicker({
                format: "HH:mm",
                //pickDate: false,
                //autoclose: true
            });

            $('#dtpToTime').datetimepicker({
                format: "HH:mm",
                //pickDate: false,
                //autoclose: true
            });

            //$('#dtpFromTime').datetimepicker('update');
            //$('#dtpToTime').datetimepicker('update');
        }
    }
}

function ViewReports()
{
    if ($('.has-error').length > 0) {
        return false;
    }
    var ReportID = 0;
    if ($('#ChbxRpName').is(":checked") == true)
    { ReportID = $("#ddlInputReportName").val(); }
    else if ($('#ChbxRpGroup').is(":checked") == true)
    {  ReportID = $('#ddlReports option:selected').val();  }

    if (ReportID == 0 || ReportID == undefined)
    { alertDismissable("danger", "Please select a proper Report"); return false; }
   
    $.ajax({
        type: "GET",
        url: "/Reports/DisplayPdfFile?ReportId=" + ReportID + "&FromDate=" + $('#dtpFrom').val() + " " + $('#dtpFromTime').val() + "&ToDate=" + $('#dtpTo').val() + " " + $('#dtpToTime').val(),
        UpdateTargetId: "dvContent",
        cache: false,
        success: function (result) {
            

            if (result.blnStatus !=null && result.blnStatus == false) {
                alertDismissable(result.strType, result.strMessage);
                return false;
            }
            
            $("#reportData").html(result);
            
            var innerHgt = $(window).innerHeight();
            //$('embed.report-content').css('height', innerHgt);
            //var pleaseWTxt = $('.report-welcome-txt');
            //if (pleaseWTxt!=undefined) { pleaseWTxt.show(); }
            //pleaseWTxt.hide();
        }
    });
}

function DownloadReport(src) {

    $('#formReports').bootstrapValidator('validate');

    if ($('.has-error').length > 0) {
        return false;
    }

    if ($('#ddlFileType').val() == 0) {
        alertDismissable("warning", 'Select Correct File Type for Download');
        return false;
    }

    var ReportID = $('#ddlInputReportName').val();
    if (ReportID == undefined) { ReportID = $('#ddlReports option:selected').val(); }
    if (ReportID == 0 || ReportID == undefined)
    { alertDismissable("danger", "Please select a proper Report"); return false; }

    $(src).attr('href', function () {
        return "/Reports/DownloadReportFile?ReportId=" + ReportID + "&FromDate=" + $('#dtpFrom').val() + " " + $('#dtpFromTime').val() + "&ToDate=" + $('#dtpTo').val() + " " + $('#dtpToTime').val() + "&FileType=" + $('#ddlFileType').val();
    });
}