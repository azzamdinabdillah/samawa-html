
const swiper = new Swiper(".wedding-slider", {
  // Modules used
  // modules: [Autoplay],

  // Basic configuration
  slidesPerView: 1.8, // Show the center slide fully + a bit of side slides
  spaceBetween: 30,
  centeredSlides: true,
  initialSlide: 1, // Start from the 2nd slide (index 1)

  // Autoplay settings
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  // Enable loop for smooth autoplay
  loop: true,

  // Responsive breakpoints
  breakpoints: {
    // Mobile
    320: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    // Tablet
    768: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    // Desktop
    1024: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
  },
});
