/**
 * Fetches gene expression data by gene identifier.
 *
 * Performs a GET request to the Expression API endpoint and returns
 * the raw JSON response. Handles request timeout and HTTP errors.
 */

const BASE_URL = process.env.NEXT_PUBLIC_URI_EXPGENE;
const TIMEOUT = 10_000; // 10 seconds

export async function getExpressionByGeneId(endpoint, geneId) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}/${geneId}`, {
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
