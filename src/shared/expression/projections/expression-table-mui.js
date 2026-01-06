/**
 * Expression table projector for MUI components.
 *
 * Transforms normalized expression rows into a tabular
 * structure suitable for Material UI data tables.
 *
 * Output structure:
 * {
 *   columns: Array<{
 *     name: string,
 *     label: string
 *   }>,
 *   data: Array<{
 *     geneId: string,
 *     transcriptId: string,
 *     [condition: string]: number
 *   }>
 * }
 */

export function projectExpressionToMuiTable(rows) {
  const conditions = [...new Set(rows.map((r) => r.condition))];

  const columns = [
    { name: "geneId", label: "Gene ID" },
    { name: "transcriptId", label: "Transcript ID" },
    ...conditions.map((c) => ({ name: c, label: c })),
  ];

  const map = new Map();

  rows.forEach(({ geneId, transcriptId, condition, value }) => {
    const key = `${geneId}::${transcriptId}`;

    if (!map.has(key)) {
      map.set(key, { geneId, transcriptId });
    }

    map.get(key)[condition] = value;
  });

  return {
    columns,
    data: [...map.values()],
  };
}
