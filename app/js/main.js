$('.slider__inner').on('init', function (...args) {
    const slideCount = args[1].slideCount;
    const currentSlide = args[1].currentSlide + 1;
    $('.slider__total-number').html(slideCount);
    $('.slider__current-number').html(currentSlide);
});

$('.slider__inner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    dots: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
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

function navbarHeightDefine() {
    if ($('.header__nav').hasClass('header__nav_active')) {
        if ($('.navbar_header').outerHeight() > 0) {
            const headerNavSize = $('.navbar_header').outerHeight() + $('.header').outerHeight(true);
            if (document.documentElement.clientHeight < headerNavSize) {
                $('.header__nav').css('height', 'auto');
            } else {
                $('.header__nav').css('height', `calc(100% - ${$('.header').outerHeight(true)}px)`);
            }
        }
    }
}

$(window).resize(navbarHeightDefine);

$('.burger-icon').on('click', () => {
    $('.burger-icon').toggleClass('burger-icon_active');
    $('.body-inner').toggleClass('body-inner_burger-opened');
    $('.header__nav').toggleClass('header__nav_active');

    navbarHeightDefine();
});

function bodyInnerToggleClass({data: {action}}) {
    if (action === 'add') {
        $('.body-inner').addClass('body-inner_modal-active');
    } else if (action === 'remove') {
        $('.body-inner').removeClass('body-inner_modal-active');
    }
}

$('.register-btn').on('click', () => {
    bodyInnerToggleClass({data: {action: 'add'}});
    $('.modal-register').addClass('modal-register_active');
    $('.modal-register__inner').addClass('modal-register__inner_active');
    $('.modal-register').removeClass('modal-register_disabled')
});

$('.modal-register__btn-close').on('click', () => {
    bodyInnerToggleClass({data: {action: 'remove'}});
    $('.modal-register').removeClass('modal-register_active');
    $('.modal-register__inner').removeClass('modal-register__inner_active');
    $('.modal-register').addClass('modal-register_disabled');
    $(window).off('scrollend', bodyInnerToggleClass);
});

$('.slide__btn').on('click', () => {
    bodyInnerToggleClass({data: {action: 'remove'}});
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    $(window).on('scrollend', {action: 'add'}, bodyInnerToggleClass);
});





async function sendServer() {
    let response = await fetch('/php/mail.php', {
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