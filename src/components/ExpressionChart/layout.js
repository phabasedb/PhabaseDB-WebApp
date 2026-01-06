/**
 * Computes SVG layout dimensions for the ExpressionChart.
 *
 * Calculates margins, widths, heights and spacings required
 * to render the expression line chart, color bar and heatmap.
 *
 * The layout adapts to:
 * - number of conditions (columns)
 * - number of transcripts (rows)
 * - label length of transcript IDs and condition names
 *
 * @param {Object} params
 * @param {string[]} params.conditions   Condition labels.
 * @param {{ transcriptId: string }[]} params.transcripts  Transcript list.
 * @param {number} params.columnWidth    Base column width.
 *
 * @returns {{
 *   margin: { top: number, right: number, bottom: number, left: number },
 *   width: number,
 *   chartWidth: number,
 *   height: number,
 *   lineHeight: number,
 *   colorBarHeight: number,
 *   heatmapRowHeight: number,
 *   heatmapHeight: number,
 *   spacingTopColorBar: number,
 *   spacingBottomColorBar: number
 * }}
 */

export function computeLayout({ conditions, transcripts, columnWidth }) {
  // Calculate the maximum length of transcript IDs
  const maxTranscriptIdLen = transcripts.length
    ? Math.max(...transcripts.map((t) => t.transcriptId.length))
    : 0;
  const marginLeft = maxTranscriptIdLen * 8 + 10; // Calculate the left margin using the longest ID and additional increment.

  // Calculate the maximum length among condition names
  const maxConditionLen = conditions.length
    ? Math.max(...conditions.map((c) => c.length))
    : 0;
  const marginBottom = maxConditionLen * 6 + 10; // Calculate the lower margin using the longest condition and the additional increment.

  // Total chart drawing width (column width × number of conditions)
  const chartWidth =
    columnWidth *
    (conditions.length <= 15
      ? 3 * conditions.length
      : conditions.length <= 30
      ? 2 * conditions.length
      : conditions.length);
  // original formulate
  //const chartWidth = columnWidth * conditions.length;

  // Height of the line chart
  const lineHeight = 150;
  // Height of the gradient color bar
  const colorBarHeight = 25;
  // Height per row in the heatmap
  const heatmapRowHeight = 25;

  // Total heatmap height (number of transcripts × row height)
  const heatmapHeight = transcripts.length * heatmapRowHeight;

  // Space between line chart and color bar
  const spacingTopColorBar = 70;
  // Space between color bar and heatmap
  const spacingBottomColorBar = 40;

  // Definition of margins (using precomputed marginBottom and marginLeft)
  const margin = {
    top: 10,
    right: 30,
    bottom: marginBottom,
    left: marginLeft,
  };

  // Total SVG width (margins + chart area)
  const width = margin.left + chartWidth + margin.right;
  // Total SVG height (lines, bars, spacings, heatmap, margins)
  const height =
    margin.top +
    lineHeight +
    spacingTopColorBar +
    colorBarHeight +
    spacingBottomColorBar +
    heatmapHeight +
    margin.bottom;

  return {
    // margins
    margin,
    // widths
    width,
    chartWidth,
    // heights
    height,
    lineHeight,
    colorBarHeight,
    heatmapRowHeight,
    heatmapHeight,
    // spacings
    spacingTopColorBar,
    spacingBottomColorBar,
  };
}
