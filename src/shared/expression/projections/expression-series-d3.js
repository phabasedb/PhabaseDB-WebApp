/**
 * Expression series projector for D3 visualizations.
 *
 * Transforms normalized expression rows into grouped
 * series and point collections suitable for D3-based charts.
 *
 * Output structure:
 * {
 *   conditions: string[],
 *   transcripts: Array<{
 *     transcriptId: string,
 *     values: Array<{ condition: string, value: number }>
 *   }>,
 *   points: Array<{
 *     transcriptId: string,
 *     condition: string,
 *     value: number
 *   }>
 * }
 */

export function projectExpressionToD3Series(rows) {
  const conditions = [...new Set(rows.map((r) => r.condition))];

  const grouped = new Map();

  rows.forEach(({ transcriptId, condition, value }) => {
    if (!grouped.has(transcriptId)) {
      grouped.set(transcriptId, []);
    }
    grouped.get(transcriptId).push({ condition, value });
  });

  const transcripts = [...grouped.entries()].map(([transcriptId, values]) => ({
    transcriptId,
    values,
  }));

  const points = rows.map((r) => ({
    transcriptId: r.transcriptId,
    condition: r.condition,
    value: r.value,
  }));

  return {
    conditions,
    transcripts,
    points,
  };
}
