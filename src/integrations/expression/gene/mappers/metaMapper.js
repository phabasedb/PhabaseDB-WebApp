/**
 * Expression metadata mapper.
 *
 * Transforms raw metadata records into a normalized structure
 * describing biological and experimental context.
 */

/**
 * Maps raw expression metadata into a normalized format.
 */
export function mapExpressionMeta(raw = []) {
  return raw.map((item) => {
    const info = item?.information || {};

    return {
      library: item?.library || "",
      information: {
        organism: info?.organism || "",
        tissue: info?.tissue_organ || "",
        treatment: info?.treatment || "",
        timePostTreatment: info?.time_post_treatment || "",
        cultivar: info?.cultivar || "",
        genotype: info?.genotype || "",
        inocula: info?.inocula || "",
        reference: info?.reference || "",
        doi: info?.doi || "",
        additionalInfo: info?.additional_info || "",
      },
    };
  });
}
