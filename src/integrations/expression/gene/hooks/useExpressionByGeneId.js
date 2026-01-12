"use client";

/**
 * Hook to fetch gene expression data by gene identifier.
 *
 * Retrieves expression data from the Expression API using a REST endpoint,
 * maps the raw response into a normalized structure, and manages loading
 * and error states.
 */

// standard
import { useEffect, useState } from "react";

// local
import { getExpressionByGeneId } from "../request/getExpressionByGeneId";
import { mapExpressionByGeneId } from "../mappers/expressionByGeneIdMapper";
import { FRIENDLY_MESSAGES } from "../../constants/friendlyMessages";

export function useExpressionByGeneId(endpoint, geneId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint && !geneId) return;

    let isMounted = true;

    async function fetchExpression() {
      try {
        setLoading(true);
        setError(null);

        const response = await getExpressionByGeneId(endpoint, geneId);
        const { status, code, data: rawArray } = response;

        if (status === "error") {
          throw new Error(
            FRIENDLY_MESSAGES[code] ?? "An unexpected error occurred."
          );
        }

        if (
          status === "success" &&
          (!Array.isArray(rawArray) || rawArray.length === 0)
        ) {
          throw new Error(
            FRIENDLY_MESSAGES[code] ?? "No expression data were found."
          );
        }

        const geneObject = rawArray[0];
        if (isMounted) setData(mapExpressionByGeneId(geneObject));
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchExpression();

    return () => {
      isMounted = false;
    };
  }, [endpoint, geneId]);

  return { data, loading, error };
}
