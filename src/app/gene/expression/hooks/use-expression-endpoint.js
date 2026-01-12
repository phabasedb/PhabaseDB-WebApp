// standard
import { useMemo } from "react";

// local
import { datasets } from "@/static/expression/datasets";

export function useExpressionEndpoint(gene, organism) {
  return useMemo(() => {
    // Missing context
    if (!gene || !organism) {
      return {
        endpoint: null,
        error: "Gene expression information is not available.",
      };
    }

    // Dataset not configured
    const dataset = datasets.find((d) => d.id === organism.id);
    if (!dataset) {
      return {
        endpoint: null,
        error: "Gene expression data is not available for this organism.",
      };
    }

    // Endpoint not configured
    const endpoint = dataset?.types?.genes?.matrices?.scorez;
    if (!endpoint) {
      return {
        endpoint: null,
        error: "Gene expression data is currently unavailable.",
      };
    }

    return { endpoint, error: null };
  }, [gene, organism]);
}
