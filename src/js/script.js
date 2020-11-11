$(function () {
	/* Поддержка svg спрайтов в IE 11 */
  svg4everybody();

  /* Боковое меню */
  $('.pull__wrapper').on('click', function() {
    $('.mobile-nav').addClass('mobile-nav_visible');
  });
  $('#mobile-nav').on('click', function() {
    $('.mobile-nav').removeClass('mobile-nav_visible');
  });

  /* Всплывающее верхнее меню */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#scroll-menu').slideDown();
    } else {
      $('#scroll-menu').slideUp();
    }
  });

  /* Всплывающая стрелка */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#arrow-up').fadeIn();
    } else {
      $('#arrow-up').fadeOut();
    }
  });

  /* Плавный скролл */
  $("#arrow-up").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
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
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false
        }
      }
    ]
  });

  /* Табы для promo */
  $('#sh-arrows').easytabs({
		updateHash: false,
		animate: false,
		// tabs: '.tabs__nav > li',
		panelContext: $('.promo__content'),
	})
  .bind('easytabs:before', function(event, $clicked, $targetPanel, settings) {
    if ($('.promo__content .slick-slider').length) {
    	$('.promo__content .slick-slider').slick('unslick');
    }
  })
  .bind('easytabs:after', function(event, $clicked, $targetPanel, settings) {
    carouselInit($('#' + $targetPanel[0].id))
  });

  $('.promo__tab.active').each(function() {
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
      dots: false,
      appendDots: '#sh-arrows',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false
          }
        }
      ]
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
    appendDots: '#offers__header',
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // Табы между картой и фото
  $('#map-tabs').easytabs({
    updateHash: false,
    animate: false,
    panelContext: $('.map__content')
  });
  // Табы между картой и панорамой
  $('#map-ya').easytabs({
    updateHash: false,
    animate: false,
  });


  /* Яндекс карта */
  ymaps.ready(init);
  function init() {
  
  // Создание карты.
  var myMap = new ymaps.Map("map-block", {
    center: [55.3741108840936,39.04812668650818], 
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
  })

  if ($('.map__zoom-btns').length) {

    $('.map__zoom-btns').find('.map__zoom-btn').on('click', function() {
      
      if ($(this)[0].id === 'zoom-in') {

        myMap.setZoom(myMap.getZoom() + 1, {checkZoomRange: true});

      } else if ($(this)[0].id === 'zoom-out') {

        myMap.setZoom(myMap.getZoom() - 1, {checkZoomRange: true});

      }

    });

  }

  if ($('#fullscreen').length) {
    $('#fullscreen').on('click', function() {

      if (!$(this).hasClass('active-fullscreen')) {
        myMap.container.enterFullscreen();
        $('.map__zoom-btns').addClass('active-fullscreen');
        $('#fullscreen').addClass('active-fullscreen');
        myMap.behaviors.enable(['scrollZoom']);
      } else {
        myMap.container.exitFullscreen()
        $('.map__zoom-btns').removeClass('active-fullscreen');
        $('#fullscreen').removeClass('active-fullscreen');
        myMap.behaviors.disable(['scrollZoom']);
      }

    });
  }

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors
    // Отключаем часть включенных по умолчанию поведений:
    .disable(['scrollZoom']);
  };

  ymaps.ready(function () {
     // Ищем панораму в переданной точке.
    ymaps.panorama.locate([55.3741108840936, 39.04812668650818]).done(
      function (panoramas) {
        if (panoramas.length > 0) {
            var player = new ymaps.panorama.Player('panorama-block', panoramas[0], {
              controls: [],
              suppressMapOpenBlock: true
            });
            player.lookAt([55.3741108840936, 39.04812668650818]);
        }
      }
    );
  })

  // Попап

  $('.modal').on('click', function (event) {
    event.preventDefault()

    let iDModal = $(this).attr('data-src');

    $.fancybox.open({
      src  : iDModal,
      type : 'inline',
      opts : {
        closeExisting: true,
        gutter: 0,
        keyboard: true,
        arrows: false,
        infobar: false,
        smallBtn : false,
        modal: false,
        touch: false,
        animationEffect: 'fade',
        animationDuration: 300,
        transitionEffect: 'fade',
        transitionDuration: 300,
        hideScrollbar: true,
        hash: false,
        autoFocus: false,
        baseTpl:
					'<div class="fancybox-container" role="dialog" tabindex="-1">' +
					'<div class="fancybox-bg"></div>' +
					'<div class="fancybox-inner">' +
					'<div class="fancybox-stage"></div>' +
					'</div>' +
					'</div>',
        beforeShow : function() {
          // Слайдер 1
          $('#popup-top-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            fade: true,
            asNavFor: '#popup-bottom-slider'
          });
        },
        afterShow : function () {
          // Слайдер 2
          $('#popup-bottom-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            asNavFor: '#popup-top-slider',
            focusOnSelect: true,
          });
        },
        afterClose : function () {
          $('#popup-top-slider').slick('unslick');
          $('#popup-bottom-slider').slick('unslick');
        }
      }
    });
  });

  // Счетчик в заказе
  $('.popup__count-btn').on('click', function () {
    
    const $input = $('.popup__count-input');

    if ($(this).hasClass('popup__count-btn_plus')) {
      $input.val(parseInt($input.val()) + 1)
      $input.change()
      if ($input.val() >= 1) {
        $('.popup__count-btn_minus').removeClass('disable')
      }
    } else if ($(this).hasClass('popup__count-btn_minus')) {
      if (parseInt($input.val()) > 1) {
        $input.val(parseInt($input.val()) - 1)
        $input.change()
        if ($input.val() == 1) {
          $(this).addClass('disable')
        }
      } else {
          $(this).addClass('disable')
        }
    }
  });
});