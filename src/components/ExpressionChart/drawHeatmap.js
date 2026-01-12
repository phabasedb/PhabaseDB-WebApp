// third party
import * as d3 from "d3";

/**
 * Draws a heatmap for gene expression data.
 *
 * Handles:
 * - Per-transcript color scaling for "scorez" graphs
 * - Default color scaling for raw expression values
 * - Mouse interactions (hover highlights, line chart connection, tooltip)
 * - X and Y axes with rotated condition labels and transcript IDs
 *
 * @param {object} params
 * @param {d3.Selection} params.svg D3 SVG selection
 * @param {object} params.layout Layout info (margins, lineHeight, spacingTopColorBar, colorBarHeight, spacingBottomColorBar, heatmapHeight, heatmapRowHeight)
 * @param {object} params.scales Scales object (xHeat, yHeat, colorScale)
 * @param {Array} params.transcripts Array of transcripts with values
 * @param {"raw"|"scorez"} params.graphType Type of graph; per-row color scale only for "scorez"
 * @param {object} params.interactions Optional interactions: { showTooltip, hideTooltip }
 */

export function drawHeatmap({
  svg,
  layout,
  scales,
  transcripts,
  graphType,
  interactions,
}) {
  const {
    margin,
    lineHeight,
    spacingTopColorBar,
    colorBarHeight,
    spacingBottomColorBar,
    heatmapHeight,
    heatmapRowHeight,
  } = layout;

  const { xHeat, yHeat, colorScale } = scales;

  const heatG = svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left},${
        margin.top +
        lineHeight +
        spacingTopColorBar +
        colorBarHeight +
        spacingBottomColorBar
      })`
    );

  // Per-row color scales for "scorez"
  let rowColorScales = null;

  if (graphType === "scorez") {
    rowColorScales = Object.fromEntries(
      transcripts.map((t) => {
        const values = t.values.map((v) => v.value);
        return [
          t.transcriptId,
          d3
            .scaleSequential(d3.interpolateYlGnBu)
            .domain([d3.min(values), d3.max(values)]),
        ];
      })
    );
  }

  // Flatten transcript values into heatmap cells
  const heatData = transcripts.flatMap((t) =>
    t.values.map((v) => ({
      transcriptId: t.transcriptId,
      condition: v.condition,
      value: v.value,
    }))
  );

  // Draw heatmap cells
  heatG
    .selectAll("rect.cell")
    //.data(heatData)
    .data(heatData, (d) => `${d.transcriptId}::${d.condition}`)
    .join("rect")
    .attr("class", "cell")
    .attr("x", (d) => xHeat(d.condition))
    .attr("y", (d) => yHeat(d.transcriptId))
    .attr("width", xHeat.bandwidth())
    .attr("height", yHeat.bandwidth())
    .attr("fill", (d) =>
      graphType === "scorez"
        ? rowColorScales[d.transcriptId](d.value)
        : colorScale(d.value)
    )
    .style("cursor", "pointer")
    .on("mouseover", (event, d) => {
      // Visual hover only on the cell
      d3.select(event.currentTarget)
        .attr("stroke", "#000")
        .attr("stroke-width", 2);

      // Connection to the line graph
      // Line → highlight
      svg.node().__highlightLine?.(d.transcriptId);
      // Point → show intersection point
      svg.node().__highlightPoint?.(d);
      interactions?.showTooltip(event, d);
    })
    .on("mouseout", (event) => {
      d3.select(event.currentTarget).attr("stroke", null);

      // Clear state in lines + dot
      svg.node().__clearLineFocus?.();
      interactions?.hideTooltip();
    });

  // X axis (conditions)
  heatG
    .append("g")
    .attr("transform", `translate(0,${heatmapHeight})`)
    .call(d3.axisBottom(xHeat).tickSize(0))
    .selectAll("text")
    .attr("transform", "rotate(90)")
    .attr("x", 8)
    .attr("y", -heatmapRowHeight / 2)
    .style("text-anchor", "start")
    .style("font-size", "11px");

  // Y axis (transcript IDs)
  heatG
    .append("g")
    .call(d3.axisLeft(yHeat).tickSize(0))
    .selectAll("text")
    .style("font-size", "12px");
}
