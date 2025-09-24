document.addEventListener("DOMContentLoaded", () => {
  const prefix = "/samawa/src/pages/";
  const anchors = document.querySelectorAll("a[href]");

  anchors.forEach((a) => {
    let href = a.getAttribute("href") || "";
    const raw = href.trim();
    if (!raw) return;

    // Skip link eksternal / protokol khusus
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(raw)) return;

    // Jangan proses jika sudah diprefiks
    if (raw.startsWith(prefix)) return;

    // Hanya proses path root-relatif (mulai dengan '/')
    if (!raw.startsWith("/")) return;

    // Pisahkan fragment (#) dan query (?)
    let path = raw;
    let hash = "";
    let query = "";

    const hashIdx = path.indexOf("#");
    if (hashIdx !== -1) {
      hash = path.slice(hashIdx); // termasuk '#...'
      path = path.slice(0, hashIdx);
    }

    const queryIdx = path.indexOf("?");
    if (queryIdx !== -1) {
      query = path.slice(queryIdx); // termasuk '?...'
      path = path.slice(0, queryIdx);
    }

    // Aturan transformasi
    let out;
    if (path === "/") {
      out = "index.html";
    } else {
      const p = path.replace(/^\/+/, ""); // hapus '/' di depan
      if (p.endsWith(".html")) {
        out = p;
      } else if (p.endsWith("/")) {
        out = p + "index.html";
      } else {
        out = p + ".html";
      }
    }

    a.setAttribute("href", prefix + out + query + hash);
  });
});
