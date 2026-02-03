/**
 * Hook to fetch genes by organism in a paginated form.
 *
 * Executes the `GET_GENE_BY_TERM` GraphQL query and maps the resulting
 * raw gene records into summary objects. Handles loading, error,
 * empty results, and pagination consistently.
 */

// local
import { useQuey } from "./useQuery";
import { GET_GENE_BY_TERM } from "../queries/getGeneBy";
import { mapGeneSummaries } from "../mappers/geneDataMappers";

export function useGeneByOrganism(label, organism_id, { limit, page }) {
  const { data, loading, error } = useQuey(GET_GENE_BY_TERM, {
    limit,
    page,
    search: organism_id,
    properties: ["organism._id"],
    fullMatchOnly: true,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    return { data: null, loading: false, error };
  }

  const rawData = data?.getGeneBy?.data || [];
  const pagination = data?.getGeneBy?.pagination || null;

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: null,
      pagination,
      loading: false,
      error: `No results found for organism: '${label}'`,
    };
  }

  const mapped = mapGeneSummaries(rawData);

  return {
    data: mapped,
    pagination,
    loading: false,
    error: null,
  };
}
