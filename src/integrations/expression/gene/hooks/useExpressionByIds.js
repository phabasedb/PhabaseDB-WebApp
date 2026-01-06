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

export function useExpressionByIds(endpoint, ids = [], columns = []) {
  const [data, setData] = useState(null);
  const [notFoundIds, setNotFoundIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ids.length) {
      setData(null);
      setNotFoundIds([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    async function fetchExpression() {
      try {
        setLoading(true);
        setError(null);
        setNotFoundIds([]);

        const response = await postExpressionByIds(endpoint, {
          ids,
          columns,
        });

        const raw = response?.data ?? [];

        if (!Array.isArray(raw) || raw.length === 0) {
          throw new Error("No expression data found");
        }

        if (isMounted) {
          setData(mapExpressionByIds(raw));
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
