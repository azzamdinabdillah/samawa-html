/**
 * Simple tab switcher for checkout payment methods.
 *
 * Behavior:
 * - Clicking a `.payment-tab` marks it as active (bold border and brand color)
 * - Deactivates all other tabs
 * - Hides all `.tab-panel` elements
 * - Shows the panel whose id is `${data-tab}-content`
 *
 * Requirements:
 * - Each tab has a `data-tab` attribute (e.g., data-tab="bank-transfer")
 * - The corresponding panel id must be `<data-tab>-content` (e.g., `bank-transfer-content`)
 */

document.addEventListener("DOMContentLoaded", function () {
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active state from all tabs
      paymentTabs.forEach((t) => {
        t.classList.remove("border-2", "border-[#ff48b6]");
        t.classList.add("border", "border-[#e4e6eb]");
      });

      // Add active state to clicked tab
      this.classList.remove("border", "border-[#e4e6eb]");
      this.classList.add("border-2", "border-[#ff48b6]");

      // Hide all tab panels
      tabPanels.forEach((panel) => {
        panel.classList.add("hidden");
        panel.classList.remove("active");
      });

      // Show target tab panel by convention: `${data-tab}-content`
      const targetPanel = document.getElementById(`${targetTab}-content`);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
        targetPanel.classList.add("active");
      }
    });
  });
});
