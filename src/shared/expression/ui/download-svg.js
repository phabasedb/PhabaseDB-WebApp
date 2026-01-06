/**
 * Downloads an SVG node as a standalone `.svg` file.
 *
 * The SVG is cloned and sanitized before export by removing
 * accessibility tags and inline event handlers to avoid
 * side effects outside the application runtime.
 *
 * A size limit is enforced to prevent downloading
 * excessively large SVG files.
 */

const MAX_SVG_SIZE = 8_000_000;

export function downloadSVG(svgNode, filename) {
  if (!svgNode) return;

  const clone = svgNode.cloneNode(true);

  clone.querySelectorAll("title, desc").forEach((n) => n.remove());
  clone.querySelectorAll("*").forEach((n) => {
    n.removeAttribute("onmouseover");
    n.removeAttribute("onmousemove");
    n.removeAttribute("onmouseout");
  });

  const source = new XMLSerializer().serializeToString(clone);

  if (source.length > MAX_SVG_SIZE) {
    alert("SVG too large to download safely.");
    return;
  }

  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
