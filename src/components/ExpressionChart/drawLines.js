// third party
import * as d3 from "d3";

/**
 * Draws line charts for transcripts on the SVG.
 *
 * Handles:
 * - Gridlines and axes
 * - Zero baseline (if needed)
 * - Lines with monotone X interpolation
 * - Hoverable hit paths for line highlighting
 * - Individual points with hover focus
 *
 * Public helpers attached to the SVG node:
 * - __highlightLine(transcriptId): highlight a specific transcript line
 * - __highlightPoint(point): show a single point focus
 * - __clearLineFocus(): reset lines and points to default
 *
 * @param {object} params
 * @param {d3.Selection} params.svg D3 SVG selection
 * @param {object} params.layout Layout info (margins, chartWidth, etc.)
 * @param {object} params.scales D3 scales (xLine, yLine, minVal)
 * @param {Array} params.transcripts Transcript data with values [{ transcriptId, values: [{condition, value}] }]
 * @param {object} [params.interactions] Optional tooltip handlers { showTooltip, hideTooltip }
 */

export function drawLines({ svg, layout, scales, transcripts, interactions }) {
  const { margin, chartWidth } = layout;
  const { xLine, yLine, minVal } = scales;

  const lineG = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Gridlines
  lineG
    .append("g")
    .call(d3.axisLeft(yLine).tickSize(-chartWidth).tickFormat(""))
    .selectAll("line")
    .attr("stroke", "#ccc");

  lineG
    .append("g")
    .call(d3.axisLeft(yLine).ticks(5).tickSize(0))
    .call((g) => g.selectAll("text").style("font-size", "12px"))
    .select(".domain")
    .remove();

  // Baseline y=0
  if (minVal < 0) {
    lineG
      .append("line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", yLine(0))
      .attr("y2", yLine(0))
      .attr("stroke", "#000")
      .attr("stroke-dasharray", "4,2");
  }

  // Line generator
  const lineGen = d3
    .line()
    .x((d) => xLine(d.condition))
    .y((d) => yLine(d.value))
    .curve(d3.curveMonotoneX);

  // Draw lines
  const lines = lineG
    .selectAll(".line")
    .data(transcripts)
    .join("path")
    .attr("class", "line")
    .attr("d", (d) => lineGen(d.values))
    .attr("fill", "none")
    .attr("stroke", "#888")
    .attr("stroke-width", 4)
    .attr("opacity", 0.6);

  const focusG = lineG.append("g");

  // Public helpers
  svg.node().__highlightLine = (transcriptId) => {
    lines.attr("stroke", "#888").attr("opacity", 0.6);
    const idx = transcripts.findIndex((t) => t.transcriptId === transcriptId);
    if (idx !== -1) {
      d3.select(lines.nodes()[idx])
        .raise()
        .attr("stroke", "#000")
        .attr("opacity", 1);
    }
  };

  svg.node().__highlightPoint = (d) => {
    focusG.selectAll("*").remove();
    focusG
      .append("circle")
      .attr("cx", xLine(d.condition))
      .attr("cy", yLine(d.value))
      .attr("r", 6)
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);
  };

  svg.node().__clearLineFocus = () => {
    lines.attr("stroke", "#888").attr("opacity", 0.6);
    focusG.selectAll("*").remove();
  };

  // Hit paths for hover
  lineG
    .selectAll(".hit-path")
    .data(transcripts)
    .join("path")
    .attr("class", "hit-path")
    .attr("d", (d) => lineGen(d.values))
    .attr("fill", "none")
    .attr("stroke", "transparent")
    .attr("stroke-width", 10)
    .style("cursor", "pointer")
    .on("mouseover", (_, d) => {
      svg.node().__highlightLine(d.transcriptId);
    })
    .on("mouseout", () => {
      svg.node().__clearLineFocus();
    });

  // Individual points for hover
  const allPoints = transcripts.flatMap((t) =>
    t.values.map((v) => ({
      transcriptId: t.transcriptId,
      condition: v.condition,
      value: v.value,
    }))
  );

  lineG
    .selectAll(".pt-hit")
    .data(allPoints)
    .join("circle")
    .attr("class", "pt-hit")
    .attr("cx", (d) => xLine(d.condition))
    .attr("cy", (d) => yLine(d.value))
    .attr("r", 6)
    .attr("fill", "transparent")
    .style("cursor", "pointer")
    .on("mouseover", (event, d) => {
      svg.node().__highlightLine(d.transcriptId);
      svg.node().__highlightPoint(d);
      interactions?.showTooltip(event, d);
    })
    .on("mouseout", () => {
      svg.node().__clearLineFocus();
      interactions?.hideTooltip();
    });
}
