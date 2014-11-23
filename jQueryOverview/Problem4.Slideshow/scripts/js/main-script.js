var sliderCommandModule = (function() {
    // Animation configurations
    var slideWidth = 1200;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    // Cache the DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');
    var $leftButton = $('#left-button');
    var $rightButton = $('#right-button');

    var interval;

    function startSlider() {
        interval = setInterval(moveSliderToLeft, pause);
    }

    function pauseSlider() {
        clearInterval(interval);
    }

    function moveSliderToLeft() {
        if (currentSlide >= $slides.length) {
            currentSlide = 1;
            $slideContainer.css('margin-left', 0);
        } else {
            $slideContainer.animate({'margin-left': '-=' + slideWidth}, animationSpeed);
            currentSlide++;
        }
    }

    function processMoveSliderToLeft() {
        $slideContainer.finish();
        moveSliderToLeft();
    }

    function moveSliderToRight() {
        if (currentSlide <= 1) {
            currentSlide = 1;
            $slideContainer.css('margin-left', 0);
        } else {
            $slideContainer.animate({'margin-left': '+=' + slideWidth}, animationSpeed);
            currentSlide--;
        }
    }

    function processMoveSliderToRight() {
        $slideContainer.finish();
        moveSliderToRight();
    }

    $slider.on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    $leftButton.on('click', processMoveSliderToLeft).on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    $rightButton.on('click', processMoveSliderToRight).on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    startSlider();

    var $orangeButton = $('.orange-button');
    var $blueButton = $('.blue-button');

    $orangeButton.on('mouseenter', function () {
           $(this).animate({borderColor: 'rgb(255, 156, 0)'}, {queue: false}, 600);
           $(this).animate({backgroundColor: 'rgba(255, 156, 0, 1)', border: 'rgb(255, 156, 0)'}, {queue: false}, 600);
    }).on('mouseleave', function () {
        $(this).animate({backgroundColor: 'rgba(255, 156, 0, 0.5)'}, {queue: false}, 600);
        $(this).animate({borderColor: 'rgb(255, 255, 255)'}, {queue: false}, 600);
    });

    $blueButton.on('mouseenter', function () {
        $(this).animate({borderColor: 'rgb(79, 91, 111)'}, {queue: false}, 600);
        $(this).animate({backgroundColor: 'rgba(79, 91, 111, 1)', border: 'rgb(79, 91, 111)'}, {queue: false}, 600);
    }).on('mouseleave', function () {
        $(this).animate({backgroundColor: 'rgba(79, 91, 111, 0.5)'}, {queue: false}, 600);
        $(this).animate({borderColor: 'rgb(255, 255, 255)'}, {queue: false}, 600);
    })
})();