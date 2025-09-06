function toggleAccordion(button) {
  const accordion = button.closest(".accordion");
  const body = accordion?.querySelector(".accordion-body");
  const icon = accordion?.querySelector(".accordion-icon");

  if (!accordion || !body || !icon) return;

  const isOpen = !body.classList.contains("hidden");

  if (isOpen) {
    // Close accordion with animation
    // First, get the current height
    const currentHeight = body.scrollHeight;
    body.style.maxHeight = currentHeight + "px";

    // Force reflow
    body.offsetHeight;

    // Animate to 0 height
    body.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
    body.setAttribute("data-open", "false");

    // Hide completely after animation
    setTimeout(() => {
      if (body.getAttribute("data-open") === "false") {
        body.classList.add("hidden");
        body.style.maxHeight = "";
      }
    }, 300);
  } else {
    // Open accordion with animation
    body.classList.remove("hidden");
    body.style.maxHeight = "0px";

    // Force reflow
    body.offsetHeight;

    // Animate to full height
    const scrollHeight = body.scrollHeight;
    body.style.maxHeight = scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
    body.setAttribute("data-open", "true");

    // Clean up after animation completes
    setTimeout(() => {
      if (body.getAttribute("data-open") === "true") {
        body.style.maxHeight = "none";
      }
    }, 300);
  }
}

function initializeAccordion(accordion) {
  const body = accordion.querySelector(".accordion-body");
  const icon = accordion.querySelector(".accordion-icon");
  const button = accordion.querySelector(".accordion-button");

  if (!body || !icon || !button) return;

  const defaultOpen = body.getAttribute("data-default-open") === "true";

  if (defaultOpen) {
    // Open by default
    body.classList.remove("hidden");
    body.style.maxHeight = "none";
    icon.style.transform = "rotate(180deg)";
    body.setAttribute("data-open", "true");
  } else {
    // Close by default
    body.classList.add("hidden");
    body.style.maxHeight = "";
    icon.style.transform = "rotate(0deg)";
    body.setAttribute("data-open", "false");
  }

  // Add click event listener
  button.addEventListener("click", function () {
    toggleAccordion(this);
  });
}

function initAllAccordions() {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    initializeAccordion(accordion);
  });
}

// Initialize saat DOM loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllAccordions);
} else {
  initAllAccordions(); // DOM sudah loaded
}

// Export function untuk dipanggil manual
window.initAllAccordions = initAllAccordions;
