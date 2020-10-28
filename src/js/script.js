$(function () {
	// Main-slider
	$('#main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: true,
		appendDots: '[data-dots="true"]',
		fade: true,
		speed: 1000,
		pauseOnHover: false,
		zIndex: 100
	});

	// Mobile-menu
	$('#open-menu').on('click', function () {
		$('body').addClass('visible-menu');
		$('#bg-mobile').addClass('header__bg-mobile_active');
	});
	
	$('#close-menu').on('click', function () {
		$('body').removeClass('visible-menu');
		$('#bg-mobile').removeClass('header__bg-mobile_active');
	});

	// Footer-navs
	$('.footernav__title').on('click', function () {
		if ($(window).width() < 970) {
			$(this).parent().children('.footernav__list').slideToggle();
			$(this).parent().children('.footernav__title').toggleClass('footernav__title_active'); 
		}
	});

	// Side-navs
	$('.content-types__list a').on('click', function (event) {

		const parentContainer = $(this).parent();
		const nav = parentContainer.children('ul');

		if (nav.length) {
			event.preventDefault();
			
			const siblingsContainers = parentContainer.siblings('.active');
			const activeNav = siblingsContainers.children('ul');
			
			if (parentContainer.hasClass('active')) {
				nav.slideUp(200, function() {
					parentContainer.removeClass('active');
				});
			} else {
				activeNav.slideUp(200);
				siblingsContainers.removeClass('active');
				nav.slideDown(200, function() {
					parentContainer.addClass('active');
				});
			}
		}
	});

	// Main-nav
	$('.header__nav-list a').on('click', function(event) {

		const parentContainer = $(this).parent();
		const nav = parentContainer.children('div');

		if ($(window).width() < 990) {
			if (nav.length) {
				event.preventDefault();
			} 
		}
	});
});