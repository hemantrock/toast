
function LoadDDLAvlBay(Ctrl, PrdId, BayId) {
    $.ajax({
        url: "/LoadSummary/SelectBaysForAllocate?Id=" +PrdId + "&BayId=" +BayId,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $(Ctrl).html('');
            var r = "<option value=0>Available Bay</option>";
            $(Ctrl).append(r);

            $.each(result, function (i, val) {
                if (parseInt(PrdId) == parseInt(val.ProductID)) {
                    r = "<option selected value=" + val.BayID + ">" + val.BayID + "</option>";
                }
                else {
                    r = "<option value=" + val.BayID + ">" + val.BayID + "</option>";
                }
                $(Ctrl).append(r);
            });
        }
    });
}


function BayAssignddl(Ctrl, LoadID, CompId) {
    $.ajax({
        url: "/LoadSummary/BayAssign?LoadID=" + LoadID + "&CompId=" + CompId,
        type: "GET",
        datatype: "json",
        cache: false,
        success: function (result) {
            $(Ctrl).html('');
            var r = "<option value=0>Assign Bay</option>";
            $(Ctrl).append(r);
            $.each(result, function (i, val) {
                r = "<option value=" + val.LoadingPointNo + ">" + "Bay:" + val.BayID + "(LP:" + val.LoadingPointNo + ")" + "</option>";
                $(Ctrl).append(r);
            });
        }
    });
}

