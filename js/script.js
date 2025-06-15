(function ($) {

  "use strict";

  var initSlider = function () {
    var swiper = new Swiper(".main-swiper", {
      slidesPerView: 1,
      spaceBetween: 80,
      speed: 700,
      loop: true,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    
    $('.product-carousel').each(function(){
      var sectionId = $(this).attr('id');
      var swiper = new Swiper( "#" + sectionId + ".swiper", {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          nextEl: "#" + sectionId + " .swiper-next",
          prevEl: "#" + sectionId + " .swiper-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            }
          },
          999: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1366: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        },
      });
    })

    var swiper = new Swiper(".testimonial-swiper", {
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var swiper = new Swiper(".review-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".icon-arrow-right",
        prevEl: ".icon-arrow-left",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // product single page
    $('.product-thumbnail-slider').each(function(){
      var dir = $(this).attr('data-direction') ? $(this).attr('data-direction') : 'horizontal';
      var num = $(this).attr('data-num') ? $(this).attr('data-num') : 3;

      var thumb_slider = new Swiper(".product-thumbnail-slider", {
        slidesPerView: num,
        spaceBetween: 20,
        direction: dir,
        breakpoints: {
          0: {
            direction: "horizontal"
          },
          992: {
            direction: dir
          },
        },
      });

      var large_slider = new Swiper(".product-large-slider", {
        slidesPerView: 1,
        // autoplay: true,
        spaceBetween: 0,
        effect: 'fade',
        thumbs: {
          swiper: thumb_slider,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      
    });


    $('.swiper-carousel').each(function(){
      var swiper = new Swiper(".swiper-carousel", {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-carousel .swiper-next',
          prevEl: '.swiper-carousel .swiper-prev',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      });
    });
    
    $('.swiper-slideshow').each(function(){
      var swiper = new Swiper(".swiper-slideshow", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 700,
        loop: true,
        navigation: {
          nextEl: '.swiper-slideshow .swiper-next',
          prevEl: '.swiper-slideshow .swiper-prev',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });


  };

  // input spinner
  var initQuantitySpinner = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  var initGLightbox = function() {
    var lightbox = GLightbox();

    lightbox.on('open', (target) => {
      console.log('lightbox opened');
    });
    var lightboxDescription = GLightbox({
      selector: '.glightbox2'
    });
    var lightboxVideo = GLightbox({
        selector: '.glightbox3'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {
        console.log('Prev slide', prev);
        console.log('Current slide', current);

        const { slideIndex, slideNode, slideConfig, player } = current;

        if (player) {
            if (!player.ready) {
                // If player is not ready
                player.on('ready', (event) => {
                    // Do something when video is ready
                });
            }

            player.on('play', (event) => {
                console.log('Started play');
            });

            player.on('volumechange', (event) => {
                console.log('Volume change');
            });

            player.on('ended', (event) => {
                console.log('Video ended');
            });
        }
    });

  }

  $(document).ready(function () {

    initJarallax();
    initQuantitySpinner();
    initSlider();
    initGLightbox();

    AOS.init({
      duration: 1200,
      once: true,
    })

    $('.navbar').on('click', '.search-toggle', function (e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      // $(selector).find('.autocomplete').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });

    // close when click off of container
    $(document).on('click touchstart', function (e) {
      if (!$(e.target).is('.search-toggle, .search-toggle *, .navbar, .navbar *')) {
        $('.search-toggle').removeClass('active');
        $('.navbar').removeClass('show');
      }
    });

    // $('.main-slider').each(function () {

    //   $('.main-slider').slick({
    //     autoplay: false,
    //     autoplaySpeed: 2000,
    //     arrows: true,
    //     dots: true,
    //   });

    // });

    // $('.products-slider').each(function () {

    //   $('.products-slider').slick({
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     autoplaySpeed: 2000,
    //     dots: true,
    //     responsive: [
    //       {
    //         breakpoint: 600,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1
    //         }
    //       }
    //       // You can unslick at a given breakpoint now by adding:
    //       // settings: "unslick"
    //       // instead of a settings object
    //     ]
    //   });
    // });

    // $('.testimonial-slider').each(function () {

    //   $('.testimonial-slider').slick({
    //     dots: true,
    //     arrows: false,
    //     infinite: true,
    //     speed: 500,
    //   });

    // });

  });
  // document ready


})(jQuery);