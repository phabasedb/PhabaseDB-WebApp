// third party
import * as d3 from "d3";

/**
 * Creates D3 scales for the ExpressionChart.
 *
 * Builds all positional and color scales required for:
 * - expression line chart
 * - heatmap
 * - color bar
 *
 * Scales are derived from normalized expression points
 * and layout dimensions.
 *
 * @param {Object} params
 * @param {{ value: number }[]} params.points        Flat expression points.
 * @param {string[]} params.conditions                Condition labels.
 * @param {{ transcriptId: string }[]} params.transcripts Transcript list.
 * @param {Object} params.layout                      Layout dimensions.
 *
 * @returns {{
 *   minVal: number,
 *   maxVal: number,
 *   xLine: d3.ScalePoint<string>,
 *   yLine: d3.ScaleLinear<number, number>,
 *   xHeat: d3.ScaleBand<string>,
 *   yHeat: d3.ScaleBand<string>,
 *   colorScale: d3.ScaleSequential<string>
 * }}
 */

export function createScales({ points, conditions, transcripts, layout }) {
  // Scale for graphic
  const minVal = d3.min(points, (d) => d.value) ?? 0;
  const maxVal = d3.max(points, (d) => d.value) ?? 0;

  return {
    minVal, // export minVal
    maxVal, // export maxVal

    // Linear Scale X (conditions)
    xLine: d3
      .scalePoint()
      .domain(conditions)
      .range([0, layout.chartWidth])
      .padding(0.5),

    // Linear Y Scale (values)
    yLine: d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .nice()
      .range([layout.lineHeight, 0]),

    // Heat map scale X (conditions)
    xHeat: d3
      .scaleBand()
      .domain(conditions)
      .range([0, layout.chartWidth])
      .padding(0.05),

    // Heat map scale Y (transcriptId)
    yHeat: d3
      .scaleBand()
      .domain(transcripts.map((t) => t.transcriptId))
      .range([0, layout.heatmapHeight])
      .padding(0.05),

    // Color scale (heat map and color bar)
    colorScale: d3
      .scaleSequential(d3.interpolateYlGnBu)
      .domain([minVal, maxVal]),
  };
}
