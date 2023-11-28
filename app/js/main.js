$('.slider__inner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    dots: true,
    infinite: false,
    appendDots: $('.slider__counter'),
    prevArrow: $('.slider__arrow-left'),
    nextArrow: $('.slider__arrow-right'),
});

function setSliderCounter() {
    let curSliderPos = $('.slick-active button').attr('aria-label').split('of').map((item) => item.trim());
    $('.slider__current-number').html(curSliderPos[0]);
    $('.slider__total-number').html(curSliderPos[1]);
}
setSliderCounter();

$('.slider__arrow-left').on('click', setSliderCounter);
$('.slider__arrow-right').on('click', setSliderCounter);