if ($(window).width() > 767) {
  var nav = $('.nav-outer');
      navOffset = $('.nav').offset().top;

  $(window).scroll(function() {

    if( $(window).scrollTop() >= navOffset - 3 ) {
      nav.addClass('is-sticky');
    } else {
      nav.removeClass('is-sticky');
    }

    var y = $(this).scrollTop();

    $('.nav__link').each(function (event) {
      if (y >= $($(this).attr('href')).offset().top) {
        $('.nav__link').not(this).removeClass('is-current');
        $(this).addClass('is-current');
      }
    });
  });

  $('.nav__link').on('click', function(e) {
    if(this.hash !== '') {
      e.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function() {
        window.location.hash = hash;
      });
    }
  });
}

var slider = $('.pars');
var sliderOptions = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 767,
      settings: 'unslick'
    }
  ]
};

slider.slick(sliderOptions);

$(window).on('resize', debounce(function(e){
  if ( $(window).width() > 767 ) {
    if (slider.hasClass('slick-initialized')) {
      slider.slick('unslick');
    }
    return
  }
  if (!slider.hasClass('slick-initialized')) {
    return slider.slick(sliderOptions);
  }
}, 300));
