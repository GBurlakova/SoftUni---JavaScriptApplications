(function() { 
    var ERROR_MESSAGE = 'Please enter your name';

    var $userData = $('#user-data');
    var $visitsCount = $('#visits-count');
    var $sendButton = $('#send-button');
    var $userName = $('#user-name');
    var $message = $('#message');

    $sendButton.on('click', function () {
        var userName = $userName.val();
        if (userName) {
            saveUserData(userName);
            $visitsCount.hide();
            $userData.hide();
            $visitsCount.text(sessionStorage.userName + ', you have visited this page ' + sessionStorage.visitsCount + ' time/s');
            $visitsCount.slideDown();
        } else {
        	$message.text(ERROR_MESSAGE).attr('class','error');
            $message.fadeIn();
            setTimeout(function () {
                $message.fadeOut();
            }, 3000);
        }
    });

    function saveUserData(userName) {
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('visitsCount', 0);
        incrementVisitsCount();
    }

    function incrementVisitsCount() {
        sessionStorage.visitsCount = Number(sessionStorage.visitsCount) + 1;
    }

    $(window).ready(function () {
        if (!sessionStorage.userName) {
            $visitsCount.hide();
            $userData.hide();
            $userData.slideDown();
        } else {
            incrementVisitsCount();
            $visitsCount.hide();
            $userData.hide();
            $visitsCount.text(sessionStorage.userName + ', you have visited this page ' + sessionStorage.visitsCount + ' time/s');
            $visitsCount.slideDown();
        }
    })
})();
