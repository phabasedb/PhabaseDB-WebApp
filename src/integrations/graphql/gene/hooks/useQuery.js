/**
 * Internal GraphQL query hook.
 *
 * Wraps Apollo's `useQuery` to provide a consistent response shape
 * for data, loading, and error states.
 */

//third party
import { useQuery } from "@apollo/client";

export function useQuey(query, variables) {
  const { data, loading, error } = useQuery(query, { variables });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error?.networkError) {
    return {
      data: null,
      loading: false,
      error: "Service not available. Please try again later.",
    };
  }

  if (error?.graphQLErrors?.length) {
    return {
      data: null,
      loading: false,
      error: "Server error. Please try again later.",
    };
  }

  return { data, loading: false, error: null };
}
