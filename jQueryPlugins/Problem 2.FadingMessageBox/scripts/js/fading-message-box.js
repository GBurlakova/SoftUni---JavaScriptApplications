(function ($) {
    var SHOW_INTERVAL = 1000,
        LIVE_TIME = 3000;
    var currentAvailableBoxId = 1;

    var MessageBox = (function() {
        function MessageBox(message) {
            this._$box = $('<div id=\'' + currentAvailableBoxId + '\'><\/div>').text(message);
            this._boxId = currentAvailableBoxId;
            currentAvailableBoxId++;
        }

        MessageBox.prototype.setStyleClass = function setStyleClass(styleClass) {
            this._$box.addClass(styleClass);
        };

        MessageBox.prototype.appendToPage = function appendToPage() {
            this._$box.appendTo('main');
        };

        MessageBox.prototype.startAnimation = function startAnimation() {
            var thisScope = this;
            this._$box.animate({ opacity: '+=1' }, SHOW_INTERVAL);
            setTimeout(
                function () {
                    removeMessageBox.call(thisScope);
                },
                LIVE_TIME
            );
        };

        function removeMessageBox() {
            $('#' + this._boxId).remove();
        }

        return MessageBox;
    })();

    $.fn.messageBox = function () {
        function success(message) {
            var $messageBox = new MessageBox(message);
            $messageBox.setStyleClass('success-message');
            $messageBox.appendToPage();
            $messageBox.startAnimation();
            return this;
        }

        function error(message) {
            var $messageBox = new MessageBox(message);
            $messageBox.setStyleClass('error-message');
            $messageBox.appendToPage();
            $messageBox.startAnimation();
            return this;
        }

        return {
            success: success,
            error: error
        }
    }
})(jQuery);

(function() {
    $('#success')
        .click(function(){
            var messageBox = $().messageBox()
            messageBox.success('success message');
        });

    $('#error')
        .click(function(){
            var messageBox = $().messageBox()
            messageBox.error('error message');
        });
})();


