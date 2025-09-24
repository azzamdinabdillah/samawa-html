/**
 * Rewrite root-relative internal links to point into `/src/pages/` with correct .html files.
 *
 * How it works:
 * - Runs on DOMContentLoaded
 * - Scans all anchors with an href
 * - Ignores external/protocol links (http, mailto, tel, javascript)
 * - Only processes root-relative paths starting with '/'
 * - Preserves query strings and hash fragments
 * - Converts:
 *   '/'                    -> 'index.html'
 *   '/path'                -> 'path.html'
 *   '/path/'               -> 'path/index.html'
 *   '/path/file.html'      -> 'path/file.html' (unchanged basename)
 * - Prefixes the result with '/src/pages/'
 */

document.addEventListener("DOMContentLoaded", () => {
  const prefix = "/src/pages/";
  const anchors = document.querySelectorAll("a[href]");

  anchors.forEach((a) => {
    let href = a.getAttribute("href") || "";
    const raw = href.trim();
    if (!raw) return;

    // Skip external or special protocol links
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(raw)) return;

    // Skip if already prefixed
    if (raw.startsWith(prefix)) return;

    // Only handle root-relative paths (must start with '/')
    if (!raw.startsWith("/")) return;

    // Separate fragment (#) and query (?) while preserving their order
    let path = raw;
    let hash = "";
    let query = "";

    const hashIdx = path.indexOf("#");
    if (hashIdx !== -1) {
      hash = path.slice(hashIdx); // includes '#...'
      path = path.slice(0, hashIdx);
    }

    const queryIdx = path.indexOf("?");
    if (queryIdx !== -1) {
      query = path.slice(queryIdx); // includes '?...'
      path = path.slice(0, queryIdx);
    }

    // Transform rules for the cleaned path
    let out;
    if (path === "/") {
      out = "index.html";
    } else {
      const p = path.replace(/^\/+/, ""); // strip leading '/'
      if (p.endsWith(".html")) {
        out = p;
      } else if (p.endsWith("/")) {
        out = p + "index.html";
      } else {
        out = p + ".html";
      }
    }

    // Write back the rewritten href with prefix, query, and hash
    a.setAttribute("href", prefix + out + query + hash);
  });
});
