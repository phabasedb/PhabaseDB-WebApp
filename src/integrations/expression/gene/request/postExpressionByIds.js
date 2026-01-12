/**
 * Sends a batch request to retrieve expression data by multiple identifiers.
 *
 * Performs a POST request to the Expression API endpoint using a JSON payload
 * and returns the raw response. Handles request timeout and HTTP errors.
 */

const BASE_URL = process.env.NEXT_PUBLIC_URI_EXPGENE;
const TIMEOUT = 10_000; // 10 seconds

export async function postExpressionByIds(endpoint, payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
