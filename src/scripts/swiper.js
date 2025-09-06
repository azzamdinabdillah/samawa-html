// import Swiper from "swiper";
// import { Autoplay } from "swiper/modules";

// Inisialisasi Swiper setelah DOM loaded
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".wedding-slider", {
    // Modules yang digunakan
    // modules: [Autoplay],

    // Konfigurasi dasar
    slidesPerView: 1.8, // Menampilkan slide tengah penuh + sedikit slide samping
    spaceBetween: 30,
    centeredSlides: true,
    initialSlide: 1, // Mulai dari slide ke-2 (index 1)

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    // Loop untuk autoplay yang smooth
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
});
