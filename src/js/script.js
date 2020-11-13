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
    if ($('.promo__content .owl-loaded').length) {
    	$('.promo__content .owl-loaded').trigger('destroy.owl.carousel')
    }
  })
  .bind('easytabs:after', function(event, $clicked, $targetPanel, settings) {
    carouselInit($('#' + $targetPanel[0].id))
  });

  $('.promo__tab.active').each(function() {
		carouselInit($(this));
  });
  
  function carouselInit(thisObjects) {

    thisObjects.owlCarousel({
      items: 1,
      nav: false,
      slideBy: 1,
      autoplay: false,
      loop: false,
      dots: true,
      margin: -2,
      responsive: {
        600:{
          items: 2,
          nav: false,
        },
        990:{
          nav: true,
          navContainer: '#owl-nav',
          items: 3,
          dots: false,
        },
        1200:{
          nav: true,
          navContainer: '#owl-nav',
          items: 4,
          dots: false,
        }
      }
    });
  }

   /* Слайдер акций */
  $('#offers__content').owlCarousel({
    items: 1,
    navContainer: '',
    nav: false,
    slideBy: 1,
    autoplay: false,
    loop: false,
    dots: true,
    margin: -2,
    responsive: {
      600:{
        items: 2
      },
      990:{
        items: 3,
        dots: false,
        nav: true,
        navContainer: '#offers-nav',
      }
    }
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

  /* Изменение поля количества */
  $('[data-count]').bind('input', function() {
    let currentField = $(this);

    if (currentField.val().match(/[^0-9]/g)) {
      currentField.val(currentField.val().replace(/[^0-9]/g, ''));
    }

    if (currentField.val() > parseInt(currentField.attr('max'))) {
      currentField.val(currentField.attr('max'));
    }
  });

  $('[data-count]').bind('blur', function() {
    let currentField = $(this);

    if (!parseInt(currentField.val())) {
      currentField.val(currentField.attr('min'));
    }
  });

  $('[data-button]').on('click', function() {
    const currentButton = $(this);
    const btnsContainer = $(this).parent();
    const parentContainer = btnsContainer.parent();
    const currentField = parentContainer.find('[data-count]');
    const fieldMin = parseInt(currentField.attr('min'));
    const fieldMax = parseInt(currentField.attr('max'));
    let fieldValue = parseInt(currentField.val());

    if (currentField.length) {

      if (currentButton.attr('data-button') === 'minus' && fieldValue > fieldMin) {
        fieldValue--;
      } else if (currentButton.attr('data-button') === 'plus' && fieldValue < fieldMax) {
        fieldValue++;
      } else if (!fieldValue) {
        fieldValue = fieldMin;
      }

      currentField.val(fieldValue);
    }

    if (fieldValue != fieldMin) {
      $('.popup__count-btn_minus').removeClass('disable');
    } else {
      $('.popup__count-btn_minus').addClass('disable');
    }
  });
});