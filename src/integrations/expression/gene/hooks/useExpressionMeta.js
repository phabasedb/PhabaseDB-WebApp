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
import { FRIENDLY_MESSAGES } from "../../constants/friendlyMessages";

export function useExpressionMeta(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    let isMounted = true;

    async function fetchMeta() {
      try {
        setLoading(true);
        setError(null);

        const response = await getMeta(endpoint);
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
            FRIENDLY_MESSAGES[code] ?? "No expression metadata were found."
          );
        }

        if (isMounted) {
          setData(mapExpressionMeta(rawArray));
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
