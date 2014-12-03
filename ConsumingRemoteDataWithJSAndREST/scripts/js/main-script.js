var DataHandler = (function() {
    function DataHandler(applicationId, restAPIId) {
        this.setApplicationId(applicationId);
        this.setRestAPIId(restAPIId);
    }

    DataHandler.prototype.setApplicationId = function setApplicationId(applicationId) {
        this._applicationId = applicationId;
    };

    DataHandler.prototype.getApplicationId = function getApplicationId() {
        return this._applicationId;
    };

    DataHandler.prototype.setRestAPIId = function setRestAPIId(restAPIId) {
        this._restAPIId = restAPIId;
    };

    DataHandler.prototype.getRestAPIId = function getRestAPIId() {
        return this._restAPIId;
    };

    DataHandler.prototype.createObject = function addObject(className, data) {
        $.ajax({
            method: 'POST',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className,
            data: JSON.stringify(data),
            contentType: "application/json"
        }).success(function () {
            location.reload();
        })
    };

    DataHandler.prototype.deleteObject = function deleteObject(className, objectId) {
        $.ajax({
            method: 'DELETE',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId
        }).success(function () {
            location.reload();
        });
    };

    DataHandler.prototype.updateObject = function updateObject(className, objectId, data) {
        $.ajax({
            method: 'PUT',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId,
            data: JSON.stringify(data),
            contentType: "application/json"
        }).success(function () {
            location.reload();
        });
    };

    DataHandler.prototype.getData = function getData(className, objectId, callBack) {
        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId
        }).success(function (data) {
            callBack.call('', data.results);
        });
    };

    return DataHandler;
})();


(function() {
    // Keys
    var PARSE_APP_ID = '49Y5MsNMOczGnEv1bh7cFsL6hyzHleLkcidKWwJb';
    var PARSE_REST_API_KEY = '5S3jn3BQmYbMvyqt576UCDJZXawA5oLsRPEeEg9l';

    var dataHandler = new DataHandler(PARSE_APP_ID, PARSE_REST_API_KEY);

    var $booksWrapper = $('#books');

    // Edit book fields
    var $bookTitle = $('#book-title');
    var $bookAuthor = $('#book-author');
    var $bookISBN = $('#book-isbn');
    var $saveChangesButton = $('#save-changes');

    // Add new book fields
    var $newBookTitle = $('#new-book-title');
    var $newBookAuthor = $('#new-book-author');
    var $newBookISBN = $('#new-book-isbn');
    var $addNewBook = $('#add-new-book');

    dataHandler.getData('Book', '', displayBooks);

    $addNewBook.on('click', function () {
        processAddNewBookOperation();
    });

    function displayBooks(books) {
        var $currentBook;
        var $title;
        var $author;
        var $isbn;
        var $deleteButton;
        var $editButton;
        var booksCount = books.length;

        for(var book = 0; book < booksCount; book += 1){
            $currentBook = $('<div>')
                .attr('class', 'book');
            $deleteButton = $('<button class="deleteButton">')
                .attr('data-id', books[book].objectId)
                .text('Delete')
                .on('click', function () {
                    processDeleteOperation('Book', $(this).attr('data-id'));
                });
            $editButton = $('<button class="editButton">')
                .data(books[book])
                .text('Edit')
                .on('click', function () {
                    showEditField($(this).data());
                });
            $title = $('<div class="title">')
                .text(books[book].title);
            $author = $('<div>')
                .text('Author: ' + books[book].author);
            $isbn = $('<div>')
                .text('ISBN: ' + books[book].isbn);
            $currentBook.append($title);
            $currentBook.append($author);
            $currentBook.append($isbn);
            $currentBook.append($editButton);
            $currentBook.append($deleteButton);
            $booksWrapper.append($currentBook);
        }
    }

    function processDeleteOperation(className, objectId){
        dataHandler.deleteObject(className, objectId)
    }

    function showEditField(bookToBeEdited) {
        $bookTitle.val(bookToBeEdited.title);
        $bookAuthor.val(bookToBeEdited.author);
        $bookISBN.val(bookToBeEdited.isbn);
        $saveChangesButton
            .attr('id', bookToBeEdited.objectId)
            .on('click', function () {
                var bookToBeEditedId = $(this).attr('id');
                var data = {
                    author: $bookAuthor.val(),
                    title:  $bookTitle.val(),
                    isbn: $bookISBN.val() };
                processEditOperation.call('', 'Book', bookToBeEditedId, data);
            });
    }

    function processEditOperation(className, bookToBeEditedId, data) {
        dataHandler.updateObject(className, bookToBeEditedId, data);
    }

    function processAddNewBookOperation() {
        var book = {
            title: $newBookTitle.val(),
            author:  $newBookAuthor.val(),
            isbn: $newBookISBN.val()
        };
        dataHandler.createObject('Book', book);
    }
})();

