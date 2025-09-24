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

      // Show target tab panel
      const targetPanel = document.getElementById(`${targetTab}-content`);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
        targetPanel.classList.add("active");
      }
    });
  });
});
