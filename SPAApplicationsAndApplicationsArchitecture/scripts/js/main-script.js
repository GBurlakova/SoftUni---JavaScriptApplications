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

    dataHandler.getData('Book', '').then(displayBooks, function (error) {
        alert(error.message);
    });

    $addNewBook.on('click', function () {
        processAddNewBookOperation();
    });

    function displayBooks(booksInput) {
        var books = booksInput;
        var booksCount = books.length;
        $.get('views/book-template.html', function(template) {
            for(var book = 0; book < booksCount; book += 1){
                var currentBook = books[book];
                var bookData = {
                    title: currentBook.title,
                    author: currentBook.author,
                    isbn: currentBook.isbn,
                    bookId: currentBook.objectId
                };
                var templateFilled = Mustache.render(template, bookData);
                var $currentBookElement = $(templateFilled);
                var $editButton = $('.editButton', $currentBookElement);
                $editButton
                    .data(currentBook)
                    .on('click', function () {
                    var bookToBeEdited = $(this).data();
                    showEditField(bookToBeEdited);
                });
                var $deleteButton = $('.deleteButton', $currentBookElement);
                $deleteButton
                    .attr('data-id', currentBook.objectId)
                    .on('click', function () {
                        processDeleteOperation('Book', $(this).attr('data-id'));
                    });
                $currentBookElement.appendTo($booksWrapper);
            }
        });
    }

    function processDeleteOperation(className, objectId){
        dataHandler.deleteObject(className, objectId)
            .then(function () {
                location.reload();
            }, function (error) {
                alert(error.message)
            });
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
        dataHandler.updateObject(className, bookToBeEditedId, data)
            .then(function () {
                location.reload();
            }, function (error) {
                alert(error.message);
            });
    }

    function processAddNewBookOperation() {
        var book = {
            title: $newBookTitle.val(),
            author:  $newBookAuthor.val(),
            isbn: $newBookISBN.val()
        };
        dataHandler.createObject('Book', book)
            .then(function () {
                location.reload();
            }, function (error) {
                alert(error.message);
            });
    }
})();

