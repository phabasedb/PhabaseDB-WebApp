/**
 * Unified gene search hook.
 *
 * Decides which underlying gene hook to execute based on the search term:
 * - Executes `useAllGenes` if the term is "GENES".
 * - Executes `useGeneByTerm` for all other search terms.
 *
 * Returns the same normalized object shape as the underlying hooks,
 * including `data`, `pagination`, `loading`, and `error`.
 *
 * This hook abstracts the search logic, providing a single interface
 * for components to fetch gene data.
 */

//local
import { useAllGenes } from "./useAllGenes";
import { useGeneByTerm } from "./useGeneByTerm";
import { useGeneByOrganism } from "./useGeneByOrganism";

export function useGeneSearch(term, { limit, page }) {
  const trimmedTerm = term?.trim();
  const normalizedTerm = trimmedTerm?.toUpperCase();

  if (normalizedTerm === "GENES") {
    return useAllGenes({ limit, page });
  } else if (normalizedTerm === "JAMAPA") {
    return useGeneByOrganism(normalizedTerm, "PDBJAMAPAORG000001", {
      limit,
      page,
    });
  } else if (normalizedTerm === "G19833") {
    return useGeneByOrganism(normalizedTerm, "PDBG19833ORG000001", {
      limit,
      page,
    });
  } else if (normalizedTerm === "BAT93") {
    return useGeneByOrganism(normalizedTerm, "PDBBAT93AORG000001", {
      limit,
      page,
    });
  }

  return useGeneByTerm(trimmedTerm, { limit, page });
}
