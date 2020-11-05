"use strict";

$(function () {
  /* Поддержка svg спрайтов в IE 11 */
  svg4everybody();
  /* Боковое меню */

  $('.pull__wrapper').on('click', function () {
    $('.mobile-nav').addClass('mobile-nav_visible');
  });
  $('#mobile-nav').on('click', function () {
    $('.mobile-nav').removeClass('mobile-nav_visible');
  });
  /* Всплывающее верхнее меню */

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $('#scroll-menu').slideDown();
    } else {
      $('#scroll-menu').slideUp();
    }
  });
  /* Всплывающая стрелка */

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $('#arrow-up').fadeIn();
    } else {
      $('#arrow-up').fadeOut();
    }
  });
  /* Плавный скролл */

  $("#arrow-up").click(function () {
    var _href = $(this).attr("href");

    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    });
    return false;
  });
  /* Главный слайдер */

  $('#slider-list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    appendArrows: '#slider',
    prevArrow: '<button type="button" class="slick-prev"><svg class="slick-arrow__icon"><use xlink:href="images/icons.svg#arrow-icon"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="slick-arrow__icon"><use xlink:href="images/icons.svg#arrow-icon"></use></svg></button>',
    dots: true,
    appendDots: '#slider',
    // adaptiveHeight: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        arrows: false
      }
    }]
  });
  /* Табы для promo */

  $('#sh-arrows').easytabs({
    updateHash: false,
    animate: false,
    // tabs: '.tabs__nav > li',
    panelContext: $('.promo__content')
  }).bind('easytabs:before', function (event, $clicked, $targetPanel, settings) {
    if ($('.promo__content .slick-slider').length) {
      $('.promo__content .slick-slider').slick('unslick');
    }
  }).bind('easytabs:after', function (event, $clicked, $targetPanel, settings) {
    carouselInit($('#' + $targetPanel[0].id));
  });
  $('.promo__tab.active').each(function () {
    carouselInit($(this));
  });

  function carouselInit(thisObjects) {
    thisObjects.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      appendArrows: '#sh-arrows',
      prevArrow: '<button type="button" class="slick-prev slick-promo-prev"></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-promo-next"></svg></button>',
      dots: false,
      // centerPadding: '0px',
      swipe: true,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 990,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
  /* Слайдер акций */


  $('#offers__content').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 4000,
    arrows: true,
    appendArrows: '#offers__header',
    prevArrow: '<button type="button" class="slick-prev slick-promo-prev"></svg></button>',
    nextArrow: '<button type="button" class="slick-next slick-promo-next"></svg></button>',
    dots: false,
    responsive: [{
      breakpoint: 990,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  /* Слайдер отзывы */

  $('#reviews__content').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    appendDots: '.reviews__cover',
    responsive: [{
      breakpoint: 990,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // Табы между картой и фото

  $('#map-tabs').easytabs({
    updateHash: false,
    animate: true
  }); // Табы между картой и панорамой

  $('#map-ya').easytabs({
    updateHash: false,
    animate: true
  });
  /* Яндекс карта */

  ymaps.ready(init);

  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map-block", {
      center: [55.3741108840936, 39.04812668650818],
      zoom: 17,
      controls: []
    }),
        // Метка на карте
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'ул. Советская, 176А',
      balloonContent: 'ПИЦЦА ЛИСИЦА'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'images/pin.svg',
      // Размеры метки.
      iconImageSize: [37, 47],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-18, -40]
    });

    if ($('.map__zoom-btns').length) {
      $('.map__zoom-btns').find('.map__zoom-btn').on('click', function () {
        if ($(this)[0].id === 'zoom-in') {
          myMap.setZoom(myMap.getZoom() + 1, {
            checkZoomRange: true
          });
        } else if ($(this)[0].id === 'zoom-out') {
          myMap.setZoom(myMap.getZoom() - 1, {
            checkZoomRange: true
          });
        }
      });
    }

    if ($('#fullscreen').length) {
      $('#fullscreen').on('click', function () {
        if (!$(this).hasClass('active-fullscreen')) {
          myMap.container.enterFullscreen();
          $('.map__zoom-btns').addClass('active-fullscreen');
          $('#fullscreen').addClass('active-fullscreen');
          myMap.behaviors.enable(['scrollZoom']);
        } else {
          myMap.container.exitFullscreen();
          $('.map__zoom-btns').removeClass('active-fullscreen');
          $('#fullscreen').removeClass('active-fullscreen');
          myMap.behaviors.disable(['scrollZoom']);
        }
      });
    }

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors // Отключаем часть включенных по умолчанию поведений:
    .disable(['scrollZoom']);
  }

  ;
  ymaps.ready(function () {
    // Ищем панораму в переданной точке.
    ymaps.panorama.locate([55.3741108840936, 39.04812668650818]).done(function (panoramas) {
      if (panoramas.length > 0) {
        var player = new ymaps.panorama.Player('panorama-block', panoramas[0], {
          controls: []
        });
        player.lookAt([55.3741108840936, 39.04812668650818]);
      }
    });
  });
});
//# sourceMappingURL=script.js.map