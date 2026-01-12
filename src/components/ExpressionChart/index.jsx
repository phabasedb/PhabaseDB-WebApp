// standard
import { useEffect, useRef } from "react";

// third party
import { Box } from "@mui/material";
import * as d3 from "d3";

// local
import { computeLayout } from "./layout";
import { createScales } from "./scales";
import { drawLines } from "./drawLines";
import { drawHeatmap } from "./drawHeatmap";
import { drawColorBar } from "./drawColorbar";
import { createTooltip } from "./tooltip";

/**
 * ExpressionChart
 *
 * Renders a combined line + heatmap chart for gene expression.
 * - Lines: expression across conditions per transcript
 * - Heatmap: expression values per transcript × condition
 * - Colorbar: shows relative expression scale
 * - Tooltip: interactive on hover
 *
 * Props:
 * @param {object} props
 * @param {object} props.series Data series (normalized & projected)
 * series structure:
 * {
 *   conditions: string[],
 *   transcripts: Array<{
 *     transcriptId: string,
 *     values: Array<{ condition, value }>
 *   }>,
 *   points: Array<{ transcriptId, condition, value }>
 * }
 * @param {string[]} props.series.conditions Array of condition names
 * @param {Array} props.series.transcripts Array of transcripts:
 *        { transcriptId: string, values: Array<{ condition, value: number }> }
 * @param {Array} props.series.points Array of points (flattened values)
 * @param {number} [props.columnWidth=100] Width of each condition column
 * @param {"raw"|"scorez"} [props.graphType="scorez"] Chart type
 * @param {React.Ref<SVGSVGElement>} props.svgRef Ref to the SVG element
 */

export default function ExpressionChart({
  series,
  columnWidth = 20,
  graphType = "scorez",
  svgRef,
}) {
  const containerRef = useRef(null);
  const tooltip = useRef(null);

  // Initialize tooltip on mount
  useEffect(() => {
    if (!containerRef.current) return;
    tooltip.current = createTooltip(containerRef);

    return () => {
      tooltip.current?.remove();
    };
  }, []);

  // Interaction handlers for lines & heatmap
  const interactions = {
    showTooltip: (event, d) => {
      tooltip.current?.show(event, d);
    },
    hideTooltip: () => {
      tooltip.current?.hide();
    },
  };

  // Main rendering effect
  useEffect(() => {
    if (!series || !series.conditions.length) return;

    const { conditions, transcripts, points } = series;

    // ---------- Layout ----------
    const layout = computeLayout({
      conditions,
      transcripts,
      columnWidth,
    });

    // ---------- SVG setup ----------
    const svg = d3
      .select(svgRef.current)
      .attr("width", layout.width)
      .attr("height", layout.height)
      .attr("viewBox", `0 0 ${layout.width} ${layout.height}`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    svg.selectAll("*").remove();

    // ---------- Scales ----------
    const scales = createScales({
      points,
      conditions,
      transcripts,
      layout,
    });

    // ---------- Draw Lines ----------
    drawLines({ svg, layout, scales, transcripts, interactions });
    // ---------- Draw Colorbar ----------
    drawColorBar({ svg, layout, scales, graphType });
    // ---------- Draw Heatmap ----------
    drawHeatmap({ svg, layout, scales, transcripts, graphType, interactions });
  }, [series, columnWidth, svgRef]);

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      <svg ref={svgRef} />
    </Box>
  );
}
