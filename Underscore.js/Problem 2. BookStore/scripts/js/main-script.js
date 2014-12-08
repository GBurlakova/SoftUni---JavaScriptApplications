(function() { 
    var $booksInput = $('#books');
    var $groupAndSort = $('#group-and-sort');
    var $avgPrice = $('#avg-price');
    var $filter = $('#filter-books');
    var $resultWrapper = $('#result');

    var books;

    $groupAndSort.on('click', function () {
        books = JSON.parse($booksInput.val());
        processGroupAndGroupOperations(books)
    });
    $avgPrice.on('click', function () {
        books = JSON.parse($booksInput.val());
        calculateAvgPriceForAuthors(books);
    });
    $filter.on('click', function () {
        books = JSON.parse($booksInput.val());
        filterBooks(books, 'Bulgarian', 'German', 30);
    });

    function processGroupAndGroupOperations(students) {
        var bookesProcessed =  _.chain(books)
            .sortBy(function (book) {
                return [book.author, book.price].join("_");
            })
            .groupBy('language').value();
        showResult(bookesProcessed);
    }

    function calculateAvgPriceForAuthors(books) {
        var averageBookPrices = {};
        var booksGrouped = _.groupBy(books, 'author');
        booksGrouped = _.each(booksGrouped, function (booksByAuthor) {
            var bookPublished = booksByAuthor.length;
            var totalPriceForAuthor = 0;
            _.chain(booksByAuthor)
                .pluck('price')
                .map(function (price) {
                    var priceParsed = parseFloat(price.replace(',', '.'));
                    totalPriceForAuthor += priceParsed;
            });
            var avgPriceForAuthor = (totalPriceForAuthor / bookPublished).toFixed(2);
            var author = booksByAuthor[0].author;
            averageBookPrices[author] = avgPriceForAuthor;
        });
        showResult(averageBookPrices);
    }


    function filterBooks(books, firstLanguageFilter, secondLanguageFilter, priceFilter) {
        var booksProcessed = _.chain(books)
            .filter(function (book) {
                return  (book.language === firstLanguageFilter || book.language === secondLanguageFilter) &&
                    parseFloat(book.price.replace(',', '.')) < priceFilter;
            })
            .groupBy('author')
            .value();
        showResult(booksProcessed);
    }

    function showResult(array) {
        $resultWrapper.text('');
        $resultWrapper.text(JSON.stringify(array));
    }
})();