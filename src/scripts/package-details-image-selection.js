/**
 * Product/package image gallery behavior with smooth fade transitions.
 *
 * Features:
 * - Clicking a thumbnail swaps the main image with a fade-out/fade-in effect
 * - Preloads the target image to avoid flashing or showing a half-loaded image
 * - Highlights the active thumbnail using ring classes
 * - Avoids redundant work if the clicked thumbnail matches the current main image
 *
 * Expected elements:
 * - #main-image (the large preview image)
 * - .js-thumb (one or more thumbnail <img> elements)
 */

/** @type {HTMLImageElement|null} */
const mainImage = document.getElementById("main-image");
/** @type {HTMLImageElement[]} */
const thumbs = Array.from(document.querySelectorAll(".js-thumb"));

function clearActiveThumb() {
  // Reset all thumbnails to the inactive ring style
  thumbs.forEach((el) => {
    el.classList.remove("ring-black/60");
    el.classList.add("ring-transparent");
  });
}

// Initialize and attach click handlers to thumbnails
thumbs.forEach((thumb, index) => {
  // Mark the first thumbnail as active on load
  if (index === 0) {
    clearActiveThumb();
    thumb.classList.remove("ring-transparent");
    thumb.classList.add("ring-black/60");
  }

  thumb.addEventListener("click", () => {
    if (!mainImage) return;

    const newSrc = thumb.getAttribute("src");
    if (newSrc) {
      // Avoid reloading/swapping if the main image is already showing this src
      const currentSrc = mainImage.getAttribute("src");
      if (currentSrc === newSrc) {
        clearActiveThumb();
        thumb.classList.remove("ring-transparent");
        thumb.classList.add("ring-black/60");
        return;
      }

      // Preload the target image to eliminate flicker during transition
      const preload = new Image();
      preload.src = newSrc;

      const startTransition = () => {
        // Start fade-out of the current main image
        mainImage.classList.add("opacity-0");

        const onFadeOutEnd = () => {
          mainImage.removeEventListener("transitionend", onFadeOutEnd);
          // Swap the src only after fade-out finishes
          mainImage.setAttribute("src", newSrc);
          // Force reflow so the next class change triggers the fade-in
          void mainImage.offsetWidth;
          // Fade in the new image
          mainImage.classList.remove("opacity-0");

          // Update active thumbnail styles
          clearActiveThumb();
          thumb.classList.remove("ring-transparent");
          thumb.classList.add("ring-black/60");
        };

        // Listen for the end of the fade-out transition before swapping
        mainImage.addEventListener("transitionend", onFadeOutEnd);
      };

      // If already cached, transition immediately; otherwise wait for preload
      if (preload.complete) {
        startTransition();
      } else {
        preload.onload = startTransition;
      }
    }
  });
});
