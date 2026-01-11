// third party
import { useCallback } from "react";

// local
import { downloadSVG } from "@/shared/expression/ui/download-svg";

const MAX_NODES = 5000;

export function useExpressionDownload(svgRef) {
  const onDownload = useCallback(() => {
    const svg = svgRef?.current;
    if (!svg) return;

    const nodeCount = svg.querySelectorAll("*").length;

    if (nodeCount > MAX_NODES) {
      alert("The chart is too large to download as SVG.");
      return;
    }

    const filename = "gene-expression.svg";

    downloadSVG(svg, filename);
  }, [svgRef]);

  return { onDownload };
}
