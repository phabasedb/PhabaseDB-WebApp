/**
 * Batch gene expression mapper.
 *
 * Transforms a flat list of raw expression records into a
 * normalized structure grouped by gene and transcript.
 */

// local
import { mapExpressionArray } from "./expressionCommonMapper";

/**
 * Maps and groups raw expression data by gene identifier.
 */
export function mapExpressionByIds(raw = []) {
  const grouped = {};

  raw.forEach((item) => {
    const geneId = item?.id_gen;
    if (!geneId) return;

    if (!grouped[geneId]) {
      grouped[geneId] = {
        geneId,
        transcripts: [],
      };
    }

    grouped[geneId].transcripts.push({
      transcriptId: item?.id_transcript || "",
      expression: mapExpressionArray(item?.expression),
    });
  });

  return Object.values(grouped);
}
