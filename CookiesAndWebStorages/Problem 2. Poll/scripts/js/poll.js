Array.prototype.fill = function fill(value, count) {
    for (var index = 0; index < count; index++) {
        this.push(value);
    }

    return this;
};

var Timer = (function() {
    function Timer(minutes, seconds, callBack, $timerTargetElement) {
        this.setMinutes(minutes);
        this.setSeconds(seconds);
        this.setCallBack(callBack);
        this.setTargetElement($timerTargetElement);
    }

    Timer.prototype.setMinutes = function setMinutes(minutes) {
        this._minutes = minutes;
    };

    Timer.prototype.getMinutes = function getMinutes() {
        return this._minutes;
    };

    Timer.prototype.setSeconds = function setSeconds(seconds) {
        this._seconds = seconds;
    };

    Timer.prototype.getSeconds = function getSeconds() {
        return this._seconds;
    };

    Timer.prototype.setCallBack = function setCallBack(callBack) {
        this._callBack = callBack;
    };

    Timer.prototype.getCallBack = function getCallBack() {
        return this._callBack;
    };

    Timer.prototype.setTargetElement = function setTargetElement($targetElement) {
        this._targetElement = $targetElement;
    };

    Timer.prototype.getTargetElement = function getTargetElement() {
        return this._targetElement;
    };

    Timer.prototype.start = function start() {
        var _this = this;
        _this.getTargetElement().slideDown();
        this._interval = setInterval(function () {
            if (_this.getSeconds() < 0) {
                _this.setMinutes(_this.getMinutes() - 1);
                _this.setSeconds(59);
                if (_this.getMinutes() < 0) {
                    _this.stop();
                }
            }
            _this.getTargetElement().text(_this.getMinutes() + ':' + _this.getSeconds());
            _this.setSeconds(_this.getSeconds() - 1);
        }, 1000)
    };

    Timer.prototype.stop = function stop() {
        this.setMinutes(0);
        this.setSeconds(0);
        clearInterval(this._interval);
        this.getCallBack().call();
    };

    return Timer;
})();

(function() { 
    var MINUTES_FOR_TEST = 5;
    var SECONDS_FOR_TEST = 0;
    var $timerTargetElement = $('#timer');
    var timer;

    var $questions = $('#questions');
    var $nextQuestion = $('#next-question');
    var $previousQuestion = $('#previous-question');
    var $testResultField = $('#test-result');
    var $sendButton = $('#send-for-evaluating');

    var questions = [
        {
            title: 'What is the color of the sky?',
            options: ['Dark green', 'Pink', 'Blue', 'Purple'],
            correctAnswer: 2
        },
        {
            title: 'Who has written "The Black Swan: The Impact of the Highly Improbable"',
            options: ['Jorge Bucay', 'Peter Ackroyd', 'Belinda Bauer', 'Nassim Nicholas Taleb'],
            correctAnswer: 3
        },
        {
            title: 'What is the rose?',
            options: ['Animal', 'Flower', 'Rock group', 'Software company'],
            correctAnswer: 1
        }
    ];
    var questionsCount = questions.length;
    var currentAvailableOptionId = 0;
    var currentVisibleQuestion = 0;
    var answers = [].fill(-1, questionsCount);

    $(document).ready(function () {
        generateQuestionsAsDOMElements();
        if (!localStorage.givenAnswers) {
            localStorage.setItem('givenAnswers', JSON.stringify(answers));
            localStorage.setItem('timer', JSON.stringify({minutes: MINUTES_FOR_TEST, seconds: SECONDS_FOR_TEST}));
            timer = new Timer(MINUTES_FOR_TEST, SECONDS_FOR_TEST, showTestResult, $timerTargetElement);
        } else {
            var timerSettings = JSON.parse(localStorage.timer);
            timer = new Timer(timerSettings.minutes, timerSettings.seconds, showTestResult, $timerTargetElement);
        }
        showQuestion(currentVisibleQuestion);
        timer.start();
    });

    $(window).unload(function() {
        localStorage.timer = JSON.stringify({minutes: timer.getMinutes(), seconds: timer.getSeconds()})
    });

    $nextQuestion.on('click', function () {
        currentVisibleQuestion += 1;
        if (currentVisibleQuestion >= questionsCount) {
            currentVisibleQuestion = questionsCount - 1;
        }
        showQuestion(currentVisibleQuestion);
    });

    $previousQuestion.on('click', function () {
        currentVisibleQuestion -= 1;
        if (currentVisibleQuestion <= 0) {
            currentVisibleQuestion = 0;
        }
        showQuestion(currentVisibleQuestion);
    });

    $sendButton.on('click', function () {
        timer.stop();
    });

    function generateQuestionsAsDOMElements() {
        for (var question = 0; question < questionsCount; question++) {
            var $currentQuestion = $('<div>');
            var $title = $('<div class="title">');
            $title.text(questions[question].title);
            $currentQuestion.append($title);
            var $options = generateOptionsAsDOMElements(questions[question].options);
            $currentQuestion.append($options);
            $currentQuestion.attr('id', question);
            $questions.append($currentQuestion);
        }
    }

    function generateOptionsAsDOMElements(options) {
        var optionsCount = options.length;
        var $optionsField = $('<div class="options">');

        for (var option = 0; option < optionsCount; option++) {
           var $currentOption = $('<div>');
           var $label = $('<label>');
           $label
               .attr('for', 'option' + currentAvailableOptionId)
               .text(options[option]);
           var $answer = $('<input>');
               $answer
                .attr('type', 'radio')
                .attr('name', 'answer')
                .attr('value', option)
                .attr('id', 'option' + currentAvailableOptionId)
                .on('change', function () {
                       var $questionContainer = $(this).parent().parent().parent();
                       var questionAnswered = $questionContainer.attr('id');
                       answers = JSON.parse(localStorage.givenAnswers);
                       var optionId = $(this).attr('id');
                       var optionValue = parseInt($(this).val());
                       answers[questionAnswered] = {id: optionId, value: optionValue};
                       localStorage.givenAnswers = JSON.stringify(answers);
                       var $options = $(this).parent().parent();
                       $options.find('div').removeClass('selected');
                       $(this).parent().attr('class', 'selected');
                });
           $currentOption.append($answer).append($label);
           $optionsField.append($currentOption);
           currentAvailableOptionId += 1;
        }

        return $optionsField;
    }

    function showQuestion(question) {
        $questions.children().hide();
        $('#' + question).show();
        answers = JSON.parse(localStorage.givenAnswers);
        var questionElement = $questions.find('#' + question);
        var option = questionElement.find('#' + answers[question].id);
        option.parent().attr('class', 'selected');
    }

    function showTestResult() {
        $(document).find('input').attr('disabled', true);

        var points = 0;
        answers = JSON.parse(localStorage.givenAnswers);
        for (var index = 0; index < questionsCount; index++) {
            var question = $questions.find('#' + index);
            var option = question.find('#' + answers[index].id);
            if (answers[index].value === questions[index].correctAnswer) {
                points += 1;
                option.parent().attr('class', 'correctAnswer');
            } else {
                option.parent().attr('class', 'incorrectAnswer');
            }
        }
        $testResultField.text('Your result is ' + points + ' point/s');
        localStorage.removeItem('givenAnswers');
    }
})();
