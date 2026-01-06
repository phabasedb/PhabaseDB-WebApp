"use client";

/**
 * Hook to fetch expression metadata.
 *
 * Retrieves metadata from the Expression API using a REST endpoint,
 * maps the raw response into a normalized structure, and manages loading
 * and error states.
 */

// standard
import { useEffect, useState } from "react";

// local
import { getMeta } from "../request/getMeta";
import { mapExpressionMeta } from "../mappers/metaMapper";

export function useExpressionMeta(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMeta() {
      try {
        setLoading(true);
        setError(null);

        const response = await getMeta(endpoint);
        const raw = response?.data ?? [];

        if (!Array.isArray(raw) || raw.length === 0) {
          throw new Error("No metadata found in the database");
        }

        if (isMounted) {
          setData(mapExpressionMeta(raw));
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

    fetchMeta();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
