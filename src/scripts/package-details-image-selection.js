/** @type {HTMLImageElement|null} */
const mainImage = document.getElementById("main-image");
/** @type {HTMLImageElement[]} */
const thumbs = Array.from(document.querySelectorAll(".js-thumb"));

function clearActiveThumb() {
  thumbs.forEach((el) => {
    el.classList.remove("ring-black/60");
    el.classList.add("ring-transparent");
  });
}

thumbs.forEach((thumb, index) => {
  if (index === 0) {
    clearActiveThumb();
    thumb.classList.remove("ring-transparent");
    thumb.classList.add("ring-black/60");
  }
  thumb.addEventListener("click", () => {
    if (!mainImage) return;
    const newSrc = thumb.getAttribute("src");
    if (newSrc) {
      // Avoid reloading the same image
      const currentSrc = mainImage.getAttribute("src");
      if (currentSrc === newSrc) {
        clearActiveThumb();
        thumb.classList.remove("ring-transparent");
        thumb.classList.add("ring-black/60");
        return;
      }

      // Preload image to prevent flash
      const preload = new Image();
      preload.src = newSrc;

      const startTransition = () => {
        // Fade out
        mainImage.classList.add("opacity-0");

        const onFadeOutEnd = () => {
          mainImage.removeEventListener("transitionend", onFadeOutEnd);
          // Swap src when faded out
          mainImage.setAttribute("src", newSrc);
          // Force reflow before fade in
          void mainImage.offsetWidth;
          // Fade in
          mainImage.classList.remove("opacity-0");

          clearActiveThumb();
          thumb.classList.remove("ring-transparent");
          thumb.classList.add("ring-black/60");
        };

        mainImage.addEventListener("transitionend", onFadeOutEnd);
      };

      if (preload.complete) {
        startTransition();
      } else {
        preload.onload = startTransition;
      }
    }
  });
});
