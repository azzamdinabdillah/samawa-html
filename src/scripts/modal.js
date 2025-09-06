// Modal open/close handler using data attributes
// - Open trigger: [data-open-modal="targetId"]
// - Close trigger: [data-close-modal] (inside the target modal)
// It toggles classes on the .modal-container with matching id
console.log("Modal script loaded");

(function () {
  function getContainerById(id) {
    if (!id) return null;
    const el = document.getElementById(id);
    if (!el || !el.classList.contains("modal-container")) return null;
    return el;
  }

  function isOpen(container) {
    return (
      !container.classList.contains("opacity-0") &&
      !container.classList.contains("pointer-events-none")
    );
  }

  function openModalById(id) {
    const container = getContainerById(id);
    if (!container) return;
    container.classList.remove("opacity-0", "pointer-events-none");
    container.classList.add("opacity-100");
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal(container) {
    if (!container) return;
    container.classList.add("opacity-0", "pointer-events-none");
    container.classList.remove("opacity-100");
    // If no other modals are open, restore scroll
    const anyOpen = Array.from(
      document.querySelectorAll(".modal-container"),
    ).some((c) => isOpen(c));
    if (!anyOpen) {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Delegate click events for open/close
  document.addEventListener("click", (e) => {
    const openTrigger = e.target.closest("[data-open-modal]");
    if (openTrigger) {
      e.preventDefault();
      const targetId = openTrigger.getAttribute("data-open-modal");
      openModalById(targetId);
      return;
    }

    const closeTrigger = e.target.closest("[data-close-modal]");
    if (closeTrigger) {
      e.preventDefault();
      // Close the closest container, or resolve via explicit target id if given
      const explicitId = closeTrigger.getAttribute("data-close-modal");
      const container = explicitId
        ? getContainerById(explicitId)
        : closeTrigger.closest(".modal-container");
      closeModal(container);
    }
  });

  // ESC to close the top-most open modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const openContainers = Array.from(
      document.querySelectorAll(".modal-container"),
    ).filter((c) => isOpen(c));
    if (openContainers.length === 0) return;
    const topMost = openContainers[openContainers.length - 1];
    closeModal(topMost);
  });

  // Optional: clicking on backdrop area closes if developer marks backdrop with [data-close-modal]
  // If you want click-outside to close automatically, add data-close-modal to the backdrop element inside the modal component.
})();
