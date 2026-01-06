// third party
import * as d3 from "d3";

/**
 * Draws a horizontal color bar for relative expression values.
 *
 * Handles:
 * - Gradient from low to high using d3.interpolateYlGnBu
 * - Labels ("Low", "High") and optional numeric min/max
 * - Title "Relative expression"
 *
 * @param {object} params
 * @param {d3.Selection} params.svg D3 SVG selection
 * @param {object} params.layout Layout info (margins, lineHeight, spacingTopColorBar, colorBarHeight)
 * @param {object} params.scales Scales object with minVal and maxVal
 * @param {"raw"|"scorez"} params.graphType Type of graph; numeric min/max shown only for "raw"
 */

export function drawColorBar({ svg, layout, scales, graphType }) {
  const { margin, lineHeight, spacingTopColorBar, colorBarHeight } = layout;
  const { minVal, maxVal } = scales;

  // Container group
  const colorBarG = svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left},${
        margin.top + lineHeight + spacingTopColorBar
      })`
    );

  // Gradient definition
  const defs = svg.append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", "expression-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  d3.range(0, 1.01, 0.25).forEach((t) => {
    gradient
      .append("stop")
      .attr("offset", `${t * 100}%`)
      .attr("stop-color", d3.interpolateYlGnBu(t));
  });

  // Title
  colorBarG
    .append("text")
    .attr("x", 0)
    .attr("y", -spacingTopColorBar / 2 + 10)
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .text("Relative expression");

  // Labels Low / High
  colorBarG
    .append("text")
    .attr("x", 0)
    .attr("y", -5)
    .style("font-size", "12px")
    .text("Low");

  colorBarG
    .append("text")
    .attr("x", 150)
    .attr("y", -5)
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .text("High");

  // Color bar rectangle
  colorBarG
    .append("rect")
    .attr("width", 150)
    .attr("height", colorBarHeight)
    .attr("fill", "url(#expression-gradient)");

  // Numeric min/max (only for raw graphs)
  if (graphType !== "scorez") {
    colorBarG
      .append("text")
      .attr("x", 0)
      .attr("y", colorBarHeight + 15)
      .style("font-size", "12px")
      .text(minVal.toFixed(2));

    colorBarG
      .append("text")
      .attr("x", 150)
      .attr("y", colorBarHeight + 15)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .text(maxVal.toFixed(2));
  }
}
