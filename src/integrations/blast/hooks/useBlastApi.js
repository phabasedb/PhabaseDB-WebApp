"use client";

// standard
import { useEffect, useState } from "react";

// local
import { postBlast } from "../request/postBlast";
import { FRIENDLY_MESSAGES } from "../constants/friendlyMessages";

export function useBlastApi(endpoint, sequence, db = [], params) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint || !sequence || !db.length || !params) return;

    let isMounted = true;

    async function fetchBlast() {
      try {
        setLoading(true);
        setError(null);

        const response = await postBlast(endpoint, { sequence, db, params });
        const { status, code, data } = response;

        if (status === "error") {
          throw new Error(
            FRIENDLY_MESSAGES[code] ?? "An unexpected error occurred.",
          );
        }

        if (status === "success" && typeof data === "string") {
          if (isMounted) setHtml(data);
        } else {
          throw new Error("BLAST returned invalid data.");
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBlast();

    return () => {
      isMounted = false;
    };
  }, [endpoint, sequence, db, params]);

  return { html, loading, error };
}
