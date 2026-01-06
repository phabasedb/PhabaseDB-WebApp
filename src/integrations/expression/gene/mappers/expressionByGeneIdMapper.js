/**
 * Gene-level expression mapper.
 *
 * Transforms raw expression data for a single gene into a
 * normalized structure organized by transcripts.
 */

// local
import { mapExpressionArray } from "./expressionCommonMapper";

/**
 * Maps raw gene expression data by gene identifier.
 */
export function mapExpressionByGeneId(raw = {}) {
  return {
    geneId: raw?.id_gen || "",
    transcripts: (raw?.transcripts || []).map((tx) => ({
      transcriptId: tx?.id_transcript || "",
      expression: mapExpressionArray(tx?.expression),
    })),
  };
}
