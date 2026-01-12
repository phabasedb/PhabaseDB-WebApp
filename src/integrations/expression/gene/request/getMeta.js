/**
 * Retrieves expression metadata.
 *
 * Fetches metadata from the Expression API using a REST endpoint and
 * returns the raw response, handling timeout and request errors.
 */

const BASE_URL = process.env.NEXT_PUBLIC_URI_EXPGENE;
const TIMEOUT = 10_000; // 10 seconds

export async function getMeta(endpoint) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
    });

    const json = await res.json();
    return json;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout. Please try again later.");
    }

    throw new Error(
      "Failed to fetch in Expression API. Please try again later."
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
