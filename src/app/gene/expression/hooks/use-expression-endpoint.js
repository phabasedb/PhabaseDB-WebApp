// standard
import { useMemo } from "react";

// local
import { datasets } from "@/static/expression/datasets";

export function useExpressionEndpoint(gene, organism) {
  return useMemo(() => {
    if (!gene || !organism) {
      return {
        endpoint: null,
        error: "Missing gene or organism context",
      };
    }

    const dataset = datasets.find((d) => d.id === organism.id);

    if (!dataset) {
      return {
        endpoint: null,
        error: `Dataset not found for organism id: ${organism.id}`,
      };
    }

    const endpoint = dataset?.types?.genes?.matrices?.scorez;

    if (!endpoint) {
      return {
        endpoint: null,
        error: `ScoreZ matrix not defined for organism id: ${organism.id}`,
      };
    }

    return { endpoint, error: null };
  }, [gene, organism]);
}
