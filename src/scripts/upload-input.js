/**
 * File upload input helper that mirrors the selected file name to a display element.
 *
 * Behavior:
 * - For each `.file-upload-input`, finds its nearest `[data-input-container]`
 * - Inside that container, finds `[data-file-display]` to show the selected file name
 * - Uses a placeholder from `data-placeholder` or defaults to "Pilih file..."
 * - When a file is selected, shows its name and switches text color to active
 * - When cleared, restores placeholder and muted text color
 */

// Loop over all file inputs with the class 'file-upload-input'
const fileInputs = document.querySelectorAll(".file-upload-input");
fileInputs.forEach(function (fileInput) {
  // Scope to the nearest container to avoid cross-component conflicts
  const container = fileInput.closest("[data-input-container]");
  const fileDisplay = container?.querySelector("[data-file-display]");
  const placeholderText =
    fileDisplay?.getAttribute("data-placeholder") || "Pilih file...";

  if (fileDisplay) {
    // Initialize the display with placeholder if it's empty
    if (!fileDisplay.textContent || !fileDisplay.textContent.trim()) {
      fileDisplay.textContent = placeholderText;
    }

    // Update the display whenever the input's selected file changes
    fileInput.addEventListener("change", function (e) {
      const file = fileInput.files?.[0];
      if (file) {
        // Show the selected file name with active text color
        fileDisplay.textContent = file.name;
        fileDisplay.classList.remove("text-gray-500");
        fileDisplay.classList.add("text-black");
      } else {
        // No file selected: restore placeholder and muted text color
        fileDisplay.textContent = placeholderText;
        fileDisplay.classList.remove("text-black");
        fileDisplay.classList.add("text-gray-500");
      }
    });
  }
});
