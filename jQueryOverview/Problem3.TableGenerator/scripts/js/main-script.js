var mainModule = (function() {
    String.prototype.capitalize = function capitlize() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var tableDataInput = $('#table-data');
    var tableDataAsString = '';
    var tableData;
    var tableHeader = $('#table-header-first-row');
    var tableBody = $('#table-body');

    $('#submit-button').on('click', function () {
        var tableColumnHeaders;
        var tableColumnsCount;
        var tableRows;
        var newRow = '';
        var columnName = '';

        tableDataAsString = tableDataInput.val();
        tableData = $.parseJSON(tableDataAsString);
        tableColumnHeaders = Object.keys(tableData[0]);
        tableColumnsCount = tableColumnHeaders.length;
        tableRows = tableData.length;
        for(var columnIndex = 0; columnIndex <  tableColumnsCount; columnIndex++){
            $('<th>').text(tableColumnHeaders[columnIndex].capitalize()).appendTo(tableHeader);
        }
        for (var row = 0; row < tableRows; row++) {
            newRow = '<tr>';
            for (var cell = 0; cell < tableColumnsCount; cell++) {
                columnName = tableColumnHeaders[cell];
                newRow += '<td>' + tableData[row][columnName] + '</td>';
            }
            newRow += '</tr>';
            tableBody.append(newRow);
        }
    });
})();
