// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1000,
//         adaptiveHeight: false,
//         autoplay: false,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftarrow.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/rightarrow.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                   dots: true,
//                   arrows: false,
//                 }
//             }
//         ]
//     });
//   });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
        991: {
            items: 1,
            fixedWidth: 900,
            edgePadding: 0
        },
        767: {
            items: 1,
            autoHeight: true, 
        },
        575: {
            autoHeight: true,         
        },
        320: {
            autoHeight: true,         
        }
    }
});
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});



$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }); 
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

// modal

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #close, #ty, #order').fadeOut('slow')
});

$('.button_mini').each(function(i) {
    $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
});

$(window).on('click', function(e) {
    if (e.target.classList.contains('overlay')) {
        $('.overlay, #consultation, #ty, #order').fadeOut('slow');
    }
});

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
       $('.overlay, #consultation, #ty, #order').fadeOut('slow');
    }
});

function validateforms(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
              },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите своё имя",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
              },
            phone: "Пожалуйста, введите номер телефона",
            email: {
              required: "Пожалуйста, введите свой email",
              email: "Неверно введён адрес почты"
            }
          }
        
    });
}

validateforms('#consultation-form');
validateforms('#consultation form');
validateforms('#order form');

$('input[name=phone]').mask("+7 (999) 999-99-99");

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #ty').fadeIn('slow');
        $('form').trigger('reset');
    });
    return false;
});

// smooth scroll and pageup

$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

new WOW().init();
