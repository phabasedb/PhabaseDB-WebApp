/**
 * Common expression data mapper.
 *
 * Normalizes raw expression arrays into a simplified
 * condition–value structure used across expression modules.
 */

/**
 * Maps a raw expression array to a normalized format.
 */
export function mapExpressionArray(expression = []) {
  return expression.map((exp) => ({
    condition: exp?.condition || "",
    value: exp?.value ?? 0,
  }));
}
