$('.slider__inner').on('init', function (...args) {
    const slideCount = args[1].slideCount;
    const currentSlide = args[1].currentSlide + 1;
    $('.slider__total-number').html(slideCount);
    $('.slider__current-number').html(currentSlide);
});

$('.slider__inner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 3000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnDotsHover: true,
    appendDots: $('.slider__counter'),
    prevArrow: $('.slider__arrow-left'),
    nextArrow: $('.slider__arrow-right'),
});

$('.slider__inner').on('afterChange', function (...args) {
    const currentSlide = args[2] + 1;
    $('.slider__current-number').html(currentSlide);
});

function slickPause() {
    $('.slider__inner').slick('slickPause');
}
function slickPlay() {
    $('.slider__inner').slick('slickPlay');
}

$('.slider__menu').on('pointerover', () => {
    slickPause();
});
$('.slider__menu').on('pointerout', () => {
    slickPlay();
});
$('.slick-arrow').on('focus', () => {
    slickPause();
});
$('.slick-arrow').on('blur', () => {
    slickPlay();
});

$('.burger-icon').on('click', () => {
    $('.burger-icon').toggleClass('active');
});

async function sendServer() {
    let response = await fetch('/mail.php', {
        method: 'POST',
        body: JSON.stringify({
            firstName: 'James',
            lastName: 'Nelson',
            telNumber: '+7-912-345-67-89',
        }),
    });

    if (response.ok) {
        let text = await response.text();
        console.log(text);
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

$('.send-btn').on('click', sendServer);