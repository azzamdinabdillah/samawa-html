/**
 * Accordion interactions with smooth open/close animation.
 *
 * Structure expected in the DOM:
 * - .accordion (container)
 *   - .accordion-button (click target)
 *   - .accordion-icon (rotates to indicate state)
 *   - .accordion-body (collapsible content)
 *
 * Requirements:
 * - CSS should set `.accordion-body` with `overflow: hidden` and a
 *   `transition: max-height 300ms ease` (or similar) for smooth animation.
 * - Add `data-default-open="true"` on `.accordion-body` to have it open by default.
 */

function toggleAccordion(button) {
  // Find nearest accordion container and its parts
  const accordion = button.closest(".accordion");
  const body = accordion?.querySelector(".accordion-body");
  const icon = accordion?.querySelector(".accordion-icon");

  // Guard: bail out if expected elements are missing
  if (!accordion || !body || !icon) return;

  // Determine current state by checking if body is hidden
  const isOpen = !body.classList.contains("hidden");

  if (isOpen) {
    // CLOSE: animate from current height down to 0

    // Capture current content height to start the animation smoothly
    const currentHeight = body.scrollHeight;
    body.style.maxHeight = currentHeight + "px";

    // Force reflow so the browser acknowledges the starting max-height
    body.offsetHeight;

    // Animate to 0 height and rotate icon back
    body.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
    body.setAttribute("data-open", "false");

    // After the animation ends, fully hide and clean inline styles
    setTimeout(() => {
      if (body.getAttribute("data-open") === "false") {
        body.classList.add("hidden");
        body.style.maxHeight = "";
      }
    }, 300);
  } else {
    // OPEN: animate from 0 to content height

    // Make it visible before measuring height and starting animation
    body.classList.remove("hidden");
    body.style.maxHeight = "0px";

    // Force reflow to apply the starting state
    body.offsetHeight;

    // Expand to the full scroll height and rotate icon
    const scrollHeight = body.scrollHeight;
    body.style.maxHeight = scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
    body.setAttribute("data-open", "true");

    // After animation completes, allow natural height growth/shrink
    setTimeout(() => {
      if (body.getAttribute("data-open") === "true") {
        body.style.maxHeight = "none";
      }
    }, 300);
  }
}

function initializeAccordion(accordion) {
  // Query parts inside a single accordion instance
  const body = accordion.querySelector(".accordion-body");
  const icon = accordion.querySelector(".accordion-icon");
  const button = accordion.querySelector(".accordion-button");

  // Guard: ensure all parts exist
  if (!body || !icon || !button) return;

  // Read default state from attribute on the body
  const defaultOpen = body.getAttribute("data-default-open") === "true";

  if (defaultOpen) {
    // Initialize as open
    body.classList.remove("hidden");
    body.style.maxHeight = "none";
    icon.style.transform = "rotate(180deg)";
    body.setAttribute("data-open", "true");
  } else {
    // Initialize as closed
    body.classList.add("hidden");
    body.style.maxHeight = "";
    icon.style.transform = "rotate(0deg)";
    body.setAttribute("data-open", "false");
  }

  // Wire the click handler to toggle the accordion
  button.addEventListener("click", function () {
    toggleAccordion(this);
  });
}

// Initialize all accordions on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    initializeAccordion(accordion);
  });
});
