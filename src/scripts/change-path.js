// Script untuk mengubah semua src asset
function changeAssetPaths() {
  // Variable untuk directory - bisa diubah sesuai kebutuhan
  const directory = "";

  // Ambil semua tag img
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const currentSrc = img.src;
    const srcAttribute = img.getAttribute("src");

    // Cek apakah src dimulai dengan / dan belum ada /public/
    if (
      srcAttribute &&
      srcAttribute.startsWith("/") &&
      !srcAttribute.startsWith("/public/")
    ) {
      // Ubah dari /icons/logo.svg menjadi /samawa/public/icons/logo.svg
      const newSrc = directory + "/public" + srcAttribute;
      img.src = newSrc;
      //   console.log(`Changed: ${srcAttribute} -> ${newSrc}`);
    }
    // Jika sudah ada /public/ tapi belum ada directory, tambahkan directory
    else if (
      srcAttribute &&
      srcAttribute.startsWith("/public/") &&
      !srcAttribute.startsWith(directory + "/public/")
    ) {
      const newSrc = directory + srcAttribute;
      img.src = newSrc;
      //   console.log(`Changed: ${srcAttribute} -> ${newSrc}`);
    }
  });

  // Ambil juga semua tag yang menggunakan background-image atau style dengan url()
  const elementsWithBackground = document.querySelectorAll("*");
  elementsWithBackground.forEach((element) => {
    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage;

    if (backgroundImage && backgroundImage !== "none") {
      // Extract URL from background-image: url("...")
      const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch) {
        const url = urlMatch[1];
        if (url.startsWith("/") && !url.startsWith("/public/")) {
          const newUrl = directory + "/public" + url;
          element.style.backgroundImage = `url("${newUrl}")`;
          //   console.log(`Changed background: ${url} -> ${newUrl}`);
        } else if (
          url.startsWith("/public/") &&
          !url.startsWith(directory + "/public/")
        ) {
          const newUrl = directory + url;
          element.style.backgroundImage = `url("${newUrl}")`;
          //   console.log(`Changed background: ${url} -> ${newUrl}`);
        }
      }
    }
  });

  // Ambil semua tag a dan ubah href nya
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const hrefAttribute = link.getAttribute("href");

    // Cek apakah href dimulai dengan / dan bukan external link
    if (
      hrefAttribute &&
      hrefAttribute.startsWith("/") &&
      !hrefAttribute.startsWith("http")
    ) {
      let newHref;

      // Pengecualian 1: Jika href adalah "/" maka arahkan ke index.html
      if (hrefAttribute === "/") {
        newHref = directory + "/src/pages/index.html";
      }
      // Pengecualian 2: Jika href dimulai dengan "/#" maka arahkan ke index.html dengan hash
      else if (hrefAttribute.startsWith("/#")) {
        const hash = hrefAttribute.substring(1); // Ambil bagian #browse-package-by-city
        newHref = directory + "/src/pages/index.html" + hash;
      }
      // Default: Ubah dari /form-booking/check-booking menjadi /(directory)/src/pages/form-booking/check-booking.html
      else {
        newHref = directory + "/src/pages" + hrefAttribute + ".html";
      }

      link.href = newHref;
      //   console.log(`Changed href: ${hrefAttribute} -> ${newHref}`);
    }
  });
}

// Jalankan script saat halaman dimuat
document.addEventListener("DOMContentLoaded", changeAssetPaths);

// Export function untuk bisa dipanggil manual jika diperlukan
window.changeAssetPaths = changeAssetPaths;
