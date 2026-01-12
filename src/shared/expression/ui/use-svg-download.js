// third party
import { useCallback } from "react";

// local
import { downloadSVG } from "./download-svg";

const MAX_NODES = 5000;

/**
 * Generic SVG download hook for expression charts.
 *
 * @param {React.RefObject<SVGSVGElement>} svgRef
 * @param {() => string} getFilename
 */
export function useSvgDownload(svgRef, getFilename) {
  const onDownload = useCallback(() => {
    const svg = svgRef?.current;
    if (!svg) return;

    const nodeCount = svg.querySelectorAll("*").length;

    if (nodeCount > MAX_NODES) {
      alert("The chart is too large to download as SVG.");
      return;
    }

    const filename =
      typeof getFilename === "function"
        ? getFilename()
        : "expression-chart.svg";

    downloadSVG(svg, filename);
  }, [svgRef, getFilename]);

  return { onDownload };
}
