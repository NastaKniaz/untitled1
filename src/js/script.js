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

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content')
            .removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal="consultation"]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });

    // $('.button_mini').on('click', function () {
    //     $('.overlay, #order').fadeIn('fast');
    // });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $(' #order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            }
        });
    };

    validateForm('#consultation-form');
    validateForm('#order form');
    validateForm('#consultation form');

    $('input[name=phone]').mask("+48 999 999-999");

    $('#consultation form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: "mailer/smart.php",
            data: $(this).serialize(),
        })
            .done(function () {
                $(this).find('input').val('');
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn('fast');

                $('form').trigger('reset');
            });
        return false;
    });

    //smooth scroll and pageup

    $(window).scroll(function () {
        if ($(window).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    })

    $('a[href^="#"]').click(function () {
        const _href = $(this).attr('href');
        $('html,body').animate({scrollTop: $(_href).offset().top+"px"});
    });
});