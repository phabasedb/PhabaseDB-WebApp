/**
 * Expression data normalizer.
 *
 * Converts gene expression data (single or multiple genes)
 * into a flat, canonical list of expression observations
 * suitable for visualization and downstream processing.
 *
 * Output structure in data:
 * Array<{
 *   geneId: string,
 *   transcriptId: string,
 *   condition: string,
 *   value: number
 * }>
 */

/*export function normalizeExpressionData(input) {
  if (!input) {
    return { data: [], error: "No expression data available." };
  }

  const genes = Array.isArray(input) ? input : [input];

  const data = genes.flatMap((gene) =>
    (gene.transcripts || []).flatMap((tx) =>
      (tx.expression || []).map((ex) => ({
        geneId: gene.geneId || "",
        transcriptId: tx.transcriptId || "",
        condition: ex.condition || "",
        value: ex.value ?? 0,
      }))
    )
  );

  if (data.length === 0) {
    return {
      data: [],
      error: "No expression values available for visualization.",
    };
  }

  return { data, error: null };
}*/

export function normalizeExpressionData(input) {
  if (!input) return [];

  const genes = Array.isArray(input) ? input : [input];

  return genes.flatMap((gene) =>
    (gene.transcripts || []).flatMap((tx) =>
      (tx.expression || []).map((ex) => ({
        geneId: gene.geneId || "",
        transcriptId: tx.transcriptId || "",
        condition: ex.condition || "",
        value: ex.value ?? 0,
      }))
    )
  );
}
