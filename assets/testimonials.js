document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".testimonials-slider.swiper", {
    slidesPerView: 1.3,
    spaceBetween: 16,
    allowTouchMove: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      768: {
        slidesPerView: 3, // tablet
      },
      1024: {
        slidesPerView: 4, // desktop
      },
    },
  });
});
