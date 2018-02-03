$(document).ready(function(){

	//////////
	// Global variables
	//////////

	var _window = $(window);
	var _document = $(document);


	var nav = $('.nav-outer'),
			navHeight = nav.outerHeight(),
			navOffset = $('.nav').offset().top,
			slider = $('.about-product__main'),
			sidebarSlider = $('.similar'),
			prev = `
		<button type="button" class="slick-prev">
			<svg class="ico ico-right-arrow">
				<use xlink:href="img/sprite.svg#ico-right-arrow"></use>
			</svg>
		</button>
	`,
		next = `
		<button type="button" class="slick-next">
			<svg class="ico ico-right-arrow">
				<use xlink:href="img/sprite.svg#ico-right-arrow"></use>
			</svg>
		</button>
	`


	// svg support for laggy browsers
	svg4everybody();

	// prevent # blank links
	_document.on('click', '[href="#"]', function(e) {
		e.preventDefault();
	})


	// --------------------------------------------------
	// sticky nav + highlight current element + scroll to
	// --------------------------------------------------
	_window.on('scroll', throttle(function() {
		var curPos = $(this).scrollTop();

		if( _window.scrollTop() >= navOffset - 3 ) {
			nav.addClass('is-sticky');
		} else {
			nav.removeClass('is-sticky');
		}

		var y = $(this).scrollTop();

		$('.nav__link').each(function (event) {
			if (y >= $($(this).attr('href')).offset().top - navHeight - 1) {
				$('.nav__link').not(this).removeClass('is-current');
				$(this).addClass('is-current');
			}
		});
	}, 10));

	$('.nav__link').on('click', function(e) {
		if(this.hash !== '') {
			e.preventDefault();
			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top - navHeight
			}, 500, function() {
			});
		}
	});



	// -------------
	// slick sliders
	// -------------
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
	}

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

	// function for slick slider on certain breakpoint
	function slickUnslick(slider, sliderOptions) {
		if ( _window.width() > 767 ) {
	    if (slider.hasClass('slick-initialized')) {
	      slider.slick('unslick');
	    }
	    return
	  }
	  if (!slider.hasClass('slick-initialized')) {
	    return slider.slick(sliderOptions);
	  }
	}

	_window.on('resize', debounce(function(e){
	  slickUnslick(slider, mainSliderOpt);
		slickUnslick(sidebarSlider, sidebarSliderOpt);
	}, 300));

	slider.on('afterChange', function(e, slick, currentSlide, nextSlide) {
		var curAttr = $('.about-product__main .slick-current');
		var showCurAttr = $('.currentSlide');
		showCurAttr.text(curAttr.attr('data-sectionName'))
	});



	// -----------------
	// appending sidebar
	// -----------------
	_window.on('resize', debounce(function() {
		var sidebar = $('.about-product__side');
		var main = $('.about-product__main');
		var discus = $('.discussion');
		if ( _window.width() <= 767 ) {
			discus.after(sidebar);
		} else {
			main.after(sidebar);
		}
	}, 200));




	// ----------------------
	// change purchase amount
	// ----------------------
	var amount = $('.purchase-amount input');

	$('.purchase-amount__option').on('click', function() {
		if ($(this).hasClass('increment')) {
			amount.val(parseInt(amount.val()) + 1);
		} else if (parseInt(amount.val()) >= 2) {
			amount.val(parseInt(amount.val()) - 1);
		}
	});

	// Buy form logic
	$('[js-productBuyForm]').on('submit', function(e){
		// some ajax functionality goes here
		////
		////

		e.preventDefault();
	})


	// ---------------------
	// modal for beans image
	// ---------------------
	var modal = $('.modal-layout');
	var modalImg = $('.modal-image img');

	$('.product-image__beans').on('click', function(e) {
		e.preventDefault();
		var currentImageSrc = $(this).find('img').attr('src');
		modalImg.attr('src', currentImageSrc);
		modal.addClass('is-open');
		$(document.body).css('overflow', 'hidden');
	});

	$('.modal-layout').on('click', function(e) {
		if($(e.target).hasClass('modal-layout') || $(e.target).hasClass('modal-close')) {
			$(this).removeClass('is-open');
			$(document.body).css('overflow', 'auto');
		}
	});

	// ---------------------
	// radial Indicator
	// ---------------------
	$('.indicator').each(function(i, indicator){

		var options = {
			radius: 15,
			barWidth: 3,
			percentage: true,
			initValue: $(indicator).data('init-value'),
			displayNumber: false,
			interpolate: true,
			barColor: $(indicator).data('color')
		}

		$(indicator).radialIndicator(options);

	})

})
