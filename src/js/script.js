$(document).ready(function () {
    $('.carousel__wrapper').slick({
        speed: 900,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_solid.svg" alt="arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_solid.svg" alt="arrow"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });
});