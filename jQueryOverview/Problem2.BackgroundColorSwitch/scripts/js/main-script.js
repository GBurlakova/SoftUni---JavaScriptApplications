var mainModule = (function() {
    var colorInput = $('#background-color');
    var classNameInput = $('#class-name');
    var className = '';
    var color;

    $('#submit-button').on('click', function () {
        className = classNameInput.val();
        color = colorInput.val();
        $('.' + className).css('background-color', color);
    });
})();
