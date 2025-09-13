(function () {
  let swiperProductsCarousel,
    sliderSettings = {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 800,
      loopAdditionalSlides: true,
      allowTouchMove: true,
      breakpoints: {
        540: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    };

  const initSlider = (section, settings) => {
    if (!section || !section?.classList.contains("products-carousel-section"))
      return;

    const sliderContainer = section.querySelector(".products-carousel");
    if (!sliderContainer) return;

    const swiperEl = section.querySelector(".products-carousel__layout");
    const swiperWrapper = section.querySelector(".products-carousel__list");
    const slides = section.querySelectorAll(".products-carousel__item");

    if (!swiperEl || !swiperWrapper || !slides || !slides.length) return;

    const mobSlidesPreView = swiperEl.classList.contains(
      "products-carousel__layout--visible-overflow"
    )
      ? "auto"
      : 1;
    swiperEl.classList.add("swiper");
    swiperWrapper.classList.add("swiper-wrapper");

    slides.forEach((slide) => slide.classList.add("swiper-slide"));

    const nextBtn = section.querySelector(
      ".products-carousel__navigation-button-next"
    );
    const prevBtn = section.querySelector(
      ".products-carousel__navigation-button-prev"
    );

    sliderSettings = {
      ...sliderSettings,
      slidesPerView: mobSlidesPreView,
      navigation:
        nextBtn && prevBtn
          ? {
              nextEl: nextBtn,
              prevEl: prevBtn,
              disabledClass: "swiper-button-disabled",
            }
          : false,
    };

    swiperProductsCarousel = new Swiper(
      swiperEl,
      sliderSettings
    );
  };

  const destroySlider = (section) => {
    if (!swiperProductsCarousel || !section) return;

    const slides = section.querySelectorAll(".products-carousel__item");
    const swiperEl = section.querySelector(".products-carousel__layout");
    const swiperWrapper = section.querySelector(".products-carousel__list");

    if (!swiperEl || !slides || !slides.length || !swiperWrapper) return;

    swiperProductsCarousel.destroy(true, true);
    swiperProductsCarousel = null;

    swiperEl.classList.remove("swiper");
    swiperWrapper.classList.remove("swiper-wrapper");
    slides.forEach((slide) => slide.classList.remove("swiper-slide"));
  };

  const initProductsCarousel = (section) => {
    if (!section || !section?.classList.contains("products-carousel-section"))
      return;

    const sliderContainer = section.querySelector(".products-carousel");

    let currentLayout = null;

    const sectionResizeObserver = new ResizeObserver((entries) => {
      const [entry] = entries;
      let newLayout;

      newLayout = 'slider';

      if (newLayout !== currentLayout) {
        currentLayout = newLayout;

        if (swiperProductsCarousel) {
          destroySlider(section);
        }

        if (newLayout === "slider" || newLayout === "bar") {
          initSlider(section, newLayout);
        }
      }
    });

    sectionResizeObserver.observe(section);
  };

  const animateProductCards = (section) => {
    if (
      !section ||
      !section?.classList.contains("products-carousel-section") ||
      !section.querySelector(".animate-on-scroll")
    ) {
      return;
    }

    const ProductsCarouselLayout = section.querySelector(
      ".products-carousel__layout"
    );

    if (!ProductsCarouselLayout) return;

    ScrollTrigger.create({
      trigger: ProductsCarouselLayout,
      start: "20% bottom",
      end: "bottom top",
      onEnter: () => ProductsCarouselLayout.classList.add("animated"),
    });
  };

  initProductsCarousel(document.currentScript.parentElement);
  animateProductCards(document.currentScript.parentElement);

  document.addEventListener("shopify:section:load", function (event) {
    initProductsCarousel(event.target);
    animateProductCards(event.target);
  });
})();
