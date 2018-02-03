var sections = $('.about-product__section'),
		nav = $('.nav-outer'),
		navOffset = nav.offset().top;
		navHeight = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

	if (cur_pos > navOffset) {
		nav.addClass('is-sticky');
	} else {
		nav.removeClass('is-sticky');
	}

  sections.each(function() {
    var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('is-current');

      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('is-current');
    }
  });
});

nav.find('.nav__link').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');

  $('html, body').animate({
    scrollTop: $(id).offset().top - navHeight
  }, 500);

  return false;
});

// var nav = $('.nav-outer');
// 		navHeight = nav.outerHeight();
// 		navOffset = $('.nav').offset().top;
//
// $(window).on('scroll', function() {
// 	var curPos = $(this).scrollTop()
//
// 	if( $(window).scrollTop() >= navOffset - 3 ) {
// 		nav.addClass('is-sticky');
// 	} else {
// 		nav.removeClass('is-sticky');
// 	}
//
// 	var y = $(this).scrollTop();
//
// 	$('.nav__link').each(function (event) {
// 		if (y >= $($(this).attr('href')).offset().top - navHeight) {
// 			$('.nav__link').not(this).removeClass('is-current');
// 			$(this).addClass('is-current');
// 		}
// 	});
// });
//
// $('.nav__link').on('click', function(e) {
// 	if(this.hash !== '') {
// 		e.preventDefault();
// 		var hash = this.hash;
//
// 		$('html, body').animate({
// 			scrollTop: $(hash).offset().top - navHeight
// 		}, 500, function() {
// 			// window.location.hash = hash;
// 		});
// 	}
// });

var slider = $('.about-product__main');
var sidebarSlider = $('.similar');
var prev = `
	<button type="button" class="slick-prev">
		<svg class="ico ico-right-arrow">
			<use xlink:href="img/sprite.svg#ico-right-arrow"></use>
		</svg>
	</button>
`;
var next = `
	<button type="button" class="slick-next">
		<svg class="ico ico-right-arrow">
			<use xlink:href="img/sprite.svg#ico-right-arrow"></use>
		</svg>
	</button>
`;
var mainSliderOpt = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
	adaptiveHeight: true,
	prevArrow: prev,
	nextArrow: next,
  responsive: [
    {
      breakpoint: 767,
      settings: 'unslick'
    }
  ]
};

var sidebarSliderOpt = {
	infinite: false,
	slidesToScroll: 1,
	mobileFirst: true,
	variableWidth: true,
	dots: true,
	arrows: false,
	centerMode: true,
	responsive: [
		{
			breakpoint: 767,
			settings: 'unslick'
		}
	]
};

slider.slick(mainSliderOpt);
sidebarSlider.slick(sidebarSliderOpt);

$(window).on('resize', debounce(function(e){
  if ( $(window).width() > 767 ) {
    if (slider.hasClass('slick-initialized')) {
      slider.slick('unslick');
    }
    return
  }
  if (!slider.hasClass('slick-initialized')) {
    return slider.slick(mainSliderOpt);
  }
}, 300));

$(window).on('resize', debounce(function(e){
  if ( $(window).width() > 767 ) {
    if (sidebarSlider.hasClass('slick-initialized')) {
      sidebarSlider.slick('unslick');
    }
    return
  }
  if (!sidebarSlider.hasClass('slick-initialized')) {
    return sidebarSlider.slick(sidebarSliderOpt);
  }
}, 300));

$(window).on('resize', function() {
	var $sidebar = $('.about-product__side');
	var $main = $('.about-product__main');
	var $discus = $('.discussion');
	if ( $(window).width() <= 767 ) {
		$discus.after($sidebar);
	} else {
		$main.after($sidebar);
	}
});
