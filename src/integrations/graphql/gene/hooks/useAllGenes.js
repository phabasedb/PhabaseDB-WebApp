/**
 * Hook to fetch and map all genes in a paginated form.
 *
 * Executes the `GET_GENE_ALL` GraphQL query and maps the resulting
 * raw gene records into summary objects. Handles loading, error,
 * empty results, and pagination consistently.
 */

// local
import { useQuey } from "./useQuery";
import { GET_GENE_ALL } from "../queries/getAllGenes";
import { mapGeneSummaries } from "../mappers/geneDataMappers";

export function useAllGenes({ limit, page }) {
  const { data, loading, error } = useQuey(GET_GENE_ALL, {
    limit,
    page,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    return { data: null, loading: false, error };
  }

  const rawData = data?.getAllGenes?.data || [];
  const pagination = data?.getAllGenes?.pagination || null;

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: null,
      pagination,
      loading: false,
      error: `No genes found in the database`,
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
