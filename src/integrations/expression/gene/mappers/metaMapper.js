/**
 * Expression metadata mapper.
 *
 * Transforms raw metadata records into a flat structure
 * suitable for tabular visualization (MUIDataTable).
 */
export function mapExpressionMeta(raw = []) {
  return raw.map((item) => {
    const info = item?.information || {};

    return {
      library: item?.library ?? "-",

      organism: info?.organism ?? "-",
      cultivar: info?.cultivar ?? "-",
      genotype: info?.genotype ?? "-",
      tissue: info?.tissue_organ ?? "-",
      treatment: info?.treatment ?? "-",
      inocula: info?.inocula ?? "-",
      timePostTreatment: info?.time_post_treatment ?? "-",

      additionalInfo: info?.additional_info ?? "-",
      reference: info?.reference ?? "-",
      doi: info?.doi ?? "-",
    };
  });
}
