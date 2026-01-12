"use client";

/**
 * Hook to fetch expression data for multiple genes by their identifiers.
 *
 * Sends a POST request to the Expression API, maps the response into a
 * normalized structure, and exposes not-found identifiers separately.
 */

// standard
import { useEffect, useState } from "react";

// local
import { postExpressionByIds } from "../request/postExpressionByIds";
import { mapExpressionByIds } from "../mappers/expressionByIdsMapper";
import { FRIENDLY_MESSAGES } from "../../constants/friendlyMessages";

export function useExpressionByIds(endpoint, ids = [], columns = []) {
  const [data, setData] = useState(null);
  const [notFoundIds, setNotFoundIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint || !ids.length || !columns.length) return;

    let isMounted = true;

    async function fetchExpression() {
      try {
        setLoading(true);
        setError(null);
        setNotFoundIds([]);

        const url = `${endpoint.replace(/\/$/, "")}/query`;

        const response = await postExpressionByIds(url, { ids, columns });
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
            FRIENDLY_MESSAGES[code] ?? FRIENDLY_MESSAGES.MULTI_EXPR_NOT_FOUND
          );
        }

        if (isMounted) {
          setData(mapExpressionByIds(rawArray));
          setNotFoundIds(response?.not_found_ids ?? []);
        }
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
  }, [endpoint, ids, columns]);

  return { data, notFoundIds, loading, error };
}
