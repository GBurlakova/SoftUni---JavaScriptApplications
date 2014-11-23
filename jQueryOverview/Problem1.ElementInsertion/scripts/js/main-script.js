var mainModule = (function() { 
    var beforeInsertion = $('#before-insertion');
    var afterInsertion = $('#after-insertion');
    var initialElement = $('#initial-element');
    var selectedOption = -1;
    var newElement = '';

    $('#submit-button').on('click', function () {
        if ( beforeInsertion.is(':checked')) {
            selectedOption =  beforeInsertion.val();
        } else if (afterInsertion.is(':checked')) {
            selectedOption = afterInsertion.val();
        } else {
        	alert('Please select an option before insertion');
        }
        newElement = $('#new-element').val();
        if (selectedOption > -1) {
            processInsertionOperation(selectedOption, newElement, initialElement);
        }
    });

    function processInsertionOperation(selectedOption, elementName, initialElement) {
        if (selectedOption == 1) {
        	insertBefore(elementName, initialElement);
        } else {
        	insertAfter(elementName, initialElement);
        }
    }

    function insertBefore(elementName, initialElement) {
        $('<' + elementName + '>').text("Inserted Before").prependTo(initialElement);
    }

    function insertAfter(elementName, initialElement){
        $('<' + elementName + '>').text("Inserted After").appendTo(initialElement);
    }
})();
