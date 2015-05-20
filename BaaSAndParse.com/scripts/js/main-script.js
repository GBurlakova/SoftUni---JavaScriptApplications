$(function() {
    // Keys
    var PARSE_APP_ID = 'WknsPEvrcUFna4SmSu5pe4VBFjTs8tjVAbgzQBjt';
    var PARSE_REST_API_KEY = 'RyJzVHkSrx5JIlSZiKtY9Mh3Gph0yCWpB00lkNnZ';

    // Countries tab
    var $countriesTable = $('#countries');
    var columnNamesCountiesTable = ['Name', 'Capital', 'Continent', 'Population'];
    var columnsCountCountiesTable = columnNamesCountiesTable.length;
    var $operationsOverCountriesField = $('#edit-delete-add-country');
    var $deleteCountryButton = $('#delete-country');
    var $editCountryButton = $('#edit-country');
    var $addCountryButton = $('#add-country');

    // Towns tab
    var $townsTable = $('#towns');
    var columnNamesTownsTable = ['Name'];
    var columnsCountTownsTable = columnNamesTownsTable.length;
    var $countriesSelect = $('#country');
    var $operationsOverTownsField = $('#edit-delete-add-town');
    var $deleteTownButton = $('#delete-town');
    var $editTownButton = $('#edit-town');
    var $addTownButton = $('#add-town');

    // Common functions
    $(document).ready(function () {
        loadCountiesData(columnNamesCountiesTable, columnsCountCountiesTable, $countriesTable, 'Name', $countriesSelect);
        loadTownsData(columnNamesTownsTable, columnsCountTownsTable, $townsTable);
    });

    function deleteObject(className, objectId) {
        $.ajax({
            method: 'DELETE',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId
        }).success(function () {
            location.reload();
        });
    }

    function updateObject(className, objectId, data) {
        $.ajax({
            method: 'PUT',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId,
            data: JSON.stringify(data),
            contentType: "application/json"
        }).success(function () {
            location.reload();
        });
    }

    function addObject(className, data) {
        $.ajax({
            method: 'POST',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/' + className,
            data: JSON.stringify(data),
            contentType: "application/json"
        }).success(function () {
            location.reload();
        })
    }

    function addDataToTable(dataSource, tableColumnNames, tableColumnsCount, $table) {
        var cell;
        var text;

        for (var q in dataSource.results) {
            var currentResult = dataSource.results[q];
            var row = $('<tr>');
            for (var col = 0; col < tableColumnsCount; col++) {
                cell = $('<td>');
                text = currentResult[tableColumnNames[col]];
                cell.text(text);
                cell.appendTo(row);
            }
            text = currentResult.objectId;
            row.attr('data-id', text);
            row.appendTo($table);
        }
    }

    function addDataToSelect(dataSource, columnNameToRetrieve,  $select) {
        for (var q in dataSource.results) {
            var currentResult = dataSource.results[q];
            var option = $('<option>');
            option.text(currentResult[columnNameToRetrieve]);
            option.val(currentResult.objectId);
            option.appendTo($select);
        }
    }

    // Functions countries tab
    function loadCountiesData(tableColumnNames, tableColumnsCount, $table, column, $select) {
        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country'
        }).success(function(dataSource) {
            addDataToTable(dataSource, tableColumnNames, tableColumnsCount, $table);
            addDataToSelect(dataSource, column,  $select);
        }).error(function() {

        });
    }

    $countriesTable.on('dblclick', 'tr', function () {
        var selectedId = $(this).attr('data-id');
        var data = $(this).find('td');
        var countryName = $(data[0]).text();
        var continent = $(data[1]).text();
        var capital = $(data[2]).text();
        var population = $(data[3]).text();

        $operationsOverCountriesField.attr('data-id', selectedId);
        $operationsOverCountriesField.find('#country-name').val(countryName);
        $operationsOverCountriesField.find('#continent').val(continent);
        $operationsOverCountriesField.find('#capital').val(capital);
        $operationsOverCountriesField.find('#population').val(population);
    });

    $deleteCountryButton.on('click', function () {
        var objectToDelete = $operationsOverCountriesField.attr('data-id');
        var className = $operationsOverCountriesField.attr('data-class-name');

        deleteObject(className, objectToDelete);
    });

    $editCountryButton.on('click', function () {
        var objectToUpdate = $operationsOverCountriesField.attr('data-id');
        var className = $operationsOverCountriesField.attr('data-class-name');
        var countryName = $operationsOverCountriesField.find('#country-name').val();
        var continent = $operationsOverCountriesField.find('#continent').val();
        var capital = $operationsOverCountriesField.find('#capital').val();
        var population = $operationsOverCountriesField.find('#population').val();
        var data = {
            Name: countryName,
            Continent: continent,
            Capital: capital,
            Population: Number(population)
        };

        updateObject(className, objectToUpdate, data);
    });

    $addCountryButton.on('click', function () {
        var className = $operationsOverCountriesField.attr('data-class-name');
        var countryName = $operationsOverCountriesField.find('#country-name').val();
        var continent = $operationsOverCountriesField.find('#continent').val();
        var capital = $operationsOverCountriesField.find('#capital').val();
        var population = $operationsOverCountriesField.find('#population').val();
        var data = {
            Name: countryName,
            Continent: continent,
            Capital: capital,
            Population: Number(population)
        };

        addObject(className, data);
    });

    // Functions towns tab
    function loadTownsData(tableColumnNames, tableColumnsCount, $table) {
        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town'
        }).success(function(dataSource) {
            addDataToTable(dataSource, tableColumnNames, tableColumnsCount, $table);
        }).error(function() {

        });
    }

    $countriesSelect.on('change', function () {
        var countryId = $(this).val();
        $townsTable.children('tbody').html('');
        filterTownsByCountry(countryId, columnNamesTownsTable, columnsCountTownsTable, $townsTable);
    });

    function filterTownsByCountry(countryId, tableColumnNames, tableColumnsCount, $table) {
        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"Country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}'
        }).success(function(dataSource) {
            addDataToTable(dataSource, tableColumnNames, tableColumnsCount, $table);
        }).error(function() {

        });
    }

    function showCountry(townId) {
        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town/' + townId
        }).success(function(dataSource) {
            var countryId = dataSource.Country.objectId;
            $countriesSelect.val(countryId);
        }).error(function() {

        });
    }

    $townsTable.on('dblclick', 'tr', function () {
        var selectedId = $(this).attr('data-id');
        var data = $(this).find('td');
        var countryName = $(data[0]).text();
        showCountry(selectedId);
        $operationsOverTownsField.attr('data-id', selectedId);
        $operationsOverTownsField.find('#town-name').val(countryName);
    });

    $deleteTownButton.on('click', function () {
        var objectToDelete = $operationsOverTownsField.attr('data-id');
        var className = $operationsOverTownsField.attr('data-class-name');

        deleteObject(className, objectToDelete);
    });

    $editTownButton.on('click', function () {
        var objectToUpdate = $operationsOverTownsField.attr('data-id');
        var className = $operationsOverTownsField.attr('data-class-name');
        var townName = $operationsOverTownsField.find('#town-name').val();
        var countryId = $countriesSelect.val();
        var country = {"__type":"Pointer","className":"Country","objectId":countryId};

        var data = {
            Name: townName,
            Country: country
        };

        updateObject(className, objectToUpdate, data);
    });

    $addTownButton.on('click', function () {
        var className = $operationsOverTownsField.attr('data-class-name');
        var townName = $operationsOverTownsField.find('#town-name').val();
        var country = $countriesSelect.val();
        var data = {
            Name: townName,
            Country: {
                "__type":"Pointer",
                "className":"Country",
                "objectId":country}
        };

        addObject(className, data);
    });
});