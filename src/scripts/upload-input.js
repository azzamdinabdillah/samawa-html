// Loop over all file inputs with the class 'file-upload-input'
const fileInputs = document.querySelectorAll(".file-upload-input");
fileInputs.forEach(function (fileInput) {
  const container = fileInput.closest("[data-input-container]");
  const fileDisplay = container?.querySelector("[data-file-display]");
  const placeholderText =
    fileDisplay?.getAttribute("data-placeholder") || "Pilih file...";

  if (fileDisplay) {
    // Set initial placeholder if needed
    if (!fileDisplay.textContent || !fileDisplay.textContent.trim()) {
      fileDisplay.textContent = placeholderText;
    }

    fileInput.addEventListener("change", function (e) {
      const file = fileInput.files?.[0];
      if (file) {
        fileDisplay.textContent = file.name;
        fileDisplay.classList.remove("text-gray-500");
        fileDisplay.classList.add("text-black");
      } else {
        fileDisplay.textContent = placeholderText;
        fileDisplay.classList.remove("text-black");
        fileDisplay.classList.add("text-gray-500");
      }
    });
  }
});
